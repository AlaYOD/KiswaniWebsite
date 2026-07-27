---
name: project-memory
description: Memorize project state, progress, architectural decisions, and previous work to maintain memory across tasks.
---

# Project Memory & Context Persistence Skill

This skill ensures that all previous project decisions, changes, completed tasks, and context are saved persistently so that future AI interactions remember everything without losing context.

## Core Rules for Memory Management

1. **Memory Storage**:
   - Maintain a centralized project memory file at `.agents/MEMORY.md`.
   - Update `.agents/MEMORY.md` whenever key decisions are made, tasks are completed, or new features are introduced.

2. **Structure of `.agents/MEMORY.md`**:
   - **Project Overview & Tech Stack**: Core technologies, framworks, APIs, active theme/plugins.
   - **Completed Tasks & Progress**: High-level log of implemented features, pages, or bug fixes.
   - **Key Architecture & Configuration**: Database setup, server details, endpoints, configuration flags.
   - **Pending Tasks & Roadmap**: What needs to be done next.

3. **When to Update Memory**:
   - At the end of completing a major feature, page creation, or refactoring.
   - When new credentials, site URLs, or integration details are established.
   - When important design choices or preferences are stated by the user.

4. **Token Efficiency via Memory**:
   - Reading `.agents/MEMORY.md` at the start of a multi-step task prevents the need to re-scan the entire directory tree or re-read long source files.
