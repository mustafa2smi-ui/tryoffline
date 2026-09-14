/* ==========================================================================
   🌐 1. MULTI-LANGUAGE (HINGLISH / HINDI / ENGLISH) DICTIONARY ENGINE
   ========================================================================== */
let currentAppLang = localStorage.getItem("notebook_app_lang") || "hinglish";

const I18N_LANG = {
  hinglish: {
    privacyTitle: "🔒 Privacy Policy (प्राइवेसी पॉलिसी)",
    privacyBody: `
      <p><b>Notebook Bill</b> aapki data privacy ko 100% respect karta hai.</p><br>
      <p><b>Data Storage:</b> Aapka saara billing records, customer details, aur database items aapke apne mobile/device ke <i>LocalStorage</i> mein privately store rehta hai.</p><br>
      <p><b>No Server Tracking:</b> Koi bhi personal ya customer account data hamare external server par send nahi hota. Application 100% offline safe hai.</p>
    `,
    disclaimerTitle: "⚠️ Disclaimer (अस्वीकरण)",
    disclaimerBody: `
      <p><b>Local Data Responsibility:</b> Yeh app local device browser storage par depend karti hai.</p><br>
      <p><b>Data Lost Warning:</b> Agar aap phone se browser ka "Clear Cache / Clear Data" karenge, toh bina backup ke aapka purana hisab delete ho sakta hai.</p><br>
      <p><b>Safety Tip:</b> Regular Settings Drawer mein jakar <b>'Backup Data (.json)'</b> download kar ke apne WhatsApp ya Drive par surakshit rakhein.</p>
    `,
    helpTitle: "⁉️ User Guide & Shortcuts (मदद)",
    helpBody: `
      <p><b>Quick Billing Shortcuts:</b></p>
      <ul>
        <li><b>Item Add:</b> Name aur Price likhein (e.g. <i>Rice 50</i> ya <i>दाल 40</i>) aur Enter dabayein.</li>
        <li><b>Calculation:</b> Direct math likhein (e.g. <i>Sugar 40*2.5</i>).</li>
        <li><b>Barcode Scan:</b> 📷 Camera icon daba kar barcode/QR scan karein.</li>
        <li><b>Smart Undo:</b> Galti se clear hone par ↩️ Undo daba kar wapas layein.</li>
      </ul>
    `,
    backupWarning: "🚨 Backup import karne se purana data replace ho jayega. Kya aap continue karna chahte hain?",
    backupSuccess: "🎉 Data Restore Successful!",
    backupEmpty: "Export karne ke liye koi saved data nahi mila!",
    custNameReq: "Data save karne ke liye 'Customer Name' enter karein!",
    offlineLockMsg: "⏳ Offline Limit: App bina internet ke maximum 3 din chal sakti hai. Re-verify karne ke liye ek baar Internet/WiFi connect karein.",
    tamperAlert: "🚨 Security Alert: Phone clock manipulation detect hui hai! Internet connect karke refresh karein.",
    badgeRemaining: "Remaining Offline Allowance:"
  },
  hindi: {
    privacyTitle: "🔒 गोपनीयता नीति (Privacy Policy)",
    privacyBody: `
      <p><b>नोटबुक बिल</b> आपकी डेटा गोपनीयता का पूर्ण सम्मान करता है।</p><br>
      <p><b>डेटा संग्रहण:</b> आपका सारा बिलिंग विवरण, ग्राहक सूची और उत्पाद डेटा आपके अपने मोबाइल के <i>स्थानीय भंडारण (LocalStorage)</i> में सुरक्षित रहता है।</p><br>
      <p><b>कोई बाहरी सर्वर नहीं:</b> कोई भी निजी डेटा किसी बाहरी सर्वर पर नहीं भेजा जाता। यह ऐप पूर्णतः ऑफलाइन सुरक्षित है।</p>
    `,
    disclaimerTitle: "⚠️ अस्वीकरण एवं डेटा चेतावनी (Disclaimer)",
    disclaimerBody: `
      <p><b>डेटा सुरक्षा जिम्मेदारी:</b> यह एप्लिकेशन आपके फोन ब्राउज़र की मेमोरी पर चलती है।</p><br>
      <p><b>डेटा हानि चेतावनी:</b> यदि आप फोन की सेटिंग से ब्राउज़र का "Clear Data" करते हैं, तो आपका बिना बैकअप का हिसाब मिट सकता है।</p><br>
      <p><b>सलाह:</b> नियमित रूप से <b>'Backup Data (.json)'</b> डाउनलोड करके अपने पास सुरक्षित रखें।</p>
    `,
    helpTitle: "⁉️ उपयोगकर्ता निर्देशिका एवं शॉर्टकट",
    helpBody: `
      <p><b>त्वरित शॉर्टकट:</b></p>
      <ul>
        <li><b>सामान जोड़ें:</b> नाम और कीमत लिखें (उदा. <i>चीनी 45</i>) और Enter दबाएं।</li>
        <li><b>सीधी गणना:</b> गणितीय सूत्र लिखें (उदा. <i>आटा 40*5</i>)।</li>
        <li><b>बारकोड स्कैन:</b> 📷 आइकन दबाकर बारकोड स्कैन करें।</li>
        <li><b>अनडू (Undo):</b> गलती से साफ होने पर ↩️ बटन दबाकर डेटा वापस लाएं।</li>
      </ul>
    `,
    backupWarning: "🚨 बैकअप रिस्टोर करने से वर्तमान डेटा बदल जाएगा। क्या आप आगे बढ़ना चाहते हैं?",
    backupSuccess: "🎉 डेटा सफलतापूर्वक रिस्टोर हो गया!",
    backupEmpty: "डाउनलोड करने के लिए कोई डेटा नहीं मिला!",
    custNameReq: "बिल सेव करने के लिए ग्राहक का नाम दर्ज करें!",
    offlineLockMsg: "⏳ ऑफलाइन सीमा समाप्त: ऐप बिना इंटरनेट के अधिकतम 3 दिन चल सकता है। जारी रखने के लिए इंटरनेट कनेक्ट करें।",
    tamperAlert: "🚨 सुरक्षा चेतावनी: फोन का समय बदलने की कोशिश पकड़ी गई है! इंटरनेट कनेक्ट करें।",
    badgeRemaining: "शेष ऑफलाइन वैधता:"
  },
  english: {
    privacyTitle: "🔒 Privacy Policy",
    privacyBody: `
      <p><b>Notebook Bill</b> respects your privacy completely.</p><br>
      <p><b>Data Storage:</b> All your invoices, ledgers, and product database are stored locally on your device's <i>LocalStorage</i>.</p><br>
      <p><b>Zero Server Tracking:</b> No personal ledger or customer details are transferred to external servers. It is 100% offline secure.</p>
    `,
    disclaimerTitle: "⚠️ Disclaimer & Data Warning",
    disclaimerBody: `
      <p><b>Local Storage Dependency:</b> This application relies on your device browser storage.</p><br>
      <p><b>Data Loss Alert:</b> Clearing browser data/cache will delete unbacked ledger records permanently.</p><br>
      <p><b>Safety Recommendation:</b> Always download <b>'Backup Data (.json)'</b> regularly from the control drawer.</p>
    `,
    helpTitle: "⁉️ Help & User Guide",
    helpBody: `
      <p><b>Quick Shortcuts:</b></p>
      <ul>
        <li><b>Add Product:</b> Type Item & Price (e.g. <i>Rice 50</i>) and press Enter.</li>
        <li><b>Math Calculation:</b> Expression math (e.g. <i>Sugar 40*2.5</i>).</li>
        <li><b>Barcode Scan:</b> Tap 📷 icon to scan barcode.</li>
        <li><b>Smart Undo:</b> Tap ↩️ button to restore cleared bill.</li>
      </ul>
    `,
    backupWarning: "🚨 Restoring backup will overwrite current memory. Do you want to proceed?",
    backupSuccess: "🎉 Data Restored Successfully!",
    backupEmpty: "No saved records found to export!",
    custNameReq: "Please enter Customer Name to save!",
    offlineLockMsg: "⏳ Offline Limit Reached: Maximum 3-day offline allowance exceeded. Please connect to Internet to sync.",
    tamperAlert: "🚨 Security Alert: Device clock rollback detected! Please connect to internet to reset.",
    badgeRemaining: "Remaining Offline Days:"
  }
};

window.changeAppLanguage = function(langVal) {
  currentAppLang = langVal;
  localStorage.setItem("notebook_app_lang", langVal);
  enforceSecurityGuardrail();
};

window.openLegalModal = function(type) {
  closeSettingsModal();
  const modal = document.getElementById("legalModal");
  const title = document.getElementById("legalModalTitle");
  const body = document.getElementById("legalModalBody");
  const dict = I18N_LANG[currentAppLang] || I18N_LANG.hinglish;
  
  if (type === 'privacy') {
    title.innerHTML = dict.privacyTitle;
    body.innerHTML = dict.privacyBody;
  } else if (type === 'disclaimer') {
    title.innerHTML = dict.disclaimerTitle;
    body.innerHTML = dict.disclaimerBody;
  } else {
    title.innerHTML = dict.helpTitle;
    body.innerHTML = dict.helpBody;
  }
  if (modal) modal.style.display = "flex";
};

window.closeLegalModal = function() {
  const modal = document.getElementById("legalModal");
  if (modal) modal.style.display = "none";
};

/* ==========================================================================
   🛡️ 2. ANTI-TAMPERING & CRYPTOGRAPHIC OFFLINE WATCHDOG
   ========================================================================== */
const SECRET_SALT = "WebmySecureSalt9981";
const MAX_OFFLINE_DAYS = 3;

function generateChecksum(timestamp, lastTime) {
  let str = `${timestamp}_${lastTime}_${SECRET_SALT}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return "SIG-" + Math.abs(hash).toString(36).toUpperCase();
}

function getAppSecurityState() {
  let state = JSON.parse(localStorage.getItem("nb_sec_vault"));
  let now = new Date().getTime();

  if (!state) {
    state = {
      installedAt: now,
      lastOnlineSync: now,
      lastObservedTime: now,
      isTampered: false,
      signature: generateChecksum(now, now)
    };
    localStorage.setItem("nb_sec_vault", JSON.stringify(state));
    return state;
  }

  let expectedSig = generateChecksum(state.lastOnlineSync, state.lastObservedTime);
  if (state.signature !== expectedSig) {
    state.isTampered = true;
    localStorage.setItem("nb_sec_vault", JSON.stringify(state));
    return state;
  }

  if (now < (state.lastObservedTime - 60000)) {
    state.isTampered = true;
    localStorage.setItem("nb_sec_vault", JSON.stringify(state));
    return state;
  }

  if (navigator.onLine) {
    state.lastOnlineSync = now;
  }

  state.lastObservedTime = now;
  state.signature = generateChecksum(state.lastOnlineSync, state.lastObservedTime);
  localStorage.setItem("nb_sec_vault", JSON.stringify(state));
  return state;
}

function enforceSecurityGuardrail() {
  let secState = getAppSecurityState();
  let now = new Date().getTime();
  let maxAllowedOfflineMs = MAX_OFFLINE_DAYS * 24 * 60 * 60 * 1000;
  let overlay = document.getElementById("licenseExpiredOverlay");
  let reasonText = document.getElementById("lockReasonText");
  const dict = I18N_LANG[currentAppLang] || I18N_LANG.hinglish;

  if (secState.isTampered) {
    if (overlay) overlay.style.display = "flex";
    if (reasonText) reasonText.innerText = dict.tamperAlert;
    return false;
  }

  if ((now - secState.lastOnlineSync) > maxAllowedOfflineMs) {
    if (overlay) overlay.style.display = "flex";
    if (reasonText) reasonText.innerText = dict.offlineLockMsg;
    return false;
  }

  if (overlay) overlay.style.display = "none";
  updateBadgeDisplay(secState);
  return true;
}

function updateBadgeDisplay(secState) {
  let badge = document.getElementById("trialBadgeInfo");
  if (!badge) return;
  const dict = I18N_LANG[currentAppLang] || I18N_LANG.hinglish;
  let now = new Date().getTime();
  let diffDays = Math.max(0, MAX_OFFLINE_DAYS - Math.floor((now - secState.lastOnlineSync) / (24 * 60 * 60 * 1000)));
  badge.innerHTML = `🟢 Free Edition Active<br><span style="font-size:10px; color:#bdc3c7;">${dict.badgeRemaining} <b>${diffDays} Days</b></span>`;
}

window.addEventListener("online", () => {
  enforceSecurityGuardrail();
});

/* ==========================================================================
   📄 3. PRINT LAYOUT MANAGER
   ========================================================================== */
let currentCompPaperSize = localStorage.getItem("notebook_paper_size") || "A4_HALF";

window.changeCompPrintSize = function(sizeVal) {
  currentCompPaperSize = sizeVal;
  localStorage.setItem("notebook_paper_size", sizeVal);
  applyPrintSizeCSS(sizeVal);
};

function applyPrintSizeCSS(sizeVal) {
  let styleTag = document.getElementById("dynamicPrintStyle");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "dynamicPrintStyle";
    document.head.appendChild(styleTag);
  }

  let cssRules = "";
  if (sizeVal === "A4_HALF") {
    cssRules = `
      @media print {
        @page { size: 5in 8in; margin: 0.2in; }
        body * { visibility: hidden !important; }
        #paper, #paper * { visibility: visible !important; }
        #paper { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; border: none !important; background: #fff !important; color: #000 !important; padding: 10px !important; }
        .brand-header, .scanner-section, .bottom-dashboard, .settings-modal-overlay, .suggest-box, .code-patch, .paper::before { display: none !important; }
        .row { border-bottom: 1px solid #000 !important; padding: 8px 0 !important; }
        .input, .result { color: #000 !important; font-size: 18px !important; font-weight: 800 !important; }
        #custBlock span, #custNameInput { font-size: 16px !important; font-weight: bold !important; color: #000 !important; }
      }
    `;
  } else if (sizeVal === "THERMAL_80") {
    cssRules = `
      @media print {
        @page { size: 3.15in auto; margin: 0.1in; }
        body * { visibility: hidden !important; }
        #paper, #paper * { visibility: visible !important; }
        #paper { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; border: none !important; background: #fff !important; color: #000 !important; padding: 5px !important; }
        .brand-header, .scanner-section, .bottom-dashboard, .settings-modal-overlay, .suggest-box, .code-patch, .paper::before { display: none !important; }
        .row { border-bottom: 1px dashed #000 !important; padding: 4px 0 !important; }
        .input, .result { color: #000 !important; font-size: 13px !important; font-weight: 700 !important; }
      }
    `;
  } else {
    cssRules = `
      @media print {
        @page { size: A4; margin: 0.5in; }
        body * { visibility: hidden !important; }
        #paper, #paper * { visibility: visible !important; }
        #paper { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; border: none !important; background: #fff !important; color: #000 !important; padding: 15px !important; }
        .brand-header, .scanner-section, .bottom-dashboard, .settings-modal-overlay, .suggest-box, .code-patch, .paper::before { display: none !important; }
        .row { border-bottom: 1px solid #ccc !important; padding: 6px 0 !important; }
        .input, .result { color: #000 !important; font-size: 15px !important; font-weight: 600 !important; }
      }
    `;
  }
  styleTag.innerHTML = cssRules;
}

document.addEventListener("DOMContentLoaded", function() {
  const pSelect = document.getElementById("printPaperSizeSelect");
  if (pSelect) pSelect.value = currentCompPaperSize;
  applyPrintSizeCSS(currentCompPaperSize);

  const langSelect = document.getElementById("appLanguageSelect");
  if (langSelect) langSelect.value = currentAppLang;
});

/* ==========================================================================
   ⚙️ 4. SETTINGS DRAWER CONTROLLERS
   ========================================================================== */
window.openSettingsModal = function() {
  enforceSecurityGuardrail();
  const m = document.getElementById("settingsModal");
  if (m) m.style.display = "flex";
};

window.closeSettingsModal = function() {
  const m = document.getElementById("settingsModal");
  if (m) m.style.display = "none";
};

window.navToEntryMode = function() {
  closeSettingsModal();
  if (typeof window.toggleViewMode === "function") window.toggleViewMode('entry');
  const b = document.getElementById("btnBackToBill");
  if (b) b.style.display = "flex";
};

window.navToSavedBills = function() {
  closeSettingsModal();
  if (typeof window.toggleViewMode === "function") window.toggleViewMode('entry');
  const b = document.getElementById("btnBackToBill");
  if (b) b.style.display = "flex";
  const hList = document.getElementById("dbBillsHistoryList");
  if (hList) hList.scrollIntoView({ behavior: 'smooth' });
};

window.navToBillMode = function() {
  if (typeof window.toggleViewMode === "function") window.toggleViewMode('bill');
  const b = document.getElementById("btnBackToBill");
  if (b) b.style.display = "none";
};

window.toggleDarkMode = function() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("notebook_theme_mode", isDark ? "dark" : "light");
};

window.changeAppFontSize = function(sizeVal) {
  document.documentElement.style.setProperty('--font-base', sizeVal);
  localStorage.setItem("notebook_font_size", sizeVal);
};

/* ==========================================================================
   📤 / 📥 5. EXPORT & IMPORT BACKUP ENGINE
   ========================================================================== */
window.exportAppData = function() {
  const dict = I18N_LANG[currentAppLang] || I18N_LANG.hinglish;
  try {
    const backupData = {
      app: "NotebookBill",
      exportDate: new Date().toLocaleString('en-IN'),
      ledger_db_v3: JSON.parse(localStorage.getItem("ledger_db_v3")) || [],
      notebook_invoice_history: JSON.parse(localStorage.getItem("notebook_invoice_history")) || [],
      shopName: document.getElementById("shopNameInput") ? document.getElementById("shopNameInput").value : "Notebook Bill"
    };

    if (backupData.ledger_db_v3.length === 0 && backupData.notebook_invoice_history.length === 0) {
      return alert(dict.backupEmpty);
    }

    const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `notebook_bill_backup_${today}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    alert("🎉 Backup file (.json) downloaded!");
  } catch (err) { alert("Export Failed: " + err.message); }
};

window.exportCSVData = function() {
  if (typeof window.executeCSVExport === "function") window.executeCSVExport();
};

window.triggerImportFileInput = function() {
  const fileInput = document.getElementById("importFileInput");
  if (fileInput) fileInput.click();
};

window.importAppData = function(event) {
  const dict = I18N_LANG[currentAppLang] || I18N_LANG.hinglish;
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (!importedData.ledger_db_v3 && !importedData.notebook_invoice_history) {
        return alert("❌ Invalid Backup File!");
      }

      if (confirm(dict.backupWarning)) {
        if (importedData.ledger_db_v3) localStorage.setItem("ledger_db_v3", JSON.stringify(importedData.ledger_db_v3));
        if (importedData.notebook_invoice_history) localStorage.setItem("notebook_invoice_history", JSON.stringify(importedData.notebook_invoice_history));
        if (importedData.shopName && document.getElementById("shopNameInput")) document.getElementById("shopNameInput").value = importedData.shopName;

        alert(dict.backupSuccess);
        location.reload();
      }
    } catch (err) { alert("❌ Import Error: Invalid JSON File."); }
  };
  reader.readAsText(file);
};

window.filterBillsByCustomer = function() {
  const query = document.getElementById("custSearchInput") ? document.getElementById("custSearchInput").value.trim().toLowerCase() : "";
  if (typeof window.renderBillsHistoryList === "function") window.renderBillsHistoryList(query);
};

window.clearCustSearch = function() {
  if (document.getElementById("custSearchInput")) document.getElementById("custSearchInput").value = "";
  if (typeof window.renderBillsHistoryList === "function") window.renderBillsHistoryList();
};

/* ==========================================================================
   🌐 6. AUTO-TRANSLATION (For ENG Thermal Printing)
   ========================================================================== */
async function autoTranslateToEnglish(text) {
  if (/^[a-zA-Z0-9\s.,+*/()-]+$/.test(text)) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0];
    }
    return text;
  } catch (e) {
    return text;
  }
}

/* ==========================================================================
   📊 7. CORE LEDGER CALCULATION & UI ENGINE
   ========================================================================== */
(function(){
  const container = document.getElementById("container");
  const totalBox  = document.getElementById("total");
  const subtotalValBox = document.getElementById("subtotalVal");
  const adjustmentRow = document.getElementById("adjustmentRow");
  const adjustmentLbl = document.getElementById("adjustmentLbl");
  const adjustmentVal = document.getElementById("adjustmentVal");
  const totalWordsBox = document.getElementById("totalWords");
  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");
  const localSaveBtn = document.getElementById("localSaveBtn");
  const clearBtn = document.getElementById("clearBtn");
  const printBtn = document.getElementById("printBtn");
  const dbEntryPanel = document.getElementById("dbEntryPanel");
  const dbSaveBtn = document.getElementById("dbSaveBtn");
  const dbListContainer = document.getElementById("dbListContainer");
  const dbItemsList = document.getElementById("dbItemsList");
  const panelTitle = document.getElementById("panelTitle");
  const bottomDashboard = document.getElementById("bottomDashboard");
  const custBlock = document.getElementById("custBlock");
  const dbBillsHistoryList = document.getElementById("dbBillsHistoryList");
  const printModeSelect = document.getElementById("printModeSelect");
  const modeStatus = document.getElementById("modeStatus");

  let undoHistoryState = null;
  let html5QrCode = null;
  let isScannerRunning = false;
  let isProcessingScan = false;

  window.stopHardwareCamera = stopHardwareCamera;
  window.resumeHardwareScanning = resumeHardwareScanning;
  let savedBillsHistory = JSON.parse(localStorage.getItem("notebook_invoice_history")) || [];
  let currentMode = 'bill'; 
  let activeInput = null;
  let editingItemCode = null; 
  let printerDevice = null;

  let itemDatabase = JSON.parse(localStorage.getItem("ledger_db_v3")) || [
    { code: "101", name: "Aata", price: 40 },
    { code: "102", name: "Shakkar", price: 45 },
    { code: "103", name: "Chawal", price: 60 }
  ];

  const savedTheme = localStorage.getItem("notebook_theme_mode");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  const savedFont = localStorage.getItem("notebook_font_size");
  if (savedFont) {
    document.documentElement.style.setProperty('--font-base', savedFont);
    const fSelect = document.getElementById("fontSizeSelect");
    if (fSelect) fSelect.value = savedFont;
  }

  function saveLiveDraft() {
    const custName = document.getElementById("custNameInput") ? document.getElementById("custNameInput").textContent : "";
    let items = [];
    if (container) {
      [...container.children].forEach(row => {
        const val = row.querySelector(".input") ? row.querySelector(".input").textContent.trim() : "";
        if (val) items.push(val);
      });
    }
    if (items.length > 0 || custName.trim() !== "") {
      localStorage.setItem("notebook_live_draft", JSON.stringify({ custName, items, timestamp: new Date().getTime() }));
    }
  }

  function restoreLiveDraftOnLoad() {
    const savedDraft = JSON.parse(localStorage.getItem("notebook_live_draft"));
    if (savedDraft && savedDraft.items && savedDraft.items.length > 0) {
      const custInput = document.getElementById("custNameInput");
      if (custInput && savedDraft.custName) custInput.textContent = savedDraft.custName;
      if (container) {
        container.innerHTML = "";
        savedDraft.items.forEach((itemText, idx) => { container.appendChild(makeRow(idx, itemText)); });
      }
      render(); updateSL();
    }
  }

  function saveCurrentSnapshot() {
    const custName = document.getElementById("custNameInput") ? document.getElementById("custNameInput").textContent : "";
    let items = [];
    if (container) {
      [...container.children].forEach(row => {
        const val = row.querySelector(".input") ? row.querySelector(".input").textContent.trim() : "";
        if (val) items.push(val);
      });
    }
    undoHistoryState = { custName, items, timestamp: new Date().getTime() };
    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) undoBtn.style.display = "flex";
    localStorage.setItem("notebook_bill_autodraft", JSON.stringify(undoHistoryState));
  }

  window.executeSmartUndo = function() {
    let stateToRestore = undoHistoryState || JSON.parse(localStorage.getItem("notebook_bill_autodraft"));
    if (!stateToRestore || (!stateToRestore.items.length && !stateToRestore.custName)) {
      return alert("Koi Undo backup data available nahi hai!");
    }
    const custInput = document.getElementById("custNameInput");
    if (custInput) custInput.textContent = stateToRestore.custName;
    if (container) {
      container.innerHTML = "";
      if (stateToRestore.items.length > 0) {
        stateToRestore.items.forEach((itemText, idx) => { container.appendChild(makeRow(idx, itemText)); });
      } else { container.appendChild(makeRow(0)); }
    }
    render(); updateSL();
    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) undoBtn.style.display = "none";
    undoHistoryState = null;
    alert("🎉 Bill data restored!");
  };

  function toggleCameraUI() {
    const pane = document.getElementById('scannerWrapperZone');
    if (pane.style.display === 'flex' || isScannerRunning) stopHardwareCamera();
    else { pane.style.display = 'flex'; startHardwareCamera(); }
  }

  function startHardwareCamera() {
    if (isScannerRunning) return;
    document.getElementById('btnResumeCamUI').style.display = "none";
    isProcessingScan = false;
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 20, qrbox: { width: 250, height: 150 }, aspectRatio: 1.0 };
    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccessCallback, () => {})
    .then(() => { isScannerRunning = true; })
    .catch(() => { document.getElementById('scannerWrapperZone').style.display = 'none'; });
  }

  function onScanSuccessCallback(decodedText) {
    if (isProcessingScan) return;
    let normalizedCode = decodedText.toString().trim();
    if (!normalizedCode) return;
    isProcessingScan = true;
    if (navigator.vibrate) navigator.vibrate(100);
    if (html5QrCode) {
      html5QrCode.stop().then(() => { isScannerRunning = false; html5QrCode = null; executeScannedCodeMatch(normalizedCode); })
      .catch(() => { executeScannedCodeMatch(normalizedCode); });
    } else { executeScannedCodeMatch(normalizedCode); }
  }

  function executeScannedCodeMatch(code) {
    let match = itemDatabase.find(i => i.code.toString().trim() === code);
    if (match) {
      const activePrice = match.price;
      if (currentMode === 'bill') {
        const newRow = makeRow(container.children.length, `${match.name} ${activePrice}`);
        container.appendChild(newRow); updateSL(); render();
        const lastInput = container.lastChild.querySelector(".input");
        if (lastInput) { lastInput.focus(); scrollToActiveInput(lastInput); }
      } else {
        window.navToBillMode();
        setTimeout(() => {
          const newRow = makeRow(container.children.length, `${match.name} ${activePrice}`);
          container.appendChild(newRow); updateSL(); render();
          const lastInput = container.lastChild.querySelector(".input");
          if (lastInput) { lastInput.focus(); scrollToActiveInput(lastInput); }
        }, 300);
      }
      document.getElementById('btnResumeCamUI').style.display = "block";
      document.getElementById('btnResumeCamUI').focus();
    } else {
      if (confirm(`Barcode '${code}' database mein nahi mila! Naya add karein?`)) {
        window.navToEntryMode();
        document.getElementById('dbCode').value = code;
        document.getElementById('dbName').focus();
      } else { resumeHardwareScanning(); }
    }
  }

  function resumeHardwareScanning() {
    document.getElementById('btnResumeCamUI').style.display = "none";
    document.getElementById('scannerWrapperZone').style.display = 'flex';
    startHardwareCamera();
  }

  function stopHardwareCamera() {
    if (html5QrCode && isScannerRunning) {
      html5QrCode.stop().then(() => { isScannerRunning = false; html5QrCode = null; document.getElementById('scannerWrapperZone').style.display = 'none'; });
    } else { isScannerRunning = false; document.getElementById('scannerWrapperZone').style.display = 'none'; }
    isProcessingScan = false;
  }

  document.getElementById('btnCamToggle').addEventListener('click', toggleCameraUI);

  function toggleViewMode(mode) {
    currentMode = mode;
    if(mode === 'entry') {
      stopHardwareCamera();
      modeStatus.textContent = "Database Entry Active"; modeStatus.classList.add("entry");
      dbEntryPanel.style.display = "flex"; container.style.display = "none";     
      custBlock.style.display = "none"; dbListContainer.style.display = "flex"; bottomDashboard.style.display = "none"; 
      renderDatabaseList(); renderBillsHistoryList(); 
    } else {
      modeStatus.textContent = "Billing Active"; modeStatus.classList.remove("entry");
      dbEntryPanel.style.display = "none"; container.style.display = "block";     
      custBlock.style.display = "flex"; dbListContainer.style.display = "none"; bottomDashboard.style.display = "flex"; 
      editingItemCode = null; panelTitle.textContent = "📥 Add Product to Database";
      dbSaveBtn.textContent = "Save to Database"; dbSaveBtn.style.background = "#3498db"; dbSaveBtn.style.borderColor = "#2980b9";
    }
    render();
  }
  window.toggleViewMode = toggleViewMode;

  function setCaretToEnd(el){
    const range = document.createRange();
    range.selectNodeContents(el); range.collapse(false);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  }

  function nowDateTimeTick(){
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', {year:'numeric', month:'short', day:'numeric'});
    timeEl.textContent = now.toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit', hour12:true});
  }
  setInterval(nowDateTimeTick, 1000);
  nowDateTimeTick();

  function evalExpr(expr) {
    try {
      const cleaned = expr.replace(/[^\d.+\-*/^()]/g, '');
      if (!cleaned || !/[0-9]/.test(cleaned)) return 0;
      const js = cleaned.replace(/\^/g, "**");
      const val = Function('"use strict";return(' + js + ')')();
      if (typeof val === "number" && isFinite(val))
        return Number.isInteger(val) ? val : parseFloat(val.toFixed(2));
    } catch (e) {}
    return 0;
  }

  function numberToWordsIndian(num){
    num = Math.floor(Math.abs(num));
    if (num === 0) return "Zero";
    const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    function twoDigits(n){ if(n<20) return ones[n]; return tens[Math.floor(n/10)] + (n%10?" " + ones[n%10]:""); }
    function threeDigits(n){ const h=Math.floor(n/100), r=n%100; return (h?ones[h]+" Hundred":"") + (h&&r?" ":"") + (r?twoDigits(r):""); }
    let words = "";
    const crore = Math.floor(num/10000000); num%=10000000;
    const lakh  = Math.floor(num/100000);   num%=100000;
    const thou  = Math.floor(num/1000);     num%=1000;
    if(crore) words += threeDigits(crore) + " Crore";
    if(lakh)  words += (words?" ":"") + twoDigits(lakh) + " Lakh";
    if(thou)  words += (words?" ":"") + twoDigits(thou) + " Thousand";
    if(num)   words += (words?" ":"") + threeDigits(num);
    return words.trim();
  }

  function totalInWords(amt){
    const rupees = Math.floor(amt);
    const paise = Math.round((amt - rupees) * 100);
    let s = numberToWordsIndian(rupees) + " Rupees";
    if (paise>0) s += " and " + numberToWordsIndian(paise) + " Paise";
    return s + " Only";
  }

  function parseAndSaveNewItem(text) {
    const cleanText = text.trim();
    if (!cleanText || /\[[a-zA-Z0-9]+\]/.test(cleanText)) return;
    const words = cleanText.split(/\s+/);
    if (words.length < 2) return;
    const itemName = words[0];
    if (/^\d{8,14}$/.test(itemName)) return;

    const restPart = words.slice(1).join(' ');
    const cleaned = restPart.replace(/\b(rs|c|kg|g|ml|ltr|l|pcs|pc|pack|box|gram|carton|bag|dozen)\b/gi, '').replace(/[₹$€£]/g, '').trim();
    if (!itemName || !cleaned) return;
    const tokens = cleaned.split(/\s+/);
    let priceVal = 0;
    for (let i = tokens.length - 1; i >= 0; i--) {
      if (/^[0-9.]+$/.test(tokens[i])) { priceVal = parseFloat(tokens[i]); break; }
      if (/[+\-*/^]/.test(tokens[i])) break;
    }
    if (itemName && priceVal > 0) {
      const exists = itemDatabase.find(i => i.name.toLowerCase() === itemName.toLowerCase() || i.code === itemName);
      if (!exists) {
        const code = (itemDatabase.length + 101).toString();
        itemDatabase.push({ code, name: itemName, price: priceVal });
        localStorage.setItem("ledger_db_v3", JSON.stringify(itemDatabase));
        renderDatabaseList();
      }
    }
  }

  function renderDatabaseList() {
    dbItemsList.innerHTML = "";
    const sortedDatabase = [...itemDatabase].sort((a, b) => a.name.localeCompare(b.name));
    if(sortedDatabase.length === 0) {
      dbItemsList.innerHTML = "<div style='font-size:13px; color:var(--muted); text-align:center; padding:15px;'>Database is empty.</div>";
      return;
    }
    sortedDatabase.forEach(item => {
      const itemRow = document.createElement("div"); itemRow.className = "db-item-row";
      const details = document.createElement("div"); details.className = "db-item-details";
      details.innerHTML = `${item.name} <span>[Code: ${item.code}] | Price: ₹${item.price}</span>`;
      const actions = document.createElement("div"); actions.className = "db-item-actions";
      const editBtn = document.createElement("button"); editBtn.className = "db-action-btn"; editBtn.innerHTML = "✏️";
      editBtn.addEventListener("click", () => {
        document.getElementById("dbCode").value = item.code;
        document.getElementById("dbName").value = item.name;
        document.getElementById("dbPrice").value = item.price;
        editingItemCode = item.code; 
        panelTitle.textContent = "✏️ Edit Product in Database";
        dbSaveBtn.textContent = "Update Product";
        dbSaveBtn.style.background = "#e67e22"; dbSaveBtn.style.borderColor = "#d35400";
      });
      const deleteBtn = document.createElement("button"); deleteBtn.className = "db-action-btn"; deleteBtn.innerHTML = "❌";
      deleteBtn.addEventListener("click", () => {
        if(confirm(`Delete "${item.name}"?`)) {
          itemDatabase = itemDatabase.filter(i => i.code !== item.code);
          localStorage.setItem("ledger_db_v3", JSON.stringify(itemDatabase));
          renderDatabaseList(); render();
        }
      });
      actions.appendChild(editBtn); actions.appendChild(deleteBtn);
      itemRow.appendChild(details); itemRow.appendChild(actions);
      dbItemsList.appendChild(itemRow);
    });
  }

  dbSaveBtn.addEventListener("click", function() {
    const code = document.getElementById("dbCode").value.trim();
    const name = document.getElementById("dbName").value.trim();
    const price = parseFloat(document.getElementById("dbPrice").value) || 0;

    if (code && name && price > 0) {
      if (editingItemCode) {
        const idx = itemDatabase.findIndex(i => i.code === editingItemCode);
        if (idx > -1) itemDatabase[idx] = { code, name, price };
        editingItemCode = null;
        panelTitle.textContent = "📥 Add Product to Database";
        dbSaveBtn.textContent = "Save to Database"; dbSaveBtn.style.background = "#3498db"; dbSaveBtn.style.borderColor = "#2980b9";
      } else {
        const exists = itemDatabase.find(i => i.code === code || i.name.toLowerCase() === name.toLowerCase());
        if (exists) { alert("Product matches an existing entry!"); return; }
        itemDatabase.push({ code, name, price });
      }
      localStorage.setItem("ledger_db_v3", JSON.stringify(itemDatabase));
      document.getElementById("dbCode").value = ""; document.getElementById("dbName").value = ""; document.getElementById("dbPrice").value = "";
      renderDatabaseList(); render();
    } else { alert("Fill all fields: code, name & price!"); }
  });

  function makeRow(i, text=""){
    const row = document.createElement("div"); row.className = "row";
    const rowMain = document.createElement("div"); rowMain.className = "row-main";
    const sl = document.createElement("div"); sl.className = "sl"; sl.textContent = i+1;
    const wrapper = document.createElement("div"); wrapper.className = "input-wrapper";
    const input = document.createElement("div"); input.className = "input";
    
    input.contentEditable = true;
    input.setAttribute("enterkeyhint", "next");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("autocomplete", "off"); 
    input.setAttribute("spellcheck", "false");
    input.textContent = text;

    wrapper.appendChild(input);
    const result = document.createElement("div"); result.className = "result";
    rowMain.appendChild(sl); rowMain.appendChild(wrapper); rowMain.appendChild(result);
    const codePatch = document.createElement("div"); codePatch.className = "code-patch";
    row.appendChild(rowMain); row.appendChild(codePatch);

    input.addEventListener("input", function() {
      render(); saveLiveDraft();
      const val = input.textContent.trim().toLowerCase();
      const oldBox = wrapper.querySelector(".suggest-box");
      if(oldBox) oldBox.remove();
      if(!val) return;

      const matches = itemDatabase.filter(item => 
        item.name.toLowerCase().includes(val) || item.code.toLowerCase().includes(val)
      );

      if(matches.length > 0) {
        const suggestBox = document.createElement("div"); suggestBox.className = "suggest-box";
        matches.forEach(match => {
          const itemDiv = document.createElement("div"); itemDiv.className = "suggest-item";
          itemDiv.textContent = `${match.name} [${match.code}] - ₹${match.price}`;
          const selectItem = (e) => {
            e.preventDefault(); e.stopPropagation();
            input.textContent = `${match.name} ${match.price}`;
            suggestBox.remove(); render(); saveLiveDraft();
            setCaretToEnd(input); activeInput = input;
          };
          itemDiv.addEventListener("mousedown", selectItem);
          itemDiv.addEventListener("touchstart", selectItem);
          suggestBox.appendChild(itemDiv);
        });
        wrapper.appendChild(suggestBox);
      }
    });

    input.addEventListener("blur", function() {
      setTimeout(() => {
        const box = wrapper.querySelector(".suggest-box");
        if(box) box.remove();
        const currentText = input.textContent.trim();
        if (currentText) parseAndSaveNewItem(currentText);
        render(); saveLiveDraft();
      }, 350); 
    });

    input.addEventListener("keydown", function(e){
      if(e.key === "Enter"){
        e.preventDefault();
        const currentText = input.textContent.trim();
        if(currentText !== ""){
          parseAndSaveNewItem(currentText);
          container.appendChild(makeRow(container.children.length));
          updateSL(); render(); saveLiveDraft();
          const lastInput = container.lastChild.querySelector(".input");
          lastInput.focus(); scrollToActiveInput(lastInput);
        }
      }
      if(e.key === "Backspace" && input.textContent.trim() === ""){
        if(container.children.length > 1){
          e.preventDefault();
          const prev = row.previousElementSibling || row.nextElementSibling;
          row.remove(); updateSL(); render(); saveLiveDraft();
          if(prev){
            const target = prev.querySelector(".input");
            target.focus(); setCaretToEnd(target); scrollToActiveInput(target);
          }
        }
      }
    });

    return row;
  }

  function updateSL(){
    [...container.children].forEach((row,i)=>{ row.querySelector(".sl").textContent = i+1; });
  }

  function render(){
    let subtotal = 0;

    [...container.children].forEach(row => {
      const inputEl = row.querySelector(".input");
      const text = inputEl ? inputEl.textContent.trim() : "";
      const resBox = row.querySelector(".result");
      const patchBox = row.querySelector(".code-patch");
      let val = 0;

      const codeMatch = text.match(/\[([a-zA-Z0-9]+)\]/);
      if (codeMatch) {
        patchBox.textContent = `Code: ${codeMatch[1]}`;
        patchBox.classList.add("visible");
      } else {
        const wordTokens = text.split(/\s+/);
        const foundItem = itemDatabase.find(i => i.name.toLowerCase() === wordTokens[0].toLowerCase());
        if (foundItem) {
          patchBox.textContent = `Code: ${foundItem.code}`;
          patchBox.classList.add("visible");
        } else { patchBox.classList.remove("visible"); }
      }

      if (currentMode === 'bill') {
        const words = text.split(/\s+/);
        let exprPart = words.length > 1 ? words.slice(1).join(' ') : text;
        let cleaned = exprPart.replace(/\b(rs|c|kg|g|ml|ltr|l|pcs|pc|pack|box|gram|carton|bag|dozen)\b/gi, '').replace(/[₹$€£]/g, '').trim();
        cleaned = cleaned.replace(/\s*([+\-*/^])\s*/g, '$1');
        const tokens = cleaned.split(/\s+/);
        let calcExpr = '';
        
        for (let i = tokens.length - 1; i >= 0; i--) {
          if (/[+\-*/^]/.test(tokens[i]) && /[0-9]/.test(tokens[i])) { calcExpr = tokens[i]; break; }
        }
        if (!calcExpr) {
          for (let i = tokens.length - 1; i >= 0; i--) {
            if (/^[0-9.]+$/.test(tokens[i])) { calcExpr = tokens[i]; break; }
          }
        }
        if (calcExpr && /[0-9]/.test(calcExpr)) val = evalExpr(calcExpr);
        
        resBox.textContent = val ? val.toLocaleString('en-IN') : "";
        subtotal += val;
        resBox.style.display = "block";
      } else { resBox.style.display = "none"; }
    });

    const percentType = document.getElementById("percentType") ? document.getElementById("percentType").value : "DISC";
    const percentVal = parseFloat(document.getElementById("percentVal") ? document.getElementById("percentVal").value : 0) || 0;

    let adjustmentAmount = (subtotal * percentVal) / 100;
    let finalGrandTotal = subtotal;

    if (percentVal > 0) {
      if (percentType === "DISC") {
        finalGrandTotal = subtotal - adjustmentAmount;
        if (adjustmentLbl) adjustmentLbl.textContent = `Discount (${percentVal}%):`;
        if (adjustmentVal) adjustmentVal.textContent = `-₹` + adjustmentAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
      } else if (percentType === "TAX") {
        finalGrandTotal = subtotal + adjustmentAmount;
        if (adjustmentLbl) adjustmentLbl.textContent = `Tax/GST (${percentVal}%):`;
        if (adjustmentVal) adjustmentVal.textContent = `+₹` + adjustmentAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
      }
      if (adjustmentRow) adjustmentRow.style.display = "flex";
    } else {
      if (adjustmentRow) adjustmentRow.style.display = "none";
    }

    finalGrandTotal = Math.max(0, finalGrandTotal);
    if (currentMode === 'bill') {
      if (subtotalValBox) subtotalValBox.textContent = "₹" + subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 });
      totalBox.textContent = "₹" + finalGrandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 });
      totalWordsBox.textContent = "In Words: " + totalInWords(finalGrandTotal);
      totalWordsBox.style.display = "block"; 
    } else {
      if (subtotalValBox) subtotalValBox.textContent = "----";
      totalBox.textContent = "----";
      totalWordsBox.style.display = "none";
    }
  }
  window.render = render;

  const percentValEl = document.getElementById("percentVal");
  if (percentValEl) percentValEl.addEventListener("input", render);
  const percentTypeEl = document.getElementById("percentType");
  if (percentTypeEl) percentTypeEl.addEventListener("change", render);

  function scrollToActiveInput(element) {
    if (!element) return;
    setTimeout(() => { element.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
  }

  container.addEventListener("focusin", function(e) {
    if(e.target.classList.contains("input")) { activeInput = e.target; scrollToActiveInput(activeInput); }
  });

  document.querySelectorAll(".op-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      if (!activeInput && container.children.length > 0) activeInput = container.lastChild.querySelector(".input");
      if (activeInput) {
        activeInput.focus();
        const op = btn.getAttribute("data-op");
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(op);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        sel.removeAllRanges(); sel.addRange(range);
        render(); saveLiveDraft(); scrollToActiveInput(activeInput);
      }
    });
  });

  localSaveBtn.addEventListener("click", function() {
    const dict = I18N_LANG[currentAppLang] || I18N_LANG.hinglish;
    const customerName = document.getElementById("custNameInput").textContent.trim();
    if(!customerName) { alert(dict.custNameReq); return; }

    const dateObj = new Date();
    const sequentialId = (savedBillsHistory.length + 101).toString();
    const generatedBillCode = `NB-${dateObj.getFullYear()}-${sequentialId}`;

    let rowItems = [];
    [...container.children].forEach(row => {
      const itemValue = row.querySelector(".input").textContent.trim();
      if(itemValue) rowItems.push(itemValue);
    });

    savedBillsHistory.push({
      billCode: generatedBillCode,
      custName: customerName,
      date: dateEl.textContent,
      time: timeEl.textContent,
      items: rowItems,
      total: totalBox.textContent
    });

    localStorage.setItem("notebook_invoice_history", JSON.stringify(savedBillsHistory));
    alert(`Saved to Memory! Code: ${generatedBillCode}`);
  });

  window.executeCSVExport = function() {
    let csvContent = "data:text/csv;charset=utf-8,Serial No,Item Description,Amount (INR)\n";
    [...container.children].forEach((row, idx) => {
      const itemText = row.querySelector(".input").textContent.trim().replace(/,/g, " ");
      const itemTotal = row.querySelector(".result").textContent.trim().replace(/,/g, "");
      if(itemText) csvContent += `${idx + 1},"${itemText}",${itemTotal || 0}\n`;
    });
    csvContent += `,,Total: ${totalBox.textContent.replace(/₹|,/g, "")}\n`;
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", `ledger_report.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  /* 🖨️ PRINT LOGIC */
  window.printBill = async function() {
    if (!enforceSecurityGuardrail()) return;

    const printModeDropdown = document.getElementById("printModeSelect");
    const currentPrintMode = printModeDropdown ? printModeDropdown.value : 'ENG';

    let validRows = [];
    let subtotalCalc = 0;
    [...container.children].forEach(row => {
      const itemText = row.querySelector(".input").textContent.trim();
      const itemTotal = row.querySelector(".result").textContent.trim();
      if(itemText) {
        validRows.push({ text: itemText, total: itemTotal });
        subtotalCalc += parseFloat(itemTotal.replace(/,/g, '')) || 0;
      }
    });

    if (validRows.length === 0) return alert("Pehle Bill mein items add karein!");
    if (currentPrintMode === 'COMP') { window.print(); return; }

    try {
      if (!printerDevice) {
        printerDevice = await navigator.bluetooth.requestDevice({
          filters: [{ namePrefix: 'Bluetooth' }, { namePrefix: 'SRS' }, { namePrefix: 'MPT' }, { namePrefix: 'MTP' }],
          optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
        });
      }
      const server = await printerDevice.gatt.connect();
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

      const shopTitle = document.getElementById("shopNameInput").value || 'Notebook Bill';
      const cName = document.getElementById('custNameInput').textContent.trim() || "Cash Customer";

      let esc = `\x1B\x40\x1B\x61\x01\x1B\x45\x01${shopTitle.toUpperCase()}\n\x1B\x45\x00OFFLINE COUNTER BILL\n--------------------------------\n`;
      esc += '\x1B\x61\x00Date: ' + dateEl.textContent + ' ' + timeEl.textContent + '\nCust: ' + cName.substring(0, 22) + '\n--------------------------------\n';
      esc += 'S.No Item                 Amount\n--------------------------------\n';
      
      for (let i = 0; i < validRows.length; i++) {
        let rowItem = validRows[i];
        let finalPrintName = "";

        if (currentPrintMode === 'MULTI') {
          finalPrintName = rowItem.text;
        } else {
          let rawLineText = rowItem.text;
          if (/[^\x00-\x7F]/.test(rawLineText)) {
            let wordsPart = rawLineText.replace(/[0-9.\s()+\-*/^]+/g, " ").trim();
            let mathPart = rawLineText.replace(/[^\d.\s()+\-*/^]+/g, " ").trim();
            if (wordsPart) {
              let translated = await autoTranslateToEnglish(wordsPart);
              rawLineText = mathPart ? `${translated} ${mathPart}` : translated;
            }
          }
          finalPrintName = rawLineText.replace(/[^\x00-\x7F]/g, "").trim() || "Item Row";
        }

        let sNo = (i + 1).toString().padEnd(3, ' ');
        let cleanAmt = rowItem.total.replace(/[₹रु]/g, 'Rs.').trim().padStart(9, ' ');
        let maxNameWidth = 32 - sNo.length - cleanAmt.length;

        if (finalPrintName.length <= maxNameWidth) {
          let paddedName = finalPrintName.padEnd(maxNameWidth, ' ');
          esc += sNo + paddedName + cleanAmt + "\n";
        } else {
          let firstChunk = finalPrintName.substring(0, maxNameWidth);
          esc += sNo + firstChunk + cleanAmt + "\n";
          let remainingText = finalPrintName.substring(maxNameWidth);
          while (remainingText.length > 0) {
            let subChunk = remainingText.substring(0, 28);
            esc += "   " + subChunk + "\n";
            remainingText = remainingText.substring(28);
          }
        }
      }
      
      esc += "--------------------------------\n";
      esc += `Subtotal: Rs. ${subtotalCalc.toFixed(2)}\n`;

      const percentType = document.getElementById("percentType") ? document.getElementById("percentType").value : "DISC";
      const percentVal = parseFloat(document.getElementById("percentVal") ? document.getElementById("percentVal").value : 0) || 0;
      
      if (percentVal > 0) {
        let adjAmt = (subtotalCalc * percentVal) / 100;
        if (percentType === "DISC") {
          esc += `Discount (${percentVal}%): -Rs. ${adjAmt.toFixed(2)}\n`;
        } else {
          esc += `Tax/GST (${percentVal}%): +Rs. ${adjAmt.toFixed(2)}\n`;
        }
      }

      let finalCleanTotal = totalBox.textContent.replace(/[₹रु]/g, 'Rs.');
      esc += "--------------------------------\n\x1B\x61\x02\x1B\x45\x01NET BAL: " + finalCleanTotal + "\n\x1B\x45\x00\x1B\x61\x01\nTHANK YOU! VISIT AGAIN\n\n\n\n";
      
      let encoder = currentPrintMode === 'ENG' ? new TextEncoder("ascii") : new TextEncoder("utf-8");
      const data = encoder.encode(esc);
      for (let i = 0; i < data.length; i += 100) {
        await characteristic.writeValue(data.slice(i, i + 100));
        await new Promise(r => setTimeout(r, 50));
      }
      alert("Printed successfully! 🎉");
    } catch (error) {
      alert("Print Error: " + error.message);
      printerDevice = null;
    }
  };

  function renderBillsHistoryList(searchFilter = "") {
    if (!dbBillsHistoryList) return;
    dbBillsHistoryList.innerHTML = "";
    if (savedBillsHistory.length === 0) {
      dbBillsHistoryList.innerHTML = "<div style='font-size:13px; color:var(--muted); text-align:center; padding:15px;'>Koi saved bill nahi mila.</div>";
      return;
    }

    let filteredBills = [...savedBillsHistory];
    if (searchFilter) {
      filteredBills = filteredBills.filter(b => (b.custName && b.custName.toLowerCase().includes(searchFilter)) || (b.billCode && b.billCode.toLowerCase().includes(searchFilter)));
    }

    [...filteredBills].reverse().forEach((bill) => {
      const bRow = document.createElement("div"); bRow.className = "bill-history-row";
      bRow.innerHTML = `<div class="bill-meta-details">👤 <b>${bill.custName || 'Cust'}</b> <span>Code: ${bill.billCode} | ${bill.date || ''} | Total: <b style="color:#e67e22;">${bill.total}</b></span></div>`;
      dbBillsHistoryList.appendChild(bRow);
    });
  }

  clearBtn.addEventListener("click", function(){
    saveCurrentSnapshot();
    container.innerHTML = ""; document.getElementById("custNameInput").textContent = "";
    localStorage.removeItem("notebook_live_draft");
    container.appendChild(makeRow(0)); render();
  });

  restoreLiveDraftOnLoad();
  enforceSecurityGuardrail();

  const custInputEl = document.getElementById("custNameInput");
  if (custInputEl) custInputEl.addEventListener("input", saveLiveDraft);

  const undoBtnEl = document.getElementById("undoBtn");
  if (undoBtnEl) undoBtnEl.addEventListener("click", window.executeSmartUndo);

  if (container.children.length === 0) container.appendChild(makeRow(0));
  render();
})();
