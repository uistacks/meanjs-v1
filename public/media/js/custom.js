
function bindEvents()
{
	/***********admin panel user option button js***************/
$('.user-profile').click(function(){
  $(this).parent().toggleClass('open');
});

    fullSize();
    applyOrientation();
    $('#banner-slide').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        dots: false,
        autoplay: true,
        items: 1,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    })
    $('#service-slide').owlCarousel({
        loop: true,
        margin: 1,
        nav: true,
        autoplay: true,
        dots: false,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 3
            },
            1000: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    })
/******************testimonial slider - 14.11.2017*******************/
	$('#testimonials_slider').owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		autoplay:true,
		dots:false,
		navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			800:{
				items:2
			},
			1000:{
				items:2
			},
			1200:{
				items:2
			}
		}
	})
/**************************choose date block for checkout page************************/
	$('#choose_date_blk').owlCarousel({
		loop:true,
		margin:2,
		nav:true,
		autoplay:false,
		dots:false,
		navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
		responsive:{
			0:{
				items:4
			},
			600:{
				items:6
			},
			800:{
				items:7
			},
			1000:{
				items:10
			},
			1200:{
				items:10
			}
		}
	})	
/********************end 14.11.2017 testimonials slider**************/
	/*-------------toggle navigation menu bar----------------------*/
	$('.dash-navigations-left > ul > li').click(function(){
		if($('.sub-menu').click(function(){ return false;}))
	  if($('.dash-navigations-left > ul > li').hasClass('open_drop')){
		$(this).removeClass('open_drop');
	  }
	  else{
		$('.dash-navigations-left > ul > li').removeClass('open_drop');
		$(this).addClass('open_drop');   
	  }
	});

    $('.search-header').click(function () {

        $('body').toggleClass('search-drop')
        $(this).toggleClass('search-close')
    });

    $('.nav-open-btn').click(function () {
        $('body').toggleClass('log-dash-open')
        $(this).toggleClass('cross-icon')
    });

    $('.msg-click').click(function () {
        $('body').toggleClass('msg-click-open')
    });

    $('.msg-right-pannel .media').click(function () {
        $('body').addClass('sub-detail-open');
    });
    $('.msg-closer').click(function () {
        $('body').removeClass('sub-detail-open');
    });

    $('.footer-navs li a').hover(function () {
        $('body').toggleClass('nav-effect')
        $(this).toggleClass('nav-effect-color')
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');
    });

    function moved() {
        alert('in');
        var owl = $(".owl-carousel").data('owlCarousel');
        if (owl.currentItem + 1 === owl.itemsAmount) {
            alert('THE END');
        }
    }

    $(document).ready(function () {
        if ($('html').hasClass('desktop')) {
            new WOW().init();
        }
    });

    $.scrollIt({
        upKey: 40, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'ease-in-out', // the easing function for animation
        scrollTime: 1500, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: 0           // offste (in px) for fixed top navigation
    });
    
    
    /***********harshad js - Open book panel************/
$('.menu_lsiting li a.book_service').click(function(){
  $('body').toggleClass('open_book_panel');
  
});
$('.book_pane_close').click(function(){
  $('body').removeClass('open_book_panel');
});
/***************calender for date & time js****************/
	$('#h-calender').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	})
	$('#h-calender-inner').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
		
	})
	
	$('#sel_time').owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		dots:false,
		navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:3
			}
		}
		
	})

/************end caleder slider************/

/****************proceed button js here*****************/
/*$('.proceed_btn').click(function(){
  $('.book_order_form').css('display' , 'none');
  $('.select_time').css('display' , 'block');
});*/
$('.proceed_btn').click(function(){
  $('body').toggleClass('open_inner_calender');
});
// function ens here
}
$(window).load(function () {
    if (window.innerWidth > 1024) {
        var s = skrollr.init();
    }
});

$(window).resize(function () {
    fullSize();
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function fullSize() {
    var heights = window.innerHeight;
    jQuery(".fullHt").css('min-height', (heights + 0) + "px");
}

function applyOrientation() {
    if (window.innerHeight > window.innerWidth) {
        $("body").addClass("potrait");
        $("body").removeClass("landscape");
    } else {
        $("body").addClass("landscape");
        $("body").removeClass("potrait");
    }
}

var banner_Ht = window.innerHeight - $('header').innerHeight();
$(window).scroll(function () {
    var sticky = $('body'),
            scroll = $(window).scrollTop();

    if (scroll >= 200)
        sticky.addClass('sticky-header');
    else
        sticky.removeClass('sticky-header');
});

$(document).ready(function () {
    $('body').append('<div id="toTop" class="btn"><span class="fa fa-angle-up"></span></div>');
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function () {
        $("html, body").animate({scrollTop: 0}, 1500);
        return false;
    });
});

$(function () {
    $('a[title]').tooltip();
});

/*jQuery(".footer-natis ul li a").hover(function(){
 var colorClass = jQuery(this).attr("color-class");
 jQuery("footer").attr("class","");
 jQuery("footer").attr("class","color-opacity "+colorClass+"");
 });*/

/*----------------------------------------------------*/
/*    Accordians FAQ
 /*----------------------------------------------------*/
$('.accordion').on('shown.bs.collapse', function (e) {
    $(e.target).parent().addClass('active_acc');
    $(e.target).prev().find('.switch').removeClass('fa-plus');
    $(e.target).prev().find('.switch').addClass('fa-minus');
});
$('.accordion').on('hidden.bs.collapse', function (e) {
    $(e.target).parent().removeClass('active_acc');
    $(e.target).prev().find('.switch').addClass('fa-plus');
    $(e.target).prev().find('.switch').removeClass('fa-minus');
});


wrapper = $(".tabs");
tabs = wrapper.find(".tab");
tabToggle = wrapper.find(".tab-toggle");

// ----------------- Functions

function openTab() {
    var content = $(this).parent().next(".content"),
            activeItems = wrapper.find(".active");

    if (!$(this).hasClass('active')) {
        $(this).add(content).add(activeItems).toggleClass('active');
        wrapper.css('min-height', content.outerHeight());
    }
}
;

// ----------------- Interactions

tabToggle.on('click', openTab);

// ----------------- Constructor functions

$(window).load(function () {
    tabToggle.first().trigger('click');
    setTimeout(function () {
        bindEvents();
    }, '500');
});


