# cypress-helper-getcy

A simple [Cypress](https://www.cypress.io/) [command](https://docs.cypress.io/api/cypress-api/custom-commands.html) for getting elements via `data-cy` attributes.

[![npm version](https://img.shields.io/npm/v/cypress-helper-getcy.svg?style=flat-square) ![npm downloads](https://img.shields.io/npm/dm/cypress-helper-getcy?style=flat-square)](https://www.npmjs.com/package/cypress-helper-getcy)

## Inspiration

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)

### Why not just `cy.get("[data-cy='submit']")`?

Well, I like clean tests, and I found both the test code and logs to be rather ugly and harder to read when doing that. So I wanted something cleaner, and made this, which cleans up both the code and the log. 👍

## Setup

### 1. Install

```shell
npm install --save-dev cypress-helper-getcy
```

### 2. Include

```js
// E.g. in cypress/support/index.js
include 'cypress-helper-getcy';
```

## Tagging your subjects

### Plain HTML

```html
<form data-cy="search">
  <input data-cy="search/input" />
  <button data-cy="search/button">Search</button>
</form>
```

### React, with `useCypressTag` helper

```tsx
import React from 'react';
import { useCypressTag } from 'cypress-helper-getcy';

export default function Search(): React.Element {
  const tag = useCypressTag('search');
  return (
    <form {...tag()}>
      <input {...tag('input')} />
      <button {...tag('button')}>Search</button>
    </form>
  );
}
```

_**Note:** If you get a bunch of TS2403 errors from Typescript after importing `useCypressTag` into your application code, see [this issue](https://github.com/Svish/cypress-helper-getcy/issues/1) for a workaround._

## Getting your subjects

### Plain

```ts
it('finds my tagged subjects', () => {
  cy.getCy('search').should('be.visible');
  cy.getCy('search/input').type('term');
  cy.getCy('search/button').click();

  cy.getCy(['search/input', 'search/button']).should('have.length', 2);
});
```

### Using the `cypressTag` helper

```ts
import { cypressTag } from 'cypress-helper-getcy';

const tag = cypressTag('search');

it('finds my tagged subjects', () => {
  cy.getCy(tag()).should('be.visible');
  cy.getCy(tag('input')).type('term');
  cy.getCy(tag('button')).click();
  cy.getCy(tag(['input', 'button'])).should('have.length', 2);
});
```

### Using the `getCypressTag` helper

```ts
import { getCypressTag } from 'cypress-helper-getcy';

const get = getCypressTag('search');

it('finds my tagged subjects', () => {
  get().should('be.visible');
  get('input').type('term');
  get('button').click();
  get(['input', 'button']).should('have.length', 2);
});
```

_**Note:** See [tests](test/tests/getCy.ts) for more examples._
