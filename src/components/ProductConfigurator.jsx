import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FORM_CONFIG, getDirectContactLinks } from '../config/formConfig';

const APPLICATIONS = [
  { id: 'paints', label: 'Paints & Coatings', icon: '🎨', defaultMesh: '325', defaultVisc: 'brookfield', base: 'Premium 325' },
  { id: 'drilling', label: 'Drilling Fluids (Oil & Water)', icon: '🛢️', defaultMesh: '200', defaultVisc: 'api', base: 'API-13A / Salt Gel' },
  { id: 'foundry', label: 'Foundry Core Wash & Flux', icon: '🔥', defaultMesh: '200', defaultVisc: 'swelling', base: 'Flux Fine-200' },
  { id: 'absorbent', label: 'Industrial Absorbent & Pet Care', icon: '🐾', defaultMesh: 'granules_1_5', defaultVisc: 'absorb', base: 'Natural Granules' },
  { id: 'agri', label: 'Agricultural & Pesticide Carrier', icon: '🌱', defaultMesh: 'granules_1_3', defaultVisc: 'absorb', base: 'Natural Powder / Granules' },
  { id: 'construction', label: 'Construction Chemicals & Mortars', icon: '🏗️', defaultMesh: '325', defaultVisc: 'brookfield', base: 'Premium 325' }
];

const FORM_OPTIONS = [
  { id: '325', type: 'powder', label: '325 Mesh (44 μm)', sub: '98.5% passing · Superfine micronised powder' },
  { id: '200', type: 'powder', label: '200 Mesh (75 μm)', sub: '95% passing · Standard industrial & drilling powder' },
  { id: '100', type: 'powder', label: '100 Mesh (150 μm)', sub: 'Rapid dispersion & high wet mesh throughput' },
  { id: 'granules_1_3', type: 'granules', label: '1–3 mm Ball Granules', sub: 'Porous spherical granules for carriers' },
  { id: 'granules_2_4', type: 'granules', label: '2–4 mm Granules', sub: 'High porosity & rapid liquid uptake' },
  { id: 'granules_1_5', type: 'granules', label: '1–5 mm Crushed Granules', sub: 'Full range cat litter & spill absorbent' }
];

const VISCOSITY_OPTIONS = [
  { id: 'api', label: 'API-13A Standard (30–35 cps)', sub: '600 rpm Fann dial · Saline mud rheology' },
  { id: 'high_gel', label: 'High Gel Strength (36–42 cps)', sub: 'Enhanced thixotropy for deep-water / brine' },
  { id: 'brookfield', label: 'Brookfield Thixotropy (1200–1600 cP)', sub: 'Shear-thinning anti-sag for coatings & sealants' },
  { id: 'swelling', label: 'High Swelling Index (95+ ml)', sub: 'Controlled suspension for metal casting fluxes' },
  { id: 'absorb', label: 'High Liquid Absorption (180–220%)', sub: 'Porous lattice fluid retention & odor control' }
];

const MOISTURE_OPTIONS = [
  { id: 'standard', label: 'Standard Moisture', val: 'Max 10–12%', sub: 'Natural atmospheric dried' },
  { id: 'calcined', label: 'Heat-Activated / Low Moisture', val: 'Max 6–8%', sub: 'Thermally dried for moisture-sensitive formulations' }
];

const COLOR_OPTIONS = [
  {
    id: 'off_white',
    label: 'Off-White / Natural White',
    sub: 'High brightness (L* 82–88) · Paints, coatings, sealants & polymers',
    swatchHex: '#faf7f0',
    borderHex: '#d1c4b2',
    code: 'OW'
  },
  {
    id: 'cream_tan',
    label: 'Cream / Light Tan',
    sub: 'Standard mineral tone · Drilling muds, foundry flux & civil works',
    swatchHex: '#f0e2ca',
    borderHex: '#c5af90',
    code: 'CT'
  },
  {
    id: 'grey_tan',
    label: 'Greyish Tan / Raw Earthy',
    sub: 'Natural raw non-calcined tone · Industrial absorbents & cat litter',
    swatchHex: '#cfc6b8',
    borderHex: '#9e9482',
    code: 'GT'
  },
  {
    id: 'buff_beige',
    label: 'Buff / Warm Beige',
    sub: 'Natural mineral tone · Agro carriers & construction additives',
    swatchHex: '#dfc7a2',
    borderHex: '#b2976c',
    code: 'BG'
  },
  {
    id: 'custom_shade',
    label: '✨ Any Custom Color / As Per Client Requirement',
    sub: '100% Customized: We can manufacture & match any specific tone, brightness, or shade standard',
    swatchHex: 'conic-gradient(from 0deg, #ff4d4d, #f9ca24, #6ab04c, #22a6b3, #4834d4, #be2edd, #ff4d4d)',
    borderHex: '#b87936',
    code: 'CUSTOM',
    isCustom: true
  }
];

const COLOR_PRESET_MAP = {
  red: '#e53e3e',
  crimson: '#c53030',
  pink: '#ed64a6',
  rose: '#e53e3e',
  orange: '#dd6b20',
  amber: '#d69e2e',
  yellow: '#ecc94b',
  gold: '#d4af37',
  green: '#38a169',
  olive: '#708238',
  lime: '#48bb78',
  emerald: '#2f855a',
  blue: '#3182ce',
  navy: '#2b6cb0',
  cyan: '#00b5d8',
  teal: '#319795',
  purple: '#805ad5',
  violet: '#6b46c1',
  indigo: '#5a67d8',
  brown: '#8b572a',
  chocolate: '#5c3317',
  tan: '#d2b48c',
  beige: '#f5f5dc',
  buff: '#dfc7a2',
  cream: '#fef08a',
  ivory: '#fffff0',
  white: '#ffffff',
  'off-white': '#faf7f0',
  'off white': '#faf7f0',
  grey: '#718096',
  gray: '#718096',
  black: '#1a202c',
  dark: '#2d3748',
  ochre: '#cc7722',
  terracotta: '#e2725b',
  sienna: '#a0522d'
};

const QUICK_COLOR_CHIPS = [
  { name: 'Red', hex: '#e53e3e' },
  { name: 'Blue', hex: '#3182ce' },
  { name: 'Green', hex: '#38a169' },
  { name: 'Yellow', hex: '#ecc94b' },
  { name: 'Pure White', hex: '#ffffff' },
  { name: 'Ivory Cream', hex: '#fffbeb' },
  { name: 'Terracotta', hex: '#e2725b' },
  { name: 'Olive Green', hex: '#708238' },
  { name: 'Charcoal Dark', hex: '#2d3748' }
];

function resolveCustomSwatch(text) {
  if (!text || !text.trim()) {
    return {
      background: 'conic-gradient(from 0deg, #ff4d4d, #f9ca24, #6ab04c, #22a6b3, #4834d4, #be2edd, #ff4d4d)',
      borderColor: '#b87936'
    };
  }
  const clean = text.trim().toLowerCase();
  if (COLOR_PRESET_MAP[clean]) {
    return { background: COLOR_PRESET_MAP[clean], borderColor: COLOR_PRESET_MAP[clean] };
  }
  for (const [key, val] of Object.entries(COLOR_PRESET_MAP)) {
    if (clean.includes(key)) {
      return { background: val, borderColor: val };
    }
  }
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(clean)) {
    return { background: clean, borderColor: clean };
  }
  if (/^(rgb|hsl)/i.test(clean)) {
    return { background: clean, borderColor: '#888' };
  }
  return { background: clean, borderColor: '#b87936' };
}

const PACKAGING_OPTIONS = [
  { id: '25kg', label: '25 kg HDPE Bag', weightKg: 25, sub: 'Woven HDPE with inner polyethylene moisture liner (Standard)' },
  { id: '50kg', label: '50 kg HDPE Bag', weightKg: 50, sub: 'Heavy-duty woven bag with PE liner' },
  { id: '1000kg', label: '1000 kg Jumbo Big Bag', weightKg: 1000, sub: '1 MT Bulk FIBC sack with 4 corner lifting loops' }
];

const EXPORT_COUNTRIES = [
  'India (Domestic)',
  'United Arab Emirates (UAE)',
  'Saudi Arabia (KSA)',
  'Oman',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'United States (USA)',
  'United Kingdom (UK)',
  'Germany',
  'Netherlands',
  'Italy',
  'Spain',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Vietnam',
  'Thailand',
  'Australia',
  'Egypt',
  'South Africa',
  'Kenya',
  'Nigeria',
  'Brazil',
  'Other Global Destination'
];

const QUANTITY_OPTIONS = [
  { id: 'sample', label: 'Lab Evaluation Sample (25 kg)', mt: 0.025, note: 'Dispatched via express air/courier with COA' },
  { id: 'trial', label: 'Trial Batch (2 Metric Tons)', mt: 2, note: 'Ideal for industrial pilot plant testing' },
  { id: 'fcl20', label: '1 x 20ft FCL (~20 Metric Tons)', mt: 20, note: 'Standard full container load for maritime export' },
  { id: 'multi_fcl', label: 'Multi-Container / Bulk Order (40–100 MT)', mt: 60, note: '2 to 5 FCL containers with scheduled plant dispatches' },
  { id: 'custom_qty', label: '✨ Custom Quantity / Container Count (Specify Exact MT / FCLs)', mt: null, note: 'Enter your exact Metric Tons or Number of 20ft Containers' }
];

export default function ProductConfigurator({ preSelectedGrade = null, onInquirySent = null }) {
  const [searchParams] = useSearchParams();
  const urlGrade = searchParams.get('grade') || preSelectedGrade;

  // Find initial application based on preselected grade
  const initialApp = useMemo(() => {
    if (!urlGrade) return APPLICATIONS[0];
    const lower = urlGrade.toLowerCase();
    if (lower.includes('salt') || lower.includes('api') || lower.includes('drill')) return APPLICATIONS[1];
    if (lower.includes('foundry') || lower.includes('flux')) return APPLICATIONS[2];
    if (lower.includes('granule') || lower.includes('cat')) return APPLICATIONS[3];
    return APPLICATIONS[0];
  }, [urlGrade]);

  const [selectedApp, setSelectedApp] = useState(initialApp.id);
  const [selectedForm, setSelectedForm] = useState(initialApp.defaultMesh);
  const [selectedVisc, setSelectedVisc] = useState(initialApp.defaultVisc);
  const [selectedMoisture, setSelectedMoisture] = useState('standard');
  const [selectedColor, setSelectedColor] = useState('off_white');
  const [customColorText, setCustomColorText] = useState('');
  const [selectedPackaging, setSelectedPackaging] = useState('25kg');
  const [palletized, setPalletized] = useState(true);
  const [selectedQty, setSelectedQty] = useState('fcl20');
  const [customQtyValue, setCustomQtyValue] = useState('20');
  const [customUnit, setCustomUnit] = useState('mt'); // 'mt' or 'fcl'

  // Contact details state
  const [contact, setContact] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'India (Domestic)',
    destination: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic custom color resolution
  const customResolved = useMemo(() => {
    return resolveCustomSwatch(customColorText);
  }, [customColorText]);

  // Derived calculation
  const currentApp = APPLICATIONS.find(a => a.id === selectedApp) || APPLICATIONS[0];
  const currentForm = FORM_OPTIONS.find(f => f.id === selectedForm) || FORM_OPTIONS[0];
  const currentVisc = VISCOSITY_OPTIONS.find(v => v.id === selectedVisc) || VISCOSITY_OPTIONS[0];
  const currentMoisture = MOISTURE_OPTIONS.find(m => m.id === selectedMoisture) || MOISTURE_OPTIONS[0];
  const currentColor = COLOR_OPTIONS.find(c => c.id === selectedColor) || COLOR_OPTIONS[0];
  const currentPackaging = PACKAGING_OPTIONS.find(p => p.id === selectedPackaging) || PACKAGING_OPTIONS[0];
  const currentQty = QUANTITY_OPTIONS.find(q => q.id === selectedQty) || QUANTITY_OPTIONS[2];

  // Effective MT calculation
  const effectiveMt = useMemo(() => {
    if (selectedQty !== 'custom_qty') return currentQty.mt;
    const val = parseFloat(customQtyValue);
    if (isNaN(val) || val <= 0) return 20;
    return customUnit === 'fcl' ? val * 20 : val;
  }, [selectedQty, currentQty, customQtyValue, customUnit]);

  // Packaging calculation
  const totalBags = Math.round((effectiveMt * 1000) / currentPackaging.weightKg);
  const bagsPerPallet = currentPackaging.weightKg === 25 ? 40 : currentPackaging.weightKg === 50 ? 20 : 1;
  const totalPallets = Math.ceil(totalBags / bagsPerPallet);
  const totalContainers = (effectiveMt / 20).toFixed(1);

  // Generated Spec Code
  const colorSpecPart = selectedColor === 'custom_shade' ? (customColorText ? `CLR-${customColorText.trim().toUpperCase().replace(/\s+/g, '').slice(0, 8)}` : 'CUSTOM-CLR') : currentColor.code;
  const specCode = `BC-${selectedApp.toUpperCase().slice(0, 4)}-${selectedForm.toUpperCase()}-${colorSpecPart}-${selectedPackaging.toUpperCase()}`;

  // Handle application change
  const handleAppChange = (appId) => {
    setSelectedApp(appId);
    const app = APPLICATIONS.find(a => a.id === appId);
    if (app) {
      setSelectedForm(app.defaultMesh);
      setSelectedVisc(app.defaultVisc);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  // Construct structured technical summary text
  const getStructuredSpecText = () => {
    const colorDisplay = selectedColor === 'custom_shade'
      ? `Custom Client Shade (${customColorText || 'Any Custom Shade As Per Requirement'})`
      : currentColor.label;

    const volumeDisplay = selectedQty === 'custom_qty'
      ? `Custom Order: ${effectiveMt} MT (~${totalContainers} x 20ft FCL Containers)`
      : `${currentQty.label} (${effectiveMt} MT)`;

    return (
      `*CUSTOM ATTAPULGITE SPECIFICATION INQUIRY*\n` +
      `-----------------------------------------\n` +
      `*Formula Code:* ${specCode}\n` +
      `*Target Industry:* ${currentApp.label}\n` +
      `*Base Mineral Grade:* ${currentApp.base}\n` +
      `*Physical Form & Mesh:* ${currentForm.label} (${currentForm.sub})\n` +
      `*Viscosity / Rheology:* ${currentVisc.label}\n` +
      `*Free Moisture Limit:* ${currentMoisture.val} (${currentMoisture.label})\n` +
      `*Mineral Tone / Colour:* ${colorDisplay} (Any custom color available)\n` +
      `*Packaging:* ${currentPackaging.label} (${palletized ? 'Palletized & Shrink-wrapped' : 'Unpalletized / Loose'})\n` +
      `*Required Quantity:* ${volumeDisplay}\n` +
      `*Calculated Units:* ${totalBags.toLocaleString()} Bags / ${totalPallets} Pallets / ~${totalContainers} FCL Containers\n` +
      `-----------------------------------------\n` +
      `*Client Details:*\n` +
      `• Name: ${contact.name || 'Not specified'}\n` +
      `• Company: ${contact.company || 'Not specified'}\n` +
      `• Email: ${contact.email || 'Not specified'}\n` +
      `• Phone: ${contact.phone || 'Not specified'}\n` +
      `• Destination Country: ${contact.country || 'India'}\n` +
      `• Discharge Port / City: ${contact.destination || 'Not specified'}\n` +
      (contact.notes ? `• Special Requirements: ${contact.notes}\n` : '') +
      `-----------------------------------------\n` +
      `Sent via Bentoclay Claytech Online Configurator`
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Custom Attapulgite Specification: ${specCode} - ${contact.company || contact.name}`;
    const specDetails = getStructuredSpecText();
    const directLinks = getDirectContactLinks(contact.phone);

    if (FORM_CONFIG.accessKey && FORM_CONFIG.accessKey !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const payload = {
          access_key: FORM_CONFIG.accessKey,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company || 'N/A',
          country: contact.country || 'India (Domestic)',
          destination_port: contact.destination ? `${contact.destination} (${contact.country})` : (contact.country || 'N/A'),
          application: currentApp.label,
          spec_code: specCode,
          quantity_mt: `${effectiveMt} MT`,
          total_bags: `${totalBags.toLocaleString()} bags (${currentPackaging.label})`,
          pallets: `${totalPallets} pallets`,
          containers: `${totalContainers} x 20ft FCL`,
          notes: contact.notes || 'None',
          message: specDetails,
          subject: subject,
          from_name: 'Bentoclay Online Configurator'
        };

        if (directLinks.cleanPhone && directLinks.cleanPhone !== 'Not provided') {
          payload["📱 Client Mobile Number"] = contact.phone;
        }
        if (directLinks.callUrl) {
          payload["📞 Click to Call (Direct Dial)"] = directLinks.callUrl;
        }
        if (directLinks.whatsappUrl) {
          payload["💬 Click to WhatsApp (Direct Chat)"] = directLinks.whatsappUrl;
        }

        const response = await fetch(FORM_CONFIG.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success) {
          setIsSubmitting(false);
          setSubmitted(true);
          if (onInquirySent) onInquirySent({ specCode, ...contact });
          return;
        }
      } catch (err) {
        console.warn('Web3Forms submit error, falling back:', err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:${FORM_CONFIG.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(specDetails)}`;
      if (onInquirySent) onInquirySent({ specCode, ...contact });
    }, 500);
  };

  const handleWhatsAppDispatch = () => {
    const text = encodeURIComponent(getStructuredSpecText());
    window.open(`https://wa.me/917435818628?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="customizer-wrapper">
      <div className="customizer-grid">
        {/* Left Side: Step-by-Step Configurator Controls */}
        <div className="customizer-controls">
          {/* Step 1: Industry Application */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 01</span>
              <h3>Select Target Application & Industry</h3>
            </div>
            <p className="config-desc">
              Choose your sector to load optimal baseline specifications:
            </p>
            <div className="app-pills-grid">
              {APPLICATIONS.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  className={`app-pill-btn ${selectedApp === app.id ? 'active' : ''}`}
                  onClick={() => handleAppChange(app.id)}
                >
                  <span className="pill-icon">{app.icon}</span>
                  <div className="pill-text">
                    <strong>{app.label}</strong>
                    <small>Baseline: {app.base}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Form & Particle Size */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 02</span>
              <h3>Particle Size & Physical Form</h3>
            </div>
            <p className="config-desc">
              Select powder mesh fineness or absorbent granule diameter:
            </p>
            <div className="config-options-list">
              {FORM_OPTIONS.map((f) => (
                <label
                  key={f.id}
                  className={`config-radio-card ${selectedForm === f.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="form"
                    value={f.id}
                    checked={selectedForm === f.id}
                    onChange={() => setSelectedForm(f.id)}
                  />
                  <div className="radio-card-content">
                    <div className="radio-card-title">
                      <strong>{f.label}</strong>
                      <span className="form-type-tag">{f.type.toUpperCase()}</span>
                    </div>
                    <small>{f.sub}</small>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Target Viscosity & Performance Target */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 03</span>
              <h3>Target Viscosity & Rheology Parameter</h3>
            </div>
            <p className="config-desc">
              Specify the performance metric your formulation depends on:
            </p>
            <div className="config-options-list">
              {VISCOSITY_OPTIONS.map((v) => (
                <label
                  key={v.id}
                  className={`config-radio-card ${selectedVisc === v.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="viscosity"
                    value={v.id}
                    checked={selectedVisc === v.id}
                    onChange={() => setSelectedVisc(v.id)}
                  />
                  <div className="radio-card-content">
                    <strong>{v.label}</strong>
                    <small>{v.sub}</small>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 4: Moisture Control */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 04</span>
              <h3>Moisture Specifications</h3>
            </div>
            <div className="config-split-options">
              {MOISTURE_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`config-box-btn ${selectedMoisture === m.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMoisture(m.id)}
                >
                  <span className="box-val">{m.val}</span>
                  <strong className="box-label">{m.label}</strong>
                  <small className="box-sub">{m.sub}</small>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Mineral Colour & Appearance */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 05</span>
              <h3>Mineral Colour & Appearance Selection</h3>
            </div>
            <p className="config-desc">
              Select standard natural mineral tone or specify 100% custom shade matching:
            </p>

            {/* Reassuring Banner for Any Color Customization */}
            <div className="color-customization-callout">
              <span className="callout-icon">🎨</span>
              <div className="callout-text">
                <strong>Any Color Customization Available:</strong>
                <span>We can manufacture and blend attapulgite in <em>any required tone, brightness level, or color standard</em> as per your exact application needs.</span>
              </div>
            </div>

            <div className="config-options-list">
              {COLOR_OPTIONS.map((c) => {
                const isCustomOpt = c.id === 'custom_shade';
                const swatchBg = isCustomOpt && customColorText.trim() ? customResolved.background : c.swatchHex;
                const swatchBorder = isCustomOpt && customColorText.trim() ? customResolved.borderColor : c.borderHex;

                return (
                  <label
                    key={c.id}
                    className={`config-radio-card color-config-card ${selectedColor === c.id ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(c.id)}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={c.id}
                      checked={selectedColor === c.id}
                      onChange={() => setSelectedColor(c.id)}
                    />
                    <div
                      className="color-swatch-badge"
                      style={{ background: swatchBg, borderColor: swatchBorder }}
                      title={c.label}
                    />
                    <div className="radio-card-content">
                      <strong>{c.label}</strong>
                      <small>{c.sub}</small>
                    </div>
                  </label>
                );
              })}
            </div>

            {selectedColor === 'custom_shade' && (
              <div className="custom-color-input-wrapper">
                <div className="custom-color-header-row">
                  <label htmlFor="configurator-custom-shade">
                    <strong>Specify Desired Color / Tone / Shade Standard:</strong>
                  </label>
                  <div className="live-color-indicator-badge">
                    <span
                      className="live-indicator-dot"
                      style={{ background: customResolved.background, borderColor: customResolved.borderColor }}
                    />
                    <span>Live Match</span>
                  </div>
                </div>

                <div className="custom-color-field-row">
                  <input
                    id="configurator-custom-shade"
                    type="text"
                    className="form-control custom-shade-field"
                    placeholder="Type any color (e.g. Red, Blue, Green, Yellow, Terracotta, Ivory, #e53e3e)..."
                    value={customColorText}
                    onChange={(e) => setCustomColorText(e.target.value)}
                  />
                  <div className="color-picker-tool-wrap" title="Click to pick custom color">
                    <input
                      type="color"
                      className="native-color-picker-input"
                      value={customResolved.background.startsWith('#') ? customResolved.background : '#e53e3e'}
                      onChange={(e) => setCustomColorText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="quick-color-chips-row">
                  <span className="chips-title">Quick Presets:</span>
                  <div className="chips-list">
                    {QUICK_COLOR_CHIPS.map((chip) => (
                      <button
                        key={chip.name}
                        type="button"
                        className="color-chip-btn"
                        onClick={() => setCustomColorText(chip.name)}
                        title={`Select ${chip.name}`}
                      >
                        <span className="chip-dot" style={{ background: chip.hex }} />
                        <span>{chip.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <small className="field-hint">💡 Color circle in both the form and recipe card updates automatically in real-time as you type or pick a color.</small>
              </div>
            )}
          </div>

          {/* Step 6: Packaging & Palletization */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 06</span>
              <h3>Packaging & Palletization</h3>
            </div>
            <div className="config-split-options three-cols">
              {PACKAGING_OPTIONS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`config-box-btn ${selectedPackaging === p.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPackaging(p.id)}
                >
                  <span className="box-val">{p.weightKg} kg</span>
                  <strong className="box-label">{p.label}</strong>
                  <small className="box-sub">{p.sub}</small>
                </button>
              ))}
            </div>

            <div className="pallet-toggle-row">
              <label className="checkbox-custom-label">
                <input
                  type="checkbox"
                  checked={palletized}
                  onChange={(e) => setPalletized(e.target.checked)}
                />
                <span>Include ISPM-15 heat-treated export wooden pallets with shrink-wrap</span>
              </label>
            </div>
          </div>

          {/* Step 7: Required Volume & Destination */}
          <div className="config-card">
            <div className="config-card-head">
              <span className="step-badge">STEP 07</span>
              <h3>Required Volume / Trial Scale</h3>
            </div>
            <div className="config-options-list">
              {QUANTITY_OPTIONS.map((q) => (
                <label
                  key={q.id}
                  className={`config-radio-card ${selectedQty === q.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="quantity"
                    value={q.id}
                    checked={selectedQty === q.id}
                    onChange={() => setSelectedQty(q.id)}
                  />
                  <div className="radio-card-content">
                    <strong>{q.label}</strong>
                    <small>{q.note}</small>
                  </div>
                </label>
              ))}
            </div>

            {selectedQty === 'custom_qty' && (
              <div className="custom-qty-input-box">
                <label htmlFor="custom-qty-configurator">
                  <strong>Specify Required Volume / Container Count:</strong>
                </label>
                <div className="custom-qty-row">
                  <input
                    id="custom-qty-configurator"
                    type="number"
                    min="0.1"
                    step="any"
                    className="form-control qty-number-field"
                    placeholder={customUnit === 'mt' ? 'e.g. 40 (Metric Tons)' : 'e.g. 2 (Containers)'}
                    value={customQtyValue}
                    onChange={(e) => setCustomQtyValue(e.target.value)}
                  />
                  <div className="unit-toggle-pill">
                    <button
                      type="button"
                      className={`unit-pill-btn ${customUnit === 'mt' ? 'active' : ''}`}
                      onClick={() => setCustomUnit('mt')}
                    >
                      Metric Tons (MT)
                    </button>
                    <button
                      type="button"
                      className={`unit-pill-btn ${customUnit === 'fcl' ? 'active' : ''}`}
                      onClick={() => setCustomUnit('fcl')}
                    >
                      20ft FCL Containers
                    </button>
                  </div>
                </div>
                <div className="custom-calc-preview">
                  💡 <b>Calculated Volume:</b> {effectiveMt} MT = <b>{totalBags.toLocaleString()}</b> Bags ({currentPackaging.weightKg}kg) · <b>{totalPallets}</b> Pallets · ~<b>{totalContainers}</b> x 20ft FCL Containers
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Live Spec Card & Custom Inquiry Form */}
        <aside className="customizer-sidebar">
          <div className="live-spec-sheet">
            <div className="spec-sheet-header">
              <span className="spec-eyebrow">CUSTOM SPECIFICATION SHEET</span>
              <h4 className="spec-code-title">{specCode}</h4>
              <span className="spec-status-pill">✓ 100% Formulation Compatible</span>
            </div>

            <div className="spec-meta-grid">
              <div className="meta-item">
                <small>TARGET APPLICATION</small>
                <strong>{currentApp.label}</strong>
              </div>
              <div className="meta-item">
                <small>BASELINE GRADE</small>
                <strong>{currentApp.base}</strong>
              </div>
              <div className="meta-item">
                <small>PARTICLE SIZE</small>
                <strong>{currentForm.label}</strong>
              </div>
              <div className="meta-item">
                <small>RHEOLOGY TARGET</small>
                <strong>{currentVisc.label}</strong>
              </div>
              <div className="meta-item">
                <small>FREE MOISTURE</small>
                <strong>{currentMoisture.val}</strong>
              </div>
              <div className="meta-item">
                <small>MINERAL SHADE</small>
                <div className="summary-color-preview">
                  <span
                    className="swatch-inline-dot"
                    style={
                      selectedColor === 'custom_shade'
                        ? { background: customResolved.background, borderColor: customResolved.borderColor }
                        : { background: currentColor.swatchHex, borderColor: currentColor.borderHex }
                    }
                  />
                  <strong>
                    {selectedColor === 'custom_shade'
                      ? (customColorText ? `Custom (${customColorText.slice(0, 16)})` : 'Custom On-Demand')
                      : currentColor.label.split(' / ')[0]}
                  </strong>
                </div>
              </div>
              <div className="meta-item" style={{ gridColumn: 'span 2' }}>
                <small>PACKAGING</small>
                <strong>{currentPackaging.label} {palletized ? '(Palletized)' : ''}</strong>
              </div>
            </div>

            {/* Packaging Math breakdown */}
            <div className="packaging-calculator-box">
              <div className="calc-item">
                <span className="calc-num">{totalBags.toLocaleString()}</span>
                <span className="calc-desc">Total Bags</span>
              </div>
              <div className="calc-item">
                <span className="calc-num">{totalPallets}</span>
                <span className="calc-desc">Pallets</span>
              </div>
              <div className="calc-item">
                <span className="calc-num">{totalContainers}</span>
                <span className="calc-desc">20ft FCLs</span>
              </div>
              <div className="calc-item">
                <span className="calc-num">{effectiveMt} MT</span>
                <span className="calc-desc">Net Weight</span>
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <form className="custom-inquiry-form" onSubmit={handleFormSubmit}>
              <h5>Submit Custom Technical Inquiry</h5>

              {submitted ? (
                <div className="custom-success-banner" role="alert">
                  <div className="success-icon">✓</div>
                  <strong>Custom Specification Submitted!</strong>
                  <p>Our Bhavnagar technical team has received recipe <b>{specCode}</b> for <b>{effectiveMt} MT</b> and will reply within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="custom-input-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={contact.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="custom-input-group">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name *"
                      value={contact.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="custom-input-row">
                    <input
                      type="email"
                      name="email"
                      placeholder="Work Email *"
                      value={contact.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone / WhatsApp *"
                      value={contact.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="custom-input-row">
                    <select
                      name="country"
                      value={contact.country}
                      onChange={handleInputChange}
                      required
                      className="form-control form-select-country"
                    >
                      {EXPORT_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="destination"
                      placeholder="Discharge Port / City *"
                      value={contact.destination}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="custom-input-group">
                    <textarea
                      name="notes"
                      rows="2"
                      placeholder="Specific target viscosity, slurry requirements, or chemical additives..."
                      value={contact.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : `Request Custom Spec Quotation (${effectiveMt} MT) ↗`}
                  </button>

                  <div className="inquiry-or-divider">
                    <span>OR INSTANT TECHNICAL CHAT</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-whatsapp-direct btn-full"
                    onClick={handleWhatsAppDispatch}
                  >
                    <svg
                      className="wa-svg-icon"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.62 8.56 7.62 9.76C7.62 10.96 8.5 12.12 8.62 12.28C8.75 12.44 10.33 14.89 12.76 15.94C14.79 16.81 15.2 16.64 15.63 16.6C16.07 16.56 17.04 16.03 17.24 15.47C17.45 14.9 17.45 14.42 17.38 14.32C17.32 14.21 17.16 14.15 16.92 14.03C16.67 13.91 15.48 13.32 15.26 13.24C15.04 13.16 14.88 13.12 14.71 13.36C14.55 13.6 14.08 14.15 13.93 14.32C13.79 14.48 13.65 14.5 13.4 14.38C13.16 14.26 12.38 14 11.46 13.18C10.74 12.54 10.25 11.75 10.11 11.51C9.97 11.27 10.09 11.14 10.21 11.02C10.32 10.91 10.46 10.73 10.59 10.58C10.71 10.43 10.76 10.33 10.84 10.17C10.92 10.01 10.88 9.87 10.82 9.75C10.76 9.63 10.29 8.47 10.09 8C9.9 7.54 9.7 7.61 9.55 7.6C9.41 7.6 9.25 7.44 9.11 7.44Z" />
                    </svg>
                    <span>Send Custom Spec via WhatsApp</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
