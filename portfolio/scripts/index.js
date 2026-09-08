/* ==========================================================
    전역 커스텀 커서 — lerp로 부드럽게 추적
    DOMContentLoaded로 감싸서, 스크립트가 어느 시점에 로드되든
    HTML 요소가 준비된 뒤에만 실행되도록 보장
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    
    if (!cursor){
        console.warn('[cursor] #cursor 요소를 찾지 못했습니다. index.html에 <div id="cursor">가 있는지 확인하세요.');
        return;
    }
    
    const cursorLabel = cursor.querySelector('.cursor__label');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const easing = 0.18;
    
    window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor(){
        cursorX += (mouseX - cursorX) * easing;
        cursorY += (mouseY - cursorY) * easing;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // 이벤트 위임(delegation) 방식으로 변경 —
    // 나중에 Work Index 패널이 JS로 동적 렌더링되어도
    // data-cursor 요소를 항상 정확히 감지함
    document.addEventListener('pointerover', (e) => {
        const target = e.target.closest('[data-cursor]');
        if (target){
        cursor.classList.add('is-hovering');
        if (cursorLabel) cursorLabel.textContent = target.dataset.cursor;
        }
    });
    
    document.addEventListener('pointerout', (e) => {
        const target = e.target.closest('[data-cursor]');
        if (target){
        cursor.classList.remove('is-hovering');
        }
    });
    });

    // ---------------------------------------- Work Index - 4분할 패널
const projects = [
    {
        num: '01',
        category: 'Web Design',
        title: 'Sirloin Redesign',
        tag: '',
        href: 'project-sirloin.html',
        thumb: '', // 준비되면 이미지 경로 입력 (예: assets/img/sirloin/thumb.webp)
    },
    {
        num: '02',
        category: 'Web Design',
        title: 'Herman Miller',
        tag: 'Redesign',
        href: 'project-hermanmiller.html',
        thumb: '',
    },
    {
        num: '03',
        category: 'Web Design',
        title: 'Not cute Anymore',
        tag: 'New Identity',
        href: 'project-notcuteanymore.html',
        thumb: '',
    },
    {
        num: '04',
        category: 'Web Design',
        title: '', // 아직 미정
        tag: 'Redesign',
        href: 'project-04.html',
        thumb: '',
    },
];

const worksIndex = document.querySelector('.works-index');
    
    if (worksIndex){
    worksIndex.innerHTML = projects.map(p => `
        <a class="works-index__panel" href="${p.href}" data-index="${p.num}" data-cursor="Explore">
        <div class="panel__thumb" style="${p.thumb ? `background-image:url('${p.thumb}')` : ''}"></div>
        <span class="panel__num">${p.num}</span>
        <span class="panel__arrow">↗</span>
        <span class="panel__category">${p.category}</span>
        <span class="panel__title">${p.title}</span>
        ${p.tag ? `<span class="panel__tag">${p.tag}</span>` : ''}
        </a>
    `).join('');
}