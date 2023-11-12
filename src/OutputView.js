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
    Console.print("<증정 메뉴>");
    Console.print(menu);
  },
};

export default OutputView;
