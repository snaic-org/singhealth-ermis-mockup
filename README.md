# SingHealth ERMIS Mockup

Low-fidelity schematic mockup for the proposed AI-enabled Enterprise Risk Management Information System (ERMIS), by SNAIC. It shows what the system does and how a user moves through it, for scoping discussions. It is not a design.

Each screen is monochrome boxes and labels with numbered notes, baseline vs add-on scope, and working assumptions. Buttons that move to another screen are links, so the main flow can be walked through. Buttons that act on data (save, submit, export, resume) are shown but not clickable. Nothing is real data and nothing is final. Changes between versions are recorded in `versions.html`.

**Disclaimer:** This is a rough, early-stage concept mockup prepared by SNAIC for discussion purposes only. It gives a high-level overview of the proposed system, based on the current understanding, and is not a complete or final design. The layout, visual style and look and feel shown are placeholders only and do not represent the final design of the system. Some screens, features and details may be incomplete, simplified or missing, and all content is indicative and subject to change. Nothing in this mockup forms a commitment, offer or agreement on scope, cost or delivery. This material is proprietary and confidential to SNAIC. It must not be copied, shared or distributed, in whole or in part, without SNAIC's prior written permission.

## Screens

| ID | File | Shows |
|---|---|---|
| Index | `index.html` | Screen list with scope notes, key to the markers |
| Flow | `flow.html` | Overall flow diagram. Every box is a link |
| WF-01 | `dashboard.html` | Four standard views, review queue and notifications |
| WF-02 | `review.html`, `review-1.html` to `review-5.html` | The five review steps, with inline AI suggestions on Steps 2 to 5 |
| WF-03 | `krm-plan.html` | Standard KRM plan and online approval |
| WF-04 | `register.html` | Risk register: filter, export on demand, copy |
| WF-05 | `search.html` | Search by meaning |
| WF-06 | `import.html` | Loading past Excel workbooks and flagged records |
| WF-A1 | `addon-interface.html` | Add-on: configuration, personalisation, AI chatbot guide |
| WF-A2 | `addon-analytics.html` | Add-on: trends, clusters, control gaps, summary report |
| WF-A3 | `addon-horizon.html` | Add-on: horizon scanning trial |
| Versions | `versions.html` | Version history |

## AI markers

| Tag | Meaning |
|---|---|
| `AI FEATURE` | Where AI is integrated |
| `RULES` | Fixed rules, not AI |

## Running it

Plain HTML and CSS. No build step, no JavaScript, no backend. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing on GitHub Pages

The `docs/` folder holds client and internal documents, so the site is published with a workflow that copies only the pages and `wire.css`. Do not use "Deploy from a branch", which would serve `docs/` too.

1. Push the branch.
2. In the repository, go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` runs on pushes to `main` and `concept`, and from the Actions tab.
4. If the deployment is blocked for the `concept` branch, add it under **Settings > Environments > github-pages > Deployment branches**.
5. The site appears at `https://<user>.github.io/<repository>/`.

GitHub Pages sites are public unless the organisation has private Pages. Check the wording is acceptable to share before publishing.

## Structure

```
*.html     the screens
wire.css   the only stylesheet
docs/      source documents and notes (not published)
.github/workflows/pages.yml
```
