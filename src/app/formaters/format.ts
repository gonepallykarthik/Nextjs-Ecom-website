const Currency_formatter = new Intl.NumberFormat("en-US", {
  currency: "INR",
  style: "currency",
});

export const CURRENCY_FORM = (num: number) => {
  return Currency_formatter.format(num);
};

const Num_formatter = new Intl.NumberFormat("en-US");

export const NUM_FORM = (num: number) => {
  return Num_formatter.format(num);
};
