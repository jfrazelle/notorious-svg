// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault){
		e.preventDefault();
	}
	e.returnValue = false;  
}

function keydown(e) {
	for (var i = keys.length; i--;) {
		if (e.keyCode === keys[i]) {
			preventDefault(e);
			return;
		}
	}
}


var notorioussvg = {
	currentScroll: 0,
	scrolling: false,
	lastScroll: 0,
	windowWidth: $(window).width(),
	windowHeight: $(window).height(),
	device: false,
	currentlyScrolling: false,
	changingSlide: false,
	resize: function(){
		notorioussvg.windowHeight = $(window).height();
		notorioussvg.windowWidth = $(window).width();
		
		$('.scrolling-section article').css('margin-top', notorioussvg.windowHeight);

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			notorioussvg.device = true;
			// alert if phone
			if (/Android|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				alert('This site is best experienced on a desktop, or tablet in landscape. Haters gonna hate.');
			}
		} else {
			notorioussvg.device = false;
		}	
	},
	scrollTo: function(elHref) {
		notorioussvg.currentlyScrolling = true;

		$('html, body').animate({ scrollTop: offset}, 400, function(){
			notorioussvg.currentlyScrolling = false;
			notorioussvg.currentScroll = offset;
		});
	},
	onScroll: function(scrollY) {
		var change = scrollY - this.lastScroll;
		var difference = Math.abs(change);

		if (change > 0 && this.currentScroll > 0){
			$('header').addClass('scroll-hide');
		} else {
			$('header').removeClass('scroll-hide');
		}
		
		this.currentScroll = scrollY;
		this.lastScroll = scrollY;
	},
	init: function() {
		notorioussvg.resize();

		// Bind window events
		$(window).on("scroll", function() {
			notorioussvg.onScroll($(this).scrollTop());
		}).on("resize", function() {
			notorioussvg.resize();
		});
		
		// Initialize tap or click calls
		var oncall;
		if (notorioussvg.device){
			oncall = 'touchstart';
		} else {
			oncall = 'click';	
		}

		/* menu events */
		$('.menu-toggle').bind(oncall, function(e){
			e.preventDefault();
			if ($('nav.dropdown').hasClass('open')){
				$('nav.dropdown').removeClass('open');
			} else {
				$('nav.dropdown').addClass('open');
			}
		});
		
		/*  menu tap off event */
		$('body').bind(oncall, function(e){
			var $target = $(e.target);
			if ($target.hasClass('menu-toggle') || $target.parents().hasClass('menu-toggle') || $target.hasClass('dropdown') || $target.parents().hasClass('dropdown')){
				
			} else {
				$('nav.dropdown').removeClass('open');
			}
		});

		/* arrow next section events */
		$('.arrow').bind(oncall, function(e){
			e.preventDefault();
			if(!notorioussvg.changingSlide){
				notorioussvg.changingSlide = true;
				$currentactive = $('.content.active');
				
				if ($(this).hasClass('arrow-right')){
					if ($('.content.active').next('.content').length){
						$currentactive.next().addClass('active');
						setTimeout(function(){
							$currentactive.removeClass('active');
							notorioussvg.changingSlide = false;
						}, 500);
					} else {
						$('.content').first().addClass('active');
						setTimeout(function(){
							$currentactive.removeClass('active');
							notorioussvg.changingSlide = false;
						}, 500);
					}
				} else {
					if ($('.content.active').prev('.content').length){
						$('.content.active').prev().addClass('active');
						setTimeout(function(){
							$currentactive.removeClass('active');
							notorioussvg.changingSlide = false;
						}, 300);
					} else {
						$('.content').last().addClass('active');
						setTimeout(function(){
							$currentactive.removeClass('active');
							notorioussvg.changingSlide = false;
						}, 300);
					}
				}
			}
		});
		
		/* right and left keyboard keys */
		$(document).keyup(function(e) {
			if (e.keyCode == 37){ // left
				$('.arrow-left').trigger('click');
			} else if (e.keyCode == 39){ // right
				$('.arrow-right').trigger('click');
			}
		});
	}
};

$(function(){
	notorioussvg.init();
});

