const getCy = name => {
  // TODO: Support optional `prevSubject` for searching within `subject`.
  // TODO: Support same options as `get`; use `log` locally and pass on `timeout` to `get`
  const selector = `[data-cy='${name}']`;
  const log = Cypress.log({
    name: 'getCy',
    displayName: 'get cy',
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
};

Cypress.Commands.add('getCy', { prevSubject: false }, getCy);
