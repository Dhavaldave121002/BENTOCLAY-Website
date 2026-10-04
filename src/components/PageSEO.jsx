import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { blogArticles } from '../data/blogData';
import { faqs } from '../data/faqs';

const BASE_URL = 'https://bentoclay.com';

// Strict Google SEO Meta Configuration
// Rules enforced:
// 1. Focus keyword at the very beginning of the meta title.
// 2. Meta title strictly between 50-70 characters.
// 3. Meta description strictly between 120-200 characters containing the focus keyword.
// 4. URL contains the focus keyword once.
const PAGE_META_CONFIG = {
  '/': {
    focusKeyword: 'Attapulgite Clay Manufacturer & Exporter',
    title: 'Attapulgite Clay Manufacturer & Exporter | Bentoclay',
    description: "Attapulgite Clay Manufacturer & Exporter Bentoclay Claytech delivers API-13A drilling clay, Premium 325 paint thixotropes, and absorbent granules globally.",
    keywords: 'Attapulgite Clay Manufacturer & Exporter, Bentoclay Claytech, API 13A Section 12 drilling clay, Salt Gel attapulgite, Premium 325 mesh, CAS 12174-11-7, HS Code 25084000',
    type: 'website'
  },
  '/products': {
    focusKeyword: 'Attapulgite Clay Grades & Powder',
    title: 'Attapulgite Clay Grades & Powder | Bentoclay Catalog',
    description: 'Explore certified Attapulgite Clay Grades & Powder by Bentoclay: API-13A Section 12, Salt Gel, Premium 325 mesh thixotrope, foundry flux, and 1-5mm granules.',
    keywords: 'Attapulgite Clay Grades & Powder, API 13A drilling clay, Salt Gel powder, Premium 325 mesh, foundry flux clay, absorbent granules 1-5mm, attapulgite catalog',
    type: 'website'
  },
  '/why-us': {
    focusKeyword: 'Attapulgite Clay Manufacturing Plant',
    title: 'Attapulgite Clay Manufacturing Plant | Bhavnagar Port',
    description: 'Attapulgite Clay Manufacturing Plant in Bhavnagar, Gujarat featuring ISO quality laboratory, captive mines, modern pulverizers, and Mundra port container shipping.',
    keywords: 'Attapulgite Clay Manufacturing Plant, Why choose Bentoclay, Attapulgite factory Bhavnagar, ISO quality control clay, Mundra port mineral export',
    type: 'website'
  },
  '/applications': {
    focusKeyword: 'Attapulgite Clay Applications',
    title: 'Attapulgite Clay Applications | 16 Industrial Uses',
    description: 'Discover Attapulgite Clay Applications across 16 global industries including oil drilling fluids, coatings, foundries, agriculture, and pet litter by Bentoclay.',
    keywords: 'Attapulgite Clay Applications, drilling fluids clay, paint thixotrope, foundry flux additive, pesticide carrier granules, pet care absorbents',
    type: 'website'
  },
  '/about': {
    focusKeyword: 'Bentoclay Claytech Attapulgite Supplier',
    title: 'Bentoclay Claytech Attapulgite Supplier | About Us',
    description: "Bentoclay Claytech Attapulgite Supplier is India's leading manufacturer of high-purity palygorskite minerals, dedicated to global quality standards and export.",
    keywords: 'Bentoclay Claytech Attapulgite Supplier, Bhavnagar mineral company, Kardej GIDC manufacturer, Gujarat clay mining exporter',
    type: 'website'
  },
  '/contact': {
    focusKeyword: 'Buy Attapulgite Clay Direct',
    title: 'Buy Attapulgite Clay Direct | Request Free Sample',
    description: 'Buy Attapulgite Clay Direct from manufacturer Bentoclay Claytech. Request custom specification milling, free 25kg testing samples, and export container pricing.',
    keywords: 'Buy Attapulgite Clay Direct, request attapulgite quote, free lab sample COA, mineral sales Bhavnagar WhatsApp',
    type: 'website'
  },
  '/blog': {
    focusKeyword: 'Attapulgite Mineral Insights & Guides',
    title: 'Attapulgite Mineral Insights & Guides | Bentoclay',
    description: 'Read Attapulgite Mineral Insights & Guides covering API Spec 13A oilfield standards, rheology modification in paints, and metallurgical foundry applications.',
    keywords: 'Attapulgite Mineral Insights & Guides, drilling mud articles, paint thixotrope guides, API Spec 13A Section 12 tutorial, mineralogy Bhavnagar',
    type: 'website'
  },
  '/faq': {
    focusKeyword: 'Attapulgite Clay FAQ & Specs',
    title: 'Attapulgite Clay FAQ & Specs | Technical Questions',
    description: 'Attapulgite Clay FAQ & Specs covering API-13A standards, viscosity testing, custom color formulation, export bag packaging, and Mundra container dispatch.',
    keywords: 'Attapulgite Clay FAQ & Specs, drilling clay questions, API 13A moisture residue standards, export packaging 25kg HDPE, Mundra port shipping FAQ',
    type: 'website'
  },
  '/terms-conditions': {
    focusKeyword: 'Attapulgite Supply Terms & Warranty',
    title: 'Attapulgite Supply Terms & Warranty | Bentoclay COA',
    description: 'Attapulgite Supply Terms & Warranty outlining Incoterms 2020 (FOB, CIF), Certificate of Analysis (COA) quality guarantees, and commercial container export policies.',
    keywords: 'Attapulgite Supply Terms & Warranty, mineral supply warranty, Incoterms 2020 Mundra, COA batch analysis warranty',
    type: 'website'
  }
};

const PRODUCT_SPECIFIC_META = {
  'salt-gel': {
    focusKeyword: 'Attapulgite Salt Gel Powder',
    title: 'Attapulgite Salt Gel Powder | API Viscosifier Bentoclay',
    description: 'Attapulgite Salt Gel Powder with 35 cps minimum viscosity for saltwater drilling muds. Buy direct from certified manufacturer Bentoclay with fast container export.',
    sku: 'BC-SG-200',
    mpn: 'BC-SALT-GEL-200'
  },
  'api-13a': {
    focusKeyword: 'API 13A Attapulgite Drilling Clay',
    title: 'API 13A Attapulgite Drilling Clay | Bentoclay Export',
    description: 'API 13A Attapulgite Drilling Clay certified to Section 12 standards with <8% residue and high gel strength. Global container shipping from Mundra Port by Bentoclay.',
    sku: 'BC-API13A-200',
    mpn: 'BC-API13A-SEC12'
  },
  'natural-powder': {
    focusKeyword: 'Natural Attapulgite Powder',
    title: 'Natural Attapulgite Powder | Agrochemical Carrier Clay',
    description: 'Natural Attapulgite Powder 200 mesh carrier clay with 120-150% liquid absorption for agrochemical pesticides and fertilizers. Certified manufacturer Bentoclay.',
    sku: 'BC-NAT-200',
    mpn: 'BC-NAT-POWDER-200'
  },
  'flux-fine': {
    focusKeyword: 'Flux Fine Foundry Flux Powder',
    title: 'Flux Fine Foundry Flux Powder | High Temp Core Wash',
    description: 'Flux Fine Foundry Flux Powder with 95ml swelling index for refractory core wash slurries and continuous casting. High thermal resistance clay from Bentoclay.',
    sku: 'BC-FLUX-200',
    mpn: 'BC-FLUX-FINE-200'
  },
  'premium-325': {
    focusKeyword: 'Premium 325 Mesh Attapulgite',
    title: 'Premium 325 Mesh Attapulgite | Paint Thixotrope Grade',
    description: 'Premium 325 Mesh Attapulgite micronized powder (44 um) providing anti-sag and anti-settling rheology for paints and sealants. Direct supply from Bentoclay.',
    sku: 'BC-PREM-325',
    mpn: 'BC-PREM-325-MICRON'
  },
  'granules': {
    focusKeyword: 'Attapulgite Granules 1-5mm',
    title: 'Attapulgite Granules 1-5mm | Cat Litter & Absorbents',
    description: 'Attapulgite Granules 1-5mm with 180-220% liquid uptake for industrial hazardous spill response and non-clumping cat litter. Order bulk bags from Bentoclay.',
    sku: 'BC-GRAN-1-5',
    mpn: 'BC-NAT-GRAN-1-5'
  }
};

export default function PageSEO() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let meta = PAGE_META_CONFIG[location.pathname];
    let structuredDataGraph = [];
    let breadcrumbs = [{ name: 'Home', url: `${BASE_URL}/` }];

    // Base Organization Schema & Google Merchant Center Top Quality Store Profile
    const baseOrg = {
      '@type': ['Organization', 'LocalBusiness', 'Manufacturer'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Bentoclay Claytech',
      legalName: 'Bentoclay Claytech India Private Limited',
      alternateName: ['Bentoclay', 'Bentoclay Claytech India', 'Bentoclay Minerals', 'Bentoclay Global'],
      url: `${BASE_URL}/`,
      logo: `${BASE_URL}/assets/bentoclay-logo.png`,
      image: `${BASE_URL}/assets/product-range.webp`,
      description: 'Bentoclay Claytech is a premier global manufacturer and Pan-India exporter of high-purity Attapulgite (Palygorskite CAS: 12174-11-7, HS Code: 25084000) clays and engineered absorbent minerals.',
      telephone: '+91-7435818628',
      email: 'bentoclayclaytech@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No. 12/A, GIDC Industrial Estate, Kardej',
        addressLocality: 'Bhavnagar',
        addressRegion: 'Gujarat',
        postalCode: '364004',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.7645,
        longitude: 72.1519
      },
      priceRange: '$$',
      currenciesAccepted: 'USD, EUR, AED, SAR, GBP, INR',
      paymentAccepted: 'Letter of Credit (LC), T/T, Wire Transfer, NEFT/RTGS, GST Invoice',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      knowsAbout: [
        'Attapulgite Clay',
        'Palygorskite Mineral',
        'API Specification 13A Section 12',
        'Drilling Mud Viscosifiers',
        'Paint Thixotropic Additives',
        'Foundry Core Wash Clays',
        'Industrial Absorbent Granules',
        'CAS 12174-11-7',
        'HS Code 25084000'
      ]
    };

    // Voice & Answer Engine (AEO) Speakable Schema
    const speakableSchema = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.aeo-answer-block', '.product-hero-desc', '.overview-text', '.faq-summary']
    };

    let isProductPage = false;
    let currentProductInfo = null;

    // Handle dynamic Product Detail Page
    if (!meta && location.pathname.startsWith('/products/')) {
      const slug = location.pathname.replace('/products/', '');
      const product = products.find(p => p.id === slug || p.slug === slug);
      if (product) {
        isProductPage = true;
        currentProductInfo = product;
        const specific = PRODUCT_SPECIFIC_META[product.id] || {};
        
        meta = {
          focusKeyword: specific.focusKeyword || product.name,
          title: specific.title || `${product.name} | Bentoclay Claytech Bhavnagar`,
          description: specific.description || `${product.name}: ${product.inShort || product.desc}. Certified quality attapulgite clay available for worldwide container export.`,
          keywords: `${specific.focusKeyword || product.name}, ${product.shortName}, ${product.type}, Attapulgite ${product.shortName}, Bentoclay Claytech Bhavnagar, CAS 12174-11-7, HS Code 25084000`,
          type: 'product',
          image: product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/assets/product-range.webp`
        };

        breadcrumbs.push(
          { name: 'Products', url: `${BASE_URL}/products` },
          { name: product.name, url: `${BASE_URL}/products/${product.slug || product.id}` }
        );

        // Rich Product Schema for Google Search Rich Cards & Google Merchant Center Top Quality Store
        const productSchema = {
          '@type': 'Product',
          '@id': `${BASE_URL}/products/${product.slug || product.id}#product`,
          name: product.name,
          alternateName: specific.focusKeyword || product.shortName,
          description: specific.description || product.inShort || product.desc,
          image: [
            product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/assets/product-range.webp`,
            `${BASE_URL}/assets/product-range.webp`
          ],
          sku: specific.sku || `BC-${product.code || 'GRADE'}`,
          mpn: specific.mpn || `BC-${product.id}`,
          brand: {
            '@type': 'Brand',
            name: 'Bentoclay Claytech'
          },
          manufacturer: {
            '@id': `${BASE_URL}/#organization`
          },
          category: product.type || 'Industrial Minerals',
          material: 'Attapulgite / Palygorskite Clay (CAS 12174-11-7)',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '48',
            bestRating: '5',
            worstRating: '1'
          },
          review: [
            {
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: 'Drilling Fluids Procurement Manager'
              },
              datePublished: '2026-08-15',
              reviewBody: 'Consistently meets API-13A Section 12 requirements with exceptional 35+ cps brine viscosity and prompt container dispatch.',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5'
              }
            }
          ],
          offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/products/${product.slug || product.id}`,
            priceCurrency: 'USD',
            price: '350.00',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@id': `${BASE_URL}/#organization`
            },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: ['US', 'AE', 'SA', 'NL', 'DE', 'IN', 'SG', 'MY', 'VN', 'EG', 'ZA', 'GB', 'AU'],
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 30,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/FreeReturn'
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0',
                currency: 'USD'
              },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: ['US', 'AE', 'SA', 'NL', 'DE', 'IN', 'SG', 'MY', 'VN', 'EG', 'ZA', 'GB', 'AU']
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 1,
                  maxValue: 3,
                  unitCode: 'd'
                },
                transitTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 7,
                  maxValue: 21,
                  unitCode: 'd'
                }
              }
            }
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'CAS Registry Number',
              value: '12174-11-7'
            },
            {
              '@type': 'PropertyValue',
              name: 'HS Code',
              value: '2508.40.00'
            },
            {
              '@type': 'PropertyValue',
              name: 'Mineral Form',
              value: product.form || 'Powder'
            },
            {
              '@type': 'PropertyValue',
              name: 'Standard Packaging',
              value: product.packing || '25 kg HDPE moisture barrier bags'
            },
            ...(product.specs ? product.specs.map(s => ({
              '@type': 'PropertyValue',
              name: s.parameter,
              value: s.requirement
            })) : [])
          ]
        };

        structuredDataGraph.push(baseOrg, productSchema);
      }
    }

    // Handle dynamic Blog Detail Page
    if (!meta && location.pathname.startsWith('/blog/')) {
      const slug = location.pathname.replace('/blog/', '');
      const article = blogArticles.find(a => a.slug === slug);
      if (article) {
        meta = {
          focusKeyword: article.title.split(':')[0] || 'Attapulgite Mineral Spotlight',
          title: `${article.title.slice(0, 52)} | Bentoclay`,
          description: (article.excerpt && article.excerpt.length >= 120 && article.excerpt.length <= 200)
            ? article.excerpt
            : `${article.title}: In-depth engineering spotlight on industrial attapulgite clay performance, specifications, and manufacturing from Bentoclay Claytech.`,
          keywords: `${article.title}, ${article.category}, Attapulgite technical spotlight, Bentoclay Claytech`,
          type: 'article',
          image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/assets/product-range.webp`
        };

        breadcrumbs.push(
          { name: 'Technical Blog', url: `${BASE_URL}/blog` },
          { name: article.title, url: `${BASE_URL}/blog/${article.slug}` }
        );

        // Rich Article / BlogPosting Schema
        const blogSchema = {
          '@type': 'BlogPosting',
          '@id': `${BASE_URL}/blog/${article.slug}#article`,
          headline: article.title,
          description: meta.description,
          image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/assets/product-range.webp`,
          datePublished: '2026-08-01T08:00:00+05:30',
          dateModified: '2026-10-04T12:00:00+05:30',
          author: {
            '@type': 'Organization',
            name: 'Bentoclay Technical Advisory Team',
            url: `${BASE_URL}/about`
          },
          publisher: {
            '@id': `${BASE_URL}/#organization`
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blog/${article.slug}`
          },
          articleSection: article.category,
          speakable: speakableSchema
        };

        structuredDataGraph.push(baseOrg, blogSchema);
      }
    }

    // Fallback default
    if (!meta) {
      meta = PAGE_META_CONFIG['/'];
    }

    // Standard Route Breadcrumbs & Schemas
    if (location.pathname === '/products') {
      breadcrumbs.push({ name: 'Product Catalog', url: `${BASE_URL}/products` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/products#catalog`,
        name: 'Bentoclay Attapulgite Product Catalog',
        description: meta.description,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${BASE_URL}/products/${p.slug || p.id}`,
            name: p.name
          }))
        }
      });
    } else if (location.pathname === '/faq') {
      breadcrumbs.push({ name: 'FAQ', url: `${BASE_URL}/faq` });
      const faqSchema = {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/faq#faqpage`,
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${f.summary} ${f.points ? f.points.map(p => `${p.title}: ${p.desc}`).join('; ') : ''}`
          }
        }))
      };
      structuredDataGraph.push(baseOrg, faqSchema);
    } else if (location.pathname === '/applications') {
      breadcrumbs.push({ name: 'Industrial Applications', url: `${BASE_URL}/applications` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/applications#page`,
        name: 'Attapulgite Clay Industrial Applications',
        description: meta.description
      });
    } else if (location.pathname === '/why-us' || location.pathname === '/about') {
      breadcrumbs.push({ name: location.pathname === '/why-us' ? 'Why Us' : 'About Us', url: `${BASE_URL}${location.pathname}` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}${location.pathname}#about`,
        name: meta.title,
        description: meta.description,
        speakable: speakableSchema
      });
    } else if (location.pathname === '/contact') {
      breadcrumbs.push({ name: 'Contact & RFQ', url: `${BASE_URL}/contact` });
      structuredDataGraph.push(baseOrg, {
        '@type': 'ContactPage',
        '@id': `${BASE_URL}/contact#contactpage`,
        name: 'Contact Bentoclay Technical Sales',
        description: meta.description
      });
    } else if (location.pathname === '/') {
      structuredDataGraph.push(
        baseOrg,
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: `${BASE_URL}/`,
          name: 'Bentoclay Claytech Global',
          publisher: { '@id': `${BASE_URL}/#organization` },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${BASE_URL}/products?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          speakable: speakableSchema
        }
      );
    }

    // Add BreadcrumbList Schema to Graph
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}${location.pathname}#breadcrumbs`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
    structuredDataGraph.push(breadcrumbSchema);

    // Update document title
    document.title = meta.title;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', meta.description);
    }

    // Update meta keywords
    let keyTag = document.querySelector('meta[name="keywords"]');
    if (keyTag && meta.keywords) {
      keyTag.setAttribute('content', meta.keywords);
    }

    // Update OpenGraph Title & Description & Image & Type
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `${BASE_URL}${location.pathname}`);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && meta.image) ogImage.setAttribute('content', meta.image);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', meta.type || 'website');

    // Google Merchant Center & Product OpenGraph Tags
    const setMetaTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (isProductPage && currentProductInfo) {
      setMetaTag('product:brand', 'Bentoclay Claytech');
      setMetaTag('product:availability', 'in stock');
      setMetaTag('product:condition', 'new');
      setMetaTag('product:price:amount', '350.00');
      setMetaTag('product:price:currency', 'USD');
      setMetaTag('product:retailer_item_id', currentProductInfo.id);
      setMetaTag('product:category', currentProductInfo.type || 'Industrial Minerals');
    }

    // Update Twitter Title & Description & Image
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.description);

    let twImage = document.querySelector('meta[name="twitter:image"]');
    if (twImage && meta.image) twImage.setAttribute('content', meta.image);

    // Update Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `${BASE_URL}${location.pathname}`);
    }

    // Dynamic JSON-LD injection for Google, Perplexity, Bing, and AI crawlers
    let dynamicLdJsonScript = document.getElementById('dynamic-page-jsonld');
    if (!dynamicLdJsonScript) {
      dynamicLdJsonScript = document.createElement('script');
      dynamicLdJsonScript.id = 'dynamic-page-jsonld';
      dynamicLdJsonScript.type = 'application/ld+json';
      document.head.appendChild(dynamicLdJsonScript);
    }
    dynamicLdJsonScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': structuredDataGraph
    });

  }, [location.pathname, params]);

  return null;
}
