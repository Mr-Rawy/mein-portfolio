document.addEventListener('DOMContentLoaded', function() {
    const videoIntro = document.getElementById('video-intro');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    
    const sparkleContainer = document.getElementById('sparkle-container');
    const actionButtons = document.querySelectorAll('.action-btn');
    const closeOverlayButtons = document.querySelectorAll('.close-overlay');
    const body = document.body;

    // إخفاء المحتوى الرئيسي في البداية
    mainContent.style.opacity = 0;
    mainContent.style.visibility = 'hidden';

    // ===============================================
    //           VIDEO INTRO SEQUENCE (5 seconds)
    // ===============================================
    
    introVideo.play().catch(error => {
        console.log("Autoplay blocked. User interaction required.");
    });

    // بعد 5 ثواني يتم إخفاء شاشة الفيديو وعرض المحتوى الرئيسي
    setTimeout(() => {
        // إظهار المحتوى الرئيسي
        mainContent.style.opacity = 1;
        mainContent.style.visibility = 'visible';

        // إخفاء شاشة الفيديو تدريجياً
        videoIntro.style.opacity = 0;
        
        // إزالتها من العرض بعد انتهاء انتقال الشفافية
        setTimeout(() => {
             videoIntro.style.display = 'none';
        }, 1000); // مدة الانتقال 1 ثانية (موجودة في CSS)

    }, 5000); // 5 ثواني (5000ms)

    // ===============================================
    //           EXISTING SITE LOGIC (Overlays & Sparkles)
    // ===============================================
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const targetOverlayId = this.dataset.target;
            if (targetOverlayId) {
                const targetOverlay = document.getElementById(targetOverlayId);
                if (targetOverlay) {
                    targetOverlay.classList.add('active');
                    body.classList.add('paused-animation');
                }
            }
        });
    });

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentOverlay = this.closest('.overlay');
            if (parentOverlay) {
                parentOverlay.classList.remove('active');
                body.classList.remove('paused-animation');
            }
        });
    });

    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                body.classList.remove('paused-animation');
            }
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        let sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    });
});