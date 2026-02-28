import cron from 'node-cron';
import { getMultiCityWeather, formatWeatherReport } from './weather.js';

/**
 * 执行天气查询任务
 * Execute weather query task
 * 
 * @param {Array<Object>} cities - 城市列表 Cities array
 * @param {Object} notificationConfig - 通知配置 Notification config
 */
export async function executeWeatherTask(cities, notificationConfig) {
  console.log(`\n⏰ 定时任务触发 Scheduled task triggered at ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}\n`);
  
  try {
    // 获取天气数据 Get weather data
    console.log('🔄 正在获取天气数据... Fetching weather data...\n');
    const weatherData = await getMultiCityWeather(cities);
    
    if (weatherData.length === 0) {
      console.error('❌ 未能获取任何天气数据 No weather data retrieved');
      return;
    }
    
    // 格式化报告 Format report
    const report = formatWeatherReport(weatherData);
    console.log(report);
    
    // 发送通知 Send notification
    if (notificationConfig.enabled) {
      await sendNotification(report, notificationConfig);
    }
    
    console.log('✅ 天气查询任务完成 Weather task completed\n');
  } catch (error) {
    console.error('❌ 任务执行失败 Task execution failed:', error.message);
  }
}

/**
 * 发送通知
 * Send notification
 * 
 * @param {string} message - 消息内容 Message content
 * @param {Object} config - 通知配置 Notification config
 */
async function sendNotification(message, config) {
  if (config.method === 'console') {
    console.log('📢 通知方式: 控制台输出 Notification method: Console output');
    return;
  }
  
  if (config.method === 'webhook' && config.webhook) {
    try {
      console.log('📤 发送到 Webhook Sending to webhook...');
      const response = await fetch(config.webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });
      
      if (response.ok) {
        console.log('✅ Webhook 发送成功 Webhook sent successfully');
      } else {
        console.error('❌ Webhook 发送失败 Webhook failed:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Webhook 错误 Webhook error:', error.message);
    }
  }
}

/**
 * 启动定时任务
 * Start scheduled task
 * 
 * @param {Object} config - 完整配置对象 Full config object
 */
export function startScheduler(config) {
  const { cities, schedule, notification } = config;
  
  console.log('\n🚀 天气提醒服务启动 Weather Reminder Service Starting...\n');
  console.log(`📅 定时规则 Schedule: ${schedule.cron}`);
  console.log(`⏰ 说明 Description: ${schedule.description}`);
  console.log(`🌍 时区 Timezone: ${schedule.timezone}`);
  console.log(`📍 监控城市 Cities: ${cities.map(c => c.name).join(', ')}\n`);
  
  // 验证 cron 表达式 Validate cron expression
  if (!cron.validate(schedule.cron)) {
    console.error('❌ 无效的 cron 表达式 Invalid cron expression:', schedule.cron);
    return;
  }
  
  // 立即执行一次（可选） Run once immediately (optional)
  console.log('🔄 首次运行，立即执行一次天气查询 Initial run, executing weather query...\n');
  executeWeatherTask(cities, notification);
  
  // 设置定时任务 Set up scheduled task
  cron.schedule(schedule.cron, () => {
    executeWeatherTask(cities, notification);
  }, {
    timezone: schedule.timezone
  });
  
  console.log('✅ 定时任务已设置 Scheduled task configured successfully\n');
  console.log('💡 服务运行中... Service is running... Press Ctrl+C to stop\n');
}
