// Add commas to a number
export const addCommas = (value: string) => {
  const number = value.replace(/,/g, '') // Remove existing commas
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Convert English digits to Persian
export const toPersianNumber = (value: string) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return value.replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)])
}

// Convert Persian digits to English
export const toEnglishNumber = (value: string) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  const englishDigits = '0123456789'
  return value.replace(
    /[۰-۹]/g,
    (digit) => englishDigits[persianDigits.indexOf(digit)]
  )
}
