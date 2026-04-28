# 部署方案

## 目标架构

- `Netlify`
  托管前端静态站
- `腾讯云 DNSPod`
  解析域名
- `腾讯云 CVM / 轻量应用服务器`
  运行 Node.js API
- `腾讯云 MySQL`
  存城市与照片元数据
- `腾讯云 COS`
  存摄影图片

## 域名建议

- `www.你的域名.com`
  前端主站
- `api.你的域名.com`
  API 域名

## DNS 建议

- `www`
  CNAME 到 Netlify 站点
- `api`
  A 记录到腾讯云服务器公网 IP
- 根域名
  301 跳转到 `www`

## Netlify

1. 导入 GitHub 仓库
2. 发布根目录
3. 绑定 `www.你的域名.com`
4. 发布前把 `site-config.js` 改成真实 API 地址

## 腾讯云服务器

1. 安装 Node.js
2. 安装 MySQL 或连接腾讯云 MySQL
3. 配置 `server/.env`
4. 执行 SQL 建表
5. `npm install`
6. `npm run seed:cities`
7. `npm run create-admin -- admin@example.com your-password`
8. 用 PM2 或 systemd 常驻运行 `npm run start`

## COS

需要准备：

- 存储桶
- SecretId
- SecretKey
- 公网访问域名

上传后数据库只保存最终图片 URL，不把图片放进 Git 仓库。
