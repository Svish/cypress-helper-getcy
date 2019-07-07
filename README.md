# cypress-helper-getcy

![npm](https://img.shields.io/npm/v/cypress-helper-getcy.svg?style=flat-square)

> A simple [Cypress](https://www.cypress.io/) [command](https://docs.cypress.io/api/cypress-api/custom-commands.html) for getting elements via `data-cy` attributes, following their [recommended practice](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements).

## Install

```shell
npm install cypress-helper-getcy
```

```js
// cypress/support/index.js
include 'cypress-helper-getcy';
```

## Usage

```html
<div data-cy="my-test-subject"></div>
```

```js
it('finds my test subject', () => {
  cy.getCy('my-test-subject').should('exist');
});
```

_**Note:** See [tests](test/tests/getCy.ts) for more examples._
