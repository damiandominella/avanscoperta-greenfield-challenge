Model: Claude 4.6 Opus


1st prompt:

```
> me: Improve this spec file: <original-spec.md>
```

2nd prompt:

```
> me: Add something that says to test with vitest
``

3rd prompt (after spec was ok):

```
> me: Ok how can I ask claude to create a plan that build this with a TDD approach, in steps. Asking me permissions after each test passes ?

> claude:
You want a meta-prompt — something you paste into Claude Code (or a new chat) along with the spec. Here's what I'd use: 
Paste this prompt + the spec into Claude Code (or a new chat with computer use). The key ingredients:

Explicit stop-and-ask contract — without this, Claude will steamroll through the entire implementation in one shot.
Fixed step order — mirrors the dependency graph (chunker has no deps → embedder → storage → searcher → CLI glues them together). Each step only needs what was built before it.
"Show me what's next" — forces Claude to declare intent before coding, so you can course-correct early instead of after 500 lines.
One tip: if Claude starts batching steps or skipping the red phase, just reply "You skipped the failing test. Back up." — it'll comply.

outputs: <prompt-for-plan.md>
```