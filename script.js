document.addEventListener('DOMContentLoaded', () => {

  /* =====================
     SHORTCUT
  ====================== */
  const qs  = s => document.querySelector(s);
  const qsa = s => document.querySelectorAll(s);

  /* =====================
     PAGE NAV
  ====================== */
  const pages = qsa('.section');
  const showPage = id => {
    pages.forEach(p => p.classList.add('hidden'));
    const el = qs('#' + id);
    if (el) el.classList.remove('hidden');
    window.scrollTo(0, 0);
  };

  /* =====================
     UTIL
  ====================== */
  const onlyDigits = s => /^[0-9]+$/.test(s);
  const randDigit = () => Math.floor(Math.random() * 10).toString();

  const shuffle = arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  /* =====================
     STATE
  ====================== */
  const userData = {
    feeling: '',
    history: [],
    bbfs: '',
    results: {}
  };

  /* =====================
     BUTTON FLOW
  ====================== */
  qs('#btnMulai').onclick = () => showPage('page-input');
  qs('#btnBack').onclick  = () => showPage('page-country');
  qs('#btnStartIntro').onclick = () => showPage('page-country');

  qs('#btnNextFeeling').onclick = () => {
    const v = qs('#feelingInput').value.trim();
    if (v.length !== 4 || !onlyDigits(v)) {
      alert('Isi 4 angka');
      return;
    }
    userData.feeling = v;
    showPage('page-question');
  };

  qs('#btnFeeling').onclick  = () => showPage('page-history');
  qs('#btnBocoran').onclick = () => showPage('page-education');

  qs('#btnEduNext').onclick = () => {
    qs('#feelingInput').value = '';
    showPage('page-input');
  };

  qs('#btnHistoryNext').onclick = () => {
    const history = [...qsa('.history')].map(i => i.value.trim());

    // Filter hanya yang diisi
    const filledHistory = history.filter(h => h.length > 0);
    
    if (filledHistory.length === 0) {
      alert('Harap isi minimal 1 history');
      return;
    }

    // Validasi format
    if (filledHistory.some(h => h.length !== 4 || !onlyDigits(h))) {
      alert('History harus 4 digit');
      return;
    }

    // Validasi duplikat antar history
    const uniqueHistory = [...new Set(filledHistory)];
    if (uniqueHistory.length !== filledHistory.length) {
      alert('History tidak boleh ada yang sama');
      return;
    }

    if (filledHistory.includes(userData.feeling)) {
      alert('History tidak boleh sama dengan feeling');
      return;
    }

    userData.history = filledHistory;
    
    // Gunakan logika analisis history yang lebih cerdas
    userData.bbfs = generateBBFSBasedOnHistory(userData.feeling, userData.history);
    userData.results = generateResults(userData.bbfs);

    runProcessing();
  };

  /* =====================
     ANALISIS HISTORY - LOGIKA BARU
  ====================== */
  function analyzeHistoryPattern(history) {
    let hasDups = false;
    let dupsNumbers = '';
    let dupsCount = 0;
    
    for (let i = 0; i < history.length; i++) {
      const num = history[i];
      const digits = num.split('');
      const uniqueDigits = [...new Set(digits)];
      
      // Cek apakah ada duplikat dalam satu nomor
      if (uniqueDigits.length < 4) {
        hasDups = true;
        dupsCount++;
        
        // Ambil digit yang terduplikat
        const digitCount = {};
        digits.forEach(d => {
          digitCount[d] = (digitCount[d] || 0) + 1;
        });
        
        // Tambahkan digit duplikat ke dupsNumbers
        for (const digit in digitCount) {
          if (digitCount[digit] > 1 && !dupsNumbers.includes(digit)) {
            dupsNumbers += digit;
          }
        }
      }
    }
    
    const allDupsInRow = dupsCount === history.length;
    
    return {
      hasDups,
      dupsNumbers,
      allDupsInRow,
      dupsCount
    };
  }

  /* =====================
     BBFS GENERATOR - LOGIKA BARU
  ====================== */
  function generateBBFSBasedOnHistory(feeling, history) {
    // Jika tidak ada history, gunakan logika lama
    if (history.length === 0) {
      const pool = [...new Set(feeling.split(''))];
      while (pool.length < 7) pool.push(randDigit());
      return shuffle(pool).slice(0,7).join('');
    }
    
    const analysis = analyzeHistoryPattern(history);
    
    // CASE 1: Semua history ada dups
    if (analysis.allDupsInRow) {
      // Kasus khusus: semua dups, beri 7 digit unik
      const uniqueDigits = '0123456789'.split('');
      return shuffle(uniqueDigits).slice(0,7).join('');
    }
    
    // CASE 2: Ada dups (tidak semua)
    if (analysis.hasDups) {
      // Gabungkan feeling dengan digit duplikat
      const feelingDigits = feeling.split('');
      const dupsDigits = analysis.dupsNumbers.split('');
      
      let pool = [...new Set([...feelingDigits, ...dupsDigits])];
      
      // Tambah random hingga 7
      while (pool.length < 7) {
        const randomDigit = randDigit();
        if (!pool.includes(randomDigit)) {
          pool.push(randomDigit);
        }
      }
      
      return shuffle(pool).slice(0,7).join('');
    }
    
    // CASE 3: Tidak ada dups sama sekali
    // Berarti kemungkinan besar akan keluar dups
    const feelingDigits = feeling.split('');
    
    // Ambil 2 digit dari feeling untuk diduplikasi
    const selectedDigits = shuffle(feelingDigits).slice(0, 2);
    
    // Gabungkan: feeling + selectedDigits + random
    let pool = [...feelingDigits, ...selectedDigits];
    
    // Tambah 1 random digit
    let randomDigit;
    do {
      randomDigit = randDigit();
    } while (pool.includes(randomDigit));
    
    pool.push(randomDigit);
    
    // Shuffle dan ambil 7, pastikan ada duplikat
    let result = shuffle(pool).slice(0, 7);
    
    // Jika semua unik, buat duplikat
    if (new Set(result).size === 7) {
      result[6] = result[0];
    }
    
    return result.join('');
  }

  /* =====================
     RESULT ENGINE
  ====================== */
  function generateResults(bbfs) {
    const d = bbfs.split('');

    /* ---- 4D SET (5) ---- */
    const set4d = [];
    while (set4d.length < 5) {
      const n = shuffle(d).slice(0,4).join('');
      if (!set4d.includes(n)) set4d.push(n);
    }

    /* ---- 3D JAGA (5) ---- */
    const set3d = [];
    while (set3d.length < 5) {
      const n = shuffle(d).slice(0,3).join('');
      if (!set3d.includes(n)) set3d.push(n);
    }

    /* ---- 2D JAGA (5 + BB = 10) ---- */
    const main2d = [];
    while (main2d.length < 5) {
      const n = shuffle(d).slice(0,2).join('');
      if (n.length === 2 && !main2d.includes(n)) main2d.push(n);
    }

    const set2d = [];
    main2d.forEach(n => {
      if (n.length === 2) {
        set2d.push(n);
        set2d.push(n[1] + n[0]);
      }
    });

    /* ---- COLOK ---- */
    // 1D
    const cb1d = [...new Set(d)].slice(0,3);

    // 2D follow cb1d
    const cb2d = [];
    for (let i = 0; i < cb1d.length; i++) {
      for (let j = i + 1; j < cb1d.length; j++) {
        const a = cb1d[i];
        const b = cb1d[j];
        if (a && b) cb2d.push(a + b);
      }
    }

    // 3D follow cb2d + bbfs
    const cb3d = [];
    let idx = 0;
    cb2d.forEach(pair => {
      if (pair.length === 2) {
        cb3d.push(pair + d[idx % d.length]);
        idx++;
      }
    });

    return {
      set4d,
      set3d,
      set2d,
      cb1d,
      cb2d,
      cb3d
    };
  }

  /* =====================
     FAKE PROCESS
  ====================== */
  function runProcessing() {
    showPage('page-processing');
    const fill = qs('.progress-fill');
    const text = qs('.progress-text');

    let p = 0;
    const steps = [
      'Membaca data...',
      'Mendeteksi pola...',
      'Menyusun BBFS...',
      'Finalisasi...'
    ];
    let i = 0;

    const t = setInterval(() => {
      p += 25;
      if (p > 100) p = 100;
      fill.style.width = p + '%';
      if (i < steps.length) text.textContent = steps[i++];

      if (p === 100) {
        clearInterval(t);
        renderResult();
        showPage('page-result');
      }
    }, 400);
  }

  /* =====================
     RENDER
  ====================== */
  function renderResult() {
    const bbfsBox = qs('#bbfsBox');
    bbfsBox.innerHTML = '';
    userData.bbfs.split('').forEach(d => {
      const s = document.createElement('span');
      s.textContent = d;
      bbfsBox.appendChild(s);
    });

    qs('#resMain').classList.add('hidden');
    qs('#resColok').classList.add('hidden');

    qs('#btnMainSet').onclick = () => {
      qs('#resColok').classList.add('hidden');
      const el = qs('#resMain');
      el.classList.remove('hidden');
      el.innerHTML =
        '4D PREDIKSI JITU SET<br>' + userData.results.set4d.join(' ') + '<br><br>' +
        '3D ANGKA JAGA<br>' + userData.results.set3d.join(' ') + '<br><br>' +
        '2D ANGKA JAGA<br>' + userData.results.set2d.join(' ');
    };

    qs('#btnColokSet').onclick = () => {
      qs('#resMain').classList.add('hidden');
      const el = qs('#resColok');
      el.classList.remove('hidden');
      el.innerHTML =
        'COLOK 1D<br>' + userData.results.cb1d.join(' ') + '<br><br>' +
        'COLOK 2D<br>' + userData.results.cb2d.join(' ') + '<br><br>' +
        'COLOK 3D<br>' + userData.results.cb3d.join(' ');
    };
  }

});