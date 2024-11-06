/* -------------------------------------------

Name: 		 Pixy
Version:     1.0
Developer:   Nazar Miller (millerDigitalDesign)
Portfolio:   https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: miller.themes@gmail.com
   
------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* -------------------------------------------

    swup

    ------------------------------------------- */

    const swup = new Swup({
        containers: ['#swup', '#swupMenu', '#swup-opm'],
        animateHistoryBrowsing: true,
    });

    /* -------------------------------------------

    register gsap plugins

    ------------------------------------------- */
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
    /* -------------------------------------------

    ScrollSmoother

    ------------------------------------------- */
    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });

    /* -------------------------------------------

    preloader

    ------------------------------------------- */

    var timeline = gsap.timeline();

    timeline
        .to(".mil-preloader-animation", {
            opacity: 1,
            ease: 'sine'
        })
        .fromTo(".mil-animation-1 p", {
            y: "30px",
            opacity: 0,
            scale: .8,
            ease: 'sine'
        }, {
            y: "0px",
            opacity: 1,
            scale: 1,
            stagger: 0.3,
            webkitFilter: "blur(0px)"
        })
        .to(".mil-animation-1 p", {
            opacity: 0,
            y: '-30'
        }, "+=0.3")
        .fromTo(".mil-reveal-box", 0.1, {
            x: 0
        }, {
            x: '-30'
        })
        .to(".mil-reveal-box", 0.45, {
            width: "100%",
            x: 0
        }, "+=0.1")
        .to(".mil-reveal-box", {
            right: "0"
        })
        .to(".mil-reveal-box", 0.3, {
            width: "0%"
        })
        .fromTo(".mil-animation-2 p", {
            opacity: 0
        }, {
            opacity: 1
        }, "-=0.5")
        .to(".mil-animation-2 p", 0.6, {
            opacity: 0,
            y: '-30'
        }, "+=0.5")
        .to(".mil-preloader", 0.8, {
            opacity: 0,
            ease: 'sine'
        }, "+=0.2")
        .add(() => {
            ScrollTrigger.refresh();
        }, "-=1")
        .add(() => {
            document.querySelector('.mil-preloader').classList.add('mil-hidden');
        });

    /* -------------------------------------------

    cursor

    ------------------------------------------- */

    var follower = document.querySelector(".mil-cursor-follower");
    var posX = 0,
        posY = 0;
    var mouseX = 0,
        mouseY = 0;

    gsap.ticker.add(function () {
        posX += (mouseX - posX) / 29;
        posY += (mouseY - posY) / 29;
        gsap.set(follower, {
            css: {
                left: posX,
                top: posY
            }
        });
    });

    function addHoverEffect(selector, className) {
        document.querySelectorAll(selector).forEach(function (link) {
            link.addEventListener("mouseenter", function () {
                follower.classList.add(className);
            });
            link.addEventListener("mouseleave", function () {
                follower.classList.remove(className);
            });
        });
    }

    addHoverEffect(".mil-c-light", "mil-light-active");
    addHoverEffect(".mil-c-dark", "mil-dark-active");
    addHoverEffect(".mil-c-gone", "mil-gone-active");
    addHoverEffect(".mil-c-view", "mil-view-active");
    addHoverEffect(".mil-c-next", "mil-next-active");
    addHoverEffect(".mil-c-read", "mil-read-active");
    addHoverEffect(".mil-c-swipe", "mil-swipe-active");

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* -------------------------------------------

    cursor parallax

    ------------------------------------------- */
    var scene1 = document.getElementById('scene');
    if (scene1) {
        var parallaxInstance1 = new Parallax(scene1, {
            limitY: 10,
        });
    }

    var scene2 = document.getElementById('scene-2');
    if (scene2) {
        var parallaxInstance2 = new Parallax(scene2, {
            limitY: 10,
        });
    }
    /* -------------------------------------------

    menu

    ------------------------------------------- */
    document.addEventListener('click', function (event) {
        const menuBtn = event.target.closest('.mil-menu-btn');
        const menuFrame = document.querySelector('.mil-menu-frame');
        const btnFrame = document.querySelector('.mil-buttons-tp-frame');
        const tp2 = document.querySelector('.mil-top-panel-2');

        if (menuBtn) {
            menuBtn.classList.toggle('mil-active');
            menuFrame.classList.toggle('mil-active');
            btnFrame.classList.toggle('mil-active');
            tp2.classList.toggle('mil-menu-open');
        } else if (event.target.closest('.mil-menu-frame') && !event.target.closest('.mil-menu-frame > *')) {
            menuFrame.classList.remove('mil-active');
            btnFrame.classList.remove('mil-active');
            document.querySelector('.mil-menu-btn').classList.remove('mil-active');
            tp2.classList.remove('mil-menu-open');
        }
    });

    document.querySelectorAll('.mil-main-menu li a').forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');

            if (isValidHref(href)) {
                document.querySelector('.mil-menu-btn').classList.remove('mil-active');
                document.querySelector('.mil-menu-frame').classList.remove('mil-active');
                document.querySelector('.mil-buttons-tp-frame').classList.remove('mil-active');
                document.querySelector('.mil-top-panel-2').classList.remove('mil-menu-open');
            } else {
                event.preventDefault();
            }
        });
    });

    function isValidHref(href) {
        return href && href.trim() !== '' && href.length > 1 && !/^#(\.|$)/.test(href);
    }

    document.querySelectorAll('.mil-has-children > a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault(); // Додаємо, щоб уникнути переходу за посиланням

            const parentElement = link.parentElement;
            const isActive = parentElement.classList.contains('mil-active');

            document.querySelectorAll('.mil-has-children').forEach(el => {
                const ul = el.querySelector('ul');
                el.classList.remove('mil-active');
                if (ul) ul.style.maxHeight = '0';
            });

            if (!isActive) {
                parentElement.classList.add('mil-active');
                const ul = parentElement.querySelector('ul');
                if (ul) ul.style.maxHeight = `${ul.scrollHeight}px`;
            }
        });
    });

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const topPanel = document.querySelector('.mil-top-panel-2');
        const menuFrame = document.querySelector('.mil-menu-frame-2');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (menuFrame.classList.contains('mil-active')) {
            return; // Stop execution if .mil-active class is present
        }

        if (scrollTop > lastScrollTop) {
            topPanel.classList.add('mil-scroll');
        } else if (scrollTop < lastScrollTop && scrollTop === 0) {
            topPanel.classList.remove('mil-scroll');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });


    /* -------------------------------------------

    onepage navigation

    ------------------------------------------- */
    document.querySelectorAll('.mil-onepage-nav > li > a, .mil-scroll-to').forEach(link => {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
    
            // Check if targetId starts with '#' before preventing default action
            if (targetId.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
    
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const currentPosition = window.pageYOffset;
                const distance = Math.abs(targetPosition - currentPosition);
                const baseDuration = 0.1; // Base duration in seconds
                const duration = baseDuration + (distance / 4000); // Adjust this factor as needed
    
                const offsetY = window.innerWidth < 992 ? 120 : 160;
                gsap.to(window, {
                    duration: duration,
                    ease: 'sine',
                    scrollTo: {
                        y: targetElement,
                        offsetY: offsetY
                    }
                });
            } 
            // Otherwise, the default action of following the link will occur
        });
    });
    

    /* -------------------------------------------

    scrollbar

    ------------------------------------------- */
    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });

    /* -------------------------------------------

    ruber letters

    ------------------------------------------- */
    const headings = document.querySelectorAll('.mil-rubber');

    headings.forEach(heading => {
        const textNodes = [];

        heading.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split(' ').forEach((word, index, array) => {
                    const wordSpan = document.createElement('span');
                    wordSpan.classList.add('mil-word-span');
                    word.split('').forEach(letter => {
                        const letterSpan = document.createElement('span');
                        letterSpan.classList.add('mil-letter-span');
                        letterSpan.textContent = letter;
                        wordSpan.appendChild(letterSpan);
                    });
                    textNodes.push(wordSpan);
                    if (index < array.length - 1) {
                        textNodes.push(document.createTextNode(' '));
                    }
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                textNodes.push(node.cloneNode(true));
            }
        });

        heading.innerHTML = '';
        textNodes.forEach(node => heading.appendChild(node));

        const letters = heading.querySelectorAll('.mil-letter-span');
        letters.forEach(letter => {
            letter.addEventListener('mouseenter', () => {
                gsap.to(letter, {
                    scaleY: 1.1,
                    y: '-5%',
                    duration: 0.2,
                    ease: 'sine'
                });
            });

            letter.addEventListener('mouseleave', () => {
                gsap.to(letter, {
                    scaleY: 1,
                    y: '0%',
                    duration: 0.2,
                    ease: 'sine'
                });
            });
        });
    });

    /* -------------------------------------------

    counters

    ------------------------------------------- */
    const numbers = document.querySelectorAll(".mil-counter");

    if (numbers.length > 0) {
        numbers.forEach(element => {
            const zero = {
                val: 0
            };
            const num = parseFloat(element.dataset.number);
            const split = num.toString().split(".");
            const decimals = split.length > 1 ? split[1].length : 0;

            gsap.to(zero, {
                val: num,
                duration: 1.8,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                    element.textContent = zero.val.toFixed(decimals);
                }
            });
        });
    }

    /* -------------------------------------------

    scroll animation

    ------------------------------------------- */
    const appearance = document.querySelectorAll(".mil-up");
    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: 1.04,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    /* -------------------------------------------

    parallax animation

    ------------------------------------------- */

    const parallaxImages = document.querySelectorAll(".mil-parallax-img");

    parallaxImages.forEach((section) => {
        var value1 = section.getAttribute("data-value-1");
        var value2 = section.getAttribute("data-value-2");

        gsap.fromTo(section, {
            ease: 'sine',
            y: value1
        }, {
            y: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse'
            }
        });
    });

    /* -------------------------------------------

    parallax x animation

    ------------------------------------------- */

    const parallaxXImages = document.querySelectorAll(".mil-parallax-x-img");

    parallaxXImages.forEach((section) => {
        var value1 = section.getAttribute("data-value-1");
        var value2 = section.getAttribute("data-value-2");

        gsap.fromTo(section, {
            ease: 'sine',
            x: value1
        }, {
            x: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse'
            }
        });
    });


    /* -------------------------------------------

    scale animation

    ------------------------------------------- */
    const scaleImage = document.querySelectorAll(".mil-scale-img");

    scaleImage.forEach((section) => {
        var value1 = section.getAttribute("data-value-1");
        var value2 = section.getAttribute("data-value-2");

        if (window.innerWidth < 1200) {
            value1 = Math.max(.95, value1);
        }

        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,
        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    /* -------------------------------------------

    rotate animation

    ------------------------------------------- */
    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
        var value = section.getAttribute("data-value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,
        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    /* -------------------------------------------

    add class

    ------------------------------------------- */
    function addClassToElement(element) {
        if (element) {
            element.classList.add('mil-added');
        }
    }

    function removeClassFromElement(element) {
        if (element) {
            element.classList.remove('mil-added');
        }
    }

    document.querySelectorAll('.mil-add-class').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            toggleActions: 'play none none reverse',
            onEnter: () => addClassToElement(element),
            onLeaveBack: () => removeClassFromElement(element)
        });
    });

    /* -------------------------------------------

    sliders

    ------------------------------------------- */

    var swiper = new Swiper('.mil-blog-slider', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        navigation: {
            prevEl: '.mil-nl-prev',
            nextEl: '.mil-nl-next',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
        on: {
            slideChangeTransitionEnd: function () {
                ScrollTrigger.refresh();
            }
        }
    });

    var swiper = new Swiper('.mil-blog-slider-sm', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        navigation: {
            prevEl: '.mil-sb-prev',
            nextEl: '.mil-sb-next',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
        on: {
            slideChangeTransitionEnd: function () {
                ScrollTrigger.refresh();
            }
        }
    });

    var swiper = new Swiper('.mil-reviews-slider', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 120,
        slidesPerView: 1,
        initialSlide: 1,
        speed: 800,
        pagination: {
            el: ".mil-sr-pagination",
            clickable: true,
        },
        navigation: {
            prevEl: '.mil-sr-prev',
            nextEl: '.mil-sr-next',
        },
        on: {
            slideChangeTransitionEnd: function () {
                ScrollTrigger.refresh();
            }
        }
    });

    var swiper = new Swiper('.mil-project-slider', {
        parallax: true,
        autoHeight: true,
        spaceBetween: 30,
        slidesPerView: 1,
        speed: 800,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
        on: {
            slideChangeTransitionEnd: function () {
                ScrollTrigger.refresh();
            }
        }
    });

    /* ----------------------------------------------------------------------------
    -------------------------------------------------------------------------------

    reinit

    -------------------------------------------------------------------------------
    ---------------------------------------------------------------------------- */

    swup.hooks.on('page:view', () => {

        /* -------------------------------------------

        register gsap plugins

        ------------------------------------------- */
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
        /* -------------------------------------------

        ScrollSmoother

        ------------------------------------------- */
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: 0.1,
        });

        /* -------------------------------------------

        cursor

        ------------------------------------------- */

        const elements = document.querySelectorAll('.mil-cursor-follower');

        elements.forEach(element => {
            element.className = 'mil-cursor-follower';
        });

        function addHoverEffect(selector, className) {
            document.querySelectorAll(selector).forEach(function (link) {
                link.addEventListener("mouseenter", function () {
                    follower.classList.add(className);
                });
                link.addEventListener("mouseleave", function () {
                    follower.classList.remove(className);
                });
            });
        }

        addHoverEffect(".mil-c-light", "mil-light-active");
        addHoverEffect(".mil-c-dark", "mil-dark-active");
        addHoverEffect(".mil-c-gone", "mil-gone-active");
        addHoverEffect(".mil-c-view", "mil-view-active");
        addHoverEffect(".mil-c-next", "mil-next-active");
        addHoverEffect(".mil-c-read", "mil-read-active");
        addHoverEffect(".mil-c-swipe", "mil-swipe-active");

        document.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        /* -------------------------------------------

        cursor parallax

        ------------------------------------------- */
        var scene1 = document.getElementById('scene');
        if (scene1) {
            var parallaxInstance1 = new Parallax(scene1, {
                limitY: 10,
            });
        }

        var scene2 = document.getElementById('scene-2');
        if (scene2) {
            var parallaxInstance2 = new Parallax(scene2, {
                limitY: 10,
            });
        }

        /* -------------------------------------------

        menu

        ------------------------------------------- */

        document.querySelectorAll('.mil-main-menu li a').forEach(link => {
            link.addEventListener('click', function (event) {
                const href = this.getAttribute('href');

                if (isValidHref(href)) {
                    document.querySelector('.mil-menu-btn').classList.remove('mil-active');
                    document.querySelector('.mil-menu-frame').classList.remove('mil-active');
                    document.querySelector('.mil-buttons-tp-frame').classList.remove('mil-active');
                    document.querySelector('.mil-top-panel-2').classList.remove('mil-menu-open');
                } else {
                    event.preventDefault(); // Якщо href невалідний, зупиняємо дію за замовчуванням
                }
            });
        });

        function isValidHref(href) {
            return href && href.trim() !== '' && href.length > 1 && !/^#(\.|$)/.test(href);
        }

        document.querySelectorAll('.mil-has-children > a').forEach(link => {
            link.addEventListener('click', function (event) {
                event.stopPropagation();
                event.preventDefault(); // Додаємо, щоб уникнути переходу за посиланням

                const parentElement = link.parentElement;
                const isActive = parentElement.classList.contains('mil-active');

                document.querySelectorAll('.mil-has-children').forEach(el => {
                    const ul = el.querySelector('ul');
                    el.classList.remove('mil-active');
                    if (ul) ul.style.maxHeight = '0';
                });

                if (!isActive) {
                    parentElement.classList.add('mil-active');
                    const ul = parentElement.querySelector('ul');
                    if (ul) ul.style.maxHeight = `${ul.scrollHeight}px`;
                }
            });
        });
        /* -------------------------------------------

        onepage navigation

        ------------------------------------------- */
        document.querySelectorAll('.mil-onepage-nav > li > a, .mil-scroll-to').forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const currentPosition = window.pageYOffset;
                const distance = Math.abs(targetPosition - currentPosition);
                const baseDuration = 0.1; // Base duration in seconds
                const duration = baseDuration + (distance / 4000); // Adjust this factor as needed

                const offsetY = window.innerWidth < 992 ? 120 : 160;
                gsap.to(window, {
                    duration: duration,
                    ease: 'sine',
                    scrollTo: {
                        y: targetElement,
                        offsetY: offsetY
                    }
                });
            });
        });

        /* -------------------------------------------

        ruber letters

        ------------------------------------------- */
        const headings = document.querySelectorAll('.mil-rubber');

        headings.forEach(heading => {
            const textNodes = [];

            heading.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent.split(' ').forEach((word, index, array) => {
                        const wordSpan = document.createElement('span');
                        wordSpan.classList.add('mil-word-span');
                        word.split('').forEach(letter => {
                            const letterSpan = document.createElement('span');
                            letterSpan.classList.add('mil-letter-span');
                            letterSpan.textContent = letter;
                            wordSpan.appendChild(letterSpan);
                        });
                        textNodes.push(wordSpan);
                        if (index < array.length - 1) {
                            textNodes.push(document.createTextNode(' '));
                        }
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    textNodes.push(node.cloneNode(true));
                }
            });

            heading.innerHTML = '';
            textNodes.forEach(node => heading.appendChild(node));

            const letters = heading.querySelectorAll('.mil-letter-span');
            letters.forEach(letter => {
                letter.addEventListener('mouseenter', () => {
                    gsap.to(letter, {
                        scaleY: 1.1,
                        y: '-5%',
                        duration: 0.2,
                        ease: 'sine'
                    });
                });

                letter.addEventListener('mouseleave', () => {
                    gsap.to(letter, {
                        scaleY: 1,
                        y: '0%',
                        duration: 0.2,
                        ease: 'sine'
                    });
                });
            });
        });


        /* -------------------------------------------

        counters

        ------------------------------------------- */
        const numbers = document.querySelectorAll(".mil-counter");

        if (numbers.length > 0) {
            numbers.forEach(element => {
                const zero = {
                    val: 0
                };
                const num = parseFloat(element.dataset.number);
                const split = num.toString().split(".");
                const decimals = split.length > 1 ? split[1].length : 0;

                gsap.to(zero, {
                    val: num,
                    duration: 1.8,
                    scrollTrigger: {
                        trigger: element,
                        toggleActions: 'play none none reverse',
                    },
                    onUpdate: function () {
                        element.textContent = zero.val.toFixed(decimals);
                    }
                });
            });
        }

        /* -------------------------------------------

        scroll animation

        ------------------------------------------- */
        const appearance = document.querySelectorAll(".mil-up");
        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: 1.04,
                ease: 'sine',
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        /* -------------------------------------------

        parallax animation

        ------------------------------------------- */

        const parallaxImages = document.querySelectorAll(".mil-parallax-img");

        parallaxImages.forEach((section) => {
            var value1 = section.getAttribute("data-value-1");
            var value2 = section.getAttribute("data-value-2");

            gsap.fromTo(section, {
                ease: 'sine',
                y: value1
            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse'
                }
            });
        });

        /* -------------------------------------------

        parallax x animation

        ------------------------------------------- */

        const parallaxXImages = document.querySelectorAll(".mil-parallax-x-img");

        parallaxXImages.forEach((section) => {
            var value1 = section.getAttribute("data-value-1");
            var value2 = section.getAttribute("data-value-2");

            gsap.fromTo(section, {
                ease: 'sine',
                x: value1
            }, {
                x: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse'
                }
            });
        });


        /* -------------------------------------------

        scale animation

        ------------------------------------------- */
        const scaleImage = document.querySelectorAll(".mil-scale-img");

        scaleImage.forEach((section) => {
            var value1 = section.getAttribute("data-value-1");
            var value2 = section.getAttribute("data-value-2");

            if (window.innerWidth < 1200) {
                value1 = Math.max(.95, value1);
            }

            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,
            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        /* -------------------------------------------

        rotate animation

        ------------------------------------------- */
        const rotate = document.querySelectorAll(".mil-rotate");

        rotate.forEach((section) => {
            var value = section.getAttribute("data-value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,
            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        /* -------------------------------------------

        add class

        ------------------------------------------- */
        function addClassToElement(element) {
            if (element) {
                element.classList.add('mil-added');
            }
        }

        function removeClassFromElement(element) {
            if (element) {
                element.classList.remove('mil-added');
            }
        }

        document.querySelectorAll('.mil-add-class').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                toggleActions: 'play none none reverse',
                onEnter: () => addClassToElement(element),
                onLeaveBack: () => removeClassFromElement(element)
            });
        });
        /* -------------------------------------------

        sliders

        ------------------------------------------- */

        var swiper = new Swiper('.mil-blog-slider', {
            parallax: true,
            autoHeight: true,
            spaceBetween: 30,
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: '.mil-nl-prev',
                nextEl: '.mil-nl-next',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
            on: {
                slideChangeTransitionEnd: function () {
                    ScrollTrigger.refresh();
                }
            }
        });

        var swiper = new Swiper('.mil-blog-slider-sm', {
            parallax: true,
            autoHeight: true,
            spaceBetween: 30,
            slidesPerView: 1,
            speed: 800,
            navigation: {
                prevEl: '.mil-sb-prev',
                nextEl: '.mil-sb-next',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
            on: {
                slideChangeTransitionEnd: function () {
                    ScrollTrigger.refresh();
                }
            }
        });

        var swiper = new Swiper('.mil-reviews-slider', {
            parallax: true,
            autoHeight: true,
            spaceBetween: 120,
            slidesPerView: 1,
            initialSlide: 1,
            speed: 800,
            pagination: {
                el: ".mil-sr-pagination",
                clickable: true,
            },
            navigation: {
                prevEl: '.mil-sr-prev',
                nextEl: '.mil-sr-next',
            },
            on: {
                slideChangeTransitionEnd: function () {
                    ScrollTrigger.refresh();
                }
            }
        });

        var swiper = new Swiper('.mil-project-slider', {
            parallax: true,
            autoHeight: true,
            spaceBetween: 30,
            slidesPerView: 1,
            speed: 800,
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
            on: {
                slideChangeTransitionEnd: function () {
                    ScrollTrigger.refresh();
                }
            }
        });
    });

});
