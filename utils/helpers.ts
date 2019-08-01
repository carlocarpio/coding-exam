import * as fs from 'fs'
import {
  cashIn,
  cashOut
} from './config'

/* 
** Types Interface
*/

interface IDataCommission {
  type: string;
  user_type: string;
  operation: {
    amount: number;
  }
}

/*
** Helper Functions
*/

export const readFile = (file: string) => (
  fs.readFile(file, (err: Object, data: Object) => {
    if(err) {
      throw err;
    }

    let dataObj = JSON.parse(data.toString())
    for(let item in dataObj) {
      calculateCommission(dataObj[item])
    }
  })
)

export const calculateCommission = (dataObj: IDataCommission) => {
  const {
    type,
    user_type,
    operation
  } = dataObj

  type === 'cash_out'
    ? console.log(forCashOut(operation.amount, user_type))
    : console.log(forCashIn(operation.amount))
}

export const forCashIn = (amount: number) => {
  const {
    percents,
    max
  } = cashIn

  const maxAmount = max.amount
  const percentage = percents / 100
  const result = amount * percentage
  const commission = result > maxAmount ? 5 : result
  return commission
}

const forCashOutNatural = (amount: number) => {
  /*
  **
  ** Default commission fee - 0.3% from cash out amount.
  ** 1000.00 EUR per week (from monday to sunday) is free of charge.
  ** If total cash out amount is exceeded - commission is calculated only from exceeded amount (that is, for 1000.00 EUR there is still no commission fee).
  */
  const {
    percents,
    week_limit,
  } = cashOut.natural

  const percentage = percents / 100

  if(amount > week_limit.amount) {
    const diff = amount - week_limit.amount
    const product = diff * percentage
    return product
  } else {
    return amount * percentage
  }

}

const forCashOutLegal = (amount: number) => {
  const {
    percents,
    min,
  } = cashOut.legal

  const percentage = percents / 100
  const getValue = amount * percentage

  if(getValue < 0.50) {
    return 0.50
  } else {
    return getValue
  }
}

export const forCashOut = (amount: number, userType: string) => {
  return userType === 'natural'
    ? forCashOutNatural(amount)
    : forCashOutLegal(amount)
}

export const roundingCurrency = (amount: number) => (
  Math.ceil(amount)
)