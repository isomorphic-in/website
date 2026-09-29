/**
 * Isomorphic - Website Interactive Scripts
 */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // 1. Mobile Menu Open / Close Toggle
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = navLinks.classList.toggle("active");
            mobileMenuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
        });

        // Close mobile menu on click outside
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 2. Reliable Anchor Navigation & Smooth Scrolling
    // Select all links that point to an ID on the current page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (!href || href === "#" || href.length <= 1) return;

            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                e.preventDefault();

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    if (mobileMenuToggle) {
                        mobileMenuToggle.setAttribute("aria-expanded", "false");
                    }
                }

                // Smoothly scroll to the target element
                targetEl.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update browser URL hash cleanly
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, null, href);
                }
            }
        });
    });

    // 3. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        if (questionBtn) {
            questionBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const wasActive = item.classList.contains("active");
                
                // Close all accordion items
                faqItems.forEach(i => i.classList.remove("active"));
                
                // If the clicked item was not active, open it
                if (!wasActive) {
                    item.classList.add("active");
                }
            });
        }
    });

    // 4. Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    const contactSuccess = document.getElementById("contact-success");

    if (contactForm && contactSuccess) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            contactForm.style.display = "none";
            contactSuccess.classList.add("active");
            contactForm.reset();
        });
    }

    // 5. Founder Avatar Fallback check
    document.querySelectorAll(".founder-avatar-img").forEach(img => {
        if (img.complete && img.naturalWidth === 0) {
            img.style.display = "none";
            if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
        }
    });

});
