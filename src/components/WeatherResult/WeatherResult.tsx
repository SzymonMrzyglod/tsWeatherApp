import { FC } from "react";
import './WeatherResult.css';

interface WeatherProps {
    date: string;
    city: string,
    sunrise: number,
    sunset: number,
    temp: string,
    wind: string,
    pressure: string,
}

interface Props {
    weatherData: WeatherProps;
    error: boolean
}

export const WeatherResult: FC<Props> = ({ error, weatherData}: Props) => {
    const {city, date, sunrise, sunset, temp, wind, pressure} = weatherData;

    let content = null;

    if(!error && city){
        const timeSunrise = new Date(sunrise * 1000).toLocaleTimeString();
        const timeSunset = new Date(sunset * 1000).toLocaleTimeString();
        content = (
            <>
                <h2 className="result-city">{city}</h2>
                <p>Data i godzina: <strong>{date}</strong></p>
                <p>Temperatura: <strong>{temp} &#176;C</strong> </p>
                <p>Ciśnienie: <strong>{pressure} hPa</strong></p>
                <p>Prędkość wiatru: <strong>{wind} m/s</strong></p>
                <p>Wschód słońca: <strong>{timeSunrise}</strong></p>
                <p>Zachód słońca: <strong>{timeSunset}</strong></p> 
            </> 
        )
    }

    return(
        <div className='result'>
            {error ? `Brak miasta ${city} w bazie!` : content}
        </div>    
    )
}
