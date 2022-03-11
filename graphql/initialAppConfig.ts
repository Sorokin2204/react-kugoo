import { AppConfig } from './AppConfigType';

const initialAppConfig: AppConfig = () => {
  const storageData = JSON.parse(
    typeof window !== 'undefined' &&
      localStorage.getItem('nuffshell.appConfig'),
  );
  if (storageData) {
    return { ...storageData, category: null };
  } else {
    return {
      category: null,
      cartProducts: [],
    };
  }
};

export default initialAppConfig;
