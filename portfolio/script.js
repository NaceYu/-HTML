document.addEventListener('DOMContentLoaded', function() {
    // config.json fetch 및 적용
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // textSlide 적용
            const textSlideUl = document.querySelector('.animate-text-slide');
            if (textSlideUl && config.textSlide) {
                textSlideUl.innerHTML = config.textSlide.map(
                    text => `<li class="min-h-[3rem] md:min-h-[4rem] flex items-center">${text}</li>`
                ).join('');
            }

            // profile 적용
            if (config.profile) {
                const nicknameEl = document.querySelector('#about .grid [class*=font-semibold]:nth-child(1) + p');
                const birthEl = document.querySelector('#about .grid [class*=font-semibold]:nth-child(3) + p');
                const jobEl = document.querySelector('#about .grid [class*=font-semibold]:nth-child(5) + p');
                const locationEl = document.querySelector('#about .grid [class*=font-semibold]:nth-child(7) + p');
                if (nicknameEl) nicknameEl.textContent = config.profile.nickname;
                if (birthEl) birthEl.textContent = config.profile.birth;
                if (jobEl) jobEl.textContent = config.profile.job;
                if (locationEl) locationEl.textContent = config.profile.location;
            }

            // 소셜 이미지 및 링크 적용
            const socialDiv = document.querySelector('#home .mt-8.flex');
            if (socialDiv && config.social) {
                socialDiv.innerHTML = config.social.map(s =>
                    `<a href="${s.url}" target="_blank" class="text-gray-400 hover:text-brand-accent transition-colors" aria-label="${s.type}">
                        <img src="${s.image}" alt="${s.type}" class="w-8 h-8" />
                    </a>`
                ).join('');
            }
        });
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const toTopButton = document.getElementById('to-top-button');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            toTopButton.classList.remove('hidden');
        } else {
            toTopButton.classList.add('hidden');
        }
    });

    toTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    const skillSections = [document.getElementById('skills'), document.getElementById('language')];
    skillSections.forEach(section => {
        if (!section) return;
        const skillItems = section.querySelectorAll('.skill-item');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills(skillItems);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(section);
    });

    function animateSkills(skillItems) {
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
                const bar = item.querySelector('.skill-bar');
                if (bar) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                }
            }, index * 200);
        });
    }
});
