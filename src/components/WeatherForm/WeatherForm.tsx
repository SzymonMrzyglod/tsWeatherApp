import { FC } from "react";
import './WeatherForm.css'

interface FormProps {
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    value: string | number | readonly string[];
}

export const WeatherForm: FC<FormProps> = ({onChange, value}: FormProps) => (
    <>
    <h1 className="form-title">Aktualna pogoda</h1>
    <form className="form">
        <input 
        className='form-input'
        onChange={onChange}
        placeholder="Wpisz miasto..."
        type="text" 
        value={value}
        />
    </form>
    </>
)
