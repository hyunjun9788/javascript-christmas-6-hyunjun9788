import Validation from "./Validation.js";
import MENU_ITEMS from "./constant/constants.js";
class Common {
  constructor() {
    this.Validation = new Validation();
  }
  processOrderInfo(inputOrder) {
    const items = inputOrder.split(",");
    const processedItems = items.map((item) => {
      const [menuItem, count] = item.split("-");
      const parsedCount = parseInt(count, 10);
      return [menuItem, parsedCount];
    });
    return processedItems;
  }

  isIncludeMenu(orderList) {
    for (const order of orderList) {
      const [menuItem, parsedCount] = order;
      this.isIncludeMenu = Object.values(MENU_ITEMS).some((category) =>
        category.hasOwnProperty(menuItem)
      );
    }
    return this.isIncludeMenu;
  }
}
export default Common;
