export default function toPersianPrice(price: number | string): string {
  return (+price).toLocaleString('fa-IR')
}
