export const phoneFormat = (phone: string | number) => {
  let phoneString = phone.toString();
  return `+375 (${phoneString[0] + phoneString[1]}) ${
    phoneString[2] + phoneString[3] + phoneString[4]
  } ${phoneString[5] + phoneString[6]} ${phoneString[7] + phoneString[8]}`;
};
