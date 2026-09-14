import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '12mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      platform: 'TrioMadhyamik GimiDoubt Server'
    });
  });

  // 🤖 GimiDoubt Clear API Route powered by Gemini AI
  app.post('/api/gemini-doubt', async (req, res) => {
    const { question, subjectName, chapterName, imageBase64 } = req.body;

    if (!question && !imageBase64) {
      return res.status(400).json({ error: 'Question or image is required' });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return signal to use client-side comprehensive educational generator
      return res.json({
        success: false,
        fallbackToOffline: true,
        message: 'No GEMINI_API_KEY found, fallback to built-in curriculum engine'
      });
    }

    try {
      const prompt = `You are "GimiDoubt", an expert AI educational assistant for West Bengal Board of Secondary Education (WBBSE) Class 10 (Madhyamik 2027) students.
The student has asked a question:
Subject: "${subjectName || 'সাধারণ'}"
Chapter: "${chapterName || 'সাধারণ'}"
Question: "${question || 'See image'}"

Provide a comprehensive, pedagogical, easy-to-understand answer in Bengali suitable for Madhyamik 2027.
Always determine the most effective educational visual:
- If a 3D model is ideal (e.g., DNA, Neuron, Heart, Brain, Human Eye, Cell, Atom, Molecule, Volcano, Earth structure, Nephron, Chloroplast, Mirror/Lenses), specify visualType: "3d_model" and identify the related3DModelId (one of "dna", "neuron", "heart", "brain", "eye", "cell", "atom", "volcano", "earth", "nephron", "chloroplast").
- If 3D is not suitable, choose the best 2D diagram/graph:
  * Mathematics: "quadratic_parabola", "trigonometry_circle", "pythagoras_triangle", "coordinate_graph", or "circle_theorem".
  * Biology: "neuron_diagram", "cell_diagram", "reflex_arc", "mendel_cross", or "heart_diagram".
  * Physical Science: "boyles_law", "charles_law", "ohms_law", "concave_mirror", "electrolysis_cell", or "ray_refraction".
  * Geography: "rain_shadow", "volcano_structure", "oxbow_lake_delta", or "fold_mountain".
  * History: "swadeshi_timeline" or "concept_flowchart".
  * Bengali/English: "karok_tree", "tense_timeline", or "concept_flowchart".

Return ONLY a valid JSON object with the following structure:
{
  "questionBn": "সংক্ষিপ্ত ও স্পষ্ট বাংলা প্রশ্ন",
  "subjectName": "${subjectName || 'সাধারণ'}",
  "chapterName": "${chapterName || 'সাধারণ'}",
  "scientificTermEn": "Standard English Scientific Term or Concept Name",
  "visualType": "one of the visual types listed above",
  "related3DModelId": "3D model ID if applicable or null",
  "visualTitleBn": "চিত্র বা মডেলের শিরোনাম বাংলায়",
  "visualCaptionBn": "চিত্রের সংক্ষিপ্ত ব্যাখ্যা বাংলায়",
  "labeledParts": [
    { "id": "part1", "nameBn": "বাংলা নাম", "nameEn": "English Term", "descriptionBn": "কাজ বা বিবরণ" }
  ],
  "explanationStepsBn": [
    { "stepTitleBn": "১ম ধাপের নাম", "stepEn": "Step 1 English", "detailsBn": "সহজ বাংলা ব্যাখ্যা" }
  ],
  "importantTermsWithEn": [
    { "bn": "বাংলা পরিভাষা", "en": "English Term" }
  ],
  "examTipBn": "মাধ্যমিক ২০২৭ পরীক্ষার জন্য গুরুত্বপূর্ণ পরামর্শ ও সাধারণ ভুল এড়ানোর উপায়"
}`;

      let contents: any = prompt;

      if (imageBase64 && typeof imageBase64 === 'string') {
        const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const mimeType = matches ? matches[1] : 'image/jpeg';
        const data = matches ? matches[2] : imageBase64;

        contents = [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType,
                  data
                }
              }
            ]
          }
        ];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);

      return res.json({
        success: true,
        data: {
          ...parsed,
          source: 'gemini-ai'
        }
      });
    } catch (err: any) {
      console.error('Gemini API Error in /api/gemini-doubt:', err);
      // Fallback response signaling client synthesis
      return res.json({
        success: false,
        fallbackToOffline: true,
        error: err.message || 'Error communicating with Gemini AI'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TrioMadhyamik server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
