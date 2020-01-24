import { cypressTag, useCypressTag, getCypressTag } from '../..';

describe('cypress-helper-getcy', () => {
  before(() => {
    cy.visit('./fixtures/index.html');
  });

  describe('cy.get', () => {
    context('single name', () => {
      it('can get single item', () => {
        cy.getCy('items').should('exist');
      });

      it('can get a collection of items', () => {
        cy.getCy('item').should('have.length', 3);
      });

      it('can append additional selector', () => {
        cy.getCy('items', '>:nth-child(2)').should('have.text', 'Bob');
      });

      it('works as expected with `within`', () => {
        cy.getCy('items').within(() => {
          cy.getCy('item').should('have.length', 2);
        });
      });
    });

    context('array of names', () => {
      it('can select several items', () => {
        cy.getCy(['items', 'item']).should('have.length', 4);
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

  describe('cypressTag', () => {
    const tag = cypressTag('foo');
    it('works without name', () => {
      expect(tag()).equal('foo');
    });
    it('works with name', () => {
      expect(tag('bar')).equal('foo/bar');
    });
  });

  describe('useCypressTag', () => {
    const tag = useCypressTag('foo');
    it('works without name', () => {
      expect(tag()).eql({ 'data-cy': 'foo' });
    });
    it('works with name', () => {
      expect(tag('bar')).eql({ 'data-cy': 'foo/bar' });
    });
  });

  describe('getCypressTag', () => {
    const getTag = getCypressTag('foo');
    it('works without name', () => {
      getTag()
        .should('exist')
        .and('have.text', 'Foo');
    });
    it('works with name', () => {
      getTag('bar')
        .should('exist')
        .and('have.text', 'Bar');
    });
    it('works with several names', () => {
      getTag(['bar', 'baz']).should($items => {
        expect($items.eq(0)).to.have.text('Bar');
        expect($items.eq(1)).to.have.text('Baz');
      });
    });
  });
});
