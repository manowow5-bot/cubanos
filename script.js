import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDoMnlTZVdd9ulkZlGjGUwXzKtmlnUCfXc",
  authDomain: "x7sebaspanel.firebaseapp.com",
  projectId: "x7sebaspanel",
  storageBucket: "x7sebaspanel.firebasestorage.app",
  messagingSenderId: "11380640205",
  appId: "1:11380640205:web:bb007307f7c4c2411b5c84"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let currentAuthUser = null;

const products = [
  {
    title: "Proxy Cuban 1 Dia",
    desc: "Panel para Android con acceso por 1 dia.",
    price: "$2",
    tag: "1 DIA",
    category: "android",
    image: "assets/proxy cuban.jpeg"
  },
  {
    title: "Proxy Cuban 7 Dias",
    desc: "Panel para Android con acceso por 7 dias.",
    price: "$7",
    tag: "7 DIAS",
    category: "android",
    image: "assets/proxy cuban.jpeg"
  },
  {
    title: "Proxy Cuban 30 Dias",
    desc: "Panel para Android con acceso por 30 dias.",
    price: "$12",
    tag: "30 DIAS",
    category: "android",
    image: "assets/proxy cuban.jpeg"
  },
  {
    title: "Pato Team",
    desc: "Panel para Android listo para activar.",
    price: "Consultar",
    tag: "ANDROID",
    category: "android"
  },
  {
    title: "CubanMods 1 Dia",
    desc: "Panel para Android con configuracion rapida por 1 dia.",
    price: "$2",
    tag: "1 DIA",
    category: "android",
    image: "image.png"
  },
  {
    title: "CubanMods 7 Dias",
    desc: "Panel para Android con configuracion rapida por 7 dias.",
    price: "$6",
    tag: "7 DIAS",
    category: "android",
    image: "image.png"
  },
  {
    title: "CubanMods 15 Dias",
    desc: "Panel para Android con configuracion rapida por 15 dias.",
    price: "$10",
    tag: "15 DIAS",
    category: "android",
    image: "image.png"
  },
  {
    title: "CubanMods 30 Dias",
    desc: "Panel para Android con configuracion rapida por 30 dias.",
    price: "$15",
    tag: "30 DIAS",
    category: "android",
    image: "image.png"
  },
  {
    title: "HG CHEATS ANDROID 1 Dia",
    desc: "Panel para Android con acceso por 1 dia.",
    price: "$3",
    tag: "1 DIA",
    category: "android",
    image: "assets/hg .jpeg"
  },
  {
    title: "HG CHEATS ANDROID 10 Dias",
    desc: "Panel para Android con acceso por 10 dias.",
    price: "$7",
    tag: "10 DIAS",
    category: "android",
    image: "assets/hg .jpeg"
  },
  {
    title: "HG CHEATS ANDROID 30 Dias",
    desc: "Panel para Android con acceso por 30 dias.",
    price: "$15",
    tag: "30 DIAS",
    category: "android",
    image: "assets/hg .jpeg"
  },
  {
    title: "Proxy iOS 1 Dia",
    desc: "Panel para IOS con acceso por 1 dia.",
    price: "$2",
    tag: "1 DIA",
    category: "ios",
    image: "assets/image.png"
  },
  {
    title: "Proxy iOS 7 Dias",
    desc: "Panel para IOS con acceso por 7 dias.",
    price: "$7",
    tag: "7 DIAS",
    category: "ios",
    image: "assets/image.png"
  },
  {
    title: "Proxy iOS 30 Dias",
    desc: "Panel para IOS con acceso por 30 dias.",
    price: "$12",
    tag: "30 DIAS",
    category: "ios",
    image: "assets/image.png"
  },
  {
    title: "BYPASS PROXY ID 1 Dia",
    desc: "Panel para PC con acceso por 1 dia.",
    price: "$2",
    tag: "1 DIA",
    category: "pc",
    image: "assets/bypa.jpeg"
  },
  {
    title: "BYPASS PROXY ID 7 Dias",
    desc: "Panel para PC con acceso por 7 dias.",
    price: "$4",
    tag: "7 DIAS",
    category: "pc",
    image: "assets/bypa.jpeg"
  },
  {
    title: "BYPASS PROXY ID 30 Dias",
    desc: "Panel para PC con acceso por 30 dias.",
    price: "$10",
    tag: "30 DIAS",
    category: "pc",
    image: "assets/bypa.jpeg"
  },
  {
    title: "DEATH X 1 Dia",
    desc: "Panel para PC con acceso por 1 dia.",
    price: "$3",
    tag: "1 DIA",
    category: "pc",
    image: "assets/bc5696a6-86a4-4dd1-bc16-5b7ffffd0d01.png"
  },
  {
    title: "DEATH X 7 Dias",
    desc: "Panel para PC con acceso por 7 dias.",
    price: "$8",
    tag: "7 DIAS",
    category: "pc",
    image: "assets/bc5696a6-86a4-4dd1-bc16-5b7ffffd0d01.png"
  },
  {
    title: "ALPHA X 1 Dia",
    desc: "Panel para Android Root con acceso por 1 dia.",
    price: "$2",
    tag: "1 DIA",
    category: "android",
    image: "alpha.jpeg"
  },
  {
    title: "ALPHA X 7 Dias",
    desc: "Panel para Android Root con acceso por 7 dias.",
    price: "$7",
    tag: "7 DIAS",
    category: "android",
    image: "alpha.jpeg"
  },
  {
    title: "ALPHA X 15 Dias",
    desc: "Panel para Android Root con acceso por 15 dias.",
    price: "$10",
    tag: "15 DIAS",
    category: "android",
    image: "alpha.jpeg"
  },
  {
    title: "ALPHA X 30 Dias",
    desc: "Panel para Android Root con acceso por 30 dias.",
    price: "$15",
    tag: "30 DIAS",
    category: "android",
    image: "alpha.jpeg"
  },
  {
    title: "ARABE X",
    desc: "Panel para PC para uso continuo.",
    price: "Consultar",
    tag: "PC",
    category: "pc"
  },
  {
    title: "KOALA X",
    desc: "Panel para PC con soporte de activacion.",
    price: "Consultar",
    tag: "PC",
    category: "pc"
  }
];

const grid = document.getElementById("productGrid");
const productCategory = document.getElementById("productCategory");

function getProductStock(productTitle) {
  return getProductKeys().filter((entry) => String(entry.product || "").trim() === String(productTitle || "").trim()).length;
}

async function takeNextProductKey(productTitle) {
  const keys = getProductKeys();
  const matchIndex = keys.findIndex((entry) => String(entry.product || "").trim() === String(productTitle || "").trim());

  if (matchIndex < 0) {
    return null;
  }

  const pickedKey = keys[matchIndex];
  if (!pickedKey || !pickedKey.id) {
    return null;
  }

  await removeProductKey(pickedKey.id);
  return pickedKey || null;
}

function renderProducts() {
  if (!grid) {
    return;
  }

  const selectedCategory = productCategory ? productCategory.value : "all";
  const categoryFilteredProducts = selectedCategory === "all"
    ? products
    : products.filter((item) => item.category === selectedCategory);
  const filteredProducts = categoryFilteredProducts.filter((item) => !isProductHidden(item.title));

  if (filteredProducts.length === 0) {
    grid.innerHTML = "<p class=\"empty-state\">No hay productos en esta categoria por ahora.</p>";
    return;
  }

  grid.innerHTML = filteredProducts
    .map((item, index) => {
      const stock = getProductStock(item.title);
      const isOutOfStock = stock <= 0;

      return `
        <article class="product-card" style="animation-delay:${index * 40}ms">
          ${item.image ? `<div class="product-media"><img src="${item.image}" alt="${item.title}" loading="lazy" /></div>` : ""}
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <p class="product-stock ${isOutOfStock ? "is-empty" : ""}">Stock disponible: ${stock} key${stock === 1 ? "" : "s"}</p>
          <div class="meta">
            <span class="price">${item.price}</span>
            <span class="tag">${item.tag}</span>
          </div>
          <div class="product-actions">
            <button class="buy-btn" type="button" data-title="${item.title}" ${isOutOfStock ? "disabled" : ""}>${isOutOfStock ? "Sin stock" : "Comprar"}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

if (productCategory) {
  productCategory.addEventListener("change", renderProducts);
}

renderProducts();

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const menuLinks = document.querySelectorAll(".menu-link");
const authModal = document.getElementById("authModal");
const adminModal = document.getElementById("adminModal");
const openAdminPanel = document.getElementById("openAdminPanel");
const closeAdminPanel = document.getElementById("closeAdminPanel");
const adminStats = document.getElementById("adminStats");
const adminUsers = document.getElementById("adminUsers");
const adminMovements = document.getElementById("adminMovements");
const adminKeyForm = document.getElementById("adminKeyForm");
const adminKeyProduct = document.getElementById("adminKeyProduct");
const adminKeyValue = document.getElementById("adminKeyValue");
const adminKeyFeedback = document.getElementById("adminKeyFeedback");
const adminKeys = document.getElementById("adminKeys");
const adminProductsVisibility = document.getElementById("adminProductsVisibility");
const loginForm = document.getElementById("loginForm");
const loginIdentity = document.getElementById("loginIdentity");
const registerForm = document.getElementById("registerForm");
const recoverForm = document.getElementById("recoverForm");
const loginError = document.getElementById("loginError");
const registerError = document.getElementById("registerError");
const recoverError = document.getElementById("recoverError");
const openLogin = document.getElementById("openLogin");
const openRegister = document.getElementById("openRegister");
const openRegisterHero = document.getElementById("openRegisterHero");
const openRecover = document.getElementById("openRecover");
const backToLoginFromRegister = document.getElementById("backToLoginFromRegister");
const backToLoginFromRecover = document.getElementById("backToLoginFromRecover");
const authActions = document.getElementById("authActions");
const balanceChip = document.getElementById("balanceChip");
const balanceAmount = document.getElementById("balanceAmount");
const authTitle = document.getElementById("authTitle");
const authText = document.getElementById("authText");
const userChip = document.getElementById("userChip");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const userHistoryStats = document.getElementById("userHistoryStats");
const userHistoryList = document.getElementById("userHistoryList");
const historyModal = document.getElementById("historyModal");
const openHistoryModal = document.getElementById("openHistoryModal");
const closeHistoryModal = document.getElementById("closeHistoryModal");
const keyModal = document.getElementById("keyModal");
const keyModalProduct = document.getElementById("keyModalProduct");
const keyModalValue = document.getElementById("keyModalValue");
const keyModalFeedback = document.getElementById("keyModalFeedback");
const copyDeliveredKeyBtn = document.getElementById("copyDeliveredKeyBtn");
const closeKeyModalBtn = document.getElementById("closeKeyModalBtn");

let deliveredKeyClipboard = "";

const ADMIN_EMAIL = "cubanohex@gmail.com";

const appState = {
  profiles: {},
  movements: [],
  productKeys: [],
  hiddenProducts: []
};

let unsubs = [];
let firestoreWarningShown = false;

function notifyFirestoreIssue() {
  if (firestoreWarningShown) {
    return;
  }

  firestoreWarningShown = true;
  window.alert("No se pudo sincronizar con Firestore. Revisa las reglas/permisos de la base de datos.");
}

function startRealtimeSync() {
  stopRealtimeSync();

  unsubs = [
    onSnapshot(
      collection(db, "profiles"),
      (snapshot) => {
        const nextProfiles = {};
        snapshot.forEach((docSnap) => {
          nextProfiles[docSnap.id] = normalizeProfile(docSnap.data() || {});
        });
        appState.profiles = nextProfiles;
        refreshUI();
      },
      (_error) => {
        notifyFirestoreIssue();
      }
    ),
    onSnapshot(
      query(collection(db, "movements"), orderBy("createdAt", "desc")),
      (snapshot) => {
        appState.movements = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        refreshUI();
      },
      (_error) => {
        notifyFirestoreIssue();
      }
    ),
    onSnapshot(
      query(collection(db, "productKeys"), orderBy("createdAt", "desc")),
      (snapshot) => {
        appState.productKeys = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        refreshUI();
      },
      (_error) => {
        notifyFirestoreIssue();
      }
    ),
    onSnapshot(
      doc(db, "settings", "store"),
      (docSnap) => {
        const data = docSnap.exists() ? docSnap.data() : {};
        appState.hiddenProducts = Array.isArray(data.hiddenProducts) ? data.hiddenProducts : [];
        refreshUI();
      },
      (_error) => {
        notifyFirestoreIssue();
      }
    )
  ];
}

function stopRealtimeSync() {
  unsubs.forEach((unsub) => unsub());
  unsubs = [];
}

function refreshUI() {
  renderProducts();

  if (adminModal && !adminModal.hidden) {
    renderAdminPanel();
  }

  renderUserHistory();

  if (currentAuthUser) {
    syncBalanceUI(getUserBalance(currentAuthUser));
  }
}

function getHiddenProducts() {
  return appState.hiddenProducts;
}

async function saveHiddenProducts(hiddenProducts) {
  await setDoc(doc(db, "settings", "store"), { hiddenProducts }, { merge: true });
}

function isProductHidden(productTitle) {
  const title = String(productTitle || "").trim();
  return getHiddenProducts().includes(title);
}

async function setProductHidden(productTitle, hidden) {
  const title = String(productTitle || "").trim();
  if (!title) {
    return;
  }

  const hiddenProducts = getHiddenProducts();
  const nextHiddenProducts = hidden
    ? Array.from(new Set([...hiddenProducts, title]))
    : hiddenProducts.filter((item) => item !== title);
  await saveHiddenProducts(nextHiddenProducts);
}

function isValidGmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?[1-9]\d{7,14}$/.test(phone);
}

function clearAuthErrors() {
  if (loginError) {
    loginError.textContent = "";
  }
  if (registerError) {
    registerError.textContent = "";
  }
  if (recoverError) {
    recoverError.textContent = "";
  }
}

function getProfiles() {
  return appState.profiles;
}

async function saveProfiles(profiles) {
  const writes = Object.entries(profiles).map(([uid, profile]) => saveProfile(uid, profile));
  await Promise.all(writes);
}

async function saveProfile(uid, profile) {
  const nextProfile = normalizeProfile(profile);
  await setDoc(doc(db, "profiles", uid), {
    ...nextProfile,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

function getProfile(uid) {
  const profiles = getProfiles();
  return profiles[uid] || null;
}

function normalizeProfile(profile = {}) {
  const balance = Number(profile.balance);
  return {
    username: String(profile.username || "").trim(),
    phone: String(profile.phone || "").trim(),
    gmail: String(profile.gmail || "").trim().toLowerCase(),
    balance: Number.isFinite(balance) ? balance : 0
  };
}

async function updateProfileByUid(uid, profilePatch) {
  const currentProfile = normalizeProfile(getProfile(uid) || {});
  const nextProfile = normalizeProfile({
    ...currentProfile,
    ...profilePatch
  });
  await saveProfile(uid, nextProfile);
  return nextProfile;
}

function getMovements() {
  return appState.movements;
}

function getProductKeys() {
  return appState.productKeys;
}

async function saveProductKeys(_keys) {
  return;
}

async function addProductKey(entry) {
  await addDoc(collection(db, "productKeys"), {
    ...entry,
    createdAt: serverTimestamp()
  });
}

async function removeProductKey(id) {
  await deleteDoc(doc(db, "productKeys", id));
}

function getProfileEntries() {
  return Object.entries(getProfiles())
    .map(([uid, profile]) => ({ uid, ...normalizeProfile(profile) }))
    .sort((left, right) => left.username.localeCompare(right.username));
}

async function saveMovements(_movements) {
  return;
}

async function addMovement(movement) {
  await addDoc(collection(db, "movements"), {
    ...movement,
    adminHidden: false,
    createdAt: serverTimestamp()
  });
}

async function hideMovementFromAdmin(id) {
  await updateDoc(doc(db, "movements", id), {
    adminHidden: true
  });
}

function getAdminMovements() {
  return getMovements().filter((movement) => !movement.adminHidden);
}

function getUserMovements(uid) {
  if (!uid) {
    return [];
  }
  return getMovements().filter((movement) => movement.uid === uid);
}

function findProductByTitle(title) {
  return products.find((item) => item.title === title) || null;
}

function parsePrice(priceText) {
  const numericText = String(priceText || "").replace(/[^\d.]/g, "");
  const amount = Number(numericText);
  return Number.isFinite(amount) ? amount : null;
}

async function ensureUserProfile(user) {
  if (!user || !user.uid) {
    return null;
  }

  const existingProfile = getProfile(user.uid);
  if (existingProfile) {
    return normalizeProfile(existingProfile);
  }

  const createdProfile = normalizeProfile({
    username: user.displayName || (user.email ? user.email.split("@")[0] : ""),
    phone: "",
    gmail: user.email || "",
    balance: 0
  });

  try {
    await saveProfile(user.uid, createdProfile);
  } catch (_error) {
    notifyFirestoreIssue();
  }
  return createdProfile;
}

function formatDateTime(value) {
  if (!value) {
    return "Sin fecha";
  }

  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isAdminUser(user) {
  return Boolean(user && user.email && String(user.email).trim().toLowerCase() === ADMIN_EMAIL);
}

function updateAdminAccess(user) {
  const isAdmin = isAdminUser(user);

  if (openAdminPanel) {
    openAdminPanel.hidden = !isAdmin;
  }

  if (!isAdmin) {
    showAdminModal(false);
  }
}

function syncBalanceUI(balance) {
  if (balanceAmount) {
    balanceAmount.textContent = formatBalance(balance);
  }
}

function showAdminModal(show) {
  if (!adminModal) {
    return;
  }
  adminModal.hidden = !show;
}

function showKeyModal(show) {
  if (!keyModal) {
    return;
  }

  keyModal.hidden = !show;
  if (!show) {
    deliveredKeyClipboard = "";
    if (keyModalFeedback) {
      keyModalFeedback.textContent = "";
    }
  }
}

function showHistoryModal(show) {
  if (!historyModal) {
    return;
  }

  historyModal.hidden = !show;
}

function renderAdminStats() {
  if (!adminStats) {
    return;
  }

  const profiles = getProfileEntries();
  const movements = getAdminMovements();
  const keys = getProductKeys();
  const totalBalance = profiles.reduce((sum, profile) => sum + profile.balance, 0);
  const totalPurchases = movements
    .filter((movement) => movement.type === "compra")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);

  adminStats.innerHTML = `
    <article class="admin-stat">
      <span>Usuarios guardados</span>
      <strong>${profiles.length}</strong>
    </article>
    <article class="admin-stat">
      <span>Saldo total</span>
      <strong>${formatBalance(totalBalance)}</strong>
    </article>
    <article class="admin-stat">
      <span>Compras registradas</span>
      <strong>${formatBalance(totalPurchases)}</strong>
    </article>
    <article class="admin-stat">
      <span>Keys disponibles</span>
      <strong>${keys.length}</strong>
    </article>
  `;
}

function renderAdminUsers() {
  if (!adminUsers) {
    return;
  }

  const profiles = getProfileEntries();
  if (profiles.length === 0) {
    adminUsers.innerHTML = '<p class="admin-empty">Todavia no hay usuarios guardados en este dispositivo.</p>';
    return;
  }

  adminUsers.innerHTML = profiles
    .map((profile) => `
      <article class="admin-user-card" data-uid="${profile.uid}">
        <div class="admin-user-top">
          <div>
            <strong>${profile.username || "Sin usuario"}</strong>
            <span>${profile.gmail || "Sin Gmail"}</span>
          </div>
          <div class="admin-balance">${formatBalance(profile.balance)}</div>
        </div>
        <div class="admin-user-meta">
          <span>UID: ${profile.uid}</span>
          <span>Telefono: ${profile.phone || "No registrado"}</span>
        </div>
        <div class="balance-editor">
          <input class="balance-input" type="number" min="0" step="0.01" placeholder="Monto" />
          <button type="button" class="add-balance-btn" data-uid="${profile.uid}">Agregar saldo</button>
          <button type="button" class="subtract-balance-btn" data-uid="${profile.uid}">Quitar saldo</button>
        </div>
      </article>
    `)
    .join("");
}

function renderAdminMovements() {
  if (!adminMovements) {
    return;
  }

  const movements = getAdminMovements();
  if (movements.length === 0) {
    adminMovements.innerHTML = '<p class="admin-empty">Todavia no hay movimientos registrados.</p>';
    return;
  }

  adminMovements.innerHTML = movements
    .map((movement) => {
      const detail = movement.type === "compra"
        ? `Compro ${movement.product || "producto"}`
        : movement.type === "debito"
          ? `Saldo retirado a ${movement.user || "usuario"}`
          : `Recarga aplicada a ${movement.user || "usuario"}`;
      const movementId = escapeHtml(movement.id || "");

      return `
        <article class="admin-movement-card">
          <div class="movement-top">
            <div>
              <strong>${movement.user || "Usuario"}</strong>
              <span>${movement.gmail || "Sin Gmail"}</span>
            </div>
            <div class="movement-actions">
              <div class="movement-amount">${formatBalance(movement.amount)}</div>
              <button type="button" class="delete-movement-btn" data-id="${movementId}" aria-label="Eliminar registro">X</button>
            </div>
          </div>
          <div class="movement-meta">
            <div>${detail}</div>
            <div>Tipo: ${movement.type}</div>
            <div>Saldo despues: ${formatBalance(movement.balanceAfter)}</div>
            <div>${formatDateTime(movement.createdAt)}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAdminKeyProducts() {
  if (!adminKeyProduct) {
    return;
  }

  adminKeyProduct.innerHTML = products
    .map((product) => `<option value="${product.title}">${product.title}</option>`)
    .join("");
}

function renderAdminKeys() {
  if (!adminKeys) {
    return;
  }

  const keys = getProductKeys();
  if (keys.length === 0) {
    adminKeys.innerHTML = '<p class="admin-empty">Aun no hay keys agregadas.</p>';
    return;
  }

  adminKeys.innerHTML = keys
    .map((entry) => {
      const product = escapeHtml(entry.product || "Producto");
      const keyValue = escapeHtml(entry.key || "");
      const createdBy = escapeHtml(entry.createdBy || "Admin");
      const encodedKey = encodeURIComponent(String(entry.key || ""));
      const encodedId = escapeHtml(entry.id || "");

      return `
      <article class="admin-key-card" data-id="${entry.id}">
        <div class="admin-key-top">
          <strong>${product}</strong>
          <span>${formatDateTime(entry.createdAt)}</span>
        </div>
        <div class="admin-key-value">${keyValue}</div>
        <div class="admin-key-meta">Creada por: ${createdBy}</div>
        <div class="admin-key-actions">
          <button type="button" class="copy-key-btn" data-key="${encodedKey}">Copiar</button>
          <button type="button" class="delete-key-btn" data-id="${encodedId}">Borrar</button>
        </div>
      </article>
    `;
    })
    .join("");
}

function renderAdminProductVisibility() {
  if (!adminProductsVisibility) {
    return;
  }

  adminProductsVisibility.innerHTML = products
    .map((product) => {
      const hidden = isProductHidden(product.title);
      const safeTitle = escapeHtml(product.title);

      return `
        <article class="admin-visibility-card">
          <div class="admin-visibility-info">
            <strong>${safeTitle}</strong>
            <span>${hidden ? "Oculto para clientes" : "Visible para clientes"}</span>
          </div>
          <button type="button" class="toggle-visibility-btn ${hidden ? "is-show" : "is-hide"}" data-title="${safeTitle}" data-hidden="${hidden ? "1" : "0"}">
            ${hidden ? "Mostrar" : "Ocultar"}
          </button>
        </article>
      `;
    })
    .join("");
}

function renderAdminPanel() {
  renderAdminKeyProducts();
  renderAdminStats();
  renderAdminUsers();
  renderAdminMovements();
  renderAdminKeys();
  renderAdminProductVisibility();
}

function renderUserHistory() {
  if (!userHistoryStats || !userHistoryList) {
    return;
  }

  if (!currentAuthUser || !currentAuthUser.uid) {
    userHistoryStats.innerHTML = "";
    userHistoryList.innerHTML = '<p class="admin-empty">Inicia sesion para ver tu historial.</p>';
    return;
  }

  const movements = getUserMovements(currentAuthUser.uid);
  const purchases = movements.filter((movement) => movement.type === "compra");
  const recharges = movements.filter((movement) => movement.type === "recarga");
  const totalSpent = purchases.reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const totalRecharged = recharges.reduce((sum, movement) => sum + Number(movement.amount || 0), 0);

  userHistoryStats.innerHTML = `
    <article class="admin-stat">
      <span>Total movimientos</span>
      <strong>${movements.length}</strong>
    </article>
    <article class="admin-stat">
      <span>Compras</span>
      <strong>${purchases.length}</strong>
    </article>
    <article class="admin-stat">
      <span>Recargas</span>
      <strong>${recharges.length}</strong>
    </article>
    <article class="admin-stat">
      <span>Gastado / Recargado</span>
      <strong>${formatBalance(totalSpent)} / ${formatBalance(totalRecharged)}</strong>
    </article>
  `;

  if (movements.length === 0) {
    userHistoryList.innerHTML = '<p class="admin-empty">Aun no tienes compras ni recargas registradas.</p>';
    return;
  }

  userHistoryList.innerHTML = movements
    .map((movement) => {
      const detail = movement.type === "compra"
        ? `Compra de ${movement.product || "producto"}`
        : movement.type === "debito"
          ? `Descuento de saldo aplicado`
          : `Recarga de saldo aplicada`;
      const deliveredKeyText = movement.type === "compra" && movement.deliveredKey
        ? `<div class="history-key">Key entregada: ${escapeHtml(movement.deliveredKey)}</div>`
        : "";

      return `
        <article class="admin-movement-card">
          <div class="movement-top">
            <div>
              <strong>${detail}</strong>
              <span>Tipo: ${movement.type}</span>
            </div>
            <div class="movement-amount">${formatBalance(movement.amount)}</div>
          </div>
          <div class="movement-meta">
            <div>Saldo despues: ${formatBalance(movement.balanceAfter)}</div>
            <div>${formatDateTime(movement.createdAt)}</div>
            ${deliveredKeyText}
          </div>
        </article>
      `;
    })
    .join("");
}

function openDeliveredKeyModal(productTitle, deliveredKey) {
  if (!keyModalProduct || !keyModalValue) {
    return;
  }

  deliveredKeyClipboard = String(deliveredKey || "");
  keyModalProduct.textContent = `Producto: ${productTitle}`;
  keyModalValue.textContent = deliveredKeyClipboard;
  if (keyModalFeedback) {
    keyModalFeedback.textContent = "";
  }
  showKeyModal(true);
}

function findGmailByUsername(username) {
  const normalized = String(username || "").trim().toLowerCase();
  if (!normalized) {
    return "";
  }

  const profiles = Object.values(getProfiles());
  const found = profiles.find((profile) => {
    if (!profile || typeof profile !== "object") {
      return false;
    }
    const profileUsername = String(profile.username || "").trim().toLowerCase();
    return profileUsername === normalized;
  });

  return found && found.gmail ? String(found.gmail).trim().toLowerCase() : "";
}

function getUserDisplayName(user) {
  const profile = user && user.uid ? normalizeProfile(getProfile(user.uid) || {}) : null;
  if (user && user.displayName) {
    return user.displayName;
  }
  if (profile && profile.username) {
    return profile.username;
  }
  if (user && user.email) {
    return user.email.split("@")[0];
  }
  return "Cuenta";
}

function formatBalance(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "$0.00";
  }
  return `$${numericValue.toFixed(2)}`;
}

function getUserBalance(user) {
  const profile = user && user.uid ? normalizeProfile(getProfile(user.uid) || {}) : null;
  if (!profile) {
    return 0;
  }
  const amount = Number(profile.balance);
  return Number.isFinite(amount) ? amount : 0;
}

function setAuthMode(mode) {
  if (!loginForm || !registerForm || !recoverForm || !authText || !authTitle) {
    return;
  }

  clearAuthErrors();
  loginForm.hidden = mode !== "login";
  registerForm.hidden = mode !== "register";
  recoverForm.hidden = mode !== "recover";

  if (mode === "login") {
    authTitle.textContent = "Iniciar Sesion";
    authText.textContent = "Ingresa tu correo o usuario y tu contrasena para comprar con saldo de cuenta.";
  }

  if (mode === "register") {
    authTitle.textContent = "Crear Cuenta";
    authText.textContent = "Crea tu cuenta con usuario, telefono, Gmail y contrasena de 8 digitos minimo.";
  }

  if (mode === "recover") {
    authTitle.textContent = "Recuperar Acceso";
    authText.textContent = "Escribe tu Gmail para enviar el codigo de recuperacion.";
  }
}

function showAuthModal(show) {
  if (!authModal) {
    return;
  }

  authModal.hidden = !show;
}

function setAuthenticated(user) {
  document.body.classList.add("is-authenticated");

  if (authActions) {
    authActions.hidden = true;
  }

  if (userChip) {
    userChip.hidden = false;
  }

  if (balanceChip) {
    balanceChip.hidden = false;
  }

  if (userName) {
    userName.textContent = user.name;
  }

  if (balanceAmount) {
    syncBalanceUI(user.balance);
  }
  renderUserHistory();
  showAuthModal(false);
}

function setGuest() {
  document.body.classList.remove("is-authenticated");

  if (menuPanel) {
    menuPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (authActions) {
    authActions.hidden = false;
  }

  if (userChip) {
    userChip.hidden = true;
  }

  if (balanceChip) {
    balanceChip.hidden = true;
  }

  updateAdminAccess(null);
  showKeyModal(false);
  showHistoryModal(false);
  renderUserHistory();

  setAuthMode("login");
  showAuthModal(true);
}

if (openHistoryModal) {
  openHistoryModal.addEventListener("click", () => {
    const isAuthenticated = document.body.classList.contains("is-authenticated");
    if (!isAuthenticated || !currentAuthUser) {
      setAuthMode("login");
      if (authText) {
        authText.textContent = "Inicia sesion para ver tu historial de compras y recargas.";
      }
      showAuthModal(true);
      return;
    }

    renderUserHistory();
    showHistoryModal(true);
  });
}

if (closeHistoryModal) {
  closeHistoryModal.addEventListener("click", () => {
    showHistoryModal(false);
  });
}

if (historyModal) {
  historyModal.addEventListener("click", (event) => {
    if (event.target === historyModal) {
      showHistoryModal(false);
    }
  });
}

function getAuthErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Ese Gmail ya esta registrado.";
    case "auth/invalid-email":
      return "Ingresa un Gmail valido.";
    case "auth/weak-password":
      return "La contrasena debe tener al menos 6 caracteres.";
    case "auth/invalid-credential":
      return "Gmail o contrasena incorrectos.";
    case "auth/user-not-found":
      return "No existe una cuenta con ese Gmail.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Espera un momento y vuelve a probar.";
    case "auth/network-request-failed":
      return "No se pudo conectar con Firebase. Revisa tu internet.";
    case "auth/operation-not-allowed":
      return "Este metodo de acceso no esta habilitado en Firebase Auth.";
    default:
      return "Ocurrio un error con Firebase Auth. Revisa la configuracion del proyecto.";
  }
}

if (menuToggle && menuPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuPanel.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuPanel.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (openLogin) {
  openLogin.addEventListener("click", () => {
    setAuthMode("login");
    showAuthModal(true);
  });
}

if (openRegister) {
  openRegister.addEventListener("click", () => {
    setAuthMode("register");
    showAuthModal(true);
  });
}

if (openRegisterHero) {
  openRegisterHero.addEventListener("click", () => {
    setAuthMode("register");
    showAuthModal(true);
  });
}

if (openRecover) {
  openRecover.addEventListener("click", () => {
    setAuthMode("recover");
  });
}

if (openAdminPanel) {
  openAdminPanel.addEventListener("click", () => {
    if (!isAdminUser(currentAuthUser)) {
      window.alert("No tienes acceso al Admin Panel.");
      return;
    }

    renderAdminPanel();
    showAdminModal(true);
  });
}

if (closeAdminPanel) {
  closeAdminPanel.addEventListener("click", () => {
    showAdminModal(false);
  });
}

if (backToLoginFromRegister) {
  backToLoginFromRegister.addEventListener("click", () => {
    setAuthMode("login");
  });
}

if (backToLoginFromRecover) {
  backToLoginFromRecover.addEventListener("click", () => {
    setAuthMode("login");
  });
}

if (authModal) {
  authModal.addEventListener("click", (event) => {
    if (document.body.classList.contains("is-authenticated") && event.target === authModal) {
      showAuthModal(false);
    }
  });
}

if (adminModal) {
  adminModal.addEventListener("click", (event) => {
    if (event.target === adminModal) {
      showAdminModal(false);
    }
  });
}

if (adminUsers) {
  adminUsers.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const addButton = target.closest(".add-balance-btn");
    const subtractButton = target.closest(".subtract-balance-btn");
    const button = addButton || subtractButton;
    if (!button) {
      return;
    }

    const uid = button.getAttribute("data-uid") || "";
    const card = button.closest(".admin-user-card");
    const input = card ? card.querySelector(".balance-input") : null;
    const amount = input instanceof HTMLInputElement ? Number(input.value) : NaN;

    if (!uid || !Number.isFinite(amount) || amount <= 0) {
      window.alert("Ingresa un monto valido para agregar saldo.");
      return;
    }

    const profile = normalizeProfile(getProfile(uid) || {});
    const isSubtractAction = Boolean(subtractButton);
    const nextBalance = isSubtractAction
      ? Math.max(0, profile.balance - amount)
      : profile.balance + amount;
    const nextProfile = await updateProfileByUid(uid, {
      ...profile,
      balance: nextBalance
    });

    await addMovement({
      type: isSubtractAction ? "debito" : "recarga",
      uid,
      user: nextProfile.username,
      gmail: nextProfile.gmail,
      amount,
      balanceAfter: nextProfile.balance
    });

    if (currentAuthUser && currentAuthUser.uid === uid) {
      syncBalanceUI(nextProfile.balance);
      renderUserHistory();
    }

    renderAdminPanel();
  });
}

if (adminMovements) {
  adminMovements.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const deleteButton = target.closest(".delete-movement-btn");
    if (!deleteButton) {
      return;
    }

    if (!isAdminUser(currentAuthUser)) {
      window.alert("Solo el admin puede eliminar registros.");
      return;
    }

    const movementId = deleteButton.getAttribute("data-id") || "";
    if (!movementId) {
      return;
    }

    const confirmed = window.confirm("Estas seguro de eliminar este registro?");
    if (!confirmed) {
      return;
    }

    await hideMovementFromAdmin(movementId);
    renderAdminPanel();
    renderUserHistory();
  });
}

if (adminProductsVisibility) {
  adminProductsVisibility.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest(".toggle-visibility-btn");
    if (!button) {
      return;
    }

    if (!isAdminUser(currentAuthUser)) {
      window.alert("Solo el admin puede cambiar visibilidad de productos.");
      return;
    }

    const productTitle = button.getAttribute("data-title") || "";
    const currentlyHidden = button.getAttribute("data-hidden") === "1";
    if (!productTitle) {
      return;
    }

    await setProductHidden(productTitle, !currentlyHidden);
    renderAdminProductVisibility();
    renderProducts();
  });
}

if (adminKeyForm) {
  adminKeyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isAdminUser(currentAuthUser)) {
      if (adminKeyFeedback) {
        adminKeyFeedback.textContent = "Solo el admin puede agregar keys.";
      }
      return;
    }

    const formData = new FormData(adminKeyForm);
    const product = String(formData.get("adminKeyProduct") || "").trim();
    const keyValue = String(formData.get("adminKeyValue") || "").trim();

    if (!product || !keyValue) {
      if (adminKeyFeedback) {
        adminKeyFeedback.textContent = "Selecciona un producto y pega una key valida.";
      }
      return;
    }

    await addProductKey({
      product,
      key: keyValue,
      createdBy: getUserDisplayName(currentAuthUser)
    });

    if (adminKeyValue) {
      adminKeyValue.value = "";
    }

    if (adminKeyFeedback) {
      adminKeyFeedback.textContent = "Key agregada correctamente.";
    }

    renderAdminPanel();
    renderProducts();
    renderUserHistory();
  });
}

if (adminKeys) {
  adminKeys.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!isAdminUser(currentAuthUser)) {
      if (adminKeyFeedback) {
        adminKeyFeedback.textContent = "Solo el admin puede gestionar keys.";
      }
      return;
    }

    const copyButton = target.closest(".copy-key-btn");
    if (copyButton) {
      const keyText = decodeURIComponent(copyButton.getAttribute("data-key") || "");
      if (!keyText) {
        return;
      }

      try {
        await navigator.clipboard.writeText(keyText);
        if (adminKeyFeedback) {
          adminKeyFeedback.textContent = "Key copiada al portapapeles.";
        }
      } catch (_error) {
        if (adminKeyFeedback) {
          adminKeyFeedback.textContent = "No se pudo copiar la key en este navegador.";
        }
      }
      return;
    }

    const deleteButton = target.closest(".delete-key-btn");
    if (!deleteButton) {
      return;
    }

    const id = deleteButton.getAttribute("data-id") || "";
    if (!id) {
      return;
    }

    await removeProductKey(id);
    if (adminKeyFeedback) {
      adminKeyFeedback.textContent = "Key eliminada.";
    }
    renderAdminPanel();
    renderProducts();
    renderUserHistory();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearAuthErrors();

    const formData = new FormData(loginForm);
    const identity = String(formData.get("loginIdentity") || "").trim();
    const password = String(formData.get("loginPassword") || "").trim();
    let gmail = "";

    if (identity.includes("@")) {
      gmail = identity.toLowerCase();
      if (!isValidGmail(gmail)) {
        if (loginError) {
          loginError.textContent = "Ingresa un Gmail valido o tu usuario.";
        }
        return;
      }
    } else {
      if (identity.length < 3) {
        if (loginError) {
          loginError.textContent = "Ingresa tu correo o usuario.";
        }
        return;
      }

      gmail = findGmailByUsername(identity);
      if (!gmail) {
        if (loginError) {
          loginError.textContent = "No encontramos ese usuario en este dispositivo. Prueba con tu Gmail.";
        }
        return;
      }
    }

    if (!password) {
      if (loginError) {
        loginError.textContent = "Ingresa tu contrasena.";
      }
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, gmail, password);
      loginForm.reset();
    } catch (error) {
      if (loginError) {
        loginError.textContent = getAuthErrorMessage(error.code);
      }
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearAuthErrors();

    const formData = new FormData(registerForm);
    const username = String(formData.get("registerUser") || "").trim();
    const phone = String(formData.get("registerPhone") || "").replace(/[^\d+]/g, "").trim();
    const gmail = String(formData.get("registerEmail") || "").trim().toLowerCase();
    const password = String(formData.get("registerPassword") || "").trim();

    if (!username) {
      if (registerError) {
        registerError.textContent = "Debes crear un usuario.";
      }
      return;
    }

    if (!isValidPhone(phone)) {
      if (registerError) {
        registerError.textContent = "Ingresa un numero de telefono valido en formato internacional.";
      }
      return;
    }

    if (!isValidGmail(gmail)) {
      if (registerError) {
        registerError.textContent = "Ingresa un Gmail valido (ejemplo: tuusuario@gmail.com).";
      }
      return;
    }

    if (password.length < 6) {
      if (registerError) {
        registerError.textContent = "La contrasena debe tener minimo 6 caracteres.";
      }
      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, gmail, password);
      await updateProfile(credential.user, { displayName: username });
      await saveProfile(credential.user.uid, normalizeProfile({ username, phone, gmail, balance: 0 }));
      registerForm.reset();
    } catch (error) {
      if (registerError) {
        registerError.textContent = getAuthErrorMessage(error.code);
      }
    }
  });
}

if (recoverForm) {
  recoverForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearAuthErrors();

    const formData = new FormData(recoverForm);
    const gmail = String(formData.get("recoverEmail") || "").trim().toLowerCase();

    if (!isValidGmail(gmail)) {
      if (recoverError) {
        recoverError.textContent = "Ingresa un Gmail valido para recuperar tu contrasena.";
      }
      return;
    }

    try {
      await sendPasswordResetEmail(auth, gmail);
      if (recoverError) {
        recoverError.textContent = "Te enviamos un correo para restablecer la contrasena.";
      }
      recoverForm.reset();
    } catch (error) {
      if (recoverError) {
        recoverError.textContent = getAuthErrorMessage(error.code);
      }
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch (_error) {
      setGuest();
    }
  });
}

if (grid) {
  grid.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const buyBtn = target.closest(".buy-btn");
    if (!buyBtn) {
      return;
    }

    const productTitle = buyBtn.getAttribute("data-title") || "este producto";
    const isAuthenticated = document.body.classList.contains("is-authenticated");

    if (!isAuthenticated) {
      setAuthMode("login");
      if (authText) {
        authText.textContent = `Para comprar ${productTitle}, inicia sesion con tu correo o usuario y contrasena.`;
      }
      showAuthModal(true);
      return;
    }

    if (!currentAuthUser) {
      window.alert("No pudimos identificar la cuenta actual. Vuelve a iniciar sesion.");
      return;
    }

    const product = findProductByTitle(productTitle);
    if (!product) {
      window.alert("No encontramos ese producto en el catalogo actual.");
      return;
    }

    if (isProductHidden(product.title)) {
      window.alert("Este producto no esta disponible ahora mismo.");
      renderProducts();
      return;
    }

    const confirmed = window.confirm(`Estas seguro de comprar este producto: ${product.title}?`);
    if (!confirmed) {
      return;
    }

    const amount = parsePrice(product.price);
    if (amount === null) {
      window.alert("Este producto se gestiona manualmente. Contacta a soporte para finalizar la compra.");
      return;
    }

    const productStock = getProductStock(product.title);
    if (productStock <= 0) {
      window.alert("No hay keys disponibles para este producto. Recarga stock en el panel admin.");
      renderProducts();
      return;
    }

    const currentProfile = await ensureUserProfile(currentAuthUser);
    const currentBalance = currentProfile ? Number(currentProfile.balance) : 0;
    if (currentBalance < amount) {
      window.alert(`Saldo insuficiente. Tu saldo actual es ${formatBalance(currentBalance)}.`);
      return;
    }

    const deliveredKey = await takeNextProductKey(product.title);
    if (!deliveredKey || !deliveredKey.key) {
      window.alert("No se pudo asignar una key para este producto. Intenta de nuevo.");
      renderProducts();
      return;
    }

    const nextProfile = await updateProfileByUid(currentAuthUser.uid, {
      balance: currentBalance - amount,
      gmail: currentAuthUser.email || currentProfile.gmail,
      username: currentProfile.username || getUserDisplayName(currentAuthUser)
    });

    await addMovement({
      type: "compra",
      uid: currentAuthUser.uid,
      user: nextProfile.username || getUserDisplayName(currentAuthUser),
      gmail: nextProfile.gmail,
      product: product.title,
      amount,
      balanceAfter: nextProfile.balance,
      deliveredKey: deliveredKey.key
    });

    if (balanceAmount) {
      syncBalanceUI(nextProfile.balance);
    }

    renderAdminPanel();
    renderProducts();
    renderUserHistory();

    openDeliveredKeyModal(productTitle, deliveredKey.key);
  });
}

if (copyDeliveredKeyBtn) {
  copyDeliveredKeyBtn.addEventListener("click", async () => {
    if (!deliveredKeyClipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(deliveredKeyClipboard);
      if (keyModalFeedback) {
        keyModalFeedback.textContent = "Key copiada. Ya la puedes pegar donde la necesites.";
      }
    } catch (_error) {
      if (keyModalFeedback) {
        keyModalFeedback.textContent = "No se pudo copiar automaticamente. Copiala manualmente desde el cuadro.";
      }
    }
  });
}

if (closeKeyModalBtn) {
  closeKeyModalBtn.addEventListener("click", () => {
    showKeyModal(false);
  });
}

if (keyModal) {
  keyModal.addEventListener("click", (event) => {
    if (event.target === keyModal) {
      showKeyModal(false);
    }
  });
}

setAuthMode("login");
onAuthStateChanged(auth, async (user) => {
  if (user && user.isAnonymous) {
    signOut(auth).catch(() => {
      setGuest();
    });
    return;
  }

  if (user) {
    currentAuthUser = user;
    startRealtimeSync();
    updateAdminAccess(user);
    setAuthenticated({
      name: getUserDisplayName(user),
      balance: getUserBalance(user),
      email: user.email || ""
    });

    // Keep login responsive: profile sync happens in background.
    ensureUserProfile(user).catch(() => {
      notifyFirestoreIssue();
    });

    return;
  }

  stopRealtimeSync();
  currentAuthUser = null;
  setGuest();
});
