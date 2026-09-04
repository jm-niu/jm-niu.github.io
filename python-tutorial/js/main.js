/* ============================================
   Python Tutorial - Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Nav Toggle --- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* --- Navbar Scroll Shadow --- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* --- Back to Top Button --- */
  var backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Code Copy Buttons --- */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var codeBlock = btn.closest('.code-block') || btn.closest('.analogy-box');
      if (codeBlock) {
        var code = codeBlock.querySelector('code');
        if (code) {
          var text = code.innerText;
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = '已复制';
            btn.classList.add('copied');
            setTimeout(function () {
              btn.textContent = '复制';
              btn.classList.remove('copied');
            }, 2000);
          }).catch(function () {
            // Fallback for older browsers
            var textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            btn.textContent = '已复制';
            btn.classList.add('copied');
            setTimeout(function () {
              btn.textContent = '复制';
              btn.classList.remove('copied');
            }, 2000);
          });
        }
      }
    });
  });

  /* --- Scroll Reveal Animation --- */
  var revealElements = document.querySelectorAll('.feature-card, .chapter-card, .resource-card, .stat-item');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* --- Smooth Anchor Scroll with Navbar Offset --- */
  var navbarHeight = document.querySelector('.navbar') ? 80 : 0;

  // Handle sidebar and any internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1); // remove #
      if (!targetId) return;
      // Try id first, then data-section attribute (chapter sections use data-section)
      var targetEl = document.getElementById(targetId) ||
                     document.querySelector('[data-section="' + targetId + '"]');
      if (targetEl) {
        e.preventDefault();
        var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        // Update URL without jump
        history.pushState(null, null, '#' + targetId);
      }
    });
  });

  /* --- Sidebar Active Link Tracking --- */
  var sidebarLinks = document.querySelectorAll('.chapter-sidebar a');
  var contentSections = document.querySelectorAll('[data-section]');

  if (sidebarLinks.length > 0 && contentSections.length > 0 && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('data-section');
          sidebarLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });

    contentSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

});
