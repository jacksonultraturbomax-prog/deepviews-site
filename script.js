// Deep Views — landing scripts
(function () {
  'use strict';

  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sticky header shadow
  var header = document.getElementById('header');
  var stickyCta = document.querySelector('.sticky-cta');
  var hero = document.querySelector('.hero');

  function onScroll() {
    var s = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', s > 8);

    if (stickyCta && hero) {
      var heroBottom = hero.offsetTop + hero.offsetHeight - 100;
      stickyCta.classList.toggle('is-visible', s > heroBottom);
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Smooth anchor offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = (header ? header.offsetHeight : 0) + 8;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // Light parallax on hero phone
  var phone = document.querySelector('.hero__phone');
  if (phone && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    document.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var s = window.scrollY;
        if (s < 800) phone.style.transform = 'translateY(' + (s * -0.04) + 'px)';
        ticking = false;
      });
    }, { passive: true });
  }
})();
