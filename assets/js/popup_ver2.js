// modarPopup
$(function () {
	$(".modarPopup.show").each(function () {
		modarOpen($(this));
	});
});

var modarOpener = null;
$(document).on("click", ".jsModarClose , .btnCloseModar, .CloseModar", function(e) {
    var target = $(this).closest(".modarPopup").attr("id");
    modarClose("#" + target, modarOpener);
});

function modarOpen(_target) {
    let modarBody = $(_target).find(".modarBody");
    let firstPopupBoxIs = $(modarBody).next().is(".firstPopupBox");

    if (firstPopupBoxIs) {
        $(_target).addClass("firstPopupBoxOpen");
        $(".modarBody").addClass("on");
        $(".modarBody").removeClass("heightauto");
        $(".firstPopupBox").fadeIn("fast");
        setTimeout(function() { 
            $(_target).fadeIn("fast").addClass("show");
            $(_target).attr("tabindex", "0").focus();
            bodyScroll(true, $("body").width());
        }, 100);
        setTimeout(function() { 
            $(".modarBody").addClass("heightauto");
        }, 3000);
        setTimeout(function() { 
            $(_target).removeClass("firstPopupBoxOpen");
        }, 3100);
        setTimeout(function() { 
            $(".modarBody").removeClass("on");
        }, 3100);
    } else {
        $(".modarBody").addClass("heightauto");
        $(_target).fadeIn("fast").addClass("show");
        $(_target).attr("tabindex", "0").focus();
        $(_target).find(".scrollBox, .itemList ul").scrollTop(0);
        bodyScroll(true, $("body").width());
    }
}

function modarClose(_target, _opener) {
    bodyScroll(false);
    var tg = null;

    if (_opener) {
        tg = $(_target);
        modarOpener = $(_opener);
    } else {
        //tg = $(".modarPopup.show");
        tg = $(_target);
        modarOpener = null;
    }

    $(tg).fadeOut("fast").removeClass("show");
    if (modarOpener !== null) {
        modarOpener.focus();
        modarOpener = null;
    }
}

function bodyScroll(_status, _orgWidth) {
    var $fixedObj = $("body");
    if (_status) {
        $("body").addClass("modarOpened");
        if ($("html").get(0).scrollWidth > $("html").width() === false) {
            $fixedObj.css("margin-right", $("body").width() - _orgWidth);
        }
    } else {
        $fixedObj.css("margin-right", "");
        $("body").removeClass("modarOpened");
    }
}
$(function () {

    // 팝업내 아이템 슬라이드
    let prizeSliderCheck = $(".prizeSlider");
    if (prizeSliderCheck.length) {
        $(".prizeSlider").slick({
            slidesToShow : 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 800,
            infinite: true,
            swipeToSlide: true,
            draggable: true,
            arrows: true,
            dots: true,
            pauseOnHover: false,
            responsive:[
                {
                    breakpoint: 767,
                    settings:{
                        arrows: false,
                    }
                }
            ]
        });
    }
});