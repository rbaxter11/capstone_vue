$(function () {
    /* 
     Custom js file for assan
     */
//preloader
    $(window).preloader({
        delay: 500
    });
    $(".nav-sticky-top").sticky({topSpacing: 0});
//shrink header
    $(document).on("scroll", function () {
        if
                ($(document).scrollTop() > 150) {
            $(".nav-sticky").addClass("nav-stick-top");
        } else
        {
            $(".nav-sticky").removeClass("nav-stick-top");
        }
    });
    /****************
     search inline
     */
    $('.search-open').on('click', function () {
        {
            $('.search-inline').addClass('search-visible');
        }
    });
    $('.search-close').on('click', function () {
        $('.search-inline').removeClass('search-visible');
    });
//back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    /*****maginific popup **/
    $('.popup-container').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    });
    /**popup carousel**/
    $('.lightbox-carousel').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    });
    /**youtube video popup**/
    $('.modal-video').magnificPopup({
        type: 'iframe'
    });
    /**form popup popup**/
    $('.popup-content').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-with-zoom',
        preloader: true
    });
    /**on load modal**/
    setTimeout(function () {
        if ($('#onloadModal').length) {
            $.magnificPopup.open({
                items: {
                    src: '#onloadModal'
                },
                type: 'inline'
            });
        }
    }, 1000);
    /**sticky sidebar**/
    jQuery('.sticky-content, .sticky-sidebar').theiaStickySidebar({
// Settings
        additionalMarginTop: 30
    });
    /**Carousel images**/
    $('.carousel-image').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    /**Carousel popup**/
    $('.carousel-popup').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    /**Carousel project**/
    $('.carousel-project').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
    /**Carousel project**/
    $('.carousel-project2').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
    /**Carousel project**/
    $('.carousel-product').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    /**Carousel feature**/
    $('.carousel-feature').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    /**Carousel Clients**/
    $('.carousel-client').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    /**Carousel Clients**/
    $('.carousel-testimonial').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        autoHeight: true,
        dots: false,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('.carousel-category').owlCarousel({
        loop: true,
        margin: 2,
        nav: true,
        autoHeight: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    $('.carousel-testimonial-dark').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        autoHeight: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('.carousel-testimonial-grid').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        autoHeight: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    });
    $('.owl-main-slide').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        autoHeight: true,
        navText: [
            "<i class='ti-angle-left'></i>",
            "<i class='ti-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }
    );
    wow.init();

//counter
    $('.counter').waypoint(function () {
        $('.counter').countTo();
    }, {offset: '100%'});
//countdown
    var time = $('.count-down');
    if (time.length) {
        var endDate = new Date(time.data("end-date"));
        time.countdown({
            date: endDate,
            render: function (data) {
                $(this.el).html('<div class="cd-row"><div><h1>' + this.leadingZeros(data.days, 3)
                        + '</h1><p>days</p></div><div><h1>'
                        + this.leadingZeros(data.hours, 2)
                        + '</h1><p>hrs</p></div></div><div class="cd-row"><div><h1>'
                        + this.leadingZeros(data.min, 2)
                        + '</h1><p>min</p></div><div><h1>'
                        + this.leadingZeros(data.sec, 2)
                        + '</h1><p>sec</p></div></div>');
            }
        });
    }

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //popover
    $('[data-toggle="popover"]').popover();
//knob circle progress bar
    $(".progress-circle").knob();
//text illate
    $('.tlt').textillate({
        loop: true
    });
    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 1000, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });

    //particle
    $('#particles').particleground({
        dotColor: '#7aabe7',
        lineColor: '#7aabe7'
    });

    //blog masonry
    var $container = $('#blog-masonry');
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.post-masonry'
        });
    });

    $(".typed").typed({
        strings: ["Beautifully", "Easily", "Fast"],
        typeSpeed: 50,
        backSpeed: 10,
        backDelay: 2000,
        showCursor: false,
        loop: true
    });
});
