document.addEventListener('DOMContentLoaded', () => {
  console.log('Togel AI V3 - Loaded');

  /* =====================
     SHORTCUT
  ====================== */
  const qs  = s => document.querySelector(s);
  const qsa = s => document.querySelectorAll(s);

  /* =====================
     LIVE STATS & COUNTERS - ★★★★ TAMBAH INI DI SINI ★★★★
  ====================== */
  
  // Data sources untuk rotate
  const dataSources = [
    "5,247+ Situs",
    "15 Tahun Data", 
    "200+ Pasaran",
    "1M+ Kombinasi",
    "87.4% Accuracy",
    "Real-time Update"
  ];
  
  // Function untuk update live user count
  function updateLiveUserCount() {
    const userCountEl = document.getElementById('liveUserCount');
    if (!userCountEl) return;
    
    const baseUsers = 1247;
    const randomIncrement = Math.floor(Math.random() * 50);
    const currentUsers = baseUsers + randomIncrement;
    
    userCountEl.textContent = currentUsers.toLocaleString('id-ID');
    
    // Little animation
    userCountEl.style.transform = 'scale(1.1)';
    userCountEl.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
      userCountEl.style.transform = 'scale(1)';
    }, 300);
  }
  
  // Function untuk rotate data points
  function rotateDataPoints() {
    const dataPointsEl = document.getElementById('dataPoints');
    if (!dataPointsEl) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
      dataPointsEl.textContent = dataSources[currentIndex];
      
      // Fade animation
      dataPointsEl.style.opacity = '0.5';
      dataPointsEl.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        dataPointsEl.style.opacity = '1';
      }, 500);
      
      currentIndex = (currentIndex + 1) % dataSources.length;
    }, 4000); // Ganti setiap 4 detik
  }
  
  // Function untuk random accuracy fluctuation
  function updateAccuracy() {
    const accuracyEl = document.getElementById('accuracyRate');
    if (!accuracyEl) return;
    
    const baseAccuracy = 87.4;
    const fluctuation = (Math.random() * 0.6) - 0.3; // -0.3 to +0.3
    const newAccuracy = (baseAccuracy + fluctuation).toFixed(1);
    
    accuracyEl.textContent = `${newAccuracy}%`;
    
    // Color change based on fluctuation
    if (fluctuation > 0) {
      accuracyEl.style.color = '#10b981'; // Green if up
    } else if (fluctuation < 0) {
      accuracyEl.style.color = '#f59e0b'; // Orange if down
    }
  }
  
  // Function untuk update market count dengan time-based
  function updateMarketCount() {
    const marketEl = document.getElementById('marketCount');
    if (!marketEl) return;
    
    const now = new Date();
    const hour = now.getHours();
    let marketCount = 200;
    
    // Peak hours ada lebih banyak pasaran buka
    if (hour >= 19 && hour <= 23) {
      marketCount = 215 + Math.floor(Math.random() * 15);
    } else if (hour >= 11 && hour <= 14) {
      marketCount = 205 + Math.floor(Math.random() * 10);
    } else {
      marketCount = 200 + Math.floor(Math.random() * 20);
    }
    
    marketEl.textContent = `${marketCount}+`;
  }
  
  // Initialize semua live stats
  function initLiveStats() {
    // Update pertama kali
    updateLiveUserCount();
    updateAccuracy();
    updateMarketCount();
    rotateDataPoints();
    
    // Update user count setiap 30 detik
    setInterval(updateLiveUserCount, 30000);
    
    // Update accuracy setiap 45 detik
    setInterval(updateAccuracy, 45000);
    
    // Update market count setiap 60 detik
    setInterval(updateMarketCount, 60000);
  }
  
  // Panggil init setelah DOM loaded
  initLiveStats();

  /* =====================
     CLEANUP FUNCTION
  ====================== */
const cleanupAllIntervals = () => {
  console.log('Cleaning up all intervals...');
  
  // Clear processing interval
  if (window.processingInterval) {
    clearInterval(window.processingInterval);
    window.processingInterval = null;
    console.log('Cleared processingInterval');
  }
  
  // Clear any other intervals
  const highestIntervalId = setTimeout(() => {}, 0);
  for (let i = 1; i < highestIntervalId; i++) {
    clearInterval(i);
  }
  
  // Remove edu section
  const eduSection = qs('#eduRotating');
  if (eduSection && eduSection.parentNode) {
    eduSection.parentNode.removeChild(eduSection);
    console.log('Removed edu section');
  }
};
    
 /* =====================
     PAGE NAV
  ====================== */
 const showPage = id => {
  // CLEANUP FIRST
  cleanupAllIntervals();
  
  // HIDE ALL PAGES
  qsa('.section').forEach(p => p.classList.add('hidden'));
  
  // SHOW TARGET PAGE
  const el = qs('#' + id);
  if (el) {
    el.classList.remove('hidden');
    console.log('Showing page:', id);
  }
  
  // SCROLL TO TOP
  window.scrollTo(0, 0);
};

  /* =====================
     UTIL FUNCTIONS
  ====================== */
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();
  
  const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const hasValidDups = (digits, maxDuplicates) => {
    const count = {};
    digits.forEach(d => {
      count[d] = (count[d] || 0) + 1;
    });
    return Math.max(...Object.values(count)) <= maxDuplicates;
  };

  /* =====================
     STATE - MUST MATCH SHARE FUNCTIONS STRUCTURE
  ====================== */
  const userData = {
    feeling: '',
    history: [],
    bbfs: '',  // ← NAMA INI HARUS 'bbfs' BUKAN 'bbfs7d'
    ladder: {  // ← STRUCTURE INI HARUS SAMA
      bbfs6d: [],
      bbfs5d: []
    },
    results: {  // ← STRUCTURE INI HARUS SAMA
      set4d: [],
      set3d: [],
      set2d: [],
      cb1d: [],
      cb2d: [],
      cb3d: []
    },
    pasaran: 'Singapore',
    timestamp: new Date(),
    sessionId: `PRED-${Date.now().toString(36).toUpperCase()}`
  };

  // Buat userData bisa diakses global oleh share functions
  window.userData = userData;

  /* =====================
     GENERATION FUNCTIONS - NEW RULES
  ====================== */

/* ★★★★ TAMBAH INI DI SINI ★★★★ */
const eduFacts = [
  { emoji: "⏰", text: "Di Indonesia, ada draw togel SETIAP JAM dari pagi sampai tengah malam" },
  { emoji: "🏪", text: "Lebih dari 200 pasaran aktif: Singapore, HK, Sydney, Macau, dll" },
  { emoji: "🧠", text: "AI analisis 1 juta pola angka dalam 0.3 detik - lebih cepat dari kedipan mata" },
  { emoji: "📈", text: "Statistik 5 tahun: Angka 7 & 8 muncul 23% lebih sering di Asia" },
  { emoji: "🎲", text: "Peluang tebak 4D tepat: 1:10,000 | Dengan AI: meningkat 874x" },
  { emoji: "🔢", text: "Fakta unik: 70% pemenang menggunakan kombinasi angka acak, bukan tanggal lahir" },
  { emoji: "🌙", text: "Pukul 23:00 WIB adalah jam draw terbanyak - 15 pasaran sekaligus!" },
  { emoji: "💡", text: "Tips: Kombinasi genap-ganjil memiliki peluang 68% lebih baik" },
  { emoji: "⚡", text: "Neural network V3.7 accuracy: 87.4% untuk prediksi pola 4D" },
  { emoji: "🔄", text: "AI update data realtime setiap 5 menit dari 15 server global" },
  { emoji: "🎯", text: "Angka 'tengah' (3,4,5,6) muncul 22% lebih sering di result resmi" },
  { emoji: "🤖", text: "Sistem ini sudah menganalisis 5,247 hasil terverifikasi sejak 2008" }
];
/* ★★★★ SAMPAI SINI ★★★★ */

  // 1. GENERATE BBFS 7D (max 2 dups allowed)
  function generateBBFS7D() {
    console.log('Generating BBFS 7D...');
    let digits = [];
    let attempts = 0;
    
    // Generate 7 random digits
    while (digits.length < 7) {
      digits.push(getRandomDigit());
    }
    
    // Ensure max 2 duplicates (allow 2 dups max, no triple)
    while (!hasValidDups(digits, 2) && attempts < 50) {
      // Find digit with most duplicates
      const count = {};
      digits.forEach(d => { count[d] = (count[d] || 0) + 1; });
      
      const maxDuplicates = Math.max(...Object.values(count));
      if (maxDuplicates > 2) {
        // Replace one of the triple duplicates
        const problematicDigit = Object.keys(count).find(d => count[d] > 2);
        const index = digits.findIndex(d => d === problematicDigit);
        digits[index] = getRandomDigit();
      }
      attempts++;
    }
    
    // Shuffle final result
    const result = shuffle(digits).join('');
    console.log('BBFS 7D:', result);
    return result;
  }

  // 2. GENERATE BBFS 6D (from 7D, max 1 dup allowed)
  function generateBBFS6D(bbfs7d) {
    console.log('Generating BBFS 6D from:', bbfs7d);
    const digits = bbfs7d.split('');
    const results = [];
    
    // Generate 2 unique 6D combos
    while (results.length < 2) {
      const shuffled = shuffle([...digits]);
      const combo = shuffled.slice(0, 6).join('');
      
      // Check max 1 duplicate rule
      if (hasValidDups(combo.split(''), 1) && !results.includes(combo)) {
        results.push(combo);
      }
    }
    
    console.log('BBFS 6D results:', results);
    return results;
  }

  // 3. GENERATE BBFS 5D (from 7D, max 1 dup allowed)
  function generateBBFS5D(bbfs7d) {
    console.log('Generating BBFS 5D from:', bbfs7d);
    const digits = bbfs7d.split('');
    const results = [];
    
    // Generate 4 unique 5D combos
    while (results.length < 4) {
      const shuffled = shuffle([...digits]);
      const combo = shuffled.slice(0, 5).join('');
      
      // Check max 1 duplicate rule
      if (hasValidDups(combo.split(''), 1) && !results.includes(combo)) {
        results.push(combo);
      }
    }
    
    console.log('BBFS 5D results:', results);
    return results;
  }

  // 4. GENERATE 4D SET (12 results)
  function generate4DSet(bbfs7d) {
    console.log('Generating 4D Set from:', bbfs7d);
    const digits = bbfs7d.split('');
    const results = [];
    
    // Generate 12 unique 4D combos
    while (results.length < 12) {
      const shuffled = shuffle([...digits]);
      const combo = shuffled.slice(0, 4).join('');
      
      if (!results.includes(combo)) {
        results.push(combo);
      }
    }
    
    console.log('4D Set (12 results):', results);
    return results;
  }

  // 5. GENERATE 3D SET (12 results)
  function generate3DSet(bbfs7d) {
    console.log('Generating 3D Set from:', bbfs7d);
    const digits = bbfs7d.split('');
    const results = [];
    
    // Generate 12 unique 3D combos
    while (results.length < 12) {
      const shuffled = shuffle([...digits]);
      const combo = shuffled.slice(0, 3).join('');
      
      if (!results.includes(combo)) {
        results.push(combo);
      }
    }
    
    console.log('3D Set (12 results):', results);
    return results;
  }

  // 6. GENERATE 2D SET (24 results)
  function generate2DSet(bbfs7d) {
    console.log('Generating 2D Set from:', bbfs7d);
    const digits = bbfs7d.split('');
    const results = [];
    
    // Generate 24 unique 2D combos
    while (results.length < 24) {
      const shuffled = shuffle([...digits]);
      const combo = shuffled.slice(0, 2).join('');
      
      if (!results.includes(combo)) {
        results.push(combo);
      }
    }
    
    console.log('2D Set (24 results):', results);
    return results;
  }

  // 7. GENERATE COLOK SYSTEM
  function generateColokSystem(bbfs7d) {
    console.log('Generating Colok from:', bbfs7d);
    const digits = [...new Set(bbfs7d.split(''))]; // Unique digits
    
    // Colok 1D - take 3 unique digits
    const colok1d = shuffle(digits).slice(0, 3);
    
    // Colok 2D - combinations of colok1d
    const colok2d = [];
    for (let i = 0; i < colok1d.length; i++) {
      for (let j = i + 1; j < colok1d.length; j++) {
        colok2d.push(colok1d[i] + colok1d[j]);
      }
    }
    
    // Colok 3D - colok2d + random digit (no dups within number)
    const colok3d = [];
    colok2d.forEach(pair => {
      let addedDigit;
      do {
        addedDigit = digits[Math.floor(Math.random() * digits.length)];
      } while (pair.includes(addedDigit));
      
      // Create all permutations without duplicates
      const permutations = [
        pair + addedDigit,
        pair[0] + addedDigit + pair[1],
        addedDigit + pair
      ];
      
      // Pick one random permutation
      colok3d.push(permutations[Math.floor(Math.random() * permutations.length)]);
    });
    
    console.log('Colok 1D:', colok1d);
    console.log('Colok 2D:', colok2d);
    console.log('Colok 3D:', colok3d);
    
    return { colok1d, colok2d, colok3d };
  }

  /* =====================
     MAIN GENERATION FUNCTION
  ====================== */
  function generateAllPredictions() {
    console.log('=== GENERATING ALL PREDICTIONS ===');
    
    // Update pasaran from select
    const pasaranSelect = qs('select.clean-input');
    if (pasaranSelect) {
      userData.pasaran = pasaranSelect.value;
    }
    
    // 1. Generate BBFS 7D
    const bbfs7d = generateBBFS7D();
    userData.bbfs = bbfs7d;  // ← SIMPAN KE 'bbfs' BUKAN 'bbfs7d'
    
    // 2. Generate BBFS Ladders - SIMPAN KE STRUCTURE YANG BENAR
    userData.ladder.bbfs6d = generateBBFS6D(bbfs7d);
    userData.ladder.bbfs5d = generateBBFS5D(bbfs7d);
    
    // 3. Generate Main Predictions - SIMPAN KE STRUCTURE YANG BENAR
    userData.results.set4d = generate4DSet(bbfs7d);
    userData.results.set3d = generate3DSet(bbfs7d);
    userData.results.set2d = generate2DSet(bbfs7d);
    
    // 4. Generate Colok System - SIMPAN KE STRUCTURE YANG BENAR
    const colok = generateColokSystem(bbfs7d);
    userData.results.cb1d = colok.colok1d;
    userData.results.cb2d = colok.colok2d;
    userData.results.cb3d = colok.colok3d;
    
    // 5. Update timestamp
    userData.timestamp = new Date();
    
    console.log('=== GENERATION COMPLETE ===');
    console.log('Final userData:', userData);
  }

  /* =====================
     PROCESSING DRAMA THEATER
  ====================== */
function startEduRotation() {
  const eduContainer = qs('#page-processing');
  if (!eduContainer) return null;
  
  // Create educational section
  const eduSection = document.createElement('div');
  eduSection.className = 'educational-section';
  eduSection.id = 'eduRotating';
  
  // Insert after process-log
  const processLog = qs('#processLog');
  if (processLog) {
    processLog.parentNode.insertBefore(eduSection, processLog.nextSibling);
  } else {
    const progressSection = qs('.progress-section');
    if (progressSection) {
      progressSection.appendChild(eduSection);
    }
  }
  
  let factIndex = 0;
  let rotationInterval;
  
  function showFact() {
    const fact = eduFacts[factIndex];
    
    eduSection.innerHTML = `
      <div class="edu-title">📚 FAKTA TOGEL & AI</div>
      <div class="edu-content">
        <div class="edu-item">
          <div class="edu-emoji">${fact.emoji}</div>
          <div class="edu-text">${fact.text}</div>
        </div>
      </div>
      <div class="edu-counter">
        Fakta ${factIndex + 1}/${eduFacts.length} • Berganti setiap 4 detik
      </div>
    `;
    
    factIndex = (factIndex + 1) % eduFacts.length;
  }
  
  // Show first fact immediately
  showFact();
  
  // Rotate every 4 seconds
  rotationInterval = setInterval(showFact, 4000);
  
  // Return cleanup function
  return () => {
    clearInterval(rotationInterval);
    if (eduSection.parentNode) {
      eduSection.parentNode.removeChild(eduSection);
    }
  };
}

  function runProcessingDrama() {
  console.log('=== STARTING PROCESSING DRAMA ===');
  
  // CLEANUP FIRST
  cleanupAllIntervals();
  
  // 1. STOP ANY OLD INTERVAL FIRST
  if (window.processingInterval) {
    clearInterval(window.processingInterval);
    window.processingInterval = null;
  }
  
  // 2. SHOW PROCESSING PAGE
  showPage('page-processing');
  
  // 3. RESET UI ELEMENTS
  const fill = qs('#progressFill');
  const text = qs('#progressText');
  const log = qs('#processLog');
  
  if (!fill || !text || !log) {
    console.error('Processing elements not found');
    setTimeout(showResults, 500);
    return;
  }
  
  // Reset progress bar
  fill.style.width = '0%';
  text.textContent = 'Memulai analisis...';
  log.innerHTML = '';
  
  // 4. START EDU ROTATION
  const cleanupEdu = startEduRotation();
  
  // 5. DRAMA SCRIPT
  const dramaScript = [
    {
      percent: 15,
      text: "Mengakses database global...",
      log: `🔍 CONNECTING TO PREDICTION NETWORK...<br>✓ Connected to 15 servers worldwide`
    },
    {
      percent: 30,
      text: "Menganalisa pola 15 tahun data...",
      log: `📊 LOADING HISTORICAL DATA (2008-2024)...<br>✓ 5,247 hasil terverifikasi loaded`
    },
    {
      percent: 45,
      text: "Memindai trend bandar underground...",
      log: `🕵️ SCANNING BANDAR PATTERNS...<br>✓ 3 pola utama terdeteksi`
    },
    {
      percent: 60,
      text: "Menghitung probabilitas neural network...",
      log: `🧠 RUNNING AI MODEL v3.7...<br>✓ Neural network accuracy: 87.4%`
    },
    {
      percent: 75,
      text: "Memverifikasi dengan satellite data...",
      log: `🛰 CROSS-REFERENCING SATELLITE DATA...<br>✓ Atmospheric patterns analyzed`
    },
    {
      percent: 90,
      text: "Menyusun prediksi optimal...",
      log: `⚙️ GENERATING PREDICTION MATRIX...<br>✓ 67 angka kombinasi terpilih`
    },
    {
      percent: 100,
      text: "Prediksi siap!",
      log: `✅ PREDIKSI BERHASIL DIHASILKAN!<br>🎯 Ready for ${userData.pasaran} draw`
    }
  ];
  
  let currentStep = 0;
  
  // 6. CREATE NEW INTERVAL
  window.processingInterval = setInterval(() => {
    if (currentStep < dramaScript.length) {
      const step = dramaScript[currentStep];
      
      fill.style.width = step.percent + '%';
      text.textContent = step.text;
      
      // Add log with timestamp
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      const logLine = document.createElement('div');
      logLine.innerHTML = `[${timeStr}] ${step.log}`;
      logLine.style.cssText = 'margin-bottom: 8px; font-size: 12px; color: #666;';
      log.appendChild(logLine);
      
      // Auto scroll to bottom
      log.scrollTop = log.scrollHeight;
      
      currentStep++;
    } else {
      // 7. CLEANUP AND SHOW RESULTS
      clearInterval(window.processingInterval);
      window.processingInterval = null;
      
      if (cleanupEdu) cleanupEdu();
      
      console.log('=== PROCESSING COMPLETE ===');
      setTimeout(showResults, 800);
    }
  }, 1200);
  
  console.log('Processing interval started');
}

  /* =====================
     RENDER RESULTS PAGE
  ====================== */
 function showResults() {
  console.log('=== SHOWING RESULTS PAGE ===');
  
  try {
    // Cleanup first
    cleanupAllIntervals();
    
    // Generate predictions
    console.log('Generating predictions...');
    generateAllPredictions();
    
    // Show page
    console.log('Showing result page...');
    showPage('page-result');
    
    // Render results
    console.log('Rendering results...');
    renderResults();
    
    console.log('=== RESULTS PAGE COMPLETE ===');
    
  } catch (error) {
    console.error('Error in showResults():', error);
    
    // Emergency fallback
    showPage('page-result');
    
    // Show error
    const resultTitle = qs('#resultTitle');
    if (resultTitle) {
      resultTitle.textContent = 'Error - Silakan Generate Lagi';
    }
  }
}

  function renderResults() {
    console.log('Rendering results...');
    
    // Format date for display
    const now = userData.timestamp;
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dateStr = now.toLocaleDateString('id-ID', options);
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    // Update header
    qs('#resultTitle').textContent = `PREDIKSI ${userData.pasaran.toUpperCase()}`;
    qs('#resultDate').textContent = `${dateStr} • ${timeStr}`;
    
    // Helper: Create digit box WITH COLOR CLASS
const createDigitBox = (digit, size = 'medium', type = '7d') => {
  const box = document.createElement('div');
  
  if (size === 'small') {
    box.className = `bbfs-digit-small bbfs-${type}`; // bbfs-6d atau bbfs-5d
  } else {
    box.className = 'bbfs-digit'; // 7d sudah ada warna di CSS
  }
  
  box.textContent = digit;
  return box;
};
    
    // 1. Render BBFS 7D
    const bbfs7dBox = qs('#bbfs7dBox');
    if (bbfs7dBox) {
      bbfs7dBox.innerHTML = '';
      userData.bbfs.split('').forEach((digit, index) => {
        const box = createDigitBox(digit, 'large');
        box.style.animationDelay = `${index * 0.1}s`;
        bbfs7dBox.appendChild(box);
      });
    }
    
    // 2. Render BBFS 6D
    const bbfs6dBox = qs('#bbfs6dBox');
    if (bbfs6dBox) {
      bbfs6dBox.innerHTML = '';
      userData.ladder.bbfs6d.forEach((num, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'bbfs-ladder-row';
        
        num.split('').forEach((digit, digitIndex) => {
          const box = createDigitBox(digit, 'small', '6d');
          box.style.animationDelay = `${(rowIndex * 0.3) + (digitIndex * 0.1)}s`;
          rowDiv.appendChild(box);
        });
        
        bbfs6dBox.appendChild(rowDiv);
      });
    }
    
    // 3. Render BBFS 5D
    const bbfs5dBox = qs('#bbfs5dBox');
    if (bbfs5dBox) {
      bbfs5dBox.innerHTML = '';
      userData.ladder.bbfs5d.forEach((num, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'bbfs-ladder-row';
        
        num.split('').forEach((digit, digitIndex) => {
          const box = createDigitBox(digit, 'small', '5d');
          box.style.animationDelay = `${(rowIndex * 0.3) + (digitIndex * 0.1)}s`;
          rowDiv.appendChild(box);
        });
        
        bbfs5dBox.appendChild(rowDiv);
      });
    }
    
        // 4. HAPUS section titles yang lama (karena kita gak pakai #resMain lagi)
    // const set4dTitle = qs('#resMain')?.querySelector('div:nth-child(1) div:nth-child(1)');
    // if (set4dTitle) set4dTitle.textContent = '4D SET (12 PREDIKSI)';
    // 
    // const set3dTitle = qs('#resMain')?.querySelector('div:nth-child(2) div:nth-child(1)');
    // if (set3dTitle) set3dTitle.textContent = '3D JAGA (12 PREDIKSI)';
    // 
    // const set2dTitle = qs('#resMain')?.querySelector('div:nth-child(3) div:nth-child(1)');
    // if (set2dTitle) set2dTitle.textContent = '2D JAGA (24 PREDIKSI)';
    
    // 5. Render 4D SET - as small black circles
    const set4dContainer = qs('#set4d');
    if (set4dContainer) {
      set4dContainer.innerHTML = '';
      userData.results.set4d.forEach((num, index) => {
        const circle = document.createElement('div');
        circle.className = 'bbfs-digit-small';
        circle.textContent = num;
        circle.style.animationDelay = `${index * 0.1}s`;
        set4dContainer.appendChild(circle);
      });
    }
    
    // 6. Render 3D JAGA - as small black circles
    const set3dContainer = qs('#set3d');
    if (set3dContainer) {
      set3dContainer.innerHTML = '';
      userData.results.set3d.forEach((num, index) => {
        const circle = document.createElement('div');
        circle.className = 'bbfs-digit-small';
        circle.textContent = num;
        circle.style.animationDelay = `${index * 0.1}s`;
        set3dContainer.appendChild(circle);
      });
    }
    
    // 7. Render 2D JAGA - as small black circles
    const set2dContainer = qs('#set2d');
    if (set2dContainer) {
      set2dContainer.innerHTML = '';
      userData.results.set2d.forEach((num, index) => {
        const circle = document.createElement('div');
        circle.className = 'bbfs-digit-small';
        circle.textContent = num;
        circle.style.animationDelay = `${index * 0.1}s`;
        set2dContainer.appendChild(circle);
      });
    }
    
    // 8. Render COLOK 1D
    const cb1dContainer = qs('#cb1d');
    if (cb1dContainer) {
      cb1dContainer.innerHTML = '';
      userData.results.cb1d.forEach((num, index) => {
        const circle = document.createElement('div');
        circle.className = 'bbfs-digit-small';
        circle.textContent = num;
        circle.style.animationDelay = `${index * 0.1}s`;
        cb1dContainer.appendChild(circle);
      });
    }
    
    // 9. Render COLOK 2D
    const cb2dContainer = qs('#cb2d');
    if (cb2dContainer) {
      cb2dContainer.innerHTML = '';
      userData.results.cb2d.forEach((num, index) => {
        const circle = document.createElement('div');
        circle.className = 'bbfs-digit-small';
        circle.textContent = num;
        circle.style.animationDelay = `${index * 0.1}s`;
        cb2dContainer.appendChild(circle);
      });
    }
    
    // 10. Render COLOK 3D
    const cb3dContainer = qs('#cb3d');
    if (cb3dContainer) {
      cb3dContainer.innerHTML = '';
      userData.results.cb3d.forEach((num, index) => {
        const circle = document.createElement('div');
        circle.className = 'bbfs-digit-small';
        circle.textContent = num;
        circle.style.animationDelay = `${index * 0.1}s`;
        cb3dContainer.appendChild(circle);
      });
    }
    
    // 11. Add action buttons dynamically
    addActionButtons();
    
    console.log('Results rendered successfully');
  }

  /* =====================
     BUTTON HANDLERS - SIMPLIFIED V3
  ====================== */
  
  // HOME → COUNTRY
  qs('#btnStartIntro').onclick = () => {
    console.log('Starting...');
    showPage('page-country');
  };
  
  // COUNTRY → PROCESSING (langsung generate, gak via input pages)
  qs('#btnMulai').onclick = () => {
    console.log('Starting V3 generation...');
    runProcessingDrama();
  };
  
  // Home from result
  qs('#btnHome').onclick = () => {
    showPage('page-intro');
  };
  
  // Donate button
  qs('#btnDonate').onclick = () => {
    showPage('page-donation');
  };
  
  // Back to home from donate
  qs('#btnBackHome').onclick = () => {
    showPage('page-intro');
  };
  
  // Tabs functionality - show all at once
  qs('#btnMainSet')?.onclick = () => {
    qs('#resColok')?.classList.remove('hidden');
    qs('#resMain')?.classList.remove('hidden');
  };
  
  qs('#btnColokSet')?.onclick = () => {
    qs('#resColok')?.classList.remove('hidden');
    qs('#resMain')?.classList.remove('hidden');
  };

  /* =====================
     ADD ACTION BUTTONS DYNAMICALLY
  ====================== */
  
  function addActionButtons() {
  console.log('=== ADDING ACTION BUTTONS ===');
  
  try {
    // Remove old buttons if exist
    const oldButtons = qs('.action-buttons');
    if (oldButtons && oldButtons.parentNode) {
      oldButtons.parentNode.removeChild(oldButtons);
    }
    
    const shareSection = qs('.share-section');
    if (!shareSection) {
      console.warn('Share section not found');
      return;
    }
    
    // Create action buttons container
    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';
    actionButtons.innerHTML = `
      <button id="btnGenerateAgain" class="action-btn generate">
        🔄 GENERATE LAGI
      </button>
      <button id="btnChangePasaran" class="action-btn change">
        🌏 GANTI PASAR
      </button>
    `;
    
    // Insert after share section
    shareSection.parentNode.insertBefore(actionButtons, shareSection.nextSibling);
    
    // Add event listeners - WAIT A BIT FOR DOM
    setTimeout(() => {
      const generateBtn = qs('#btnGenerateAgain');
      const changeBtn = qs('#btnChangePasaran');
      
      if (generateBtn) {
        generateBtn.onclick = () => {
          console.log('Generate Again clicked');
          runProcessingDrama();
        };
      }
      
      if (changeBtn) {
        changeBtn.onclick = () => {
          console.log('Change Pasaran clicked');
          showPage('page-country');
        };
      }
      
      console.log('Action buttons added successfully');
    }, 100);
    
  } catch (error) {
    console.error('Error in addActionButtons:', error);
  }
}

  /* =====================
     INITIALIZE V3
  ====================== */
  console.log('Initializing Togel AI V3...');
  showPage('page-intro');
});






