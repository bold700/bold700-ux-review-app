// ═══════════════════════════════════════════════════════════════════════════════
// MODULE DATA EMBEDDED - UX Review Framework
// Auto-generated from module JSON files
// Contains registry, checks, legacy ID mappings, and helper functions
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════ MODULE REGISTRY ═══════════════
const MODULE_REGISTRY = {
  "version": "1.0.0",
  "modules": [
    {
      "id": "ux-usability",
      "name_nl": "UX & Usability",
      "name_en": "UX & Usability",
      "description_nl": "Evaluatie van gebruiksvriendelijkheid op basis van Nielsen heuristieken en UX Honeycomb",
      "description_en": "Usability evaluation based on Nielsen heuristics and UX Honeycomb",
      "icon": "layout",
      "color": "#FF6B00",
      "auto_percentage": 18,
      "target_checks": 55,
      "subcategories": [
        "system-status",
        "real-world",
        "user-control",
        "consistency",
        "error-prevention",
        "recognition",
        "flexibility",
        "aesthetics",
        "error-recovery",
        "help",
        "honeycomb"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "accessibility",
      "name_nl": "Toegankelijkheid (WCAG 2.2 AA)",
      "name_en": "Accessibility (WCAG 2.2 AA)",
      "description_nl": "WCAG 2.2 AA compliance met axe-core automatisering en handmatige checks",
      "description_en": "WCAG 2.2 AA compliance with axe-core automation and manual checks",
      "icon": "accessibility",
      "color": "#4CAF50",
      "auto_percentage": 59,
      "target_checks": 85,
      "subcategories": [
        "visual",
        "keyboard",
        "media",
        "forms",
        "semantics"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "performance",
      "name_nl": "Performance & Snelheid",
      "name_en": "Performance & Speed",
      "description_nl": "Core Web Vitals, laadtijden en optimalisatie via Lighthouse",
      "description_en": "Core Web Vitals, load times and optimization via Lighthouse",
      "icon": "zap",
      "color": "#FF9800",
      "auto_percentage": 88,
      "target_checks": 40,
      "subcategories": [
        "core-web-vitals",
        "loading",
        "resources",
        "caching",
        "third-party"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "technical-seo",
      "name_nl": "Technische SEO",
      "name_en": "Technical SEO",
      "description_nl": "Crawlbaarheid, indexering, sitemaps, redirects, broken links",
      "description_en": "Crawlability, indexing, sitemaps, redirects, broken links",
      "icon": "search",
      "color": "#2196F3",
      "auto_percentage": 84,
      "target_checks": 95,
      "subcategories": [
        "crawlability",
        "indexing",
        "url-structure",
        "links",
        "structured-data",
        "international"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "on-page-seo",
      "name_nl": "On-page SEO",
      "name_en": "On-page SEO",
      "description_nl": "Title tags, meta descriptions, heading hiërarchie, Open Graph",
      "description_en": "Title tags, meta descriptions, heading hierarchy, Open Graph",
      "icon": "file-text",
      "color": "#00BCD4",
      "auto_percentage": 63,
      "target_checks": 40,
      "subcategories": [
        "meta-tags",
        "headings",
        "content-seo",
        "social-tags",
        "images"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "mobile",
      "name_nl": "Mobiele Ervaring",
      "name_en": "Mobile Experience",
      "description_nl": "Responsive design, touch targets, mobiele navigatie",
      "description_en": "Responsive design, touch targets, mobile navigation",
      "icon": "smartphone",
      "color": "#9C27B0",
      "auto_percentage": 50,
      "target_checks": 30,
      "subcategories": [
        "responsive",
        "touch",
        "navigation",
        "performance-mobile",
        "content-mobile"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "cro-conversion",
      "name_nl": "CRO & Conversie",
      "name_en": "CRO & Conversion",
      "description_nl": "Call-to-action, waardepropositie, conversiefunnels, social proof",
      "description_en": "Call-to-action, value proposition, conversion funnels, social proof",
      "icon": "trending-up",
      "color": "#E91E63",
      "auto_percentage": 14,
      "target_checks": 35,
      "subcategories": [
        "cta",
        "value-prop",
        "funnel",
        "social-proof",
        "forms-cro"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "content",
      "name_nl": "Content Kwaliteit",
      "name_en": "Content Quality",
      "description_nl": "Leesbaarheid, content diepte, E-E-A-T signalen, versheid",
      "description_en": "Readability, content depth, E-E-A-T signals, freshness",
      "icon": "book-open",
      "color": "#795548",
      "auto_percentage": 29,
      "target_checks": 35,
      "subcategories": [
        "readability",
        "depth",
        "eeat",
        "freshness",
        "structure"
      ],
      "default_weight": 0.8,
      "enabled_by_default": false
    },
    {
      "id": "security",
      "name_nl": "Beveiliging & Headers",
      "name_en": "Security & Headers",
      "description_nl": "SSL/TLS, security headers, mixed content, kwetsbaarheden",
      "description_en": "SSL/TLS, security headers, mixed content, vulnerabilities",
      "icon": "shield",
      "color": "#F44336",
      "auto_percentage": 83,
      "target_checks": 18,
      "subcategories": [
        "ssl",
        "headers",
        "vulnerabilities"
      ],
      "default_weight": 1,
      "enabled_by_default": true
    },
    {
      "id": "trust",
      "name_nl": "Vertrouwen & Geloofwaardigheid",
      "name_en": "Trust & Credibility",
      "description_nl": "Social proof, contactinformatie, reviews, professionele uitstraling",
      "description_en": "Social proof, contact info, reviews, professional appearance",
      "icon": "award",
      "color": "#FFC107",
      "auto_percentage": 12,
      "target_checks": 25,
      "subcategories": [
        "social-proof",
        "contact",
        "reviews",
        "professionalism"
      ],
      "default_weight": 1,
      "enabled_by_default": false
    },
    {
      "id": "brand",
      "name_nl": "Merk Consistentie",
      "name_en": "Brand Consistency",
      "description_nl": "Logo gebruik, kleurpalet, typografie, tone of voice",
      "description_en": "Logo usage, color palette, typography, tone of voice",
      "icon": "palette",
      "color": "#673AB7",
      "auto_percentage": 7,
      "target_checks": 27,
      "subcategories": [
        "visual-identity",
        "typography",
        "messaging",
        "design-system"
      ],
      "default_weight": 0.7,
      "enabled_by_default": false
    },
    {
      "id": "legal",
      "name_nl": "Juridisch & Compliance",
      "name_en": "Legal & Compliance",
      "description_nl": "GDPR, cookie consent, privacybeleid, EAA compliance",
      "description_en": "GDPR, cookie consent, privacy policy, EAA compliance",
      "icon": "file-check",
      "color": "#607D8B",
      "auto_percentage": 33,
      "target_checks": 30,
      "subcategories": [
        "gdpr",
        "cookies",
        "privacy",
        "eaa",
        "terms"
      ],
      "default_weight": 1,
      "enabled_by_default": false
    },
    {
      "id": "analytics",
      "name_nl": "Analytics & Tracking",
      "name_en": "Analytics & Tracking",
      "description_nl": "GA4 implementatie, tag management, consent mode, event tracking",
      "description_en": "GA4 implementation, tag management, consent mode, event tracking",
      "icon": "bar-chart-2",
      "color": "#3F51B5",
      "auto_percentage": 44,
      "target_checks": 27,
      "subcategories": [
        "ga4",
        "tag-management",
        "consent",
        "events",
        "reporting"
      ],
      "default_weight": 0.8,
      "enabled_by_default": false
    },
    {
      "id": "quick-scan",
      "name_nl": "Quick Scan",
      "name_en": "Quick Scan",
      "description_nl": "Snelle pagina-type-specifieke UX checks (5-15 min)",
      "description_en": "Fast page-type-specific UX checks (5-15 min)",
      "icon": "zap",
      "color": "#F59E0B",
      "auto_percentage": 40,
      "target_checks": 160,
      "subcategories": [
        "landing", "product", "checkout", "homepage", "about",
        "contact", "optin", "launch", "pricing", "blog", "onboarding"
      ],
      "default_weight": 1,
      "enabled_by_default": false
    }
  ],
  "bundles": {
    "e-commerce": {
      "name_nl": "E-commerce",
      "name_en": "E-commerce",
      "description_nl": "Webshops en online verkoopplatformen",
      "modules": {
        "ux-usability": {
          "active": true,
          "weight": 1.2
        },
        "accessibility": {
          "active": true,
          "weight": 1
        },
        "performance": {
          "active": true,
          "weight": 1.2
        },
        "technical-seo": {
          "active": true,
          "weight": 1
        },
        "on-page-seo": {
          "active": true,
          "weight": 1
        },
        "mobile": {
          "active": true,
          "weight": 1.3
        },
        "cro-conversion": {
          "active": true,
          "weight": 1.5
        },
        "content": {
          "active": true,
          "weight": 0.8
        },
        "security": {
          "active": true,
          "weight": 1
        },
        "trust": {
          "active": true,
          "weight": 1.3
        },
        "brand": {
          "active": false,
          "weight": 0.7
        },
        "legal": {
          "active": true,
          "weight": 1
        },
        "analytics": {
          "active": true,
          "weight": 0.8
        }
      }
    },
    "saas": {
      "name_nl": "SaaS Platform",
      "name_en": "SaaS Platform",
      "description_nl": "Software as a Service websites",
      "modules": {
        "ux-usability": {
          "active": true,
          "weight": 1.3
        },
        "accessibility": {
          "active": true,
          "weight": 1
        },
        "performance": {
          "active": true,
          "weight": 1.2
        },
        "technical-seo": {
          "active": true,
          "weight": 0.8
        },
        "on-page-seo": {
          "active": true,
          "weight": 1
        },
        "mobile": {
          "active": true,
          "weight": 1
        },
        "cro-conversion": {
          "active": true,
          "weight": 1.3
        },
        "content": {
          "active": true,
          "weight": 1.2
        },
        "security": {
          "active": true,
          "weight": 1.2
        },
        "trust": {
          "active": true,
          "weight": 1
        },
        "brand": {
          "active": true,
          "weight": 1
        },
        "legal": {
          "active": true,
          "weight": 1
        },
        "analytics": {
          "active": true,
          "weight": 1
        }
      }
    },
    "service-site": {
      "name_nl": "Dienstverlening",
      "name_en": "Service Site",
      "description_nl": "Dienstverleners, portfoliosites, adviesbureaus",
      "modules": {
        "ux-usability": {
          "active": true,
          "weight": 1
        },
        "accessibility": {
          "active": true,
          "weight": 1
        },
        "performance": {
          "active": true,
          "weight": 1
        },
        "technical-seo": {
          "active": true,
          "weight": 1
        },
        "on-page-seo": {
          "active": true,
          "weight": 1.2
        },
        "mobile": {
          "active": true,
          "weight": 1
        },
        "cro-conversion": {
          "active": true,
          "weight": 1.2
        },
        "content": {
          "active": true,
          "weight": 1
        },
        "security": {
          "active": true,
          "weight": 0.8
        },
        "trust": {
          "active": true,
          "weight": 1.4
        },
        "brand": {
          "active": true,
          "weight": 1
        },
        "legal": {
          "active": true,
          "weight": 0.8
        },
        "analytics": {
          "active": false,
          "weight": 0.6
        }
      }
    },
    "content-blog": {
      "name_nl": "Content & Blog",
      "name_en": "Content & Blog",
      "description_nl": "Blogs, nieuwssites, contentplatformen",
      "modules": {
        "ux-usability": {
          "active": true,
          "weight": 0.8
        },
        "accessibility": {
          "active": true,
          "weight": 1
        },
        "performance": {
          "active": true,
          "weight": 1.2
        },
        "technical-seo": {
          "active": true,
          "weight": 1
        },
        "on-page-seo": {
          "active": true,
          "weight": 1.3
        },
        "mobile": {
          "active": true,
          "weight": 1
        },
        "cro-conversion": {
          "active": false,
          "weight": 0.5
        },
        "content": {
          "active": true,
          "weight": 1.5
        },
        "security": {
          "active": true,
          "weight": 0.8
        },
        "trust": {
          "active": true,
          "weight": 0.8
        },
        "brand": {
          "active": true,
          "weight": 0.8
        },
        "legal": {
          "active": true,
          "weight": 1
        },
        "analytics": {
          "active": true,
          "weight": 1
        }
      }
    },
    "landing-page": {
      "name_nl": "Landing Page",
      "name_en": "Landing Page",
      "description_nl": "Enkele landingspagina's en campagnepagina's",
      "modules": {
        "ux-usability": {
          "active": true,
          "weight": 1
        },
        "accessibility": {
          "active": true,
          "weight": 0.8
        },
        "performance": {
          "active": true,
          "weight": 1.3
        },
        "technical-seo": {
          "active": false,
          "weight": 0.5
        },
        "on-page-seo": {
          "active": true,
          "weight": 1
        },
        "mobile": {
          "active": true,
          "weight": 1.3
        },
        "cro-conversion": {
          "active": true,
          "weight": 1.5
        },
        "content": {
          "active": true,
          "weight": 1
        },
        "security": {
          "active": true,
          "weight": 0.8
        },
        "trust": {
          "active": true,
          "weight": 1.2
        },
        "brand": {
          "active": true,
          "weight": 1
        },
        "legal": {
          "active": true,
          "weight": 0.8
        },
        "analytics": {
          "active": true,
          "weight": 1
        }
      }
    },
    "qs-landing": {
      "name_nl": "Landing Page Quick Scan",
      "name_en": "Landing Page Quick Scan",
      "description_nl": "Optimaliseer je landingspagina voor conversie — 18 checks in 8-13 minuten",
      "description_en": "Optimize your landing page for conversion — 18 checks in 8-13 minutes",
      "icon_lucide": "send",
      "estimated_duration_nl": "8-13 min",
      "estimated_duration_en": "8-13 min",
      "is_quick_scan": true,
      "page_type": "landing",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "landing" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-product": {
      "name_nl": "Productpagina Quick Scan",
      "name_en": "Product Page Quick Scan",
      "description_nl": "E-commerce productpagina audit — 18 checks in 10-12 minuten",
      "description_en": "E-commerce product page audit — 18 checks in 10-12 minutes",
      "icon_lucide": "shopping-bag",
      "estimated_duration_nl": "10-12 min",
      "estimated_duration_en": "10-12 min",
      "is_quick_scan": true,
      "page_type": "product",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "product" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-checkout": {
      "name_nl": "Checkout & Cart Quick Scan",
      "name_en": "Checkout & Cart Quick Scan",
      "description_nl": "Verlaag cart abandonment — 18 checks in 10-15 minuten",
      "description_en": "Reduce cart abandonment — 18 checks in 10-15 minutes",
      "icon_lucide": "credit-card",
      "estimated_duration_nl": "10-15 min",
      "estimated_duration_en": "10-15 min",
      "is_quick_scan": true,
      "page_type": "checkout",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "checkout" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-homepage": {
      "name_nl": "Homepage Quick Scan",
      "name_en": "Homepage Quick Scan",
      "description_nl": "Eerste indruk en oriëntatie — 15 checks in 10-12 minuten",
      "description_en": "First impression and orientation — 15 checks in 10-12 minutes",
      "icon_lucide": "home",
      "estimated_duration_nl": "10-12 min",
      "estimated_duration_en": "10-12 min",
      "is_quick_scan": true,
      "page_type": "homepage",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "homepage" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-about": {
      "name_nl": "Over Ons / Team Quick Scan",
      "name_en": "About / Team Quick Scan",
      "description_nl": "Geloofwaardigheid en bedrijfsverhaal — 12 checks in 8-10 minuten",
      "description_en": "Credibility and company story — 12 checks in 8-10 minutes",
      "icon_lucide": "users",
      "estimated_duration_nl": "8-10 min",
      "estimated_duration_en": "8-10 min",
      "is_quick_scan": true,
      "page_type": "about",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "about" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-contact": {
      "name_nl": "Contactpagina Quick Scan",
      "name_en": "Contact Page Quick Scan",
      "description_nl": "Contacttoegang en vertrouwen — 12 checks in 7-10 minuten",
      "description_en": "Contact access and trust — 12 checks in 7-10 minutes",
      "icon_lucide": "mail",
      "estimated_duration_nl": "7-10 min",
      "estimated_duration_en": "7-10 min",
      "is_quick_scan": true,
      "page_type": "contact",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "contact" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-optin": {
      "name_nl": "Opt-in / Lead Capture Quick Scan",
      "name_en": "Opt-in / Lead Capture Quick Scan",
      "description_nl": "Maximaliseer e-mail capture — 13 checks in 10-14 minuten",
      "description_en": "Maximize email capture — 13 checks in 10-14 minutes",
      "icon_lucide": "target",
      "estimated_duration_nl": "10-14 min",
      "estimated_duration_en": "10-14 min",
      "is_quick_scan": true,
      "page_type": "optin",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "optin" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-launch": {
      "name_nl": "Product Launch / Coming Soon Quick Scan",
      "name_en": "Product Launch / Coming Soon Quick Scan",
      "description_nl": "Waitlist en lancering optimalisatie — 12 checks in 8-12 minuten",
      "description_en": "Waitlist and launch optimization — 12 checks in 8-12 minutes",
      "icon_lucide": "rocket",
      "estimated_duration_nl": "8-12 min",
      "estimated_duration_en": "8-12 min",
      "is_quick_scan": true,
      "page_type": "launch",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "launch" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-pricing": {
      "name_nl": "Prijspagina Quick Scan",
      "name_en": "Pricing Page Quick Scan",
      "description_nl": "Plan vergelijking en conversie — 13 checks in 8-12 minuten",
      "description_en": "Plan comparison and conversion — 13 checks in 8-12 minutes",
      "icon_lucide": "tag",
      "estimated_duration_nl": "8-12 min",
      "estimated_duration_en": "8-12 min",
      "is_quick_scan": true,
      "page_type": "pricing",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "pricing" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-blog": {
      "name_nl": "Blog / Content Quick Scan",
      "name_en": "Blog / Content Quick Scan",
      "description_nl": "Content kwaliteit en SEO — 14 checks in 8-14 minuten",
      "description_en": "Content quality and SEO — 14 checks in 8-14 minutes",
      "icon_lucide": "book-open",
      "estimated_duration_nl": "8-14 min",
      "estimated_duration_en": "8-14 min",
      "is_quick_scan": true,
      "page_type": "blog",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "blog" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    },
    "qs-onboarding": {
      "name_nl": "SaaS Onboarding Quick Scan",
      "name_en": "SaaS Onboarding Quick Scan",
      "description_nl": "Activatie en eerste gebruik — 15 checks in 12-15 minuten",
      "description_en": "Activation and first use — 15 checks in 12-15 minutes",
      "icon_lucide": "sparkles",
      "estimated_duration_nl": "12-15 min",
      "estimated_duration_en": "12-15 min",
      "is_quick_scan": true,
      "page_type": "onboarding",
      "modules": {
        "quick-scan": { "active": true, "weight": 1, "_pageType": "onboarding" },
        "ux-usability": { "active": false, "weight": 0 },
        "accessibility": { "active": false, "weight": 0 },
        "performance": { "active": false, "weight": 0 },
        "technical-seo": { "active": false, "weight": 0 },
        "on-page-seo": { "active": false, "weight": 0 },
        "mobile": { "active": false, "weight": 0 },
        "cro-conversion": { "active": false, "weight": 0 },
        "content": { "active": false, "weight": 0 },
        "security": { "active": false, "weight": 0 },
        "trust": { "active": false, "weight": 0 },
        "brand": { "active": false, "weight": 0 },
        "legal": { "active": false, "weight": 0 },
        "analytics": { "active": false, "weight": 0 }
      }
    }
  },
  "scoring": {
    "scale": 100,
    "values": {
      "good": 100,
      "ok": 60,
      "not_ok": 20,
      "na": null,
      "skipped": 0
    },
    "thresholds": {
      "good": 75,
      "ok": 50,
      "bad": 0
    }
  }
};

// ═══════════════ MODULE CHECKS ═══════════════
const MODULE_CHECKS = {
  "ux-usability": [
    {
      "id": "ux-001",
      "legacy_id": "h1q1",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Ziet de gebruiker waar hij/zij zich bevindt in de navigatie? (breadcrumbs, actieve menu-items)",
      "question_en": "Can the user see where they are in the navigation? (breadcrumbs, active menu items)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder duidelijke positie-indicatie raken gebruikers verdwaald en verlaten de site sneller",
      "business_impact_en": "Without clear position indicators, users get lost and leave the site faster",
      "fix_suggestion_nl": "Voeg breadcrumbs toe en markeer het actieve menu-item visueel",
      "fix_suggestion_en": "Add breadcrumbs and visually highlight the active menu item",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-002",
      "legacy_id": "h1q2",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Is er een laad-indicator wanneer content wordt geladen?",
      "question_en": "Is there a loading indicator when content is being loaded?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder feedback denkt de gebruiker dat de site vastloopt — verhoogt bouncepercentage",
      "business_impact_en": "Without feedback users think the site is frozen — increases bounce rate",
      "fix_suggestion_nl": "Gebruik skeleton screens of spinners bij asynchrone content",
      "fix_suggestion_en": "Use skeleton screens or spinners for async content",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-003",
      "legacy_id": "h1q3",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Krijgt de gebruiker bevestiging na een actie? (formulier verstuurd, item in wagen)",
      "question_en": "Does the user get confirmation after an action? (form submitted, item added to cart)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Zonder bevestiging herhalen gebruikers acties of verlaten het proces — directe conversieverlies",
      "business_impact_en": "Without confirmation users repeat actions or abandon the process — direct conversion loss",
      "fix_suggestion_nl": "Toon een duidelijke success-melding na elke belangrijke actie",
      "fix_suggestion_en": "Show a clear success message after every important action",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-004",
      "legacy_id": "h1q4",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Is er een progressie-indicator bij multi-step processen?",
      "question_en": "Is there a progress indicator for multi-step processes?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder progressie-indicatie voelen lange processen eindeloos — verhoogt abandonment",
      "business_impact_en": "Without progress indication long processes feel endless — increases abandonment",
      "fix_suggestion_nl": "Voeg een stappenbalk of progressiebalk toe bij checkouts en formulieren",
      "fix_suggestion_en": "Add a step bar or progress bar to checkouts and forms",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-005",
      "legacy_id": "h1q5",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Wordt de huidige pagina/sectie visueel onderscheiden in het menu?",
      "question_en": "Is the current page/section visually distinguished in the menu?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Vermindert oriëntatie en maakt navigatie minder efficiënt",
      "business_impact_en": "Reduces orientation and makes navigation less efficient",
      "fix_suggestion_nl": "Geef het actieve menu-item een andere kleur, onderstreping of achtergrond",
      "fix_suggestion_en": "Give the active menu item a different color, underline or background",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-006",
      "legacy_id": "h1q6",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Bij e-commerce: is de winkelwagen-status altijd zichtbaar?",
      "question_en": "For e-commerce: is the cart status always visible?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onzichtbare cart = vergeten producten = verloren omzet",
      "business_impact_en": "Invisible cart = forgotten products = lost revenue",
      "fix_suggestion_nl": "Toon een mini-cart met aantal items en totaalprijs in de header",
      "fix_suggestion_en": "Show a mini-cart with item count and total price in the header",
      "effort": "medium",
      "applicable_to": [
        "e-commerce"
      ]
    },
    {
      "id": "ux-007",
      "legacy_id": "h1q7",
      "module": "ux-usability",
      "subcategory": "system-status",
      "question_nl": "Bij formulieren: is er real-time validatie?",
      "question_en": "For forms: is there real-time validation?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder inline validatie ontdekken gebruikers fouten pas bij submit — frustratie en abandonment",
      "business_impact_en": "Without inline validation users discover errors only on submit — frustration and abandonment",
      "fix_suggestion_nl": "Valideer velden bij blur/change en toon directe feedback",
      "fix_suggestion_en": "Validate fields on blur/change and show immediate feedback",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-008",
      "legacy_id": "h2q1",
      "module": "ux-usability",
      "subcategory": "real-world",
      "question_nl": "Is de taal begrijpelijk voor de doelgroep? (geen jargon tenzij verwacht)",
      "question_en": "Is the language understandable for the target audience? (no jargon unless expected)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onbegrijpelijke taal creëert verwarring en verlaagt vertrouwen",
      "business_impact_en": "Incomprehensible language creates confusion and lowers trust",
      "fix_suggestion_nl": "Herschrijf in B1-taalniveau tenzij het publiek technisch is",
      "fix_suggestion_en": "Rewrite at B1 language level unless the audience is technical",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-009",
      "legacy_id": "h2q2",
      "module": "ux-usability",
      "subcategory": "real-world",
      "question_nl": "Worden iconen gebruikt die universeel begrepen worden?",
      "question_en": "Are icons used that are universally understood?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Onduidelijke iconen vertragen de navigatie en verhogen de cognitieve belasting",
      "business_impact_en": "Unclear icons slow down navigation and increase cognitive load",
      "fix_suggestion_nl": "Gebruik standaard iconen (hamburger, zoek, winkelwagen) en voeg labels toe",
      "fix_suggestion_en": "Use standard icons (hamburger, search, cart) and add labels",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-010",
      "legacy_id": "h2q3",
      "module": "ux-usability",
      "subcategory": "real-world",
      "question_nl": "Volgt de informatieopbouw een logische, natuurlijke volgorde?",
      "question_en": "Does the information follow a logical, natural order?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onlogische opbouw verhoogt de zoektijd en verlaagt conversie",
      "business_impact_en": "Illogical structure increases search time and lowers conversion",
      "fix_suggestion_nl": "Organiseer content van belangrijk naar minder belangrijk (inverted pyramid)",
      "fix_suggestion_en": "Organize content from important to less important (inverted pyramid)",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-011",
      "legacy_id": "h2q4",
      "module": "ux-usability",
      "subcategory": "real-world",
      "question_nl": "Zijn labels en knoppen beschrijvend? ('Verstuur aanvraag' i.p.v. 'Submit')",
      "question_en": "Are labels and buttons descriptive? ('Send request' instead of 'Submit')",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Generieke labels verlagen click-through rates op CTA's met 20-30%",
      "business_impact_en": "Generic labels lower CTA click-through rates by 20-30%",
      "fix_suggestion_nl": "Gebruik actie-specifieke labels die de uitkomst beschrijven",
      "fix_suggestion_en": "Use action-specific labels that describe the outcome",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-012",
      "legacy_id": "h2q5",
      "module": "ux-usability",
      "subcategory": "real-world",
      "question_nl": "Gebruikt de site metaforen die aansluiten bij de echte wereld?",
      "question_en": "Does the site use metaphors that match the real world?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Onherkenbare metaforen verhogen de leercurve voor nieuwe gebruikers",
      "business_impact_en": "Unrecognizable metaphors increase the learning curve for new users",
      "fix_suggestion_nl": "Gebruik vertrouwde visuele metaforen (winkelwagen, map, prullenbak)",
      "fix_suggestion_en": "Use familiar visual metaphors (shopping cart, folder, trash can)",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-013",
      "legacy_id": "h2q6",
      "module": "ux-usability",
      "subcategory": "real-world",
      "question_nl": "Is de tone of voice consistent met het merk en de doelgroep?",
      "question_en": "Is the tone of voice consistent with the brand and target audience?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Inconsistente tone of voice ondermijnt merkidentiteit en vertrouwen",
      "business_impact_en": "Inconsistent tone of voice undermines brand identity and trust",
      "fix_suggestion_nl": "Stel een tone of voice gids op en controleer alle pagina's",
      "fix_suggestion_en": "Create a tone of voice guide and audit all pages",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-014",
      "legacy_id": "h3q1",
      "module": "ux-usability",
      "subcategory": "user-control",
      "question_nl": "Kan de gebruiker een stap terug in het proces?",
      "question_en": "Can the user go back a step in the process?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Zonder terugknop voelen gebruikers zich gevangen — #1 reden voor checkout abandonment",
      "business_impact_en": "Without back button users feel trapped — #1 reason for checkout abandonment",
      "fix_suggestion_nl": "Voeg een duidelijke terug-knop toe bij elke stap in het proces",
      "fix_suggestion_en": "Add a clear back button at every step in the process",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-015",
      "legacy_id": "h3q2",
      "module": "ux-usability",
      "subcategory": "user-control",
      "question_nl": "Is er een duidelijke 'terug'-knop of annuleeroptie?",
      "question_en": "Is there a clear 'back' button or cancel option?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Ontbrekende annuleeroptie creëert angst bij onomkeerbare acties",
      "business_impact_en": "Missing cancel option creates anxiety for irreversible actions",
      "fix_suggestion_nl": "Plaats annuleer/terug knoppen bij elk formulier en proces",
      "fix_suggestion_en": "Place cancel/back buttons on every form and process",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-016",
      "legacy_id": "h3q3",
      "module": "ux-usability",
      "subcategory": "user-control",
      "question_nl": "Kan een formulier verlaten worden zonder data te verliezen?",
      "question_en": "Can a form be left without losing data?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Dataverlies bij navigatie is zeer frustrerend — vermindert herhaald gebruik",
      "business_impact_en": "Data loss on navigation is very frustrating — reduces repeat usage",
      "fix_suggestion_nl": "Sla formulierdata automatisch op of waarschuw bij verlaten",
      "fix_suggestion_en": "Auto-save form data or warn when leaving",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-017",
      "legacy_id": "h3q4",
      "module": "ux-usability",
      "subcategory": "user-control",
      "question_nl": "Is er undo/redo functionaliteit waar relevant?",
      "question_en": "Is there undo/redo functionality where relevant?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Zonder undo voelen fouten definitief — verhoogt stress bij belangrijke acties",
      "business_impact_en": "Without undo mistakes feel permanent — increases stress for important actions",
      "fix_suggestion_nl": "Implementeer undo bij verwijderacties en wijzigingen",
      "fix_suggestion_en": "Implement undo for delete actions and changes",
      "effort": "high",
      "applicable_to": [
        "saas",
        "e-commerce"
      ]
    },
    {
      "id": "ux-018",
      "legacy_id": "h3q5",
      "module": "ux-usability",
      "subcategory": "user-control",
      "question_nl": "Kan de gebruiker eenvoudig een item uit de winkelwagen verwijderen?",
      "question_en": "Can the user easily remove an item from the shopping cart?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Moeilijk verwijderen uit cart leidt direct tot cart abandonment",
      "business_impact_en": "Difficulty removing from cart directly leads to cart abandonment",
      "fix_suggestion_nl": "Voeg een duidelijke verwijderknop toe per item in de cart",
      "fix_suggestion_en": "Add a clear remove button per item in the cart",
      "effort": "low",
      "applicable_to": [
        "e-commerce"
      ]
    },
    {
      "id": "ux-019",
      "legacy_id": "h3q6",
      "module": "ux-usability",
      "subcategory": "user-control",
      "question_nl": "Zijn pop-ups en modals makkelijk te sluiten?",
      "question_en": "Are pop-ups and modals easy to close?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Moeilijk sluitbare pop-ups zijn een top-irritatie en dark pattern",
      "business_impact_en": "Hard-to-close pop-ups are a top irritation and dark pattern",
      "fix_suggestion_nl": "Zorg voor duidelijke X-knop, Escape-toets en klik-buiten-sluit",
      "fix_suggestion_en": "Ensure clear X button, Escape key and click-outside-to-close",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-020",
      "legacy_id": "h4q1",
      "module": "ux-usability",
      "subcategory": "consistency",
      "question_nl": "Zijn knoppen consistent in stijl, kleur en positie?",
      "question_en": "Are buttons consistent in style, color and position?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Inconsistente knoppen verwarren gebruikers over wat klikbaar is",
      "business_impact_en": "Inconsistent buttons confuse users about what is clickable",
      "fix_suggestion_nl": "Definieer een knop-hiërarchie (primair, secundair, tertiair) en pas consistent toe",
      "fix_suggestion_en": "Define a button hierarchy (primary, secondary, tertiary) and apply consistently",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-021",
      "legacy_id": "h4q2",
      "module": "ux-usability",
      "subcategory": "consistency",
      "question_nl": "Wordt dezelfde terminologie overal op de site gebruikt?",
      "question_en": "Is the same terminology used throughout the site?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Wisselende terminologie verward en ondermijnt professionele uitstraling",
      "business_impact_en": "Varying terminology confuses and undermines professional appearance",
      "fix_suggestion_nl": "Maak een woordenlijst en controleer alle pagina's op consistentie",
      "fix_suggestion_en": "Create a glossary and check all pages for consistency",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-022",
      "legacy_id": "h4q3",
      "module": "ux-usability",
      "subcategory": "consistency",
      "question_nl": "Volgt het ontwerp gangbare webconventies? (logo links = home, etc.)",
      "question_en": "Does the design follow common web conventions? (logo left = home, etc.)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Afwijken van conventies verhoogt leertijd — gebruikers verwachten patronen",
      "business_impact_en": "Deviating from conventions increases learning time — users expect patterns",
      "fix_suggestion_nl": "Volg standaard patronen: logo linksboven, zoek rechtsboven, footer onderaan",
      "fix_suggestion_en": "Follow standard patterns: logo top-left, search top-right, footer at bottom",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-023",
      "legacy_id": "h4q4",
      "module": "ux-usability",
      "subcategory": "consistency",
      "question_nl": "Is de typografie consistent? (fonts, groottes, hiërarchie)",
      "question_en": "Is the typography consistent? (fonts, sizes, hierarchy)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Inconsistente typografie geeft een onprofessionele indruk",
      "business_impact_en": "Inconsistent typography gives an unprofessional impression",
      "fix_suggestion_nl": "Beperk tot 2-3 fonts met een duidelijke type-scale",
      "fix_suggestion_en": "Limit to 2-3 fonts with a clear type scale",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-024",
      "legacy_id": "h4q5",
      "module": "ux-usability",
      "subcategory": "consistency",
      "question_nl": "Gedragen interactieve elementen zich voorspelbaar? (hover states, klik-feedback)",
      "question_en": "Do interactive elements behave predictably? (hover states, click feedback)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onvoorspelbaar gedrag verlaagt vertrouwen en interactie",
      "business_impact_en": "Unpredictable behavior lowers trust and interaction",
      "fix_suggestion_nl": "Voeg consistente hover, active en focus states toe aan alle interactieve elementen",
      "fix_suggestion_en": "Add consistent hover, active and focus states to all interactive elements",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-025",
      "legacy_id": "h4q6",
      "module": "ux-usability",
      "subcategory": "consistency",
      "question_nl": "Is de layout consistent tussen pagina's?",
      "question_en": "Is the layout consistent between pages?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Wisselende layouts maken de site moeilijker te navigeren",
      "business_impact_en": "Varying layouts make the site harder to navigate",
      "fix_suggestion_nl": "Gebruik templates/componenten voor herhalende paginatypes",
      "fix_suggestion_en": "Use templates/components for repeating page types",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-026",
      "legacy_id": "h5q1",
      "module": "ux-usability",
      "subcategory": "error-prevention",
      "question_nl": "Worden formuliervelden gevalideerd vóór versturen?",
      "question_en": "Are form fields validated before submission?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Late validatie is de #1 conversiekiller bij formulieren",
      "business_impact_en": "Late validation is the #1 conversion killer in forms",
      "fix_suggestion_nl": "Implementeer client-side validatie met real-time feedback",
      "fix_suggestion_en": "Implement client-side validation with real-time feedback",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-027",
      "legacy_id": "h5q2",
      "module": "ux-usability",
      "subcategory": "error-prevention",
      "question_nl": "Zijn er bevestigingsdialogen bij onomkeerbare acties?",
      "question_en": "Are there confirmation dialogs for irreversible actions?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Zonder bevestiging bij verwijderen/annuleren verliezen gebruikers data",
      "business_impact_en": "Without confirmation on delete/cancel users lose data",
      "fix_suggestion_nl": "Voeg 'Weet je het zeker?' dialogen toe bij destructieve acties",
      "fix_suggestion_en": "Add 'Are you sure?' dialogs for destructive actions",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-028",
      "legacy_id": "h5q3",
      "module": "ux-usability",
      "subcategory": "error-prevention",
      "question_nl": "Worden invulvelden voorzien van hints en voorbeelden?",
      "question_en": "Are input fields provided with hints and examples?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder hints moeten gebruikers gokken — verhoogt foutpercentage",
      "business_impact_en": "Without hints users must guess — increases error rate",
      "fix_suggestion_nl": "Voeg placeholder tekst en help-tekst toe bij elk veld",
      "fix_suggestion_en": "Add placeholder text and help text to each field",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-029",
      "legacy_id": "h5q4",
      "module": "ux-usability",
      "subcategory": "error-prevention",
      "question_nl": "Is het duidelijk welke velden verplicht zijn?",
      "question_en": "Is it clear which fields are required?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onduidelijke verplichte velden veroorzaken onnodige foutmeldingen",
      "business_impact_en": "Unclear required fields cause unnecessary error messages",
      "fix_suggestion_nl": "Markeer verplichte velden met * en leg dit bovenaan uit",
      "fix_suggestion_en": "Mark required fields with * and explain this at the top",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-030",
      "legacy_id": "h5q5",
      "module": "ux-usability",
      "subcategory": "error-prevention",
      "question_nl": "Worden fouten voorkomen door slim ontwerp? (datumkiezers i.p.v. tekst)",
      "question_en": "Are errors prevented by smart design? (date pickers instead of text)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slimme invoer vermindert fouten met 60-80% en verbetert gebruikerservaring",
      "business_impact_en": "Smart input reduces errors by 60-80% and improves user experience",
      "fix_suggestion_nl": "Vervang vrije tekstvelden door dropdowns, datumkiezers en autocomplete",
      "fix_suggestion_en": "Replace free text fields with dropdowns, date pickers and autocomplete",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-031",
      "legacy_id": "h5q6",
      "module": "ux-usability",
      "subcategory": "error-prevention",
      "question_nl": "Zijn destructieve knoppen visueel onderscheiden van constructieve?",
      "question_en": "Are destructive buttons visually distinguished from constructive ones?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder visueel onderscheid klikken gebruikers per ongeluk op verwijderen",
      "business_impact_en": "Without visual distinction users accidentally click delete",
      "fix_suggestion_nl": "Gebruik rood voor destructieve acties, groen/blauw voor constructieve",
      "fix_suggestion_en": "Use red for destructive actions, green/blue for constructive",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-032",
      "legacy_id": "h6q1",
      "module": "ux-usability",
      "subcategory": "recognition",
      "question_nl": "Zijn de belangrijkste acties altijd zichtbaar? (niet in menu's verstopt)",
      "question_en": "Are the most important actions always visible? (not hidden in menus)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Verborgen acties worden niet gevonden — gebruikers verlaten de site",
      "business_impact_en": "Hidden actions are not found — users leave the site",
      "fix_suggestion_nl": "Plaats primaire CTA's zichtbaar op de pagina, niet in dropdown menu's",
      "fix_suggestion_en": "Place primary CTAs visibly on the page, not in dropdown menus",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-033",
      "legacy_id": "h6q2",
      "module": "ux-usability",
      "subcategory": "recognition",
      "question_nl": "Worden recent bekeken items of pagina's getoond?",
      "question_en": "Are recently viewed items or pages shown?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Recent bekeken items verhogen herhaalaankopen en gemiddelde orderwaarde",
      "business_impact_en": "Recently viewed items increase repeat purchases and average order value",
      "fix_suggestion_nl": "Voeg een 'recent bekeken' sectie toe op productpagina's",
      "fix_suggestion_en": "Add a 'recently viewed' section on product pages",
      "effort": "medium",
      "applicable_to": [
        "e-commerce"
      ]
    },
    {
      "id": "ux-034",
      "legacy_id": "h6q3",
      "module": "ux-usability",
      "subcategory": "recognition",
      "question_nl": "Is de navigatie altijd bereikbaar? (sticky header/sidebar)",
      "question_en": "Is the navigation always accessible? (sticky header/sidebar)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder sticky navigatie moeten gebruikers scrollen — vermindert paginabezoeken per sessie",
      "business_impact_en": "Without sticky navigation users must scroll — reduces page views per session",
      "fix_suggestion_nl": "Maak de header sticky of voeg een scroll-to-top knop toe",
      "fix_suggestion_en": "Make the header sticky or add a scroll-to-top button",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-035",
      "legacy_id": "h6q4",
      "module": "ux-usability",
      "subcategory": "recognition",
      "question_nl": "Bij formulieren: zijn eerder ingevulde gegevens zichtbaar bij overzicht?",
      "question_en": "For forms: are previously entered data visible in the overview?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder overzicht voelen gebruikers zich onzeker over hun invoer",
      "business_impact_en": "Without overview users feel uncertain about their input",
      "fix_suggestion_nl": "Toon een samenvatting van ingevulde gegevens voor bevestiging",
      "fix_suggestion_en": "Show a summary of entered data before confirmation",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-036",
      "legacy_id": "h6q5",
      "module": "ux-usability",
      "subcategory": "recognition",
      "question_nl": "Worden opties getoond i.p.v. dat de gebruiker ze moet onthouden?",
      "question_en": "Are options shown instead of requiring users to remember them?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Herinnering vs herkenning — tonen verlaagt cognitieve belasting",
      "business_impact_en": "Recall vs recognition — showing options reduces cognitive load",
      "fix_suggestion_nl": "Gebruik dropdowns, autocomplete en suggesties in plaats van vrije invoer",
      "fix_suggestion_en": "Use dropdowns, autocomplete and suggestions instead of free input",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-037",
      "legacy_id": "h6q6",
      "module": "ux-usability",
      "subcategory": "recognition",
      "question_nl": "Is de zoekfunctie makkelijk vindbaar en bruikbaar?",
      "question_en": "Is the search function easy to find and use?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Bezoekers die zoeken converteren 2-3x hoger dan browsers",
      "business_impact_en": "Visitors who search convert 2-3x higher than browsers",
      "fix_suggestion_nl": "Plaats een zoekicoon rechts bovenaan met een uitklapbaar zoekveld",
      "fix_suggestion_en": "Place a search icon top-right with an expandable search field",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-038",
      "legacy_id": "h7q1",
      "module": "ux-usability",
      "subcategory": "flexibility",
      "question_nl": "Zijn er snelkoppelingen voor veelgebruikte acties?",
      "question_en": "Are there shortcuts for frequently used actions?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Snelkoppelingen verhogen efficiëntie voor power users",
      "business_impact_en": "Shortcuts increase efficiency for power users",
      "fix_suggestion_nl": "Voeg keyboard shortcuts toe voor veelgebruikte acties",
      "fix_suggestion_en": "Add keyboard shortcuts for frequently used actions",
      "effort": "medium",
      "applicable_to": [
        "saas"
      ]
    },
    {
      "id": "ux-039",
      "legacy_id": "h7q2",
      "module": "ux-usability",
      "subcategory": "flexibility",
      "question_nl": "Kunnen ervaren gebruikers stappen overslaan?",
      "question_en": "Can experienced users skip steps?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Geforceerde stappen frustreren terugkerende gebruikers",
      "business_impact_en": "Forced steps frustrate returning users",
      "fix_suggestion_nl": "Maak optionele stappen overslaan en bied express-checkout aan",
      "fix_suggestion_en": "Allow skipping optional steps and offer express checkout",
      "effort": "medium",
      "applicable_to": [
        "e-commerce",
        "saas"
      ]
    },
    {
      "id": "ux-040",
      "legacy_id": "h7q3",
      "module": "ux-usability",
      "subcategory": "flexibility",
      "question_nl": "Is er een zoekfunctie naast navigatie?",
      "question_en": "Is there a search function alongside navigation?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zoekfunctie is essentieel voor sites met meer dan 20 pagina's",
      "business_impact_en": "Search function is essential for sites with more than 20 pages",
      "fix_suggestion_nl": "Implementeer een site-brede zoekfunctie met relevante resultaten",
      "fix_suggestion_en": "Implement a site-wide search function with relevant results",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-041",
      "legacy_id": "h7q4",
      "module": "ux-usability",
      "subcategory": "flexibility",
      "question_nl": "Zijn formulieren slim? (auto-complete, adres-lookup)",
      "question_en": "Are forms smart? (auto-complete, address lookup)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Smart forms reduceren invultijd met 50% — directe conversiewinst",
      "business_impact_en": "Smart forms reduce fill-in time by 50% — direct conversion gain",
      "fix_suggestion_nl": "Gebruik autocomplete attributen en adres-API's",
      "fix_suggestion_en": "Use autocomplete attributes and address APIs",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-042",
      "legacy_id": "h7q5",
      "module": "ux-usability",
      "subcategory": "flexibility",
      "question_nl": "Is het mogelijk om acties in bulk uit te voeren?",
      "question_en": "Is it possible to perform bulk actions?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Bulk-acties besparen tijd voor power users bij grote hoeveelheden",
      "business_impact_en": "Bulk actions save time for power users with large quantities",
      "fix_suggestion_nl": "Voeg select-all en bulk-actie knoppen toe waar relevant",
      "fix_suggestion_en": "Add select-all and bulk action buttons where relevant",
      "effort": "high",
      "applicable_to": [
        "saas",
        "e-commerce"
      ]
    },
    {
      "id": "ux-043",
      "legacy_id": "h8q1",
      "module": "ux-usability",
      "subcategory": "aesthetics",
      "question_nl": "Is er een duidelijke visuele hiërarchie? (primaire vs. secundaire content)",
      "question_en": "Is there a clear visual hierarchy? (primary vs. secondary content)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder hiërarchie weten gebruikers niet waar ze moeten kijken — verhoogt bounce",
      "business_impact_en": "Without hierarchy users don't know where to look — increases bounce",
      "fix_suggestion_nl": "Gebruik grootte, kleur en witruimte om belangrijk van minder belangrijk te scheiden",
      "fix_suggestion_en": "Use size, color and whitespace to separate important from less important",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-044",
      "legacy_id": "h8q2",
      "module": "ux-usability",
      "subcategory": "aesthetics",
      "question_nl": "Is er voldoende white space / ademruimte tussen elementen?",
      "question_en": "Is there sufficient white space between elements?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Voldoende witruimte verhoogt leesbaarheid en perceived quality",
      "business_impact_en": "Sufficient whitespace increases readability and perceived quality",
      "fix_suggestion_nl": "Vergroot marges en padding tussen secties en elementen",
      "fix_suggestion_en": "Increase margins and padding between sections and elements",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-045",
      "legacy_id": "h8q3",
      "module": "ux-usability",
      "subcategory": "aesthetics",
      "question_nl": "Staat de belangrijkste informatie above the fold?",
      "question_en": "Is the most important information above the fold?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "80% van de aandacht gaat naar above-the-fold content",
      "business_impact_en": "80% of attention goes to above-the-fold content",
      "fix_suggestion_nl": "Plaats waardepropositie, CTA en key visuals in het eerste scherm",
      "fix_suggestion_en": "Place value proposition, CTA and key visuals in the first screen",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-046",
      "legacy_id": "h8q4",
      "module": "ux-usability",
      "subcategory": "aesthetics",
      "question_nl": "Zijn er afleidende elementen? (auto-play video, pop-ups, banners)",
      "question_en": "Are there distracting elements? (auto-play video, pop-ups, banners)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Afleidingen verlagen conversie en verhogen bouncepercentage met 25-40%",
      "business_impact_en": "Distractions lower conversion and increase bounce rate by 25-40%",
      "fix_suggestion_nl": "Verwijder of minimaliseer auto-play media en agressieve pop-ups",
      "fix_suggestion_en": "Remove or minimize auto-play media and aggressive pop-ups",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-047",
      "legacy_id": "h8q5",
      "module": "ux-usability",
      "subcategory": "aesthetics",
      "question_nl": "Zijn CTA's duidelijk en niet overwoekerd door andere content?",
      "question_en": "Are CTAs clear and not overwhelmed by other content?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onduidelijke CTA's zijn de grootste conversiekiller — directe omzetimpact",
      "business_impact_en": "Unclear CTAs are the biggest conversion killer — direct revenue impact",
      "fix_suggestion_nl": "Maak CTA's groot, contrastrijk en met witruimte eromheen",
      "fix_suggestion_en": "Make CTAs large, high-contrast with whitespace around them",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-048",
      "legacy_id": "h8q6",
      "module": "ux-usability",
      "subcategory": "aesthetics",
      "question_nl": "Ondersteunen afbeeldingen de boodschap of zijn ze decoratief?",
      "question_en": "Do images support the message or are they decorative?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Relevante afbeeldingen verhogen engagement — stockfoto's verlagen vertrouwen",
      "business_impact_en": "Relevant images increase engagement — stock photos lower trust",
      "fix_suggestion_nl": "Vervang generieke stockfoto's door authentieke, relevante beelden",
      "fix_suggestion_en": "Replace generic stock photos with authentic, relevant images",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-049",
      "legacy_id": "h9q1",
      "module": "ux-usability",
      "subcategory": "error-recovery",
      "question_nl": "Zijn foutmeldingen in begrijpelijke taal? (niet 'Error 404')",
      "question_en": "Are error messages in understandable language? (not 'Error 404')",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Technische foutmeldingen vervreemden niet-technische gebruikers",
      "business_impact_en": "Technical error messages alienate non-technical users",
      "fix_suggestion_nl": "Schrijf foutmeldingen in menselijke taal met de oorzaak en oplossing",
      "fix_suggestion_en": "Write error messages in human language with the cause and solution",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-050",
      "legacy_id": "h9q2",
      "module": "ux-usability",
      "subcategory": "error-recovery",
      "question_nl": "Wordt er aangegeven wat de gebruiker moet doen om de fout op te lossen?",
      "question_en": "Is it indicated what the user should do to fix the error?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Foutmeldingen zonder oplossing laten gebruikers hulpeloos achter",
      "business_impact_en": "Error messages without solutions leave users helpless",
      "fix_suggestion_nl": "Voeg altijd een suggestie toe: 'Probeer X' of 'Controleer Y'",
      "fix_suggestion_en": "Always add a suggestion: 'Try X' or 'Check Y'",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-051",
      "legacy_id": "h9q3",
      "module": "ux-usability",
      "subcategory": "error-recovery",
      "question_nl": "Zijn foutmeldingen visueel opvallend? (rode rand, icoon)",
      "question_en": "Are error messages visually prominent? (red border, icon)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Onopvallende fouten worden gemist — gebruikers weten niet waarom submit faalt",
      "business_impact_en": "Inconspicuous errors are missed — users don't know why submit fails",
      "fix_suggestion_nl": "Gebruik rode kleur, iconen en scroll-to-error voor foutmeldingen",
      "fix_suggestion_en": "Use red color, icons and scroll-to-error for error messages",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-052",
      "legacy_id": "h9q4",
      "module": "ux-usability",
      "subcategory": "error-recovery",
      "question_nl": "Wordt de fout bij het juiste veld getoond?",
      "question_en": "Is the error shown at the correct field?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Fouten bovenaan de pagina i.p.v. bij het veld verlengen correctietijd",
      "business_impact_en": "Errors at the top of the page instead of at the field extend correction time",
      "fix_suggestion_nl": "Toon inline foutmeldingen direct onder het betreffende veld",
      "fix_suggestion_en": "Show inline error messages directly below the relevant field",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-053",
      "legacy_id": "h9q5",
      "module": "ux-usability",
      "subcategory": "error-recovery",
      "question_nl": "Is de 404-pagina nuttig? (zoekfunctie, links)",
      "question_en": "Is the 404 page useful? (search function, links)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Een goede 404-pagina kan 50% van de verdwaalde bezoekers terugwinnen",
      "business_impact_en": "A good 404 page can recover 50% of lost visitors",
      "fix_suggestion_nl": "Voeg zoekfunctie, populaire links en een vriendelijke boodschap toe aan 404",
      "fix_suggestion_en": "Add search function, popular links and a friendly message to 404",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-054",
      "legacy_id": "h9q6",
      "module": "ux-usability",
      "subcategory": "error-recovery",
      "question_nl": "Worden technische foutmeldingen vertaald naar gebruikerstaal?",
      "question_en": "Are technical error messages translated to user language?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Technische taal ('500 Internal Server Error') schrikt gebruikers af",
      "business_impact_en": "Technical language ('500 Internal Server Error') scares users away",
      "fix_suggestion_nl": "Vertaal alle server-errors naar begrijpelijke gebruikersberichten",
      "fix_suggestion_en": "Translate all server errors to understandable user messages",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-055",
      "legacy_id": "h10q1",
      "module": "ux-usability",
      "subcategory": "help",
      "question_nl": "Is er een FAQ-sectie die veelgestelde vragen beantwoordt?",
      "question_en": "Is there an FAQ section that answers frequently asked questions?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "FAQ vermindert support tickets en verbetert SEO door long-tail keywords",
      "business_impact_en": "FAQ reduces support tickets and improves SEO through long-tail keywords",
      "fix_suggestion_nl": "Maak een FAQ-pagina gebaseerd op daadwerkelijke klantvragen",
      "fix_suggestion_en": "Create an FAQ page based on actual customer questions",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-056",
      "legacy_id": "h10q2",
      "module": "ux-usability",
      "subcategory": "help",
      "question_nl": "Is er contextgevoelige hulp? (tooltips, inline uitleg)",
      "question_en": "Is there context-sensitive help? (tooltips, inline explanation)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Inline hulp vermindert fouten en verhoogt formulierconversie",
      "business_impact_en": "Inline help reduces errors and increases form conversion",
      "fix_suggestion_nl": "Voeg tooltips en inline uitleg toe bij complexe velden of functies",
      "fix_suggestion_en": "Add tooltips and inline explanation to complex fields or features",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-057",
      "legacy_id": "h10q3",
      "module": "ux-usability",
      "subcategory": "help",
      "question_nl": "Is contactinformatie makkelijk te vinden?",
      "question_en": "Is contact information easy to find?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Moeilijk vindbare contactinfo verlaagt vertrouwen en conversie",
      "business_impact_en": "Hard-to-find contact info lowers trust and conversion",
      "fix_suggestion_nl": "Plaats contactinfo in de header/footer en op een dedicated contactpagina",
      "fix_suggestion_en": "Place contact info in header/footer and on a dedicated contact page",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-058",
      "legacy_id": "h10q4",
      "module": "ux-usability",
      "subcategory": "help",
      "question_nl": "Bij complexe producten: is er een onboarding flow?",
      "question_en": "For complex products: is there an onboarding flow?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "40-60% van SaaS trial users gebruiken het product maar 1x zonder onboarding",
      "business_impact_en": "40-60% of SaaS trial users use the product only once without onboarding",
      "fix_suggestion_nl": "Implementeer een guided tour of setup wizard voor nieuwe gebruikers",
      "fix_suggestion_en": "Implement a guided tour or setup wizard for new users",
      "effort": "high",
      "applicable_to": [
        "saas"
      ]
    },
    {
      "id": "ux-059",
      "legacy_id": "h10q5",
      "module": "ux-usability",
      "subcategory": "help",
      "question_nl": "Is er een chatfunctie of ander direct contactkanaal?",
      "question_en": "Is there a chat function or other direct contact channel?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Live chat verhoogt conversie met 20-30% door direct antwoord op bezwaren",
      "business_impact_en": "Live chat increases conversion by 20-30% through instant objection handling",
      "fix_suggestion_nl": "Overweeg een chatwidget op key-pagina's (pricing, checkout)",
      "fix_suggestion_en": "Consider a chat widget on key pages (pricing, checkout)",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-060",
      "legacy_id": "h10q6",
      "module": "ux-usability",
      "subcategory": "help",
      "question_nl": "Zijn helpartikelen doorzoekbaar en goed georganiseerd?",
      "question_en": "Are help articles searchable and well organized?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Goede documentatie vermindert support kosten en verhoogt zelfservice",
      "business_impact_en": "Good documentation reduces support costs and increases self-service",
      "fix_suggestion_nl": "Organiseer helpartikelen in categorieën met zoekfunctie",
      "fix_suggestion_en": "Organize help articles in categories with search functionality",
      "effort": "medium",
      "applicable_to": [
        "saas"
      ]
    },
    {
      "id": "ux-061",
      "legacy_id": "hcq1",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Useful — Lost dit product een echt probleem op?",
      "question_en": "Useful — Does this product solve a real problem?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Het fundament — zonder echte waarde is al het andere irrelevant",
      "business_impact_en": "The foundation — without real value everything else is irrelevant",
      "fix_suggestion_nl": "Valideer de waardepropositie met gebruikersonderzoek",
      "fix_suggestion_en": "Validate the value proposition with user research",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-062",
      "legacy_id": "hcq2",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Usable — Is het makkelijk te gebruiken?",
      "question_en": "Usable — Is it easy to use?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Slechte usability kost direct conversies en klantenbinding",
      "business_impact_en": "Poor usability directly costs conversions and customer retention",
      "fix_suggestion_nl": "Doe een usability test met 5 gebruikers om pijnpunten te vinden",
      "fix_suggestion_en": "Conduct a usability test with 5 users to find pain points",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-063",
      "legacy_id": "hcq3",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Desirable — Wil je het gebruiken? Voelt het goed?",
      "question_en": "Desirable — Do you want to use it? Does it feel good?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Emotionele aantrekkingskracht bepaalt of gebruikers terugkomen",
      "business_impact_en": "Emotional appeal determines whether users return",
      "fix_suggestion_nl": "Investeer in visueel ontwerp, micro-interacties en brand personality",
      "fix_suggestion_en": "Invest in visual design, micro-interactions and brand personality",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-064",
      "legacy_id": "hcq4",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Findable — Kun je vinden wat je zoekt?",
      "question_en": "Findable — Can you find what you're looking for?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Als gebruikers het niet kunnen vinden, bestaat het niet voor hen",
      "business_impact_en": "If users can't find it, it doesn't exist to them",
      "fix_suggestion_nl": "Verbeter de informatiearchitectuur, zoekfunctie en navigatie",
      "fix_suggestion_en": "Improve information architecture, search function and navigation",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-065",
      "legacy_id": "hcq5",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Accessible — Is het toegankelijk voor iedereen?",
      "question_en": "Accessible — Is it accessible to everyone?",
      "type": "semi-auto",
      "severity": "critical",
      "auto_tool": "lighthouse",
      "auto_metric": "accessibility-score",
      "threshold_good": 90,
      "threshold_ok": 70,
      "business_impact_nl": "15-20% van de bevolking heeft een beperking — EAA maakt het wettelijk verplicht",
      "business_impact_en": "15-20% of the population has a disability — EAA makes it legally mandatory",
      "fix_suggestion_nl": "Voer een WCAG 2.2 AA audit uit en los kritieke issues op",
      "fix_suggestion_en": "Perform a WCAG 2.2 AA audit and fix critical issues",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-066",
      "legacy_id": "hcq6",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Credible — Vertrouw je het?",
      "question_en": "Credible — Do you trust it?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Vertrouwen bepaalt of bezoekers klant worden — opgebouwd in milliseconden",
      "business_impact_en": "Trust determines whether visitors become customers — built in milliseconds",
      "fix_suggestion_nl": "Voeg reviews, keurmerken, team-info en professioneel design toe",
      "fix_suggestion_en": "Add reviews, trust badges, team info and professional design",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "ux-067",
      "legacy_id": "hcq7",
      "module": "ux-usability",
      "subcategory": "honeycomb",
      "question_nl": "Valuable — Levert het waarde?",
      "question_en": "Valuable — Does it deliver value?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "De ultieme test — waarde bepaalt retentie en mond-tot-mond reclame",
      "business_impact_en": "The ultimate test — value determines retention and word-of-mouth",
      "fix_suggestion_nl": "Meet klanttevredenheid (NPS) en optimaliseer op basis van feedback",
      "fix_suggestion_en": "Measure customer satisfaction (NPS) and optimize based on feedback",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "accessibility": [
    {
      "id": "a11y-001",
      "legacy_id": "a11q1",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Heeft de body tekst voldoende contrast? (WCAG AA: 4.5:1 ratio)",
      "question_en": "Does the body text have sufficient contrast? (WCAG AA: 4.5:1 ratio)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Onvoldoende contrast maakt tekst onleesbaar voor gebruikers met laag zicht of kleurenblindheid, wat leidt tot lage gebruiksgraad.",
      "business_impact_en": "Insufficient contrast makes text unreadable for users with low vision or color blindness, leading to low engagement.",
      "fix_suggestion_nl": "Verhoog de contrastverhouding van tekst en achtergrond tot minstens 4.5:1 voor normale tekst en 3:1 voor grote tekst.",
      "fix_suggestion_en": "Increase the contrast ratio between text and background to at least 4.5:1 for normal text and 3:1 for large text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "color-contrast"
    },
    {
      "id": "a11y-002",
      "legacy_id": "a11q2",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Hebben knoppen en links voldoende contrast met hun achtergrond?",
      "question_en": "Do buttons and links have sufficient contrast with their background?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slecht contrast op knoppen en links verhindert gebruikers om interactieve elementen te identificeren en kan tot frustatie leiden.",
      "business_impact_en": "Poor contrast on buttons and links prevents users from identifying interactive elements and causes frustration.",
      "fix_suggestion_nl": "Zorg ervoor dat alle knoppen en links een contrastverhouding van minstens 3:1 hebben ten opzichte van de achtergrond.",
      "fix_suggestion_en": "Ensure all buttons and links have a contrast ratio of at least 3:1 against their background.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-003",
      "legacy_id": "a11q3",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Is placeholder tekst in formulieren leesbaar? (vaak te licht)",
      "question_en": "Is placeholder text in forms readable? (often too light)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Te lichter placeholder-tekst is moeilijk te lezen, wat gebruikers verwarring geeft over wat ze moeten invullen.",
      "business_impact_en": "Light placeholder text is hard to read, confusing users about what to fill in.",
      "fix_suggestion_nl": "Gebruik een contrastverhouding van minstens 4.5:1 voor placeholder-tekst en zorg dat deze niet verdwijnt wanneer gebruikers beginnen in te typen.",
      "fix_suggestion_en": "Use a contrast ratio of at least 4.5:1 for placeholder text and ensure it doesn't disappear when users start typing.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-004",
      "legacy_id": "a11q4",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Is tekst op afbeeldingen/banners leesbaar? (overlay contrast)",
      "question_en": "Is text on images/banners readable? (overlay contrast)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onleesbare tekst op afbeeldingen verhindert gebruikers essentiële informatie te begrijpen, wat conversies negatief beïnvloedt.",
      "business_impact_en": "Unreadable text on images prevents users from understanding essential information, negatively affecting conversions.",
      "fix_suggestion_nl": "Voeg een semi-transparant overlay toe achter tekst op afbeeldingen of kies afbeeldingen met beter contrast. Minimaal 4.5:1 contrastverhouding.",
      "fix_suggestion_en": "Add a semi-transparent overlay behind text on images or choose images with better contrast. Minimum 4.5:1 contrast ratio.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-005",
      "legacy_id": "a11q5",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Wordt kleur niet als enige middel gebruikt om info over te brengen?",
      "question_en": "Is color not used as the only means of conveying information?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Afhankelijkheid van alleen kleur voor informatieoverdracht maakt het onmogelijk voor kleurenblinde gebruikers het begrip te verkrijgen.",
      "business_impact_en": "Relying on color alone for information makes it impossible for colorblind users to understand.",
      "fix_suggestion_nl": "Gebruik tekstlabels, symbolen, patronen of andere visuele indicatoren in plaats van alleen kleur. Bijvoorbeeld: rood + 'fout' tekst in plaats van alleen rood.",
      "fix_suggestion_en": "Use text labels, symbols, patterns, or other visual indicators instead of color alone. For example: red + 'error' text instead of red only.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-006",
      "legacy_id": "a11q6",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Zijn focus-states duidelijk zichtbaar voor toetsenbordnavigatie?",
      "question_en": "Are focus states clearly visible for keyboard navigation?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onduidelijke focus-states maken het onmogelijk voor toetsenbordgebruikers hun locatie op de pagina te bepalen.",
      "business_impact_en": "Unclear focus states make it impossible for keyboard users to determine their location on the page.",
      "fix_suggestion_nl": "Voeg een duidelijke visuele focus-indicator toe (bijv. outline, highlight, background-change) met een contrastverhouding van minstens 3:1.",
      "fix_suggestion_en": "Add a clear visual focus indicator (e.g., outline, highlight, background change) with at least 3:1 contrast ratio.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-007",
      "legacy_id": "a11q7",
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Is de tekst minstens 16px en de regelafstand minstens 1.5?",
      "question_en": "Is text at least 16px and line spacing at least 1.5?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Te kleine tekst en regelafstand maken lang lezen vermoeiend, vooral voor ouderen en gebruikers met leesbeperkingen.",
      "business_impact_en": "Text that's too small and tight line spacing makes extended reading tiring, especially for elderly users and those with dyslexia.",
      "fix_suggestion_nl": "Stel base-tekstgrootte in op minstens 16px en regelafstand (line-height) op minstens 1.5 voor normale paragrafen.",
      "fix_suggestion_en": "Set base text size to at least 16px and line-height to at least 1.5 for normal paragraphs.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-008",
      "legacy_id": "kb1",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Is alle functionaliteit bereikbaar met alleen het toetsenbord? (WCAG 2.1.1)",
      "question_en": "Is all functionality accessible with keyboard only? (WCAG 2.1.1)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Toetsenbord-ontoegankelijkheid sluit gebruikers met motorische beperkingen of assistivetechnologieën uit.",
      "business_impact_en": "Keyboard inaccessibility excludes users with motor disabilities or assistive technologies.",
      "fix_suggestion_nl": "Zorg dat alle knoppen, links, formuliervelden en andere interactieve elementen bereikbaar zijn en activeerbaar met Tab, Enter en andere toetsenbordcommando's.",
      "fix_suggestion_en": "Ensure all buttons, links, form fields, and interactive elements are reachable and activatable with Tab, Enter, and other keyboard commands.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-009",
      "legacy_id": "kb2",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Kan de gebruiker nergens vast komen te zitten met het toetsenbord? Geen keyboard traps? (WCAG 2.1.2)",
      "question_en": "Can the user get stuck with keyboard? No keyboard traps? (WCAG 2.1.2)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Keyboard traps voelen als browser hangt/crashed voor toetsenbordgebruikers, resulterend in verlaten van de site.",
      "business_impact_en": "Keyboard traps feel like the browser is frozen for keyboard users, resulting in site abandonment.",
      "fix_suggestion_nl": "Test alle interactieve elementen met alleen Tab/Shift+Tab. Zorg dat focus altijd kan bewegen. Vermijd JavaScript-baseerde focus-locks zonder escape-optie.",
      "fix_suggestion_en": "Test all interactive elements with Tab/Shift+Tab only. Ensure focus can always move forward/backward. Avoid JavaScript-based focus locks without escape option.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-010",
      "legacy_id": "kb3",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Is er een 'Skip to content' link aanwezig om navigatie over te slaan? (WCAG 2.4.1)",
      "question_en": "Is there a 'Skip to content' link to bypass navigation? (WCAG 2.4.1)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder skip-link moeten toetsenbordgebruikers door heel navigatiemenu's tabben voor ze bij inhoud komen, wat navigatie vertraagt.",
      "business_impact_en": "Without skip link, keyboard users must tab through entire navigation menus before reaching content, slowing navigation.",
      "fix_suggestion_nl": "Voeg een 'Skip to main content' link toe als eerste interactief element op de pagina, zichtbaar bij Tab-focus, verborgen voor muis-gebruikers.",
      "fix_suggestion_en": "Add a 'Skip to main content' link as the first interactive element, visible on Tab focus, hidden for mouse users.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-011",
      "legacy_id": "kb4",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Heeft elke pagina een beschrijvende, unieke <title>? (WCAG 2.4.2)",
      "question_en": "Does each page have a descriptive, unique <title>? (WCAG 2.4.2)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Generieke pagina-titels helpen toetsenbord- en schermlezer-gebruikers niet om hun locatie te begrijpen.",
      "business_impact_en": "Generic page titles don't help keyboard and screen reader users understand their location.",
      "fix_suggestion_nl": "Voeg unieke, beschrijvende titels toe aan elke pagina in de <title> tag. Bv: 'Contactformulier - Mijn Bedrijf' in plaats van 'Home'.",
      "fix_suggestion_en": "Add unique, descriptive titles to each page in the <title> tag. E.g., 'Contact Form - My Business' instead of 'Home'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "document-title"
    },
    {
      "id": "a11y-012",
      "legacy_id": "kb5",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Is de tab-volgorde logisch en voorspelbaar? (WCAG 2.4.3)",
      "question_en": "Is the tab order logical and predictable? (WCAG 2.4.3)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Chaotische tab-volgorde verwart toetsenbordgebruikers en maakt navigatie inefficiënt.",
      "business_impact_en": "Chaotic tab order confuses keyboard users and makes navigation inefficient.",
      "fix_suggestion_nl": "Zorg dat de tab-volgorde volgt: van boven naar beneden, links naar rechts, in dezelfde volgorde als visuele layout. Vermijd tabindex > 0.",
      "fix_suggestion_en": "Ensure tab order follows: top to bottom, left to right, in same order as visual layout. Avoid tabindex > 0.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-013",
      "legacy_id": "kb6",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Zijn er meerdere manieren om paginas te vinden? (menu, zoekfunctie, sitemap) (WCAG 2.4.5)",
      "question_en": "Are there multiple ways to find pages? (menu, search, sitemap) (WCAG 2.4.5)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Gebruikers kunnen pagina's niet vinden via navigatiemenu, zoekfunctie, of sitemap, wat leidt tot frustratie en lage engagement.",
      "business_impact_en": "Users cannot find pages via navigation menu, search function, or sitemap, leading to frustration and low engagement.",
      "fix_suggestion_nl": "Implementeer minimaal 2-3 manieren om pagina's te vinden: navigatiemenu, zoekfunctie, sitemap, breadcrumbs, of gerelateerde links.",
      "fix_suggestion_en": "Implement at least 2-3 ways to find pages: navigation menu, search function, sitemap, breadcrumbs, or related links.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-014",
      "legacy_id": "kb7",
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Is de focus-indicator altijd duidelijk zichtbaar bij toetsenbordnavigatie? (WCAG 2.4.7)",
      "question_en": "Is the focus indicator always clearly visible during keyboard navigation? (WCAG 2.4.7)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onzichtbare focus-indicator maakt het onmogelijk voor toetsenbordgebruikers te volgen waar ze zijn op pagina.",
      "business_impact_en": "Invisible focus indicator makes it impossible for keyboard users to track where they are on the page.",
      "fix_suggestion_nl": "Zorg dat alle elementen een zichtbare focus-indicator hebben (outline, highlight, etc.) met contrastverhouding ≥3:1. Verwijder nooit de browser-default focus zonder custom replacement.",
      "fix_suggestion_en": "Ensure all elements have visible focus indicator (outline, highlight, etc.) with contrast ratio ≥3:1. Never remove browser-default focus without custom replacement.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-015",
      "legacy_id": "md1",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben audio-only bestanden een teksttranscriptie? (WCAG 1.2.1)",
      "question_en": "Do audio-only files have text transcripts? (WCAG 1.2.1)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Zonder transcriptie kunnen doven en slechthorenden audio-inhoud niet begrijpen.",
      "business_impact_en": "Without transcripts, deaf and hard of hearing users cannot access audio content.",
      "fix_suggestion_nl": "Zorg dat alle audio-only bestanden vergezeld gaan van volledige teksttranscripties. Plaats deze naast of onder de audioplayerof downloadbaar.",
      "fix_suggestion_en": "Ensure all audio-only files are accompanied by complete text transcripts. Place alongside or below the player or downloadable.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-016",
      "legacy_id": "md2",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben videos ondertiteling (captions)? (WCAG 1.2.2)",
      "question_en": "Do videos have captions? (WCAG 1.2.2)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Zonder ondertiteling kunnen doven en slechthorenden videocontent niet volgen.",
      "business_impact_en": "Without captions, deaf and hard of hearing users cannot follow video content.",
      "fix_suggestion_nl": "Voeg synchronized ondertitels toe aan alle video's, inclusief spraakinformatie en relevante geluidseffecten (bijv. [deur slaat dicht]).",
      "fix_suggestion_en": "Add synchronized captions to all videos, including speech and relevant sound effects (e.g., [door slams]).",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "video-caption"
    },
    {
      "id": "a11y-017",
      "legacy_id": "md3",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Is er een audiodescriptie of tekst-alternatief voor video-inhoud? (WCAG 1.2.3 / 1.2.5)",
      "question_en": "Is there audio description or text alternative for video content? (WCAG 1.2.3 / 1.2.5)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Blinde en slechtziende gebruikers missen kritieke visuele informatie zonder audiodescriptie.",
      "business_impact_en": "Blind and low vision users miss critical visual information without audio description.",
      "fix_suggestion_nl": "Voeg audiodescriptie toe aan alle video's met belangrijk visueel content. Maak dit beschikbaar als apart audiotrack, separate MP3, of teksttranscriptie.",
      "fix_suggestion_en": "Add audio description to all videos with important visual content. Make available as separate audio track, separate MP3, or text transcript.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-018",
      "legacy_id": "md4",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben live video-uitzendingen ondertiteling? (WCAG 1.2.4)",
      "question_en": "Do live video broadcasts have captions? (WCAG 1.2.4)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Live content zonder ondertiteling maakt het onmogelijk voor slechthorenden deel te nemen.",
      "business_impact_en": "Live content without captions makes it impossible for hard of hearing users to participate.",
      "fix_suggestion_nl": "Implementeer real-time ondertiteling voor alle live-uitzendingen, bijv. via CART (Communication Access Realtime Translation) of live-caption tools.",
      "fix_suggestion_en": "Implement real-time captioning for all live broadcasts, e.g., via CART or live-caption tools.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-019",
      "legacy_id": "md5",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Kan audio die automatisch afspeelt gepauzeerd of gedempt worden? (WCAG 1.4.2)",
      "question_en": "Can auto-playing audio be paused or muted? (WCAG 1.4.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Auto-afspeelend geluid is storend en kan schermlezer-audio overstemmen, wat navigatie bemoeilijkt.",
      "business_impact_en": "Auto-playing audio is disruptive and can drown out screen reader audio, hindering navigation.",
      "fix_suggestion_nl": "Vermijd auto-afspeelend geluid. Als nodig, zorg dat gebruikers het kunnen pauzeren/dempen zonder pagina te herladen. Beter: geen autoplay in het geheel.",
      "fix_suggestion_en": "Avoid auto-playing audio. If necessary, let users pause/mute without reloading page. Better: no autoplay at all.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-020",
      "legacy_id": "md6",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Kan de gebruiker tijdslimieten verlengen, uitschakelen of aanpassen? (WCAG 2.2.1)",
      "question_en": "Can the user extend, disable, or adjust time limits? (WCAG 2.2.1)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Vaste tijdslimieten zonder verlengingsmogelijkheid sluiten gebruikers met motorische of cognitieve beperkingen uit.",
      "business_impact_en": "Fixed time limits without extension options exclude users with motor or cognitive disabilities.",
      "fix_suggestion_nl": "Verwijder of verberg automatische sessie-timeouts. Als nodig, geef gebruikers minstens 10 seconden waarschuwing en een optie om de timeout met minstens 10x in te stellen.",
      "fix_suggestion_en": "Remove or hide automatic session timeouts. If necessary, warn users at least 10 seconds before and offer option to extend by at least 10x.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-021",
      "legacy_id": "md7",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Kan bewegende, knipperende of auto-scrollende content gepauzeerd worden? (WCAG 2.2.2)",
      "question_en": "Can moving, blinking, or auto-scrolling content be paused? (WCAG 2.2.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Bewegende content kan afleidend zijn en seizoens-gerelateerde storingen veroorzaken bij gevoelige gebruikers.",
      "business_impact_en": "Moving content can be distracting and trigger motion sickness in susceptible users.",
      "fix_suggestion_nl": "Voeg pause/play knoppen toe aan carousels, animaties en auto-scroll features. Laat content maar 5 seconden bewegen zonder pauzeknop.",
      "fix_suggestion_en": "Add pause/play buttons to carousels, animations, and auto-scroll features. Allow content to move only 5 seconds without pause option.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-022",
      "legacy_id": "md8",
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Bevat de pagina geen content die meer dan 3x per seconde flitst? (WCAG 2.3.1)",
      "question_en": "Does the page contain no content flashing more than 3 times per second? (WCAG 2.3.1)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Flitsende content kan fotosensitieve epilepsie-aanvallen veroorzaken.",
      "business_impact_en": "Flashing content can trigger photosensitive epilepsy seizures.",
      "fix_suggestion_nl": "Vermijd alle flitsende/knipperende content boven 3Hz (3x per seconde). Als nodig, zorg dat flitsing minder dan 25% schermoppervlak inneemt.",
      "fix_suggestion_en": "Avoid all flashing/blinking content above 3Hz (3 times per second). If necessary, ensure flashing occupies less than 25% of screen area.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-023",
      "legacy_id": "fm1",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Heeft elk formulierveld een zichtbaar en gekoppeld <label>? (WCAG 3.3.2 / 1.3.1)",
      "question_en": "Does each form field have a visible and associated <label>? (WCAG 3.3.2 / 1.3.1)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Zonder gekoppelde labels kunnen schermlezer-gebruikers niet begrijpen wat elk veld is.",
      "business_impact_en": "Without associated labels, screen reader users cannot understand what each field is.",
      "fix_suggestion_nl": "Voeg <label> elementen toe met for-attribuut dat overeenkomt met input id. Zorg dat labels zichtbaar zijn en beschrijvend zijn.",
      "fix_suggestion_en": "Add <label> elements with for attribute matching input id. Ensure labels are visible and descriptive.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "label"
    },
    {
      "id": "a11y-024",
      "legacy_id": "fm2",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Worden fouten duidelijk geidentificeerd en in tekst beschreven? (WCAG 3.3.1)",
      "question_en": "Are errors clearly identified and described in text? (WCAG 3.3.1)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onduidelijke foutmeldingen frustreren gebruikers en leiden tot verlaten van formulier.",
      "business_impact_en": "Unclear error messages frustrate users and lead to form abandonment.",
      "fix_suggestion_nl": "Toon foutmeldingen duidelijk in tekst (niet alleen rood/pictogram). Identificeer het veld en leg uit wat fout is. Bv: 'Email veld: voer een geldig e-mailadres in'.",
      "fix_suggestion_en": "Display errors clearly in text (not just red/icon). Identify the field and explain what's wrong. E.g., 'Email field: enter a valid email address'.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-025",
      "legacy_id": "fm3",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Worden suggesties gegeven bij invoerfouten? (WCAG 3.3.3)",
      "question_en": "Are suggestions provided for input errors? (WCAG 3.3.3)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder suggesties moeten gebruikers gissen hoe fouten op te lossen, wat frustratie verhoogt.",
      "business_impact_en": "Without suggestions, users must guess how to fix errors, increasing frustration.",
      "fix_suggestion_nl": "Geef nuttige suggesties voor het corrigeren van fouten. Bv: 'Voer datum in als DD-MM-YYYY' of 'Wachtwoord moet minstens 8 tekens bevatten'.",
      "fix_suggestion_en": "Provide helpful suggestions for correcting errors. E.g., 'Enter date as DD-MM-YYYY' or 'Password must contain at least 8 characters'.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-026",
      "legacy_id": "fm4",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Kunnen juridische/financiele acties ongedaan gemaakt, gecontroleerd of bevestigd worden? (WCAG 3.3.4)",
      "question_en": "Can legal/financial actions be undone, checked, or confirmed? (WCAG 3.3.4)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onherstelbare juridische/financiële fouten kunnen gebruikers schaden en aansprakelijkheid voor bedrijf creëren.",
      "business_impact_en": "Irreversible legal/financial mistakes can harm users and create liability.",
      "fix_suggestion_nl": "Implementeer bevestigingsdialogen, preview schermen, of undo-opties voor kritische acties (betaling, verwijdering, etc.). Zorg voor duidelijke beweringen.",
      "fix_suggestion_en": "Implement confirmation dialogs, preview screens, or undo options for critical actions (payment, deletion, etc.). Provide clear statements.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-027",
      "legacy_id": "fm5",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Heeft de HTML-pagina een correct lang-attribuut? (bijv. lang='nl') (WCAG 3.1.1)",
      "question_en": "Does the HTML page have a correct lang attribute? (e.g., lang='nl') (WCAG 3.1.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Zonder correct lang-attribuut kunnen schermlezers niet de juiste uitspraak gebruiken.",
      "business_impact_en": "Without correct lang attribute, screen readers cannot use proper pronunciation.",
      "fix_suggestion_nl": "Voeg lang='nl' (of appropriate language code) toe aan de <html> tag.",
      "fix_suggestion_en": "Add lang='nl' (or appropriate language code) to the <html> tag.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "html-has-lang"
    },
    {
      "id": "a11y-028",
      "legacy_id": "fm6",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Worden wisselingen van taal in de content gemarkeerd met lang-attribuut? (WCAG 3.1.2)",
      "question_en": "Are language changes in content marked with lang attribute? (WCAG 3.1.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Ongemarkeerde taalachtergrond zorgt ervoor dat schermlezers verkeerde uitspraak gebruiken.",
      "business_impact_en": "Unmarked language changes cause screen readers to use incorrect pronunciation.",
      "fix_suggestion_nl": "Markeer passages in andere talen met lang-attribuut. Bv: <span lang='en'>Hello</span> in Nederlandse tekst.",
      "fix_suggestion_en": "Mark passages in other languages with lang attribute. E.g., <span lang='en'>Hello</span> within Dutch text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-029",
      "legacy_id": "fm7",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Zijn verplichte velden duidelijk aangegeven (niet alleen met kleur)? (WCAG 1.3.1)",
      "question_en": "Are required fields clearly indicated (not color alone)? (WCAG 1.3.1)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder duidelijke indicatie missen gebruikers welke velden verplicht zijn, resulterend in formuliervalidatiefouten.",
      "business_impact_en": "Without clear indication, users miss which fields are required, resulting in form validation errors.",
      "fix_suggestion_nl": "Voeg asterisk (*) of 'verplicht' tekstlabel toe naast verplichte velden. Zorg dat dit niet alleen via kleur is aangegeven.",
      "fix_suggestion_en": "Add asterisk (*) or 'required' text label next to required fields. Ensure not indicated by color alone.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-030",
      "legacy_id": "fm8",
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Worden instructies gegeven voor het formulier waar nodig? (WCAG 3.3.2)",
      "question_en": "Are instructions provided for the form where needed? (WCAG 3.3.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onduidelijke formulierinterfaces frustreren gebruikers en leiden tot verlaten.",
      "business_impact_en": "Unclear form interfaces frustrate users and lead to abandonment.",
      "fix_suggestion_nl": "Voeg instructies toe boven het formulier of bij complexe velden. Leg uit wat verwacht wordt. Bv: 'Datum moet DD/MM/YYYY zijn'.",
      "fix_suggestion_en": "Add instructions above the form or for complex fields. Explain what's expected. E.g., 'Date must be DD/MM/YYYY'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-031",
      "legacy_id": "sm1",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Is de heading-hierarchie logisch (h1 → h2 → h3)? (WCAG 1.3.1)",
      "question_en": "Is the heading hierarchy logical (h1 → h2 → h3)? (WCAG 1.3.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Onlogische heading-structuur maakt pagina-inhoud moeilijk te navigeren voor schermlezer-gebruikers.",
      "business_impact_en": "Illogical heading structure makes page content difficult to navigate for screen reader users.",
      "fix_suggestion_nl": "Zorg dat er één H1 per pagina is en dat headings in logische volgorde gaan. Sla niveaus niet over (h1 → h3).",
      "fix_suggestion_en": "Ensure one H1 per page and headings follow logical order. Don't skip levels (h1 → h3).",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "heading-order"
    },
    {
      "id": "a11y-032",
      "legacy_id": "sm2",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Hebben alle interactieve elementen een toegankelijke naam? (WCAG 4.1.2)",
      "question_en": "Do all interactive elements have an accessible name? (WCAG 4.1.2)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Naamloze knoppen en links zijn onnavigeerbaar voor schermlezer-gebruikers.",
      "business_impact_en": "Unlabeled buttons and links are unnavigable for screen reader users.",
      "fix_suggestion_nl": "Zorg dat alle knoppen label-tekst hebben (via <button>, aria-label, of title). Links moet link-tekst hebben.",
      "fix_suggestion_en": "Ensure all buttons have label text (via <button>, aria-label, or title). Links must have link text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "button-name"
    },
    {
      "id": "a11y-033",
      "legacy_id": "sm3",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn ARIA-rollen correct gebruikt? (WCAG 4.1.2)",
      "question_en": "Are ARIA roles used correctly? (WCAG 4.1.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onjuiste ARIA-rollen verwarden schermlezers en geven gebruikers misleidende informatie.",
      "business_impact_en": "Incorrect ARIA roles confuse screen readers and give users misleading information.",
      "fix_suggestion_nl": "Gebruik ARIA-rollen alleen als nodig. Zorg dat rollen passen bij het element. Test met schermlezer.",
      "fix_suggestion_en": "Use ARIA roles only when necessary. Ensure roles match the element. Test with screen reader.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-034",
      "legacy_id": "sm4",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Is de volgorde van content in de DOM logisch, ook zonder CSS? (WCAG 1.3.2)",
      "question_en": "Is the content order in the DOM logical, even without CSS? (WCAG 1.3.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Logische DOM-volgorde is essentieel voor toetsenbord en schermlezer navigatie.",
      "business_impact_en": "Logical DOM order is essential for keyboard and screen reader navigation.",
      "fix_suggestion_nl": "Zorg dat DOM-volgorde leesbaar is van boven naar beneden zonder CSS. Vermijd grote floats/absolute positioning die DOM-orde verstoren.",
      "fix_suggestion_en": "Ensure DOM order is readable top-to-bottom without CSS. Avoid large floats/absolute positioning that disrupts DOM order.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-035",
      "legacy_id": "sm5",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Werkt de layout correct bij 200% zoom zonder horizontaal scrollen? (WCAG 1.4.4 / 1.4.10)",
      "question_en": "Does the layout work correctly at 200% zoom without horizontal scrolling? (WCAG 1.4.4 / 1.4.10)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Layouts die niet schalen bij zoom zijn onbruikbaar voor gebruikers met laag zicht.",
      "business_impact_en": "Layouts that don't scale at zoom are unusable for low vision users.",
      "fix_suggestion_nl": "Test de site bij 200% browser zoom. Zorg dat content niet horizontaal scrollt. Gebruik responsive design en relative units (em, %).",
      "fix_suggestion_en": "Test the site at 200% browser zoom. Ensure content doesn't require horizontal scrolling. Use responsive design and relative units.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-036",
      "legacy_id": "sm6",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Verdwijnt content die verschijnt bij hover/focus niet onverwacht? (WCAG 1.4.13)",
      "question_en": "Does content appearing on hover/focus not disappear unexpectedly? (WCAG 1.4.13)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Content die verdwijnt op move/blur frustreert gebruikers die tooltips willen lezen.",
      "business_impact_en": "Content that disappears on move/blur frustrates users trying to read tooltips.",
      "fix_suggestion_nl": "Zorg dat hover/focus-content blijft totdat gebruiker het wegbeweegt of Escape drukt. Maak tooltips groot genoeg om mee te interacteren.",
      "fix_suggestion_en": "Ensure hover/focus content persists until user moves away or presses Escape. Make tooltips large enough to interact with.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-037",
      "legacy_id": "sm7",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Hebben formuliervelden autocomplete-attributen? (WCAG 1.3.5)",
      "question_en": "Do form fields have autocomplete attributes? (WCAG 1.3.5)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zonder autocomplete-hints kunnen gebruikers met motorische beperkingen formulieren niet efficiënt invullen.",
      "business_impact_en": "Without autocomplete hints, users with motor disabilities cannot efficiently fill forms.",
      "fix_suggestion_nl": "Voeg autocomplete-attributen toe aan formuliervelden (name, email, tel, etc.) zodat browsers autofill kunnen gebruiken.",
      "fix_suggestion_en": "Add autocomplete attributes to form fields (name, email, tel, etc.) so browsers can use autofill.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-038",
      "legacy_id": "sm8",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Werkt de content in zowel portrait als landscape modus? (WCAG 1.3.4)",
      "question_en": "Does content work in both portrait and landscape orientation? (WCAG 1.3.4)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Content geblokkeerd op één orientatie sluit gebruikers uit die hun apparaat anders houden.",
      "business_impact_en": "Content locked to one orientation excludes users who hold their device differently.",
      "fix_suggestion_nl": "Zorg dat content in beide orientaties werkt. Dwing geen specifieke orientatie af (tenzij essentieel, bijv. video-speler).",
      "fix_suggestion_en": "Ensure content works in both orientations. Don't force specific orientation (unless essential, e.g., video player).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-039",
      "legacy_id": "sm9",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn complexe gebaren ook beschikbaar via single-pointer alternatief? (WCAG 2.5.1)",
      "question_en": "Are complex gestures available via single-pointer alternative? (WCAG 2.5.1)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Indien alleen multi-touch gebaren beschikbaar, kunnen gebruikers met één hand of adaptieve controllers niet interacteren.",
      "business_impact_en": "If only multi-touch gestures are available, users with one hand or adaptive controllers cannot interact.",
      "fix_suggestion_nl": "Bied single-tap of button-gebaseerde alternatieven voor multi-touch gebaren (swipe, pinch, etc.).",
      "fix_suggestion_en": "Offer single-tap or button-based alternatives for multi-touch gestures (swipe, pinch, etc.).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-040",
      "legacy_id": "sm10",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Kan een pointer-actie afgebroken worden? (WCAG 2.5.2)",
      "question_en": "Can a pointer action be aborted? (WCAG 2.5.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Acties die afgaan op pointer-down zijn moeilijk om niet aan te raken, specifieltly voor gebruikers met motorische beperkingen.",
      "business_impact_en": "Actions triggered on pointer-down are difficult to avoid, especially for users with motor disabilities.",
      "fix_suggestion_nl": "Zorg dat acties alleen afgaan op pointer-up, niet on-down. Sta gebruikers toe om weg te bewegen en los te laten zonder actie.",
      "fix_suggestion_en": "Ensure actions trigger on pointer-up, not on-down. Let users move away and release without triggering action.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-041",
      "legacy_id": "sm11",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Komt de accessible name overeen met de zichtbare labeltekst? (WCAG 2.5.3)",
      "question_en": "Does the accessible name match the visible label text? (WCAG 2.5.3)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Niet-overeenkomende namen veroorzaken verwarring voor schermlezer-gebruikers bij spraakbestuur.",
      "business_impact_en": "Mismatched names cause confusion for screen reader users with voice control.",
      "fix_suggestion_nl": "Zorg dat ARIA-labels of accessible names exact overeenkomen met zichtbare label-tekst.",
      "fix_suggestion_en": "Ensure ARIA labels or accessible names exactly match visible label text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-042",
      "legacy_id": "sm12",
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Is er geen functionaliteit die alleen via device-motion werkt? (WCAG 2.5.4)",
      "question_en": "Is there no functionality that only works via device-motion? (WCAG 2.5.4)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Motion-only controles zijn ontoegankelijk voor gebruikers op stationaire apparaten of met motor-beperkingen.",
      "business_impact_en": "Motion-only controls are inaccessible to users on stationary devices or with motor disabilities.",
      "fix_suggestion_nl": "Bied button-gebaseerde alternatieven voor motion-gebaseerde acties (schudden, kantelen, etc.).",
      "fix_suggestion_en": "Offer button-based alternatives for motion-based actions (shake, tilt, etc.).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-043",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Hebben niet-tekstuele content en UI-componenten voldoende contrast? (WCAG 1.4.11)",
      "question_en": "Do non-text content and UI components have sufficient contrast? (WCAG 1.4.11)",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Lage contrast in UI-componenten maakt interactieve elementen moeilijk identificeerbaar.",
      "business_impact_en": "Low contrast in UI components makes interactive elements hard to identify.",
      "fix_suggestion_nl": "Zorg dat alle UI-elementen (borders, icons, disabled state indicators) een contrastverhouding van minstens 3:1 hebben.",
      "fix_suggestion_en": "Ensure all UI elements (borders, icons, disabled state indicators) have a contrast ratio of at least 3:1.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "non-text-contrast"
    },
    {
      "id": "a11y-044",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Kan tekst spacing aangepast worden zonder verlies van functionaliteit? (WCAG 1.4.12)",
      "question_en": "Can text spacing be adjusted without loss of functionality? (WCAG 1.4.12)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Vaste tekst-afstanden kunnen leesbaarheid verminderen voor gebruikers met dyslexie.",
      "business_impact_en": "Fixed text spacing can reduce readability for users with dyslexia.",
      "fix_suggestion_nl": "Zorg dat tekst spacing aanpasbaar is via browser-instellingen zonder dat layout breekt. Test met: line-height: 1.5, letter-spacing: 0.12em, word-spacing: 0.16em.",
      "fix_suggestion_en": "Ensure text spacing can be adjusted via browser settings without breaking layout. Test with: line-height: 1.5, letter-spacing: 0.12em, word-spacing: 0.16em.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-045",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Reflowed content bij 320px width zonder horizontaal scrollen? (WCAG 1.4.10)",
      "question_en": "Does content reflow at 320px width without horizontal scrolling? (WCAG 1.4.10)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Horizontaal scrollen is irritant op kleine schermen en problematisch voor gebruikers met laag zicht.",
      "business_impact_en": "Horizontal scrolling is annoying on small screens and problematic for low vision users.",
      "fix_suggestion_nl": "Test responsive design bij 320px viewport. Zorg dat content 1-koloms reflows zonder horizontaal scroll.",
      "fix_suggestion_en": "Test responsive design at 320px viewport. Ensure content reflows to single column without horizontal scroll.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-046",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Hebben alle afbeeldingen passende alt-tekst? (WCAG 1.1.1)",
      "question_en": "Do all images have appropriate alt text? (WCAG 1.1.1)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Afbeeldingen zonder alt-tekst zijn ontoegankelijk voor blinde en slechtziende gebruikers.",
      "business_impact_en": "Images without alt text are inaccessible to blind and low vision users.",
      "fix_suggestion_nl": "Voeg alt-attributen toe aan alle <img> tags. Zorg dat alt-tekst betekenisvol is en inhoud beschrijft.",
      "fix_suggestion_en": "Add alt attributes to all <img> tags. Ensure alt text is meaningful and describes content.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "image-alt"
    },
    {
      "id": "a11y-047",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Hebben alle links beschrijvende linktekst? (WCAG 2.4.4)",
      "question_en": "Do all links have descriptive link text? (WCAG 2.4.4)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Generieke linktekst (bijv. 'Klik hier') is onbegrijpelijk voor schermlezer-gebruikers.",
      "business_impact_en": "Generic link text (e.g., 'Click here') is incomprehensible to screen reader users.",
      "fix_suggestion_nl": "Vervang 'Klik hier' linktekst met beschrijvende tekst die aangeeft waarheen link gaat. Bv: 'Lees meer over onze diensten'.",
      "fix_suggestion_en": "Replace 'Click here' link text with descriptive text indicating where link goes. E.g., 'Read more about our services'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "link-name"
    },
    {
      "id": "a11y-048",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Zijn tabindex waarden correct gebruikt? (WCAG 2.1.1)",
      "question_en": "Are tabindex values used correctly? (WCAG 2.1.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Onjuiste tabindex-waarden verstoren toetsenbord-navigatie.",
      "business_impact_en": "Incorrect tabindex values disrupt keyboard navigation.",
      "fix_suggestion_nl": "Vermijd tabindex > 0. Zorg dat tabindex-waarden logisch volgorde volgen en geen negatieve impact hebben op focus-beheer.",
      "fix_suggestion_en": "Avoid tabindex > 0. Ensure tabindex values follow logical order and don't negatively impact focus management.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "tabindex"
    },
    {
      "id": "a11y-049",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Zijn accesskeys uniek en niet conflicterend? (WCAG 2.1.1)",
      "question_en": "Are accesskeys unique and non-conflicting? (WCAG 2.1.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Conflicterende accesskeys interferen met browser en AT-shortcuts.",
      "business_impact_en": "Conflicting accesskeys interfere with browser and AT shortcuts.",
      "fix_suggestion_nl": "Vermijd accesskeys of zorg dat ze uniek zijn en niet conflicteren met standaard browser-shortcuts.",
      "fix_suggestion_en": "Avoid accesskeys or ensure they are unique and don't conflict with standard browser shortcuts.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "accesskeys"
    },
    {
      "id": "a11y-050",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Is focus niet beperkt tot specifieke regio's? (WCAG 2.4.11)",
      "question_en": "Is focus not restricted to specific regions? (WCAG 2.4.11)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Focus-beperking verhindert toetsenbordgebruikers andere pagina-elementen te bereiken.",
      "business_impact_en": "Focus restriction prevents keyboard users from reaching other page elements.",
      "fix_suggestion_nl": "Vermijd focus-locks op modals of specifieke regio's. Toestaan dat focus naar alle interactieve elementen kan gaan.",
      "fix_suggestion_en": "Avoid focus locks on modals or specific regions. Allow focus to move to all interactive elements.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-051",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Heeft focus-indicator minimale afmetingen en zichtbaarheid? (WCAG 2.4.12)",
      "question_en": "Does focus indicator have minimum size and visibility? (WCAG 2.4.12)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Te kleine of onzichtbare focus-indicator bemoeilijkt toetsenbordnavigatie.",
      "business_impact_en": "Too small or invisible focus indicator hampers keyboard navigation.",
      "fix_suggestion_nl": "Zorg dat focus-indicator minstens 2px dik is en een contrastverhouding van ≥3:1 heeft tegen achtergrond.",
      "fix_suggestion_en": "Ensure focus indicator is at least 2px thick and has ≥3:1 contrast ratio against background.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-052",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Verandert context niet bij focus of input? (WCAG 3.2.1 / 3.2.2)",
      "question_en": "Does context not change on focus or input? (WCAG 3.2.1 / 3.2.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onverwachte context-veranderingen (submit op focus) verwarren toetsenbordgebruikers.",
      "business_impact_en": "Unexpected context changes (submit on focus) confuse keyboard users.",
      "fix_suggestion_nl": "Vermijd automatische form-submissions bij focus of input-verandering. Vereisen explicit user action (button click).",
      "fix_suggestion_en": "Avoid automatic form submissions on focus or input change. Require explicit user action (button click).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-053",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben video's minstens ondertiteling of transcriptie? (WCAG 1.2.2)",
      "question_en": "Do videos have at least captions or transcription? (WCAG 1.2.2)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Video's zonder captions/transcriptie zijn ontoegankelijk voor dove en slechthorende gebruikers.",
      "business_impact_en": "Videos without captions/transcription are inaccessible to deaf and hard of hearing users.",
      "fix_suggestion_nl": "Voeg captions of transcriptie toe aan alle video's.",
      "fix_suggestion_en": "Add captions or transcription to all videos.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "video-caption"
    },
    {
      "id": "a11y-054",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben audio-elementen ondertiteling of transcriptie? (WCAG 1.2.1)",
      "question_en": "Do audio elements have captions or transcription? (WCAG 1.2.1)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Audio zonder captions/transcriptie is ontoegankelijk voor dove gebruikers.",
      "business_impact_en": "Audio without captions/transcription is inaccessible to deaf users.",
      "fix_suggestion_nl": "Voeg ondertiteling of transcriptie toe aan alle audio-elementen.",
      "fix_suggestion_en": "Add captions or transcription to all audio elements.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "audio-caption"
    },
    {
      "id": "a11y-055",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben pre-recorded video's audiodescriptie en gebarentaal? (WCAG 1.2.5 / 1.2.6)",
      "question_en": "Do pre-recorded videos have audio description and sign language? (WCAG 1.2.5 / 1.2.6)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Audiodescriptie maakt video's toegankelijk voor blinde en slechtziende gebruikers.",
      "business_impact_en": "Audio description makes videos accessible to blind and low vision users.",
      "fix_suggestion_nl": "Voeg audiodescriptie toe aan video's met belangrijk visueel content. Voeg gebarentaal-video toe voor dove gebruikers.",
      "fix_suggestion_en": "Add audio description to videos with important visual content. Add sign language video for deaf users.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-056",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Hebben pre-recorded audio's uitgebreide audiodescriptie? (WCAG 1.2.7)",
      "question_en": "Do pre-recorded audio have extended audio description? (WCAG 1.2.7)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Uitgebreide audiodescriptie (AAA-level) verbetert toegankelijkheid voor blinde gebruikers.",
      "business_impact_en": "Extended audio description (AAA-level) improves accessibility for blind users.",
      "fix_suggestion_nl": "Voeg uitgebreide audiodescriptie toe aan audio-content. Dit kan als apart audio-bestand of teksttranscriptie.",
      "fix_suggestion_en": "Add extended audio description to audio content. This can be separate audio file or text transcript.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-057",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Hebben alle formuliervelden correcte name-attributen? (WCAG 4.1.2)",
      "question_en": "Do all form fields have correct name attributes? (WCAG 4.1.2)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Form-velden zonder names zijn moeilijk te vullen voor schermlezer-gebruikers.",
      "business_impact_en": "Form fields without names are hard to fill for screen reader users.",
      "fix_suggestion_nl": "Zorg dat alle form-velden name-attributen hebben en gekoppeld zijn aan labels.",
      "fix_suggestion_en": "Ensure all form fields have name attributes and are associated with labels.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "select-name"
    },
    {
      "id": "a11y-058",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Is het lang-attribuut geldig? (WCAG 3.1.1)",
      "question_en": "Is the lang attribute valid? (WCAG 3.1.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Ongeldig lang-attribuut kan schermlezers verwarren.",
      "business_impact_en": "Invalid lang attribute can confuse screen readers.",
      "fix_suggestion_nl": "Zorg dat lang-attributen geldige taalcodes zijn (bijv. 'nl', 'en', 'fr').",
      "fix_suggestion_en": "Ensure lang attributes use valid language codes (e.g., 'nl', 'en', 'fr').",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "html-lang-valid"
    },
    {
      "id": "a11y-059",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Is foutpreventie geïmplementeerd voor juridische/financiële acties? (WCAG 3.3.6)",
      "question_en": "Is error prevention implemented for legal/financial actions? (WCAG 3.3.6)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Zonder foutpreventie kunnen gebruikers per ongeluk kritieke acties uitvoeren.",
      "business_impact_en": "Without error prevention, users can accidentally perform critical actions.",
      "fix_suggestion_nl": "Implementeer preview, confirmation dialogs, of undo voor juridische/financiële transacties.",
      "fix_suggestion_en": "Implement preview, confirmation dialogs, or undo for legal/financial transactions.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-060",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Is redundante invoer geminimaliseerd? (WCAG 3.3.7)",
      "question_en": "Is redundant entry minimized? (WCAG 3.3.7)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Redundante invoer-velden frustreren gebruikers, vooral die met motorische beperkingen.",
      "business_impact_en": "Redundant entry fields frustrate users, especially those with motor disabilities.",
      "fix_suggestion_nl": "Minimaliseer herhaalde veldwaarden. Gebruik autofill, prefilled waarden, of stap-voor-stap formulieren.",
      "fix_suggestion_en": "Minimize repeated field values. Use autofill, prefilled values, or step-by-step forms.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-061",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Is toestemmingsauthenticatie toegankelijk? (WCAG 3.3.8)",
      "question_en": "Is authentication accessible? (WCAG 3.3.8)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Ontoegankelijke login/authenticatie sluit gebruikers buiten.",
      "business_impact_en": "Inaccessible login/authentication locks users out.",
      "fix_suggestion_nl": "Zorg dat login-formulieren volledig toetsenbord-toegankelijk zijn. Vermijd CAPTCHA's of zorg voor alternatieven (audio CAPTCHA, etc.).",
      "fix_suggestion_en": "Ensure login forms are fully keyboard accessible. Avoid CAPTCHAs or provide alternatives (audio CAPTCHA, etc.).",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-062",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Heeft de pagina minstens één <main> landmark? (WCAG 2.4.1)",
      "question_en": "Does the page have at least one <main> landmark? (WCAG 2.4.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Zonder <main> landmark kunnen schermlezer-gebruikers niet snel naar inhoud springen.",
      "business_impact_en": "Without <main> landmark, screen reader users cannot quickly jump to content.",
      "fix_suggestion_nl": "Voeg één <main> element toe aan de pagina, inclusief primaire inhoud.",
      "fix_suggestion_en": "Add one <main> element to the page, wrapping primary content.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "landmark-one-main"
    },
    {
      "id": "a11y-063",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn alle content-regio's gemarkeerd met landmarks? (WCAG 1.3.1)",
      "question_en": "Are all content regions marked with landmarks? (WCAG 1.3.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Unmarked regions maken het lastig voor schermlezer-gebruikers pagina-structuur te begrijpen.",
      "business_impact_en": "Unmarked regions make it hard for screen reader users to understand page structure.",
      "fix_suggestion_nl": "Gebruik landmarks (<header>, <nav>, <main>, <aside>, <footer>) voor duidelijke structuur.",
      "fix_suggestion_en": "Use landmarks (<header>, <nav>, <main>, <aside>, <footer>) for clear structure.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "region"
    },
    {
      "id": "a11y-064",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn lijsten semantisch correct gemarkeerd? (WCAG 1.3.1)",
      "question_en": "Are lists semantically marked correctly? (WCAG 1.3.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Niet-semantische lijsten ondermijnen schermlezer-navigatie.",
      "business_impact_en": "Non-semantic lists undermine screen reader navigation.",
      "fix_suggestion_nl": "Gebruik <ul>, <ol>, en <li> voor daadwerkelijke lijsten, niet <div> of <p>.",
      "fix_suggestion_en": "Use <ul>, <ol>, and <li> for actual lists, not <div> or <p>.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "list"
    },
    {
      "id": "a11y-065",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Staan lijstitems alleen in lijsten? (WCAG 1.3.1)",
      "question_en": "Are list items only in lists? (WCAG 1.3.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Orphaned <li> elementen buiten <ul>/<ol> verwarren schermlezers.",
      "business_impact_en": "Orphaned <li> elements outside <ul>/<ol> confuse screen readers.",
      "fix_suggestion_nl": "Zorg dat alle <li> elementen in <ul> of <ol> staan.",
      "fix_suggestion_en": "Ensure all <li> elements are within <ul> or <ol>.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "listitem"
    },
    {
      "id": "a11y-066",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Hebben iframes beschrijvende titels? (WCAG 1.3.1 / 2.4.1)",
      "question_en": "Do iframes have descriptive titles? (WCAG 1.3.1 / 2.4.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Iframes zonder titels zijn navigeerbaar voor schermlezer-gebruikers.",
      "business_impact_en": "Iframes without titles are not navigable for screen reader users.",
      "fix_suggestion_nl": "Voeg title-attributen toe aan alle <iframe> elementen met beschrijvende tekst.",
      "fix_suggestion_en": "Add title attributes to all <iframe> elements with descriptive text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "frame-title"
    },
    {
      "id": "a11y-067",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn er geen duplicate IDs op de pagina? (WCAG 4.1.1)",
      "question_en": "Are there no duplicate IDs on the page? (WCAG 4.1.1)",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Duplicate IDs kunnen label-associations en JavaScript-functionaliteit verstoren.",
      "business_impact_en": "Duplicate IDs can break label associations and JavaScript functionality.",
      "fix_suggestion_nl": "Zorg dat alle ID-attributen uniek zijn op de pagina.",
      "fix_suggestion_en": "Ensure all ID attributes are unique on the page.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "axe-core",
      "auto_rule": "duplicate-id-active"
    },
    {
      "id": "a11y-068",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Is navigatie consistent over pagina's heen? (WCAG 3.2.3)",
      "question_en": "Is navigation consistent across pages? (WCAG 3.2.3)",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Inconsistente navigatie verwart gebruikers en bemoeilijkt site-navigatie.",
      "business_impact_en": "Inconsistent navigation confuses users and hinders site navigation.",
      "fix_suggestion_nl": "Zorg dat navigatiemenu's, plaatsing, en stijlen consistent zijn op alle pagina's.",
      "fix_suggestion_en": "Ensure navigation menus, placement, and styling are consistent across all pages.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "consistent-navigation"
    },
    {
      "id": "a11y-069",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn componenten consistent identificeerbaar? (WCAG 3.2.4)",
      "question_en": "Are components consistently identified? (WCAG 3.2.4)",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Inconsistente component-identificatie verwart gebruikers.",
      "business_impact_en": "Inconsistent component identification confuses users.",
      "fix_suggestion_nl": "Zorg dat dezelfde componenten dezelfde labels en presentatie hebben over pagina's heen.",
      "fix_suggestion_en": "Ensure same components have same labels and presentation across pages.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "consistent-identification"
    },
    {
      "id": "a11y-070",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Is sleepen/slepen niet het enige middel voor interactie? (WCAG 2.5.7)",
      "question_en": "Is dragging not the only means of interaction? (WCAG 2.5.7)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Drag-only interfaces zijn ontoegankelijk voor gebruikers met motorische beperkingen.",
      "business_impact_en": "Drag-only interfaces are inaccessible to users with motor disabilities.",
      "fix_suggestion_nl": "Bied button/select-gebaseerde alternatieven voor drag-and-drop functionaliteit.",
      "fix_suggestion_en": "Offer button/select-based alternatives for drag-and-drop functionality.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-071",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Hebben interactieve targets minimale grootte van 24x24px? (WCAG 2.5.8)",
      "question_en": "Do interactive targets have minimum size of 24x24px? (WCAG 2.5.8)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Kleine targets zijn moeilijk aan te raken, vooral op mobiele apparaten.",
      "business_impact_en": "Small targets are hard to tap, especially on mobile devices.",
      "fix_suggestion_nl": "Zorg dat alle clickable/tappable elementen minstens 24x24px groot zijn. Voeg padding toe waar nodig.",
      "fix_suggestion_en": "Ensure all clickable/tappable elements are at least 24x24px. Add padding if needed.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-072",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Is de pagina leesbaar bij zwart-witweergave? (contrast-check)",
      "question_en": "Is the page readable in grayscale? (contrast-check)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Grijs-geschakeld design helpt verifiëren dat contrast niet alleen op kleur berust.",
      "business_impact_en": "Grayscale design helps verify contrast isn't only color-based.",
      "fix_suggestion_nl": "Test pagina in grayscale-modus. Zorg dat alle informatie nog zichtbaar is zonder kleur.",
      "fix_suggestion_en": "Test page in grayscale mode. Ensure all information is still visible without color.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-073",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Ondersteunt het formulier browserauto-fill? (WCAG 1.3.5)",
      "question_en": "Does the form support browser autofill? (WCAG 1.3.5)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Auto-fill ondersteuning versnelt formulierinvulling voor alle gebruikers.",
      "business_impact_en": "Autofill support speeds up form filling for all users.",
      "fix_suggestion_nl": "Voeg autocomplete-attributen toe aan form-velden (name, email, tel, address, etc.).",
      "fix_suggestion_en": "Add autocomplete attributes to form fields (name, email, tel, address, etc.).",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-074",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Worden alle media's gepauzeerd bij verlies van focus? (WCAG 1.4.2)",
      "question_en": "Do all media pause when focus is lost? (WCAG 1.4.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Autoplay media die niet onderbreken kunnen schermlezer-audio overstemmen.",
      "business_impact_en": "Autoplay media that don't pause can drown out screen reader audio.",
      "fix_suggestion_nl": "Zorg dat alle audio/video pauzeert wanneer pagina focus verliest.",
      "fix_suggestion_en": "Ensure all audio/video pauses when page loses focus.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-075",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Kunnen gebruikers focus-order omdraaien met Shift+Tab? (WCAG 2.1.1)",
      "question_en": "Can users reverse focus order with Shift+Tab? (WCAG 2.1.1)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Shift+Tab ondersteuning is essentieel voor bidirectionele toetsenbordnavigatie.",
      "business_impact_en": "Shift+Tab support is essential for bidirectional keyboard navigation.",
      "fix_suggestion_nl": "Zorg dat Shift+Tab correct teruggaat in focus-order zonder keyboard traps.",
      "fix_suggestion_en": "Ensure Shift+Tab correctly goes back in focus order without keyboard traps.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-076",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Zijn decoratieve afbeeldingen gemarkeerd met alt=''? (WCAG 1.1.1)",
      "question_en": "Are decorative images marked with alt=''? (WCAG 1.1.1)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Niet-gelabelde decoratieve afbeeldingen creëren ruis in schermlezer-uitvoer.",
      "business_impact_en": "Unlabeled decorative images create noise in screen reader output.",
      "fix_suggestion_nl": "Markeer decoratieve <img> met alt='' (leeg alt-attribuut) of role='presentation'.",
      "fix_suggestion_en": "Mark decorative <img> with alt='' (empty alt attribute) or role='presentation'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-077",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Zijn <button> en <a> elementen correct gebruikt? (WCAG 2.4.9)",
      "question_en": "Are <button> and <a> elements used correctly? (WCAG 2.4.9)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onjuist gebruik van <a> voor acties in plaats van navigatie is verwarrend.",
      "business_impact_en": "Incorrect use of <a> for actions instead of navigation is confusing.",
      "fix_suggestion_nl": "Gebruik <a> voor navigatie (href), <button> voor acties (onClick).",
      "fix_suggestion_en": "Use <a> for navigation (href), <button> for actions (onClick).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-078",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Zijn <fieldset> en <legend> correct gebruikt voor grouping? (WCAG 3.3.2)",
      "question_en": "Are <fieldset> and <legend> used correctly for grouping? (WCAG 3.3.2)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Correct fieldset/legend gebruik helpt schermlezer-gebruikers form-groepering begrijpen.",
      "business_impact_en": "Correct fieldset/legend use helps screen reader users understand form grouping.",
      "fix_suggestion_nl": "Gebruik <fieldset> + <legend> voor logische form-groepen (bijv. radiobuttongroepen).",
      "fix_suggestion_en": "Use <fieldset> + <legend> for logical form groups (e.g., radio button groups).",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-079",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Is het contrast ratio ≥7:1 voor AAA-compliantie? (WCAG 1.4.6 AAA)",
      "question_en": "Is contrast ratio ≥7:1 for AAA compliance? (WCAG 1.4.6 AAA)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "AAA-level contrast (7:1) biedt excellent leesbaarheid voor extreme low-vision gebruikers.",
      "business_impact_en": "AAA-level contrast (7:1) provides excellent readability for extreme low-vision users.",
      "fix_suggestion_nl": "Verhoog contrast tot 7:1 voor AAA-compliantie waar mogelijk.",
      "fix_suggestion_en": "Increase contrast to 7:1 for AAA compliance where possible.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-080",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Kunnen gebruikers het toetsenbord deaktiveringsgedrag overridden? (WCAG 2.1.3 AAA)",
      "question_en": "Can users override keyboard disabling behavior? (WCAG 2.1.3 AAA)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "AAA-level ondersteuning voor toetsenbord-override geeft geavanceerde AT-users meer controle.",
      "business_impact_en": "AAA-level support for keyboard override gives advanced AT users more control.",
      "fix_suggestion_nl": "Zorg dat toetsenbord niet kan worden uitgeschakeld, of sta override toe.",
      "fix_suggestion_en": "Ensure keyboard cannot be disabled, or allow user override.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-081",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "media",
      "question_nl": "Worden media-controls zelf toegankelijk gemaakt? (WCAG 1.3.1)",
      "question_en": "Are media controls themselves accessible? (WCAG 1.3.1)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Ontoegankelijke media-controls voorkomen dat gebruikers media kunnen beheren.",
      "business_impact_en": "Inaccessible media controls prevent users from managing media.",
      "fix_suggestion_nl": "Zorg dat play/pause/volume/fullscreen knoppen toetsenbord-bereikbaar zijn en duidelijke labels hebben.",
      "fix_suggestion_en": "Ensure play/pause/volume/fullscreen buttons are keyboard-reachable with clear labels.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-082",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "forms",
      "question_nl": "Hebben multi-stap formulieren duidelijke voortgangsindicatoren? (WCAG 3.3.1)",
      "question_en": "Do multi-step forms have clear progress indicators? (WCAG 3.3.1)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Voortgangsindicatoren helpen gebruikers hun voortgang in multi-stap formulieren te volgen.",
      "business_impact_en": "Progress indicators help users track their progress in multi-step forms.",
      "fix_suggestion_nl": "Voeg stap-indicatoren toe (bijv. '1 van 5') en duiden de huidige stap duidelijk aan.",
      "fix_suggestion_en": "Add step indicators (e.g., '1 of 5') and clearly mark the current step.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-083",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "semantics",
      "question_nl": "Worden externe links duidelijk gemarkeerd? (WCAG 3.2.4)",
      "question_en": "Are external links clearly marked? (WCAG 3.2.4)",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Duidelijke markering van externe links helpt gebruikers verwachtingen te managen.",
      "business_impact_en": "Clear marking of external links helps users manage expectations.",
      "fix_suggestion_nl": "Voeg pictogram of tekstindicatie toe aan externe links (bijv. '(opent in nieuw tabblad)').",
      "fix_suggestion_en": "Add icon or text indication to external links (e.g., '(opens in new tab)').",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-084",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "keyboard",
      "question_nl": "Is toetsenbord focus zichtbaar in alle browser-modus's? (WCAG 2.4.7)",
      "question_en": "Is keyboard focus visible in all browser modes? (WCAG 2.4.7)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Zichtbare focus in alle modes is essentieel voor toetsenbordnavigatie.",
      "business_impact_en": "Visible focus in all modes is essential for keyboard navigation.",
      "fix_suggestion_nl": "Test focus visibility in fullscreen, dark mode, high contrast mode.",
      "fix_suggestion_en": "Test focus visibility in fullscreen, dark mode, high contrast mode.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "a11y-085",
      "legacy_id": null,
      "module": "accessibility",
      "subcategory": "visual",
      "question_nl": "Is redactioneren van content ontoegankelijk gemaakt? (WCAG 1.4.11)",
      "question_en": "Is redacted content made inaccessible? (WCAG 1.4.11)",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Redacted content moet ook voor schermlezers geredact zijn.",
      "business_impact_en": "Redacted content must also be redacted for screen readers.",
      "fix_suggestion_nl": "Zorg dat geredacteerde content verborgen is via aria-hidden of display:none, niet alleen visueel geredact.",
      "fix_suggestion_en": "Ensure redacted content is hidden via aria-hidden or display:none, not just visually redacted.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "performance": [
    {
      "id": "perf-001",
      "legacy_id": "cvq6",
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Laadtijd: onder 3 seconden (liefst onder 2)?",
      "question_en": "Load time: below 3 seconds (preferably below 2)?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Snelle laadtijden verbeteren gebruikerservaring en verlaagd bounce rate. Elk extra seconde kan tot 7% conversieverlies betekenen.",
      "business_impact_en": "Fast load times improve user experience and reduce bounce rate. Each additional second can mean up to 7% conversion loss.",
      "fix_suggestion_nl": "Optimaliseer afbeeldingen, minify assets, gebruikersservers dichtbij plaatsen, caching implementeren.",
      "fix_suggestion_en": "Optimize images, minify assets, place servers near users, implement caching.",
      "auto_tool": "lighthouse",
      "auto_metric": "first-contentful-paint",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-002",
      "legacy_id": "cvq7",
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "LCP onder 2,5 seconden? CLS onder 0,1? INP onder 200ms?",
      "question_en": "LCP below 2.5 seconds? CLS below 0.1? INP below 200ms?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Core Web Vitals zijn Google-ranking factoren. Slechte scores veroorzaken hoger bounce rate en lagere conversies.",
      "business_impact_en": "Core Web Vitals are Google ranking factors. Poor scores cause higher bounce rates and lower conversions.",
      "fix_suggestion_nl": "Monitor met Google Search Console, optimaliseer LCP (afbeeldingen/fonts), verwijder layout shifts, verbeter interactivity.",
      "fix_suggestion_en": "Monitor with Google Search Console, optimize LCP (images/fonts), remove layout shifts, improve interactivity.",
      "auto_tool": "lighthouse",
      "auto_metric": "core-web-vitals",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-003",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Largest Contentful Paint (LCP) correct gemeten?",
      "question_en": "Is Largest Contentful Paint (LCP) correctly measured?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "LCP meet wanneer de grootste inhoud zichtbaar is. Beïnvloedt de waargenomen laadtijd direct.",
      "business_impact_en": "LCP measures when the largest content is visible. Directly affects perceived load time.",
      "fix_suggestion_nl": "Zorg dat grote afbeeldingen/video's snel laden, prioriteer kritieke content, optimaliseer server responstijd.",
      "fix_suggestion_en": "Ensure large images/videos load quickly, prioritize critical content, optimize server response time.",
      "auto_tool": "lighthouse",
      "auto_rule": "largest-contentful-paint",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-004",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Cumulative Layout Shift (CLS) onder 0,1?",
      "question_en": "Is Cumulative Layout Shift (CLS) below 0.1?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Layout shifts verminderen gebruikersvrede en kunnen leiden tot ongewenste clicks. CLS < 0,1 is optimaal.",
      "business_impact_en": "Layout shifts reduce user satisfaction and can cause accidental clicks. CLS < 0.1 is optimal.",
      "fix_suggestion_nl": "Zet afbeelding/advertentie afmetingen vast, vermijd fonts injectie boven fold, animaties voorkomen.",
      "fix_suggestion_en": "Set image/ad dimensions, avoid injecting fonts above fold, prevent animations.",
      "auto_tool": "lighthouse",
      "auto_rule": "cumulative-layout-shift",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-005",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Interaction to Next Paint (INP) onder 200ms?",
      "question_en": "Is Interaction to Next Paint (INP) below 200ms?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "INP meet interactieve responsiviteit. Slechte INP veroorzaakt gefrustreerde gebruikers en hogere bounce rate.",
      "business_impact_en": "INP measures interactive responsiveness. Poor INP causes frustrated users and higher bounce rates.",
      "fix_suggestion_nl": "Reduceer JavaScript execution, breek lange taken op, optimaliseer event listeners, async scripts gebruiken.",
      "fix_suggestion_en": "Reduce JavaScript execution, break up long tasks, optimize event listeners, use async scripts.",
      "auto_tool": "lighthouse",
      "auto_rule": "total-blocking-time",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-006",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "First Contentful Paint (FCP) onder 1,8 seconden?",
      "question_en": "Is First Contentful Paint (FCP) below 1.8 seconds?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "FCP is eerste visuele feedback. Snelle FCP verbetert waargenomen prestaties.",
      "business_impact_en": "FCP is first visual feedback. Fast FCP improves perceived performance.",
      "fix_suggestion_nl": "Elimineer render-blocking resources, minificeer CSS/JS, implementeer lazy loading.",
      "fix_suggestion_en": "Eliminate render-blocking resources, minify CSS/JS, implement lazy loading.",
      "auto_tool": "lighthouse",
      "auto_rule": "first-contentful-paint",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-007",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Time to First Byte (TTFB) onder 600ms?",
      "question_en": "Is Time to First Byte (TTFB) below 600ms?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "TTFB hangt af van server prestaties. Lage TTFB zorgt voor sneller FCP en LCP.",
      "business_impact_en": "TTFB depends on server performance. Low TTFB ensures faster FCP and LCP.",
      "fix_suggestion_nl": "Upgrade serverinfrastructuur, implementeer CDN, optimaliseer database queries, gebruik caching.",
      "fix_suggestion_en": "Upgrade server infrastructure, implement CDN, optimize database queries, use caching.",
      "auto_tool": "lighthouse",
      "auto_rule": "server-response-time",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-008",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Speed Index onder 3,4 seconden?",
      "question_en": "Is Speed Index below 3.4 seconds?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Speed Index meet hoe snel de pagina visueel compleet wordt. Beter Speed Index = betere UX.",
      "business_impact_en": "Speed Index measures how quickly the page becomes visually complete. Better Speed Index = better UX.",
      "fix_suggestion_nl": "Optimaliseer kritieke rendering pad, progressieve enhancement, lazy load images.",
      "fix_suggestion_en": "Optimize critical rendering path, progressive enhancement, lazy load images.",
      "auto_tool": "lighthouse",
      "auto_rule": "speed-index",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-009",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Field data vs lab data vergelijking beschikbaar?",
      "question_en": "Is field data vs lab data comparison available?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Real-world data (field) verschillen van lab data. Beide nodig voor volledig prestaties inzicht.",
      "business_impact_en": "Real-world data (field) differs from lab data. Both needed for complete performance insight.",
      "fix_suggestion_nl": "Implementeer CrUX, GA4 performance events, field monitoring tools.",
      "fix_suggestion_en": "Implement CrUX, GA4 performance events, field monitoring tools.",
      "auto_tool": "lighthouse",
      "auto_metric": "crux-data",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-010",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "core-web-vitals",
      "question_nl": "Skeleton screens of progressive loading geïmplementeerd?",
      "question_en": "Are skeleton screens or progressive loading implemented?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Skeleton screens verbeteren waargenomen laadtijd en UX. Gebruikers zien onmiddellijk feedback.",
      "business_impact_en": "Skeleton screens improve perceived load time and UX. Users see immediate feedback.",
      "fix_suggestion_nl": "Voeg placeholder UI toe, progressieve content loading, loading indicators.",
      "fix_suggestion_en": "Add placeholder UI, progressive content loading, loading indicators.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-011",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "Zijn render-blocking resources geminimaliseerd?",
      "question_en": "Are render-blocking resources minimized?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Render-blocking resources vertragen FCP. Elke seconde vertraging = potentieel conversieverlies.",
      "business_impact_en": "Render-blocking resources slow down FCP. Every second delay = potential conversion loss.",
      "fix_suggestion_nl": "Defer/async JavaScript, inline critical CSS, split code, inline small styles.",
      "fix_suggestion_en": "Defer/async JavaScript, inline critical CSS, split code, inline small styles.",
      "auto_tool": "lighthouse",
      "auto_rule": "render-blocking-resources",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-012",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "Wordt ongebruikte CSS gedetecteerd?",
      "question_en": "Is unused CSS detected?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Ongebruikte CSS verhoogt file grootte. Verwijderen verbetert laadtijd.",
      "business_impact_en": "Unused CSS increases file size. Removing it improves load time.",
      "fix_suggestion_nl": "Gebruik PurgeCSS, audit stylesheets, verwijder ongebruikte règles.",
      "fix_suggestion_en": "Use PurgeCSS, audit stylesheets, remove unused rules.",
      "auto_tool": "lighthouse",
      "auto_rule": "unused-css-rules",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-013",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "Wordt ongebruikt JavaScript gedetecteerd?",
      "question_en": "Is unused JavaScript detected?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Ongebruikt JS vergroot bundel grootte. Code splitting kan 30-50% besparen.",
      "business_impact_en": "Unused JS enlarges bundle size. Code splitting can save 30-50%.",
      "fix_suggestion_nl": "Code splitting, tree shaking, dynamic imports, webpack/rollup optimalisatie.",
      "fix_suggestion_en": "Code splitting, tree shaking, dynamic imports, webpack/rollup optimization.",
      "auto_tool": "lighthouse",
      "auto_rule": "unused-javascript",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-014",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "JavaScript execution tijd acceptabel?",
      "question_en": "Is JavaScript execution time acceptable?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "JS execution geblokkeerde main thread. Reduceert responsiviteit en veroorzaakt lag.",
      "business_impact_en": "JS execution blocks main thread. Reduces responsiveness and causes lag.",
      "fix_suggestion_nl": "Breek lange taken op, web workers, requestIdleCallback, async parsing.",
      "fix_suggestion_en": "Break up long tasks, web workers, requestIdleCallback, async parsing.",
      "auto_tool": "lighthouse",
      "auto_rule": "bootup-time",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-015",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "Main thread werk verdeling goed?",
      "question_en": "Is main thread work distribution good?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Ongebalanceerd main thread werk veroorzaakt jank en slechte interactivity.",
      "business_impact_en": "Unbalanced main thread work causes jank and poor interactivity.",
      "fix_suggestion_nl": "Profile met Chrome DevTools, optimaliseer hot paths, schedule tasks beter.",
      "fix_suggestion_en": "Profile with Chrome DevTools, optimize hot paths, schedule tasks better.",
      "auto_tool": "lighthouse",
      "auto_rule": "mainthread-work-breakdown",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-016",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "DOM grootte niet te groot?",
      "question_en": "Is DOM size not too large?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Groot DOM veroorzaakt rendering delays. Optimaal < 1500 nodes.",
      "business_impact_en": "Large DOM causes rendering delays. Optimal < 1500 nodes.",
      "fix_suggestion_nl": "Verwijder ongebruikte DOM, virtualiseren lange lijsten, code splitting.",
      "fix_suggestion_en": "Remove unused DOM, virtualize long lists, code splitting.",
      "auto_tool": "lighthouse",
      "auto_rule": "dom-size",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-017",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "Kritieke request chains geminimaliseerd?",
      "question_en": "Are critical request chains minimized?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Lange request chains vertragen kritieke content. Vermindering = sneller laden.",
      "business_impact_en": "Long request chains slow down critical content. Reduction = faster loading.",
      "fix_suggestion_nl": "Preload kritieke assets, DNS preconnect, resource hints, async requests.",
      "fix_suggestion_en": "Preload critical assets, DNS preconnect, resource hints, async requests.",
      "auto_tool": "lighthouse",
      "auto_rule": "critical-request-chains",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-018",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "loading",
      "question_nl": "Laadt above-fold content eerst?",
      "question_en": "Does above-fold content load first?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Above-fold content moet eerst laden. Determineert eerste indruk en bounce rate.",
      "business_impact_en": "Above-fold content must load first. Determines first impression and bounce rate.",
      "fix_suggestion_nl": "Prioriteer above-fold assets, lazy load below-fold, preload critical images.",
      "fix_suggestion_en": "Prioritize above-fold assets, lazy load below-fold, preload critical images.",
      "auto_tool": "lighthouse",
      "auto_metric": "above-fold-load",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-019",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Zijn afbeeldingen geoptimaliseerd?",
      "question_en": "Are images optimized?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Afbeeldingen zijn meestal grootste assets. Optimalisatie kan 50%+ grootte besparen.",
      "business_impact_en": "Images are usually the largest assets. Optimization can save 50%+ in size.",
      "fix_suggestion_nl": "Comprimeer JPEG/PNG, converteer naar WebP, verwijder exif data, resize.",
      "fix_suggestion_en": "Compress JPEG/PNG, convert to WebP, remove exif data, resize.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-optimized-images",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-020",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Gebruikt site moderne afbeeldingsformaten?",
      "question_en": "Does site use modern image formats?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "WebP/AVIF zijn 25-35% kleiner. Future-proof en performanter.",
      "business_impact_en": "WebP/AVIF are 25-35% smaller. Future-proof and more performant.",
      "fix_suggestion_nl": "Converteer naar WebP/AVIF, use picture element met fallback.",
      "fix_suggestion_en": "Convert to WebP/AVIF, use picture element with fallback.",
      "auto_tool": "lighthouse",
      "auto_rule": "modern-image-formats",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-021",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Zijn afbeeldingen responsive?",
      "question_en": "Are images responsive?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Responsive images passen zich aan schermgrootte. Verhoogt prestaties op mobiel.",
      "business_impact_en": "Responsive images adapt to screen size. Improves mobile performance.",
      "fix_suggestion_nl": "Gebruik srcset attribute, picture element, dynamic sizing.",
      "fix_suggestion_en": "Use srcset attribute, picture element, dynamic sizing.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-responsive-images",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-022",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Text content gecomprimeerd met gzip/brotli?",
      "question_en": "Is text content compressed with gzip/brotli?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Text compressie beperkt bandbreedte 60-85%. Essentieel voor prestaties.",
      "business_impact_en": "Text compression limits bandwidth 60-85%. Essential for performance.",
      "fix_suggestion_nl": "Enable gzip/brotli op server, brotli beter voor moderne browsers.",
      "fix_suggestion_en": "Enable gzip/brotli on server, brotli better for modern browsers.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-text-compression",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-023",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "CSS geminificeerd?",
      "question_en": "Is CSS minified?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Minified CSS beperkt grootte 30-50%. Quick win voor prestaties.",
      "business_impact_en": "Minified CSS reduces size 30-50%. Quick win for performance.",
      "fix_suggestion_nl": "Gebruik build tools (Webpack, Parcel), minify CSS in production.",
      "fix_suggestion_en": "Use build tools (Webpack, Parcel), minify CSS in production.",
      "auto_tool": "lighthouse",
      "auto_rule": "unminified-css",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-024",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "JavaScript geminificeerd?",
      "question_en": "Is JavaScript minified?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Minified JS beperkt grootte 20-40%. Helpt laadtijd en execution.",
      "business_impact_en": "Minified JS reduces size 20-40%. Helps load time and execution.",
      "fix_suggestion_nl": "Webpack, Terser, uglify-js, production builds configureren.",
      "fix_suggestion_en": "Webpack, Terser, uglify-js, configure production builds.",
      "auto_tool": "lighthouse",
      "auto_rule": "unminified-javascript",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-025",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Font display strategie geoptimaliseerd?",
      "question_en": "Is font display strategy optimized?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Font loading blokkeert rendering. font-display: swap verhoogt prestaties.",
      "business_impact_en": "Font loading blocks rendering. font-display: swap improves performance.",
      "fix_suggestion_nl": "Voeg font-display: swap toe, preload fonts, web font optimization.",
      "fix_suggestion_en": "Add font-display: swap, preload fonts, web font optimization.",
      "auto_tool": "lighthouse",
      "auto_rule": "font-display",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-026",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Preload kritieke requests?",
      "question_en": "Are critical requests preloaded?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Preload startet kritieke assets eerder. Kan 100-500ms tijd besparen.",
      "business_impact_en": "Preload starts critical assets earlier. Can save 100-500ms time.",
      "fix_suggestion_nl": "Voeg rel=preload toe voor kritieke assets, prioriteer juist.",
      "fix_suggestion_en": "Add rel=preload for critical assets, prioritize correctly.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-rel-preload",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-027",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Preconnect naar externe origins?",
      "question_en": "Are external origins preconnected?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Preconnect verkort verbindingstijd tot externe servers. Bespaard 100-300ms.",
      "business_impact_en": "Preconnect shortens connection time to external servers. Saves 100-300ms.",
      "fix_suggestion_nl": "Voeg rel=preconnect toe voor externe resources, DNS prefetch fallback.",
      "fix_suggestion_en": "Add rel=preconnect for external resources, DNS prefetch fallback.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-rel-preconnect",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-028",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "resources",
      "question_nl": "Zijn offscreen afbeeldingen lazy loaded?",
      "question_en": "Are offscreen images lazy loaded?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Lazy loading besparen initiale laadtijd voor images niet zichtbaar.",
      "business_impact_en": "Lazy loading saves initial load time for non-visible images.",
      "fix_suggestion_nl": "Voeg loading=lazy toe, intersection observer, library gebruiken.",
      "fix_suggestion_en": "Add loading=lazy, intersection observer, use library.",
      "auto_tool": "lighthouse",
      "auto_rule": "offscreen-images",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-029",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "caching",
      "question_nl": "Browser caching geconfigureerd?",
      "question_en": "Is browser caching configured?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Browser cache versnelt repeat bezoeken 2-10x. Essentieel voor UX.",
      "business_impact_en": "Browser cache accelerates repeat visits 2-10x. Essential for UX.",
      "fix_suggestion_nl": "Set Cache-Control headers met TTL, use long-term caching voor static assets.",
      "fix_suggestion_en": "Set Cache-Control headers with TTL, use long-term caching for static assets.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-long-cache-ttl",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-030",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "caching",
      "question_nl": "Verwendet site HTTP/2?",
      "question_en": "Does site use HTTP/2?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "HTTP/2 multiplexing verbetert snelheid. Nodig voor beste prestaties.",
      "business_impact_en": "HTTP/2 multiplexing improves speed. Needed for best performance.",
      "fix_suggestion_nl": "Upgrade server naar HTTP/2, check SSL cert voor h2 ondersteuning.",
      "fix_suggestion_en": "Upgrade server to HTTP/2, check SSL cert for h2 support.",
      "auto_tool": "lighthouse",
      "auto_rule": "uses-http2",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-031",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "caching",
      "question_nl": "CDN gebruikt voor asset delivery?",
      "question_en": "Is CDN used for asset delivery?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "CDN brength assets dichtbij gebruikers. Reducet latency significante.",
      "business_impact_en": "CDN brings assets close to users. Reduces latency significantly.",
      "fix_suggestion_nl": "Kies CDN (Cloudflare, Akamai, AWS), configureer cache headers.",
      "fix_suggestion_en": "Choose CDN (Cloudflare, Akamai, AWS), configure cache headers.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-032",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "caching",
      "question_nl": "Service worker geregistreerd?",
      "question_en": "Is service worker registered?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Service worker enable offline functionaliteit en caching strategie.",
      "business_impact_en": "Service worker enables offline functionality and caching strategy.",
      "fix_suggestion_nl": "Implementeer service worker, cache-first/network-first strategieën.",
      "fix_suggestion_en": "Implement service worker, cache-first/network-first strategies.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-033",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "caching",
      "question_nl": "Cache invalidatie strategie gedefinieerd?",
      "question_en": "Is cache invalidation strategy defined?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Goede cache invalidatie zorgt voor content updates zonder stale data.",
      "business_impact_en": "Good cache invalidation ensures content updates without stale data.",
      "fix_suggestion_nl": "Versioning, fingerprinting, build hashes, clear policy.",
      "fix_suggestion_en": "Versioning, fingerprinting, build hashes, clear policy.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-034",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "caching",
      "question_nl": "Static assets versioned?",
      "question_en": "Are static assets versioned?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Asset versioning voorkomen stale cache. Updates kunnen instant gedeliverd.",
      "business_impact_en": "Asset versioning prevents stale cache. Updates can be delivered instantly.",
      "fix_suggestion_nl": "Voeg hash/versie aan filenames, build process integratie.",
      "fix_suggestion_en": "Add hash/version to filenames, build process integration.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-035",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "third-party",
      "question_nl": "Derde-partij code impact gemeten?",
      "question_en": "Is third-party code impact measured?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Derde-partij scripts kunnen 30-50% prestaties afnemen. Monitoring essentieel.",
      "business_impact_en": "Third-party scripts can reduce performance 30-50%. Monitoring essential.",
      "fix_suggestion_nl": "Audit alle externe scripts, prioriteer noodzakelijk, defer non-critical.",
      "fix_suggestion_en": "Audit all external scripts, prioritize necessary, defer non-critical.",
      "auto_tool": "lighthouse",
      "auto_rule": "third-party-summary",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-036",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "third-party",
      "question_nl": "Derde-partij facades geïmplementeerd?",
      "question_en": "Are third-party facades implemented?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Facades vervangen zware third-party met lightweight placeholders.",
      "business_impact_en": "Facades replace heavy third-party with lightweight placeholders.",
      "fix_suggestion_nl": "Lazy load third-party (video, maps), op-demand, user interaction.",
      "fix_suggestion_en": "Lazy load third-party (video, maps), on-demand, user interaction.",
      "auto_tool": "lighthouse",
      "auto_rule": "third-party-facades",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-037",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "third-party",
      "question_nl": "Aantal derde-partij scripts minimaal?",
      "question_en": "Is number of third-party scripts minimal?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Elke extra script verhoogt laadtijd. Optimaal < 5-10 scripts.",
      "business_impact_en": "Each additional script increases load time. Optimal < 5-10 scripts.",
      "fix_suggestion_nl": "Verwijder ongebruikte scripts, consolidate providers, self-host kritiek.",
      "fix_suggestion_en": "Remove unused scripts, consolidate providers, self-host critical.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-038",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "third-party",
      "question_nl": "Derde-partij script blocking tijd geoptimaliseerd?",
      "question_en": "Is third-party script blocking time optimized?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Blocking scripts vertragen FCP/LCP. Defer/async essential.",
      "business_impact_en": "Blocking scripts slow FCP/LCP. Defer/async essential.",
      "fix_suggestion_nl": "Async/defer attributen, worker threads, defer non-critical loading.",
      "fix_suggestion_en": "Async/defer attributes, worker threads, defer non-critical loading.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-039",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "third-party",
      "question_nl": "Derde-partij audit regelmatig uitgevoerd?",
      "question_en": "Is third-party audit performed regularly?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Regelmatige audits detecteren ongebruikte/schadelijke scripts.",
      "business_impact_en": "Regular audits detect unused/harmful scripts.",
      "fix_suggestion_nl": "Quarterly audit, create removal policy, monitor impact metrics.",
      "fix_suggestion_en": "Quarterly audit, create removal policy, monitor impact metrics.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "perf-040",
      "legacy_id": null,
      "module": "performance",
      "subcategory": "third-party",
      "question_nl": "Tag manager geoptimaliseerd?",
      "question_en": "Is tag manager optimized?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Tag managers kunnen groot impact hebben. Optimization noodzakelijk.",
      "business_impact_en": "Tag managers can have large impact. Optimization necessary.",
      "fix_suggestion_nl": "Audit tags, async loading, consolidate vendors, periodic review.",
      "fix_suggestion_en": "Audit tags, async loading, consolidate vendors, periodic review.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "technical-seo": [
    {
      "id": "tseo-001",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Exists robots.txt en is deze toegankelijk?",
      "question_en": "Does robots.txt exist and is it accessible?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Een robots.txt-bestand bepaalt welke pagina's zoekmachines mogen crawlen. Zonder dit bestand kan er inefficiënte crawling plaatsvinden.",
      "business_impact_en": "A robots.txt file controls which pages search engines can crawl. Without it, inefficient crawling may occur.",
      "fix_suggestion_nl": "Zorg ervoor dat robots.txt aanwezig is in de root-directory en accessible is via /robots.txt. Controleer via een webbrowser dat het bestand correct wordt geserveerd.",
      "fix_suggestion_en": "Ensure robots.txt exists in the root directory and is accessible at /robots.txt. Verify through a browser that the file is served correctly.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "robots-txt-valid"
    },
    {
      "id": "tseo-002",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Blokkeert robots.txt geen belangrijke pagina's?",
      "question_en": "Does robots.txt not block important pages?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Als belangrijke pagina's in robots.txt zijn geblokkeerd, worden ze niet geïndexeerd door zoekmachines, wat het organische verkeer schaadt.",
      "business_impact_en": "Blocking important pages in robots.txt prevents them from being indexed by search engines, harming organic traffic.",
      "fix_suggestion_nl": "Review het robots.txt-bestand en verwijder Disallow-regels voor pagina's die in zoekmachines moeten verschijnen. Zorg ervoor dat alleen statische assets en admin-pagina's worden geblokkeerd.",
      "fix_suggestion_en": "Review your robots.txt file and remove Disallow rules for pages that should appear in search results. Ensure only static assets and admin pages are blocked.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "robots-txt-no-block"
    },
    {
      "id": "tseo-003",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Bestaat er een XML-sitemap?",
      "question_en": "Does an XML sitemap exist?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Een XML-sitemap helpt zoekmachines alle belangrijke pagina's van uw website te ontdekken, vooral voor grote sites met veel pagina's.",
      "business_impact_en": "An XML sitemap helps search engines discover all important pages on your site, especially for large sites with many pages.",
      "fix_suggestion_nl": "Maak een XML-sitemap aan (sitemap.xml) in de root-directory. Dit kan automatisch worden gegenereerd met CMS-plugins of SEO-tools.",
      "fix_suggestion_en": "Create an XML sitemap (sitemap.xml) in the root directory. This can be automatically generated using CMS plugins or SEO tools.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "sitemap-exists"
    },
    {
      "id": "tseo-004",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is de XML-sitemap valide?",
      "question_en": "Is the XML sitemap valid?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Een ongeldige XML-sitemap wordt genegeerd door zoekmachines, wat leidt tot gemiste indexeringskansen.",
      "business_impact_en": "An invalid XML sitemap is ignored by search engines, leading to missed indexing opportunities.",
      "fix_suggestion_nl": "Valideer de sitemap.xml met een XML-validator. Controleer of alle URLs correct zijn opgemaakt en geen speciale tekens bevatten die niet zijn gecodeerd.",
      "fix_suggestion_en": "Validate your sitemap.xml using an XML validator. Check that all URLs are properly formatted and don't contain unencoded special characters.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "sitemap-valid"
    },
    {
      "id": "tseo-005",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is de sitemap vermeld in robots.txt?",
      "question_en": "Is the sitemap referenced in robots.txt?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Het vermelden van de sitemap in robots.txt helpt zoekmachines deze sneller te vinden en indexeren.",
      "business_impact_en": "Referencing the sitemap in robots.txt helps search engines find and index it faster.",
      "fix_suggestion_nl": "Voeg de regel 'Sitemap: https://example.com/sitemap.xml' toe aan robots.txt.",
      "fix_suggestion_en": "Add the line 'Sitemap: https://example.com/sitemap.xml' to robots.txt.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "sitemap-in-robots"
    },
    {
      "id": "tseo-006",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Bevat de sitemap alle belangrijke pagina's?",
      "question_en": "Does the sitemap contain all important pages?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Pagina's die ontbreken in de sitemap kunnen langer duren om te indexeren of helemaal over het hoofd worden gezien.",
      "business_impact_en": "Pages missing from the sitemap may take longer to index or be overlooked entirely.",
      "fix_suggestion_nl": "Voeg alle pagina's toe die geïndexeerd moeten worden in de sitemap. Zorg ervoor dat de sitemap automatisch wordt gegenereerd bij nieuwe pagina's.",
      "fix_suggestion_en": "Add all pages that should be indexed to the sitemap. Ensure the sitemap is automatically generated for new pages.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "sitemap-coverage"
    },
    {
      "id": "tseo-007",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Zijn er geen 5xx-foutcodes?",
      "question_en": "Are there no 5xx server error codes?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "5xx-fouten duiden op serverproblemen. Dit veroorzaakt een slechte crawl-ervaring en kan pagina's niet indexeren.",
      "business_impact_en": "5xx errors indicate server problems. This causes poor crawlability and prevents pages from being indexed.",
      "fix_suggestion_nl": "Controleer de serverlogboeken om 5xx-fouten op te sporen en op te lossen. Dit kan betrekking hebben op database-connecties, geheugen of configuratieproblemen.",
      "fix_suggestion_en": "Check server logs to identify and fix 5xx errors. This may involve database connections, memory, or configuration issues.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-server-errors"
    },
    {
      "id": "tseo-008",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Rendered de pagina zonder JavaScript-fouten?",
      "question_en": "Does the page render without JavaScript errors?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "JavaScript-fouten kunnen voorkomen dat pagina's correct worden weergegeven in zoekmachines die JavaScript uitvoeren.",
      "business_impact_en": "JavaScript errors can prevent pages from rendering correctly in search engines that execute JavaScript.",
      "fix_suggestion_nl": "Controleer de browserconsole op JavaScript-fouten en fix deze. Zorg ervoor dat progressieve verbetering wordt gebruikt als fallback.",
      "fix_suggestion_en": "Check the browser console for JavaScript errors and fix them. Ensure progressive enhancement is used as a fallback.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-js-errors"
    },
    {
      "id": "tseo-009",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is de crawl-diepte binnen 3 klikken?",
      "question_en": "Is crawl depth within 3 clicks?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Pagina's dieper dan 3 klikken van de homepage hebben minder crawl-budget en worden minder frequent gecrawled.",
      "business_impact_en": "Pages deeper than 3 clicks from the homepage receive less crawl budget and are crawled less frequently.",
      "fix_suggestion_nl": "Optimaliseer de sitearchitectuur om belangrijke pagina's dichter bij de homepage te brengen. Voeg interne links van de homepage naar belangrijke secties toe.",
      "fix_suggestion_en": "Optimize site architecture to bring important pages closer to the homepage. Add internal links from the homepage to key sections.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "crawl-depth"
    },
    {
      "id": "tseo-010",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Zijn er geen wezen-pagina's (orphan pages)?",
      "question_en": "Are there no orphan pages?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Wezen-pagina's zijn niet linkbaar van andere pagina's en worden daarom niet goed gecrawld of geïndexeerd.",
      "business_impact_en": "Orphan pages aren't linked from other pages and therefore aren't well crawled or indexed.",
      "fix_suggestion_nl": "Maak interne links naar pagina's die niet linkbaar zijn van andere pagina's. Dit kan via navigationmenu's, voetteksten of strategische interne links.",
      "fix_suggestion_en": "Create internal links to pages that aren't referenced from other pages. This can be done via navigation menus, footers, or strategic internal links.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "orphan-pages"
    },
    {
      "id": "tseo-011",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is de serverresponse-tijd < 200ms?",
      "question_en": "Is server response time less than 200ms?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Trage serverreacties beperken het crawl-budget van zoekmachines. Google kan in dezelfde tijd minder pagina's crawlen.",
      "business_impact_en": "Slow server response times reduce search engine crawl budget. Google can crawl fewer pages in the same timeframe.",
      "fix_suggestion_nl": "Optimaliseer de serverconfiguratie, gebruik caching, CDN en optimaliseer databasequery's. Upgrade hosting indien nodig.",
      "fix_suggestion_en": "Optimize server configuration, use caching, CDN, and optimize database queries. Upgrade hosting if necessary.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "server-response"
    },
    {
      "id": "tseo-012",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Zijn er JavaScript-renderingproblemen?",
      "question_en": "Are there JavaScript rendering issues?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "JavaScript-renderingproblemen kunnen ervoor zorgen dat content niet zichtbaar is voor zoekmachines die JavaScript uitvoeren.",
      "business_impact_en": "JavaScript rendering issues can prevent content from being visible to search engines that execute JavaScript.",
      "fix_suggestion_nl": "Test pagina's in Google Search Console met Fetch as Google om rendering-problemen op te sporen. Zorg ervoor dat JavaScript-inhoud geen blokkering van andere resources veroorzaakt.",
      "fix_suggestion_en": "Test pages in Google Search Console with Fetch as Google to identify rendering issues. Ensure JavaScript content doesn't block other resources.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "rendering-issues"
    },
    {
      "id": "tseo-013",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is er een optimalisatie-strategie voor crawl-budget?",
      "question_en": "Is there a crawl budget optimization strategy?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Inefficiënte crawl-budget-gebruik kan ertoe leiden dat pagina's niet regelmatig worden gecrawld, waardoor indexeringsvertragingen ontstaan.",
      "business_impact_en": "Inefficient crawl budget usage can result in pages not being crawled regularly, causing indexing delays.",
      "fix_suggestion_nl": "Elimineer onnodig crawlable content (duplicaten, testpagina's). Zorg ervoor dat 301-omleidingen op elkaar volgen. Minimize redirect-chains.",
      "fix_suggestion_en": "Remove unnecessary crawlable content (duplicates, test pages). Ensure 301 redirects are chained efficiently. Minimize redirect chains.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "crawl-budget-efficiency"
    },
    {
      "id": "tseo-014",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Zijn logboek-analyses beschikbaar?",
      "question_en": "Is log file analysis available?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Logboekanalyses geven inzicht in hoe zoekmachines uw site crawlen en waar optimalisaties nodig zijn.",
      "business_impact_en": "Log file analysis provides insights into how search engines crawl your site and where optimizations are needed.",
      "fix_suggestion_nl": "Configureer serverlogboeken en analyseer ze met tools zoals Screaming Frog, SEMrush of Google Search Console. Controleer welke pagina's het meest worden gecrawld.",
      "fix_suggestion_en": "Configure server logs and analyze them with tools like Screaming Frog, SEMrush, or Google Search Console. Review which pages are crawled most frequently.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "log-analysis"
    },
    {
      "id": "tseo-015",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is de crawl-frequentie en vernieuwing optimaal?",
      "question_en": "Are crawl frequency and freshness optimal?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Lage crawl-frequentie betekent dat wijzigingen en nieuwe inhoud niet snel in zoekmachines verschijnen.",
      "business_impact_en": "Low crawl frequency means changes and new content appear in search engines slowly.",
      "fix_suggestion_nl": "Monitor in Google Search Console hoe vaak pagina's worden gecrawld. Zorg voor regelmatige updates van belangrijke pagina's om crawl-frequentie te stimuleren.",
      "fix_suggestion_en": "Monitor in Google Search Console how often pages are crawled. Ensure regular updates to important pages to encourage crawl frequency.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-016",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is API/Fetch-rendering goed ingesteld?",
      "question_en": "Is API/Fetch rendering properly configured?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slecht ingesteld fetch/API-rendering kan ertoe leiden dat dynamische content niet zichtbaar is voor zoekmachines.",
      "business_impact_en": "Poorly configured fetch/API rendering can result in dynamic content not being visible to search engines.",
      "fix_suggestion_nl": "Test of API-aanroepen correct worden voltooid bij rendering. Zorg ervoor dat CORs-headers correct zijn geconfigureerd en dat geen authentificatie-blokkering plaatsvindt.",
      "fix_suggestion_en": "Test that API calls complete correctly during rendering. Ensure CORS headers are properly configured and no authentication blocking occurs.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-017",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Is de website klaar voor mobile-first indexering?",
      "question_en": "Is the site ready for mobile-first indexing?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Google indexeert sites primair op basis van hun mobiele versie. Sites zonder goed mobiel design scoren lager in zoekresultaten.",
      "business_impact_en": "Google primarily indexes sites based on their mobile version. Sites without good mobile design rank lower in search results.",
      "fix_suggestion_nl": "Zorg ervoor dat alle inhoud op mobiel beschikbaar is, inclusief structuurgegevens en links. Test met Google Mobile Friendly Test.",
      "fix_suggestion_en": "Ensure all content is available on mobile, including structured data and links. Test with Google Mobile Friendly Test.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-018",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "crawlability",
      "question_nl": "Wordt paginering (rel=prev/next of lazy-loading) correct afgehandeld?",
      "question_en": "Is pagination handled correctly (rel=prev/next or lazy-loading)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Verkeerde paginering-instellingen kunnen ervoor zorgen dat gepagineerde inhoud niet goed wordt geïndexeerd of dat linkwaarde niet goed wordt verdeeld.",
      "business_impact_en": "Incorrect pagination settings can result in paginated content not being indexed properly or link value not being distributed well.",
      "fix_suggestion_nl": "Implementeer rel=prev en rel=next voor gepagineerde inhoud, of gebruik infinite scroll met JavaScript rendering. Zorg ervoor dat elke pagina unieke content en canonical tags heeft.",
      "fix_suggestion_en": "Implement rel=prev and rel=next for paginated content, or use infinite scroll with JavaScript rendering. Ensure each page has unique content and canonical tags.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-019",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn meta robots-tags correct?",
      "question_en": "Are meta robots tags correct?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Foutieve meta robots-tags kunnen voorkomen dat pagina's worden geïndexeerd of dat links niet worden gevolgd.",
      "business_impact_en": "Incorrect meta robots tags can prevent pages from being indexed or links from being followed.",
      "fix_suggestion_nl": "Zorg ervoor dat pagina's die geïndexeerd moeten worden geen 'noindex' hebben. Controleer dat 'follow' is ingesteld voor pagina's die interne links moeten volgen.",
      "fix_suggestion_en": "Ensure pages that should be indexed don't have 'noindex'. Verify 'follow' is set for pages that should follow internal links.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "meta-robots-valid"
    },
    {
      "id": "tseo-020",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn er geen per ongeluk geplaatste noindex-tags?",
      "question_en": "Are there no accidental noindex tags?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Accidentele noindex-tags kunnen ervoor zorgen dat pagina's onbedoeld uit zoekmachines worden verwijderd.",
      "business_impact_en": "Accidental noindex tags can cause pages to be unintentionally removed from search engines.",
      "fix_suggestion_nl": "Audit alle pagina's op noindex-tags. Verwijder noindex-tags van pagina's die geïndexeerd moeten worden. Gebruik Google Search Console om geïndexeerde pagina's te controleren.",
      "fix_suggestion_en": "Audit all pages for noindex tags. Remove noindex tags from pages that should be indexed. Use Google Search Console to verify indexed pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-accidental-noindex"
    },
    {
      "id": "tseo-021",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn canonical tags aanwezig?",
      "question_en": "Are canonical tags present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Ontbrekende canonical tags kunnen dubbele inhoud veroorzaken en linkwaarde verspreiden over meerdere versies van dezelfde pagina.",
      "business_impact_en": "Missing canonical tags can cause duplicate content and spread link value across multiple versions of the same page.",
      "fix_suggestion_nl": "Voeg canonical tags toe aan alle pagina's, vooral die met variaties (queryparameters, sessie-IDs). Maak het canonicale URL altijd zelf-referentieel.",
      "fix_suggestion_en": "Add canonical tags to all pages, especially those with variations (query parameters, session IDs). Make the canonical URL always self-referential.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "canonical-present"
    },
    {
      "id": "tseo-022",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn canonical tags zelf-referentieel?",
      "question_en": "Are canonical tags self-referencing?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Niet-zelf-referentiële canonical tags kunnen verwarring veroorzaken bij zoekmachines over welke pagina als kanaal moet fungeren.",
      "business_impact_en": "Non-self-referential canonical tags can confuse search engines about which page should be treated as the canonical version.",
      "fix_suggestion_nl": "Zorg ervoor dat elke pagina canonical naar zichzelf verwijst. Controleer op canonical tags die naar andere pagina's wijzen, tenzij dat opzettelijk is.",
      "fix_suggestion_en": "Ensure each page has a canonical tag pointing to itself. Check for canonical tags pointing to other pages unless intentional.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "canonical-self-ref"
    },
    {
      "id": "tseo-023",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn er geen conflicterende canonical tags?",
      "question_en": "Are there no conflicting canonical tags?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Conflicterende canonical tags kunnen ervoor zorgen dat zoekmachines niet weten welke versie ze moeten indexeren.",
      "business_impact_en": "Conflicting canonical tags can cause search engines to not know which version to index.",
      "fix_suggestion_nl": "Controleer alle pagina's op meerdere of conflicterende canonical tags. Zorg ervoor dat slechts één canonical tag per pagina aanwezig is.",
      "fix_suggestion_en": "Check all pages for multiple or conflicting canonical tags. Ensure only one canonical tag per page exists.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "canonical-no-conflict"
    },
    {
      "id": "tseo-024",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn X-Robots-Tag headers correct?",
      "question_en": "Are X-Robots-Tag headers correct?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "X-Robots-Tag headers kunnen per-pagina-crawl-instructies geven wanneer HTML-meta-tags niet voldoende zijn.",
      "business_impact_en": "X-Robots-Tag headers can provide per-page crawl instructions when HTML meta tags aren't sufficient.",
      "fix_suggestion_nl": "Configureer X-Robots-Tag headers op de server voor pagina's die speciale crawl-instructies nodig hebben. Zorg ervoor dat ze niet conflicteren met canonical tags.",
      "fix_suggestion_en": "Configure X-Robots-Tag headers on your server for pages needing special crawl instructions. Ensure they don't conflict with canonical tags.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "x-robots-tag"
    },
    {
      "id": "tseo-025",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Is er geen dubbele inhoud?",
      "question_en": "Is there no duplicate content?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Dubbele inhoud kan linkwaarde verspreiden en zoekmachines verwarren over welke versie ze moeten indexeren.",
      "business_impact_en": "Duplicate content can spread link value and confuse search engines about which version to index.",
      "fix_suggestion_nl": "Identificeer dubbele inhoud met SEO-tools. Gebruik 301-omleidingen, canonical tags of 'noindex' om dubbele inhoud te consolideren.",
      "fix_suggestion_en": "Identify duplicate content with SEO tools. Use 301 redirects, canonical tags, or 'noindex' to consolidate duplicate content.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-duplicate-content"
    },
    {
      "id": "tseo-026",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn er geen dubbele title tags?",
      "question_en": "Are there no duplicate title tags?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Dubbele title tags kunnen verwarring veroorzaken bij zoekmachines en de CTR in zoekresultaten negatief beïnvloeden.",
      "business_impact_en": "Duplicate title tags can confuse search engines and negatively impact CTR in search results.",
      "fix_suggestion_nl": "Zorg ervoor dat elke pagina een unieke title tag heeft. Voeg specifieke sleutelwoorden of paginanummers toe om duplicatie te voorkomen.",
      "fix_suggestion_en": "Ensure each page has a unique title tag. Add specific keywords or page numbers to avoid duplication.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-duplicate-titles"
    },
    {
      "id": "tseo-027",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Zijn er geen dubbele meta-beschrijvingen?",
      "question_en": "Are there no duplicate meta descriptions?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Dubbele meta-beschrijvingen kunnen de CTR in zoekresultaten verlagen omdat de snippets niet verleidelijk/uniek zijn.",
      "business_impact_en": "Duplicate meta descriptions can reduce CTR in search results because snippets aren't compelling or unique.",
      "fix_suggestion_nl": "Zorg ervoor dat elke pagina een unieke, aantrekkelijke meta-beschrijving heeft die het unieke waarde-voorstel van die pagina toont.",
      "fix_suggestion_en": "Ensure each page has a unique, compelling meta description that showcases that page's unique value proposition.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-duplicate-descriptions"
    },
    {
      "id": "tseo-028",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Is er een indexering-rapport beschikbaar?",
      "question_en": "Is index coverage report analysis available?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Index-coveragerapporten tonen welke pagina's geïndexeerd zijn en waarom bepaalde pagina's niet zijn geïndexeerd.",
      "business_impact_en": "Index coverage reports show which pages are indexed and why certain pages aren't indexed.",
      "fix_suggestion_nl": "Controleer Google Search Console's Index Coverage-rapport regelmatig. Onderzoek waarom pagina's niet zijn geïndexeerd en voer correcties door.",
      "fix_suggestion_en": "Regularly check Google Search Console's Index Coverage report. Investigate why pages aren't indexed and take corrective action.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "index-coverage"
    },
    {
      "id": "tseo-029",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Worden dunne content-pagina's gedetecteerd?",
      "question_en": "Are thin content pages detected?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Dunne content-pagina's (< 300 woorden) hebben weinig waarde voor zoekmachines en gebruikers, en verbruiken crawl-budget.",
      "business_impact_en": "Thin content pages (< 300 words) have little value for search engines and users, and waste crawl budget.",
      "fix_suggestion_nl": "Identificeer pagina's met weinig content en consolideer ze of voeg meer content toe. Verwijder pagina's die geen intrinsieke waarde hebben.",
      "fix_suggestion_en": "Identify pages with thin content and consolidate them or add more content. Delete pages that have no intrinsic value.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "thin-content"
    },
    {
      "id": "tseo-030",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Worden soft-404-fouten gedetecteerd?",
      "question_en": "Is soft 404 detection available?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Soft-404's zijn pagina's die als niet-gevonden worden weergegeven maar een 200-statuscode retourneren. Dit verspilt crawl-budget.",
      "business_impact_en": "Soft 404s are pages displayed as not found but return a 200 status code. This wastes crawl budget.",
      "fix_suggestion_nl": "Controleer op pagina's die weergegeven als foutmeldingen maar geen 404-statuscode hebben. Voer echte 404-statuscode door of verwijder de pagina.",
      "fix_suggestion_en": "Check for pages displayed as error pages but not returning 404 status code. Return proper 404 status or delete the page.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "soft-404"
    },
    {
      "id": "tseo-031",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Is er een content-pruning-strategie?",
      "question_en": "Is there a content pruning strategy?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Content-pruning verwijdert zwakke inhoud die crawl-budget verspilt en de site-autoriteit vermindert.",
      "business_impact_en": "Content pruning removes weak content that wastes crawl budget and diminishes site authority.",
      "fix_suggestion_nl": "Bepaal welke inhoud geen ROI oplevert. Voer 301-omleidingen uit naar sterkere inhoud of verwijder deze volledig.",
      "fix_suggestion_en": "Determine which content doesn't deliver ROI. Execute 301 redirects to stronger content or remove it entirely.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-032",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Worden archief-/datumgestuurde pagina's goed afgehandeld?",
      "question_en": "Are archive/date pages handled properly?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Archief- en datumpagina's kunnen dubbele inhoud veroorzaken als ze niet correct worden afgehandeld.",
      "business_impact_en": "Archive and date pages can cause duplicate content if not handled properly.",
      "fix_suggestion_nl": "Markeer archief-pagina's met canonical tags naar huidge versies of met 'noindex'. Controleer of datumgebaseerde structuren geen overweldigende duplicatie veroorzaken.",
      "fix_suggestion_en": "Mark archive pages with canonical tags to current versions or with 'noindex'. Check that date-based structures don't cause excessive duplication.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-033",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Wordt parameter-URL-beheer goed afgehandeld?",
      "question_en": "Is parameter URL management handled properly?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Parameter-URL's kunnen dubbele inhoud veroorzaken en crawl-budget verspillen.",
      "business_impact_en": "Parameter URLs can create duplicate content and waste crawl budget.",
      "fix_suggestion_nl": "Koppel alle parameter-variaties aan canonical tags. Gebruik Google Search Console om parameter-handling in te stellen. Markeer onnodig parameters als 'noindex'.",
      "fix_suggestion_en": "Map all parameter variations to canonical tags. Use Google Search Console to configure parameter handling. Mark unnecessary parameters as 'noindex'.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-034",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "indexing",
      "question_nl": "Wordt gefacetteerde navigatie correct afgehandeld?",
      "question_en": "Is faceted navigation handled properly?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slecht afgehandelde gefacetteerde navigatie kan massale dubbele inhoud veroorzaken.",
      "business_impact_en": "Poorly handled faceted navigation can create massive duplicate content.",
      "fix_suggestion_nl": "Implementeer crawl-parameter handling. Gebruik rel=canonical of 'noindex' voor gefacetteerde combinaties. Beperk crawlable facetten tot belangrijk combinaties.",
      "fix_suggestion_en": "Implement crawl parameter handling. Use rel=canonical or 'noindex' for faceted combinations. Limit crawlable facets to important combinations.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-035",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn URLs schoon en leesbaar?",
      "question_en": "Are URLs clean and readable?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Schone, leesbare URLs verbeteren gebruikerservaring en kunnen CTR in zoekresultaten verhogen.",
      "business_impact_en": "Clean, readable URLs improve user experience and can increase CTR in search results.",
      "fix_suggestion_nl": "Zorg dat URLs beschrijvende woorden bevatten in plaats van nummers of codes. Vermijd onduidelijke karakters. Maak URLs kort en relevant.",
      "fix_suggestion_en": "Ensure URLs contain descriptive words instead of numbers or codes. Avoid cryptic characters. Keep URLs short and relevant.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "clean-urls"
    },
    {
      "id": "tseo-036",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn er geen hoofdletters in URLs?",
      "question_en": "Are there no uppercase letters in URLs?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Hoofdletters in URLs kunnen dubbele inhoud veroorzaken omdat zoekmachines hoofdletters-gevoelig zijn.",
      "business_impact_en": "Uppercase letters in URLs can create duplicate content because search engines are case-sensitive.",
      "fix_suggestion_nl": "Zorg ervoor dat alle URLs uitsluitend kleine letters bevatten. Voer 301-omleidingen uit voor URLs met hoofdletters naar hun minuscule equivalenten.",
      "fix_suggestion_en": "Ensure all URLs contain only lowercase letters. Execute 301 redirects from uppercase URLs to their lowercase equivalents.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "lowercase-urls"
    },
    {
      "id": "tseo-037",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn er geen speciale tekens in URLs?",
      "question_en": "Are there no special characters in URLs?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Speciale tekens in URLs kunnen parsing-problemen veroorzaken en onverwachts gedrag.",
      "business_impact_en": "Special characters in URLs can cause parsing issues and unexpected behavior.",
      "fix_suggestion_nl": "Vermijd speciale tekens in URLs. Als nodig, codeer ze correct (b.v., %20 voor spaties). Gebruik alleen alfanumerieke tekens, koppeltekens en onderstrepen.",
      "fix_suggestion_en": "Avoid special characters in URLs. If necessary, encode them properly (e.g., %20 for spaces). Use only alphanumeric characters, hyphens, and underscores.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "url-characters"
    },
    {
      "id": "tseo-038",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Is de URL-lengte onder 100 tekens?",
      "question_en": "Is URL length under 100 characters?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Lange URLs kunnen problemen veroorzaken bij delen op sociale netwerken en kunnen in zoekresultaten afgekapt worden.",
      "business_impact_en": "Long URLs can cause issues when shared on social networks and may be truncated in search results.",
      "fix_suggestion_nl": "Beperk URL-lengte tot 100 tekens of minder. Gebruik korte, beschrijvende termen in plaats van lange zinnen.",
      "fix_suggestion_en": "Keep URL length to 100 characters or less. Use short, descriptive terms instead of long phrases.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "url-length"
    },
    {
      "id": "tseo-039",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Is het gebruik van trailing slashes consistent?",
      "question_en": "Is trailing slash usage consistent?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Inconsistent trailing slash-gebruik kan dubbele inhoud veroorzaken.",
      "business_impact_en": "Inconsistent trailing slash usage can create duplicate content.",
      "fix_suggestion_nl": "Bepaal of u trailing slashes gebruikt of niet (b.v., /page/ vs /page). Zorg voor consistentie op de hele site en voer 301-omleidingen uit voor variaties.",
      "fix_suggestion_en": "Decide whether to use trailing slashes or not (e.g., /page/ vs /page). Ensure consistency across the site and redirect variations with 301s.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "trailing-slash"
    },
    {
      "id": "tseo-040",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn er geen sessie-IDs in URLs?",
      "question_en": "Are there no session IDs in URLs?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Sessie-IDs in URLs kunnen dubbele inhoud veroorzaken en crawl-budget verspillen.",
      "business_impact_en": "Session IDs in URLs can create duplicate content and waste crawl budget.",
      "fix_suggestion_nl": "Verwijder sessie-IDs uit URLs. Gebruik cookies of server-side sessions voor sessie-tracking in plaats daarvan.",
      "fix_suggestion_en": "Remove session IDs from URLs. Use cookies or server-side sessions for session tracking instead.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-session-urls"
    },
    {
      "id": "tseo-041",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn alle URLs HTTPS-versies?",
      "question_en": "Is the HTTPS version used for all URLs?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "HTTPS is een rankingfactor en een veiligheidsvereiste. Websites zonder HTTPS scoren lager.",
      "business_impact_en": "HTTPS is a ranking factor and security requirement. Websites without HTTPS rank lower.",
      "fix_suggestion_nl": "Zorg voor een HTTPS-certificaat en stel een 301-omleiding in van HTTP naar HTTPS. Update alle interne links om HTTPS te gebruiken.",
      "fix_suggestion_en": "Get an HTTPS certificate and set up a 301 redirect from HTTP to HTTPS. Update all internal links to use HTTPS.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "urls-https"
    },
    {
      "id": "tseo-042",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn er geen redirect-ketens (maximum 1 redirect)?",
      "question_en": "Are there no redirect chains (max 1 redirect)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Redirect-ketens verslaan pagina-laadtijden en verspillen crawl-budget.",
      "business_impact_en": "Redirect chains slow page load times and waste crawl budget.",
      "fix_suggestion_nl": "Audit alle omleidingen en stel ze direct in naar de uiteindelijke bestemming. Vermijd tussentijdse omleidingen.",
      "fix_suggestion_en": "Audit all redirects and set them directly to the final destination. Avoid intermediate redirects.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "redirect-chains"
    },
    {
      "id": "tseo-043",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Zijn er geen redirect-lussen?",
      "question_en": "Are there no redirect loops?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Redirect-lussen voorkomen dat pagina's worden geopend en crawlen wordt volledig geblokkeerd.",
      "business_impact_en": "Redirect loops prevent pages from being accessed and completely block crawling.",
      "fix_suggestion_nl": "Identificeer en verwijder redirect-lussen. Test omleidingen om ervoor te zorgen dat ze naar unieke bestemmingen leiden.",
      "fix_suggestion_en": "Identify and remove redirect loops. Test redirects to ensure they lead to unique destinations.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "redirect-loops"
    },
    {
      "id": "tseo-044",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Worden 301-omleidingen gebruikt voor oude URLs?",
      "question_en": "Are 301 redirects used for old URLs?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "301-omleidingen behouden link-autoriteit wanneer pagina's verplaatst worden. Andere omleidingen verliezen SEO-waarde.",
      "business_impact_en": "301 redirects preserve link authority when pages are moved. Other redirects lose SEO value.",
      "fix_suggestion_nl": "Voer 301-omleidingen in voor alle verwijderde of verplaatste pagina's. Vermijd 302, 307 of andere omleidingstypen tenzij het een tijdelijke wijziging is.",
      "fix_suggestion_en": "Implement 301 redirects for all removed or moved pages. Avoid 302, 307, or other redirect types unless it's a temporary change.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "301-redirects"
    },
    {
      "id": "tseo-045",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Is de URL-sleutelwoord-relevantie aanwezig?",
      "question_en": "Is URL keyword relevance present?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Sleutelwoorden in URLs kunnen CTR in zoekresultaten verhogen en gebruikers helpen begrijpen waarover een pagina gaat.",
      "business_impact_en": "Keywords in URLs can increase CTR in search results and help users understand what a page is about.",
      "fix_suggestion_nl": "Voeg doelsleutelwoorden toe aan URLs waar logisch. Maak URLs leesbaar en beschrijvend.",
      "fix_suggestion_en": "Add target keywords to URLs where logical. Keep URLs readable and descriptive.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "url-keywords"
    },
    {
      "id": "tseo-046",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Stemt URL-hiërarchie overeen met sitearchitectuur?",
      "question_en": "Does URL hierarchy match site structure?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Aangepaste URL-structuur aan sitearchitectuur helpt gebruikers en zoekmachines pagina-relaties begrijpen.",
      "business_impact_en": "Aligned URL structure with site architecture helps users and search engines understand page relationships.",
      "fix_suggestion_nl": "Zorg dat URL-structuur logisch volgt op de informatie-architectuur van de site. Bijvoorbeeld, /categorieën/subcategorie/pagina/.",
      "fix_suggestion_en": "Ensure URL structure logically follows site information architecture. For example, /categories/subcategory/page/.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "url-hierarchy"
    },
    {
      "id": "tseo-047",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Is er een URL-migratie-plan voor redesigns?",
      "question_en": "Is there a URL migration plan for redesigns?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slecht geplande URL-migraties kunnen massale ranking-verlies veroorzaken en organisch verkeer schaden.",
      "business_impact_en": "Poorly planned URL migrations can cause massive ranking loss and harm organic traffic.",
      "fix_suggestion_nl": "Maak een gedetailleerde URL-migratie-plan voordat u redesigns implementeert. Map alle oude URLs naar nieuwe URLs met 301-omleidingen.",
      "fix_suggestion_en": "Create a detailed URL migration plan before implementing redesigns. Map all old URLs to new URLs with 301 redirects.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-048",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "url-structure",
      "question_nl": "Is dynamische rendering goed ingesteld?",
      "question_en": "Is dynamic rendering properly configured?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Dynamische rendering helpt JavaScript-zware sites om door zoekmachines gecrawld en geïndexeerd te worden.",
      "business_impact_en": "Dynamic rendering helps JavaScript-heavy sites get crawled and indexed by search engines.",
      "fix_suggestion_nl": "Implementeer dynamische rendering via middleware die JavaScript-bots detecteert en server-rendered HTML serveert.",
      "fix_suggestion_en": "Implement dynamic rendering via middleware that detects JavaScript bots and serves server-rendered HTML.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-049",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Zijn er geen verbroken interne koppelingen (404)?",
      "question_en": "Are there no broken internal links (404)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Verbroken koppelingen slechten gebruikerservaring en verspillen link-autoriteit.",
      "business_impact_en": "Broken links harm user experience and waste link authority.",
      "fix_suggestion_nl": "Audit alle interne koppelingen en herstellen of verwijder verbroken koppelingen. Gebruik Google Search Console voor 404-waarschuwingen.",
      "fix_suggestion_en": "Audit all internal links and repair or remove broken ones. Use Google Search Console for 404 alerts.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-broken-links"
    },
    {
      "id": "tseo-050",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Zijn er geen verbroken externe koppelingen?",
      "question_en": "Are there no broken external links?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Verbroken externe koppelingen schaden gebruikerservaring en kunnen duiden op slecht onderhoud.",
      "business_impact_en": "Broken external links harm user experience and suggest poor maintenance.",
      "fix_suggestion_nl": "Controleer externe koppelingen regelmatig. Vervang verbroken koppelingen of verwijder ze.",
      "fix_suggestion_en": "Check external links regularly. Replace or remove broken ones.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-broken-external"
    },
    {
      "id": "tseo-051",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Zijn er geen verbroken afbeeldingskoppelingen?",
      "question_en": "Are there no broken image links?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Verbroken afbeeldingskoppelingen verslechteren de pagina-ervaring en kunnen crawl-fouten veroorzaken.",
      "business_impact_en": "Broken image links degrade page experience and can cause crawl errors.",
      "fix_suggestion_nl": "Controleer alle afbeeldingskoppelingen. Zorg ervoor dat alle afbeeldingen correct worden geladen.",
      "fix_suggestion_en": "Check all image links. Ensure all images load correctly.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-broken-images"
    },
    {
      "id": "tseo-052",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Gebruiken interne koppelingen consistent absolute of relatieve paden?",
      "question_en": "Do internal links consistently use absolute or relative paths?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Inconsistente koppeling-paden kunnen problemen veroorzaken bij crawling en kunnen verbroken koppelingen creëren.",
      "business_impact_en": "Inconsistent link paths can cause crawling issues and may create broken links.",
      "fix_suggestion_nl": "Kies voor absolute of relatieve paden en zorg voor consistentie. Voorkeur: absolute paden (https://example.com/page).",
      "fix_suggestion_en": "Choose absolute or relative paths and ensure consistency. Preference: absolute paths (https://example.com/page).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "link-consistency"
    },
    {
      "id": "tseo-053",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Zijn er geen koppelingen naar omgeleide pagina's?",
      "question_en": "Are there no links to redirected pages?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Koppelingen naar omgeleide pagina's verspillen crawl-budget en vertragen page-load-tijden.",
      "business_impact_en": "Links to redirected pages waste crawl budget and slow down page load times.",
      "fix_suggestion_nl": "Update alle interne koppelingen om direct naar de uiteindelijke bestemming te verwijzen. Vermijd tussentijdse omleidingen.",
      "fix_suggestion_en": "Update all internal links to point directly to final destinations. Avoid intermediate redirects.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-redirect-links"
    },
    {
      "id": "tseo-054",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Is anker-tekst beschrijvend (niet 'klik hier')?",
      "question_en": "Is anchor text descriptive (not 'click here')?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Beschrijvende anker-tekst helpt zoekmachines begrijpen waarover gekoppelde pagina's gaan.",
      "business_impact_en": "Descriptive anchor text helps search engines understand what linked pages are about.",
      "fix_suggestion_nl": "Zorg voor beschrijvende anker-tekst die het onderwerp van de gekoppelde pagina weerspiegelt. Vermijd 'klik hier', 'meer info', etc.",
      "fix_suggestion_en": "Use descriptive anchor text that reflects the topic of the linked page. Avoid 'click here', 'more info', etc.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "descriptive-anchors"
    },
    {
      "id": "tseo-055",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Hebben externe koppelingen rel='noopener'?",
      "question_en": "Do external links have rel='noopener'?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "rel='noopener' voorkomt dat externe sites toegang krijgen tot window-object en verbetert beveiligheid en prestaties.",
      "business_impact_en": "rel='noopener' prevents external sites from accessing the window object and improves security and performance.",
      "fix_suggestion_nl": "Voeg rel='noopener' toe aan alle externe koppelingen, vooral die target='_blank' gebruiken.",
      "fix_suggestion_en": "Add rel='noopener' to all external links, especially those using target='_blank'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "noopener-links"
    },
    {
      "id": "tseo-056",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Zijn er geen overmatige koppelingen per pagina?",
      "question_en": "Are there no excessive links per page?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Te veel koppelingen per pagina kunnen pagina-waarde verspreiden en crawl-budget van zoekmachines belasten.",
      "business_impact_en": "Too many links per page can spread page value and strain search engine crawl budget.",
      "fix_suggestion_nl": "Beperk het aantal koppelingen per pagina. Richtlijn: 100 of minder totale koppelingen per pagina.",
      "fix_suggestion_en": "Limit the number of links per page. Guideline: 100 or fewer total links per page.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "link-count"
    },
    {
      "id": "tseo-057",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Wordt interne koppeling-diepte geanalyseerd?",
      "question_en": "Is internal linking depth analyzed?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Interne koppeling-diepte-analyse helpt linkwaarde naar belangrijke pagina's te optimaliseren.",
      "business_impact_en": "Internal linking depth analysis helps optimize link value to important pages.",
      "fix_suggestion_nl": "Analyseer welke pagina's veel interne koppelingen ontvangen. Zorg dat belangrijke pagina's van much interne linkage profiteren.",
      "fix_suggestion_en": "Analyze which pages receive many internal links. Ensure important pages benefit from extensive internal linking.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "internal-link-depth"
    },
    {
      "id": "tseo-058",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Wordt linkwaarde goed verdeeld?",
      "question_en": "Is link equity distributed well?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Juiste linkwaarde-verdeling helpt belangrijke pagina's hoger te ranking in zoekmachines.",
      "business_impact_en": "Proper link equity distribution helps important pages rank higher in search engines.",
      "fix_suggestion_nl": "Voeg meer interne koppelingen toe naar pagina's die u hoger wilt laten ranking. Gebruik beschrijvende anker-tekst met sleutelwoorden.",
      "fix_suggestion_en": "Add more internal links to pages you want to rank higher. Use descriptive anchor text with keywords.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "link-equity"
    },
    {
      "id": "tseo-059",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Wordt wezen-pagina detectie geanalyseerd?",
      "question_en": "Is orphan page detection analyzed?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Wezen-pagina's worden niet goed gecrawld of geïndexeerd omdat ze niet linkbaar zijn van andere pagina's.",
      "business_impact_en": "Orphan pages aren't crawled or indexed well because they aren't linked from other pages.",
      "fix_suggestion_nl": "Identificeer wezen-pagina's en maak interne koppelingen ernaar. Zorg dat alle pagina's accessible zijn van de navigatie.",
      "fix_suggestion_en": "Identify orphan pages and create internal links to them. Ensure all pages are accessible from navigation.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "orphan-pages-analysis"
    },
    {
      "id": "tseo-060",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Is de diversiteit van anker-tekst aanwezig?",
      "question_en": "Is link anchor text diversity present?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Diverse anker-tekst maakt koppelingen natuurlijker en voorkomt overoptimalisatie-sancties.",
      "business_impact_en": "Diverse anchor text makes links look natural and prevents over-optimization penalties.",
      "fix_suggestion_nl": "Zorg voor variatie in anker-tekst voor dezelfde pagina. Mix exact-match, branded, generic en contextual anker-tekst.",
      "fix_suggestion_en": "Vary anchor text for the same page. Mix exact-match, branded, generic, and contextual anchor text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "anchor-text-diversity"
    },
    {
      "id": "tseo-061",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Is er een strategisch interne linking-plan?",
      "question_en": "Is there a strategic internal linking plan?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Strategische interne linking-planning helpt pagina's om hoger te ranking en gebruikers beter te navigeren.",
      "business_impact_en": "Strategic internal linking planning helps pages rank higher and users navigate better.",
      "fix_suggestion_nl": "Maak een plan dat bepaalt welke pagina's interne koppelingen moeten ontvangen en met welke anker-tekst.",
      "fix_suggestion_en": "Create a plan that determines which pages should receive internal links and with what anchor text.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-062",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Is er linking tussen pillar en cluster content?",
      "question_en": "Is there pillar/cluster content linking?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Pillar/cluster-linking-structuren helpen topical authority op te bouwen en ranking te verbeteren.",
      "business_impact_en": "Pillar/cluster linking structures help build topical authority and improve rankings.",
      "fix_suggestion_nl": "Maak pillar-pagina's voor grote onderwerpen. Link cluster-inhoud (onderliggende onderwerpen) naar pillar-pagina's.",
      "fix_suggestion_en": "Create pillar pages for major topics. Link cluster content (subtopics) to pillar pages.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-063",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Is voettekst-linking geoptimaliseerd?",
      "question_en": "Is footer link optimization present?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Voetekst-koppelingen kunnen naar belangrijke pagina's verwijzen om linkwaarde te verbeteren.",
      "business_impact_en": "Footer links can point to important pages to improve link value.",
      "fix_suggestion_nl": "Zorg ervoor dat voettekst-koppelingen naar belangrijke pagina's verwijzen, niet naar niet-waardevolle pagina's.",
      "fix_suggestion_en": "Ensure footer links point to important pages, not to low-value pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-064",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Is breadcrumb-implementatie aanwezig?",
      "question_en": "Is breadcrumb implementation present?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Breadcrumbs verbeteren gebruikerservaring en helpen zoekmachines sitearchitectuur begrijpen.",
      "business_impact_en": "Breadcrumbs improve user experience and help search engines understand site architecture.",
      "fix_suggestion_nl": "Implementeer breadcrumb-navigatie met schema-markup voor betere gebruikerservaring en indexering.",
      "fix_suggestion_en": "Implement breadcrumb navigation with schema markup for better user experience and indexing.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-065",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Zijn gerelateerde content-suggesties aanwezig?",
      "question_en": "Are related content suggestions present?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Gerelateerde inhoud-suggesties houden bezoekers langer op de site en verbeteren interne link-equity.",
      "business_impact_en": "Related content suggestions keep visitors on site longer and improve internal link equity.",
      "fix_suggestion_nl": "Voeg 'gerelateerde posts' of 'suggesties' toe aan pagina's. Zorg dat deze relevant zijn.",
      "fix_suggestion_en": "Add 'related posts' or 'suggestions' sections to pages. Ensure these are relevant.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-066",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "links",
      "question_nl": "Wordt cross-linking tussen secties afgehandeld?",
      "question_en": "Is cross-linking between sections handled?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Cross-linking tussen secties helpt linkwaarde te verspreiden en gebruikers naar relevant content te leiden.",
      "business_impact_en": "Cross-linking between sections helps spread link value and guide users to relevant content.",
      "fix_suggestion_nl": "Link pagina's van verschillende secties naar elkaar wanneer relevant. Zorg voor natuurlijke linking.",
      "fix_suggestion_en": "Link pages from different sections to each other when relevant. Ensure natural linking patterns.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-067",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is JSON-LD aanwezig?",
      "question_en": "Is JSON-LD present?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "JSON-LD is de aanbevolen indeling voor structuurgegevens en helpt zoekmachines content beter begrijpen.",
      "business_impact_en": "JSON-LD is the recommended format for structured data and helps search engines understand content better.",
      "fix_suggestion_nl": "Implementeer JSON-LD voor alle relevant content-typen (Organization, Breadcrumb, Article, etc.).",
      "fix_suggestion_en": "Implement JSON-LD for all relevant content types (Organization, Breadcrumb, Article, etc.).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "json-ld-present"
    },
    {
      "id": "tseo-068",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is JSON-LD syntactisch valide?",
      "question_en": "Is JSON-LD valid syntax?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Ongeldige JSON-LD wordt genegeerd door zoekmachines, waardoor structuurgegevens niet worden gelezen.",
      "business_impact_en": "Invalid JSON-LD is ignored by search engines, so structured data goes unread.",
      "fix_suggestion_nl": "Valideer alle JSON-LD met Google's Structured Data Testing Tool. Fix alle syntaxisfouten.",
      "fix_suggestion_en": "Validate all JSON-LD with Google's Structured Data Testing Tool. Fix all syntax errors.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "schema-validator",
      "auto_rule": "json-ld-valid"
    },
    {
      "id": "tseo-069",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is Organization-schema aanwezig?",
      "question_en": "Is Organization schema present?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Organization-schema helpt zoekmachines uw bedrijfsgegevens begrijpen (naam, logo, contactgegevens, etc.).",
      "business_impact_en": "Organization schema helps search engines understand your business data (name, logo, contact info, etc.).",
      "fix_suggestion_nl": "Voeg Organization-schema toe aan de homepage met bedrijfsnaam, logo, contactgegevens en sociale media-links.",
      "fix_suggestion_en": "Add Organization schema to homepage with company name, logo, contact info, and social media links.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "schema-validator",
      "auto_rule": "org-schema"
    },
    {
      "id": "tseo-070",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is Breadcrumb-schema aanwezig?",
      "question_en": "Is Breadcrumb schema present?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Breadcrumb-schema verbetert sitearchitectuur-begrijpen en kan breadcrumbs in zoekresultaten tonen.",
      "business_impact_en": "Breadcrumb schema improves site architecture understanding and can show breadcrumbs in search results.",
      "fix_suggestion_nl": "Voeg BreadcrumbList-schema toe aan alle pagina's die breadcrumbs hebben.",
      "fix_suggestion_en": "Add BreadcrumbList schema to all pages with breadcrumbs.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "schema-validator",
      "auto_rule": "breadcrumb-schema"
    },
    {
      "id": "tseo-071",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is de content in aanmerking voor rich results?",
      "question_en": "Is content eligible for rich results?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Rich results kan CTR in zoekresultaten verhogen en betere zichtbaarheid geven.",
      "business_impact_en": "Rich results can increase CTR in search results and provide better visibility.",
      "fix_suggestion_nl": "Controleer of uw content in aanmerking komt voor rich results (sterren-ratings, beeldresultaten, FAQs, etc.) met Google's Rich Results Tool.",
      "fix_suggestion_en": "Check if your content qualifies for rich results (star ratings, image results, FAQs, etc.) with Google's Rich Results Tool.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "google-rich-results",
      "auto_rule": "rich-results"
    },
    {
      "id": "tseo-072",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Wordt schema-coverage over pagina's geanalyseerd?",
      "question_en": "Is schema coverage across pages analyzed?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Volledige schema-coverage zorgt ervoor dat alle pagina's volledig begrepen worden door zoekmachines.",
      "business_impact_en": "Complete schema coverage ensures all pages are fully understood by search engines.",
      "fix_suggestion_nl": "Analyseer welke pagina's schema missen. Zorg dat alle wichtige content-typen hebben schema-markup.",
      "fix_suggestion_en": "Analyze which pages lack schema. Ensure all important content types have schema markup.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "schema-coverage"
    },
    {
      "id": "tseo-073",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is Product-schema voor e-commerce aanwezig (indien van toepassing)?",
      "question_en": "Is Product schema present for e-commerce (if applicable)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Product-schema helpt zoekmachines product-informatie begrijpen en kan rich results tonen.",
      "business_impact_en": "Product schema helps search engines understand product information and can show rich results.",
      "fix_suggestion_nl": "Voeg Product-schema toe aan alle productpagina's met naam, beschrijving, prijs, afbeeldingen en reviews.",
      "fix_suggestion_en": "Add Product schema to all product pages with name, description, price, images, and reviews.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "product-schema"
    },
    {
      "id": "tseo-074",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is Article-schema voor blogposts aanwezig (indien van toepassing)?",
      "question_en": "Is Article schema present for blog posts (if applicable)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Article-schema helpt zoekmachines blogposts begrijpen en kan featured snippets verbeteren.",
      "business_impact_en": "Article schema helps search engines understand blog posts and can improve featured snippets.",
      "fix_suggestion_nl": "Voeg NewsArticle of BlogPosting-schema toe aan alle blogposts met titel, publicatiedatum, auteur en inhoud.",
      "fix_suggestion_en": "Add NewsArticle or BlogPosting schema to all blog posts with title, publish date, author, and content.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "article-schema"
    },
    {
      "id": "tseo-075",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is FAQ-schema op FAQ-pagina's aanwezig?",
      "question_en": "Is FAQ schema present on FAQ pages?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "FAQ-schema kan FAQs in Google Search weergeven als rich snippets.",
      "business_impact_en": "FAQ schema can display FAQs as rich snippets in Google Search.",
      "fix_suggestion_nl": "Voeg FAQPage-schema toe aan FAQ-pagina's met vraag- en antwoordparen.",
      "fix_suggestion_en": "Add FAQPage schema to FAQ pages with question and answer pairs.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "faq-schema"
    },
    {
      "id": "tseo-076",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is LocalBusiness-schema (indien van toepassing)?",
      "question_en": "Is LocalBusiness schema present (if applicable)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "LocalBusiness-schema helpt Google lokale bedrijven begrijpen en kan in Google Maps verschijnen.",
      "business_impact_en": "LocalBusiness schema helps Google understand local businesses and can appear in Google Maps.",
      "fix_suggestion_nl": "Voeg LocalBusiness-schema toe voor bedrijfslocaties met adres, telefoonnummer en openingstijden.",
      "fix_suggestion_en": "Add LocalBusiness schema for business locations with address, phone, and hours.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "localbusiness-schema"
    },
    {
      "id": "tseo-077",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is Review/Rating-schema aanwezig?",
      "question_en": "Is Review/Rating schema present?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Review/Rating-schema kan ster-beoordelingen tonen in zoekresultaten.",
      "business_impact_en": "Review/Rating schema can show star ratings in search results.",
      "fix_suggestion_nl": "Voeg AggregateRating en Review-schema toe aan product/service-pagina's met beoordelingen.",
      "fix_suggestion_en": "Add AggregateRating and Review schema to product/service pages with ratings.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "review-schema"
    },
    {
      "id": "tseo-078",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Stemt schema overeen met zichtbare content?",
      "question_en": "Does schema match visible content?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Schema dat niet overeen stemt met zichtbare content kan tot handmatige acties door Google leiden.",
      "business_impact_en": "Schema that doesn't match visible content can result in manual actions by Google.",
      "fix_suggestion_nl": "Zorg dat alle schema-gegevens (prijs, beoordeling, datum, etc.) overeenkomen met wat op de pagina zichtbaar is.",
      "fix_suggestion_en": "Ensure all schema data (price, rating, date, etc.) matches what's visible on the page.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-079",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is er custom schema voor specifieke content-typen?",
      "question_en": "Is there custom schema for specific content types?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Custom schema kan Google helpen specifieke, unieke content-typen beter te begrijpen.",
      "business_impact_en": "Custom schema can help Google better understand specific, unique content types.",
      "fix_suggestion_nl": "Maak custom schema-extensies voor content-typen die niet in standard schema-typen passen.",
      "fix_suggestion_en": "Create custom schema extensions for content types that don't fit standard schema types.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-080",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Blijft schema up-to-date met Google-wijzigingen?",
      "question_en": "Does schema stay up-to-date with Google changes?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Google voegt regelmatig nieuwe schema-typen en vereisten toe. Verouderde schema kan minder effectief worden.",
      "business_impact_en": "Google regularly adds new schema types and requirements. Outdated schema may become less effective.",
      "fix_suggestion_nl": "Monitor Google Search Central-aankondigingen voor schema-wijzigingen. Update schema regelmatig.",
      "fix_suggestion_en": "Monitor Google Search Central announcements for schema changes. Update schema regularly.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-081",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "structured-data",
      "question_nl": "Is Event-schema (indien van toepassing)?",
      "question_en": "Is Event schema present (if applicable)?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Event-schema helpt Google events begrijpen en kan events in zoekresultaten tonen.",
      "business_impact_en": "Event schema helps Google understand events and can show events in search results.",
      "fix_suggestion_nl": "Voeg Event-schema toe aan eventpagina's met naam, datum, lokatie en beschrijving.",
      "fix_suggestion_en": "Add Event schema to event pages with name, date, location, and description.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "event-schema"
    },
    {
      "id": "tseo-082",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Zijn hreflang-tags aanwezig?",
      "question_en": "Are hreflang tags present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "hreflang-tags vertellen zoekmachines welke taalversies van een pagina beschikbaar zijn.",
      "business_impact_en": "hreflang tags tell search engines which language versions of a page are available.",
      "fix_suggestion_nl": "Voeg hreflang-tags toe aan alle alternatieve taalversies. Zorg voor x-default-versie voor gebruikers zonder match.",
      "fix_suggestion_en": "Add hreflang tags to all alternative language versions. Include x-default version for non-matching users.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "hreflang-present"
    },
    {
      "id": "tseo-083",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Zijn hreflang-terugkoppelingen valide?",
      "question_en": "Are hreflang return links valid?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Hreflang-terugkoppelingen moeten wederzijds zijn. Ongeldige terugkoppelingen kunnen internationale indexering verstoren.",
      "business_impact_en": "hreflang return links must be reciprocal. Invalid returns can disrupt international indexing.",
      "fix_suggestion_nl": "Controleer dat elke hreflang-tag een corresponderende terugkoppeling heeft. Voer audit uit met SEO-tools.",
      "fix_suggestion_en": "Verify each hreflang tag has a corresponding return link. Run audit with SEO tools.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "hreflang-return"
    },
    {
      "id": "tseo-084",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Zijn hreflang-taalcodes valide?",
      "question_en": "Are hreflang language codes valid?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Ongeldige taalcodes in hreflang-tags worden genegeerd door zoekmachines.",
      "business_impact_en": "Invalid language codes in hreflang tags are ignored by search engines.",
      "fix_suggestion_nl": "Zorg dat alle taalcodes ISO 639-1-standaard volgen (b.v., en, nl, es, etc.).",
      "fix_suggestion_en": "Ensure all language codes follow ISO 639-1 standard (e.g., en, nl, es, etc.).",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "hreflang-codes"
    },
    {
      "id": "tseo-085",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is x-default hreflang-versie aanwezig?",
      "question_en": "Is hreflang x-default version present?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "x-default hreflang helpt zoekmachines standaard-versies te bepalen voor gebruikers zonder match.",
      "business_impact_en": "x-default hreflang helps search engines determine default versions for non-matching users.",
      "fix_suggestion_nl": "Voeg hreflang='x-default' toe voor pagina's met taalvariaties. Dit wijst naar de standaard/fallback-versie.",
      "fix_suggestion_en": "Add hreflang='x-default' to pages with language variations. This points to the default/fallback version.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "hreflang-xdefault"
    },
    {
      "id": "tseo-086",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Zijn er geen conflicten tussen hreflang en canonical?",
      "question_en": "Are there no conflicts between hreflang and canonical?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Conflicten tussen hreflang en canonical kunnen verwarring veroorzaken bij zoekmachines.",
      "business_impact_en": "Conflicts between hreflang and canonical can confuse search engines.",
      "fix_suggestion_nl": "Zorg dat canonical-tags niet conflicteren met hreflang-tags. hreflang moet naar zichzelf verwijzen of naar taalvariaties.",
      "fix_suggestion_en": "Ensure canonical tags don't conflict with hreflang tags. hreflang should point to self or language variations.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "hreflang-canonical"
    },
    {
      "id": "tseo-087",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is er een taalspecifieke sitemap?",
      "question_en": "Is there a language-specific sitemap?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Taalspecifieke sitemaps helpen zoekmachines alle taalversies te ontdekken.",
      "business_impact_en": "Language-specific sitemaps help search engines discover all language versions.",
      "fix_suggestion_nl": "Maak sitemaps per taalversie (sitemap-en.xml, sitemap-nl.xml, etc.). Verwijs ernaar in robots.txt.",
      "fix_suggestion_en": "Create sitemaps per language version (sitemap-en.xml, sitemap-nl.xml, etc.). Reference them in robots.txt.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "lang-sitemap"
    },
    {
      "id": "tseo-088",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Wordt inhoudsvertalings-volledigheid geanalyseerd?",
      "question_en": "Is content translation completeness analyzed?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Onvolledige vertalingen kunnen verwarring veroorzaken en gebruikerservaring verslechteren.",
      "business_impact_en": "Incomplete translations can confuse users and degrade user experience.",
      "fix_suggestion_nl": "Controleer dat alle pagina's in alle talen volledig zijn vertaald. Geen fallback naar andere talen.",
      "fix_suggestion_en": "Verify all pages are fully translated in all languages. Avoid falling back to other languages.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "translation-completeness"
    },
    {
      "id": "tseo-089",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is regionale URL-structuur juist (subdomein vs subfolder vs ccTLD)?",
      "question_en": "Is regional URL structure correct (subdomain vs subfolder vs ccTLD)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Juiste regionale URL-structuur helpt geo-targeting en internationale ranking.",
      "business_impact_en": "Proper regional URL structure helps geo-targeting and international ranking.",
      "fix_suggestion_nl": "Kies één strategie: subdomein (en.example.com), subfolder (example.com/en) of ccTLD (example.co.uk). Zorg voor consistentie.",
      "fix_suggestion_en": "Choose one strategy: subdomain (en.example.com), subfolder (example.com/en), or ccTLD (example.co.uk). Keep it consistent.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "regional-url-structure"
    },
    {
      "id": "tseo-090",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is geo-targeting ingesteld in Search Console?",
      "question_en": "Is geo-targeting set up in Search Console?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Geo-targeting in Search Console helpt Google te begrijpen welke regio's uw pagina's bestemd zijn.",
      "business_impact_en": "Geo-targeting in Search Console helps Google understand which regions your pages target.",
      "fix_suggestion_nl": "Configureer geo-targeting in Google Search Console voor subfolder/subdomain-structuren.",
      "fix_suggestion_en": "Configure geo-targeting in Google Search Console for subfolder/subdomain structures.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-091",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is lokale sleutelwoord-optimalisatie aanwezig?",
      "question_en": "Is local keyword optimization present?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Lokale sleutelwoorden helpen lokaal zoeken en ranking in specifieke regio's.",
      "business_impact_en": "Local keywords help with local search and ranking in specific regions.",
      "fix_suggestion_nl": "Zorg dat content lokale sleutelwoorden bevat (stedesnamen, regionale termen, etc.).",
      "fix_suggestion_en": "Ensure content includes local keywords (city names, regional terms, etc.).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-092",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Wordt culturele inhoud-aanpassingsstrategie gehandhaafd?",
      "question_en": "Is cultural content adaptation maintained?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Cultureel aangepaste inhoud verbetert relevantie en gebruikerservaring in verschillende markten.",
      "business_impact_en": "Culturally adapted content improves relevance and user experience in different markets.",
      "fix_suggestion_nl": "Zorg dat inhoud cultureel aangemomen is (niet alleen vertaald). Controleer symbolen, datumformaten, etc.",
      "fix_suggestion_en": "Ensure content is culturally adapted (not just translated). Check symbols, date formats, etc.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-093",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is lokale linkbuilding-strategie aanwezig?",
      "question_en": "Is local link building strategy present?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Lokale backlinks verbeteren ranking in specifieke regio's.",
      "business_impact_en": "Local backlinks improve ranking in specific regions.",
      "fix_suggestion_nl": "Focus op het verkrijgen van links van lokale websites, gidsen, mappen, etc.",
      "fix_suggestion_en": "Focus on acquiring links from local websites, directories, maps, etc.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-094",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Worden lokale munteringen/prijzen weergegeven?",
      "question_en": "Is local currency/pricing displayed?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Lokale muntweergave verbetert gebruikerservaring en vertrouwen.",
      "business_impact_en": "Local currency display improves user experience and trust.",
      "fix_suggestion_nl": "Zorg dat prijzen in lokale munt worden weergegeven op regionale sites.",
      "fix_suggestion_en": "Ensure prices are displayed in local currency on regional sites.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "tseo-095",
      "legacy_id": null,
      "module": "technical-seo",
      "subcategory": "international",
      "question_nl": "Is er lokale contactinformatie per regio?",
      "question_en": "Is local contact information per region present?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Lokale contactgegevens verbeteren vertrouwen en gebruikerservaring.",
      "business_impact_en": "Local contact information improves trust and user experience.",
      "fix_suggestion_nl": "Zorg dat lokale contactgegevens (telefoonnummer, adres, e-mail) op regionale sites beschikbaar zijn.",
      "fix_suggestion_en": "Provide local contact info (phone, address, email) on regional sites.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    }
  ],
  "on-page-seo": [
    {
      "id": "opseo-001",
      "legacy_id": "seq1",
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Heeft elke pagina een unieke, beschrijvende title tag?",
      "question_en": "Does every page have a unique, descriptive title tag?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Title tags zijn het eerste dat gebruikers in zoekresultaten zien. Unieke, beschrijvende titles verbeteren CTR en relevantie.",
      "business_impact_en": "Title tags are the first thing users see in search results. Unique, descriptive titles improve CTR and relevance.",
      "fix_suggestion_nl": "Zorg dat elke pagina een unieke title tag heeft (50-60 tekens) met relevante sleutelwoorden.",
      "fix_suggestion_en": "Ensure every page has a unique title tag (50-60 chars) with relevant keywords.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "unique-titles"
    },
    {
      "id": "opseo-002",
      "legacy_id": "seq2",
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Zijn meta descriptions ingevuld en aantrekkelijk?",
      "question_en": "Are meta descriptions filled in and compelling?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Meta descriptions beïnvloeden CTR in zoekresultaten. Aantrekkelijke descriptions verhogen klikpercentages.",
      "business_impact_en": "Meta descriptions affect CTR in search results. Compelling descriptions increase click-through rates.",
      "fix_suggestion_nl": "Schrijf aantrekkelijke meta descriptions (150-160 tekens) die het onderwerp en voordeel samenvatten.",
      "fix_suggestion_en": "Write compelling meta descriptions (150-160 chars) that summarize the topic and benefit.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "unique-descriptions"
    },
    {
      "id": "opseo-003",
      "legacy_id": "seq3",
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Worden heading tags (H1, H2, H3) correct gebruikt?",
      "question_en": "Are heading tags (H1, H2, H3) used correctly?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Juiste heading-structuur helpt zoekmachines content-hiërarchie begrijpen en verbetert leesbaarheid.",
      "business_impact_en": "Proper heading structure helps search engines understand content hierarchy and improves readability.",
      "fix_suggestion_nl": "Zorg voor één H1 per pagina. Gebruik H2/H3 voor subheadings in logische volgorde.",
      "fix_suggestion_en": "Use one H1 per page. Use H2/H3 for subheadings in logical order.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "heading-order"
    },
    {
      "id": "opseo-004",
      "legacy_id": "seq4",
      "module": "on-page-seo",
      "subcategory": "images",
      "question_nl": "Zijn afbeeldingen voorzien van alt-teksten?",
      "question_en": "Do images have alt text?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Alt-teksten helpen zoekmachines afbeeldingen begrijpen en verbeteren toegankelijkheid.",
      "business_impact_en": "Alt text helps search engines understand images and improves accessibility.",
      "fix_suggestion_nl": "Voeg descriptief alt-tekst toe aan alle afbeeldingen. Beschrijf wat de afbeelding toont.",
      "fix_suggestion_en": "Add descriptive alt text to all images. Describe what the image shows.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "img-alt"
    },
    {
      "id": "opseo-005",
      "legacy_id": "seq5",
      "module": "on-page-seo",
      "subcategory": "url-structure",
      "question_nl": "Is de URL-structuur clean en logisch?",
      "question_en": "Is the URL structure clean and logical?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Schone URL-structuur verbetert gebruikerservaring en kan CTR in zoekresultaten verhogen.",
      "business_impact_en": "Clean URL structure improves user experience and can increase CTR in search results.",
      "fix_suggestion_nl": "Zorg voor beschrijvende, korte URLs met sleutelwoorden. Vermijd onnodig lange parameters.",
      "fix_suggestion_en": "Use descriptive, short URLs with keywords. Avoid unnecessarily long parameters.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-006",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Hebben title tags de juiste lengte (50-60 tekens)?",
      "question_en": "Do title tags have proper length (50-60 chars)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Title tags die te lang zijn worden in zoekresultaten afgekapt, wat CTR kan verminderen.",
      "business_impact_en": "Title tags that are too long get truncated in search results, which can reduce CTR.",
      "fix_suggestion_nl": "Zorg dat title tags 50-60 tekens lang zijn. Plaats belangrijk keywords aan het begin.",
      "fix_suggestion_en": "Keep title tags 50-60 chars long. Place important keywords at the beginning.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "title-length"
    },
    {
      "id": "opseo-007",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Hebben meta descriptions de juiste lengte (150-160 tekens)?",
      "question_en": "Do meta descriptions have proper length (150-160 chars)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Meta descriptions die te lang zijn worden afgekapt. Korte descriptions missen informatie.",
      "business_impact_en": "Meta descriptions that are too long get truncated. Short ones miss information.",
      "fix_suggestion_nl": "Zorg dat meta descriptions 150-160 tekens lang zijn. Include duidelijke CTA.",
      "fix_suggestion_en": "Keep meta descriptions 150-160 chars. Include clear CTA.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "meta-desc-length"
    },
    {
      "id": "opseo-008",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Bevat de title tag doelsleutelwoorden?",
      "question_en": "Does the title tag contain target keywords?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Sleutelwoorden in title tags verbeteren relevantie en kunnen ranking verbeteren.",
      "business_impact_en": "Keywords in title tags improve relevance and can boost ranking.",
      "fix_suggestion_nl": "Zorg dat doelsleutelwoorden in title tags voorkomen, vooral aan het begin.",
      "fix_suggestion_en": "Include target keywords in title tags, especially at the beginning.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "title-keywords"
    },
    {
      "id": "opseo-009",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Bevat meta description een CTA?",
      "question_en": "Does meta description contain a CTA?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "CTAs in meta descriptions kunnen CTR verhogen door gebruikers aan te moedigen te klikken.",
      "business_impact_en": "CTAs in meta descriptions can increase CTR by encouraging users to click.",
      "fix_suggestion_nl": "Voeg verlokkende CTAs toe aan meta descriptions ('Lees meer', 'Ontdek', 'Bestel nu', etc.).",
      "fix_suggestion_en": "Add compelling CTAs to meta descriptions ('Learn more', 'Discover', 'Shop now', etc.).",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "meta-cta"
    },
    {
      "id": "opseo-010",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Reflecteren title tags zoek-intentie?",
      "question_en": "Do title tags reflect search intent?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Title tags die niet aansluiten bij zoekintentie leiden tot lage CTR en hoge bounce rates.",
      "business_impact_en": "Title tags misaligned with search intent lead to low CTR and high bounce rates.",
      "fix_suggestion_nl": "Zorg dat title tags aansluiten bij gebruikers' zoekintentie. Begrijp wat gebruikers verwachten.",
      "fix_suggestion_en": "Ensure title tags match what users are searching for. Understand their search intent.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-011",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Heeft elke pagina slechts één H1?",
      "question_en": "Does each page have only one H1?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Meerdere H1s per pagina verwarren zoekmachines over het hoofdonderwerp.",
      "business_impact_en": "Multiple H1s per page confuse search engines about the main topic.",
      "fix_suggestion_nl": "Zorg voor slechts één H1 per pagina. Dit moet het hoofdonderwerp van de pagina weerspiegelen.",
      "fix_suggestion_en": "Ensure only one H1 per page. This should reflect the main topic of the page.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "single-h1"
    },
    {
      "id": "opseo-012",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Is de heading-hiërarchie correct?",
      "question_en": "Is heading hierarchy correct?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Correcte heading-hiërarchie helpt zoekmachines en gebruikers de contentstructuur begrijpen.",
      "business_impact_en": "Correct heading hierarchy helps search engines and users understand content structure.",
      "fix_suggestion_nl": "Zorg dat headings logisch volgen (H1 → H2 → H3). Spring geen niveaus over (H1 → H3).",
      "fix_suggestion_en": "Ensure headings follow logically (H1 → H2 → H3). Don't skip levels (H1 → H3).",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "heading-order"
    },
    {
      "id": "opseo-013",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Is er een H1 op elke pagina?",
      "question_en": "Is there an H1 on every page?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "H1 tags helpen zoekmachines het hoofdonderwerp identificeren. Pagina's zonder H1 zijn minder optimaal.",
      "business_impact_en": "H1 tags help search engines identify the main topic. Pages without H1 are suboptimal.",
      "fix_suggestion_nl": "Voeg een beschrijvende H1 toe aan alle pagina's die deze missen.",
      "fix_suggestion_en": "Add a descriptive H1 to all pages missing one.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "h1-present"
    },
    {
      "id": "opseo-014",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Bevat H1 doelsleutelwoord?",
      "question_en": "Does H1 contain target keyword?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Doelsleutelwoorden in H1 verbeteren relevantie en helpen ranking.",
      "business_impact_en": "Target keywords in H1 improve relevance and help ranking.",
      "fix_suggestion_nl": "Zorg dat H1 relevante sleutelwoorden bevat die het pagina-onderwerp weergeven.",
      "fix_suggestion_en": "Ensure H1 contains relevant keywords that represent the page topic.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "h1-keywords"
    },
    {
      "id": "opseo-015",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Breken subheadings lange inhoud op?",
      "question_en": "Do subheadings break up long content?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Subheadings maken content scanbaar en verbeteren gebruikerservaring.",
      "business_impact_en": "Subheadings make content scannable and improve user experience.",
      "fix_suggestion_nl": "Voeg H2/H3 subheadings toe om lange inhalsekties op te breken. Circa 1 heading per 100-150 woorden.",
      "fix_suggestion_en": "Add H2/H3 subheadings to break up long content sections. About 1 heading per 100-150 words.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "heading-density"
    },
    {
      "id": "opseo-016",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Zijn headings beschrijvend en scanbaar?",
      "question_en": "Are headings descriptive and scannable?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Beschrijvende headings helpen gebruikers en zoekmachines content snel te scannen en begrijpen.",
      "business_impact_en": "Descriptive headings help users and search engines quickly scan and understand content.",
      "fix_suggestion_nl": "Zorg dat headings duidelijk het onderwerp weergeven. Vermijd vague of generieke headings.",
      "fix_suggestion_en": "Ensure headings clearly convey the topic. Avoid vague or generic headings.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-017",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "headings",
      "question_nl": "Dekken H2/H3 het onderwerp volledig?",
      "question_en": "Do H2/H3 cover the topic comprehensively?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Exhaustive heading coverage zorgt ervoor dat alle onderwerpaspecten behandeld worden.",
      "business_impact_en": "Comprehensive heading coverage ensures all topic aspects are covered.",
      "fix_suggestion_nl": "Zorg dat H2/H3 subheadings alle belangrijke aspecten van het onderwerp dekken.",
      "fix_suggestion_en": "Ensure H2/H3 subheadings cover all important aspects of the topic.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-018",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Voldoet de woordlengte aan minimumvereisten (300+ voor standaard pagina's)?",
      "question_en": "Does word count meet minimum requirements (300+ for standard pages)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Lage woordlengte signaleert zwakke content. Páginas met meer inhoud ranking meestal hoger.",
      "business_impact_en": "Low word count signals weak content. Pages with more content usually rank higher.",
      "fix_suggestion_nl": "Zorg dat standaard pagina's minimaal 300 woorden hebben. Langere content (1000+) rankt vaak beter.",
      "fix_suggestion_en": "Ensure standard pages have at least 300 words. Longer content (1000+) often ranks better.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "content-length"
    },
    {
      "id": "opseo-019",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Bevat het eerste alinea doelsleutelwoord?",
      "question_en": "Does the first paragraph contain target keyword?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Sleutelwoorden in het eerste alinea geven zoekmachines een sterke relevantiesignaal.",
      "business_impact_en": "Keywords in the first paragraph give search engines a strong relevance signal.",
      "fix_suggestion_nl": "Plaats doelsleutelwoord in het eerste alinea, idealiter in de eerste zin.",
      "fix_suggestion_en": "Place target keyword in the first paragraph, ideally in the first sentence.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "keyword-intro"
    },
    {
      "id": "opseo-020",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Wat is de content-uniqueness-score?",
      "question_en": "What is the content uniqueness score?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Unieke content rankt beter dan gedupliceerde content. Google geeft voorkeur aan origineel werk.",
      "business_impact_en": "Unique content ranks better than duplicated content. Google prefers original work.",
      "fix_suggestion_nl": "Zorg dat content 100% origineel is. Controleer met plagiarisme-detectie tools.",
      "fix_suggestion_en": "Ensure content is 100% original. Check with plagiarism detection tools.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "uniqueness-score"
    },
    {
      "id": "opseo-021",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Wat is de sleutelwoord-dichtheid (1-3%)?",
      "question_en": "What is the keyword density (1-3%)?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Juiste sleutelwoord-dichtheid geeft relevantie zonder overoptimalisatie-straffen.",
      "business_impact_en": "Proper keyword density signals relevance without over-optimization penalties.",
      "fix_suggestion_nl": "Zorg dat doelsleutelwoord 1-3% van content voorkomen. Vermijd keyword-stuffing.",
      "fix_suggestion_en": "Ensure target keyword appears 1-3% of content. Avoid keyword stuffing.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "keyword-density"
    },
    {
      "id": "opseo-022",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Zijn er voldoende interne koppelingen (3+ aanbevolen)?",
      "question_en": "Are there sufficient internal links (3+ recommended)?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Interne koppelingen verspreiden link-equity en helpen zoekmachines sitestructuur begrijpen.",
      "business_impact_en": "Internal links spread link equity and help search engines understand site structure.",
      "fix_suggestion_nl": "Voeg minimaal 3 relevante interne koppelingen toe per pagina.",
      "fix_suggestion_en": "Add at least 3 relevant internal links per page.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "internal-link-count"
    },
    {
      "id": "opseo-023",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Zijn er outbound links naar authoriteit bronnen?",
      "question_en": "Are there outbound links to authoritative sources?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Koppelingen naar authoritaire bronnen signaleren expertise en verbeteren content-autoriteit.",
      "business_impact_en": "Links to authoritative sources signal expertise and improve content authority.",
      "fix_suggestion_nl": "Voeg links toe naar gerenommeerde en relevante externe bronnen.",
      "fix_suggestion_en": "Add links to reputable and relevant external sources.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "external-link-quality"
    },
    {
      "id": "opseo-024",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Komt de content overeen met zoek-intentie?",
      "question_en": "Does content match search intent?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Content die niet overeenkomt met zoekintentie leidt tot lage engagement en ranking.",
      "business_impact_en": "Content misaligned with search intent leads to poor engagement and ranking.",
      "fix_suggestion_nl": "Analyseer wat gebruikers verwachten. Zorg dat content aan die verwachtingen voldoet.",
      "fix_suggestion_en": "Analyze what users expect. Ensure content meets those expectations.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-025",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Dekt de content het onderwerp uitputtend?",
      "question_en": "Does content cover the topic comprehensively?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Exhaustive content heeft lagere bounce rates en rankert hoger.",
      "business_impact_en": "Comprehensive content has lower bounce rates and ranks higher.",
      "fix_suggestion_nl": "Zorg dat content alle belangrijke aspecten van het onderwerp behandelt. Voeg diepgang toe.",
      "fix_suggestion_en": "Ensure content covers all important topic aspects. Add depth.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-026",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Is de content recent bijgewerkt?",
      "question_en": "Is the content recently updated?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Recent bijgewerkte content signaleert freshness. Google geeft voorkeur aan actuele informatie.",
      "business_impact_en": "Recently updated content signals freshness. Google prefers current information.",
      "fix_suggestion_nl": "Update content regelmatig, vooral voor dynamische onderwerpen. Voeg een 'last updated' datum toe.",
      "fix_suggestion_en": "Update content regularly, especially for dynamic topics. Add a 'last updated' date.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-027",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Zijn E-E-A-T signalen aanwezig (expertise, ervaring, autoriteit, betrouwbaarheid)?",
      "question_en": "Are E-E-A-T signals present (expertise, experience, authority, trust)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "E-E-A-T is kritisch voor YMYL-content. Zonder E-E-A-T signalen rankent content niet goed.",
      "business_impact_en": "E-E-A-T is critical for YMYL content. Without E-E-A-T signals, content won't rank well.",
      "fix_suggestion_nl": "Zorg voor auteur-bio's, credentials, case studies, testimonials en citations.",
      "fix_suggestion_en": "Include author bios, credentials, case studies, testimonials, and citations.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-028",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "social-tags",
      "question_nl": "Is Open Graph title aanwezig?",
      "question_en": "Is Open Graph title present?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Open Graph tags bepalen hoe content wordt weergegeven bij delen op sociale netwerken.",
      "business_impact_en": "Open Graph tags determine how content appears when shared on social networks.",
      "fix_suggestion_nl": "Voeg og:title meta tag toe aan alle pagina's. Dit bepaalt wat verschijnt op sociale media.",
      "fix_suggestion_en": "Add og:title meta tag to all pages. This determines what appears on social media.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "og-title"
    },
    {
      "id": "opseo-029",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "social-tags",
      "question_nl": "Is Open Graph description aanwezig?",
      "question_en": "Is Open Graph description present?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "OG descriptions bepalen de beschrijving bij sociaal delen.",
      "business_impact_en": "OG descriptions determine the description shown on social shares.",
      "fix_suggestion_nl": "Voeg og:description meta tag toe met aantrekkelijke tekst.",
      "fix_suggestion_en": "Add og:description meta tag with compelling text.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "og-description"
    },
    {
      "id": "opseo-030",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "social-tags",
      "question_nl": "Is Open Graph image aanwezig?",
      "question_en": "Is Open Graph image present?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "OG images bepalen welke afbeelding wordt getoond bij sociaal delen.",
      "business_impact_en": "OG images determine which image is shown on social shares.",
      "fix_suggestion_nl": "Voeg og:image meta tag toe met visueel aantrekkelijke afbeelding.",
      "fix_suggestion_en": "Add og:image meta tag with visually appealing image.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "og-image"
    },
    {
      "id": "opseo-031",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "social-tags",
      "question_nl": "Zijn Twitter Card tags aanwezig?",
      "question_en": "Are Twitter Card tags present?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Twitter Cards bepalen hoe content verschijnt op Twitter.",
      "business_impact_en": "Twitter Cards determine how content appears on Twitter.",
      "fix_suggestion_nl": "Voeg twitter:card, twitter:title, twitter:description en twitter:image tags toe.",
      "fix_suggestion_en": "Add twitter:card, twitter:title, twitter:description, and twitter:image tags.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "twitter-card"
    },
    {
      "id": "opseo-032",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "social-tags",
      "question_nl": "Hebben OG-afbeeldingen de juiste afmetingen (1200x630)?",
      "question_en": "Do OG images have correct dimensions (1200x630)?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Juiste afbeeldingsafmetingen zorgen ervoor dat OG-afbeeldingen correct worden weergegeven.",
      "business_impact_en": "Correct image dimensions ensure OG images display properly.",
      "fix_suggestion_nl": "Zorg dat og:image 1200x630 pixels is. Dit is de aanbevolen grootte voor sociale media.",
      "fix_suggestion_en": "Ensure og:image is 1200x630 pixels. This is the recommended size for social media.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "og-image-dimensions"
    },
    {
      "id": "opseo-033",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "social-tags",
      "question_nl": "Ziet het sociaal preview er aantrekkelijk uit?",
      "question_en": "Does the social preview look attractive?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Aantrekkelijke sociale previews verhogen shares en klikken vanaf sociale netwerken.",
      "business_impact_en": "Attractive social previews increase shares and clicks from social networks.",
      "fix_suggestion_nl": "Test hoe content op sociale netwerken uitziet met tools zoals Social Media Sharing Debugger.",
      "fix_suggestion_en": "Test how content looks on social with tools like Social Media Sharing Debugger.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-034",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "images",
      "question_nl": "Zijn alle afbeeldingen voorzien van beschrijvende bestandsnamen?",
      "question_en": "Do all images have descriptive filenames?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Beschrijvende bestandsnamen helpen zoekmachines afbeeldingen begrijpen.",
      "business_impact_en": "Descriptive filenames help search engines understand images.",
      "fix_suggestion_nl": "Hernoem afbeeldingsbestanden naar beschrijvende termen (b.v., 'blue-widget-v2.jpg' in plaats van 'img12345.jpg').",
      "fix_suggestion_en": "Rename image files to descriptive terms (e.g., 'blue-widget-v2.jpg' instead of 'img12345.jpg').",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "img-filename"
    },
    {
      "id": "opseo-035",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "images",
      "question_nl": "Hebben afbeeldingen width/height-attributen?",
      "question_en": "Do images have width/height attributes?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Width/height-attributen voorkomen layout-shift en verbeteren page experience.",
      "business_impact_en": "Width/height attributes prevent layout shift and improve page experience.",
      "fix_suggestion_nl": "Voeg width en height attributen toe aan alle img-tags.",
      "fix_suggestion_en": "Add width and height attributes to all img tags.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "img-dimensions"
    },
    {
      "id": "opseo-036",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "images",
      "question_nl": "Is alt-tekst beschrijvend (niet alleen bestandsnaam)?",
      "question_en": "Is alt text descriptive (not just filename)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Beschrijvende alt-tekst helpt zoekmachines en geeft gebruikers meer context.",
      "business_impact_en": "Descriptive alt text helps search engines and gives users more context.",
      "fix_suggestion_nl": "Zorg dat alt-tekst beschrijft wat de afbeelding toont, niet alleen de bestandsnaam.",
      "fix_suggestion_en": "Ensure alt text describes what the image shows, not just the filename.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "alt-text-quality"
    },
    {
      "id": "opseo-037",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "images",
      "question_nl": "Ondersteunen afbeeldingen de content- en SEO-strategie?",
      "question_en": "Do images support content and SEO strategy?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Relevante afbeeldingen verbeteren engagement en kunnen helpen content-waarde te ondersteunen.",
      "business_impact_en": "Relevant images improve engagement and can support content value.",
      "fix_suggestion_nl": "Zorg dat afbeeldingen relevant zijn voor content. Vermijd placeholder- of irrelevante afbeeldingen.",
      "fix_suggestion_en": "Ensure images are relevant to content. Avoid placeholder or irrelevant images.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    },
    {
      "id": "opseo-038",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "meta-tags",
      "question_nl": "Is meta viewport ingesteld?",
      "question_en": "Is meta viewport configured?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Meta viewport is nodig voor responsive design en mobilevriendelijkheid.",
      "business_impact_en": "Meta viewport is required for responsive design and mobile-friendliness.",
      "fix_suggestion_nl": "Voeg <meta name='viewport' content='width=device-width, initial-scale=1.0'> toe aan de <head>.",
      "fix_suggestion_en": "Add <meta name='viewport' content='width=device-width, initial-scale=1.0'> to <head>.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "viewport"
    },
    {
      "id": "opseo-039",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Zijn er voldoende relevante sleutelwoord-variaties?",
      "question_en": "Are there sufficient relevant keyword variations?",
      "type": "semi-auto",
      "severity": "minor",
      "business_impact_nl": "Sleutelwoord-variaties helpen semantic relevance en kunnen ranking verbeteren.",
      "business_impact_en": "Keyword variations improve semantic relevance and can boost ranking.",
      "fix_suggestion_nl": "Voeg synoniemen, gerelateerde termen en long-tail variaties van target sleutelwoorden toe.",
      "fix_suggestion_en": "Include synonyms, related terms, and long-tail variations of target keywords.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "keyword-variations"
    },
    {
      "id": "opseo-040",
      "legacy_id": null,
      "module": "on-page-seo",
      "subcategory": "content-seo",
      "question_nl": "Is de content goed gestructureerd en leesbaar?",
      "question_en": "Is the content well-structured and readable?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Goed gestructureerde content verbetert gebruikerservaring en engagement.",
      "business_impact_en": "Well-structured content improves user experience and engagement.",
      "fix_suggestion_nl": "Zorg voor korte alinea's, opsommingen, vetgedrukte termen en visuele breakpoints.",
      "fix_suggestion_en": "Use short paragraphs, bullet points, bold terms, and visual breaks.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": null,
      "auto_metric": null
    }
  ],
  "mobile": [
    {
      "id": "mob-001",
      "legacy_id": "mbq1",
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Is de site volledig responsive?",
      "question_en": "Is the site fully responsive?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Niet-responsieve sites leiden tot slechte gebruikerservaring en lagere conversies op mobiele apparaten.",
      "business_impact_en": "Non-responsive sites lead to poor user experience and lower conversion rates on mobile devices.",
      "fix_suggestion_nl": "Controleer viewport meta tag, gebruik CSS media queries en test op meerdere schermgroottes.",
      "fix_suggestion_en": "Verify viewport meta tag, use CSS media queries, and test across multiple screen sizes.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "viewport"
    },
    {
      "id": "mob-002",
      "legacy_id": "mbq2",
      "module": "mobile",
      "subcategory": "touch",
      "question_nl": "Zijn touch targets groot genoeg? (min 44x44px)",
      "question_en": "Are touch targets large enough? (min 44x44px)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Kleine touch targets leiden tot gebruikersfrustatie en verhoogde foutpercentages op mobiel.",
      "business_impact_en": "Small touch targets lead to user frustration and higher error rates on mobile.",
      "fix_suggestion_nl": "Vergroot alle interactieve elementen tot minimaal 48x48px en zorg voor voldoende afstand tussen doelen.",
      "fix_suggestion_en": "Increase all interactive elements to at least 48x48px and ensure sufficient spacing between targets.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "tap-targets"
    },
    {
      "id": "mob-003",
      "legacy_id": "mbq3",
      "module": "mobile",
      "subcategory": "content-mobile",
      "question_nl": "Is tekst leesbaar zonder zoomen?",
      "question_en": "Is text readable without zooming?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Onleesbare tekst vermindert engagement en vergroot het risico op paginaverlating.",
      "business_impact_en": "Unreadable text decreases engagement and increases page abandonment risk.",
      "fix_suggestion_nl": "Zorg dat de minimale lettergrootte 16px is op mobiel en de regellengte ongeveer 50-60 karakters.",
      "fix_suggestion_en": "Ensure minimum font size is 16px on mobile and line length is around 50-60 characters.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "font-size-readability"
    },
    {
      "id": "mob-004",
      "legacy_id": "mbq4",
      "module": "mobile",
      "subcategory": "touch",
      "question_nl": "Werken formulieren goed op mobiel? (juiste toetsenbordtypes)",
      "question_en": "Do forms work well on mobile? (correct keyboard types)",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Slechte formulieren op mobiel leiden tot lagere inzendingspercentages en gebruikersfrustatie.",
      "business_impact_en": "Poor forms on mobile lead to lower submission rates and user frustration.",
      "fix_suggestion_nl": "Gebruik correcte input types (email, tel, number) en zorg voor duidelijke labels en validators.",
      "fix_suggestion_en": "Use correct input types (email, tel, number) and provide clear labels and validators.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "form-accessibility"
    },
    {
      "id": "mob-005",
      "legacy_id": "mbq5",
      "module": "mobile",
      "subcategory": "navigation",
      "question_nl": "Is de mobiele navigatie intuïtief? (hamburger, sticky nav)",
      "question_en": "Is mobile navigation intuitive? (hamburger, sticky nav)",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Slecht navigatieontwerp verhoogt bounce rates en vermindert siteverkenning.",
      "business_impact_en": "Poor navigation design increases bounce rates and reduces site exploration.",
      "fix_suggestion_nl": "Implementeer duidelijke navigatiemenus, zorg voor sticky navigation en test gebruikersvriendelijkheid.",
      "fix_suggestion_en": "Implement clear navigation menus, provide sticky navigation, and test usability.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "navigation-accessibility"
    },
    {
      "id": "mob-006",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Is de content goed geformatteerd voor de viewport?",
      "question_en": "Is content properly sized to the viewport?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Content die niet in de viewport past veroorzaakt horizontaal scrollen en verslechtert UX.",
      "business_impact_en": "Content that doesn't fit the viewport causes horizontal scrolling and degrades UX.",
      "fix_suggestion_nl": "Zorg dat alle content 100% van de viewport-breedte gebruikt en geen horizontaal scrollen veroorzaakt.",
      "fix_suggestion_en": "Ensure all content uses 100% of viewport width and doesn't cause horizontal scrolling.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "content-width"
    },
    {
      "id": "mob-007",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Is er geen horizontaal scrollen op mobiele schermbreedtes?",
      "question_en": "Is there no horizontal scrolling at mobile widths?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Horizontaal scrollen is frustrerend en verwijdert gebruikers van mobiele sites.",
      "business_impact_en": "Horizontal scrolling is frustrating and drives users away from mobile sites.",
      "fix_suggestion_nl": "Test op standaard mobiele apparaten en verwijder oorzaken van horizontaal scrollen.",
      "fix_suggestion_en": "Test on standard mobile devices and remove causes of horizontal scrolling.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-horizontal-scroll"
    },
    {
      "id": "mob-008",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Worden responsive images met srcset gebruikt?",
      "question_en": "Are responsive images with srcset being used?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Niet-optimale afbeeldingen verhogen laadtijden en dataverbruik op mobiel.",
      "business_impact_en": "Unoptimized images increase load times and data consumption on mobile.",
      "fix_suggestion_nl": "Implementeer srcset en sizes attributen voor alle afbeeldingen.",
      "fix_suggestion_en": "Implement srcset and sizes attributes for all images.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "responsive-images"
    },
    {
      "id": "mob-009",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Zijn breakpoints geoptimaliseerd voor veelgebruikte devices?",
      "question_en": "Are breakpoints optimized for common devices?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Slechte breakpoints resulteren in slechte weergave op populaire apparaten.",
      "business_impact_en": "Poor breakpoints result in poor display on popular devices.",
      "fix_suggestion_nl": "Definieer breakpoints voor 320px, 768px, 1024px en test op daadwerkelijke apparaten.",
      "fix_suggestion_en": "Define breakpoints for 320px, 768px, 1024px and test on actual devices.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "breakpoint-coverage"
    },
    {
      "id": "mob-010",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Blijft de layout intact op alle schermgroottes?",
      "question_en": "Does the layout remain intact across all screen sizes?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Beschadigde layouts verlagen vertrouwen en gebruikerservaring.",
      "business_impact_en": "Broken layouts lower trust and user experience.",
      "fix_suggestion_nl": "Test manueel op minimaal 5 verschillende schermgroottes en controleer visuele integriteit.",
      "fix_suggestion_en": "Test manually on at least 5 different screen sizes and verify visual integrity.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-011",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "touch",
      "question_nl": "Is er voldoende afstand tussen touch targets?",
      "question_en": "Is there sufficient spacing between touch targets?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Dicht opeengestapelde targets leiden tot accidentele clicks en gebruikersfrustatie.",
      "business_impact_en": "Tightly spaced targets lead to accidental clicks and user frustration.",
      "fix_suggestion_nl": "Zorg voor minimaal 8px afstand tussen alle touch targets.",
      "fix_suggestion_en": "Ensure minimum 8px spacing between all touch targets.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "tap-target-spacing"
    },
    {
      "id": "mob-012",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "touch",
      "question_nl": "Zijn formuliercontroles touch-vriendelijk?",
      "question_en": "Are form controls touch-friendly?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Moeilijke formuliercontroles verminderen conversies en gebruikerstevredenheid.",
      "business_impact_en": "Difficult form controls reduce conversions and user satisfaction.",
      "fix_suggestion_nl": "Vervang select boxes door radio buttons/checkboxes en vergroot alle controls.",
      "fix_suggestion_en": "Replace select boxes with radio buttons/checkboxes and enlarge all controls.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "form-control-size"
    },
    {
      "id": "mob-013",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "touch",
      "question_nl": "Hebben swipe-gebaren alternatieve navigatieoptties?",
      "question_en": "Do swipe gestures have alternative navigation options?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Gebruikers die swipe-gebaren niet kunnen gebruiken worden buitengesloten.",
      "business_impact_en": "Users unable to use swipe gestures are excluded.",
      "fix_suggestion_nl": "Biedt pijlknoppen of vorige/volgende links als alternatief voor swipe.",
      "fix_suggestion_en": "Provide arrow buttons or previous/next links as alternative to swipe.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-014",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "navigation",
      "question_nl": "Is het mobiele menu toegankelijk en functioneel?",
      "question_en": "Is the mobile menu accessible and functional?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Slecht functionerende menu's frustreren gebruikers en verminderen siteverkenning.",
      "business_impact_en": "Poor functioning menus frustrate users and reduce site exploration.",
      "fix_suggestion_nl": "Test menu openen/sluiten, zorg voor focus management en voldoende contrast.",
      "fix_suggestion_en": "Test menu open/close, ensure focus management and sufficient contrast.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "menu-functionality"
    },
    {
      "id": "mob-015",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "navigation",
      "question_nl": "Is er sticky header of footer navigatie?",
      "question_en": "Is there sticky header or footer navigation?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Sticky navigatie verbetert UX en vermingt scroll belasting.",
      "business_impact_en": "Sticky navigation improves UX and reduces scroll burden.",
      "fix_suggestion_nl": "Implementeer sticky header of bottom navigation bar voor snelle toegang.",
      "fix_suggestion_en": "Implement sticky header or bottom navigation bar for quick access.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "sticky-navigation"
    },
    {
      "id": "mob-016",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "navigation",
      "question_nl": "Zijn belangrijke acties bereikbaar in de duimzone?",
      "question_en": "Are important actions within reach in the thumb zone?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slecht bereikbare acties verminderen gebruikersinteractie en conversies.",
      "business_impact_en": "Poorly positioned actions reduce user interaction and conversions.",
      "fix_suggestion_nl": "Plaats primaire CTAs in de onderkant van het scherm voor eenhandige bediening.",
      "fix_suggestion_en": "Place primary CTAs at the bottom of screen for one-handed operation.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-017",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "navigation",
      "question_nl": "Zijn onderste navigatiemenu's beschikbaar voor snelle toegang?",
      "question_en": "Are bottom navigation menus available for quick access?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Bottom navigation verbetert UX op mobiel aanzienlijk.",
      "business_impact_en": "Bottom navigation significantly improves mobile UX.",
      "fix_suggestion_nl": "Implementeer bottom navigation voor 4-5 meest gebruikte functies.",
      "fix_suggestion_en": "Implement bottom navigation for 4-5 most used functions.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-018",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "navigation",
      "question_nl": "Is de terugknop-gedrag consistent?",
      "question_en": "Is back button behavior consistent?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Inconsistent back button gedrag leidt tot gebruikersverwaring.",
      "business_impact_en": "Inconsistent back button behavior leads to user confusion.",
      "fix_suggestion_nl": "Zorg dat terug-navigatie logisch en verwacht is in alle pagina's.",
      "fix_suggestion_en": "Ensure back navigation is logical and expected across all pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-019",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "performance-mobile",
      "question_nl": "Wat is de mobiele pagina snelheidsscore?",
      "question_en": "What is the mobile page speed score?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Trage pagina's op mobiel leiden tot hoge bounce rates en lagere conversies.",
      "business_impact_en": "Slow pages on mobile lead to high bounce rates and lower conversions.",
      "fix_suggestion_nl": "Optimaliseer afbeeldingen, minify CSS/JS en implementeer lazy loading.",
      "fix_suggestion_en": "Optimize images, minify CSS/JS, and implement lazy loading.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "mobile-speed-score"
    },
    {
      "id": "mob-020",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "performance-mobile",
      "question_nl": "Is de LCP (Largest Contentful Paint) onder 2.5 seconden?",
      "question_en": "Is LCP (Largest Contentful Paint) under 2.5 seconds?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Traag LCP leidt tot slechte persepties van sitesnelheid.",
      "business_impact_en": "Slow LCP leads to poor perception of site speed.",
      "fix_suggestion_nl": "Optimaliseer hero afbeeldingen en zorg voor snelle serverstroom.",
      "fix_suggestion_en": "Optimize hero images and ensure fast server response.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "mobile-lcp"
    },
    {
      "id": "mob-021",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "performance-mobile",
      "question_nl": "Is kritieke CSS inline opgenomen?",
      "question_en": "Is critical CSS inlined?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Niet-inline CSS vertraagt het kritieke renderpad.",
      "business_impact_en": "Non-inlined CSS slows down the critical render path.",
      "fix_suggestion_nl": "Inline kritieke CSS boven de fold in de HTML head.",
      "fix_suggestion_en": "Inline critical CSS above the fold in HTML head.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_rule": "critical-css"
    },
    {
      "id": "mob-022",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "performance-mobile",
      "question_nl": "Zijn mobiele afbeeldingen geoptimaliseerd?",
      "question_en": "Are mobile images optimized?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Grote afbeeldingen verhogen laadtijden aanzienlijk op mobiel.",
      "business_impact_en": "Large images significantly increase load times on mobile.",
      "fix_suggestion_nl": "Comprimeer afbeeldingen en gebruik moderne formaten zoals WebP.",
      "fix_suggestion_en": "Compress images and use modern formats like WebP.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "image-optimization"
    },
    {
      "id": "mob-023",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "performance-mobile",
      "question_nl": "Is het dataverbruik geminimaliseerd?",
      "question_en": "Is data consumption reduced?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Hoog dataverbruik schrikt gebruikers met beperkte plannen af.",
      "business_impact_en": "High data consumption deters users with limited plans.",
      "fix_suggestion_nl": "Bied laag-databeschikking, lazy load content en comprimeer media.",
      "fix_suggestion_en": "Offer low-data mode, lazy load content, and compress media.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "data-consumption"
    },
    {
      "id": "mob-024",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "performance-mobile",
      "question_nl": "Is er offline-functionaliteit of Progressive Web App?",
      "question_en": "Is there offline functionality or Progressive Web App?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Offline functionaliteit vergroot gebruikerservaring en betrokkenheid.",
      "business_impact_en": "Offline functionality increases user experience and engagement.",
      "fix_suggestion_nl": "Implementeer service workers en PWA features voor offline ondersteuning.",
      "fix_suggestion_en": "Implement service workers and PWA features for offline support.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-025",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "content-mobile",
      "question_nl": "Is de lettergrootte op mobiel minstens 16px?",
      "question_en": "Is font size on mobile at least 16px?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Te kleine tekst vermindert leesbaarheid en gebruikerservaring.",
      "business_impact_en": "Too small text reduces readability and user experience.",
      "fix_suggestion_nl": "Zet minimale lettergrootte op 16px en zorg voor voldoende regelafstand.",
      "fix_suggestion_en": "Set minimum font size to 16px and ensure sufficient line height.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "min-font-size"
    },
    {
      "id": "mob-026",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "content-mobile",
      "question_nl": "Is de regellengte geschikt voor mobiel?",
      "question_en": "Is line length appropriate for mobile?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Te lange regels vermoeien ogen en verslechteren leesbaarheid.",
      "business_impact_en": "Too long lines tire eyes and worsen readability.",
      "fix_suggestion_nl": "Hou regellengte rond 50-60 karakters op mobiel.",
      "fix_suggestion_en": "Keep line length around 50-60 characters on mobile.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "line-length"
    },
    {
      "id": "mob-027",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "content-mobile",
      "question_nl": "Is inhoud geprioriteerd voor mobiel?",
      "question_en": "Is content prioritized for mobile?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slecht georganiseerde content verhoogt bounce rates op mobiel.",
      "business_impact_en": "Poorly organized content increases bounce rates on mobile.",
      "fix_suggestion_nl": "Plaats meest belangrijke informatie bovenaan, gebruik progressive disclosure.",
      "fix_suggestion_en": "Place most important info first, use progressive disclosure.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-028",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "content-mobile",
      "question_nl": "Zijn mobiel-specifieke CTAs aanwezig?",
      "question_en": "Are mobile-specific CTAs present?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Mobiel-specifieke CTAs (bel, richtingen) verhogen conversies aanzienlijk.",
      "business_impact_en": "Mobile-specific CTAs (call, directions) significantly increase conversions.",
      "fix_suggestion_nl": "Bied tap-to-call links, richtingen naar locatie en one-click acties.",
      "fix_suggestion_en": "Provide tap-to-call links, directions to location, and one-click actions.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-029",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "content-mobile",
      "question_nl": "Kunnen gebruikers gemakkelijk contact opnemen?",
      "question_en": "Can users easily contact the business?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Moeilijk contact opnemen leidt tot gemiste conversies.",
      "business_impact_en": "Difficult contact methods lead to missed conversions.",
      "fix_suggestion_nl": "Plaats zichtbare contactinformatie en zorg voor duidelijke contact CTAs.",
      "fix_suggestion_en": "Display visible contact info and ensure clear contact CTAs.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "mob-030",
      "legacy_id": null,
      "module": "mobile",
      "subcategory": "responsive",
      "question_nl": "Ondersteunt de site orientatiewisseling?",
      "question_en": "Does the site support orientation changes?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Slechte ondersteuning voor orientatiewisseling frustreert gebruikers.",
      "business_impact_en": "Poor orientation change support frustrates users.",
      "fix_suggestion_nl": "Test in zowel portrait als landscape en zorg voor soepele overgangs.",
      "fix_suggestion_en": "Test in both portrait and landscape and ensure smooth transitions.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "cro-conversion": [
    {
      "id": "cro-001",
      "legacy_id": "cvq1",
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Is de primaire CTA direct zichtbaar boven de fold?",
      "question_en": "Is the primary CTA directly visible above the fold?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "CTAs boven de fold verhogen conversies aanzienlijk.",
      "business_impact_en": "CTAs above the fold significantly increase conversions.",
      "fix_suggestion_nl": "Plaats primaire CTA prominent in hero section zonder scrollen.",
      "fix_suggestion_en": "Place primary CTA prominently in hero section without scrolling.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-002",
      "legacy_id": "cvq2",
      "module": "cro-conversion",
      "subcategory": "value-prop",
      "question_nl": "Is de waardepropositie binnen 5 seconden duidelijk?",
      "question_en": "Is the value proposition clear within 5 seconds?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Duidelijke waarde proposition verhoogt conversiepercentages aanzienlijk.",
      "business_impact_en": "Clear value proposition significantly increases conversion rates.",
      "fix_suggestion_nl": "Communiceer unieke waarde in titel en subkop van hero section.",
      "fix_suggestion_en": "Communicate unique value in headline and subheading of hero section.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-003",
      "legacy_id": "cvq3",
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Zijn er vertrouwenssignalen zichtbaar? (reviews, keurmerken, klantenlogos)",
      "question_en": "Are trust signals visible? (reviews, badges, client logos)",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Vertrouwenssignalen verminderen gebruikerswijfeling en verhogen conversies.",
      "business_impact_en": "Trust signals reduce user doubt and increase conversions.",
      "fix_suggestion_nl": "Plaats reviews, keurmerken en klantenlogos prominent op homepage.",
      "fix_suggestion_en": "Display reviews, badges, and client logos prominently on homepage.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-004",
      "legacy_id": "cvq4",
      "module": "cro-conversion",
      "subcategory": "forms-cro",
      "question_nl": "Is het contactformulier kort genoeg?",
      "question_en": "Is the contact form short enough?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Lange formulieren reduceren aanzienlijk het aantal inzendingen.",
      "business_impact_en": "Long forms significantly reduce submission rates.",
      "fix_suggestion_nl": "Beperk tot maximaal 3-5 velden voor initiatieve contactformulieren.",
      "fix_suggestion_en": "Limit to maximum 3-5 fields for initial contact forms.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "form-field-count"
    },
    {
      "id": "cro-005",
      "legacy_id": "cvq5",
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Is social proof zichtbaar op de belangrijkste paginas?",
      "question_en": "Is social proof visible on key pages?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Social proof op key pages verhoogt conversiepercentages.",
      "business_impact_en": "Social proof on key pages increases conversion rates.",
      "fix_suggestion_nl": "Voeg testimonials, stats en client logos toe aan belangrijkste paginas.",
      "fix_suggestion_en": "Add testimonials, stats, and client logos to key pages.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "social-proof-presence"
    },
    {
      "id": "cro-006",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Is er een CTA knop op elke belangrijke pagina?",
      "question_en": "Is there a CTA button on every important page?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Ontbrekende CTAs leiden tot gemiste conversiekansen.",
      "business_impact_en": "Missing CTAs lead to missed conversion opportunities.",
      "fix_suggestion_nl": "Voeg duidelijke CTA buttons toe aan alle key landing pages.",
      "fix_suggestion_en": "Add clear CTA buttons to all key landing pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "cta-presence"
    },
    {
      "id": "cro-007",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Gebruikt de CTA contrasterende kleur?",
      "question_en": "Does the CTA use contrasting color?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Zichtbare CTAs trekken meer aandacht en krijgen meer clicks.",
      "business_impact_en": "Visible CTAs attract more attention and get more clicks.",
      "fix_suggestion_nl": "Gebruik contrasterende kleur die afsteekt tegen achtergrond.",
      "fix_suggestion_en": "Use contrasting color that stands out against background.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "lighthouse",
      "auto_metric": "color-contrast"
    },
    {
      "id": "cro-008",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Gebruikt CTA-tekst actieve taal?",
      "question_en": "Does CTA text use action-oriented language?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Actieve taal motiveert gebruikers tot actie.",
      "business_impact_en": "Action-oriented language motivates users to act.",
      "fix_suggestion_nl": "Vervang 'Submit' met 'Get Started', 'Download Now', 'Claim Your Free Trial'.",
      "fix_suggestion_en": "Replace 'Submit' with 'Get Started', 'Download Now', 'Claim Your Free Trial'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-009",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Volgt CTA-plaatsing F- of Z-patroon?",
      "question_en": "Does CTA placement follow F or Z pattern?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Goede CTA-plaatsing volgt natuurlijke oogbewegingspatronen.",
      "business_impact_en": "Good CTA placement follows natural eye movement patterns.",
      "fix_suggestion_nl": "Plaats CTA in de natuurlijke lees-en scanpaden (F/Z-patroon).",
      "fix_suggestion_en": "Place CTA in natural reading and scanning paths (F/Z pattern).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-010",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Concurreren secundaire CTAs niet met primaire?",
      "question_en": "Do secondary CTAs not compete with primary?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Concurrerende CTAs verdelen aandacht en reduceren conversies.",
      "business_impact_en": "Competing CTAs divide attention and reduce conversions.",
      "fix_suggestion_nl": "Maak primaire CTA prominent en secundaire CTA onderdrukt.",
      "fix_suggestion_en": "Make primary CTA prominent and secondary CTA subdued.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-011",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Wordt CTA herhaald op logische punten?",
      "question_en": "Is CTA repeated at logical points?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Herhaalde CTAs vergroten kansen op conversie.",
      "business_impact_en": "Repeated CTAs increase chances of conversion.",
      "fix_suggestion_nl": "Voeg CTA toe na proof sections, aanbevelingen en aan pagina einde.",
      "fix_suggestion_en": "Add CTA after proof sections, testimonials, and at page end.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-012",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "cta",
      "question_nl": "Is er sticky CTA op mobiel voor lange paginas?",
      "question_en": "Is there sticky CTA on mobile for long pages?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Sticky CTAs op mobiel verhogen conversies aanzienlijk.",
      "business_impact_en": "Sticky CTAs on mobile significantly increase conversions.",
      "fix_suggestion_nl": "Voeg sticky CTA footer toe voor mobiel.",
      "fix_suggestion_en": "Add sticky CTA footer for mobile.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "sticky-cta"
    },
    {
      "id": "cro-013",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "value-prop",
      "question_nl": "Is unique value proposition duidelijk op homepage?",
      "question_en": "Is unique value proposition clear on homepage?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Sterke waardepropositie is cruciaal voor conversie.",
      "business_impact_en": "Strong value proposition is crucial for conversion.",
      "fix_suggestion_nl": "Communiceer duidelijk wat product/service doet en waarom het anders is.",
      "fix_suggestion_en": "Clearly communicate what product/service does and why it's different.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-014",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "value-prop",
      "question_nl": "Communiceren benefits 'wat heb ik eraan'?",
      "question_en": "Do benefits communicate 'what's in it for me'?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Benefits-driven messaging is overtuigender dan features.",
      "business_impact_en": "Benefits-driven messaging is more persuasive than features.",
      "fix_suggestion_nl": "Transformeer features naar benefits door 'wat het voor gebruiker betekent' uit te leggen.",
      "fix_suggestion_en": "Transform features into benefits by explaining 'what it means for user'.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-015",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "value-prop",
      "question_nl": "Worden features naar benefits vertaald?",
      "question_en": "Are features translated to benefits?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Gebruikers willen weten wat het voor hen doet, niet wat het is.",
      "business_impact_en": "Users want to know what it does for them, not what it is.",
      "fix_suggestion_nl": "'24/7 support' → 'Never worry about problems at 3am'",
      "fix_suggestion_en": "'24/7 support' → 'Never worry about problems at 3am'",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-016",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "value-prop",
      "question_nl": "Zijn differentiators van concurrenten zichtbaar?",
      "question_en": "Are differentiators from competitors visible?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke differentiators helpen gebruikers juiste keuze te maken.",
      "business_impact_en": "Clear differentiators help users make the right choice.",
      "fix_suggestion_nl": "Toon wat je uniek maakt tegenover concurrenten.",
      "fix_suggestion_en": "Show what makes you unique versus competitors.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-017",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "value-prop",
      "question_nl": "Kommuniceert hero section kernwaarde direct?",
      "question_en": "Does hero section immediately convey core value?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Hero section bepaalt eerste indruk en bounce rate.",
      "business_impact_en": "Hero section determines first impression and bounce rate.",
      "fix_suggestion_nl": "Zorg dat kernwaarde duidelijk is in headline en visual.",
      "fix_suggestion_en": "Ensure core value is clear in headline and visual.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-018",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Wat is het aantal stappen in de conversie funnel?",
      "question_en": "What is the number of steps in the conversion funnel?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Minder funnelstappen = hogere conversiepercentages.",
      "business_impact_en": "Fewer funnel steps = higher conversion rates.",
      "fix_suggestion_nl": "Probeer het aantal stappen tot 3-4 te beperken.",
      "fix_suggestion_en": "Try to limit the number of steps to 3-4.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "funnel-steps"
    },
    {
      "id": "cro-019",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Hoeveel velden heeft het checkout/signup formulier?",
      "question_en": "How many fields does the checkout/signup form have?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Elk extra veld verhoogt dropout rate.",
      "business_impact_en": "Each extra field increases dropout rate.",
      "fix_suggestion_nl": "Beperk checkout velden tot essentieel minimum.",
      "fix_suggestion_en": "Limit checkout fields to essential minimum.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "checkout-fields"
    },
    {
      "id": "cro-020",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Zijn er duidelijke progres-indicatoren in funnel?",
      "question_en": "Are there clear progress indicators in the funnel?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Progress indicators reduceren abandonment door duidelijkheid.",
      "business_impact_en": "Progress indicators reduce abandonment through clarity.",
      "fix_suggestion_nl": "Voeg stap indicators toe (stap 1 van 3) aan checkout flow.",
      "fix_suggestion_en": "Add step indicators (Step 1 of 3) to checkout flow.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-021",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Zijn afleidingen in conversieflow geminimaliseerd?",
      "question_en": "Are distractions in conversion flow minimized?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Afleidingen in checkout verhogen abandonment rates.",
      "business_impact_en": "Distractions in checkout increase abandonment rates.",
      "fix_suggestion_nl": "Verwijder navigatiemenus, extra links en ads van checkout paginas.",
      "fix_suggestion_en": "Remove navigation menus, extra links, and ads from checkout pages.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-022",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Is er exit-intent of save-for-later optie?",
      "question_en": "Is there exit-intent or save-for-later option?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Exit-intent modals kunnen conversies redden.",
      "business_impact_en": "Exit-intent modals can save conversions.",
      "fix_suggestion_nl": "Toon exit-intent popup met aanbod/korting als gebruiker gaat verlaten.",
      "fix_suggestion_en": "Show exit-intent popup with offer/discount as user leaves.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-023",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Is er guest checkout optie (e-commerce)?",
      "question_en": "Is there guest checkout option (e-commerce)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Guest checkout verhoogt conversiepercentages aanzienlijk.",
      "business_impact_en": "Guest checkout significantly increases conversion rates.",
      "fix_suggestion_nl": "Bied guest checkout als optie zonder account te vereisen.",
      "fix_suggestion_en": "Offer guest checkout as option without requiring account.",
      "effort": "high",
      "applicable_to": [
        "e-commerce"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "guest-checkout"
    },
    {
      "id": "cro-024",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Is cross-sell/upsell plaatsing niet opdringerig?",
      "question_en": "Is cross-sell/upsell placement non-intrusive?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Opdringerige upsells verhogen abandonment rates.",
      "business_impact_en": "Intrusive upsells increase abandonment rates.",
      "fix_suggestion_nl": "Plaats upsells subtiel en zorg dat ze makkelijk te negeren zijn.",
      "fix_suggestion_en": "Place upsells subtly and ensure they're easy to skip.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-025",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "funnel",
      "question_nl": "Is post-conversie bevestiging en volgende stappen duidelijk?",
      "question_en": "Is post-conversion confirmation and next steps clear?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke confirmatie verhoogt gebruikerstevredenheid.",
      "business_impact_en": "Clear confirmation increases user satisfaction.",
      "fix_suggestion_nl": "Toon duidelijke bedankpagina met volgende stappen.",
      "fix_suggestion_en": "Show clear thank you page with next steps.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-026",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Zijn testimonials aanwezig op de site?",
      "question_en": "Are testimonials present on the site?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Testimonials vergroot vertrouwen en conversiepercentages.",
      "business_impact_en": "Testimonials increase trust and conversion rates.",
      "fix_suggestion_nl": "Voeg minstens 3-5 testimonials toe op homepage.",
      "fix_suggestion_en": "Add at least 3-5 testimonials on homepage.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "testimonial-count"
    },
    {
      "id": "cro-027",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Zijn klantenlogos/partner logos zichtbaar?",
      "question_en": "Are client logos/partner logos visible?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Client logos vergoten geloofwaardigheid en vertrouwen.",
      "business_impact_en": "Client logos increase credibility and trust.",
      "fix_suggestion_nl": "Voeg logo section toe met bekende klanten/partners.",
      "fix_suggestion_en": "Add logo section with well-known clients/partners.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "logo-section"
    },
    {
      "id": "cro-028",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Bevatten testimonials specifieke details?",
      "question_en": "Do testimonials include specific details?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Specifieke testimonials zijn geloofwaardiger dan generieke.",
      "business_impact_en": "Specific testimonials are more credible than generic ones.",
      "fix_suggestion_nl": "Testimonials moeten naam, bedrijf en resultaat bevatten.",
      "fix_suggestion_en": "Testimonials should include name, company, and result.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-029",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Is er third-party review integratie?",
      "question_en": "Is there third-party review integration?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Reviews van third-party platforms verhogen vertrouwen.",
      "business_impact_en": "Reviews from third-party platforms increase trust.",
      "fix_suggestion_nl": "Voeg Trustpilot, Google Reviews of andere review platforms in.",
      "fix_suggestion_en": "Add Trustpilot, Google Reviews, or other review platforms.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "review-integration"
    },
    {
      "id": "cro-030",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Zijn case studies of success stories aanwezig?",
      "question_en": "Are case studies or success stories present?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Case studies demonstreren werkelijke waarde en ROI.",
      "business_impact_en": "Case studies demonstrate real value and ROI.",
      "fix_suggestion_nl": "Publiceer minstens 2-3 case studies met resultaten.",
      "fix_suggestion_en": "Publish at least 2-3 case studies with results.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "case-study-count"
    },
    {
      "id": "cro-031",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "social-proof",
      "question_nl": "Wordt social media volgen/engagement getoond?",
      "question_en": "Is social media following/engagement shown?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Sociale bewijs van veel followers verhoogt vertrouwen.",
      "business_impact_en": "Social proof of many followers increases trust.",
      "fix_suggestion_nl": "Toon follower count of engagement metrics van social channels.",
      "fix_suggestion_en": "Display follower count or engagement metrics from social channels.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-032",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "forms-cro",
      "question_nl": "Is aantal formuliervelden geminimaliseerd?",
      "question_en": "Is form field count minimized?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Minder velden = hogere inzendingspercentages.",
      "business_impact_en": "Fewer fields = higher submission rates.",
      "fix_suggestion_nl": "Beperk tot 3-5 essentiële velden voor initiatieve inzendingen.",
      "fix_suggestion_en": "Limit to 3-5 essential fields for initial submissions.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "form-field-count"
    },
    {
      "id": "cro-033",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "forms-cro",
      "question_nl": "Gebruikt lange formulieren multi-stap aanpak?",
      "question_en": "Do long forms use multi-step approach?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Multi-stap formulieren voelen minder overweldigend.",
      "business_impact_en": "Multi-step forms feel less overwhelming.",
      "fix_suggestion_nl": "Verdeel lange formulieren in logische stappen.",
      "fix_suggestion_en": "Split long forms into logical steps.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "form-steps"
    },
    {
      "id": "cro-034",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "forms-cro",
      "question_nl": "Zijn formulier labels en instructies duidelijk?",
      "question_en": "Are form labels and instructions clear?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke labels reduceren errors en frustratie.",
      "business_impact_en": "Clear labels reduce errors and frustration.",
      "fix_suggestion_nl": "Zorg dat elke veld duidelijk gelabeld en geinstrueerd is.",
      "fix_suggestion_en": "Ensure each field is clearly labeled and instructed.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cro-035",
      "legacy_id": null,
      "module": "cro-conversion",
      "subcategory": "forms-cro",
      "question_nl": "Vermindert formulier smart defaults gebruikersinput?",
      "question_en": "Do smart defaults reduce user input?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Smart defaults versnellen formulierinvulling.",
      "business_impact_en": "Smart defaults speed up form completion.",
      "fix_suggestion_nl": "Zet automatisch land/taal en voeg autocomplete toe.",
      "fix_suggestion_en": "Auto-set country/language and add autocomplete.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "content": [
    {
      "id": "cont-001",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Wat is de Flesch-Kincaid leesbaarheidscore?",
      "question_en": "What is the Flesch-Kincaid readability score?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Slechte leesbaarheid vermindert engagement en begrip.",
      "business_impact_en": "Poor readability decreases engagement and comprehension.",
      "fix_suggestion_nl": "Streef naar score tussen 60-70 voor gemiddelde publiek.",
      "fix_suggestion_en": "Aim for score between 60-70 for average audience.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_rule": "flesch-kincaid"
    },
    {
      "id": "cont-002",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Wat is de gemiddelde zinlengte?",
      "question_en": "What is the average sentence length?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Lange zinnen zijn moeilijker te lezen.",
      "business_impact_en": "Long sentences are harder to read.",
      "fix_suggestion_nl": "Hou zinnen onder de 15-20 woorden gemiddeld.",
      "fix_suggestion_en": "Keep sentences under 15-20 words on average.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_rule": "sentence-length"
    },
    {
      "id": "cont-003",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Wat is de paragraaflengte?",
      "question_en": "What is the paragraph length?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Lange paragrafen verminderen scanbaarheid.",
      "business_impact_en": "Long paragraphs reduce scannability.",
      "fix_suggestion_nl": "Hou paragrafen beperkt tot 4-5 zinnen maximum.",
      "fix_suggestion_en": "Keep paragraphs limited to 4-5 sentences maximum.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_rule": "paragraph-length"
    },
    {
      "id": "cont-004",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Is het gebruik van passieve vorm geminimaliseerd?",
      "question_en": "Is passive voice usage minimized?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Passieve stem maakt tekst zwakker en minder duidelijk.",
      "business_impact_en": "Passive voice makes text weaker and less clear.",
      "fix_suggestion_nl": "Vervang passieve zinnen door actieve, bijv. 'Het systeem analyseert' ipv 'Analyse is uitgevoerd'.",
      "fix_suggestion_en": "Replace passive sentences with active, e.g., 'The system analyzes' instead of 'Analysis was performed'.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_metric": "passive-voice"
    },
    {
      "id": "cont-005",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Is jargon en complexe woordkeuze geminimaliseerd?",
      "question_en": "Is jargon and complex word choice minimized?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Jargon versnelt publiek en vermindert begrip.",
      "business_impact_en": "Jargon alienates audience and reduces comprehension.",
      "fix_suggestion_nl": "Vervang technische termen door eenvoudige taal.",
      "fix_suggestion_en": "Replace technical terms with simple language.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_metric": "jargon-detection"
    },
    {
      "id": "cont-006",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Is het geschreven voor het doelpubliek niveau?",
      "question_en": "Is it written for the target audience level?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onjuist audientiesniveau leidt tot mislukking van betrokkenheid.",
      "business_impact_en": "Wrong audience level leads to engagement failure.",
      "fix_suggestion_nl": "Onderzoek doelpubliek en schrijf op passend niveau.",
      "fix_suggestion_en": "Research target audience and write at appropriate level.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-007",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Matching toon van stem met merk persoonlijkheid?",
      "question_en": "Does tone of voice match brand personality?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Inconsistente toon verstoort merk identiteit.",
      "business_impact_en": "Inconsistent tone disrupts brand identity.",
      "fix_suggestion_nl": "Definieer brand voice richtlijnen en volg consistent.",
      "fix_suggestion_en": "Define brand voice guidelines and follow consistently.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-008",
      "legacy_id": null,
      "module": "content",
      "subcategory": "readability",
      "question_nl": "Gebruikt inhoud duidelijke, directe taal?",
      "question_en": "Does content use clear, direct language?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke taal verbetert begrip en vertrouwen.",
      "business_impact_en": "Clear language improves comprehension and trust.",
      "fix_suggestion_nl": "Vermijd omslachtige fraseringen en wees zo concreet mogelijk.",
      "fix_suggestion_en": "Avoid wordy phrases and be as concrete as possible.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-009",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Voldoet woordaantal aan onderwerp vereisten?",
      "question_en": "Does word count meet topic requirements?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Onvoldoende inhoud beantwoordt vragen niet volledig.",
      "business_impact_en": "Insufficient content doesn't fully answer questions.",
      "fix_suggestion_nl": "Streef naar minstens 1500+ woorden voor diepte onderwerpen.",
      "fix_suggestion_en": "Aim for at least 1500+ words for in-depth topics.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "word-count"
    },
    {
      "id": "cont-010",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Is onderwerpdekkking volledig?",
      "question_en": "Is topic coverage complete?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Onvolledig coverage misleidt gebruikers.",
      "business_impact_en": "Incomplete coverage misleads users.",
      "fix_suggestion_nl": "Controleer dat alle belangrijke aspecten van onderwerp zijn behandeld.",
      "fix_suggestion_en": "Verify that all important aspects of topic are covered.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_metric": "topic-coverage"
    },
    {
      "id": "cont-011",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Is inhoud uniek of gedupliceerd?",
      "question_en": "Is content unique or duplicated?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Gerproduce inhoud schaadt SEO en geloofwaardigheid.",
      "business_impact_en": "Reproduced content harms SEO and credibility.",
      "fix_suggestion_nl": "Zorg voor 100% unieke inhoud, niet gekopieerd van andere bronnen.",
      "fix_suggestion_en": "Ensure 100% unique content, not copied from other sources.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "content-uniqueness"
    },
    {
      "id": "cont-012",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Beantwoordt inhoud primaire gebruikersvraag?",
      "question_en": "Does content answer primary user question?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Inhoud moet de hoofd vraag beantwoorden.",
      "business_impact_en": "Content must answer the main question.",
      "fix_suggestion_nl": "Identificeer en beantwoord directamente de kernvraag gebruikers.",
      "fix_suggestion_en": "Identify and directly answer the core user question.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-013",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Bevat inhoud ondersteunend bewijs/data?",
      "question_en": "Does content include supporting evidence/data?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Bewijs en data verhogen geloofwaardigheid.",
      "business_impact_en": "Evidence and data increase credibility.",
      "fix_suggestion_nl": "Voeg statistieken, onderzoeken en bronnen toe.",
      "fix_suggestion_en": "Add statistics, research, and sources.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-014",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Ondersteunt visuele inhoud de tekst?",
      "question_en": "Does visual content support the text?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Visuele inhoud verbetert begrip en betrokkenheid.",
      "business_impact_en": "Visual content improves understanding and engagement.",
      "fix_suggestion_nl": "Voeg relevante afbeeldingen, infografics en video toe.",
      "fix_suggestion_en": "Add relevant images, infographics, and video.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-015",
      "legacy_id": null,
      "module": "content",
      "subcategory": "depth",
      "question_nl": "Biedt inhoud origineel inzicht?",
      "question_en": "Does content offer original insights?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Origineel inzicht onderscheidt content van concurrentie.",
      "business_impact_en": "Original insights differentiate content from competition.",
      "fix_suggestion_nl": "Voeg eigen ervaring, onderzoek en unieke perspectief toe.",
      "fix_suggestion_en": "Add own experience, research, and unique perspective.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-016",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Is auteur informatie aanwezig op artikelen?",
      "question_en": "Is author information present on articles?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Auteur info vergroot vertrouwen en autoriteit.",
      "business_impact_en": "Author info increases trust and authority.",
      "fix_suggestion_nl": "Voeg auteur naam, foto en korte bio toe aan elk artikel.",
      "fix_suggestion_en": "Add author name, photo, and short bio to each article.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "author-info"
    },
    {
      "id": "cont-017",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Bevat auteur bio geloofwaardigheidsdetails?",
      "question_en": "Does author bio include credibility details?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Details over auteur autoriteit verhoogt artikel vertrouwen.",
      "business_impact_en": "Details about author authority increase article trust.",
      "fix_suggestion_nl": "Voeg relevante certificaten, ervaring en expertise toe.",
      "fix_suggestion_en": "Add relevant certifications, experience, and expertise.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "author-credentials"
    },
    {
      "id": "cont-018",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Wordt publicatie/update datum getoond?",
      "question_en": "Is publication/update date shown?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Datums tonen frisheid en relevantheid van inhoud.",
      "business_impact_en": "Dates show freshness and relevance of content.",
      "fix_suggestion_nl": "Voeg zowel publicatie als update datum toe.",
      "fix_suggestion_en": "Add both publication and update date.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "publication-date"
    },
    {
      "id": "cont-019",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Toont inhoud eerste-handsevaring?",
      "question_en": "Does content demonstrate first-hand experience?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Eerste-hands ervaring is overtuigender dan theoretisch.",
      "business_impact_en": "First-hand experience is more persuasive than theory.",
      "fix_suggestion_nl": "Voeg persoonlijke verhalen, case studies en praktische voorbeelden toe.",
      "fix_suggestion_en": "Include personal stories, case studies, and practical examples.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-020",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Zijn expert credentials zichtbaar voor YMYL onderwerpen?",
      "question_en": "Are expert credentials visible for YMYL topics?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "YMYL inhoud vereist duidelijke expert autoriteit.",
      "business_impact_en": "YMYL content requires clear expert authority.",
      "fix_suggestion_nl": "Toon professionele licenties, graden en certificering voor gezondheid/juridisch/financieel.",
      "fix_suggestion_en": "Show professional licenses, degrees, and certification for health/legal/financial.",
      "effort": "medium",
      "applicable_to": [
        "health",
        "legal",
        "financial"
      ]
    },
    {
      "id": "cont-021",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Zijn bronnen en referenties geciteerd?",
      "question_en": "Are sources and references cited?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Citaten vergoten vertrouwen en academische waarde.",
      "business_impact_en": "Citations increase trust and academic value.",
      "fix_suggestion_nl": "Voeg properly formatted links naar alle gebruikte bronnen toe.",
      "fix_suggestion_en": "Add properly formatted links to all sources used.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-022",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Sluit inhoud aan bij gevestigde expertise?",
      "question_en": "Does content align with established expertise?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Inhoud moet consistent zijn met bekende experts.",
      "business_impact_en": "Content must be consistent with known experts.",
      "fix_suggestion_nl": "Verify informatie tegen industry standards en expert opinions.",
      "fix_suggestion_en": "Verify information against industry standards and expert opinions.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-023",
      "legacy_id": null,
      "module": "content",
      "subcategory": "eeat",
      "question_nl": "Zijn brand autoriteit signalen aanwezig?",
      "question_en": "Are brand authority signals present?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Autoriteit signalen verhogen brand vertrouwen.",
      "business_impact_en": "Authority signals increase brand trust.",
      "fix_suggestion_nl": "Toon awards, certificering, media mentions en industrie erkenning.",
      "fix_suggestion_en": "Show awards, certifications, media mentions, and industry recognition.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-024",
      "legacy_id": null,
      "module": "content",
      "subcategory": "freshness",
      "question_nl": "Is laatst gewijzigde datum binnen 12 maanden?",
      "question_en": "Is last modified date within 12 months?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Oude inhoud rangschikt lager in zoekresultaten.",
      "business_impact_en": "Old content ranks lower in search results.",
      "fix_suggestion_nl": "Update inhoud regelmatig of markeer als geverifieerd recent.",
      "fix_suggestion_en": "Update content regularly or mark as recently verified.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "content-freshness"
    },
    {
      "id": "cont-025",
      "legacy_id": null,
      "module": "content",
      "subcategory": "freshness",
      "question_nl": "Zijn publicatie datums aanwezig?",
      "question_en": "Are publication dates present?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Datums helpen gebruikers frisheid beoordelen.",
      "business_impact_en": "Dates help users judge freshness.",
      "fix_suggestion_nl": "Voeg duidelijk zichtbare publicatie en update datums toe.",
      "fix_suggestion_en": "Add clearly visible publication and update dates.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "date-visibility"
    },
    {
      "id": "cont-026",
      "legacy_id": null,
      "module": "content",
      "subcategory": "freshness",
      "question_nl": "Bevat geen verouderde statistieken?",
      "question_en": "Does not contain outdated statistics?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Verouderde data schaadt geloofwaardigheid.",
      "business_impact_en": "Outdated data harms credibility.",
      "fix_suggestion_nl": "Controleer alle statistieken en vervang verouderde data.",
      "fix_suggestion_en": "Check all statistics and replace outdated data.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "nlp",
      "auto_metric": "outdated-content"
    },
    {
      "id": "cont-027",
      "legacy_id": null,
      "module": "content",
      "subcategory": "freshness",
      "question_nl": "Weerspiegelt inhoud huidige industrie standaarden?",
      "question_en": "Does content reflect current industry standards?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Inhoud moet relevant blijven in veranderende velden.",
      "business_impact_en": "Content must stay relevant in changing fields.",
      "fix_suggestion_nl": "Update inhoud wanneer industrietrends veranderen.",
      "fix_suggestion_en": "Update content as industry trends change.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-028",
      "legacy_id": null,
      "module": "content",
      "subcategory": "freshness",
      "question_nl": "Zijn seizoens/tijd-gevoelige inhoud bijgewerkt?",
      "question_en": "Is seasonal/time-sensitive content updated?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Verouderde seizoens inhoud misleidt gebruikers.",
      "business_impact_en": "Outdated seasonal content misleads users.",
      "fix_suggestion_nl": "Update seizoensinhoud regelmatig elk jaar.",
      "fix_suggestion_en": "Update seasonal content regularly each year.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-029",
      "legacy_id": null,
      "module": "content",
      "subcategory": "freshness",
      "question_nl": "Is blog/nieuws frequentie consistent?",
      "question_en": "Is blog/news posting frequency consistent?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Consistente posting verbetert betrokkenheid.",
      "business_impact_en": "Consistent posting improves engagement.",
      "fix_suggestion_nl": "Zet vast publicatie schema, bijv. 2x per week.",
      "fix_suggestion_en": "Set fixed publishing schedule, e.g., 2x per week.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-030",
      "legacy_id": null,
      "module": "content",
      "subcategory": "structure",
      "question_nl": "Gebruikt inhoud proper heading structuur?",
      "question_en": "Does content use proper heading structure?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Goede heading structuur verbetert SEO en scanbaarheid.",
      "business_impact_en": "Good heading structure improves SEO and scannability.",
      "fix_suggestion_nl": "Zorg voor H1, H2, H3 hiërarchie zonder gaten.",
      "fix_suggestion_en": "Ensure H1, H2, H3 hierarchy without gaps.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "content-headings"
    },
    {
      "id": "cont-031",
      "legacy_id": null,
      "module": "content",
      "subcategory": "structure",
      "question_nl": "Heeft lange artikel een inhoudsopgave?",
      "question_en": "Does long article have table of contents?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Inhoudsopgave verbetert navigatie en gebruikerservaring.",
      "business_impact_en": "Table of contents improves navigation and user experience.",
      "fix_suggestion_nl": "Voeg TOC toe voor artikelen langer dan 2000 woorden.",
      "fix_suggestion_en": "Add TOC for articles longer than 2000 words.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "toc-presence"
    },
    {
      "id": "cont-032",
      "legacy_id": null,
      "module": "content",
      "subcategory": "structure",
      "question_nl": "Gebruikt inhoud lijsten en opmaak effectief?",
      "question_en": "Does content use lists and formatting effectively?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Effectieve opmaak verbetert scanbaarheid.",
      "business_impact_en": "Effective formatting improves scannability.",
      "fix_suggestion_nl": "Gebruik bullet points, nummers, bold en subkopjes.",
      "fix_suggestion_en": "Use bullet points, numbers, bold, and subheadings.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "content-formatting"
    },
    {
      "id": "cont-033",
      "legacy_id": null,
      "module": "content",
      "subcategory": "structure",
      "question_nl": "Volgt inhoud logische flow?",
      "question_en": "Does content follow logical flow?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Logische flow verbetert begrip en retentie.",
      "business_impact_en": "Logical flow improves comprehension and retention.",
      "fix_suggestion_nl": "Volg intro → body → conclusie structuur.",
      "fix_suggestion_en": "Follow introduction → body → conclusion structure.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-034",
      "legacy_id": null,
      "module": "content",
      "subcategory": "structure",
      "question_nl": "Bevat duidelijke samenvattingen of kernpunten?",
      "question_en": "Does content include clear summaries or key takeaways?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Samenvattingen helpen gebruikers kernideeën onthouden.",
      "business_impact_en": "Summaries help users remember key ideas.",
      "fix_suggestion_nl": "Voeg samenvatting of kernpunten aan het einde toe.",
      "fix_suggestion_en": "Add summary or key takeaways at the end.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "cont-035",
      "legacy_id": null,
      "module": "content",
      "subcategory": "structure",
      "question_nl": "Is inhoud scanbaar met gemarkeerde punten?",
      "question_en": "Is content scannable with highlighted key points?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Scanbaarheid verbetert gebruikerservaring aanzienlijk.",
      "business_impact_en": "Scannability significantly improves user experience.",
      "fix_suggestion_nl": "Gebruik bold, pull quotes en call-out boxes.",
      "fix_suggestion_en": "Use bold, pull quotes, and call-out boxes.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "security": [
    {
      "id": "sec-001",
      "legacy_id": null,
      "module": "security",
      "subcategory": "ssl",
      "question_nl": "HTTPS wordt afgedwongen met HTTP redirects?",
      "question_en": "Is HTTPS enforced with HTTP redirects?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "HTTP traffic is onversleuteld. HTTPS-dwang beschermt gebruikersgegevens.",
      "business_impact_en": "HTTP traffic is unencrypted. HTTPS enforcement protects user data.",
      "fix_suggestion_nl": "Server configuratie: HTTP→HTTPS redirect, HSTS header met lange TTL.",
      "fix_suggestion_en": "Server configuration: HTTP→HTTPS redirect, HSTS header with long TTL.",
      "auto_tool": "custom",
      "auto_rule": "https-redirect",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-002",
      "legacy_id": null,
      "module": "security",
      "subcategory": "ssl",
      "question_nl": "SSL certificaat is geldig?",
      "question_en": "Is SSL certificate valid?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Ongeldig certificaat veroorzaakt browser waarschuwingen. Vertrouwen verloren.",
      "business_impact_en": "Invalid certificate causes browser warnings. Trust lost.",
      "fix_suggestion_nl": "Hernieuw certificaat via CA (Let's Encrypt, Comodo), check expiry datum.",
      "fix_suggestion_en": "Renew certificate via CA (Let's Encrypt, Comodo), check expiry date.",
      "auto_tool": "ssl-labs",
      "auto_rule": "cert-valid",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-003",
      "legacy_id": null,
      "module": "security",
      "subcategory": "ssl",
      "question_nl": "Correct SSL/TLS version?",
      "question_en": "Is correct SSL/TLS version used?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Zwakke TLS versies zijn kwetsbaar. TLS 1.2+ minimaal nodig.",
      "business_impact_en": "Weak TLS versions are vulnerable. TLS 1.2+ minimum required.",
      "fix_suggestion_nl": "Disable SSL 3.0-TLS 1.1, enable TLS 1.2+, prioriteer TLS 1.3.",
      "fix_suggestion_en": "Disable SSL 3.0-TLS 1.1, enable TLS 1.2+, prioritize TLS 1.3.",
      "auto_tool": "ssl-labs",
      "auto_rule": "tls-version",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-004",
      "legacy_id": null,
      "module": "security",
      "subcategory": "ssl",
      "question_nl": "Mixed content aanwezig?",
      "question_en": "Is mixed content present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Mixed content (HTTP assets op HTTPS) is kwetsbaar voor attacks.",
      "business_impact_en": "Mixed content (HTTP assets on HTTPS) vulnerable to attacks.",
      "fix_suggestion_nl": "Alle assets via HTTPS laden, externe resources audit.",
      "fix_suggestion_en": "Load all assets via HTTPS, audit external resources.",
      "auto_tool": "lighthouse",
      "auto_rule": "is-on-https",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-005",
      "legacy_id": null,
      "module": "security",
      "subcategory": "ssl",
      "question_nl": "HSTS header geconfigureerd?",
      "question_en": "Is HSTS header configured?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "HSTS voorkomt downgrade attacks. Browser enforced HTTPS automatisch.",
      "business_impact_en": "HSTS prevents downgrade attacks. Browser enforces HTTPS automatically.",
      "fix_suggestion_nl": "Add Strict-Transport-Security header, min 1 jaar TTL, includeSubdomains.",
      "fix_suggestion_en": "Add Strict-Transport-Security header, min 1 year TTL, includeSubdomains.",
      "auto_tool": "mozilla-observatory",
      "auto_metric": "hsts-header",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-006",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "Content-Security-Policy header aanwezig?",
      "question_en": "Is Content-Security-Policy header present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "CSP voorkomt XSS attacks. Essentieel tegen code injection.",
      "business_impact_en": "CSP prevents XSS attacks. Essential against code injection.",
      "fix_suggestion_nl": "Definieer CSP policy, whitelist sources, nonce/hash voor inline scripts.",
      "fix_suggestion_en": "Define CSP policy, whitelist sources, nonce/hash for inline scripts.",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "csp",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-007",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "X-Frame-Options header gedefinieerd?",
      "question_en": "Is X-Frame-Options header defined?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "X-Frame-Options voorkomt clickjacking. Set DENY of SAMEORIGIN.",
      "business_impact_en": "X-Frame-Options prevents clickjacking. Set DENY or SAMEORIGIN.",
      "fix_suggestion_nl": "Add X-Frame-Options: SAMEORIGIN of DENY in response headers.",
      "fix_suggestion_en": "Add X-Frame-Options: SAMEORIGIN or DENY in response headers.",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "x-frame-options",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-008",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "X-Content-Type-Options gedefinieerd?",
      "question_en": "Is X-Content-Type-Options defined?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "X-Content-Type-Options: nosniff voorkomt MIME type sniffing attacks.",
      "business_impact_en": "X-Content-Type-Options: nosniff prevents MIME type sniffing attacks.",
      "fix_suggestion_nl": "Add X-Content-Type-Options: nosniff header.",
      "fix_suggestion_en": "Add X-Content-Type-Options: nosniff header.",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "x-content-type-options",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-009",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "Referrer-Policy header geconfigureerd?",
      "question_en": "Is Referrer-Policy header configured?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Referrer-Policy beschermt privacy. strict-origin-when-cross-origin advised.",
      "business_impact_en": "Referrer-Policy protects privacy. strict-origin-when-cross-origin advised.",
      "fix_suggestion_nl": "Set Referrer-Policy: strict-origin-when-cross-origin.",
      "fix_suggestion_en": "Set Referrer-Policy: strict-origin-when-cross-origin.",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "referrer-policy",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-010",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "Permissions-Policy header ingesteld?",
      "question_en": "Is Permissions-Policy header set?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Permissions-Policy beperkt API access. Voorkomt misbruik (camera, microphone).",
      "business_impact_en": "Permissions-Policy limits API access. Prevents abuse (camera, microphone).",
      "fix_suggestion_nl": "Define Permissions-Policy, disable ongebruikte features, whitelist frames.",
      "fix_suggestion_en": "Define Permissions-Policy, disable unused features, whitelist frames.",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "permissions-policy",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-011",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "Strict-Transport-Security header?",
      "question_en": "Is Strict-Transport-Security header present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "HSTS header is kritiek. Browsers enforcer HTTPS na eerste bezoek.",
      "business_impact_en": "HSTS header is critical. Browsers enforce HTTPS after first visit.",
      "fix_suggestion_nl": "Add HSTS header met 1+ jaar TTL, preload list submission.",
      "fix_suggestion_en": "Add HSTS header with 1+ year TTL, preload list submission.",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "strict-transport-security",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-012",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "X-XSS-Protection header aanwezig?",
      "question_en": "Is X-XSS-Protection header present?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "X-XSS-Protection is legacy but biedt extra bescherming in oude browsers.",
      "business_impact_en": "X-XSS-Protection is legacy but provides extra protection in old browsers.",
      "fix_suggestion_nl": "Add X-XSS-Protection: 1; mode=block (legacy, CSP is beter).",
      "fix_suggestion_en": "Add X-XSS-Protection: 1; mode=block (legacy, CSP is better).",
      "auto_tool": "mozilla-observatory",
      "auto_rule": "x-xss-protection",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-013",
      "legacy_id": null,
      "module": "security",
      "subcategory": "headers",
      "question_nl": "Security headers algehele score hoog?",
      "question_en": "Is overall security headers score high?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Mozilla Observatory score reflecteert overall security posture.",
      "business_impact_en": "Mozilla Observatory score reflects overall security posture.",
      "fix_suggestion_nl": "Implement alle headers hierboven, aim for A/B rating.",
      "fix_suggestion_en": "Implement all headers above, aim for A/B rating.",
      "auto_tool": "mozilla-observatory",
      "auto_metric": "observatory-grade",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-014",
      "legacy_id": null,
      "module": "security",
      "subcategory": "vulnerabilities",
      "question_nl": "Geen bekende kwetsbare JavaScript biblioteken?",
      "question_en": "Are no known vulnerable JavaScript libraries present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Kwetsbare libraries zijn directe beveiligingsrisico. Update nodig.",
      "business_impact_en": "Vulnerable libraries are direct security risk. Update required.",
      "fix_suggestion_nl": "Audit dependencies (npm audit, Snyk), update libraries, remove outdated.",
      "fix_suggestion_en": "Audit dependencies (npm audit, Snyk), update libraries, remove outdated.",
      "auto_tool": "lighthouse",
      "auto_rule": "no-vulnerable-libraries",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-015",
      "legacy_id": null,
      "module": "security",
      "subcategory": "vulnerabilities",
      "question_nl": "Site veilig volgens Google Safe Browsing?",
      "question_en": "Is site safe according to Google Safe Browsing?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Safe Browsing flag = waarschuwing in browsers. Verkeer daalt drastisch.",
      "business_impact_en": "Safe Browsing flag = warning in browsers. Traffic drops drastically.",
      "fix_suggestion_nl": "Remove malware, request review via Search Console, comply dengan richtlijnen.",
      "fix_suggestion_en": "Remove malware, request review via Search Console, comply with guidelines.",
      "auto_tool": "google-safe-browsing",
      "auto_rule": "safe-browsing",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-016",
      "legacy_id": null,
      "module": "security",
      "subcategory": "vulnerabilities",
      "question_nl": "Gevoelige bestanden geëxponeerd (robots.txt, .env, .git)?",
      "question_en": "Are sensitive files exposed (robots.txt, .env, .git)?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Exposed files leaken credentials, source code, config. Directe impact.",
      "business_impact_en": "Exposed files leak credentials, source code, config. Direct impact.",
      "fix_suggestion_nl": "Prevent directory listing, block .env/.git in .htaccess, audit public files.",
      "fix_suggestion_en": "Prevent directory listing, block .env/.git in .htaccess, audit public files.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-017",
      "legacy_id": null,
      "module": "security",
      "subcategory": "vulnerabilities",
      "question_nl": "Input sanitizatie en XSS preventie geïmplementeerd?",
      "question_en": "Is input sanitization and XSS prevention implemented?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "XSS attacks stelen cookies, sessions, persoonlijke data. Kritiek.",
      "business_impact_en": "XSS attacks steal cookies, sessions, personal data. Critical.",
      "fix_suggestion_nl": "Sanitize alle user input, escape output, use HTML sanitization libs.",
      "fix_suggestion_en": "Sanitize all user input, escape output, use HTML sanitization libs.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "sec-018",
      "legacy_id": null,
      "module": "security",
      "subcategory": "vulnerabilities",
      "question_nl": "CSRF bescherming op formulieren?",
      "question_en": "Is CSRF protection on forms?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "CSRF attacks forceer onbevoegde acties. Token-based protection essentieel.",
      "business_impact_en": "CSRF attacks force unauthorized actions. Token-based protection essential.",
      "fix_suggestion_nl": "Implement CSRF tokens, SameSite cookies, double-submit pattern.",
      "fix_suggestion_en": "Implement CSRF tokens, SameSite cookies, double-submit pattern.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "trust": [
    {
      "id": "trust-001",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Zijn testimonials aanwezig op de belangrijkste pagina's?",
      "question_en": "Are testimonials present on key pages?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Testimonials verhogen de geloofwaardigheid en vertrouwen van bezoekers aanzienlijk.",
      "business_impact_en": "Testimonials significantly increase visitor credibility and trust.",
      "fix_suggestion_nl": "Voeg testimonials toe aan homepage, services pagina en landing pages met foto's en namen.",
      "fix_suggestion_en": "Add testimonials to homepage, services page, and landing pages with photos and names.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "testimonials-on-key-pages"
    },
    {
      "id": "trust-002",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Is er een sectie met client logo's aanwezig?",
      "question_en": "Is there a client logos section present?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Client logo's tonen welke bekende bedrijven je al gebruikt hebben, wat vertrouwen opbouwt.",
      "business_impact_en": "Client logos show which known companies have already used you, building trust.",
      "fix_suggestion_nl": "Maak een 'Vertrouwd door' sectie met logo's van grote clients op homepage of services pagina.",
      "fix_suggestion_en": "Create a 'Trusted by' section with logos of major clients on homepage or services page.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "client-logos-section"
    },
    {
      "id": "trust-003",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Bevatten testimonials volledige namen, bedrijfsnaam en foto's?",
      "question_en": "Do testimonials include full names, company, and photos?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Volledige informatie maakt testimonials geloofwaardiger en persoonlijker.",
      "business_impact_en": "Complete information makes testimonials more credible and personal.",
      "fix_suggestion_nl": "Update alle testimonials met volledige naam, bedrijfsrole en professionele foto van persoon.",
      "fix_suggestion_en": "Update all testimonials with full name, job title, and professional photo.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-004",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Zijn er case studies met meetbare resultaten aanwezig?",
      "question_en": "Are case studies with measurable results present?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Case studies met cijfers tonen concrete waarde en retourninvestering (ROI).",
      "business_impact_en": "Case studies with numbers demonstrate concrete value and return on investment (ROI).",
      "fix_suggestion_nl": "Schrijf 3-5 gedetailleerde case studies met voor/na statistieken, probleemstelling en oplossing.",
      "fix_suggestion_en": "Write 3-5 detailed case studies with before/after statistics, problem statement, and solution.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-005",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Worden social media volgeraantallen weergegeven?",
      "question_en": "Are social media follower counts displayed?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Tonen van grote volgeraantallen bouwt sociale bewijskracht op.",
      "business_impact_en": "Displaying large follower counts builds social proof.",
      "fix_suggestion_nl": "Voeg widgets toe die live sociale volgeraantallen weergeven op relevant pages.",
      "fix_suggestion_en": "Add widgets that display live social follower counts on relevant pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-006",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Zijn mediavermeldingen of perslogo's getoond?",
      "question_en": "Are media mentions or press logos shown?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Mediabekendheid versterkt professionaliteit en industriële erkenning.",
      "business_impact_en": "Media coverage reinforces professionalism and industry recognition.",
      "fix_suggestion_nl": "Voeg sectie toe met logo's van publicaties waar je in bent geweest.",
      "fix_suggestion_en": "Add section with logos of publications you've been featured in.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-007",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "social-proof",
      "question_nl": "Worden industriële awards of certificeringen weergegeven?",
      "question_en": "Are industry awards or certifications displayed?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Awards en certificeringen tonen expertise en naleving van industriestandaarden.",
      "business_impact_en": "Awards and certifications demonstrate expertise and industry compliance.",
      "fix_suggestion_nl": "Toon alle relevante certificeringen, awards en accreditaties op prominente plek.",
      "fix_suggestion_en": "Display all relevant certifications, awards, and accreditations prominently.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-008",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "contact",
      "question_nl": "Bestaat er een contactpagina en is deze gelinkt?",
      "question_en": "Does a contact page exist and is it linked?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Een gemakkelijk toegankelijke contactpagina is essentieel voor klantenkommunicatie.",
      "business_impact_en": "An easily accessible contact page is essential for customer communication.",
      "fix_suggestion_nl": "Maak een contactpagina aan met duidelijke navigatie en zet link in menu/footer.",
      "fix_suggestion_en": "Create a contact page with clear navigation and link in menu/footer.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "contact-page"
    },
    {
      "id": "trust-009",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "contact",
      "question_nl": "Is het telefoonnummer klikbaar (tel: link)?",
      "question_en": "Is the phone number clickable (tel: link)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Klikbare telefoonnummers vergemakkelijken direct contact op mobiele apparaten.",
      "business_impact_en": "Clickable phone numbers enable direct contact on mobile devices.",
      "fix_suggestion_nl": "Update alle telefoonnummers naar tel: links: <a href=\"tel:+31-6-12345678\">+31 6 12345678</a>",
      "fix_suggestion_en": "Update all phone numbers to tel: links: <a href=\"tel:+31-6-12345678\">+31 6 12345678</a>",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "tel-link"
    },
    {
      "id": "trust-010",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "contact",
      "question_nl": "Is er een e-mailadres aanwezig?",
      "question_en": "Is an email address present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Een beschikbaar e-mailadres is de standaard communicatieweg voor klanten.",
      "business_impact_en": "An available email address is the standard communication channel for customers.",
      "fix_suggestion_nl": "Voeg een e-mailadres toe en bescherm tegen spam met contactformulier of gecodeerde weergave.",
      "fix_suggestion_en": "Add an email address and protect against spam with contact form or encoded display.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "email-present"
    },
    {
      "id": "trust-011",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "contact",
      "question_nl": "Is het fysieke adres zichtbaar?",
      "question_en": "Is the physical address visible?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Een zichtbaar adres bouwt vertrouwen op en helpt bij lokale SEO.",
      "business_impact_en": "A visible address builds trust and helps with local SEO.",
      "fix_suggestion_nl": "Voeg volledige bedrijfsadres toe op contactpagina en in footer, inclusief landcode.",
      "fix_suggestion_en": "Add complete business address on contact page and in footer, including country code.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "physical-address-visible"
    },
    {
      "id": "trust-012",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "contact",
      "question_nl": "Zijn er meerdere contactkanalen beschikbaar?",
      "question_en": "Are multiple contact channels available (phone, email, chat, form)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Meerdere contactkanalen reduceren barrières en verbeteren klanttevredenheid.",
      "business_impact_en": "Multiple contact channels reduce barriers and improve customer satisfaction.",
      "fix_suggestion_nl": "Implementeer live chat, contactformulier, e-mail, telefoon en sociale media contactopties.",
      "fix_suggestion_en": "Implement live chat, contact form, email, phone, and social media contact options.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-013",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "contact",
      "question_nl": "Zijn contactgegevens consistent over alle pagina's?",
      "question_en": "Is contact information consistent across all pages?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Inconsistente gegevens verminderen vertrouwen en veroorzaken frustratie bij klanten.",
      "business_impact_en": "Inconsistent information reduces trust and causes customer frustration.",
      "fix_suggestion_nl": "Audit alle pagina's en zorg dat telefoon, e-mail en adres overal gelijk zijn.",
      "fix_suggestion_en": "Audit all pages and ensure phone, email, and address are the same everywhere.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-014",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "reviews",
      "question_nl": "Is er een widget voor derde-partij reviews aanwezig?",
      "question_en": "Is a third-party review widget present (Trustpilot, Google, etc.)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Derde-partij reviews zijn onafhankelijk en bouwen veel sterker vertrouwen op.",
      "business_impact_en": "Third-party reviews are independent and build much stronger trust.",
      "fix_suggestion_nl": "Integreer Trustpilot, Google Reviews of vergelijkbare widget op homepage.",
      "fix_suggestion_en": "Integrate Trustpilot, Google Reviews, or similar widget on homepage.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "review-widget-present"
    },
    {
      "id": "trust-015",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "reviews",
      "question_nl": "Is een review score/beoordeling zichtbaar?",
      "question_en": "Is review score/rating visible?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Een sterke rating (4.5+ sterren) overtuigt potentiële klanten aanzienlijk.",
      "business_impact_en": "A strong rating (4.5+ stars) significantly convinces potential customers.",
      "fix_suggestion_nl": "Zorg dat de rating prominent wordt weergegeven met ster-iconen op homepage.",
      "fix_suggestion_en": "Ensure the rating is displayed prominently with star icons on homepage.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "review-score-visible"
    },
    {
      "id": "trust-016",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "reviews",
      "question_nl": "Zijn reviews recent (binnen 6 maanden)?",
      "question_en": "Are reviews recent (within last 6 months)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Recente reviews tonen actieve inzet en blijvende kwaliteit.",
      "business_impact_en": "Recent reviews show active commitment and ongoing quality.",
      "fix_suggestion_nl": "Stimuleer actief klanten om reviews achter te laten door follow-up e-mails.",
      "fix_suggestion_en": "Actively encourage customers to leave reviews through follow-up emails.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-017",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "reviews",
      "question_nl": "Hebben negatieve reviews professionele reacties?",
      "question_en": "Do negative reviews have professional responses?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Professionele reacties op kritiek tonen integriteit en klantgericht beleid.",
      "business_impact_en": "Professional responses to criticism show integrity and customer-focused policies.",
      "fix_suggestion_nl": "Reageer op elke negatieve review binnen 48 uur met empathie en oplossingsgericht.",
      "fix_suggestion_en": "Respond to every negative review within 48 hours with empathy and solutions.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-018",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "reviews",
      "question_nl": "Is het aantal reviews voldoende voor geloofwaardigheid (10+)?",
      "question_en": "Is review quantity sufficient for credibility (10+)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Meer reviews (10+) verhogen statistisch vertrouwen en geloofwaardigheid.",
      "business_impact_en": "More reviews (10+) statistically increase trust and credibility.",
      "fix_suggestion_nl": "Verzamel reviews via e-mail campaigns en verhoog dit naar minstens 20-50.",
      "fix_suggestion_en": "Collect reviews via email campaigns and increase to at least 20-50.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-019",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "reviews",
      "question_nl": "Lijken reviews authentiek (niet op template)?",
      "question_en": "Do reviews appear authentic (not templated)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Authentieke reviews zijn veel geloofwaardiger dan standaard antwoorden.",
      "business_impact_en": "Authentic reviews are much more credible than generic responses.",
      "fix_suggestion_nl": "Verwijder verdachte reviews en moedig klanten aan specifieke details te delen.",
      "fix_suggestion_en": "Remove suspicious reviews and encourage customers to share specific details.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-020",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "professionalism",
      "question_nl": "Is de professionele ontwerpkwaliteit goed (geen gebroken layouts)?",
      "question_en": "Is professional design quality good (no broken layouts)?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Gebroken designs zien er onbetrouwbaar en onprofessioneel uit.",
      "business_impact_en": "Broken designs look untrustworthy and unprofessional.",
      "fix_suggestion_nl": "Test op alle devices en browsers, fix responsiveness problemen.",
      "fix_suggestion_en": "Test on all devices and browsers, fix responsiveness issues.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "design-quality-professional"
    },
    {
      "id": "trust-021",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "professionalism",
      "question_nl": "Geen placeholder of lorem ipsum inhoud aanwezig?",
      "question_en": "No placeholder/lorem ipsum content present?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Placeholder text geeft indruk van onafgemaakt en onprofessioneel project.",
      "business_impact_en": "Placeholder text gives impression of unfinished and unprofessional project.",
      "fix_suggestion_nl": "Scan alle pagina's op 'lorem ipsum' en vervang met echte content.",
      "fix_suggestion_en": "Scan all pages for 'lorem ipsum' and replace with real content.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "no-placeholder-content"
    },
    {
      "id": "trust-022",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "professionalism",
      "question_nl": "Vertelt about page een overtuigend bedrijfsverhaal?",
      "question_en": "Does about page tell a compelling company story?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Een goed verhaal creëert emotionele verbinding en onderscheiding.",
      "business_impact_en": "A good story creates emotional connection and differentiation.",
      "fix_suggestion_nl": "Schrijf about page met grondverhaal, missie, kernwaarden en mensenachter bedrijf.",
      "fix_suggestion_en": "Write about page with origin story, mission, values, and people behind company.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-023",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "professionalism",
      "question_nl": "Heeft team pagina echte foto's en bio's?",
      "question_en": "Does team page have real photos and bios?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Echte teamfoto's humaniseren bedrijf en bouwen persoonlijke verbinding op.",
      "business_impact_en": "Real team photos humanize company and build personal connection.",
      "fix_suggestion_nl": "Voeg professionele headshots en korte, persoonlijke bio's van elk teamlid toe.",
      "fix_suggestion_en": "Add professional headshots and short, personal bios for each team member.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-024",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "professionalism",
      "question_nl": "Professionele fotografie vs stock foto's?",
      "question_en": "Professional photography vs stock photos?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Professionele fotografie voelt autentieker en van hoger kwaliteit.",
      "business_impact_en": "Professional photography feels more authentic and higher quality.",
      "fix_suggestion_nl": "Vervang generieke stock foto's met bedrijfsspecifieke professionele fotografie.",
      "fix_suggestion_en": "Replace generic stock photos with company-specific professional photography.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "trust-025",
      "legacy_id": null,
      "module": "trust",
      "subcategory": "professionalism",
      "question_nl": "Consistent, gepolijst visueel design over alle pagina's?",
      "question_en": "Consistent, polished visual design across all pages?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistentie bouwt vertrouwen op en verhoogt merkherkenning.",
      "business_impact_en": "Consistency builds trust and improves brand recognition.",
      "fix_suggestion_nl": "Maak design system document en test alle pagina's op consistency.",
      "fix_suggestion_en": "Create design system document and test all pages for consistency.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "brand": [
    {
      "id": "brand-001",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Is het logo aanwezig op alle pagina's?",
      "question_en": "Is logo present on all pages?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Logo aanwezigheid op elke pagina is essentieel voor merkherkenning en navigatie.",
      "business_impact_en": "Logo presence on every page is essential for brand recognition and navigation.",
      "fix_suggestion_nl": "Voeg logo toe aan header template dat op alle pagina's automatisch verschijnt.",
      "fix_suggestion_en": "Add logo to header template that automatically appears on all pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "logo-present"
    },
    {
      "id": "brand-002",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Is kleurenpalet consistent (maximaal 3-5 merkleuren)?",
      "question_en": "Is color palette consistent (max 3-5 brand colors used)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Consistente kleuren versterken merkherkenning en professionaalheid.",
      "business_impact_en": "Consistent colors strengthen brand recognition and professionalism.",
      "fix_suggestion_nl": "Definieer primaire, secundaire en accent kleuren en creëer color style guide.",
      "fix_suggestion_en": "Define primary, secondary, and accent colors and create color style guide.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "color-palette-consistency"
    },
    {
      "id": "brand-003",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Is het logo van hoge kwaliteit (SVG of high-res)?",
      "question_en": "Is logo high quality (SVG or high-res)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Een scherp logo ziet er professioneel uit op alle formaten en schermgroottes.",
      "business_impact_en": "A crisp logo looks professional across all sizes and screen formats.",
      "fix_suggestion_nl": "Converteer logo naar SVG formaat of zorg voor 2x/3x PNG/WebP versies.",
      "fix_suggestion_en": "Convert logo to SVG format or provide 2x/3x PNG/WebP versions.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-004",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Linkt het logo naar homepage?",
      "question_en": "Does logo link to homepage?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Logo als homepage-link is UX-standaard en verbetert navigatie.",
      "business_impact_en": "Logo as homepage link is UX standard and improves navigation.",
      "fix_suggestion_nl": "Zorg dat logo een klikbare link is naar homepage op alle pagina's.",
      "fix_suggestion_en": "Ensure logo is a clickable link to homepage on all pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-005",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Komt kleurgebruik overeen met merkrichtlijnen?",
      "question_en": "Does color usage match brand guidelines?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistentie met merkrichtlijnen zorgt voor professional uiterlijk.",
      "business_impact_en": "Consistency with guidelines ensures professional appearance.",
      "fix_suggestion_nl": "Audit alle pagina's, vergelijk met brand guide, en corrigeer afwijkingen.",
      "fix_suggestion_en": "Audit all pages, compare with brand guide, and correct deviations.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-006",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Is visuele stijl consistent over alle pagina's?",
      "question_en": "Is visual style consistent across all pages?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Visuele consistentie bouwt merkherkenning op en voelt professioneel.",
      "business_impact_en": "Visual consistency builds brand recognition and feels professional.",
      "fix_suggestion_nl": "Maak design system aan en zorg dat alle elementen ervan volgen.",
      "fix_suggestion_en": "Create design system and ensure all elements follow it.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-007",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Is afbeeldingsstijl consistent (fotografie of illustratie)?",
      "question_en": "Is imagery style consistent (photography style, illustration style)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistente afbeeldingen versterken merkidentiteit en herkenning.",
      "business_impact_en": "Consistent imagery strengthens brand identity and recognition.",
      "fix_suggestion_nl": "Stel fotografie/illustratie stijl vast en pas alle afbeeldingen eraan aan.",
      "fix_suggestion_en": "Define photography/illustration style and adapt all images to match.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-008",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "visual-identity",
      "question_nl": "Sluit favicon aan bij merkidentiteit?",
      "question_en": "Does favicon match brand identity?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Favicon verhoogt merkherkenning in browser tabs en bookmarks.",
      "business_impact_en": "Favicon increases brand recognition in browser tabs and bookmarks.",
      "fix_suggestion_nl": "Maak favicon (16x16, 32x32, 180x180px) gebaseerd op logo of merk.",
      "fix_suggestion_en": "Create favicon (16x16, 32x32, 180x180px) based on logo or brand.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-009",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "typography",
      "question_nl": "Maximaal 3 lettertypefamilies gebruikt?",
      "question_en": "Maximum 3 font families used?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Te veel lettertypes zien er rommelig uit en laden langzaam.",
      "business_impact_en": "Too many fonts look cluttered and load slowly.",
      "fix_suggestion_nl": "Kies 1 serif/sans-serif display font en 1 voor body text.",
      "fix_suggestion_en": "Choose 1 serif/sans-serif display font and 1 for body text.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "font-count"
    },
    {
      "id": "brand-010",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "typography",
      "question_nl": "Volgen lettergroottes een consistente schaal?",
      "question_en": "Do font sizes follow a consistent scale?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Consistente schaal maakt typografie professioneel en leesbaar.",
      "business_impact_en": "Consistent scale makes typography professional and readable.",
      "fix_suggestion_nl": "Gebruik typografische schaal (1.25 of 1.5 multiplier) voor h1-h6 en body.",
      "fix_suggestion_en": "Use typographic scale (1.25 or 1.5 multiplier) for h1-h6 and body.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "font-scale-consistency"
    },
    {
      "id": "brand-011",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "typography",
      "question_nl": "Zijn regelafstanden consistent?",
      "question_en": "Are line heights consistent?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Juiste regelafstand verbetert leesbaarheid en ogen rust significant.",
      "business_impact_en": "Proper line height significantly improves readability and eye comfort.",
      "fix_suggestion_nl": "Zet line-height op 1.5 voor body, 1.2 voor headings, stel CSS in.",
      "fix_suggestion_en": "Set line-height to 1.5 for body, 1.2 for headings in CSS.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "line-height-consistency"
    },
    {
      "id": "brand-012",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "typography",
      "question_nl": "Komen lettertypekeuzes overeen met merkpersoonlijkheid?",
      "question_en": "Do font choices match brand personality?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Juiste lettertypen communiceren merkpersoonlijkheid en toon.",
      "business_impact_en": "Right fonts communicate brand personality and tone.",
      "fix_suggestion_nl": "Kies fonts die passen bij merk (moderni vs traditioneel, speels vs serieus).",
      "fix_suggestion_en": "Choose fonts that fit brand (modern vs traditional, playful vs serious).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-013",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "typography",
      "question_nl": "Maken lettertypewichten duidelijke hiërarchie?",
      "question_en": "Do font weights create clear hierarchy?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke gewicht-hiërarchie helpt gebruikers inhoud snel scannen.",
      "business_impact_en": "Clear weight hierarchy helps users quickly scan content.",
      "fix_suggestion_nl": "Gebruik thin/light voor accenten, regular voor body, bold voor headings.",
      "fix_suggestion_en": "Use thin/light for accents, regular for body, bold for headings.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-014",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "typography",
      "question_nl": "Is typografie leesbaar op alle apparaten?",
      "question_en": "Is typography readable across all devices?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onleesbare typografie frustreert gebruikers en verhoogt bounce rate.",
      "business_impact_en": "Unreadable typography frustrates users and increases bounce rate.",
      "fix_suggestion_nl": "Test op mobile (minstens 16px body), tablet en desktop, verhoog indien nodig.",
      "fix_suggestion_en": "Test on mobile (min 16px body), tablet, desktop, enlarge if needed.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-015",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Is een tagline/slogan duidelijk en memorabel?",
      "question_en": "Is tagline/slogan clear and memorable?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Een sterke tagline onderscheidt merk en blijft in geheugen hangen.",
      "business_impact_en": "A strong tagline differentiates brand and stays memorable.",
      "fix_suggestion_nl": "Schrijf 1-3 woord tagline die kernwaarde communiceert, test met doelgroep.",
      "fix_suggestion_en": "Write 1-3 word tagline communicating core value, test with audience.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-016",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Is merkstijl consistent over alle pagina's?",
      "question_en": "Is brand voice consistent across all pages?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistente toon bouwt merkvertrouwen op en voelt professioneel.",
      "business_impact_en": "Consistent voice builds brand trust and feels professional.",
      "fix_suggestion_nl": "Maak brand voice guide (formeel vs informeel, enthousiast vs zakelijk).",
      "fix_suggestion_en": "Create brand voice guide (formal vs informal, enthusiastic vs business).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-017",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Sluiten boodschappen aan bij merkspositionering?",
      "question_en": "Do key messages align with brand positioning?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Afgestemde boodschappen versterken merkpositionering en differentiatie.",
      "business_impact_en": "Aligned messages reinforce brand positioning and differentiation.",
      "fix_suggestion_nl": "Definieer kernboodschappen uit brand positioning en gebruik consistent.",
      "fix_suggestion_en": "Define core messages from brand positioning and use consistently.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-018",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Weerspiegelt microcopy merkpersoonlijkheid?",
      "question_en": "Does microcopy reflect brand personality?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Slimme microcopy verhoogt merkervaring en klantgenot.",
      "business_impact_en": "Clever microcopy enhances brand experience and customer delight.",
      "fix_suggestion_nl": "Voeg persoonlijkheid toe aan buttons, errors, tooltips (bijv: 'Oops!' i.p.v 'Error').",
      "fix_suggestion_en": "Add personality to buttons, errors, tooltips (e.g., 'Oops!' vs 'Error').",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-019",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Stemt call-to-action taal aan bij merktoon?",
      "question_en": "Does call-to-action language match brand tone?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistente CTA-taal voelt merkconsistent en effectief.",
      "business_impact_en": "Consistent CTA language feels brand-aligned and effective.",
      "fix_suggestion_nl": "Audit alle CTA's (knoptekst) op consistentie met merkstijl.",
      "fix_suggestion_en": "Audit all CTAs (button text) for consistency with brand voice.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-020",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Behouden foutmeldingen merkstijl?",
      "question_en": "Do error messages maintain brand voice?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Vriendelijke foutmeldingen verminderen frustratie en behouden merkervaring.",
      "business_impact_en": "Friendly error messages reduce frustration and maintain brand experience.",
      "fix_suggestion_nl": "Herschrijf foutmeldingen vriendelijk en behulpzaam in merktoon.",
      "fix_suggestion_en": "Rewrite error messages friendly and helpful in brand voice.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-021",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "messaging",
      "question_nl": "Zijn email/notification templates merkgebonden?",
      "question_en": "Are email/notification templates on-brand?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Merkgebonden communicatie versterkt merkervaring buiten website.",
      "business_impact_en": "On-brand communication strengthens brand experience outside website.",
      "fix_suggestion_nl": "Pas alle email templates aan naar merkstijl, kleuren, lettertypen en toon.",
      "fix_suggestion_en": "Adapt all email templates to match brand style, colors, fonts, and tone.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-022",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "design-system",
      "question_nl": "Zijn knopstijlen consistent?",
      "question_en": "Are button styles consistent?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Consistente knoppen zorgen voor voorspelbare en vertrouwenwekkende UX.",
      "business_impact_en": "Consistent buttons ensure predictable and trustworthy UX.",
      "fix_suggestion_nl": "Maak button design system (primair, secundair, danger, stijlen).",
      "fix_suggestion_en": "Create button design system (primary, secondary, danger, states).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "button-style-consistency"
    },
    {
      "id": "brand-023",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "design-system",
      "question_nl": "Volgt spacing system een consistent raster (8px of gelijksoortig)?",
      "question_en": "Does spacing system follow consistent grid (8px or similar)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Consistent spacing voelt ordelijk en schaal matig.",
      "business_impact_en": "Consistent spacing feels organized and harmonious.",
      "fix_suggestion_nl": "Zet spacing multiplier vast (8, 16, 24, 32px) en pas CSS aan.",
      "fix_suggestion_en": "Set spacing multiplier (8, 16, 24, 32px) and apply in CSS.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "spacing-system-consistency"
    },
    {
      "id": "brand-024",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "design-system",
      "question_nl": "Is iconostijl consistent?",
      "question_en": "Is icon style consistent?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Consistente iconostijl verhoogt recognitie en merkcohesie.",
      "business_impact_en": "Consistent icon style increases recognition and brand cohesion.",
      "fix_suggestion_nl": "Zorg dat alle icons dezelfde lijnt/gewicht/stijl hebben (bijv: 2px lijndikte).",
      "fix_suggestion_en": "Ensure all icons same stroke/weight/style (e.g., 2px line weight).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "icon-style-consistency"
    },
    {
      "id": "brand-025",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "design-system",
      "question_nl": "Lijkt componentenbibliotheca gebruikt?",
      "question_en": "Does component library appear to be used?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Component library zorgt voor schaal baarheid en consistentie.",
      "business_impact_en": "Component library ensures scalability and consistency.",
      "fix_suggestion_nl": "Implementeer component library (Figma, Storybook) voor alle UI elementen.",
      "fix_suggestion_en": "Implement component library (Figma, Storybook) for all UI elements.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-026",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "design-system",
      "question_nl": "Worden ontwerp patronen consistent hergebruikt?",
      "question_en": "Are design patterns reused consistently?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Hergebruikte patronen voelen vertrouwd en gebruiksvriendelijk.",
      "business_impact_en": "Reused patterns feel familiar and user-friendly.",
      "fix_suggestion_nl": "Documenteer herhaalde patronen en zorg dat team ze consistent toepast.",
      "fix_suggestion_en": "Document repeated patterns and ensure team applies consistently.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "brand-027",
      "legacy_id": null,
      "module": "brand",
      "subcategory": "design-system",
      "question_nl": "Zijn interactieve staten consistent (hover, focus, active)?",
      "question_en": "Are interactive states consistent (hover, focus, active)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistente staten geven duidelijke feedback en voelen professioneel.",
      "business_impact_en": "Consistent states provide clear feedback and feel professional.",
      "fix_suggestion_nl": "Definieer hover/focus/active stijlen voor alle interactive elementen.",
      "fix_suggestion_en": "Define hover/focus/active styles for all interactive elements.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "legal": [
    {
      "id": "legal-001",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Bestaat er een privacybeleidpagina?",
      "question_en": "Does privacy policy page exist?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Privacybeleid is wettelijk vereist onder GDPR en bouwt vertrouwen.",
      "business_impact_en": "Privacy policy is legally required under GDPR and builds trust.",
      "fix_suggestion_nl": "Maak privacybeleidpagina aan met alle vereiste GDPR secties.",
      "fix_suggestion_en": "Create privacy policy page with all required GDPR sections.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "privacy-page"
    },
    {
      "id": "legal-002",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Is privacybeleid gelinkt in footer?",
      "question_en": "Is privacy policy linked in footer?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Footer link maakt privacybeleid gemakkelijk toegankelijk voor alle bezoekers.",
      "business_impact_en": "Footer link makes privacy policy easily accessible to all visitors.",
      "fix_suggestion_nl": "Voeg privacybeleid link toe aan footer op alle pagina's.",
      "fix_suggestion_en": "Add privacy policy link to footer on all pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "privacy-link"
    },
    {
      "id": "legal-003",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Wordt doel van gegevensverwerking beschreven?",
      "question_en": "Is data processing purpose described?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Transparantie over doelen bouwt vertrouwen en is GDPR vereist.",
      "business_impact_en": "Transparency about purposes builds trust and is GDPR required.",
      "fix_suggestion_nl": "Beschrijf elke verwerkingsdoel duidelijk in privacybeleid.",
      "fix_suggestion_en": "Clearly describe each processing purpose in privacy policy.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "gdpr-processing-purpose"
    },
    {
      "id": "legal-004",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Worden rechten op toegang/verwijdering beschreven?",
      "question_en": "Is right to access/delete data described?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Dit zijn kernrechten onder GDPR; niet beschreven = juridisch risico.",
      "business_impact_en": "These are core GDPR rights; not describing = legal risk.",
      "fix_suggestion_nl": "Beschrijf GDPR rechten: toegang, rectificatie, verwijdering, beperking, overdracht.",
      "fix_suggestion_en": "Describe GDPR rights: access, rectification, deletion, restriction, portability.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-005",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Wordt gegevensbewaaringsperiode opgegeven?",
      "question_en": "Is data retention period specified?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Retentietermijn is GDPR vereist en beperkt juridisch risico.",
      "business_impact_en": "Retention period is GDPR required and limits legal risk.",
      "fix_suggestion_nl": "Voeg specifieke retentietermijnen toe per gegevenstype in privacybeleid.",
      "fix_suggestion_en": "Add specific retention periods per data type in privacy policy.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-006",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Wordt deling met derde partijen onthuld?",
      "question_en": "Is third-party data sharing disclosed?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Niet het onthullen van deling schend GDPR en breekt vertrouwen.",
      "business_impact_en": "Not disclosing sharing breaches GDPR and breaks trust.",
      "fix_suggestion_nl": "Beschrijf alle derde partijen die data ontvangen (analytics, CRM, etc).",
      "fix_suggestion_en": "Describe all third parties receiving data (analytics, CRM, etc).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-007",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "gdpr",
      "question_nl": "Contactgegevens DPO verschaft (indien vereist)?",
      "question_en": "Is DPO contact information provided (if required)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "DPO contactinfo vereist voor bepaalde organisaties onder GDPR.",
      "business_impact_en": "DPO contact required for certain organizations under GDPR.",
      "fix_suggestion_nl": "Voeg DPO e-mailadres toe in privacybeleid indien organisatie DPO nodig heeft.",
      "fix_suggestion_en": "Add DPO email in privacy policy if organization requires DPO.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-008",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Is een cookie banner aanwezig?",
      "question_en": "Is cookie banner present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Cookie banner is wettelijk vereist; niet aanwezig = forse GDPRboetes.",
      "business_impact_en": "Cookie banner legally required; absent = major GDPR fines.",
      "fix_suggestion_nl": "Implementeer compliant cookie banner (bijv: OneTrust, CookieBot).",
      "fix_suggestion_en": "Implement compliant cookie banner (e.g., OneTrust, Cookiebot).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "cookie-banner"
    },
    {
      "id": "legal-009",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Heeft cookie banner een afwijzingsoptie?",
      "question_en": "Does cookie banner have reject option?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Afwijzingsoptie is verplicht; alleen 'accepteren' = onwettig.",
      "business_impact_en": "Reject option mandatory; only 'accept' = illegal.",
      "fix_suggestion_nl": "Zorg dat afwijzingsknop even prominent is als accepteerknop.",
      "fix_suggestion_en": "Ensure reject button is equally prominent as accept button.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "cookie-reject"
    },
    {
      "id": "legal-010",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Worden geen cookies ingesteld vóór toestemming?",
      "question_en": "Are no cookies set before consent?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Cookies vóór toestemming is illegaal en oorzaak miljoenenfines.",
      "business_impact_en": "Cookies before consent is illegal and causes million-euro fines.",
      "fix_suggestion_nl": "Zorg dat alle non-essential cookies pas na toestemming worden ingesteld.",
      "fix_suggestion_en": "Ensure all non-essential cookies only set after consent.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "no-pre-consent-cookies"
    },
    {
      "id": "legal-011",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Worden cookie categorieën uitgelegd (nodig, analytics, marketing)?",
      "question_en": "Are cookie categories explained (necessary, analytics, marketing)?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Duidelijke categorieën helpen gebruikers bewuste keuzes maken.",
      "business_impact_en": "Clear categories help users make informed choices.",
      "fix_suggestion_nl": "Categoriseer en beschrijf cookies duidelijk in banner en policy.",
      "fix_suggestion_en": "Categorize and explain cookies clearly in banner and policy.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "cookie-categories-explained"
    },
    {
      "id": "legal-012",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Zijn granulaire toestemmingsopties beschikbaar?",
      "question_en": "Are granular consent options available?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Granulaire opties geven gebruikers controle en zijn GDPR best practice.",
      "business_impact_en": "Granular options give users control and are GDPR best practice.",
      "fix_suggestion_nl": "Zorg dat gebruikers per categorie kunnen kiezen (niet alles-of-niets).",
      "fix_suggestion_en": "Allow users to choose per category (not all-or-nothing).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "granular-consent-options"
    },
    {
      "id": "legal-013",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Is cookietoestemming omkeerbaar (voorkeuren wijzigen)?",
      "question_en": "Is cookie consent reversible (can change preferences later)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Omkeerbaarheid stelt gebruikers in staat keuzes later te wijzigen.",
      "business_impact_en": "Reversibility lets users change choices later.",
      "fix_suggestion_nl": "Voeg 'voorkeuren wijzigen' link toe in footer of account settings.",
      "fix_suggestion_en": "Add 'change preferences' link in footer or account settings.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-014",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "cookies",
      "question_nl": "Is cookiebeleid pagina compleet en actueel?",
      "question_en": "Is cookie policy page complete and up-to-date?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Instellingpagina moet alle cookies inventariseren en doeleinden uitleggen.",
      "business_impact_en": "Policy page must list all cookies and explain purposes.",
      "fix_suggestion_nl": "Maak gedetailleerd cookiebeleid met volledige cookie inventaris.",
      "fix_suggestion_en": "Create detailed cookie policy with complete cookie inventory.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-015",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "privacy",
      "question_nl": "Is SSL/HTTPS op alle formulierpagina's?",
      "question_en": "Is SSL/HTTPS on all pages with forms?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "HTTPS beschermt gevoelige data; geen HTTPS = kwetsbaarheid.",
      "business_impact_en": "HTTPS protects sensitive data; no HTTPS = vulnerability.",
      "fix_suggestion_nl": "Zorg dat alle formulierpagina's HTTPS gebruiken, setup SSL certificaat.",
      "fix_suggestion_en": "Ensure all form pages use HTTPS, set up SSL certificate.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "forms-https"
    },
    {
      "id": "legal-016",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "privacy",
      "question_nl": "Geen tracking van derde partij vóór toestemming?",
      "question_en": "Is there no third-party tracking before consent?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Ongeautoriseerde tracking schend privacy en GDPR.",
      "business_impact_en": "Unauthorized tracking violates privacy and GDPR.",
      "fix_suggestion_nl": "Zorg dat Google Analytics, Facebook pixel, etc. pas na toestemming laden.",
      "fix_suggestion_en": "Ensure Google Analytics, Facebook pixel, etc. load only after consent.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "no-third-party-tracking-pre-consent"
    },
    {
      "id": "legal-017",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "privacy",
      "question_nl": "Is formulier data inzending versleuteld?",
      "question_en": "Is form data submission encrypted?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Versleuteling beschermt gevoelige data zoals e-mail en telefoonnummers.",
      "business_impact_en": "Encryption protects sensitive data like email and phone numbers.",
      "fix_suggestion_nl": "Zorg HTTPS en implementeer end-to-end encryptie voor formulieren.",
      "fix_suggestion_en": "Ensure HTTPS and implement end-to-end encryption for forms.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "form-encryption"
    },
    {
      "id": "legal-018",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "privacy",
      "question_nl": "Dataminimalisatie (alleen nodig data verzameld)?",
      "question_en": "Is data minimization applied (only necessary data collected)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Minimalisering beperkt risico en respecteert privacybeginsel.",
      "business_impact_en": "Minimization limits risk and respects privacy principle.",
      "fix_suggestion_nl": "Verwijder overbodige formuliervelden; verzamel alleen essentiële gegevens.",
      "fix_suggestion_en": "Remove unnecessary form fields; collect only essential data.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-019",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "privacy",
      "question_nl": "Kinderenprivacy aangepakt indien van toepassing?",
      "question_en": "Is children's privacy addressed if applicable?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Kinderenprivacy vereist extra voorzorgen onder GDPR (COPPA ook in US).",
      "business_impact_en": "Children's privacy requires extra care under GDPR (also COPPA in US).",
      "fix_suggestion_nl": "Zorg parental consent voor data van kinderen <16 jaar.",
      "fix_suggestion_en": "Require parental consent for children's data <16 years old.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-020",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "privacy",
      "question_nl": "Internationale gegevensoverdracht onthuld (indien van toepassing)?",
      "question_en": "Are international data transfer disclosures present (if applicable)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Internationale overdracht vereist specifieke juridische gronden.",
      "business_impact_en": "International transfer requires specific legal grounds.",
      "fix_suggestion_nl": "Beschrijf internationale overdracht en gronden (SCC, adequaatheidsbesluiting).",
      "fix_suggestion_en": "Disclose international transfer and grounds (SCC, adequacy decision).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-021",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "eaa",
      "question_nl": "Voorbereiding op EAA beoordeling?",
      "question_en": "Is European Accessibility Act readiness assessed?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "EAA conformiteit wordt verplicht; voorbereiding nu vermindert risico.",
      "business_impact_en": "EAA compliance becomes mandatory; preparing now reduces risk.",
      "fix_suggestion_nl": "Voer EAA readiness audit uit; plan verbeteringen.",
      "fix_suggestion_en": "Conduct EAA readiness audit; plan improvements.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "eaa-readiness-assessment"
    },
    {
      "id": "legal-022",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "eaa",
      "question_nl": "Is toegankelijkheidsstelling gepubliceerd?",
      "question_en": "Is accessibility statement published?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Verklaring toont inzet voor inclusiviteit en WCAG conformiteit.",
      "business_impact_en": "Statement shows commitment to inclusion and WCAG compliance.",
      "fix_suggestion_nl": "Publiceer toegankelijkheidsverklaring met WCAG niveau en bekende problemen.",
      "fix_suggestion_en": "Publish accessibility statement with WCAG level and known issues.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-023",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "eaa",
      "question_nl": "Mechanisme voor toegankelijkheidsfeedback aanwezig?",
      "question_en": "Is accessibility feedback mechanism available?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Feedback mechanisme toont responsiviteit op inclusiviteitszaken.",
      "business_impact_en": "Feedback mechanism shows responsiveness to accessibility issues.",
      "fix_suggestion_nl": "Voeg contact optie toe voor toegankelijkheidsproblemen.",
      "fix_suggestion_en": "Add contact option for accessibility issues.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-024",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "eaa",
      "question_nl": "Beoordeling onevenredige bezwaring gedocumenteerd (indien gesteld)?",
      "question_en": "Is disproportionate burden assessment documented (if claimed)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Documentatie beschermt tegen juridische aanvechting.",
      "business_impact_en": "Documentation protects against legal challenge.",
      "fix_suggestion_nl": "Documenteer analyse van toegankelijkheidsproblemen en kostenimpact.",
      "fix_suggestion_en": "Document analysis of accessibility issues and cost impact.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-025",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "eaa",
      "question_nl": "Plan voor regelmatige toegankelijkheidscontrole aanwezig?",
      "question_en": "Is regular accessibility monitoring plan in place?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Regelmatige monitoring zorgt voor continue compliance.",
      "business_impact_en": "Regular monitoring ensures continuous compliance.",
      "fix_suggestion_nl": "Stel maandelijks/kwartaallijks toegankelijkheidsaudit in.",
      "fix_suggestion_en": "Set up monthly/quarterly accessibility audit.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-026",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "terms",
      "question_nl": "Bestaat terms and conditions pagina?",
      "question_en": "Does terms and conditions page exist?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "T&C's beschermen bedrijf juridisch en definiëren gebruiksrechten.",
      "business_impact_en": "T&Cs protect business legally and define usage rights.",
      "fix_suggestion_nl": "Maak uitgebreide T&C pagina met juridisch advies.",
      "fix_suggestion_en": "Create comprehensive T&C page with legal counsel.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "terms-page"
    },
    {
      "id": "legal-027",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "terms",
      "question_nl": "Zijn voorwaarden gelinkt in footer?",
      "question_en": "Are terms linked in footer?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Footer link maakt voorwaarden gemakkelijk toegankelijk.",
      "business_impact_en": "Footer link makes terms easily accessible.",
      "fix_suggestion_nl": "Voeg T&C link toe aan footer op alle pagina's.",
      "fix_suggestion_en": "Add T&C link to footer on all pages.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "terms-link"
    },
    {
      "id": "legal-028",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "terms",
      "question_nl": "Voorwaarden geschreven in begrijpelijk, duidelijk taal?",
      "question_en": "Are terms written in plain, understandable language?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke taal bouwt vertrouwen en vermindert juridische disputen.",
      "business_impact_en": "Clear language builds trust and reduces legal disputes.",
      "fix_suggestion_nl": "Herschrijf T&C's met kortere zinnen, opsommingen en helderheid.",
      "fix_suggestion_en": "Rewrite T&Cs with shorter sentences, bullet points, clarity.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-029",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "terms",
      "question_nl": "Retour/opzeggingsbeleid duidelijk vermeld?",
      "question_en": "Is refund/cancellation policy clearly stated?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijk beleid voorkomt klantenkwesties en wettelijke vereisten.",
      "business_impact_en": "Clear policy prevents customer issues and legal requirements.",
      "fix_suggestion_nl": "Beschrijf retour/opzeggingstermijnen, voorwaarden en procedure duidelijk.",
      "fix_suggestion_en": "Describe refund/cancellation terms, conditions, and procedure clearly.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "legal-030",
      "legacy_id": null,
      "module": "legal",
      "subcategory": "terms",
      "question_nl": "Disclaimer en beperking van aansprakelijkheid aanwezig?",
      "question_en": "Is disclaimer and limitation of liability present?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Disclaimer beperkt juridische blootstelling van bedrijf.",
      "business_impact_en": "Disclaimer limits business legal exposure.",
      "fix_suggestion_nl": "Voeg disclaimer en aansprakelijkheidsbeperkingen toe aan T&C's.",
      "fix_suggestion_en": "Add disclaimer and liability limitations to T&Cs.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "analytics": [
    {
      "id": "anl-001",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "ga4",
      "question_nl": "Is GA4 tag gedetecteerd?",
      "question_en": "Is GA4 tag detected?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "GA4 is essentieel voor het begrijpen van bezoekergedrag en conversies.",
      "business_impact_en": "GA4 is essential for understanding visitor behavior and conversions.",
      "fix_suggestion_nl": "Installeer GA4 tag via Google Tag Manager of direct in <head>.",
      "fix_suggestion_en": "Install GA4 tag via Google Tag Manager or directly in <head>.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "ga4-present"
    },
    {
      "id": "anl-002",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "ga4",
      "question_nl": "Is GA4 property ID correct formaat?",
      "question_en": "Is GA4 property ID correct format?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Foutieve ID zorgt dat data niet in GA4 terechtkomt.",
      "business_impact_en": "Wrong ID means data doesn't reach GA4.",
      "fix_suggestion_nl": "Zorg dat ID formaat G-XXXXXXXX is (11 karakters).",
      "fix_suggestion_en": "Ensure ID format is G-XXXXXXXX (11 characters).",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "ga4-id-valid"
    },
    {
      "id": "anl-003",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "ga4",
      "question_nl": "Zijn GA4 verbeterde metingen ingeschakeld?",
      "question_en": "Is GA4 enhanced measurement enabled?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Verbeterde metingen tracken automatisch klikken, scrollen, videoweergaves.",
      "business_impact_en": "Enhanced measurement automatically tracks clicks, scrolls, video plays.",
      "fix_suggestion_nl": "Activeer enhanced measurement in GA4 instellingen.",
      "fix_suggestion_en": "Enable enhanced measurement in GA4 settings.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "ga4-enhanced-measurement"
    },
    {
      "id": "anl-004",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "ga4",
      "question_nl": "Is GA4 data stream correct geconfigureerd?",
      "question_en": "Is GA4 data stream configured correctly?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Juiste configuratie zorgt dat alle data correct wordt verzameld.",
      "business_impact_en": "Correct configuration ensures all data is collected properly.",
      "fix_suggestion_nl": "Controleer data stream instellingen: platform, tijd zone, valuta.",
      "fix_suggestion_en": "Check data stream settings: platform, timezone, currency.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "ga4-data-stream-config"
    },
    {
      "id": "anl-005",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "ga4",
      "question_nl": "Is GA4 gegevensbewaring passend ingesteld?",
      "question_en": "Is GA4 data retention set appropriately?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Bewaring bepaalt hoe lang data beschikbaar blijft voor analyse.",
      "business_impact_en": "Retention determines how long data is available for analysis.",
      "fix_suggestion_nl": "Stel bewaring in op 14 maanden (standaard) of 2 of 4 maanden naar behoefte.",
      "fix_suggestion_en": "Set retention to 14 months (default) or 2/4 months as needed.",
      "effort": "low",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-006",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "ga4",
      "question_nl": "Is interne traffic gefilterd?",
      "question_en": "Is internal traffic filtered?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Interne traffic vervalst analysegegevens; filteren geeft zuivere inzichten.",
      "business_impact_en": "Internal traffic skews data; filtering gives pure insights.",
      "fix_suggestion_nl": "Stel filter in voor intern IP bereik van kantoor/VPN.",
      "fix_suggestion_en": "Set up filter for office/VPN internal IP range.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-007",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "tag-management",
      "question_nl": "Is Google Tag Manager gedetecteerd?",
      "question_en": "Is Google Tag Manager detected?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "GTM stelt onlinemarketing in staat om tags zonder code-wijzigingen in te stellen.",
      "business_impact_en": "GTM enables marketing to deploy tags without code changes.",
      "fix_suggestion_nl": "Installeer GTM container via snippets in <head> en <body>.",
      "fix_suggestion_en": "Install GTM container via snippets in <head> and <body>.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "gtm-present"
    },
    {
      "id": "anl-008",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "tag-management",
      "question_nl": "Stemt GTM container ID overeen met verwachting?",
      "question_en": "Does GTM container ID match expected?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Verkeerde GTM ID zorgt voor verkeerde tagorkestratie.",
      "business_impact_en": "Wrong GTM ID causes wrong tag orchestration.",
      "fix_suggestion_nl": "Zorg dat GTM ID (GT-XXXXXXX format) overeenkomt met verwachting.",
      "fix_suggestion_en": "Ensure GTM ID (GT-XXXXXXX format) matches expectation.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "gtm-id-valid"
    },
    {
      "id": "anl-009",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "tag-management",
      "question_nl": "Heeft GTM laden impact op prestaties?",
      "question_en": "Does GTM loading impact performance?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Slechte GTM prestaties vertragen site en verhogen bounce rate.",
      "business_impact_en": "Poor GTM performance slows site and increases bounce rate.",
      "fix_suggestion_nl": "Optimaliseer GTM door: async laden, tag-uitstel, tag-filtering.",
      "fix_suggestion_en": "Optimize GTM via: async loading, tag defer, tag filtering.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "gtm-performance-impact"
    },
    {
      "id": "anl-010",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "tag-management",
      "question_nl": "Is tag-vuurvolgorde geoptimaliseerd?",
      "question_en": "Is tag firing order optimized?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Foutieve volgorde kan pixels missen en conversies niet registreren.",
      "business_impact_en": "Wrong order can miss pixels and not register conversions.",
      "fix_suggestion_nl": "Zorg dat GA4 vóór pixels zit, en pixels vóór retargetingtags.",
      "fix_suggestion_en": "Ensure GA4 fires before pixels, pixels before retargeting tags.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-011",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "tag-management",
      "question_nl": "Zijn ongebruikte tags opgeruimd?",
      "question_en": "Are unused tags cleaned up?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Ongebruikte tags vertragen site en veroorzaken verwarring.",
      "business_impact_en": "Unused tags slow site and cause confusion.",
      "fix_suggestion_nl": "Controleer GTM en verwijder tags die niet meer nodig zijn.",
      "fix_suggestion_en": "Audit GTM and remove tags no longer needed.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-012",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "consent",
      "question_nl": "Consent Mode v2 geïmplementeerd?",
      "question_en": "Is Consent Mode v2 implemented?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Consent Mode v2 helpt cookies na-restrictie GDPR compliant af te handelen.",
      "business_impact_en": "Consent Mode v2 helps handle cookies post-restriction GDPR compliant.",
      "fix_suggestion_nl": "Implementeer Consent Mode v2 in GTM met granulaire cookie categorieën.",
      "fix_suggestion_en": "Implement Consent Mode v2 in GTM with granular cookie categories.",
      "effort": "high",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_rule": "consent-mode"
    },
    {
      "id": "anl-013",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "consent",
      "question_nl": "Analytics respecteert cookie toestemming?",
      "question_en": "Does analytics respect cookie consent?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Niet respecteren schend GDPR en kan miljoenenfines opleveren.",
      "business_impact_en": "Not respecting breaches GDPR and can incur million-euro fines.",
      "fix_suggestion_nl": "Zorg dat GA4 pas na analytics toestemming laadt.",
      "fix_suggestion_en": "Ensure GA4 loads only after analytics consent.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "analytics-respects-consent"
    },
    {
      "id": "anl-014",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "consent",
      "question_nl": "Marketing tags vuren alleen na toestemming?",
      "question_en": "Do marketing tags fire only after consent?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Marketing pixels zonder toestemming = GDPR schending.",
      "business_impact_en": "Marketing pixels without consent = GDPR violation.",
      "fix_suggestion_nl": "Verplichting marketing tags aan marketing toestemming in GTM.",
      "fix_suggestion_en": "Bind marketing tags to marketing consent in GTM.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "marketing-tags-post-consent"
    },
    {
      "id": "anl-015",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "consent",
      "question_nl": "Wordt toestemmingsstatus correct aan GA4 doorgegeven?",
      "question_en": "Is consent state correctly passed to GA4?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Foutieve staat betekent dat GA4 niet weet welke gegevens gebruikt mogen worden.",
      "business_impact_en": "Wrong state means GA4 doesn't know what data can be used.",
      "fix_suggestion_nl": "Zorg dat gtag.config() gconsentDefaultState correct bepaald.",
      "fix_suggestion_en": "Ensure gtag.config() sets gconsentDefaultState correctly.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-016",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "consent",
      "question_nl": "Cookieless meting geconfigureerd als fallback?",
      "question_en": "Is cookieless measurement configured as fallback?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Cookieless fallback helpt data verzamelen zonder cookies.",
      "business_impact_en": "Cookieless fallback helps collect data without cookies.",
      "fix_suggestion_nl": "Configureer GA4 cookieless meting als fallback.",
      "fix_suggestion_en": "Configure GA4 cookieless measurement as fallback.",
      "effort": "high",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-017",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "consent",
      "question_nl": "Toestemmingsbanner integratie getest op browsers?",
      "question_en": "Is consent banner integration tested across browsers?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Cross-browser testen zorgt dat consent correct werkt overal.",
      "business_impact_en": "Cross-browser testing ensures consent works correctly everywhere.",
      "fix_suggestion_nl": "Test consent banner en GA4 integratie op Chrome, Firefox, Safari, Edge.",
      "fix_suggestion_en": "Test consent banner and GA4 integration on Chrome, Firefox, Safari, Edge.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-018",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "events",
      "question_nl": "Zijn sleutelconversiegebeurtenissen traceerbaar?",
      "question_en": "Are key conversion events tracked (form submissions, purchases)?",
      "type": "semi-auto",
      "severity": "critical",
      "business_impact_nl": "Conversie tracking is essentieel voor ROI meting.",
      "business_impact_en": "Conversion tracking is essential for ROI measurement.",
      "fix_suggestion_nl": "Zet GA4 events in voor formulieronderzoeken, aankopen, aanmeldingen.",
      "fix_suggestion_en": "Set up GA4 events for form submissions, purchases, signups.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "key-conversion-events"
    },
    {
      "id": "anl-019",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "events",
      "question_nl": "Wordt scrolldiepte tracking ingeschakeld?",
      "question_en": "Is scroll depth tracking enabled?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Scroll tracking toont engagement diepte en contentgenot.",
      "business_impact_en": "Scroll tracking shows engagement depth and content enjoyment.",
      "fix_suggestion_nl": "Activeer GA4 enhanced scroll tracking.",
      "fix_suggestion_en": "Enable GA4 enhanced scroll tracking.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "scroll-depth-tracking"
    },
    {
      "id": "anl-020",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "events",
      "question_nl": "Worden uitgaande linkkliks traceerbaar?",
      "question_en": "Are outbound link clicks tracked?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Uitgaande clicks tonen waar bezoekers naartoe gaan.",
      "business_impact_en": "Outbound clicks show where visitors go.",
      "fix_suggestion_nl": "Activeer GA4 enhanced outbound link tracking.",
      "fix_suggestion_en": "Enable GA4 enhanced outbound link tracking.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "outbound-clicks-tracking"
    },
    {
      "id": "anl-021",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "events",
      "question_nl": "Zijn aangepaste events in lijn met bedrijfsdoelen?",
      "question_en": "Do custom events match business goals?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Custom events moeten bedrijfsdoelen, niet willekeurig.",
      "business_impact_en": "Custom events should map to business goals, not be arbitrary.",
      "fix_suggestion_nl": "Controleer dat alle custom events bedrijfsdoelen ondersteunen.",
      "fix_suggestion_en": "Verify all custom events support business goals.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-022",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "events",
      "question_nl": "Volgt naamconventie consistent voor events?",
      "question_en": "Is event naming convention consistent?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Consistent naming maakt analytics beter leesbaar en onderhoudbaarder.",
      "business_impact_en": "Consistent naming makes analytics more readable and maintainable.",
      "fix_suggestion_nl": "Stel naamschema vast (bijv: noun_verb) en volg deze consistent.",
      "fix_suggestion_en": "Set naming schema (e.g., noun_verb) and follow consistently.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-023",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "reporting",
      "question_nl": "Google Search Console gelinkt aan GA4?",
      "question_en": "Is Google Search Console linked to GA4?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "GSC link toont zoekquery's en CTR in GA4.",
      "business_impact_en": "GSC link shows search queries and CTR in GA4.",
      "fix_suggestion_nl": "Koppel Google Search Console aan GA4 in instellingen.",
      "fix_suggestion_en": "Link Google Search Console to GA4 in settings.",
      "effort": "low",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "gsc-linked-to-ga4"
    },
    {
      "id": "anl-024",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "reporting",
      "question_nl": "Zijn conversiedoelen ingesteld?",
      "question_en": "Are conversion goals defined?",
      "type": "semi-auto",
      "severity": "important",
      "business_impact_nl": "Doelen geven duidelijke focus en meetpunten.",
      "business_impact_en": "Goals provide clear focus and measurement points.",
      "fix_suggestion_nl": "Definieer 5-10 hoofddoelen voor bedrijf en zet in GA4.",
      "fix_suggestion_en": "Define 5-10 key goals for business and set up in GA4.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ],
      "auto_tool": "puppeteer",
      "auto_metric": "conversion-goals-defined"
    },
    {
      "id": "anl-025",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "reporting",
      "question_nl": "Zijn aangepaste rapporten ingesteld voor belanghebbenden?",
      "question_en": "Are custom reports set up for key stakeholders?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Custom reports geven stakeholders relevante data automatisch.",
      "business_impact_en": "Custom reports give stakeholders relevant data automatically.",
      "fix_suggestion_nl": "Maak 3-5 aangepaste rapporten voor managers/stakeholders.",
      "fix_suggestion_en": "Create 3-5 custom reports for managers/stakeholders.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-026",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "reporting",
      "question_nl": "Is regelmatig rapportschema aanwezig?",
      "question_en": "Is regular reporting schedule in place?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Regelmatige rapportage zorgt dat data actie aandrijft.",
      "business_impact_en": "Regular reporting ensures data drives action.",
      "fix_suggestion_nl": "Zet wekelijks/maandelijks rapport rapportschema in via GA4.",
      "fix_suggestion_en": "Set up weekly/monthly report schedule via GA4.",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    },
    {
      "id": "anl-027",
      "legacy_id": null,
      "module": "analytics",
      "subcategory": "reporting",
      "question_nl": "Is attributiemodel correct geconfigureerd?",
      "question_en": "Is attribution model configured correctly?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Correct model geeft zuivere conversietoedeling.",
      "business_impact_en": "Correct model gives accurate conversion attribution.",
      "fix_suggestion_nl": "Stel attributiemodel in (data-driven, first/last-click naar keuze).",
      "fix_suggestion_en": "Set attribution model (data-driven, first/last-click as needed).",
      "effort": "medium",
      "applicable_to": [
        "all"
      ]
    }
  ],
  "quick-scan": [
    // ════════════════════════════════════════════════════════════
    // LANDING PAGE (18 checks) - qs-lp-001 to qs-lp-018
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-lp-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Laadt de landingspagina snel genoeg? (LCP < 2.5s, volledige laadtijd < 3s)",
      "question_en": "Does the landing page load fast enough? (LCP < 2.5s, full load < 3s)",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Traag laadende pagina's verhogen bounce rate met 7% per seconde vertraging. Snellere pagina's verhogen conversies met 10-15%.",
      "business_impact_en": "Slow loading pages increase bounce rate by 7% per second delay. Faster pages boost conversions by 10-15%.",
      "fix_suggestion_nl": "Gebruik WebP-afbeeldingen, minificeer CSS/JS, implementeer lazy loading, activeer browser caching.",
      "fix_suggestion_en": "Use WebP images, minify CSS/JS, implement lazy loading, enable browser caching.",
      "effort": "medium",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is er slechts één primaire CTA zichtbaar, zonder concurrerende links?",
      "question_en": "Is there only one primary CTA visible, with no competing links?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Meerdere CTA's verlagen conversies met 25-30%. Eén focus verhoogt clarity en conversies.",
      "business_impact_en": "Multiple CTAs reduce conversions by 25-30%. Single focus increases clarity and conversion.",
      "fix_suggestion_nl": "Verwijder concurrerende links, zorg voor één duidelijke primary CTA, verberg secundaire acties.",
      "fix_suggestion_en": "Remove competing links, ensure one clear primary CTA, hide secondary actions.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Ontbreekt het globale navigatiemenu op de pagina?",
      "question_en": "Is the global navigation menu removed from the page?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Navigatiemenu's leiden bezoekers af van de CTA. Verwijdering verhoogt conversies met 10-20%.",
      "business_impact_en": "Navigation menus distract visitors from CTA. Removal increases conversions by 10-20%.",
      "fix_suggestion_nl": "Verwijder of verberg het globale navigatiemenu, behoud alleen het logo en minimale branding.",
      "fix_suggestion_en": "Remove or hide global navigation, keep only logo and minimal branding.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is de hoofdtitel helder en beknopt (≤10 woorden)?",
      "question_en": "Is the main headline clear and concise (≤10 words)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onduidelijke koppelingen verlagen begrijpbaarheid met 40%. Duidelijke koppelingen spiegelen advertentietekst en verhogen conversies.",
      "business_impact_en": "Unclear headlines reduce comprehension by 40%. Clear headlines mirror ad copy and boost conversions.",
      "fix_suggestion_nl": "Herwerk titel tot ≤10 woorden, spiegelen advertentietekst, begin met voordeel of actie.",
      "fix_suggestion_en": "Rewrite headline to ≤10 words, mirror ad copy, start with benefit or action.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is de CTA-knop zichtbaar zonder te scrollen (above the fold)?",
      "question_en": "Is the CTA button visible without scrolling (above the fold)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "CTA's onder de fold verminderen zichtbaarheid met 80%. Zichtbaarheid boven de fold verhoogt conversies met 20-30%.",
      "business_impact_en": "CTAs below the fold reduce visibility by 80%. Above-the-fold visibility increases conversions by 20-30%.",
      "fix_suggestion_nl": "Zorg dat CTA zich boven de vouwlijn bevindt op desktop en mobiel, slechts 1-2 scrolls benodigd.",
      "fix_suggestion_en": "Ensure CTA is above the fold on desktop and mobile, requiring only 1-2 scrolls.",
      "effort": "medium",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is de waardepropositie duidelijk (5-secondentest: wat/wie/waarom)?",
      "question_en": "Is the value proposition clear (5-second test: what/who/why)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onduidelijke waardepropositie verhoogt bounce rate met 35-50%. Duidelijkheid verhoogt engagement met 25%.",
      "business_impact_en": "Unclear value proposition increases bounce rate by 35-50%. Clarity improves engagement by 25%.",
      "fix_suggestion_nl": "Definieer in één zin: wat je aanbiedt, wie het nodig heeft, waarom het beter is dan alternatieven.",
      "fix_suggestion_en": "Define in one sentence: what you offer, who needs it, why it's better than alternatives.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Heeft de CTA-knop voldoende contrast (≥4.5:1) en grootte (≥44×44px)?",
      "question_en": "Does the CTA button have sufficient contrast (≥4.5:1) and size (≥44×44px)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Kleine of slecht zichtbare knoppen reduceren klikken met 30-40%. Goede grootte en contrast verhogen conversies.",
      "business_impact_en": "Small or low-contrast buttons reduce clicks by 30-40%. Good size and contrast boost conversions.",
      "fix_suggestion_nl": "Zorg voor 4.5:1 contrast verhouding, minimaal 44×44px tap target, duidelijke kleurovergangen.",
      "fix_suggestion_en": "Ensure 4.5:1 contrast ratio, minimum 44×44px tap target, clear color transitions.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is de pagina goed geoptimaliseerd voor mobiel (formulieren bruikbaar, ≥48px doelen)?",
      "question_en": "Is the page optimized for mobile (forms usable, ≥48px targets)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "50-60% van landingspagina-traffic is mobiel. Slecht geoptimaliseerde mobiel onderbreekt conversies met 45%.",
      "business_impact_en": "50-60% of landing page traffic is mobile. Poor mobile optimization interrupts conversions by 45%.",
      "fix_suggestion_nl": "Zorg voor responsive design, één kolom op mobiel, 48px minimale tap targets, geschikte toetsenborden.",
      "fix_suggestion_en": "Ensure responsive design, single column on mobile, 48px minimum tap targets, appropriate keyboards.",
      "effort": "medium",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Beperkt het formulier zich tot ≤4 velden (leadgen) of ≤2 (nieuwsbrief)?",
      "question_en": "Does the form limit to ≤4 fields (lead gen) or ≤2 (newsletter)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Per extra formulierveld daalt conversion met 3-5%. 4 velden vs 10 velden verhoogt completion met 50%.",
      "business_impact_en": "Each additional form field reduces conversion by 3-5%. 4 fields vs 10 increases completion by 50%.",
      "fix_suggestion_nl": "Beperk tot kritieke velden alleen. Lead gen: naam, email, bedrijf. Nieuwsbrief: email alleen.",
      "fix_suggestion_en": "Limit to critical fields only. Lead gen: name, email, company. Newsletter: email only.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Zijn er maatschappelijke bewijzen aanwezig (getuigenissen, reviews, logo's)?",
      "question_en": "Is social proof present (testimonials, reviews, logos)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Sociale bewijzen verhogen conversies met 20-34%. Absentie verhoogt wantrouwen met 25%.",
      "business_impact_en": "Social proof increases conversions by 20-34%. Absence increases distrust by 25%.",
      "fix_suggestion_nl": "Voeg klantlogo's, getuigenissen met foto's, sterbeoordelingen, of case study's toe.",
      "fix_suggestion_en": "Add customer logos, testimonials with photos, star ratings, or case studies.",
      "effort": "medium",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Zijn vertrouwenssignalen zichtbaar dicht bij het formulier?",
      "question_en": "Are trust signals visible near the form?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Vertrouwenssignalen dicht bij het formulier verhogen conversies met 15-25%. Afstand vermindert effectiviteit.",
      "business_impact_en": "Trust signals near form increase conversions by 15-25%. Distance reduces effectiveness.",
      "fix_suggestion_nl": "Plaats SSL-badgel, teruggeld garantie, of veiligheidscertificaten direct onder/naast het formulier.",
      "fix_suggestion_en": "Place SSL badge, money-back guarantee, or security certificates directly below/beside form.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Heeft de pagina een relevante hero afbeelding of video boven de vouw?",
      "question_en": "Does the page have a relevant hero image or video above the fold?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Relevante visuele elementen verhogen engagement met 40%. Generieke stock foto's reduceren geloofwaardigheid.",
      "business_impact_en": "Relevant visuals increase engagement by 40%. Generic stock photos reduce credibility.",
      "fix_suggestion_nl": "Voeg product demo, teamfoto's, of echte klantscenario's toe. Vermijd generieke stock foto's.",
      "fix_suggestion_en": "Add product demo, team photos, or real customer scenarios. Avoid generic stock photos.",
      "effort": "medium",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Volgt de pagina F/Z-patroon voor visuele hiërarchie?",
      "question_en": "Does the page follow F/Z-pattern for visual hierarchy?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Goede visuele hiërarchie verhoogt scanbaarheid met 30-40%. Slechte hiërarchie verhoogt cognitive load.",
      "business_impact_en": "Good visual hierarchy increases scannability by 30-40%. Poor hierarchy increases cognitive load.",
      "fix_suggestion_nl": "Zorg voor duidelijke scanpad: boven links naar rechts, dan afwisselend. Grote elementen voor prioriteit.",
      "fix_suggestion_en": "Ensure clear scan path: top left to right, then alternating. Large elements for priority.",
      "effort": "medium",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-014",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is de leesbaarheid op niveau (Flesch-Kincaid graad ≤8)?",
      "question_en": "Is the readability at grade level (Flesch-Kincaid grade ≤8)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Eenvoudigere taal verhoogt begrijpbaarheid met 25-35%. Complexe tekst verhoogt bounce rate.",
      "business_impact_en": "Simpler language increases comprehension by 25-35%. Complex text increases bounce rate.",
      "fix_suggestion_nl": "Gebruik korte zinnen, veelvoorkomende woorden, vermijd jargon. Doel: gemiddeld 8e graad niveau.",
      "fix_suggestion_en": "Use short sentences, common words, avoid jargon. Target: average 8th grade level.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-015",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is er een herhaling van de CTA onder de vouw?",
      "question_en": "Is there a CTA repetition below the fold?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Herhaling van CTA verhoogt conversies met 5-10% voor bezoekers die scrollen.",
      "business_impact_en": "CTA repetition increases conversions by 5-10% for scrolling visitors.",
      "fix_suggestion_nl": "Voeg tweede CTA-knop toe na de contenthoofdstukken, laat dezelfde tekst/actiepunt behouden.",
      "fix_suggestion_en": "Add second CTA button after content sections, maintain same text/action point.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-016",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Focust de pagina op één aanbieding zonder meerdere aanbiedingen?",
      "question_en": "Does the page focus on one offer without multiple competing offers?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Meerdere aanbiedingen creëren beslissingsproblemen. Eén aanbieding verhoogt clarity en conversies met 15-20%.",
      "business_impact_en": "Multiple offers create decision paralysis. Single offer improves clarity and conversions by 15-20%.",
      "fix_suggestion_nl": "Verwijder alternatieve aanbiedingen, focus op primaire conversion goal.",
      "fix_suggestion_en": "Remove alternative offers, focus on primary conversion goal.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-017",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Zijn urgentie- of schaarste-indicatoren aanwezig?",
      "question_en": "Are urgency or scarcity indicators present?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Urgentie en schaarste verhogen conversies met 10-30%. Specifieke claim beter dan vage.",
      "business_impact_en": "Urgency and scarcity increase conversions by 10-30%. Specific claims work better than vague.",
      "fix_suggestion_nl": "Voeg toe: 'Slechts 5 plaatsen beschikbaar', 'Aanbod eindigt vandaag', of aftellen timer.",
      "fix_suggestion_en": "Add: 'Only 5 spots available', 'Offer ends today', or countdown timer.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    {
      "id": "qs-lp-018",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "landing",
      "question_nl": "Is contactinformatie zichtbaar op de pagina?",
      "question_en": "Is contact information visible on the page?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Contactinformatie verhoogt vertrouwen met 20%. Afwezigheid suggereert verberging.",
      "business_impact_en": "Contact information increases trust by 20%. Absence suggests hiding.",
      "fix_suggestion_nl": "Voeg e-mailadres, telefoonnummer, of contactformulier in voettekst of zijbalk in.",
      "fix_suggestion_en": "Add email address, phone number, or contact form in footer or sidebar.",
      "effort": "low",
      "applicable_to": ["landing"]
    },
    // ════════════════════════════════════════════════════════════
    // PRODUCT PAGE (18 checks) - qs-pp-001 to qs-pp-018
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-pp-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is de 'toevoegen aan winkelwagen'-knop boven de vouw aanwezig met goed contrast en grootte?",
      "question_en": "Is the 'add-to-cart' button above the fold with good contrast and size?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "50% van bezoekers wil direct kopen. ATC-knop boven de vouw verhoogt conversies met 15-25%.",
      "business_impact_en": "50% of visitors want to buy immediately. ATC button above fold increases conversions by 15-25%.",
      "fix_suggestion_nl": "Zorg dat knop zichtbaar is zonder scrollen, contrastverhouding ≥4.5:1, grootte ≥48px.",
      "fix_suggestion_en": "Ensure button visible without scroll, contrast ratio ≥4.5:1, size ≥48px.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Zijn er minimaal 4 productafbeeldingen met schaal- en lifestyle-foto's?",
      "question_en": "Are there minimum 4 product images including scale and lifestyle photos?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "97% van klanten kijken naar afbeeldingen. 4+ afbeeldingen verhogen conversies met 20-35%.",
      "business_impact_en": "97% of customers view images. 4+ images increase conversions by 20-35%.",
      "fix_suggestion_nl": "Voeg toe: detail-, lifestyle-, schaal-, en perspectief-afbeeldingen. Minimaal 1200px breed.",
      "fix_suggestion_en": "Add: detail, lifestyle, scale, and perspective shots. Minimum 1200px wide.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Werkt de beeldgalerij met zichtbare miniaturen, zoomfunctie (geen alleen stippen)?",
      "question_en": "Does image gallery work with visible thumbnails, zoom (no dots-only)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Goede galerij-UX verhoogt vertrouwen met 30%. Slechte navigatie verhoogt bounce rate met 25%.",
      "business_impact_en": "Good gallery UX increases trust by 30%. Poor navigation increases bounce rate by 25%.",
      "fix_suggestion_nl": "Implementeer miniatuurrij, klik-navigatie, zoomfunctie op hover, volledige grootte-viewer.",
      "fix_suggestion_en": "Implement thumbnail row, click navigation, zoom on hover, full-size viewer.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is de prijs duidelijk zichtbaar zonder te scrollen, met besparingen getoond?",
      "question_en": "Is the price clearly visible without scrolling, with savings shown?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Verborgen prijzen verhogen bounce rate met 35%. Duidelijke prijs verhoogt vertrouwen.",
      "business_impact_en": "Hidden prices increase bounce rate by 35%. Clear pricing builds trust.",
      "fix_suggestion_nl": "Zet prijs boven de vouw, toon origineel en verlaagde prijs duidelijk, voeg besparing % toe.",
      "fix_suggestion_en": "Place price above fold, show original and discounted price clearly, add savings %.",
      "effort": "low",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is verzendinfo zichtbaar bij de aankoopknop, niet verborgen in tabbladen?",
      "question_en": "Is shipping info visible near buy button, not hidden in tabs?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Verborgen verzendkosten zijn #1 reden voor winkelwagenabandonement (67%). Duidelijkheid verhoogt conversies.",
      "business_impact_en": "Hidden shipping costs are #1 cart abandonment reason (67%). Clarity boosts conversions.",
      "fix_suggestion_nl": "Toon leveringsdatum, kosten, en mogelijkheden direct onder ATC-knop of in sticky banner.",
      "fix_suggestion_en": "Show delivery date, costs, and options directly below ATC button or in sticky banner.",
      "effort": "low",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Vermijdt de pagina horizontal tabs layout (gebruik verticale secties)?",
      "question_en": "Does the page avoid horizontal tabs layout (use vertical sections)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Tabbladen verbergen inhoud. 40% van gebruikers missen tab-inhoud. Verticale scroll heeft 3x meer zichtbaarheid.",
      "business_impact_en": "Tabs hide content. 40% of users miss tab content. Vertical scroll has 3x more visibility.",
      "fix_suggestion_nl": "Vervang tabbladen door verticale secties, use accordions voor subsecties, minimaliseer scrollafstand.",
      "fix_suggestion_en": "Replace tabs with vertical sections, use accordions for subsections, minimize scroll distance.",
      "effort": "high",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Zijn klantreviews aanwezig met samengevoegd rating en sorteeropties?",
      "question_en": "Are customer reviews present with aggregate rating and sort options?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Reviews verhogen conversies met 25-50%. Afwezigheid van reviews verhoogt twijfel met 40%.",
      "business_impact_en": "Reviews increase conversions by 25-50%. Missing reviews increase doubt by 40%.",
      "fix_suggestion_nl": "Toon gemiddelde rating (5 sterren), verdeling histogram, ≥10 reviews, sorteer op 'nuttig' of recency.",
      "fix_suggestion_en": "Show average rating (5 stars), distribution histogram, ≥10 reviews, sort by 'helpful' or recency.",
      "effort": "high",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Zijn er ≥2 vertrouwenssignalen dicht bij de aankoopknop aanwezig?",
      "question_en": "Are there ≥2 trust signals near the buy button?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Vertrouwenssignalen verhogen conversies met 10-20%. Elk extra signaal weegt 3-5% sterker.",
      "business_impact_en": "Trust signals increase conversions by 10-20%. Each additional signal impacts 3-5% stronger.",
      "fix_suggestion_nl": "Voeg toe: teruggeld garantie, gratis retour, SSL badge, veiligheidscertificaat.",
      "fix_suggestion_en": "Add: money-back guarantee, free returns, SSL badge, security certificate.",
      "effort": "low",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is de productbeschrijving bondig (≤300 woorden boven de vouw) met highlights?",
      "question_en": "Is the product description concise (≤300 words above fold) with highlights?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Lange beschrijvingen verhogen bounce rate met 15-20%. Bullet points verhogen scan-rate met 40%.",
      "business_impact_en": "Long descriptions increase bounce rate by 15-20%. Bullet points increase scan rate by 40%.",
      "fix_suggestion_nl": "Limiteer tot ≤300 woorden, gebruik bullet points, één alinea per voordeel, specs onderaan.",
      "fix_suggestion_en": "Limit to ≤300 words, use bullet points, one paragraph per benefit, specs at bottom.",
      "effort": "low",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is de grootte/variant-selectie met visuele stalen voor <7 opties?",
      "question_en": "Is size/variant selection with visual swatches for <7 options?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Visuele stalen verhogen conversies met 15-25% voor kleur/maat. Dropdown minder effectief.",
      "business_impact_en": "Visual swatches increase conversions by 15-25% for color/size. Dropdowns less effective.",
      "fix_suggestion_nl": "Gebruik kleurstalen voor kleur, groottegrid voor maten, geen dropdown menu (behalve 7+).",
      "fix_suggestion_en": "Use color swatches for colors, size grid for sizes, no dropdown menu (unless 7+).",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is de pagina mobiel-geoptimaliseerd (sticky ATC, ≥16px tekst)?",
      "question_en": "Is the page mobile-optimized (sticky ATC, ≥16px text)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "60%+ van e-commerce is mobiel. Mobiel-geoptimaliseerd verhoogt conversies met 15-30%.",
      "business_impact_en": "60%+ of e-commerce is mobile. Mobile-optimized increases conversions by 15-30%.",
      "fix_suggestion_nl": "Sticky ATC button op mobiel, minimum 16px body text, één kolom, voorkomen horizontale scroll.",
      "fix_suggestion_en": "Sticky ATC button on mobile, minimum 16px body text, single column, prevent horizontal scroll.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Zijn cross-sell/upsell aanwezig zonder aankoopcyclus te verstoren?",
      "question_en": "Are cross-sell/upsell present without interfering with buy flow?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Goede cross-sell verhoogt AOV met 15-30%. Storend design leidt tot verlies van 20% conversies.",
      "business_impact_en": "Good cross-sell increases AOV by 15-30%. Disruptive design causes 20% conversion loss.",
      "fix_suggestion_nl": "Cross-sell na ATC, niet blokkerend. Upsell in checkout flow. Zorg voor eenvoudige dismiss.",
      "fix_suggestion_en": "Cross-sell after ATC, not blocking. Upsell in checkout flow. Ensure easy dismiss.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is de voorraadbeschikbaarheid zichtbaar nabij de CTA met notify-for-OOS?",
      "question_en": "Is stock availability visible near CTA with notify-for-OOS?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Voorraadonzekerheid verhoogt bounce rate met 30%. 'Notify me' capture helpt 15-25% van bezoekers.",
      "business_impact_en": "Stock uncertainty increases bounce rate by 30%. 'Notify me' captures 15-25% of visitors.",
      "fix_suggestion_nl": "Toon voorraadstatus, 'Slechts X op voorraad' warns, out-of-stock notify opzetten.",
      "fix_suggestion_en": "Show stock status, 'Only X left' warns, set up out-of-stock notify.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-014",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Laadt de pagina snel (LCP ≤2.5s, afbeeldingen <200KB WebP)?",
      "question_en": "Does the page load fast (LCP ≤2.5s, images <200KB WebP)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Traag laadende productpagina's verhogen bounce rate met 5-7% per seconde vertraging.",
      "business_impact_en": "Slow product pages increase bounce rate by 5-7% per second delay.",
      "fix_suggestion_nl": "Gebruik WebP afbeeldingen, minificeer CSS/JS, lazy load secundaire afbeeldingen, cache inschakelen.",
      "fix_suggestion_en": "Use WebP images, minify CSS/JS, lazy load secondary images, enable caching.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-015",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is broodkruimels-navigatie aanwezig met schema markup?",
      "question_en": "Is breadcrumb navigation present with schema markup?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Breadcrumbs verhogen navigatieefficiëntie met 20%. Schema markup helpt zoekrangschikking.",
      "business_impact_en": "Breadcrumbs improve navigation efficiency by 20%. Schema markup helps search ranking.",
      "fix_suggestion_nl": "Voeg breadcrumb-pad in, implementeer schema.org/BreadcrumbList.",
      "fix_suggestion_en": "Add breadcrumb path, implement schema.org/BreadcrumbList.",
      "effort": "low",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-016",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is er een productvideo aanwezig op de pagina?",
      "question_en": "Is there a product video present on the page?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Video verhoogt conversies met 25-50%, verbetert begrijping van producten.",
      "business_impact_en": "Video increases conversions by 25-50%, improves product comprehension.",
      "fix_suggestion_nl": "Voeg demo-, setup-, of unboxing-video toe, autoplay muted, speel inline af.",
      "fix_suggestion_en": "Add demo, setup, or unboxing video, autoplay muted, play inline.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-017",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Is er sociale/UGC-integratie op de pagina?",
      "question_en": "Is there social/UGC integration on the page?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "UGC verhoogt conversies met 25-40%, verhoogt authenticiteit.",
      "business_impact_en": "UGC increases conversions by 25-40%, increases authenticity.",
      "fix_suggestion_nl": "Voeg Instagram feed, user photos, of social reviews in (gebruik API integratie).",
      "fix_suggestion_en": "Add Instagram feed, user photos, or social reviews (use API integration).",
      "effort": "high",
      "applicable_to": ["product"]
    },
    {
      "id": "qs-pp-018",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "product",
      "question_nl": "Zijn specificaties in een gestructureerde tabel gescheiden van marketing?",
      "question_en": "Are specifications in a structured table, separated from marketing?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Gestructureerde specs verhogen scan-rate met 30%, helpen vergelijking.",
      "business_impact_en": "Structured specs increase scan rate by 30%, help comparison.",
      "fix_suggestion_nl": "Maak spec table, gescheiden van beschrijving. Voeg schema.org/Product markup toe.",
      "fix_suggestion_en": "Create spec table, separate from description. Add schema.org/Product markup.",
      "effort": "medium",
      "applicable_to": ["product"]
    },
    // ════════════════════════════════════════════════════════════
    // CHECKOUT & CART (18 checks) - qs-co-001 to qs-co-018
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-co-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is de totale kostentransparantie zichtbaar (verzending + belastingen vroeg)?",
      "question_en": "Is total cost transparency visible (shipping + taxes early)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Verborgen kosten zijn #1 reden voor winkelwagenabandonement (43%). Vroege transparantie verhoogt conversies.",
      "business_impact_en": "Hidden costs are #1 cart abandonment reason (43%). Early transparency increases conversions.",
      "fix_suggestion_nl": "Toon lopende totaal op alle schermen, inclusief verzending en belastingen vóór betalingscreen.",
      "fix_suggestion_en": "Show running total on all screens, including shipping and taxes before payment screen.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is gast-checkout beschikbaar en prominent zonder account-aanmaak af te dwingen?",
      "question_en": "Is guest checkout available and prominent without forcing account creation?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Geforceerde accounts verhogen abandonement met 25-30%. Gast-checkout verhoogt conversies.",
      "business_impact_en": "Forced accounts increase abandonment by 25-30%. Guest checkout boosts conversions.",
      "fix_suggestion_nl": "Maak gast-checkout voorkeuzekeuze, bied account-aanmaak na aankoop.",
      "fix_suggestion_en": "Make guest checkout default option, offer account creation after purchase.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Beperkt het formulier zich tot ≤8 zichtbare velden met samen valbare optionele velden?",
      "question_en": "Does form limit to ≤8 visible fields with collapsible optional fields?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Per extra veld verhoogt abandonement met 3-5%. 8 velden vs 20 verhoogt conversies met 30%.",
      "business_impact_en": "Each extra field increases abandonment by 3-5%. 8 fields vs 20 increases conversions by 30%.",
      "fix_suggestion_nl": "Toon alleen kritieke velden: email, adres, betalingsveld. Verberg optionele velden achter 'Meer opties'.",
      "fix_suggestion_en": "Show only critical fields: email, address, payment. Hide optional behind 'More options'.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Zijn er ≥2 express checkout opties (Apple Pay, Google Pay, PayPal) vroeg aanwezig?",
      "question_en": "Are there ≥2 express checkout options (Apple Pay, Google Pay, PayPal) early present?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Express checkout verhoogt conversies met 30-40%, versnelt één-klikken aankoop.",
      "business_impact_en": "Express checkout increases conversions by 30-40%, accelerates one-click purchase.",
      "fix_suggestion_nl": "Voeg Apple Pay, Google Pay, PayPal boven aan checkout, één klik aankoop.",
      "fix_suggestion_en": "Add Apple Pay, Google Pay, PayPal at top of checkout, one-click purchase.",
      "effort": "high",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Zijn veiligheidsindicatoren aanwezig (lock icon, 'Beveiligde checkout', logos)?",
      "question_en": "Are security indicators present (lock icon, 'Secure checkout', logos)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Security badges verhogen conversies met 10-20%. Afwezigheid verhoogt twijfel met 35%.",
      "business_impact_en": "Security badges increase conversions by 10-20%. Absence increases doubt by 35%.",
      "fix_suggestion_nl": "Toon SSL lock, 'Beveiligde checkout', betalingsprovider-logo's, PCI-DSS badge.",
      "fix_suggestion_en": "Show SSL lock, 'Secure checkout', payment provider logos, PCI-DSS badge.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is foutafhandeling aanwezig (inline validatie, duidelijke berichten, datavastlegging)?",
      "question_en": "Is error handling present (inline validation, clear messages, data retention)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Slechte foutafhandeling verhoogt abandonement met 20-25%. Inline validatie verhoogt success-rate.",
      "business_impact_en": "Poor error handling increases abandonment by 20-25%. Inline validation improves success rate.",
      "fix_suggestion_nl": "Validatie terwijl u typt, duidelijke roodfouten, geen data verlies op fout.",
      "fix_suggestion_en": "Validate as you type, clear red errors, no data loss on error.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is mobiele checkout geoptimaliseerd (één kolom, numerieke toetsenborden, fullwidth CTA)?",
      "question_en": "Is mobile checkout optimized (single column, numeric keyboards, fullwidth CTA)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "60%+ van checkout is mobiel. Mobiel-geoptimaliseerd verhoogt conversies met 20-30%.",
      "business_impact_en": "60%+ of checkout is mobile. Mobile-optimized increases conversions by 20-30%.",
      "fix_suggestion_nl": "Één kolom, numerieke keyboards voor nummers, fullwidth knappen, geen horizontal scroll.",
      "fix_suggestion_en": "Single column, numeric keyboards for numbers, fullwidth buttons, no horizontal scroll.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Zijn er ≥3 betalingsmethodecategorieën beschikbaar?",
      "question_en": "Are there ≥3 payment method categories available?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Betalingskeuze is 3e reden voor abandonment. ≥3 opties verhogen conversies met 10-15%.",
      "business_impact_en": "Payment choice is 3rd abandonment reason. ≥3 options increase conversions by 10-15%.",
      "fix_suggestion_nl": "Voeg toe: creditcard, digitale portefeuille (Apple/Google), PayPal, bankoverdrachtopties.",
      "fix_suggestion_en": "Add: credit card, digital wallet (Apple/Google), PayPal, bank transfer options.",
      "effort": "high",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is het bestellingsoverzicht persistent en bewerking mogelijk?",
      "question_en": "Is the order summary persistent and editable throughout?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Persistent overzicht verhoogt vertrouwen met 25%. Verborgen inhoud verhoogt twijfel.",
      "business_impact_en": "Persistent summary increases trust by 25%. Hidden content increases doubt.",
      "fix_suggestion_nl": "Sticky sidebar/panel met bestellingsoverzicht, klik om terug naar winkelwagen te gaan.",
      "fix_suggestion_en": "Sticky sidebar/panel with order summary, clickable to return to cart.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is adres-autocomplete aanwezig (automatisch stad/staat van postale code)?",
      "question_en": "Is address autocomplete present (auto-detect city/state from postal)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Adres-autocomplete verhoogt conversies met 15-20%, versnelt invoer.",
      "business_impact_en": "Address autocomplete increases conversions by 15-20%, speeds entry.",
      "fix_suggestion_nl": "Implementeer postale code lookup, vul stad/staat automatisch in.",
      "fix_suggestion_en": "Implement postal code lookup, auto-fill city/state.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is er een voortgangsindicator zichtbaar voor multi-stap checkout?",
      "question_en": "Is progress indicator visible for multi-step checkout?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Voortgangsindicator verhoogt voltooiing met 10-15%, vermindert onzekerheid.",
      "business_impact_en": "Progress indicator increases completion by 10-15%, reduces uncertainty.",
      "fix_suggestion_nl": "Toon 'Stap 1 van 3', progressiebalk, of stappen-indicator bovenaan.",
      "fix_suggestion_en": "Show 'Step 1 of 3', progress bar, or steps indicator at top.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is de checkout afleidingsvrij (minimale nav, geen promotiebannerstopper)?",
      "question_en": "Is checkout distraction-free (minimal nav, no promotional banners)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Afleidingen verhogen abandonement met 15-20%. Schone interface verhoogt conversies.",
      "business_impact_en": "Distractions increase abandonment by 15-20%. Clean interface boosts conversions.",
      "fix_suggestion_nl": "Verwijder navigatie, promocodes, upsells van checkout flow.",
      "fix_suggestion_en": "Remove navigation, promo banners, upsells from checkout flow.",
      "effort": "medium",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is winkelwagen-aanpassingen gemakkelijk (duidelijke verwijderknoppen, +/- hoeveelheid)?",
      "question_en": "Is cart modification easy (clear remove buttons, +/- quantity)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Gemakkelijke wijzigingen verhogen vertrouwen met 20%. Ingewikkelde interface doet abandonement stijgen.",
      "business_impact_en": "Easy modifications increase trust by 20%. Complex interface drives abandonment.",
      "fix_suggestion_nl": "Duidelijke verwijderknoppen, +/- knoppen voor hoeveelheid, geen pagina hernieuwd bij wijziging.",
      "fix_suggestion_en": "Clear remove buttons, +/- buttons for quantity, no page refresh on change.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-014",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Is het promotiecode-veld samengevouwen achter een link standaard?",
      "question_en": "Is promo code field collapsed behind link by default?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Zichtbare promotiecode-velden verlagen conversies met 5-10%. Samengevouwen helpt focus.",
      "business_impact_en": "Visible promo code fields reduce conversions by 5-10%. Collapsed helps focus.",
      "fix_suggestion_nl": "Verberg 'Heb je een promotiecode' link, toon veld alleen bij klikken.",
      "fix_suggestion_en": "Hide 'Have a promo code' link, show field only on click.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-015",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Tonen verzendopties leveringsdatums in plaats van alleen snelheidslabels?",
      "question_en": "Do shipping options show delivery dates instead of just speed labels?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Leveringsdatums verhogen conversies met 10-15%, helpen planning.",
      "business_impact_en": "Delivery dates increase conversions by 10-15%, help planning.",
      "fix_suggestion_nl": "Toon 'Aankomt 3 maart' in plaats van 'Standaard'. Voeg verwachte datums toe.",
      "fix_suggestion_en": "Show 'Arrives March 3' instead of 'Standard'. Add expected dates.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-016",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Zijn verplichte vs optionele velden duidelijk aangegeven?",
      "question_en": "Are required vs optional fields clearly indicated?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Duidelijke aanduiding vermindert fouten met 20-25%.",
      "business_impact_en": "Clear indication reduces errors by 20-25%.",
      "fix_suggestion_nl": "Markeer verplicht met *, of toon 'Optioneel' label.",
      "fix_suggestion_en": "Mark required with *, or show 'Optional' label.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-017",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Wordt creditcardnummer automatisch opgemaakt (spaties, kaarttype-detectie)?",
      "question_en": "Is credit card auto-formatted (spaces, card type detection)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Auto-formatteren verhoogt invoer-succes met 15-20%, vermindert fouten.",
      "business_impact_en": "Auto-formatting increases entry success by 15-20%, reduces errors.",
      "fix_suggestion_nl": "Voeg spaties toe terwijl u typt, detecteer kaarttype (Visa/MC/Amex), voeg icoon toe.",
      "fix_suggestion_en": "Add spaces while typing, detect card type (Visa/MC/Amex), add icon.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    {
      "id": "qs-co-018",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "checkout",
      "question_nl": "Specificeert de CTA-knop actie ('Bestelling plaatsen' niet 'Verzenden')?",
      "question_en": "Does CTA button specify action ('Place Order' not 'Submit')?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Specifieke acties verhogen klikken met 10-15%, verminderen twijfel.",
      "business_impact_en": "Specific actions increase clicks by 10-15%, reduce hesitation.",
      "fix_suggestion_nl": "Hernoem knop tot 'Bestelling plaatsen' of 'Betaal $XX' in plaats van 'Verzenden'.",
      "fix_suggestion_en": "Rename button to 'Place Order' or 'Pay $XX' instead of 'Submit'.",
      "effort": "low",
      "applicable_to": ["checkout"]
    },
    // ════════════════════════════════════════════════════════════
    // HOMEPAGE (15 checks) - qs-hp-001 to qs-hp-015
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-hp-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Is de waardepropositie boven de vouw duidelijk (wat bedrijf doet in 5 seconden)?",
      "question_en": "Is value proposition above fold clear (what company does in 5 seconds)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onduidelijke propositie verhoogt bounce rate met 40-50%. Duidelijkheid verhoogt engagement.",
      "business_impact_en": "Unclear proposition increases bounce rate by 40-50%. Clarity improves engagement.",
      "fix_suggestion_nl": "Definieer in één zin boven de vouw: wat je doet, voor wie, waarom.",
      "fix_suggestion_en": "Define in one sentence above fold: what you do, for whom, why it matters.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Is de primaire CTA boven de vouw met actiegerichte tekst (niet 'Meer leren')?",
      "question_en": "Is primary CTA above fold with action-oriented text (not 'Learn More')?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Actiegerichte CTA verhoogt conversies met 15-25%. 'Meer leren' verhoogt bounce.",
      "business_impact_en": "Action-oriented CTA increases conversions by 15-25%. 'Learn More' increases bounce.",
      "fix_suggestion_nl": "Hernoem CTA tot 'Demo aanvragen', 'Gratis proberen', 'Aanmelden'.",
      "fix_suggestion_en": "Rename CTA to 'Request Demo', 'Try Free', 'Sign Up'.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Is navigatie helder (beschrijvende labels, ≤7 items)?",
      "question_en": "Is navigation clear (descriptive labels, ≤7 items)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Duidelijke navigatie verhoogt usability met 30-40%. Te veel items verhogen kognitieve belasting.",
      "business_impact_en": "Clear navigation increases usability by 30-40%. Too many items increase cognitive load.",
      "fix_suggestion_nl": "Beperkt tot 5-7 items, gebruik beschrijvende labels ('Product' niet 'Oplossingen').",
      "fix_suggestion_en": "Limit to 5-7 items, use descriptive labels ('Products' not 'Solutions').",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Laadt de pagina snel (LCP ≤2.5s)?",
      "question_en": "Does the page load fast (LCP ≤2.5s)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Traag laadende homepages verhogen bounce rate met 7% per seconde vertraging.",
      "business_impact_en": "Slow homepage load increases bounce rate by 7% per second delay.",
      "fix_suggestion_nl": "Optimaliseer afbeeldingen, minificeer CSS/JS, lazy load, cache inschakelen.",
      "fix_suggestion_en": "Optimize images, minify CSS/JS, lazy load, enable caching.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Is het logo linksboven en klikbaar om terug naar homepage te gaan?",
      "question_en": "Is logo top-left and clickable to return to homepage?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Logo-kliks op homepage maken 5% van alle navigatie. Essentieel voor usability.",
      "business_impact_en": "Logo clicks account for 5% of all navigation. Essential for usability.",
      "fix_suggestion_nl": "Plaats logo linksboven, maak het naar homepage klikbaar.",
      "fix_suggestion_en": "Place logo top-left, make it clickable to homepage.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Heeft de hero afbeelding echte producten/medewerkers, niet generieke stock?",
      "question_en": "Does hero image have real products/employees, not generic stock?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Echte foto's verhogen vertrouwen met 40%. Generieke stock vermindert geloofwaardigheid.",
      "business_impact_en": "Real photos increase trust by 40%. Generic stock reduces credibility.",
      "fix_suggestion_nl": "Vervang stock foto's door echte producten, team, of klanten.",
      "fix_suggestion_en": "Replace stock photos with real products, team, or customers.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Is de pagina mobiel-responsief (geen horizontale overlap, ≥48px doelen)?",
      "question_en": "Is page mobile responsive (no horizontal overflow, ≥48px targets)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "50%+ van homepage-traffic is mobiel. Mobiel-responsief verhoogt conversies.",
      "business_impact_en": "50%+ of homepage traffic is mobile. Mobile responsive increases conversions.",
      "fix_suggestion_nl": "Zorg voor responsive design, één kolom op mobiel, 48px minimale tap targets.",
      "fix_suggestion_en": "Ensure responsive design, single column on mobile, 48px minimum tap targets.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Zijn vertrouwensindicatoren aanwezig (≥2 typen: logo's, testimonials, certs)?",
      "question_en": "Are trust indicators present (≥2 types: logos, testimonials, certs)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Vertrouwensindicatoren verhogen conversies met 15-25%.",
      "business_impact_en": "Trust indicators increase conversions by 15-25%.",
      "fix_suggestion_nl": "Voeg klantlogo's, testimonials, awards, of certificaten toe.",
      "fix_suggestion_en": "Add customer logos, testimonials, awards, or certifications.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Is zoekfunctionaliteit aanwezig (zichtbare tekst invoer ≥27 teken breed)?",
      "question_en": "Is search functionality visible (text input ≥27 chars wide)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Zoekinvoer wordt door 20-25% van bezoekers gebruikt. Niet zichtbaar verhoogt bounce.",
      "business_impact_en": "Search is used by 20-25% of visitors. Not visible increases bounce.",
      "fix_suggestion_nl": "Voeg zichtbare zoekbalk in header toe, minimaal 27 tekens breed.",
      "fix_suggestion_en": "Add visible search bar in header, minimum 27 characters wide.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Zijn er 1-4 duidelijke startpunten voor primaire gebruikerstaken?",
      "question_en": "Are there 1-4 clear starting points for primary user tasks?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke startpunten verhogen conversies met 20-30%.",
      "business_impact_en": "Clear starting points increase conversions by 20-30%.",
      "fix_suggestion_nl": "Toon 'Gratis proberen', 'Productdemo', 'Prijslijst', 'Contact' als duidelijke keuzes.",
      "fix_suggestion_en": "Show 'Try Free', 'Product Demo', 'Pricing', 'Contact' as clear choices.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Zijn er geen agressieve popups binnen de eerste 5 seconden?",
      "question_en": "Are there no aggressive popups within first 5 seconds?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onmiddellijke popups verhogen bounce rate met 25-30%.",
      "business_impact_en": "Immediate popups increase bounce rate by 25-30%.",
      "fix_suggestion_nl": "Wachten tot exit-intent of 30+ seconden voordat popup verschijnt.",
      "fix_suggestion_en": "Wait until exit-intent or 30+ seconds before popup appears.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Bevat voettekst essentiële links (Contact, Over, Privacy, Social)?",
      "question_en": "Does footer contain essentials (Contact, About, Privacy, social)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Voettekstlinks worden door 25% van gebruikers gebruikt. Essentieel voor navigatie.",
      "business_impact_en": "Footer links used by 25% of users. Essential for navigation.",
      "fix_suggestion_nl": "Voeg Contact, Over, Privacy, Social media links toe in voettekst.",
      "fix_suggestion_en": "Add Contact, About, Privacy, social media links in footer.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Worden specifieke echte voorbeelden in featured content getoond?",
      "question_en": "Are specific real examples shown in featured content?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Specifieke voorbeelden verhogen engagement met 30-40%.",
      "business_impact_en": "Specific examples increase engagement by 30-40%.",
      "fix_suggestion_nl": "Toon echte klantcase studies of productdemonstrations in plaats van generieke beschrijving.",
      "fix_suggestion_en": "Show real customer case studies or product demonstrations instead of generic description.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-014",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Ziet de homepage er visueel onderscheidend uit van interieurbladijden?",
      "question_en": "Does homepage visually distinguish from interior pages?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Visuele differentiatie helpt navigatie en merk. Uniformiteit veronderstelt minder intentie.",
      "business_impact_en": "Visual differentiation aids navigation and branding. Uniformity suggests less intent.",
      "fix_suggestion_nl": "Unieke hero, ander palet of layout vergeleken met innerpagina's.",
      "fix_suggestion_en": "Unique hero, different palette or layout compared to interior pages.",
      "effort": "medium",
      "applicable_to": ["homepage"]
    },
    {
      "id": "qs-hp-015",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "homepage",
      "question_nl": "Heeft carrousel handbesturing en geen auto-advance?",
      "question_en": "Does carousel have manual controls and no auto-advance?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Auto-advance carousels worden door 80% van gebruikers genegeerd. Handbesturing verbetert engagement.",
      "business_impact_en": "Auto-advance carousels ignored by 80% of users. Manual control improves engagement.",
      "fix_suggestion_nl": "Voeg pijlen toe voor navigatie, geen auto-advance, toon pagina-indicatoren.",
      "fix_suggestion_en": "Add arrows for navigation, no auto-advance, show page indicators.",
      "effort": "low",
      "applicable_to": ["homepage"]
    },
    // ════════════════════════════════════════════════════════════
    // ABOUT/TEAM PAGE (12 checks) - qs-ab-001 to qs-ab-012
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-ab-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Is het doel van het bedrijf duidelijk in eerste zichtbare sectie (begrijpelijke taal)?",
      "question_en": "Is company purpose clear in first visible section (plain language)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Duidelijk doel verhoogt vertrouwen met 35%. Vage missies verminderen geloofwaardigheid.",
      "business_impact_en": "Clear purpose increases trust by 35%. Vague missions reduce credibility.",
      "fix_suggestion_nl": "Schrijf in één zin boven de vouw: wat je bedrijf doet, waarom het belangrijk is.",
      "fix_suggestion_en": "Write in one sentence above fold: what company does, why it matters.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Zijn echte teamfoto's met namen/titels aanwezig (geen stock)?",
      "question_en": "Are authentic team photos with names/titles present (no stock)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Echte teamfoto's verhogen vertrouwen met 50-60%. Stock foto's verhogen twijfel.",
      "business_impact_en": "Real team photos increase trust by 50-60%. Stock photos increase doubt.",
      "fix_suggestion_nl": "Voeg professional headshots met namen, functies en/of bio's toe.",
      "fix_suggestion_en": "Add professional headshots with names, roles and/or bios.",
      "effort": "medium",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Is het oprichter/origin-verhaal aanwezig in verhalende vorm (geen opsomming van data)?",
      "question_en": "Is founder/origin story present in narrative form (not bullet dates)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Storytelling verhoogt engagement met 40-50%. Opsommingen worden genegeerd.",
      "business_impact_en": "Storytelling increases engagement by 40-50%. Bullet lists are skipped.",
      "fix_suggestion_nl": "Vertel het verhaal in verhaalbogen: 'Toen ging...' format in plaats van datumlijsten.",
      "fix_suggestion_en": "Tell story in narrative arc: 'When... then...' format instead of date lists.",
      "effort": "medium",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Zijn missie/waarden concreet en specifiek (geen enkele buzzwords)?",
      "question_en": "Are mission/values concrete and specific (not single buzzwords)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Concrete waarden verhogen geloofwaardigheid met 30%. Buzzwords reduceren vertrouwen.",
      "business_impact_en": "Concrete values increase credibility by 30%. Buzzwords reduce trust.",
      "fix_suggestion_nl": "Bewerk tot specifieke doelstellingen: niet 'Innovatie' maar 'We maken XY betaalbaarder'.",
      "fix_suggestion_en": "Edit to specific goals: not 'Innovation' but 'We make XY more affordable'.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Zijn geloofwaardigheidssignalen aanwezig (≥2 soorten: prijzen, certificaten, logo's, pers)?",
      "question_en": "Are credibility signals present (≥2 types: awards, certs, logos, press)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Geloofwaardigheidssignalen verhogen conversies met 15-25%.",
      "business_impact_en": "Credibility signals increase conversions by 15-25%.",
      "fix_suggestion_nl": "Voeg awards, certificaten, industrielogo's, of pers-vermeldingen toe.",
      "fix_suggestion_en": "Add awards, certifications, industry logos, or press mentions.",
      "effort": "medium",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Is de inhoud scanbaar (geen alinea >4 regels, kopjes om de 2-3 alinea's)?",
      "question_en": "Is content scannable (no paragraph >4 lines, headings every 2-3 paragraphs)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Scannabaarheid verhoogt begrijpbaarheid met 30-40%. Lange blokken worden genegeerd.",
      "business_impact_en": "Scannability increases comprehension by 30-40%. Long blocks are skipped.",
      "fix_suggestion_nl": "Verdeel alinea's in ≤4 regels, voeg kopjes toe om de 2-3 alinea's.",
      "fix_suggestion_en": "Break paragraphs into ≤4 lines, add headings every 2-3 paragraphs.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Is er een contact-pad CTA (niet een dood einde)?",
      "question_en": "Is there a contact pathway CTA (not a dead-end page)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Contact-wegen verhogen conversies met 10-15%. Dead-end pages verhogen bounce.",
      "business_impact_en": "Contact pathways increase conversions by 10-15%. Dead-end pages increase bounce.",
      "fix_suggestion_nl": "Voeg CTA toe: 'Contact opnemen', 'Spreken met team', verlinkt naar contactpagina.",
      "fix_suggestion_en": "Add CTA: 'Get in Touch', 'Talk to Team', linked to contact page.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Zijn bedrijfsmijlpalen aanwezig (≥3 gekwantificeerde datapunten)?",
      "question_en": "Are company milestones present (≥3 quantified data points)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Gekwantificeerde groei verhoogt vertrouwen met 20-25%.",
      "business_impact_en": "Quantified growth increases trust by 20-25%.",
      "fix_suggestion_nl": "Voeg toe: '10M+ gebruikers', '2010 gegrond', '50+ landen'.",
      "fix_suggestion_en": "Add: '10M+ users', 'Founded 2010', '50+ countries'.",
      "effort": "medium",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Zijn carrière-/baan-links zichtbaar als bedrijf werkt?",
      "question_en": "Are careers/job links visible if company is hiring?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Zichtbare banen helpen werving. Verborgen banen leiden tot gemiste kandidaten.",
      "business_impact_en": "Visible jobs help recruitment. Hidden jobs lead to missed candidates.",
      "fix_suggestion_nl": "Voeg 'Carrière' link toe in navigatie/voettekst als u werft.",
      "fix_suggestion_en": "Add 'Careers' link in navigation/footer if hiring.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Zijn diversiteit/maatschappelijk-verantwoordingsverklaringen aanwezig (specifieke toezeggingen)?",
      "question_en": "Are diversity/social responsibility statements present (specific commitments)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Specifieke toezeggingen verhogen vertrouwen met 15-20%. Buzzwords ondermijnen geloofwaardigheid.",
      "business_impact_en": "Specific commitments increase trust by 15-20%. Buzzwords undermine credibility.",
      "fix_suggestion_nl": "Voeg concreet toe: 'Doel 40% vrouwelijk leiderschap tegen 2025' in plaats van 'Diversiteit'.",
      "fix_suggestion_en": "Add concretely: 'Target 40% female leadership by 2025' instead of 'Diversity'.",
      "effort": "medium",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Is derden-validatie aanwezig (links naar reviews of pers)?",
      "question_en": "Is third-party validation present (links to reviews or press)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Derden-validatie verhoogt geloofwaardigheid met 20-30%.",
      "business_impact_en": "Third-party validation increases credibility by 20-30%.",
      "fix_suggestion_nl": "Voeg G2/Capterra-badges, pers-vermeldingen of reviews toe.",
      "fix_suggestion_en": "Add G2/Capterra badges, press mentions, or review links.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    {
      "id": "qs-ab-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "about",
      "question_nl": "Komt het visuele ontwerp overeen met de rest van de site?",
      "question_en": "Is visual design consistent with rest of site?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Designconsistentie verhoogt vertrouwen met 15%. Inconsistentie suggereert slordigheid.",
      "business_impact_en": "Design consistency increases trust by 15%. Inconsistency suggests sloppiness.",
      "fix_suggestion_nl": "Zorg dat kleurenpalet, typografie en stijl aansluiten op de rest van de site.",
      "fix_suggestion_en": "Ensure color palette, typography, and style match rest of site.",
      "effort": "low",
      "applicable_to": ["about"]
    },
    // ════════════════════════════════════════════════════════════
    // CONTACT PAGE (12 checks) - qs-ct-001 to qs-ct-012
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-ct-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is 'Contact' zichtbaar in hoofdnavigatie EN voettekst?",
      "question_en": "Is 'Contact' visible in main nav AND footer?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "10-15% van gebruikers gaat naar contactpagina. Verborgen contact verhoogt frustratie.",
      "business_impact_en": "10-15% of users navigate to contact. Hidden contact increases frustration.",
      "fix_suggestion_nl": "Voeg 'Contact' link in beide navigatie en voettekst in.",
      "fix_suggestion_en": "Add 'Contact' link in both navigation and footer.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is het telefoonnummer prominent weergegeven?",
      "question_en": "Is phone number displayed prominently?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "30% van gebruikers wil bellen. Verborgen nummer verhoogt bounce met 25%.",
      "business_impact_en": "30% of users want to call. Hidden number increases bounce by 25%.",
      "fix_suggestion_nl": "Toon telefoonnummer boven de vouw, klikbaar (tel: protocol).",
      "fix_suggestion_en": "Show phone number above fold, clickable (tel: protocol).",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Zijn er ≥3 contactmethoden aanwezig (telefoon, email, formulier, chat)?",
      "question_en": "Are there ≥3 contact methods present (phone, email, form, chat)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Meerdere contactmethoden verhogen gebruikersgebruik met 40-50%.",
      "business_impact_en": "Multiple contact methods increase usage by 40-50%.",
      "fix_suggestion_nl": "Voeg toe: telefoonnummer, e-mailadres, contactformulier, live chat.",
      "fix_suggestion_en": "Add: phone number, email, contact form, live chat.",
      "effort": "medium",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is het formulier eenvoudig (≤5 verplichte velden, één kolom)?",
      "question_en": "Is form simple (≤5 required fields, single column)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Per extra veld verhoogt abandonment met 3-5%. 5 velden is optimaal.",
      "business_impact_en": "Each extra field increases abandonment by 3-5%. 5 fields is optimal.",
      "fix_suggestion_nl": "Beperk tot: naam, email, bericht, telefoonnummer (optioneel), onderwerp.",
      "fix_suggestion_en": "Limit to: name, email, message, phone (optional), subject.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Zijn tap-to-call (tel:) en mailto: protocollen aanwezig op mobiel?",
      "question_en": "Are tap-to-call (tel:) and mailto: protocols mobile-friendly?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Mobiel tap-to-call verhoogt conversies met 20-25%.",
      "business_impact_en": "Mobile tap-to-call increases conversions by 20-25%.",
      "fix_suggestion_nl": "Maak telefoonnummers klikbaar (tel:), e-mail links (mailto:), minimaal 48px doelen.",
      "fix_suggestion_en": "Make phone numbers clickable (tel:), email links (mailto:), minimum 48px targets.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is het fysieke adres gekoppeld aan kaart of duidelijk 'op afstand' aangegeven?",
      "question_en": "Is physical address linked to map or 'remote' clearly stated?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Gekoppelde kaarten verhogen vertrouwen met 15%. Verborgen adressen verhogen twijfel.",
      "business_impact_en": "Linked maps increase trust by 15%. Hidden addresses increase doubt.",
      "fix_suggestion_nl": "Link adres naar Google Maps of toon 'We zijn volledig op afstand'.",
      "fix_suggestion_en": "Link address to Google Maps or show 'We are fully remote'.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is de reactietijd duidelijk aangegeven (verwachtingen gesteld)?",
      "question_en": "Is response time explicitly stated (expectations set)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Duidelijke reactietijden verhogen tevredenheid met 20-25%.",
      "business_impact_en": "Clear response times increase satisfaction by 20-25%.",
      "fix_suggestion_nl": "Voeg toe: 'Wij reageren binnen 24 uur' of 'Binnen bedrijfsuren'.",
      "fix_suggestion_en": "Add: 'We respond within 24 hours' or 'During business hours'.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is er afdeling-routering aanwezig (voor organisaties met >50 werknemers)?",
      "question_en": "Is department routing present (for organizations >50 employees)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Afdeling-routering verhoogt efficiëntie met 30-40%.",
      "business_impact_en": "Department routing increases efficiency by 30-40%.",
      "fix_suggestion_nl": "Voeg dropdown in formulier: 'Wat is het onderwerp?' met afdelingen.",
      "fix_suggestion_en": "Add dropdown in form: 'What is your topic?' with departments.",
      "effort": "medium",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Zijn er FAQ/zelfbediening-links aanwezig (link naar help center)?",
      "question_en": "Are FAQ/self-service links present (link to help center)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "FAQ helpt 20-30% van vragen op te lossen zonder contact.",
      "business_impact_en": "FAQ resolves 20-30% of questions without contact.",
      "fix_suggestion_nl": "Voeg 'Veelgestelde vragen' of 'Help Center' link prominent in.",
      "fix_suggestion_en": "Add 'FAQ' or 'Help Center' link prominently.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is de CTA-knoptekst specifiek ('Bericht verzenden' niet 'Verzenden')?",
      "question_en": "Is CTA button text specific ('Send Message' not 'Submit')?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Specifieke acties verhogen klikken met 10-15%.",
      "business_impact_en": "Specific actions increase clicks by 10-15%.",
      "fix_suggestion_nl": "Hernoem knop tot 'Bericht verzenden' of 'Neem contact op'.",
      "fix_suggestion_en": "Rename button to 'Send Message' or 'Get in Touch'.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is er sociale bewijsvoering op contactpagina (testimonials)?",
      "question_en": "Is there social proof on contact page (testimonials)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Testimonials verhogen vertrouwen met 15-20%.",
      "business_impact_en": "Testimonials increase trust by 15-20%.",
      "fix_suggestion_nl": "Voeg klantgetuigenissen of reviews toe bovenaan contactpagina.",
      "fix_suggestion_en": "Add customer testimonials or reviews at top of contact page.",
      "effort": "medium",
      "applicable_to": ["contact"]
    },
    {
      "id": "qs-ct-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "contact",
      "question_nl": "Is er een bevestigingsstroom na formulierverzendig?",
      "question_en": "Is there a confirmation flow after form submission?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Bevestigingspagina's verhogen gebruikervertrouwen met 20-25%.",
      "business_impact_en": "Confirmation pages increase user confidence by 20-25%.",
      "fix_suggestion_nl": "Toon bedankt-bericht, volgende stappen, of verwachte reactietijd.",
      "fix_suggestion_en": "Show thank you message, next steps, or expected response time.",
      "effort": "low",
      "applicable_to": ["contact"]
    },
    // ════════════════════════════════════════════════════════════
    // OPT-IN / LEAD CAPTURE (13 checks) - qs-oi-001 to qs-oi-013
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-oi-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is de benefit-focused headline aanwezig (5-7 graad leesniveau)?",
      "question_en": "Is benefit-focused headline present (5th-7th grade reading level)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Benefit-georiënteerde koppelingen verhogen conversies met 25-35%.",
      "business_impact_en": "Benefit-oriented headlines increase conversions by 25-35%.",
      "fix_suggestion_nl": "Herwerk tot voordeel-focused: 'Krijg 10 bewezen tactieken voor meer leads'.",
      "fix_suggestion_en": "Rewrite to benefit-focused: 'Get 10 proven tactics for more leads'.",
      "effort": "low",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Zijn formuliervelden geoptimaliseerd (1-2 TOFU, 3-4 MOFU)?",
      "question_en": "Are form fields optimized (1-2 TOFU, 3-4 MOFU)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Optimale veldtoevoeging verhoogt conversies met 30-40%.",
      "business_impact_en": "Optimal field configuration increases conversions by 30-40%.",
      "fix_suggestion_nl": "TOFU (Top): naam, email. MOFU (Mid): bedrijf, rol, grootte.",
      "fix_suggestion_en": "TOFU (Top): name, email. MOFU (Mid): company, role, size.",
      "effort": "low",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is de CTA-knoptekst specifiek en eerste persoon (niet 'Verzenden')?",
      "question_en": "Is CTA button text specific and first-person (not 'Submit')?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Eerste persoon CTA verhoogt klikken met 15-25%.",
      "business_impact_en": "First-person CTA increases clicks by 15-25%.",
      "fix_suggestion_nl": "Hernoem tot 'Geef mij mijn gids' of 'Ja, opzeggen'.",
      "fix_suggestion_en": "Rename to 'Give Me My Guide' or 'Yes, Sign Me Up'.",
      "effort": "low",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is het formulier zichtbaar boven de vouw op desktop en mobiel?",
      "question_en": "Is form visible above fold on desktop and mobile?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Formulier boven de vouw verhoogt conversies met 25-40%.",
      "business_impact_en": "Form above fold increases conversions by 25-40%.",
      "fix_suggestion_nl": "Zorg formulier zichtbaar is op laadtijd, geen scrolling vereist.",
      "fix_suggestion_en": "Ensure form is visible on page load, no scrolling required.",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Zijn privacygaranties zichtbaar (beleidslink, 'nooit delen' stelling)?",
      "question_en": "Are privacy assurances visible (policy link, 'never share' statement)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Privacy-verzekeringen verhogen vertrouwen met 20-30%. Afwezigheid verhoogt hesitatie.",
      "business_impact_en": "Privacy assurances increase trust by 20-30%. Absence increases hesitation.",
      "fix_suggestion_nl": "Voeg toe: 'Nooit spammen of delen' + link naar privacybeleid.",
      "fix_suggestion_en": "Add: 'No spam or sharing' + link to privacy policy.",
      "effort": "low",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is mobiele optimalisatie aanwezig (fullwidth velden, ≥44px doelen, <3s laadtijd)?",
      "question_en": "Is mobile optimization present (fullwidth fields, ≥44px targets, <3s load)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Mobiel-geoptimaliseerd verhoogt conversies met 15-25%.",
      "business_impact_en": "Mobile-optimized increases conversions by 15-25%.",
      "fix_suggestion_nl": "Fullwidth invoervelden, 44px+ doelen, responsive design, snelle laadtijd.",
      "fix_suggestion_en": "Fullwidth input fields, 44px+ targets, responsive design, fast load.",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Zijn sociale bewijzen dicht bij CTA aanwezig (testimonials, abonneeaantal)?",
      "question_en": "Is social proof near CTA present (testimonials, subscriber count)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Sociale bewijzen dicht bij CTA verhogen conversies met 10-20%.",
      "business_impact_en": "Social proof near CTA increases conversions by 10-20%.",
      "fix_suggestion_nl": "Voeg testimonial of '10K+ abonnees' dicht bij CTA-knop toe.",
      "fix_suggestion_en": "Add testimonial or '10K+ subscribers' near CTA button.",
      "effort": "low",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is benefit-copy aanwezig (3-5 bullet points in 'je/jouw' taal)?",
      "question_en": "Is benefit copy present (3-5 bullets in 'you/your' language)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Benefit bullets verhogen engagement met 30-40%.",
      "business_impact_en": "Benefit bullets increase engagement by 30-40%.",
      "fix_suggestion_nl": "Voeg 3-5 bullets toe: 'Je ontvangt...', 'Je leert...', 'Je krijgt...'",
      "fix_suggestion_en": "Add 3-5 bullets: 'You'll get...', 'You'll learn...', 'You'll receive...'",
      "effort": "low",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is er een lead magnet preview aanwezig (visuele mockup)?",
      "question_en": "Is lead magnet preview present (visual mockup)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Visual previews verhogen vertrouwen met 25-30%.",
      "business_impact_en": "Visual previews increase trust by 25-30%.",
      "fix_suggestion_nl": "Toon book cover, gids preview, of downloadvideo thumbnail.",
      "fix_suggestion_en": "Show book cover, guide preview, or download video thumbnail.",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Zijn afleidingen verwijderd (geen nav, sidebar, concurrerende links)?",
      "question_en": "Are distractions removed (no nav, sidebar, competing links)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Afleidingsvrij design verhoogt conversies met 15-25%.",
      "business_impact_en": "Distraction-free design increases conversions by 15-25%.",
      "fix_suggestion_nl": "Verwijder navigatie, sidebar, en andere concurrerende links.",
      "fix_suggestion_en": "Remove navigation, sidebar, and other competing links.",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Biedt de bedankpagina onmiddellijke levering + sociale sharing?",
      "question_en": "Does thank you page offer immediate delivery + social sharing?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Onmiddellijke levering verhoogt tevredenheid met 30-40%. Sociale sharing verhoogt spreiding.",
      "business_impact_en": "Immediate delivery increases satisfaction by 30-40%. Social sharing increases reach.",
      "fix_suggestion_nl": "Voeg downloadlink, social share buttons toe op bedankpagina.",
      "fix_suggestion_en": "Add download link, social share buttons on thank you page.",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Is exit-intent popup geconfigureerd voor desktop?",
      "question_en": "Is exit-intent popup configured for desktop?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Exit-intent popups recupereren 7-15% van verlaten bezoekers.",
      "business_impact_en": "Exit-intent popups recover 7-15% of leaving visitors.",
      "fix_suggestion_nl": "Implementeer exit-intent popup alleen op desktop (niet mobiel).",
      "fix_suggestion_en": "Implement exit-intent popup desktop-only (not mobile).",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    {
      "id": "qs-oi-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "optin",
      "question_nl": "Laadt de pagina snel (≤2 seconden)?",
      "question_en": "Does page load fast (≤2 seconds)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Traag laadende opt-in pagina's verhogen bounce rate met 25-30%.",
      "business_impact_en": "Slow opt-in pages increase bounce rate by 25-30%.",
      "fix_suggestion_nl": "Optimaliseer afbeeldingen, minificeer CSS/JS, cache inschakelen.",
      "fix_suggestion_en": "Optimize images, minify CSS/JS, enable caching.",
      "effort": "medium",
      "applicable_to": ["optin"]
    },
    // ════════════════════════════════════════════════════════════
    // PRODUCT LAUNCH / COMING SOON (12 checks) - qs-la-001 to qs-la-012
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-la-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is email-capture boven de vouw aanwezig (max 2 velden)?",
      "question_en": "Is email capture above fold present (max 2 fields)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Email capture boven de vouw verhoogt signups met 40-50%.",
      "business_impact_en": "Email capture above fold increases signups by 40-50%.",
      "fix_suggestion_nl": "Plaats formulier (email + naam) boven de vouw zonder scrollen.",
      "fix_suggestion_en": "Place form (email + name) above fold without scrolling.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is de waardepropositie duidelijk (niet vaag 'stealth mode')?",
      "question_en": "Is value proposition clear (not vague 'stealth mode')?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Duidelijke propositie verhoogt signups met 20-30%. Vague stealth verhoogt bounce.",
      "business_impact_en": "Clear proposition increases signups by 20-30%. Vague stealth increases bounce.",
      "fix_suggestion_nl": "Beschrijf product duidelijk: niet 'iets geweldigs komt eraan' maar specifiek voordeel.",
      "fix_suggestion_en": "Describe product clearly: not 'something amazing coming' but specific benefit.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is mobiele optimalisatie aanwezig (responsive, fullwidth velden, <3s load)?",
      "question_en": "Is mobile optimization present (responsive, fullwidth fields, <3s load)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Mobiel-geoptimaliseerd verhoogt conversies met 20-30%.",
      "business_impact_en": "Mobile-optimized increases conversions by 20-30%.",
      "fix_suggestion_nl": "Responsive design, fullwidth invoervelden, snelle laadtijd.",
      "fix_suggestion_en": "Responsive design, fullwidth input fields, fast load time.",
      "effort": "medium",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is er product preview aanwezig (mockup, screenshot of demo video <60s)?",
      "question_en": "Is product preview present (mockup, screenshot or demo video <60s)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Product preview verhoogt signups met 15-25%.",
      "business_impact_en": "Product preview increases signups by 15-25%.",
      "fix_suggestion_nl": "Voeg product mockup, screenshot of korte demo video (<60s) toe.",
      "fix_suggestion_en": "Add product mockup, screenshot, or short demo video (<60s).",
      "effort": "medium",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is countdown timer of lanceringsdatum zichtbaar boven de vouw?",
      "question_en": "Is countdown timer or launch date visible above fold?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Countdown timers verhogen urgentie en signups met 15-25%.",
      "business_impact_en": "Countdown timers increase urgency and signups by 15-25%.",
      "fix_suggestion_nl": "Toon aftellende timer of 'Gelanceerd op [datum]'.",
      "fix_suggestion_en": "Show countdown timer or 'Launching on [date]'.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is sociale sharing na aanmelden beschikbaar (vooraf geschreven tweets)?",
      "question_en": "Is social sharing after signup available (pre-written tweets)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Sociale sharing na signup vergroten bereik met 30-50%.",
      "business_impact_en": "Social sharing after signup increases reach by 30-50%.",
      "fix_suggestion_nl": "Voeg 'Deel dit op Twitter' of copy-to-clipboard link toe op bedankpagina.",
      "fix_suggestion_en": "Add 'Tweet this' or copy-to-clipboard link on thank you page.",
      "effort": "medium",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Zijn referral mechanics aanwezig (unieke links, tracking, reward)?",
      "question_en": "Are referral mechanics present (unique links, tracking, reward)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Referral programma's verhogen signups met 25-40%.",
      "business_impact_en": "Referral programs increase signups by 25-40%.",
      "fix_suggestion_nl": "Voeg referral bonus toe: unieke link per gebruiker, reward voor beide.",
      "fix_suggestion_en": "Add referral bonus: unique link per user, reward for both.",
      "effort": "high",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is early bird incentive aanwezig (specifieke gekwantificeerde aanbieding)?",
      "question_en": "Is early bird incentive present (specific quantified offer)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Early bird incentives verhogen signups met 10-20%.",
      "business_impact_en": "Early bird incentives increase signups by 10-20%.",
      "fix_suggestion_nl": "Voeg toe: 'Eerste 1000 krijgen 40% korting' of '50% lifetime kortingsspecial'.",
      "fix_suggestion_en": "Add: 'First 1000 get 40% off' or '50% lifetime discount special'.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Specificeert de CTA-knop exact (niet 'Verzenden' maar 'Join Waitlist')?",
      "question_en": "Does CTA button specify action ('Join Waitlist' not 'Submit')?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Specifieke CTA's verhogen klikken met 10-15%.",
      "business_impact_en": "Specific CTAs increase clicks by 10-15%.",
      "fix_suggestion_nl": "Hernoem tot 'Wachtlijst toevoegen' of 'Geef mij vroegvogel-toegang'.",
      "fix_suggestion_en": "Rename to 'Join Waitlist' or 'Give Me Early Access'.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Is merk consistent (logo, professioneel design)?",
      "question_en": "Is branding consistent (logo, professional quality)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Professioneel ontwerp verhoogt vertrouwen met 25-30%.",
      "business_impact_en": "Professional design increases trust by 25-30%.",
      "fix_suggestion_nl": "Zorg voor professioneel logo, consistent kleurenpalet, hoge kwaliteit afbeeldingen.",
      "fix_suggestion_en": "Ensure professional logo, consistent color palette, high-quality images.",
      "effort": "medium",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Zijn voortgangsindicatoren aanwezig (wachtlijstgrootte of ontwikkelingsstatus)?",
      "question_en": "Are progress indicators present (waitlist size or development status)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Voortgangsindicatoren verhogen vertrouwen met 15-20%.",
      "business_impact_en": "Progress indicators increase trust by 15-20%.",
      "fix_suggestion_nl": "Toon 'X personen hebben zich aangemeld' of 'Nu 70% voltooid'.",
      "fix_suggestion_en": "Show 'X people have signed up' or 'Now 70% complete'.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    {
      "id": "qs-la-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "launch",
      "question_nl": "Zijn notificatievoorkeuren duidelijk aangeboden na aanmelden?",
      "question_en": "Are notification preferences communicated post-signup?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Duidelijke voorkeurkeuzes verhogen engagement en verminderen unsubscribes.",
      "business_impact_en": "Clear preference choices increase engagement and reduce unsubscribes.",
      "fix_suggestion_nl": "Laat gebruiker kiezen tussen dagelijkse, wekelijkse of geen updates.",
      "fix_suggestion_en": "Let user choose between daily, weekly, or no updates.",
      "effort": "low",
      "applicable_to": ["launch"]
    },
    // ════════════════════════════════════════════════════════════
    // PRICING PAGE (13 checks) - qs-pr-001 to qs-pr-013
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-pr-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is planvergelijking duidelijk (3-4 plannen in heldere kolommen)?",
      "question_en": "Is plan comparison clear (3-4 plans in clear columns)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "3-4 plannen optimaliseren keuze. Meer dan 5 verstoort.",
      "business_impact_en": "3-4 plans optimize choice. More than 5 disrupts.",
      "fix_suggestion_nl": "Toon 3-4 plannen in verticale kolommen, vergelijkbaar opgesteld.",
      "fix_suggestion_en": "Show 3-4 plans in vertical columns, aligned for comparison.",
      "effort": "medium",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is het aanbevolen plan visueel onderscheiden (andere behandeling)?",
      "question_en": "Is recommended plan visually highlighted (distinct treatment)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Gemarkeerde aanbevelingen verhogen keuze met 20-30%.",
      "business_impact_en": "Highlighted recommendations increase choice by 20-30%.",
      "fix_suggestion_nl": "Markeer aanbevolen plan met 'POPULAIR' label, ander kleurtje, of groter.",
      "fix_suggestion_en": "Mark recommended plan with 'POPULAR' label, different color, or larger.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is er een CTA per plan met actiegerichte tekst en contrast op aanbevolen?",
      "question_en": "Is there CTA per plan with action text and contrast on recommended?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Plan-specifieke CTA's verhogen conversies met 10-15%.",
      "business_impact_en": "Plan-specific CTAs increase conversions by 10-15%.",
      "fix_suggestion_nl": "Zorg voor 'Kies Plan', 'Kosteloos proberen', 'Contact voor Enterprise'.",
      "fix_suggestion_en": "Add 'Choose Plan', 'Start Free Trial', 'Contact for Enterprise'.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is mobiel pricing responsive (verticaal gestapeld, geen horizontale scroll)?",
      "question_en": "Is mobile pricing responsive (vertically stacked, no horizontal scroll)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Responsieve pricing verhoogt mobiele conversies met 15-25%.",
      "business_impact_en": "Responsive pricing increases mobile conversions by 15-25%.",
      "fix_suggestion_nl": "Toon één plan per regel op mobiel, eenvoudig vergelijken.",
      "fix_suggestion_en": "Show one plan per row on mobile, easy to compare.",
      "effort": "medium",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is er een featurevergelijking tabel (vinkjes, sticky headers)?",
      "question_en": "Is there feature comparison table (checkmarks, sticky headers)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Feature tabellen verhogen zichtbaarheid met 40%, helpen keuze.",
      "business_impact_en": "Feature tables increase visibility by 40%, help choice.",
      "fix_suggestion_nl": "Maak uitgebreide feature matrix, sticky header bij scrollen.",
      "fix_suggestion_en": "Create comprehensive feature matrix, sticky header on scroll.",
      "effort": "high",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is jaarlijks/maandelijks toggle aanwezig (standaard jaarlijks, besparing getoond)?",
      "question_en": "Is annual/monthly toggle present (defaults to annual, savings shown)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Jaarlijks toggle met besparing verhoogt conversies met 15-25%.",
      "business_impact_en": "Annual toggle with savings increases conversions by 15-25%.",
      "fix_suggestion_nl": "Toggle maand/jaar, toon '25% besparing op jaarlijks'.",
      "fix_suggestion_en": "Toggle month/year, show '25% savings on annual'.",
      "effort": "medium",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is FAQ-sectie aanwezig (≥5 vragen over trial, annuleren, betaling)?",
      "question_en": "Is FAQ section present (≥5 questions covering trial, cancel, payment)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "FAQ vermindert contactpagina bounce met 20-30%.",
      "business_impact_en": "FAQ reduces contact page bounce by 20-30%.",
      "fix_suggestion_nl": "Voeg FAQ toe: gratis trial, annuleren, factuur, upgrade, ondersteuning.",
      "fix_suggestion_en": "Add FAQ: free trial, cancellation, invoices, upgrades, support.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is geldteruggagarantie zichtbaar dicht bij CTA?",
      "question_en": "Is money-back guarantee visible near CTAs?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Geldteruggagarantie verhoogt conversies met 10-15%.",
      "business_impact_en": "Money-back guarantee increases conversions by 10-15%.",
      "fix_suggestion_nl": "Toon '30 dagen geldterug garantie' dicht bij plannen.",
      "fix_suggestion_en": "Show '30-day money-back guarantee' near plans.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is 'Contact voor sales' plan aanwezig met duidelijk voordeel?",
      "question_en": "Is 'Contact Sales' plan present with clear benefit description?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Enterprise 'Contact Sales' plan helpt 5-10% grote klanten.",
      "business_impact_en": "Enterprise 'Contact Sales' plan helps 5-10% large customers.",
      "fix_suggestion_nl": "Voeg 'Enterprise' plan toe: 'Aangepaste voor grote teams'.",
      "fix_suggestion_en": "Add 'Enterprise' plan: 'Customized for large teams'.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Zijn gratis trial/freemium duur en functies duidelijk aangegeven?",
      "question_en": "Is free trial/freemium duration and features clearly stated?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Duidelijke trial voorwaarden verhogen signups met 10-20%.",
      "business_impact_en": "Clear trial terms increase signups by 10-20%.",
      "fix_suggestion_nl": "Toon '14 dagen gratis proefversie, geen creditcard nodig'.",
      "fix_suggestion_en": "Show '14-day free trial, no credit card needed'.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Zijn sociale bewijzen aanwezig (logo's, gebruikersaantallen, G2/Capterra)?",
      "question_en": "Is social proof present (logos, user counts, G2/Capterra)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Sociale bewijzen verhogen vertrouwen met 15-20%.",
      "business_impact_en": "Social proof increases trust by 15-20%.",
      "fix_suggestion_nl": "Voeg logo's van klanten, '100K+ gebruikers', of G2-badgels toe.",
      "fix_suggestion_en": "Add customer logos, '100K+ users', or G2 badges.",
      "effort": "medium",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Is prijsverankering aanwezig (waarde-geframing of hoogste eerst)?",
      "question_en": "Is price anchoring present (value-based framing or highest first)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Prijsverankering verhoogt conversies met 5-10%.",
      "business_impact_en": "Price anchoring increases conversions by 5-10%.",
      "fix_suggestion_nl": "Toon het duurdere plan eerst of voeg waarde toe: '€99/jaar = €0.27/dag'.",
      "fix_suggestion_en": "Show premium plan first or add value: '€99/year = €0.27/day'.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    {
      "id": "qs-pr-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "pricing",
      "question_nl": "Zijn er tooltips voor jargon-features (begrijpelijke uitleg)?",
      "question_en": "Are there tooltips for jargon features (plain-language explanation)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Tooltips verhogen begrip met 20-30% voor complexe functies.",
      "business_impact_en": "Tooltips increase comprehension by 20-30% for complex features.",
      "fix_suggestion_nl": "Voeg hover tooltips toe: 'API-toegang' = 'Verbind andere tools'.",
      "fix_suggestion_en": "Add hover tooltips: 'API access' = 'Connect other tools'.",
      "effort": "low",
      "applicable_to": ["pricing"]
    },
    // ════════════════════════════════════════════════════════════
    // BLOG / CONTENT (14 checks) - qs-bl-001 to qs-bl-014
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-bl-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is kopieerstructuur juist (één H1, juiste hiërarchie, beschrijvend)?",
      "question_en": "Is heading structure correct (one H1, proper hierarchy, descriptive)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Juiste kopieerstructuur verhoogt SEO ranking met 10-15%.",
      "business_impact_en": "Proper heading structure improves SEO ranking by 10-15%.",
      "fix_suggestion_nl": "Zorg voor één H1, H2/H3 nesting, beschrijvende tekst.",
      "fix_suggestion_en": "Ensure one H1, H2/H3 nesting, descriptive text.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is lesbaarheid op niveau (Flesch ≥60, alinea's ≤3 zinnen)?",
      "question_en": "Is readability at level (Flesch ≥60, paragraphs ≤3 sentences)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Leesbaarheid verhoogt engagement met 25-35%.",
      "business_impact_en": "Readability increases engagement by 25-35%.",
      "fix_suggestion_nl": "Streef naar Flesch 60+, korte alinea's, eenvoudig taalgebruik.",
      "fix_suggestion_en": "Target Flesch 60+, short paragraphs, simple language.",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Zijn CTA's geplaatst (boven vouw, midden inhoud, einde post)?",
      "question_en": "Are CTAs placed (above fold, mid-content, end-of-post)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Meervoudi CTA placement verhoogt klikken met 15-25%.",
      "business_impact_en": "Multiple CTA placement increases clicks by 15-25%.",
      "fix_suggestion_nl": "Voeg CTA toe: boven vouw, halverwege, en aan einde.",
      "fix_suggestion_en": "Add CTAs: above fold, mid-post, and at end.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is mobiel lezen geoptimaliseerd (≥16px font, 30-50 char lijnlengte)?",
      "question_en": "Is mobile reading optimized (≥16px font, 30-50 char line length)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Mobiel-geoptimaliseerde blog verhoogt engagement met 20-30%.",
      "business_impact_en": "Mobile-optimized blog increases engagement by 20-30%.",
      "fix_suggestion_nl": "Zorg voor ≥16px body, 30-50 karakters per regel, één kolom.",
      "fix_suggestion_en": "Ensure ≥16px body, 30-50 chars per line, single column.",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is typografie geoptimaliseerd (50-75 char/lijn, ≥16px body, regelafstand 1.4-1.6)?",
      "question_en": "Is typography optimized (50-75 chars/line, ≥16px body, line-height 1.4-1.6)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Goede typografie verhoogt leesbaarheid met 30-40%.",
      "business_impact_en": "Good typography increases readability by 30-40%.",
      "fix_suggestion_nl": "50-75 chars/regel, 16px+ body, regelafstand 1.5, voldoende witruimte.",
      "fix_suggestion_en": "50-75 chars/line, 16px+ body, 1.5 line-height, ample spacing.",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Zijn afbeeldingen geoptimaliseerd (alt text, <200KB, lazy loading, ≥1 per 300 woorden)?",
      "question_en": "Are images optimized (alt text, <200KB, lazy loading, ≥1 per 300 words)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Geoptimaliseerde afbeeldingen verhogen engagement met 30-40%.",
      "business_impact_en": "Optimized images increase engagement by 30-40%.",
      "fix_suggestion_nl": "Alt text, WebP <200KB, lazy load, één afbeelding per 300 woorden.",
      "fix_suggestion_en": "Alt text, WebP <200KB, lazy load, one image per 300 words.",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Zijn er interne links (≥3 contextuele links voor posts >1000 woorden)?",
      "question_en": "Are there internal links (≥3 contextual links for posts >1000 words)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Interne links verhogen SEO ranking met 10-15%, engagement met 15-20%.",
      "business_impact_en": "Internal links improve SEO ranking by 10-15%, engagement by 15-20%.",
      "fix_suggestion_nl": "Voeg ≥3 relevante interne links in voor >1000 woorden posts.",
      "fix_suggestion_en": "Add ≥3 relevant internal links for >1000 word posts.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is auteurgeloofwaardigheid aanwezig (genaamde auteur, foto, credentials-bio)?",
      "question_en": "Is author credibility present (named author, headshot, credential bio)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Auteur credibiliteit verhoogt vertrouwen met 20-30%.",
      "business_impact_en": "Author credibility increases trust by 20-30%.",
      "fix_suggestion_nl": "Toon auteur naam, professionele foto, credentials/bio.",
      "fix_suggestion_en": "Show author name, professional photo, credentials/bio.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Zijn inhoudfrissheid-indicatoren aanwezig (Gepubliceerd + Bijgewerkt data, schema)?",
      "question_en": "Is content freshness present (Published + Last Updated dates, schema)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Updatedatum verhoogt vertrouwen en SEO ranking met 10-15%.",
      "business_impact_en": "Updated date increases trust and SEO ranking by 10-15%.",
      "fix_suggestion_nl": "Toon 'Gepubliceerd' en 'Bijgewerkt' datum, implementeer schema.org/Article.",
      "fix_suggestion_en": "Show 'Published' and 'Updated' dates, implement schema.org/Article.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is ad/popup intrusiveness gecontroleerd (niet fullscreen op load, alleen na 30s/50% scroll)?",
      "question_en": "Is ad/popup intrusiveness controlled (no full-screen on load, only after 30s/50% scroll)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Intrusieve ads verhogen bounce rate met 30-40%. Gecontroleerde ads verhogen conversies.",
      "business_impact_en": "Intrusive ads increase bounce rate by 30-40%. Controlled ads boost conversions.",
      "fix_suggestion_nl": "Geen popups op laadtijd, alleen na 30 seconden of 50% scroll.",
      "fix_suggestion_en": "No popups on load, only after 30 seconds or 50% scroll.",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is er gerelateerde posts sectie (3-6 onderwerpen relevante artikelen)?",
      "question_en": "Is there related posts section (3-6 topically relevant articles)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Gerelateerde posts verhogen bezoekduur met 15-25%, verminderen bounce.",
      "business_impact_en": "Related posts increase visit duration by 15-25%, reduce bounce.",
      "fix_suggestion_nl": "Toon 3-6 gerelateerde artikelen aan einde post.",
      "fix_suggestion_en": "Show 3-6 related articles at end of post.",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is er inhoudsopgave (ankerlinks voor inhoud >1500 woorden)?",
      "question_en": "Is there table of contents (anchor links for content >1500 words)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Inhoudsopgave verhoogt scan-rate met 20-30% voor lange posts.",
      "business_impact_en": "Table of contents increases scan rate by 20-30% for long posts.",
      "fix_suggestion_nl": "Voeg ankerlinks-inhoud toe voor posts >1500 woorden.",
      "fix_suggestion_en": "Add anchor-linked table of contents for posts >1500 words.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Zijn sociale share knoppen aanwezig (≥3 relevante platforms)?",
      "question_en": "Are social share buttons present (≥3 relevant platforms)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Sociale share knoppen verhogen bereik met 10-20%.",
      "business_impact_en": "Social share buttons increase reach by 10-20%.",
      "fix_suggestion_nl": "Voeg Twitter, LinkedIn, Facebook share buttons toe.",
      "fix_suggestion_en": "Add Twitter, LinkedIn, Facebook share buttons.",
      "effort": "low",
      "applicable_to": ["blog"]
    },
    {
      "id": "qs-bl-014",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "blog",
      "question_nl": "Is er engagement mechanisme (comments of ander engagement systeem)?",
      "question_en": "Is there engagement mechanism (comment section or engagement system)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Comments verhogen engagement met 20-30%, bieden feedback.",
      "business_impact_en": "Comments increase engagement by 20-30%, provide feedback.",
      "fix_suggestion_nl": "Voeg comment section of engagement tool in (Disqus, native).",
      "fix_suggestion_en": "Add comment section or engagement tool (Disqus, native).",
      "effort": "medium",
      "applicable_to": ["blog"]
    },
    // ════════════════════════════════════════════════════════════
    // SAAS ONBOARDING (15 checks) - qs-ob-001 to qs-ob-015
    // ════════════════════════════════════════════════════════════
    {
      "id": "qs-ob-001",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Wordt eerste waarde bereikt snel (betekenisvolle 'aha' in 2-5 min, ≤5 stappen)?",
      "question_en": "Is time-to-first-value quick (meaningful 'aha' in 2-5 min, ≤5 steps)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Snelle waarde verhoogt activering met 30-40%, verminvert churn.",
      "business_impact_en": "Quick value increases activation by 30-40%, reduces churn.",
      "fix_suggestion_nl": "Beperk tot 3-5 stappen voor eerste nuttig gebraik, toon direct resulaat.",
      "fix_suggestion_en": "Limit to 3-5 steps for first useful action, show immediate result.",
      "effort": "high",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-002",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is aanmeld-frictie laag (≤3 verplichte velden, social login, geen verificatie)?",
      "question_en": "Is signup friction low (≤3 required fields, social login, no mandatory verify)?",
      "type": "auto",
      "severity": "critical",
      "business_impact_nl": "Laag signup friction verhoogt aanmeldingen met 20-30%.",
      "business_impact_en": "Low signup friction increases signups by 20-30%.",
      "fix_suggestion_nl": "Beperk tot naam/email/wachtwoord, voeg Google/LinkedIn login toe.",
      "fix_suggestion_en": "Limit to name/email/password, add Google/LinkedIn login.",
      "effort": "medium",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-003",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Persoonlijkheid onboarding flow (2-3 segmentatievragen)?",
      "question_en": "Does onboarding flow personalize (2-3 segmentation questions)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Gepersonaliseerde onboarding verhoogt engagement met 25-40%.",
      "business_impact_en": "Personalized onboarding increases engagement by 25-40%.",
      "fix_suggestion_nl": "Vraag rol (Koper/Verkoper), onderneming grootte, primair doel.",
      "fix_suggestion_en": "Ask role (Buyer/Seller), company size, primary goal.",
      "effort": "medium",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-004",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is onboarding checklist aanwezig (3-5 items met voortgangindicator)?",
      "question_en": "Is onboarding checklist present (3-5 items with progress indicator)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Onboarding checklisten verhogen activering met 20-30%.",
      "business_impact_en": "Onboarding checklists increase activation by 20-30%.",
      "fix_suggestion_nl": "Toon 3-5 taken: profiel vullen, eerste inhoud maken, integreren.",
      "fix_suggestion_en": "Show 3-5 tasks: complete profile, create first item, integrate.",
      "effort": "medium",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-005",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is lege toestand ontwerp aanwezig (uitleg, CTA, optionele samplegegevens)?",
      "question_en": "Is empty state design present (explanation, CTA, optional sample data)?",
      "type": "manual",
      "severity": "critical",
      "business_impact_nl": "Goed empty state design verhoogt eerste actie met 25-35%.",
      "business_impact_en": "Good empty state design increases first action by 25-35%.",
      "fix_suggestion_nl": "Toon illu, 'Geen items nog', CTA 'Maak eerste item', sample data knop.",
      "fix_suggestion_en": "Show illustration, 'No items yet', CTA 'Create first', sample data button.",
      "effort": "medium",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-006",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is progressieve openbaarmaking aanwezig (eerst 1-3 kern-features)?",
      "question_en": "Is progressive disclosure present (1-3 core features first)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Progressieve openbaarmaking verhoogt begrijping met 30-40%.",
      "business_impact_en": "Progressive disclosure increases understanding by 30-40%.",
      "fix_suggestion_nl": "Verberg geavanceerde features aanvankelijk, toon als gebruiker volwast.",
      "fix_suggestion_en": "Hide advanced features initially, show as user matures.",
      "effort": "high",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-007",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is interactieve begeleiding aanwezig (tooltips acties aanroepen, ≤5 stappen)?",
      "question_en": "Is interactive guidance present (tooltips prompting actions, ≤5 steps)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Interactieve gidsen verhogen voltooing met 20-30%.",
      "business_impact_en": "Interactive guides increase completion by 20-30%.",
      "fix_suggestion_nl": "Pijltips die klikken knoppen aansporen, max 5-stappig",
      "fix_suggestion_en": "Arrow tooltips prompting button clicks, max 5-step tour.",
      "effort": "high",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-008",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Zijn skip/dismiss opties aanwezig (op alle modals en tours)?",
      "question_en": "Are skip/dismiss options present (on every modal and tour)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Skip-opties verminderen frustatie met 20-30%, verbeteren beleving.",
      "business_impact_en": "Skip options reduce frustration by 20-30%, improve experience.",
      "fix_suggestion_nl": "Voeg 'Overslaan', 'X' knop toe op modals, tours, checklists.",
      "fix_suggestion_en": "Add 'Skip', 'X' button to modals, tours, checklists.",
      "effort": "low",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-009",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Zijn contextuele hulpmiddelen aanwezig (≥2 van: kenniscentrum, chat, hulplinks)?",
      "question_en": "Is contextual help present (≥2 of resource center, chat, help links)?",
      "type": "auto",
      "severity": "important",
      "business_impact_nl": "Contextuele hulp verhoogt hulpgemak met 25-35%.",
      "business_impact_en": "Contextual help increases help accessibility by 25-35%.",
      "fix_suggestion_nl": "Voeg kenniscentrum, live chat, help iconen toe.",
      "fix_suggestion_en": "Add resource center, live chat, help icons.",
      "effort": "high",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-010",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Zijn activerings-CTA's aanwezig (resultaat-gericht tekst, consistent kleuren)?",
      "question_en": "Are activation CTAs present (outcome-focused text, consistent color)?",
      "type": "manual",
      "severity": "important",
      "business_impact_nl": "Resultaat-gerichte CTA's verhogen klikken met 15-25%.",
      "business_impact_en": "Outcome-focused CTAs increase clicks by 15-25%.",
      "fix_suggestion_nl": "Gebruik 'Maak je eerste' of 'Verbind je account', niet 'Volgende'.",
      "fix_suggestion_en": "Use 'Create your first' or 'Connect your account', not 'Next'.",
      "effort": "low",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-011",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Zijn voorbeeld-gegevens/sjablonen beschikbaar op eerste gebruik?",
      "question_en": "Are sample data/templates available on first use?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Sample data/templates verhogen eerste actie met 15-25%.",
      "business_impact_en": "Sample data/templates increase first action by 15-25%.",
      "fix_suggestion_nl": "Voeg knop 'Laad samplegegevens' toe voor snelle start.",
      "fix_suggestion_en": "Add 'Load sample data' button for quick start.",
      "effort": "medium",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-012",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Wordt succesvol gevierd (op het voltooien van belangrijke mijlpalen)?",
      "question_en": "Is success celebrated (on completing key milestones)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Succesvieren verhoogt tevredenheid en retention met 10-15%.",
      "business_impact_en": "Success celebration increases satisfaction and retention by 10-15%.",
      "fix_suggestion_nl": "Toon confetti, mededelingen bij eerste actie, instellingen voltooid.",
      "fix_suggestion_en": "Show confetti, messages on first action, setup completed.",
      "effort": "low",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-013",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is er e-mail onboarding-reeks (gedragsgebaseerde triggers)?",
      "question_en": "Is there email onboarding sequence (behavioral triggers)?",
      "type": "manual",
      "severity": "minor",
      "business_impact_nl": "Gedragsgebaseerde email verhoogt engagement met 20-30%.",
      "business_impact_en": "Behavioral email increases engagement by 20-30%.",
      "fix_suggestion_nl": "Stuur email na signup, na eerste login, na eerste actie.",
      "fix_suggestion_en": "Send email on signup, after first login, after first action.",
      "effort": "high",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-014",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Is mobiele responsiviteit aanwezig (volledige onboarding werkt mobiel)?",
      "question_en": "Is mobile responsiveness present (full onboarding works mobile)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Mobiel onboarding verhoogt mobiele activering met 15-25%.",
      "business_impact_en": "Mobile onboarding increases mobile activation by 15-25%.",
      "fix_suggestion_nl": "Zorg dat alle onboarding stappen werken op mobiel.",
      "fix_suggestion_en": "Ensure all onboarding steps work on mobile.",
      "effort": "medium",
      "applicable_to": ["onboarding"]
    },
    {
      "id": "qs-ob-015",
      "legacy_id": null,
      "module": "quick-scan",
      "subcategory": "onboarding",
      "question_nl": "Zijn slimme standaardwaarden ingesteld (tijdzone, taal auto-gedetecteerd)?",
      "question_en": "Are smart defaults set (timezone, language auto-detected)?",
      "type": "auto",
      "severity": "minor",
      "business_impact_nl": "Slimme standaardwaarden verminderen invoeracties met 10-15%.",
      "business_impact_en": "Smart defaults reduce input actions by 10-15%.",
      "fix_suggestion_nl": "Auto-detecteer tijdzone, taal, regio uit browser/IP.",
      "fix_suggestion_en": "Auto-detect timezone, language, region from browser/IP.",
      "effort": "low",
      "applicable_to": ["onboarding"]
    }
  ]
};

// ═══════════════ LEGACY ID MAP ═══════════════
// Maps old question IDs (h1q1, cvq6, etc.) to new module IDs (ux-001, perf-001, etc.)
const LEGACY_ID_MAP = {
  "h1q1": "ux-001",
  "h1q2": "ux-002",
  "h1q3": "ux-003",
  "h1q4": "ux-004",
  "h1q5": "ux-005",
  "h1q6": "ux-006",
  "h1q7": "ux-007",
  "h2q1": "ux-008",
  "h2q2": "ux-009",
  "h2q3": "ux-010",
  "h2q4": "ux-011",
  "h2q5": "ux-012",
  "h2q6": "ux-013",
  "h3q1": "ux-014",
  "h3q2": "ux-015",
  "h3q3": "ux-016",
  "h3q4": "ux-017",
  "h3q5": "ux-018",
  "h3q6": "ux-019",
  "h4q1": "ux-020",
  "h4q2": "ux-021",
  "h4q3": "ux-022",
  "h4q4": "ux-023",
  "h4q5": "ux-024",
  "h4q6": "ux-025",
  "h5q1": "ux-026",
  "h5q2": "ux-027",
  "h5q3": "ux-028",
  "h5q4": "ux-029",
  "h5q5": "ux-030",
  "h5q6": "ux-031",
  "h6q1": "ux-032",
  "h6q2": "ux-033",
  "h6q3": "ux-034",
  "h6q4": "ux-035",
  "h6q5": "ux-036",
  "h6q6": "ux-037",
  "h7q1": "ux-038",
  "h7q2": "ux-039",
  "h7q3": "ux-040",
  "h7q4": "ux-041",
  "h7q5": "ux-042",
  "h8q1": "ux-043",
  "h8q2": "ux-044",
  "h8q3": "ux-045",
  "h8q4": "ux-046",
  "h8q5": "ux-047",
  "h8q6": "ux-048",
  "h9q1": "ux-049",
  "h9q2": "ux-050",
  "h9q3": "ux-051",
  "h9q4": "ux-052",
  "h9q5": "ux-053",
  "h9q6": "ux-054",
  "h10q1": "ux-055",
  "h10q2": "ux-056",
  "h10q3": "ux-057",
  "h10q4": "ux-058",
  "h10q5": "ux-059",
  "h10q6": "ux-060",
  "hcq1": "ux-061",
  "hcq2": "ux-062",
  "hcq3": "ux-063",
  "hcq4": "ux-064",
  "hcq5": "ux-065",
  "hcq6": "ux-066",
  "hcq7": "ux-067",
  "a11q1": "a11y-001",
  "a11q2": "a11y-002",
  "a11q3": "a11y-003",
  "a11q4": "a11y-004",
  "a11q5": "a11y-005",
  "a11q6": "a11y-006",
  "a11q7": "a11y-007",
  "kb1": "a11y-008",
  "kb2": "a11y-009",
  "kb3": "a11y-010",
  "kb4": "a11y-011",
  "kb5": "a11y-012",
  "kb6": "a11y-013",
  "kb7": "a11y-014",
  "md1": "a11y-015",
  "md2": "a11y-016",
  "md3": "a11y-017",
  "md4": "a11y-018",
  "md5": "a11y-019",
  "md6": "a11y-020",
  "md7": "a11y-021",
  "md8": "a11y-022",
  "fm1": "a11y-023",
  "fm2": "a11y-024",
  "fm3": "a11y-025",
  "fm4": "a11y-026",
  "fm5": "a11y-027",
  "fm6": "a11y-028",
  "fm7": "a11y-029",
  "fm8": "a11y-030",
  "sm1": "a11y-031",
  "sm2": "a11y-032",
  "sm3": "a11y-033",
  "sm4": "a11y-034",
  "sm5": "a11y-035",
  "sm6": "a11y-036",
  "sm7": "a11y-037",
  "sm8": "a11y-038",
  "sm9": "a11y-039",
  "sm10": "a11y-040",
  "sm11": "a11y-041",
  "sm12": "a11y-042",
  "cvq6": "perf-001",
  "cvq7": "perf-002",
  "seq1": "opseo-001",
  "seq2": "opseo-002",
  "seq3": "opseo-003",
  "seq4": "opseo-004",
  "seq5": "opseo-005",
  "mbq1": "mob-001",
  "mbq2": "mob-002",
  "mbq3": "mob-003",
  "mbq4": "mob-004",
  "mbq5": "mob-005",
  "cvq1": "cro-001",
  "cvq2": "cro-002",
  "cvq3": "cro-003",
  "cvq4": "cro-004",
  "cvq5": "cro-005"
};

// Reverse map: new ID → legacy ID
const REVERSE_LEGACY_MAP = {
  "ux-001": "h1q1",
  "ux-002": "h1q2",
  "ux-003": "h1q3",
  "ux-004": "h1q4",
  "ux-005": "h1q5",
  "ux-006": "h1q6",
  "ux-007": "h1q7",
  "ux-008": "h2q1",
  "ux-009": "h2q2",
  "ux-010": "h2q3",
  "ux-011": "h2q4",
  "ux-012": "h2q5",
  "ux-013": "h2q6",
  "ux-014": "h3q1",
  "ux-015": "h3q2",
  "ux-016": "h3q3",
  "ux-017": "h3q4",
  "ux-018": "h3q5",
  "ux-019": "h3q6",
  "ux-020": "h4q1",
  "ux-021": "h4q2",
  "ux-022": "h4q3",
  "ux-023": "h4q4",
  "ux-024": "h4q5",
  "ux-025": "h4q6",
  "ux-026": "h5q1",
  "ux-027": "h5q2",
  "ux-028": "h5q3",
  "ux-029": "h5q4",
  "ux-030": "h5q5",
  "ux-031": "h5q6",
  "ux-032": "h6q1",
  "ux-033": "h6q2",
  "ux-034": "h6q3",
  "ux-035": "h6q4",
  "ux-036": "h6q5",
  "ux-037": "h6q6",
  "ux-038": "h7q1",
  "ux-039": "h7q2",
  "ux-040": "h7q3",
  "ux-041": "h7q4",
  "ux-042": "h7q5",
  "ux-043": "h8q1",
  "ux-044": "h8q2",
  "ux-045": "h8q3",
  "ux-046": "h8q4",
  "ux-047": "h8q5",
  "ux-048": "h8q6",
  "ux-049": "h9q1",
  "ux-050": "h9q2",
  "ux-051": "h9q3",
  "ux-052": "h9q4",
  "ux-053": "h9q5",
  "ux-054": "h9q6",
  "ux-055": "h10q1",
  "ux-056": "h10q2",
  "ux-057": "h10q3",
  "ux-058": "h10q4",
  "ux-059": "h10q5",
  "ux-060": "h10q6",
  "ux-061": "hcq1",
  "ux-062": "hcq2",
  "ux-063": "hcq3",
  "ux-064": "hcq4",
  "ux-065": "hcq5",
  "ux-066": "hcq6",
  "ux-067": "hcq7",
  "a11y-001": "a11q1",
  "a11y-002": "a11q2",
  "a11y-003": "a11q3",
  "a11y-004": "a11q4",
  "a11y-005": "a11q5",
  "a11y-006": "a11q6",
  "a11y-007": "a11q7",
  "a11y-008": "kb1",
  "a11y-009": "kb2",
  "a11y-010": "kb3",
  "a11y-011": "kb4",
  "a11y-012": "kb5",
  "a11y-013": "kb6",
  "a11y-014": "kb7",
  "a11y-015": "md1",
  "a11y-016": "md2",
  "a11y-017": "md3",
  "a11y-018": "md4",
  "a11y-019": "md5",
  "a11y-020": "md6",
  "a11y-021": "md7",
  "a11y-022": "md8",
  "a11y-023": "fm1",
  "a11y-024": "fm2",
  "a11y-025": "fm3",
  "a11y-026": "fm4",
  "a11y-027": "fm5",
  "a11y-028": "fm6",
  "a11y-029": "fm7",
  "a11y-030": "fm8",
  "a11y-031": "sm1",
  "a11y-032": "sm2",
  "a11y-033": "sm3",
  "a11y-034": "sm4",
  "a11y-035": "sm5",
  "a11y-036": "sm6",
  "a11y-037": "sm7",
  "a11y-038": "sm8",
  "a11y-039": "sm9",
  "a11y-040": "sm10",
  "a11y-041": "sm11",
  "a11y-042": "sm12",
  "perf-001": "cvq6",
  "perf-002": "cvq7",
  "opseo-001": "seq1",
  "opseo-002": "seq2",
  "opseo-003": "seq3",
  "opseo-004": "seq4",
  "opseo-005": "seq5",
  "mob-001": "mbq1",
  "mob-002": "mbq2",
  "mob-003": "mbq3",
  "mob-004": "mbq4",
  "mob-005": "mbq5",
  "cro-001": "cvq1",
  "cro-002": "cvq2",
  "cro-003": "cvq3",
  "cro-004": "cvq4",
  "cro-005": "cvq5"
};

// ═══════════════ SUBCATEGORY NAMES ═══════════════
const SUBCATEGORY_NAMES = {
  'ux-usability': {
    'system-status': { nl: 'Zichtbaarheid Systeemstatus', en: 'System Status Visibility' },
    'real-world': { nl: 'Aansluiting Echte Wereld', en: 'Real World Match' },
    'user-control': { nl: 'Gebruikerscontrole & Vrijheid', en: 'User Control & Freedom' },
    'consistency': { nl: 'Consistentie & Standaarden', en: 'Consistency & Standards' },
    'error-prevention': { nl: 'Foutpreventie', en: 'Error Prevention' },
    'recognition': { nl: 'Herkenning > Herinnering', en: 'Recognition over Recall' },
    'flexibility': { nl: 'Flexibiliteit & Efficiëntie', en: 'Flexibility & Efficiency' },
    'aesthetics': { nl: 'Esthetiek & Minimalistisch Design', en: 'Aesthetics & Minimalist Design' },
    'error-recovery': { nl: 'Foutherstel', en: 'Error Recovery' },
    'help': { nl: 'Help & Documentatie', en: 'Help & Documentation' },
    'honeycomb': { nl: 'UX Honeycomb', en: 'UX Honeycomb' }
  },
  'accessibility': {
    'visual': { nl: 'Visuele Toegankelijkheid', en: 'Visual Accessibility' },
    'keyboard': { nl: 'Toetsenbord & Navigatie', en: 'Keyboard & Navigation' },
    'media': { nl: 'Media & Timing', en: 'Media & Timing' },
    'forms': { nl: 'Formulieren & Taal', en: 'Forms & Language' },
    'semantics': { nl: 'Semantiek & Structuur', en: 'Semantics & Structure' }
  },
  'performance': {
    'core-web-vitals': { nl: 'Core Web Vitals', en: 'Core Web Vitals' },
    'loading': { nl: 'Laadoptimalisatie', en: 'Loading Optimization' },
    'resources': { nl: 'Resource Optimalisatie', en: 'Resource Optimization' },
    'caching': { nl: 'Caching & Levering', en: 'Caching & Delivery' },
    'third-party': { nl: 'Third-party Scripts', en: 'Third-party Scripts' }
  },
  'technical-seo': {
    'crawlability': { nl: 'Crawlbaarheid', en: 'Crawlability' },
    'indexing': { nl: 'Indexering', en: 'Indexing' },
    'url-structure': { nl: 'URL Structuur', en: 'URL Structure' },
    'links': { nl: 'Links & Verwijzingen', en: 'Links & References' },
    'structured-data': { nl: 'Structured Data', en: 'Structured Data' },
    'international': { nl: 'Internationaal', en: 'International' }
  },
  'on-page-seo': {
    'meta-tags': { nl: 'Meta Tags', en: 'Meta Tags' },
    'headings': { nl: 'Heading Structuur', en: 'Heading Structure' },
    'content-seo': { nl: 'Content SEO', en: 'Content SEO' },
    'social-tags': { nl: 'Social Tags', en: 'Social Tags' },
    'images': { nl: 'Afbeeldingen', en: 'Images' }
  },
  'mobile': {
    'responsive': { nl: 'Responsive Design', en: 'Responsive Design' },
    'touch': { nl: 'Touch & Interactie', en: 'Touch & Interaction' },
    'navigation': { nl: 'Mobiele Navigatie', en: 'Mobile Navigation' },
    'performance-mobile': { nl: 'Mobiele Performance', en: 'Mobile Performance' },
    'content-mobile': { nl: 'Mobiele Content', en: 'Mobile Content' }
  },
  'cro-conversion': {
    'cta': { nl: 'Call-to-Action', en: 'Call-to-Action' },
    'value-prop': { nl: 'Waardepropositie', en: 'Value Proposition' },
    'funnel': { nl: 'Conversiefunnel', en: 'Conversion Funnel' },
    'social-proof': { nl: 'Social Proof', en: 'Social Proof' },
    'forms-cro': { nl: 'Formulier Optimalisatie', en: 'Form Optimization' }
  },
  'content': {
    'readability': { nl: 'Leesbaarheid', en: 'Readability' },
    'depth': { nl: 'Content Diepte', en: 'Content Depth' },
    'eeat': { nl: 'E-E-A-T Signalen', en: 'E-E-A-T Signals' },
    'freshness': { nl: 'Versheid & Actualiteit', en: 'Freshness & Currency' },
    'structure': { nl: 'Content Structuur', en: 'Content Structure' }
  },
  'figma-design': {
    'visual': { nl: 'Kleuren & Visueel', en: 'Colors & Visual' },
    'typography': { nl: 'Typografie', en: 'Typography' },
    'accessibility': { nl: 'Toegankelijkheid', en: 'Accessibility' },
    'structure': { nl: 'Structuur & Components', en: 'Structure & Components' },
    'responsive': { nl: 'Responsive & States', en: 'Responsive & States' }
  },
  'security': {
    'ssl': { nl: 'SSL & HTTPS', en: 'SSL & HTTPS' },
    'headers': { nl: 'Security Headers', en: 'Security Headers' },
    'vulnerabilities': { nl: 'Kwetsbaarheden', en: 'Vulnerabilities' }
  },
  'trust': {
    'social-proof': { nl: 'Social Proof', en: 'Social Proof' },
    'contact': { nl: 'Contactinformatie', en: 'Contact Information' },
    'reviews': { nl: 'Reviews & Beoordelingen', en: 'Reviews & Ratings' },
    'professionalism': { nl: 'Professionaliteit', en: 'Professionalism' }
  },
  'brand': {
    'visual-identity': { nl: 'Visuele Identiteit', en: 'Visual Identity' },
    'typography': { nl: 'Typografie', en: 'Typography' },
    'messaging': { nl: 'Merkcommunicatie', en: 'Brand Messaging' },
    'design-system': { nl: 'Design Systeem', en: 'Design System' }
  },
  'legal': {
    'gdpr': { nl: 'AVG / GDPR', en: 'GDPR' },
    'cookies': { nl: 'Cookie Consent', en: 'Cookie Consent' },
    'privacy': { nl: 'Privacy & Data', en: 'Privacy & Data' },
    'eaa': { nl: 'European Accessibility Act', en: 'European Accessibility Act' },
    'terms': { nl: 'Voorwaarden', en: 'Terms & Conditions' }
  },
  'analytics': {
    'ga4': { nl: 'Google Analytics 4', en: 'Google Analytics 4' },
    'tag-management': { nl: 'Tag Management', en: 'Tag Management' },
    'consent': { nl: 'Consent Management', en: 'Consent Management' },
    'events': { nl: 'Event Tracking', en: 'Event Tracking' },
    'reporting': { nl: 'Rapportage', en: 'Reporting' }
  },
  'quick-scan': {
    'landing': { nl: 'Landing Page', en: 'Landing Page' },
    'product': { nl: 'Productpagina', en: 'Product Page' },
    'checkout': { nl: 'Checkout & Cart', en: 'Checkout & Cart' },
    'homepage': { nl: 'Homepage', en: 'Homepage' },
    'about': { nl: 'Over Ons / Team', en: 'About / Team' },
    'contact': { nl: 'Contactpagina', en: 'Contact Page' },
    'optin': { nl: 'Opt-in / Lead Capture', en: 'Opt-in / Lead Capture' },
    'launch': { nl: 'Product Launch / Coming Soon', en: 'Product Launch / Coming Soon' },
    'pricing': { nl: 'Prijspagina', en: 'Pricing Page' },
    'blog': { nl: 'Blog / Content', en: 'Blog / Content' },
    'onboarding': { nl: 'SaaS Onboarding', en: 'SaaS Onboarding' }
  },
  'storytelling': {
    'messaging': { nl: 'Messaging & Boodschap', en: 'Messaging & Message' },
    'structure': { nl: 'Verhaalstructuur', en: 'Story Structure' },
    'persuasion': { nl: 'Overtuiging & CTA', en: 'Persuasion & CTA' }
  },
  'content-quality': {
    'readability': { nl: 'Leesbaarheid', en: 'Readability' },
    'structure': { nl: 'Tekststructuur', en: 'Text Structure' },
    'microcopy': { nl: 'Microcopy & Labels', en: 'Microcopy & Labels' },
    'quality': { nl: 'Contentkwaliteit', en: 'Content Quality' }
  },
  'persuasion': {
    'social-proof': { nl: 'Social Proof', en: 'Social Proof' },
    'trust': { nl: 'Vertrouwen & Veiligheid', en: 'Trust & Security' },
    'cta-optimization': { nl: 'CTA Optimalisatie', en: 'CTA Optimization' },
    'psychology': { nl: 'Overtuigingspsychologie', en: 'Persuasion Psychology' },
    'ethics': { nl: 'Ethiek & Dark Patterns', en: 'Ethics & Dark Patterns' }
  },
  'info-architecture': {
    'navigation': { nl: 'Navigatie', en: 'Navigation' },
    'wayfinding': { nl: 'Wayfinding & Oriëntatie', en: 'Wayfinding & Orientation' },
    'layout': { nl: 'Layout & Scanpatronen', en: 'Layout & Scan Patterns' },
    'mobile': { nl: 'Mobiele IA', en: 'Mobile IA' }
  },
  'eeat': {
    'identity': { nl: 'Identiteit & Contact', en: 'Identity & Contact' },
    'authority': { nl: 'Autoriteit & Bewijs', en: 'Authority & Evidence' },
    'experience': { nl: 'Ervaring & Originaliteit', en: 'Experience & Originality' }
  }
};

// ═══════════════ HELPER FUNCTIONS ═══════════════

/**
 * Build reviewSteps from active modules.
 * Each subcategory becomes one step, maintaining compatibility with existing UI.
 * @param {Object} moduleConfig - { 'ux-usability': { active: true, weight: 1.0 }, ... }
 * @returns {Array} reviewSteps-compatible array
 */
function buildReviewSteps(moduleConfig) {
  const steps = [];
  let stepNum = 1;

  // Support include_checks filter from focused bundles
  let activeModules = null;
  let includeChecks = null;
  if (moduleConfig && moduleConfig._modules) {
    const rawMods = moduleConfig._modules;
    includeChecks = moduleConfig._includeChecks || null;
    if (Array.isArray(rawMods)) {
      // Array-formaat (o.a. Figma-bundles): lijst van actieve module-ids
      activeModules = rawMods.length > 0 ? rawMods : null;
      moduleConfig = null; // clear so the forEach logic below works
    } else if (rawMods && typeof rawMods === 'object') {
      // Object-map-formaat (URL quick-scans): { moduleId: { active, weight, _pageType } }
      // Gebruik als moduleConfig zodat active-flags én _pageType-filter werken.
      moduleConfig = rawMods;
    } else {
      moduleConfig = null;
    }
  }

  MODULE_REGISTRY.modules.forEach(mod => {
    // If activeModules is set (from bundle), only show those modules
    let config = null;
    if (activeModules) {
      if (!activeModules.includes(mod.id)) return;
    } else {
      config = moduleConfig?.[mod.id];
      if (config && !config.active) return;
      if (!config && !mod.enabled_by_default) return;
    }

    let checks = MODULE_CHECKS[mod.id] || [];
    if (checks.length === 0) return;

    // Filter to only included checks if specified
    if (includeChecks) {
      checks = checks.filter(c => includeChecks.includes(c.id));
      if (checks.length === 0) return;
    }

    const subcatGroups = {};
    checks.forEach(check => {
      const sc = check.subcategory;
      if (!subcatGroups[sc]) subcatGroups[sc] = [];
      subcatGroups[sc].push(check);
    });

    let subcatOrder = mod.subcategories || Object.keys(subcatGroups);
    // Quick-scan: only show the subcategory matching the selected page type
    if (mod.id === 'quick-scan' && config?._pageType) {
      subcatOrder = subcatOrder.filter(sc => sc === config._pageType);
    }
    subcatOrder.forEach(sc => {
      const scChecks = subcatGroups[sc];
      if (!scChecks || scChecks.length === 0) return;
      
      const scName = SUBCATEGORY_NAMES[mod.id]?.[sc]?.nl || sc;
      const weight = config?.weight || mod.default_weight || 1.0;
      
      steps.push({
        id: `${mod.id}__${sc}`,
        moduleId: mod.id,
        subcategory: sc,
        title: `${stepNum}. ${scName}`,
        shortTitle: scName.length > 16 ? scName.substring(0, 14) + '…' : scName,
        desc: mod.description_nl,
        impact: 'high',
        moduleColor: mod.color,
        moduleIcon: mod.icon,
        moduleName: mod.name_nl,
        weight: weight,
        questions: scChecks.map(check => ({
          id: check.id,
          legacy_id: check.legacy_id,
          text: check.question_nl,
          text_en: check.question_en,
          type: check.type,
          severity: check.severity,
          business_impact_nl: check.business_impact_nl,
          business_impact_en: check.business_impact_en,
          fix_suggestion_nl: check.fix_suggestion_nl,
          fix_suggestion_en: check.fix_suggestion_en,
          effort: check.effort,
          applicable_to: check.applicable_to,
          auto_tool: check.auto_tool || null,
          auto_rule: check.auto_rule || null,
          auto_metric: check.auto_metric || null,
          hasContrastChecker: check.legacy_id === 'a11q1'
        }))
      });
      stepNum++;
    });
  });
  
  return steps;
}

/**
 * Migrate legacy answers to new IDs.
 * Call this when loading a project that has old-format answer keys.
 * @param {Object} answers - { 'h1q1': { score: 'good', notes: '...' }, ... }
 * @returns {Object} migrated answers with new IDs
 */
function migrateLegacyAnswers(answers) {
  if (!answers) return {};
  const migrated = {};
  Object.entries(answers).forEach(([key, value]) => {
    if (LEGACY_ID_MAP[key]) {
      migrated[LEGACY_ID_MAP[key]] = { ...value, _legacy_id: key };
    } else {
      migrated[key] = value;
    }
  });
  return migrated;
}

/**
 * Get bundle configuration by bundle type
 * @param {string} bundleId - 'e-commerce', 'saas', 'service-site', 'content-blog', 'landing-page'
 * @returns {Object} module config
 */
function getBundleConfig(bundleId) {
  const bundle = MODULE_REGISTRY.bundles[bundleId];
  if (!bundle) return getDefaultModuleConfig();
  // Always use _modules format so buildReviewSteps handles all bundle types consistently
  return {
    _modules: bundle.modules,
    _includeChecks: bundle.include_checks || null
  };
}

/**
 * Get default module config (all default-enabled modules active)
 */
function getDefaultModuleConfig() {
  const config = {};
  MODULE_REGISTRY.modules.forEach(mod => {
    config[mod.id] = { active: mod.enabled_by_default, weight: mod.default_weight };
  });
  return config;
}

/**
 * Calculate module-level score
 */
function calculateModuleScore(moduleId, answers) {
  const checks = MODULE_CHECKS[moduleId] || [];
  const scale = MODULE_REGISTRY.scoring;
  
  let totalWeighted = 0;
  let effectiveCount = 0;
  
  checks.forEach(check => {
    const a = answers[check.id];
    if (!a || !a.score) {
      effectiveCount++;
      return;
    }
    if (a.score === 'nvt') return;
    
    const val = scale.values[a.score === 'good' ? 'good' : a.score === 'ok' ? 'ok' : 'not_ok'] || 0;
    totalWeighted += val;
    effectiveCount++;
  });
  
  return effectiveCount > 0 ? totalWeighted / effectiveCount : 0;
}

/**
 * Calculate overall weighted score across all active modules
 */
function calculateOverallScore(moduleConfig, answers) {
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  MODULE_REGISTRY.modules.forEach(mod => {
    const config = moduleConfig?.[mod.id];
    if (config && !config.active) return;
    if (!config && !mod.enabled_by_default) return;
    
    const weight = config?.weight || mod.default_weight || 1.0;
    const score = calculateModuleScore(mod.id, answers);
    
    totalWeightedScore += score * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
}

// ═══════════════ FIGMA DESIGN MODULE ═══════════════
MODULE_REGISTRY.modules.push({
  id: 'figma-design',
  name_nl: 'Design Systeem & Visueel',
  name_en: 'Design System & Visual',
  icon: 'figma',
  color: '#a259ff',
  enabled_by_default: false,
  default_weight: 1.0,
  subcategories: ['visual', 'typography', 'accessibility', 'structure', 'responsive']
});

MODULE_CHECKS['figma-design'] = [
  // ── Subcategory: visual (Kleuren & Visueel) ──
  { id: 'fig-color-consistency', module: 'figma-design', subcategory: 'visual', question_nl: 'Wordt er een beperkt, consistent kleurenpalet gebruikt?', question_en: 'Is a limited, consistent color palette used?', severity: 'high', type: 'auto', business_impact_nl: 'Inconsistente kleuren maken een onprofessionele indruk en verlagen vertrouwen.', fix_suggestion_nl: 'Definieer een kleurenpalet met max 6-8 kleuren en gebruik Figma color styles.', source: 'Design Systems best practices' },
  { id: 'fig-images', module: 'figma-design', subcategory: 'visual', question_nl: 'Bevat het ontwerp echte afbeeldingen (geen placeholders)?', question_en: 'Does the design contain real images (not placeholders)?', severity: 'medium', type: 'auto', business_impact_nl: 'Designs met placeholders geven een onvolledig beeld van het eindresultaat.', fix_suggestion_nl: 'Gebruik echte content en afbeeldingen om een realistische beoordeling mogelijk te maken.', source: 'Content-first design' },
  { id: 'fig-visual-hierarchy', module: 'figma-design', subcategory: 'visual', question_nl: 'Is er een duidelijke visuele hiërarchie? (heading > subheading > body)', question_en: 'Is there a clear visual hierarchy?', severity: 'critical', type: 'manual', business_impact_nl: 'Zonder hiërarchie weet de gebruiker niet waar te beginnen — conversie daalt.', fix_suggestion_nl: 'Maak het belangrijkste element het grootst/duidelijkst. Gebruik grootte, kleur en whitespace.', source: 'Gestalt principles' },
  { id: 'fig-cta-clarity', module: 'figma-design', subcategory: 'visual', question_nl: 'Is de primaire CTA direct herkenbaar als klikbaar en opvallend?', question_en: 'Is the primary CTA clearly recognizable and prominent?', severity: 'critical', type: 'manual', business_impact_nl: 'Een onduidelijke CTA = gemiste conversies.', fix_suggestion_nl: 'Maak de CTA visueel dominant: contrasterende kleur, voldoende grootte, actiegericht label.', source: 'Conversion optimization' },
  { id: 'fig-whitespace', module: 'figma-design', subcategory: 'visual', question_nl: 'Is er voldoende whitespace tussen secties en elementen?', question_en: 'Is there sufficient whitespace between sections and elements?', severity: 'high', type: 'manual', business_impact_nl: 'Te weinig whitespace maakt het ontwerp overweldigend en moeilijk te scannen.', fix_suggestion_nl: 'Gebruik minimaal 24px tussen gerelateerde elementen en 48-80px tussen secties.', source: 'Visual design principles' },
  // ── Subcategory: typography (Typografie) ──
  { id: 'fig-font-consistency', module: 'figma-design', subcategory: 'typography', question_nl: 'Worden er maximaal 2-3 font families gebruikt?', question_en: 'Are no more than 2-3 font families used?', severity: 'high', type: 'auto', business_impact_nl: 'Te veel fonts verlagen laadsnelheid en visuele coherentie.', fix_suggestion_nl: 'Kies 1 font voor headings en 1 voor body. Gebruik variaties in weight/size i.p.v. extra fonts.', source: 'Typography best practices' },
  { id: 'fig-type-scale', module: 'figma-design', subcategory: 'typography', question_nl: 'Zijn font sizes gebaseerd op een consistent type scale systeem?', question_en: 'Are font sizes based on a consistent type scale system?', severity: 'medium', type: 'auto', business_impact_nl: 'Zonder type scale voelt het ontwerp rommelig en is het moeilijker te implementeren.', fix_suggestion_nl: 'Gebruik een type scale met 5-8 stappen, bijv. 12/14/16/20/24/32/48px.', source: 'Type Scale (typescale.com)' },
  { id: 'fig-min-text-size', module: 'figma-design', subcategory: 'typography', question_nl: 'Is alle tekst minimaal 12px, en bodytekst minimaal 14px?', question_en: 'Is all text at least 12px, and body text at least 14px?', severity: 'critical', type: 'auto', business_impact_nl: 'Te kleine tekst is onleesbaar op mobiel en slecht voor accessibility.', fix_suggestion_nl: 'Minimaal 12px voor labels, 14-16px voor bodytekst. Test op echte devices.', source: 'WCAG 1.4.4' },
  { id: 'fig-line-height', module: 'figma-design', subcategory: 'typography', question_nl: 'Heeft bodytekst voldoende regelafstand (≥1.4× font-size)?', question_en: 'Does body text have sufficient line-height (≥1.4× font-size)?', severity: 'high', type: 'auto', business_impact_nl: 'Krappe regelafstand maakt tekst moeilijk leesbaar, vooral op mobiel.', fix_suggestion_nl: 'Stel line-height in op 1.5× font-size voor bodytekst.', source: 'WCAG 1.4.12' },
  { id: 'fig-text-alignment', module: 'figma-design', subcategory: 'typography', question_nl: 'Is text alignment consistent (max 2 types, geen justified)?', question_en: 'Is text alignment consistent (max 2 types, no justified)?', severity: 'medium', type: 'auto', business_impact_nl: 'Inconsistente alignment en justified tekst verlagen leesbaarheid.', fix_suggestion_nl: 'Gebruik max 2 alignment types (left + center). Vermijd justified.', source: 'Typography best practices' },
  // ── Subcategory: accessibility (Toegankelijkheid) ──
  { id: 'fig-contrast', module: 'figma-design', subcategory: 'accessibility', question_nl: 'Voldoen alle tekst-achtergrond combinaties aan WCAG AA contrast (4.5:1)?', question_en: 'Do all text-background combinations meet WCAG AA contrast (4.5:1)?', severity: 'critical', type: 'auto', business_impact_nl: 'Onvoldoende contrast maakt tekst onleesbaar voor 8% van mannen (kleurenblind) en ouderen.', fix_suggestion_nl: 'Gebruik de ingebouwde contrast checker. Minimaal 4.5:1 voor normaal tekst, 3:1 voor groot tekst.', source: 'WCAG 1.4.3' },
  { id: 'fig-touch-targets', module: 'figma-design', subcategory: 'accessibility', question_nl: 'Zijn alle interactieve elementen minimaal 44×44px?', question_en: 'Are all interactive elements at least 44×44px?', severity: 'critical', type: 'auto', business_impact_nl: 'Te kleine touch targets leiden tot miskliks op mobiel — frustreert gebruikers.', fix_suggestion_nl: 'Maak alle knoppen, links en interactieve elementen minimaal 44×44px.', source: 'WCAG 2.5.5 / Apple HIG' },
  { id: 'fig-interaction-states', module: 'figma-design', subcategory: 'accessibility', question_nl: 'Zijn hover, active, disabled en focus states uitgewerkt?', question_en: 'Are interaction states designed?', severity: 'high', type: 'manual', business_impact_nl: 'Ontbrekende states leiden tot inconsistente implementatie en slechte toegankelijkheid.', fix_suggestion_nl: 'Ontwerp minimaal: default, hover, active/pressed, disabled en focus state.', source: 'Interaction design / WCAG 2.4.7' },
  // ── Subcategory: structure (Structuur & Components) ──
  { id: 'fig-spacing-grid', module: 'figma-design', subcategory: 'structure', question_nl: 'Is spacing gebaseerd op een consistent grid (4px of 8px base)?', question_en: 'Is spacing based on a consistent grid (4px or 8px base)?', severity: 'medium', type: 'auto', business_impact_nl: 'Inconsistente spacing maakt het ontwerp rommelig en moeilijker te implementeren.', fix_suggestion_nl: 'Gebruik een 4px of 8px spacing grid. Definieer spacing tokens: 4/8/12/16/24/32/48px.', source: 'Design Systems best practices' },
  { id: 'fig-component-reuse', module: 'figma-design', subcategory: 'structure', question_nl: 'Worden herbruikbare components (instances) voldoende gebruikt?', question_en: 'Are reusable components (instances) used sufficiently?', severity: 'high', type: 'auto', business_impact_nl: 'Zonder components is het ontwerp inconsistent en kostbaar om te onderhouden.', fix_suggestion_nl: 'Maak herhalende elementen tot Figma components. Streef naar >30% instance gebruik.', source: 'Figma best practices' },
  { id: 'fig-auto-layout', module: 'figma-design', subcategory: 'structure', question_nl: 'Gebruiken de meeste frames auto-layout?', question_en: 'Do most frames use auto-layout?', severity: 'medium', type: 'auto', business_impact_nl: 'Zonder auto-layout is het design niet responsive en de developer handoff slechter.', fix_suggestion_nl: 'Gebruik auto-layout op alle frames die in development responsive moeten zijn.', source: 'Figma best practices' },
  { id: 'fig-naming-layers', module: 'figma-design', subcategory: 'structure', question_nl: 'Zijn layers en frames duidelijk benoemd (geen "Frame 248")?', question_en: 'Are layers and frames clearly named?', severity: 'medium', type: 'manual', business_impact_nl: 'Slechte naamgeving maakt samenwerking met developers lastig.', fix_suggestion_nl: 'Geef alle top-level frames en key components beschrijvende namen.', source: 'Figma best practices' },
  // ── Subcategory: responsive (Responsive & States) ──
  { id: 'fig-responsive', module: 'figma-design', subcategory: 'responsive', question_nl: 'Is er een mobiel ontwerp aanwezig naast desktop?', question_en: 'Is there a mobile design alongside desktop?', severity: 'high', type: 'manual', business_impact_nl: '60%+ van het webverkeer is mobiel. Zonder mobiel ontwerp wordt dit overgeslagen.', fix_suggestion_nl: 'Ontwerp mobile-first of maak tenminste een responsive variant voor de belangrijkste schermen.', source: 'Responsive design' },
  { id: 'fig-empty-states', module: 'figma-design', subcategory: 'responsive', question_nl: 'Zijn lege states en error states ontworpen?', question_en: 'Are empty states and error states designed?', severity: 'medium', type: 'manual', business_impact_nl: 'Lege states zijn vaak het eerste wat een nieuwe gebruiker ziet.', fix_suggestion_nl: 'Ontwerp: lege lijsten, geen zoekresultaten, formulierfouten, 404, offline state.', source: 'UX best practices' }
];

MODULE_REGISTRY.bundles['qs-figma-general'] = {
  id: 'qs-figma-general',
  name_nl: 'Figma Design Quick Scan',
  name_en: 'Figma Design Quick Scan',
  icon_lucide: 'figma',
  is_quick_scan: true,
  source_type: 'figma',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['figma-design'],
  description_nl: 'Automatische analyse van kleuren, typografie, spacing, components en accessibility in je Figma design.'
};

MODULE_REGISTRY.bundles['qs-figma-accessibility'] = {
  id: 'qs-figma-accessibility',
  name_nl: 'Figma Accessibility Scan',
  name_en: 'Figma Accessibility Scan',
  icon_lucide: 'eye',
  is_quick_scan: true,
  source_type: 'figma',
  estimated_duration_nl: '8-12 min',
  estimated_duration_en: '8-12 min',
  modules: ['figma-design'],
  include_checks: ['fig-contrast', 'fig-min-text-size', 'fig-touch-targets', 'fig-line-height', 'fig-visual-hierarchy', 'fig-interaction-states'],
  description_nl: 'Focus op WCAG contrast, leesbaarheid, touch targets en interaction states.'
};

MODULE_REGISTRY.bundles['qs-figma-typography'] = {
  id: 'qs-figma-typography',
  name_nl: 'Figma Typografie Scan',
  name_en: 'Figma Typography Scan',
  icon_lucide: 'type',
  is_quick_scan: true,
  source_type: 'figma',
  estimated_duration_nl: '5-10 min',
  estimated_duration_en: '5-10 min',
  modules: ['figma-design'],
  include_checks: ['fig-font-consistency', 'fig-type-scale', 'fig-min-text-size', 'fig-line-height', 'fig-text-alignment', 'fig-visual-hierarchy'],
  description_nl: 'Analyse van fonts, type scale, regelafstand, alignment en visuele hiërarchie.'
};

MODULE_REGISTRY.bundles['qs-figma-designsystem'] = {
  id: 'qs-figma-designsystem',
  name_nl: 'Figma Design System Scan',
  name_en: 'Figma Design System Scan',
  icon_lucide: 'layers',
  is_quick_scan: true,
  source_type: 'figma',
  estimated_duration_nl: '8-12 min',
  estimated_duration_en: '8-12 min',
  modules: ['figma-design'],
  include_checks: ['fig-color-consistency', 'fig-font-consistency', 'fig-spacing-grid', 'fig-component-reuse', 'fig-auto-layout', 'fig-naming-layers'],
  description_nl: 'Check op kleurenpalet, components hergebruik, spacing grid, auto-layout en naamgeving.'
};

MODULE_REGISTRY.bundles['qs-figma-landing'] = {
  id: 'qs-figma-landing',
  name_nl: 'Figma Landing Page Scan',
  name_en: 'Figma Landing Page Scan',
  icon_lucide: 'layout-template',
  is_quick_scan: true,
  source_type: 'figma',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['figma-design'],
  include_checks: ['fig-visual-hierarchy', 'fig-cta-clarity', 'fig-whitespace', 'fig-contrast', 'fig-responsive', 'fig-color-consistency', 'fig-font-consistency', 'fig-touch-targets', 'fig-images'],
  description_nl: 'Conversie-gerichte scan: CTA, hiërarchie, whitespace, responsive en visuele impact.'
};

MODULE_REGISTRY.bundles['qs-figma-mobile'] = {
  id: 'qs-figma-mobile',
  name_nl: 'Figma Mobile App Scan',
  name_en: 'Figma Mobile App Scan',
  icon_lucide: 'smartphone',
  is_quick_scan: true,
  source_type: 'figma',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['figma-design'],
  include_checks: ['fig-touch-targets', 'fig-min-text-size', 'fig-contrast', 'fig-spacing-grid', 'fig-component-reuse', 'fig-auto-layout', 'fig-interaction-states', 'fig-empty-states', 'fig-naming-layers'],
  description_nl: 'Mobile-specifiek: touch targets, leesbare tekst, spacing, interaction states en empty states.'
};

// ═══════════════ STORYTELLING & MESSAGING MODULE ═══════════════
MODULE_REGISTRY.modules.push({
  id: 'storytelling',
  name_nl: 'Storytelling & Messaging',
  name_en: 'Storytelling & Messaging',
  icon: 'message-circle',
  color: '#8b5cf6',
  enabled_by_default: false,
  default_weight: 1.0,
  subcategories: ['messaging', 'structure', 'persuasion']
});

MODULE_CHECKS['storytelling'] = [
  // ── Subcategory: messaging ──
  { id: 'st-you-vs-we', module: 'storytelling', subcategory: 'messaging', question_nl: 'Spreekt de pagina de bezoeker aan? ("jij/je/u" meer dan "wij/ons")', question_en: 'Does the page address the visitor? ("you/your" more than "we/our")', severity: 'high', type: 'auto', business_impact_nl: 'Pagina\'s die de klant centraal zetten converteren significant beter.', fix_suggestion_nl: 'Herschrijf kopij met de klant als onderwerp. Verhouding "jij/je/u" vs "wij/ons" moet minimaal 2:1 zijn.', source: 'StoryBrand (Donald Miller)' },
  { id: 'st-above-fold-complete', module: 'storytelling', subcategory: 'messaging', question_nl: 'Zijn headline + subheadline + CTA + trust-element alle vier zichtbaar boven de fold?', question_en: 'Are headline, subheadline, CTA, and trust element all visible above the fold?', severity: 'critical', type: 'auto', business_impact_nl: '80% van bezoekers leest alleen de headline. Alles boven de fold moet het verhaal vertellen.', fix_suggestion_nl: 'Zorg dat H1 + ondertitel + primaire CTA + minimaal 1 trust-element zichtbaar zijn zonder scrollen.', source: 'NNGroup' },
  { id: 'st-headline-length', module: 'storytelling', subcategory: 'messaging', question_nl: 'Is de primaire headline 5-12 woorden? (optimaal voor begrip en scanning)', question_en: 'Is the primary headline 5-12 words?', severity: 'medium', type: 'auto', business_impact_nl: 'Te lange headlines worden niet gelezen. Te korte missen context.', fix_suggestion_nl: 'Herschrijf de headline naar 5-12 woorden. Focus op het belangrijkste voordeel voor de bezoeker.', source: 'Ogilvy / Copyblogger research' },
  { id: 'st-grunt-test', module: 'storytelling', subcategory: 'messaging', question_nl: 'Grunt Test: Kan een nieuwe bezoeker binnen 5 seconden zien wat je aanbiedt, hoe het helpt, en wat ze moeten doen?', question_en: '5-second Grunt Test: Can a visitor identify what you offer, how it helps, and what to do next?', severity: 'critical', type: 'manual', business_impact_nl: 'Gebruikers beslissen in 10-20 seconden of ze blijven.', fix_suggestion_nl: 'Laat iemand 5 seconden naar je pagina kijken. Kunnen ze vertellen: 1) wat je doet, 2) voor wie, 3) wat de volgende stap is?', source: 'StoryBrand Grunt Test / NNGroup' },
  { id: 'st-hero-readability', module: 'storytelling', subcategory: 'messaging', question_nl: 'Is de hero-tekst op maximaal groep 8 leesniveau? (Flesch-Kincaid ≤ 8)', question_en: 'Is the hero text at grade 8 reading level or below?', severity: 'high', type: 'auto', business_impact_nl: 'Tekst op 5e-7e klas niveau converteert 2x beter dan academisch niveau.', fix_suggestion_nl: 'Gebruik korte zinnen (max 15 woorden), eenvoudige woorden, en vermijd jargon in de hero-sectie.', source: 'Unbounce / Flesch-Kincaid' },
  // ── Subcategory: structure ──
  { id: 'st-problem', module: 'storytelling', subcategory: 'structure', question_nl: 'Benoemt de pagina duidelijk het specifieke probleem van de doelgroep?', question_en: 'Does the page clearly state the target audience\'s specific problem?', severity: 'critical', type: 'manual', business_impact_nl: 'Mensen kopen oplossingen voor problemen. Zonder probleemherkenning is er geen motivatie.', fix_suggestion_nl: 'Benoem het probleem in de woorden van de klant, niet in bedrijfstaal.', source: 'PAS framework / Kahneman' },
  { id: 'st-agitation', module: 'storytelling', subcategory: 'structure', question_nl: 'Beschrijft de pagina de gevolgen van inactie? (emotioneel, financieel, of praktisch)', question_en: 'Does the page describe consequences of inaction?', severity: 'high', type: 'manual', business_impact_nl: 'Mensen voelen verlies 2x sterker dan winst (Kahneman).', fix_suggestion_nl: 'Voeg een sectie toe die beschrijft wat er gebeurt als de bezoeker niets doet. Wees specifiek en eerlijk.', source: 'PAS framework / Prospect Theory' },
  { id: 'st-solution', module: 'storytelling', subcategory: 'structure', question_nl: 'Sluit de oplossing direct aan op het genoemde probleem? (niet generiek)', question_en: 'Does the solution directly address the stated problem?', severity: 'high', type: 'manual', business_impact_nl: 'Als je oplossing niet aansluit op het probleem dat je noemde, verlies je geloofwaardigheid.', fix_suggestion_nl: 'Koppel elke feature/benefit expliciet terug aan het eerder genoemde probleem.', source: 'StoryBrand / PAS' },
  { id: 'st-transformation', module: 'storytelling', subcategory: 'structure', question_nl: 'Schildert de pagina een helder "na"-beeld van het leven van de klant na gebruik?', question_en: 'Does the page paint a vivid "after" picture?', severity: 'medium', type: 'manual', business_impact_nl: 'Mensen kopen transformaties, niet producten.', fix_suggestion_nl: 'Voeg een "Stel je voor..."-sectie toe of gebruik klantresultaten die de transformatie laten zien.', source: 'StoryBrand (Success element)' },
  { id: 'st-message-hierarchy', module: 'storytelling', subcategory: 'structure', question_nl: 'Volgt de pagina een logische verhaallijn? (Probleem → Oplossing → Bewijs → CTA)', question_en: 'Does the page follow a logical narrative arc?', severity: 'high', type: 'manual', business_impact_nl: 'Een logische volgorde leidt de bezoeker naar conversie.', fix_suggestion_nl: 'Optimale volgorde: hero → probleem → oplossing → social proof → features/benefits → herhaalde CTA → FAQ → footer.', source: 'AIDA / StoryBrand' },
  { id: 'st-inverted-pyramid', module: 'storytelling', subcategory: 'structure', question_nl: 'Staat de kernboodschap bovenaan? (niet pas na scrollen duidelijk wat je doet)', question_en: 'Is the key message at the top?', severity: 'high', type: 'manual', business_impact_nl: '80% leest alleen de headline.', fix_suggestion_nl: 'Leid met je conclusie/belofte, niet met je achtergrondverhaal.', source: 'NNGroup (28% woorden gelezen)' },
  // ── Subcategory: persuasion ──
  { id: 'st-single-cta', module: 'storytelling', subcategory: 'persuasion', question_nl: 'Is er per viewport maar één dominante CTA? (geen concurrerende acties)', question_en: 'Is there only one dominant CTA per viewport?', severity: 'critical', type: 'auto', business_impact_nl: 'Pagina\'s met 1 CTA converteren 13.5%, met 5+ CTA\'s daalt dat naar 10.5%.', fix_suggestion_nl: 'Kies 1 primaire actie per schermvullend gedeelte.', source: 'Unbounce (41.000 landing pages studie)' },
  { id: 'st-heading-hierarchy', module: 'storytelling', subcategory: 'persuasion', question_nl: 'Is H1 visueel dominant met duidelijke grootte-afname naar H2 en H3?', question_en: 'Is H1 visually dominant with clear size progression?', severity: 'high', type: 'auto', business_impact_nl: 'Zonder visuele hiërarchie weet de bezoeker niet waar te beginnen.', fix_suggestion_nl: 'H1 moet het grootste element zijn. Minimaal 25% grootteverschil tussen heading-niveaus.', source: 'Gestalt principes' },
  { id: 'st-cta-benefit', module: 'storytelling', subcategory: 'persuasion', question_nl: 'Gebruikt de CTA een actiewerkwoord + voordeel? (niet "Verstuur" of "Klik hier")', question_en: 'Does the CTA use action verb + benefit?', severity: 'critical', type: 'semi-auto', business_impact_nl: 'Persoonlijke CTA\'s presteren 202% beter dan generieke (HubSpot).', fix_suggestion_nl: 'Vervang "Submit/Verstuur" door actie + waarde, bijv. "Ontvang je gratis rapport".', source: 'HubSpot / ContentVerve' },
  { id: 'st-clear-plan', module: 'storytelling', subcategory: 'persuasion', question_nl: 'Toont de pagina een duidelijk stappen-plan (3-4 stappen) hoe de bezoeker kan starten?', question_en: 'Does the page show a clear 3-4 step plan?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Een zichtbaar plan verlaagt de drempel om actie te ondernemen.', fix_suggestion_nl: 'Voeg een "Hoe het werkt" sectie toe met 3-4 stappen.', source: 'StoryBrand / Fogg Behavior Model' },
  { id: 'st-so-what', module: 'storytelling', subcategory: 'persuasion', question_nl: '"En wat dan?"-test: Beantwoordt elke sectie de vraag "waarom zou ik dit belangrijk vinden?"', question_en: 'So What test: Does every section answer "why should I care?"', severity: 'high', type: 'manual', business_impact_nl: 'Secties die alleen features noemen zonder benefits worden overgeslagen.', fix_suggestion_nl: 'Gebruik de "because bridge": feature → voordeel → resultaat → emotioneel voordeel.', source: 'So What Test' }
];

// ═══════════════ CONTENT & COPY KWALITEIT MODULE ═══════════════
MODULE_REGISTRY.modules.push({
  id: 'content-quality',
  name_nl: 'Content & Copy Kwaliteit',
  name_en: 'Content & Copy Quality',
  icon: 'file-text',
  color: '#06b6d4',
  enabled_by_default: false,
  default_weight: 1.0,
  subcategories: ['readability', 'structure', 'microcopy', 'quality']
});

MODULE_CHECKS['content-quality'] = [
  // ── Subcategory: readability ──
  { id: 'cq-readability', module: 'content-quality', subcategory: 'readability', question_nl: 'Is de tekst goed leesbaar? (Flesch Reading Ease ≥ 60, of ≥ 50 voor B2B)', question_en: 'Is text readable? (Flesch Reading Ease ≥ 60)', severity: 'critical', type: 'auto', business_impact_nl: 'Tekst op 5e-7e klas niveau converteert 11.1% vs 5.3% voor academisch niveau.', fix_suggestion_nl: 'Gebruik korte zinnen, eenvoudige woorden, en actieve schrijfstijl. Streef naar Flesch score 60-70.', source: 'Unbounce / Flesch-Kincaid' },
  { id: 'cq-sentence-length', module: 'content-quality', subcategory: 'readability', question_nl: 'Is de gemiddelde zinslengte maximaal 20 woorden?', question_en: 'Is average sentence length ≤ 20 words?', severity: 'high', type: 'auto', business_impact_nl: 'Optimale zinslengte voor conversie is 10-11 woorden.', fix_suggestion_nl: 'Splits lange zinnen op. Eén idee per zin.', source: 'Entropy study (2021)' },
  { id: 'cq-passive-voice', module: 'content-quality', subcategory: 'readability', question_nl: 'Wordt passieve schrijfstijl beperkt gebruikt? (max 15% passieve zinnen)', question_en: 'Is passive voice limited? (max 15%)', severity: 'medium', type: 'auto', business_impact_nl: 'Passieve zinnen zijn zwakker en moeilijker te lezen.', fix_suggestion_nl: 'Herschrijf passieve zinnen naar actief. "Het formulier wordt verstuurd" → "Verstuur het formulier".', source: 'Web writing best practices' },
  { id: 'cq-jargon', module: 'content-quality', subcategory: 'readability', question_nl: 'Wordt vakjargon vermeden of uitgelegd?', question_en: 'Is jargon avoided or explained?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Jargon duwt bezoekers weg die geen insider zijn.', fix_suggestion_nl: 'Vervang jargon door eenvoudige alternatieven. Leg vakterm uit bij eerste gebruik.', source: 'NNGroup (Nielsen Heuristic #2)' },
  // ── Subcategory: structure ──
  { id: 'cq-paragraph-length', module: 'content-quality', subcategory: 'structure', question_nl: 'Zijn paragrafen kort? (max 100 woorden / 4 zinnen per paragraaf)', question_en: 'Are paragraphs short? (max 100 words / 4 sentences)', severity: 'high', type: 'auto', business_impact_nl: 'Korte paragrafen verhogen scanbaarheid.', fix_suggestion_nl: 'Breek lange paragrafen op. Maximaal 4 zinnen per paragraaf.', source: 'NNGroup (+124% usability)' },
  { id: 'cq-text-walls', module: 'content-quality', subcategory: 'structure', question_nl: 'Geen tekst-muren: komt er elke 300 woorden een subheading voor?', question_en: 'No walls of text: subheading every 300 words?', severity: 'high', type: 'auto', business_impact_nl: 'Tekst-muren worden overgeslagen.', fix_suggestion_nl: 'Voeg H2/H3 subheadings toe elke 2-4 paragrafen.', source: 'NNGroup (scangedrag)' },
  { id: 'cq-heading-hierarchy', module: 'content-quality', subcategory: 'structure', question_nl: 'Is de heading-hiërarchie correct? (H1 → H2 → H3, geen niveaus overgeslagen)', question_en: 'Is heading hierarchy correct?', severity: 'medium', type: 'auto', business_impact_nl: 'Correcte hiërarchie verbetert scanbaarheid en SEO.', fix_suggestion_nl: 'Eén H1 per pagina. Gebruik H2 voor secties, H3 voor subsecties.', source: 'WCAG / SEO best practices' },
  { id: 'cq-bold-scanning', module: 'content-quality', subcategory: 'structure', question_nl: 'Zijn kernwoorden en -zinnen vetgedrukt voor scanning?', question_en: 'Are key terms bolded for scanning?', severity: 'medium', type: 'auto', business_impact_nl: 'Vetgedrukte woorden fungeren als ankerpunten bij het scannen.', fix_suggestion_nl: 'Maak 2-3 kernwoorden per paragraaf vet.', source: 'NNGroup (+124% usability)' },
  // ── Subcategory: microcopy ──
  { id: 'cq-cta-labels', module: 'content-quality', subcategory: 'microcopy', question_nl: 'Gebruiken CTA-knoppen specifieke actiewerkwoorden? (niet "Submit", "Klik hier")', question_en: 'Do CTA buttons use specific action verbs?', severity: 'critical', type: 'auto', business_impact_nl: '"Start mijn gratis proefperiode" presteert 90% beter dan generiek.', fix_suggestion_nl: 'Vervang generieke labels door actie + waarde.', source: 'ContentVerve / HubSpot' },
  { id: 'cq-form-labels', module: 'content-quality', subcategory: 'microcopy', question_nl: 'Hebben formuliervelden zichtbare labels? (niet alleen placeholders)', question_en: 'Do form fields have visible labels?', severity: 'high', type: 'auto', business_impact_nl: 'Placeholders verdwijnen bij invullen.', fix_suggestion_nl: 'Voeg altijd een <label> toe boven of naast het veld.', source: 'NNGroup / WCAG' },
  { id: 'cq-generic-links', module: 'content-quality', subcategory: 'microcopy', question_nl: 'Geen generieke link-tekst? (geen "Klik hier", "Lees meer")', question_en: 'No generic link text?', severity: 'medium', type: 'auto', business_impact_nl: 'Generieke links geven geen informatie-geur.', fix_suggestion_nl: 'Vervang "Lees meer" door beschrijvende tekst.', source: 'NNGroup / WCAG 2.4.4' },
  { id: 'cq-microcopy', module: 'content-quality', subcategory: 'microcopy', question_nl: 'Is microcopy consistent? (dezelfde actie = dezelfde benaming overal)', question_en: 'Is microcopy consistent across the site?', severity: 'medium', type: 'semi-auto', business_impact_nl: '"Winkelwagen" op de ene pagina en "Mandje" op de andere schept verwarring.', fix_suggestion_nl: 'Maak een woordenlijst voor je site.', source: 'Smashing Magazine' },
  { id: 'cq-error-messages', module: 'content-quality', subcategory: 'microcopy', question_nl: 'Bevatten foutmeldingen zowel een uitleg als een oplossing?', question_en: 'Do error messages include both explanation and remediation?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Foutmeldingen zonder oplossing frustreren.', fix_suggestion_nl: 'Elke foutmelding: 1) wat er mis ging, 2) hoe je het oplost.', source: 'NNGroup / WCAG' },
  // ── Subcategory: quality ──
  { id: 'cq-author-present', module: 'content-quality', subcategory: 'quality', question_nl: 'Zijn er auteur/expertise-signalen op content pagina\'s?', question_en: 'Are author/expertise signals present?', severity: 'medium', type: 'auto', business_impact_nl: 'Auteurschap verhoogt geloofwaardigheid en E-E-A-T score.', fix_suggestion_nl: 'Voeg auteur-naam, foto, en korte bio toe.', source: 'Google E-E-A-T' },
  { id: 'cq-tone-consistency', module: 'content-quality', subcategory: 'quality', question_nl: 'Is de tone of voice consistent op alle pagina\'s?', question_en: 'Is tone of voice consistent across pages?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Inconsistente toon schaadt merkperceptie en vertrouwen.', fix_suggestion_nl: 'Bepaal je merkpersoonlijkheid en toets alle tekst hieraan.', source: 'NNGroup (4 Dimensions of Tone of Voice)' },
  { id: 'cq-content-current', module: 'content-quality', subcategory: 'quality', question_nl: 'Is de content actueel? (geen verouderde datums of achterhaalde informatie)', question_en: 'Is content current and up-to-date?', severity: 'high', type: 'manual', business_impact_nl: 'Verouderde content ondermijnt geloofwaardigheid.', fix_suggestion_nl: 'Controleer alle datums en verwijzingen.', source: 'E-E-A-T / Content freshness' },
  { id: 'cq-benefits-not-features', module: 'content-quality', subcategory: 'quality', question_nl: 'Beschrijft de tekst voordelen voor de klant, niet alleen product-features?', question_en: 'Does copy describe benefits, not just features?', severity: 'critical', type: 'manual', business_impact_nl: 'Features vertellen wat het is. Benefits vertellen waarom het uitmaakt.', fix_suggestion_nl: 'Bij elke feature, voeg toe: "...zodat je [voordeel voor klant]".', source: 'Copywriting fundamentals / AIDA' },
  { id: 'cq-content-accuracy', module: 'content-quality', subcategory: 'quality', question_nl: 'Zijn claims onderbouwd met bewijs? (cijfers, bronnen, case studies)', question_en: 'Are claims supported by evidence?', severity: 'high', type: 'manual', business_impact_nl: 'Ononderbouwde claims worden niet geloofd.', fix_suggestion_nl: 'Onderbouw elke claim met specifieke cijfers of externe bronnen.', source: 'E-E-A-T / Cialdini (authority)' }
];

// ═══════════════ PERSUASION & TRUST MODULE ═══════════════
MODULE_REGISTRY.modules.push({
  id: 'persuasion',
  name_nl: 'Overtuigingskracht & Vertrouwen',
  name_en: 'Persuasion & Trust',
  icon: 'shield-check',
  color: '#f59e0b',
  enabled_by_default: false,
  default_weight: 1.0,
  subcategories: ['social-proof', 'trust', 'cta-optimization', 'psychology', 'ethics']
});

MODULE_CHECKS['persuasion'] = [
  // ── Subcategory: social-proof ──
  { id: 'ps-social-proof', module: 'persuasion', subcategory: 'social-proof', question_nl: 'Zijn er minimaal 2 soorten social proof zichtbaar? (testimonials, logo\'s, reviews, cijfers)', question_en: 'Are at least 2 types of social proof visible?', severity: 'critical', type: 'auto', business_impact_nl: 'Producten met 5 reviews verkopen 270% meer.', fix_suggestion_nl: 'Voeg minimaal toe: klantlogo\'s + testimonials, of reviews + gebruikerscijfers.', source: 'Cialdini / Spiegel Research Center' },
  { id: 'ps-client-logos', module: 'persuasion', subcategory: 'social-proof', question_nl: 'Zijn er herkenbare klantlogo\'s zichtbaar boven de fold?', question_en: 'Are recognizable client logos visible above fold?', severity: 'high', type: 'auto', business_impact_nl: 'Bit.io voegde logo\'s toe en conversie steeg van 5.6% naar 11.8%.', fix_suggestion_nl: 'Toon 4-6 herkenbare logo\'s. Grijze versies ogen professioneler.', source: 'CXL / Bit.io case study' },
  { id: 'ps-testimonials-specific', module: 'persuasion', subcategory: 'social-proof', question_nl: 'Zijn testimonials specifiek? (naam, foto, bedrijf, meetbaar resultaat)', question_en: 'Are testimonials specific?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Generieke testimonials zijn weinig overtuigend.', fix_suggestion_nl: 'Vraag klanten om: naam + functie, foto, en een specifiek resultaat.', source: 'Cialdini / CXL' },
  { id: 'ps-reviews-recent', module: 'persuasion', subcategory: 'social-proof', question_nl: 'Zijn reviews/testimonials recent? (binnen 6 maanden)', question_en: 'Are reviews recent?', severity: 'medium', type: 'manual', business_impact_nl: '83% van kopers vindt reviews ouder dan 3 maanden niet meer relevant.', fix_suggestion_nl: 'Ververs testimonials minimaal elk half jaar.', source: 'BrightLocal Consumer Review Survey' },
  // ── Subcategory: trust ──
  { id: 'ps-trust-badges', module: 'persuasion', subcategory: 'trust', question_nl: 'Zijn er vertrouwenssignalen (SSL badge, betaalproviders, keurmerken) bij formulieren?', question_en: 'Are trust badges present near forms/payment?', severity: 'critical', type: 'auto', business_impact_nl: '19% verlaat de checkout door gebrek aan vertrouwen.', fix_suggestion_nl: 'Plaats beveiligingsbadges direct naast het betaalformulier.', source: 'Baymard Institute' },
  { id: 'ps-https', module: 'persuasion', subcategory: 'trust', question_nl: 'Is HTTPS actief op de hele site?', question_en: 'Is HTTPS active site-wide?', severity: 'critical', type: 'auto', business_impact_nl: 'Browsers tonen "Niet veilig" waarschuwing zonder HTTPS.', fix_suggestion_nl: 'Activeer SSL/TLS certificaat en forceer HTTPS redirect.', source: 'Google / Browser security' },
  { id: 'ps-contact-findable', module: 'persuasion', subcategory: 'trust', question_nl: 'Is contactinformatie binnen 1 klik bereikbaar?', question_en: 'Is contact information accessible within 1 click?', severity: 'high', type: 'auto', business_impact_nl: '52% van bezoekers checkt de About-pagina om geloofwaardigheid te beoordelen.', fix_suggestion_nl: 'Zet telefoon/email in de header of footer.', source: 'KoMarketing study' },
  { id: 'ps-return-policy', module: 'persuasion', subcategory: 'trust', question_nl: 'Is het retour-/annuleringsbeleid duidelijk vermeld?', question_en: 'Is the return/cancellation policy clearly stated?', severity: 'high', type: 'manual', business_impact_nl: 'Onduidelijk retourbeleid is een top-reden voor cart abandonment.', fix_suggestion_nl: 'Vermeld het retourbeleid dichtbij de koopknop.', source: 'Baymard Institute' },
  // ── Subcategory: cta-optimization ──
  { id: 'ps-cta-above-fold', module: 'persuasion', subcategory: 'cta-optimization', question_nl: 'Is de primaire CTA zichtbaar boven de fold?', question_en: 'Is the primary CTA visible above the fold?', severity: 'critical', type: 'auto', business_impact_nl: 'CTA boven de fold geeft 101% hogere click-through.', fix_suggestion_nl: 'Plaats de primaire CTA in de hero-sectie.', source: 'Archive Social / CXL' },
  { id: 'ps-cta-repeated', module: 'persuasion', subcategory: 'cta-optimization', question_nl: 'Wordt de CTA herhaald op logische plekken bij lange pagina\'s?', question_en: 'Is the CTA repeated at logical intervals?', severity: 'medium', type: 'auto', business_impact_nl: 'Niet iedereen converteert na de hero.', fix_suggestion_nl: 'Voeg CTA toe na elke 2-3 content-secties.', source: 'CXL' },
  { id: 'ps-no-friction-words', module: 'persuasion', subcategory: 'cta-optimization', question_nl: 'Geen frictie-woorden nabij CTA\'s? ("spam", "verplicht", "contract")', question_en: 'No friction words near CTAs?', severity: 'medium', type: 'auto', business_impact_nl: 'Negatieve woorden triggeren twijfel.', fix_suggestion_nl: 'Vervang "Geen spam" door "Wekelijkse tips". Verwijder negatieve woorden bij de CTA.', source: 'CXL' },
  { id: 'ps-fogg-ability', module: 'persuasion', subcategory: 'cta-optimization', question_nl: 'Is de gewenste actie makkelijk uit te voeren? (≤ 3 stappen, minimale velden)', question_en: 'Is the desired action easy?', severity: 'critical', type: 'manual', business_impact_nl: '23% van gebruikers verlaat te lange formulieren.', fix_suggestion_nl: 'Verwijder alle niet-essentiële velden.', source: 'Fogg Behavior Model / Baymard' },
  // ── Subcategory: psychology ──
  { id: 'ps-reciprocity', module: 'persuasion', subcategory: 'psychology', question_nl: 'Wordt er gratis waarde geboden vóór de conversie-vraag?', question_en: 'Is free value offered before asking for conversion?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Reciprociteit is een van de sterkste overtuigingsprincipes.', fix_suggestion_nl: 'Bied een gratis resource aan: whitepaper, calculator, proefperiode.', source: 'Cialdini (Reciprocity)' },
  { id: 'ps-authority', module: 'persuasion', subcategory: 'psychology', question_nl: 'Zijn er autoriteit-signalen? (certificeringen, "bekend van" media, awards)', question_en: 'Are authority signals present?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Autoriteit verlaagt onzekerheid.', fix_suggestion_nl: 'Toon certificeringen, media-logo\'s, award badges.', source: 'Cialdini (Authority)' },
  { id: 'ps-risk-reversal', module: 'persuasion', subcategory: 'psychology', question_nl: 'Is er een niet-goed-geld-terug garantie of risico-omkering?', question_en: 'Is there a money-back guarantee or risk reversal?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Garanties verlagen de drempel dramatisch.', fix_suggestion_nl: 'Voeg een garantie toe dicht bij de CTA.', source: 'CXL' },
  { id: 'ps-loss-framing', module: 'persuasion', subcategory: 'psychology', question_nl: 'Wordt verlies-framing strategisch ingezet?', question_en: 'Is loss framing used strategically?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Verlies-framing converteert 30-40% beter dan winst-framing.', fix_suggestion_nl: 'Beschrijf wat de bezoeker mist zonder het product.', source: 'Prospect Theory / Kahneman' },
  { id: 'ps-pricing-anchoring', module: 'persuasion', subcategory: 'psychology', question_nl: 'Wordt er anchoring toegepast bij prijzen?', question_en: 'Is anchoring used in pricing?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Het eerste getal bepaalt de referentie.', fix_suggestion_nl: 'Toon originele prijs naast korting. Markeer het midden-plan als "Meest gekozen".', source: 'Anchoring effect / Dan Ariely' },
  { id: 'ps-post-conversion', module: 'persuasion', subcategory: 'psychology', question_nl: 'Is de ervaring ná conversie positief? (bevestigingspagina warm en nuttig)', question_en: 'Is the post-conversion experience positive?', severity: 'medium', type: 'manual', business_impact_nl: 'Peak-end rule: mensen onthouden het hoogtepunt en het einde.', fix_suggestion_nl: 'Maak een thank-you pagina met bevestiging en volgende stap.', source: 'Peak-end rule (Kahneman)' },
  // ── Subcategory: ethics ──
  { id: 'ps-ethical-urgency', module: 'persuasion', subcategory: 'ethics', question_nl: 'Als er urgentie/schaarste wordt gebruikt — is het eerlijk? (geen nep-timers)', question_en: 'If urgency/scarcity is used — is it honest?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Nep-countdowns vernietigen vertrouwen.', fix_suggestion_nl: 'Gebruik alleen echte deadlines. Geen timers die resetten.', source: 'Princeton dark patterns study / EU DSA' },
  { id: 'ps-no-confirmshaming', module: 'persuasion', subcategory: 'ethics', question_nl: 'Geen confirmshaming: geven afwijz-opties de bezoeker geen schuldgevoel?', question_en: 'No confirmshaming in decline options?', severity: 'high', type: 'manual', business_impact_nl: '"Nee, ik wil geen geld besparen" is manipulatief en schaadt je merk.', fix_suggestion_nl: 'Maak de afwijz-optie neutraal: "Nee bedankt" of "Niet nu".', source: 'Dark patterns / EU DSA' }
];

// ═══════════════ INFORMATIE-ARCHITECTUUR MODULE ═══════════════
MODULE_REGISTRY.modules.push({
  id: 'info-architecture',
  name_nl: 'Informatie-architectuur',
  name_en: 'Information Architecture',
  icon: 'layout-grid',
  color: '#10b981',
  enabled_by_default: false,
  default_weight: 1.0,
  subcategories: ['navigation', 'wayfinding', 'layout', 'mobile']
});

MODULE_CHECKS['info-architecture'] = [
  // ── Subcategory: navigation ──
  { id: 'ia-nav-items', module: 'info-architecture', subcategory: 'navigation', question_nl: 'Heeft de primaire navigatie maximaal 7 items?', question_en: 'Does primary navigation have ≤ 7 items?', severity: 'high', type: 'auto', business_impact_nl: 'Elke extra keuze voegt beslissingstijd toe (Hick\'s Law).', fix_suggestion_nl: 'Beperk de hoofdnavigatie tot 5-7 items.', source: 'Hick\'s Law' },
  { id: 'ia-logo-home', module: 'info-architecture', subcategory: 'navigation', question_nl: 'Linkt het logo naar de homepage en staat het links-boven?', question_en: 'Does the logo link to homepage?', severity: 'medium', type: 'auto', business_impact_nl: 'Dit is een universele webconventie.', fix_suggestion_nl: 'Maak het logo klikbaar met een link naar /.', source: 'NNGroup' },
  { id: 'ia-nav-position', module: 'info-architecture', subcategory: 'navigation', question_nl: 'Staat de navigatie op een standaardlocatie?', question_en: 'Is navigation in standard location?', severity: 'medium', type: 'auto', business_impact_nl: 'Niet-standaard navigatie verhoogt de leercurve.', fix_suggestion_nl: 'Horizontale navigatie bovenaan of linker zijbalk voor dashboards.', source: 'NNGroup' },
  { id: 'ia-nav-labels', module: 'info-architecture', subcategory: 'navigation', question_nl: 'Zijn navigatie-labels beschrijvend? (niet "Oplossingen", "Ontdek")', question_en: 'Are navigation labels descriptive?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Herbenoeming met klanttaal verhoogde first-click succes van 52% naar 78%.', fix_suggestion_nl: 'Vervang vage labels door specifieke beschrijvingen.', source: 'NNGroup' },
  { id: 'ia-customer-language', module: 'info-architecture', subcategory: 'navigation', question_nl: 'Gebruikt de navigatie klanttaal, niet intern jargon?', question_en: 'Does navigation use customer language?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Navigatie in klanttaal verhoogt first-click succes dramatisch.', fix_suggestion_nl: 'Test je navigatie-labels met echte gebruikers.', source: 'Card sorting research' },
  // ── Subcategory: wayfinding ──
  { id: 'ia-active-state', module: 'info-architecture', subcategory: 'wayfinding', question_nl: 'Is de huidige pagina duidelijk gemarkeerd in de navigatie? (active state)', question_en: 'Is the current page indicated in navigation?', severity: 'medium', type: 'auto', business_impact_nl: 'Zonder active state weet de bezoeker niet waar ze zijn.', fix_suggestion_nl: 'Markeer het actieve menu-item met andere kleur of onderstreping.', source: 'Wayfinding best practices' },
  { id: 'ia-breadcrumbs', module: 'info-architecture', subcategory: 'wayfinding', question_nl: 'Zijn er breadcrumbs op pagina\'s 2+ niveaus diep?', question_en: 'Are breadcrumbs present on pages 2+ levels deep?', severity: 'medium', type: 'auto', business_impact_nl: 'Breadcrumbs verbeteren navigatie en verlagen bounce rate.', fix_suggestion_nl: 'Voeg breadcrumbs toe boven de content.', source: 'NNGroup / Baymard' },
  { id: 'ia-search', module: 'info-architecture', subcategory: 'wayfinding', question_nl: 'Is er een zoekfunctie beschikbaar?', question_en: 'Is site search available?', severity: 'medium', type: 'auto', business_impact_nl: 'Zoek-gebruikers converteren 1.8x vaker.', fix_suggestion_nl: 'Voeg een zoekfunctie toe in de header.', source: 'NNGroup / Econsultancy' },
  { id: 'ia-mental-model', module: 'info-architecture', subcategory: 'wayfinding', question_nl: 'Klopt de sitestructuur met het mentale model van de doelgroep?', question_en: 'Does the site structure match the audience\'s mental model?', severity: 'high', type: 'manual', business_impact_nl: 'Wayfair herstructureerde navigatie en zag 15% meer conversies.', fix_suggestion_nl: 'Vraag: hoe zou mijn klant dit zoeken?', source: 'Wayfair case study' },
  // ── Subcategory: layout ──
  { id: 'ia-touch-targets', module: 'info-architecture', subcategory: 'layout', question_nl: 'Zijn alle interactieve elementen minimaal 44×44px?', question_en: 'Are all interactive elements ≥ 44×44px?', severity: 'critical', type: 'auto', business_impact_nl: 'Te kleine targets leiden tot miskliks.', fix_suggestion_nl: 'Maak alle knoppen en links minimaal 44×44px.', source: 'WCAG 2.5.5 / Apple HIG' },
  { id: 'ia-progressive-disclosure', module: 'info-architecture', subcategory: 'layout', question_nl: 'Wordt progressive disclosure gebruikt bij complexiteit?', question_en: 'Is progressive disclosure used for complexity?', severity: 'medium', type: 'auto', business_impact_nl: 'Alles tegelijk tonen is overweldigend.', fix_suggestion_nl: 'Gebruik accordions voor FAQ\'s, tabbladen voor productdetails.', source: 'NNGroup / Cognitive Load Theory' },
  { id: 'ia-scan-pattern', module: 'info-architecture', subcategory: 'layout', question_nl: 'Volgt de content het natuurlijke scanpatroon? (F-patroon of Z-patroon)', question_en: 'Does content follow natural scanning patterns?', severity: 'high', type: 'semi-auto', business_impact_nl: '80% van kijktijd is op de linkerhelft.', fix_suggestion_nl: 'Plaats waardepropositie links-boven. Gebruik F-patroon voor tekst, Z-patroon voor visueel.', source: 'NNGroup (eyetracking)' },
  { id: 'ia-content-chunking', module: 'info-architecture', subcategory: 'layout', question_nl: 'Is content opgedeeld in visuele groepen?', question_en: 'Is content chunked into visual groups?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Werkgeheugen verwerkt ~4 items tegelijk.', fix_suggestion_nl: 'Groepeer gerelateerde items visueel met kaarten of secties.', source: 'Miller\'s Law / Gestalt' },
  { id: 'ia-gestalt-proximity', module: 'info-architecture', subcategory: 'layout', question_nl: 'Staan gerelateerde elementen dicht bij elkaar?', question_en: 'Are related elements visually grouped?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Als een prijs ver van de koopknop staat, mist de bezoeker de connectie.', fix_suggestion_nl: 'Zet labels bij hun velden. Plaats prijzen naast koopknoppen.', source: 'Gestalt (proximity)' },
  { id: 'ia-pricing-options', module: 'info-architecture', subcategory: 'layout', question_nl: 'Maximaal 4 prijsopties met een gemarkeerd "aanbevolen" plan?', question_en: 'Are there ≤ 4 pricing options with highlighted recommended?', severity: 'medium', type: 'manual', business_impact_nl: 'Te veel opties leiden tot keuzestress.', fix_suggestion_nl: 'Bied 3 opties aan. Markeer de middelste als "Meest gekozen".', source: 'Hick\'s Law / Center-stage effect' },
  // ── Subcategory: mobile ──
  { id: 'ia-mobile-nav', module: 'info-architecture', subcategory: 'mobile', question_nl: 'Is de mobiele navigatie adequaat? (≤5 tabs, hamburger bereikbaar)', question_en: 'Is mobile navigation adequate?', severity: 'high', type: 'manual', business_impact_nl: '60%+ van webverkeer is mobiel.', fix_suggestion_nl: 'Max 5 items in bottom navigation. Hamburger bereikbaar met duim.', source: 'Google Material Design / Apple HIG' }
];

// ═══════════════ E-E-A-T & GELOOFWAARDIGHEID MODULE ═══════════════
MODULE_REGISTRY.modules.push({
  id: 'eeat',
  name_nl: 'E-E-A-T & Geloofwaardigheid',
  name_en: 'E-E-A-T & Credibility',
  icon: 'award',
  color: '#3b82f6',
  enabled_by_default: false,
  default_weight: 1.0,
  subcategories: ['identity', 'authority', 'experience']
});

MODULE_CHECKS['eeat'] = [
  // ── Subcategory: identity ──
  { id: 'ee-about-page', module: 'eeat', subcategory: 'identity', question_nl: 'Bestaat er een About/Over ons-pagina met echte bedrijfsinformatie?', question_en: 'Does an About page exist with real company info?', severity: 'high', type: 'auto', business_impact_nl: '52% van bezoekers bekijkt de Over ons-pagina.', fix_suggestion_nl: 'Maak een About-pagina met bedrijfsverhaal, team, missie, contactinfo.', source: 'KoMarketing study' },
  { id: 'ee-contact-methods', module: 'eeat', subcategory: 'identity', question_nl: 'Is er een contactpagina met meerdere methodes? (telefoon, email, adres)', question_en: 'Is there a contact page with multiple methods?', severity: 'high', type: 'auto', business_impact_nl: 'Alleen een formulier voelt onbetrouwbaar.', fix_suggestion_nl: 'Bied minimaal 2 contactmethodes.', source: 'E-E-A-T / Local SEO' },
  { id: 'ee-privacy-terms', module: 'eeat', subcategory: 'identity', question_nl: 'Zijn privacy policy en algemene voorwaarden gelinkt vanuit de footer?', question_en: 'Are privacy policy and terms linked from footer?', severity: 'medium', type: 'auto', business_impact_nl: 'Verplicht in de EU (AVG/GDPR).', fix_suggestion_nl: 'Link privacy policy en voorwaarden vanuit de footer.', source: 'AVG/GDPR / E-E-A-T' },
  { id: 'ee-https', module: 'eeat', subcategory: 'identity', question_nl: 'Is HTTPS actief op alle pagina\'s?', question_en: 'Is HTTPS enforced?', severity: 'critical', type: 'auto', business_impact_nl: 'Google markeert HTTP-sites als "Niet veilig".', fix_suggestion_nl: 'Activeer SSL certificaat en forceer HTTPS redirect.', source: 'Google / Browser security' },
  { id: 'ee-real-photos', module: 'eeat', subcategory: 'identity', question_nl: 'Worden echte teamfoto\'s getoond, geen stockfoto\'s?', question_en: 'Are real team photos shown?', severity: 'high', type: 'manual', business_impact_nl: 'Stockfoto\'s ondermijnen vertrouwen.', fix_suggestion_nl: 'Investeer in echte teamfoto\'s.', source: 'Cialdini (Liking) / E-E-A-T' },
  // ── Subcategory: authority ──
  { id: 'ee-author-attribution', module: 'eeat', subcategory: 'authority', question_nl: 'Hebben content-pagina\'s auteur-attributie?', question_en: 'Do content pages have author attribution?', severity: 'medium', type: 'auto', business_impact_nl: 'E-E-A-T wordt 120+ keer genoemd in Google\'s Quality Rater Guidelines.', fix_suggestion_nl: 'Voeg auteur-naam, functie, en bio toe.', source: 'Google Quality Rater Guidelines' },
  { id: 'ee-credentials', module: 'eeat', subcategory: 'authority', question_nl: 'Worden certificeringen, accreditaties, of lidmaatschappen getoond?', question_en: 'Are industry credentials displayed?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Certificeringen verhogen autoriteit en vertrouwen.', fix_suggestion_nl: 'Toon relevante certificeringen met logos.', source: 'Cialdini (Authority) / E-E-A-T' },
  { id: 'ee-claims-evidence', module: 'eeat', subcategory: 'authority', question_nl: 'Worden claims onderbouwd met bronnen of bewijs?', question_en: 'Are claims supported by evidence?', severity: 'high', type: 'semi-auto', business_impact_nl: 'Ononderbouwde claims worden niet geloofd.', fix_suggestion_nl: 'Voeg bronvermelding toe bij statistieken.', source: 'E-E-A-T / Cialdini (Authority)' },
  { id: 'ee-third-party', module: 'eeat', subcategory: 'authority', question_nl: 'Is er validatie door derden? (reviews op externe platforms, media, awards)', question_en: 'Is there third-party validation?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Onafhankelijke validatie is sterker dan zelf-promotie.', fix_suggestion_nl: 'Link naar Google Reviews, Trustpilot, of branche-awards.', source: 'E-E-A-T / Cialdini' },
  // ── Subcategory: experience ──
  { id: 'ee-content-updated', module: 'eeat', subcategory: 'experience', question_nl: 'Is content recent bijgewerkt?', question_en: 'Is content regularly updated?', severity: 'medium', type: 'semi-auto', business_impact_nl: 'Verouderde content signaleert verwaarlozing.', fix_suggestion_nl: 'Update of verwijder achterhaalde content. Toon "Laatst bijgewerkt" datums.', source: 'E-E-A-T / Content freshness' },
  { id: 'ee-first-hand', module: 'eeat', subcategory: 'experience', question_nl: 'Toont de content eigen ervaring? (originele data, eigen foto\'s, case studies)', question_en: 'Does content show first-hand experience?', severity: 'high', type: 'manual', business_impact_nl: 'Het eerste "E" staat voor Experience.', fix_suggestion_nl: 'Deel eigen data, screenshots, case studies.', source: 'Google E-E-A-T' },
  { id: 'ee-topical-depth', module: 'eeat', subcategory: 'experience', question_nl: 'Behandelt de site het onderwerp grondig met sterke interne linking?', question_en: 'Does the site cover its topic comprehensively?', severity: 'medium', type: 'manual', business_impact_nl: 'Topische autoriteit wordt opgebouwd door gerelateerde pagina\'s.', fix_suggestion_nl: 'Maak cluster-content: pillar page + ondersteunende pagina\'s.', source: 'E-E-A-T / Topical authority' }
];

// ═══════════════ QUICK SCAN BUNDLES: NON-TECHNICAL ═══════════════
MODULE_REGISTRY.bundles['qs-storytelling'] = {
  id: 'qs-storytelling',
  name_nl: 'Storytelling & Messaging Scan',
  name_en: 'Storytelling & Messaging Scan',
  icon_lucide: 'message-circle',
  is_quick_scan: true,
  source_type: 'url',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['storytelling'],
  description_nl: 'Beoordeelt of je website een helder verhaal vertelt: boodschap, verhaallijn en conversie.'
};

MODULE_REGISTRY.bundles['qs-content'] = {
  id: 'qs-content',
  name_nl: 'Content & Copy Kwaliteit Scan',
  name_en: 'Content & Copy Quality Scan',
  icon_lucide: 'file-text',
  is_quick_scan: true,
  source_type: 'url',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['content-quality'],
  description_nl: 'Analyseert leesbaarheid, tekststructuur, tone of voice en microcopy kwaliteit.'
};

MODULE_REGISTRY.bundles['qs-persuasion'] = {
  id: 'qs-persuasion',
  name_nl: 'Overtuigingskracht & Vertrouwen Scan',
  name_en: 'Persuasion & Trust Scan',
  icon_lucide: 'shield-check',
  is_quick_scan: true,
  source_type: 'url',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['persuasion'],
  description_nl: 'Evalueert social proof, trust signals, CTA-effectiviteit en overtuigingsprincipes.'
};

MODULE_REGISTRY.bundles['qs-ia'] = {
  id: 'qs-ia',
  name_nl: 'Informatie-architectuur Scan',
  name_en: 'Information Architecture Scan',
  icon_lucide: 'layout-grid',
  is_quick_scan: true,
  source_type: 'url',
  estimated_duration_nl: '10-15 min',
  estimated_duration_en: '10-15 min',
  modules: ['info-architecture'],
  description_nl: 'Beoordeelt navigatie, sitestructuur en content-organisatie.'
};

MODULE_REGISTRY.bundles['qs-eeat'] = {
  id: 'qs-eeat',
  name_nl: 'E-E-A-T & Geloofwaardigheid Scan',
  name_en: 'E-E-A-T & Credibility Scan',
  icon_lucide: 'award',
  is_quick_scan: true,
  source_type: 'url',
  estimated_duration_nl: '5-10 min',
  estimated_duration_en: '5-10 min',
  modules: ['eeat'],
  description_nl: 'Controleert geloofwaardigheid volgens Google\'s E-E-A-T richtlijnen.'
};

// ═══════════════ FREE-FORM REVIEW ═══════════════
MODULE_REGISTRY.bundles['free-form'] = {
  id: 'free-form',
  name_nl: 'Vrije Review',
  name_en: 'Free-Form Review',
  icon_lucide: 'pen-tool',
  is_quick_scan: true,
  source_type: 'url',
  estimated_duration_nl: 'Flexibel',
  estimated_duration_en: 'Flexible',
  modules: [],
  description_nl: 'Geen checklist — voeg zelf bevindingen toe met screenshots, scores, en aanbevelingen. Ideaal voor expert reviews en ad-hoc observaties.',
  is_free_form: true
};

// ═══════════════ EXPORT FOR NODE/COMMONJS ═══════════════
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MODULE_REGISTRY,
    MODULE_CHECKS,
    LEGACY_ID_MAP,
    REVERSE_LEGACY_MAP,
    SUBCATEGORY_NAMES,
    buildReviewSteps,
    migrateLegacyAnswers,
    getBundleConfig,
    getDefaultModuleConfig,
    calculateModuleScore,
    calculateOverallScore
  };
}

// ═══════════════ EXPORT FOR ESM (Next.js) ═══════════════
export {
  MODULE_REGISTRY,
  MODULE_CHECKS,
  LEGACY_ID_MAP,
  REVERSE_LEGACY_MAP,
  SUBCATEGORY_NAMES,
  buildReviewSteps,
  migrateLegacyAnswers,
  getBundleConfig,
  getDefaultModuleConfig,
  calculateModuleScore,
  calculateOverallScore,
}
