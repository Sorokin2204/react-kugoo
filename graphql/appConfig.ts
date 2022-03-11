import { makeVar } from '@apollo/client';
import { AppConfig } from './AppConfigType';
import initialAppConfig from './initialAppConfig';

const appConfigVar = makeVar<AppConfig>(initialAppConfig());

export default appConfigVar;
