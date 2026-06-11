// Generates public/cv.pdf from cv/cv.html using headless Microsoft Edge.
// Usage: npm run cv
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const edgePaths = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];

const edge = edgePaths.find(existsSync);
if (!edge) {
  console.error("Microsoft Edge not found. Install Edge or print cv/cv.html to PDF manually.");
  process.exit(1);
}

const htmlPath = resolve(import.meta.dirname, "cv.html");
const pdfPath = resolve(import.meta.dirname, "../public/cv.pdf");

execFileSync(edge, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`,
  `file:///${htmlPath.replace(/\\/g, "/")}`,
], { stdio: "inherit" });

console.log(`CV generated at ${pdfPath}`);
