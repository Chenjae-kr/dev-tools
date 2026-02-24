/* Shared helpers for image/canvas based tools */
(function(){
  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  function fitTextSize(ctx, text, maxW, start, min=18, weight=700, family="Pretendard, Apple SD Gothic Neo, Malgun Gothic, sans-serif"){
    let s = start;
    while (s > min) {
      ctx.font = `${weight} ${s}px ${family}`;
      if (ctx.measureText(text).width <= maxW) return s;
      s -= 2;
    }
    return s;
  }

  function drawImageCover(ctx, img, x, y, w, h){
    const ir = img.width / img.height;
    const cr = w / h;
    let dw=w, dh=h, dx=x, dy=y;
    if (ir > cr) { dh = h; dw = h * ir; dx = x + (w - dw) / 2; }
    else { dw = w; dh = w / ir; dy = y + (h - dh) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function downloadCanvas(canvas, { format='png', quality=0.92, filename='image' } = {}){
    const f = format === 'jpeg' ? 'jpeg' : (format === 'webp' ? 'webp' : 'png');
    const mime = f === 'jpeg' ? 'image/jpeg' : (f === 'webp' ? 'image/webp' : 'image/png');
    const ext = f === 'jpeg' ? 'jpg' : f;
    const a = document.createElement('a');
    a.href = canvas.toDataURL(mime, clamp(quality, 0.01, 1));
    a.download = `${filename}.${ext}`;
    a.click();
  }

  window.ImageToolUtils = { clamp, fitTextSize, drawImageCover, downloadCanvas };
})();