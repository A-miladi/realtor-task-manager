// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function toPersianDigits(value: any) {
  const charCodeZero = '۰'.charCodeAt(0)
  return String(value).replace(/[0-9]/g, (w) =>
    String.fromCharCode(w.charCodeAt(0) + charCodeZero - 48)
  )
}

export const toPersianNumber = (value: string): string => {
  const englishToPersianMap: Record<string, string> = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  }

  return value.replace(/\d/g, (digit) => englishToPersianMap[digit] || digit)
}
