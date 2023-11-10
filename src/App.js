import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import validation from "./Validation.js";
class App {
  constructor() {}
  async run() {
    await this.inputVisitDate();
  }

  async inputVisitDate() {
    try {
      const visitDate = await InputView.inputVisitDate();
      this.visitDateNum = this.convertToNum(visitDate);
      validation.isValidInputDate(this.visitDateNum);
    } catch (e) {
      Console.print(e.message);
      await this.inputVisitDate();
    }
  }

  convertToNum(Date) {
    return Number(Date);
  }
}

export default App;
