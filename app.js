const API_BASE_URL = (window.PLACES_CONFIG && window.PLACES_CONFIG.apiBaseUrl) || "/api";
const ADMIN_TOKEN_KEY = "places-i-shot-admin-token";

const mockCities = [
  {
    id: 1,
    slug: "beijing",
    name: "北京",
    nameEn: "Beijing",
    province: "北京",
    coordinates: { x: 73.5, y: 28.5 },
    description: "冬天的风、胡同的影子、夜色里安静发亮的窗。这里像一卷缓慢显影的黑白底片。",
    gear: "Leica Q3 / Fujifilm X100V",
    tags: ["胡同", "雪", "夜景", "人像"],
    years: ["2023", "2024", "2025"],
    photos: [],
    coverTone: ["#2f3742", "#8f8173", "#111216"],
  },
  {
    id: 2,
    slug: "shanghai",
    name: "上海",
    nameEn: "Shanghai",
    province: "上海",
    coordinates: { x: 82.5, y: 43 },
    description: "潮湿空气把霓虹变得柔软。高楼与老里弄之间，总有一种克制的戏剧感。",
    gear: "Sony A7C II / 35mm GM",
    tags: ["街拍", "建筑", "夜景", "雨天"],
    years: ["2022", "2024"],
    photos: [],
    coverTone: ["#243241", "#5f768f", "#10141a"],
  },
  {
    id: 3,
    slug: "guangzhou",
    name: "广州",
    nameEn: "Guangzhou",
    province: "广东",
    coordinates: { x: 73.5, y: 67 },
    description: "夏夜总是带着水汽，街边灯箱、骑楼和人群一起发出缓慢的热度。",
    gear: "Nikon Zf / 40mm",
    tags: ["纪实", "街头", "人文", "夜景"],
    years: ["2021", "2023", "2025"],
    photos: [],
    coverTone: ["#352724", "#bc7d57", "#140d0c"],
  },
  {
    id: 4,
    slug: "chengdu",
    name: "成都",
    nameEn: "Chengdu",
    province: "四川",
    coordinates: { x: 58.2, y: 52.4 },
    description: "雾、茶馆和慢下来的人。成都的画面从不急着解释自己。",
    gear: "Canon R6 II / 50mm 1.2",
    tags: ["茶馆", "街巷", "自然", "人像"],
    years: ["2020", "2022", "2024"],
    photos: [],
    coverTone: ["#2c3328", "#88946f", "#11130f"],
  },
  {
    id: 5,
    slug: "hangzhou",
    name: "杭州",
    nameEn: "Hangzhou",
    province: "浙江",
    coordinates: { x: 80.2, y: 46.2 },
    description: "西湖边最好的光总是含蓄。雾气把远处山线藏起来，只留下恰到好处的留白。",
    gear: "Fujifilm GFX 50S II / 45mm",
    tags: ["湖面", "晨雾", "风景", "建筑"],
    years: ["2022", "2023"],
    photos: [],
    coverTone: ["#243632", "#9ab7ae", "#101715"],
  },
  {
    id: 6,
    slug: "kunming",
    name: "昆明",
    nameEn: "Kunming",
    province: "云南",
    coordinates: { x: 48.5, y: 68.5 },
    description: "日照很薄，风很轻，颜色却很长。这里适合把时间拍成温和的层次。",
    gear: "Ricoh GR IIIx",
    tags: ["旅行", "自然", "街拍", "日落"],
    years: ["2021", "2024"],
    photos: [],
    coverTone: ["#3d2f1e", "#d6b17a", "#161009"],
  },
  {
    id: 7,
    slug: "xian",
    name: "西安",
    nameEn: "Xi'an",
    province: "陕西",
    coordinates: { x: 64, y: 41.6 },
    description: "砖墙、城门和风尘感，让这个城市像一张被时间摩挲过很多次的相纸。",
    gear: "Leica M10 / 35mm Summicron",
    tags: ["城墙", "建筑", "街拍"],
    years: ["2023"],
    photos: [],
    coverTone: ["#342a24", "#a47b62", "#140f0d"],
  },
  {
    id: 8,
    slug: "lhasa",
    name: "拉萨",
    nameEn: "Lhasa",
    province: "西藏",
    coordinates: { x: 33, y: 60.5 },
    description: "还没有上传作品，但它已经留在计划里。",
    gear: "Planned",
    tags: ["高原", "光线", "建筑"],
    years: [],
    photos: [],
    coverTone: ["#213141", "#7ca2c8", "#0f151c"],
  },
];

const state = {
  route: { name: "map", slug: null },
  cities: [],
  selectedCityId: 1,
  filters: {
    search: "",
    province: "全部",
    year: "全部",
    tag: "全部",
    sort: "photos",
  },
  ui: {
    loading: true,
    apiMode: "live",
    banner: "",
  },
  auth: {
    token: sessionStorage.getItem(ADMIN_TOKEN_KEY) || "",
    email: "",
    error: "",
  },
  admin: {
    step: 1,
    cityId: 1,
    files: [],
    previews: [],
    status: "",
    form: {
      title: "",
      date: "",
      camera: "",
      location: "",
      tags: "",
      description: "",
      published: true,
      isCover: true,
    },
  },
  lightbox: {
    open: false,
    citySlug: null,
    photoId: null,
  },
};

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createPhotoImage(city, title, palette, aspect = "portrait") {
  const [a, b, c] = palette;
  const width = aspect === "landscape" ? 1600 : 1200;
  const height = aspect === "landscape" ? 980 : 1500;
  const subtitle = city.nameEn.toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${a}" />
          <stop offset="58%" stop-color="${b}" />
          <stop offset="100%" stop-color="${c}" />
        </linearGradient>
        <radialGradient id="g2" cx="72%" cy="24%" r="64%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.44)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g1)" />
      <rect width="100%" height="100%" fill="url(#g2)" />
      <g opacity="0.14" stroke="white" stroke-width="2" fill="none">
        <path d="M120 ${height - 180} C ${width * 0.3} ${height * 0.42}, ${width * 0.58} ${height * 0.62}, ${width - 120} 160" />
        <path d="M90 ${height - 320} C ${width * 0.36} ${height * 0.3}, ${width * 0.68} ${height * 0.48}, ${width - 140} 260" />
      </g>
      <text x="72" y="${height - 126}" fill="rgba(255,255,255,0.95)" font-size="72" font-family="SF Pro Display, PingFang SC, sans-serif">${title}</text>
      <text x="76" y="${height - 68}" fill="rgba(255,255,255,0.72)" font-size="28" font-family="SF Pro Text, PingFang SC, sans-serif" letter-spacing="10">${subtitle}</text>
    </svg>
  `;
  return svgDataUri(svg);
}

function createMockPhotos(city) {
  if (!city.years.length) {
    return [];
  }
  return [
    {
      id: `${city.slug}-01`,
      title: `${city.name} Light`,
      shotAt: `${city.years[0]}-02-14`,
      location: `${city.name} Central`,
      description: "一张代表这个城市气质的封面照片。",
      camera: city.gear,
      tags: city.tags.slice(0, 3),
      imageUrl: createPhotoImage(city, "Quiet Light", city.coverTone, "landscape"),
      isCover: true,
    },
    {
      id: `${city.slug}-02`,
      title: `${city.name} Streets`,
      shotAt: `${city.years[Math.min(1, city.years.length - 1)]}-07-03`,
      location: `${city.name} Street`,
      description: "在步行中捕捉到的人群、建筑和天气。",
      camera: city.gear,
      tags: city.tags.slice(1, 4),
      imageUrl: createPhotoImage(city, "City Streets", city.coverTone, "portrait"),
      isCover: false,
    },
    {
      id: `${city.slug}-03`,
      title: `${city.name} After Dark`,
      shotAt: `${city.years[city.years.length - 1]}-11-19`,
      location: `${city.name} Night`,
      description: "把夜景拍得克制一些，让光自己说话。",
      camera: city.gear,
      tags: city.tags.slice(0, 2),
      imageUrl: createPhotoImage(city, "After Dark", city.coverTone, "portrait"),
      isCover: false,
    },
  ];
}

function normalizeCity(city) {
  const photos = Array.isArray(city.photos) ? city.photos : [];
  const yearsFromPhotos = photos
    .map((photo) => String(photo.shotAt || "").slice(0, 4))
    .filter(Boolean);
  const years = Array.from(new Set([...(city.years || []), ...yearsFromPhotos])).sort();
  const tags = Array.from(
    new Set([...(city.tags || []), ...photos.flatMap((photo) => photo.tags || [])])
  );
  const coverPhoto = photos.find((photo) => photo.isCover) || photos[0];

  return {
    ...city,
    coordinates: city.coordinates || { x: Number(city.coordX || 0), y: Number(city.coordY || 0) },
    photos,
    years,
    tags,
    photoCount: photos.length,
    cover: coverPhoto?.imageUrl || createPhotoImage(city, city.nameEn || city.name, city.coverTone || ["#25313a", "#728694", "#121417"], "landscape"),
  };
}

function getMockCities() {
  return mockCities.map((city) => normalizeCity({ ...city, photos: createMockPhotos(city) }));
}

async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = state.auth.token;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || payload.message || message;
    } catch (error) {
      // no-op
    }
    throw new Error(message);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

async function loadCities() {
  state.ui.loading = true;
  renderApp();
  try {
    const payload = await apiFetch("/public/cities");
    state.cities = (payload.cities || []).map(normalizeCity);
    state.ui.apiMode = "live";
    state.ui.banner = "";
  } catch (error) {
    state.cities = getMockCities();
    state.ui.apiMode = "mock";
    state.ui.banner = "当前正在使用演示数据。接入后端后，上传与发布会写入腾讯云 COS 和数据库。";
  }
  state.ui.loading = false;
  state.selectedCityId = state.cities[0]?.id || state.selectedCityId;
  state.admin.cityId = state.cities[0]?.id || state.admin.cityId;
  renderApp();
}

function setRouteFromHash() {
  const hash = window.location.hash.replace(/^#\//, "");
  if (!hash) {
    state.route = { name: "map", slug: null };
    return;
  }
  const [name, slug] = hash.split("/");
  if (name === "city" && slug) {
    state.route = { name: "city", slug };
    return;
  }
  if (["map", "index", "about", "admin"].includes(name)) {
    state.route = { name, slug: null };
    return;
  }
  state.route = { name: "map", slug: null };
}

function navigate(hash) {
  window.location.hash = hash;
}

function getSelectedCity() {
  return state.cities.find((city) => city.id === state.selectedCityId) || state.cities[0];
}

function getCityBySlug(slug) {
  return state.cities.find((city) => city.slug === slug);
}

function formatDate(dateString) {
  if (!dateString) {
    return "未标注日期";
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildMapSvg() {
  return `
    <svg viewBox="0 0 1000 700" aria-hidden="true">
      <path class="map-shape" d="M110 208 L154 157 L196 147 L250 112 L312 118 L360 105 L422 126 L472 118 L548 136 L600 124 L658 144 L715 142 L760 168 L828 170 L874 214 L886 276 L856 312 L858 356 L902 420 L878 460 L832 470 L804 522 L754 544 L694 532 L640 562 L566 566 L518 544 L458 558 L414 534 L362 524 L318 552 L246 536 L198 500 L170 452 L138 434 L126 402 L138 362 L128 320 L94 278 Z" />
      <path class="map-shape" d="M830 560 L852 574 L860 598 L842 614 L814 608 L804 586 Z" />
      <path class="map-shape" d="M724 610 L746 616 L748 636 L724 642 L706 628 Z" />
    </svg>
  `;
}

function renderBanner() {
  if (!state.ui.banner) {
    return "";
  }
  return `<div class="system-banner">${state.ui.banner}</div>`;
}

function renderMapPage() {
  const selectedCity = getSelectedCity();
  const activeCities = state.cities.filter((city) => city.photoCount > 0).length;
  const totalPhotos = state.cities.reduce((sum, city) => sum + city.photoCount, 0);

  return `
    <section class="page hero">
      <div class="hero-copy">
        ${renderBanner()}
        <span class="eyebrow">A map lit by memory</span>
        <h1>Places I Shot</h1>
        <p>一张完整的中国地图，安静地承载所有已经留下影像的城市。没有作品的地方保持沉默，有作品的地方被柔和地点亮。</p>
        <div class="hero-stats">
          <span class="stat-chip"><strong>${activeCities}</strong> 座已点亮城市</span>
          <span class="stat-chip"><strong>${totalPhotos}</strong> 张作品已归档</span>
          <span class="stat-chip"><strong>${new Set(state.cities.flatMap((city) => city.years)).size}</strong> 年拍摄轨迹</span>
        </div>
        <div class="actions-row">
          <a class="cta-button" href="#/index">浏览城市索引</a>
          <a class="ghost-link" href="#/admin">进入上传管理</a>
        </div>
      </div>

      <div class="hero-map">
        <div class="china-map">${buildMapSvg()}</div>
        <div class="marker-layer">
          ${state.cities
            .map((city) => {
              const classes = [
                "city-marker",
                city.photoCount === 0 ? "is-quiet" : "",
                city.id === selectedCity?.id ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return `<button class="${classes}" style="left:${city.coordinates.x}%; top:${city.coordinates.y}%" data-city-id="${city.id}" aria-label="${escapeHtml(city.name)}"></button>`;
            })
            .join("")}
        </div>
        <div class="map-overlay"></div>
        <div class="map-caption">
          <span>中国地图主视觉</span>
          <span class="muted">${state.ui.apiMode === "live" ? "当前数据来自后端 API" : "当前为演示模式"}</span>
        </div>
        ${
          selectedCity
            ? `
              <aside class="map-drawer">
                <div class="map-drawer-header">
                  <div>
                    <h2>${selectedCity.name}</h2>
                    <div class="muted">${selectedCity.nameEn} · ${selectedCity.province}</div>
                  </div>
                  <div class="muted">${selectedCity.photoCount} 张</div>
                </div>
                <p class="muted">${selectedCity.description}</p>
                <div class="chip-row">
                  <span class="tag">${selectedCity.years.join(" / ") || "等待归档"}</span>
                  ${selectedCity.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
                </div>
                <div class="actions-row">
                  <a class="card-link" href="#/city/${selectedCity.slug}">查看作品</a>
                  <a class="outline-button" href="#/admin">上传到此城</a>
                </div>
              </aside>
            `
            : ""
        }
      </div>
    </section>
  `;
}

function renderCityPage(slug) {
  const city = getCityBySlug(slug) || state.cities[0];
  if (!city) {
    return `<section class="page index-panel"><div class="empty-state">还没有城市数据。</div></section>`;
  }

  const representative = city.photos[0];
  return `
    <section class="page city-layout">
      <article class="city-gallery-panel">
        <div class="city-hero-image" style="background-image:url('${city.cover}')">
          <div class="city-header">
            <div class="city-header-top">
              <div>
                <span class="eyebrow">${city.province}</span>
                <h1>${city.name} <span class="muted">${city.nameEn}</span></h1>
              </div>
              <div class="muted">${city.photoCount} 张作品</div>
            </div>
            <p>${city.description}</p>
          </div>
        </div>

        <div class="section-head">
          <div>
            <h2 class="section-title" style="font-size:clamp(2rem,4vw,3rem); margin-bottom:8px;">作品集</h2>
            <div class="timeline">
              <span class="toolbar-pill">${city.years.join(" / ") || "作品准备中"}</span>
            </div>
          </div>
          ${
            representative
              ? `<button class="ghost-link" type="button" data-open-lightbox="${city.slug}:${representative.id}">沉浸式浏览</button>`
              : ""
          }
        </div>

        ${
          city.photos.length
            ? `
              <div class="gallery-grid">
                ${city.photos
                  .map(
                    (photo) => `
                      <button class="gallery-card" type="button" style="background-image:url('${photo.imageUrl}')" data-open-lightbox="${city.slug}:${photo.id}">
                        <div class="gallery-card-content">
                          <h3>${escapeHtml(photo.title)}</h3>
                          <p>${formatDate(photo.shotAt)} · ${escapeHtml(photo.location || city.name)}</p>
                        </div>
                      </button>
                    `
                  )
                  .join("")}
              </div>
            `
            : `<div class="empty-state">这个城市还没有公开作品。你可以从管理页开始上传。</div>`
        }
      </article>

      <aside class="city-sidebar-panel">
        <div class="section-head">
          <div>
            <div class="eyebrow">City Notes</div>
            <h2 style="margin:18px 0 8px;">轻量但完整的城市档案</h2>
          </div>
        </div>
        <div class="meta-grid">
          <div class="meta-item"><strong>${city.photoCount}</strong>已发布照片</div>
          <div class="meta-item"><strong>${city.years.length}</strong>拍摄年份</div>
          <div class="meta-item"><strong>${city.tags.length}</strong>主题标签</div>
        </div>
        <div class="city-body">
          <p>${city.description}</p>
          <p>器材：${escapeHtml(city.gear || "未标注")}</p>
          <div class="tag-row">${city.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
        <div class="actions-row">
          <a class="cta-button" href="#/map">返回地图</a>
          <a class="ghost-link" href="#/admin">继续上传</a>
        </div>
      </aside>
    </section>
  `;
}

function getIndexOptions() {
  return {
    provinces: ["全部", ...new Set(state.cities.map((city) => city.province))],
    years: ["全部", ...new Set(state.cities.flatMap((city) => city.years)).sort()],
    tags: ["全部", ...new Set(state.cities.flatMap((city) => city.tags))],
  };
}

function getFilteredCities() {
  const search = state.filters.search.trim().toLowerCase();
  const filtered = state.cities.filter((city) => {
    const haystack = [city.name, city.nameEn, city.province, city.description, city.tags.join(" ")].join(" ").toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    const matchesProvince = state.filters.province === "全部" || city.province === state.filters.province;
    const matchesYear = state.filters.year === "全部" || city.years.includes(state.filters.year);
    const matchesTag = state.filters.tag === "全部" || city.tags.includes(state.filters.tag);
    return matchesSearch && matchesProvince && matchesYear && matchesTag;
  });

  return filtered.sort((a, b) => {
    if (state.filters.sort === "az") {
      return a.name.localeCompare(b.name, "zh-CN");
    }
    if (state.filters.sort === "year") {
      return String(b.years[b.years.length - 1] || "").localeCompare(String(a.years[a.years.length - 1] || ""));
    }
    return b.photoCount - a.photoCount;
  });
}

function renderIndexPage() {
  const options = getIndexOptions();
  const filteredCities = getFilteredCities();
  return `
    <section class="page index-panel">
      ${renderBanner()}
      <div class="section-head">
        <div>
          <span class="eyebrow">City Index</span>
          <h1 class="section-title">快速找到你的城市作品</h1>
          <p class="section-intro">地图很适合作为主视觉，但当作品越来越多时，索引页会让查找更从容。</p>
        </div>
      </div>
      <div class="index-toolbar">
        <input class="search-input" type="search" placeholder="搜索城市、标签或描述" value="${escapeHtml(state.filters.search)}" data-filter-input="search" />
        <select class="select-input" data-filter-select="province">${options.provinces.map((item) => `<option value="${item}" ${item === state.filters.province ? "selected" : ""}>${item}</option>`).join("")}</select>
        <select class="select-input" data-filter-select="year">${options.years.map((item) => `<option value="${item}" ${item === state.filters.year ? "selected" : ""}>${item}</option>`).join("")}</select>
        <select class="select-input" data-filter-select="tag">${options.tags.map((item) => `<option value="${item}" ${item === state.filters.tag ? "selected" : ""}>${item}</option>`).join("")}</select>
        <select class="select-input" data-filter-select="sort">
          <option value="photos" ${state.filters.sort === "photos" ? "selected" : ""}>按拍摄数量</option>
          <option value="year" ${state.filters.sort === "year" ? "selected" : ""}>按最近年份</option>
          <option value="az" ${state.filters.sort === "az" ? "selected" : ""}>按城市名称</option>
        </select>
      </div>
      ${
        filteredCities.length
          ? `
            <div class="index-grid">
              ${filteredCities
                .map(
                  (city) => `
                    <a class="city-index-card" href="#/city/${city.slug}">
                      <div class="muted">${city.province}</div>
                      <h3>${city.name} <span class="muted">${city.nameEn}</span></h3>
                      <p>${city.description}</p>
                      <div class="chip-row">
                        <span class="toolbar-pill">${city.photoCount} 张</span>
                        <span class="toolbar-pill">${city.years[city.years.length - 1] || "待发布"}</span>
                      </div>
                    </a>
                  `
                )
                .join("")}
            </div>
          `
          : `<div class="empty-state">当前筛选条件下还没有匹配到城市。</div>`
      }
    </section>
  `;
}

function renderAboutPage() {
  return `
    <section class="page about-layout">
      <article class="about-panel about-copy">
        ${renderBanner()}
        <span class="eyebrow">About the Project</span>
        <h1>把拍过的城市，安静地留在地图上。</h1>
        <p>这不是一个追求信息密度的网站，而是一张会慢慢被点亮的中国地图。每一座城市都只在真正留下照片之后出现呼吸光点，像记忆被轻轻标记。</p>
        <p>现在的正式架构会把图片存进腾讯云 COS，把城市与照片资料存进数据库，再由 Netlify 承担前端展示与自动部署。</p>
        <div class="actions-row">
          <a class="cta-button" href="#/map">回到地图</a>
          <a class="ghost-link" href="#/admin">配置后台</a>
        </div>
      </article>
      <aside class="about-panel">
        <div class="about-grid">
          <div>
            <h3>前端展示</h3>
            <p>继续保留现在这套地图、城市详情和沉浸式浏览体验，部署到 Netlify。</p>
          </div>
          <div>
            <h3>图片存储</h3>
            <p>正式图片走腾讯云 COS，避免把素材塞进 Git 仓库，也更适合长期扩展。</p>
          </div>
          <div>
            <h3>后台 API</h3>
            <p>管理员登录、城市维护和照片上传都通过你自己的服务器接口处理。</p>
          </div>
          <div>
            <h3>数据库</h3>
            <p>用 MySQL 维护城市、照片、标签、发布日期和封面图关系，后续排序和筛选都会更稳。</p>
          </div>
        </div>
      </aside>
    </section>
  `;
}

function renderAdminPage() {
  const selectedCity = state.cities.find((city) => city.id === Number(state.admin.cityId)) || state.cities[0];
  const backendReady = state.ui.apiMode === "live";
  const loggedIn = Boolean(state.auth.token);

  if (!loggedIn) {
    return `
      <section class="page admin-layout">
        <article class="admin-card">
          <span class="eyebrow">Private Admin</span>
          <h1>登录后台</h1>
          <p class="admin-lead">正式版后台不再使用前端口令。你会通过自己的服务器 API 进行登录，Netlify 只负责前端展示。</p>
          ${renderBanner()}
          <div class="form-grid">
            <div class="full">
              <label class="label" for="login-email">管理员邮箱</label>
              <input id="login-email" class="text-input" type="email" value="${escapeHtml(state.auth.email)}" data-auth-field="email" placeholder="admin@example.com" />
            </div>
            <div class="full">
              <label class="label" for="login-password">密码</label>
              <input id="login-password" class="text-input" type="password" data-auth-field="password" placeholder="输入后台密码" />
            </div>
          </div>
          ${state.auth.error ? `<div class="admin-notice admin-error">${escapeHtml(state.auth.error)}</div>` : ""}
          <div class="actions-row">
            <button class="cta-button" type="button" data-admin-login ${backendReady ? "" : "disabled"}>登录</button>
          </div>
        </article>
        <aside class="admin-card">
          <span class="eyebrow">Deployment Note</span>
          <h2 style="margin:18px 0 8px;">当前状态</h2>
          <p>${backendReady ? "前端已经检测到后端 API，可以直接走正式登录和上传流程。" : "前端尚未连接到后端 API，所以这里只能展示正式后台的结构。"}</p>
          <div class="admin-notice">
            ${backendReady ? "下一步就是创建管理员账号，并把腾讯云 COS、数据库和服务器环境变量填好。" : "你需要先把 server 目录部署到腾讯云服务器，再把 site-config.js 里的 apiBaseUrl 改成真实 API 地址。"}
          </div>
        </aside>
      </section>
    `;
  }

  return `
    <section class="page admin-layout">
      <article class="admin-card">
        <span class="eyebrow">Private Upload Flow</span>
        <h1>上传管理</h1>
        <p class="admin-lead">正式版后台会把照片传到腾讯云 COS，把元数据写入数据库，然后实时反映到地图和城市页面。</p>
        ${state.admin.status ? `<div class="admin-notice">${escapeHtml(state.admin.status)}</div>` : ""}
        <div class="admin-stepper">
          <span class="step-pill ${state.admin.step === 1 ? "is-current" : ""}"><strong>1</strong> 选择城市</span>
          <span class="step-pill ${state.admin.step === 2 ? "is-current" : ""}"><strong>2</strong> 上传照片</span>
          <span class="step-pill ${state.admin.step === 3 ? "is-current" : ""}"><strong>3</strong> 编辑并发布</span>
        </div>

        <section class="admin-step ${state.admin.step === 1 ? "is-active" : ""}">
          <h2 class="admin-step-title">选择城市</h2>
          <p>先决定这一组照片要落到哪座城市，发布后地图上的光点和作品数量会自动更新。</p>
          <label class="label" for="admin-city">城市</label>
          <select id="admin-city" class="select-input" data-admin-select="city">
            ${state.cities.map((city) => `<option value="${city.id}" ${Number(state.admin.cityId) === city.id ? "selected" : ""}>${city.name} · ${city.province}</option>`).join("")}
          </select>
          <div class="actions-row">
            <button class="cta-button" type="button" data-admin-next>继续上传</button>
          </div>
        </section>

        <section class="admin-step ${state.admin.step === 2 ? "is-active" : ""}">
          <h2 class="admin-step-title">上传照片</h2>
          <p>正式环境下这里会直接把原图传给服务器，再由服务器上传到腾讯云 COS。</p>
          <label class="label" for="admin-files">选择图片</label>
          <input id="admin-files" class="file-input" type="file" accept="image/*" multiple data-admin-files />
          ${
            state.admin.previews.length
              ? `
                <div class="upload-preview-grid">
                  ${state.admin.previews
                    .map(
                      (preview, index) => `
                        <article class="upload-preview-card">
                          <div class="preview-image" style="background-image:url('${preview.src}')"></div>
                          <div class="preview-body">
                            <strong>待发布照片 ${index + 1}</strong>
                            <p>${escapeHtml(preview.name)}</p>
                          </div>
                        </article>
                      `
                    )
                    .join("")}
                </div>
              `
              : `<div class="empty-state">还没有选择图片。</div>`
          }
          <div class="actions-row">
            <button class="ghost-link" type="button" data-admin-prev>返回上一步</button>
            <button class="cta-button" type="button" data-admin-next ${state.admin.files.length ? "" : "disabled"}>继续编辑</button>
          </div>
        </section>

        <section class="admin-step ${state.admin.step === 3 ? "is-active" : ""}">
          <h2 class="admin-step-title">编辑并发布</h2>
          <div class="form-grid">
            <div>
              <label class="label" for="photo-title">作品标题</label>
              <input id="photo-title" class="text-input" type="text" value="${escapeHtml(state.admin.form.title)}" data-admin-field="title" placeholder="例如：Old Quarter Rain" />
            </div>
            <div>
              <label class="label" for="photo-date">拍摄日期</label>
              <input id="photo-date" class="text-input" type="date" value="${escapeHtml(state.admin.form.date)}" data-admin-field="date" />
            </div>
            <div>
              <label class="label" for="photo-gear">器材</label>
              <input id="photo-gear" class="text-input" type="text" value="${escapeHtml(state.admin.form.camera)}" data-admin-field="camera" placeholder="例如：Leica Q3" />
            </div>
            <div>
              <label class="label" for="photo-location">地点</label>
              <input id="photo-location" class="text-input" type="text" value="${escapeHtml(state.admin.form.location)}" data-admin-field="location" placeholder="例如：东山口" />
            </div>
            <div class="full">
              <label class="label" for="photo-tags">标签</label>
              <input id="photo-tags" class="text-input" type="text" value="${escapeHtml(state.admin.form.tags)}" data-admin-field="tags" placeholder="人像, 街拍, 夜景" />
            </div>
            <div class="full">
              <label class="label" for="photo-description">描述</label>
              <textarea id="photo-description" class="text-area" data-admin-field="description" placeholder="这组照片想留下什么感受？">${escapeHtml(state.admin.form.description)}</textarea>
            </div>
          </div>
          <div class="actions-row">
            <button class="ghost-link" type="button" data-admin-prev>返回上一步</button>
            <button class="cta-button" type="button" data-admin-publish>发布到 ${selectedCity ? selectedCity.name : "当前城市"}</button>
            <button class="mini-button" type="button" data-admin-logout>退出登录</button>
          </div>
        </section>
      </article>

      <aside class="admin-card">
        <span class="eyebrow">Current City</span>
        <h2 style="margin:18px 0 8px;">${selectedCity ? `${selectedCity.name} <span class="muted">${selectedCity.nameEn}</span>` : "未选择城市"}</h2>
        <p>${selectedCity ? selectedCity.description : "请选择城市。"}</p>
        ${
          selectedCity
            ? `
              <div class="meta-grid">
                <div class="meta-item"><strong>${selectedCity.photoCount}</strong>当前作品数</div>
                <div class="meta-item"><strong>${selectedCity.years[selectedCity.years.length - 1] || "-"}</strong>最近年份</div>
                <div class="meta-item"><strong>${escapeHtml(selectedCity.tags[0] || "-")}</strong>首要标签</div>
              </div>
            `
            : ""
        }
        <div class="admin-notice">正式上线时，请把这个后台部署到你的腾讯云服务器，再把图片存储指向 COS。这样 Netlify 前端只负责展示，不保存管理数据。</div>
      </aside>
    </section>
  `;
}

function renderLightbox() {
  const root = document.getElementById("lightbox-root");
  if (!state.lightbox.open) {
    root.innerHTML = "";
    return;
  }
  const city = getCityBySlug(state.lightbox.citySlug);
  const photo = city?.photos.find((item) => item.id === state.lightbox.photoId);
  if (!city || !photo) {
    root.innerHTML = "";
    return;
  }
  root.innerHTML = `
    <div class="lightbox" data-lightbox>
      <div class="lightbox-top">
        <button class="mini-button" type="button" data-lightbox-close>关闭</button>
        <div>${city.name} · ${escapeHtml(photo.title)}</div>
      </div>
      <div class="lightbox-stage">
        <div class="lightbox-image" style="background-image:url('${photo.imageUrl}')"></div>
      </div>
      <div class="lightbox-bottom">
        <div>${formatDate(photo.shotAt)} · ${escapeHtml(photo.location || city.name)}</div>
        <div>${escapeHtml(photo.description || "")}</div>
      </div>
    </div>
  `;
}

function renderLoading() {
  return `<section class="page index-panel"><div class="empty-state">正在加载城市档案...</div></section>`;
}

function renderApp() {
  const app = document.getElementById("app");
  if (state.ui.loading) {
    app.innerHTML = renderLoading();
    return;
  }

  const { name, slug } = state.route;
  app.innerHTML =
    name === "map"
      ? renderMapPage()
      : name === "city"
        ? renderCityPage(slug)
        : name === "index"
          ? renderIndexPage()
          : name === "about"
            ? renderAboutPage()
            : renderAdminPage();

  renderLightbox();
  syncActiveNav();
}

function syncActiveNav() {
  const current = state.route.name === "city" ? "map" : state.route.name;
  document.querySelectorAll(".topnav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const normalized = href.replace(/^#\//, "").split("/")[0];
    link.classList.toggle("is-active", normalized === current);
  });
}

function getLightboxPhotoList() {
  const city = getCityBySlug(state.lightbox.citySlug);
  return city?.photos || [];
}

function shiftLightbox(direction) {
  const photos = getLightboxPhotoList();
  if (!photos.length) {
    return;
  }
  const currentIndex = photos.findIndex((item) => item.id === state.lightbox.photoId);
  const nextIndex = (currentIndex + direction + photos.length) % photos.length;
  state.lightbox.photoId = photos[nextIndex].id;
  renderLightbox();
}

async function handleLogin() {
  const email = document.querySelector('[data-auth-field="email"]')?.value.trim() || "";
  const password = document.querySelector('[data-auth-field="password"]')?.value || "";
  state.auth.email = email;
  state.auth.error = "";

  try {
    const payload = await apiFetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    state.auth.token = payload.token;
    sessionStorage.setItem(ADMIN_TOKEN_KEY, payload.token);
    state.admin.status = "登录成功，现在可以上传作品。";
    renderApp();
  } catch (error) {
    state.auth.error = error.message || "登录失败";
    renderApp();
  }
}

function handleLogout() {
  state.auth.token = "";
  state.auth.error = "";
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  state.admin.status = "";
  renderApp();
}

function handleFiles(fileList) {
  state.admin.files = Array.from(fileList || []);
  if (!state.admin.files.length) {
    state.admin.previews = [];
    renderApp();
    return;
  }
  Promise.all(
    state.admin.files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ name: file.name, src: reader.result });
          reader.readAsDataURL(file);
        })
    )
  ).then((previews) => {
    state.admin.previews = previews;
    renderApp();
  });
}

async function handlePublish() {
  if (!state.admin.files.length) {
    state.admin.status = "请先选择至少一张照片。";
    renderApp();
    return;
  }

  const formData = new FormData();
  formData.append("cityId", String(state.admin.cityId));
  formData.append("title", state.admin.form.title || "Untitled Frame");
  formData.append("shotAt", state.admin.form.date || new Date().toISOString().slice(0, 10));
  formData.append("camera", state.admin.form.camera);
  formData.append("location", state.admin.form.location);
  formData.append("description", state.admin.form.description);
  formData.append("tags", state.admin.form.tags);
  formData.append("published", String(state.admin.form.published));
  formData.append("isCover", String(state.admin.form.isCover));
  state.admin.files.forEach((file) => formData.append("photos", file));

  state.admin.status = "正在上传到服务器和腾讯云 COS...";
  renderApp();

  try {
    await apiFetch("/admin/photos", {
      method: "POST",
      body: formData,
    });
    state.admin.status = "上传成功，地图和城市页面已刷新。";
    state.admin.step = 1;
    state.admin.files = [];
    state.admin.previews = [];
    state.admin.form = {
      title: "",
      date: "",
      camera: "",
      location: "",
      tags: "",
      description: "",
      published: true,
      isCover: true,
    };
    await loadCities();
    const city = state.cities.find((item) => item.id === Number(state.admin.cityId));
    if (city) {
      navigate(`#/city/${city.slug}`);
    }
  } catch (error) {
    state.admin.status = error.message || "上传失败，请检查后端配置。";
    renderApp();
  }
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const cityMarker = target.closest("[data-city-id]");
    if (cityMarker) {
      state.selectedCityId = Number(cityMarker.getAttribute("data-city-id")) || state.selectedCityId;
      renderApp();
      return;
    }

    const lightboxTrigger = target.closest("[data-open-lightbox]");
    if (lightboxTrigger) {
      const payload = lightboxTrigger.getAttribute("data-open-lightbox") || "";
      const [citySlug, photoId] = payload.split(":");
      state.lightbox = { open: true, citySlug, photoId };
      renderLightbox();
      return;
    }

    if (target.closest("[data-lightbox-close]") || target.hasAttribute("data-lightbox")) {
      state.lightbox = { open: false, citySlug: null, photoId: null };
      renderLightbox();
      return;
    }

    if (target.closest("[data-admin-next]")) {
      state.admin.step = Math.min(3, state.admin.step + 1);
      renderApp();
      return;
    }

    if (target.closest("[data-admin-prev]")) {
      state.admin.step = Math.max(1, state.admin.step - 1);
      renderApp();
      return;
    }

    if (target.closest("[data-admin-login]")) {
      handleLogin();
      return;
    }

    if (target.closest("[data-admin-logout]")) {
      handleLogout();
      return;
    }

    if (target.closest("[data-admin-publish]")) {
      handlePublish();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.matches("[data-filter-select]")) {
      state.filters[target.getAttribute("data-filter-select")] = target.value;
      renderApp();
      return;
    }

    if (target.matches("[data-admin-select='city']")) {
      state.admin.cityId = Number(target.value);
      renderApp();
      return;
    }

    if (target.matches("[data-admin-files]")) {
      handleFiles(target.files);
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.matches("[data-filter-input='search']")) {
      state.filters.search = target.value;
      renderApp();
      return;
    }

    if (target.matches("[data-admin-field]")) {
      state.admin.form[target.getAttribute("data-admin-field")] = target.value;
      return;
    }

    if (target.matches("[data-auth-field='email']")) {
      state.auth.email = target.value;
    }
  });

  window.addEventListener("keydown", (event) => {
    if (!state.lightbox.open) {
      return;
    }
    if (event.key === "Escape") {
      state.lightbox = { open: false, citySlug: null, photoId: null };
      renderLightbox();
      return;
    }
    if (event.key === "ArrowRight") {
      shiftLightbox(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      shiftLightbox(-1);
    }
  });

  let touchStartX = 0;
  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.screenX || 0;
  });

  document.addEventListener("touchend", (event) => {
    if (!state.lightbox.open) {
      return;
    }
    const touchEndX = event.changedTouches[0]?.screenX || 0;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 40) {
      return;
    }
    shiftLightbox(delta < 0 ? 1 : -1);
  });

  window.addEventListener("hashchange", () => {
    setRouteFromHash();
    renderApp();
  });
}

function init() {
  bindEvents();
  setRouteFromHash();
  if (!window.location.hash) {
    navigate("#/map");
  }
  loadCities();
}

init();
