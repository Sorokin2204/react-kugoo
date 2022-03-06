import { AppConfig } from './AppConfigType';

const initialAppConfig: AppConfig = JSON.parse(
  typeof window !== 'undefined' && localStorage.getItem('nuffshell.appConfig'),
) || {
  cartProducts: [],
};

export default initialAppConfig;
