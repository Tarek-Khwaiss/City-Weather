const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

// retreving the local data 

// let localData = localStorage.getItem('local');


const updateUI = (data) => {

    // if (localData != null) {

    // }
    // else
    //     localStorage.setItem('local', JSON.stringify(localData));

    const cityDetails = data.cityDets;
    const weather = data.weather;

    console.log(cityDetails);
    console.log(weather);

    // changing the city details
    details.innerHTML = `<div class="text-center text-uppercase text-muted details">
            <h5 id="cityName" class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>`;


    // we have to check if there is data
    if (card.classList.contains('d-none'))
        card.classList.remove('d-none');


    // changing the icon
    icon.setAttribute('src', `assets/icons/${weather.WeatherIcon}.svg`);

    // changing the image
    let weatherImage = weather.IsDayTime ? 'assets/sunny.gif' : 'assets/night_hill.gif';
    time.setAttribute('src', weatherImage);

}

const getWeather = async (input) => {

    const cityDetails = await getLocationKey(input);
    const weather = await getForcast(cityDetails[0].Key);

    // a weird behaviour when returning data[0] in the function getLocationKey, so I handled the index here
    let localData = { cityDets: cityDetails[0], weather };
    return localData;
};




cityinput.addEventListener('submit', (e) => {

    // preventing default browser reload
    e.preventDefault();

    // input
    const cityInput = cityinput.city.value.trim();
    localStorage.setItem('cityName', cityInput);
    cityinput.reset();

    getWeather(cityInput)
        .then(data => { updateUI(data) })
        .catch(err => { console.log(err) })
});

if (localStorage.getItem('cityName')) {
    getWeather(localStorage.getItem('cityName')).then(data => { updateUI(data) }).catch(err => { console.log(err) });
}