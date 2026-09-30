/**
 * Isomorphic - Enterprise AI Platform Interactive Scripts
 * Handles Navigation, Smooth Scrolling, Scrollspy, Mobile Drawer, FAQ Accordion, and Lead Form.
 */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // --------------------------------------------------------------------------
    // 1. Mobile Drawer Navigation & Accessibility
    // --------------------------------------------------------------------------
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle("active");
            mobileMenuToggle.classList.toggle("active", isOpen);
            mobileMenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            document.body.classList.toggle("mobile-nav-open", isOpen);
        });

        // Close mobile menu on click outside
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("active")) {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        if (navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove("active");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
            }
            document.body.classList.remove("mobile-nav-open");
        }
    }

    // --------------------------------------------------------------------------
    // 2. Pixel-Perfect Smooth Anchor Navigation
    // --------------------------------------------------------------------------
    const internalAnchors = document.querySelectorAll('a[href^="#"]');
    internalAnchors.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;

            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                e.preventDefault();
                closeMobileMenu();

                const navHeight = navbar ? navbar.getBoundingClientRect().height : 70;
                const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = Math.max(0, elementTop - navHeight - 16);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                if (window.history && window.history.pushState) {
                    window.history.pushState(null, null, href);
                }
            }
        });
    });

    // --------------------------------------------------------------------------
    // 3. Scrollspy - Active Navigation Indicator
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a[href^='#']");

    if (sections.length > 0 && navItems.length > 0) {
        let isTicking = false;

        const updateActiveNav = () => {
            const scrollY = window.pageYOffset;
            const navHeight = navbar ? navbar.getBoundingClientRect().height : 70;
            let currentId = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 60;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentId = section.getAttribute("id");
                }
            });

            // Handle reaching bottom of page (highlight last item)
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
                const lastSection = sections[sections.length - 1];
                if (lastSection) currentId = lastSection.getAttribute("id");
            }

            navItems.forEach(link => {
                const href = link.getAttribute("href");
                if (href === `#${currentId}`) {
                    link.classList.add("nav-active");
                } else {
                    link.classList.remove("nav-active");
                }
            });

            isTicking = false;
        };

        window.addEventListener("scroll", () => {
            if (!isTicking) {
                window.requestAnimationFrame(updateActiveNav);
                isTicking = true;
            }
        }, { passive: true });

        // Initial run
        updateActiveNav();
    }

    // --------------------------------------------------------------------------
    // 4. FAQ Accordion with Keyboard Support
    // --------------------------------------------------------------------------
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item, index) => {
        const questionBtn = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (questionBtn && answer) {
            // Set accessibility attributes
            const questionId = `faq-q-${index}`;
            const answerId = `faq-a-${index}`;
            questionBtn.setAttribute("id", questionId);
            questionBtn.setAttribute("aria-controls", answerId);
            answer.setAttribute("id", answerId);
            answer.setAttribute("role", "region");
            answer.setAttribute("aria-labelledby", questionId);

            const isInitialActive = item.classList.contains("active");
            questionBtn.setAttribute("aria-expanded", isInitialActive ? "true" : "false");

            questionBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const wasActive = item.classList.contains("active");

                // Optional: Close all other FAQ items for clean accordion behavior
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                        const otherBtn = otherItem.querySelector(".faq-question");
                        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                    }
                });

                if (wasActive) {
                    item.classList.remove("active");
                    questionBtn.setAttribute("aria-expanded", "false");
                } else {
                    item.classList.add("active");
                    questionBtn.setAttribute("aria-expanded", "true");
                }
            });
        }
    });

    // --------------------------------------------------------------------------
    // 5. Contact Lead Form Submission
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const contactSuccess = document.getElementById("contact-success");

    if (contactForm && contactSuccess) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "Submitting Consultation Request...";
            }

            setTimeout(() => {
                contactForm.style.display = "none";
                contactSuccess.classList.add("active");
                contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = "Request Custom Consultation &rarr;";
                }
            }, 400);
        });
    }

    // --------------------------------------------------------------------------
    // 6. Founder Avatar Fallback
    // --------------------------------------------------------------------------
    document.querySelectorAll(".founder-avatar-img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.display = "none";
            if (img.nextElementSibling && img.nextElementSibling.classList.contains("dummy-avatar-bg")) {
                img.nextElementSibling.style.display = "flex";
            }
        });

        if (img.complete && img.naturalWidth === 0) {
            img.style.display = "none";
            if (img.nextElementSibling && img.nextElementSibling.classList.contains("dummy-avatar-bg")) {
                img.nextElementSibling.style.display = "flex";
            }
        }
    });

});
