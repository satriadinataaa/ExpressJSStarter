exports.rupiah = function (angka) {
  let rupiah = ''
  const angkarev = angka.toString().split('').reverse().join('')
  for (let i = 0; i < angkarev.length; i++) { if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.' }
  return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
}

exports.dollar = function (angka) {
  let dollar = ''
  const angkarev = angka.toString().split('').reverse().join('')
  for (let i = 0; i < angkarev.length; i++) { if (i % 3 === 0) dollar += angkarev.substr(i, 3) + '.' }
  return '$ ' + dollar.split('', dollar.length - 1).reverse().join('')
}
