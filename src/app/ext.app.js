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

		// Sticky header
		var stickHeader = function() {

			var changeClasses = function() {

				// console.log("TOP: " + $("#mainNav").offset().top);
				if ($("#mainNav").offset().top > 50) {
					$("#mainNav").addClass("app-sticky");
				} else {
					$("#mainNav").removeClass("app-sticky");
					//window.location.hash='home';
					//console.log('sticky');
					changeHash('');
				}

			}
			elements.wnd.on("scroll", changeClasses)
			changeClasses();
		}
		
		var changeHash = function(anchor) {
			console.log('changing hash to ' + anchor);
			history.replaceState(null, null, window.location.pathname + anchor);
		}

		var initMisc = function() {
			
		  // Smooth scrolling using jQuery easing
		  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(event) {
		    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		      event.preventDefault();
		    	var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		      if (target.length) {
		        $('html, body').animate({
		          scrollTop: (target.offset().top - 56)
		        }, 600, "easeInOutExpo");
		        //console.log('a click');
		        changeHash(this.hash);
		        return false;
		      }
		    }
		  });
			
			
			
			
			
//			  // Add smooth scrolling on all links inside the navbar
//			  $("#mainNav a").on('click', function(event) {
//			    // Make sure this.hash has a value before overriding default behavior
//			    if (this.hash !== "") {
//			      // Prevent default anchor click behavior
//			      event.preventDefault();
//
//			      // Store hash
//			      var hash = this.hash;
//
//			      // Using jQuery's animate() method to add smooth page scroll
//			      // The optional number (800) specifies the number of milliseconds it
//						// takes to scroll to the specified area
//			      $('html, body').animate({
//			        scrollTop: ($(hash).offset().top - 56)
//			      }, 600, "easeInOutExpo", function(){
//			   
//			        // Add hash (#) to URL when done scrolling (default click
//							// behavior)
//			        window.location.hash = hash;
//			      });
//			    }  // End if
//			  });
			
			// Closes responsive menu when a scroll trigger link is clicked
			$('.js-scroll-trigger').click(function() {

				$('.navbar-collapse').collapse('hide');
			});
		}

		var initScrollSpy = function() {

			// Activate scrollspy to add active class to navbar items on scroll
			var ss = $('body').scrollspy({
				target : '#mainNav',
				offset : 56
			});
			
		  $(window).on('activate.bs.scrollspy', evt => {
		  	//TODO use observable to reduce the changes
		    var l = $("#mainNav a.active");
		    if(l) {
		    	if (l.length)
		    		l = l[0];
		    	if (l && l.hash) {
		    		//console.log('scrollspy');
		    		changeHash(l.hash); //window.location.hash = l.hash;
		    	}
		    }
		  });
		  
		}

		// A jQuery plugin to create and manage Google Maps to jQuery
		var googleMap = function() {

			// rgb to hex
			function rgb2hex(rgb) {

				var rgb = rgb || "rgb(2, 2, 2)";
				if (/^#[0-9A-F]{6}$/i.test(rgb))
					return rgb;
				rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				function hex(x) {

					return ("0" + parseInt(x).toString(16)).slice(-2);
				}
				return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
			}
			var ourAddress = $("#map").data("location") || "earth", mapColor = rgb2hex($(
					"#map").css("backgroundColor"))
					|| "#e2e4e3";
			function getLatLong(address) {

				var geo = new google.maps.Geocoder;
				geo
						.geocode(
								{
									'address' : address
								},
								function(results, status) {

									if (status == google.maps.GeocoderStatus.OK) {
										var latitude = results[0].geometry.location.k, longitude = results[0].geometry.location.B, styleMap = [
												{
													"stylers" : [ {
														"hue" : mapColor
													}, {
														"saturation" : 0
													} ]
												}, {
													"featureType" : "road",
													"elementType" : "geometry",
													"stylers" : [ {
														"lightness" : 100
													}, {
														"visibility" : "simplified"
													} ]
												}, {
													"featureType" : "road",
													"elementType" : "labels",
													"stylers" : [ {
														"visibility" : "off"
													} ]
												} ];
										// console.log(results[0].geometry.location);
										$("#map").gmap3({
											marker : {
												address : ourAddress
											},
											map : {
												options : {
													center : [ latitude, longitude ],
													zoom : 15,
													mapTypeId : google.maps.MapTypeId.ROADMAP,
													styles : styleMap
												}
											}
										})
									} else {
										alert("Geocode was not successful for the following reason: "
												+ status);
									}
								})
			}
			if ($.fn.gmap3 && $("#map").length) {
				getLatLong(ourAddress)
			}
		}

		// Isotope
		var isotopePortfolio = function() {

			$(window).load(function() {

				if ($.fn.isotope) {
					var portfolio = elements.portfolioList.isotope({
						// options
						itemSelector : '.p-item',
						layoutMode : 'fitRows'
					})
					elements.protfolioFilter.on("click", "a", function(e) {

						e.preventDefault()
						var filterValue = $(this).attr('data-filter');
						portfolio.isotope({
							filter : filterValue
						});
						return false;
					})
				}
			})
		}

		// A jQuery plugin for the navigation on one-page sites
		var navigation = function() {

			if ($.fn.onePageNav && elements.nav.length) {
				elements.nav.onePageNav({
					currentClass : "active",
					scrollOffset : 60,
					filter : ":not(.external)"
				})
			}
		}

		// Date countdown plugin for jQuery
		function countdown() {

			var count = $('#countdown');
			if ($.fn.countdown && count.length) {
				count.countdown(count.data("date"), function(event) {

					var $this = $(this);
					switch (event.type) {
					case "seconds":
					case "minutes":
					case "hours":
					case "days":
					case "weeks":
					case "daysLeft":
						$this.find('div#' + event.type).html(event.value);
						break;
					case "finished":
						$this.hide();
						break;
					}
				});
			}
		}

		// Reveal Animations When You Scroll
		function wow() {

			$(window).load(function() {

				new WOW().init({
					mobile : false
				})
			});
		}

		// A jQuery plugin that enables HTML5 placeholder behavior for browsers that
		// aren’t trying hard enough yet
		function placeholderIE() {

			if ($.fn.placeholder) {
				$("input, textarea").placeholder()
			}
		}

		// validation and sending forms
		function validateAndSend() {

			if ($.fn.validateForm) {
				$
						.validate({
							form : '#contactForm',
							validateOnBlur : false,
							addSuggestions : false,
							scrollToTopOnError : false,
							onSuccess : function() {

								var name = $("#userName").val(), email = $("#userEmail").val(), phone = $(
										"#userSubj").val(), plan = $("#userMessage").val(), allData = $(
										"#contactForm").serialize();
								$.ajax({
									type : "POST",
									url : "php/contact.php",
									data : allData,
									success : function() {

										elements.contAlert.show()
										$("#userName, #userEmail, #userSubj, #userMessage").val("")
									}
								});
								return false;
							}
						})
				var messageForError = $("#helpBlock");
				$.validate({
					form : "#subscribeForm",
					errorMessagePosition : messageForError,
					scrollToTopOnError : false,
					onSuccess : function() {

						var sEmail = $("#sEmail").val(), allData = $("#subscribeForm")
								.serialize();
						$.ajax({
							type : "POST",
							url : "php/subscribe.php",
							data : allData,
							success : function() {

								elements.contAlert.show()
								$("#sEmail").val("")
							}
						});
						return false;
					}
				})
			}
		}

		// Preloader
		function preloader() {

			$(window).load(function() {

				$(".preloader").fadeOut()
				$("body").removeClass("remove-scroll")
			});
		}

		return {
			init : function() {

				// preloader()
				stickHeader();
				initMisc();
				initScrollSpy();
				// googleMap()
				// isotopePortfolio()
				// navigation()
				wow();
				// countdown()
				// placeholderIE()
				// validateAndSend()
			}
		}
	}();

	$(function() {

		// Launch functions
		console.log("AppExt: INIT...");
		ExtApp.init();
		console.log("AppExt: DONE...");
	})
}(window.jQuery);