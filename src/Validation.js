import { ERROR_MESSAGE, LIMIT_ORDER_COUNT } from "./constant/constants.js";

class Validation {
  constructor() {}
  isValidInputDate(date) {
    if (date < 1 || date > 31 || !Number.isInteger(date)) {
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
  isValidCount(count) {
    if (!Number.isInteger(count) || Number(count) === 0) {
      throw new Error(ERROR_MESSAGE.INVALID_ORDER);
    }
  }
  isLimitCount(sumCounts) {
    if (sumCounts > LIMIT_ORDER_COUNT) {
      throw new Error(ERROR_MESSAGE.LIMIT_SUM_COUNT);
    }
  }
  isBeverageOnlyOrder(isBeverageOnly) {
    if (isBeverageOnly) {
      throw new Error(ERROR_MESSAGE.BEVERAGE_ONLY_ORDER);
    }
  }
}

export default Validation;
