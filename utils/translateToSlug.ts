import { transliterate as tr, slugify } from 'transliteration';

const translationToSlug = (
  inputField: string,
  outputField: string,
  getValFunc,
  setValFunc,
  disableOutputFunc,
) => {
  return setTimeout(async () => {
    const inputValue = getValFunc(inputField);
    if (!inputValue) {
      setValFunc(outputField, '');
      disableOutputFunc(false);
      return;
    }
    // const inputTranslate = await translate(inputValue, {
    //   to: 'en',
    //   from: 'ru',
    // });
    const outputSlug = slugify(inputValue, { lower: true });
    setValFunc(outputField, outputSlug, {
      shouldValidate: true,
    });
    disableOutputFunc(false);
  }, 500);
};
export default translationToSlug;
