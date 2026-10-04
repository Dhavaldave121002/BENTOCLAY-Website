import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/faqs';

export default function FaqAccordion({
  limit = null,
  showFilter = true,
  showViewAllBtn = true,
  title = null,
  subtitle = null
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, []);

  const displayedFaqs = useMemo(() => {
    let list = faqs;
    if (showFilter && selectedCategory !== 'all') {
      list = faqs.filter((f) => f.category === selectedCategory);
    }
    if (limit && typeof limit === 'number') {
      return list.slice(0, limit);
    }
    return list;
  }, [selectedCategory, limit, showFilter]);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="faq-section section-pad" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-number">FREQUENTLY ASKED QUESTIONS</span>
            <h2>
              {title || (
                <>
                  Attapulgite questions,<br />
                  <span>answered with data.</span>
                </>
              )}
            </h2>
          </div>
          <p>
            {subtitle || 'Technical answers regarding mineral structure, drilling rheology, custom color matching, export packing, and quality testing.'}
          </p>
        </div>

        {/* Category Filter Pills (Only shown when full filter is enabled) */}
        {showFilter && (
          <div className="faq-category-pills" role="tablist" aria-label="FAQ Categories">
            <button
              type="button"
              className={`faq-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory('all');
                setOpenIndex(0);
              }}
            >
              All Questions ({faqs.length})
            </button>
            {categories
              .filter((c) => c !== 'all')
              .map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`faq-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setOpenIndex(0);
                  }}
                >
                  {cat}
                </button>
              ))}
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="faq-container">
          {displayedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-content">
                    {faq.category && (
                      <span className="faq-cat-badge">
                        <span className="cat-icon">{faq.categoryIcon || '🔹'}</span> {faq.category}
                      </span>
                    )}
                    <span className="faq-q-text">{faq.question}</span>
                  </div>
                  <span className={`faq-toggle-icon ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className="toggle-svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" className="vert-line" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                <div className="faq-answer-wrapper" aria-hidden={!isOpen}>
                  <div className="faq-answer-inner">
                    <div className="faq-structured-answer">
                      {/* 1. Quick Takeaway Summary Box */}
                      <div className="faq-summary-banner">
                        <div className="summary-indicator-bar" />
                        <div className="summary-content">
                          <strong>Quick Summary:</strong>
                          <p>{faq.summary || faq.answer}</p>
                        </div>
                      </div>

                      {/* 2. Structured Key Points Breakdown */}
                      {faq.points && faq.points.length > 0 && (
                        <div className="faq-points-grid">
                          {faq.points.map((pt, pIdx) => (
                            <div key={pIdx} className="faq-point-card">
                              <div className="point-icon-dot">✓</div>
                              <div className="point-text-block">
                                <strong className="point-title">{pt.title}</strong>
                                <span className="point-desc">{pt.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Fallback legacy text if no points */}
                      {!faq.points && faq.answer && (
                        <div className="faq-legacy-text">
                          <p>{faq.answer}</p>
                        </div>
                      )}

                      {/* 3. Highlighted Keywords / Tags */}
                      {faq.tags && faq.tags.length > 0 && (
                        <div className="faq-tags-row">
                          <span className="tags-label">Key Specifications:</span>
                          <div className="tags-list">
                            {faq.tags.map((t, tIdx) => (
                              <span key={tIdx} className="faq-spec-tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Button for Homepage / Other Pages */}
        {limit && showViewAllBtn && (
          <div className="faq-bottom-cta">
            <Link to="/faq" className="btn btn-secondary btn-view-all-faqs">
              <span>View all {faqs.length} Technical FAQs</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
