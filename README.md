# cypress-helper-getcy

A simple [Cypress](https://www.cypress.io/) [command](https://docs.cypress.io/api/cypress-api/custom-commands.html) for getting elements via `data-cy` attributes.

[![npm version](https://img.shields.io/npm/v/cypress-helper-getcy.svg?style=flat-square) ![npm downloads](https://img.shields.io/npm/dm/cypress-helper-getcy?style=flat-square)](https://www.npmjs.com/package/cypress-helper-getcy)

## Inspiration

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements)

### Why not just `cy.get('[data-cy=submit]')`?

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

## Basic usage

```html
<div data-cy="my-test-subject"></div>
```

```ts
it('finds my test subject', () => {
  cy.getCy('my-test-subject').should('exist');
});
```

## With helpers

```tsx
import React from 'react';
import { useCypressTag } from 'cypress-helper-getcy';

export default function Search(): React.Element {
  const tag = useCypressTag('feature/search');
  return (
    <form {...tag()}>
      <input {...tag('input')} />
      <button {...tag('button')}>Search</button>
    </form>
  );
}
```

```ts
import { cypressTag } from 'cypress-helper-getcy';

const tag = cypressTag('feature/search');

it('finds my tagged items', () => {
  cy.getCy(tag('input')).type('term');
  cy.getCy(tag('button')).click();
});
```

```ts
import { getCypressTag } from 'cypress-helper-getcy';

const getCy = getCypressTag('feature/search');

it('finds my tagged items', () => {
  getCy('input').type('term');
  getCy('button').click();
});
```

_**Note:** See [tests](test/tests/getCy.ts) for more examples._
