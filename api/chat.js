
export const config = {
  runtime: "edge",
};

import knowledgeBase from "../src/data/knowledge.json";

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { messages, detailLevel = 3 } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key not configured in Vercel environment variables." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const detailInstructions = {
      1: "Answer very concisely in a single short sentence. Be extremely brief.",
      2: "Answer concisely in 1-2 sentences.",
      3: "Provide a balanced, professional answer in 2-3 sentences.",
      4: "Provide a detailed answer with added context and background.",
      5: "Provide a highly comprehensive and detailed answer, elaborating on all relevant points from the context. Connect skills to specific roles or projects where applicable."
    };

    const temperatureMap = { 1: 0.1, 2: 0.3, 3: 0.5, 4: 0.7, 5: 0.8 };

    // SMART CONTEXT FILTER: Reduces token usage by only including relevant parts of the knowledge base
    const userQuery = messages[messages.length - 1].content.toLowerCase();
    let relevantContext = { identity: knowledgeBase.identity, contact: knowledgeBase.contact };

    if (userQuery.includes("hobb") || userQuery.includes("photo") || userQuery.includes("drone") || userQuery.includes("uav") || userQuery.includes("flickr")) {
      relevantContext.personal = knowledgeBase.personal;
    }
    if (userQuery.includes("volks") || userQuery.includes("vw") || userQuery.includes("motive") || userQuery.includes("car")) {
      relevantContext.volkswagen = knowledgeBase.experience.find(e => e.company.includes("Volkswagen"));
    }
    if (userQuery.includes("vision") || userQuery.includes("health") || userQuery.includes("medical") || userQuery.includes("audio")) {
      relevantContext.visionHealth = knowledgeBase.experience.find(e => e.company.includes("VisionHealth"));
    }
    if (userQuery.includes("weevil") || userQuery.includes("drone") || userQuery.includes("advisor")) {
      relevantContext.weevils = knowledgeBase.experience.find(e => e.company.includes("Weevils"));
    }
    if (userQuery.includes("ovgu") || userQuery.includes("university") || userQuery.includes("magdeburg") || userQuery.includes("study") || userQuery.includes("degree") || userQuery.includes("grade") || userQuery.includes("gpa")) {
      relevantContext.education = knowledgeBase.education;
    }
    if (userQuery.includes("dzne") || userQuery.includes("tongue") || userQuery.includes("lip") || userQuery.includes("als") || userQuery.includes("research")) {
      relevantContext.dzne = knowledgeBase.experience.find(e => e.company.includes("DZNE"));
    }
    if (userQuery.includes("cognizant") || userQuery.includes("ericsson") || userQuery.includes("india") || userQuery.includes("kuwait") || userQuery.includes("integration")) {
      relevantContext.otherExperience = knowledgeBase.experience.filter(e => e.company.includes("Cognizant") || e.company.includes("Ericsson"));
    }
    if (/paper|publication|publish|scholar|aibio|segment|tumour|tumor|research|journal|author/.test(userQuery)) {
      relevantContext.publications = knowledgeBase.publications;
    }
    if (/genai|gen ai|llm|ollama|remotellama|jarvis|career\s?crawler|repo analyzer|project|github|agent/.test(userQuery)) {
      relevantContext.projects = knowledgeBase.projects;
    }
    if (/language|german|english|bengali|hindi|relocat|visa|residen|mentor|teach|location|munich|remote|hybrid|onsite/.test(userQuery)) {
      relevantContext.profileSnapshot = knowledgeBase.profile_snapshot;
    }
    if (/metric|accuracy|impact|achievement|number|stat|clinical|trial|kata|inference|model size/.test(userQuery)) {
      relevantContext.metrics = knowledgeBase.metrics;
    }
    if (/skill|stack|tool|framework|technolog|pytorch|tensorflow|python|typescript/.test(userQuery)) {
      relevantContext.skills = knowledgeBase.skills_grouped;
    }

    // Default to a summarized version if no specific company is mentioned
    if (Object.keys(relevantContext).length <= 2) {
      relevantContext.careerSummary = knowledgeBase.experience.map(e => ({
        company: e.company,
        roles: e.roles.map(r => r.title).join(", ")
      }));
      relevantContext.generalQuestions = knowledgeBase.general_questions;
    }

    // CONVERSATION DIET: Only send the last 4 messages + the current system prompt
    const recentMessages = messages.length > 4 ? messages.slice(-4) : messages;

    // SANITIZE: Strip non-standard fields (like 'level') that cause Groq 400 errors
    const sanitizedMessages = recentMessages.map(m => ({ role: m.role, content: m.content }));

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: temperatureMap[detailLevel] || 0.5,
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for Budhaditya Mukhopadhyay's professional portfolio.
            
            IDENTITY: ${JSON.stringify(relevantContext.identity)}
            
            RELEVANT CONTEXT:
            ${JSON.stringify(relevantContext)}

            STRICT RULES:
            1. ONLY answer questions using the RELEVANT CONTEXT provided above. 
            2. If someone asks "Where did he use [Specific Skill]?", look through the roles and locate where those skills are listed.
            3. Always use full, professional, and grammatically correct sentences.
            4. Do NOT use emojis.
            5. If the user asks something NOT covered in the context, politely say you only have information on Budhaditya's professional work.
            5b. CONFIDENTIALITY: Never discuss Weevils Drones customers, buyers, partners, demos, or pilots, and never discuss internal model architectures or validation details of VisionHealth products. If asked, say that information is confidential.

            6. WHEN THE DETAIL LEVEL IS 4 OR 5: Provide a highly comprehensive and detailed answer, elaborating on all relevant points from the context.
            
            Current Response Style: ${detailInstructions[detailLevel] || detailInstructions[3]}`,
          },
          ...sanitizedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "unknown");
      console.error("Groq API error:", response.status, errorBody);

      const errorMessage = response.status === 429 
        ? "I'm receiving too many requests. Please wait a few seconds and try again."
        : `I encountered an issue (status ${response.status}). Please try again.`;

      return new Response(`data: ${JSON.stringify({ 
        choices: [{ delta: { content: errorMessage } }] 
      })}\n\ndata: [DONE]\n\n`, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive"
        },
      });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in AI proxy:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
