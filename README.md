# Origin Continuum

A prototype for AI-powered contextual continuity across phone and PC.

> Don't transfer what you were doing. Transfer what you need to continue.
>
> Your Context. Your Control.

## What It Does

A user intentionally captures a meaningful moment, adds a text annotation, and sends the image and text to a multimodal model through OpenRouter. The backend returns a structured Continuum Moment for review, including a summary, tasks, deadline, and source reference. The reviewed context can then be opened in a PC / Office Kit concept screen.

## Product Flow

```text
CAPTURE → UNDERSTAND → STRUCTURE → CONTINUE
```

## Architecture

```text
Phone camera or image upload
        ↓
React / TypeScript frontend
        ↓
Express POST /api/understand
        ↓
OpenRouter multimodal API
        ↓
Structured JSON
        ↓
Continuum Moment review
        ↓
PC / Office Kit concept
```

## Implemented

- Real device photo capture and image upload
- Optional user-entered text annotation
- React and TypeScript frontend
- Express backend with a server-side OpenRouter API key
- OpenRouter multimodal request with structured JSON output
- Continuum Moment review, task list, deadline, and source display
- Local environment-based API key and configurable model
- Explicit error and retry state when OpenRouter is unavailable
- Deterministic Demo Mode, separate from live OpenRouter processing

Voice input is not implemented; the interface labels it as planned.

## Prototype Concepts

The phone-to-PC continuation experience and Office Kit handoff are interface concepts, not connected device services. This prototype does not include native OriginOS integration or a live Office Kit API integration.

## Run Locally

Requirements: Node.js 20 or newer and an OpenRouter API key with access to the configured model for live processing.

```bash
npm install
```

Create a local `.env` file from `.env.example` and set:

```dotenv
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=qwen/qwen3.8-27b:free
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`. Use **Capture** to take or upload an image, add an optional text annotation, and choose **Understand**. If the OpenRouter key, model access, or account limits prevent processing, the app reports an error and offers retry; **Demo Mode** remains available for a deterministic sample.

For deployment checks, `GET /api/health` reports the active provider, model, and whether the server has a configured key. It never returns the key itself.

## Validation

```bash
npm run lint
npm run build
```
