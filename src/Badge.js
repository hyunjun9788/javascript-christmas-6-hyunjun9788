//PR
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
    this.#name = name;
  }

  getBadgeName(totalBenefitPrice) {
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
