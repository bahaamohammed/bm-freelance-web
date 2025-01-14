 // تهيئة مكتبة AOS للانيميشن
AOS.init({
    duration: 1000,
    once: true
});

// عداد الإحصائيات
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    const increment = target / 200;
    
    function updateCount() {
        const count = +counter.innerText.replace(/[^0-9]/g, '');
        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + '+';
            setTimeout(updateCount, 1);
        }
    }
    
    updateCount();
});

// تأثير السكرول الناعم
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});