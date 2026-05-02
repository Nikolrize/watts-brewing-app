const { GoogleGenerativeAI } = require("@google/generative-ai");
const stations = require("../data/mockStations");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let cachedAIResponse = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

const getAIInsights = async (req, res) => {
  try {
    const now = Date.now();

    if (cachedAIResponse && now - lastFetchTime < CACHE_DURATION) {
      return res.json({
        success: true,
        data: cachedAIResponse,
        cached: true,
      });
    }

    const totalEnergy = stations.reduce((sum, s) => sum + s.total_kWh, 0);
    const simplifiedStations = stations.map((s) => ({
      name: s.name,
      total_kWh: s.total_kWh,
      kinetic: s.kinetic,
      vibration: s.vibration,
      airflow: s.airflow,
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
    });

    const prompt = `
    You are an AI energy analytics system for an MRT energy harvesting platform.

    Analyze this data:
    ${JSON.stringify({
      stations: simplifiedStations,
      totalEnergy,
    })}

    Return ONLY valid JSON:
    {
      "prediction": {
        "nextPeakTime": "string",
        "expectedEnergy_kWh": number
      },
      "insights": ["string"],
      "anomalies": ["string"],
      "recommendations": ["string"],
      "systemHealthScore": number
    }

    Rules:
    - nextPeakTime should be like 19:00-22:30
    - systemHealthScore must be 0-100
    - insights must be short and technical
    - recommendations must be actionable
    - do not include fullstop at the end of sentence
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    cachedAIResponse = parsed;
    lastFetchTime = now;

    res.json({
      success: true,
      data: parsed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};

module.exports = { getAIInsights };
