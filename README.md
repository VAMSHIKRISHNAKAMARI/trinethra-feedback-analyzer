# Trinethra Feedback Analyzer

AI-assisted behavioral assessment system for analyzing supervisor feedback transcripts using local LLMs with Ollama.

## Overview

This project analyzes supervisor transcripts and generates:

- Behavioral evidence
- Rubric-based scoring
- KPI mapping
- Gap analysis
- Follow-up questions

The application uses:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- AI Model: Ollama (llama3.2)

---

# Features

## Transcript Analysis
Paste supervisor feedback transcripts into the system.

## AI-Based Behavioral Assessment
The AI evaluates:
- execution quality
- problem-solving ability
- systems thinking
- reliability

## Structured JSON Output
The application generates:
- evidence
- rubric score
- KPI mapping
- gap analysis
- follow-up questions

## Local AI Execution
Runs completely locally using Ollama.

---

# Tech Stack

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## AI
- Ollama
- llama3.2

---

# Project Structure

```bash
trinethra-feedback-analyzer
│
├── backend
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── data
│
└── README.md
```

---

# Setup Instructions

## 1. Install Node.js

Download from:
https://nodejs.org

## 2. Install Ollama

Download from:
https://ollama.com

## 3. Pull Model

```bash
ollama pull llama3.2
```

## 4. Start Backend

```bash
cd backend
npm install
npm start
```

## 5. Open Frontend

Open:
```bash
frontend/index.html
```

---

# Sample Workflow

1. Paste transcript
2. Click Run Analysis
3. AI generates:
   - Evidence
   - Rubric Score
   - KPI Mapping
   - Gap Analysis
   - Follow-up Questions

---

# Key Learning Outcomes

- Prompt Engineering
- AI Integration
- JSON Parsing
- Frontend-Backend Communication
- Local LLM Deployment
- Behavioral Assessment Logic

---

# Future Improvements

- Better UI dashboard
- PDF export
- Transcript history
- Multi-model comparison
- Authentication system

---

# Author

Vamshi Krishna