import { isDevMode } from '@angular/core';
// Environment
export const URL_SERVICES = isDevMode() ? 'http://localhost:3000/' : '';
