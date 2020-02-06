import {
  selector,
  cypressTag,
  useCypressTag,
  getCypressTag,
  combineParts,
} from '../..';

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

  describe('selector', () => {
    it('works', () => {
      expect(selector('foo')).equal(`[data-cy='foo']`);
    });
    it('works with `append` parameter', () => {
      expect(selector('foo', ':first-child')).equal(
        `[data-cy='foo']:first-child`
      );
    });
  });

  describe('combineParts', () => {
    it('works no parts', () => {
      expect(combineParts()).equal('');
    });
    it('works with one part', () => {
      expect(combineParts('foo')).equal('foo');
    });
    it('works with multiple parts', () => {
      expect(combineParts('foo', 'bar', 'baz')).equal('foo/bar/baz');
    });
  });

  describe('cypressTag', () => {
    it('works without name', () => {
      expect(cypressTag('foo')()).equal('foo');
    });
    it('works with name', () => {
      expect(cypressTag('foo')('bar')).equal('foo/bar');
    });
    it('works with multiple namespace parts', () => {
      expect(cypressTag('foo', 'bar')('baz')).equal('foo/bar/baz');
    });
  });

  describe('useCypressTag', () => {
    it('works without name', () => {
      expect(useCypressTag('foo')()).eql({ 'data-cy': 'foo' });
    });
    it('works with name', () => {
      expect(useCypressTag('foo')('bar')).eql({ 'data-cy': 'foo/bar' });
    });
    it('works with multiple namespaces', () => {
      expect(useCypressTag('foo', 'bar')('baz')).eql({
        'data-cy': 'foo/bar/baz',
      });
    });
  });

  describe('getCypressTag', () => {
    it('works without name', () => {
      const tag = getCypressTag('foo');
      tag()
        .should('exist')
        .and('have.text', 'Foo');
    });
    it('works with name', () => {
      const tag = getCypressTag('foo');
      tag('bar')
        .should('exist')
        .and('have.text', 'Foo Bar');
    });
    it('works with several names', () => {
      const tag = getCypressTag('foo');
      tag(['bar', 'baz']).should($items => {
        expect($items.eq(0)).to.have.text('Foo Bar');
        expect($items.eq(1)).to.have.text('Foo Baz');
      });
    });
    it('works with several namespaces', () => {
      const tag = getCypressTag('foo', 'bar');
      tag('baz')
        .should('exist')
        .and('have.text', 'Foo Bar Baz');
    });
  });
});
