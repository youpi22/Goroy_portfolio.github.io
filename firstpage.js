

/* Please ❤ this if you like it! */


(function($) { "use strict";
		
	//Page cursors

    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px", 
		t.style.top = n.clientY + "px", 
		e.style.left = n.clientX + "px", 
		e.style.top = n.clientY + "px", 
		i.style.left = n.clientX + "px", 
		i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }

	
	//About page
	
	$(".about-text").on('click', function () {
		$("body").addClass("about-on");
	});
	$(".about-close").on('click', function () {
		$("body").removeClass("about-on");
	});

	
	//Contact page
	
	$(".contact-text").on('click', function () {
		$("body").addClass("contact-on");
	});
	$(".contact-close").on('click', function () {
		$("body").removeClass("contact-on");
	});

	
	//Travel portfolio page
	
	$(".travel").on('click', function () {
		$("body").addClass("travel-on");
	});
	$(".travel-close").on('click', function () {
		$("body").removeClass("travel-on");
	});

	
	//Wildlife portfolio page
	
	$(".wildlife").on('click', function () {
		$("body").addClass("wildlife-on");
	});
	$(".wildlife-close").on('click', function () {
		$("body").removeClass("wildlife-on");
	});

	
	//Nature portfolio page
	
	$(".nature").on('click', function () {
		$("body").addClass("nature-on");
	});
	$(".nature-close").on('click', function () {
		$("body").removeClass("nature-on");
	});

	
})(jQuery); 
$(document).ready(function() {
	// --- VARIABLES ---
	var swiperSide = new Swiper('.product-photos-side .swiper-container', {
	  direction: 'horizontal',
	  centeredSlides: true,
	  spaceBetween: 30,
	  slidesPerView: 'auto',
	  touchRatio: 0.2,
	  slideToClickedSlide: true,
	})
	var swiperProduct = new Swiper('.product-photo-main .swiper-container', {
	  direction: 'horizontal',
	  pagination: '.swiper-pagination',
	  paginationClickable: true,
	  // keyboardControl: true,
	})
	var galleryTop = new Swiper('.product-gallery-full-screen .gallery-top', {
	  nextButton: '.swiper-button-next',
	  prevButton: '.swiper-button-prev',
	  pagination: '.swiper-pagination',
	  paginationType: 'fraction',
	  spaceBetween: 10,
	  keyboardControl: true,
	  noSwiping: true,
	  zoom: true,
	})
	swiperSide.params.control = swiperProduct || galleryTop;
	swiperProduct.params.control = swiperSide || galleryTop;
	galleryTop.params.control = swiperProduct || swiperSide;
  
	var galleryOpen = false,
		fullscreen = false,
		fsTrigger = $('.gallery-nav .fullscreen')[0],
		fsGallery = $('.product-gallery-full-screen')[0],
		fsFunction = fsGallery.requestFullscreen;
	// browser support check
	if (!fsFunction) {
	  ['webkitRequestFullScreen',
		'mozRequestFullscreen',
		'msRequestFullScreen'
	  ].forEach(function(req) {
		fsFunction = fsFunction || fsGallery[req];
	  });
	}
  
	// --- FUNCTIONS ---
	function openImageGallery(slide) {
	  galleryOpen = true;
	  var galleryX = $('.product-photo-main').offset().left,
		galleryY = $('.product-photo-main').offset().top,
		galleryHeight = $('.product-photo-main').height(),
		galleryWidth = $('.product-photo-main').width(),
		activeIndex = slide.index(),
		indexes = $('.product-photo-main').find('.swiper-slide').length;
	  $('body').css('overflow', 'hidden');
	  $('.main, .product-gallery-full-screen').css('overflow-y', 'scroll');
	  $('.product-gallery-full-screen').addClass('opened');
	  galleryTop.activeIndex = activeIndex;
	  galleryTop.onResize();
	}
  
	function goFs() {
	  fullscreen = true;
	  $('.product-gallery-full-screen').css('overflow-y', 'auto');
	  $('.fullscreen').addClass('leavefs');
	  fsFunction.call(fsGallery);
	}
  
	function leaveFs() {
	  fullscreen = false;
	  $('.product-gallery-full-screen').css('overflow-y', 'scroll');
	  $('.fullscreen').removeClass('leavefs');
	  if (document.exitFullscreen) {
		document.exitFullscreen();
	  } else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	  } else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	  }
	}
  
	function closeImageGallery() {
	  // if(zoomed) {
	  //   zoom($('.product-gallery-full-screen .swiper-slide-active img'));
	  // }
	  $('body').css('overflow', 'auto');
	  $('.main, .product-gallery-full-screen').css('overflow-y', 'auto');
	  galleryOpen = false;
	  leaveFs();
	  $('.product-gallery-full-screen').removeClass('opened');
	}
  
	// --- EVENTS ---
	// open the large image gallery
	$('.product-photo-main .swiper-slide').on('click touch', function() {
	  var slide = $(this);
	  openImageGallery(slide);
	});
	// close the large image gallery
	$('.gallery-nav .close').on('click touch', function() {
	  closeImageGallery();
	});
	// zoom in / out
	$('.zoom').on('click touch', function() {
	  // zoom
	});
	// fullscreen toggle
	$(fsTrigger).on('click touch', function() {
	  if (fullscreen) {
		leaveFs();
	  } else {
		goFs();
	  }
	});
  
	// keyboard controls
	$(document).on('keydown', function(e) {
	  e.preventDefault();
	  var code = e.keyCode || e.which;
	  // open the large image gallery
	  if (code == 13 && !galleryOpen) {
		var slide = $('.product-photo-main .swiper-slide.swiper-slide-active');
		openImageGallery(slide);
	  }
	  // close the large image gallery
	  if (code == 27 && galleryOpen) {
		closeImageGallery();
	  }
	  if (code == 122) {
		if(galleryOpen) {
		  if (fullscreen) {
			leaveFs();
		  } else {
			goFs();
		  }
		}
	  }
	});
  
	$(window).on('resize', function() {
	  galleryTop.onResize();
	  swiperSide.onResize();
	  swiperProduct.onResize();
	});
  });