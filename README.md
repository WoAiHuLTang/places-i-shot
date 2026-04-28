# Places I Shot

一个面向长期运营的摄影作品站骨架：

- 前端展示站继续保留中国地图主视觉，适合部署到 Netlify
- 管理后台改为真实 API 登录与上传
- 图片存储目标为腾讯云 COS
- 城市与照片元数据存放在 MySQL

## 目录

- `index.html` `styles.css` `app.js`
  前端静态站
- `site-config.js`
  前端 API 地址配置
- `server/`
  Express API、MySQL、COS 上传、管理员登录
- `server/sql/schema.sql`
  数据库建表脚本
- `server/.env.example`
  服务器环境变量模板

## 当前行为

- 前端会优先请求 `site-config.js` 里配置的 API
- 如果 API 不可达，会自动退回到演示数据模式
- 后台登录与上传只在连接到真实 API 时可用

## 前端部署到 Netlify

1. 把仓库推到 GitHub
2. 在 Netlify 中导入仓库
3. Publish directory 保持根目录
4. 部署后绑定 `www.你的域名`
5. 将 `site-config.js` 中的 `apiBaseUrl` 改成你的 API 地址，例如：

```js
window.PLACES_CONFIG = {
  apiBaseUrl: "https://api.your-domain.com/api",
};
```

## 后端部署到腾讯云服务器

1. 在服务器安装 Node.js 20+ 和 MySQL 8+
2. 执行 `server/sql/schema.sql`
3. 复制 `server/.env.example` 为 `server/.env` 并填写真实配置
4. 安装依赖：

```bash
cd server
npm install
```

5. 导入城市数据：

```bash
npm run seed:cities
```

6. 创建管理员：

```bash
npm run create-admin -- admin@example.com your-password
```

7. 启动 API：

```bash
npm run start
```

## 推荐正式域名结构

- `www.your-domain.com`
  Netlify 前端
- `api.your-domain.com`
  腾讯云服务器 API
- `your-bucket.cos.ap-guangzhou.myqcloud.com`
  腾讯云 COS 图片存储

## 接下来最值得做的事

1. 用真实摄影作品替换演示占位图
2. 给城市详情补充编辑接口和封面设置接口
3. 为后台增加作品隐藏、排序和删除能力
4. 之后再接更精细的中国地图 SVG 或 GeoJSON
