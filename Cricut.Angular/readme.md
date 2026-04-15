# Cricut Angular Site Challenge

This site is based (loosely) on the API for .Net challenge.

## Features
- Authentication
    - Sign in
    - Sign out
- Orders
    - Customer Order Placement
    - Customer Order List
    - Customer Order Detail
    - Customer Order Delete with confirmation
- Angular Materials UI &amp; theme
- Standalone components
- Lazy loaded components

## Todo
- Form validation
- Several small UX improvements including accessibility improvements
- Theme &amp; styling improvements
- HTTP API to replace fake data API
- Deeper tests (current tests are only the defaults)
- Response (mobile) support
- Persistent state
- Proper order placement with real products.

## Testing the Site
You can sign in as any user. An actual email is not required. The user will be created on the fly.
There are two test users that include existing test orders:

- 12345@example.com
- 54321@example.com

Order placement is simplified and generates random quantities for the items selected.

Application state is lost after a refresh.

## Building the application

`bun` was selected as the project's package manager.
The project depends on TypeScript, Angular and Angualr Material. No other third-party package dependencies are used.

```bash
bun install
ng serve
```

