/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get one or more DOM elements by `data-cy` attribute.
     *
     * @example
     *
     *     // In a component
     *     <button data-cy="some-button">Click me</button>
     *
     *     // In your test
     *     cy.getCy('some-button').click();
     *
     * @see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
     */
    getCy: <E extends HTMLElement>(
      name: string,
      options?: Partial<Loggable & Timeoutable>
    ) => Chainable<JQuery<E>>;
  }
}
