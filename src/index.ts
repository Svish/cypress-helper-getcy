/// <reference path="./globals.ts"/>

import getCy from './getCy';
export { cypressTag, useCypressTag, getCypressTag, selector } from './tag';

Cypress.Commands.add('getCy', { prevSubject: false }, getCy);
