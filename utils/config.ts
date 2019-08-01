export const cashIn = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: "EUR"
  }
}

export const cashOut = {
  natural: {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR"
    }
  },
  legal: {
    // Commission fee - 0.3% from amount, but not less than 0.50 EUR for operation.
    percents: 0.3,
    min: {
      amount: 0.5,
      currency: "EUR"
    }
  }
}