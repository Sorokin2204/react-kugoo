import slugify from 'slugify';
import translate from 'translate';

const translationToSlug = (
  inputField: string,
  outputField: string,
  getValFunc,
  setValFunc,
  disableOutputFunc,
) => {
  return setTimeout(async () => {
    const inputValue = getValFunc(inputField);
    // [inputField.split('.')[0]][
    //   inputField.split('.')[1]
    // ];
    if (!inputValue) {
      setValFunc(inputField, '');
      disableOutputFunc(false);
      return;
    }
    const inputTranslate = await translate(inputValue, {
      to: 'en',
      from: 'ru',
    });
    const outputSlug = slugify(inputTranslate, { lower: true });
    setValFunc(outputField, outputSlug, {
      shouldValidate: true,
    });
    disableOutputFunc(false);
  }, 500);
};
export default translationToSlug;
