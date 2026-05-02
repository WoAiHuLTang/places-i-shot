const CONFIG = {
  apiBaseUrl: (window.PLACES_CONFIG && window.PLACES_CONFIG.apiBaseUrl) || "/api",
  amapKey: (window.PLACES_CONFIG && window.PLACES_CONFIG.amapKey) || "",
  amapSecurityJsCode: (window.PLACES_CONFIG && window.PLACES_CONFIG.amapSecurityJsCode) || "",
  amapStyle: (window.PLACES_CONFIG && window.PLACES_CONFIG.amapStyle) || "amap://styles/whitesmoke",
};

const ADMIN_TOKEN_KEY = "places-i-shot-admin-token";

const fallbackCities = [
  {
    id: 1,
    slug: "beijing",
    name: "北京",
    nameEn: "Beijing",
    province: "北京",
    adcode: "110000",
    coordinates: { x: 116.4074, y: 39.9042 },
    description: "胡同、雪夜与安静的窗。",
    gear: "Leica Q3 / Fujifilm X100V",
    photos: [
      createFallbackPhoto({
        id: "beijing-1",
        cityName: "北京",
        title: "东城雨夜",
        districtCode: "110101",
        districtName: "东城区",
        streetName: "东四南大街",
        longitude: 116.4236,
        latitude: 39.9246,
        shotAt: "2025-02-14",
        palette: ["#d7d3cb", "#a7c1e8", "#e9e3d8"],
        tags: ["夜景", "街拍"],
      }),
      createFallbackPhoto({
        id: "beijing-2",
        cityName: "北京",
        title: "国子监",
        districtCode: "110101",
        districtName: "东城区",
        streetName: "国子监街",
        longitude: 116.4164,
        latitude: 39.9497,
        shotAt: "2024-11-02",
        palette: ["#efe7dc", "#cfb69b", "#f7f2e8"],
        tags: ["建筑", "人文"],
      }),
      createFallbackPhoto({
        id: "beijing-3",
        cityName: "北京",
        title: "三里屯凌晨",
        districtCode: "110105",
        districtName: "朝阳区",
        streetName: "三里屯路",
        longitude: 116.4553,
        latitude: 39.9388,
        shotAt: "2024-06-18",
        palette: ["#f4efe7", "#90a9d3", "#dad2c7"],
        tags: ["街拍", "夜景"],
      }),
    ],
  },
  {
    id: 2,
    slug: "shanghai",
    name: "上海",
    nameEn: "Shanghai",
    province: "上海",
    adcode: "310000",
    coordinates: { x: 121.4737, y: 31.2304 },
    description: "霓虹、高楼和被雨水磨软的边缘。",
    gear: "Sony A7C II / 35mm GM",
    photos: [
      createFallbackPhoto({
        id: "shanghai-1",
        cityName: "上海",
        title: "外滩薄雾",
        districtCode: "310101",
        districtName: "黄浦区",
        streetName: "中山东一路",
        longitude: 121.4905,
        latitude: 31.2417,
        shotAt: "2025-01-12",
        palette: ["#efeee9", "#88a6d4", "#d7ddd8"],
        tags: ["建筑", "夜景"],
      }),
      createFallbackPhoto({
        id: "shanghai-2",
        cityName: "上海",
        title: "巨鹿路午后",
        districtCode: "310106",
        districtName: "静安区",
        streetName: "巨鹿路",
        longitude: 121.4551,
        latitude: 31.2249,
        shotAt: "2024-09-09",
        palette: ["#f8f4ea", "#d7b99e", "#ece7dc"],
        tags: ["街拍", "日景"],
      }),
      createFallbackPhoto({
        id: "shanghai-3",
        cityName: "上海",
        title: "陆家嘴窗景",
        districtCode: "310115",
        districtName: "浦东新区",
        streetName: "世纪大道",
        longitude: 121.5062,
        latitude: 31.2397,
        shotAt: "2024-04-02",
        palette: ["#f4f0e7", "#9fbbe2", "#d9d2c8"],
        tags: ["建筑", "城市"],
      }),
    ],
  },
  {
    id: 3,
    slug: "guangzhou",
    name: "广州",
    nameEn: "Guangzhou",
    province: "广东",
    adcode: "440100",
    coordinates: { x: 113.2644, y: 23.1291 },
    description: "湿热空气里，灯光会更柔一点。",
    gear: "Nikon Zf / 40mm",
    photos: [
      createFallbackPhoto({
        id: "guangzhou-1",
        cityName: "广州",
        title: "天河下雨前",
        districtCode: "440106",
        districtName: "天河区",
        streetName: "珠江新城",
        longitude: 113.3275,
        latitude: 23.1191,
        shotAt: "2025-03-16",
        palette: ["#f7f2e8", "#9fc0e8", "#dad3c8"],
        tags: ["城市", "街拍"],
      }),
      createFallbackPhoto({
        id: "guangzhou-2",
        cityName: "广州",
        title: "永庆坊转角",
        districtCode: "440103",
        districtName: "荔湾区",
        streetName: "恩宁路",
        longitude: 113.2387,
        latitude: 23.1175,
        shotAt: "2024-10-10",
        palette: ["#efe4d6", "#d4b290", "#f8f5ef"],
        tags: ["人文", "街拍"],
      }),
    ],
  },
  {
    id: 4,
    slug: "chengdu",
    name: "成都",
    nameEn: "Chengdu",
    province: "四川",
    adcode: "510100",
    coordinates: { x: 104.0665, y: 30.5728 },
    description: "慢一点，画面就会自己浮上来。",
    gear: "Canon R6 II / 50mm 1.2",
    photos: [
      createFallbackPhoto({
        id: "chengdu-1",
        cityName: "成都",
        title: "玉林晚风",
        districtCode: "510107",
        districtName: "武侯区",
        streetName: "玉林西路",
        longitude: 104.0422,
        latitude: 30.631,
        shotAt: "2024-08-03",
        palette: ["#f0eadf", "#afc1a5", "#d7d1c5"],
        tags: ["街拍", "夜景"],
      }),
      createFallbackPhoto({
        id: "chengdu-2",
        cityName: "成都",
        title: "太古里玻璃面",
        districtCode: "510104",
        districtName: "锦江区",
        streetName: "中纱帽街",
        longitude: 104.0839,
        latitude: 30.6572,
        shotAt: "2025-01-25",
        palette: ["#f4efe8", "#8db2d8", "#d7cfc3"],
        tags: ["建筑", "城市"],
      }),
    ],
  },
];

const state = {
  route: { name: "map", slug: null },
  cities: [],
  ui: {
    loading: true,
    apiMode: "live",
    banner: "",
    mapNotice: "",
  },
  auth: {
    token: sessionStorage.getItem(ADMIN_TOKEN_KEY) || "",
    error: "",
  },
  citySelection: {
    activeSlug: null,
    activeCollectionKeyByCity: {},
    shouldFocusDistrictByCity: {},
  },
  admin: {
    cityId: null,
    cityName: "",
    cityNameEn: "",
    province: "",
    cityAdcode: "",
    cityLongitude: "",
    cityLatitude: "",
    title: "",
    shotAt: "",
    camera: "",
    tags: "",
    description: "",
    searchKeyword: "",
    searchResults: [],
    districtCode: "",
    districtName: "",
    streetName: "",
    longitude: "",
    latitude: "",
    locationLabel: "",
    selectedPoiName: "",
    locationSource: "",
    files: [],
    previews: [],
    libraryCitySlug: "",
    deletingPhotoId: "",
    status: "",
    statusKind: "neutral",
    published: true,
    isCover: true,
  },
  lightbox: {
    open: false,
    photos: [],
    index: 0,
    title: "",
  },
};

const mapStore = {
  china: null,
  city: null,
  admin: null,
  cityOverlays: [],
  cityPhotoFocusMarker: null,
  adminOverlays: [],
  adminMarker: null,
  adminSearchMarkers: [],
};

const districtCache = new Map();
let amapPromise = null;

function createFallbackPhoto({
  id,
  cityName,
  title,
  districtCode,
  districtName,
  streetName,
  longitude,
  latitude,
  shotAt,
  palette,
  tags,
}) {
  return {
    id,
    title,
    districtCode,
    districtName,
    streetName,
    longitude,
    latitude,
    shotAt,
    camera: "",
    location: `${districtName} ${streetName}`.trim(),
    description: "",
    imageUrl: createGradientImage(cityName, title, palette),
    isCover: false,
    tags,
  };
}

function createGradientImage(cityName, title, palette) {
  const [a, b, c] = palette;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${a}"/>
          <stop offset="55%" stop-color="${b}"/>
          <stop offset="100%" stop-color="${c}"/>
        </linearGradient>
        <radialGradient id="wash" cx="82%" cy="18%" r="72%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.62)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1500" fill="url(#bg)"/>
      <rect width="1200" height="1500" fill="url(#wash)"/>
      <g stroke="rgba(255,255,255,0.22)" stroke-width="2" fill="none">
        <path d="M120 1160C320 900 640 960 1080 220"/>
        <path d="M80 1320C360 1000 720 1120 1060 420"/>
      </g>
      <text x="72" y="1320" fill="rgba(20,20,24,0.92)" font-size="74" font-family="SF Pro Display, PingFang SC, sans-serif">${escapeHtml(
        title
      )}</text>
      <text x="76" y="1388" fill="rgba(20,20,24,0.54)" font-size="30" font-family="SF Pro Text, PingFang SC, sans-serif" letter-spacing="8">${escapeHtml(
        cityName.toUpperCase()
      )}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function getFallbackCities() {
  return fallbackCities.map((city) => normalizeCity(city));
}

function normalizePhoto(rawPhoto, index) {
  return {
    id: rawPhoto.id || `photo-${index + 1}`,
    title: rawPhoto.title || `Photo ${index + 1}`,
    shotAt: rawPhoto.shotAt || "",
    camera: rawPhoto.camera || "",
    location: rawPhoto.location || "",
    districtCode: rawPhoto.districtCode || "",
    districtName: rawPhoto.districtName || "",
    streetName: rawPhoto.streetName || "",
    longitude: rawPhoto.longitude === null || rawPhoto.longitude === undefined ? null : Number(rawPhoto.longitude),
    latitude: rawPhoto.latitude === null || rawPhoto.latitude === undefined ? null : Number(rawPhoto.latitude),
    description: rawPhoto.description || "",
    imageUrl: rawPhoto.imageUrl || "",
    isCover: Boolean(rawPhoto.isCover),
    tags: Array.isArray(rawPhoto.tags)
      ? rawPhoto.tags
      : String(rawPhoto.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
  };
}

function buildCollections(photos) {
  const grouped = new Map();
  for (const photo of photos) {
    const key =
      photo.districtCode ||
      photo.districtName ||
      photo.streetName ||
      photo.location ||
      `unlocated-${photo.id}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        key,
        districtCode: photo.districtCode || "",
        districtName: photo.districtName || "",
        label: photo.districtName || photo.streetName || photo.location || "未精确定位",
        photos: [],
      });
    }
    grouped.get(key).photos.push(photo);
  }

  return Array.from(grouped.values())
    .map((collection) => {
      const coords = collection.photos.filter((photo) => photo.longitude && photo.latitude);
      const cover = collection.photos.find((photo) => photo.isCover) || collection.photos[0];
      return {
        ...collection,
        cover: cover ? cover.imageUrl : "",
        count: collection.photos.length,
        latestShotAt: collection.photos
          .map((photo) => photo.shotAt)
          .filter(Boolean)
          .sort()
          .at(-1) || "",
        center: coords.length
          ? {
              lng: coords.reduce((sum, photo) => sum + Number(photo.longitude), 0) / coords.length,
              lat: coords.reduce((sum, photo) => sum + Number(photo.latitude), 0) / coords.length,
            }
          : null,
      };
    })
    .sort((a, b) => b.count - a.count || b.latestShotAt.localeCompare(a.latestShotAt));
}

function normalizeCity(rawCity) {
  const photos = (rawCity.photos || []).map(normalizePhoto);
  const collections = buildCollections(photos);
  const cover = (photos.find((photo) => photo.isCover) || photos[0])?.imageUrl || "";
  return {
    id: Number(rawCity.id),
    slug: rawCity.slug,
    name: rawCity.name,
    nameEn: rawCity.nameEn || "",
    province: rawCity.province || "",
    adcode: rawCity.adcode || "",
    description: rawCity.description || "",
    gear: rawCity.gear || "",
    center: {
      lng: Number(rawCity.coordinates?.x ?? rawCity.coordX ?? 0),
      lat: Number(rawCity.coordinates?.y ?? rawCity.coordY ?? 0),
    },
    photos,
    collections,
    photoCount: photos.length,
    cover,
    years: unique(photos.map((photo) => String(photo.shotAt || "").slice(0, 4))).sort(),
    tags: unique(photos.flatMap((photo) => photo.tags)),
  };
}

function getCityBySlug(slug) {
  return state.cities.find((city) => city.slug === slug) || null;
}

function getCurrentCity() {
  const slug = state.route.name === "city" ? state.route.slug : state.citySelection.activeSlug;
  return getCityBySlug(slug) || state.cities[0] || null;
}

function getSelectedCollection(city) {
  if (!city) {
    return null;
  }
  const selectedKey =
    state.citySelection.activeCollectionKeyByCity[city.slug] || city.collections[0]?.key || null;
  return city.collections.find((collection) => collection.key === selectedKey) || city.collections[0] || null;
}

async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (state.auth.token) {
    headers.set("Authorization", `Bearer ${state.auth.token}`);
  }

  const response = await fetch(`${CONFIG.apiBaseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.error || payload.message || message;
    } catch (_error) {
      // ignore
    }
    throw new Error(message);
  }

  const type = response.headers.get("content-type") || "";
  return type.includes("application/json") ? response.json() : response.text();
}

async function loadCities() {
  state.ui.loading = true;
  renderApp();
  try {
    const payload = await apiFetch("/public/cities");
    state.cities = (payload.cities || []).map(normalizeCity);
    state.ui.apiMode = "live";
    state.ui.banner = "";
  } catch (_error) {
    state.cities = getFallbackCities();
    state.ui.apiMode = "mock";
    state.ui.banner = "当前正在使用演示数据。接入真实地图与后端后，城市高亮、区级钻取与上传发布会全部改为线上数据。";
  }

  const firstAvailableCity = state.cities.find((city) => city.photoCount > 0) || state.cities[0] || null;
  if (firstAvailableCity) {
    state.citySelection.activeSlug = firstAvailableCity.slug;
    state.admin.cityId = state.admin.cityId || firstAvailableCity.id;
    state.admin.libraryCitySlug = state.admin.libraryCitySlug || firstAvailableCity.slug;
    if (!state.citySelection.activeCollectionKeyByCity[firstAvailableCity.slug]) {
      state.citySelection.activeCollectionKeyByCity[firstAvailableCity.slug] =
        firstAvailableCity.collections[0]?.key || null;
    }
  }

  if (state.admin.libraryCitySlug && !state.cities.some((city) => city.slug === state.admin.libraryCitySlug)) {
    state.admin.libraryCitySlug = firstAvailableCity?.slug || "";
  }

  state.ui.loading = false;
  renderApp();
}

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash) {
    return { name: "map", slug: null };
  }
  const [name, slug] = hash.split("/");
  if (name === "city" && slug) {
    return { name: "city", slug };
  }
  if (name === "admin") {
    return { name: "admin", slug: null };
  }
  return { name: "map", slug: null };
}

function navigate(hash) {
  if (window.location.hash === hash) {
    state.route = parseHash();
    renderApp();
    return;
  }
  window.location.hash = hash;
}

function loadAMap() {
  if (window.AMap) {
    return Promise.resolve(window.AMap);
  }
  if (amapPromise) {
    return amapPromise;
  }
  if (!CONFIG.amapKey) {
    return Promise.reject(new Error("missing-amap-key"));
  }

  amapPromise = new Promise((resolve, reject) => {
    if (CONFIG.amapSecurityJsCode) {
      window._AMapSecurityConfig = {
        securityJsCode: CONFIG.amapSecurityJsCode,
      };
    }

    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(
      CONFIG.amapKey
    )}&plugin=AMap.DistrictSearch,AMap.Geocoder,AMap.PlaceSearch,AMap.Scale,AMap.ToolBar`;
    script.async = true;
    script.onload = () => {
      if (window.AMap) {
        resolve(window.AMap);
        return;
      }
      reject(new Error("amap-not-available"));
    };
    script.onerror = () => reject(new Error("amap-load-failed"));
    document.head.appendChild(script);
  });

  return amapPromise;
}

function createMapOptions(center, zoom) {
  return {
    viewMode: "2D",
    zoom,
    center,
    mapStyle: CONFIG.amapStyle,
    resizeEnable: true,
    showLabel: true,
    pitchEnable: false,
    rotateEnable: false,
    jogEnable: false,
    buildingAnimation: false,
    showBuildingBlock: false,
    labelzIndex: 90,
  };
}

function applyNativeMapFeatures(map) {
  map.setFeatures(["bg", "road", "point", "building"]);
}

function getPhotoCardClass(index) {
  if (index === 0) {
    return "is-hero";
  }
  if (index % 5 === 0) {
    return "is-wide";
  }
  if (index % 3 === 0) {
    return "is-tall";
  }
  return "is-compact";
}

function createDistrictLabelContent({ name, active = false, selected = false, photoCount = 0 }) {
  return `
    <div class="district-label ${active ? "is-active" : ""} ${selected ? "is-selected" : ""}">
      <span class="district-label-name">${escapeHtml(name)}</span>
      ${photoCount ? `<span class="district-label-count">${photoCount}</span>` : ""}
    </div>
  `;
}

function createPhotoSpotContent(selected = false) {
  return `
    <span class="photo-spot ${selected ? "is-selected" : ""}">
      <span class="photo-spot-core"></span>
    </span>
  `;
}

function createLocationPinContent(label, count = 0, selected = false) {
  return `
    <span class="location-pin ${selected ? "is-selected" : ""}">
      <span class="location-pin-head">
        ${count ? `<span class="location-pin-count">${count}</span>` : `<span class="location-pin-dot"></span>`}
      </span>
      <span class="location-pin-tail"></span>
      <span class="location-pin-chip">${escapeHtml(label)}</span>
    </span>
  `;
}

function createCollectionFocusContent(label) {
  return createLocationPinContent(label, 0, true);
}

function createFocusedPhotoContent(title) {
  return `
    <span class="focused-photo-pin">
      <span class="focused-photo-pin-ring"></span>
      <span class="focused-photo-pin-core"></span>
      <span class="focused-photo-pin-chip">${escapeHtml(title || "Photo")}</span>
    </span>
  `;
}

function destroyMap(key) {
  if (!mapStore[key]) {
    return;
  }
  try {
    mapStore[key].destroy();
  } catch (_error) {
    // ignore
  }
  mapStore[key] = null;
}

function clearCityOverlays() {
  mapStore.cityOverlays.forEach((overlay) => {
    try {
      overlay.setMap(null);
    } catch (_error) {
      // ignore
    }
  });
  mapStore.cityOverlays = [];
  mapStore.cityPhotoFocusMarker = null;
}

function clearAdminOverlays() {
  mapStore.adminOverlays.forEach((overlay) => {
    try {
      overlay.setMap(null);
    } catch (_error) {
      // ignore
    }
  });
  mapStore.adminOverlays = [];
  mapStore.adminSearchMarkers.forEach((marker) => {
    try {
      marker.setMap(null);
    } catch (_error) {
      // ignore
    }
  });
  mapStore.adminSearchMarkers = [];
}

async function fetchCityDistricts(city) {
  if (!city) {
    return [];
  }
  if (districtCache.has(city.slug)) {
    return districtCache.get(city.slug);
  }

  const AMap = await loadAMap();

  const districts = await new Promise((resolve, reject) => {
    const districtSearch = new AMap.DistrictSearch({
      level: "city",
      showbiz: false,
      extensions: "all",
      subdistrict: 1,
    });

    districtSearch.search(city.adcode || city.name, (status, result) => {
      if (status !== "complete" || !result?.districtList?.length) {
        reject(new Error(`District search failed for ${city.name}`));
        return;
      }
      const root = result.districtList[0];
      resolve(
        (root.districtList || []).map((district) => ({
          adcode: district.adcode,
          name: district.name,
          center: district.center
            ? {
                lng: Number(district.center.lng),
                lat: Number(district.center.lat),
              }
            : null,
          boundaries: district.boundaries || [],
        }))
      );
    });
  });

  districtCache.set(city.slug, districts);
  return districts;
}

function renderBanner() {
  if (!state.ui.banner) {
    return "";
  }
  return `<div class="system-banner">${escapeHtml(state.ui.banner)}</div>`;
}

function renderMapUnavailable(message) {
  return `
    <div class="map-unavailable">
      <strong>地图还没有接入</strong>
      <span>${escapeHtml(message)}</span>
    </div>
  `;
}

function renderTopNav() {
  const current = state.route.name === "city" ? "map" : state.route.name;
  return `
    <header class="topbar">
      <a class="brand" href="#/map">
        <span class="brand-eyebrow">Places I Shot</span>
        <span class="brand-title">中国地图</span>
      </a>
      <nav class="nav">
        <a class="nav-link ${current === "map" ? "is-active" : ""}" href="#/map">地图</a>
        <a class="nav-link ${current === "admin" ? "is-active" : ""}" href="#/admin">管理</a>
      </nav>
    </header>
  `;
}

function renderMapPage() {
  const highlightedCities = state.cities.filter((city) => city.photoCount > 0);
  return `
    <section class="page map-page">
      ${renderBanner()}
      <div class="hero">
        <div class="hero-copy">
          <span class="eyebrow">China / Photo Atlas</span>
          <h1>完整中国地图</h1>
          <p>有作品的城市会被点亮。点击城市，直接钻取到真实行政区边界，再进入该区的照片集合。</p>
          <div class="stat-row">
            <span class="stat-pill"><strong>${highlightedCities.length}</strong> 座城市亮起</span>
            <span class="stat-pill"><strong>${state.cities.reduce((sum, city) => sum + city.photoCount, 0)}</strong> 张照片</span>
            <span class="stat-pill"><strong>${unique(state.cities.flatMap((city) => city.collections.map((item) => item.label))).length}</strong> 个区域集合</span>
          </div>
        </div>
        <article class="map-card national-card">
          <div class="map-stage large-stage" id="china-map">
            <div class="map-stage-wash"></div>
            <div class="map-stage-caption">
              <span>China</span>
              <span>Click a lit city</span>
            </div>
            ${!CONFIG.amapKey ? renderMapUnavailable("请先在 site-config.js 中填写高德地图 Key 与安全密钥。") : ""}
          </div>
        </article>
      </div>
      <section class="city-strip">
        <div class="section-head">
          <div>
            <span class="eyebrow">Cities</span>
            <h2>点亮的城市</h2>
          </div>
        </div>
        <div class="city-card-grid">
          ${highlightedCities
            .map(
              (city) => `
                <button class="city-card" type="button" data-city-open="${city.slug}">
                  <div class="city-card-cover" style="background-image:url('${city.cover}')"></div>
                  <div class="city-card-body">
                    <div class="city-card-top">
                      <strong>${escapeHtml(city.name)}</strong>
                      <span>${escapeHtml(city.nameEn)}</span>
                    </div>
                    <div class="city-card-meta">
                      <span>${escapeHtml(city.province)}</span>
                      <span>${city.photoCount} 张</span>
                      <span>${city.collections.length} 个区域</span>
                    </div>
                  </div>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderCollectionCards(city) {
  if (!city.collections.length) {
    return `<div class="empty-card">这座城市还没有按区域整理好的作品。</div>`;
  }
  const activeCollection = getSelectedCollection(city);
  return city.collections
    .map(
      (collection) => `
        <button
          class="collection-card ${activeCollection?.key === collection.key ? "is-active" : ""}"
          type="button"
          data-collection-key="${escapeHtml(collection.key)}"
          data-city-slug="${city.slug}"
        >
          <div class="collection-card-cover" style="background-image:url('${collection.cover}')"></div>
          <div class="collection-card-body">
            <span class="collection-card-kicker">Location</span>
            <strong>${escapeHtml(collection.label)}</strong>
            <span>${collection.count} 张</span>
          </div>
        </button>
      `
    )
    .join("");
}

function renderPhotoGrid(collection, city) {
  if (!collection) {
    return `<div class="empty-card">先点击一个行政区集合。</div>`;
  }

  return `
    <div class="gallery-head">
      <div>
        <span class="eyebrow">Collection</span>
        <h2>${escapeHtml(collection.label)}</h2>
      </div>
      <div class="gallery-meta">
        <span>${collection.count} 张</span>
        ${collection.latestShotAt ? `<span>${escapeHtml(formatDate(collection.latestShotAt))}</span>` : ""}
      </div>
    </div>
    <div class="photo-grid">
      ${collection.photos
        .map(
          (photo, index) => `
            <button
              class="photo-card ${getPhotoCardClass(index)}"
              type="button"
              data-photo-open="${city.slug}:${collection.key}:${photo.id}:${index}"
              style="background-image:url('${photo.imageUrl}')"
            >
              <span class="photo-card-topline">${escapeHtml(formatDate(photo.shotAt))}</span>
              <span class="photo-card-overlay">
                <strong>${escapeHtml(photo.title)}</strong>
                <span>${escapeHtml(photo.streetName || photo.location || collection.label)}</span>
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCityPage(city) {
  if (!city) {
    return `
      <section class="page">
        <div class="empty-card">找不到这座城市。</div>
      </section>
    `;
  }

  const activeCollection = getSelectedCollection(city);

  return `
    <section class="page city-page">
      <div class="page-head">
        <div class="page-head-copy">
          <a class="back-link" href="#/map">返回中国地图</a>
          <h1>${escapeHtml(city.name)}</h1>
          <p>${escapeHtml(city.nameEn)} · ${escapeHtml(city.province)}</p>
        </div>
        <div class="page-head-stats">
          <span>${city.photoCount} 张</span>
          <span>${city.collections.length} 个区域</span>
        </div>
      </div>
      <div class="city-layout">
        <article class="map-card">
          <div class="map-stage city-stage" id="city-map">
            <div class="map-stage-caption map-stage-caption--city">
              <span>${escapeHtml(city.name)}</span>
              <span>Photo positions</span>
            </div>
            ${!CONFIG.amapKey ? renderMapUnavailable("需要高德地图 Key 才能显示真实行政区边界。") : ""}
          </div>
        </article>
        <aside class="side-panel">
          <div class="side-panel-head">
            <span class="eyebrow">Albums</span>
            <h2>区域集合</h2>
          </div>
          <div class="collection-list">
            ${renderCollectionCards(city)}
          </div>
        </aside>
      </div>
      <section class="gallery-panel">
        ${renderPhotoGrid(activeCollection, city)}
      </section>
    </section>
  `;
}

function renderLoginPanel() {
  return `
    <section class="page admin-page">
      ${renderBanner()}
      <div class="auth-card">
        <span class="eyebrow">Admin</span>
        <h1>登录后台</h1>
        <p>后台用于给城市选择真实位置，再上传照片。</p>
        ${state.auth.error ? `<div class="error-banner">${escapeHtml(state.auth.error)}</div>` : ""}
        <label class="field">
          <span>邮箱</span>
          <input type="email" class="input" data-login-field="email" placeholder="admin@example.com" />
        </label>
        <label class="field">
          <span>密码</span>
          <input type="password" class="input" data-login-field="password" placeholder="输入密码" />
        </label>
        <button class="primary-button" type="button" data-login-submit>登录</button>
      </div>
      ${renderAdminLibrarySection()}
    </section>
  `;
}

function renderSearchResults() {
  if (!state.admin.searchResults.length) {
    return "";
  }
  return `
    <div class="search-results">
      ${state.admin.searchResults
        .map(
          (item, index) => `
            <button class="search-result" type="button" data-search-pick="${index}">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.address || item.district || "")}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAdminPage() {
  if (!state.auth.token) {
    return renderLoginPanel();
  }

  const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || state.cities[0] || null;

  return `
    <section class="page admin-page">
      <div class="page-head compact">
        <div class="page-head-copy">
          <span class="eyebrow">Upload</span>
          <h1>地图上传</h1>
          <p>先选城市，再在真实地图上点选区 / 街道 / 坐标。</p>
        </div>
        <button class="ghost-button" type="button" data-logout>退出</button>
      </div>
      <div class="admin-layout">
        <article class="form-panel">
          ${state.admin.status ? `<div class="status-banner is-${escapeHtml(state.admin.statusKind || "neutral")}">${escapeHtml(state.admin.status)}</div>` : ""}
          <div class="form-grid">
            <label class="field">
              <span>城市</span>
              <select class="input" data-admin-field="cityId">
                ${state.cities
                  .map(
                    (item) => `
                      <option value="${item.id}" ${Number(state.admin.cityId) === item.id ? "selected" : ""}>
                        ${escapeHtml(item.name)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </label>
            <label class="field">
              <span>标题</span>
              <input class="input" type="text" data-admin-field="title" value="${escapeHtml(state.admin.title)}" placeholder="例如：夜雨之后" />
            </label>
            <label class="field">
              <span>日期</span>
              <input class="input" type="date" data-admin-field="shotAt" value="${escapeHtml(state.admin.shotAt)}" />
            </label>
            <label class="field">
              <span>器材</span>
              <input class="input" type="text" data-admin-field="camera" value="${escapeHtml(state.admin.camera)}" placeholder="例如：Leica Q3" />
            </label>
            <label class="field field-full">
              <span>搜索街道或地点</span>
              <div class="search-line">
                <input class="input" type="text" data-admin-field="searchKeyword" value="${escapeHtml(
                  state.admin.searchKeyword
                )}" placeholder="例如：国子监街 / 珠江新城 / 巨鹿路" />
                <button class="ghost-button" type="button" data-admin-search>搜索</button>
              </div>
              ${renderSearchResults()}
            </label>
            <div class="field field-full">
              <span>已选择的位置</span>
              <div class="location-pills">
                <span class="info-pill">${escapeHtml(state.admin.districtName || "区 / 县")}</span>
                <span class="info-pill">${escapeHtml(state.admin.streetName || "街道")}</span>
                <span class="info-pill">${escapeHtml(
                  state.admin.longitude && state.admin.latitude
                    ? `${state.admin.longitude}, ${state.admin.latitude}`
                    : "坐标"
                )}</span>
              </div>
              <input class="input subtle-input" type="text" value="${escapeHtml(
                state.admin.locationLabel
              )}" readonly placeholder="点击右侧地图或选择搜索结果后，这里会自动填写详细地址" />
            </div>
            <label class="field field-full">
              <span>标签</span>
              <input class="input" type="text" data-admin-field="tags" value="${escapeHtml(state.admin.tags)}" placeholder="街拍, 建筑, 夜景" />
            </label>
            <label class="field field-full">
              <span>描述</span>
              <textarea class="input textarea" data-admin-field="description" placeholder="少量描述即可。">${escapeHtml(
                state.admin.description
              )}</textarea>
            </label>
            <label class="field field-full">
              <span>照片</span>
              <input class="input file-input" type="file" accept="image/*" multiple data-admin-files />
            </label>
          </div>
          ${
            state.admin.previews.length
              ? `
                <div class="preview-grid">
                  ${state.admin.previews
                    .map(
                      (preview) => `
                        <div class="preview-card">
                          <div class="preview-image" style="background-image:url('${preview.src}')"></div>
                          <span>${escapeHtml(preview.name)}</span>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="actions">
            <button class="primary-button" type="button" data-admin-publish>发布到 ${city ? escapeHtml(city.name) : "当前城市"}</button>
          </div>
        </article>
        <article class="map-card admin-map-card">
          <div class="admin-map-head">
            <div>
              <span class="eyebrow">Picker</span>
              <h2>${city ? escapeHtml(city.name) : "选择城市"}</h2>
            </div>
            <span class="mini-note">点击地图可精确反查区 / 街道 / 坐标</span>
          </div>
          <div class="map-stage admin-stage" id="admin-map">
            ${!CONFIG.amapKey ? renderMapUnavailable("需要高德地图 Key 才能在后台点选真实位置。") : ""}
          </div>
        </article>
      </div>
      ${renderAdminLibrarySection()}
    </section>
  `;
}

function renderLightbox() {
  const root = document.getElementById("lightbox-root");
  if (!state.lightbox.open || !state.lightbox.photos.length) {
    root.innerHTML = "";
    return;
  }

  const photo = state.lightbox.photos[state.lightbox.index];
  if (!photo) {
    root.innerHTML = "";
    return;
  }

  root.innerHTML = `
    <div class="lightbox" data-lightbox-dismiss>
      <div class="lightbox-inner" data-lightbox-panel>
        <div class="lightbox-top">
          <div>
            <strong>${escapeHtml(photo.title)}</strong>
            <span>${escapeHtml(state.lightbox.title)}</span>
          </div>
          <button class="ghost-button" type="button" data-lightbox-close>关闭</button>
        </div>
        <div class="lightbox-media" style="background-image:url('${photo.imageUrl}')"></div>
        <div class="lightbox-bottom">
          <span>${escapeHtml(photo.streetName || photo.location || "")}</span>
          <span>${escapeHtml(formatDate(photo.shotAt))}</span>
        </div>
      </div>
    </div>
  `;
}

function renderApp() {
  const app = document.getElementById("app");
  const route = state.route;
  if (state.ui.loading) {
    app.innerHTML = `
      <section class="page loading-page">
        <div class="loading-card">正在整理地图与照片…</div>
      </section>
    `;
    syncNav();
    renderLightbox();
    return;
  }

  let pageHtml = "";
  if (route.name === "map") {
    pageHtml = renderMapPage();
  } else if (route.name === "city") {
    pageHtml = renderCityPage(getCityBySlug(route.slug));
  } else {
    pageHtml = renderAdminPage();
  }

  app.innerHTML = pageHtml;
  syncNav();
  renderLightbox();
  queueMapHydration();
}

function renderShell() {
  document.body.innerHTML = `
    <div class="site-shell">
      ${renderTopNav()}
      <main id="app"></main>
    </div>
    <div id="lightbox-root"></div>
  `;
}

function queueMapHydration() {
  window.requestAnimationFrame(() => {
    hydrateMaps().catch((error) => {
      console.error(error);
    });
  });
}

function syncNav() {
  const current = state.route.name === "city" ? "map" : state.route.name;
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const name = href.replace(/^#\//, "").split("/")[0];
    link.classList.toggle("is-active", name === current);
  });
}

async function hydrateMaps() {
  const onMapPage = state.route.name === "map";
  const onCityPage = state.route.name === "city";
  const onAdminPage = state.route.name === "admin" && Boolean(state.auth.token);

  if (onMapPage) {
    await initChinaMap();
  } else {
    destroyMap("china");
  }

  if (onCityPage) {
    await initCityMap(getCityBySlug(state.route.slug));
  } else {
    destroyMap("city");
  }

  if (onAdminPage) {
    await initAdminMap();
  } else {
    destroyMap("admin");
    clearAdminOverlays();
    mapStore.adminMarker = null;
  }
}

async function initChinaMap() {
  const container = document.getElementById("china-map");
  if (!container || !CONFIG.amapKey) {
    return;
  }

  const AMap = await loadAMap();
  destroyMap("china");

  const map = new AMap.Map(container, createMapOptions([104.2, 35.8], 4.6));
  applyNativeMapFeatures(map);
  mapStore.china = map;

  const highlightedCities = state.cities.filter((city) => city.photoCount > 0);

  const markers = highlightedCities.map((city) => {
    const marker = new AMap.Marker({
      position: [city.center.lng, city.center.lat],
      anchor: "center",
      offset: new AMap.Pixel(0, 0),
      content: `
        <button class="city-pin is-active" type="button">
          <span class="city-pin-halo"></span>
          <span class="city-pin-core"></span>
          <span class="city-pin-badge">${city.photoCount}</span>
        </button>
      `,
      extData: { slug: city.slug, highlighted: true },
    });

    marker.on("click", () => {
      state.citySelection.activeSlug = city.slug;
      state.citySelection.shouldFocusDistrictByCity[city.slug] = false;
      if (!state.citySelection.activeCollectionKeyByCity[city.slug]) {
        state.citySelection.activeCollectionKeyByCity[city.slug] = city.collections[0]?.key || null;
      }
      navigate(`#/city/${city.slug}`);
    });

    marker.setMap(map);
    return marker;
  });

  if (markers.length) {
    map.setFitView(markers, false, [120, 120, 120, 120], 6);
  }
}

async function initCityMap(city) {
  const container = document.getElementById("city-map");
  if (!container || !city || !CONFIG.amapKey) {
    return;
  }

  const AMap = await loadAMap();
  destroyMap("city");
  clearCityOverlays();

  const map = new AMap.Map(container, createMapOptions([city.center.lng, city.center.lat], 10.5));
  applyNativeMapFeatures(map);
  mapStore.city = map;

  const districts = await fetchCityDistricts(city);
  const byCode = new Map(city.collections.filter((item) => item.districtCode).map((item) => [item.districtCode, item]));
  const byName = new Map(city.collections.map((item) => [item.districtName || item.label, item]));

  const allPolygons = [];
  const selectedCollection = getSelectedCollection(city);
  const selectedPolygons = [];
  const selectedPhotoMarkers = [];
  let selectedFocusPoint = selectedCollection?.center ? { ...selectedCollection.center } : null;

  for (const district of districts) {
    const collection = byCode.get(district.adcode) || byName.get(district.name) || null;
    const active = Boolean(collection);
    const isSelectedDistrict = collection && selectedCollection && collection.key === selectedCollection.key;
    for (const path of district.boundaries) {
      const isSelected = isSelectedDistrict;
      const polygon = new AMap.Polygon({
        path,
        strokeColor: isSelected ? "#5b83c7" : active ? "#9cb9e3" : "rgba(176,162,137,0.42)",
        strokeWeight: isSelected ? 3.2 : active ? 1.8 : 1.1,
        fillColor: isSelected ? "#ebf3ff" : active ? "#f6faff" : "#faf7f1",
        fillOpacity: isSelected ? 0.96 : active ? 0.78 : 0.18,
        bubble: true,
        cursor: collection ? "pointer" : "default",
      });
      polygon.setMap(map);
      mapStore.cityOverlays.push(polygon);
      allPolygons.push(polygon);
      if (collection) {
        polygon.on("click", () => {
          state.citySelection.activeCollectionKeyByCity[city.slug] = collection.key;
          state.citySelection.shouldFocusDistrictByCity[city.slug] = true;
          renderApp();
        });
      }
      if (isSelected) {
        selectedPolygons.push(polygon);
      }
    }

    if (isSelectedDistrict && !selectedFocusPoint && district.center) {
      selectedFocusPoint = { ...district.center };
    }

    if (collection?.photos?.length) {
      for (const photo of collection.photos) {
        if (!photo.longitude || !photo.latitude) {
          continue;
        }
        const pointMarker = new AMap.Marker({
          position: [photo.longitude, photo.latitude],
          anchor: "center",
          offset: new AMap.Pixel(0, 0),
          zIndex: isSelectedDistrict ? 58 : 34,
          content: createPhotoSpotContent(isSelectedDistrict),
        });
        pointMarker.on("click", () => {
          state.citySelection.activeCollectionKeyByCity[city.slug] = collection.key;
          state.citySelection.shouldFocusDistrictByCity[city.slug] = true;
          renderApp();
        });
        pointMarker.setMap(map);
        mapStore.cityOverlays.push(pointMarker);
        if (isSelectedDistrict) {
          selectedPhotoMarkers.push(pointMarker);
        }
      }
    }

    if (collection?.count && district.center) {
      const marker = new AMap.Marker({
        position: [district.center.lng, district.center.lat],
        anchor: "bottom-center",
        offset: new AMap.Pixel(0, -8),
        content: createLocationPinContent(collection.label, collection.count, selectedCollection?.key === collection.key),
      });
      marker.on("click", () => {
        state.citySelection.activeCollectionKeyByCity[city.slug] = collection.key;
        state.citySelection.shouldFocusDistrictByCity[city.slug] = true;
        renderApp();
      });
      marker.setMap(map);
      mapStore.cityOverlays.push(marker);
    }
  }

  let selectedFocusMarker = null;
  if (selectedCollection && selectedFocusPoint) {
    selectedFocusMarker = new AMap.Marker({
      position: [selectedFocusPoint.lng, selectedFocusPoint.lat],
      anchor: "bottom-center",
      offset: new AMap.Pixel(0, -18),
      zIndex: 74,
      content: createCollectionFocusContent(selectedCollection.label),
    });
    selectedFocusMarker.setMap(map);
    mapStore.cityOverlays.push(selectedFocusMarker);
  }

  if (allPolygons.length) {
    map.setFitView(allPolygons, false, [56, 56, 56, 56], 12);
  }

  if (state.citySelection.shouldFocusDistrictByCity[city.slug] && (selectedPolygons.length || selectedPhotoMarkers.length || selectedCollection?.center)) {
    window.setTimeout(() => {
      if (selectedCollection?.center) {
        const focusTargets = [...selectedPhotoMarkers, ...(selectedFocusMarker ? [selectedFocusMarker] : [])];
        if (focusTargets.length > 1) {
          map.setFitView(focusTargets, false, [92, 92, 92, 92], 16);
        } else {
          map.setZoomAndCenter(16.2, [selectedCollection.center.lng, selectedCollection.center.lat]);
        }
      } else if (selectedPhotoMarkers.length) {
        map.setFitView(selectedPhotoMarkers, false, [92, 92, 92, 92], 16);
      } else {
        map.setFitView(selectedPolygons, false, [84, 84, 84, 84], 14);
      }
      state.citySelection.shouldFocusDistrictByCity[city.slug] = false;
    }, 120);
  }
}

async function initAdminMap() {
  const container = document.getElementById("admin-map");
  const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || null;
  if (!container || !city || !CONFIG.amapKey) {
    return;
  }

  const AMap = await loadAMap();
  destroyMap("admin");
  clearAdminOverlays();

  const map = new AMap.Map(container, createMapOptions([city.center.lng, city.center.lat], 11.2));
  applyNativeMapFeatures(map);
  mapStore.admin = map;

  const districts = await fetchCityDistricts(city);
  const polygons = [];

  for (const district of districts) {
    for (const path of district.boundaries) {
      const polygon = new AMap.Polygon({
        path,
        strokeColor: "#d7cfc3",
        strokeWeight: 1.4,
        fillColor: "#fbf8f2",
        fillOpacity: 0.24,
      });
      polygon.setMap(map);
      mapStore.adminOverlays.push(polygon);
      polygons.push(polygon);
    }

  }

  if (polygons.length) {
    map.setFitView(polygons, false, [52, 52, 52, 52], 13);
  }

  map.on("click", async (event) => {
    const lng = Number(event.lnglat.getLng().toFixed(6));
    const lat = Number(event.lnglat.getLat().toFixed(6));
    await setAdminLocationFromLngLat(city, { lng, lat });
  });

  if (state.admin.longitude && state.admin.latitude) {
    placeAdminMarker(AMap, {
      lng: Number(state.admin.longitude),
      lat: Number(state.admin.latitude),
    });
  }
}

function placeAdminMarker(AMap, point) {
  if (!mapStore.admin) {
    return;
  }

  if (mapStore.adminMarker) {
    mapStore.adminMarker.setMap(null);
  }

  const marker = new AMap.Marker({
    position: [point.lng, point.lat],
    draggable: true,
    anchor: "bottom-center",
    offset: new AMap.Pixel(0, 6),
    content: `<div class="picker-pin"><span></span></div>`,
  });

  marker.on("dragend", async (event) => {
    const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || null;
    if (!city) {
      return;
    }
    await setAdminLocationFromLngLat(city, {
      lng: Number(event.lnglat.getLng().toFixed(6)),
      lat: Number(event.lnglat.getLat().toFixed(6)),
    });
  });

  marker.setMap(mapStore.admin);
  mapStore.adminMarker = marker;
}

async function reverseGeocode(city, point) {
  const AMap = await loadAMap();
  return new Promise((resolve, reject) => {
    const geocoder = new AMap.Geocoder({
      city: city.adcode || city.name,
      radius: 800,
      extensions: "all",
    });

    geocoder.getAddress([point.lng, point.lat], (status, result) => {
      if (status !== "complete" || !result?.regeocode) {
        reject(new Error("逆地理编码失败"));
        return;
      }

      const addressComponent = result.regeocode.addressComponent || {};
      const streetNumber = addressComponent.streetNumber || {};
      const streetName =
        [addressComponent.township, streetNumber.street, streetNumber.number].filter(Boolean).join("") ||
        streetNumber.street ||
        "";

      resolve({
        districtCode: addressComponent.adcode || "",
        districtName: addressComponent.district || addressComponent.township || "",
        streetName,
        locationLabel:
          result.regeocode.formattedAddress ||
          [addressComponent.city || city.name, addressComponent.district, streetName].filter(Boolean).join(" "),
        longitude: point.lng.toFixed(6),
        latitude: point.lat.toFixed(6),
      });
    });
  });
}

async function setAdminLocationFromLngLat(city, point) {
  try {
    const info = await reverseGeocode(city, point);
    state.admin.districtCode = info.districtCode;
    state.admin.districtName = info.districtName;
    state.admin.streetName = info.streetName;
    state.admin.locationLabel = info.locationLabel;
    state.admin.longitude = info.longitude;
    state.admin.latitude = info.latitude;
    state.admin.status = `已定位到 ${info.districtName || city.name} · ${info.streetName || "未命名道路"}`;
    const AMap = await loadAMap();
    placeAdminMarker(AMap, point);
    if (mapStore.admin) {
      mapStore.admin.panTo([point.lng, point.lat]);
      mapStore.admin.setZoom(14.5);
    }
    renderApp();
  } catch (error) {
    state.admin.status = error.message || "无法解析当前位置";
    renderApp();
  }
}

async function handleAdminSearch() {
  const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || null;
  if (!city || !state.admin.searchKeyword.trim()) {
    return;
  }

  try {
    const AMap = await loadAMap();
    const placeSearch = new AMap.PlaceSearch({
      city: city.adcode || city.name,
      citylimit: true,
      pageSize: 6,
      pageIndex: 1,
      extensions: "base",
    });

    const results = await new Promise((resolve, reject) => {
      placeSearch.search(state.admin.searchKeyword.trim(), (status, result) => {
        if (status !== "complete") {
          reject(new Error("地点搜索失败"));
          return;
        }
        resolve(result?.poiList?.pois || []);
      });
    });

    state.admin.searchResults = results
      .filter((poi) => poi.location)
      .map((poi) => ({
        name: poi.name,
        address: poi.address,
        district: poi.district,
        adcode: poi.adcode,
        location: {
          lng: Number(poi.location.lng),
          lat: Number(poi.location.lat),
        },
      }));

    state.admin.status = state.admin.searchResults.length ? "请选择一个搜索结果。" : "没有搜到结果。";
    renderApp();
  } catch (error) {
    state.admin.status = error.message || "搜索失败";
    renderApp();
  }
}

async function handleLogin() {
  const email = document.querySelector('[data-login-field="email"]')?.value.trim() || "";
  const password = document.querySelector('[data-login-field="password"]')?.value || "";

  try {
    const payload = await apiFetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    state.auth.token = payload.token;
    state.auth.error = "";
    state.admin.status = "";
    sessionStorage.setItem(ADMIN_TOKEN_KEY, payload.token);
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
  renderApp();
}

function handleFiles(files) {
  state.admin.files = Array.from(files || []);
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
  const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || null;
  if (!city) {
    state.admin.status = "请先选择城市。";
    renderApp();
    return;
  }
  if (!state.admin.files.length) {
    state.admin.status = "请至少选择一张照片。";
    renderApp();
    return;
  }
  if (!state.admin.longitude || !state.admin.latitude || !state.admin.districtName) {
    state.admin.status = "请先在地图上精确选择位置。";
    renderApp();
    return;
  }

  const formData = new FormData();
  formData.append("cityId", String(city.id));
  formData.append("title", state.admin.title || "Untitled Frame");
  formData.append("shotAt", state.admin.shotAt || new Date().toISOString().slice(0, 10));
  formData.append("camera", state.admin.camera || city.gear || "");
  formData.append("location", state.admin.locationLabel || state.admin.streetName || state.admin.districtName);
  formData.append("districtCode", state.admin.districtCode);
  formData.append("districtName", state.admin.districtName);
  formData.append("streetName", state.admin.streetName);
  formData.append("longitude", state.admin.longitude);
  formData.append("latitude", state.admin.latitude);
  formData.append("description", state.admin.description);
  formData.append("tags", state.admin.tags);
  formData.append("published", String(state.admin.published));
  formData.append("isCover", String(state.admin.isCover));
  state.admin.files.forEach((file) => formData.append("photos", file));

  state.admin.status = "正在发布…";
  renderApp();

  try {
    await apiFetch("/admin/photos", {
      method: "POST",
      body: formData,
    });
    state.admin.status = "发布成功，地图已刷新。";
    resetAdminForm(city.id);
    await loadCities();
    const refreshedCity = getCityBySlug(city.slug);
    if (refreshedCity?.collections.length) {
      state.citySelection.activeCollectionKeyByCity[refreshedCity.slug] = refreshedCity.collections[0].key;
      state.citySelection.shouldFocusDistrictByCity[refreshedCity.slug] = false;
    }
    navigate(`#/city/${city.slug}`);
  } catch (error) {
    state.admin.status = error.message || "发布失败";
    renderApp();
  }
}

function resetAdminForm(cityId) {
  state.admin.title = "";
  state.admin.shotAt = "";
  state.admin.camera = "";
  state.admin.tags = "";
  state.admin.description = "";
  state.admin.searchKeyword = "";
  state.admin.searchResults = [];
  state.admin.districtCode = "";
  state.admin.districtName = "";
  state.admin.streetName = "";
  state.admin.longitude = "";
  state.admin.latitude = "";
  state.admin.locationLabel = "";
  state.admin.files = [];
  state.admin.previews = [];
  state.admin.cityId = cityId;
}

function openLightbox(city, collection, photoId) {
  const index = collection.photos.findIndex((photo) => photo.id === photoId);
  state.lightbox.open = true;
  state.lightbox.photos = collection.photos;
  state.lightbox.index = index >= 0 ? index : 0;
  state.lightbox.title = `${city.name} · ${collection.label}`;
  renderLightbox();
}

function closeLightbox() {
  state.lightbox.open = false;
  state.lightbox.photos = [];
  state.lightbox.index = 0;
  state.lightbox.title = "";
  renderLightbox();
}

function shiftLightbox(direction) {
  if (!state.lightbox.photos.length) {
    return;
  }
  const count = state.lightbox.photos.length;
  state.lightbox.index = (state.lightbox.index + direction + count) % count;
  renderLightbox();
}

async function focusPhotoOnCityMap(collection, photo) {
  if (!mapStore.city || !photo?.longitude || !photo?.latitude || !CONFIG.amapKey) {
    return;
  }

  const AMap = await loadAMap();

  if (mapStore.cityPhotoFocusMarker) {
    try {
      mapStore.cityPhotoFocusMarker.setMap(null);
    } catch (_error) {
      // ignore
    }
    mapStore.cityOverlays = mapStore.cityOverlays.filter((overlay) => overlay !== mapStore.cityPhotoFocusMarker);
    mapStore.cityPhotoFocusMarker = null;
  }

  const marker = new AMap.Marker({
    position: [photo.longitude, photo.latitude],
    anchor: "bottom-center",
    offset: new AMap.Pixel(0, -18),
    zIndex: 88,
    content: createFocusedPhotoContent(photo.title || collection?.label || ""),
  });
  marker.setMap(mapStore.city);
  mapStore.cityOverlays.push(marker);
  mapStore.cityPhotoFocusMarker = marker;
  mapStore.city.setZoomAndCenter(16.8, [photo.longitude, photo.latitude]);
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const cityButton = target.closest("[data-city-open]");
    if (cityButton) {
      const slug = cityButton.getAttribute("data-city-open");
      state.citySelection.activeSlug = slug;
      state.citySelection.shouldFocusDistrictByCity[slug] = false;
      navigate(`#/city/${slug}`);
      return;
    }

    const collectionButton = target.closest("[data-collection-key]");
    if (collectionButton) {
      const citySlug = collectionButton.getAttribute("data-city-slug");
      const key = collectionButton.getAttribute("data-collection-key");
      state.citySelection.activeCollectionKeyByCity[citySlug] = key;
      state.citySelection.shouldFocusDistrictByCity[citySlug] = true;
      renderApp();
      return;
    }

    const photoButton = target.closest("[data-photo-open]");
    if (photoButton) {
      const [citySlug, collectionKey, photoId] = (photoButton.getAttribute("data-photo-open") || "").split(":");
      const city = getCityBySlug(citySlug);
      const collection = city?.collections.find((item) => item.key === collectionKey);
      const photo = collection?.photos.find((item) => item.id === photoId);
      if (collection && photo) {
        await focusPhotoOnCityMap(collection, photo);
      }
      if (city && collection) {
        openLightbox(city, collection, photoId);
      }
      return;
    }

    const dismissLayer = target.closest("[data-lightbox-dismiss]");
    const lightboxPanel = target.closest("[data-lightbox-panel]");
    if (target.closest("[data-lightbox-close]") || (dismissLayer && !lightboxPanel)) {
      closeLightbox();
      return;
    }

    if (target.closest("[data-login-submit]")) {
      await handleLogin();
      return;
    }

    if (target.closest("[data-logout]")) {
      handleLogout();
      return;
    }

    if (target.closest("[data-admin-search]")) {
      await handleAdminSearch();
      return;
    }

    const manageCityButton = target.closest("[data-admin-manage-city]");
    if (manageCityButton) {
      const slug = manageCityButton.getAttribute("data-admin-manage-city") || "";
      if (slug) {
        state.admin.libraryCitySlug = slug;
        renderApp();
      }
      return;
    }

    const searchPick = target.closest("[data-search-pick]");
    if (searchPick) {
      const index = Number(searchPick.getAttribute("data-search-pick"));
      const item = state.admin.searchResults[index];
      const city = state.cities.find((entry) => entry.id === Number(state.admin.cityId));
      if (item && city) {
        state.admin.searchKeyword = item.name;
        state.admin.searchResults = [];
        await setAdminLocationFromLngLat(city, item.location, item.name);
      }
      return;
    }

    if (target.closest("[data-admin-publish]")) {
      await handlePublish();
      return;
    }

    const deletePhotoButton = target.closest("[data-admin-delete-photo]");
    if (deletePhotoButton) {
      const photoId = deletePhotoButton.getAttribute("data-admin-delete-photo") || "";
      await handleAdminPhotoDelete(photoId);
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.matches("[data-admin-field='cityId']")) {
      const nextCityId = Number(target.value);
      state.admin.cityId = nextCityId;
      state.admin.searchResults = [];
      state.admin.districtCode = "";
      state.admin.districtName = "";
      state.admin.streetName = "";
      state.admin.longitude = "";
      state.admin.latitude = "";
      state.admin.locationLabel = "";
      state.admin.selectedPoiName = "";
      state.admin.locationSource = "";
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

    const field = target.getAttribute("data-admin-field");
    if (field && field in state.admin) {
      state.admin[field] = target.value;
      if (field === "searchKeyword") {
        state.admin.selectedPoiName = "";
        state.admin.locationSource = "";
      }
      return;
    }
  });

  window.addEventListener("hashchange", () => {
    state.route = parseHash();
    if (state.route.name === "city" && state.route.slug) {
      state.citySelection.activeSlug = state.route.slug;
      if (!state.citySelection.activeCollectionKeyByCity[state.route.slug]) {
        const city = getCityBySlug(state.route.slug);
        state.citySelection.activeCollectionKeyByCity[state.route.slug] = city?.collections[0]?.key || null;
      }
    }
    renderApp();
  });

  window.addEventListener("keydown", (event) => {
    if (!state.lightbox.open) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
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
}

function renderMapPage() {
  const highlightedCities = state.cities.filter((city) => city.photoCount > 0);
  return `
    <section class="page map-page">
      ${renderBanner()}
      <div class="hero">
        <div class="hero-copy">
          <span class="eyebrow">China / Photo Atlas</span>
          <h1>中国地图</h1>
          <p>被点亮的城市。</p>
          <div class="stat-row">
            <span class="stat-pill"><strong>${highlightedCities.length}</strong> 座城市</span>
            <span class="stat-pill"><strong>${state.cities.reduce((sum, city) => sum + city.photoCount, 0)}</strong> 张照片</span>
            <span class="stat-pill"><strong>${unique(state.cities.flatMap((city) => city.collections.map((item) => item.label))).length}</strong> 个区域</span>
          </div>
        </div>
        <article class="map-card national-card">
          <div class="map-stage large-stage" id="china-map">
            <div class="map-stage-wash"></div>
            <div class="map-stage-caption">
              <span>China</span>
              <span>Click a lit city</span>
            </div>
            ${!CONFIG.amapKey ? renderMapUnavailable("请先在 site-config.js 中填写高德地图 Key 与安全密钥。") : ""}
          </div>
        </article>
      </div>
      <section class="city-strip">
        <div class="section-head">
          <div>
            <span class="eyebrow">Cities</span>
            <h2>已点亮的城市</h2>
          </div>
        </div>
        <div class="city-card-grid">
          ${highlightedCities
            .map(
              (city) => `
                <button class="city-card" type="button" data-city-open="${city.slug}">
                  <div class="city-card-cover" style="background-image:url('${city.cover}')"></div>
                  <div class="city-card-body">
                    <div class="city-card-top">
                      <strong>${escapeHtml(city.name)}</strong>
                      <span>${escapeHtml(city.nameEn)}</span>
                    </div>
                    <div class="city-card-meta">
                      <span>${escapeHtml(city.province)}</span>
                      <span>${city.photoCount} 张</span>
                      <span>${city.collections.length} 区域</span>
                    </div>
                  </div>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderCollectionCards(city) {
  if (!city.collections.length) {
    return `<div class="empty-card">这座城市还没有按区域整理好的作品。</div>`;
  }
  const activeCollection = getSelectedCollection(city);
  return city.collections
    .map(
      (collection) => `
        <button
          class="collection-card ${activeCollection?.key === collection.key ? "is-active" : ""}"
          type="button"
          data-collection-key="${escapeHtml(collection.key)}"
          data-city-slug="${city.slug}"
        >
          <div class="collection-card-cover" style="background-image:url('${collection.cover}')"></div>
          <div class="collection-card-body">
            <strong>${escapeHtml(collection.label)}</strong>
            <span>${collection.count} 张</span>
            <small>${collection.latestShotAt ? escapeHtml(formatDate(collection.latestShotAt)) : "持续归档中"}</small>
          </div>
        </button>
      `
    )
    .join("");
}

function renderPhotoGrid(collection, city) {
  if (!collection) {
    return `<div class="empty-card">先点开一个行政区。</div>`;
  }

  return `
    <div class="gallery-head">
      <div>
        <span class="eyebrow">Collection</span>
        <h2>${escapeHtml(collection.label)}</h2>
      </div>
      <div class="gallery-meta">
        <span>${collection.count} 张</span>
        ${collection.latestShotAt ? `<span>${escapeHtml(formatDate(collection.latestShotAt))}</span>` : ""}
      </div>
    </div>
    <div class="photo-grid">
      ${collection.photos
        .map(
          (photo, index) => `
            <button
              class="photo-card ${getPhotoCardClass(index)}"
              type="button"
              data-photo-open="${city.slug}:${collection.key}:${photo.id}:${index}"
              style="background-image:url('${photo.imageUrl}')"
            >
              <span class="photo-card-topline">${escapeHtml(formatDate(photo.shotAt))}</span>
              <span class="photo-card-overlay">
                <strong>${escapeHtml(photo.title)}</strong>
                <span>${escapeHtml(photo.streetName || photo.location || collection.label)}</span>
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCityPage(city) {
  if (!city) {
    return `
      <section class="page">
        <div class="empty-card">找不到这座城市。</div>
      </section>
    `;
  }

  const activeCollection = getSelectedCollection(city);

  return `
    <section class="page city-page">
      <div class="page-head">
        <div class="page-head-copy">
          <a class="back-link" href="#/map">返回中国地图</a>
          <h1>${escapeHtml(city.name)}</h1>
          <p>${escapeHtml(city.nameEn)} · ${escapeHtml(city.province)}</p>
        </div>
        <div class="page-head-stats">
          <span>${city.photoCount} 张</span>
          <span>${city.collections.length} 个区域</span>
        </div>
      </div>
      <div class="city-layout">
        <article class="map-card">
          <div class="map-stage city-stage" id="city-map">
            <div class="map-stage-caption map-stage-caption--city">
              <span>${escapeHtml(city.name)}</span>
              <span>District drill-down</span>
            </div>
            ${!CONFIG.amapKey ? renderMapUnavailable("需要高德地图 Key 才能显示真实行政区边界。") : ""}
          </div>
        </article>
        <aside class="side-panel side-panel--rail">
          <div class="side-panel-head">
            <span class="eyebrow">Districts</span>
            <h2>区域集合</h2>
          </div>
          <div class="collection-list collection-rail">
            ${renderCollectionCards(city)}
          </div>
        </aside>
      </div>
      <section class="gallery-panel">
        ${renderPhotoGrid(activeCollection, city)}
      </section>
    </section>
  `;
}

function renderTopNav() {
  const current = state.route.name === "city" ? "map" : state.route.name;
  return `
    <header class="topbar">
      <a class="brand" href="#/map">
        <span class="brand-eyebrow">Places I Shot</span>
        <span class="brand-title">中国地图</span>
      </a>
      <nav class="nav">
        <a class="nav-link ${current === "map" ? "is-active" : ""}" href="#/map">地图</a>
        <a class="nav-link ${current === "admin" ? "is-active" : ""}" href="#/admin">管理</a>
      </nav>
    </header>
  `;
}

function buildCollections(photos) {
  const grouped = new Map();
  for (const photo of photos) {
    const placeLabel = photo.location || photo.streetName || photo.districtName || "";
    const key =
      [photo.districtCode || photo.districtName || "city", placeLabel || photo.id].filter(Boolean).join("::") ||
      `unlocated-${photo.id}`;

    if (!grouped.has(key)) {
      grouped.set(key, {
        key,
        districtCode: photo.districtCode || "",
        districtName: photo.districtName || "",
        label: placeLabel || "未精确定位",
        photos: [],
      });
    }
    grouped.get(key).photos.push(photo);
  }

  return Array.from(grouped.values())
    .map((collection) => {
      const coords = collection.photos.filter((photo) => photo.longitude && photo.latitude);
      const cover = collection.photos.find((photo) => photo.isCover) || collection.photos[0];
      return {
        ...collection,
        cover: cover ? cover.imageUrl : "",
        count: collection.photos.length,
        latestShotAt: collection.photos
          .map((photo) => photo.shotAt)
          .filter(Boolean)
          .sort()
          .at(-1) || "",
        center: coords.length
          ? {
              lng: coords.reduce((sum, photo) => sum + Number(photo.longitude), 0) / coords.length,
              lat: coords.reduce((sum, photo) => sum + Number(photo.latitude), 0) / coords.length,
            }
          : null,
      };
    })
    .sort((a, b) => b.count - a.count || b.latestShotAt.localeCompare(a.latestShotAt));
}

async function setAdminLocationFromLngLat(city, point, preferredLabel = "") {
  try {
    const info = await reverseGeocode(city, point);
    state.admin.districtCode = info.districtCode;
    state.admin.districtName = info.districtName;
    state.admin.streetName = info.streetName;
    state.admin.locationLabel = preferredLabel || info.locationLabel;
    state.admin.longitude = info.longitude;
    state.admin.latitude = info.latitude;
    state.admin.status = `已定位到 ${preferredLabel || info.districtName || city.name}`;
    const AMap = await loadAMap();
    placeAdminMarker(AMap, point);
    if (mapStore.admin) {
      mapStore.admin.panTo([point.lng, point.lat]);
      mapStore.admin.setZoom(14.5);
    }
    renderApp();
  } catch (error) {
    state.admin.status = error.message || "无法解析当前位置";
    renderApp();
  }
}

function renderCollectionCards(city) {
  if (!city.collections.length) {
    return `<div class="empty-card">还没有可浏览的地点集合。</div>`;
  }
  const activeCollection = getSelectedCollection(city);
  return city.collections
    .map(
      (collection) => `
        <button
          class="collection-card ${activeCollection?.key === collection.key ? "is-active" : ""}"
          type="button"
          data-collection-key="${escapeHtml(collection.key)}"
          data-city-slug="${city.slug}"
        >
          <div class="collection-card-cover" style="background-image:url('${collection.cover}')"></div>
          <div class="collection-card-body">
            <span class="collection-card-kicker">Location</span>
            <strong>${escapeHtml(collection.label)}</strong>
            <span>${escapeHtml(
              collection.districtName && collection.districtName !== collection.label
                ? collection.districtName
                : `${collection.count} 张照片`
            )}</span>
            <small>${collection.latestShotAt ? escapeHtml(formatDate(collection.latestShotAt)) : "持续归档中"}</small>
          </div>
        </button>
      `
    )
    .join("");
}

function renderPhotoGrid(collection, city) {
  if (!collection) {
    return `<div class="empty-card">先点开一个地点集合。</div>`;
  }

  return `
    <div class="gallery-head">
      <div>
        <span class="eyebrow">Location</span>
        <h2>${escapeHtml(collection.label)}</h2>
      </div>
      <div class="gallery-meta">
        <span>${collection.count} 张</span>
        ${collection.latestShotAt ? `<span>${escapeHtml(formatDate(collection.latestShotAt))}</span>` : ""}
      </div>
    </div>
    <div class="photo-grid">
      ${collection.photos
        .map(
          (photo, index) => `
            <button
              class="photo-card ${getPhotoCardClass(index)}"
              type="button"
              data-photo-open="${city.slug}:${collection.key}:${photo.id}:${index}"
              style="background-image:url('${photo.imageUrl}')"
            >
              <span class="photo-card-topline">${escapeHtml(formatDate(photo.shotAt))}</span>
              <span class="photo-card-overlay">
                <strong>${escapeHtml(photo.title)}</strong>
                <span>${escapeHtml(photo.streetName || photo.location || collection.label)}</span>
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderAdminPage() {
  if (!state.auth.token) {
    return renderLoginPanel();
  }

  const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || state.cities[0] || null;
  const canPublish = Boolean(
    city &&
      state.admin.files.length &&
      state.admin.longitude &&
      state.admin.latitude &&
      state.admin.selectedPoiName &&
      state.admin.locationSource === "poi"
  );

  return `
    <section class="page admin-page">
      <div class="page-head compact">
        <div class="page-head-copy">
          <span class="eyebrow">Upload</span>
          <h1>地点上传</h1>
          <p>先搜索并选中一个具体地点 POI，再发布这一组照片。</p>
        </div>
        <button class="ghost-button" type="button" data-logout>退出</button>
      </div>
      <div class="admin-layout">
        <article class="form-panel">
          ${state.admin.status ? `<div class="status-banner is-${escapeHtml(state.admin.statusKind || "neutral")}">${escapeHtml(state.admin.status)}</div>` : ""}
          <div class="form-grid">
            <label class="field">
              <span>城市</span>
              <select class="input" data-admin-field="cityId">
                ${state.cities
                  .map(
                    (item) => `
                      <option value="${item.id}" ${Number(state.admin.cityId) === item.id ? "selected" : ""}>
                        ${escapeHtml(item.name)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </label>
            <label class="field">
              <span>标题</span>
              <input class="input" type="text" data-admin-field="title" value="${escapeHtml(state.admin.title)}" placeholder="例如：雨后桥边" />
            </label>
            <label class="field">
              <span>日期</span>
              <input class="input" type="date" data-admin-field="shotAt" value="${escapeHtml(state.admin.shotAt)}" />
            </label>
            <label class="field">
              <span>器材</span>
              <input class="input" type="text" data-admin-field="camera" value="${escapeHtml(state.admin.camera)}" placeholder="例如：Leica Q3" />
            </label>
            <label class="field field-full">
              <span>搜索具体地点</span>
              <div class="search-line">
                <input
                  class="input"
                  type="text"
                  data-admin-field="searchKeyword"
                  value="${escapeHtml(state.admin.searchKeyword)}"
                  placeholder="例如：西泠桥 / 湖滨银泰 / 灵隐路口"
                />
                <button class="ghost-button" type="button" data-admin-search>搜索</button>
              </div>
              ${renderSearchResults()}
              <span class="mini-note">只有从搜索结果里选中的具体地点，才允许发布。</span>
            </label>
            <div class="field field-full">
              <span>已选择的位置</span>
              <div class="location-pills">
                <span class="info-pill">${escapeHtml(state.admin.selectedPoiName || "具体地点 POI")}</span>
                <span class="info-pill">${escapeHtml(state.admin.districtName || "区 / 县")}</span>
                <span class="info-pill">${escapeHtml(state.admin.streetName || "街道")}</span>
                <span class="info-pill">${escapeHtml(
                  state.admin.longitude && state.admin.latitude
                    ? `${state.admin.longitude}, ${state.admin.latitude}`
                    : "坐标"
                )}</span>
              </div>
              <input
                class="input subtle-input"
                type="text"
                value="${escapeHtml(state.admin.locationLabel)}"
                readonly
                placeholder="选中搜索结果后，这里会自动填入地点信息"
              />
            </div>
            <label class="field field-full">
              <span>标签</span>
              <input class="input" type="text" data-admin-field="tags" value="${escapeHtml(state.admin.tags)}" placeholder="街拍, 建筑, 夜景" />
            </label>
            <label class="field field-full">
              <span>描述</span>
              <textarea class="input textarea" data-admin-field="description" placeholder="少量描述即可。">${escapeHtml(
                state.admin.description
              )}</textarea>
            </label>
            <label class="field field-full">
              <span>照片</span>
              <input class="input file-input" type="file" accept="image/*" multiple data-admin-files />
            </label>
          </div>
          ${
            state.admin.previews.length
              ? `
                <div class="preview-grid">
                  ${state.admin.previews
                    .map(
                      (preview) => `
                        <div class="preview-card">
                          <div class="preview-image" style="background-image:url('${preview.src}')"></div>
                          <span>${escapeHtml(preview.name)}</span>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="actions">
            <button class="primary-button" type="button" data-admin-publish ${canPublish ? "" : "disabled"}>
              发布到 ${city ? escapeHtml(city.name) : "当前城市"}
            </button>
          </div>
        </article>
        <article class="map-card admin-map-card">
          <div class="admin-map-head">
            <div>
              <span class="eyebrow">Picker</span>
              <h2>${city ? escapeHtml(city.name) : "选择城市"}</h2>
            </div>
            <span class="mini-note">地图点选只用于辅助查看位置，不作为最终发布依据。</span>
          </div>
          <div class="map-stage admin-stage" id="admin-map">
            ${!CONFIG.amapKey ? renderMapUnavailable("需要高德地图 Key 才能在后台点选真实位置。") : ""}
          </div>
        </article>
      </div>
      ${renderAdminLibrarySection()}
    </section>
  `;
}

async function setAdminLocationFromLngLat(city, point, preferredLabel = "") {
  try {
    const info = await reverseGeocode(city, point);
    const isPoiSelection = Boolean(preferredLabel);
    state.admin.districtCode = info.districtCode;
    state.admin.districtName = info.districtName;
    state.admin.streetName = info.streetName;
    state.admin.locationLabel = preferredLabel || info.locationLabel;
    state.admin.longitude = info.longitude;
    state.admin.latitude = info.latitude;
    state.admin.selectedPoiName = isPoiSelection ? preferredLabel : "";
    state.admin.locationSource = isPoiSelection ? "poi" : "map";
    state.admin.statusKind = "neutral";
    state.admin.status = isPoiSelection
      ? `已锁定地点：${preferredLabel}`
      : "当前只是地图定位，请从搜索结果中选择一个具体地点 POI 才能发布。";
    const AMap = await loadAMap();
    placeAdminMarker(AMap, point);
    if (mapStore.admin) {
      mapStore.admin.panTo([point.lng, point.lat]);
      mapStore.admin.setZoom(14.5);
    }
    renderApp();
  } catch (error) {
    state.admin.statusKind = "error";
    state.admin.status = error.message || "无法解析当前位置";
    renderApp();
  }
}

async function handlePublish() {
  const city = state.cities.find((item) => item.id === Number(state.admin.cityId)) || null;
  if (!city) {
    state.admin.statusKind = "error";
    state.admin.status = "请先选择城市。";
    renderApp();
    return;
  }
  if (!state.admin.files.length) {
    state.admin.statusKind = "error";
    state.admin.status = "请至少选择一张照片。";
    renderApp();
    return;
  }
  if (!state.admin.longitude || !state.admin.latitude || !state.admin.districtName) {
    state.admin.statusKind = "error";
    state.admin.status = "请先确认地图位置。";
    renderApp();
    return;
  }
  if (state.admin.locationSource !== "poi" || !state.admin.selectedPoiName) {
    state.admin.statusKind = "error";
    state.admin.status = "请先从搜索结果中选择一个具体地点 POI，再发布照片。";
    renderApp();
    return;
  }

  const formData = new FormData();
  formData.append("cityId", String(city.id));
  formData.append("title", state.admin.title || "Untitled Frame");
  formData.append("shotAt", state.admin.shotAt || new Date().toISOString().slice(0, 10));
  formData.append("camera", state.admin.camera || city.gear || "");
  formData.append("location", state.admin.selectedPoiName);
  formData.append("selectedPoiName", state.admin.selectedPoiName);
  formData.append("locationSource", state.admin.locationSource);
  formData.append("districtCode", state.admin.districtCode);
  formData.append("districtName", state.admin.districtName);
  formData.append("streetName", state.admin.streetName);
  formData.append("longitude", state.admin.longitude);
  formData.append("latitude", state.admin.latitude);
  formData.append("description", state.admin.description);
  formData.append("tags", state.admin.tags);
  formData.append("published", String(state.admin.published));
  formData.append("isCover", String(state.admin.isCover));
  state.admin.files.forEach((file) => formData.append("photos", file));

  state.admin.statusKind = "progress";
  state.admin.status = "正在发布…";
  renderApp();

  try {
    await apiFetch("/admin/photos", {
      method: "POST",
      body: formData,
    });
    state.admin.statusKind = "success";
    state.admin.status = "发布成功，地图已刷新。";
    resetAdminForm(city.id);
    await loadCities();
    const refreshedCity = getCityBySlug(city.slug);
    if (refreshedCity?.collections.length) {
      state.citySelection.activeCollectionKeyByCity[refreshedCity.slug] = refreshedCity.collections[0].key;
      state.citySelection.shouldFocusDistrictByCity[refreshedCity.slug] = false;
    }
    navigate(`#/city/${city.slug}`);
  } catch (error) {
    state.admin.statusKind = "error";
    state.admin.status = error.message || "发布失败";
    renderApp();
  }
}

function resetAdminForm(cityId) {
  state.admin.title = "";
  state.admin.shotAt = "";
  state.admin.camera = "";
  state.admin.tags = "";
  state.admin.description = "";
  state.admin.searchKeyword = "";
  state.admin.searchResults = [];
  state.admin.districtCode = "";
  state.admin.districtName = "";
  state.admin.streetName = "";
  state.admin.longitude = "";
  state.admin.latitude = "";
  state.admin.locationLabel = "";
  state.admin.selectedPoiName = "";
  state.admin.locationSource = "";
  state.admin.files = [];
  state.admin.previews = [];
  state.admin.cityId = cityId;
  state.admin.statusKind = "neutral";
}

function renderCollectionCards(city) {
  if (!city.collections.length) {
    return `<div class="empty-card">还没有可浏览的地点集合。</div>`;
  }
  const activeCollection = getSelectedCollection(city);
  return city.collections
    .map(
      (collection) => `
        <button
          class="collection-card ${activeCollection?.key === collection.key ? "is-active" : ""}"
          type="button"
          data-collection-key="${escapeHtml(collection.key)}"
          data-city-slug="${city.slug}"
        >
          <div class="collection-card-cover" style="background-image:url('${collection.cover}')"></div>
          <div class="collection-card-body">
            <span class="collection-card-kicker">Location</span>
            <strong>${escapeHtml(collection.label)}</strong>
            <span>${escapeHtml(
              collection.districtName && collection.districtName !== collection.label
                ? collection.districtName
                : `${collection.count} 张照片`
            )}</span>
            <small>${collection.latestShotAt ? escapeHtml(formatDate(collection.latestShotAt)) : "持续归档中"}</small>
          </div>
        </button>
      `
    )
    .join("");
}

function renderPhotoGrid(collection, city) {
  if (!collection) {
    return `<div class="empty-card">先点开一个地点集合。</div>`;
  }

  return `
    <div class="gallery-head">
      <div>
        <span class="eyebrow">Location</span>
        <h2>${escapeHtml(collection.label)}</h2>
      </div>
      <div class="gallery-meta">
        <span>${collection.count} 张</span>
        ${collection.latestShotAt ? `<span>${escapeHtml(formatDate(collection.latestShotAt))}</span>` : ""}
      </div>
    </div>
    <div class="photo-grid">
      ${collection.photos
        .map(
          (photo, index) => `
            <button
              class="photo-card ${getPhotoCardClass(index)}"
              type="button"
              data-photo-open="${city.slug}:${collection.key}:${photo.id}:${index}"
              style="background-image:url('${photo.imageUrl}')"
            >
              <span class="photo-card-topline">${escapeHtml(formatDate(photo.shotAt))}</span>
              <span class="photo-card-overlay">
                <strong>${escapeHtml(photo.title)}</strong>
                <span>${escapeHtml(photo.streetName || photo.location || collection.label)}</span>
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function normalizeAdminText(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join("");
  }
  return String(value || "").trim();
}

function simplifyCityName(value) {
  return normalizeAdminText(value).replace(/(市|地区|盟|自治州)$/u, "") || normalizeAdminText(value);
}

function deriveCityAdcodeFromDistrict(value) {
  const code = String(value || "").trim();
  if (!/^\d{6}$/.test(code)) {
    return "";
  }
  return `${code.slice(0, 4)}00`;
}

function getAdminResolvedCity() {
  const hasExplicitCityContext = Boolean(state.admin.cityName || state.admin.selectedPoiName || state.admin.longitude);

  if (state.admin.cityId && hasExplicitCityContext) {
    const byId = state.cities.find((city) => city.id === Number(state.admin.cityId));
    if (byId) {
      return byId;
    }
  }

  const targetName = simplifyCityName(state.admin.cityName);
  if (!targetName) {
    return null;
  }

  return (
    state.cities.find((city) => {
      const cityName = simplifyCityName(city.name);
      return cityName === targetName || city.adcode === state.admin.cityAdcode;
    }) || null
  );
}

function getAdminContextCity() {
  const existing = getAdminResolvedCity();
  if (existing) {
    return existing;
  }

  if (!state.admin.cityName || !state.admin.cityLongitude || !state.admin.cityLatitude) {
    return null;
  }

  return {
    id: null,
    slug: "",
    name: state.admin.cityName,
    nameEn: state.admin.cityNameEn || "",
    province: state.admin.province || state.admin.cityName,
    adcode: state.admin.cityAdcode || "",
    center: {
      lng: Number(state.admin.cityLongitude),
      lat: Number(state.admin.cityLatitude),
    },
    collections: [],
    photos: [],
    photoCount: 0,
  };
}

function getAdminLibraryCity() {
  if (state.admin.libraryCitySlug) {
    const bySlug = getCityBySlug(state.admin.libraryCitySlug);
    if (bySlug) {
      return bySlug;
    }
  }

  const resolved = getAdminResolvedCity();
  if (resolved) {
    return resolved;
  }

  return state.cities.find((city) => city.photoCount > 0) || state.cities[0] || null;
}

function applyAdminCityContext(item) {
  const cityName = simplifyCityName(item.cityName || item.province || item.district || "");
  const province = normalizeAdminText(item.province) || cityName;
  const cityAdcode = item.cityAdcode || deriveCityAdcodeFromDistrict(item.adcode);
  const existing = state.cities.find((city) => {
    const currentName = simplifyCityName(city.name);
    return currentName === cityName || (cityAdcode && city.adcode === cityAdcode);
  });

  state.admin.cityId = existing?.id || null;
  state.admin.cityName = existing?.name || cityName;
  state.admin.cityNameEn = existing?.nameEn || "";
  state.admin.province = existing?.province || province;
  state.admin.cityAdcode = existing?.adcode || cityAdcode;
  state.admin.cityLongitude = String(item.location?.lng ?? "");
  state.admin.cityLatitude = String(item.location?.lat ?? "");
}

function renderAdminLibrarySection() {
  if (!state.auth.token) {
    return "";
  }

  if (state.ui.apiMode !== "live") {
    return `
      <section class="admin-library">
        <div class="section-head">
          <div>
            <span class="eyebrow">Library</span>
            <h2>已上传照片</h2>
          </div>
        </div>
        <div class="admin-library-empty">
          <strong>当前是演示数据。</strong>
          <span>已上传照片管理只会在真实后端连接成功后显示，示例城市图片不会再进入删除区。</span>
        </div>
      </section>
    `;
  }

  const libraryCity = getAdminLibraryCity();
  const manageableCities = state.cities.filter((city) => city.photoCount > 0 || city.slug === libraryCity?.slug);

  if (!manageableCities.length) {
    return `
      <section class="admin-library">
        <div class="section-head">
          <div>
            <span class="eyebrow">Library</span>
            <h2>已上传照片</h2>
          </div>
        </div>
        <div class="admin-library-empty">
          <strong>还没有可管理的照片。</strong>
          <span>先上传一组作品，之后就可以在这里删除单张照片。</span>
        </div>
      </section>
    `;
  }

  const collectionLabels = new Map();
  if (libraryCity) {
    for (const collection of libraryCity.collections) {
      for (const photo of collection.photos) {
        collectionLabels.set(photo.id, collection.label);
      }
    }
  }

  return `
    <section class="admin-library">
      <div class="section-head">
        <div>
          <span class="eyebrow">Library</span>
          <h2>已上传照片</h2>
        </div>
      </div>
      <div class="admin-city-rail">
        ${manageableCities
          .map(
            (city) => `
              <button
                class="admin-city-chip ${libraryCity?.slug === city.slug ? "is-active" : ""}"
                type="button"
                data-admin-manage-city="${city.slug}"
              >
                <strong>${escapeHtml(city.name)}</strong>
                <span>${city.photoCount} 张</span>
              </button>
            `
          )
          .join("")}
      </div>
      ${
        libraryCity?.photos.length
          ? `
            <div class="admin-photo-grid">
              ${libraryCity.photos
                .map((photo) => {
                  const deleting = state.admin.deletingPhotoId === photo.id;
                  const locationLabel = collectionLabels.get(photo.id) || photo.location || photo.districtName || "未命名地点";
                  return `
                    <article class="admin-photo-card">
                      <div class="admin-photo-cover" style="background-image:url('${photo.imageUrl}')">
                        ${photo.isCover ? '<span class="admin-photo-badge">封面</span>' : ""}
                      </div>
                      <div class="admin-photo-body">
                        <div class="admin-photo-meta">
                          <strong>${escapeHtml(photo.title || locationLabel)}</strong>
                          <span>${escapeHtml(locationLabel)}</span>
                          <small>${escapeHtml(photo.shotAt || "未记录日期")}</small>
                        </div>
                        <button
                          class="danger-button"
                          type="button"
                          data-admin-delete-photo="${photo.id}"
                          ${deleting ? "disabled" : ""}
                        >
                          ${deleting ? "删除中…" : "删除"}
                        </button>
                      </div>
                    </article>
                  `;
                })
                .join("")}
            </div>
          `
          : `
            <div class="admin-library-empty">
              <strong>${escapeHtml(libraryCity?.name || "当前城市")} 目前没有照片。</strong>
              <span>删除完最后一张后，这座城市会从首页高亮列表里自动消失。</span>
            </div>
          `
      }
    </section>
  `;
}

function renderSearchResults() {
  if (!state.admin.searchResults.length) {
    return "";
  }

  return `
    <div class="search-results">
      ${state.admin.searchResults
        .map(
          (item, index) => `
            <button class="search-result" type="button" data-search-pick="${index}">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(
                [item.cityName, item.district || item.address].filter(Boolean).join(" · ")
              )}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMapPage() {
  const highlightedCities = state.cities.filter((city) => city.photoCount > 0);
  const photoCount = state.cities.reduce((sum, city) => sum + city.photoCount, 0);
  const placeCount = unique(state.cities.flatMap((city) => city.collections.map((item) => item.label))).length;

  return `
    <section class="page map-page">
      ${renderBanner()}
      <div class="hero">
        <div class="hero-copy is-editorial">
          <span class="eyebrow">Places I Shot</span>
          <h1>让作品先开口。</h1>
          <p class="hero-intro">一张地图，只负责把每次取景轻轻点亮。</p>
          <div class="hero-metrics">
            <article class="hero-metric">
              <strong>${highlightedCities.length}</strong>
              <span>已点亮城市</span>
            </article>
            <article class="hero-metric">
              <strong>${photoCount}</strong>
              <span>照片归档</span>
            </article>
            <article class="hero-metric">
              <strong>${placeCount}</strong>
              <span>地点集合</span>
            </article>
          </div>
          <p class="hero-note">Photographs first. Geography second.</p>
        </div>
        <article class="map-card national-card">
          <div class="map-stage large-stage" id="china-map">
            <div class="map-stage-wash"></div>
            <div class="map-stage-caption">
              <span>China</span>
              <span>Lit by photographs</span>
            </div>
            ${!CONFIG.amapKey ? renderMapUnavailable("请先在 site-config.js 中填入高德地图 Key 与安全密钥。") : ""}
          </div>
        </article>
      </div>
      <section class="city-strip compact">
        <div class="section-head">
          <div>
            <span class="eyebrow">Cities</span>
            <h2>已点亮的城市</h2>
          </div>
        </div>
        <div class="city-card-grid">
          ${highlightedCities
            .map(
              (city) => `
                <button class="city-card" type="button" data-city-open="${city.slug}">
                  <div class="city-card-cover" style="background-image:url('${city.cover}')"></div>
                  <div class="city-card-body">
                    <div class="city-card-top">
                      <strong>${escapeHtml(city.name)}</strong>
                      <span>${escapeHtml(city.nameEn || city.province)}</span>
                    </div>
                    <div class="city-card-meta">
                      <span>${city.photoCount} 张</span>
                      <span>${city.collections.length} 组地点</span>
                    </div>
                  </div>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderAdminPage() {
  if (!state.auth.token) {
    return renderLoginPanel();
  }

  const city = getAdminResolvedCity();
  const displayCityName = state.admin.cityName || city?.name || "未锁定城市";
  const displayProvince = state.admin.province || city?.province || "选中具体地点后自动识别";
  const canPublish = Boolean(
    state.admin.files.length &&
      state.admin.longitude &&
      state.admin.latitude &&
      state.admin.selectedPoiName &&
      state.admin.locationSource === "poi" &&
      displayCityName &&
      displayCityName !== "未锁定城市"
  );

  return `
    <section class="page admin-page">
      <div class="page-head compact">
        <div class="page-head-copy">
          <span class="eyebrow">Upload</span>
          <h1>地点上传</h1>
          <p>先选一个具体地点，再把这一组照片交给它。</p>
        </div>
        <button class="ghost-button" type="button" data-logout>退出</button>
      </div>
      <div class="admin-layout">
        <article class="form-panel">
          ${state.admin.status ? `<div class="status-banner is-${escapeHtml(state.admin.statusKind || "neutral")}">${escapeHtml(state.admin.status)}</div>` : ""}
          <div class="admin-city-card">
            <span class="eyebrow">City</span>
            <strong>${escapeHtml(displayCityName)}</strong>
            <span>${escapeHtml(city ? "已有城市档案" : displayProvince)}</span>
          </div>
          <div class="form-grid">
            <label class="field">
              <span>标题</span>
              <input class="input" type="text" data-admin-field="title" value="${escapeHtml(state.admin.title)}" placeholder="例如：雨后的桥边" />
            </label>
            <label class="field">
              <span>日期</span>
              <input class="input" type="date" data-admin-field="shotAt" value="${escapeHtml(state.admin.shotAt)}" />
            </label>
            <label class="field">
              <span>器材</span>
              <input class="input" type="text" data-admin-field="camera" value="${escapeHtml(state.admin.camera)}" placeholder="例如：Leica Q3" />
            </label>
            <label class="field field-full">
              <span>搜索具体地点</span>
              <div class="search-line">
                <input
                  class="input"
                  type="text"
                  data-admin-field="searchKeyword"
                  value="${escapeHtml(state.admin.searchKeyword)}"
                  placeholder="例如：西泠桥 / 外滩 / 永庆坊"
                />
                <button class="ghost-button" type="button" data-admin-search>搜索</button>
              </div>
              ${renderSearchResults()}
              <span class="mini-note">发布只接受从搜索结果中选中的具体地点 POI。</span>
            </label>
            <div class="field field-full">
              <span>已锁定地点</span>
              <div class="location-pills">
                <span class="info-pill">${escapeHtml(displayCityName)}</span>
                <span class="info-pill">${escapeHtml(state.admin.selectedPoiName || "具体地点 POI")}</span>
                <span class="info-pill">${escapeHtml(state.admin.districtName || "区 / 县")}</span>
                <span class="info-pill">${escapeHtml(state.admin.streetName || "街道")}</span>
              </div>
              <input
                class="input subtle-input"
                type="text"
                value="${escapeHtml(state.admin.locationLabel)}"
                readonly
                placeholder="选中搜索结果后，这里会自动带出地点信息"
              />
            </div>
            <label class="field field-full">
              <span>标签</span>
              <input class="input" type="text" data-admin-field="tags" value="${escapeHtml(state.admin.tags)}" placeholder="街拍, 建筑, 夜景" />
            </label>
            <label class="field field-full">
              <span>描述</span>
              <textarea class="input textarea" data-admin-field="description" placeholder="少量描述即可。">${escapeHtml(
                state.admin.description
              )}</textarea>
            </label>
            <label class="field field-full">
              <span>照片</span>
              <input class="input file-input" type="file" accept="image/*" multiple data-admin-files />
            </label>
          </div>
          ${
            state.admin.previews.length
              ? `
                <div class="preview-grid">
                  ${state.admin.previews
                    .map(
                      (preview) => `
                        <div class="preview-card">
                          <div class="preview-image" style="background-image:url('${preview.src}')"></div>
                          <span>${escapeHtml(preview.name)}</span>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="actions">
            <button class="primary-button" type="button" data-admin-publish ${canPublish ? "" : "disabled"}>
              发布到 ${escapeHtml(displayCityName)}
            </button>
          </div>
        </article>
        <article class="map-card admin-map-card">
          <div class="admin-map-head">
            <div>
              <span class="eyebrow">Picker</span>
              <h2>${escapeHtml(displayCityName === "未锁定城市" ? "全国地点" : displayCityName)}</h2>
            </div>
            <span class="mini-note">地图点选只用于辅助查看位置，最终仍以搜索选中的 POI 为准。</span>
          </div>
          <div class="map-stage admin-stage" id="admin-map">
            ${!CONFIG.amapKey ? renderMapUnavailable("需要高德地图 Key 才能在后台精确选点。") : ""}
          </div>
        </article>
      </div>
    </section>
  `;
}

async function initAdminMap() {
  const container = document.getElementById("admin-map");
  if (!container || !CONFIG.amapKey) {
    return;
  }

  const AMap = await loadAMap();
  destroyMap("admin");
  clearAdminOverlays();

  const city = getAdminContextCity();
  const center = city ? [city.center.lng, city.center.lat] : [104.2, 35.8];
  const zoom = city ? 11.2 : 4.6;
  const map = new AMap.Map(container, createMapOptions(center, zoom));
  applyNativeMapFeatures(map);
  mapStore.admin = map;

  if (city) {
    const districts = await fetchCityDistricts(city);
    const polygons = [];
    for (const district of districts) {
      for (const path of district.boundaries) {
        const polygon = new AMap.Polygon({
          path,
          strokeColor: "#d7cfc3",
          strokeWeight: 1.4,
          fillColor: "#fbf8f2",
          fillOpacity: 0.24,
        });
        polygon.setMap(map);
        mapStore.adminOverlays.push(polygon);
        polygons.push(polygon);
      }
    }
    if (polygons.length) {
      map.setFitView(polygons, false, [52, 52, 52, 52], 13);
    }
  }

  map.on("click", async (event) => {
    const lng = Number(event.lnglat.getLng().toFixed(6));
    const lat = Number(event.lnglat.getLat().toFixed(6));
    await setAdminLocationFromLngLat(getAdminContextCity(), { lng, lat }, "", "map");
  });

  if (state.admin.longitude && state.admin.latitude) {
    placeAdminMarker(AMap, {
      lng: Number(state.admin.longitude),
      lat: Number(state.admin.latitude),
    });
    map.panTo([Number(state.admin.longitude), Number(state.admin.latitude)]);
    if (state.admin.selectedPoiName) {
      map.setZoom(14.5);
    }
  }
}

async function reverseGeocode(city, point) {
  const AMap = await loadAMap();
  return new Promise((resolve, reject) => {
    const geocoder = new AMap.Geocoder({
      city: city?.adcode || city?.name || "",
      radius: 800,
      extensions: "all",
    });

    geocoder.getAddress([point.lng, point.lat], (status, result) => {
      if (status !== "complete" || !result?.regeocode) {
        reject(new Error("逆地理编码失败"));
        return;
      }

      const addressComponent = result.regeocode.addressComponent || {};
      const streetNumber = addressComponent.streetNumber || {};
      const cityName = simplifyCityName(addressComponent.city || city?.name || addressComponent.province || "");
      const province = normalizeAdminText(addressComponent.province || city?.province || cityName);
      const streetName =
        [addressComponent.township, streetNumber.street, streetNumber.number].filter(Boolean).join("") ||
        streetNumber.street ||
        "";

      resolve({
        cityName,
        province,
        cityAdcode: city?.adcode || deriveCityAdcodeFromDistrict(addressComponent.adcode || ""),
        districtCode: addressComponent.adcode || "",
        districtName: addressComponent.district || addressComponent.township || "",
        streetName,
        locationLabel:
          result.regeocode.formattedAddress ||
          [cityName, addressComponent.district, streetName].filter(Boolean).join(" "),
        longitude: point.lng.toFixed(6),
        latitude: point.lat.toFixed(6),
      });
    });
  });
}

async function handleAdminSearch() {
  if (!state.admin.searchKeyword.trim()) {
    return;
  }

  try {
    const AMap = await loadAMap();
    const placeSearch = new AMap.PlaceSearch({
      citylimit: false,
      pageSize: 8,
      pageIndex: 1,
      extensions: "all",
    });

    const results = await new Promise((resolve, reject) => {
      placeSearch.search(state.admin.searchKeyword.trim(), (status, result) => {
        if (status !== "complete") {
          reject(new Error("地点搜索失败"));
          return;
        }
        resolve(result?.poiList?.pois || []);
      });
    });

    state.admin.searchResults = results
      .filter((poi) => poi.location)
      .map((poi) => {
        const province = normalizeAdminText(poi.pname);
        const cityName = simplifyCityName(poi.cityname || province || poi.adname || "");
        return {
          name: normalizeAdminText(poi.name),
          address: normalizeAdminText(poi.address),
          district: normalizeAdminText(poi.adname || poi.district),
          province,
          cityName,
          cityAdcode: deriveCityAdcodeFromDistrict(poi.adcode),
          adcode: normalizeAdminText(poi.adcode),
          location: {
            lng: Number(poi.location.lng),
            lat: Number(poi.location.lat),
          },
        };
      });

    state.admin.statusKind = "neutral";
    state.admin.status = state.admin.searchResults.length ? "请选择一个地点结果。" : "没有搜到地点。";
    renderApp();
  } catch (error) {
    state.admin.statusKind = "error";
    state.admin.status = error.message || "搜索失败";
    renderApp();
  }
}

async function setAdminLocationFromLngLat(city, point, preferredLabel = "", source = "map") {
  try {
    const info = await reverseGeocode(city, point);
    if (!state.admin.cityName) {
      state.admin.cityName = info.cityName;
      state.admin.province = info.province;
      state.admin.cityAdcode = info.cityAdcode;
      state.admin.cityLongitude = info.longitude;
      state.admin.cityLatitude = info.latitude;
    }
    state.admin.districtCode = info.districtCode;
    state.admin.districtName = info.districtName;
    state.admin.streetName = info.streetName;
    state.admin.locationLabel = preferredLabel || info.locationLabel;
    state.admin.longitude = info.longitude;
    state.admin.latitude = info.latitude;
    state.admin.selectedPoiName = source === "poi" ? preferredLabel : "";
    state.admin.locationSource = source;
    state.admin.statusKind = "neutral";
    state.admin.status =
      source === "poi"
        ? `已锁定地点：${preferredLabel}`
        : "当前位置只作为地图辅助定位，请从搜索结果中选中一个具体地点再发布。";

    const AMap = await loadAMap();
    placeAdminMarker(AMap, point);
    if (mapStore.admin) {
      mapStore.admin.panTo([point.lng, point.lat]);
      mapStore.admin.setZoom(source === "poi" ? 14.5 : 13.8);
    }
    renderApp();
  } catch (error) {
    state.admin.statusKind = "error";
    state.admin.status = error.message || "无法解析当前位置";
    renderApp();
  }
}

async function handlePublish() {
  const city = getAdminResolvedCity();
  const publishCityName = state.admin.cityName || city?.name || "";
  if (!publishCityName) {
    state.admin.statusKind = "error";
    state.admin.status = "请先从搜索结果里选中一个具体地点。";
    renderApp();
    return;
  }
  if (!state.admin.files.length) {
    state.admin.statusKind = "error";
    state.admin.status = "请至少选择一张照片。";
    renderApp();
    return;
  }
  if (!state.admin.longitude || !state.admin.latitude || !state.admin.districtName) {
    state.admin.statusKind = "error";
    state.admin.status = "请先确认地图位置。";
    renderApp();
    return;
  }
  if (state.admin.locationSource !== "poi" || !state.admin.selectedPoiName) {
    state.admin.statusKind = "error";
    state.admin.status = "请先从搜索结果中选中一个具体地点 POI，再发布照片。";
    renderApp();
    return;
  }

  const formData = new FormData();
  if (city?.id) {
    formData.append("cityId", String(city.id));
  }
  formData.append("cityName", publishCityName);
  formData.append("cityNameEn", state.admin.cityNameEn || city?.nameEn || "");
  formData.append("province", state.admin.province || city?.province || publishCityName);
  formData.append("cityAdcode", state.admin.cityAdcode || city?.adcode || "");
  formData.append("cityLongitude", state.admin.cityLongitude || state.admin.longitude);
  formData.append("cityLatitude", state.admin.cityLatitude || state.admin.latitude);
  formData.append("title", state.admin.title || "Untitled Frame");
  formData.append("shotAt", state.admin.shotAt || new Date().toISOString().slice(0, 10));
  formData.append("camera", state.admin.camera || city?.gear || "");
  formData.append("location", state.admin.selectedPoiName);
  formData.append("selectedPoiName", state.admin.selectedPoiName);
  formData.append("locationSource", state.admin.locationSource);
  formData.append("districtCode", state.admin.districtCode);
  formData.append("districtName", state.admin.districtName);
  formData.append("streetName", state.admin.streetName);
  formData.append("longitude", state.admin.longitude);
  formData.append("latitude", state.admin.latitude);
  formData.append("description", state.admin.description);
  formData.append("tags", state.admin.tags);
  formData.append("published", String(state.admin.published));
  formData.append("isCover", String(state.admin.isCover));
  state.admin.files.forEach((file) => formData.append("photos", file));

  state.admin.statusKind = "progress";
  state.admin.status = "正在发布…";
  renderApp();

  try {
    const payload = await apiFetch("/admin/photos", {
      method: "POST",
      body: formData,
    });
    state.admin.statusKind = "success";
    state.admin.status = "发布成功，地图已刷新。";
    resetAdminForm(payload.city?.id || city?.id || null);
    await loadCities();
    const nextCitySlug = payload.city?.slug || city?.slug || "";
    if (nextCitySlug) {
      state.admin.libraryCitySlug = nextCitySlug;
      const refreshedCity = getCityBySlug(nextCitySlug);
      if (refreshedCity?.collections.length) {
        state.citySelection.activeCollectionKeyByCity[refreshedCity.slug] = refreshedCity.collections[0].key;
        state.citySelection.shouldFocusDistrictByCity[refreshedCity.slug] = false;
      }
      navigate(`#/city/${nextCitySlug}`);
      return;
    }
    navigate("#/map");
  } catch (error) {
    state.admin.statusKind = "error";
    state.admin.status = error.message || "发布失败";
    renderApp();
  }
}

async function handleAdminPhotoDelete(photoId) {
  if (!photoId) {
    return;
  }

  const libraryCity = getAdminLibraryCity();
  const targetPhoto = libraryCity?.photos.find((photo) => photo.id === photoId) || null;
  const label = targetPhoto?.title || targetPhoto?.location || "这张照片";
  const confirmed = window.confirm(`确定删除“${label}”吗？删除后无法恢复。`);
  if (!confirmed) {
    return;
  }

  state.admin.deletingPhotoId = photoId;
  state.admin.statusKind = "progress";
  state.admin.status = "正在删除照片…";
  renderApp();

  try {
    const payload = await apiFetch(`/admin/photos/${encodeURIComponent(photoId)}`, {
      method: "DELETE",
    });
    state.admin.deletingPhotoId = "";
    state.admin.statusKind = "success";
    state.admin.status =
      Number(payload.remainingPhotoCount || 0) > 0
        ? "照片已删除。"
        : "最后一张照片已删除，这座城市已不再高亮。";
    await loadCities();
  } catch (error) {
    state.admin.deletingPhotoId = "";
    state.admin.statusKind = "error";
    state.admin.status = error.message || "删除失败";
    renderApp();
  }
}

function resetAdminForm(cityId = null) {
  state.admin.cityId = cityId;
  state.admin.cityName = "";
  state.admin.cityNameEn = "";
  state.admin.province = "";
  state.admin.cityAdcode = "";
  state.admin.cityLongitude = "";
  state.admin.cityLatitude = "";
  state.admin.title = "";
  state.admin.shotAt = "";
  state.admin.camera = "";
  state.admin.tags = "";
  state.admin.description = "";
  state.admin.searchKeyword = "";
  state.admin.searchResults = [];
  state.admin.districtCode = "";
  state.admin.districtName = "";
  state.admin.streetName = "";
  state.admin.longitude = "";
  state.admin.latitude = "";
  state.admin.locationLabel = "";
  state.admin.selectedPoiName = "";
  state.admin.locationSource = "";
  state.admin.files = [];
  state.admin.previews = [];
  state.admin.deletingPhotoId = "";
  state.admin.status = "";
  state.admin.statusKind = "neutral";
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const cityButton = target.closest("[data-city-open]");
    if (cityButton) {
      const slug = cityButton.getAttribute("data-city-open");
      state.citySelection.activeSlug = slug;
      state.citySelection.shouldFocusDistrictByCity[slug] = false;
      navigate(`#/city/${slug}`);
      return;
    }

    const collectionButton = target.closest("[data-collection-key]");
    if (collectionButton) {
      const citySlug = collectionButton.getAttribute("data-city-slug");
      const key = collectionButton.getAttribute("data-collection-key");
      state.citySelection.activeCollectionKeyByCity[citySlug] = key;
      state.citySelection.shouldFocusDistrictByCity[citySlug] = true;
      renderApp();
      return;
    }

    const photoButton = target.closest("[data-photo-open]");
    if (photoButton) {
      const [citySlug, collectionKey, photoId] = (photoButton.getAttribute("data-photo-open") || "").split(":");
      const city = getCityBySlug(citySlug);
      const collection = city?.collections.find((item) => item.key === collectionKey);
      const photo = collection?.photos.find((item) => item.id === photoId);
      if (collection && photo) {
        await focusPhotoOnCityMap(collection, photo);
      }
      if (city && collection) {
        openLightbox(city, collection, photoId);
      }
      return;
    }

    const dismissLayer = target.closest("[data-lightbox-dismiss]");
    const lightboxPanel = target.closest("[data-lightbox-panel]");
    if (target.closest("[data-lightbox-close]") || (dismissLayer && !lightboxPanel)) {
      closeLightbox();
      return;
    }

    if (target.closest("[data-login-submit]")) {
      await handleLogin();
      return;
    }

    if (target.closest("[data-logout]")) {
      handleLogout();
      return;
    }

    if (target.closest("[data-admin-search]")) {
      await handleAdminSearch();
      return;
    }

    const searchPick = target.closest("[data-search-pick]");
    if (searchPick) {
      const index = Number(searchPick.getAttribute("data-search-pick"));
      const item = state.admin.searchResults[index];
      if (item) {
        state.admin.searchKeyword = item.name;
        state.admin.searchResults = [];
        applyAdminCityContext(item);
        await setAdminLocationFromLngLat(getAdminContextCity(), item.location, item.name, "poi");
      }
      return;
    }

    if (target.closest("[data-admin-publish]")) {
      await handlePublish();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
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

    const field = target.getAttribute("data-admin-field");
    if (field && field in state.admin) {
      state.admin[field] = target.value;
      if (field === "searchKeyword") {
        state.admin.cityId = null;
        state.admin.cityName = "";
        state.admin.cityNameEn = "";
        state.admin.province = "";
        state.admin.cityAdcode = "";
        state.admin.cityLongitude = "";
        state.admin.cityLatitude = "";
        state.admin.selectedPoiName = "";
        state.admin.locationSource = "";
      }
      return;
    }
  });

  window.addEventListener("hashchange", () => {
    state.route = parseHash();
    if (state.route.name === "city" && state.route.slug) {
      state.citySelection.activeSlug = state.route.slug;
      if (!state.citySelection.activeCollectionKeyByCity[state.route.slug]) {
        const city = getCityBySlug(state.route.slug);
        state.citySelection.activeCollectionKeyByCity[state.route.slug] = city?.collections[0]?.key || null;
      }
    }
    renderApp();
  });

  window.addEventListener("keydown", (event) => {
    if (!state.lightbox.open) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
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
}

function renderTopNav() {
  const current = state.route.name === "city" ? "map" : state.route.name;
  return `
    <header class="topbar">
      <a class="brand" href="#/map">
        <span class="brand-eyebrow">Places I Shot</span>
        <span class="brand-title">Personal Photo Atlas</span>
      </a>
      <nav class="nav">
        <a class="nav-link ${current === "map" ? "is-active" : ""}" href="#/map">Atlas</a>
        <a class="nav-link ${current === "admin" ? "is-active" : ""}" href="#/admin">Admin</a>
      </nav>
    </header>
  `;
}

function renderMapPage() {
  const highlightedCities = state.cities.filter((city) => city.photoCount > 0);
  const photoCount = state.cities.reduce((sum, city) => sum + city.photoCount, 0);
  const placeCount = unique(state.cities.flatMap((city) => city.collections.map((item) => item.label))).length;

  return `
    <section class="page map-page">
      ${renderBanner()}
      <div class="hero">
        <div class="hero-copy is-editorial is-camera-layout">
          <div class="camera-object" aria-hidden="true">
            <div class="camera-object-plate"></div>
            <div class="camera-object-body">
              <span class="camera-object-accent"></span>
              <div class="camera-object-lens">
                <span class="camera-lens-ring is-outer"></span>
                <span class="camera-lens-ring is-middle"></span>
                <span class="camera-lens-ring is-inner"></span>
                <span class="camera-lens-core"></span>
                <span class="camera-lens-glint"></span>
              </div>
              <span class="camera-object-side is-left"></span>
              <span class="camera-object-side is-right"></span>
            </div>
          </div>
          <div class="hero-copy-block">
            <span class="eyebrow">Places I Shot</span>
            <h1>个人摄影档案</h1>
            <p class="hero-intro">把拍过的城市，慢慢归档成一张地图。</p>
            <div class="hero-metrics is-inline">
              <span class="hero-metric-chip"><strong>${highlightedCities.length}</strong><span>城市</span></span>
              <span class="hero-metric-chip"><strong>${photoCount}</strong><span>照片</span></span>
              <span class="hero-metric-chip"><strong>${placeCount}</strong><span>地点</span></span>
            </div>
            <p class="hero-note">Personal Photo Atlas</p>
          </div>
        </div>
        <article class="map-card national-card">
          <div class="map-stage large-stage" id="china-map">
            <div class="map-stage-wash"></div>
            <div class="map-stage-caption">
              <span>China</span>
              <span>Lit by photographs</span>
            </div>
            ${!CONFIG.amapKey ? renderMapUnavailable("请先在 site-config.js 中填写高德地图 Key 与安全密钥。") : ""}
          </div>
        </article>
      </div>
      <section class="city-strip compact">
        <div class="section-head">
          <div>
            <span class="eyebrow">Cities</span>
            <h2>被点亮的城市</h2>
          </div>
        </div>
        <div class="city-card-grid">
          ${highlightedCities
            .map(
              (city) => `
                <button class="city-card" type="button" data-city-open="${city.slug}">
                  <div class="city-card-cover" style="background-image:url('${city.cover}')"></div>
                  <div class="city-card-body">
                    <div class="city-card-top">
                      <strong>${escapeHtml(city.name)}</strong>
                      <span>${escapeHtml(city.nameEn || city.province)}</span>
                    </div>
                    <div class="city-card-meta">
                      <span>${city.photoCount} 张</span>
                      <span>${city.collections.length} 组地点</span>
                    </div>
                  </div>
                </button>
              `
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderAdminLibrarySection() {
  if (!state.auth.token) {
    return "";
  }

  if (state.ui.apiMode !== "live") {
    return `
      <section class="admin-library">
        <div class="section-head">
          <div>
            <span class="eyebrow">Library</span>
            <h2>已上传照片</h2>
          </div>
        </div>
        <div class="admin-library-empty">
          <strong>当前是演示数据。</strong>
          <span>只有连接到真实后端后，这里才会显示可管理、可删除、可预览的真实照片。</span>
        </div>
      </section>
    `;
  }

  const libraryCity = getAdminLibraryCity();
  const manageableCities = state.cities.filter((city) => city.photoCount > 0 || city.slug === libraryCity?.slug);

  if (!manageableCities.length) {
    return `
      <section class="admin-library">
        <div class="section-head">
          <div>
            <span class="eyebrow">Library</span>
            <h2>已上传照片</h2>
          </div>
        </div>
        <div class="admin-library-empty">
          <strong>还没有可管理的照片。</strong>
          <span>先上传一组作品，之后就可以在这里预览和删除单张照片。</span>
        </div>
      </section>
    `;
  }

  const collectionLabels = new Map();
  if (libraryCity) {
    for (const collection of libraryCity.collections) {
      for (const photo of collection.photos) {
        collectionLabels.set(photo.id, collection.label);
      }
    }
  }

  return `
    <section class="admin-library">
      <div class="section-head">
        <div>
          <span class="eyebrow">Library</span>
          <h2>已上传照片</h2>
        </div>
      </div>
      <div class="admin-city-rail">
        ${manageableCities
          .map(
            (city) => `
              <button
                class="admin-city-chip ${libraryCity?.slug === city.slug ? "is-active" : ""}"
                type="button"
                data-admin-manage-city="${city.slug}"
              >
                <strong>${escapeHtml(city.name)}</strong>
                <span>${city.photoCount} 张</span>
              </button>
            `
          )
          .join("")}
      </div>
      ${
        libraryCity?.photos.length
          ? `
            <div class="admin-photo-grid">
              ${libraryCity.photos
                .map((photo) => {
                  const deleting = state.admin.deletingPhotoId === photo.id;
                  const locationLabel = collectionLabels.get(photo.id) || photo.location || photo.districtName || "未命名地点";
                  return `
                    <article class="admin-photo-card">
                      <div class="admin-photo-cover" style="background-image:url('${photo.imageUrl}')">
                        ${photo.isCover ? '<span class="admin-photo-badge">封面</span>' : ""}
                      </div>
                      <div class="admin-photo-body">
                        <div class="admin-photo-meta">
                          <strong>${escapeHtml(photo.title || locationLabel)}</strong>
                          <span>${escapeHtml(locationLabel)}</span>
                          <small>${escapeHtml(photo.shotAt || "未记录日期")}</small>
                        </div>
                        <button
                          class="danger-button"
                          type="button"
                          data-admin-delete-photo="${photo.id}"
                          ${deleting ? "disabled" : ""}
                        >
                          ${deleting ? "删除中…" : "删除"}
                        </button>
                      </div>
                    </article>
                  `;
                })
                .join("")}
            </div>
          `
          : `
            <div class="admin-library-empty">
              <strong>${escapeHtml(libraryCity?.name || "当前城市")} 目前没有照片。</strong>
              <span>删除完最后一张后，这座城市会从首页高亮列表里自动消失。</span>
            </div>
          `
      }
    </section>
  `;
}

function renderAdminPage() {
  if (!state.auth.token) {
    return renderLoginPanel();
  }

  const city = getAdminResolvedCity();
  const displayCityName = state.admin.cityName || city?.name || "未锁定城市";
  const displayProvince = state.admin.province || city?.province || "选中具体地点后自动识别";
  const canPublish = Boolean(
    state.admin.files.length &&
      state.admin.longitude &&
      state.admin.latitude &&
      state.admin.selectedPoiName &&
      state.admin.locationSource === "poi" &&
      displayCityName &&
      displayCityName !== "未锁定城市"
  );

  return `
    <section class="page admin-page">
      <div class="page-head compact">
        <div class="page-head-copy">
          <span class="eyebrow">Upload</span>
          <h1>地点上传</h1>
          <p>先选一个具体地点，再把这一组照片交给它。</p>
        </div>
        <button class="ghost-button" type="button" data-logout>退出</button>
      </div>
      <div class="admin-layout">
        <article class="form-panel">
          ${state.admin.status ? `<div class="status-banner is-${escapeHtml(state.admin.statusKind || "neutral")}">${escapeHtml(state.admin.status)}</div>` : ""}
          <div class="admin-city-card">
            <span class="eyebrow">City</span>
            <strong>${escapeHtml(displayCityName)}</strong>
            <span>${escapeHtml(city ? "已有城市档案" : displayProvince)}</span>
          </div>
          <div class="form-grid">
            <label class="field">
              <span>标题</span>
              <input class="input" type="text" data-admin-field="title" value="${escapeHtml(state.admin.title)}" placeholder="例如：雨后的桥边" />
            </label>
            <label class="field">
              <span>日期</span>
              <input class="input" type="date" data-admin-field="shotAt" value="${escapeHtml(state.admin.shotAt)}" />
            </label>
            <label class="field">
              <span>器材</span>
              <input class="input" type="text" data-admin-field="camera" value="${escapeHtml(state.admin.camera)}" placeholder="例如：Leica Q3" />
            </label>
            <label class="field field-full">
              <span>搜索具体地点</span>
              <div class="search-line">
                <input
                  class="input"
                  type="text"
                  data-admin-field="searchKeyword"
                  value="${escapeHtml(state.admin.searchKeyword)}"
                  placeholder="例如：西泠桥 / 外滩 / 永庆坊"
                />
                <button class="ghost-button" type="button" data-admin-search>搜索</button>
              </div>
              ${renderSearchResults()}
              <span class="mini-note">发布只接受从搜索结果中选中的具体地点 POI。</span>
            </label>
            <div class="field field-full">
              <span>已锁定地点</span>
              <div class="location-pills">
                <span class="info-pill">${escapeHtml(displayCityName)}</span>
                <span class="info-pill">${escapeHtml(state.admin.selectedPoiName || "具体地点 POI")}</span>
                <span class="info-pill">${escapeHtml(state.admin.districtName || "区 / 县")}</span>
                <span class="info-pill">${escapeHtml(state.admin.streetName || "街道")}</span>
              </div>
              <input
                class="input subtle-input"
                type="text"
                value="${escapeHtml(state.admin.locationLabel)}"
                readonly
                placeholder="选中搜索结果后，这里会自动带出地点信息"
              />
            </div>
            <label class="field field-full">
              <span>标签</span>
              <input class="input" type="text" data-admin-field="tags" value="${escapeHtml(state.admin.tags)}" placeholder="街拍, 建筑, 夜景" />
            </label>
            <label class="field field-full">
              <span>描述</span>
              <textarea class="input textarea" data-admin-field="description" placeholder="少量描述即可。">${escapeHtml(
                state.admin.description
              )}</textarea>
            </label>
            <label class="field field-full">
              <span>照片</span>
              <input class="input file-input" type="file" accept="image/*" multiple data-admin-files />
            </label>
          </div>
          ${
            state.admin.previews.length
              ? `
                <div class="preview-grid">
                  ${state.admin.previews
                    .map(
                      (preview) => `
                        <div class="preview-card">
                          <div class="preview-image" style="background-image:url('${preview.src}')"></div>
                          <span>${escapeHtml(preview.name)}</span>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          <div class="actions">
            <button class="primary-button" type="button" data-admin-publish ${canPublish ? "" : "disabled"}>
              发布到 ${escapeHtml(displayCityName)}
            </button>
          </div>
        </article>
        <article class="map-card admin-map-card">
          <div class="admin-map-head">
            <div>
              <span class="eyebrow">Picker</span>
              <h2>${escapeHtml(displayCityName === "未锁定城市" ? "全国地点" : displayCityName)}</h2>
            </div>
            <span class="mini-note">地图点选只用于辅助查看位置，最终仍以搜索选中的 POI 为准。</span>
          </div>
          <div class="map-stage admin-stage" id="admin-map">
            ${!CONFIG.amapKey ? renderMapUnavailable("需要高德地图 Key 才能在后台精确选点。") : ""}
          </div>
        </article>
      </div>
      ${renderAdminLibrarySection()}
    </section>
  `;
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const cityButton = target.closest("[data-city-open]");
    if (cityButton) {
      const slug = cityButton.getAttribute("data-city-open");
      state.citySelection.activeSlug = slug;
      state.citySelection.shouldFocusDistrictByCity[slug] = false;
      navigate(`#/city/${slug}`);
      return;
    }

    const collectionButton = target.closest("[data-collection-key]");
    if (collectionButton) {
      const citySlug = collectionButton.getAttribute("data-city-slug");
      const key = collectionButton.getAttribute("data-collection-key");
      state.citySelection.activeCollectionKeyByCity[citySlug] = key;
      state.citySelection.shouldFocusDistrictByCity[citySlug] = true;
      renderApp();
      return;
    }

    const photoButton = target.closest("[data-photo-open]");
    if (photoButton) {
      const [citySlug, collectionKey, photoId] = (photoButton.getAttribute("data-photo-open") || "").split(":");
      const city = getCityBySlug(citySlug);
      const collection = city?.collections.find((item) => item.key === collectionKey);
      const photo = collection?.photos.find((item) => item.id === photoId);
      if (collection && photo) {
        await focusPhotoOnCityMap(collection, photo);
      }
      if (city && collection) {
        openLightbox(city, collection, photoId);
      }
      return;
    }

    const dismissLayer = target.closest("[data-lightbox-dismiss]");
    const lightboxPanel = target.closest("[data-lightbox-panel]");
    if (target.closest("[data-lightbox-close]") || (dismissLayer && !lightboxPanel)) {
      closeLightbox();
      return;
    }

    if (target.closest("[data-login-submit]")) {
      await handleLogin();
      return;
    }

    if (target.closest("[data-logout]")) {
      handleLogout();
      return;
    }

    if (target.closest("[data-admin-search]")) {
      await handleAdminSearch();
      return;
    }

    const manageCityButton = target.closest("[data-admin-manage-city]");
    if (manageCityButton) {
      const slug = manageCityButton.getAttribute("data-admin-manage-city") || "";
      if (slug) {
        state.admin.libraryCitySlug = slug;
        renderApp();
      }
      return;
    }

    const searchPick = target.closest("[data-search-pick]");
    if (searchPick) {
      const index = Number(searchPick.getAttribute("data-search-pick"));
      const item = state.admin.searchResults[index];
      if (item) {
        state.admin.searchKeyword = item.name;
        state.admin.searchResults = [];
        applyAdminCityContext(item);
        await setAdminLocationFromLngLat(getAdminContextCity(), item.location, item.name, "poi");
      }
      return;
    }

    if (target.closest("[data-admin-publish]")) {
      await handlePublish();
      return;
    }

    const deletePhotoButton = target.closest("[data-admin-delete-photo]");
    if (deletePhotoButton) {
      const photoId = deletePhotoButton.getAttribute("data-admin-delete-photo") || "";
      await handleAdminPhotoDelete(photoId);
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
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

    const field = target.getAttribute("data-admin-field");
    if (field && field in state.admin) {
      state.admin[field] = target.value;
      if (field === "searchKeyword") {
        state.admin.cityId = null;
        state.admin.cityName = "";
        state.admin.cityNameEn = "";
        state.admin.province = "";
        state.admin.cityAdcode = "";
        state.admin.cityLongitude = "";
        state.admin.cityLatitude = "";
        state.admin.selectedPoiName = "";
        state.admin.locationSource = "";
      }
      return;
    }
  });

  window.addEventListener("hashchange", () => {
    state.route = parseHash();
    if (state.route.name === "city" && state.route.slug) {
      state.citySelection.activeSlug = state.route.slug;
      if (!state.citySelection.activeCollectionKeyByCity[state.route.slug]) {
        const city = getCityBySlug(state.route.slug);
        state.citySelection.activeCollectionKeyByCity[state.route.slug] = city?.collections[0]?.key || null;
      }
    }
    renderApp();
  });

  window.addEventListener("keydown", (event) => {
    if (!state.lightbox.open) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
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
}

function init() {
  renderShell();
  bindEvents();
  state.route = parseHash();
  if (!window.location.hash) {
    navigate("#/map");
  }
  loadCities();
}

init();
