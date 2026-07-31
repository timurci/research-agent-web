# Research Agent Web

This is a minimal frontend implementation for the
[research-agent](https://github.com/timurci/research-agent) project, hosted on
[GitHub Pages](https://timurci.github.io/research-agent-web/).

## Tech stack
- React 19
- Tailwind CSS v4
- Zod (API response validation)

## Configuration
The backend base URL is read from the `BACKEND_BASE_URL` environment variable at
build time. For local development, copy `.env.example` to `.env`:

```sh
cp .env.example .env
```

The GitHub Pages workflow injects `BACKEND_BASE_URL` during the production
build, so make sure the `BACKEND_BASE_URL` repository secret is set (repo
settings → Secrets and variables → Actions).

## Status
The frontend is integrated with the research-agent backend: search queries hit
`POST /search`, thumbs feedback is sent to `POST /feedback`, and the navbar shows
the liveness of the backend via `GET /health`.
