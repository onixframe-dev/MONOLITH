# Style structure

`index.css` is the only style manifest. It imports the ordered files from `segments/`.

- `00` — design tokens, reset, shared primitives.
- `01` — public navigation.
- `02`, `13` — hero variants and their responsive rules.
- `03`–`10` — public-site sections and pages.
- `11` — admin shell.
- `12`, `16` — responsive and mobile navigation rules.
- `14`–`23` — motion and later polish layers.

Keep new styles in a domain-specific segment and add it to `index.css` after its base styles. This preserves the intentional cascade without returning to one large stylesheet.
