# Weather Reminder Haolong

[English](#english) | [中文](#chinese)

<a name="english"></a>
## 🌤️ English

### Overview
A lightweight multi-city weather reminder tool that automatically fetches and reports daily weather updates for **Guangzhou**, **Shenzhen**, and **Chaozhou**.

### ✨ Features
- 🌍 **Multi-city support**: Pre-configured for Guangzhou, Shenzhen, and Chaozhou
- ⏰ **Scheduled reminders**: Customizable cron-based scheduling
- 🆓 **No API key required**: Uses free Open-Meteo API
- 📊 **Comprehensive data**: Temperature, humidity, wind speed, precipitation
- 🎨 **Rich formatting**: Emoji-enhanced weather descriptions
- 🌐 **Bilingual**: Chinese and English support
- 🔔 **Flexible notifications**: Console output or webhook integration

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/huanghaolong001/weather-reminder-haolong.git
cd weather-reminder-haolong

# Install dependencies
npm install
```

### 🚀 Usage

#### Run with default schedule (8:00 AM daily)
```bash
npm start
```

#### Test immediately without waiting for scheduled time
```bash
npm test
```

#### Development mode
```bash
npm run dev
```

### ⚙️ Configuration

Edit `config.json` to customize:

```json
{
  "cities": [
    {
      "name": "广州",
      "nameEn": "Guangzhou",
      "lat": 23.1291,
      "lon": 113.2644
    }
  ],
  "schedule": {
    "cron": "0 8 * * *",
    "timezone": "Asia/Shanghai",
    "description": "Run at 8:00 AM every day"
  },
  "notification": {
    "enabled": true,
    "method": "console",
    "webhook": ""
  }
}
```

#### Schedule Options (cron format)
- `0 8 * * *` - Daily at 8:00 AM
- `0 7,19 * * *` - Daily at 7:00 AM and 7:00 PM
- `0 */6 * * *` - Every 6 hours
- `0 8 * * 1-5` - Weekdays at 8:00 AM

### 📊 Example Output

```
==================================================
🌤️  多城市天气播报 | Multi-City Weather Report
📅 2024/1/15 08:00:00
==================================================

📍 广州 (Guangzhou)
----------------------------------------
🌡️  当前温度 Current: 18.5°C (体感 Feels like: 17.2°C)
⛅  天气状况 Weather: 部分多云 | Partly cloudy
💧 湿度 Humidity: 65%
🌬️  风速 Wind: 12.5 km/h
📊 今日温度范围 Today: 15.0°C ~ 22.0°C

📍 深圳 (Shenzhen)
----------------------------------------
🌡️  当前温度 Current: 19.8°C (体感 Feels like: 18.5°C)
☀️  天气状况 Weather: 晴朗 | Clear sky
💧 湿度 Humidity: 60%
🌬️  风速 Wind: 10.2 km/h
📊 今日温度范围 Today: 16.5°C ~ 23.5°C

...
```

### 🔔 Webhook Integration

To send notifications to external services (Slack, Discord, WeChat Work, etc.):

```json
{
  "notification": {
    "enabled": true,
    "method": "webhook",
    "webhook": "https://your-webhook-url.com/endpoint"
  }
}
```

### 🛠️ Technology Stack
- **Runtime**: Node.js 16+
- **Scheduler**: node-cron
- **HTTP Client**: node-fetch
- **API**: Open-Meteo (free, no registration required)

### 📝 License
MIT License - feel free to use and modify!

### 🤝 Contributing
Issues and pull requests are welcome!

---

<a name="chinese"></a>
## 🌤️ 中文

### 概述
一个轻量级的多城市天气提醒工具，自动获取并播报**广州**、**深圳**、**潮州**三个城市的每日天气信息。

### ✨ 功能特性
- 🌍 **多城市支持**：预配置广州、深圳、潮州
- ⏰ **定时提醒**：基于 cron 表达式的可自定义调度
- 🆓 **无需 API 密钥**：使用免费的 Open-Meteo API
- 📊 **全面数据**：温度、湿度、风速、降水量
- 🎨 **丰富格式**：带 Emoji 的天气描述
- 🌐 **双语支持**：中英文输出
- 🔔 **灵活通知**：控制台输出或 Webhook 集成

### 📦 安装

```bash
# 克隆仓库
git clone https://github.com/huanghaolong001/weather-reminder-haolong.git
cd weather-reminder-haolong

# 安装依赖
npm install
```

### 🚀 使用方法

#### 按默认计划运行（每天早上 8 点）
```bash
npm start
```

#### 立即测试（不等待定时）
```bash
npm test
```

#### 开发模式
```bash
npm run dev
```

### ⚙️ 配置说明

编辑 `config.json` 自定义配置：

```json
{
  "cities": [
    {
      "name": "广州",
      "nameEn": "Guangzhou",
      "lat": 23.1291,
      "lon": 113.2644
    }
  ],
  "schedule": {
    "cron": "0 8 * * *",
    "timezone": "Asia/Shanghai",
    "description": "每天早上8点推送"
  },
  "notification": {
    "enabled": true,
    "method": "console",
    "webhook": ""
  }
}
```

#### 定时计划选项（cron 格式）
- `0 8 * * *` - 每天早上 8:00
- `0 7,19 * * *` - 每天早上 7:00 和晚上 7:00
- `0 */6 * * *` - 每 6 小时一次
- `0 8 * * 1-5` - 工作日早上 8:00

### 📊 输出示例

```
==================================================
🌤️  多城市天气播报 | Multi-City Weather Report
📅 2024/1/15 08:00:00
==================================================

📍 广州 (Guangzhou)
----------------------------------------
🌡️  当前温度 Current: 18.5°C (体感 Feels like: 17.2°C)
⛅  天气状况 Weather: 部分多云 | Partly cloudy
💧 湿度 Humidity: 65%
🌬️  风速 Wind: 12.5 km/h
📊 今日温度范围 Today: 15.0°C ~ 22.0°C

📍 深圳 (Shenzhen)
----------------------------------------
🌡️  当前温度 Current: 19.8°C (体感 Feels like: 18.5°C)
☀️  天气状况 Weather: 晴朗 | Clear sky
💧 湿度 Humidity: 60%
🌬️  风速 Wind: 10.2 km/h
📊 今日温度范围 Today: 16.5°C ~ 23.5°C

...
```

### 🔔 Webhook 集成

将通知发送到外部服务（Slack、Discord、企业微信等）：

```json
{
  "notification": {
    "enabled": true,
    "method": "webhook",
    "webhook": "https://your-webhook-url.com/endpoint"
  }
}
```

### 🛠️ 技术栈
- **运行环境**：Node.js 16+
- **定时任务**：node-cron
- **HTTP 客户端**：node-fetch
- **天气 API**：Open-Meteo（免费，无需注册）

### 📝 开源协议
MIT License - 欢迎自由使用和修改！

### 🤝 贡献
欢迎提交 Issue 和 Pull Request！

---

### 📬 Contact
- Author: huanghaolong001
- GitHub: [@huanghaolong001](https://github.com/huanghaolong001)

---

**Made with ❤️ for weather enthusiasts**
