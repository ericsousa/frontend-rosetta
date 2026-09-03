# Project initialization: one learning exercise, four ecosystems

## Goal

Starting a frontend project means more than generating files. It establishes the development server, build pipeline, testing choices, TypeScript configuration, and the place where an application starts rendering. For FrontEnd Rosetta, the comparable outcome is a small browser application that can be run locally, changed, and built for production.

This is a scaffolding comparison, not a claim that every real application should use the same architecture. The commands below use npm and create one independent project per framework.

## Snapshot

- Reviewed on: 2026-08-30.
- Package manager: npm.
- Node.js: use a version supported by the selected scaffolder. Current Angular 22 requires Node `^22.22.3`, `^24.15.0`, or `^26.0.0`; the Vite-based commands used here require Node `20.19+` or `22.12+`.
- TypeScript: choose it when each scaffold offers it, so the examples can compare typed application code later.
- Scope: client-side learning applications. Svelte is shown with the official SvelteKit starter because Svelte recommends SvelteKit for new applications.

Do not pin a framework version in these commands. The `@latest` tag intentionally records the current official generator at the time it is run; commit the generated lockfile to make an individual exercise reproducible.

## Quick comparison

| Framework | Official entry point used here | Create command | Development command | Production check |
| --- | --- | --- | --- | --- |
| Angular | Angular CLI | `ng new hello-world` | `npm start` or `ng serve` | `npm run build` |
| React | Vite, as the local build setup | `npm create vite@latest hello-world -- --template react-ts` | `npm run dev` | `npm run build` |
| Vue | `create-vue` | `npm create vue@latest` | `npm run dev` | `npm run build` |
| Svelte | Svelte CLI / SvelteKit | `npx sv create hello-world` | `npm run dev` | `npm run build` |

Run each command from its framework directory, for example `react/` for the React project. Follow the interactive prompts where a command does not encode the choices. Generated scripts can change between releases; treat the generated `package.json` as the final authority for that project.

## Angular

Angular provides the Angular CLI as its official workspace and application generator. Install it globally, then create the project:

```bash
npm install -g @angular/cli
ng new hello-world
cd hello-world
npm start
```

Accept the relevant prompts, including TypeScript, routing, stylesheet format, and test runner. Modern Angular projects are standalone by default. The CLI creates an Angular workspace, with the initial application under `src/`, configuration in `angular.json`, and an application entry point in `src/main.ts`.

Verify the result by opening the local address printed by the dev server, changing the root component, and confirming that the browser refreshes. Then stop the server and run:

```bash
npm run build
```

Angular is comparatively workspace-oriented: its CLI configuration can represent more than one application or library, even though a beginner project normally contains one application.

## React

React’s documentation recommends a framework for new production applications. This repository also needs a focused client-side comparison, so it uses Vite as the local module and JSX build setup that React documents for that situation. Create a TypeScript project with:

```bash
npm create vite@latest hello-world -- --template react-ts
cd hello-world
npm install
npm run dev
```

Vite creates a lightweight application with `index.html` as the entry document and a TypeScript/TSX module—normally `src/main.tsx`—that calls React’s `createRoot`. The UI is expressed as a component tree rendered from JavaScript modules.

Verify that the dev-server URL renders, edit the starter `App` component, and check hot updates. Build the static assets with:

```bash
npm run build
```

The important distinction is not “React versus Vite”: React is the UI library, while Vite supplies the development server and bundling in this intentionally client-side setup. Routing, data loading, and server rendering remain choices for a later guide.

## Vue

Vue’s official `create-vue` scaffolder creates a Vite-powered single-page application. From `vue/`, run:

```bash
npm create vue@latest
cd hello-world
npm install
npm run dev
```

At the prompts, choose the project name `hello-world` and TypeScript. Defer optional features unless the exercise needs them; they can be added deliberately later. The generated project commonly places a root component in `src/App.vue`, starts it from `src/main.ts`, and represents components as Single-File Components (`.vue`) that colocate template, logic, and styles.

Verify the displayed local URL, modify `App.vue`, and confirm the update. Create a production build with:

```bash
npm run build
```

Vue’s generated example uses the Composition API and `<script setup>`. It is not the same thing as React hooks or Angular signals, even when the code initially looks similarly concise.

## Svelte

Svelte recommends SvelteKit, its official application framework, for a new project. From `svelte/`, create the minimal typed starter:

```bash
npx sv create hello-world --template minimal --types ts --no-add-ons
cd hello-world
npm install
npm run dev
```

`sv create` sets up a SvelteKit project. The application route is conventionally a `+page.svelte` file under `src/routes/`, with project configuration at the root. Svelte components use `.svelte` files, while SvelteKit adds a filesystem-based routing and rendering model that is absent from a bare Vite Svelte project.

Verify the printed local URL, change the starter page, and confirm the result. Build with:

```bash
npm run build
```

For a deliberately bare Svelte-only experiment, the Svelte documentation also supports creating a Vite project and selecting the `svelte` template. That option leaves routing to a separate choice; this guide uses SvelteKit to follow Svelte’s default recommendation.

## What looks similar, but is not

| Concern | Angular | React | Vue | Svelte |
| --- | --- | --- | --- | --- |
| Main abstraction | CLI-managed workspace and application | UI library plus chosen tooling | Application with Vue Single-File Components | SvelteKit application with Svelte components |
| First render | Bootstrap from `main.ts` | `createRoot` from `main.tsx` | `createApp` from `main.ts` | Route components such as `src/routes/+page.svelte` |
| File convention | TypeScript, HTML, and CSS may be separate | JSX/TSX JavaScript modules | `.vue` Single-File Components | `.svelte` components and `+` route files |
| Routing at generation | Optional CLI choice | Not included in this Vite comparison | Optional `create-vue` choice | Included through SvelteKit conventions |

The shared learning task is to locate the initial screen, render a component, change it, run a dev server, and build it. The implementations should stay behaviorally equivalent, but their generated folders should remain native to their ecosystems.

## Pitfalls and review checklist

- Do not use Create React App for a new project; React documents it as deprecated.
- Keep each generated application independent. Do not create a shared build configuration before a real need exists.
- Do not compare defaults as if they were framework capabilities. Routing, tests, SSR, and linting may be selected by a generator prompt.
- Use a Node version supported by the generator actually being run; compatibility changes over time.
- Before copying a command, check whether it creates a new nested directory. The command should be run from the framework directory, not from the repository root.
- For the course store, do not regenerate, rename, or modify `angular/loja`. It is a protected learning project, not an initialization example to normalize.

## References

- [Angular installation](https://angular.dev/installation)
- [Angular CLI: `ng new`](https://angular.dev/cli/new)
- [Angular version compatibility](https://angular.dev/reference/versions)
- [React installation](https://react.dev/learn/installation)
- [React: add to an existing project](https://react.dev/learn/add-react-to-an-existing-project)
- [Vite getting started](https://vite.dev/guide/)
- [Vue quick start](https://vuejs.org/guide/quick-start.html)
- [Svelte getting started](https://svelte.dev/docs/svelte/getting-started)
- [Svelte CLI: `sv create`](https://svelte.dev/docs/cli/sv-create)
