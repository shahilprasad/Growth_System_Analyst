# Heidi Growth Agent

## About The Project
The **Heidi Growth Intelligence Agent** is a system designed to solve the primary bottleneck of a rapidly scaling startup: the manual analysis of user behavior across diverse global markets. As Heidi grows to support millions of clinicians in 116 countries, growth managers can no longer manually identify "high-potential" users or clinical friction points.

This project leverages a Reasoning LLM (Gemini 3 Pro) to ingest raw clinical metadata and generate actionable growth signals. It moves the team from a defensive, calendar-based marketing strategy to an offensive, trigger-based "Signal Actioning" workflow.

**The Goal:** Provide 10x leverage to the growth team by automating the "intelligence" layer of the user lifecycle.

## Deliverablles
### Deliverable 1: Working Prototype
The system is built as a functional React/TypeScript artifact, emphasising execution over theoretical polish.
- Live Deployment Link: [Vercel Deployment](https://heidigrowthsystemanalyst.vercel.app/)
- GitHub Repository: [GitHub Repo](https://github.com/shahilprasad/Growth_System_Analyst)
- The Tech Stack: * Frontend: React + TypeScript (Vite).
    - Intelligence: Gemini 3 Pro via Google Generative AI SDK.
    - Architecture: Multi-step reasoning chain that parses session volume, specialty context, and feature adoption.

### Deliverable 2: A clear before/after comparison of the workflow

| Metric               | Before (Manual Analysis)                          | After (AI-Enabled Agent)                        |
|----------------------|--------------------------------------------------|------------------------------------------------|
| Analysis Speed       | ~25 min per clinician to review patient data     | Sub-minute. The agent processes entire patient records simultaneously. |
| Personalization      | Generic, one-size-fits-all lifecycle emails.                     | Specialty-aware "Clinical Nudges" using targeted terminology (e.g., GP vs. Orthopedic). |
| Error Rate           | High risk of missing quiet power-users or burnout signals in large datasets.          | Adaptive pattern recognition identifies "quiet" high-value signals instantly. |
| Team Leverage        | Scalability is capped by the number of Growth Managers. | Exponential scaling. One manager can oversee 116 countries with one agent. |     

### Deliverable 3: Short Demo / Walkthrough
This video demonstrates the underlying hardware, the logic of the reasoning engine, and how it transforms raw data into clinical insights.

<div>
    <a href="https://www.loom.com/embed/4d88b1c74c0a4d81bba03d847493db19">
      <img src="https://cdn.loom.com/sessions/thumbnails/4d88b1c74c0a4d81bba03d847493db19-5e2c204ab65c41ad-full-play.gif#t=0.1">
    </a>
  </div>

### Deliverable 4: Team Adoption Plan
Heidi's growth team can adopt this immediately via a **Human-in-the-Loop** model:
* **Confidence Scoring:** The agent assigns a 0-100% confidence score to every signal.
* **Signal Digest:** High-confidence signals ( >90%) can be auto-queued to CRM (Braze/Omni), while low-confidence signals are flagged for manager review.
* **Zero Friction:** Pushes "Top 5 High-Value Actions" to Slack daily.

### Example AI Output:
 Signal Detected: Specialty: Physiotherapist | Location: UK | Status: High Volume / High Friction
 
 Reasoning: "User has created 40+ notes in 5 days but has not used the 'Initial Assessment' shortcut. They are manually typing SOAP headers."
 
 "Recommended Nudge: "Hi [Name], I noticed you're handling a heavy load of initial assessments this week. Did you know our 'Physio Assessment' shortcut can cut your documentation time by 40%? Here’s how to enable it..."