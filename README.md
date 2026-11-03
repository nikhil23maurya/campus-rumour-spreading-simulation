# Campus Rumour Spreading Simulation

### An Agent-Based Modelling Project Using NetLogo

An interactive agent-based simulation exploring how rumours spread through student populations and how individual fact-checking behaviour influences information propagation.

The project combines a **NetLogo simulation** with an **interactive web experience** that allows users to explore information diffusion through adjustable parameters, animated agents, and real-time visualizations.

### Explore the Project

**🌐 Live Website:** https://campus-rumour-spread.netlify.app/

**💻 GitHub Repository:** https://github.com/nikhil23maurya/campus-rumour-spreading-simulation

---

## 1. Project Overview

Information can spread rapidly through social interactions, especially in environments where individuals frequently communicate with one another.

This project examines rumour propagation within a simulated college campus using **Agent-Based Modelling (ABM)**.

Each student is represented by an independent agent that moves around a virtual environment, interacts with nearby students, and changes its rumour status according to predefined behavioural rules.

The simulation explores how population size, initial believers, transmission probability, and fact-checking probability affect the overall spread of a rumour.

Rather than predetermining the outcome, the model allows collective patterns to emerge from individual interactions.

## 2. Project Objectives

- Demonstrate the fundamental principles of Agent-Based Modelling.
- Simulate information propagation through local agent interactions.
- Examine probabilistic rumour transmission.
- Investigate the influence of fact-checking on rumour propagation.
- Visualize changes in agent populations over time.
- Explore how different simulation parameters influence collective outcomes.
- Provide an interactive environment for experimentation and analysis.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| NetLogo 7 | Primary agent-based simulation |
| NetLogo Programming Language | Agent behaviour and simulation logic |
| HTML5 | Website structure |
| CSS3 | Responsive interface and visual design |
| JavaScript | Browser simulation and interactions |
| Canvas API | Agent visualization and charts |
| Git & GitHub | Version control and source code hosting |
| Netlify | Website deployment and hosting |

The browser experience uses standard web technologies without requiring a JavaScript framework or backend server.

## 4. Agent-Based Simulation Model

The simulation represents students as autonomous agents, known as **turtles** in NetLogo.

Agents move independently within a two-dimensional virtual campus and interact based on spatial proximity.

### Agent States

| State | Colour | Description |
|---|---|---|
| Unaware | Blue | Has not adopted the rumour |
| Believer | Orange | Believes the rumour and can spread it |
| Verified | Green | Has fact-checked and stopped spreading |

### State Transitions

**Unaware → Believer → Verified**

An unaware student may become a believer after a successful interaction with a nearby believer.

A believer may subsequently perform fact-checking and transition into the verified state.

Verified agents no longer participate in rumour transmission.

These transitions are one-way in the current model.

## 5. How the Simulation Works

### Step 1 — Initialization

The simulation creates a specified number of students at random positions within the virtual campus.

A configurable number of students are randomly selected as initial rumour believers.

All remaining students begin in the unaware state.

### Step 2 — Agent Movement

During each simulation step, students move independently according to randomized direction adjustments.

Movement allows different agents to encounter one another as the simulation progresses.

### Step 3 — Rumour Transmission

Existing believers interact with nearby unaware students within an interaction radius of 1.5 NetLogo units.

Each eligible interaction has a probability of successfully transmitting the rumour.

Successful transmission changes the receiving student's state from unaware to believer.

### Step 4 — Fact-Checking

Every current believer independently receives an opportunity to fact-check during each simulation tick.

The probability of fact-checking is controlled by the fact-check probability parameter.

After fact-checking, the student enters the verified state and stops spreading the rumour.

**Important:** In the NetLogo model, rumour transmission occurs before fact-checking within each tick.

### Step 5 — Simulation Progression

The simulation advances through discrete time steps called *ticks*.

Agent populations and their trends are displayed through live monitors and a time-series graph.

The updated model stops when no active believers remain or the configured maximum number of ticks is reached.

## 6. Simulation Parameters

| Parameter | Description |
|---|---|
| `population` | Total number of students |
| `initial-believers` | Initial number of rumour believers |
| `spread-probability` | Percentage chance of successful transmission per eligible interaction |
| `fact-check-probability` | Percentage chance that each believer fact-checks during a tick |
| `max-ticks` | Maximum simulation duration |

### Understanding Probability

A spread probability of 20% does **not** mean exactly 20% of students become believers.

Instead, every eligible transmission attempt has a 20% probability of success.

Similarly, a fact-check probability of 10% means every current believer independently has a 10% chance of fact-checking during each tick.

Because the simulation uses randomness, identical parameter settings can produce different outcomes.

## 7. Interactive Website

**Live Website:** https://campus-rumour-spread.netlify.app/

The project includes a custom-designed interactive website that presents the simulation as an explorable computational research experiment.

The website is designed around the model, its behaviour, and its data rather than conventional marketing-page components.

### Website Features

**Interactive Simulation**

- Animated student agents
- Adjustable simulation parameters
- Start and pause controls
- Reset functionality
- Single-tick execution
- Configurable experiment scenarios

**Real-Time Analytics**

- Unaware student count
- Active believer count
- Verified student count
- Simulation tick counter
- Population trend visualization

**Experiment Comparison**

- Run simulations under different parameter settings
- Record completed simulation outcomes
- Compare saved runs
- Explore differences in rumour adoption and fact-checking behaviour

The website supports saving up to eight runs for comparison during the current page session.

**Responsive Interface**

The website is designed for desktop, tablet, and mobile screens.

### Important Distinction

The website contains a JavaScript recreation of the core NetLogo simulation rules.

It is not an embedded instance of the NetLogo Desktop application.

Browser simulation results may differ from desktop NetLogo results because the two environments have separate implementations and random execution behaviour.

## 8. Getting Started

### Option A — Run the NetLogo Simulation

**Requirements:** NetLogo 7 or a compatible newer version.

1. Download or clone this repository.
2. Launch NetLogo Desktop.
3. Open `Campus_Rumour_Simulation.nlogox`.
4. Configure the population and probability parameters.
5. Click **Setup** to initialize the simulation.
6. Click **Go** to begin execution.
7. Observe agent movement, state changes, monitors, and population graphs.

Download NetLogo from the [official NetLogo website](https://www.netlogo.org/).

### Option B — Run the Interactive Website

The browser simulation can be accessed directly without installing NetLogo.

**[Launch Interactive Simulation](https://campus-rumour-spread.netlify.app/)**

1. Open the live website.
2. Navigate to the interactive experiment section.
3. Adjust the simulation parameters.
4. Start the simulation and observe the results.
5. Explore different scenarios and compare recorded runs.

No backend, database, account, or build process is required to use the browser simulation.

## 9. Repository Structure

The combined project can be organized as follows:

- `Campus_Rumour_Simulation.nlogox` — NetLogo simulation model
- `README.md` — Project documentation
- `docs/` — Interactive website source, if included in the repository
  - `index.html` — Website structure
  - `styles.css` — Design system and responsive styles
  - `script.js` — Browser simulation and interactions
  - `assets/` — Website images and other assets

## 10. Website Deployment

The interactive website is available at:

**https://campus-rumour-spread.netlify.app/**

The website is hosted using **Netlify**, which supports deployment of static websites.

The project website is built using HTML, CSS, JavaScript, and browser-based visualization technologies.

The NetLogo desktop model remains separately available through the GitHub repository.

## 11. Experimental Methodology

The simulation can be used to explore different experimental conditions.

### Experiment 1 — Effect of Fact-Checking

**Objective:** Investigate how fact-checking probability influences rumour adoption.

Keep the following parameters constant:

- Population: 200
- Initial believers: 4
- Spread probability: 40%
- Maximum ticks: 300

Change the fact-check probability across different runs.

Suggested values: 0%, 20%, 40%, and 80%.

Run each configuration multiple times and compare the average outcomes.

### Experiment 2 — Effect of Transmission Probability

**Objective:** Examine how transmission probability influences rumour propagation.

Keep population, initial believers, fact-check probability, and maximum ticks constant.

Change spread probability across different runs.

Suggested values: 10%, 40%, and 80%.

Record and compare the resulting agent populations.

### Experiment 3 — Boundary Conditions

Test the model under extreme conditions:

- Zero initial believers
- Zero transmission probability
- Zero fact-check probability
- Maximum fact-check probability
- Different maximum tick limits

These tests help evaluate the model's behaviour and stopping conditions.

## 12. Observed Simulation Output

In one recorded desktop simulation with a population of 200 students, the following results were observed:

| Metric | Observed value |
|---|---:|
| Total population | 200 |
| Unaware students | 65 |
| Active believers | 0 |
| Verified students | 135 |
| Final tick | 194 |

### Interpretation

The simulation ended with no active believers.

Of the 200 students, 135 had adopted the rumour at some point and subsequently entered the verified state.

The remaining 65 students never adopted the rumour.

**Rumour adoption coverage:**

(135 / 200) × 100 = **67.5%**

This is the outcome of one recorded simulation, not a guaranteed or statistically representative result.

Repeated experiments are required before drawing broader conclusions about parameter effects.

## 13. Mathematical Properties

Let:

- U(t) = Unaware population at tick t
- B(t) = Believer population at tick t
- V(t) = Verified population at tick t
- N = Total student population

The total population remains constant:

**U(t) + B(t) + V(t) = N**

Under the current model:

- The unaware population can only decrease or remain constant.
- The verified population can only increase or remain constant.
- The believer population can increase or decrease depending on transmission and fact-checking.

These properties provide useful checks when evaluating simulation results.

## 14. Model Assumptions

The model uses several simplifying assumptions:

- All agents follow the same movement rules.
- All eligible interactions use the configured transmission probability.
- All believers use the configured fact-check probability.
- Interactions depend on spatial proximity.
- Verified agents permanently stop spreading.
- Students do not enter or leave the population during a run.
- Only one rumour is modelled.
- No real-world campus data is required.

## 15. Limitations

This project is an educational computational model, not a validated real-world prediction system.

Its limitations include:

- No explicit friendship or social networks.
- No individual trust or influence levels.
- No online messaging or social-media interactions.
- No modelling of different personalities.
- No detailed assessment of whether a rumour is true or false.
- No empirical calibration using real student behaviour.

The verified state represents a behavioural transition following fact-checking. It does not independently establish the truthfulness of the rumour.

## 16. Future Enhancements

Potential improvements include:

- Friendship-based interaction networks.
- Individual agent trust scores.
- Heterogeneous transmission probabilities.
- Multiple competing rumours.
- Rumour correction and counter-information propagation.
- Social-media-based information diffusion.
- Automated experiment analysis.
- Data export for statistical evaluation.
- Comparison against empirical information-diffusion datasets.

## 17. Academic Relevance

This project demonstrates important Agent-Based Modelling concepts, including:

- Autonomous agents
- Agent-specific attributes
- Spatial interactions
- Probabilistic state transitions
- Stochastic simulation
- Emergent collective behaviour
- Parameter-based experimentation
- Time-series visualization

It provides an accessible introduction to computational social modelling and information diffusion.

## 18. Project Links

**Live Website:** https://campus-rumour-spread.netlify.app/

**GitHub Repository:** https://github.com/nikhil23maurya/campus-rumour-spreading-simulation

**NetLogo:** https://www.netlogo.org/

**Project Type:** Academic / Educational

**Primary Platform:** NetLogo

**Additional Interface:** Interactive Web Application

**Domain:** Agent-Based Modelling, Social Simulation, Information Diffusion

---

## 19. References

- [NetLogo Official Website](https://www.netlogo.org/)
- [NetLogo Documentation](https://docs.netlogo.org/)
- [NetLogo Programming Guide](https://docs.netlogo.org/programming)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Campus Rumour Spreading Simulation — An exploration of how individual interactions shape collective information behaviour.**
