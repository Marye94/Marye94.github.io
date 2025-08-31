document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for the test case header
    new Typed('.animated-text', {
        strings: ['Running QA Engineer profile validation...', 'Test Case: CV-001 initialized...', 'Executing test steps...'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Add fade-in class to sections and observe them
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Animate skill bars when they come into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    });

    document.querySelectorAll('#skills').forEach(section => {
        skillObserver.observe(section);
    });
});
