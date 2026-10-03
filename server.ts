import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// POST /api/understand-moment
app.post('/api/understand-moment', async (req, res) => {
  try {
    const { imageBase64, mimeType, voiceTranscript, textNote, scenarioHint } = req.body;

    if (!ai) {
      // Fallback if no API key configured
      return res.json({
        success: true,
        isAIGenerated: false,
        moment: {
          title: scenarioHint ? `${scenarioHint} Context` : 'Captured Continuum Moment',
          contextSummary: voiceTranscript || textNote || 'Structured context extracted from captured visual and audio.',
          extractedText: 'Finish prototype\nReview pricing\nPrepare investor deck\nDeadline: Friday',
          actions: [
            { id: `act-${Date.now()}-1`, title: 'Finish prototype', completed: false },
            { id: `act-${Date.now()}-2`, title: 'Review pricing', completed: false },
            { id: `act-${Date.now()}-3`, title: 'Prepare investor deck', completed: false },
          ],
          deadline: 'Friday',
          entities: ['Team Core', 'Lead Designer'],
          decisions: ['Prioritize prototype completion before Friday investor review'],
          unresolvedQuestions: ['Confirm final pricing tiers before deck finalization'],
          suggestedNextAction: {
            action: 'Complete the interactive prototype before finalizing pricing numbers.',
            reasoning: 'Prototype screen transitions validate the core value proposition needed for the deck.',
          },
        },
      });
    }

    const promptText = `You are Origin Continuum AI Context Engine. 
Analyze the provided visual context (if any), voice transcript (${voiceTranscript || 'None provided'}), and notes (${textNote || 'None'}).
Extract a high-fidelity, grounded Continuum Moment.
Rules:
- NEVER invent people's names, commitments, or deadlines not explicitly stated in the visual or voice context.
- If deadline is missing or ambiguous, mark it as "Not specified".
- Extract crisp actionable tasks.
- Identify real decisions made and unresolved open questions.
- Suggest the logical next single step with concrete reasoning.`;

    const parts: any[] = [];
    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: imageBase64.replace(/^data:[^;]+;base64,/, ''),
          mimeType: mimeType,
        },
      });
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Concise title of the moment' },
            contextSummary: { type: Type.STRING, description: 'Short summary of what was captured' },
            extractedText: { type: Type.STRING, description: 'OCR text detected verbatim' },
            deadline: { type: Type.STRING, description: 'Deadline if explicitly mentioned, or "Not specified"' },
            actions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  completed: { type: Type.BOOLEAN },
                  assignee: { type: Type.STRING },
                },
                required: ['id', 'title', 'completed'],
              },
            },
            entities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'People or organizations explicitly mentioned',
            },
            decisions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Decisions explicitly taken',
            },
            unresolvedQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Open questions requiring clarification',
            },
            suggestedNextAction: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING },
                reasoning: { type: Type.STRING },
              },
              required: ['action', 'reasoning'],
            },
          },
          required: ['title', 'contextSummary', 'actions', 'deadline'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    // Ensure ids on actions
    if (Array.isArray(parsed.actions)) {
      parsed.actions = parsed.actions.map((act: any, idx: number) => ({
        id: act.id || `act-${Date.now()}-${idx + 1}`,
        title: act.title || 'Task',
        completed: Boolean(act.completed),
        assignee: act.assignee || undefined,
      }));
    }

    return res.json({
      success: true,
      isAIGenerated: true,
      moment: parsed,
    });
  } catch (err: any) {
    console.error('Error in /api/understand-moment:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to understand moment',
    });
  }
});

// POST /api/suggest-next-step
app.post('/api/suggest-next-step', async (req, res) => {
  try {
    const { moment } = req.body;
    if (!moment) {
      return res.status(400).json({ error: 'Missing moment data' });
    }

    if (!ai) {
      const pendingTask = moment.actions?.find((a: any) => !a.completed)?.title || 'Review all items';
      return res.json({
        suggestion: `Focus on: ${pendingTask}`,
        reasoning: `This is the next uncompleted task in your ${moment.title} workflow.`,
        confidence: 0.95,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Given the following Continuum Moment context:
Title: ${moment.title}
Summary: ${moment.contextSummary}
Deadline: ${moment.deadline || 'None'}
Tasks: ${JSON.stringify(moment.actions)}
Decisions: ${JSON.stringify(moment.decisions || [])}
Unresolved Questions: ${JSON.stringify(moment.unresolvedQuestions || [])}

Recommend the single most impactful NEXT STEP. Return JSON with 'suggestion', 'reasoning', and 'confidence' (0-1). Never claim a task was already finished.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestion: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ['suggestion', 'reasoning'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/suggest-next-step:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Setup Vite middleware in dev or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Origin Continuum server running at http://localhost:${PORT}`);
  });
}

startServer();
