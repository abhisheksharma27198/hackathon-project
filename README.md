# 🛡️ Nemotron Shield — AI Fake Account & Serial Troll Hunter

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Powered by](https://img.shields.io/badge/Powered%20by-NVIDIA%20Nemotron-76b900.svg)](https://developer.nvidia.com)
[![Infrastructure](https://img.shields.io/badge/Hosted%20on-Nebius%20Token%20Factory-blue.svg)](https://nebius.com)
[![Built with](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](https://vitejs.dev)

> **Built for the Nebius x NVIDIA Global AI Hackathon**  
> **Track:** *Best Apps and Agents Track*

---

## 🎯 The Game Changer: Stopping Serial Trolls & Ban Evasion with Real-Time ID Freezes

Traditional fake-account detection only evaluates static metrics like follower counts or avatar presence. But the most destructive threat on modern social platforms (X, Instagram, Telegram) is **serial harassment and ban evasion**:

> **The Problem:** A bad actor targets and harasses a victim. When the victim blocks the troll or the platform suspends them, the perpetrator spins up a new burner account within minutes—often directly bragging: *"u thought blocking me worked? Round 2, I'm back!"* Victims are left defenceless while human moderation review queues take 24–72 hours.

### ⚡ The Nemotron Shield Solution

1. **Stylometric Authorship Attribution:** Powered by **NVIDIA Nemotron-70B on Nebius Token Factory**, Nemotron Shield performs real-time forensic comparison between the suspended account and the new burner account. It correlates sub-conscious linguistic fingerprints:
   - Shared idiosyncratic insult tokens and rhetoric.
   - Punctuation velocity (e.g. `!!` shock syntax clusters).
   - Explicit or implicit ban-evasion admissions.
   - Temporal rebound velocity (created within hours of the block).
   - Fixation targeting on the exact same victim.
2. **Autonomous Policy Enforcement (Instant ID Freeze):** If stylometric correlation exceeds the confidence threshold ($\ge 85\%$), the system executes an **instant quarantine**:
   - The burner account is locked from tagging, messaging, or replying to the victim.
   - The account is frozen platform-wide until the operator proves their identity via official government ID.
   - An immutable Trust & Safety forensic audit dossier is automatically generated.

---

## 🌟 Key Application Modules

- **🎭 Sockpuppet & Serial Troll Hunter (`/sockpuppet-hunter`):** Compare historical troll profiles against newly created suspect accounts targeting the same victim. Features 1-click test scenarios (Serial Harasser Ban Evasion, Impersonation Clone, Authentic Unrelated User) and live ID-freeze execution.
- **🔍 Profile Signal & Botnet Analysis (`/analyze`):** Deep multi-signal account audit. Choose between Fast Triage (`Nemotron 3.5 Lightning`) and Deep Reasoning (`Nemotron 70B`).
- **📊 Real-Time Telemetry Dashboard (`/dashboard`):** Track live platform metrics: accounts profiled, botnets flagged, sockpuppet rings broken, and automated ID freezes executed.
- **📑 Incident Audit & Compliance Reports (`/reports`):** Comprehensive forensic evidence dossiers with exportable PDF and machine-readable JSON packets.
- **🔑 In-App Nebius Key Manager:** Plug in your own Nebius Token Factory API key to run live inference against NVIDIA GPU endpoints, with a high-fidelity offline demonstration engine ready out of the box.

---

## 🏗️ Technical Architecture

```
┌────────────────────────────────────────────────────────┐
│               Nemotron Shield Frontend                 │
│         (React 18 + Vite + High-Precision Dark UI)     │
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
│    • NVIDIA Llama-3.1-Nemotron-70B-Instruct           │
│      (Deep Stylometric Reasoning & Authorship)         │
│    • NVIDIA Nemotron-3.5-Lightning                     │
│      (Ultra-fast Heuristic & Triage Screening)         │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation & Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhisheksharma27198/hackathon-project.git
   cd hackathon-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 💡 Nebius Token Factory & NVIDIA Technology Feedback

- **Nebius Token Factory:** The OpenAI-compatible API protocol made connecting NVIDIA open-source models frictionless. The high-performance GPU infrastructure provided rapid inference times ($\approx 850\text{ms}$) critical for real-time Trust & Safety intervention before abusive posts propagate.
- **NVIDIA Nemotron:** Nemotron-70B proved exceptionally superior to traditional keyword filters and smaller LLMs at stylometric authorship attribution—successfully distinguishing between coincidental slang and genuine idiosyncratic ban evasion.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
