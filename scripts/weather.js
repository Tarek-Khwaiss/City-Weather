const key = 'odVC1E35Qg6u837NeU95Jbt1D8wbSAca';

const getLocationKey = async () => {

    const baseString = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const apiKey = `?apikey=${key}`;

    const response = await fetch('http://dataservice.accuweather.com/locations/v1/cities/search');
    console.log(response.json());
    const data = response.json();
    return data;
}

getCondition().then(() => {
    console.log(data);
}).catch('an error happened');