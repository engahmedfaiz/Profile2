// اختبار الوضع الليلي وتحسين التباين

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // تهيئة اختبار الوضع الليلي
    const darkModeTest = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.checkSavedTheme();
            this.runContrastTests();
        },

        cacheDom: function() {
            this.body = document.body;
            this.themeToggle = document.querySelector('.theme-toggle');
            this.testResults = document.createElement('div');
            this.testResults.className = 'dark-mode-test-results';
            this.testResults.style.cssText = 'position: fixed; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 15px; border-radius: 5px; z-index: 9999; max-width: 300px; max-height: 400px; overflow-y: auto; font-size: 12px;';
            document.body.appendChild(this.testResults);
        },

        bindEvents: function() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
            }
        },

        checkSavedTheme: function() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                this.body.classList.add('dark-mode');
                this.log('تم تحميل الوضع الليلي من التخزين المحلي');
            } else {
                this.log('تم تحميل الوضع النهاري من التخزين المحلي');
            }
        },

        toggleTheme: function() {
            this.body.classList.toggle('dark-mode');
            
            if (this.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                this.log('تم التبديل إلى الوضع الليلي');
                this.runContrastTests();
            } else {
                localStorage.setItem('theme', 'light');
                this.log('تم التبديل إلى الوضع النهاري');
                this.runContrastTests();
            }
        },

        log: function(message) {
            const logItem = document.createElement('p');
            logItem.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
            logItem.style.margin = '5px 0';
            logItem.style.borderBottom = '1px solid rgba(255,255,255,0.2)';
            logItem.style.paddingBottom = '5px';
            this.testResults.appendChild(logItem);
            this.testResults.scrollTop = this.testResults.scrollHeight;
        },

        runContrastTests: function() {
            this.log('بدء اختبارات التباين...');
            
            const isDarkMode = this.body.classList.contains('dark-mode');
            const mode = isDarkMode ? 'الليلي' : 'النهاري';
            
            // اختبار تباين النص الرئيسي مع الخلفية
            const bgColor = getComputedStyle(document.body).backgroundColor;
            const textColor = getComputedStyle(document.body).color;
            const textContrast = this.calculateContrastRatio(this.parseColor(bgColor), this.parseColor(textColor));
            
            this.log(`تباين النص الرئيسي في الوضع ${mode}: ${textContrast.toFixed(2)}`);
            if (textContrast < 4.5) {
                this.log('⚠️ تحذير: تباين النص الرئيسي منخفض جداً (يجب أن يكون 4.5+ للنصوص العادية)');
            } else {
                this.log('✅ تباين النص الرئيسي جيد');
            }
            
            // اختبار تباين العناوين
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings.length > 0) {
                const headingColor = getComputedStyle(headings[0]).color;
                const headingContrast = this.calculateContrastRatio(this.parseColor(bgColor), this.parseColor(headingColor));
                
                this.log(`تباين العناوين في الوضع ${mode}: ${headingContrast.toFixed(2)}`);
                if (headingContrast < 3) {
                    this.log('⚠️ تحذير: تباين العناوين منخفض جداً (يجب أن يكون 3+ للعناوين الكبيرة)');
                } else {
                    this.log('✅ تباين العناوين جيد');
                }
            }
            
            // اختبار تباين الأزرار
            const buttons = document.querySelectorAll('.btn-primary');
            if (buttons.length > 0) {
                const buttonBg = getComputedStyle(buttons[0]).backgroundColor;
                const buttonText = getComputedStyle(buttons[0]).color;
                const buttonContrast = this.calculateContrastRatio(this.parseColor(buttonBg), this.parseColor(buttonText));
                
                this.log(`تباين الأزرار في الوضع ${mode}: ${buttonContrast.toFixed(2)}`);
                if (buttonContrast < 4.5) {
                    this.log('⚠️ تحذير: تباين الأزرار منخفض جداً');
                } else {
                    this.log('✅ تباين الأزرار جيد');
                }
            }
            
            // اختبار تباين البطاقات
            const cards = document.querySelectorAll('.testimonial-item, .portfolio-item, .contact');
            if (cards.length > 0) {
                const cardBg = getComputedStyle(cards[0]).backgroundColor;
                const cardText = getComputedStyle(cards[0]).color;
                const cardContrast = this.calculateContrastRatio(this.parseColor(cardBg), this.parseColor(cardText));
                
                this.log(`تباين البطاقات في الوضع ${mode}: ${cardContrast.toFixed(2)}`);
                if (cardContrast < 4.5) {
                    this.log('⚠️ تحذير: تباين البطاقات منخفض جداً');
                } else {
                    this.log('✅ تباين البطاقات جيد');
                }
            }
            
            this.log('اكتملت اختبارات التباين');
        },

        parseColor: function(color) {
            // تحويل لون CSS إلى مصفوفة RGB
            if (color.startsWith('rgb')) {
                const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
                if (match) {
                    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
                }
            }
            return [0, 0, 0]; // افتراضي إذا فشل التحليل
        },

        calculateContrastRatio: function(bg, text) {
            // حساب نسبة التباين بين لونين وفقاً لمعايير WCAG
            const bgLuminance = this.calculateLuminance(bg);
            const textLuminance = this.calculateLuminance(text);
            
            const lighter = Math.max(bgLuminance, textLuminance);
            const darker = Math.min(bgLuminance, textLuminance);
            
            return (lighter + 0.05) / (darker + 0.05);
        },

        calculateLuminance: function(rgb) {
            // حساب السطوع النسبي للون
            const [r, g, b] = rgb.map(val => {
                val = val / 255;
                return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
            });
            
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }
    };

    // بدء اختبار الوضع الليلي
    darkModeTest.init();
});
