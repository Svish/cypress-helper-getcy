describe('getCy', () => {
  before(() => {
    cy.visit('./fixtures/index.html');
  });

  it('can get single item', () => {
    cy.getCy('items').should('exist');
  });

  it('can get multiple items', () => {
    cy.getCy('item').should('have.length', 3);
  });

  it('works with within', () => {
    cy.getCy('items').within(() => {
      cy.getCy('item').should('have.length', 2);
    });
  });
});
