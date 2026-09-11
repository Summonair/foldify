# Contributing to foldify

Thanks for considering a contribution! `foldify` is small on purpose — keep
that in mind when proposing changes.

## Getting set up

```bash
git clone https://github.com/Summonair/foldify.git
cd foldify
npm install
```

## Development

- `npm run build` — build the library with tsup (ESM + CJS + `.d.ts`)
- `npm run dev` — build in watch mode
- `npm run typecheck` — run `tsc --noEmit`

There's no test runner wired up yet; if you're adding one, prefer Vitest +
jsdom and keep it lightweight.

## Before opening a PR

- Run `npm run typecheck` and `npm run build` locally — CI runs both on
  every PR and will block merge if either fails.
- Keep the graceful-degradation contract intact: every hook and component
  must behave correctly (not throw, not assume the API exists) when
  `window.visualViewport.segments` and `navigator.devicePosture` are
  `undefined`. This is the core promise of the library — please test the
  unsupported-browser path, not just the happy path.
- Match the existing code style (no added dependencies, no comments unless
  something is genuinely non-obvious, minimal API surface).

## Reporting bugs / proposing features

Open a GitHub issue with:
- What you expected vs. what happened
- Browser / device (and whether it actually supports the Viewport Segments
  or Device Posture APIs, or you're testing the fallback path)
- A minimal reproduction if possible

## Releasing (maintainers)

Releases are tag-triggered:

1. Bump `version` in `package.json`
2. Commit and push to `main`
3. `git tag vX.Y.Z && git push origin vX.Y.Z`

The `publish` GitHub Actions workflow builds and publishes to npm via
Trusted Publishing (OIDC) — no local `npm publish` needed after the tag is
pushed.
