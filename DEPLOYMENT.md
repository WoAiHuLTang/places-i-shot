# Deployment

## 目标结构

- `zeking.site`
  前端正式入口
- `www.zeking.site`
  前端备用入口
- `api.zeking.site`
  Cloudflare Tunnel -> 本地 Node.js API
- `Netlify`
  托管前端静态页
- `Local PC`
  运行 `server/` 与 `cloudflared`
- `Tencent COS`
  存图片
- `MySQL`
  存城市、照片、标签、管理员

## 1. 数据库升级

如果数据库是旧版本，先执行迁移：

```powershell
cd E:\VscodeProject\imageShow\server
Get-Content .\sql\migrations\20260501_add_geo_fields.sql | mysql -u root -p places_i_shot
```

然后重新写入城市种子：

```powershell
npm run seed:cities
```

## 2. 后端环境变量

确保 `server\.env` 至少包含：

```env
PORT=8787
APP_ORIGINS=http://127.0.0.1:5500,https://zeking.site,https://www.zeking.site

MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=places_i_shot
MYSQL_USER=root
MYSQL_PASSWORD=你的密码

JWT_SECRET=你的长随机字符串

COS_REGION=ap-guangzhou
COS_BUCKET=你的桶名-125xxxxxxxxxx
COS_SECRET_ID=你的SecretId
COS_SECRET_KEY=你的SecretKey
COS_PUBLIC_BASE_URL=https://你的桶名-125xxxxxxxxxx.cos.ap-guangzhou.myqcloud.com
```

## 3. 高德地图配置

编辑根目录 `site-config.js`：

```js
window.PLACES_CONFIG = {
  apiBaseUrl: "https://api.zeking.site/api",
  amapKey: "你的高德地图 Web Key",
  amapSecurityJsCode: "你的高德安全密钥",
  amapStyle: "amap://styles/normal",
};
```

建议把高德 Web Key 的白名单设置成：

- `zeking.site`
- `www.zeking.site`
- `localhost`
- `127.0.0.1`

## 4. 本地后端启动

```powershell
cd E:\VscodeProject\imageShow\server
npm run start
```

验证：

```text
http://127.0.0.1:8787/api/health
```

## 5. Tunnel 启动

```powershell
cloudflared tunnel run places-api
```

验证：

```text
https://api.zeking.site/api/health
```

## 6. Netlify 前端

把仓库推到 GitHub 后，在 Netlify 导入仓库并部署。

然后把：

- `www.zeking.site`
- `zeking.site`

绑定到 Netlify。

## 7. DNS 布局

推荐：

- `api`
  Cloudflare Tunnel 记录
- `www`
  CNAME 到 Netlify 站点
- 根域名
  指向 Netlify，或做跳转到 `www`

## 8. 长期运行

本地 PM2：

```powershell
cd E:\VscodeProject\imageShow
npm install pm2 --save-dev
npx pm2 start ecosystem.config.cjs
npx pm2 save
```

查看状态：

```powershell
npx pm2 status
npx pm2 logs places-i-shot-api
```

Tunnel：

```powershell
cloudflared tunnel run places-api
```

## 9. 最终验收

1. `https://api.zeking.site/api/health`
2. `https://zeking.site`
3. `https://www.zeking.site`
4. `https://zeking.site/#/admin`
5. `https://www.zeking.site/#/admin`

然后检查：

1. 城市在中国地图上是否正确高亮
2. 点击城市后是否进入真实行政区地图
3. 点击行政区后是否出现该区照片集合
4. 后台点击地图是否能自动反查区 / 街道 / 坐标
5. 上传后是否写入 COS 和数据库
6. 前端是否实时显示新作品
