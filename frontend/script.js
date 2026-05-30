const analyzeBtn = document.getElementById("analyzeBtn");
const transcriptInput = document.getElementById("transcript");

const evidenceEl = document.getElementById("evidence");
const scoreEl = document.getElementById("score");
const kpiEl = document.getElementById("kpi");
const gapsEl = document.getElementById("gaps");
const questionsEl = document.getElementById("questions");

function escapeHtml(value = "") {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

}

function renderEvidence(items) {

  if (!Array.isArray(items) || items.length === 0) {
    return "No evidence returned.";
  }

  return items.map((item) => `

    <div style="margin-bottom:15px;">

      <strong>
        ${escapeHtml(item.signal || "")}
      </strong>

      <br>

      <em>
        "${escapeHtml(item.quote || "")}"
      </em>

      <br>

      ${escapeHtml(item.interpretation || "")}

    </div>

  `).join("");

}

function renderScore(score) {

  if (!score || typeof score !== "object") {
    return "No score returned.";
  }

  return `

    <strong>
      ${escapeHtml(score.value || "")}/10
      -
      ${escapeHtml(score.label || "")}
    </strong>

    <br>

    <strong>Band:</strong>
    ${escapeHtml(score.band || "")}

    <br>

    <strong>Why:</strong>
    ${escapeHtml(score.justification || "")}

    <br>

    <strong>Confidence:</strong>
    ${escapeHtml(score.confidence || "")}

  `;

}

function renderKpis(items) {

  if (!Array.isArray(items) || items.length === 0) {
    return "No KPI mapping returned.";
  }

  return `

    <ul style="padding-left:20px;">

      ${items.map((item) => `

        <li style="margin-bottom:15px;">

          <strong>
            ${escapeHtml(item.kpi || "")}
          </strong>

          <br>

          Evidence:
          ${escapeHtml(
            typeof item.evidence === "object"
              ? JSON.stringify(item.evidence)
              : item.evidence || ""
          )}

          <br>

          Type:
          ${escapeHtml(item.systemOrPersonal || "")}

        </li>

      `).join("")}

    </ul>

  `;

}

function renderGaps(items) {

  if (!Array.isArray(items) || items.length === 0) {
    return "No gaps returned.";
  }

  return `

    <ul style="padding-left:20px;">

      ${items.map((item) => `

        <li style="margin-bottom:15px;">

          <strong>
            ${escapeHtml(item.dimension || "")}
          </strong>

          <br>

          ${escapeHtml(item.detail || "")}

        </li>

      `).join("")}

    </ul>

  `;

}

function renderQuestions(items) {

  if (!Array.isArray(items) || items.length === 0) {
    return "No follow-up questions returned.";
  }

  return `

    <ol style="padding-left:20px;">

      ${items.map((item) => `

        <li style="margin-bottom:15px;">

          <strong>
            ${escapeHtml(item.question || "")}
          </strong>

          <br>

          Target gap:
          ${escapeHtml(item.targetGap || "")}

          <br>

          Looking for:
          ${escapeHtml(item.lookingFor || "")}

        </li>

      `).join("")}

    </ol>

  `;

}

analyzeBtn.addEventListener("click", async () => {

  const transcript = transcriptInput.value.trim();

  if (!transcript) {

    alert("Please paste a transcript first.");

    return;

  }

  analyzeBtn.disabled = true;

  analyzeBtn.textContent = "Analyzing...";

  try {

    const response = await fetch(
      "http://localhost:5000/analyze",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          transcript
        })

      }
    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(
        data.error || "Request failed"
      );

    }

    evidenceEl.innerHTML =
      renderEvidence(data.evidence);

    scoreEl.innerHTML =
      renderScore(data.score);

    kpiEl.innerHTML =
      renderKpis(data.kpiMapping);

    gapsEl.innerHTML =
      renderGaps(data.gaps);

    questionsEl.innerHTML =
      renderQuestions(data.followUpQuestions);

  } catch (error) {

    console.error(error);

    alert(
      error.message || "Error connecting to backend"
    );

  } finally {

    analyzeBtn.disabled = false;

    analyzeBtn.textContent = "Run Analysis";

  }

});