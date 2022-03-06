import appConfigVar from './appConfig';

export default function saveAppConfig() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nuffshell.appConfig', JSON.stringify(appConfigVar()));
  }
}
