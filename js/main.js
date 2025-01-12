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
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('projectFiles');
    const uploadLabel = document.querySelector('.file-upload-label');
    const uploadedFiles = document.querySelector('.uploaded-files');

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

    // العثور على زر الإعدادات المتقدمة
    const toggleAdvanced = document.querySelector('.toggle-advanced');
    const advancedContent = document.querySelector('.advanced-content');

    // إضافة مستمع حدث للنقر
    if (toggleAdvanced && advancedContent) {
        toggleAdvanced.addEventListener('click', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي للزر
            
            // تبديل الكلاس النشط
            this.classList.toggle('active');
            advancedContent.classList.toggle('active');
            
            // تغيير اتجاه السهم
            const icon = this.querySelector('.fa-chevron-down');
            if (icon) {
                icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    }

    // إضافة سؤال جديد
    const addQuestionBtn = document.querySelector('.add-question-btn');
    const questionsList = document.querySelector('.questions-list');

    if (addQuestionBtn && questionsList) {
        addQuestionBtn.addEventListener('click', function() {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.innerHTML = `
                <input type="text" placeholder="اكتب سؤالك هنا..." name="questions[]">
                <div class="question-actions">
                    <button type="button" class="remove-question">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            questionsList.appendChild(questionItem);
        });
    }

    // حذف سؤال
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-question') || e.target.closest('.remove-question')) {
            const questionItem = e.target.closest('.question-item');
            if (questionItem) {
                questionItem.remove();
            }
        }
    });

    // معالجة رفع الملفات
    if (fileUploadArea && fileInput && uploadLabel) {
        // منع السلوك الافتراضي للسحب والإفلات
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // إضافة التأثيرات المرئية عند السحب
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                uploadLabel.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                uploadLabel.classList.remove('drag-over');
            }, false);
        });

        // معالجة إفلات الملفات
        fileUploadArea.addEventListener('drop', handleDrop, false);
        
        // معالجة اختيار الملفات عبر النقر
        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
        });
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            // تحديد نوع الملف وأيقونته
            let fileType = 'ملف';
            let fileIcon = 'fa-file';
            let thumbnailClass = '';
            let thumbnail = '';

            if (file.type.startsWith('image/')) {
                fileType = 'صورة';
                fileIcon = 'fa-file-image';
                thumbnailClass = 'image';
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = fileItem.querySelector('.file-thumbnail img');
                    if (img) img.src = e.target.result;
                }
                reader.readAsDataURL(file);
                thumbnail = '<img src="" alt="معاينة">';
            } 
            else if (file.type.includes('pdf')) {
                fileType = 'PDF';
                fileIcon = 'fa-file-pdf';
                thumbnailClass = 'pdf';
            }
            else if (file.type.startsWith('video/')) {
                fileType = 'فيديو';
                fileIcon = 'fa-file-video';
                thumbnailClass = 'video';
            }
            else if (file.type.includes('word') || file.type.includes('document')) {
                fileType = 'مستند';
                fileIcon = 'fa-file-word';
                thumbnailClass = 'document';
            }
            else if (file.type.includes('zip') || file.type.includes('rar')) {
                fileType = 'ملف مضغوط';
                fileIcon = 'fa-file-archive';
                thumbnailClass = 'archive';
            }

            const fileSize = formatFileSize(file.size);

            // تحديث هيكل HTML
            fileItem.innerHTML = `
                <div class="file-preview">
                    <div class="file-thumbnail ${thumbnailClass}">
                        ${thumbnail || `<i class="fas ${fileIcon}"></i>`}
                    </div>
                    <div class="file-details">
                        <div class="file-name">
                            ${file.name}
                            <span class="file-type">${fileType}</span>
                        </div>
                        <div class="file-meta">
                            <span>${fileSize}</span>
                            <span>${new Date().toLocaleDateString('ar-SA')}</span>
                        </div>
                    </div>
                </div>
                <button type="button" class="file-action-btn remove" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            // إضافة معالجات الأحداث
            const removeBtn = fileItem.querySelector('.remove');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    fileItem.classList.add('removing');
                    setTimeout(() => {
                        fileItem.remove();
                    }, 300);
                });
            }

            const previewBtn = fileItem.querySelector('.preview');
            if (previewBtn) {
                previewBtn.addEventListener('click', () => previewFile(file));
            }

            uploadedFiles.appendChild(fileItem);
        });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function previewFile(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const modal = document.createElement('div');
                modal.className = 'preview-modal';
                modal.innerHTML = `
                    <div class="preview-content">
                        <img src="${e.target.result}" alt="معاينة">
                        <button class="close-preview">&times;</button>
                    </div>
                `;
                document.body.appendChild(modal);
                
                modal.querySelector('.close-preview').onclick = () => modal.remove();
                modal.onclick = (e) => {
                    if (e.target === modal) modal.remove();
                };
            }
            reader.readAsDataURL(file);
        }
        else if (file.type.includes('pdf')) {
            // فتح PDF في نافذة جديدة
            const url = URL.createObjectURL(file);
            window.open(url, '_blank');
        }
        // يمكن إضافة المزيد من أنواع المعاينة حسب الحاجة
    }

    // حذف الملفات
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-file')) {
            e.target.closest('.file-item').remove();
        }
    });

    // معالجة صورة المشروع
    const projectImageInput = document.getElementById('projectImage');
    const projectImageArea = projectImageInput.closest('.file-upload-area');
    const projectImageUploadedFiles = projectImageArea.querySelector('.uploaded-files');

    if (projectImageInput) {
        // منع السلوك الافتراضي للسحب والإفلات
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            projectImageArea.addEventListener(eventName, preventDefaults, false);
        });

        // إضافة التأثيرات المرئية عند السحب
        ['dragenter', 'dragover'].forEach(eventName => {
            projectImageArea.addEventListener(eventName, () => {
                projectImageArea.querySelector('.file-upload-label').classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            projectImageArea.addEventListener(eventName, () => {
                projectImageArea.querySelector('.file-upload-label').classList.remove('drag-over');
            });
        });

        // معالجة إفلات الملف
        projectImageArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length) handleProjectImage(files[0]);
        });

        // معالجة اختيار الملف
        projectImageInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleProjectImage(e.target.files[0]);
        });
    }

    function handleProjectImage(file) {
        // التحقق من نوع الملف
        if (!file.type.startsWith('image/')) {
            alert('الرجاء اختيار صورة صالحة');
            return;
        }

        // التحقق من حجم الملف (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
            return;
        }

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        // إنشاء معاينة للصورة
        const reader = new FileReader();
        reader.onload = function(e) {
            fileItem.innerHTML = `
                <div class="file-preview">
                    <div class="file-thumbnail image">
                        <img src="${e.target.result}" alt="معاينة">
                    </div>
                    <div class="file-details">
                        <div class="file-name">
                            ${file.name}
                            <span class="file-type">صورة</span>
                        </div>
                        <div class="file-meta">
                            <span>${formatFileSize(file.size)}</span>
                            <span>${new Date().toLocaleDateString('ar-SA')}</span>
                        </div>
                    </div>
                </div>
                <button type="button" class="file-action-btn preview" title="معاينة">
                    <i class="fas fa-eye"></i>
                </button>
                <button type="button" class="file-action-btn remove" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            // إضافة معالجات الأحداث
            const removeBtn = fileItem.querySelector('.remove');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    fileItem.classList.add('removing');
                    setTimeout(() => {
                        fileItem.remove();
                        projectImageInput.value = ''; // مسح الملف المحدد
                    }, 300);
                });
            }

            const previewBtn = fileItem.querySelector('.preview');
            if (previewBtn) {
                previewBtn.addEventListener('click', () => previewFile(file));
            }
        };
        reader.readAsDataURL(file);

        // مسح الصور السابقة
        projectImageUploadedFiles.innerHTML = '';
        projectImageUploadedFiles.appendChild(fileItem);
    }
}); 

$(document).ready(function() {
    // تطبيق select2 على جميع عناصر select
    $('select').select2({
        width: '100%',  // لجعل العرض يتناسب مع الحاوية
        dir: "rtl"      // للدعم العربي
    });
});