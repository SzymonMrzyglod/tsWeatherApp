import { FC, FormEvent, useEffect, useState } from 'react';
import './App.css';
import { WeatherForm } from '../WeatherForm/WeatherForm';
import { WeatherResult } from '../WeatherResult/WeatherResult';

const KEYApi = 'ef39c9d59e30776fa6c28a91fd47f445';

const initialData = {
  date: '',
  city: '',
  sunrise: 0,
  sunset: 0,
  temp: '',
  wind: '',
  pressure: ''
}

const App: FC = () => {
  const [ inputValue, setInputValue ] = useState('');
  const [ weatherData, setWeatherData ] = useState(initialData);
  const [ error, setError ] = useState(false);
  const [ lastInputValue, setLastInputValue ] = useState('')

  const fetchWeather = (value: string) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${KEYApi}&units=metric`;
    
    fetch(API)
    .then(response => {
      if(response.ok){
        return response;
      }
      throw Error('Błąd...')
    })
    .then(response => response.json())
    .then(data => {
      const date = new Date().toLocaleString();
      setLastInputValue(value)
      setWeatherData( {
        date,
        city: inputValue,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        wind: data.wind.speed,
        pressure: data.main.pressure,
      });
      setError(false);
    })
    .catch(error => {
      setWeatherData((initialData));
      setError(true)
    })
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(
      event.currentTarget.value
    )
  }

  useEffect(() => {
    if(inputValue.length === 1 ) return;
    lastInputValue !== inputValue && fetchWeather(lastInputValue);
  }, [inputValue]);

    return(
      <div className="app">
        <div className='app-container'>
        <WeatherForm 
        value={inputValue} 
        onChange={(event) => handleInputChange(event)}
        />
        <WeatherResult 
        weatherData={{...weatherData}}
        error={error}
        />  
       </div>
      </div>
    )
  }

export default App;
