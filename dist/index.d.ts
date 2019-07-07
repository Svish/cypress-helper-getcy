/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getCy: <E extends HTMLElement>(
      name: string,
      options?: Partial<Loggable & Timeoutable>
    ) => Chainable<JQuery<E>>;
  }
}
