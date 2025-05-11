document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Elements on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (bar.parentElement.getBoundingClientRect().top < window.innerHeight - 100) {
                bar.style.width = level + '%';
                bar.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '';
            submitBtn.appendChild(spinner);
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent!';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-message success';
                    successMsg.textContent = 'Thank you! Your message has been sent successfully.';
                    this.insertBefore(successMsg, submitBtn);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }, 2000);
            }, 1500);
        });
    }
    
    // Dark Mode Toggle
    const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }
    
    // Theme switch event listener
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }
    
    // Add theme switch to DOM if not present
    if (!document.querySelector('.theme-switch-wrapper')) {
        const themeSwitchHTML = `
            <div class="theme-switch-wrapper">
                <label class="theme-switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div class="slider round">
                        <i class="fas fa-sun"></i>
                        <i class="fas fa-moon"></i>
                    </div>
                </label>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', themeSwitchHTML);
    }
    
    // Project Filter (if you add more projects later)
    const filterButtons = document.createElement('div');
    filterButtons.className = 'project-filters';
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="web">Web</button>
        <button class="filter-btn" data-filter="blockchain">Blockchain</button>
        <button class="filter-btn" data-filter="app">App</button>
    `;
    
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.querySelector('.container').insertBefore(filterButtons, projectsSection.querySelector('.projects-grid'));
        
        // Add filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project-card');
                
                projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Add data-category attributes to projects (you can expand this)
    document.querySelectorAll('.project-card').forEach((card, index) => {
        if (index === 0) card.setAttribute('data-category', 'web');
        if (index === 1) card.setAttribute('data-category', 'blockchain');
        if (index === 2) card.setAttribute('data-category', 'app');
    });
    
    // Typewriter Effect for Hero Section
    const typewriterTexts = [
        "Information Technology Student",
        "Web Developer",
        "Blockchain Enthusiast",
        "Machine Learning Learner"
    ];
    
    const heroSubtitle = document.querySelector('.hero-content h3');
    if (heroSubtitle) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function typeWriter() {
            const currentText = typewriterTexts[textIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typewriterTexts.length;
                setTimeout(typeWriter, 500);
            } else {
                const speed = isDeleting ? 50 : 100;
                setTimeout(typeWriter, speed);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});