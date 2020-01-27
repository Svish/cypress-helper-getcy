import { selector as makeSelector } from './tag';

export type Options = Partial<Cypress.Loggable & Cypress.Timeoutable>;
export type Return<E extends HTMLElement> = Cypress.Chainable<JQuery<E>>;

/**
 * Get one or more DOM elements by `data-cy` attribute.
 *
 * @example
 * ```tsx
 * // In a component
 * <button data-cy="some-button">Click me</button>
 *
 * // In a test
 * cy.getCy('some-button').click();
 * ```
 */
export default function getCy<E extends HTMLElement>(
  tag: string | string[],
  append: string = '',
  options?: Options
): Return<E> {
  const selector =
    typeof tag === 'string'
      ? makeSelector(tag, append)
      : tag.map(n => makeSelector(n, append)).join(', ');
  const shouldLog = options && options.log;
  let logger: Cypress.Log;

  if (shouldLog !== false)
    logger = Cypress.log({
      name: 'getCy',
      displayName: 'Get',
      message: [tag, append],
    });

  return cy
    .get<E>(selector, { log: false, ...options })
    .should($el => {
      const els = $el.toArray();
      if (logger)
        logger.set({
          $el: $el,
          consoleProps: () => ({
            name: tag,
            yielded: els.length === 1 ? els[0] : els,
            elements: els.length,
            selector,
          }),
        });
      return $el;
    });
}
