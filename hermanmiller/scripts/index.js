/* ================= DATA ================= */
const bestsellerData = {
    office:  [
        {name:"Aeron Chair", originalPrice: "$2,895.00 - $3,195.00", price:"$1,555.00 - $2,745.00", discount: "25% off", img:"./images/bs/1.png"},
        {name:"Embody Chair", price:"$1,895.00 - $2,145.00"},
        {name:"Sayl Chair", price:"$495.00 - $695.00"},
        {name:"Cosm Chair", price:"$1,095.00 - $1,395.00"}
    ],
    lounge:  [
        {name:"Eames Lounge Chair and Ottoman", price:"$6,745.00 - $8,996.25"},
        {name:"Eames Molded Plywood Lounge Chair", price:"$1,421.25 - $1,795.00"},
        {name:"Wireless Lounge Chair", price:"$995.00 - $1,325.00"},
        {name:"Eames Aluminum Group Lounge Chair", price:"$521.25 - $667.50"}
    ],
    coffee:  [
        {name:"Noguchi Table", originalPrice: "$2,895.00 - $3,195.00", price:"$2,171.25 - $2,396.25", discount: "25% off", img:"./images/bs/1.png"},
        {name:"Eames Wire Base Low Table", originalPrice: "$275.00 - $325.00", price:"$206.25 - $243.75", discount: "25% off", img:"./images/bs/2.png"},
        {name:"Eames Molded Plywood Coffee Table", originalPrice: "$1,430.00 - $1,530.00", price:"$1,072.50 - $1,147.50", discount: "25% off", img:"./images/bs/3.png"},
        {name:"Eames Elliptical Table", originalPrice: "$1,435.00 - $2,830.00", price:"$1,076.25 - $2,122.50", discount: "25% off", img:"./images/bs/4.png"}
    ],
    dining:  [
        {name:"Eames Molded Plywood Dining Chair", price:"$521.25 - $667.50"},
        {name:"Eames Table, Rectangular", price:"$1,895.00 - $2,995.00"},
        {name:"Eames Wire Chair", price:"$521.25 - $667.50"},
        {name:"Nelson Swag Leg Table", price:"$1,495.00 - $2,195.00"}
    ],
    desks:   [
        {name:"Eames Desk Unit", price:"$1,560.00 - $1,890.00"},
        {name:"Jarvis Bamboo Standing Desk", price:"$693.75 - $893.75"},
        {name:"Renew Sit-to-Stand Desk", price:"$895.00 - $1,195.00"},
        {name:"Nelson Basic Cabinet Desk", price:"$1,995.00 - $2,495.00"}
    ],
    gaming:  [
        {name:"Embody Gaming Chair", price:"$1,895.00 - $2,145.00"},
        {name:"Vantum Gaming Chair", price:"$895.00 - $1,095.00"},
        {name:"Vantum Gaming Desk", price:"$795.00 - $995.00"},
        {name:"OE1 Gaming Cart", price:"$495.00 - $695.00"}
    ],
    storage: [
        {name:"Nelson Storage Unit", price:"$1,560.00 - $1,890.00"},
        {name:"Eames Storage Unit", price:"$1,495.00 - $1,895.00"},
        {name:"Nelson Bookcase", price:"$895.00 - $1,295.00"},
        {name:"Basic Cabinet Series", price:"$1,195.00 - $1,795.00"}
    ],
    decor:   [
        {name:"Eames Hang-It-All", price:"$275.00 - $380.00"},
        {name:"Nelson Ball Bubble Pendant", price:"$465.00 - $813.75"},
        {name:"Girard Wooden Dolls", price:"$95.00 - $145.00"},
        {name:"Eames House Bird", price:"$135.00 - $165.00"}
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 히어로 세로 슬라이더
    const SLIDE_DURATION = 6000;
    const slides = document.querySelectorAll('.hero-slide');
    const fills = document.querySelectorAll('.slidebar-seg .fill');
    let current = 0;
    let startTime = null;

    function setSlide(i){
        if(slides.length === 0) return;
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
        if(fills[current]) fills[current].style.height = pct + '%';
        
        if(elapsed < SLIDE_DURATION){
            requestAnimationFrame(tick);
        } else {
            setSlide((current + 1) % slides.length);
        }
    }

    setSlide(0);

    // 2. 베스트셀러 탭 및 카드 렌더링
    const tabList = document.getElementById('tabList');
    const tabDot = document.getElementById('tabDot');
    const bestsellerGrid = document.getElementById('bestsellerGrid');

    if (tabList && bestsellerGrid) {
        const tabItems = tabList.querySelectorAll('li');

function renderBestsellers(key){
    if (!bestsellerData[key]) return;
    bestsellerGrid.innerHTML = bestsellerData[key].map(p => `
        <div class="product-card">
            <div class="product-thumb">
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <p class="heart"><img src="./images/icons/wish.png" alt="wish"></p>
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price-group">
                    ${p.originalPrice ? `<div class="product-price-bf">${p.originalPrice}</div>` : ''}
                    <div class="product-price">${p.price}</div>
                    ${p.discount ? `<span class="sale-badge">${p.discount}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

        function moveDot(li){
            if(!tabDot || !li) return;
            tabDot.style.top = (li.offsetTop + li.offsetHeight/2 - 3) + 'px';
        }

        tabItems.forEach(li => {
            li.addEventListener('click', () => {
                tabItems.forEach(x => x.classList.remove('active'));
                li.classList.add('active');
                moveDot(li);
                renderBestsellers(li.dataset.tab);
            });
        });

        // 초기 실행
        renderBestsellers('coffee');
        const activeLi = tabList.querySelector('li.active');
        if (activeLi) moveDot(activeLi);
    }
});

//======================= MD pick
const mdPickData = [
    {name:"Eames Turned Stool", originalPrice: "$1,095.00 - $1,420.00", price:"$621.25 - $1,065.00", discount: "25% off", img:"./images/md/1.png"},
    {name:"Nelson Ball Bubble Pendant", originalPrice: "$620.00 - $1,085.00", price:"$465.00 - $813.75", discount: "25% off", img:"./images/md/2.png"},
    {name:"Eames Molded Plywood Dining Chair Metal Base (DCM)", originalPrice: "$1,295.00 - $1,645.00", price:"$$971.25 - $1,233.75", discount: "25% off", img:"./images/md/3.png"},
    {name:"Eames Molded Fiberglass Armchair", originalPrice: "$695.00 - $890.00", price:"$521.25 - $667.50", discount: "25% off", img:"./images/md/4.png"},
    {name:"Nelson Marshmallow Sofa", originalPrice: "$6,635.00 - $7,370.00", price:"$4,976.25 - $5,527.50", discount: "25% off", img:"./images/md/5.png"},
    {name:"Eames Storage Unit", originalPrice: "$2,080.00 - $2,520.00", price:"$1,560.00 - $1,890.00", discount: "25% off", img:"./images/md/6.png"}
];

//======================== Collection
const roomProducts = [
    {num:"01", name:"Eames Lounge Chair and Ottoman", material:"Walnut veneer, leather", year:"1956", designer:"Charles & Ray Eames", price:"$6,745.00", x:22, y:60},
    {num:"02", name:"Noguchi Table", material:"Glass, walnut", year:"1948", designer:"Isamu Noguchi", price:"$2,171.25", x:42, y:70},
    {num:"03", name:"Nelson Bubble Lamp", material:"Steel, styrene shade", year:"1947", designer:"George Nelson", price:"$465.00", x:32, y:35},
    {num:"04", name:"Framed Wall Print", material:"Paper, wood frame", year:"—", designer:"—", price:"$120.00", x:60, y:30},
    {num:"05", name:"Eames Molded Plywood Lounge Chair", material:"Walnut veneer, molded plywood", year:"1946", designer:"Charles & Ray Eames", price:"$1,895.00", img: "./images/collecion/chair.png", x:74, y:52}
];

//======================== New In
const newInData = [
    {name:"Pursuit Rug by Edith Van Berkel", price:"$2,145.00 - $9,295.00", img:"./images/new/1.png"},
    {name:"Luva Modular Sectional", originalPrice: "$9,034.00 - $11,410.00", price:"$8,775.50 - $8,657.50", img:"./images/new/2.png"},
    {name:"New Canaan Low Bookshelf", originalPrice: "$5,295.00 - $5,495.00", price:"$3,971.25 - $4,121.25", img:"./images/new/3.png"},
    {name:"Eames Wire Chair Low Wire Base", originalPrice: "$1,995.00", price:"$1,496.25", img:"./images/new/4.png"},
    {name:"Passport Table", originalPrice: "$11,700.00 - $11,540.00", price:"$1,295.00 - $1,795.00", img:"./images/new/2.png"},
    {name:"Zeph Chair", originalPrice: "$11,700.00 - $11,540.00", price:"$795.00 - $1,095.00", img:"./images/new/3.png"}
];

// 공통 상품 카드 HTML 생성 함수
function createProductCardHTML(p) {
    return `
        <div class="product-card">
            <div class="product-thumb">
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <p class="heart"><img src="./images/icons/wish.png" alt="wish"></p>
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price-group">
                    ${p.originalPrice ? `<div class="product-price-bf">${p.originalPrice}</div>` : ''}
                    <div class="product-price">${p.price}</div>
                    ${p.discount ? `<span class="sale-badge">${p.discount}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

// 1. MD Pick 렌더링
// MD's Pick 우측 동적 렌더링
function renderMdPick() {
    const mdPickList = document.getElementById('mdPickList');
    if (!mdPickList) return;

    mdPickList.innerHTML = mdPickData.map(p => `
        <div class="product-card">
            <div class="product-thumb">
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <p class="heart"><img src="./images/icons/wish.png" alt="wish"></p>
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price-group">
                    ${p.originalPrice ? `<div class="product-price-bf">${p.originalPrice}</div>` : ''}
                    <div class="product-price">${p.price}</div>
                    ${p.discount ? `<span class="sale-badge">${p.discount}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// 2. New In 렌더링
function renderNewIn() {
    const container = document.getElementById('newInRow');
    if (!container) return;
    container.innerHTML = newInData.map(createProductCardHTML).join('');
}

// 3. Collection (Room Products) 핫스팟 & 카드 렌더링
function renderCollection() {
    const hotspotArea = document.getElementById('hotspotArea');
    if (!hotspotArea) return;

    // 핫스팟 생성
    hotspotArea.innerHTML = roomProducts.map((p, i) => `
        <button type="button" 
                class="hotspot ${i === 0 ? 'active' : ''}" 
                data-index="${i}"
                style="left:${p.x}%; top:${p.y}%;">
            ${p.num}
        </button>
    `).join('');

    // 첫 번째 상품으로 정보 카드 초기화
    updateCollectionCard(0);

    // 핫스팟 클릭 이벤트
    hotspotArea.addEventListener('click', (e) => {
        const btn = e.target.closest('.hotspot');
        if (!btn) return;
        
        document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active'));
        btn.classList.add('active');
        
        const idx = parseInt(btn.dataset.index, 10);
        updateCollectionCard(idx);
    });
}

// Collection 우측 카드 정보 갱신
function updateCollectionCard(index) {
    const item = roomProducts[index];
    if (!item) return;

    document.getElementById('card-num').textContent = item.num;
    document.getElementById('card-name').textContent = item.name;
    document.getElementById('card-material').textContent = item.material;
    document.getElementById('card-year').textContent = item.year;
    document.getElementById('card-designer').textContent = item.designer;
    document.getElementById('card-price').textContent = item.price;
    document.getElementById('card-img').src = item.img;
}

// DOM 로드 완료 시 전체 실행
document.addEventListener('DOMContentLoaded', () => {
    renderMdPick();
    renderNewIn();
    renderCollection();
});