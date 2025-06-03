// ملف JavaScript لدعم تعدد اللغات وتخصيص الألوان

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // تطبيق الوضع الليلي/النهاري مباشرة عند تحميل الصفحة
    function applyTheme() {
        const body = document.body;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            
            // تحديث أيقونة الزر إذا كان موجوداً
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                const themeIcon = themeToggle.querySelector('i');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // تطبيق اللون المخصص مباشرة عند تحميل الصفحة
    function applyColor() {
        const savedColor = localStorage.getItem('primary-color');
        if (savedColor) {
            document.documentElement.style.setProperty('--primary-color', savedColor);
            
            // تحديث الخيار النشط إذا كانت الأزرار موجودة
            const colorOptions = document.querySelectorAll('.color-option');
            if (colorOptions && colorOptions.length > 0) {
                colorOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-color') === savedColor) {
                        option.classList.add('active');
                    }
                });
            }
            
            // تحديث لون منتقي الألوان المخصص إذا كان موجوداً
            const customColorPicker = document.getElementById('custom-color-picker');
            if (customColorPicker) {
                customColorPicker.value = savedColor;
            }
        }
    }

    // تطبيق اللغة المحفوظة مباشرة عند تحميل الصفحة
    function applyLanguage() {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            document.documentElement.lang = savedLanguage;
            document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
            
            if (savedLanguage === 'ar') {
                document.body.classList.add('rtl');
                if (document.querySelector('.language-switch')) {
                    document.querySelector('.language-switch').textContent = 'English';
                }
            } else {
                document.body.classList.remove('rtl');
                if (document.querySelector('.language-switch')) {
                    document.querySelector('.language-switch').textContent = 'العربية';
                }
            }
            
            updateLanguage(savedLanguage);
        } else {
            // اللغة الافتراضية هي العربية
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
            updateLanguage('ar');
        }
    }

    // تطبيق جميع التفضيلات فوراً عند تحميل الصفحة
    applyTheme();
    applyColor();
    applyLanguage();

    // إضافة زر تبديل اللغة إلى القائمة
    const navbarMenuElement = document.querySelector('.navbar-menu');
    if (navbarMenuElement) {
        const languageSwitchItem = document.createElement('li');
        languageSwitchItem.className = 'navbar-item';
        
        const languageSwitchButton = document.createElement('button');
        languageSwitchButton.className = 'language-switch';
        languageSwitchButton.setAttribute('data-translate', 'English');
        languageSwitchButton.textContent = document.documentElement.lang === 'ar' ? 'English' : 'العربية';
        
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
        // التأكد من وجود متغيرات الترجمة
        if (typeof translations_ar === 'undefined' || typeof translations_en === 'undefined') {
            console.error('ملفات الترجمة غير موجودة');
            return;
        }
        
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

    // واجهة اختيار الألوان
    const colorPickerToggle = document.querySelector('.color-picker-toggle');
    const colorPickerContainer = document.querySelector('.color-picker-container');
    const colorOptions = document.querySelectorAll('.color-option');
    const customColorPicker = document.getElementById('custom-color-picker');
    
    if (colorPickerToggle && colorPickerContainer) {
        colorPickerToggle.addEventListener('click', function() {
            colorPickerContainer.style.display = colorPickerContainer.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    if (colorOptions && colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                document.documentElement.style.setProperty('--primary-color', color);
                localStorage.setItem('primary-color', color);
                
                // تحديث الخيار النشط
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // تحديث لون منتقي الألوان المخصص
                if (customColorPicker) {
                    customColorPicker.value = color;
                }
            });
        });
    }
    
    if (customColorPicker) {
        customColorPicker.addEventListener('input', function() {
            const color = this.value;
            document.documentElement.style.setProperty('--primary-color', color);
            localStorage.setItem('primary-color', color);
            
            // إزالة الفئة النشطة من جميع الخيارات
            if (colorOptions && colorOptions.length > 0) {
                colorOptions.forEach(option => option.classList.remove('active'));
            }
        });
    }

    // إغلاق منتقي الألوان عند النقر خارجه
    document.addEventListener('click', function(event) {
        if (colorPickerContainer && colorPickerToggle && 
            !colorPickerToggle.contains(event.target) && 
            !colorPickerContainer.contains(event.target)) {
            colorPickerContainer.style.display = 'none';
        }
    });

    // تبديل الوضع الليلي/النهاري
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
