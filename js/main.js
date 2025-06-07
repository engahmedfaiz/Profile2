// ملف JavaScript الرئيسي للموقع


document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // تهيئة AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // تحديث السنة الحالية في التذييل
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // القائمة العلوية المتغيرة عند التمرير
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // زر القائمة للأجهزة المحمولة
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            navbarToggle.querySelector('i').classList.add('fa-bars');
            navbarToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // تنشيط الروابط في القائمة حسب القسم الحالي
    function activateNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);

    // تحريك شريط المهارات
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // تشغيل تحريك شريط المهارات عند الوصول إلى قسم المهارات
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }

    // تصفية مشاريع المحفظة
    const filterItems = document.querySelectorAll('.portfolio-filter-item');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع عناصر التصفية
            filterItems.forEach(filter => filter.classList.remove('active'));
            // إضافة الفئة النشطة إلى العنصر المنقور
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(portfolioItem => {
                if (filterValue === 'all' || portfolioItem.getAttribute('data-category') === filterValue) {
                    portfolioItem.style.display = 'block';
                    setTimeout(() => {
                        portfolioItem.style.opacity = '1';
                        portfolioItem.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    portfolioItem.style.opacity = '0';
                    portfolioItem.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        portfolioItem.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // زر العودة لأعلى
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // تبديل الوضع الليلي/النهاري
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // التحقق من وجود تفضيل محفوظ
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // واجهة اختيار الألوان
    const colorPickerToggle = document.querySelector('.color-picker-toggle');
    const colorPickerContainer = document.querySelector('.color-picker-container');
    const colorOptions = document.querySelectorAll('.color-option');
    const customColorPicker = document.getElementById('custom-color-picker');
    
    // التحقق من وجود لون محفوظ
    const savedColor = localStorage.getItem('primary-color');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        
        // تحديث الخيار النشط
        colorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === savedColor) {
                option.classList.add('active');
            }
        });
        
        // تحديث لون منتقي الألوان المخصص
        customColorPicker.value = savedColor;
    }
    
    colorPickerToggle.addEventListener('click', function() {
        colorPickerContainer.style.display = colorPickerContainer.style.display === 'block' ? 'none' : 'block';
    });
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            localStorage.setItem('primary-color', color);
            
            // تحديث الخيار النشط
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // تحديث لون منتقي الألوان المخصص
            customColorPicker.value = color;
        });
    });
    
    customColorPicker.addEventListener('input', function() {
        const color = this.value;
        document.documentElement.style.setProperty('--primary-color', color);
        localStorage.setItem('primary-color', color);
        
        // إزالة الفئة النشطة من جميع الخيارات
        colorOptions.forEach(option => option.classList.remove('active'));
    });

    // إغلاق منتقي الألوان عند النقر خارجه
    document.addEventListener('click', function(event) {
        if (!colorPickerToggle.contains(event.target) && !colorPickerContainer.contains(event.target)) {
            colorPickerContainer.style.display = 'none';
        }
    });

    // تمرير سلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // إضافة زر تبديل اللغة إلى القائمة
    const navbarMenuElement = document.querySelector('.navbar-menu');
    if (navbarMenuElement) {
        const languageSwitchItem = document.createElement('li');
        languageSwitchItem.className = 'navbar-item';
        
        const languageSwitchButton = document.createElement('button');
        languageSwitchButton.className = 'language-switch';
        languageSwitchButton.setAttribute('data-translate', 'English');
        languageSwitchButton.textContent = 'English';
        
        languageSwitchButton.addEventListener('click', function() {
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
            
            document.documentElement.lang = newLang;
            document.documentElement.dir = newDir;
            
            if (newLang === 'ar') {
                document.body.classList.add('rtl');
                this.textContent = 'English';
            } else {
                document.body.classList.remove('rtl');
                this.textContent = 'العربية';
            }
            
            // تحديث النصوص حسب اللغة
            updateLanguage(newLang);
            
            // حفظ تفضيل اللغة
            localStorage.setItem('language', newLang);
        });
        
        languageSwitchItem.appendChild(languageSwitchButton);
        navbarMenuElement.appendChild(languageSwitchItem);
    }

    // تحديث اللغة عند تحميل الصفحة
    function updateLanguage(lang) {
        const translations = lang === 'ar' ? translations_ar : translations_en;
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
    }

    // التحقق من وجود تفضيل لغة محفوظ
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        
        if (savedLanguage === 'ar') {
            document.body.classList.add('rtl');
            document.querySelector('.language-switch').textContent = 'English';
        } else {
            document.body.classList.remove('rtl');
            document.querySelector('.language-switch').textContent = 'العربية';
        }
        
        updateLanguage(savedLanguage);
    }
});
