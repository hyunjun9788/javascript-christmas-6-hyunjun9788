import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";
const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("기능 테스트", () => {
  test("모든 타이틀 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "<할인 전 총주문 금액>",
      "<증정 메뉴>",
      "<혜택 내역>",
      "<총혜택 금액>",
      "<할인 후 예상 결제 금액>",
      "<12월 이벤트 배지>",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("혜택 내역 타이틀과 없음 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["26", "타파스-1,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<혜택 내역>" + LINE_SEPARATOR + "없음"];

    expectLogContains(getOutput(logSpy), expected);
  });
  test("orderList에 MENU_ITEMS에 있는 메뉴 항목이 포함되어 있을 때 true를 반환", () => {
    // given
    const app = new App();
    const orderList = [{ menuItem: "티본스테이크", parsedCount: 1 }];

    // when
    const result = app.isIncludeMenu(orderList);

    // then
    expect(result).toBe(true);
  });

  test("orderList에 MENU_ITEMS에 있는 메뉴 항목이 포함되어 있지 않을 때 false를 반환", () => {
    // given
    const app = new App();
    const orderList = [{ menuItem: "떡볶이", parsedCount: 1 }];

    // when
    const result = app.isIncludeMenu(orderList);

    // then
    expect(result).toBe(false);
  });

  test("존재하는 메뉴 항목에 대해 올바른 카테고리를 반환", () => {
    // given
    const app = new App();
    const menuItem = "티본스테이크";

    // when
    const result = app.getCategory(menuItem);

    // then
    expect(result).toBe("메인");
  });

  test("존재하지 않는 메뉴 항목에 대해 null을 반환해야 합니다.", () => {
    // given
    const app = new App();
    const menuItem = "존재하지 않는 메뉴";

    // when
    const result = app.getCategory(menuItem);

    // then
    expect(result).toBeNull();
  });

  test("주문이 모두 음료에 속할 경우 isBeverageOnlyOrder에 true를 전달.", () => {
    // given
    const app = new App();
    app.orderList = [
      { menuItem: "제로콜라", parsedCount: 2 },
      { menuItem: "레드와인", parsedCount: 1 },
    ];
    app.validation.isBeverageOnlyOrder = jest.fn();
    // when
    app.processBeverageOnly();

    // then
    expect(app.validation.isBeverageOnlyOrder).toHaveBeenCalledWith(true);
  });

  test("주문 중 하나라도 음료에 속하지 않을 경우 isBeverageOnlyOrder에 false를 전달", () => {
    // given
    const app = new App();
    app.orderList = [
      { menuItem: "해산물파스타", parsedCount: 2 },
      { menuItem: "티본스테이크", parsedCount: 1 },
    ];
    app.validation.isBeverageOnlyOrder = jest.fn();
    // when
    app.processBeverageOnly();

    // then
    expect(app.validation.isBeverageOnlyOrder).toHaveBeenCalledWith(false);
  });

  test("주문 합계가 LIMIT_ORDER_COUNT를 초과하지 않을 때 정상적으로 동작하는지 테스트", () => {
    // given
    const app = new App();
    app.orderList = [
      { menuItem: "해산물파스타", parsedCount: 2 },
      { menuItem: "레드와인", parsedCount: 1 },
    ];

    // Mock 함수로 대체
    app.validation.isLimitCount = jest.fn();

    // when
    app.calculateSumCounts();

    // then
    expect(app.validation.isLimitCount).toHaveBeenCalledWith(3);
    expect(app.sumCounts).toBe(3);
  });

  test("방문 날짜가 크리스마스까지 24일 이내일 때 크리스마스 할인 적용 테스트", () => {
    const app = new App();
    app.visitDateNum = 1;
    const originalDiscountedTotalPrice = 1000;
    app.discountedTotalPrice = originalDiscountedTotalPrice;

    app.christmasDiscount();

    const expectedDiscount = 1000 + (app.visitDateNum - 1) * 100;
    const expectedTotalPrice = originalDiscountedTotalPrice - expectedDiscount;
    expect(app.discountedTotalPrice).toBe(expectedTotalPrice);
  });

  test("방문 날짜가 크리스마스까지 24일 이상일 때 크리스마스 할인 적용 테스트", () => {
    const app = new App();
    app.visitDateNum = 26;
    const originalDiscountedTotalPrice = 1000;
    app.discountedTotalPrice = originalDiscountedTotalPrice;

    app.christmasDiscount();

    expect(app.discountedTotalPrice).toBe(originalDiscountedTotalPrice);
  });
});

describe("예외 테스트", () => {
  test("날짜 예외 테스트", async () => {
    // given
    const INVALID_DATE_MESSAGE =
      "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["1", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["a", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_DATE_MESSAGE)
    );
  });

  test("주문 예외 테스트", async () => {
    // given
    const INVALID_ORDER_MESSAGE =
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["3", "제로콜라-a", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ORDER_MESSAGE)
    );
  });

  test("메뉴 주문 수의 합이 제한을 초과하면 에러 발생 테스트", () => {
    // given
    const app = new App();
    app.orderList = [
      { menuItem: "제로콜라", parsedCount: 12 },
      { menuItem: "해산물파스타", parsedCount: 10 },
    ];

    // when, then
    expect(() => app.calculateSumCounts()).toThrowError(
      "[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다."
    );
  });

  test("중복된 메뉴에 대한 예외 테스트", () => {
    // Given
    const app = new App();
    const orderListWithDuplicate = [
      { menuItem: "제로콜라", parsedCount: 2 },
      { menuItem: "티본스테이크", parsedCount: 1 },
      { menuItem: "제로콜라", parsedCount: 3 },
    ];

    app.orderList = orderListWithDuplicate;

    expect(() => {
      app.checkForDuplicateMenuItems(app.orderList);
    }).toThrowError("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  });
});
