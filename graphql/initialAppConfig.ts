import { AppConfig } from './AppConfigType';

const initialAppConfig: AppConfig = () => {
  const storageData = JSON.parse(
    typeof window !== 'undefined' &&
      localStorage.getItem('nuffshell.appConfig'),
  );
  if (storageData) {
    return {
      ...storageData,
      category: null,
      adminHeaderTitle: null,
      editedOption: null,
    };
  } else {
    return {
      editedOption: null,
      adminHeaderTitle: null,
      category: null,
      cartProducts: [],
    };
  }
};

export default initialAppConfig;
