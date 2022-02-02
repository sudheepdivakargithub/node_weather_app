console.log("Client side JS file is loaded");



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
message1.textContent = "From Javascript";
message2.textContent = "";
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    message2.textContent = "Loading...";
    fetch('http://localhost:3000/weather?address=' + location).then((resp) => {
        resp.json().then(data => {
            if (data.error) {
                message2.textContent = data.error;
            } else {
                message2.textContent = "Location: " + data.location + ". Forecast: " + data.forecast;
            }
        }
        );
    })
})