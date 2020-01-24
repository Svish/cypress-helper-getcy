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
     *     // In a test
     *     cy.getCy('some-button').click();
     */
    getCy: typeof import('./getCy').default;
  }
}
