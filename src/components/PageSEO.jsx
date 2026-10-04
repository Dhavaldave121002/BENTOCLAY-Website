import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { blogArticles } from '../data/blogData';

const PAGE_META_CONFIG = {
  '/': {
    title: 'Bentoclay Claytech | Global Manufacturer & Exporter of Attapulgite Clay & Granules (API Spec 13A)',
    description: "Bentoclay Claytech is India's premier manufacturer & global exporter of high-grade Attapulgite (Palygorskite) clay products: API-13A drilling clay, Premium 325 mesh paint thixotropes, foundry wash, and absorbent granules.",
    keywords: 'Bentoclay Claytech, Attapulgite powder manufacturer India, Attapulgite clay exporter, API 13A Section 12 drilling clay, Salt Gel attapulgite, Premium 325 mesh'
  },
  '/products': {
    title: 'Attapulgite Mineral Grades & Product Range | Bentoclay Claytech Bhavnagar',
    description: 'Explore Bentoclay’s 6 certified Attapulgite & Palygorskite grades: API-13A drilling muds, Salt Gel, Premium 325 mesh paint additives, Flux Fine-200 foundry wash, and calcined granules.',
    keywords: 'Attapulgite product grades, API 13A drilling clay, Salt Gel powder, Premium 325 mesh, foundry flux clay, absorbent granules 1-5mm'
  },
  '/why-us': {
    title: 'Why Bentoclay | Bhavnagar Mineral Works, In-House QC & Mundra Export Gateways',
    description: 'Discover Bentoclay Claytech’s manufacturing advantages: selective mining, modern pulverizers, rotary calcining kilns, ISO testing laboratory, and fast dispatch from Mundra Port.',
    keywords: 'Why choose Bentoclay, Attapulgite factory Bhavnagar, ISO quality control clay, Mundra port mineral export, selective mining Gujarat'
  },
  '/applications': {
    title: '16 Industry Applications for Attapulgite Clay | Oilfield, Paints, Foundry, Agro | Bentoclay',
    description: 'Technical applications of Bentoclay attapulgite clay in Oil & Gas drilling fluids, paints & coatings, foundry core wash, agrochemical carriers, cat litter, civil construction, and bleaching earth.',
    keywords: 'Attapulgite applications, drilling fluids clay, paint thixotrope, foundry flux additive, pesticide carrier granules, pet care absorbents'
  },
  '/about': {
    title: 'About Bentoclay Claytech | Leading Attapulgite Manufacturer & Global Mineral Exporter',
    description: 'Bentoclay Claytech is a trusted Indian manufacturer and exporter of engineered attapulgite minerals based in GIDC Kardej, Bhavnagar, Gujarat. Dedicated to customer satisfaction & quality.',
    keywords: 'About Bentoclay Claytech, Bhavnagar mineral company, Kardej GIDC manufacturer, Gujarat clay mining exporter'
  },
  '/contact': {
    title: 'Contact Bentoclay Claytech | Request Custom Spec Quotation & Free 25kg Lab Sample',
    description: 'Get in touch with Bentoclay Claytech technical sales team for custom viscosity milling, 25 kg testing samples, container export pricing, and factory direct quotations.',
    keywords: 'Contact Bentoclay Claytech, request attapulgite quote, free lab sample COA, mineral sales Bhavnagar WhatsApp'
  },
  '/blog': {
    title: 'Attapulgite Mineral Insights, Technical Guides & Product Spotlights | Bentoclay',
    description: 'Read technical engineering guides, API Spec 13A oilfield standards, rheology modification in coatings, foundry metallurgy, and mineralogy insights from Bentoclay Claytech.',
    keywords: 'Attapulgite technical blog, drilling mud articles, paint thixotrope guides, API Spec 13A Section 12 tutorial, mineralogy Bhavnagar'
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) | Attapulgite Specs, Packaging & Shipping | Bentoclay',
    description: 'Find answers to common technical, commercial, and export questions about Bentoclay Attapulgite clay, API certifications, bag packaging, MOQs, and maritime shipping.',
    keywords: 'Attapulgite FAQ, drilling clay questions, API 13A moisture residue standards, export packaging 25kg HDPE, Mundra port shipping FAQ'
  },
  '/terms-conditions': {
    title: 'Terms of Supply, Quality Warranty & Incoterms 2020 | Bentoclay Claytech',
    description: 'Review Bentoclay Claytech commercial terms of supply, Incoterms 2020 (FOB, CIF, CFR), Certificate of Analysis (COA) quality warranties, and containerized dispatch policies.',
    keywords: 'Bentoclay terms conditions, mineral supply warranty, Incoterms 2020 Mundra, COA batch analysis warranty'
  }
};

export default function PageSEO() {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    let meta = PAGE_META_CONFIG[location.pathname];

    // Handle dynamic Product Detail Page
    if (!meta && location.pathname.startsWith('/products/')) {
      const slug = location.pathname.replace('/products/', '');
      const product = products.find(p => p.id === slug || p.slug === slug);
      if (product) {
        meta = {
          title: `${product.name} (${product.shortName}) | Bentoclay Claytech Bhavnagar`,
          description: `${product.name}: ${product.metaDescription || product.tagline || product.inShort || 'Engineered Attapulgite mineral by Bentoclay Claytech'}. Available for domestic & worldwide container export.`,
          keywords: `${product.name}, ${product.shortName}, ${product.type}, ${product.form}, Attapulgite ${product.shortName}, Bentoclay Claytech Bhavnagar`
        };
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
          keywords: `${article.title}, ${article.category}, Attapulgite technical spotlight, Bentoclay Claytech`
        };
      }
    }

    // Fallback default
    if (!meta) {
      meta = PAGE_META_CONFIG['/'];
    }

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

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title);
    }
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.description);
    }

    // Update Twitter Title & Description
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', meta.title);
    }
    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', meta.description);
    }

    // Update Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `https://bentoclay.com${location.pathname}`);
    }
  }, [location.pathname, params]);

  return null;
}
