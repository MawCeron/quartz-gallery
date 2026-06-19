// src/index.ts
var Gallery = () => {
  return {
    name: "Gallery",
    textTransform(_ctx, src) {
      return src.replace(
        /\[gallery\s+folder="([^"]+)"\s+files="([^"]+)"\]/g,
        (_match, folder, files) => {
          const imgs = files.split(",").map((f) => f.trim()).map(
            (f) => `<img src="${folder}/${f}" alt="${f}" onclick="__galleryOpen(this)" loading="lazy" />`
          ).join("\n");
          return `<div class="quartz-gallery">
${imgs}
</div>
<div id="quartz-lightbox" onclick="__galleryClose()"></div>`;
        }
      );
    },
    externalResources() {
      return {
        css: [
          {
            inline: true,
            content: `
.quartz-gallery {
  columns: 3 200px;
  gap: 0.75rem;
  margin: 1.5rem 0;
}
.quartz-gallery img {
  width: 100%;
  margin-bottom: 0.75rem;
  break-inside: avoid;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.quartz-gallery img:hover {
  opacity: 0.85;
}
#quartz-lightbox {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
}
#quartz-lightbox.active {
  display: flex;
}
#quartz-lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
}
@media (max-width: 600px) {
  .quartz-gallery { columns: 2 150px; }
}
            `
          }
        ],
        js: [
          {
            loadTime: "afterDOMReady",
            contentType: "inline",
            script: `
window.__galleryOpen = function(img) {
  const lb = document.getElementById('quartz-lightbox');
  lb.innerHTML = '<img src="' + img.src + '" />';
  lb.classList.add('active');
}
window.__galleryClose = function() {
  const lb = document.getElementById('quartz-lightbox');
  lb.classList.remove('active');
  lb.innerHTML = '';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') window.__galleryClose();
});
`
          }
        ]
      };
    }
  };
};
export {
  Gallery
};
