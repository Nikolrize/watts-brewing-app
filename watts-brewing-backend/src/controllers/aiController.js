const { GoogleGenerativeAI } = require("@google/generative-ai");
const stations = require("../data/mockStations");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIInsights = async (req, res) => {
  try {
    const totalEnergy = stations.reduce((sum, s) => sum + s.total_kWh, 0);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    You are an AI energy analytics system for an MRT energy harvesting platform.

    Analyze this data:
    ${JSON.stringify({ stations, totalEnergy })}

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
    - systemHealthScore must be 0-100
    - insights must be short and technical
    - recommendations must be actionable
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

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
