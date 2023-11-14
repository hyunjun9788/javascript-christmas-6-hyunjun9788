import {
  SANTA_BENEFIT_PRICE,
  STAR_BENEFIT_PRICE,
  TREE_BENEFIT_PRICE,
} from "./constant/constants.js";
class Badge {
  #name;

  constructor() {
    this.#name = "";
  }

  getName() {
    return this.#name;
  }
  setName(name) {
    // if (typeof name !== "string") throw "문자열 주셈";

    // if (name.length === 0) throw "님 빈문자열 넣음";

    // if (name !== "산타" && name !== "별" && name !== "현준") throw "유효하지 않은 badge값이 들어갔음";

    this.#name = name;
  }

  badgeEvent(totalBenefitPrice) {
    if (
      totalBenefitPrice >= STAR_BENEFIT_PRICE.MIN_PRICE &&
      totalBenefitPrice < STAR_BENEFIT_PRICE.MAX_PRICE
    ) {
      this.#name = "별";
    }
    if (
      totalBenefitPrice >= TREE_BENEFIT_PRICE.MIN_PRICE &&
      totalBenefitPrice < TREE_BENEFIT_PRICE.MAX_PRICE
    ) {
      this.#name = "트리";
    }
    if (totalBenefitPrice > SANTA_BENEFIT_PRICE.MIN_PRICE) {
      this.#name = "산타";
    }
  }
}

export default Badge;
