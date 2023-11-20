//PR
export const MENU_ITEMS = {
  에피타이저: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
  },
  메인: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  디저트: {
    초코케이크: 15000,
    아이스크림: 5000,
  },
  음료: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
};

export const LIMIT_ORDER_COUNT = 20;
export const ERROR_MESSAGE = {
  INVALID_DATE: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  INVALID_ORDER: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.",
  LIMIT_SUM_COUNT: "[ERROR] 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.",
  BEVERAGE_ONLY_ORDER: "[ERROR] 음료만 주문 시, 주문할 수 없습니다.",
};

export const END_DATE = "2023-12-25";
export const DDAY_DISCOUNT_BASE = 1000;

export const DISCOUNT_PRICE = {
  PER_DESSERT_DISCOUNT: 2023,
  PER_MAIN_DISCOUNT: 2023,
};

export const STAR_BENEFIT_PRICE = {
  MIN_PRICE: 5000,
  MAX_PRICE: 10000,
};
export const TREE_BENEFIT_PRICE = {
  MIN_PRICE: 10000,
  MAX_PRICE: 20000,
};
export const SANTA_BENEFIT_PRICE = {
  MIN_PRICE: 20000,
};

export const MINIMUM_PRICE_FOR_CHAMPAGNE = 120000;
