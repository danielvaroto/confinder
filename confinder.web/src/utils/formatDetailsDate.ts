export const formatDetailsDate = (input: string) => {
  const splitedInput = input.split('-');
  return `${splitedInput[2]}/${splitedInput[1]}/${splitedInput[0]}`;
};
