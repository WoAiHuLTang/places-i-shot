@echo off
start "places-api" cmd /k "cd /d E:\VscodeProject\imageShow\server && npm run start"
start "places-tunnel" cmd /k "cloudflared tunnel run places-api"
