import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Validation from "./Validation.js";
import Common from "./Common.js";
class App {
  constructor() {
    this.validation = new Validation();
    this.common = new Common();
  }
  async run() {
    await this.inputVisitDate();
    this.inputOrderInfo = await this.inputOrderMenuAndCount();
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
      const orderList = this.common.processOrderInfo(orderMenu);
      const isIncludedMenu = this.common.isIncludeMenu(orderList);
      this.validation.isValidInputMenuAndCount(isIncludedMenu);
    } catch (e) {
      Console.print(e.message);
      await this.inputOrderMenuAndCount();
    }
  }

  convertToNum(Date) {
    return Number(Date);
  }
}

export default App;
