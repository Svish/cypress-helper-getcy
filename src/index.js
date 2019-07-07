Cypress.Commands.add('getCy', name => {
  // TODO: Add optional `prevSubject` [bertor]
  // TODO: Take in same options as `get`, use `log` and pass on `timeout` [torber]
  const selector = `[data-cy='${name}']`;
  const log = Cypress.log({
    name: 'getCy',
    displayName: 'get',
    message: [name],
  });

  return cy.get(selector, { log: false }).should($el => {
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
});
