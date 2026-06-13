# SciSleuth

**Diagnose misconceptions, not mistakes.**

SciSleuth is an AI-powered educational diagnostics platform that identifies the *reason behind a student's wrong answer* rather than simply marking it incorrect.

Instead of telling students what they got wrong, SciSleuth discovers **which misconception caused the mistake**, visualizes affected concepts through a knowledge graph, generates AI-powered explanations, and provides structured recovery pathways to repair understanding.

---

# Problem

Traditional quizzes and assessments classify answers as:

* Correct
* Incorrect

However, they rarely explain **why** a student answered incorrectly.

In science education, many wrong answers stem from deeply rooted misconceptions rather than a lack of effort. These misconceptions often persist across multiple assessments and remain invisible to teachers.

As a result:

* Students repeatedly make the same mistakes.
* Teachers cannot identify underlying reasoning gaps.
* Learning becomes focused on grades rather than conceptual understanding.

---

# Solution

SciSleuth acts as an **AI Misconception Detective**.

The platform:

1. Diagnoses misconceptions from student responses.
2. Maps misconceptions onto a knowledge graph.
3. Generates personalized AI explanations.
4. Creates guided repair missions.
5. Measures concept health and recovery.
6. Provides classroom-wide analytics for teachers.

---

# Key Features

## Diagnostic Assessment

Students complete a targeted diagnostic quiz on Newton's Laws.

Instead of only checking correctness, SciSleuth analyzes which misconception each wrong answer represents.

---

## Misconception Detection

Wrong answers are mapped to known conceptual misunderstandings such as:

* Motion Requires Continuous Force
* Balanced Forces Mean Rest
* Force Imbalance During Collisions
* Mass–Acceleration Confusion

This allows the system to identify *why* the student answered incorrectly.

---

## AI-Powered Explanations

Using Google Gemini 2.5 Flash, SciSleuth generates:

* Personalized misconception explanations
* Correct conceptual reasoning
* Real-world examples
* Recovery guidance

Each explanation is tailored to the specific misconception detected.

---

## Interactive Knowledge Graph

Concepts are represented as connected nodes.

SciSleuth highlights:

* Healthy concepts (green)
* Broken concepts (red)

This allows students and teachers to visualize how misconceptions affect conceptual understanding.

---

## Repair Missions

After diagnosis, students receive structured recovery tasks.

Each mission focuses on:

* Understanding the misconception
* Reviewing the correct concept
* Applying the idea to a real-world scenario

---

## Recovery Tracking

SciSleuth measures conceptual improvement after mission completion.

Students can:

* Compare before vs after concept health
* View repaired graphs
* Track learning progress over time

---

## Student Profiles

Each student receives:

* Attempt history
* Graph health metrics
* Misconception records
* Recovery progress tracking

---

## Teacher Analytics Dashboard

Teachers gain visibility into classroom-wide learning patterns.

The dashboard provides:

* Most common misconceptions
* Severity analysis
* Student performance overview
* Risk indicators
* Classroom concept health

---

## AI Teacher Insights

Gemini analyzes classroom trends and generates actionable summaries such as:

* Common reasoning gaps
* Concept areas requiring reinforcement
* Recommended teaching focus areas

---

## Intervention Planning

Teachers can generate intervention plans directly from dashboard analytics.

Each intervention includes:

* Target misconception
* Severity level
* Affected students
* Suggested instructional strategy
* Recommended classroom activity

---

## Student Drilldown

Teachers can move from classroom analytics to individual student analysis.

This includes:

* Student attempt history
* Graph health progression
* Misconception frequency
* Detailed diagnostic reports

---

# Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

## Backend & Database

* Supabase Authentication
* Supabase PostgreSQL
* Supabase Row Storage

## Artificial Intelligence

* Google Gemini 2.5 Flash

## Deployment

* Vercel

---

# How It Works

```text
Student Login
      ↓
Diagnostic Quiz
      ↓
Misconception Detection
      ↓
AI Explanation Generation
      ↓
Knowledge Graph Analysis
      ↓
Repair Missions
      ↓
Recovery Assessment
      ↓
Updated Concept Health
      ↓
Teacher Analytics
```

---

# Project Structure

```text
src/
├── app/
│   ├── diagnostic/
│   ├── results/
│   ├── graph/
│   ├── mission/
│   ├── recover/
│   ├── profile/
│   ├── teacher/
│   └── api/
│
├── components/
├── data/
├── lib/
├── types/
└── utils/
```

---

# Future Enhancements

* Support for Mathematics, Chemistry and Biology
* Adaptive questioning engine
* Long-term learning analytics
* Classroom intervention automation
* Research-backed misconception datasets
* Mobile application
* Multi-subject knowledge graphs

---

# Impact

SciSleuth shifts assessment from:

```text
Right vs Wrong
```

to:

```text
Diagnose → Explain → Repair → Improve
```

helping students build deeper conceptual understanding while giving teachers visibility into the hidden reasoning patterns behind mistakes.

---

Built with ❤️ by Team SkyHi.
