document.addEventListener('DOMContentLoaded', () => {
    // Slider elements
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    
    // Slider settings
    let currentIndex = 0;
    const slideCount = slides.length;
    let isPlaying = true;
    let slideInterval;
    const autoSlideDelay = 5000; // 5 seconds
    
    // Initialize slider
    updateSlider();
    startAutoSlide();
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoSlide();
    });
    
    playPauseBtn.addEventListener('click', toggleAutoSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
            resetAutoSlide();
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoSlide();
        }
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - next slide
            goToSlide(currentIndex + 1);
            resetAutoSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - previous slide
            goToSlide(currentIndex - 1);
            resetAutoSlide();
        }
    }
    
    // Slider functions
    function goToSlide(index) {
        // Handle infinite loop
        if (index >= slideCount) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slideCount - 1;
        } else {
            currentIndex = index;
        }
        
        updateSlider();
    }
    
    function updateSlider() {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }
    
    function startAutoSlide() {
        if (isPlaying) {
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, autoSlideDelay);
        }
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    function toggleAutoSlide() {
        isPlaying = !isPlaying;
        const icon = playPauseBtn.querySelector('i');
        
        if (isPlaying) {
            startAutoSlide();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            playPauseBtn.setAttribute('aria-label', 'Pause auto rotation');
        } else {
            stopAutoSlide();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            playPauseBtn.setAttribute('aria-label', 'Play auto rotation');
        }
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        if (isPlaying) {
            startAutoSlide();
        }
    }
    
    // Pause auto-slide when user hovers over slider
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        if (isPlaying) {
            stopAutoSlide();
        }
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        if (isPlaying) {
            startAutoSlide();
        }
    });
});