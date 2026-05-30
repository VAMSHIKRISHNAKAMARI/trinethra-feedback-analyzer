import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const MODEL = "llama3.2";

function extractJson(text) {

  if (!text) {
    throw new Error("Empty response from model");
  }

  const cleaned = String(text)
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {

    return JSON.parse(cleaned);

  } catch (error) {

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (
      firstBrace !== -1 &&
      lastBrace !== -1 &&
      lastBrace > firstBrace
    ) {

      const jsonText = cleaned.slice(
        firstBrace,
        lastBrace + 1
      );

      return JSON.parse(jsonText);

    }

    throw new Error("Model did not return valid JSON");

  }

}

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/analyze", async (req, res) => {

  const transcript = String(
    req.body?.transcript || ""
  ).trim();

  if (!transcript) {

    return res.status(400).json({
      error: "Transcript is required"
    });

  }

  try {

    const ollamaResponse = await fetch(
      "http://localhost:11434/api/generate",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          model: MODEL,

          stream: false,

          format: "json",

          prompt: `
You are a psychology assessment assistant for DeepThought Fellows.

Analyze the supervisor transcript carefully.

Rubric Logic:

Scores 1-3:
- disengaged
- lacks discipline
- confused execution

Scores 4-6:
- reliable execution
- follows instructions
- consistent performer
- productive but not independently identifying problems

Scores 7-10:
- independently identifies problems
- builds systems
- creates processes
- proactively improves operations

Important distinction:
- Score 6 = reliable execution of assigned tasks
- Score 7 = independently identifies problems and creates solutions

Return ONLY valid JSON.

Format:

{
  "evidence": [
    {
      "quote": "",
      "signal": "",
      "interpretation": ""
    }
  ],

  "score": {
    "value": "",
    "label": "",
    "band": "",
    "justification": "",
    "confidence": ""
  },

  "kpiMapping": [
    {
      "kpi": "",
      "evidence": "",
      "systemOrPersonal": ""
    }
  ],

  "gaps": [
    {
      "dimension": "",
      "detail": ""
    }
  ],

  "followUpQuestions": [
    {
      "question": "",
      "targetGap": "",
      "lookingFor": ""
    }
  ]
}

Transcript:
${transcript}
          `

        }),

        signal: AbortSignal.timeout(120000)

      }
    );

    if (!ollamaResponse.ok) {

      throw new Error(
        "Ollama HTTP " + ollamaResponse.status
      );

    }

    const data = await ollamaResponse.json();

    const parsed = extractJson(data.response);

    res.json(parsed);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to analyze transcript",
      details: String(error.message || error)
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});