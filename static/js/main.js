function toggleContactWidget(e) {
    if (e) e.preventDefault();
    var widget = document.getElementById("contact-widget");
    var fab = document.getElementById("contact-fab");
    var fabIcon = document.getElementById("fab-icon");
    if (!widget) return;

    // Le widget fermé est neutralisé par pointer-events-none
    var isOpen = !widget.classList.contains("pointer-events-none");

    if (isOpen) {
        widget.classList.add("scale-95", "opacity-0", "pointer-events-none");
        widget.classList.remove("scale-100", "opacity-100", "pointer-events-auto");
        fabIcon.className = "fas fa-envelope text-xl";
        fab.classList.remove("bg-red-500", "hover:bg-red-600");
        fab.classList.add("bg-accent", "hover:bg-accent-hover");
    } else {
        widget.classList.remove("scale-95", "opacity-0", "pointer-events-none");
        widget.classList.add("scale-100", "opacity-100", "pointer-events-auto");
        fabIcon.className = "fas fa-xmark text-xl";
        fab.classList.remove("bg-accent", "hover:bg-accent-hover");
        fab.classList.add("bg-red-500", "hover:bg-red-600");
    }
}


function toggleFAQ(button) {
    var item = button.parentElement;
    var content = item.querySelector(".faq-content");
    var isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach(function (faq) {
        faq.classList.remove("active");
        faq.querySelector(".faq-content").classList.add("hidden");
    });

    if (!isActive) {
        item.classList.add("active");
        content.classList.remove("hidden");
    }
}


document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("main-navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = "blur(10px)";
            navbar.style.backgroundColor = "rgba(27, 42, 74, 0.97)";
        } else {
            navbar.style.backdropFilter = "none";
            navbar.style.backgroundColor = "#1B2A4A";
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    const menuToggle = document.getElementById("menu-toggle");
    const menuIcon = document.getElementById("menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
            if (mobileMenu.classList.contains("hidden")) {
                menuIcon.className = "fas fa-bars text-xl";
            } else {
                menuIcon.className = "fas fa-xmark text-xl";
            }
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mobileMenu.classList.add("hidden");
                menuIcon.className = "fas fa-bars text-xl";
            });
        });
    }


    const navLinks = document.querySelectorAll(".nav-link[data-section]");
    const sections = document.querySelectorAll("section[id]");

    function setActiveNav(sectionId) {
        navLinks.forEach(function (link) {
            var linkSection = link.getAttribute("data-section");
            if (linkSection === sectionId) {
                link.classList.remove("text-gray-300");
                link.classList.add("bg-accent/20", "text-accent");
            } else {
                link.classList.remove("bg-accent/20", "text-accent");
                link.classList.add("text-gray-300");
            }
        });
    }

    if (sections.length > 0) {
        var sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setActiveNav(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "-80px 0px -50% 0px",
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

        setActiveNav("accueil");
    }


    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href").substring(1);
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.pushState(null, null, "#" + targetId);
            }
        });
    });


    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
    });


    document.querySelectorAll(".flash-alert").forEach(function (alert) {
        setTimeout(function () {
            alert.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            alert.style.opacity = "0";
            alert.style.transform = "translateY(-10px)";
            setTimeout(function () {
                alert.remove();
            }, 500);
        }, 5000);
    });

});
