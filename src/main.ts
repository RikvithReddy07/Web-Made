import { WEBMADE_CONFIG } from './config';

/**
 * WebMade Core Script
 * Handles dynamic WhatsApp link binding, contact info rendering,
 * interactive calculators, FAQ accordion, portfolio filters, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactDetails();
  initWhatsAppLinks();
  initMobileNav();
  initFaqAccordion();
  initPricingTabs();
  initPortfolioFilters();
  initPortfolioModals();
  initNeedFinder();
  initCostEstimator();
  initScrollEffects();
});

/**
 * Populate all dynamic contact labels and links from WEBMADE_CONFIG
 */
function initContactDetails() {
  // Update text contents
  document.querySelectorAll('[data-config-text]').forEach(el => {
    const key = el.getAttribute('data-config-text');
    if (key && (WEBMADE_CONFIG as any)[key]) {
      el.textContent = (WEBMADE_CONFIG as any)[key];
    }
  });

  // Update email mailto links
  document.querySelectorAll('[data-config-email-link]').forEach(el => {
    el.setAttribute('href', `mailto:${WEBMADE_CONFIG.email}`);
    if (!el.textContent?.trim() || el.textContent.includes('@')) {
      el.textContent = WEBMADE_CONFIG.email;
    }
  });

  // Update phone tel links
  document.querySelectorAll('[data-config-phone-link]').forEach(el => {
    const cleanPhone = WEBMADE_CONFIG.phone.replace(/[^0-9+]/g, '');
    el.setAttribute('href', `tel:${cleanPhone}`);
    if (!el.textContent?.trim() || el.textContent.includes('XXXXX')) {
      el.textContent = WEBMADE_CONFIG.displayPhone;
    }
  });

  // Update social links
  document.querySelectorAll('[data-config-social]').forEach(el => {
    const platform = el.getAttribute('data-config-social') as keyof typeof WEBMADE_CONFIG.socials;
    if (platform && WEBMADE_CONFIG.socials[platform]) {
      el.setAttribute('href', WEBMADE_CONFIG.socials[platform]);
    }
  });
}

/**
 * Bind all WhatsApp buttons to the centralized URL generator
 */
function initWhatsAppLinks() {
  document.querySelectorAll('[data-wa-msg]').forEach(el => {
    const msgKey = el.getAttribute('data-wa-msg') || 'general';
    const customText = el.getAttribute('data-wa-custom');
    
    let targetUrl: string;
    if (customText) {
      targetUrl = WEBMADE_CONFIG.getWhatsAppUrl(customText, true);
    } else {
      targetUrl = WEBMADE_CONFIG.getWhatsAppUrl(msgKey);
    }

    el.setAttribute('href', targetUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && 
        !drawer.contains(e.target as Node) && 
        !toggleBtn.contains(e.target as Node)) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/**
 * FAQ Accordion Expand/Collapse
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      btn.setAttribute('aria-expanded', String(!isActive));
    });
  });
}

/**
 * Pricing Toggle (Websites vs Mobile Apps)
 */
function initPricingTabs() {
  const websiteTabBtn = document.getElementById('tabWebsites');
  const appTabBtn = document.getElementById('tabApps');
  const websitePricingGrid = document.getElementById('websitePricingGrid');
  const appPricingGrid = document.getElementById('appPricingGrid');

  if (!websiteTabBtn || !appTabBtn || !websitePricingGrid || !appPricingGrid) return;

  websiteTabBtn.addEventListener('click', () => {
    websiteTabBtn.classList.add('active');
    appTabBtn.classList.remove('active');
    websitePricingGrid.style.display = 'grid';
    appPricingGrid.style.display = 'none';
  });

  appTabBtn.addEventListener('click', () => {
    appTabBtn.classList.add('active');
    websiteTabBtn.classList.remove('active');
    websitePricingGrid.style.display = 'none';
    appPricingGrid.style.display = 'grid';
  });
}

/**
 * Portfolio Category Filter
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          (card as HTMLElement).style.display = 'flex';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  });
}

/**
 * Portfolio Project Detail Modals
 */
const PROJECT_DETAILS: Record<string, { title: string; type: string; desc: string; tech: string[]; features: string[] }> = {
  luma: {
    title: "Luma Café",
    type: "Restaurant & Bistro Website",
    desc: "A sleek culinary website with digital interactive menus, table reservation booking, aesthetic food showcase galleries, and direct WhatsApp order placement.",
    tech: ["HTML5/CSS3", "JavaScript", "Responsive UI", "WhatsApp Menu Engine"],
    features: ["Digital Menu with Pricing", "Instant Table Reservation", "Location & Maps Integration", "Mobile-Optimized Fast Loading"]
  },
  forge: {
    title: "Forge Fitness",
    type: "Gym & Personal Training Website",
    desc: "High-energy athletic brand website designed to convert visitors into gym memberships with class schedules, trainer rosters, and membership tier signups.",
    tech: ["Modern CSS Grid", "Lead Magnet Forms", "Class Booking UI", "Fast CDN"],
    features: ["Interactive Class Schedule", "Trainer Profiles", "Membership Pricing Calculator", "WhatsApp Consultation CTA"]
  },
  novatech: {
    title: "NovaTech Solutions",
    type: "B2B Technology & IT Agency",
    desc: "Modern corporate showcase built with futuristic dark themes, interactive service cards, case study highlights, and lead qualification contact funnels.",
    tech: ["TypeScript", "SVG Animations", "SEO Architecture", "Performance Optimized"],
    features: ["B2B Service Breakdown", "Client Case Studies", "Interactive Proposal Generator", "Enterprise Security Highlights"]
  },
  urbannest: {
    title: "UrbanNest Realty",
    type: "Real Estate & Property Listings",
    desc: "Luxury real estate property portal featuring visual property filters, high-resolution photo tours, agent inquiry cards, and instant property brochure downloads.",
    tech: ["Property Filtering Engine", "Responsive Sliders", "Virtual Tour Ready"],
    features: ["Search & Filter by Location/Budget", "Instant WhatsApp Property Inquiries", "Floor Plan Showcases", "Mortgage & EMI Estimator"]
  },
  velora: {
    title: "Velora Beauty & Spa",
    type: "Salon & Wellness Studio",
    desc: "Elegant lifestyle website with soothing purple gradients, service catalogs, stylist portfolios, and an appointment booking funnel via WhatsApp.",
    tech: ["Aesthetic Glassmorphism", "Micro-Interactions", "Mobile-First Booking"],
    features: ["Service & Package Pricing", "Direct Stylist Booking", "Client Gallery", "Gift Voucher Inquiries"]
  },
  shopnova: {
    title: "ShopNova Store",
    type: "Modern E-Commerce Storefront",
    desc: "Clean, conversion-optimized online store with quick product views, shopping cart preview, discount coupons, and integrated WhatsApp order checkout.",
    tech: ["Cart State Management", "Product Filter Grid", "WhatsApp Checkout System"],
    features: ["Product Showcase with Variations", "Direct WhatsApp Order Dispatch", "Mobile-Ready Cart", "Secure Payment Badges"]
  }
};

function initPortfolioModals() {
  const modalBackdrop = document.getElementById('portfolioModalBackdrop');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalType = document.getElementById('modalProjectType');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalFeatures = document.getElementById('modalProjectFeatures');
  const modalCta = document.getElementById('modalProjectCta');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalBackdrop || !modalTitle || !modalDesc || !modalFeatures || !modalCta || !closeBtn) return;

  const openModal = (projectId: string) => {
    const data = PROJECT_DETAILS[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    if (modalType) modalType.textContent = data.type;
    modalDesc.textContent = data.desc;

    // Build features list
    modalFeatures.innerHTML = data.features.map(f => `
      <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="color: var(--whatsapp-green); font-weight: bold;">✓</span> ${f}
      </li>
    `).join('');

    // Set CTA button
    const customMsg = WEBMADE_CONFIG.messages.portfolioInquiry(data.title);
    modalCta.setAttribute('href', WEBMADE_CONFIG.getWhatsAppUrl(customMsg, true));

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-portfolio-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-portfolio-modal');
      if (projectId) openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
  });
}

/**
 * "Not Sure What You Need?" Interactive Decision Helper
 */
function initNeedFinder() {
  const needButtons = document.querySelectorAll('[data-need-target]');
  const resultBox = document.getElementById('needFinderResult');
  const recTitle = document.getElementById('needRecTitle');
  const recDesc = document.getElementById('needRecDesc');
  const recCta = document.getElementById('needRecCta');

  if (!needButtons.length || !resultBox || !recTitle || !recDesc || !recCta) return;

  const NEED_MAP: Record<string, { rec: string; desc: string; msg: string }> = {
    presence: {
      rec: "Business Website (From ₹7,999)",
      desc: "Ideal for local businesses, consultants, and service providers who need a credible online identity that converts visitors into phone/WhatsApp inquiries.",
      msg: "Hi WebMade! I need an online business website for my brand. Can you guide me?"
    },
    store: {
      rec: "E-Commerce Website (From ₹14,999)",
      desc: "Perfect for selling physical or digital products with product catalogs, shopping cart, online payments, and direct WhatsApp order alerts.",
      msg: "Hi WebMade! I want to launch an E-Commerce online store. Let's discuss requirements."
    },
    system: {
      rec: "Custom Web Application (From ₹24,999)",
      desc: "Tailored for businesses needing custom workflows, internal portals, client dashboards, or automated operations.",
      msg: "Hi WebMade! I need a custom Web Application for my business operations."
    },
    app: {
      rec: "Mobile App for Android / iOS (From ₹29,999)",
      desc: "Engineered for businesses and startups needing engaging mobile experiences with user accounts, push notifications, and app store deployment.",
      msg: "Hi WebMade! I want to build a Mobile App for Android and iOS."
    },
    campaign: {
      rec: "High-Converting Landing Page (From ₹4,999)",
      desc: "Laser-focused single-page sales machine built to maximize conversion rates from Google Ads, Meta Ads, or marketing campaigns.",
      msg: "Hi WebMade! I need a high-converting Landing Page for my ad campaign."
    },
    redesign: {
      rec: "Website Redesign & Modernization (From ₹8,999)",
      desc: "Upgrade your slow or dated website into a fast, mobile-responsive, modern agency-grade digital presence that wins trust.",
      msg: "Hi WebMade! My current website looks outdated and I would like a modern redesign."
    }
  };

  needButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      needButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const targetKey = btn.getAttribute('data-need-target') || 'presence';
      const info = NEED_MAP[targetKey] || NEED_MAP.presence;

      recTitle.textContent = info.rec;
      recDesc.textContent = info.desc;
      recCta.setAttribute('href', WEBMADE_CONFIG.getWhatsAppUrl(info.msg, true));
    });
  });
}

/**
 * Interactive Project Estimator / Live Quote Generator
 */
function initCostEstimator() {
  const typePills = document.querySelectorAll('.calc-type-pill');
  const scopePills = document.querySelectorAll('.calc-scope-pill');
  const featureChecks = document.querySelectorAll('.calc-feature-check') as NodeListOf<HTMLInputElement>;
  const totalDisplay = document.getElementById('calcEstimatedTotal');
  const breakdownSummary = document.getElementById('calcSummaryText');
  const quoteCta = document.getElementById('calcWhatsAppCta');

  if (!typePills.length || !totalDisplay || !quoteCta) return;

  const calculateTotal = () => {
    let basePrice = 7999;
    let typeName = "Business Website";
    let scopeName = "Up to 5 Pages";
    let scopeAdd = 0;
    const selectedFeatures: string[] = [];
    let featureAdd = 0;

    // Type selection
    typePills.forEach(p => {
      if (p.classList.contains('selected')) {
        basePrice = parseInt(p.getAttribute('data-price') || '7999', 10);
        typeName = p.getAttribute('data-name') || 'Business Website';
      }
    });

    // Scope selection
    scopePills.forEach(p => {
      if (p.classList.contains('selected')) {
        scopeAdd = parseInt(p.getAttribute('data-price') || '0', 10);
        scopeName = p.getAttribute('data-name') || 'Standard Scope';
      }
    });

    // Features selection
    featureChecks.forEach(ch => {
      const parent = ch.closest('.calc-check-label');
      if (ch.checked) {
        parent?.classList.add('selected');
        featureAdd += parseInt(ch.getAttribute('data-price') || '0', 10);
        selectedFeatures.push(ch.getAttribute('data-name') || '');
      } else {
        parent?.classList.remove('selected');
      }
    });

    const total = basePrice + scopeAdd + featureAdd;
    totalDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;

    if (breakdownSummary) {
      breakdownSummary.textContent = `${typeName} • ${scopeName} ${selectedFeatures.length ? `• ${selectedFeatures.length} Add-ons` : ''}`;
    }

    // Generate WhatsApp Quote Link
    const quoteMessage = WEBMADE_CONFIG.messages.customQuote({
      type: typeName,
      pages: scopeName,
      features: selectedFeatures.length ? selectedFeatures.join(', ') : 'Standard package features',
      estimate: `₹${total.toLocaleString('en-IN')} (Estimated starting price)`
    });

    quoteCta.setAttribute('href', WEBMADE_CONFIG.getWhatsAppUrl(quoteMessage, true));
  };

  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      calculateTotal();
    });
  });

  scopePills.forEach(pill => {
    pill.addEventListener('click', () => {
      scopePills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      calculateTotal();
    });
  });

  featureChecks.forEach(ch => {
    ch.addEventListener('change', calculateTotal);
  });

  // Initial Calculation
  calculateTotal();
}

/**
 * Scroll Spy & Smooth Scroll Navigation
 */
function initScrollEffects() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = (section as HTMLElement).offsetTop;
      const height = (section as HTMLElement).offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
