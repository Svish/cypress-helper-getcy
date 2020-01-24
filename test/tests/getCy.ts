import { cypressTag, useCypressTag, getCypressTag } from '../../dist';

describe('getCy', () => {
  before(() => {
    cy.visit('./fixtures/index.html');
  });

  describe('basic usage', () => {
    it('can get single item', () => {
      cy.getCy('items').should('exist');
    });

    it('can get multiple items', () => {
      cy.getCy('item').should('have.length', 3);
    });

    it('can pass extra selectors', () => {
      cy.getCy('items', '>:nth-child(2)').should('have.text', 'Bob');
    });

    it('works as expected with `within`', () => {
      cy.getCy('items').within(() => {
        cy.getCy('item').should('have.length', 2);
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

  describe('helpers', () => {
    it('cypressTag', () => {
      const tag = cypressTag('foo');
      expect(tag()).equal('foo');
      expect(tag('bar')).equal('foo/bar');
    });

    it('useCypressTag', () => {
      const tag = useCypressTag('foo');
      expect(tag()).eql({ 'data-cy': 'foo' });
      expect(tag('bar')).eql({ 'data-cy': 'foo/bar' });
    });

    it('cypressTagGetCy', () => {
      const getTag = getCypressTag('foo');
      getTag()
        .should('exist')
        .and('have.text', 'Foo');
      getTag('bar')
        .should('exist')
        .and('have.text', 'Bar');
    });
  });
});
