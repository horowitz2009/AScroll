!function($) {

	"use strict";

	var ExtApp = function() {

		// Define DOM elements
		var elements = {
			wnd : $(window),
			header : $(".main-header"),
			portfolioList : $("#portfolioList"),
			protfolioFilter : $("#portfolioFilter"),
			nav : $("#nav"),
			contAlert : $("#contactUsAlert")
		};

		var spy = false;
		
		// Sticky header
		var stickHeader = function() {

			var changeClasses = function() {

				// console.log("TOP: " + $("#mainNav").offset().top);
				if ($("#mainNav").offset().top > 50) {
					$("#mainNav").addClass("app-sticky");
				} else {
					$("#mainNav").removeClass("app-sticky");
					// window.location.hash='home';
					// console.log('sticky');
					if (window.location.hash && window.location.hash !== '#home') 
					  changeHash('');
				}

			}
			elements.wnd.on("scroll", changeClasses)
			changeClasses();
		}
		
		var changeHash = function(hash) {
			console.log('changing hash to ' + hash);
			if (spy) {
			  history.replaceState(null, null, window.location.pathname + hash);
			} else {
				console.log ("SPY IS OFF");
			}
		}
		
		var scrollTo = function(hash) {
			console.log('scroll to [' + hash + "]");
			spy = false;
			var target = $('home');
			if (hash || hash !== '') {
    	  target = $(hash);
        target = target.length ? target : $('[name=' + hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 56)
          }, 800, "easeInOutExpo", ()=>{ 
        		spy = true;
          	//changeHash(hash);
          	});
          
          return false;
        }
			} else {
				window.scrollTo(0, 0);
				spy = true;
			}
      return true;
		}
		
		var initMisc = function() {
			
		  // Smooth scrolling using jQuery easing
		  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(event) {
		    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		      event.preventDefault();
		      return scrollTo(this.hash);
		    }
		  });
			
			// Closes responsive menu when a scroll trigger link is clicked
			$('.js-scroll-trigger').click(function() {

				$('.navbar-collapse').collapse('hide');
			});
		}

		var initScrollSpy = function() {

			// Activate scrollspy to add active class to navbar items on scroll
			$('body').scrollspy({
				target : '#mainNav',
				offset : 175
			});
			
		  $(window).on('activate.bs.scrollspy', evt => {
		  	// TODO use observable to reduce the changes
		    var l = $("#mainNav a.active");
		    if(l) {
		    	if (l.length)
		    		l = l[0];
		    	if (l && l.hash) {
		    		console.log('scrollspy ');
		    		changeHash(l.hash); // window.location.hash = l.hash;
		    	}
		    }
		  });
		  
		}
		
		var scrollNow = function() {
			console.log(document.location);
			console.log("I want to scroll to " + document.location.hash);
			scrollTo(document.location.hash);
		}


// // Reveal Animations When You Scroll
// function wow() {
//
// $(window).on('load', function() {
//
//
// new WOW().init({
// mobile : false
// })
// });
// }

// // A jQuery plugin that enables HTML5 placeholder behavior for browsers that
// // aren’t trying hard enough yet
// function placeholderIE() {
//
// if ($.fn.placeholder) {
// $("input, textarea").placeholder()
// }
// }

// // validation and sending forms
// function validateAndSend() {
//
// if ($.fn.validateForm) {
// $
// .validate({
// form : '#contactForm',
// validateOnBlur : false,
// addSuggestions : false,
// scrollToTopOnError : false,
// onSuccess : function() {
//
// var name = $("#userName").val(), email = $("#userEmail").val(), phone = $(
// "#userSubj").val(), plan = $("#userMessage").val(), allData = $(
// "#contactForm").serialize();
// $.ajax({
// type : "POST",
// url : "php/contact.php",
// data : allData,
// success : function() {
//
// elements.contAlert.show()
// $("#userName, #userEmail, #userSubj, #userMessage").val("")
// }
// });
// return false;
// }
// })
// var messageForError = $("#helpBlock");
// $.validate({
// form : "#subscribeForm",
// errorMessagePosition : messageForError,
// scrollToTopOnError : false,
// onSuccess : function() {
//
// var sEmail = $("#sEmail").val(), allData = $("#subscribeForm")
// .serialize();
// $.ajax({
// type : "POST",
// url : "php/subscribe.php",
// data : allData,
// success : function() {
//
// elements.contAlert.show()
// $("#sEmail").val("")
// }
// });
// return false;
// }
// })
// }
// }
//
// // Preloader
// function preloader() {
//
// $(window).on('load', function() {
//
// $(".preloader").fadeOut()
// $("body").removeClass("remove-scroll")
// });
// }
		
		
		
		var magnific = function() {
			
			// Magnific popup
			// -----------------------------------------------
			if (($(".popup-img").length > 0) || ($(".popup-iframe").length > 0) || ($(".popup-img-single").length > 0) || $(".owl-carousel--popup-img").length > 0) {
				$(".popup-img").magnificPopup({
					type:"image",
					gallery: {
						enabled: true,
					}
				});
				if ($(".owl-carousel--popup-img").length > 0) {
					$(".owl-carousel").each(function() {
						$(this).find(".owl-item:not(.cloned) .owl-carousel--popup-img").magnificPopup({
							type:"image",
							gallery: {
								enabled: true,
							}
						});
					});
				}
				$(".popup-img-single").magnificPopup({
					type:"image",
					gallery: {
						enabled: false,
					}
				});
				$('.popup-iframe').magnificPopup({
					disableOn: 700,
					type: 'iframe',
					preloader: false,
					fixedContentPos: false
				});
			};

		}		
		
		
		

		return {
		  scrollTo: function(anchor) {
		  	setTimeout(() => {
		  		scrollTo(anchor ? '#' + anchor : '');	
				}, 30);
		  },
			initScroll: function() {
				// /////////////stickHeader();
				// ///////////initMisc();
				// ///////////initScrollSpy();
				// ////////////scrollNow();
				spy = true;
			},
			initMagnific : function() {

				// preloader()
				// stickHeader();
				// initMisc();
				// initScrollSpy();
				// googleMap()
				// isotopePortfolio()
				// navigation()
				// wow();
				// /////////////////////////////////////////magnific();
				// scrollNow();
				// countdown()
				// placeholderIE()
				// validateAndSend()
			},
			scrollNow : function() {
				// scrollNow();
			}
		}
	}();

	$(function() {

		$(window).on('load', function () {
		  console.log("AppExt: INIT2...");
		  // ExtApp.init();
		});
		
		
		// Launch functions
		console.log("AppExt: INIT...");
		window.addEventListener("mycustomevent", () => {
			console.log("init magnific");
			ExtApp.initMagnific();
			setTimeout(function(){ 
				// alert("Hello");
				console.log('INIT AGAIN.............................');
				ExtApp.scrollNow();
			}, 1500);
		}, false);
		console.log("add listeners...");
		window.addEventListener("my-navigation-end", (evt) => {
			console.log("init scroll", evt);
			ExtApp.scrollTo(evt.detail);
			
		}, false);
		console.log("AppExt: DONE...");
	})
}(window.jQuery);