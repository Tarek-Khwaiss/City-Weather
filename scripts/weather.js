const key = 'eiAAAcqE7f8iWXKSrYyzGpCV3T832Npq';
const cityinput = document.querySelector('.location');


const getLocationKey = async (cityName) => {

    const baseString = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const input = cityName;
    const query = `?apikey=${key}&q=${input}`;

    const response = await fetch(baseString + query);
    const data = response.json();

    // console.log(data[0]);
    return data;
}

const getForcast = async (cityKey) => {
    // const key = '';
    // getLocationKey(inputData)
    //     .then((data) => {
    //         // here we have to extract the key from the json object
    //         key = data;
    //     })
    //     .catch('an error happened :/');
    const baseString = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(baseString + query);
    const data = await response.json();

    return data[0];

};


cityinput.addEventListener('submit', (e) => {
    e.preventDefault();
    inputData = cityinput.city.value;
    getLocationKey(inputData).then((data) => {
        console.log(data[0]);
        return getForcast(data[0].Key)
            .then((data) => {
                // function to change the html template and add the information
                console.log(data);
            })
    })
        .catch('an error happened :/');
});


