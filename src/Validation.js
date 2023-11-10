import MENU_ITEMS from "./constant/constants.js";
class Validation {
  constructor() {}
  isValidInputDate(date) {
    if (date < 1 || date > 31 || isNaN(date)) {
      throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }

  isValidInputMenuAndCount(isIncludeMenu) {
    if (!isIncludeMenu) {
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    }
  }
}

export default Validation;
