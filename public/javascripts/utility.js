const toIDR = new Intl.NumberFormat("de-DE")

function formatInteger(n) {
    return "Rp " + toIDR.format(n) + ",00"
}