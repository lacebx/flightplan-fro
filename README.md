# FlightPlan — Career Services Frontend

The interface where OC students take the first step toward their future. This is the Vue.js frontend for the **FlightPlan** Career Services platform — built to connect students at Onondaga Community College with the tools, resources, and opportunities they need to launch their careers.

Birarenze — this project is a labor of care for every student figuring out what comes next.

---

## What It Does

FlightPlan's frontend is a clean, focused web application that greets students with a familiar login experience — Google OAuth, restricted to `@oc.edu` email addresses. It's intentional. Only verified OC students get through the door, keeping the platform relevant, safe, and community-driven.

Once inside, students can access career services tailored specifically to their institution — job boards, resume help, advising resources, and more (depending on what branch you're on — this project is actively developed across multiple branches).

---

## Tech Stack

- **Framework:** Vue 3
- **Build Tool:** Vue CLI
- **Auth:** Google OAuth (restricted to @oc.edu domain)
- **Language:** JavaScript (ES6+)
- **Linting:** ESLint with Babel

---

## Project Structure

```
flightplan-fro/
├── public/             # Static assets and base HTML
├── src/
│   ├── assets/         # Images, icons (Google logo, etc.)
│   ├── components/     # Vue components
│   │   └── HelloWorld.vue
│   ├── App.vue         # Root component with header + Google login
│   └── main.js         # App entry point
├── babel.config.js
├── jsconfig.json
├── vue.config.js
└── package.json
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/lacebx/flightplan-fro.git
cd flightplan-fro

# Install dependencies
npm install

# Start the dev server
npm run serve
```

The app will be available at `http://localhost:8080` by default.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run serve` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Lint and auto-fix files |

---

## Pair With the Backend

This frontend is designed to work alongside **[flightplanback-end](https://github.com/lacebx/flightplanback-end)** — the Node.js/Express API that handles authentication, data, and business logic. Make sure the backend is running before testing authenticated flows.

---

## Notes

- Only `@oc.edu` Google accounts are permitted to log in — this is by design.
- This project has **23 branches**, each potentially representing different feature work or database configurations.
- Check the active branch's `package.json` for the most up-to-date dependency list.

---

*Built for OC students, by someone who wanted to make something that actually helps.*
