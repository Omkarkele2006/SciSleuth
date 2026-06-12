SciSleuth Architecture & Quality Assurance Audit Report

This report documents a comprehensive architectural and state-flow audit of SciSleuth (AI Misconception Detective). It identifies critical state-management bugs, lifecycle flows, navigation issues, and security inconsistencies that present major demo risks for a hackathon.

1. Route Inventory

Below is an inventory of every active route in the SciSleuth codebase, listing inputs, outputs, data sources, localStorage usage, Supabase usage, and navigation logic.

🌐 Page Routes

1. Home / Landing Page (/)

File Location: page.tsx

Inputs: None (Static URL).

Outputs: Marketing copy, hero diagnostics demo visual, feature descriptions, CTA buttons.

Data Source: Static JSX code.

LocalStorage Usage: None.

Supabase Usage: None.

Navigation Destinations:

/login (via "Start Diagnostic" CTAs).

External GitHub link.

2. User Signup (/signup)

File Location: signup/page.tsx

Inputs: Full Name, Email, Password, Confirm Password, agreed terms checkbox.

Outputs: Account creation form, client-side validation errors, success banner with redirect button.

Data Source: Form inputs, Supabase Auth.

LocalStorage Usage: None.

Supabase Usage: Calls supabase.auth.signUp().

Navigation Destinations:

/login (via success banner or "Sign In" link).

/terms and /privacy (via terms links).

3. User Login (/login)

File Location: login/page.tsx

Inputs: Email, Password.

Outputs: Login form, error alerts.

Data Source: Form inputs, Supabase Auth.

LocalStorage Usage: None.

Supabase Usage: Calls supabase.auth.signInWithPassword().

Navigation Destinations:

/teacher (if the logged-in email matches the local admin list).

/diagnostic (if standard user).

/signup (via "Create Account" link).

/recovery (via "Forgot password?" link — ⚠️ DEAD ROUTE).

4. Diagnostic Quiz (/diagnostic)

File Location: diagnostic/page.tsx

Inputs: Selected answers mapped in React component state answers (Record<number, number>).

Outputs: Question multiple-choice cards, progress bar, quiz completion button.

Data Source: questions.ts (Static questions), supabase.auth.getUser().

LocalStorage Usage:

Writes: "misconceptions" (stores JSON string of detected misconceptions on completion).

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Inserts: Creates a new row in the attempts table upon quiz completion with fields: user_id, graph_health, misconception_count, misconceptions (JSONB), and answers (JSONB).

Navigation Destinations:

/results (after submitting diagnostic).

/profile (via header nav link).

/login (on logout or unauthenticated access).

5. Results & Diagnostic Report (/results)

File Location: results/page.tsx

Inputs: LocalStorage "misconceptions". Accordion expanded state.

Outputs: Severity metrics, concept health progress bars, misconception cards with AI Guidance accordion and Repair Path highlights.

Data Source: LocalStorage, repairs.ts (Static data), API /api/explain (AI explanations).

LocalStorage Usage:

Reads: "misconceptions" (parsed and deduplicated).

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Navigation Destinations:

/mission (via "Start Repair Mission" CTA inside accordion).

/graph (via "Open Knowledge Graph" CTA).

/profile (via header nav link).

/login (on logout or unauthenticated access).

6. Knowledge Graph Visualization (/graph)

File Location: graph/page.tsx

Inputs: LocalStorage "misconceptions". SVG node hover index.

Outputs: Interactive SVG knowledge graph rendering healthy (green) and broken (red) nodes, concept metric cards, node hover description tooltip.

Data Source: LocalStorage, graph.ts (Static nodes/edges structure), evaluateGraphHealth(), getNodeMisconceptions().

LocalStorage Usage:

Reads: "misconceptions".

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Navigation Destinations:

/results (via "Back to Results" CTA).

/diagnostic (via "Retake Diagnostic" CTA).

/profile (via header nav link).

/login (on logout or unauthenticated access).

7. Repair Missions (/mission)

File Location: mission/page.tsx

Inputs: LocalStorage "misconceptions". Checklist item toggle state completed (Record<string, Record<number, boolean>>).

Outputs: Step-by-step repair checklist cards for each diagnosed misconception, mission progress bar, redirection triggers.

Data Source: LocalStorage, repairs.ts (Static data).

LocalStorage Usage:

Reads: "misconceptions".

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Navigation Destinations:

/results (via "Back to Results" CTA).

/recover (via "Continue to Recovery" CTA, enabled when all checklist steps are checked).

/profile (via header nav link).

/login (on logout or unauthenticated access).

8. Recovery Summary (/recover)

File Location: recover/page.tsx

Inputs: LocalStorage "misconceptions".

Outputs: Post-recovery metrics comparing "Graph Health Before" vs "Graph Health After", repaired nodes counts, comparison visual graphs.

Data Source: LocalStorage, simulated mathematical calculation formulas.

LocalStorage Usage:

Reads: "misconceptions".

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Navigation Destinations:

/graph (via "View Knowledge Graph" CTA).

/diagnostic (via "Retake Diagnostic" CTA).

/profile (via header nav link).

/login (on logout or unauthenticated access).

9. Learner Profile (/profile)

File Location: profile/page.tsx

Inputs: Logged-in User Session, Supabase query parameters.

Outputs: User details card, cumulative stats (attempts count, average health, best score), click-to-view historical attempts list.

Data Source: Supabase Auth, Supabase DB.

LocalStorage Usage: None.

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Queries: Selects row from profiles matching user ID.

Queries: Selects rows from attempts matching user ID, ordered by created_at descending.

Navigation Destinations:

/attempt/[id] (via clicking an attempt item).

/results (via header nav link).

/login (on logout or unauthenticated access).

/teacher (automatic redirect if user is an admin).

10. Attempt Review Detail (/attempt/[id])

File Location: attempt/[id]/page.tsx

Inputs: URL path parameter id (attempt ID).

Outputs: Health metrics, diagnostic list of misconceptions, question review list highlighting student selection vs correct option.

Data Source: Supabase DB, questions.ts (Static questions).

LocalStorage Usage: None.

Supabase Usage:

Queries: Selects the single row from attempts matching parameter id.

Navigation Destinations:

/profile (via "Back" CTA).

/ (via header logo link).

11. Teacher Dashboard (/teacher)

File Location: teacher/page.tsx

Inputs: Logged-in admin session. Button click triggers.

Outputs: Cohort aggregates (common misconceptions heatmap, average severity, stability indexes), student performance rosters, AI-generated cohort insights.

Data Source: Supabase DB, API /api/teacher-insight (AI synthesis).

LocalStorage Usage: None.

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Logs out via supabase.auth.signOut().

Queries: Selects all rows from attempts and profiles tables.

Navigation Destinations:

/teacher/student/[id] (via student view buttons).

/teacher/profile (via header "AIC" link).

/graph and /mission (via action tiles in Interventions).

/login (on logout or non-admin access).

12. Admin Intelligence Center (/teacher/profile)

File Location: teacher/profile/page.tsx

Inputs: Logged-in admin session.

Outputs: Executive summary of cohort metrics, top classroom misconceptions list, most struggling students list.

Data Source: Supabase DB.

LocalStorage Usage: None.

Supabase Usage:

Authenticates session via supabase.auth.getUser().

Queries: Selects all rows from attempts and profiles.

Navigation Destinations:

/teacher (via "Dashboard" header link).

/teacher/student/[id] (via clicking a student in the struggling list).

13. Student Drilldown Details (/teacher/student/[id])

File Location: teacher/student/[id]/page.tsx

Inputs: URL path parameter id (student user_id).

Outputs: Selected student metrics (attempts count, average health, latest health), student misconception frequencies, student historical attempts list.

Data Source: Supabase DB.

LocalStorage Usage: None.

Supabase Usage:

Queries: Selects the student's profile from profiles.

Queries: Selects the student's attempts from attempts table.

Navigation Destinations:

/teacher (via "Back" link).

/attempt/[id] (via clicking an attempt item).

🔌 API Routes

14. AI Guidance Generator (/api/explain)

File Location: explain/route.ts

Inputs: POST Request JSON containing misconceptionName, brokenConcept, and description.

Outputs: AI explanation and custom mission steps.

Data Source: Google Gemini API (gemini-2.5-flash-lite), prompt template from buildExplanationPrompt.ts.

Database & Storage Usage: None.

15. Cohort Insights Generator (/api/teacher-insight)

File Location: teacher-insight/route.ts

Inputs: POST Request JSON containing analytics list, totalStudents count, and averageHealth score.

Outputs: AI data synthesis paragraph explaining learning problems, root causes, and recommended interventions.

Data Source: Google Gemini API (gemini-2.5-flash-lite).

Database & Storage Usage: None.

🗺️ Route Dependency Map

The diagram below maps the navigation paths and relationships between these routes:

graph TD
    %% Define styles
    classDef auth fill:#1e293b,stroke:#475569,stroke-width:1px,color:#f8fafc
    classDef student fill:#064e3b,stroke:#059669,stroke-width:2px,color:#e6f4ea
    classDef teacher fill:#3b0764,stroke:#8b5cf6,stroke-width:2px,color:#f5f3ff
    classDef misc fill:#7c2d12,stroke:#ea580c,stroke-width:1px,color:#fff7ed

    %% Define nodes
    Home["Landing Page (/)"]
    Signup["Signup (/signup)"]:::auth
    Login["Login (/login)"]:::auth
    
    %% Student Flow
    Diag["Diagnostic (/diagnostic)"]:::student
    Results["Results (/results)"]:::student
    Graph["Graph (/graph)"]:::student
    Mission["Missions (/mission)"]:::student
    Recover["Recovery (/recover)"]:::student
    Profile["Profile (/profile)"]:::student
    Attempt["Attempt Detail (/attempt/[id])"]:::student
    
    %% Teacher Flow
    Teach["Teacher Dashboard (/teacher)"]:::teacher
    AIC["AIC (/teacher/profile)"]:::teacher
    Drill["Student Drilldown (/teacher/student/[id])"]:::teacher

    %% Navigation Paths
    Home -->|Start| Login
    Login -->|No Account| Signup
    Signup -->|Account Created| Login
    
    Login -->|Standard User| Diag
    Login -->|Admin User| Teach
    
    Diag -->|Submit & Write DB/Local| Results
    
    Results -->|Open Graph| Graph
    Results -->|Start Mission| Mission
    
    Graph -->|Back| Results
    Graph -->|Retake| Diag
    
    Mission -->|Back| Results
    Mission -->|Check All Steps| Recover
    
    Recover -->|View Graph| Graph
    Recover -->|Retake| Diag
    
    %% Profile Paths
    Diag & Results & Graph & Mission & Recover -->|Header Nav| Profile
    Profile -->|Click Attempt| Attempt
    Attempt -->|Back| Profile
    
    %% Teacher Dashboard Paths
    Teach -->|Header Nav| AIC
    AIC -->|Back| Teach
    Teach -->|Click Student| Drill
    AIC -->|Click Student| Drill
    Drill -->|Click Attempt| Attempt
    Drill -->|Back| Teach
    
    %% Intervention Hooks (Volatile)
    Teach -.->|Concept Reinforce| Mission
    Teach -.->|Review Graph| Graph

2. State Flow Audit

Here is a step-by-step tracing of the cognitive diagnosis-to-repair data flow, demonstrating what data is created, modified, persisted, and where it falls out of sync.

🔍 Data Flow Lifecycle

[Diagnostic Quiz]
    │  (Creates answers Record)
    ▼
[evaluateDiagnostic()]
    │  (Returns misconceptions Array)
    ▼
[Completion Event]
    ├── Writes to LocalStorage: "misconceptions"
    └── Inserts into Supabase: new attempt row (graph_health, answers, misconceptions)
    ▼
[Results / ResultsPage]
    │  (Reads localStorage "misconceptions")
    │  (Fetches /api/explain to populate local React state "aiExplanations")
    ▼
[Missions / MissionPage]
    │  (Reads localStorage "misconceptions")
    │  (Manages checkbox status in local React state "completed")
    ▼
[Recovery / RecoverPage]
    │  (Reads localStorage "misconceptions")
    │  (Calculates simulated "healthAfter" display value: healthBefore + 70% of delta)
    ▼
[Final Graph / GraphPage]
    │  (Reads localStorage "misconceptions")
    └── ❌ INCONSISTENCY: Loads original diagnostic misconceptions. Graph remains broken.

🚨 Critical State Inconsistency Points

AI Explanations Volatility on Results Page:

AI Guidance data generated on /results by calling /api/explain is held strictly in local component state aiExplanations.

If a user refreshes the Results page, all AI text disappears and must be fully re-requested, which leads to slow performance, redundant API calls, and potential Gemini quota depletion.

Checklist Progress Volatility on Mission Page:

Checkbox items checked by the user are tracked in local React state (completed).

Ticking checkboxes does not write to localStorage or update the Supabase attempt record.

Refreshing the page, navigating back, or navigating forward completely wipes all checkbox history. Progress drops back to 0%, preventing the user from navigating to /recover unless they re-check everything.

Restored Graph Health is a Simulated Illusion:

The /recover page displays a "repaired" health value (healthAfter) computed dynamically on mount:healthAfter = Math.min(100, healthBefore + Math.round((brokenBefore / TOTAL_CONCEPTS) * 70))

This calculation is completely cosmetic. No state is modified—the original list of misconceptions in localStorage remains intact, and the Supabase database attempt row is never updated.

LocalStorage Stale-State Pollution on Logout:

The "misconceptions" key in localStorage is never cleared or overwritten during logout.

If User A logs out and User B logs in on the same browser, User B will immediately inherit User A's cognitive diagnosis, seeing incorrect results, graphs, and recovery paths.

3. Attempt Lifecycle Audit

An "attempt" does not behave as a single cohesive entity in this application. The table below audits attempt-state behavior across each stage of the learner journey.

Stage

Path

Tied to attempt.id?

Tied to localStorage?

Tied to Supabase?

Broken by Page Refresh?

Broken by Back Navigation?

1. Diagnostic

/diagnostic

❌ No

❌ No

❌ No

Yes (Resets to Q1)

Yes (Resets progress)

2. Results

/results

❌ No

Yes (reads code array)

❌ No

Partial (Loses AI text)

❌ No

3. Graph

/graph

❌ No

Yes (reads code array)

❌ No

❌ No

❌ No

4. Mission

/mission

❌ No

Yes (reads code array)

❌ No

Yes (Resets checkboxes)

Yes (Resets checkboxes)

5. Recovery

/recover

❌ No

Yes (reads code array)

❌ No

❌ No

❌ No

6. Profile

/profile

Yes (historical lists)

❌ No

Yes (reads all rows)

❌ No

❌ No

7. Drilldown

/attempt/[id]

Yes (queries ID row)

❌ No

Yes (reads ID row)

❌ No

❌ No

🛠️ Key Lifecycle Flaws

Disjointed Client/Server States:

The student journey is fueled entirely by a local, unstable localStorage["misconceptions"] key.

Although /diagnostic inserts a row into the database, it discards the row's returned ID.

The subsequent pages (/results, /graph, /mission, /recover) have no idea which database attempt record they correspond to. They cannot read from or write progress to the active attempt in Supabase.

Stage Tracking Progression Mismatch:

The stages displayed in progress indicators (e.g. "Stage 3 of 4" on /results, "Stage 4 Complete" on /recover) are hardcoded text values.

Because there is no central session state engine tracking current_stage for the attempt, a user can skip straight to /recover or /mission by typing the URL, bypassing prerequisite steps.

4. Navigation Audit

An analysis of routing actions reveals several dead-ends, incorrect redirects, and context-loss bugs.

🔍 Route Actions Analysis

login/page.tsx:L179:

Expected Destination: A page to recover passwords or manage user login credentials.

Actual Destination: Links to /recovery. This route does not exist in the files, causing a 404 Page Not Found error.

results/page.tsx:L537:

Expected Destination: A repair pathway focusing on the specific misconception the user clicked on.

Actual Destination: Links generically to /mission without query parameters or state filters. This forces the student to see all diagnosed misconceptions instead of their chosen focus.

recover/page.tsx:L438:

Expected Destination: A visual rendering of the newly repaired/recovered knowledge graph.

Actual Destination: Links to /graph which reads from the un-cleared "misconceptions" localStorage array. The user is presented with the original, red, broken graph they had prior to repair.

teacher/page.tsx:L720 & L755:

Expected Destination: High-level reviews of the class curriculum graph/missions.

Actual Destination: Links directly to /mission and /graph which load student state from the teacher's local storage. This will either show empty/stale test data or crash if the arrays are missing.

attempt/[id]/page.tsx:L84:

Expected Destination: Returning to the page that launched the attempt review (dynamic context).

Actual Destination: Hardcoded back link to <Link href="/profile">Back</Link>.

Issue: If a teacher reviews a student's attempt via the Teacher Student Drilldown /teacher/student/[id] and clicks "Back", they are navigated to /profile (the standard student profile page), which redirects them back to /teacher since they are admin. This loses student context and prevents seamless teacher grading/review workflows.

5. LocalStorage Audit

📁 Key Registry

Key

Created By

Read By

Cleared On

Stale Data Prevention

"misconceptions"

/diagnostic

/results/graph/mission/recover

Never

None. Stale data remains indefinitely unless overwritten by a new quiz.

🐛 LocalStorage-Related Bugs

State Pollution: When logging out via supabase.auth.signOut(), the "misconceptions" key is left inside the browser. A subsequent user logging in on the same browser inherits the previous user's cognitive state.

Lack of Multi-Attempt Isolation: Since there is only one global "misconceptions" key, if a user clicks an older attempt in their /profile history, the local storage is not updated. Navigating to /graph or /mission will still display the state of their most recent quiz, not the historical attempt they selected.

6. Graph Consistency Audit

The knowledge graph has a critical state synchronization gap between the student's repair actions and the database record.

📈 Current Graph vs. Recovered Graph

Is the repaired graph stored?

No. The app does not persist the repaired state. There is no table or localStorage array representing a "repaired" node list.

Is the repaired graph tied to the attempt?

No. The attempt row in Supabase contains a JSON snapshot of the original misconceptions and graph health at the moment the diagnostic was finished. This database record is never updated.

Does graph health update in profile history?

No. The profile page /profile pulls graph_health from the database attempts records. Because the recovery step does not write back to the database, attempt history will always show the pre-repair health scores (e.g. 20% or 40%).

Can a user revisit a repaired graph later?

No. Going to /graph always runs evaluateGraphHealth on the original misconceptions list from localStorage, displaying the broken red nodes indefinitely.

7. Teacher Dashboard Audit

The Teacher Dashboard and Admin Intelligence Center are designed to aggregate student diagnostic attempts to compile class analytics.

🔀 Student vs. Teacher Mismatches

Because the student's repair and recovery stages do not write back to the database, student statistics in the teacher dashboards reflect A) Original diagnostic state.

If a student gets 20% on their initial diagnostic and subsequently repairs their understanding to 90% via missions, the teacher's dashboard will still flag this student as "Critical Risk" with 20% health.

This renders teacher tracking useless, as student recovery efforts are invisible to classroom analytics.

8. Demo Risk Assessment

This matrix outlines bugs that are highly likely to be discovered during a standard 5-minute hackathon presentation.

Issue

Severity

Target Page

Impact Description

View Graph from Recovery is Broken

P0

/recover → /graph

The user completes their recovery path (visualizing a 100% healthy graph), clicks "View Knowledge Graph", and is shown the original, broken, red graph.

Forgot Password Dead Link

P0

/login

Clicking "Forgot password?" triggers a 404 page error.

Mission Checklist State Wiped on Refresh

P0

/mission

If a judge refreshes the mission checklist, all boxes clear. They must recheck all boxes to proceed.

Cross-User LocalStorage Leak

P0

/login / /signup

Logging out and registering a new user displays the previous user's quiz results and diagnostics.

Teacher Dashboard Out-of-Sync

P1

/teacher

Teacher reports do not show student recovery progress, displaying stale diagnostic stats.

Teacher Review Navigation Loop

P1

/attempt/[id]

Teacher viewing a student's attempt clicks "Back" and is redirected to their own profile page, breaking dashboard navigation.

Hardcoded Admin Email checks

P1

/teacher / /login

Authorization checks hardcode "omavkarkele@gmail.com". If logging in with other admin credentials, redirection breaks.

Results Page AI Explanations Lost

P2

/results

Refreshing the results page removes all AI guidance text boxes, forcing re-generation.

No Individual Misconception Focus

P2

/results → /mission

Clicking "Start Repair Mission" on a specific card loads the checklists for all diagnosed misconceptions simultaneously.

9. Recommended Fix Order

To maximize hackathon demo success, fixes should be executed in the following order:

🛠️ Fix #1: Persist Repaired Graph State & Clear Misconceptions upon Recovery

Target Files:

recover/page.tsx

graph/page.tsx

Rationale:

Upon entering /recover, the database attempt record (or a new field in Supabase) must be updated to reflect the new graph_health and remove the repaired misconceptions.

Correspondingly, the local storage misconceptions array must be updated/cleared. This ensures that clicking "View Knowledge Graph" from recovery properly displays a healthy, green graph, and that profile logs match this state.

🛠️ Fix #2: Persist Checklist Checkboxes to LocalStorage

Target Files:

mission/page.tsx

Rationale:

Write checkbox toggle status directly to local storage (e.g. key: "mission_progress") on change and load on mount. This prevents page refreshes and backward/forward navigation from wiping progress.

🛠️ Fix #3: Clear LocalStorage on Logout

Target Files:

diagnostic/page.tsx

results/page.tsx

graph/page.tsx

mission/page.tsx

recover/page.tsx

teacher/page.tsx

Rationale:

Modify handleLogout to execute localStorage.removeItem("misconceptions") along with deleting any temporary user metrics. This guarantees clean user boundaries during testing.

🛠️ Fix #4: Redirect Forgot Password and Standardize Admin Authentication checks

Target Files:

login/page.tsx

teacher/page.tsx

teacher/profile/page.tsx

Rationale:

Remove the dead route /recovery and point forgot-password helpers to a valid route or modal overlay.

Consolidate admin permission checking into the imported ADMIN_EMAILS from @/lib/admin instead of hardcoding checking string literals on multiple client pages.

🛠️ Fix #5: Attempt Context Integration (Route Parameter Passing)

Target Files:

results/page.tsx

graph/page.tsx

mission/page.tsx

Rationale:

Standardize client routing to pass the attempt ID (e.g. /results?attemptId=... or /attempt/[id]/graph). This enables the client to load and update state based on specific database attempts, solving multi-attempt data isolation issues.

🛠️ Fix #6: Context-Aware Back Navigation in Attempt Details

Target Files:

attempt/[id]/page.tsx

Rationale:

Check the user's role on mount. If the user is an admin/teacher, change the "Back" button target to go back to /teacher/student/[id] or /teacher instead of hardcoding a redirect to /profile.