import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { getMultiCityWeather } from './weather.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 读取配置
const configPath = path.join(__dirname, '../config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

/**
 * API 路由：获取天气数据
 * GET /api/weather
 */
app.get('/api/weather', async (req, res) => {
  try {
    console.log('📡 API 请求：获取天气数据', new Date().toLocaleString('zh-CN'));
    
    const weatherData = await getMultiCityWeather(config.cities);
    
    if (weatherData.length === 0) {
      return res.status(500).json({
        success: false,
        error: '无法获取天气数据'
      });
    }
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: weatherData
    });
  } catch (error) {
    console.error('❌ API 错误:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API 路由：获取配置的城市列表
 * GET /api/cities
 */
app.get('/api/cities', (req, res) => {
  res.json({
    success: true,
    cities: config.cities.map(c => ({
      name: c.name,
      nameEn: c.nameEn
    }))
  });
});

/**
 * 健康检查
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * 主页路由
 * GET /
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(60));
  console.log('🌤️  Weather Reminder Web Server | 天气提醒网页服务');
  console.log('='.repeat(60));
  console.log(`\n✅ 服务器运行中 Server running on:`);
  console.log(`   📍 本地访问 Local: http://localhost:${PORT}`);
  console.log(`   🌐 网络访问 Network: http://0.0.0.0:${PORT}`);
  console.log(`\n📊 API 端点 Endpoints:`);
  console.log(`   GET /api/weather  - 获取天气数据`);
  console.log(`   GET /api/cities   - 获取城市列表`);
  console.log(`   GET /api/health   - 健康检查`);
  console.log(`\n💡 按 Ctrl+C 停止服务器 Press Ctrl+C to stop\n`);
  console.log('='.repeat(60) + '\n');
});

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n\n👋 正在关闭服务器... Shutting down server...\n');
  process.exit(0);
});
