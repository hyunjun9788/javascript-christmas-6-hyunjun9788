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
    Console.print(
      `<할인 전 총주문 금액>\n${orginalTotalPrice.toLocaleString()}원`
    );
  },
  printGiftMenu(menu) {
    Console.print(`<증정 메뉴>\n${menu ? menu : "없음"}`);
  },
  printBenefitDetails(
    originalPurchasePrice,
    dDayDiscount,
    weekDayDiscount,
    weekendDiscount,
    bonusMenuPrice
  ) {
    Console.print("<혜택 내역>");

    if (originalPurchasePrice < 10000) {
      Console.print("없음");
      return;
    }
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

  printTotalBenefitPrice(price, originalPurchasePrice) {
    Console.print(
      `<총혜택 금액>\n${(originalPurchasePrice >= 10000
        ? -price
        : 0
      ).toLocaleString()}원`
    );
  },
  printDiscountedPaymentPrice(price, originalPurchasePrice) {
    const discountedAmount =
      originalPurchasePrice >= 10000 ? price : originalPurchasePrice;
    Console.print(
      `<할인 후 예상 결제 금액>\n${discountedAmount.toLocaleString()}원`
    );
  },
  printBadge(badgeName) {
    Console.print(`<12월 이벤트 배지>\n${badgeName ? badgeName : "없음"}`);
  },
};

export default OutputView;
