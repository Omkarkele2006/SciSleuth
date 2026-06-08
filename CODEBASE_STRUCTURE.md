# SciSleuth Codebase Structure & Function Map

## Folder Tree

```
SciSleuth/
├── README.md
├── CODEBASE_STRUCTURE.md (this file)
├── .git/
├── .gitignore
├── node_modules/
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── eslint.config.mjs
    ├── next-env.d.ts
    │
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   ├── globals.css
        │   ├── favicon.ico
        │   ├── logo.jpg
        │   │
        │   ├── api/
        │   │   └── explain/
        │   │       └── route.ts
        │   │
        │   ├── diagnostic/
        │   │   └── page.tsx
        │   │
        │   ├── results/
        │   │   └── page.tsx
        │   │
        │   ├── graph/
        │   │   └── page.tsx
        │   │
        │   └── teacher/
        │       └── page.tsx
        │
        ├── components/
        │   ├── QuestionCard.tsx
        │   └── GraphCanvas.tsx
        │
        ├── data/
        │   ├── questions.ts
        │   ├── misconceptions.ts
        │   ├── repairs.ts
        │   └── graph.ts
        │
        ├── lib/
        │   ├── evaluateDiagnostic.ts
        │   ├── evaluateGraphHealth.ts
        │   ├── buildExplanationPrompt.ts
        │   └── getNodeMisconceptions.ts
        │
        └── types/
            ├── question.ts
            ├── misconception.ts
            ├── repair.ts
            ├── graph.ts
            └── aiExplanation.ts
```

---

## File-by-File Breakdown with Functions

### 📄 ROOT LEVEL

#### `package.json`
- **Purpose**: Project metadata and dependencies
- **Key Dependencies**:
  - `next@16.2.7` - React framework
  - `react@19.2.4` - UI library
  - `@google/genai@2.8.0` - Gemini API SDK
  - `tailwindcss@4` - Styling
  - `d3@7.9.0` - Data visualization (unused)

---

### 🏗️ APPLICATION PAGES (`src/app/`)

#### `layout.tsx`
- **Purpose**: Root layout wrapper for all pages
- **Key Functions**:
  - `RootLayout()` - Wraps entire app, sets up fonts, applies global styling
  - Imports Geist fonts from Google Fonts
  - Sets metadata title: "SciSleuth"

#### `page.tsx` (Landing Page)
- **Purpose**: Hero landing page with CTA button
- **Key Functions**:
  - `Page()` - Renders landing page with gradient backgrounds
  - Displays "SciSleuth" hero with project description
  - Shows features grid (Diagnostic, Detection, Graph, Analytics)
  - Links to `/diagnostic` route with "Start Diagnostic" button
  - Uses radial gradients and ambient glows for visual appeal

#### `globals.css`
- **Purpose**: Global styling and theme variables
- **Content**:
  - Tailwind CSS imports
  - Dark mode color scheme
  - Root CSS variables for colors and fonts
  - Grid background pattern

---

### 🔄 DIAGNOSTIC FLOW (`src/app/diagnostic/`)

#### `diagnostic/page.tsx`
- **Purpose**: Question navigation and answer collection
- **Key Functions**:
  - `DiagnosticPage()` - Main component managing diagnostic flow
  - `handleNext()` - Navigate to next question or finish
  - `handleSelectAnswer(optionIndex)` - Save selected answer
  - **State**:
    - `currentQuestionIndex` - Track which question user is on
    - `answers` - Record<number, number> mapping question ID to option index
  - **Logic Flow**:
    1. Load current question from questions array
    2. Display QuestionCard component
    3. On "Next": Move to next question or finish
    4. On "Finish": Call `evaluateDiagnostic()`, save results to localStorage, redirect to `/results`

---

### 📊 RESULTS & AI EXPLANATIONS (`src/app/results/`)

#### `results/page.tsx`
- **Purpose**: Display diagnosed misconceptions with AI-generated explanations
- **Key Functions**:
  - `ResultsPage()` - Main results component
  - `getSeverity(misconceptionCount)` - Calculate risk level (High/Medium/Low)
  - `severityStyle(severity)` - Return Tailwind CSS classes for severity badge
  - `HealthBar()` - Helper component for progress bars
  - `InsightRow()` - Helper component for insight display
  - `GraphPreview()` - Helper component for SVG graph preview
  - **State**:
    - `misconceptions` - Loaded from localStorage
    - `aiExplanations` - Record<string, {explanation, mission}>
    - `open` - Track expanded misconception accordion
  - **On Mount Effect**:
    1. Fetch misconceptions from localStorage
    2. For each misconception, POST to `/api/explain`
    3. Collect AI-generated explanations and mission steps
    4. Update state with results
  - **Computed Values**:
    - `graphHealth` - % of concepts that are healthy
    - `riskLevel` - High/Medium/Low based on misconception count
    - `metrics` - Array of stats cards (computed from state)
  - **Display Sections**:
    1. Hero summary with metrics
    2. AI Cognitive Analysis panel
    3. Misconception cards (accordion) with AI guidance + repair path
    4. Recovery Journey progress indicator
    5. Knowledge Graph CTA with Link to `/graph`

---

### 📈 KNOWLEDGE GRAPH (`src/app/graph/`)

#### `graph/page.tsx`
- **Purpose**: Visualize concept health and detect broken nodes
- **Key Functions**:
  - `GraphPage()` - Main component
  - **State**:
    - `brokenNodes` - Array of node IDs affected by misconceptions
    - `misconceptions` - Loaded from localStorage
  - **On Mount Effect**:
    1. Fetch misconceptions from localStorage
    2. Call `evaluateGraphHealth()` to get broken nodes
  - **Computed Values**:
    - `brokenCount` - Count of broken nodes
    - `healthyCount` - Total nodes minus broken count
    - `graphHealth` - % of concepts that are healthy
  - **Display**:
    - Stats: Broken/Healthy/Total concept counts
    - Health bar showing concept health %
    - GraphCanvas component with hover interactivity
    - Legend showing node colors (green=healthy, red=broken)

---

### 👨‍🏫 TEACHER ANALYTICS (`src/app/teacher/`)

#### `teacher/page.tsx`
- **Purpose**: Teacher dashboard showing misconception statistics
- **Key Functions**:
  - `TeacherPage()` - Main component
  - **Hardcoded Data**: `analytics` array with 4 misconceptions
    - Each has: name, count (%), severity (high/medium/low)
  - **Display Sections**:
    1. "Most Common Misconceptions" - Grid of cards with severity badges
    2. "Misconception Distribution" - Horizontal progress bars
  - **Note**: Currently static; in production should aggregate from all student diagnostics

---

### 🔌 API ROUTES (`src/app/api/`)

#### `api/explain/route.ts`
- **Purpose**: Backend API endpoint for AI explanation generation
- **Key Functions**:
  - `POST(request)` - Handle explanation requests
  - **Request Body**:
    ```json
    {
      "misconceptionName": string,
      "brokenConcept": string,
      "description": string
    }
    ```
  - **Logic**:
    1. Extract misconception details from request
    2. Call `buildExplanationPrompt()` to create Gemini prompt
    3. Initialize GoogleGenAI client with GEMINI_API_KEY
    4. Call `ai.models.generateContent()` with gemini-2.5-flash model
    5. Parse JSON response from Gemini
    6. Extract `explanation` and `mission` fields
    7. Return as NextResponse.json
  - **Error Handling**:
    - Catches quota errors (HTTP 429)
    - Returns fallback message if Gemini fails
    - Cleans JSON formatting (removes markdown code blocks)

---

### 🧩 COMPONENTS (`src/components/`)

#### `QuestionCard.tsx`
- **Purpose**: Reusable component for displaying diagnostic questions
- **Props**:
  ```typescript
  {
    question: string,
    options: string[],
    selectedOption: number | null,
    onSelect: (index: number) => void
  }
  ```
- **Key Functions**:
  - `QuestionCard()` - Renders question with multiple choice buttons
  - Highlights selected option with blue background
  - Calls `onSelect(index)` when button is clicked

#### `GraphCanvas.tsx`
- **Purpose**: SVG-based interactive knowledge graph visualization
- **Props**:
  ```typescript
  {
    brokenNodes: string[],
    misconceptions: Misconception[]
  }
  ```
- **Key Functions**:
  - `GraphCanvas()` - Main component
  - **State**:
    - `hoveredNode` - Currently hovered node ID
  - **Features**:
    - Renders SVG with circles (nodes) and lines (edges)
    - Node colors: Red = broken, Green = healthy
    - Hover tooltip showing:
      - Node label
      - Status (Broken/Healthy)
      - List of misconceptions affecting this node
    - Uses `getNodeMisconceptions()` to fetch misconceptions for hovered node
  - **Hardcoded Positions**: Object with X,Y coordinates for 5 nodes

---

### 📚 BUSINESS LOGIC (`src/lib/`)

#### `evaluateDiagnostic.ts`
- **Purpose**: Core misconception detection algorithm
- **Key Functions**:
  - `evaluateDiagnostic(questions, answers)` → Misconception[]
  - **Algorithm**:
    1. Iterate through all questions
    2. Compare selected answer to correct answer
    3. If wrong: Get misconception code from question.misconceptions[selectedAnswer]
    4. Fetch misconception data from misconceptions.ts
    5. Add to detectedMisconceptions array
    6. Return all detected misconceptions
  - **Input**: 
    - questions: Question[]
    - answers: Record<number, number> (question ID → selected option index)
  - **Output**: Misconception[]

#### `evaluateGraphHealth.ts`
- **Purpose**: Map misconceptions to broken graph nodes
- **Key Functions**:
  - `evaluateGraphHealth(misconceptions)` → string[]
  - **Algorithm**:
    1. Create Set<string> for unique node IDs
    2. For each misconception, add its graphNodeId to set
    3. Convert set to array and return
  - **Use Case**: Determines which concept nodes are "broken" in the knowledge graph

#### `buildExplanationPrompt.ts`
- **Purpose**: Construct prompt template for Gemini AI
- **Key Functions**:
  - `buildExplanationPrompt(misconceptionName, brokenConcept, description)` → string
  - **Returns**: Formatted prompt with:
    - Context: "You are an expert physics tutor"
    - Input: Misconception details
    - Instructions: 7-step explanation task
    - Constraints: <120 words, no equations, beginner-friendly
    - Output format: JSON with `explanation` and `mission` fields
  - **Used By**: `api/explain/route.ts` to query Gemini

#### `getNodeMisconceptions.ts`
- **Purpose**: Filter misconceptions affecting a specific graph node
- **Key Functions**:
  - `getNodeMisconceptions(nodeId, misconceptions)` → Misconception[]
  - **Algorithm**: Filter misconceptions array where graphNodeId === nodeId
  - **Used By**: GraphCanvas for hover tooltip

---

### 🏷️ TYPES (`src/types/`)

#### `question.ts`
```typescript
type Question = {
  id: number,
  question: string,
  options: string[],
  correctAnswer: number,
  misconceptions: {[optionIndex: number]: string}
}
```

#### `misconception.ts`
```typescript
type Misconception = {
  code: string,
  name: string,
  description: string,
  brokenConcept: string,
  graphNodeId: string
}
```

#### `repair.ts`
```typescript
type Repair = {
  misconceptionCode: string,
  title: string,
  explanation: string
}
```

#### `graph.ts`
```typescript
type GraphNode = {id: string, label: string}
type GraphEdge = {source: string, target: string}
```

#### `aiExplanation.ts`
```typescript
type AIExplanation = {
  misconceptionName: string,
  explanation: string
}
```

---

### 📋 STATIC DATA (`src/data/`)

#### `questions.ts`
- **Purpose**: 5 diagnostic questions on Newton's Laws
- **Structure**: Question[] with:
  - id: 1-5
  - question: String
  - options: 4 answer choices
  - correctAnswer: Index of correct option
  - misconceptions: Object mapping wrong options to misconception codes
- **Example**:
  ```typescript
  {
    id: 1,
    question: "What is Newton's First Law?",
    options: ["Motion requires force", "Objects resist changes", ...],
    correctAnswer: 1,
    misconceptions: {0: "NEWTON_1_FORCE_REQUIRED", 2: "FORCE_IN_DIRECTION_OF_MOTION"}
  }
  ```

#### `misconceptions.ts`
- **Purpose**: Registry of 5 physics misconceptions
- **Structure**: Record<string, Misconception> with:
  - NEWTON_1_FORCE_REQUIRED
  - BALANCED_FORCE_MEANS_REST
  - FORCE_IN_DIRECTION_OF_MOTION
  - FORCE_IMBALANCE_COLLISION
  - MASS_SPEED_CONFUSION
- **Each has**: code, name, description, brokenConcept, graphNodeId

#### `repairs.ts`
- **Purpose**: Repair pathways for each misconception
- **Structure**: Record<string, Repair> mapping misconception code to repair
- **Each has**: misconceptionCode, title, explanation (static text)

#### `graph.ts`
- **Purpose**: Knowledge graph structure
- **Content**:
  - `nodes`: 5 GraphNode objects
    - newton_first_law
    - net_force
    - balanced_forces
    - newton_second_law
    - newton_third_law
  - `edges`: 4 GraphEdge connections
    - newton_first_law → net_force
    - net_force → balanced_forces
    - net_force → newton_second_law
    - net_force → newton_third_law

---

## Data Flow Summary

```
User Flow:
  Landing (/page.tsx)
    ↓ [Start Diagnostic]
  Diagnostic (/diagnostic/page.tsx)
    • Load questions[0]
    • User selects answer
    • Save to state: answers[questionId] = optionIndex
    • On "Finish": evaluateDiagnostic() → misconceptions[]
    • Save to localStorage["misconceptions"]
    ↓
  Results (/results/page.tsx)
    • Load from localStorage
    • For each misconception: POST /api/explain
    • Gemini generates explanation + mission steps
    • Display results with metrics
    ↓ [View Knowledge Graph]
  Graph (/graph/page.tsx)
    • Load misconceptions from localStorage
    • evaluateGraphHealth() → brokenNodes[]
    • Visualize graph with broken nodes highlighted
    • Hover nodes to see affected misconceptions
```

---

## Environment Variables Required

```bash
GEMINI_API_KEY=<your-gemini-2.5-flash-lite-api-key>
```

---

## Key Technologies

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| AI | Google Gemini 2.5 Flash |
| State | React useState + localStorage |
| Icons | Lucide Icons |

---

## Deployment Ready

✅ Type-safe with TypeScript  
✅ API integration with error handling  
✅ Responsive design with Tailwind  
✅ Progressive enhancement (localStorage)  
✅ Clean code organization  
✅ Ready for hackathon demo
