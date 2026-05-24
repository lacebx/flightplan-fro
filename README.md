# FlightPlan, Career Services Frontend

The interface where OC students take the first step toward their future. This is the Vue.js frontend for the **FlightPlan** Career Services platform, built to connect students at Onondaga Community College with the tools, resources, and opportunities they need to launch their careers.

This project is birarenze for every student figuring out what comes next.

---

## What It Does

FlightPlan's frontend is a clean, focused web application that greets students with a familiar login experience, Google OAuth restricted to `@oc.edu` email addresses. Only verified OC students get through the door. Once inside, students can access career services tailored specifically to their institution, job boards, resume help, advising resources, and more.

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
├── public/          # Static assets and base HTML
├── src/
│   ├── assets/      # Images, icons (Google logo, etc.)
│   ├── components/  # Vue components
│   │   └── HelloWorld.vue
│   ├── App.vue      # Root component with header + Google login
│   └── main.js      # App entry point
├── babel.config.js
├── jsconfig.json
├── vue.config.js
└── package.json
```

---

## Getting Started

1. **Clone:** `git clone https://github.com/lacebx/flightplan-fro.git`
2. **Install:** `npm install`
3. **Run:** `npm run serve` (App available at `http://localhost:8080`)

---

## Available Scripts

- `npm run serve`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run lint`: Lint and auto-fix files

---

## Backend

This frontend is designed to work alongside [flightplanback-end](https://github.com/lacebx/flightplanback-end), the Node.js/Express API that handles authentication, data, and business logic.

---

## Notes

- Only `@oc.edu` Google accounts are permitted to log in.
- This project has 23 branches, each representing different feature work or database configurations.
- Check the active branch's `package.json` for the most up-to-date dependency list.
