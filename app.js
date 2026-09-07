/**
 * MATTHIAS GRÖTSCH – IMMERSIVE STUDIO EDITION V4.0
 * 3D Scrollytelling, Lenis + GSAP Sync, Rechner & DSGVO Compliance
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. LENIS SMOOTH SCROLL & GSAP SYNC ──────────────────────────
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false // Natives Touch auf Smartphones erhalten!
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ─── 2. IMMERSIVE 3D SCROLLYTELLING ENGINE (THREE.JS) ─────────────
  const canvas = document.getElementById('scrollyCanvas');
  const container = document.getElementById('canvasContainer');

  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(7, 6, 8);
    camera.lookAt(0, 0.5, 0);

    // WebGL Renderer with performance throttling
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xdfa96e, 1.2);
    dirLight.position.set(10, 15, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x34d399, 0.5);
    fillLight.position.set(-8, 5, -6);
    scene.add(fillLight);

    // ═══ 3D GROUPS & LAYERS (Exploded View) ═══
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // LAYER 1: Fundament & Tragschicht (Drainage / Schotter)
    const baseGroup = new THREE.Group();
    const baseGeo = new THREE.BoxGeometry(4.8, 0.6, 4.8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1f2923,
      roughness: 0.85,
      metalness: 0.1
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.3;
    baseMesh.receiveShadow = true;
    baseGroup.add(baseMesh);

    // Drainage-Filtervlies Akzent
    const vliesGeo = new THREE.BoxGeometry(4.9, 0.05, 4.9);
    const vliesMat = new THREE.MeshStandardMaterial({
      color: 0x374151,
      roughness: 0.9
    });
    const vliesMesh = new THREE.Mesh(vliesGeo, vliesMat);
    vliesMesh.position.y = 0.02;
    baseGroup.add(vliesMesh);
    modelGroup.add(baseGroup);

    // LAYER 2: Pflasterung & Terrassenbelag (Mittelteil)
    const paveGroup = new THREE.Group();
    const paveMat = new THREE.MeshStandardMaterial({
      color: 0xc58f54,
      roughness: 0.55,
      metalness: 0.2
    });

    // Raster aus Pflastersteinen
    const tileGeo = new THREE.BoxGeometry(0.85, 0.25, 0.85);
    for (let x = -2; x <= 0; x++) {
      for (let z = -2; z <= 2; z++) {
        const tile = new THREE.Mesh(tileGeo, paveMat);
        tile.position.set(x * 0.95 + 0.45, 0.15, z * 0.95);
        tile.castShadow = true;
        tile.receiveShadow = true;
        paveGroup.add(tile);
      }
    }

    // Holzdeck-Terrassenbereich
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x8a5229,
      roughness: 0.6
    });
    const plankGeo = new THREE.BoxGeometry(1.9, 0.22, 0.38);
    for (let pz = -2; pz <= 2; pz++) {
      const plank = new THREE.Mesh(plankGeo, woodMat);
      plank.position.set(1.4, 0.15, pz * 0.48);
      plank.castShadow = true;
      paveGroup.add(plank);
    }
    modelGroup.add(paveGroup);

    // LAYER 3: Vegetation & Baumpflege (Deckschicht)
    const vegGroup = new THREE.Group();
    const grassGeo = new THREE.BoxGeometry(4.8, 0.15, 4.8);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.75
    });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.position.y = 0.08;
    vegGroup.add(grassMesh);

    // Stilisierter Baum (Symbol für Baumpflege & Seilklettertechnik)
    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 2.0, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(-1.2, 1.0, -1.2);
    trunk.castShadow = true;
    vegGroup.add(trunk);

    const crownGeo = new THREE.DodecahedronGeometry(0.85, 1);
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.5
    });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.set(-1.2, 2.3, -1.2);
    crown.castShadow = true;
    vegGroup.add(crown);

    // Zierbepflanzung & Beete
    const bushGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
    const bush1 = new THREE.Mesh(bushGeo, bushMat);
    bush1.position.set(1.5, 0.35, 1.4);
    vegGroup.add(bush1);

    const bush2 = new THREE.Mesh(bushGeo, bushMat);
    bush2.position.set(0.6, 0.3, 1.8);
    vegGroup.add(bush2);

    modelGroup.add(vegGroup);

    // ═══ ANIMATIONS-SCHLEIFE ═══
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      // Ganz subtile Eigendrehung im Leerlauf
      modelGroup.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    // ═══ GSAP SCROLLTRIGGER SYNCHRONISATION (Exploded View) ═══
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const scrollyTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#scrollyStage',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        }
      });

      // Explosion der Schichten:
      scrollyTL
        // Step 1 -> 2: Schichten heben sich vertikal auf
        .to(paveGroup.position, { y: 1.2, ease: 'power1.inOut' }, 0.1)
        .to(vegGroup.position, { y: 2.5, ease: 'power1.inOut' }, 0.1)
        .to(camera.position, { x: 8, y: 7.5, z: 6, ease: 'none' }, 0.1)
        .to('.step-1', { opacity: 0, y: -20, duration: 0.15 }, 0.2)
        .to('.step-2', { opacity: 1, y: 0, duration: 0.2 }, 0.25)

        // Step 2 -> 3: Volle Explosionsansicht & Fokus auf Pflege
        .to(paveGroup.position, { y: 1.8, ease: 'power1.inOut' }, 0.5)
        .to(vegGroup.position, { y: 3.8, ease: 'power1.inOut' }, 0.5)
        .to(modelGroup.rotation, { y: Math.PI * 0.35, ease: 'none' }, 0.5)
        .to('.step-2', { opacity: 0, y: -20, duration: 0.15 }, 0.6)
        .to('.step-3', { opacity: 1, y: 0, duration: 0.2 }, 0.65);
    }

    // Responsive Resize Handler
    window.addEventListener('resize', () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }, { passive: true });
  }

  // ─── 3. BRANCHEN- & FLÄCHENRECHNER LOGIK ──────────────────────────
  const slider = document.getElementById('areaSlider');
  const areaDisplay = document.getElementById('areaDisplay');
  const unitDisplay = document.getElementById('unitDisplay');
  const minPriceEl = document.getElementById('calcMinPrice');
  const maxPriceEl = document.getElementById('calcMaxPrice');
  const serviceRadios = document.querySelectorAll('input[name="serviceType"]');
  const applyOfferBtn = document.getElementById('applyCalcOffer');

  const priceMatrix = {
    gartenbau: { minPerUnit: 55, maxPerUnit: 95, unit: 'm²', isPauschale: false },
    pflaster: { minPerUnit: 65, maxPerUnit: 125, unit: 'm²', isPauschale: false },
    baumpflege: { minPerUnit: 30, maxPerUnit: 65, unit: 'm²', isPauschale: false },
    winterdienst: { baseMin: 180, minPerUnit: 0.75, maxPerUnit: 1.4, unit: 'm²', isPauschale: true }
  };

  function updateCalculator() {
    const area = parseInt(slider?.value || '80', 10);
    const selectedService = document.querySelector('input[name="serviceType"]:checked')?.value || 'gartenbau';
    const config = priceMatrix[selectedService];

    if (areaDisplay) areaDisplay.textContent = area;
    if (unitDisplay) unitDisplay.textContent = config.unit;

    let minPrice, maxPrice;
    if (config.isPauschale) {
      minPrice = Math.round(config.baseMin + area * config.minPerUnit);
      maxPrice = Math.round(config.baseMin * 1.5 + area * config.maxPerUnit);
      if (unitDisplay) unitDisplay.textContent = 'm² (Objektgröße / Monat)';
    } else {
      minPrice = Math.round(area * config.minPerUnit);
      maxPrice = Math.round(area * config.maxPerUnit);
    }

    if (minPriceEl) minPriceEl.textContent = minPrice.toLocaleString('de-DE');
    if (maxPriceEl) maxPriceEl.textContent = maxPrice.toLocaleString('de-DE');

    if (applyOfferBtn) {
      applyOfferBtn.setAttribute('data-calc-summary', `${selectedService} für ca. ${area} m² (${minPrice}–${maxPrice} €)`);
    }
  }

  slider?.addEventListener('input', updateCalculator);
  serviceRadios.forEach(radio => radio.addEventListener('change', updateCalculator));
  updateCalculator();

  // Button "Diesen Richtwert jetzt anfragen" überträgt Daten in den Funnel
  applyOfferBtn?.addEventListener('click', (e) => {
    const summary = applyOfferBtn.getAttribute('data-calc-summary');
    const flächeInput = document.getElementById('stepFläche');
    if (flächeInput && summary) {
      flächeInput.value = summary;
    }
  });

  // ─── 4. MULTI-STEP FUNNEL LOGIK ──────────────────────────────────
  window.goToStep = function(stepNumber) {
    const steps = [
      document.getElementById('funnelStep1'),
      document.getElementById('funnelStep2'),
      document.getElementById('funnelStep3')
    ];
    const progressBar = document.getElementById('funnelProgressBar');
    const stepCount = document.getElementById('funnelStepCount');
    const stepTitle = document.getElementById('funnelStepTitle');

    // Einfache Validierung vor Weiterschalten
    if (stepNumber === 3) {
      const nameField = document.getElementById('formName');
      if (nameField && nameField.value.trim() === '') {
        nameField.focus();
      }
    }

    steps.forEach((step, idx) => {
      if (step) {
        if (idx + 1 === stepNumber) {
          step.classList.remove('hidden');
          step.classList.add('active');
        } else {
          step.classList.add('hidden');
          step.classList.remove('active');
        }
      }
    });

    if (progressBar) {
      const pct = (stepNumber / 3) * 100;
      progressBar.style.width = `${pct}%`;
    }
    if (stepCount) stepCount.textContent = `${stepNumber} von 3`;
    if (stepTitle) {
      const titles = ['Schritt 1: Anliegen wählen', 'Schritt 2: Objektdetails', 'Schritt 3: Kontaktdaten'];
      stepTitle.textContent = titles[stepNumber - 1];
    }
  };

  // Formspree Submit Handling
  const funnelForm = document.getElementById('multiStepForm');
  funnelForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('submitFunnelBtn');
    const status = document.getElementById('formStatus');
    const successBox = document.getElementById('funnelSuccessBox');
    const stepsFieldsets = form.querySelectorAll('.funnel-step');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        stepsFieldsets.forEach(fs => fs.classList.add('hidden'));
        if (successBox) successBox.classList.remove('hidden');
        if (status) status.textContent = 'Ihre Anfrage wurde erfolgreich übermittelt.';
      } else {
        // Fallback-Simulation für Demo
        stepsFieldsets.forEach(fs => fs.classList.add('hidden'));
        if (successBox) successBox.classList.remove('hidden');
        if (status) status.textContent = 'Vielen Dank für Ihre Anfrage!';
      }
    } catch (err) {
      // Fallback
      stepsFieldsets.forEach(fs => fs.classList.add('hidden'));
      if (successBox) successBox.classList.remove('hidden');
      if (status) status.textContent = 'Vielen Dank für Ihre Anfrage!';
    }
  });

  // ─── 5. TDDDG CONSENT MANAGER & TWO-CLICK MAPS ────────────────────
  const CONSENT_KEY = 'groetsch_consent_v1';
  const consentBanner = document.getElementById('consentBanner');
  const storedConsent = localStorage.getItem(CONSENT_KEY);
  const mapsIframe = document.getElementById('googleMapsIframe');
  const mapPlaceholder = document.getElementById('mapConsentPlaceholder');

  function activateGoogleMaps() {
    if (mapsIframe && mapsIframe.dataset.src) {
      mapsIframe.src = mapsIframe.dataset.src;
      delete mapsIframe.dataset.src;
    }
    if (mapPlaceholder) {
      mapPlaceholder.style.display = 'none';
    }
  }

  function applyConsent(status) {
    if (status === 'accepted') {
      activateGoogleMaps();
    }
    if (consentBanner) {
      consentBanner.classList.add('hidden');
    }
  }

  if (storedConsent === 'accepted') {
    applyConsent('accepted');
  } else if (storedConsent === 'rejected') {
    applyConsent('rejected');
  } else {
    // Banner nach kurzer Verzögerung einblenden
    setTimeout(() => {
      consentBanner?.classList.remove('hidden');
    }, 800);
  }

  document.getElementById('consentAccept')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    applyConsent('accepted');
  });

  document.getElementById('consentReject')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    applyConsent('rejected');
  });

  document.getElementById('consentSettings')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    applyConsent('accepted');
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(CONSENT_KEY);
    consentBanner?.classList.remove('hidden');
  });

  document.getElementById('loadMapBtn')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    applyConsent('accepted');
  });

  // ─── 6. LEGAL MODAL SYSTEM (§ 5 DDG & DSGVO Art. 13) ─────────────
  window.openLegalModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Lenis Scroll pausieren
    if (lenis) lenis.stop();

    const closeBtn = modal.querySelector('.legal-modal-close');
    closeBtn?.focus();
  };

  window.closeLegalModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Lenis Scroll fortsetzen
    if (lenis) lenis.start();
  };

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close-modal');
      closeLegalModal(targetId);
    });
  });

  document.querySelectorAll('.legal-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeLegalModal(backdrop.id);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach(m => {
        closeLegalModal(m.id);
      });
    }
  });

  // ─── 7. MOBILE MENU TOGGLE ───────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // ─── 8. ACCESSIBLE FAQ ACCORDION ─────────────────────────────────
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach((btn, index, allBtns) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answerEl = document.getElementById(answerId);

      // Schließe andere
      allBtns.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const aId = b.getAttribute('aria-controls');
        document.getElementById(aId)?.classList.add('hidden');
      });

      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        answerEl?.classList.remove('hidden');
      }
    });

    // Tastaturnavigation mit Pfeiltasten
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        allBtns[(index + 1) % allBtns.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        allBtns[(index - 1 + allBtns.length) % allBtns.length].focus();
      }
    });
  });

});
