import { useState } from "react";
import './App.css'; // ווידוא שקובץ ה-css של Tailwind מיובא

const api = {
    key: "ee1914eeb6f2a89e5487c68254039dd9",
    base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [weeklyForecast, setWeeklyForecast] = useState([]);
    const [weatherIcon, setWeatherIcon] = useState("");

    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
                setWeatherIcon(getWeatherIcon(result.weather[0].main));
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });

        fetch(`${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeeklyForecast(result.list);
            })
            .catch((error) => {
                console.error("Error fetching weekly forecast data:", error);
            });
    };

    // Function to get appropriate weather icon based on weather condition
    const getWeatherIcon = (weatherCondition) => {
        switch (weatherCondition) {
            case "Clear":
                return "sun.svg";
            case "Rain":
                return "rain.svg";
            case "Clouds":
                return "clouds.svg";
            case "Wind":
                return "wind.svg";
            default:
                return "default.svg";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <img src="logo.svg" className="h-7 sm:h-12 mx-auto" alt="Weather Logo" />
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <p>Get the latest weather updates!</p>
                                <p>Enter a city or town below to get started.</p>
                            </div>
                            <div className="mt-6">
                                <input
                                    type="text"
                                    placeholder="Enter city/town"
                                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none w-full"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                                    onClick={searchPressed}
                                >
                                    Search
                                </button>
                            </div>
                            {typeof weather.main !== "undefined" ? (
                                <div className="mt-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-bold">Current Weather</p>
                                            <p className="text-gray-600">{weather.name}, {weather.sys.country}</p>
                                        </div>
                                        <img src={weatherIcon} className="h-10 w-10" alt="Weather Icon" />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-lg font-bold">{weather.main.temp} °C</p>
                                        <p>{weather.weather[0].description}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-8 text-lg font-bold text-gray-600">No weather data found</p>
                            )}
                            {weeklyForecast.length > 0 && (
                                <div className="mt-8">
                                    <p className="text-lg font-bold">Weekly Forecast</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                        {weeklyForecast.map((forecast, index) => (
                                            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                                                <p>{forecast.dt_txt}</p>
                                                <p>{forecast.main.temp} °C</p>
                                                <p>{forecast.weather[0].description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
