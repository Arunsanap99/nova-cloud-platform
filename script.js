/**
 * NOVAENGINE — ADVANCED INTERACTION LOGIC
 * High-performance, modular Vanilla JavaScript
 * Zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. THEME SWITCHER (Dark Obsidian & Light Porcelain with System Fallback)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('nova_theme');
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };

  const applyTheme = (theme) => {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('nova_theme', theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#06080f' : '#f8fafc');
    }
  };

  const currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = rootElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(activeTheme);
    });
  }

  // =========================================================================
  // 2. DYNAMIC CARD SPOTLIGHT MOUSE TRACKING
  // =========================================================================
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 3. INTERACTIVE HERO CODE TAB SWITCHER & COPY
  // =========================================================================
  const codeTabs = document.querySelectorAll('.code-tab');
  const codeDisplay = document.getElementById('code-display');
  const copyBtn = document.getElementById('copy-code-btn');

  const codeSnippets = {
    ts: `<span class="c-comment">// Initialize Autonomous Multi-Cloud Cluster</span>
<span class="c-purple">import</span> { <span class="c-cyan">NovaMesh</span>, <span class="c-cyan">ZeroTrust</span> } <span class="c-purple">from</span> <span class="c-green">'@nova/engine'</span>;

<span class="c-purple">const</span> cluster = <span class="c-purple">await</span> <span class="c-cyan">NovaMesh</span>.<span class="c-yellow">orchestrate</span>({
  regions: [<span class="c-green">'us-east-1'</span>, <span class="c-green">'eu-central-1'</span>, <span class="c-green">'ap-south-1'</span>],
  failover: <span class="c-blue">true</span>,        <span class="c-comment">// Zero-downtime multi-cloud swap</span>
  spotArbitrage: <span class="c-blue">true</span>,   <span class="c-comment">// Dynamic -45% cost reduction</span>
  security: <span class="c-cyan">ZeroTrust</span>.<span class="c-yellow">mTLS</span>({ autoRotate: <span class="c-blue">true</span> })
});

<span class="c-comment">// Instant global deployment in 1.48s</span>
<span class="c-purple">await</span> cluster.<span class="c-yellow">deployPreview</span>({ branch: <span class="c-green">'feat/quantum-speed'</span> });`,

    py: `<span class="c-comment"># Nova Multi-Cloud Mesh Controller (Python 3.12)</span>
<span class="c-purple">from</span> nova_engine <span class="c-purple">import</span> <span class="c-cyan">NovaCluster</span>, <span class="c-cyan">Telemetry</span>

<span class="c-blue">async</span> <span class="c-purple">def</span> <span class="c-yellow">bootstrap_mesh</span>():
    cluster = <span class="c-blue">await</span> <span class="c-cyan">NovaCluster</span>.<span class="c-yellow">connect</span>(
        clouds=[<span class="c-green">"aws"</span>, <span class="c-green">"gcp"</span>, <span class="c-green">"azure"</span>],
        auto_healing=<span class="c-blue">True</span>,
        cold_start_elimination=<span class="c-blue">True</span>
    )
    
    <span class="c-comment"># Spin up isolated ephemeral staging branch</span>
    preview = <span class="c-blue">await</span> cluster.<span class="c-yellow">create_ephemeral</span>(ttl=<span class="c-green">"48h"</span>)
    <span class="c-yellow">print</span>(f<span class="c-green">"Live edge URL: {preview.url}"</span>)`,

    sh: `<span class="c-comment">#!/bin/bash</span>
<span class="c-comment"># Install Nova CLI & Deploy in one step</span>
curl -fsSL https://novaengine.io/install.sh | bash

<span class="c-comment"># Authenticate & Link Repository</span>
nova auth login --github
nova cluster init --preset=high-availability

<span class="c-comment"># Deploy globally across 34 edge zones</span>
nova deploy --preview --concurrency=100
<span class="c-green">[✓] Deployed in 1.48s: https://nova-mesh-pr34.edge.app</span>`
  };

  const rawSnippets = {
    ts: `import { NovaMesh, ZeroTrust } from '@nova/engine';

const cluster = await NovaMesh.orchestrate({
  regions: ['us-east-1', 'eu-central-1', 'ap-south-1'],
  failover: true,
  spotArbitrage: true,
  security: ZeroTrust.mTLS({ autoRotate: true })
});

await cluster.deployPreview({ branch: 'feat/quantum-speed' });`,

    py: `from nova_engine import NovaCluster, Telemetry

async def bootstrap_mesh():
    cluster = await NovaCluster.connect(
        clouds=["aws", "gcp", "azure"],
        auto_healing=True,
        cold_start_elimination=True
    )
    preview = await cluster.create_ephemeral(ttl="48h")
    print(f"Live edge URL: {preview.url}")`,

    sh: `curl -fsSL https://novaengine.io/install.sh | bash
nova auth login --github
nova cluster init --preset=high-availability
nova deploy --preview --concurrency=100`
  };

  let activeLang = 'ts';

  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      codeTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeLang = tab.getAttribute('data-lang');
      if (codeDisplay && codeSnippets[activeLang]) {
        codeDisplay.style.opacity = '0.3';
        codeDisplay.style.transition = 'opacity 0.15s ease';

        setTimeout(() => {
          codeDisplay.innerHTML = codeSnippets[activeLang];
          codeDisplay.style.opacity = '1';
        }, 120);
      }
    });
  });

  // Copy code handler
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = rawSnippets[activeLang] || '';
      try {
        await navigator.clipboard.writeText(textToCopy);
        const tooltip = copyBtn.querySelector('.copy-tooltip');
        if (tooltip) {
          tooltip.textContent = 'Copied!';
          tooltip.style.opacity = '1';
          setTimeout(() => {
            tooltip.textContent = 'Copy';
            tooltip.style.opacity = '';
          }, 2000);
        }
      } catch (err) {
        console.error('Clipboard copy error:', err);
      }
    });
  }

  // =========================================================================
  // 4. STICKY NAVBAR & ACTIVE NAVIGATION LINK TRACKING
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  const handleNavScroll = () => {
    const scrollPos = window.scrollY;

    // Sticky glass navbar
    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Tracking
    let currentSectionId = '';
    const scrollOffset = scrollPos + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollOffset >= sectionTop && scrollOffset < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // =========================================================================
  // 5. RESPONSIVE MOBILE NAVIGATION DRAWER
  // =========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');

  const openMobileMenu = () => {
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (menuToggle && navMenu && navOverlay) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('is-active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navOverlay.addEventListener('click', closeMobileMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
        closeMobileMenu();
      }
    });
  }

  // =========================================================================
  // 6. BACK-TO-TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 7. SCROLL REVEAL (INTERSECTION OBSERVER)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // =========================================================================
  // 8. ANIMATED STATISTICS COUNTERS (Eased Cubic-Out)
  // =========================================================================
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateCounters = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1800;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easeOut;

        counter.textContent = currentValue.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    statsObserver.observe(statsSection);
  } else if (statsSection) {
    animateCounters();
  }

  // =========================================================================
  // 9. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isCurrentlyActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstBtn = faqItems[0].querySelector('.faq-question');
    if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
  }

  // =========================================================================
  // 10. PRICING BILLING CYCLE SWITCH
  // =========================================================================
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.querySelector('.monthly-label');
  const annualLabel = document.querySelector('.annual-label');
  const priceValues = document.querySelectorAll('.price-val');
  const proPeriod = document.getElementById('pro-period');
  const entPeriod = document.getElementById('ent-period');

  if (billingToggle) {
    let isAnnual = false;

    billingToggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      billingToggle.classList.toggle('is-annual', isAnnual);
      billingToggle.setAttribute('aria-checked', isAnnual.toString());

      if (monthlyLabel && annualLabel) {
        monthlyLabel.classList.toggle('active', !isAnnual);
        annualLabel.classList.toggle('active', isAnnual);
      }

      priceValues.forEach((val) => {
        const newPrice = isAnnual ? val.getAttribute('data-annual') : val.getAttribute('data-monthly');
        
        val.style.transform = 'scale(0.85)';
        val.style.opacity = '0.35';
        val.style.transition = 'all 0.18s ease';

        setTimeout(() => {
          val.textContent = newPrice;
          val.style.transform = 'scale(1)';
          val.style.opacity = '1';
        }, 150);
      });

      if (proPeriod) {
        proPeriod.textContent = isAnnual ? '/ user / mo (billed annually)' : '/ user / month';
      }
      if (entPeriod) {
        entPeriod.textContent = isAnnual ? '/ mo (billed annually)' : '/ month (starts at)';
      }
    });
  }

  // =========================================================================
  // 11. CONTACT FORM VALIDATION & FEEDBACK
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toast-close');

  const showToast = (title, message, isSuccess = true) => {
    if (!toast) return;

    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    const toastIcon = toast.querySelector('.toast-icon i');

    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = message;

    if (toastIcon) {
      toastIcon.className = isSuccess ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
      toastIcon.style.color = isSuccess ? 'var(--neon-emerald)' : '#ef4444';
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  };

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    };

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errSpan = document.getElementById(`${input.id}-error`);
        if (errSpan) errSpan.classList.remove('visible');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      }

      if (!isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        if (emailError) emailError.classList.add('visible');
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('error');
        if (messageError) messageError.classList.add('visible');
        isValid = false;
      }

      if (!isValid) {
        showToast('Form Incomplete', 'Please check highlighted fields.', false);
        return;
      }

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();

        showToast(
          'Message Dispatched!',
          'A principal architect has received your specifications and will follow up shortly.',
          true
        );
      }, 1200);
    });
  }

  // =========================================================================
  // 12. DYNAMIC CURRENT YEAR
  // =========================================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
