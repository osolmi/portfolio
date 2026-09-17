// index.js

// 1. 헤더 스크롤
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero_section');

window.addEventListener('scroll', () => {
    // 히어로 섹션의 높이보다 스크롤이 더 내려갔을 때
    if (window.scrollY >= heroSection.offsetHeight) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
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
        spaceBetween: 0,
        slidesPerGroup: 5,
        // observer: true,
        // observerParents: true,
        scrollbar: {
            el: '.best-swiper .swiper-scrollbar',
            draggable: true,
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
        slidesPerView: 1.2,      // 화면에 보일 슬라이드 개수
        spaceBetween: 0,        // 슬라이드 사이 간격 (px)
        centeredSlides: true,    // 가운데 슬라이드를 활성화 (swiper-slide-active)
        loop: true,              // 무한 순환
        speed: 500,              // 슬라이드 전환 속도
        
        // 반응형 설정 (피그마 디자인에 맞춰 조정)
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,  // 1024px 이상에서는 3개씩 보기
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
// 5. GET THE LOOK (GTL) 팝업 열기 / 닫기
    const gtlItems = document.querySelectorAll('.gtl_wrap > div');
    const popupOverlay = document.querySelector('.popup_overlay');
    const popupCloseBtn = document.querySelector('.popup_close');

    // GTL 이미지 클릭 시 팝업 열기
    gtlItems.forEach(item => {
        item.addEventListener('click', () => {
            if (popupOverlay) {
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