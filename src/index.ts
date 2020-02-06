/// <reference path="./globals.ts"/>

import getCy from './getCy';
export {
  cypressTag,
  useCypressTag,
  getCypressTag,
  selector,
  combineParts,
} from './tag';

Cypress.Commands.add('getCy', { prevSubject: false }, getCy);
