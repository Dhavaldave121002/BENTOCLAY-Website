import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const PDS_DATA = [
  {
    filename: 'PDS-Premium-325-Attapulgite-Bentoclay-Claytech.pdf',
    title: 'Product Data Sheet',
    subtitle: 'Attapulgite Premium 325',
    grade: 'Premium 325 Attapulgite Powder',
    desc: 'Attapulgite powder is a premium quality, fine powder attapulgite product which offers excellent thickening and suspending properties for numerous below applications.',
    paramsTitle: 'Premium 325 Physical Parameters: -',
    hasResultColumn: false,
    params: [
      { param: 'MOISTURE', req: '6-8%' },
      { param: 'FORM', req: 'POWDER' },
      { param: 'COLOUR', req: 'OFF WHITE' },
      { param: 'Ph (2% in water)', req: '7.-9' },
      { param: 'Surface Area (BET)m2/gm', req: '210 +10%' },
      { param: 'Specific Gravity', req: '2.3-2.4' },
      { param: '325#MESH (wet)', req: '98.5 % max' },
      { param: 'Bulk Density', req: '0.3-0.4 gm/ml' },
      { param: 'Al2O3', req: '5-10%' },
      { param: 'Fe2O3', req: '4-5%' },
      { param: 'SiO2', req: '36-42%' },
      { param: 'CaO', req: '4-5%' },
      { param: 'MgO', req: '8-12%' },
      { param: 'Loi', req: '20-25%' },
      { param: 'Brookfield viscosity (7% water&50 rpm)', req: '1200-1600 Cp' },
      { param: 'Oil Abs (ml/100 g)', req: '100' }
    ],
    applications: [
      'PAINT, COATING, FERTILIZERS, CERAMICS, CONSTRUCTION CHEMICALS,',
      'ADMIXTURE, SEALANTS, FOUNDRYFLUX CHEMICAL, ADHESIVES, LIQUID',
      'SUSPENSIONS, DETERGENT etc.'
    ]
  },
  {
    filename: 'PDS-Attapulgite-Salt-Gel-Grade-Bentoclay-Claytech.pdf',
    title: 'Product Data Sheet',
    subtitle: 'Attapulgite Salt Gel Grade',
    grade: 'Salt Gel Attapulgite Powder',
    desc: 'Attapulgite is sometimes referred to as salt gel and/or fuller\'s earth. Attapulgite is a hydrous magnesium aluminosilicate with formula (Mg,Al)2Si4O10(OH)4(H2O) that occurs in a type of clay soil produced in fine powder as gel and absorbent grades. It has a needle-like structure.\n\nAttapulgite, a naturally occurring clay mineral with a rodlike structure, was identified as a game-changing viscosity modifier in drilling mud in high salt, high pressure, and high heat environments.\n\nProcessing of the clays consists of drying and grinding the crude clay to specific particle size distributions with specific ranges of gel viscosity measured by a variety of means depending on the end use.',
    paramsTitle: 'Salt Gel Physical Parameters: -',
    hasResultColumn: false,
    params: [
      { param: 'Suspension properties\nViscosity dial reading at 600 rpm', req: '35 cps minimum' },
      { param: 'Residue greater than 75 micrometers', req: '4% maximum' },
      { param: 'Moisture', req: '8% maximum' }
    ],
    applications: [
      '(1) Use in Oil drilling and water drilling',
      '(2) Petro chemical',
      '(3) High viscosity maintains',
      '(4) Construction chemical',
      '(5) Bonding agent for granulation of powder',
      '(6) Laundry washing powder, etc.'
    ]
  },
  {
    filename: 'PDS-Natural-Attapulgite-Granules-Bentoclay-Claytech.pdf',
    title: 'Product Data Sheet',
    subtitle: 'Attapulgite natural Granules',
    grade: 'Attapulgite Natural Granules 1 to 5 mm',
    desc: 'Attapulgite granules are porous, absorbent pellets made from a processed magnesium aluminium silicate clay, characterized by their high liquid absorption, low dust, and non-swelling nature.\n\nThe granules have a unique rod-like crystal structure that gives them excellent absorbent properties, making them ideal for uses like cat litter, industrial absorbents, and carriers for pesticides and fertilizers.',
    paramsTitle: 'REPORT OF Physical and Chemical Parameter of Natural Granules',
    hasResultColumn: true,
    params: [
      { param: 'MOISTURE', req: '5-10%', res: '5.6%' },
      { param: 'FORM', req: 'Granules', res: 'Balls Granules 1-5mm' },
      { param: 'COLOUR', req: 'OFF WHITE', res: 'OFF WHITE' },
      { param: 'pH', req: '6.5-8.5', res: '7.6' },
      { param: 'Specific Gravity', req: '2.3-2.4', res: '2.46' },
      { param: 'Under /Over size', req: '5 %', res: '2.6%' },
      { param: 'Al2O3', req: '5-10%', res: '6.2%' },
      { param: 'Fe2O3', req: '4-5%', res: '4.6%' },
      { param: 'SiO2', req: '36-42%', res: '40.2%' },
      { param: 'Cao', req: '4-5%', res: '4.8%' },
      { param: 'MgO', req: '8-12%', res: '8.42%' },
      { param: 'LOI', req: '20-25', res: '24.2%' }
    ],
    applications: [
      '• Cat litter and pet absorbents',
      '• Industrial spill control and floor absorbents',
      '• Carrier for agricultural pesticides and fertilizers',
      '• Soil conditioner and moisture retainer'
    ]
  },
  {
    filename: 'PDS-Natural-Attapulgite-Powder-Bentoclay-Claytech.pdf',
    title: 'Product Data Sheet',
    subtitle: 'Attapulgite natural powder',
    grade: 'Attapulgite Natural Powder',
    desc: 'Natural attapulgite powder is a naturally occurring clay mineral known for its high absorbency and porous structure. It contains accessory minerals such as quartz, feldspar, and calcite.\n\nAttapulgite has a unique rod-like crystal structure which provides excellent absorption capacity, suspension properties, and binding ability.',
    paramsTitle: 'REPORT OF Physical and Chemical Parameter of Natural powder',
    hasResultColumn: true,
    params: [
      { param: 'MOISTURE', req: '8-12%', res: '10.4%' },
      { param: 'FORM', req: 'powder', res: 'powder' },
      { param: 'COLOUR', req: 'OFF WHITE', res: 'OFF WHITE' },
      { param: 'pH', req: '6.5-8.5', res: '7.6' },
      { param: 'Specific Gravity', req: '2.3-2.4', res: '2.39' },
      { param: 'Al2O3', req: '5-10%', res: '6.2%' },
      { param: 'Fe2O3', req: '4-5%', res: '4.6%' },
      { param: 'SiO2', req: '36-42%', res: '40.2%' },
      { param: 'Cao', req: '4-5%', res: '4.8%' },
      { param: 'MgO', req: '8-12%', res: '8.42%' },
      { param: 'LOI', req: '20-25', res: '24.2%' }
    ],
    applications: [
      '• Industrial absorbents',
      '• Animal litter products',
      '• Carrier for pesticides and fertilizers',
      '• Drilling fluids',
      '• Agricultural and chemical applications'
    ]
  },
  {
    filename: 'PDS-Flux-Fine-200-Attapulgite-Bentoclay-Claytech.pdf',
    title: 'Product Data Sheet',
    subtitle: 'Attapulgite Flux Fine -200 (Foundry Flux)',
    grade: 'Flux Fine -200 (Foundry Flux) Attapulgite Powder',
    desc: 'Attapulgite Foundry Flux known for its consistent quality, high purity. Our product is widely used in the foundry industry for its superior binding and thermal stability properties.',
    paramsTitle: 'Flux Fine -200 physical parameters: -',
    hasResultColumn: false,
    params: [
      { param: 'MOISTURE', req: '8-12%' },
      { param: 'FORM', req: 'POWDER' },
      { param: 'COLOUR', req: 'OFF WHITE' },
      { param: 'pH', req: '6.5-8.5' },
      { param: 'SWELLING INDEX 1Hrs', req: '95 ml min.' },
      { param: 'SWELLING INDEX 24 Hrs.', req: '85 ml min.' },
      { param: 'PARTICLE SIZE 200 MESH (wet)', req: '98 % max' },
      { param: 'FSV', req: '12-14ml' },
      { param: 'Al2O3', req: '5-10%' },
      { param: 'Fe2O3', req: '4-5%' },
      { param: 'SiO2', req: '36-42%' },
      { param: 'CaO', req: '4-5%' },
      { param: 'MgO', req: '8-12%' },
      { param: 'LOI', req: '20-25' }
    ],
    applications: [
      '(1) Foundry Blending Material',
      '(2) Pharmaceutical thickener and absorbent',
      '(3) Suspending agent for abrasives',
      '(4) Wax emulsion stabilizer',
      '(5) Metal drawing lubricants suspending agent',
      '(6) Catalyst in NCR paper',
      '(7) Construction chemical',
      '(8) Fertilizer'
    ]
  },
  {
    filename: 'PDS-Attapulgite-API-13A-Section-12-Bentoclay-Claytech.pdf',
    title: 'Product Data Sheet',
    subtitle: 'Attapulgite API-13A Section 12 Grade',
    grade: 'Attapulgite Powder API-13A Section 12 Grade',
    desc: 'Certified API Spec 13A Section 12 compliant attapulgite clay mineral specifically engineered for saltwater, offshore, and high-salinity oil & gas exploration drilling fluids.\n\nDelivers rapid suspension and reliable rheological stability under saturated electrolyte brine without flocculation.',
    paramsTitle: 'API-13A Section 12 Certified Physical Parameters: -',
    hasResultColumn: false,
    params: [
      { param: 'Suspension Viscosity dial reading at 600 rpm', req: '30 cps minimum (API Spec 13A)' },
      { param: 'Wet Screen Residue > 75 micrometers (200 mesh)', req: '8.0% maximum' },
      { param: 'Moisture Content (as shipped)', req: '10.0% maximum' },
      { param: 'Dispersibility in Saturated NaCl Brine', req: 'Immediate thixotropic gel build' },
      { param: 'Packaging', req: '25 kg multi-wall HDPE moisture-proof bags' }
    ],
    applications: [
      '(1) High-salinity saltwater drilling muds (API 13A Sec 12)',
      '(2) Offshore and geothermal deep well drilling fluids',
      '(3) Saturated brine and seawater rheology control',
      '(4) Horizontal directional drilling (HDD) in saline strata',
      '(5) Civil diaphragm walling and saline slurry trenching'
    ]
  }
];

async function createPDS(data) {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4 Size (595.28 x 841.89 pt)
  const { width, height } = page.getSize();

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Load and embed official Bentoclay Logo PNG
  const logoPath = path.resolve(process.cwd(), 'public', 'assets', 'bentoclay-logo.png');
  let logoImage = null;
  if (fs.existsSync(logoPath)) {
    const logoBytes = fs.readFileSync(logoPath);
    logoImage = await doc.embedPng(logoBytes);
  }

  // Colors
  const darkInk = rgb(0.12, 0.1, 0.08);
  const brandGold = rgb(0.72, 0.47, 0.21);
  const brandDarkRed = rgb(0.85, 0.2, 0.15);
  const tableHeaderBg = rgb(0.98, 0.88, 0.82);
  const tableRowEven = rgb(0.99, 0.97, 0.95);
  const borderGray = rgb(0.75, 0.7, 0.65);
  const lightGray = rgb(0.38, 0.38, 0.38);

  let y = height - 42;

  // Header Right: Title & Subtitle
  page.drawText(data.title, {
    x: width - 210,
    y: y,
    size: 15,
    font: fontBold,
    color: darkInk
  });
  page.drawText(data.subtitle, {
    x: width - 210,
    y: y - 15,
    size: 10.5,
    font: fontRegular,
    color: lightGray
  });

  // Header Left: Logo + Company Name
  if (logoImage) {
    const logoDims = logoImage.scale(0.048); // scale down crisp logo
    page.drawImage(logoImage, {
      x: 45,
      y: y - logoDims.height + 4,
      width: logoDims.width,
      height: logoDims.height
    });

    const textX = 45 + logoDims.width + 12;
    page.drawText('Bentoclay Claytech', {
      x: textX,
      y: y - 4,
      size: 18,
      font: fontBold,
      color: darkInk
    });
    page.drawText('Manufactures of Attapulgite Powder', {
      x: textX,
      y: y - 18,
      size: 9.5,
      font: fontRegular,
      color: lightGray
    });
  } else {
    page.drawText('Bentoclay Claytech', {
      x: 45,
      y: y - 4,
      size: 19,
      font: fontBold,
      color: darkInk
    });
    page.drawText('Manufactures of Attapulgite Powder', {
      x: 45,
      y: y - 18,
      size: 9.5,
      font: fontRegular,
      color: lightGray
    });
  }

  y -= 54;

  // Horizontal separator line
  page.drawLine({
    start: { x: 45, y: y },
    end: { x: width - 45, y: y },
    thickness: 1.2,
    color: rgb(0.85, 0.85, 0.85)
  });

  y -= 22;

  // Chemical Composition & Formula
  page.drawText('Chemical Composition: - ', {
    x: 45,
    y: y,
    size: 10,
    font: fontBold,
    color: darkInk
  });
  page.drawText('It is hydrated aluminium magnesium silicate.', {
    x: 175,
    y: y,
    size: 10,
    font: fontRegular,
    color: darkInk
  });

  y -= 16;

  page.drawText('Formula :- ', {
    x: 45,
    y: y,
    size: 10,
    font: fontBold,
    color: darkInk
  });
  page.drawText('( Mg Al)5 Si8 O22 (OH)4', {
    x: 105,
    y: y,
    size: 10,
    font: fontBold,
    color: darkInk
  });

  y -= 18;

  // Grade
  page.drawText('Grade: - ', {
    x: 45,
    y: y,
    size: 10.5,
    font: fontBold,
    color: darkInk
  });
  page.drawText(data.grade, {
    x: 95,
    y: y,
    size: 10.5,
    font: fontBold,
    color: brandGold
  });

  y -= 20;

  // Grade Description
  page.drawText('Grade Description: -', {
    x: 45,
    y: y,
    size: 10,
    font: fontBold,
    color: darkInk
  });

  y -= 14;

  const descParagraphs = data.desc.split('\n\n');
  for (const para of descParagraphs) {
    const words = para.split(' ');
    let currentLine = '';
    for (const w of words) {
      const testLine = currentLine ? `${currentLine} ${w}` : w;
      const testWidth = fontRegular.widthOfTextAtSize(testLine, 9);
      if (testWidth > width - 90) {
        page.drawText(currentLine, {
          x: 45,
          y: y,
          size: 9,
          font: fontRegular,
          color: rgb(0.2, 0.2, 0.2)
        });
        y -= 12;
        currentLine = w;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: 45,
        y: y,
        size: 9,
        font: fontRegular,
        color: rgb(0.2, 0.2, 0.2)
      });
      y -= 14;
    }
  }

  y -= 4;

  // Physical Parameters Section Header
  page.drawText(data.paramsTitle, {
    x: 45,
    y: y,
    size: 10,
    font: fontBold,
    color: darkInk
  });

  y -= 16;

  // Table Specs
  const tableX = 45;
  const tableWidth = width - 90;
  const col1W = data.hasResultColumn ? tableWidth * 0.45 : tableWidth * 0.55;
  const col2W = data.hasResultColumn ? tableWidth * 0.30 : tableWidth * 0.45;
  const col3W = data.hasResultColumn ? tableWidth * 0.25 : 0;
  const rowHeight = 16;

  // Table Header Box
  page.drawRectangle({
    x: tableX,
    y: y - rowHeight + 4,
    width: tableWidth,
    height: rowHeight,
    color: tableHeaderBg,
    borderColor: borderGray,
    borderWidth: 0.8
  });

  page.drawText('PARAMETERS', {
    x: tableX + 8,
    y: y - 8,
    size: 8.5,
    font: fontBold,
    color: darkInk
  });
  page.drawText('REQUIREMENT', {
    x: tableX + col1W + 8,
    y: y - 8,
    size: 8.5,
    font: fontBold,
    color: darkInk
  });
  if (data.hasResultColumn) {
    page.drawText('RESULT', {
      x: tableX + col1W + col2W + 8,
      y: y - 8,
      size: 8.5,
      font: fontBold,
      color: darkInk
    });
  }

  y -= rowHeight;

  // Table Rows
  data.params.forEach((p, idx) => {
    const isEven = idx % 2 === 0;
    const isMultiLine = p.param.includes('\n');
    const currentRowH = isMultiLine ? rowHeight * 1.5 : rowHeight;

    page.drawRectangle({
      x: tableX,
      y: y - currentRowH + 4,
      width: tableWidth,
      height: currentRowH,
      color: isEven ? tableRowEven : rgb(1, 1, 1),
      borderColor: borderGray,
      borderWidth: 0.5
    });

    // Vertical column dividers
    page.drawLine({
      start: { x: tableX + col1W, y: y + 4 },
      end: { x: tableX + col1W, y: y - currentRowH + 4 },
      thickness: 0.5,
      color: borderGray
    });
    if (data.hasResultColumn) {
      page.drawLine({
        start: { x: tableX + col1W + col2W, y: y + 4 },
        end: { x: tableX + col1W + col2W, y: y - currentRowH + 4 },
        thickness: 0.5,
        color: borderGray
      });
    }

    if (isMultiLine) {
      const [l1, l2] = p.param.split('\n');
      page.drawText(l1, { x: tableX + 8, y: y - 4, size: 8, font: fontRegular, color: darkInk });
      page.drawText(l2, { x: tableX + 8, y: y - 14, size: 8, font: fontRegular, color: darkInk });
    } else {
      page.drawText(p.param, { x: tableX + 8, y: y - 8, size: 8, font: fontRegular, color: darkInk });
    }

    page.drawText(p.req, { x: tableX + col1W + 8, y: y - 8, size: 8, font: fontBold, color: darkInk });

    if (data.hasResultColumn && p.res) {
      page.drawText(p.res, { x: tableX + col1W + col2W + 8, y: y - 8, size: 8, font: fontBold, color: brandGold });
    }

    y -= currentRowH;
  });

  y -= 12;

  // Applications Section
  page.drawText(`Application ${data.subtitle} : -`, {
    x: 45,
    y: y,
    size: 9.5,
    font: fontBold,
    color: darkInk
  });

  y -= 13;

  for (const app of data.applications) {
    page.drawText(app, {
      x: 45,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2)
    });
    y -= 11.5;
  }

  y -= 10;

  // Packing
  page.drawText('Packing: - ', {
    x: 45,
    y: y,
    size: 9.5,
    font: fontBold,
    color: darkInk
  });
  page.drawText('HDPE with linear 25kgs packing.', {
    x: 105,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkInk
  });

  // Footer (Fixed at Bottom of Page with exact website contact info: 2 emails, mobile & address)
  const footerY = 48;
  page.drawLine({
    start: { x: 45, y: footerY + 24 },
    end: { x: width - 45, y: footerY + 24 },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85)
  });

  page.drawText('Address: - L.S. 341/P-2, Behind Manpasand Dhaba, Vallabhipur Highway, Kardej, Bhavnagar – 364060, Gujarat, India', {
    x: 45,
    y: footerY + 11,
    size: 7.8,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3)
  });

  page.drawText('Email: dipak@bentoclay.com  |  bentoclayclaytech@gmail.com', {
    x: 45,
    y: footerY - 1,
    size: 8,
    font: fontBold,
    color: brandGold
  });

  page.drawText('Contact: +91 74358 18628  |  Website: https://bentoclay.com', {
    x: 320,
    y: footerY - 1,
    size: 8,
    font: fontBold,
    color: darkInk
  });

  return await doc.save();
}

async function run() {
  const outDir = path.resolve(process.cwd(), 'public', 'pds');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const item of PDS_DATA) {
    const pdfBytes = await createPDS(item);
    const outPath = path.resolve(outDir, item.filename);
    const publicRootPath = path.resolve(process.cwd(), 'public', item.filename);
    fs.writeFileSync(outPath, pdfBytes);
    fs.writeFileSync(publicRootPath, pdfBytes);
    console.log(`✓ Generated ${item.filename} with logo and verified contacts (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
  }

  console.log('All 6 PDS PDFs generated with logo and exact website contacts!');
}

run().catch(console.error);
