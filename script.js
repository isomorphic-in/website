/**
 * Isomorphic AI - Minimal Website Scripts
 */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // 2. FAQ Accordion Toggle
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

    // 3. Contact Form Submission
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

    // 4. Founder Avatar Fallback check
    document.querySelectorAll(".founder-avatar-img").forEach(img => {
        if (img.complete && img.naturalWidth === 0) {
            img.style.display = "none";
            if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
        }
    });

});
