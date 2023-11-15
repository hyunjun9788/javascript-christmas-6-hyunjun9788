import Validation from "./Validation.js";
import { MENU_ITEMS } from "./constant/constants.js";
class Common {
  constructor() {
    this.validation = new Validation();
    this.menuList = {};
  }

  processOrderInfo(inputOrder) {
    const items = inputOrder.split(",");
    const processedItems = items.map(this.processOrderItem.bind(this));
    return processedItems;
  }

  processOrderItem(item) {
    const [menuItem, count] = item.split("-");
    const parsedCount = Number(count);
    this.validateOrderCount(parsedCount);
    this.updateMenuCount(menuItem, parsedCount);
    return { menuItem, parsedCount: this.menuList[menuItem] };
  }

  validateOrderCount(parsedCount) {
    this.validation.isValidCount(parsedCount);
  }

  updateMenuCount(menuItem, parsedCount) {
    this.menuList[menuItem] = parsedCount;
  }

  isIncludeMenu(orderList) {
    return orderList.some((order) => {
      const menuItem = order.menuItem;
      return Object.values(MENU_ITEMS).some((category) =>
        category.hasOwnProperty(menuItem)
      );
    });
  }

  getCategory(menuItem) {
    const categories = Object.keys(MENU_ITEMS);
    const foundCategory = categories.reduce((result, category) => {
      if (MENU_ITEMS[category].hasOwnProperty(menuItem)) {
        return category;
      }
      return result;
    }, null);

    return foundCategory;
  }
}
export default Common;
