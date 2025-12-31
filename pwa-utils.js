// PWA Utility Functions
// Shared utilities for safe-area detection and mobile optimizations

(function() {
  'use strict';

  // Detect safe area insets
  function detectSafeAreaInsets() {
    const topInset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--safe-top')
    ) || 0;
    if (topInset > 0) {
      document.documentElement.classList.add('has-inset');
    }
  }

  // Fix viewport height on mobile browsers
  function setViewportHeight() {
    // Get actual viewport height and set as CSS variable
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Initialize viewport height fix
  function initViewportHeightFix() {
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
  }

  // Prevent elastic scrolling (rubber banding) on iOS
  function initElasticScrollPrevention() {
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
      startY = e.touches[0].pageY;
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
      const ui = document.getElementById('ui');
      if (!ui) return;

      const currentY = e.touches[0].pageY;
      const scrollTop = ui.scrollTop;
      const scrollHeight = ui.scrollHeight;
      const clientHeight = ui.clientHeight;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      // Prevent pull-to-refresh at top
      if (atTop && currentY > startY) {
        e.preventDefault();
      }
      // Prevent over-scroll at bottom
      if (atBottom && currentY < startY) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Initialize all PWA utilities
  function initPWAUtils() {
    detectSafeAreaInsets();
    initViewportHeightFix();
    initElasticScrollPrevention();
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPWAUtils);
  } else {
    initPWAUtils();
  }

  // Export for manual initialization if needed
  window.PWAUtils = {
    init: initPWAUtils,
    detectSafeAreaInsets: detectSafeAreaInsets,
    initViewportHeightFix: initViewportHeightFix,
    initElasticScrollPrevention: initElasticScrollPrevention
  };
})();
