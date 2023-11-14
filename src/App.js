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
    this.originalPurchasePrice = 0;
    this.bonusMenuPrice = 0;
    this.bonusMenu = "";
  }
  async run() {
    await this.inputVisitDate();
    await this.inputOrderMenuAndCount();
    this.calculateTotalPrices();
    this.applyDiscounts();
    this.calculateTotalBenefitPrice();
    this.badgeName = this.badgeEvent();
    this.printResults();
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
      this.processAndValidateOrder();
    } catch (e) {
      Console.print(e.message);
      this.orderList = [];
      await this.inputOrderMenuAndCount();
    }
  }

  processBeverageOnly() {
    const isBeverageOnly = this.orderList.every(
      (order) => this.common.getCategory(order.menuItem) === "음료"
    );
    this.validation.isBeverageOnlyOrder(isBeverageOnly);
  }

  calculateSumCounts() {
    this.sumCounts = this.sumInputCounts(this.orderList);
  }

  validateOrder() {
    const isIncludedMenu = this.common.isIncludeMenu(this.orderList);
    this.validation.isValidInputMenuAndCount(isIncludedMenu);
    this.validation.isLimitCount(this.sumCounts);
  }

  processAndValidateOrder() {
    this.processBeverageOnly();
    this.calculateSumCounts();
    this.validateOrder();
  }

  calculateTotalPrices() {
    this.discountedTotalPrice = this.getTotalOrderPrice(this.orderList);
    this.originalPurchasePrice = this.discountedTotalPrice;
  }

  applyDiscounts() {
    this.christmasDiscount();
    this.weekdayAndWeekendDiscount();
    this.specialDiscount();
    this.giftChampagneEvent();
  }

  convertToNum(Date) {
    return Number(Date);
  }

  sumInputCounts(orderList) {
    return orderList.reduce((total, order) => total + order.parsedCount, 0);
  }

  calculateMenuPrice(category, menuItem, parsedCount) {
    if (MENU_ITEMS[category][menuItem] !== undefined) {
      return MENU_ITEMS[category][menuItem] * parsedCount;
    }
    return 0;
  }

  processOrder(order) {
    const { menuItem, parsedCount } = order;

    Object.keys(MENU_ITEMS).forEach((category) => {
      this.totalPrice += this.calculateMenuPrice(
        category,
        menuItem,
        parsedCount
      );
    });
  }

  getTotalOrderPrice(orderList) {
    this.totalPrice = 0;
    orderList.forEach(this.processOrder.bind(this));
    return this.totalPrice;
  }

  christmasDiscount() {
    const endDate = new Date("2023-12-25");
    const userVisitDate = new Date(`2023-12-${this.visitDateNum}`);
    const timeDifference = endDate.getTime() - userVisitDate.getTime();
    const daysUntilChristmas = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    if (daysUntilChristmas >= 0 && daysUntilChristmas <= 24) {
      this.dDayDiscount = 1000 + (24 - daysUntilChristmas) * 100;
      this.discountedTotalPrice -= this.dDayDiscount;
    }
  }

  weekdayAndWeekendDiscount() {
    const dayOfWeek = new Date(`2023-12-${this.visitDateNum}`).getDay();
    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
      this.weekDayDiscount = 2023 * this.sumDessertCount();
      this.discountedTotalPrice -= this.weekDayDiscount;
    } else {
      this.weekendDiscount = 2023 * this.sumMainCount();
      this.discountedTotalPrice -= this.weekendDiscount;
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
  specialDiscount() {
    if (this.hasSpecialEvent(this.visitDateNum)) {
      this.specialDiscountPrice = 1000;
      this.discountedTotalPrice -= this.specialDiscountPrice;
    }
  }

  hasSpecialEvent(currentDay) {
    const eventCalendar = [
      "2023-12-03",
      "2023-12-10",
      "2023-12-17",
      "2023-12-24",
      "2023-12-31",
    ];
    const currentDate = `2023-12-${currentDay.toString().padStart(2, "0")}`;
    return eventCalendar.includes(currentDate);
  }
  giftChampagneEvent() {
    if (this.originalPurchasePrice >= 120000) {
      this.bonusMenu += "샴페인 1개";
      const champagnePrice = MENU_ITEMS.음료.샴페인;
      this.bonusMenuPrice += champagnePrice;
    } else {
      this.bonusMenu += "없음";
    }
  }
  calculateTotalBenefitPrice() {
    this.totalBenefitPrice =
      this.originalPurchasePrice -
      this.discountedTotalPrice +
      this.bonusMenuPrice;
  }
  badgeEvent() {
    if (this.totalBenefitPrice >= 5000 && this.totalBenefitPrice < 10000) {
      this.badgeName = "별";
    }
    if (this.totalBenefitPrice >= 10000 && this.totalBenefitPrice < 20000) {
      this.badgeName = "트리";
    }
    if (this.totalBenefitPrice > 20000) {
      this.badgeName = "산타";
    }
    return this.badgeName;
  }
  printResults() {
    OutputView.printPreviewMessage(this.visitDateNum);
    OutputView.printMenu(this.orderList);
    OutputView.printOriginalPurchasePrice(this.originalPurchasePrice);
    OutputView.printGiftMenu(this.bonusMenu);
    OutputView.printBenefitDetails(
      this.originalPurchasePrice,
      this.dDayDiscount,
      this.weekDayDiscount,
      this.weekendDiscount,
      this.specialDiscountPrice,
      this.bonusMenuPrice
    );
    OutputView.printTotalBenefitPrice(
      this.totalBenefitPrice,
      this.originalPurchasePrice
    );
    OutputView.printDiscountedPaymentPrice(
      this.discountedTotalPrice,
      this.originalPurchasePrice
    );
    OutputView.printBadge(this.badgeName);
  }
}

export default App;
