document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '9sOx2d1gWYZrKY0uD4hCbOMIQzLcL4KQ';
    const apiUrl = 'https://api.apilayer.com/fixer/latest';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'apikey': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const variable = data.rates;
        const new_variable = {};
        Object.keys(variable).forEach(currency => {
            new_variable[currency] = variable[currency] + 10.0002;
        });
        show_rates(variable, new_variable);
    })
    .catch(error => console.error('Error:', error));
});

function show_rates(variable, new_variable) {
    const tbody = document.getElementById('forexTable').getElementsByTagName('tbody')[0];
    Object.keys(variable).forEach(currency => {
        const row = tbody.insertRow();
        const currency_column = row.insertCell();
        const variable_column = row.insertCell();
        const new_variable_column = row.insertCell();

        currency_column.textContent = currency;
        variable_column.textContent = variable[currency];
        new_variable_column.textContent = new_variable[currency];

        if (isEven(variable[currency])) variable_column.classList.add('even-value');
        if (isEven(new_variable[currency])) new_variable_column.classList.add('even-value');
        if (currency === 'HKD') {
            currency_column.classList.add('currency-HKD');
            variable_column.classList.add('currency-HKD');
            new_variable_column.classList.add('currency-HKD');
        }
    });
}

function isEven(value) {
    const int = parseInt(value);
    return int % 2 === 0;
}
