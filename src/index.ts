/// <reference path="./globals.ts"/>

import getCy from './getCy';

Cypress.Commands.add('getCy', { prevSubject: false }, getCy);
