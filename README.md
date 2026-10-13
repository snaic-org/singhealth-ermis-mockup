# ERMIS: SingHealth ERM Information System (pilot mock-up)

A static HTML/CSS/JS front end for the AI-enabled Enterprise Risk Management Information System proposed to the SingHealth Office of Risk Services (see `docs/SingHealth_ERMIS_Project_Cost_Proposal_v0.2.pdf`). It replaces the Excel-based ERM Tool v3.1 (`docs/ERM Tool step by step guide (v3.1).pdf`) with a guided web workflow.

There is no build step, framework or backend. All data lives in the browser's `localStorage`.

## Running it

Either open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

**Demo sign-in**

| Email | Password |
|---|---|
| `risk.coordinator@singhealth.com.sg` | `Ermis@2026` |

The account signs in as *Tan Wei Ling, Department Risk Coordinator, SGH Pharmacy*.

**Resetting demo data:** add `?reset=1` to any page URL, e.g. `index.html?reset=1`. This restores the seeded risk register and the sample draft review. Your sign-in is kept.

## What is implemented

1. **ERM workflow** (`review.html`): the five steps from the ERM Tool, plus *Generate KRM Plan*.
   - **Step 1, Description and goal:** all the workbook fields.
   - **Step 2, Objectives and risk identification:** up to 10 objectives and any number of risks, with a live check of the `[EVENT] due to [CAUSES] resulting in [CONSEQUENCES]` structure.
   - **Step 3, Evaluate current controls:** the rating is calculated live.
   - **Step 4, Addition / change to controls:** the rating after control changes is calculated live.
   - **Step 5, KRM Plan:** key indicators, frequency and monitored by.
   - **Generate KRM Plan:** the endorsement-format plan, with A4 landscape print and **Submit to risk register**.
   - **Risks are stored once:** adding or removing a risk in Step 2 updates every later step automatically. The workbook needed manual re-verification after such edits, and inserting or deleting rows could damage it.
   - **Autosave:** every change is saved, and drafts can be resumed from the dashboard or the sidebar.
   - **References drawer:** the glossary, impact, likelihood, effectiveness, risk domain and rating-and-action reference sets, taken verbatim from the workbook.
2. **AI-assisted drafting** (`js/assist.js`, `js/data/suggestions.js`).
   - When a supported field has focus, *ERMIS Assist* shows suggestions. Supported fields are description, goal, objectives, risk statement, consequences, current and additional controls, and KRIs.
   - Suggestions are ranked by the risk's domain and by what has already been written. Each can be inserted, appended or added as a line.
   - **Find similar risks** opens semantic search inside the workflow. Any control or KRI found there can be added to the current risk.
   - For now, suggestions come from a curated library. The panel is the integration point for the RAG/LLM backend.
3. **Semantic search** (`search.html`, `js/search-engine.js`).
   - Uses concept-expanded, field-weighted TF-IDF retrieval over the risk register (synonyms, e.g. *burnout → fatigue, workload, overtime*).
   - Shows similarity scores, highlighted matched terms and expandable controls and KRIs.
   - Filters: domain, institution, inherent risk level, control adequacy and review period.
   - Everything goes through one function, `ERMIS.Search.query(query, filters)`, so an embedding or vector index can replace it later.
4. **Baseline risk dashboard** (`dashboard.html`): the four views in the proposal, plus supporting panels.
   - **Proposal views:**
     - risk summary by rating band and domain (chart or table);
     - top 10 risks by residual rating;
     - 5×5 heat map (select a cell to see its risks);
     - control effectiveness distribution, plus control adequacy now and after proposed changes.
   - **Supporting panels:** KPIs, institution/domain/period filters, *My ERM reviews* and control actions due.
   - Submitting a review updates the dashboard and search straight away.

## Rating logic

`js/rating.js` reproduces the ERM Tool v3.1 workbook formulas. It is deterministic and uses no AI.

- **Rating with current controls** = (Impact score + Likelihood score) × (1 − Effectiveness).
  - Impact scores: 3/6/9/12/15. Likelihood scores: 2/4/6/8/10. Effectiveness: 0 to 0.95.
  - Classes: ≥ 10 Under-controlled; 5 to 9.9 Potentially under-controlled; 1.25 to 4.9 Adequately controlled; below that, Potentially over-controlled.
- **After control changes:** new effectiveness = e + (1 − e) × m for improvements, or e × (1 + m) for decreases. The rating is rounded to 1 decimal place, and the adequacy threshold becomes 1.3.
- **Heat map:** the inherent level (Low / Medium / High / Very High) follows the SingHealth 5×5 impact × likelihood matrix from the ERM Foundation training.

Run the checks with `node tests/rating.test.js`. They cover the workbook's worked example, the boundaries, all 3,276 after-change combinations and all 25 matrix cells.

## Project structure

```
index.html, dashboard.html, review.html, search.html
css/       base (tokens, components), shell, components (charts, assist, search), page styles
js/core/   util (helpers, icons), store (localStorage, validation, register), auth, shell (layout, drawers, references)
js/data/   reference.js (ERM Tool reference sets), corpus.js (90 seeded register risks), suggestions.js (drafting library)
js/        rating.js, search-engine.js, search-ui.js, assist.js, charts.js, risk-detail.js
js/pages/  one script per page
tests/     rating engine checks (Node)
```

The seeded risks and people are realistic but fictional.
