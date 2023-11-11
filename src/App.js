import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./Validation.js";
import Common from "./Common.js";
import { MENU_ITEMS } from "./constant/constants.js";
import OutputView from "./OutputView.js";
class App {
  constructor() {
    this.validation = new Validation();
    this.common = new Common();
  }
  async run() {
    this.visitDate = await this.inputVisitDate();
    await this.inputOrderMenuAndCount();
    this.totalPurchasePrice = this.getTotalOrderPrice(this.orderList);

    this.christmasDiscount();
    this.weekdayAndWeekendDiscount();
    this.specialDiscount();
    console.log(this.totalPurchasePrice);
    this.printPreviewMessage(this.visitDateNum);
    OutputView.printMenu();
  }

  async inputVisitDate() {
    try {
      const visitDate = await InputView.inputVisitDate();
      this.visitDateNum = this.convertToNum(visitDate);
      this.validation.isValidInputDate(this.visitDateNum);
    } catch (e) {
      Console.print(e.message);
      await this.inputVisitDate();
    }
  }

  async inputOrderMenuAndCount() {
    try {
      const orderMenu = await InputView.inputMenuAndCount();
      this.orderList = this.common.processOrderInfo(orderMenu);
      const isIncludedMenu = this.common.isIncludeMenu(this.orderList);
      this.validation.isValidInputMenuAndCount(isIncludedMenu);
      this.sumCounts = this.sumInputCounts(this.orderList);
      this.validation.isLimitCount(this.sumCounts);
    } catch (e) {
      Console.print(e.message);
      await this.inputOrderMenuAndCount();
    }
  }

  convertToNum(Date) {
    return Number(Date);
  }

  sumInputCounts(orderList) {
    return orderList.reduce((total, order) => total + order.parsedCount, 0);
  }

  getTotalOrderPrice(orderList) {
    let totalPrice = 0;

    orderList.forEach((order) => {
      const menuItem = order.menuItem;
      const parsedCount = order.parsedCount;

      for (const category in MENU_ITEMS) {
        if (MENU_ITEMS[category][menuItem] !== undefined) {
          const menuPrice = MENU_ITEMS[category][menuItem];
          totalPrice += menuPrice * parsedCount;
          break;
        }
      }
    });
    return totalPrice;
  }
  printPreviewMessage(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리보기`);
  }

  christmasDiscount() {
    const endDate = new Date("2023-12-25");
    const daysUntilChristmas = Math.ceil(
      endDate - new Date(`2023-12-${this.visitDate}`)
    );

    if (daysUntilChristmas >= 1 && daysUntilChristmas <= 25) {
      const christmasDiscount = 1000 + (25 - daysUntilChristmas) * 100;
      this.totalPurchasePrice -= christmasDiscount;
    }
  }

  weekdayAndWeekendDiscount() {
    const dayOfWeek = new Date(`2023-12-${this.visitDate}`).getDay();

    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
      this.totalPurchasePrice -= 2023 * this.sumDessertCount();
    } else {
      this.totalPurchasePrice -= 2023 * this.sumMainCount();
    }
  }

  sumDessertCount() {
    return this.orderList.reduce((total, order) => {
      const category = this.common.getCategory(order.menuItem);
      return category === "디저트" ? total + order.parsedCount : total;
    }, 0);
  }

  sumMainCount() {
    return this.orderList.reduce((total, order) => {
      const category = this.common.getCategory(order.menuItem);
      return category === "메인" ? total + order.parsedCount : total;
    }, 0);
  }
}

export default App;
