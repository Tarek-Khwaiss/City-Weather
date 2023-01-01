const card = document.querySelector('.card');
const details = document.querySelector('.details')


const updateUI = (data) => {

    const CityDetails = data.cityDetails;
    const weather = data.weather;

    console.log(CityDetails);
    console.log(weather);

    // changing the city details
    details.innerHTML = `<div class="text-center text-uppercase text-muted details">
            <h5 id="cityName" class="my-3">${CityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        </div>`;

    if (card.classList.contains('d-none'))
        card.classList.remove('d-none');

    // data object is the weather object
    if (weather.IsDayTime === true)
        card.firstChild.innerHTML = `<img src="assets/sunny.gif" class="card-img-top weather-gif">`;
    else {
        console.log(card.firstChild);
        card.firstChild.innerHTML = `<img src="assets/night_hill.gif" class="card-img-top weather-gif">`;
    }
}

const getWeather = async (input) => {

    const cityDetails = await getLocationKey(input);
    const weather = await getForcast(cityDetails[0].Key);

    // a weird behaviour when returning data[0] in the function getLocationKey, so I handled the index here
    return { cityDetails: cityDetails[0], weather };
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
