const droplist = document.querySelectorAll('.drop-list select ')
const getbutton = document.querySelector('form button')
tocurrency = document.querySelector('.to select')
fromcurrency = document.querySelector('.drop-list select')

for (let i = 0; i < droplist.length; i++) {
    for (currency in country_code) {
        //selecting AED by defualt as from currency
        let selected;
        if (i == 0) {
            selected = currency == "USD" ? "selected" : ""
        } else if (i == 1) {
            selected = currency == 'AED' ? "selected" : ""
        }
        //creating tag with passing currency code as text and value
        let optionTag = `<option value="${currency}" ${selected}>${currency}</option>`
        //inserting option tag inside select tag
        droplist[i].insertAdjacentHTML('beforeend', optionTag)
    }
}

//page load
window.addEventListener('load', e => {
    getExchangeRate();
})

getbutton.addEventListener('click', e => {
    e.preventDefault();
    getExchangeRate();
})

const exchangeIcon = document.querySelector('.drop-list .icon')
exchangeIcon.addEventListener('click', () => {
    let tempCode = fromcurrency.value;//tempory currency code of from drop list
    fromcurrency.value = tocurrency.value;//passing to currency code to from currency code
    tocurrency.value = tempCode;//passing tempory currency code to tocurreny code
    getExchangeRate();
})
function getExchangeRate() {
    let amount = document.querySelector('.amount input')
    let amountValue = amount.value;
    // if user enter empty and 0 value so initial value are 1
    if (amountValue == "" || amountValue == '0') {
        amount.value = '1';
        amountValue = 1
    }
    const exchangerateTxt = document.querySelector('.exchange-rate')
    exchangerateTxt.innerText = "Getting Exchange Rate.."
    let url = `https://v6.exchangerate-api.com/v6/5af4d88203cb9f2b1d2b2fb0/latest/${fromcurrency.value}`
    fetch(url).then(res => res.json()
    ).then((result) => {
        let exchangerate = result.conversion_rates[tocurrency.value]
        let totalrate = (amountValue * exchangerate).toFixed(2)
        exchangerateTxt.innerText = `${amountValue} ${fromcurrency.value}=${totalrate} ${tocurrency.value}`

    }).catch(() => {
        exchangerateTxt.innerText = "Something Went Wrong..😒 Please Retry"
    })
}