document.addEventListener('DOMContentLoaded', function() {
    // Инициализация прелоадера
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Анимация логотипа
    const logoPath = document.querySelector('.logo-path');
    const logoText = document.querySelector('.logo-text');
    
    gsap.to(logoPath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power3.out"
    });
    
    gsap.to(logoText, {
        opacity: 1,
        duration: 1,
        delay: 1.5
    });

    // Эффект скролла для шапки
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Декоративные линии при скролле
    const goldLine = document.querySelector('.gold-line');
    const silverLine = document.querySelector('.silver-line');
    
    gsap.to(goldLine, {
        scrollTrigger: {
            trigger: '.services',
            start: 'top center',
            end: 'bottom center',
            scrub: true
        },
        scaleX: 1
    });
    
    gsap.to(silverLine, {
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'top center',
            end: 'bottom center',
            scrub: true
        },
        scaleX: 1
    });

    // Параллакс эффекты
    gsap.to('.film-overlay', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100
    });

    // Анимация карточек услуг
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Калькулятор стоимости
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const servicePrice = parseFloat(document.getElementById('serviceSelect').value);
            const multiplier = parseFloat(document.getElementById('carClass').value);
            const total = Math.round(servicePrice * multiplier);
            
            document.getElementById('calculatedPrice').textContent = `${total.toLocaleString('ru-RU')} ₽`;
            
            // Анимация результата
            gsap.from("#calculatedPrice", {
                scale: 1.5,
                duration: 0.5,
                ease: "back.out"
            });
        });
    }

    // Слайдер "до/после"
    const portfolioSlider = document.querySelector('.portfolio-slider');
    
    if (portfolioSlider) {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        
        portfolioSlider.addEventListener('mousedown', startDrag);
        portfolioSlider.addEventListener('touchstart', startDrag);
        
        window.addEventListener('mouseup', endDrag);
        window.addEventListener('touchend', endDrag);
        
        portfolioSlider.addEventListener('mousemove', drag);
        portfolioSlider.addEventListener('touchmove', drag);
        
        function startDrag(e) {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            currentX = startX;
            portfolioSlider.style.cursor = 'ew-resize';
            e.preventDefault();
        }
        
        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            portfolioSlider.style.cursor = '';
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const deltaX = x - currentX;
            currentX = x;
            
            const rect = portfolioSlider.getBoundingClientRect();
            const offsetX = currentX - rect.left;
            let percentage = (offsetX / rect.width) * 100;
            
            percentage = Math.max(0, Math.min(100, percentage));
            
            portfolioSlider.style.setProperty('--slider-pos', `${percentage}%`);
            document.querySelector('.portfolio-item.before').style.width = `${percentage}%`;
        }
    }

    // Модальное окно
    const modal = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModal = document.querySelector('.close-modal');
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Отправка формы
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь должна быть логика отправки формы
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            bookingForm.reset();
        });
    }
});