import fetch from 'node-fetch';

/**
 * 获取城市天气信息
 * Get weather information for a city
 * 
 * @param {Object} city - 城市信息对象 City info object
 * @param {string} city.name - 中文名称 Chinese name
 * @param {string} city.nameEn - 英文名称 English name
 * @param {number} city.lat - 纬度 Latitude
 * @param {number} city.lon - 经度 Longitude
 * @returns {Promise<Object>} 天气数据 Weather data
 */
export async function getWeather(city) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Shanghai`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      city: city.name,
      cityEn: city.nameEn,
      current: {
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        weatherDesc: getWeatherDescription(data.current.weather_code)
      },
      today: {
        tempMax: data.daily.temperature_2m_max[0],
        tempMin: data.daily.temperature_2m_min[0],
        precipitation: data.daily.precipitation_sum[0],
        weatherCode: data.daily.weather_code[0],
        weatherDesc: getWeatherDescription(data.daily.weather_code[0])
      }
    };
  } catch (error) {
    console.error(`❌ 获取 ${city.name} 天气失败 (Failed to get weather for ${city.name}):`, error.message);
    return null;
  }
}

/**
 * 批量获取多个城市的天气
 * Get weather for multiple cities
 * 
 * @param {Array<Object>} cities - 城市列表 Cities array
 * @returns {Promise<Array<Object>>} 天气数据数组 Weather data array
 */
export async function getMultiCityWeather(cities) {
  const weatherPromises = cities.map(city => getWeather(city));
  const results = await Promise.all(weatherPromises);
  return results.filter(result => result !== null);
}

/**
 * 根据天气代码获取天气描述
 * Get weather description by code
 * 
 * @param {number} code - WMO 天气代码 WMO weather code
 * @returns {Object} 中英文描述 Chinese and English description
 */
function getWeatherDescription(code) {
  const weatherCodes = {
    0: { zh: '晴朗', en: 'Clear sky', emoji: '☀️' },
    1: { zh: '主要晴朗', en: 'Mainly clear', emoji: '🌤️' },
    2: { zh: '部分多云', en: 'Partly cloudy', emoji: '⛅' },
    3: { zh: '多云', en: 'Overcast', emoji: '☁️' },
    45: { zh: '有雾', en: 'Foggy', emoji: '🌫️' },
    48: { zh: '雾凇', en: 'Depositing rime fog', emoji: '🌫️' },
    51: { zh: '小毛毛雨', en: 'Light drizzle', emoji: '🌦️' },
    53: { zh: '毛毛雨', en: 'Moderate drizzle', emoji: '🌦️' },
    55: { zh: '大毛毛雨', en: 'Dense drizzle', emoji: '🌧️' },
    61: { zh: '小雨', en: 'Slight rain', emoji: '🌧️' },
    63: { zh: '中雨', en: 'Moderate rain', emoji: '🌧️' },
    65: { zh: '大雨', en: 'Heavy rain', emoji: '⛈️' },
    71: { zh: '小雪', en: 'Slight snow', emoji: '🌨️' },
    73: { zh: '中雪', en: 'Moderate snow', emoji: '❄️' },
    75: { zh: '大雪', en: 'Heavy snow', emoji: '❄️' },
    77: { zh: '雨夹雪', en: 'Snow grains', emoji: '🌨️' },
    80: { zh: '小阵雨', en: 'Slight rain showers', emoji: '🌦️' },
    81: { zh: '阵雨', en: 'Moderate rain showers', emoji: '🌧️' },
    82: { zh: '大阵雨', en: 'Violent rain showers', emoji: '⛈️' },
    85: { zh: '小阵雪', en: 'Slight snow showers', emoji: '🌨️' },
    86: { zh: '大阵雪', en: 'Heavy snow showers', emoji: '❄️' },
    95: { zh: '雷暴', en: 'Thunderstorm', emoji: '⛈️' },
    96: { zh: '雷暴伴小冰雹', en: 'Thunderstorm with slight hail', emoji: '⛈️' },
    99: { zh: '雷暴伴大冰雹', en: 'Thunderstorm with heavy hail', emoji: '⛈️' }
  };
  
  return weatherCodes[code] || { zh: '未知', en: 'Unknown', emoji: '❓' };
}

/**
 * 格式化天气报告
 * Format weather report
 * 
 * @param {Array<Object>} weatherData - 天气数据数组 Weather data array
 * @returns {string} 格式化的报告 Formatted report
 */
export function formatWeatherReport(weatherData) {
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  
  let report = `\n${'='.repeat(50)}\n`;
  report += `🌤️  多城市天气播报 | Multi-City Weather Report\n`;
  report += `📅 ${timestamp}\n`;
  report += `${'='.repeat(50)}\n\n`;
  
  weatherData.forEach((data, index) => {
    report += `📍 ${data.city} (${data.cityEn})\n`;
    report += `${'-'.repeat(40)}\n`;
    report += `🌡️  当前温度 Current: ${data.current.temperature}°C (体感 Feels like: ${data.current.feelsLike}°C)\n`;
    report += `${data.current.weatherDesc.emoji}  天气状况 Weather: ${data.current.weatherDesc.zh} | ${data.current.weatherDesc.en}\n`;
    report += `💧 湿度 Humidity: ${data.current.humidity}%\n`;
    report += `🌬️  风速 Wind: ${data.current.windSpeed} km/h\n`;
    report += `📊 今日温度范围 Today: ${data.today.tempMin}°C ~ ${data.today.tempMax}°C\n`;
    
    if (data.today.precipitation > 0) {
      report += `☔ 今日降水 Precipitation: ${data.today.precipitation}mm\n`;
    }
    
    report += `\n`;
  });
  
  report += `${'='.repeat(50)}\n`;
  report += `💡 数据来源 Data source: Open-Meteo API\n`;
  report += `${'='.repeat(50)}\n`;
  
  return report;
}
