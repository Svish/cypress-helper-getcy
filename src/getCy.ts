/**
 * Get one or more DOM elements by `data-cy` attribute.
 *
 * @example
 *
 *     // In a component
 *     <button data-cy="some-button">Click me</button>
 *
 *     // In your test
 *     cy.getCy('some-button').click();
 *
 * @see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
 */
export const getCy = <E extends HTMLElement>(
  name: string
): Cypress.Chainable<JQuery<E>> => {
  // TODO: Support optional `prevSubject` for searching within `subject`.
  // TODO: Support same options as `get`; use `log` locally and pass on `timeout` to `get`
  const selector = `[data-cy='${name}']`;
  const log = Cypress.log({
    name: 'getCy',
    displayName: 'get cy',
    message: [name],
  });

  return cy.get<E>(selector, { log: false }).should($el => {
    const els = $el.toArray();
    log.set({
      $el: $el,
      consoleProps: () => ({
        name,
        yielded: els.length === 1 ? els[0] : els,
        elements: els.length,
        selector,
      }),
    });
    return $el;
  });
};
