import React, { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  country: string;
}

function WeatherApp() {
  const [city, setCity] = useState<string>(""); // Thành phố nhập vào
  const [weather, setWeather] = useState<WeatherData | null>(null); // Dữ liệu thời tiết
  const [error, setError] = useState<string | null>(null); // Bắt lỗi từ API hoặc validation

  // Hàm lấy dữ liệu thời tiết
  const fetchWeather = async (cityName: string) => {
    const apiKey = "YOUR_API_KEY"; // Đăng ký tại https://openweathermap.org/api để lấy API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    try {
      setError(null); // Xóa lỗi trước khi gọi API
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Không tìm thấy thành phố!");
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
      });
    } catch (err: any) {
      setError(err.message);
      setWeather(null); // Reset weather nếu có lỗi
    }
  };

  // Lắng nghe thành phố (khi nhấn "Tìm kiếm")
  const handleSearch = () => {
    if (city.trim() === "") {
      setError("Vui lòng nhập tên thành phố!");
      return;
    }
    fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h2>🌤️ Ứng dụng Thời tiết</h2>
      <div className="weather-form">
        <input
          type="text"
          placeholder="Nhập tên thành phố..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>
            {weather.city}, {weather.country}
          </h3>
          <p>Nhiệt độ: {weather.temperature}°C</p>
          <p>Thời tiết: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;