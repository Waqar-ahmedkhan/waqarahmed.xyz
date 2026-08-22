# Release workflow

This repository promotes the same tested commit through three branches:

```text
feature branch → development-alpha → main → versioned tag → production
```

## Branch responsibilities

- `development-alpha` is the shared integration branch for active development. Merge feature branches here through pull requests.
- `main` contains only approved commits promoted from `development-alpha`. A numbered release tag created from `main` is the production release trigger.

Do not merge feature branches directly into `main`.

## Required GitHub settings

Create the three branches in GitHub and protect each one:

| Branch | Allowed pull-request source | Required status check | Deployment |
| --- | --- | --- | --- |
| `development-alpha` | Feature branches | `Lint and production build` | None |
| `main` | `development-alpha` | `Lint and production build` | Numbered release tags deploy production |

For both rules, require pull requests, require the status check above, require branches to be up to date, and block force pushes and branch deletions. Restrict who can push directly to `main`.

## Deployment provider mapping

This repository includes a Vercel deployment workflow in `.github/workflows/deploy.yml`. It deploys automatically only when a numbered release tag is created:

- a `vX.Y.Z` release tag deploys to the protected GitHub `production` environment using Vercel's production settings.

Before the first push, create the GitHub `production` environment. Add these environment secrets:

- `VERCEL_TOKEN`: a Vercel token with access to the project.
- `VERCEL_ORG_ID`: the Vercel team or personal-account ID.
- `VERCEL_PROJECT_ID`: the Vercel project ID.

Protect the `production` environment with required reviewers. GitHub will pause each `main` deployment until an authorized reviewer approves it.

## Release numbers

`.github/workflows/release-please.yml` creates a release pull request whenever `main` changes. It updates `package.json`, `package-lock.json`, and `CHANGELOG.md`, then creates the Git tag and GitHub Release when that release pull request is merged. That numbered tag starts the production deployment workflow.

Use Conventional Commits for meaningful automatic release numbers:

- `fix: correct mobile navigation` creates a patch release.
- `feat: add project filtering` creates a minor release.
- `feat!: redesign portfolio views` or a `BREAKING CHANGE:` footer creates a major release.

The workflow in `.github/workflows/ci.yml` verifies every proposed and promoted change with a locked install, lint, TypeScript validation, and an optimized Next.js production build before it can be deployed.
