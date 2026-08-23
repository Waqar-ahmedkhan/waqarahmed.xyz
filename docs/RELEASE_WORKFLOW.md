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
| `development-alpha` | Feature branches | `Lint and production build` | Vercel preview |
| `staging` | `development-alpha` | `Lint and production build` | Vercel preview |
| `main` | `staging` | `Lint and production build` | Vercel production |

For all three rules, require pull requests, require the status check above, require branches to be up to date, and block force pushes and branch deletions. Restrict who can push directly to `staging` and `main`.

## Deployment provider mapping

Vercel's Git integration owns deployments for this repository. Connect the GitHub repository to the Vercel project and configure `main` as its Production Branch.

- `development-alpha` and `staging` receive Vercel preview deployments.
- `main` receives the Vercel production deployment.

In Vercel project settings:

- Set **Production Branch** to `main`.
- Assign `waqarahmed.xyz` to the production deployment.
- Keep production publicly accessible by disabling Vercel Authentication for production deployments.

No Vercel secrets are required in GitHub Actions. GitHub Actions retains only the quality gate in `.github/workflows/ci.yml`.

The workflow in `.github/workflows/ci.yml` verifies every proposed and promoted change with a locked install, lint, TypeScript validation, and an optimized Next.js production build before it can be deployed.
