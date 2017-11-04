jQuery(document).ready(
		function($) {

			// // Preloader
			// $(window).on('load', function() {
			// $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
			// });

			// // Hero rotating texts
			// $("#hero .rotating").Morphext({
			// animation: "flipInX",
			// separator: ",",
			// speed: 3000
			// });

			// // Initiate the wowjs
			// new WOW().init();

			// // Initiate superfish on nav menu
			// $('.nav-menu').superfish({
			// animation: {opacity:'show'},
			// speed: 400
			// });

			// Smooth scrolling using jQuery easing
			$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(
					function() {

						if (location.pathname.replace(/^\//, '') == this.pathname.replace(
								/^\//, '')
								&& location.hostname == this.hostname) {
							var target = $(this.hash);
							target = target.length ? target : $('[name=' + this.hash.slice(1)
									+ ']');
							if (target.length) {
								$('html, body').animate({
									scrollTop : (target.offset().top - 54)
								}, 600, "easeInOutExpo");
								return false;
							}
						}
					});

			// Closes responsive menu when a scroll trigger link is clicked
			$('.js-scroll-trigger').click(function() {

				$('.navbar-collapse').collapse('hide');
			});

			// Activate scrollspy to add active class to navbar items on scroll
			$('body').scrollspy({
				target : '#mainNav',
				offset : 54
			});

			$(window).scroll(function() {

				console.log("TOP: " + $("#mainNav").offset().top);
				if ($("#mainNav").offset().top > 50) {
					$("#mainNav").addClass("app-sticky");
				} else {
					$("#mainNav").removeClass("app-sticky");
				}

			});

			// end
		});