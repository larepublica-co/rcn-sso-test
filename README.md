# RCN SSO Test Application

This project is a simple Vue 3 application that demonstrates Single Sign-On (SSO) authentication using OpenID Connect (OIDC). It is intended for testing and validating SSO integration with RCN's identity provider.

## Objective

The main goal of this project is to provide a minimal, easy-to-understand example of how to implement SSO authentication in a Vue 3 application using OIDC. It allows users to sign in, view their authentication details, and sign out, while also displaying authentication logs for debugging and transparency.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher recommended)
- [pnpm](https://pnpm.io/) (used for dependency management)

If you don't have pnpm installed, please refer to the official installation guide: [https://pnpm.io/installation](https://pnpm.io/installation)

## Installation

Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd rcn-sso-test
pnpm install
```

## Running the Application

To start the development server, run:

```sh
pnpm dev
```

This will launch the app at [http://localhost:5173](http://localhost:5173) (or another available port). You can now test the SSO login and logout flows.

## Build for Production

To build the application for production:

```sh
pnpm build
```

To preview the production build locally:

```sh
pnpm preview
```

## Configuration

The OIDC settings (authority, client ID, redirect URIs, etc.) are configured via environment variables. You can use the provided `.env.example` file as a template:

1. Copy `.env.example` to `.env`:
	```sh
	cp .env.example .env
	```
2. Edit the `.env` file and fill in the values required by your identity provider.

## License

This project is for demonstration and testing purposes only.
