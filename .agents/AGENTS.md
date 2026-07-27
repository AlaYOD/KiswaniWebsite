# Project Rules & Best Practices for Kiswani Website

## 🧠 Memory & Context Continuity
- Always refer to `.agents/MEMORY.md` to check previous progress, decisions, and system specifications before embarking on major tasks.
- Keep `.agents/MEMORY.md` up to date after completing work or establishing new site configurations.

## ⚡ Token Optimization (تقليل استهلاك التوكنز)
- Be concise and direct in natural language outputs.
- Limit context reading to targeted snippets (`StartLine` / `EndLine`) or search matches (`grep_search`).
- Prefer targeted string replacements (`replace_file_content`) over full file overwrites when editing existing files.
