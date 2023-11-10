import { ERROR_MESSAGE } from "./constant/constants.js";

class Validation {
  constructor() {}
  isValidInputDate(date) {
    if (date < 1 || date > 31 || isNaN(date)) {
      throw new Error(ERROR_MESSAGE.INVALID_DATE);
    }
  }

  isValidInputMenuAndCount(isIncludeMenu) {
    if (!isIncludeMenu) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  }
  isDuplicateMenu(menu, menuList) {
    if (menuList.includes(menu)) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  }
}

export default Validation;
