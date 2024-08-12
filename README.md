# Tim's Notes

First off, wow. `vue` has some strengths compared to `react`

## Design Considerations
Note: To make this list easy to digest, the considerations will be listed from the top of page down. These are not in order of importance

### Global
- Mobile first and responsive

### Nav
- Text from links drops when in mobile to accomodate all links (would implement hamburger menu if more items present)
- Links have a minor hover state, but don't trigger any action/location
- User is shown as logged in, this would need to be dynamic in full mock

### Header
- Search and Button align to the grid on larger screens (as seen in comp)
- "+ Service Package" fires off an alert, but doesn't create the package
- Search
  - Typing is debounced to make sure the api is called only after input complete
  - Search updates the query parameters and respects query parameter for reload. Also, resets page to first page on new values to make sure the services load properly
  - The search does not have keyboard submit or an action button.

### Cards
- Cards are in a 3 column grid using CSS `grid`
- Versions:
  - Clickable to show versions table 
    - Version table
      - It is its own component to allow for re-use if on individual service page 
      - Structured as a table with custom CSS to display nicer on mobile
      - Sorted: The table is sorted by updated date in descending order because version numbers are fickle. Ideally: 1) the api returned a created_date, since updated_date might mean the description was updated but the release was created earlier. 2) The table has sortable header
- Title:
  - Click: Navigates to landing page with ideas
- Metrics:
  - Click: Navigates to docs, but could go separate metric dashboard page.
  - Hover: Shows error bounds
  - Coloring: As discussed with Henri, these are made up thresholds that ideally would be configurable or described in the docs. Example: "Uptime below 99.99% is a warning."
  - If the service has not been configured, then "not configured with runtime" is shown in place
  - Each metric is an SFC to allow for reusablilty, unique linking (if desired). This also allows for some flexibility down the line if different service types show different metrics.
- Developer Stack
  - Click: Navigates to developer landing page.
  - Hover: Shows name of developer
  - Sorted by: Version updated_date, ie: the latest version developer shows on the right, then the next developer to the left, and then number of unique developers (excluding the developers displayed) to the left of that.

### Pager
- Hidden if only one page
- When on last page, if there only one item text reads "55 of 55 services" instead of "55 to 55 of 55 Services" because that looks weird.
- Buttons are disabled and unclickable when no previous or next items
- Click: ?page is updated in query parameter 

## Other Considerations
- useServices:
  - Added types to make it easier to work with. They are exported from this file, because they would likely be updated with this api call.
  - This composable used local refs but could use a Pinia with slightly more time
  - The pagination and search are contained here because 
    1) the api might support pagination down the road vs client side 
    1) The search/page are linked, so that when the search changes the page changes and the results update
    1) It keeps the logic all contained and out of the component allowing for future easy reuse.
- I used the Composability API with `<script setup>` to help with typescript.
- I personally like a more opinionated formatter like `prettier` or `biomejs`, but didn't want to deal with eslint config. 
- Colors/Base Styles/Fonts: The site desperately a base style guide to extend. This would help standardize colors, fonts, etc.
- More tests are needed, but I wrote a couple.

# Overall
I'm pretty happy with where it is at for being my first `vue` project and would love some code review to help make sure it is fully up to 

# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>

## Functional Requirements

- [Vue 3](https://vuejs.org/) and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- Routing and views (e.g. navigating to a given service from its card)
- State management with [Pinia](https://pinia.vuejs.org/)
- [Component Tests and/or Unit Tests](#run-component-and-unit-tests-with-vitest-and-optionally-vue-test-utils)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- The project should pass type checking and build successfully
- How you dedicate the allotted time to focus on your strengths
- Test coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
