const key = 'eiAAAcqE7f8iWXKSrYyzGpCV3T832Npq';
const cityinput = document.querySelector('.location');

// query statements


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

    const baseString = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(baseString + query);
    const data = await response.json();

    return data[0];

};



// function to modify the dom using the data object

