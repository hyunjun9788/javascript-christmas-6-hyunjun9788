//PR
import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printPreviewMessage(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리보기!\n`
    );
  },
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
      `\n<할인 전 총주문 금액>\n${orginalTotalPrice.toLocaleString()}원\n`
    );
  },
  printGiftMenu(menu) {
    Console.print(`<증정 메뉴>\n${menu ? menu : "없음"}\n`);
  },
  printBenefitDetails(
    originalPurchasePrice,
    dDayDiscount,
    weekDayDiscount,
    weekendDiscount,
    specialDiscount,
    bonusMenuPrice
  ) {
    Console.print("<혜택 내역>");

    if (originalPurchasePrice < 10000) {
      Console.print("없음\n");
      return;
    }
    const printDiscount = (label, discount) => {
      if (discount > 0) {
        Console.print(`${label}: ${(-discount).toLocaleString()}원`);
      }
    };
    printDiscount("크리스마스 디데이 할인", dDayDiscount);
    printDiscount("평일 할인", weekDayDiscount);
    printDiscount("주말 할인", weekendDiscount);
    printDiscount("특별 할인", specialDiscount);
    printDiscount("증정 이벤트", bonusMenuPrice);
  },

  printTotalBenefitPrice(price, originalPurchasePrice) {
    Console.print(
      `\n<총혜택 금액>\n${(originalPurchasePrice >= 10000
        ? -price
        : 0
      ).toLocaleString()}원\n`
    );
  },

  printDiscountedPaymentPrice(price, originalPurchasePrice) {
    const discountedAmount =
      originalPurchasePrice >= 10000 ? price : originalPurchasePrice;
    Console.print(
      `<할인 후 예상 결제 금액>\n${discountedAmount.toLocaleString()}원\n`
    );
  },

  printBadge(badgeName) {
    Console.print(`<12월 이벤트 배지>\n${badgeName ? badgeName : "없음"}`);
  },
};

export default OutputView;
