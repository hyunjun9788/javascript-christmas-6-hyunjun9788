import Validation from "./Validation.js";
import { MENU_ITEMS } from "./constant/constants.js";
class Common {
  constructor() {
    this.validation = new Validation();
    this.menuList = [];
  }
  processOrderInfo(inputOrder) {
    const items = inputOrder.split(",");
    const processedItems = items.map((item) => {
      const [menuItem, count] = item.split("-");
      const parsedCount = parseInt(count, 10);
      this.validation.isValidCount(parsedCount);
      this.validation.isDuplicateMenu(menuItem, this.menuList);
      this.menuList.push(menuItem);

      return { menuItem, parsedCount };
    });
    return processedItems;
  }

  isIncludeMenu(orderList) {
    for (const order of orderList) {
      const { menuItem, parsedCount } = order;
      this.isIncludedMenu = Object.values(MENU_ITEMS).some((category) =>
        category.hasOwnProperty(menuItem)
      );
    }
    return this.isIncludedMenu;
  }
}
export default Common;
