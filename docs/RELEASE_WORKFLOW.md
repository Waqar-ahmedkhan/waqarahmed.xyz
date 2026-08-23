# Release workflow

This repository promotes the same tested commit through three branches:

```text
feature branch → development-alpha → staging → main → production
```

## Branch responsibilities

- `development-alpha` is the shared integration branch for active development. Merge feature branches here through pull requests.
- `staging` is the shared day-to-day QA branch. Merge only tested `development-alpha` work here.
- `main` contains only staging-approved commits and deploys to production.

Do not merge feature branches directly into `staging` or `main`.

## Required GitHub settings

Create the three branches in GitHub and protect each one:

| Branch | Allowed pull-request source | Required status check | Deployment |
| --- | --- | --- | --- |
| `development-alpha` | Feature branches | `Lint and production build` | Vercel preview/development |
| `staging` | `development-alpha` | `Lint and production build` | Vercel staging |
| `main` | `staging` | `Lint and production build` | Vercel production |

For all three rules, require pull requests, require the status check above, require branches to be up to date, and block force pushes and branch deletions. Restrict who can push directly to `staging` and `main`.

## Deployment provider mapping

This repository includes a Vercel deployment workflow in `.github/workflows/deploy.yml`. It deploys automatically when a commit reaches one of the environment branches:

- `development-alpha` deploys to Vercel Preview and the GitHub `development` environment.
- `staging` deploys to the Vercel custom `staging` target and the GitHub `staging` environment.
- `main` deploys to the Vercel Production target and the protected GitHub `production` environment.

Before the first push, create the GitHub `development`, `staging`, and `production` environments. Add these environment secrets to each environment:

- `VERCEL_TOKEN`: a Vercel token with access to the project.
- `VERCEL_ORG_ID`: the Vercel team or personal-account ID.
- `VERCEL_PROJECT_ID`: the Vercel project ID.

Create the Vercel custom environment named `staging`, track the `staging` branch, and attach a staging domain such as `staging.waqarahmed.xyz`. Protect the GitHub `production` environment with required reviewers. GitHub will pause each `main` deployment until an authorized reviewer approves it.

## Release numbers

`.github/workflows/release-please.yml` creates a release pull request whenever `main` changes. It updates `package.json`, `package-lock.json`, and `CHANGELOG.md`, then creates the Git tag and GitHub Release when that release pull request is merged.

Use Conventional Commits for meaningful automatic release numbers:

- `fix: correct mobile navigation` creates a patch release.
- `feat: add project filtering` creates a minor release.
- `feat!: redesign portfolio views` or a `BREAKING CHANGE:` footer creates a major release.

The workflow in `.github/workflows/ci.yml` verifies every proposed and promoted change with a locked install, lint, TypeScript validation, and an optimized Next.js production build before it can be deployed.
