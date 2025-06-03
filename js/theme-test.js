// ملف اختبار تطبيق الوضع الليلي والألوان تلقائياً

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // إنشاء لوحة اختبار
    const testPanel = document.createElement('div');
    testPanel.className = 'theme-test-panel';
    testPanel.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        max-width: 300px;
        max-height: 400px;
        overflow-y: auto;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(testPanel);

    // إضافة عنوان للوحة
    const testTitle = document.createElement('h3');
    testTitle.textContent = 'اختبار الوضع الليلي والألوان';
    testTitle.style.cssText = 'margin: 0 0 10px 0; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 8px;';
    testPanel.appendChild(testTitle);

    // إضافة زر إغلاق
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
    `;
    closeButton.addEventListener('click', function() {
        testPanel.style.display = 'none';
    });
    testPanel.appendChild(closeButton);

    // وظيفة لإضافة سجل
    function log(message, isSuccess = true) {
        const logItem = document.createElement('p');
        logItem.textContent = message;
        logItem.style.cssText = `
            margin: 5px 0;
            padding: 5px;
            border-radius: 4px;
            background-color: ${isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
            font-size: 12px;
        `;
        testPanel.appendChild(logItem);
        testPanel.scrollTop = testPanel.scrollHeight;
    }

    // اختبار الوضع الليلي
    function testDarkMode() {
        const savedTheme = localStorage.getItem('theme');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        log(`الوضع المحفوظ: ${savedTheme || 'غير محدد'}`);
        log(`الوضع الحالي: ${isDarkMode ? 'ليلي' : 'نهاري'}`);
        
        if (savedTheme === 'dark' && isDarkMode) {
            log('✅ تم تطبيق الوضع الليلي بنجاح من التخزين المحلي');
        } else if (savedTheme === 'light' && !isDarkMode) {
            log('✅ تم تطبيق الوضع النهاري بنجاح من التخزين المحلي');
        } else if (!savedTheme) {
            log('ℹ️ لا يوجد وضع محفوظ، يتم استخدام الوضع الافتراضي');
        } else {
            log('❌ هناك مشكلة في تطبيق الوضع المحفوظ', false);
        }
    }

    // اختبار الألوان
    function testColors() {
        const savedColor = localStorage.getItem('primary-color');
        const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        
        log(`اللون المحفوظ: ${savedColor || 'غير محدد'}`);
        log(`اللون الحالي: ${currentColor}`);
        
        if (savedColor) {
            // تنظيف الألوان للمقارنة (إزالة المسافات وتوحيد التنسيق)
            const cleanSavedColor = savedColor.replace(/\s/g, '').toLowerCase();
            const cleanCurrentColor = currentColor.replace(/\s/g, '').toLowerCase();
            
            if (cleanSavedColor === cleanCurrentColor || 
                `#${cleanSavedColor}` === cleanCurrentColor || 
                cleanSavedColor === `#${cleanCurrentColor}`) {
                log('✅ تم تطبيق اللون المخصص بنجاح من التخزين المحلي');
            } else {
                log('❌ هناك مشكلة في تطبيق اللون المحفوظ', false);
            }
        } else {
            log('ℹ️ لا يوجد لون محفوظ، يتم استخدام اللون الافتراضي');
        }
    }

    // اختبار اللغة
    function testLanguage() {
        const savedLanguage = localStorage.getItem('language');
        const currentLang = document.documentElement.lang;
        const isRTL = document.body.classList.contains('rtl');
        
        log(`اللغة المحفوظة: ${savedLanguage || 'غير محدد'}`);
        log(`اللغة الحالية: ${currentLang}`);
        log(`اتجاه النص: ${isRTL ? 'من اليمين إلى اليسار' : 'من اليسار إلى اليمين'}`);
        
        if (savedLanguage === currentLang) {
            log('✅ تم تطبيق اللغة المحفوظة بنجاح');
        } else if (!savedLanguage && currentLang === 'ar') {
            log('✅ تم تطبيق اللغة الافتراضية (العربية) بنجاح');
        } else {
            log('❌ هناك مشكلة في تطبيق اللغة المحفوظة', false);
        }
    }

    // اختبار التوافق مع الشاشات
    function testResponsiveness() {
        const width = window.innerWidth;
        log(`عرض الشاشة الحالي: ${width}px`);
        
        if (width < 576) {
            log('جاري الاختبار على شاشة صغيرة جداً');
        } else if (width < 768) {
            log('جاري الاختبار على شاشة صغيرة');
        } else if (width < 992) {
            log('جاري الاختبار على شاشة متوسطة');
        } else if (width < 1200) {
            log('جاري الاختبار على شاشة كبيرة');
        } else {
            log('جاري الاختبار على شاشة كبيرة جداً');
        }
    }

    // تشغيل الاختبارات
    log('بدء اختبار تطبيق التفضيلات تلقائياً...');
    testDarkMode();
    testColors();
    testLanguage();
    testResponsiveness();
    log('اكتمل الاختبار!');

    // إضافة أزرار اختبار
    const testButtonsContainer = document.createElement('div');
    testButtonsContainer.style.cssText = 'margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;';
    testPanel.appendChild(testButtonsContainer);

    // زر تبديل الوضع الليلي للاختبار
    const toggleDarkModeButton = document.createElement('button');
    toggleDarkModeButton.textContent = 'تبديل الوضع الليلي';
    toggleDarkModeButton.style.cssText = `
        padding: 5px 10px;
        background: #4f46e5;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 12px;
    `;
    toggleDarkModeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        log(`تم التبديل إلى الوضع ${document.body.classList.contains('dark-mode') ? 'الليلي' : 'النهاري'}`);
    });
    testButtonsContainer.appendChild(toggleDarkModeButton);

    // زر إعادة تحميل الصفحة للاختبار
    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'إعادة تحميل';
    reloadButton.style.cssText = `
        padding: 5px 10px;
        background: #10b981;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 12px;
    `;
    reloadButton.addEventListener('click', function() {
        log('جاري إعادة تحميل الصفحة للاختبار...');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    });
    testButtonsContainer.appendChild(reloadButton);

    // زر مسح التخزين المحلي للاختبار
    const clearStorageButton = document.createElement('button');
    clearStorageButton.textContent = 'مسح التخزين المحلي';
    clearStorageButton.style.cssText = `
        padding: 5px 10px;
        background: #ef4444;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 12px;
    `;
    clearStorageButton.addEventListener('click', function() {
        localStorage.removeItem('theme');
        localStorage.removeItem('primary-color');
        localStorage.removeItem('language');
        log('تم مسح التخزين المحلي');
    });
    testButtonsContainer.appendChild(clearStorageButton);
});
