---
name: token-optimizer
description: Optimize token consumption by using targeted searches, concise responses, and efficient context management.
---

# Token Optimization Skill (تقليل استهلاك التوكنز)

This skill enforces high-efficiency context and token management to save costs, reduce latency, and maximize response accuracy.

## 1. Targeted Code Inspection
- **Do not read entire large files**: Avoid viewing 500+ lines at once if only a small section is needed. Use `StartLine` and `EndLine` parameters with `view_file`.
- **Use `grep_search`**: Locate specific symbols, functions, or imports across files instead of listing/reading multiple files sequentially.
- **Selective `list_dir`**: Explore specific subdirectories rather than deeply nested recursive directory listings.

## 2. Efficient Response Generation
- **Concise Summaries**: Keep explanations short, clear, and direct. Avoid fluff and verbose preamble.
- **No Unnecessary Repetition**: Do not repeat full source code or entire modified files back to the user in chat responses when standard tool calls have already applied the edits.
- **Targeted Diff Edits**: Use `replace_file_content` or `multi_replace_file_content` for precise block modifications instead of rewriting whole files.

## 3. Leverage Persistent Memory
- Store recurring facts, directory structures, and setup info in `.agents/MEMORY.md`.
- Read `.agents/MEMORY.md` to get context instantly instead of running repetitive investigative commands.
