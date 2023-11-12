import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu(orderList) {
    Console.print("<주문 메뉴>");
    orderList.forEach((order) => {
      const menuItem = order.menuItem;
      const count = order.parsedCount;
      Console.print(`${menuItem} ${count}개`);
    });
  },
  printOriginalPurchasePrice(orginalTotalPrice) {
    Console.print(`<할인 전 총주문 금액>\n${orginalTotalPrice}원`);
  },
  printGiftMenu(menu) {
    Console.print(`<증정 메뉴>\n${menu ? menu : "없음"}`);
  },
  printBenefitDetails(
    dDayDiscount,
    weekDayDiscount,
    weekendDiscount,
    bonusMenuPrice
  ) {
    Console.print("<혜택 내역>");
    if (dDayDiscount > 0) {
      Console.print(
        `크리스마스 디데이 할인: ${(-dDayDiscount).toLocaleString()}원`
      );
    }
    if (weekDayDiscount > 0) {
      Console.print(`평일 할인: ${(-weekDayDiscount).toLocaleString()}원`);
    }
    if (weekendDiscount > 0) {
      Console.print(`주말 할인: ${(-weekendDiscount).toLocaleString()}원`);
    }
    if (bonusMenuPrice > 0) {
      Console.print(`증정 이벤트: ${(-bonusMenuPrice).toLocaleString()}원`);
    }
  },
  printTotalBenefitPrice(price) {
    Console.print(`<총혜택 금액>\n${(-price).toLocaleString()}원`);
  },
};

export default OutputView;
