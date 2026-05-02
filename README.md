# watts-brewing-app

This project is a smart energy harvesting and analytics system designed for MRT/LRT infrastructure. 

It captures energy from:
- Kinetic energy (train movement)
- Vibration energy (track impact)
- Airflow energy (train-induced wind)

The system visualizes real-time energy generation and uses AI to generate insights, predictions, and optimization recommendations.

# Key Features

- Real-time energy dashboard
- Multi-source energy tracking (kinetic, vibration, airflow)
- Trend visualization per energy type
- AI-powered insights & predictions (Gemini API)
- Station performance ranking system
- Cached AI responses for performance optimization
- Responsive UI with modern dashboard design

# Tech Stack

Frontend:
- Next.js / React
- Tailwind CSS
- ShadCN UI
- Recharts

Backend:
- Node.js
- Express.js
- Gemini API (@google/generative-ai)

Other:
- REST API architecture
- In-memory caching for AI optimization
- MongoDB database

# Deployed Live URL

Frontend: https://watts-brewing-app.vercel.app/

Backend: https://watts-brewing-app.onrender.com/

Demo Login Credential:
- Username: admin
- Password: admin123

# Local Development

Frontend: http://localhost:3000

Backend: http://localhost:5000

# Environment Variables

This is for better understanding of the structure, the actual keys are not shown below.

Backend (.env):
- GEMINI_API_KEY=your_api_key_here
- MONGO_URI=mongodb_uri
- JWT_SECRET=jwt_secret_key
- FRONTEND_URL="https://watts-brewing-app.vercel.app"

Frontend (.env):
- NEXT_PUBLIC_BACKEND_URL="https://watts-brewing-app.onrender.com"

# Author

Built by: Chen Chor Yan (Team Teapot)

For: UM Technothon 2026