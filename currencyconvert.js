//turning 23 usd to CAD. You can spend in the following countries:
//install and require axios
// this is in es7 async await
//function that takes 3 args... USD, CAD, AND AMOUNT WE WANNA CONVERT BY... cvrt $23..

const axios = require('axios');
//cld work in es5 with function..... THIS IS FIRST ENDPOINT FUNCTION
//key value pair where key is currency.. USD is currency we are converting from.. eventually 23 X this number
// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries:

// USD part rom, cad to...
const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD', 'EUR', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});