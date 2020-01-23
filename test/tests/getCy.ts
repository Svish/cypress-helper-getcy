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

    it('can pass extra selectors', () => {
      cy.getCy('items', '>:nth-child(2)').should('have.text', 'Bob');
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
      cy.getCy('items', undefined, { log: false });
    });

    it('can enable logging for internal `get` via log = true', () => {
      cy.getCy('items', undefined, { log: true });
    });

    it('can pass a timeout to internal `get`', () => {
      cy.getCy('items', undefined, { timeout: 500 });
    });
  });
});
