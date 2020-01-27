import { Options, Return } from './getCy';

export interface DataCyProp {
  'data-cy': string;
}

function ns(namespace: string, name?: string): string {
  return name ? `${namespace}/${name}` : namespace;
}

/**
 * Assembles a CSS selector for a `data-cy` data attribute.
 *
 * @param tag The data-cy tag, e.g. `"foobar"` or `"foo/bar"`
 * @param append Optional selector to append, e.g. `":first-child"`
 * @returns E.g. `"[data-cy='foobar']"`, or `"[data-cy='foobar']:first-child"`
 */
export function selector(tag: string, append: string = ''): string {
  return `[data-cy='${tag}']` + append;
}

/**
 * Helper function to create tags.
 *
 * @example
 * ```ts
 *      const tag = cypressTag('feature/search')
 *      cy.getCy(tag())         // <-- feature/search
 *      cy.getCy(tag('input'))  // <-- feature/search/input
 * ```
 * @param namespace The namespace string to use.
 * @returns A function which returns a namespaced tag.
 */
export function cypressTag(namespace: string) {
  return (name?: string): string => ns(namespace, name);
}

/**
 * Helper React hook to tag HTML elements for Cypress tests.
 *
 * @example
 * ```tsx
 *      export default function Search(): React.Element {
 *        const tag = useCypressTag('feature/search')
 *        return (
 *          <form {...tag()}>
 *            <input {...tag('input')} />
 *            <button {...tag('button')}>Search</button>
 *          </form>
 *        )
 *      }
 * ```
 * @param namespace The namespace string to use.
 * @returns A function that returns an object with the data-cy prop, ready to be spread onto an HTML element.
 */
export function useCypressTag(namespace: string) {
  const tag = cypressTag(namespace);
  return (name?: string): DataCyProp => ({ 'data-cy': tag(name) });
}

/**
 * Helper function to use in Cypress tests.
 *
 * @example
 * ```ts
 *      const getCy = cypressTagGetCy('feature/search')
 *      getCy('input-field')
 * ```
 * @param namespace The namespace string to use.
 * @returns The `namespacedTag` function, with namespace preset.
 */
export function getCypressTag(namespace: string) {
  const nsTag = cypressTag(namespace);
  return function<E extends HTMLElement>(
    tag?: string | string[],
    append?: string,
    options?: Options
  ): Return<E> {
    return cy.getCy(
      typeof tag === 'string'
        ? nsTag(tag)
        : typeof tag === 'undefined'
        ? nsTag()
        : tag.map(t => nsTag(t)),
      append,
      options
    );
  };
}
