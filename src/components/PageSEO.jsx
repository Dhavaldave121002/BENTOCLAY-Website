import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { blogArticles } from '../data/blogData';
import { faqs } from '../data/faqs';

const BASE_URL = 'https://bentoclay.com';

const PAGE_META_CONFIG = {
  '/': {
    title: 'Bentoclay Claytech | Global Manufacturer & Exporter of Attapulgite Clay & Granules (API Spec 13A)',
    description: "Bentoclay Claytech is India's premier manufacturer & global exporter of high-grade Attapulgite (Palygorskite CAS: 12174-11-7, HS Code: 25084000) clay products: API-13A drilling clay, Premium 325 mesh paint thixotropes, foundry flux, and absorbent granules.",
    keywords: 'Bentoclay Claytech, Attapulgite powder manufacturer India, Attapulgite clay exporter, API 13A Section 12 drilling clay, Salt Gel attapulgite, Premium 325 mesh, Palygorskite Bhavnagar, CAS 12174-11-7, HS Code 25084000',
    type: 'website'
  },
  '/products': {
    title: 'Attapulgite Mineral Grades & Product Catalog | Bentoclay Claytech Bhavnagar',
    description: 'Explore Bentoclay’s 6 certified Attapulgite & Palygorskite grades: API-13A Section 12 drilling muds, Salt Gel, Premium 325 mesh paint additives, Flux Fine-200 foundry wash, and calcined granules.',
    keywords: 'Attapulgite product grades, API 13A drilling clay, Salt Gel powder, Premium 325 mesh, foundry flux clay, absorbent granules 1-5mm, attapulgite catalog',
    type: 'website'
  },
  '/why-us': {
    title: 'Why Bentoclay | Bhavnagar Mineral Works, In-House QC & Mundra Export Gateways',
    description: 'Discover Bentoclay Claytech’s manufacturing advantages: captive mine ore sourcing, automated pulverizers, rotary calcining kilns, ISO testing laboratory, and fast dispatch from Mundra Port.',
    keywords: 'Why choose Bentoclay, Attapulgite factory Bhavnagar, ISO quality control clay, Mundra port mineral export, selective mining Gujarat',
    type: 'website'
  },
  '/applications': {
    title: '16 Industry Applications for Attapulgite Clay | Oilfield, Paints, Foundry, Agro | Bentoclay',
    description: 'Technical applications of Bentoclay attapulgite clay in Oil & Gas drilling fluids, paints & coatings, foundry core wash, agrochemical carriers, cat litter, civil construction, and bleaching earth.',
    keywords: 'Attapulgite applications, drilling fluids clay, paint thixotrope, foundry flux additive, pesticide carrier granules, pet care absorbents',
    type: 'website'
  },
  '/about': {
    title: 'About Bentoclay Claytech | Leading Attapulgite Manufacturer & Global Mineral Exporter',
    description: 'Bentoclay Claytech is a trusted Indian manufacturer and exporter of engineered attapulgite minerals based in GIDC Kardej, Bhavnagar, Gujarat. Dedicated to customer satisfaction & quality.',
    keywords: 'About Bentoclay Claytech, Bhavnagar mineral company, Kardej GIDC manufacturer, Gujarat clay mining exporter',
    type: 'website'
  },
  '/contact': {
    title: 'Contact Bentoclay Claytech | Request Custom Spec Quotation & Free 25kg Lab Sample',
    description: 'Get in touch with Bentoclay Claytech technical sales team for custom viscosity milling, 25 kg testing samples, container export pricing, and factory direct quotations.',
    keywords: 'Contact Bentoclay Claytech, request attapulgite quote, free lab sample COA, mineral sales Bhavnagar WhatsApp',
    type: 'website'
  },
  '/blog': {
    title: 'Attapulgite Mineral Insights, Technical Guides & Product Spotlights | Bentoclay',
    description: 'Read technical engineering guides, API Spec 13A oilfield standards, rheology modification in coatings, foundry metallurgy, and mineralogy insights from Bentoclay Claytech.',
    keywords: 'Attapulgite technical blog, drilling mud articles, paint thixotrope guides, API Spec 13A Section 12 tutorial, mineralogy Bhavnagar',
    type: 'website'
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) | Attapulgite Specs, Packaging & Shipping | Bentoclay',
    description: 'Find answers to common technical, commercial, and export questions about Bentoclay Attapulgite clay, API certifications, bag packaging, MOQs, and maritime shipping.',
    keywords: 'Attapulgite FAQ, drilling clay questions, API 13A moisture residue standards, export packaging 25kg HDPE, Mundra port shipping FAQ',
    type: 'website'
  },
  '/terms-conditions': {
    title: 'Terms of Supply, Quality Warranty & Incoterms 2020 | Bentoclay Claytech',
    description: 'Review Bentoclay Claytech commercial terms of supply, Incoterms 2020 (FOB, CIF, CFR), Certificate of Analysis (COA) quality warranties, and containerized dispatch policies.',
    keywords: 'Bentoclay terms conditions, mineral supply warranty, Incoterms 2020 Mundra, COA batch analysis warranty',
    type: 'website'
  }
};

export default function PageSEO() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let meta = PAGE_META_CONFIG[location.pathname];
    let structuredDataGraph = [];
    let breadcrumbs = [{ name: 'Home', url: `${BASE_URL}/` }];

    // Base Organization Schema (Entity Graph for GEO, AIO & Knowledge Panels)
    const baseOrg = {
      '@type': ['Organization', 'LocalBusiness', 'Manufacturer'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Bentoclay Claytech',
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
      cssSelector: ['h1', '.aeo-answer-block', '.product-hero-desc', '.overview-text', '.faq-summary']
    };

    // Handle dynamic Product Detail Page
    if (!meta && location.pathname.startsWith('/products/')) {
      const slug = location.pathname.replace('/products/', '');
      const product = products.find(p => p.id === slug || p.slug === slug);
      if (product) {
        meta = {
          title: `${product.name} (${product.shortName}) | Bentoclay Claytech Bhavnagar`,
          description: `${product.name}: ${product.metaDescription || product.tagline || product.inShort || 'Engineered Attapulgite mineral by Bentoclay Claytech'}. Available for domestic & worldwide container export.`,
          keywords: `${product.name}, ${product.shortName}, ${product.type}, ${product.form}, Attapulgite ${product.shortName}, Bentoclay Claytech Bhavnagar, CAS 12174-11-7, HS Code 25084000`,
          type: 'product',
          image: product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/assets/product-range.webp`
        };

        breadcrumbs.push(
          { name: 'Products', url: `${BASE_URL}/products` },
          { name: product.name, url: `${BASE_URL}/products/${product.slug || product.id}` }
        );

        // Rich Product Schema for Google Search Rich Cards
        const productSchema = {
          '@type': 'Product',
          '@id': `${BASE_URL}/products/${product.slug || product.id}#product`,
          name: product.name,
          alternateName: product.shortName,
          description: product.inShort || product.desc || product.tagline,
          image: product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/assets/product-range.webp`,
          sku: `BC-${product.code || 'GRADE'}`,
          mpn: `BC-${product.id}`,
          brand: {
            '@type': 'Brand',
            name: 'Bentoclay Claytech'
          },
          manufacturer: {
            '@id': `${BASE_URL}/#organization`
          },
          category: product.type || 'Industrial Minerals',
          material: 'Attapulgite / Palygorskite Clay (CAS 12174-11-7)',
          offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/products/${product.slug || product.id}`,
            priceCurrency: 'USD',
            price: '0.00',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@id': `${BASE_URL}/#organization`
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
          title: `${article.title} | Bentoclay Technical Article`,
          description: article.excerpt || 'Technical guide on industrial attapulgite applications by Bentoclay Claytech.',
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
          description: article.excerpt,
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
      // Complete FAQ Schema (Google Featured Snippets / AEO)
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
