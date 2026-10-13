# ERMIS concept wireframe

A low-fidelity, clickable wireframe of the proposed SingHealth Enterprise Risk Management Information System (ERMIS). It is meant to help stakeholders visualise the concept and the proposed workflow, and to collect feedback. It is not a finished product or a final UI design.

All content is placeholder: grey bars stand in for data, charts are labelled placeholder boxes, and drop-downs show generic options. A notice at the top of every page says so.

Built with plain HTML, CSS and JavaScript. There is no build step and no backend; anything typed is kept in the browser's `localStorage`.

## Running it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

**Sign in**

| Email | Password |
|---|---|
| `risk.coordinator@singhealth.com.sg` | `Ermis@2026` |

To clear anything entered during a walkthrough, add `?reset=1` to a page URL, e.g. `index.html?reset=1`.

## What the wireframe shows

1. **Dashboard:**
   - **Header:** a "Start new ERM review" button.
   - **Key figures:** placeholder tiles.
   - **Chart placeholders:** heat map, risks by domain, control effectiveness and control adequacy.
   - **Lists:** placeholder tables for top risks, your reviews and control actions due.
2. **ERM review workflow:** the five ERM Tool steps plus *Review & submit*.
   - **Steps:**
     - Step 1: description and goal;
     - Step 2: objectives and risks;
     - Step 3: current controls;
     - Step 4: additional controls;
     - Step 5: KRM plan;
     - Review & submit: the KRM Plan layout, print and submit.
   - **Risk flow-through:** risks added or removed in Step 2 appear in every later step.
   - **Ratings:** shown as "calculated here" placeholders, with the rating formula in the side panel.
3. **AI-assisted drafting:** selecting a supported field opens the *ERMIS Assist* panel.
   - **Supported fields:** description, goal, objectives, risk statement, consequences, controls and indicators.
   - **Suggestion cards:** placeholders. Insert/Add puts bracketed placeholder text into the field.
   - **Find similar risks:** opens placeholder results whose controls or indicators can be added to the risk.
4. **Semantic search:** a search box and filters. A search shows placeholder result cards with a similarity score and expandable controls and indicators.

## Structure

```
index.html, dashboard.html, review.html, search.html
css/       base (tokens, placeholder primitives), shell, components, page styles
js/core/   util, store (localStorage), auth, shell (layout, notice, drawers)
js/        assist.js (side panel / ERMIS Assist)
js/pages/  one script per page
```
