import { QuartzTransformerPlugin } from "@quartz-community/types"

export const Gallery: QuartzTransformerPlugin = () => {
  return {
    name: "Gallery",
    textTransform(_ctx, src) {
      return src.replace(
        /\[gallery\s+folder="([^"]+)"\s+files="([^"]+)"\]/g,
        (_match, folder, files) => {
          const imgs = files
            .split(",")
            .map((f: string) => f.trim())
            .map(
              (f: string) =>
                `<img src="${folder}/${f}" alt="${f}" onclick="__galleryOpen(this)" loading="lazy" />`,
            )
            .join("\n")

          return `<div class="quartz-gallery">\n${imgs}\n</div>\n<div id="quartz-lightbox" onclick="__galleryClose()"></div>`
        },
      )
    },
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
`,
          },
        ],
      }
    },
  }
}