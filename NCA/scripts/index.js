// index.js

// 1. 헤더 스크롤
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero_section');

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const headerLogo = document.querySelector('.gnb h1 img');
    const heroSection = document.querySelector('.hero-swiper'); // 히어로 배너 섹션

    if (headerLogo && heroSection) {
        window.addEventListener('scroll', function () {
            const heroHeight = heroSection.offsetHeight; // 히어로 배너 높이 계산

            if (window.scrollY > heroHeight) {
                // 히어로 배너를 지났을 때: 민트 로고로 교체 및 클래스 추가
                headerLogo.src = './images/logo_mint.png';
                header.classList.add('is-scrolled');
            } else {
                // 히어로 배너 영역 내부일 때: 기본 로고 복원 및 클래스 제거
                headerLogo.src = './images/logo.png';
                header.classList.remove('is-scrolled');
            }
        });
    }
});

// 2. 히어로 메인 슬라이더 & 별 모양 커스텀 도트 연동
const starBtns = document.querySelectorAll('.star-btn');

    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        on: {
            // 슬라이드가 바뀔 때마다 별 도트 활성화 클래스(active) 변경
            slideChange: function () {
                const realIndex = this.realIndex; // realIndex 사용 (loop 대응)
                starBtns.forEach((btn, idx) => {
                    if (idx === realIndex) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        }
    });
    // 별 버튼 클릭 시 해당 슬라이드로 이동
    starBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            heroSwiper.slideToLoop(index);
        });
    });
// 3. best 슬라이드
const bestSwiper = new Swiper('.best-swiper', {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 5,
        // observer: true,
        // observerParents: true,
        scrollbar: {
            el: '.best-swiper .swiper-scrollbar',
            draggable: true,
            snapOnRelease: true,
        },
        breakpoints: {
            0: { slidesPerView: 2, slidesPerGroup: 2 },
            768: { slidesPerView: 3, slidesPerGroup: 3 },
            1024: { slidesPerView: 5, slidesPerGroup: 5 }
        }
    });

// 4. 룩북 슬라이더
document.addEventListener('DOMContentLoaded', function () {
    // 룩북 Swiper 슬라이더 초기화
const lookbookSwiper = new Swiper('.lookbook-swiper', {
        initialSlide: 1,
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: true,
        loopedSlides: 6,
        loopAdditionalSlides: 2,
        speed: 500,

        // 반응형 설정
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,  // 1024px 이상에서는 3개
                spaceBetween: 40,
            }
        },

        // 이전 / 다음 버튼
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
// 1. GET THE LOOK 데이터베이스
const gtlData = [
    {
        // data-popup="0" (@biwwwbi)
        handle: "@biwwwbi",
        bgImage: "./images/gtl/1.jpg",
        products: [
            {
                img: "./images/best/4.png",
                name: "Noir pleated skirt",
                price: "₩58,000",
                link: "#shop"
            },
            {
                img: "./images/best/4.png",
                name: "Grey Crop Cardigan",
                price: "₩72,000",
                link: "#shop"
            }
        ]
    },
    {
        // data-popup="1" (@minnnit)
        handle: "@minnnit",
        bgImage: "./images/gtl/2.jpg",
        products: [
            {
                img: "./images/best/4.png",
                name: "Noir pleated skirt",
                price: "₩58,000",
                link: "#shop"
            },
            {
                img: "./images/best/4.png",
                name: "White Oversized Shirt",
                price: "₩64,000",
                link: "#shop"
            }
        ]
    },
    {
        // data-popup="2" (@reeem_1)
        handle: "@reeem_1",
        bgImage: "./images/gtl/3.jpg",
        products: [
            {
                img: "./images/best/4.png",
                name: "Basic Crop Top",
                price: "₩34,000",
                link: "#shop"
            }
        ]
    },
    {
        // data-popup="3" (@liam0000)
        handle: "@liam0000",
        bgImage: "./images/gtl/4.jpg",
        products: [
            {
                img: "./images/best/4.png",
                name: "NCA Logo Ball Cap",
                price: "₩38,000",
                link: "#shop"
            },
            {
                img: "./images/best/4.png",
                name: "Wide Denim Pants",
                price: "₩89,000",
                link: "#shop"
            }
        ]
    },
    {
        // data-popup="4" (@chi44_0)
        handle: "@chi44_0",
        bgImage: "./images/gtl/5.jpg",
        products: [
            {
                img: "./images/products/acc1.png",
                name: "Silver Ribbon Necklace",
                price: "₩28,000",
                link: "#shop"
            }
        ]
    }
];

// 2. DOM 요소 선택 및 이벤트 연동
document.addEventListener('DOMContentLoaded', () => {
    const gtlItems = document.querySelectorAll('.gtl_wrap > div');
    const popupOverlay = document.querySelector('.popup_overlay');
    const popupCloseBtn = document.querySelector('.popup_close');

    // 팝업 내부 변경될 요소들 선택
    const popupHandle = document.querySelector('.popup_handle');
    const popupLeft = document.querySelector('.popup_left');
    const popupRight = document.querySelector('.popup_right');

    // GTL 이미지 클릭 시 팝업 열기 & 데이터 주입
    gtlItems.forEach(item => {
        item.addEventListener('click', () => {
            // HTML의 data-popup="0" 값 가져오기
            const popupIndex = item.getAttribute('data-popup');
            const data = gtlData[popupIndex];

            if (data && popupOverlay) {
                // A. 핸들(@아이디) 변경
                if (popupHandle) popupHandle.textContent = data.handle;

                // B. 좌측 이미지 변경 (배경 이미지 지정)
                if (popupLeft) {
                    popupLeft.style.backgroundImage = `url('${data.bgImage}')`;
                    popupLeft.style.backgroundSize = 'cover';
                    popupLeft.style.backgroundPosition = 'center';
                }

                // C. 우측 상품 목록 동적 생성
                if (popupRight) {
                    popupRight.innerHTML = ''; // 기존 HTML 초기화
                    
                    data.products.forEach(product => {
                        const productHTML = `
                        <div class="popup_product">
                            <a href="${product.link}">
                                <div class="img_box">
                                    <img src="${product.img}" alt="${product.name}">
                                </div>
                                <div class="info_box">
                                    <span class="title">${product.name}</span>
                                    <span class="price">${product.price}</span>
                                </div>
                            </a>
                            <a href="${product.link}" class="popup_shop_btn">SHOP NOW</a>
                        </div>
                        `;
                        popupRight.insertAdjacentHTML('beforeend', productHTML);
                    });
                }

                // D. 팝업 활성화 클래스 추가
                popupOverlay.classList.add('is-active');
            }
        });
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('is-active');
        });
    }

    // 팝업 검은 배경 클릭 시 팝업 닫기
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('is-active');
            }
        });
    }
});