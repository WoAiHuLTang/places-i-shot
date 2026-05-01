# Places I Shot

一个以中国地图为入口的摄影作品站。

当前版本的核心结构是：

- 前端静态站：`index.html` `styles.css` `app.js`
- 后端 API：`server/`
- 图片存储：腾讯云 COS
- 数据库存储：MySQL
- 前端托管：Netlify
- 本地 API 暴露：Cloudflare Tunnel

## 现在的地图交互

- 首页是完整中国地图
- 有作品的城市会高亮显示
- 点击城市后进入真实城市地图
- 城市页会展示真实行政区边界
- 有作品的行政区会高亮
- 点击行政区后，下面展开该区的照片集合
- 点击照片后进入大图浏览

## 现在的后台上传

- 登录后台后，先选择城市
- 在真实地图上点击位置，自动反查区 / 街道 / 坐标
- 再上传照片并发布
- 发布后会把图片写入腾讯云 COS，把元数据写入 MySQL

## 关键文件

- `site-config.js`
  前端 API 与高德地图配置
- `server/.env.example`
  后端环境变量模板
- `server/sql/schema.sql`
  最新完整建表脚本
- `server/sql/migrations/20260501_add_geo_fields.sql`
  给旧库补行政区与坐标字段的迁移脚本
- `server/src/data/cities.js`
  种子城市与真实中心点 / adcode

## 前端配置

把 `site-config.js` 改成你自己的正式配置：

```js
window.PLACES_CONFIG = {
  apiBaseUrl: "https://api.zeking.site/api",
  amapKey: "你的高德地图 Web Key",
  amapSecurityJsCode: "你的高德安全密钥",
  amapStyle: "amap://styles/normal",
};
```

如果 `amapKey` 为空，页面会正常打开，但地图区域会显示配置提示。

## 后端配置

复制环境变量模板：

```powershell
cd server
Copy-Item .env.example .env
```

然后填写：

- `APP_ORIGINS`
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_DATABASE`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `JWT_SECRET`
- `COS_REGION`
- `COS_BUCKET`
- `COS_SECRET_ID`
- `COS_SECRET_KEY`
- `COS_PUBLIC_BASE_URL`

推荐：

```env
APP_ORIGINS=http://127.0.0.1:5500,https://zeking.site,https://www.zeking.site
```

## 本地初始化命令

1. 安装后端依赖

```powershell
cd E:\VscodeProject\imageShow\server
npm install
```

2. 导入数据库结构

```powershell
Get-Content .\sql\schema.sql | mysql -u root -p places_i_shot
```

如果你已经有旧库，执行迁移：

```powershell
Get-Content .\sql\migrations\20260501_add_geo_fields.sql | mysql -u root -p places_i_shot
```

3. 重新写入城市中心点与 adcode

```powershell
npm run seed:cities
```

4. 创建管理员

```powershell
npm run create-admin -- admin@example.com 你的密码
```

5. 启动后端

```powershell
npm run start
```

## 常用命令

前端语法检查：

```powershell
cd E:\VscodeProject\imageShow
node --check app.js
```

后端语法检查：

```powershell
cd E:\VscodeProject\imageShow
node --check server\src\server.js
```

本地 PM2：

```powershell
cd E:\VscodeProject\imageShow
npm install pm2 --save-dev
npx pm2 start ecosystem.config.cjs
npx pm2 save
```

Cloudflare Tunnel：

```powershell
cloudflared tunnel run places-api
```

## 上线前再确认

- `https://api.zeking.site/api/health`
- `https://zeking.site`
- `https://www.zeking.site`
- `https://zeking.site/#/admin`
- `https://www.zeking.site/#/admin`

## 安全提醒

如果你之前泄露过腾讯云 `SecretId / SecretKey`，一定要先去腾讯云 CAM 删除旧密钥并重建新密钥，再继续使用这个项目。
