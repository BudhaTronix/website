
export async function* streamChat(messages, detailLevel = 3) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, detailLevel }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || "Failed to fetch response");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = ""; // Accumulate partial chunks here

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Append new data to the buffer
      buffer += decoder.decode(value, { stream: true });

      // Process only COMPLETE lines (ending with \n)
      const lines = buffer.split("\n");
      // Keep the last (potentially incomplete) line in the buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;

        const data = trimmed.slice(6);
        if (data === "[DONE]") return;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) yield content;
        } catch (e) {
          // Skip malformed chunks silently — they'll be rare with buffering
        }
      }
    }

    // Process any remaining data in the buffer
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith("data: ")) {
        const data = trimmed.slice(6);
        if (data !== "[DONE]") {
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) yield content;
          } catch (e) {
            // Final chunk was incomplete, skip
          }
        }
      }
    }
  } catch (error) {
    console.error("Chat streaming error:", error);
    yield "I'm sorry, I'm having trouble connecting right now. Please check your internet or try again later.";
  }
}
