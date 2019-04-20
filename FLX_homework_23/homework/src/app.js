class User {
  constructor(name, orderTotalPrice, weekendDiscount,
    nightDiscound, bonus) {
      this.name = name;
      this.orderTotalPrice = orderTotalPrice;
      this.weekendDiscount = weekendDiscount;
      this.nightDiscound = nightDiscound;
      this.bonus = bonus;
      this.discount = 0;
      this.priceAftDisc = 0;
    }

    makeOrder() {
      let discValue = this.orderTotalPrice * this.discount;
      this.priceAftDisc = this.orderTotalPrice - discValue - this.bonus;
  
      return `Price after discount and
      including bonuses is ${this.priceAftDisc.toFixed(2)}`;
    }
}

function getDiscount(user) {
  user.discount = 0;
  const {nightDiscound, weekendDiscount} = user;
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentDay = currentDate.getDay();

  if (currentHours >= 23 || currentHours <= 6 ) {
    user.discount += nightDiscound;
  } 
  if (currentDay === 6 || currentDay === 0) {
    user.discount += weekendDiscount;
  }

  return +user.discount.toFixed(3);
}

function setBonus(user) {
  let total = user.orderTotalPrice;
  let count = 0;

  while (total >= 100) {
    total /= 100;
    count += Math.trunc(total);
  }
  user.bonus += count * 5;

  return user.bonus;
}

const den = new User('Den', 1000, 0.5, 0.1, 10);
setBonus(den);
getDiscount(den);
getDiscount(den);
den.makeOrder();
