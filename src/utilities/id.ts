import { customAlphabet } from "nanoid";

export const ID_LENGTH = 15;

const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const alphanumericLowerCase = `01234567890${lowerCase}`;

const generateLowerCase = customAlphabet(lowerCase, 1);
const generateAlphanumericLowerCase = customAlphabet(
  alphanumericLowerCase,
  ID_LENGTH - 1,
);

export const generateId = () =>
  `${generateLowerCase()}${generateAlphanumericLowerCase()}`;
