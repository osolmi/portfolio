const SLIDE_DURATION = 6000;
const slides = document.querySelectorAll('.hero-slide');
const fills = document.querySelectorAll('.slidebar-seg .fill');
let current = 0;
let startTime = null;

function setSlide(i){
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    fills.forEach((f, idx) => { f.style.height = idx < i ? '100%' : '0%'; });
    current = i;
    startTime = null;
    requestAnimationFrame(() => requestAnimationFrame(tick));
    }
    
    function tick(ts){
    if(startTime === null) startTime = ts;
    const elapsed = ts - startTime;
    const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
    fills[current].style.height = pct + '%';
    
    if(elapsed < SLIDE_DURATION){
        requestAnimationFrame(tick);
    } else {
        setSlide((current + 1) % slides.length);
    }
}

setSlide(0);