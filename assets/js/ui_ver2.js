$(document).ready(function(){

    setTimeout(function(){
        textEffect();
    }, 800);

    // leftmenu
    $("#btnMenuOpen").click(function(){     
        $("#btnMenuOpen").addClass("open");
        $("#leftmenu").fadeIn("400").addClass("active");
        $("body").addClass("menuOpened");
        return false;
    });
    $("#btnMenuclose").click(function(){  
        $("#btnMenuOpen").removeClass("open");
        $("#leftmenu").removeClass("active");
        $("body").removeClass("menuOpened");
        return false;
    });

    let floatingCheck = $(".floating");
    if (floatingCheck.length) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $(".floating").fadeIn("slow");
            }else {
                $(".floating").fadeOut("slow");
            }
        });
    }

    function textEffect(){
        $(".textEffect").each(function(){
            let $this = $(this);
            let start_pos = "top bottom";
            let end_pos = "bottom top";

            ScrollTrigger.create({
                trigger: $this,
                start: start_pos,
                end: end_pos,
                onEnter: function(){
                    $this.addClass("active");
                },onLeave: function(){
                    $this.removeClass("active");
                },onEnterBack: function(){
                    $this.addClass("active");
                },onLeaveBack: function(){
                    $this.removeClass("active");
                }
            });
        });
    }

    gsap.registerPlugin(ScrambleTextPlugin);
    var $textElement = $(".scrambleText"),
        $textEpisode = $("#textEpisode");
        $startdate = $("#startdate");
        $enddate = $("#enddate");

    let textTimeL01 = gsap.timeline({ 
        defaults: {duration: 2, ease: "power1.inOut", yoyo: false,}
    });
    let textTimeL02 = gsap.timeline({ 
        defaults: {duration: 2, ease: "power1.inOut", yoyo: false,}
    });
    let textTimeL03 = gsap.timeline({ 
        defaults: {duration: 2, ease: "power1.inOut", yoyo: false,}
    });

    textTimeL01.to($textEpisode, {scrambleText:{text:"EPISODE_07", chars:"EPISODE_07"}});
    textTimeL02.to($startdate, {scrambleText:{text:"2023.06.28", chars:"2023.06.28"}});
    textTimeL03.to($enddate, {scrambleText:{text:"2023.07.31", chars:"2023.07.31"}});

    ScrollTrigger.create({
        trigger: $textElement,
        start: "top bottom",
        onEnter: function(){
            textTimeL01.play();
            textTimeL02.play();
            textTimeL03.play();
        },onLeave: function(){
            textTimeL01.pause();
            textTimeL02.pause();
            textTimeL03.pause();
        },onEnterBack: function(){
            textTimeL01.play();
            textTimeL02.play();
            textTimeL03.play();
        },onLeaveBack: function(){
            textTimeL01.pause();
            textTimeL02.pause();
            textTimeL03.pause();
        }
    });

    // text scroll
    document.querySelectorAll(".scrollLeft").forEach(function(item){
        let $scrollLeftItem = item;

        gsap.to($scrollLeftItem, {
            scrollTrigger: {
                trigger: $scrollLeftItem,
                end: "bottom top",
                scrub: 0.6
            },
            xPercent: -30,
            duration: 5,
            ease: "linear"
        });
    });
    document.querySelectorAll(".scrolltop").forEach(function(item){
        let $scrolltopItem = item;

        gsap.to($scrolltopItem, {
            scrollTrigger: {
                trigger: $scrolltopItem,
                end: "bottom top",
                scrub: 0.6
            },
            yPercent: -50,
            duration: 5,
            ease: "linear"
        });
    });

    // 에볼루션 카드 슬라이드
    let cardSlideSectionCheck = $(".cardSlideSection");
    if (cardSlideSectionCheck.length) {
        $(".cardSlider").slick({
            slidesToShow : 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            speed: 800,
            centerMode: true,
            variableWidth: true,
            infinite: true,
            draggable: true,
            arrows: false,
            dots: false,
            pauseOnHover: false
        }).on("beforeChange", function(event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $(".slick-center + .slick-cloned").each(function(index, node) {
                    var $node = $(node);
                    
                    setTimeout(function() {
                        $node.addClass("slick-current");
                        $node.addClass("slick-center");
                    });
                });
            }
        });
    }

    // updateSection bg changes
    function bgChange() {
        $(".updateThumbSlide").each(function () {
            let current = $(this).find(".slick-current"),
                img = current.find("img"),
                video = current.find("video"),
                imgSrc = img.attr("src"),
                videoSrc = video.attr("src");

            $(".BgSlideImg").children("p").empty();

            if($(current).find(".Thumb").children().is("img")){
                // 슬라이드가 이미지일때
                $(".BgSlideImg").children("p").append("<img src='"+ imgSrc +"' alt=''>");
            } else if($(current).find(".Thumb").children().is("video")){
                // 슬라이드가 영상일때
                $(".BgSlideImg").children("p").append("<video preload='true' muted='' loop='' playsinline='' autoplay src='"+ videoSrc +"'></video>");
                video[0].load();
                video[0].play();
            }
        });
    }

    // updateSection slide
    let updateSectionCheck = $(".updateSection");
    if (updateSectionCheck.length) {
        $(".updateThumbSlide").on("init", function (event, slick) {
            bgChange();
            //$(".updateArrow .prev").addClass("slick-disabled");
        });
        $(".updateThumbSlide").slick({
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            speed: 700,
            dots: false,
            infinite: true,
            pauseOnHover: false,
            draggable: true,
            arrows: true,
            prevArrow: $(".updateArrow .prev"),
            nextArrow: $(".updateArrow .next"),
            asNavFor: ".updateTextSlide",
        }).on("afterChange", function (event, slick, currentSlide) {
            bgChange();
            /* if (currentSlide === 0) {
                $(".updateArrow .prev").addClass("slick-disabled");
                $(".updateArrow .next").removeClass("slick-disabled");
            } else {
                $(".updateArrow .prev").removeClass("slick-disabled");
            }
            if (slick.slideCount === currentSlide + 1) {
                $(".updateArrow .next").addClass("slick-disabled");
            } else {
                $(".updateArrow .next").removeClass("slick-disabled");
            } */
        });
        $(".updateTextSlide").slick({
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            asNavFor: ".updateThumbSlide",
            adaptiveHeight: true,
            dots: false,
            infinite: true,
            pauseOnHover: false,
            arrows: false
        });
    }

    // 진입시 .start 추가
    var isVisible = false;

    $(window).on("scroll",function() {
        if (updateSectionCheck.length) {
            if (checkVisible($(".updateThumbSlide"))&&!isVisible){
                $(".updateSection").addClass("start");
                $(".updateThumbSlide, .updateTextSlide").slick("slickPlay");
                isVisible = true;
                return true;
            }
        }
    });
    function checkVisible( elm, eval ) {
        eval = eval || "object visible";
        var viewportHeight = $(window).height(),
            wscrolltop = $(window).scrollTop(),
            y = $(elm).offset().top,
            elementHeight = $(elm).height();   
        
        if (eval == "object visible") return ((y < (viewportHeight + wscrolltop)) && (y > (wscrolltop - elementHeight)));
        if (eval == "above") return ((y < (viewportHeight + wscrolltop)));
    }

    var isVisible2 = false;

    $(window).on("scroll",function() {
        if (cardSlideSectionCheck.length) {
            if (checkVisible2($(".cardOpenWrap"))&&!isVisible2){
                setTimeout(function(){
                    $(".cardGetSection").addClass("start");
                }, 500);
                isVisible2 = true;
                return true;
            }
        }
    });
    function checkVisible2( elm_, eval_ ) {
        eval_ = eval_ || "object visible";
        var viewportHeight_ = $(window).height(),
            wscrolltop_ = $(window).scrollTop(),
            y_ = $(elm_).offset().top,
            elementHeight_ = $(elm_).height();   
        
        if (eval_ == "object visible") return ((y_ < (viewportHeight_ + wscrolltop_)) && (y_ > (wscrolltop_ - elementHeight_)));
        if (eval_ == "above") return ((y_ < (viewportHeight_ + wscrolltop_)));
    }
});
function urlCopy() {
    // url 복사
    const inputUrl = document.getElementById("inputUrl");
    //inputUrl.select();
    //document.execCommand("copy");
    window.navigator.clipboard.writeText(inputUrl.value);

    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

// ios 사파리 height
const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
};
window.addEventListener('resize', setVh);
setVh();