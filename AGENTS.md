# Instructions for AI agents

## Project mission

FrontEnd Rosetta is a public comparative learning laboratory. The same frontend concepts and projects are studied in Angular, React, Vue, and Svelte. Angular follows the user's college coursework and serves as the source language; the other implementations translate the intent and behavior into the idiomatic approach of each framework.

The repository is also a portfolio piece. Public code, guides, and decisions must be clear, verifiable, and pedagogically useful.

## Mandatory protection of the Angular store project

During the semester, `angular/loja/**` is protected coursework code and must be treated as read-only.

Without a direct and specific user request to modify the Angular store project, an agent must not:

- fix bugs, tests, warnings, typos, or style issues;
- refactor, format, reorganize, rename, or remove files;
- change dependencies, configuration, assets, or generated code;
- complete exercises, implement features, or anticipate course material;
- automatically apply a solution created for another framework to the store project.

Without modifying the project, an agent may:

- read and analyze the code;
- run non-destructive checks such as builds and tests;
- explain concepts, identify problems, and suggest possible approaches;
- create comparative documentation outside the store project;
- use the intended behavior as the basis for implementations in React, Vue, and Svelte.

A broad request such as "organize the repository," "fix the project," or "implement the next step" does not revoke this protection by itself. Before editing the store project, there must be explicit authorization that mentions the Angular project and defines the requested change. When in doubt, preserve the code and ask.

This rule remains in effect until the user states that the semester has ended or expressly changes this file.

## Intended organization

- Code is organized by framework first: `angular/`, `react/`, `vue/`, and `svelte/`.
- Equivalent projects use the same name within each framework, such as `hello-world`, `loja`, and `blog-crud`.
- Public documentation is organized by concept first under `docs/`.
- Framework-neutral project specifications live under `projetos/` and describe behavior rather than a literal implementation.
- All four versions must be equivalent in intent while remaining idiomatic within their respective ecosystems.

Do not create empty structures or unused abstractions in advance. The organization must grow alongside real content.

## Guidelines for public guides

Comparative guides should preferably cover Angular, React, Vue, and Svelte in the same file and follow the order Angular → React → Vue → Svelte, since Angular is the starting point of the learning process.

Public documentation must be written in English. Keep established technical terms in their usual form where that makes the text clearer.

When applicable, each guide must:

- explain the concept independently of any framework;
- show equivalent commands and code side by side;
- record versions, prerequisites, and how to verify the result;
- explain differences in mental models, reactivity, and architecture;
- highlight apparent similarities that conceal different behavior;
- record difficulties, pitfalls, and errors encountered;
- use consistent terminology and official references;
- be written in clear English while preserving recognized technical terms.

Do not turn the guides into mere collections of commands. Their primary value is original, verifiable comparison.

## Language and equivalence policy

The existing professor-led `loja` application remains in Portuguese. Future `loja` implementations in React, Vue, and Svelte must use Portuguese user-facing copy, domain names, and examples so that their behavior remains equivalent to the Angular source project.

Future applications, including `blog-crud`, may use English for an international portfolio only after the course `loja` project has finished. Until then, do not make that language decision in advance.

## Working practices

- Preserve local changes and never overwrite the user's work.
- Inspect `git status` before making relevant changes.
- Do not update versions or tools without need and authorization.
- When a problem is found in the Angular store project, report it without fixing it unless specifically authorized.
- Do not accidentally copy bugs from the coursework code into the other implementations; distinguish the current state from the intended behavior.
- Prefer small, executable, and testable examples.
- Keep documentation and code synchronized.

## Private local context

When present, `.local/` contains private planning, memory, and working material. This directory is ignored by Git and must not be added to the repository, published, or treated as documentation available to GitHub readers.

Before making structural decisions, consult `.local/planejamento/fonte-da-verdade.md` when available. The public repository must remain understandable even when this directory is absent.
