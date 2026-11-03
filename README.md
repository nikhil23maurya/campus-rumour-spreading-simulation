# Rumour / Study — The Campus Rumour Experiment

An interactive project website for **Campus Rumour Spreading Simulation**, created as an explorable research exhibit.

## Open locally

Open `index.html` in a modern browser. No installation, server, build step, or account is required. The page uses standard HTML, CSS, JavaScript, and Canvas. It uses Google Fonts when available with local system-font fallbacks.

## Website features

- Original research-led visual design with a responsive layout.
- An interactive **browser recreation** of the campus simulation (not NetLogo itself).
- Setup, run/pause, step-one-tick, reset, parameter sliders, and scenario presets.
- Live student-state counts and a time-series chart.
- Save up to eight finished runs to compare experimental outcomes within the current page session.
- A real screenshot of the desktop NetLogo project.
- Direct links to the GitHub source repository.

The simulation follows the model's phases: students move; existing believers attempt transmissions to nearby unaware students within 1.5 units; all current believers independently attempt fact-checking; a tick advances. The 33×33 world wraps at its boundaries. Browser outcomes are stochastic and may differ from the NetLogo application.

## GitHub repository

https://github.com/nikhil23maurya/campus-rumour-spreading-simulation

The repository may still contain an earlier NetLogo model. Updating the original `.nlogox` file is a separate task from deploying the website.

## Deploy on GitHub Pages

The ZIP includes a `docs/` folder containing the complete website.

1. Upload the **whole** `docs/` folder to the root of the GitHub repository.
2. Commit to the `main` branch.
3. In GitHub, go to **Settings → Pages**.
4. Select **Deploy from a branch**, then **main**, then **/docs**, and save.
5. After GitHub finishes deployment, the expected URL is:
   `https://nikhil23maurya.github.io/campus-rumour-spreading-simulation/`

The website was created locally and **has not been deployed**.

## Files

- `index.html` — webpage markup
- `styles.css` — visual system
- `script.js` — interactive simulation and charts
- `assets/netlogo-capture.webp` — original NetLogo screenshot
- `assets/favicon.svg` — site icon

## Model limitations

The model is a simplified conceptual study. It does not establish whether a rumour is true or predict real campus behaviour. "Verified" is a non-spreading state after fact-checking under the model's assumptions.

## Design

This is intentionally designed as an interactive scientific story: large readable typography, asymmetrical grids, a custom animated agent field, restrained state colours, and data as the visual focus. It does not use a generic product-page feature-card template.
