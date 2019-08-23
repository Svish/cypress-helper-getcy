/**
 * Get one or more DOM elements by `data-cy` attribute.
 *
 * @example
 *
 *     // In a component
 *     <button data-cy="some-button">Click me</button>
 *
 *     // In a test
 *     cy.getCy('some-button').click();
 */
export default <E extends HTMLElement>(
  name: string,
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>
): Cypress.Chainable<JQuery<E>> => {
  const selector = `[data-cy='${name}']`;
  const shouldLog = options && options.log;
  let logger: Cypress.Log;

  if (shouldLog !== false)
    logger = Cypress.log({
      name: 'getCy',
      displayName: 'Get',
      message: [name],
    });

  return cy.get<E>(selector, { log: false, ...options }).should($el => {
    const els = $el.toArray();
    if (logger)
      logger.set({
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
