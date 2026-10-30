# 🛡️ Nemotron Shield — AI Fake Account & Botnet Forensics

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Powered by](https://img.shields.io/badge/Powered%20by-NVIDIA%20Nemotron-76b900.svg)](https://developer.nvidia.com)
[![Infrastructure](https://img.shields.io/badge/Hosted%20on-Nebius%20Token%20Factory-blue.svg)](https://nebius.com)
[![Built with](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb.svg)](https://vitejs.dev)

> **Built for the Nebius x NVIDIA Global AI Hackathon**  
> **Track:** *Best Apps and Agents Track*

---

## 📌 Executive Summary

Modern fraudulent accounts, botnets, and impersonators no longer rely on simple repetitive scripts. Powered by LLMs, they generate hyper-realistic biographies, engage in astroturfing, and evade traditional heuristic or regex filters.

**Nemotron Shield** is an AI-powered trust-and-safety forensics application designed to detect, score, and explain suspicious social profiles and coordinated bot clusters in real time. Deployed on **Nebius Token Factory** using **NVIDIA Nemotron open models**, Nemotron Shield provides explainable risk scoring, behavioral anomaly detection, and actionable moderation audit reports.

---

## 🌟 Key Features

- **🔍 Multi-Signal Account Forensics:** Analyzes username entropy, account age, follower-to-following ratios, engagement ratios, and biography semantics.
- **🧠 NVIDIA Nemotron Reasoning:** Leverages NVIDIA's state-of-the-art open models for nuanced linguistic and behavioral analysis, detecting AI-generated persona bios and scam patterns.
- **📊 Transparent & Explainable Risk Scoring:** Outputs an objective 0–100 risk score with explicit reasoning breakdowns and confidence metrics—critical for platform moderators.
- **⚡ Moderation Dashboard:** Real-time metrics tracking total analyses, flagged accounts, suspicious ratios, and average detection latency.
- **📑 Incident Audit Reports:** Exportable moderation logs formatted for compliance, trust-and-safety investigations, and appeals.

---

## 🏗️ Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────┐
│               Nemotron Shield Frontend                 │
│         (React 18 + Vite + Modern Vanilla CSS)        │
└───────────────────────────┬────────────────────────────┘
                            │
               HTTPS / OpenAI-Compatible API
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Nebius Token Factory                  │
│       High-Performance Cloud GPU Inference (H100/H200) │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│              NVIDIA Open-Source Models                 │
│    • NVIDIA Nemotron-3.5-Lightning / Super             │
│    • NVIDIA Llama-3.1-Nemotron-70B-Instruct           │
└────────────────────────────────────────────────────────┘
```

- **Frontend:** React 18, Vite, React Router, Lucide Icons, Modern Dark UI.
- **AI Infrastructure:** Nebius Token Factory (Serverless Inference).
- **AI Models:** NVIDIA Nemotron open model family (`nvidia/llama-3.1-nemotron-70b-instruct` / `nebius/nvidia/Nemotron-3_5-Lightning`).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhisheksharma27198/hackathon-project.git
   cd hackathon-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready bundle will be generated in the `dist/` directory.

---

## 🧪 Nebius Token Factory & NVIDIA Nemotron Integration

Nebius Token Factory provides an OpenAI-compatible endpoint that powers Nemotron Shield's risk reasoning engine:

```javascript
// Example Nebius Token Factory endpoint call
const response = await fetch("https://api.tokenfactory.nebius.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${NEBIUS_API_KEY}`,
  },
  body: JSON.stringify({
    model: "nebius/nvidia/Nemotron-3_5-Lightning",
    messages: [
      {
        role: "system",
        content: "You are a Trust & Safety Forensics AI. Evaluate social profile signals for bot and fraudulent patterns. Output structured JSON."
      },
      {
        role: "user",
        content: JSON.stringify(profileData)
      }
    ],
    temperature: 0.2,
  }),
});
```

---

## 💡 Feedback on Nebius & NVIDIA Open Infrastructure

- **Nebius Token Factory:** The OpenAI-compatible API made transition and integration seamless. Serverless inference delivered fast time-to-first-token (TTFT) and high throughput without requiring manual cluster orchestrations.
- **NVIDIA Nemotron:** Nemotron excelled at nuanced semantic evaluation, catching subtle impersonation markers and synthetic bot syntax that traditional regex algorithms miss completely.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
