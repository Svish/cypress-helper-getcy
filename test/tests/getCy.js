describe('getCy', () => {
  before(() => {
    cy.visit('./fixtures/index.html');
  });

  describe('usage', () => {
    it('can get single item', () => {
      cy.getCy('items').should('exist');
    });

    it('can get multiple items', () => {
      cy.getCy('item').should('have.length', 3);
    });

    context('with `within`', () => {
      it('also works as expected', () => {
        cy.getCy('items').within(() => {
          cy.getCy('item').should('have.length', 2);
        });
      });
    });
  });

  describe('options', () => {
    it('can disable logging via log = false', () => {
      cy.getCy('items', { log: false });
    });

    it('can enable logging for internal `get` via log = true', () => {
      cy.getCy('items', { log: true });
    });

    it('can pass a timeout to internal `get`', () => {
      cy.getCy('items', { timeout: 500 });
    });
  });
});
