document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('searchModal');
    const closeModal = document.querySelector('.close-modal');
    const messagesBtn = document.querySelector('.messages-btn');
    const notificationsBtn = document.querySelector('.notifications-btn');
    const messagesMenu = document.querySelector('.messages-menu');
    const notificationsMenu = document.querySelector('.notifications-menu');

    // عند النقر على زر الملف الشخصي
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // تفعيل البحث
    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        searchModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // إغلاق البحث عند النقر خارجه
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // تفعيل قوائم الرسائل والإشعارات
    messagesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        messagesMenu.classList.toggle('show');
        notificationsMenu.classList.remove('show');
        dropdownMenu.classList.remove('show');
    });

    notificationsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsMenu.classList.toggle('show');
        messagesMenu.classList.remove('show');
        dropdownMenu.classList.remove('show');
    });

    // إضافة مستمع حدث للنقر على مستوى الصفحة
    document.addEventListener('click', (e) => {
        // إغلاق قائمة الرسائل إذا تم النقر خارجها
        if (!e.target.closest('.messages-dropdown')) {
            messagesMenu.classList.remove('show');
        }
        
        // إغلاق قائمة الإشعارات إذا تم النقر خارجها
        if (!e.target.closest('.notifications-dropdown')) {
            notificationsMenu.classList.remove('show');
        }
        
        // إغلاق القائمة المنسدلة للملف الشخصي إذا تم النقر خارجها
        if (!e.target.closest('.profile-dropdown')) {
            dropdownMenu.classList.remove('show');
        }
    });

    // منع انتشار الحدث عند النقر داخل القوائم
    messagesMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    notificationsMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // إضافة كود التبويبات
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // إزالة الكلاس active من جميع التبويبات
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // إضافة الكلاس active للتبويب المحدد ومحتواه
            tab.classList.add('active');
            tabContents[index].classList.add('active');
        });
    });
}); 