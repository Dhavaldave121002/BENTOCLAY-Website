import { useState, useMemo } from 'react';
import { FORM_CONFIG, getDirectContactLinks } from '../config/formConfig';

const GRADE_CUSTOMIZATION_CONFIGS = {
  'salt-gel': {
    codePrefix: 'SG',
    defaultMesh: '200_std',
    meshOptions: [
      { id: '200_std', label: '200 Mesh (75 μm)', sub: 'Max 4% residue >75 μm (API standard drilling)' },
      { id: '200_fine', label: '200 Mesh Super-Gel', sub: 'Max 2% residue >75 μm (Rapid hydration)' },
      { id: '325_micro', label: '325 Mesh (44 μm)', sub: 'Micronized for high-pressure deep well completion' }
    ],
    defaultVisc: '35cps',
    viscOptions: [
      { id: '35cps', label: '35 cps Min @ 600 rpm', sub: 'Standard high-viscosity salt gel' },
      { id: '40cps', label: '40–42 cps Super Viscosity', sub: 'For saturated brine & high saline offshore wells' },
      { id: 'high_yield', label: 'High Yield Gel (100+ bbl/ton)', sub: 'High cutting suspension capacity' }
    ],
    defaultMoisture: '8pct',
    moistureOptions: [
      { id: '8pct', label: 'Standard Moisture (Max 8%)', sub: 'Controlled dry pulverizing' },
      { id: '5pct', label: 'Low Moisture (Max 5%)', sub: 'Thermally treated for long storage' }
    ],
    recommendedUses: ['Offshore Brine Drilling', 'Geothermal Wells', 'High Pressure Mud', 'Deep Salt Formations']
  },
  'api-13a': {
    codePrefix: 'API13A',
    defaultMesh: '200_api',
    meshOptions: [
      { id: '200_api', label: '200 Mesh (API Spec 13A)', sub: 'Max 8% residue >75 μm per API Section 12' },
      { id: '200_tight', label: '200 Mesh Tight Cut', sub: 'Max 5% residue >75 μm for reduced screen blinding' },
      { id: '325_api', label: '325 Mesh Micronized', sub: 'Sub-44 micron for specialized slurry systems' }
    ],
    defaultVisc: '30cps',
    viscOptions: [
      { id: '30cps', label: '30 cps Min @ 600 rpm', sub: 'Strict API Spec 13A Section 12 compliance' },
      { id: '35cps', label: '35 cps Premium Drilling', sub: 'Enhanced thixotropy in sea water fluids' }
    ],
    defaultMoisture: '16pct',
    moistureOptions: [
      { id: '16pct', label: 'Standard API Limit (Max 16%)', sub: 'Certified API Spec 13A baseline' },
      { id: '10pct', label: 'Reduced Moisture (Max 10%)', sub: 'Improved flowability & anti-clumping' }
    ],
    recommendedUses: ['API Certified Mud Systems', 'Seawater Drilling', 'Casing Cement Additive', 'Water Well Drilling']
  },
  'natural-powder': {
    codePrefix: 'NP',
    defaultMesh: '200',
    meshOptions: [
      { id: '200', label: '200 Mesh (75 μm)', sub: '95% passing · Standard agricultural carrier' },
      { id: '100', label: '100 Mesh (150 μm)', sub: 'Rapid flow for dry powder fertilizer blends' },
      { id: '325', label: '325 Mesh (44 μm)', sub: 'Superfine for Wettable Powder (WP) crop protection' }
    ],
    defaultVisc: 'high_absorb',
    viscOptions: [
      { id: 'high_absorb', label: 'High Liquid Absorption (120–150%)', sub: 'Active liquid pesticide carrier loading' },
      { id: 'ultra_absorb', label: 'Ultra Absorption (180–220%)', sub: 'Maximum chemical impregnation capacity' },
      { id: 'suspension', label: 'Suspension Concentrate Grade', sub: 'Suspension stabilizing in aqueous agro-liquids' }
    ],
    defaultMoisture: '10pct',
    moistureOptions: [
      { id: '10pct', label: 'Standard (Max 10%)', sub: 'Natural mineral moisture' },
      { id: '6pct', label: 'Dry Activated (Max 6%)', sub: 'For moisture-sensitive active ingredients' }
    ],
    recommendedUses: ['Pesticide Wettable Powders', 'Fertilizer Coating & Anti-Caking', 'Foundry Binding', 'Animal Feed Additive']
  },
  'flux-fine-200': {
    codePrefix: 'FF200',
    defaultMesh: '200',
    meshOptions: [
      { id: '200', label: '200 Mesh (75 μm)', sub: '95% passing · Standard foundry core wash powder' },
      { id: '150', label: '150 Mesh (105 μm)', sub: 'Faster slurry drainage in continuous casting' },
      { id: '250', label: '250 Mesh (60 μm)', sub: 'Ultra-smooth surface finish for precision casting' }
    ],
    defaultVisc: 'suspension_flux',
    viscOptions: [
      { id: 'suspension_flux', label: 'Controlled Swelling & Suspension', sub: 'Prevents refractory wash sedimentation' },
      { id: 'high_thixotropy', label: 'High Thixotropic Recovery', sub: 'Zero sag / dripping on vertical sand cores' },
      { id: 'swelling_95', label: 'High Swelling Index (95+ ml)', sub: 'Superior bonding for metal casting flux' }
    ],
    defaultMoisture: '8pct',
    moistureOptions: [
      { id: '8pct', label: 'Standard (Max 8%)', sub: 'Optimum binder moisture balance' },
      { id: '5pct', label: 'Calcined Low-Gas (Max 5%)', sub: 'Reduces blowholes and casting gas defects' }
    ],
    recommendedUses: ['Foundry Core Wash', 'Refractory Mold Coating', 'Steel Ingot Flux', 'Precision Casting']
  },
  'premium-325': {
    codePrefix: 'P325',
    defaultMesh: '325',
    meshOptions: [
      { id: '325', label: '325 Mesh (44 μm)', sub: '98.5% passing (wet) · Superfine micronised powder' },
      { id: '400', label: '400 Mesh (37 μm)', sub: 'Ultra-fine classification for high-gloss coatings' },
      { id: '200', label: '200 Mesh (75 μm)', sub: 'Economy industrial suspension grade' }
    ],
    defaultVisc: 'brookfield',
    viscOptions: [
      { id: 'brookfield', label: 'Brookfield Thixotropy (1200–1600 cP)', sub: 'Anti-sag, anti-splatter for emulsion paint' },
      { id: 'high_recovery', label: 'Rapid Shear Recovery (1600–2000 cP)', sub: 'High-build industrial coatings & mastics' },
      { id: 'syneresis', label: 'Syneresis & Anti-Settling Control', sub: 'Keeps heavy titanium dioxide suspended' }
    ],
    defaultMoisture: '6_8pct',
    moistureOptions: [
      { id: '6_8pct', label: 'Standard Low Moisture (6–8%)', sub: 'Published PDS specification' },
      { id: '4pct', label: 'Thermally Activated (Max 4%)', sub: 'For 1K & 2K polyurethane sealants & adhesives' }
    ],
    recommendedUses: ['Architectural Paints', 'Industrial Sealants', 'Tape Joint Compounds', 'Printing Inks']
  },
  'natural-granules': {
    codePrefix: 'NG',
    defaultMesh: '1_5mm',
    meshOptions: [
      { id: '1_5mm', label: '1–5 mm Crushed Granules', sub: 'Full particle spectrum · Maximum absorption volume' },
      { id: '1_3mm', label: '1–3 mm Spherical Ball Granules', sub: 'Uniform round granules for slow-release carriers' },
      { id: '2_4mm', label: '2–4 mm Granules', sub: 'Dust-free granules for chemical & spill control' }
    ],
    defaultVisc: 'absorb_180',
    viscOptions: [
      { id: 'absorb_180', label: 'High Absorption Capacity (180–220%)', sub: 'Rapid liquid entrapment & odor encapsulation' },
      { id: 'calcined_lvm', label: 'Calcined LVM (Low Volatile Matter)', sub: 'High particle crushing strength & zero mudding' },
      { id: 'rvm_natural', label: 'RVM (Regular Volatile Matter)', sub: 'Maximum porosity and natural softness' }
    ],
    defaultMoisture: '6pct',
    moistureOptions: [
      { id: '6pct', label: 'Standard Dry Granules (5–8%)', sub: 'Published PDS moisture range' },
      { id: '3pct', label: 'Kiln Calcined Ultra-Dry (Max 3%)', sub: 'Hardened granules for extreme spill cleanup' }
    ],
    recommendedUses: ['Premium Pet Care / Cat Litter', 'Industrial Oil & Spill Absorbents', 'Pesticide Granular Carrier', 'Soil Conditioner']
  }
};

// Aliases for slug and ID interoperability
GRADE_CUSTOMIZATION_CONFIGS['flux-fine'] = GRADE_CUSTOMIZATION_CONFIGS['flux-fine-200'];
GRADE_CUSTOMIZATION_CONFIGS['flux-fine-200-attapulgite-powder'] = GRADE_CUSTOMIZATION_CONFIGS['flux-fine-200'];
GRADE_CUSTOMIZATION_CONFIGS['granules'] = GRADE_CUSTOMIZATION_CONFIGS['natural-granules'];
GRADE_CUSTOMIZATION_CONFIGS['attapulgite-natural-granules-1-5mm'] = GRADE_CUSTOMIZATION_CONFIGS['natural-granules'];
GRADE_CUSTOMIZATION_CONFIGS['salt-gel-attapulgite-powder'] = GRADE_CUSTOMIZATION_CONFIGS['salt-gel'];
GRADE_CUSTOMIZATION_CONFIGS['api-13a-section-12-attapulgite-powder'] = GRADE_CUSTOMIZATION_CONFIGS['api-13a'];
GRADE_CUSTOMIZATION_CONFIGS['attapulgite-natural-powder'] = GRADE_CUSTOMIZATION_CONFIGS['natural-powder'];
GRADE_CUSTOMIZATION_CONFIGS['premium-325-attapulgite-powder'] = GRADE_CUSTOMIZATION_CONFIGS['premium-325'];

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
    sub: 'Natural non-calcined raw tone · Industrial absorbents & cat litter',
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
    label: '✨ Any Custom Color / As Per Your Requirement',
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
  { id: '25kg', label: '25 kg HDPE Bag', weightKg: 25, sub: 'Woven HDPE with inner PE liner' },
  { id: '50kg', label: '50 kg HDPE Bag', weightKg: 50, sub: 'Heavy-duty woven bag with liner' },
  { id: '1000kg', label: '1000 kg Jumbo Sack', weightKg: 1000, sub: '1 MT Bulk FIBC bag with loops' }
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
  { id: 'sample', label: 'Lab Evaluation Sample (25 kg)', mt: 0.025, note: 'Air courier express sample with COA batch test report' },
  { id: 'trial', label: 'Pilot Plant Trial Batch (2 MT)', mt: 2, note: 'Ideal for industrial formulation & production validation' },
  { id: 'fcl20', label: '1 x 20ft FCL Container (~20 MT)', mt: 20, note: 'Standard full container load for maritime export' },
  { id: 'multi_fcl', label: 'Multi-Container / Bulk Order (40–100 MT)', mt: 60, note: '2 to 5 FCL containers with scheduled plant dispatches' },
  { id: 'custom_qty', label: '✨ Custom Quantity / Container Count (Specify Exact MT / FCLs)', mt: null, note: 'Enter your exact Metric Tons or Number of 20ft Containers' }
];

export default function GradeCustomizer({ product }) {
  const config =
    (product && (GRADE_CUSTOMIZATION_CONFIGS[product.id] || GRADE_CUSTOMIZATION_CONFIGS[product.slug])) ||
    GRADE_CUSTOMIZATION_CONFIGS['premium-325'];

  const [mesh, setMesh] = useState(config.defaultMesh);
  const [visc, setVisc] = useState(config.defaultVisc);
  const [moisture, setMoisture] = useState(config.defaultMoisture);
  const [color, setColor] = useState('off_white');
  const [customColorText, setCustomColorText] = useState('');
  const [packaging, setPackaging] = useState('25kg');
  const [palletized, setPalletized] = useState(true);
  const [qty, setQty] = useState('fcl20');
  const [customQtyValue, setCustomQtyValue] = useState('20');
  const [customUnit, setCustomUnit] = useState('mt'); // 'mt' or 'fcl'

  // Contact form state
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

  // Derived selections
  const currentMesh = config.meshOptions.find(m => m.id === mesh) || config.meshOptions[0];
  const currentVisc = config.viscOptions.find(v => v.id === visc) || config.viscOptions[0];
  const currentMoisture = config.moistureOptions.find(m => m.id === moisture) || config.moistureOptions[0];
  const currentColor = COLOR_OPTIONS.find(c => c.id === color) || COLOR_OPTIONS[0];
  const currentPackaging = PACKAGING_OPTIONS.find(p => p.id === packaging) || PACKAGING_OPTIONS[0];
  const currentQty = QUANTITY_OPTIONS.find(q => q.id === qty) || QUANTITY_OPTIONS[2];

  // Dynamic custom color resolution
  const customResolved = useMemo(() => {
    return resolveCustomSwatch(customColorText);
  }, [customColorText]);

  // Effective Metric Tons calculation
  const effectiveMt = useMemo(() => {
    if (qty !== 'custom_qty') return currentQty.mt;
    const val = parseFloat(customQtyValue);
    if (isNaN(val) || val <= 0) return 20;
    return customUnit === 'fcl' ? val * 20 : val;
  }, [qty, currentQty, customQtyValue, customUnit]);

  // Automated packaging calculation
  const totalBags = Math.round((effectiveMt * 1000) / currentPackaging.weightKg);
  const bagsPerPallet = currentPackaging.weightKg === 25 ? 40 : currentPackaging.weightKg === 50 ? 20 : 1;
  const totalPallets = Math.ceil(totalBags / bagsPerPallet);
  const totalContainers = (effectiveMt / 20).toFixed(1);

  // Generated Recipe Spec Code
  const cleanMeshCode = mesh.toUpperCase().replace('_', '-');
  const colorSpecPart = color === 'custom_shade' ? (customColorText ? `CLR-${customColorText.trim().toUpperCase().replace(/\s+/g, '').slice(0, 8)}` : 'CUSTOM-CLR') : currentColor.code;
  const specCode = `BC-${config.codePrefix}-${cleanMeshCode}-${colorSpecPart}-${currentPackaging.weightKg}KG`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const getStructuredSpecText = () => {
    const colorDisplay = color === 'custom_shade'
      ? `Custom Client Shade (${customColorText || 'Any Custom Shade As Per Requirement'})`
      : currentColor.label;

    const volumeDisplay = qty === 'custom_qty'
      ? `Custom Order: ${effectiveMt} MT (~${totalContainers} x 20ft FCL Containers)`
      : `${currentQty.label} (${effectiveMt} MT)`;

    return (
      `*CUSTOM ${product.name.toUpperCase()} SPECIFICATION*\n` +
      `-----------------------------------------\n` +
      `*Base Product:* ${product.name} (${product.shortName})\n` +
      `*Formula Code:* ${specCode}\n` +
      `*Particle Size / Mesh:* ${currentMesh.label} (${currentMesh.sub})\n` +
      `*Target Viscosity / Rheology:* ${currentVisc.label}\n` +
      `*Moisture Specification:* ${currentMoisture.label}\n` +
      `*Target Colour / Shade:* ${colorDisplay} (Any custom color available)\n` +
      `*Packaging:* ${currentPackaging.label} (${palletized ? 'Palletized & Stretch-wrapped' : 'Loose Bags'})\n` +
      `*Volume Needed:* ${volumeDisplay}\n` +
      `*Calculated Units:* ${totalBags.toLocaleString()} Bags / ${totalPallets} Pallets / ~${totalContainers} FCLs\n` +
      `-----------------------------------------\n` +
      `*Inquirer & Delivery Details:*\n` +
      `• Name: ${contact.name || 'Not provided'}\n` +
      `• Company: ${contact.company || 'Not provided'}\n` +
      `• Email: ${contact.email || 'Not provided'}\n` +
      `• Phone: ${contact.phone || 'Not provided'}\n` +
      `• Destination Country: ${contact.country || 'India'}\n` +
      `• Discharge Port / City: ${contact.destination || 'Not provided'}\n` +
      (contact.notes ? `• Specific Instructions: ${contact.notes}\n` : '') +
      `-----------------------------------------\n` +
      `Sent from Bentoclay Claytech ${product.shortName} Spec Builder`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Custom ${product.shortName} Spec Quotation (${effectiveMt} MT): ${specCode} - ${contact.company || contact.name}`;
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
          product: product.name,
          spec_code: specCode,
          quantity_mt: `${effectiveMt} MT`,
          total_bags: `${totalBags.toLocaleString()} bags (${currentPackaging.label})`,
          pallets: `${totalPallets} pallets`,
          containers: `${totalContainers} x 20ft FCL`,
          notes: contact.notes || 'None',
          message: specDetails,
          subject: subject,
          from_name: 'Bentoclay Custom Grade Builder'
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
    }, 500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(getStructuredSpecText());
    window.open(`https://wa.me/917435818628?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="grade-customizer-section" id="customizer-section">
      <div className="customizer-anchor-target"></div>
      <div className="grade-customizer-container">
        {/* Section Header */}
        <div className="customizer-header-bar">
          <div className="header-badge-row">
            <span className="spec-badge">GRADE CUSTOMIZER</span>
            <span className="live-pill">⚙ Interactive Spec Builder</span>
          </div>
          <h2>
            Customize <em>{product.name}</em>
          </h2>
          <p>
            Configure particle fineness, target rheology, moisture control, natural mineral shade, and packaging for <strong>{product.shortName}</strong>. Our Bhavnagar plant mills and controls batches to your exact formulation target.
          </p>
        </div>

        <div className="grade-customizer-layout">
          {/* Left Column: Interactive Parameters */}
          <div className="grade-customizer-controls">
            {/* 1. Particle Size / Mesh */}
            <div className="config-block">
              <div className="config-block-title">
                <span className="step-tag">01</span>
                <div>
                  <h4>Particle Distribution & Fineness (Mesh)</h4>
                  <small>Air-classified and pulverized in-house</small>
                </div>
              </div>
              <div className="config-options-stack">
                {config.meshOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`grade-radio-row ${mesh === opt.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`mesh-${product.id}`}
                      value={opt.id}
                      checked={mesh === opt.id}
                      onChange={() => setMesh(opt.id)}
                    />
                    <div className="radio-text-wrap">
                      <strong>{opt.label}</strong>
                      <span>{opt.sub}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Target Viscosity & Rheology */}
            <div className="config-block">
              <div className="config-block-title">
                <span className="step-tag">02</span>
                <div>
                  <h4>Target Viscosity & Rheological Performance</h4>
                  <small>Aligned with your manufacturing process</small>
                </div>
              </div>
              <div className="config-options-stack">
                {config.viscOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`grade-radio-row ${visc === opt.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`visc-${product.id}`}
                      value={opt.id}
                      checked={visc === opt.id}
                      onChange={() => setVisc(opt.id)}
                    />
                    <div className="radio-text-wrap">
                      <strong>{opt.label}</strong>
                      <span>{opt.sub}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Moisture Specification */}
            <div className="config-block">
              <div className="config-block-title">
                <span className="step-tag">03</span>
                <div>
                  <h4>Free Moisture & Thermal Treatment</h4>
                  <small>Controlled rotary dried or kiln activated</small>
                </div>
              </div>
              <div className="config-grid-two">
                {config.moistureOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`config-tile-btn ${moisture === opt.id ? 'active' : ''}`}
                    onClick={() => setMoisture(opt.id)}
                  >
                    <strong>{opt.label}</strong>
                    <span>{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Mineral Colour & Shade Customization */}
            <div className="config-block">
              <div className="config-block-title">
                <span className="step-tag">04</span>
                <div>
                  <h4>Mineral Colour & Shade Customization</h4>
                  <small>Standard natural tones or 100% custom shade matching</small>
                </div>
              </div>

              {/* Informational banner about full color customization */}
              <div className="color-customization-callout">
                <span className="callout-icon">🎨</span>
                <div className="callout-text">
                  <strong>Any Custom Color / Shade Available:</strong>
                  <span>Bentoclay can manufacture and blend attapulgite in <em>any required tone, brightness level, or color standard</em> as per your exact formulation or client sample.</span>
                </div>
              </div>

              <div className="config-options-stack">
                {COLOR_OPTIONS.map((c) => {
                  const isCustomOpt = c.id === 'custom_shade';
                  const swatchBg = isCustomOpt && customColorText.trim() ? customResolved.background : c.swatchHex;
                  const swatchBorder = isCustomOpt && customColorText.trim() ? customResolved.borderColor : c.borderHex;

                  return (
                    <label
                      key={c.id}
                      className={`grade-radio-row color-selection-row ${color === c.id ? 'active' : ''}`}
                      onClick={() => setColor(c.id)}
                    >
                      <input
                        type="radio"
                        name={`color-${product.id}`}
                        value={c.id}
                        checked={color === c.id}
                        onChange={() => setColor(c.id)}
                      />
                      <div
                        className="color-swatch-badge"
                        style={{ background: swatchBg, borderColor: swatchBorder }}
                        title={c.label}
                      />
                      <div className="radio-text-wrap">
                        <strong>{c.label}</strong>
                        <span>{c.sub}</span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {color === 'custom_shade' && (
                <div className="custom-color-input-wrapper">
                  <div className="custom-color-header-row">
                    <label htmlFor={`custom-shade-${product.id}`}>
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
                      id={`custom-shade-${product.id}`}
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

            {/* 5. Packaging & Palletization */}
            <div className="config-block">
              <div className="config-block-title">
                <span className="step-tag">05</span>
                <div>
                  <h4>Export Packaging & Palletization</h4>
                  <small>Multi-modal export shipping from Mundra / Pipavav Port</small>
                </div>
              </div>
              <div className="config-grid-three">
                {PACKAGING_OPTIONS.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    className={`config-tile-btn ${packaging === pkg.id ? 'active' : ''}`}
                    onClick={() => setPackaging(pkg.id)}
                  >
                    <span className="tile-weight">{pkg.weightKg} kg</span>
                    <strong>{pkg.label}</strong>
                    <span>{pkg.sub}</span>
                  </button>
                ))}
              </div>

              <div className="pallet-checkbox-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={palletized}
                    onChange={(e) => setPalletized(e.target.checked)}
                  />
                  <span>Add ISPM-15 Heat-Treated Export Pallets & Waterproof Stretch Wrapping</span>
                </label>
              </div>
            </div>

            {/* 6. Required Volume */}
            <div className="config-block">
              <div className="config-block-title">
                <span className="step-tag">06</span>
                <div>
                  <h4>Required Trial / Batch Volume</h4>
                  <small>Dispatched from Bhavnagar manufacturing facility</small>
                </div>
              </div>
              <div className="config-options-stack">
                {QUANTITY_OPTIONS.map((q) => (
                  <label
                    key={q.id}
                    className={`grade-radio-row ${qty === q.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`qty-${product.id}`}
                      value={q.id}
                      checked={qty === q.id}
                      onChange={() => setQty(q.id)}
                    />
                    <div className="radio-text-wrap">
                      <strong>{q.label}</strong>
                      <span>{q.note}</span>
                    </div>
                  </label>
                ))}
              </div>

              {qty === 'custom_qty' && (
                <div className="custom-qty-input-box">
                  <label htmlFor={`custom-qty-input-${product.id}`}>
                    <strong>Specify Required Volume / Container Count:</strong>
                  </label>
                  <div className="custom-qty-row">
                    <input
                      id={`custom-qty-input-${product.id}`}
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

          {/* Right Column: Live Calculated Spec Sheet & Submission */}
          <aside className="grade-customizer-sidebar">
            <div className="grade-spec-sheet-box">
              {/* Sheet Header */}
              <div className="spec-box-header">
                <span className="sheet-tag">RECIPE SPECIFICATION CODE</span>
                <h3 className="sheet-code">{specCode}</h3>
                <div className="sheet-sub">
                  <span>Grade: {product.shortName}</span>
                  <span className="verified-dot">● In-House Formulated</span>
                </div>
              </div>

              {/* Summary Spec Grid */}
              <div className="spec-summary-grid">
                <div className="summary-cell">
                  <small>BASE MINERAL</small>
                  <strong>{product.shortName}</strong>
                </div>
                <div className="summary-cell">
                  <small>FORM / HABIT</small>
                  <strong>{product.form}</strong>
                </div>
                <div className="summary-cell">
                  <small>PARTICLE FINENESS</small>
                  <strong>{currentMesh.label}</strong>
                </div>
                <div className="summary-cell">
                  <small>TARGET RHEOLOGY</small>
                  <strong>{currentVisc.label}</strong>
                </div>
                <div className="summary-cell">
                  <small>MOISTURE LIMIT</small>
                  <strong>{currentMoisture.label}</strong>
                </div>
                <div className="summary-cell">
                  <small>MINERAL SHADE</small>
                  <div className="summary-color-preview">
                    <span
                      className="swatch-inline-dot"
                      style={
                        color === 'custom_shade'
                          ? { background: customResolved.background, borderColor: customResolved.borderColor }
                          : { background: currentColor.swatchHex, borderColor: currentColor.borderHex }
                      }
                    />
                    <strong>
                      {color === 'custom_shade'
                        ? (customColorText ? `Custom (${customColorText.slice(0, 16)})` : 'Custom On-Demand')
                        : currentColor.label.split(' / ')[0]}
                    </strong>
                  </div>
                </div>
                <div className="summary-cell" style={{ gridColumn: 'span 2' }}>
                  <small>PACKAGING</small>
                  <strong>{currentPackaging.label} {palletized ? '(Palletized)' : ''}</strong>
                </div>
              </div>

              {/* Packaging Breakdown Math */}
              <div className="spec-math-strip">
                <div className="math-col">
                  <span className="math-val">{totalBags.toLocaleString()}</span>
                  <span className="math-lbl">Total Bags</span>
                </div>
                <div className="math-col">
                  <span className="math-val">{totalPallets}</span>
                  <span className="math-lbl">Pallets</span>
                </div>
                <div className="math-col">
                  <span className="math-val">{totalContainers}</span>
                  <span className="math-lbl">20ft FCLs</span>
                </div>
                <div className="math-col">
                  <span className="math-val">{effectiveMt} MT</span>
                  <span className="math-lbl">Net Weight</span>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="spec-inquiry-container">
                {submitted ? (
                  <div className="custom-success-box" role="alert">
                    <div className="success-check">✓</div>
                    <h4>Inquiry Dispatched!</h4>
                    <p>
                      Your custom specification <b>{specCode}</b> for <b>{effectiveMt} MT</b> has been received. Our Bhavnagar laboratory engineer will review viscosity and packaging requirements and reply within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="custom-quote-form">
                    <h5 className="form-heading">Request Custom Quotation for {product.shortName}</h5>

                    <div className="form-row-single">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name *"
                        value={contact.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-row-single">
                      <input
                        type="text"
                        name="company"
                        placeholder="Company / Laboratory Name *"
                        value={contact.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-row-split">
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

                    <div className="form-row-split">
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

                    <div className="form-row-single">
                      <textarea
                        name="notes"
                        rows="2"
                        placeholder="Target slurry solids, required additive compatibility, or trial timeline..."
                        value={contact.notes}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-full-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Spec...' : `Request Technical Quote (${effectiveMt} MT) ↗`}
                    </button>

                    <div className="instant-whatsapp-wrap">
                      <div className="divider-text">
                        <span>OR DIRECT WHATSAPP INQUIRY</span>
                      </div>
                      <button
                        type="button"
                        className="btn-whatsapp-instant"
                        onClick={handleWhatsApp}
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
                    </div>
                  </form>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
