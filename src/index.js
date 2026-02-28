import { readFileSync } from 'fs';
import { startScheduler } from './scheduler.js';

/**
 * 主程序入口
 * Main entry point
 */
function main() {
  try {
    // 读取配置文件 Read config file
    const configPath = new URL('../config.json', import.meta.url);
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    
    // 启动调度器 Start scheduler
    startScheduler(config);
  } catch (error) {
    console.error('❌ 启动失败 Startup failed:', error.message);
    process.exit(1);
  }
}

// 处理进程信号 Handle process signals
process.on('SIGINT', () => {
  console.log('\n\n👋 收到停止信号，正在退出... Received stop signal, exiting...\n');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 收到终止信号，正在退出... Received termination signal, exiting...\n');
  process.exit(0);
});

// 启动应用 Start application
main();
