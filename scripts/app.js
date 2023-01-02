const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

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

    if (card.classList.contains('d-none'))
        card.classList.remove('d-none');


    // changing the icon
    icon.setAttribute('src', `assets/icons/${weather.WeatherIcon}.svg`);

    let weatherImage = weather.IsDayTime ? 'assets/sunny.gif' : 'assets/night_hill.gif';
    time.setAttribute('src', weatherImage);

}

const getWeather = async (input) => {

    const cityDetails = await getLocationKey(input);
    const weather = await getForcast(cityDetails[0].Key);

    // a weird behaviour when returning data[0] in the function getLocationKey, so I handled the index here
    return { cityDets: cityDetails[0], weather };
};

cityinput.addEventListener('submit', (e) => {

    // preventing default browser reload
    e.preventDefault();

    // input
    const cityInput = cityinput.city.value.trim();
    cityinput.reset();

    getWeather(cityInput)
        .then(data => { updateUI(data) })
        .catch(err => { console.log(err) })
});
