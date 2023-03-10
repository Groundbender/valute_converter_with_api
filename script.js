const select = document.querySelector("select");

const inputValute = document.querySelector(".input-valute");

const output = document.querySelector(".output");
const convertBtn = document.querySelector(".convert");

let valuteRates = {};

const getCurrencies = async () => {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await response.json();
  const result = await data;
  console.log(result);

  valuteRates.usd = result.Valute.USD.Value.toFixed(2);
  valuteRates.eur = result.Valute.EUR.Value.toFixed(2);
  // inputUSD.value = valuteRates.usd;
  // inputEUR.value = valuteRates.eur;
  console.log(valuteRates);
};

getCurrencies();

const getInput = () => {
  return {
    val: Number(inputValute.value),
    currency: select.value,
  };
};

const convert = ({ val, currency }) => {
  if (val < 0) {
    return null;
  }
  if (!inputValute.classList.contains("from-rub")) {
    return (val * valuteRates[currency]).toFixed(2);
  } else {
    return (val / valuteRates[currency]).toFixed(2);
  }
};

const render = (result) => {
  output.value = result;
};

convertBtn.addEventListener("click", function () {
  const result = convert(getInput());

  render(result);
});

select.addEventListener("change", function () {
  output.value = 0;
  inputValute.classList.remove("from-rub");
  document.querySelector(".val-label").textContent =
    select.options[select.selectedIndex].textContent;

  document.querySelector(".rub-label").textContent = "RUB";
  const result = convert(getInput());

  // render(result);
});

document.querySelector(".change").addEventListener("click", () => {
  inputValute.classList.toggle("from-rub");
  if (inputValute.classList.contains("from-rub")) {
    document.querySelector(".val-label").textContent = "RUB";

    document.querySelector(".rub-label").textContent =
      select.options[select.selectedIndex].textContent;
  } else {
    document.querySelector(".val-label").textContent =
      select.options[select.selectedIndex].textContent;

    document.querySelector(".rub-label").textContent = "RUB";
  }
});
