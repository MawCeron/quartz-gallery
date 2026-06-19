externalResources() {
  return {
    css: [
      {
        content: "https://cdn.jsdelivr.net/gh/MawCeron/quartz-gallery@main/dist/gallery.css",
      },
    ],
    js: [
      {
        loadTime: "afterDOMReady",
        contentType: "inline",
        script: `
(function() {
  let _images = [];
  let _current = 0;

  window.__galleryOpen = function(img) {
    const gallery = img.closest('.quartz-gallery');
    _images = Array.from(gallery.querySelectorAll('img'));
    _current = _images.indexOf(img);

    const lb = document.getElementById('quartz-lightbox');
    lb.innerHTML = \`
      <button class="lb-prev" onclick="__galleryPrev(event)">&#8249;</button>
      <img src="\${img.src}" />
      <button class="lb-next" onclick="__galleryNext(event)">&#8250;</button>
    \`;
    lb.classList.add('active');
  }

  window.__galleryPrev = function(e) {
    e.stopPropagation();
    _current = (_current - 1 + _images.length) % _images.length;
    __galleryUpdate();
  }

  window.__galleryNext = function(e) {
    e.stopPropagation();
    _current = (_current + 1) % _images.length;
    __galleryUpdate();
  }

  function __galleryUpdate() {
    const lb = document.getElementById('quartz-lightbox');
    const img = lb.querySelector('img');
    img.classList.add('changing');
    setTimeout(() => {
      img.src = _images[_current].src;
      img.classList.remove('changing');
    }, 150);
  }

  window.__galleryClose = function() {
    const lb = document.getElementById('quartz-lightbox');
    lb.classList.add('closing');
    setTimeout(() => {
      lb.classList.remove('active', 'closing');
      lb.innerHTML = '';
    }, 200);
  }

  document.addEventListener('keydown', function(e) {
    const lb = document.getElementById('quartz-lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') __galleryClose();
    if (e.key === 'ArrowLeft') __galleryPrev(e);
    if (e.key === 'ArrowRight') __galleryNext(e);
  });
})();
        `,
      },
    ],
  }
},