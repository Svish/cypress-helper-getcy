describe('getCy', () => {
  before(() => {
    cy.visit('./index.html');
  });

  it('can get single item', () => {
    cy.getCy('items').should('exist');
  });

  it('can get multiple items', () => {
    cy.getCy('item').should('have.length', 3);
  });
});
