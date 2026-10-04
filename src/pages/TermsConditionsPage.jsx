import { Link } from 'react-router-dom';

export default function TermsConditionsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container" style={{ padding: '80px 0 40px' }}>
          <span className="section-number">COMMERCIAL & LEGAL</span>
          <h1>Terms & Conditions of Sale & Export</h1>
          <p style={{ marginTop: '16px', maxWidth: '650px' }}>
            Official terms governing product sales, quality conformity, custom specifications, international maritime export, and website usage for Bentoclay Claytech.
          </p>
        </div>
      </section>
      
      <section className="legal-content" style={{ padding: '40px 0 90px' }}>
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto', lineHeight: '1.85' }}>
          
          <div style={{ background: '#fdfbf7', border: '1px solid #ebdccb', borderRadius: '12px', padding: '24px 28px', marginBottom: '40px' }}>
            <strong style={{ color: 'var(--green)', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
              📍 Company Profile & Registered Works
            </strong>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>
              <strong>Bentoclay Claytech</strong> · Plot No. 12/A, GIDC Industrial Estate, Kardej, Bhavnagar – 364004, Gujarat, India.<br />
              Email: <strong>bentoclayclaytech@gmail.com</strong> · WhatsApp / Phone: <strong>+91 74358 18628</strong>
            </p>
          </div>

          <h3>1. Scope of Agreement</h3>
          <p style={{ marginBottom: '24px' }}>
            These General Terms and Conditions govern all offers, proforma invoices, purchase orders, sales contracts, and shipments of Attapulgite (Palygorskite) powders, granules, and related mineral products entered into between Bentoclay Claytech ("Manufacturer / Seller") and the purchasing entity ("Buyer / Client"). Any differing terms proposed by the Buyer shall not apply unless expressly agreed upon in writing by an authorized representative of Bentoclay Claytech.
          </p>
          
          <h3 style={{ marginTop: '36px' }}>2. Product Specifications, Quality & Certificate of Analysis (COA)</h3>
          <p style={{ marginBottom: '16px' }}>
            All standard grades (Salt Gel, API-13A Section 12, Natural Powder, Flux Fine-200, Premium 325, and Natural Granules) are manufactured in accordance with our published Technical Data Sheets (PDS).
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--muted)' }}>
            <li><strong>Batch COA:</strong> Every commercial dispatch is accompanied by an authentic manufacturer Certificate of Analysis confirming viscosity (Fann dial reading), wet sieve residue (ASTM mesh), moisture content, and chemical parameters.</li>
            <li><strong>Tolerance Margins:</strong> Natural mineral products may exhibit minor natural variations in trace mineralogy that do not impair active rheological or suspension functionality.</li>
            <li><strong>Pre-Shipment Inspection:</strong> Buyers are entitled to appoint third-party inspection agencies (e.g., SGS, Bureau Veritas, Intertek) for independent testing at the factory or load port prior to dispatch, with inspection fees borne by the Buyer.</li>
          </ul>

          <h3 style={{ marginTop: '36px' }}>3. Custom Formulations & Tailored Mineral Shades</h3>
          <p style={{ marginBottom: '24px' }}>
            Where goods are manufactured against custom recipe codes (e.g., tailored mesh cuts, specific viscosity limits, or custom color shades like Off-White, Cream Tan, Buff Beige, or customer sample matching), the Seller will manufacture to the agreed target specification within commercially recognized tolerances. Production begins upon written approval of the sample or formulation code.
          </p>

          <h3 style={{ marginTop: '36px' }}>4. Export Packaging, Palletization & Containerization</h3>
          <p style={{ marginBottom: '16px' }}>
            Standard export consignments are packaged in new, heavy-duty 25 kg multi-wall woven HDPE bags with inner extruded polyethylene (PE) moisture barrier liners.
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', color: 'var(--muted)' }}>
            <li><strong>ISPM-15 Heat-Treated Pallets:</strong> When palletization is requested, pallets comply strictly with international phytosanitary standard ISPM-15, unitized with heavy-duty corner protectors and multi-layer waterproof stretch wrapping.</li>
            <li><strong>Container Stuffing:</strong> Standard 20ft maritime containers are loaded to approximately 20 to 22 Metric Tons depending on road weight regulations and destination port allowances.</li>
          </ul>

          <h3 style={{ marginTop: '36px' }}>5. Shipping Terms & Incoterms 2020</h3>
          <p style={{ marginBottom: '24px' }}>
            Shipments are executed under International Commercial Terms (Incoterms® 2020) as specified on the Proforma Invoice (typically <strong>FOB Pipavav Port / FOB Mundra Port</strong>, <strong>CIF</strong>, or <strong>CFR</strong> Destination Port). Risk of loss transfers in accordance with the specified Incoterm. Dispatch dates communicated are estimates based on production scheduling and vessel availability.
          </p>

          <h3 style={{ marginTop: '36px' }}>6. Sample Evaluation Policy</h3>
          <p style={{ marginBottom: '24px' }}>
            Laboratory evaluation samples (1 kg to 25 kg) are provided to qualified industrial buyers and formulation laboratories for trial testing and quality verification. Sample materials are provided for evaluation purposes only and remain representative of current production lots.
          </p>

          <h3 style={{ marginTop: '36px' }}>7. Commercial Terms & Payment</h3>
          <p style={{ marginBottom: '24px' }}>
            Payment terms are established on each Proforma Invoice and Sales Contract, commonly comprising Irrevocable Letter of Credit (L/C at sight) from a prime international bank, or Telegraphic Transfer (T/T Advance + balance against bill of lading copies). All banking charges in the buyer's country are for the buyer's account.
          </p>

          <h3 style={{ marginTop: '36px' }}>8. Technical Advice Disclaimer & Limitation of Liability</h3>
          <p style={{ marginBottom: '24px' }}>
            Technical advice, formulation guidelines, and performance suggestions provided verbally or in writing by Bentoclay Claytech representatives are offered in good faith based on laboratory experience. However, because application conditions, blending equipment, and raw material interactions vary widely across client facilities, the Buyer must independently evaluate the suitability of our product for their specific operational requirements. The Seller's maximum liability for any claim shall not exceed the invoice value of the specific batch in dispute.
          </p>

          <h3 style={{ marginTop: '36px' }}>9. Governing Law & Jurisdiction</h3>
          <p style={{ marginBottom: '24px' }}>
            All commercial transactions and legal disputes shall be governed by and construed in accordance with the laws of India, and subject to the exclusive jurisdiction of the competent courts in Bhavnagar, Gujarat, India.
          </p>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
              Have specific contract terms, tender requirements, or compliance questions?
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Commercial Team <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
