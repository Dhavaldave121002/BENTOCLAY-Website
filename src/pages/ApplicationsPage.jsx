import { useState } from 'react';
import { Link } from 'react-router-dom';
import { industries } from '../data/industries';
import { products } from '../data/products';
import ProductModal from '../components/ProductModal';

export default function ApplicationsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProductObj = (gradeId) => {
    return products.find((p) => p.id === gradeId);
  };

  return (
    <main>
      <section className="page-hero applications-hero">
        <div className="container">
          <div>
            <span className="section-number">INDUSTRIAL APPLICATIONS</span>
            <h1>
              One mineral.<br />
              <em>Multiple advantages.</em>
            </h1>
            <p>
              From saline drilling mud to premium architectural coatings, attapulgite brings valuable rheology, absorption, binding and stability to demanding industrial processes.
            </p>
          </div>
          <figure className="page-visual">
            <img
              src="/assets/applications-industries.webp"
              alt="Attapulgite applications across drilling, foundry, coatings and agriculture"
            />
          </figure>
        </div>
      </section>

      <section className="function-strip">
        <div className="container">
          <span>VISCOSITY</span>
          <span>SUSPENSION</span>
          <span>ABSORPTION</span>
          <span>BINDING</span>
          <span>STABILITY</span>
        </div>
      </section>

      {/* Comprehensive Industry Grid */}
      <section className="industry-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-number">16 TARGET INDUSTRIES</span>
              <h2>
                Grade-to-industry<br />
                <span>performance mapping.</span>
              </h2>
            </div>
            <p>Select any grade to view certified parameters and specifications.</p>
          </div>

          <div className="industry-grid">
            {industries.map((ind, i) => (
              <article key={i} className="industry-card">
                <div className="industry-card-top">
                  <div className="industry-icon-pill">
                    <span className="ind-icon">{ind.icon || '🏭'}</span>
                    <span className="ind-profile-tag">APPLICATION PROFILE</span>
                  </div>
                  <span className="industry-index">0{i + 1 > 9 ? i + 1 : `0${i + 1}`}</span>
                </div>

                <div className="industry-card-body">
                  <h3>{ind.name}</h3>
                  <p className="industry-desc">{ind.shortDesc}</p>
                  
                  <div className="industry-benefit-box">
                    <span className="benefit-icon">✨</span>
                    <div>
                      <strong>Key Performance Advantage:</strong>
                      <span>{ind.keyBenefit}</span>
                    </div>
                  </div>
                </div>

                <div className="industry-card-footer">
                  <small className="grades-label">RECOMMENDED GRADES:</small>
                  <div className="grade-badges-inline">
                    {ind.recommendedGrades.map((gId) => {
                      const p = getProductObj(gId);
                      if (!p) return null;
                      return (
                        <Link
                          key={gId}
                          to={`/products/${p.slug || p.id}`}
                          className="grade-pill-link"
                        >
                          <span>{p.shortName}</span>
                          <small>({p.form})</small>
                          <span className="pill-arrow">↗</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}

            <article className="industry-quote industry-card">
              <div className="quote-badge">💡 TECHNICAL MATCHING</div>
              <h3>Tell us what performance you need.</h3>
              <p>Our Bhavnagar technical team will evaluate your process rheology, mesh cut, or absorption needs and formulate matching grade samples.</p>
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <Link className="btn btn-white" to="/contact">
                  Request Grade Advice <span>↗</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="container">
          <div>
            <span>DIRECT TECHNICAL & COMMERCIAL INQUIRIES</span>
            <h2>Need grade recommendations for your application?</h2>
          </div>
          <Link className="btn btn-white" to="/contact">
            Request quotation <b>↗</b>
          </Link>
        </div>
      </section>

      {/* Specification Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
