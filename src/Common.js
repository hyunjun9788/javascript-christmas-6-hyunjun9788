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
      const parsedCount = Number(count, 10);
      this.validation.isValidCount(parsedCount);
      if (this.menuList.hasOwnProperty(menuItem)) {
        this.menuList[menuItem] = parsedCount;
      } else {
        this.menuList[menuItem] = parsedCount;
      }

      return { menuItem, parsedCount: this.menuList[menuItem] };
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

  getCategory(menuItem) {
    for (const category in MENU_ITEMS) {
      if (MENU_ITEMS[category].hasOwnProperty(menuItem)) {
        return category;
      }
    }
    return null;
  }
}
export default Common;
