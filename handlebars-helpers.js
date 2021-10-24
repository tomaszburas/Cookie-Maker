const handlebarsHelpers = {
  findPrice: (ingredients, data) => {
    const obj = data.find((e) => e[0] === ingredients);
    return obj[1];
  },
  summaryPrice: (obj, dataBases, dataGlazes, dataAddons) => {
    const { base, glaze, addons } = obj;
    let sum = 0;

    sum += dataBases.find((e) => e[0] === base)[1];

    if (glaze) {
      sum += dataGlazes.find((e) => e[0] === glaze)[1];
    }

    if (addons) {
      addons.forEach((addon) => {
        sum += dataAddons.find((e) => e[0] === addon)[1];
      });
    }

    return sum;
  },
  couponSummaryPrice: (totalPrice, couponValue) => totalPrice - (totalPrice * (couponValue / 100)),
};

module.exports = {
  handlebarsHelpers,
};
