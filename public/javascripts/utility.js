const toIDR = new Intl.NumberFormat("de-DE")

function formatInteger(n) {
    return "Rp " + toIDR.format(n) + ",00"
}

document.addEventListener("DOMContentLoaded", function(ev) {
    document.querySelectorAll('.price-label').forEach(element => {
        element.textContent = formatInteger(element.textContent)
    })

    function updateFontSize() {
        const card = document.querySelector('.card');
        const cardTitles = document.querySelectorAll('#dynamic-card-title-size');

        const cardHeight = card.offsetHeight;
        const fontSize = Math.floor(cardHeight * 0.1);

        cardTitles.forEach((title) => {
            title.style.fontSize = `${fontSize}px`;
        });
    }

    window.addEventListener('resize', updateFontSize);
    updateFontSize();
})