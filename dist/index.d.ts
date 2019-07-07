declare namespace Cypress {
  interface Chainable<Subject> {
    getCy: typeof import('../src/getCy').getCy;
  }
}
