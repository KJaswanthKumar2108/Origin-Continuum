# Origin Continuum

> **Don’t transfer what you were doing. Transfer what you need to continue.**

Origin Continuum is a proposed contextual continuity experience for iQOO/OriginOS.

Existing cross-device features excel at moving files, mirroring screens, or extending remote PC control. However, when a user transitions from a real-world interaction—such as a brainstorming session at a whiteboard or a physical document review—meaningful context is lost. Users are forced to manually re-read photos, re-extract action items, and re-type deadlines on their computer.

Origin Continuum bridges this gap by turning an intentional phone capture into temporary structured context that becomes immediately actionable on a PC workstation.

---

## The Problem

* **File Transfer** moves a file.
* **Screen Mirroring** moves a screen.
* **Remote PC** extends device control.
* **The Gap:** The user's working intent, action items, and deadlines remain trapped in unstructured images or scattered notes, forcing manual reconstruction.

---

## The Concept

Origin Continuum introduces a contextual intelligence layer. Rather than transferring passive media, it extracts the structured meaning needed to resume work:
* Paired visual capture and voice intent
* Detected tasks and actionable items
* Extracted deadlines and priority anchors
* A unified, temporary OS-level primitive: the **Continuum Moment**

---

## Core Flow

```
Capture → Understand → Structure → Continue
```

1. **Capture**: The user intentionally captures a meaningful physical or digital moment (e.g., meeting whiteboard, sprint plan).
2. **Understand**: Multimodal intelligence pairs visual geometry with spoken intent (*"Q3 product plan. I need to finish this by Friday."*) to extract structured tasks and deadlines.
3. **Remember**: A temporary structured **Continuum Moment** is formed.
4. **Continue**: Context becomes actionable on the paired workstation via an intelligent continuity handoff.

---

## The Continuum Moment

The Continuum Moment serves as the signature system primitive:
* **Context**: The original captured source (e.g., whiteboard).
* **Intent**: What the user wanted to accomplish.
* **Tasks**: Extracted actionable checklists (e.g., *Finish prototype*, *Review pricing*, *Prepare investor deck*).
* **Deadline**: Extracted time anchor (e.g., *Friday*).
* **Voice Context**: Verbatim transcribed human intent (*"I need to finish this by Friday."*).
* **State**: Temporary structured context under full user control.
* **Action**: Direct continuation on PC.

---

## Phone → PC Continuity

Origin Continuum illustrates how cross-device ecosystems can evolve beyond simple media streaming. Through a proposed extension of the existing **Office Kit** experience:
1. The phone prepares the temporary context.
2. An intelligent bridge coordinates handoff to the workstation.
3. A floating **Continuum Context Card** surfaces directly on the PC desktop.
4. One click expands the structured items into a live productivity workspace with checklists, source inspection, and working notes.

---

## Privacy

Origin Continuum is designed with a simple philosophy: **Your Context. Your Control.**

* **Intentional Capture**: Activates exclusively when the user deliberately captures a moment; never passively monitors.
* **Temporary Structured Context**: Moments function as temporary working context, not permanent archives or lifelogs.
* **User Control**: Users can inspect, complete, or delete active context at any time with immediate visual confirmation.
* **No Passive Listening**: No background microphone surveillance or ambient room recording.

---

## Technical Architecture

```
Camera / Spoken Intent
         ↓
Multimodal Context Processing
         ↓
Entity & Task Extraction
         ↓
Temporary Structured Continuum Moment
         ↓
Office Kit Continuity Bridge
         ↓
PC Continuation Workspace
```

---

## Demo

The prototype includes a deterministic **60-Second Guided Demo** designed for clear presentation:
* **0–7s**: Problem & concept introduction.
* **7–16s**: Intentional camera capture.
* **16–27s**: Spoken intent pairing.
* **27–38s**: Multi-stage AI understanding transformation.
* **38–46s**: Signature Continuum Moment formation.
* **46–55s**: Phone → PC Office Kit handoff.
* **55–60s**: Continued productivity workspace and core message.

---

## Prototype Disclosure

This application is a concept prototype demonstrating a proposed iQOO/OriginOS experience and contextual continuity layer. It illustrates how future software could extend the existing Office Kit ecosystem and is not an official iQOO or OriginOS native feature implementation.

---

## Local Setup

```bash
# Install dependencies
npm install

# Run development server (runs on port 3000)
npm run dev

# Lint codebase
npm run lint

# Build production bundle
npm run build
```
