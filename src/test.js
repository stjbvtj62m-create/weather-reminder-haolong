import { getMultiCityWeather, formatWeatherReport } from './weather.js';
import { readFileSync } from 'fs';

/**
 * 测试脚本 - 立即查询天气
 * Test script - Query weather immediately
 */
async function test() {
  console.log('🧪 测试模式 Test Mode\n');
  
  try {
    // 读取配置 Read config
    const configPath = new URL('../config.json', import.meta.url);
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    
    console.log('📍 查询城市 Querying cities:', config.cities.map(c => c.name).join(', '));
    console.log('');
    
    // 获取天气 Get weather
    const weatherData = await getMultiCityWeather(config.cities);
    
    // 格式化并输出 Format and output
    const report = formatWeatherReport(weatherData);
    console.log(report);
    
    console.log('✅ 测试完成 Test completed\n');
  } catch (error) {
    console.error('❌ 测试失败 Test failed:', error.message);
    process.exit(1);
  }
}

test();
