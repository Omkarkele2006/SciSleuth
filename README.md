# SciSleuth

**An AI-powered diagnostic tool that identifies and helps fix misconceptions about Newton's Laws.** SciSleuth goes beyond marking answers right or wrong—it detects the specific misconceptions behind wrong answers, generates personalized AI explanations, and visualizes concept health to guide learning.

## Problem

Traditional quizzes only tell you when an answer is wrong. They don't explain *why* a student answered incorrectly. A student might answer wrong because they don't understand the concept, but they might also answer wrong because they hold a specific misconception—a deeply rooted belief that contradicts the actual physics principle.

Without identifying the misconception, students repeat the same mistakes. Teachers have no visibility into which misconceptions are most common in their classroom.

## Solution

SciSleuth diagnoses misconceptions, not just wrong answers. It:

1. **Detects misconceptions** by mapping wrong answers to specific misunderstandings
2. **Maps broken concepts** to a knowledge graph so students see which concepts are affected
3. **Generates AI explanations** using Google Gemini to explain why the misconception exists and how to fix it
4. **Provides repair pathways** with targeted guidance for each misconception
5. **Tracks concept health** so teachers can see how many concepts a student understands correctly
6. **Shows patterns** through an analytics dashboard for teacher visibility

## Features

- **Diagnostic Assessment**: 5-question assessment on Newton's Laws
- **Misconception Detection**: Maps wrong answers to 5 common physics misconceptions
- **AI-Generated Explanations**: Personalized explanations powered by Gemini 2.5 Flash
- **Knowledge Graph**: Visual representation of concept relationships with color-coded health
- **Repair Pathways**: Targeted explanations for each misconception
- **Interactive Graph**: Hover over concepts to see which misconceptions affect them
- **Teacher Analytics**: Dashboard showing misconception frequency and severity
- **Concept Health Metrics**: Overall health score and risk level assessment

## Tech Stack

**Frontend**
- Next.js 16 (React Server Components)
- React 19
- TypeScript
- Tailwind CSS 4

**AI**
- Google Gemini 2.5 Flash API

## How It Works

1. Student takes a 5-question diagnostic on Newton's Laws
2. System evaluates answers against correct responses
3. Wrong answers are mapped to specific misconceptions
4. AI generates personalized explanations for each misconception
5. Results page shows misconceptions, AI explanations, and repair pathways
6. Knowledge graph visualizes which concepts are "broken" (affected by misconceptions)
7. Teacher dashboard displays aggregated misconception patterns

## Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env.local` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/src/
├── app/                    # Page routes
│   ├── page.tsx           # Landing page
│   ├── diagnostic/        # Assessment questions
│   ├── results/           # Results with AI explanations
│   ├── graph/             # Knowledge graph visualization
│   ├── teacher/           # Analytics dashboard
│   └── api/explain/       # Gemini integration endpoint
├── components/            # Reusable UI components
├── data/                  # Questions, misconceptions, repairs
├── lib/                   # Business logic
└── types/                 # TypeScript interfaces
```

## Future Improvements

- Support for additional STEM topics beyond Newton's Laws
- Adaptive questioning based on misconceptions detected
- Classroom dashboard with real student data aggregation
- Machine learning model for predicting misconceptions
- Misconception datasets from educational research
- Mobile app for on-the-go diagnostics

## License

Hackathon project. Open for educational use.