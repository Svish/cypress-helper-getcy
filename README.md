# cypress-helper-getcy

> Simple Cypress command for getting elements via `data-cy` attributes, following their [recommended practice](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements).

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

it('works with within', () => {
  cy.getCy('parent').within(() => {
    cy.getCy('child').should('exist');
  });
});
```
