$(document).ready(function(){
    $(window).scroll(function(){
        if(window.scrollY > 10){
            $('.navbar').addClass("sticky");
        }
        else{
            $('.navbar').removeClass("sticky");  
        }
        if(window.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }
        else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    /* slide-up script */
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
    });

    /* toggle menu/navbar script */
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    /* typing animation script */

    var typed = new Typed(".typing", {
        strings: ["Web Developer", "Codder", "Problem Solver", "Freelancer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Web Developer", "Codder", "Problem Solver", "Freelancer", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    
    /* OWL Carousel script */
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});