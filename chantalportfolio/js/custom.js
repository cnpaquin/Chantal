/*global jQuery, window, Modernizr, navigator, resizeGrid, epicSlider, sudoSlider, objFlickr, objGoogleMap, objCycleSlider, objPostSlider, objTestimonials*/

(function ($, win, Modernizr, doc) {

	"use strict";

	// DOM READY

	$(function () {

		/* ---------------------------------------------------- */
		/*	Other Functions										*/
		/* ---------------------------------------------------- */

		(function () {

			if ($('.divider-solid').length) {
				$('.divider-solid').before('<div class="clear" />');
			}

			($('.epicSlider').length ? true : false) ? $('body').addClass('epic') : '';

		}());

		/* ---------------------------------------------------- */
		/* Navigation											*/
		/* ---------------------------------------------------- */

		(function () {

			var $nav = $('#navigation'),
				$mainNav = $nav.find('ul').eq(0),
				optionsList = '',
				$submenu = $mainNav.find('ul').parent();

			$submenu.on('mouseenter', function () {
				var $this = $(this),
					$subMenu = $this.children('ul');
				if ($subMenu.length) {
					$this.addClass('hover');
				}

				$subMenu.stop(true, true).delay(250).slideDown(250);
			}).on('mouseleave', function () {
				$(this).removeClass('hover').children('ul').stop(true, true).delay(100).slideUp(100);
			});
			
			$.fn.lamp = function (options) {

				var defaults = {
					'target': 'li',
					'container': '',
					'speed': 500,
					'fx': '',
					'click': function () {
						return true;
					},
					'setOnClick': false,
					'selectClass': 'current-menu-item'
				}, o = $.extend({}, defaults, options);

				if (o.container === '') {
					o.container = o.target;
				}

				return this.each(function (index, el) {

					var $selected, $back, $backSubMenu, $lt;
					$selected = $(o.target + '.' + o.selectClass, this);
					$lt = $(this).children('li');
					
					$lt.each(function(idx, val) {
						$(val).width($(this).width());
					});

					function move($el, cbType) {

						if (!$el) {
							$el = $selected;
						}

						var $sub = $el.find('ul'), newWidth = '';
						$el.hasClass('hover') ? newWidth = $sub.outerWidth() : newWidth = $el.outerWidth();

						var styleCss = {
							'left': $el.position().left,
							'width': newWidth
						};

						$back.stop().animate(styleCss, o.speed);

					}

					if ($selected.length < 1) {
						$selected = $lt.eq(0);
					}

					$lt.on('mouseenter focusin', function () {
						move($(this));
					}).on('click', function (e) {

						$selected.removeClass(o.selectClass);
						$selected = $(this).addClass(o.selectClass);

						if (Modernizr.touch) {
							var $parent = $(this);
							$parent.removeClass('hover').children('ul').stop(true, true).fadeOut(100);
							move($(this));
						}
						return o.click.apply(this, [e, this]);
					});

					$back = $('<' + o.container + ' class="back"></' + o.container + '>').prependTo(this);

					$back.css({
						'left': $selected.position().left,
						'width': $selected.width()		
					})

					$selected = $($selected.eq(0).addClass(o.selectClass));

					$(this).on('mouseleave focusout', function () {
						var $returnEl = null;
						move($returnEl);
						return true;
					});

					$(win).on('resize', function () {
						move($selected);
					});

				});

			};

			$mainNav.lamp({speed: 250});
			
			// Responsive
			$mainNav.find('li').each(function (idx, val) {
				var $this  = $(this),
					$anchor = $this.children('a'),
					depth   = $this.parents('ul').length - 1,
					indent  = '';

				if (depth) {
					while (depth > 0) {
						indent += '-';
						depth = depth - 1;
					}
				}
				
				if ($(val).hasClass('current-menu-item')) {
					optionsList += '<option selected="" value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
				} else {
					optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
				}

			});

			$mainNav.after('<select class="responsive-nav">' + optionsList + '</select>');

			$('.responsive-nav').on('change', function () {
				win.location = $(this).val();
			});

			if (!Modernizr.touch) {
				$(win).scroll(function () {
					$('#header').headerToFixed();
				});
			}

		}());

		/* end Navigation */

		/* ---------------------------------------------------- */
		/* Touch Handler										*/
		/* ---------------------------------------------------- */

		function touchHandler(e) {
			var target = $(e.currentTarget);
			if (target.hasClass('active')) {
				target.removeClass('active');
				return true;
			} else {
				target.addClass('active');
				return false;
			}
		}

		/* end Touch Handler */

		/* ---------------------------------------------------- */
		/* Fancybox												*/
		/* ---------------------------------------------------- */

		var fancyBox = function () {

			if ($('.single-image').length) {

				if (Modernizr.touch) {
					$('.single-image').on('click', touchHandler);
				}

				// Single Image
				$('.single-image.plus-icon, .single-image.link-icon').fancybox({
					openEffect	: 'fade',
					closeEffect	: 'fade',
					padding: 0,
					helpers : {
						title : {
							type : 'inside'
						}
					}
				}).each(function () {
					$(this).append('<span class="curtain"></span>');
				});

				// Iframe
				$('.single-image.video-icon').fancybox({
					type        : 'iframe',
					openEffect  : 'fade',
					closeEffect	: 'fade',
					nextEffect  : 'fade',
					prevEffect  : 'fade',
					helpers     : {
						title   : {
							type : 'over'
						}
					},
					width       : '70%',
					height      : '70%',
					maxWidth    : 800,
					maxHeight   : 600,
					fitToView   : false,
					autoSize    : false,
					closeClick  : false
				}).each(function () {
					$(this).append('<span class="curtain"></span>');
				});
			}

		};

		fancyBox();

		/* end Fancybox */

		/* ---------------------------------------------------- */
		/* Resize Grid											*/
		/* ---------------------------------------------------- */

		(function () {
			
			if ($('.scroll-box').length) {
				$('.scroll-box').resizeGrid(resizeGrid);
			}			
			
		}());

		/* end Resize Grid */

		/* ---------------------------------------------------- */
		/* Epic Slider											*/
		/* ---------------------------------------------------- */

		if ($('.epicSlider').length) {
			$('.epicSlider').epicSlider(epicSlider);
		}

		/* end Epic Slider */

		/* ---------------------------------------------------- */
		/* Sudo Slider											*/
		/* ---------------------------------------------------- */

		if ($('.sudo').length) {
			$('.sudo').sudoSlider({
				prevNext: sudoSlider.prevNext,
				continuous: sudoSlider.continuous,
				autowidth: sudoSlider.autowidth,
				autoheight: sudoSlider.autoheight,
				clickableAni: sudoSlider.clickableAni,
				slidecount: sudoSlider.slidecount,
				ease: sudoSlider.ease,
				speed: sudoSlider.speed
			});
		}

		/* end Sudo Slider */

		/* ---------------------------------------------------- */
		/* Stapel												*/
		/* ---------------------------------------------------- */

		(function () {

			if ($('#tp-grid').length) {

				var $grid = $('#tp-grid'),
					$name = $('#name'),
					$close = $('.tp-back'),
					$loader = $('<div class="loader"><div id="circularG_1" class="circularG"></div><div id="circularG_2" class="circularG"></div><div id="circularG_3" class="circularG"></div><div id="circularG_4" class="circularG"></div><div id="circularG_5" class="circularG"></div><div id="circularG_6" class="circularG"></div><div id="circularG_7" class="circularG"></div><div id="circularG_8" class="circularG"></div></div>').insertBefore($grid),
					stapel = $grid.stapel({
						delay : 50,
						onLoad : function () {
							$loader.remove();
						},
						onBeforeOpen : function (pileName) {
							$name.html(pileName);
						},
						onAfterOpen : function (pileName) {
							$close.show();
						}
					});
				$close.on('click', function () {
					$close.hide();
					$name.empty();
					stapel.closePile();
				});

			}

		}());

		/* end Stapel */

		/* ---------------------------------------------------- */
		/* Flickr												*/
		/* ---------------------------------------------------- */

		(function () {

			if ($('.flickr-badge').length) {
				$('.flickr-badge').jflickrfeed(objFlickr);
			}

		}());

		/* end Flickr */

		/* ---------------------------------------------------- */
		/* Tabs													*/
		/* ---------------------------------------------------- */

		(function () {

			var $tabsNav       = $('.tabs-nav'),
				$tabsNavLis    = $tabsNav.children('li'),
				$tabsContainer = $('.tabs-container');

			$tabsNav.each(function () {
				var $this = $(this);
				$this.next().children('.tab-content').stop(true, true).hide().first().show();
				$this.children('li').first().addClass('active').stop(true, true).show();
			});

			$tabsNavLis.on('click', function () {
				var $this = $(this);
				$this.siblings().removeClass('active').end().addClass('active');
				$this.parent().next().children('.tab-content').stop(true, true)
					.hide()
					.siblings($this.find('a').attr('href'))
					.fadeIn(250, function () {
						$this = $(this);
						$this.parent('.tabs-container').animate({
							height : $this.outerHeight(true)
						}, 200);
					});
				return false;
			}).children(win.location.hash ? 'a[href=' + win.location.hash + ']' : 'a:first').trigger('click');

			function adjustTabs() {

				$tabsContainer.each(function () {
					var $this = $(this);
					$this.height($this.children('.tab-content:visible').outerHeight());
				});

			}

			// Init
			adjustTabs();

			// Window resize
			$(win).on('resize', function () {

				var timer = win.setTimeout(function () {
					win.clearTimeout(timer);
					adjustTabs();
				}, 30);

			});

		}());

		/* end Tabs */

		/* ---------------------------------------------------- */
		/* Toggles												*/
		/* ---------------------------------------------------- */

		(function () {

			var $box = $('.acc-box');

			$box.each(function () {

				var $trigger = $('.acc-trigger', this);
				$trigger.first().addClass('active').next().show();

				$trigger.on('click', function () {
					var $this = $(this);
					if ($this.data('mode') === 'toggle') {
						$this.toggleClass('active').next().stop(true, true).slideToggle(300);
					} else if ($this.next().is(':hidden')) {
						$trigger.removeClass('active').next().slideUp(300);
						$this.toggleClass('active').next().slideDown(300);
					}
					return false;
				});

			});

		}());

		/* end Toggles */

		/* ---------------------------------------------------- */
		/* Gallery												*/
		/* ---------------------------------------------------- */

		(function() {

			if ($('#gallery-items').length) {
				
				var $cont = $('#gallery-items'),
					$itemsFilter = $('#gallery-filter'), mouseOver;	

				$.fn.slideVertShow = function(speed) {
					var that = $(this);
					that.animate({paddingTop: 'show', paddingBottom: 'show', height: 'show'}, speed);
					win.setTimeout(function() {
						$itemsFilter.animate({width: 140}, 300);
					}, 10);
				};

				$.fn.slideVertHide = function(speed) {
					var that = $(this), $filter;
					that.not('.active').animate({paddingTop: 'hide', paddingBottom: 'hide', height: 'hide'}, speed);
					if (that.hasClass('active')) {
						$filter = that.filter('.active');
						win.setTimeout(function() {
							$itemsFilter
									.css({marginLeft: -($filter.children('a').outerWidth() + 30) / 2})
									.animate({width: $filter.children('a').outerWidth() + 30}, 300);
						}, 10);
					}
				};

				// Copy categories to item classes
				$('article', $cont).each(function(i) {
					var $this = $(this);
					$this.addClass($this.attr('data-categories'));
				});

				// Run Isotope when all images are fully loaded
				$(win).on('load', function() {
					$cont.isotope({
						itemSelector: 'article',
						layoutMode: 'fitRows'
					});
				});

				if ($(win).width() > 767) {
					
					$itemsFilter.find('li').first().addClass('active').end().stop(true, true).slideVertHide(300);

					$itemsFilter.on('mouseenter', function() {
						var $this = $(this);
						win.clearTimeout(mouseOver);

						// Wait 100ms before animating to prevent unnecessary flickering
						mouseOver = win.setTimeout(function() {
							$itemsFilter.find('li').stop(true, true).slideVertShow(300);
						}, 200);

					}).on('mouseleave', function() {
						win.clearTimeout(mouseOver);
						$(this).find('li').stop(true, true).slideVertHide(300);
					});					
					
				} else {
					
					$itemsFilter.find('li').first().addClass('active');

				}

				// Filter projects
				$itemsFilter.on('click', 'li', function(e) {
					var $this = $(this).children('a'),
						currentOption = $this.attr('data-categories');

					$itemsFilter.find('li').removeClass('active');
					$this.parent().addClass('active');

					if (currentOption) {
						if (currentOption !== '*') {
							currentOption = currentOption.replace(currentOption, '.' + currentOption);
						}
						$cont.isotope({
							filter: currentOption
						}, function() {
							if (currentOption == '*') {
								$('.single-image', $cont).attr('rel', 'gallery');
							} else { 
								$(currentOption, $cont).find('.single-image').attr('rel', currentOption.substring(1));
							}
						});
					}
					e.preventDefault();
				});

			}

		}());

		/* end Gallery */

		/* ---------------------------------------------------- */
		/* Masonry												*/
		/* ---------------------------------------------------- */

		(function () {

			if ($('#masonry').length) {

				var $container = $('#masonry');

				$container.imagesLoaded(function () {
					$container.masonry({
						itemSelector: '.box',
						columnWidth: 227,
						gutterWidth: 10
					});
				});

				$container.infinitescroll({
					navSelector  : '#page-nav',    // selector for the paged navigation 
					nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
					itemSelector : '.box',     // selector for all items you'll retrieve
					loading: {
						finishedMsg: 'No more pages to load.',
						img: 'images/icons/ajax-loader.gif'
					}
				}, function (newElements) {

					fancyBox();

					// hide new items while they are loading
					var $newElems = $(newElements).css({
						opacity: 0
					});
					$newElems.imagesLoaded(function () {
						$newElems.animate({
							opacity: 1
						});
						$container.masonry('appended', $newElems, true);
					});

				});
			}

		}());

		/* end Masonry */

		/* ---------------------------------------------------- */
		/* FitVids												*/
		/* ---------------------------------------------------- */

		function adjustVideos() {

			var $videos = $('.video-container');

			$videos.each(function () {

				var $this        = $(this),
					playerWidth  = $this.parent().actual('width'),
					playerHeight = playerWidth / $this.data('aspectRatio');

				$this.css({
					'height' : playerHeight,
					'width'  : playerWidth
				});

			});

		}

		$('.container').each(function () {

			var selectors  = [
				"iframe[src^='http://player.vimeo.com']",
				"iframe[src^='http://www.youtube.com']",
				"object",
				"embed"
			], $allVideos = $(this).find(selectors.join(','));

			$allVideos.each(function () {

				var $this = $(this),
					videoHeight = $this.attr('height') || $this.actual('width'),
					videoWidth  = $this.attr('width') || $this.actual('width');

				$this.css({
					'height' : '100%',
					'width'  : '100%'
				}).removeAttr('height').removeAttr('width')
					.wrap('<div class="video-container"></div>').parent('.video-container').css({
						'height' : videoHeight,
						'width'  : videoWidth
					}).data('aspectRatio', videoWidth / videoHeight);

				adjustVideos();
			});

		});

		$(win).on('resize', function () {
			var timer = win.setTimeout(function () {
				win.clearTimeout(timer);
				adjustVideos();
			}, 30);
		});

		/* end FitVids */

		/* ---------------------------------------------------- */
		/* Map													*/
		/* ---------------------------------------------------- */

		(function () {

			if ($('.google_map').length) {
				var $gmap = $('.google_map');
				$gmap.gMap(objGoogleMap);
			}

		}());

		/* end Map */

		/* ---------------------------------------------------- */
		/* Cycle Functions										*/
		/* ---------------------------------------------------- */

		// Fixed scrollHorz effect
		$.fn.cycle.transitions.fixedScrollHorz = function ($cont, $slides, opts) {

			$('.cycle-slider-nav a, .post-slider-nav a').on('click', function (e) {
				$cont.data('dir', '');
				if (e.target.className.indexOf('prev') > -1) {
					$cont.data('dir', 'prev');
				}
			});
			$cont.css('overflow', 'hidden');
			opts.before.push($.fn.cycle.commonReset);
			var w = $cont.width();
			opts.animIn.left = 0;
			opts.animOut.left = 0-w;
			opts.cssFirst.left = 0;
			opts.cssBefore.left = w;
			opts.cssBefore.top = 0;

			if ($cont.data('dir') === 'prev') {
				opts.cssBefore.left = -w;
				opts.animOut.left = w;
			}

		};

		/* ---------------------------------------------------- */
		/* Cycle Slider											*/
		/* ---------------------------------------------------- */

		(function () {

			function swipeFunc(e, dir) {

				var $cycleslider = $(e.currentTarget);

				// Enable swipes if more than one slide
				if ($cycleslider.data('slideCount') > 1) {
					$cycleslider.data('dir', '');
					if (dir === 'left') { $cycleslider.cycle('next'); }
					if (dir === 'right') {
						$cycleslider.data('dir', 'prev');
						$cycleslider.cycle('prev');
					}
				}
			}

			if ($('.cycle-slider > ul').length) {

				var $cycleslider = $('.cycle-slider > ul');

				$cycleslider.each(function (i) {

					var $this = $(this);

					$this.css('height', $this.children('li:first').height())
						.after('<div class="cycle-slider-nav"><a href="#" class="prevBtn cycle-nav-prev-' + i + '">Prev</a><a href="" class="nextBtn cycle-nav-next-' + i + '">Next</a></div>')
						.cycle({
							before: function (curr, next, opts) {
								var $this = $(this);
								$this.parent().stop().animate({
									height: $this.height()
								}, opts.speed);
							},
							containerResize : false,
							easing          : objCycleSlider.easing,
							fx				: 'fixedScrollHorz',
							fit             : true,
							next            : '.cycle-nav-next-' + i,
							pause           : true,
							prev            : '.cycle-nav-prev-' + i,
							slideResize     : true,
							speed           : objCycleSlider.speed,
							timeout         : objCycleSlider.timeout,
							width           : '100%'
						}).data('slideCount', $cycleslider.children('li').length);
				});

				// Pause on Nav Hover
				$('.cycle-slider-nav a').on('mouseenter', function () {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function () {
					$(this).parent().prev().cycle('resume');
				});

				// Hide navigation if only a single slide
				if ($cycleslider.data('slideCount') <= 1) {
					$cycleslider.next('.cycle-slider-nav').hide();
				}

				// Resize
				$(win).on('resize', function () {
					$cycleslider.css('height', $cycleslider.find('li:visible').height());
				});

				// Include Swipe
				if (Modernizr.touch) {

					$cycleslider.swipe({
						swipeLeft       : swipeFunc,
						swipeRight      : swipeFunc,
						allowPageScroll : 'auto'
					});

				}
			}

		}());

		/* end Cycle Slider */

		/* ---------------------------------------------------- */
		/* Post Slider											*/
		/* ---------------------------------------------------- */

		(function () {

			function swipeFunc(e, dir) {
				var $postslider = $(e.currentTarget);
				// Enable swipes if more than one slide
				if ($postslider.data('slideCount') > 1) {
					$postslider.data('dir', '');
					if (dir === 'left') {
						$postslider.cycle('next');
					}
					if (dir === 'right') {
						$postslider.data('dir', 'prev');
						$postslider.cycle('prev');
					}
				}
			}

			if ($('.image-post-slider > ul').length) {

				var $postslider = $('.image-post-slider > ul');

				$postslider.each(function (i) {

					var $this = $(this);

					$this.css('height', $this.children('li:first').height())
						.after('<div class="post-slider-nav"><a class="prevBtn post-nav-prev-' + i + '">Prev</a><a class="nextBtn post-nav-next-' + i + '">Next</a></div>')
						.cycle({
							before: function (curr, next, opts) {
								var $this = $(this);
								$this.parent().stop().animate({
									height: $this.height()
								}, opts.speed);
							},
							containerResize : false,
							easing          : objPostSlider.easing,
							fx				: 'fixedScrollHorz',
							fit             : true,
							next            : '.post-nav-next-' + i,
							pause           : true,
							prev            : '.post-nav-prev-' + i,
							slideResize     : true,
							speed           : objPostSlider.speed,
							timeout         : objPostSlider.timeout,
							width           : '100%'
						}).data('slideCount', $postslider.children('li').length);
				});

				// Pause on Nav Hover
				$('.post-slider-nav a').on('mouseenter', function () {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function () {
					$(this).parent().prev().cycle('resume');
				});

				// Hide navigation if only a single slide
				if ($postslider.data('slideCount') <= 1) {
					$postslider.next('.post-slider-nav').hide();
				}

				// Resize
				$(win).on('resize', function () {
					$postslider.css('height', $postslider.find('li:visible').height());
				});

				// Include Swipe
				if (Modernizr.touch) {

					$postslider.swipe({
						swipeLeft       : swipeFunc,
						swipeRight      : swipeFunc,
						allowPageScroll : 'auto'
					});

				}
			}

		}());

		/* end Post Slider */

		/* ---------------------------------------------------- */
		/* Testimonials											*/
		/* ---------------------------------------------------- */

		(function () {

			function swipeFunc(e, dir) {
				var $quotes = $(e.currentTarget);
				if ($quotes.data('slideCount') > 1) {
					$quotes.data('dir', '');
					if (dir === 'left') {
						$quotes.cycle('next');
					}
					if (dir === 'right') {
						$quotes.data('dir', 'prev');
						$quotes.cycle('prev');
					}
				}
			}

			if ($('.quotes').length) {

				var $quotes = $('.quotes');

				$quotes.each(function (i) {

					var $this = $(this);

					$this.css('height', $this.children('li:first').height())
						.after('<div class="quotes-nav"> <a class="prevBtn quotes-nav-prev-' + i + '">Prev</a><a class="nextBtn quotes-nav-next-' + i + '">Next</a> </div>')
						.cycle({
							before: function (curr, next, opts) {
								var $this = $(this);
								$this.parent().stop().animate({
									height: $this.height()
								}, opts.speed);
							},
							containerResize : false,
							easing          : objTestimonials.easing,
							fit             : true,
							next            : '.quotes-nav-next-' + i,
							pause           : true,
							prev            : '.quotes-nav-prev-' + i,
							slideResize     : true,
							speed           : objTestimonials.speed,
							timeout         : objTestimonials.timeout,
							width           : '100%'
						}).data('slideCount', $quotes.children('li').length);
				});

				// Pause on Nav Hover
				$('.quotes-nav a').on('mouseenter', function () {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function () {
					$(this).parent().prev().cycle('resume');
				});

				// Hide Navigation if only a Single Slide
				if ($quotes.data('slideCount') <= 1) {
					$quotes.next('.quotes-nav').hide();
				}

				// Resize
				$(win).on('resize', function () {
					$quotes.css('height', $quotes.find('li:visible').height());
				});

				// Include Swipe
				if (Modernizr.touch) {

					$quotes.swipe({
						swipeLeft       : swipeFunc,
						swipeRight      : swipeFunc,
						allowPageScroll : 'auto'
					});
				}
			}

		}());

		/* end Testimonials */

		/* ---------------------------------------------------- */
		/* Notifications										*/
		/* ---------------------------------------------------- */

		(function () {

			var $notice = $('.error, .success, .info, .notice');
			$notice.notifications({speed: 300});

		}());

		/* end Notifications */

		/* ---------------------------------------------------- */
		/* Placeholder for IE									*/
		/* ---------------------------------------------------- */

		if (typeof doc.createElement("input").placeholder === 'undefined') {
			$('[placeholder]').focus(function () {
				var input = $(this);
				if (input.val() === input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function () {
				var input = $(this);
				if (input.val() === '' || input.val() === input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur().parents('form').submit(function () {
				$(this).find('[placeholder]').each(function () {
					var input = $(this);
					if (input.val() === input.attr('placeholder')) {
						input.val('');
					}
				});
			});
		}

		/* end Placeholder */

		/* ---------------------------------------------------- */
		/* Contact Form											*/
		/* ---------------------------------------------------- */

		(function () {

			if ($('.contact-form').length) {

				var $form = $('.contact-form'),
					$loader = '<span>Loader...</span>';
				$form.append('<div class="hide contact-form-responce" />');

				$form.each(function () {

					var $this = $(this),
						$response = $('.contact-form-responce', $this);
					$response.append('<p></p>');

					$this.submit(function () {

						$response.find('p').html($loader);

						var data = {
							action: "contact_form_request",
							values: $this.serialize()
						};

						//send data to server
						$.post("php/contact-send.php", data, function (response) {

							response = $.parseJSON(response);

							$('.wrong-data', $this).removeClass("wrong-data");
							$response.find('span').remove();

							if (response.is_errors) {

								$response.find('p').removeClass().addClass("error");
								$.each(response.info, function (input_name, input_label) {
									$("[name=" + input_name + "]", $this).addClass("wrong-data");
									$response.find('p').append('Please enter correctly "' + input_label + '"!' + '</br>');
								});
								$response.show(300);
							} else {

								$response.find('p').removeClass().addClass('success');

								if (response.info === 'success') {

									$response.find('p').append('Your email has been sent!');
									$this.find('input:not(input[type="submit"], button), textarea, select').val('').attr('checked', false);
									$response.show(300).delay(2500).hide(400);

								}

								if (response.info === 'server_fail') {
									$response.find('p').append('Server failed. Send later!');
									$response.show(300);
								}
							}

							// Scroll to bottom of the form to show respond message
							var bottomPosition = $response.offset().top;

							if ($(doc).scrollTop() < bottomPosition) {
								$('html, body').animate({
									scrollTop : bottomPosition
								});
							}

						});
						return false;
					});
				});
			}

		}());

		/* end Contact Form */

	});

	/* ---------------------------------------------------------------------- */
	/*	Plugins																  */
	/* ---------------------------------------------------------------------- */

	/* ---------------------------------------------------- */
	/*	Lamp												*/
	/* ---------------------------------------------------- */


	/* end Lamp */

	/* ---------------------------------------------------- */
	/*	Header to Fixed										*/
	/* ---------------------------------------------------- */

	$.fn.headerToFixed = function () {

		var $this = $(this),
			o = $(win).scrollTop(),
			w = $(win).outerWidth(),
			$h = $this.outerHeight(true);

		if (w > 960) {
			o > ($h / 3) ? $this.addClass('scrolltop') : $this.removeClass('scrolltop');
		}

	};

	/* ---------------------------------------------------- */
	/*	Notifications										*/
	/* ---------------------------------------------------- */

	$.fn.notifications = function (options) {

		var defaults = { speed: 300 },
			o = $.extend({}, defaults, options);

		return $(this).each(function () {

			var closeBtn = $('<a class="alert-close" href="#"></a>'),
				closeButton = $(this).append(closeBtn).find('> .alert-close');

			closeButton.click(function () {
				$(this).parent().fadeTo(o.speed, 0, function () {
					$(this).parent().slideUp(o.speed);
				});
				return false;

			});
		});

	};

	/* end Notifications */

	/* ---------------------------------------------------- */
	/* Back to Top											*/
	/* ---------------------------------------------------- */

	(function () {

		var extend = {
			button      : '#back-top',
			text        : 'Back to Top',
			min         : 200,
			fadeIn      : 400,
			fadeOut     : 400,
			speed		: 800,
			'class'     : 'active'
		}, oldiOS     = false, oldAndroid = false;

		// Detect if older iOS device, which doesn't support fixed position
		if (/(iPhone|iPod|iPad)\sOS\s[0-4][_\d]+/i.test(navigator.userAgent)) {
			oldiOS = true;
		}

		// Detect if older Android device, which doesn't support fixed position
		if (/Android\s+([0-2][\.\d]+)/i.test(navigator.userAgent)) {
			oldAndroid = true;
		}

		$('body').append('<a href="#" id="' + extend.button.substring(1) + '" title="' + extend.text + '">' + extend.text + '</a>');

		$(win).scroll(function () {
			var pos = $(win).scrollTop();

			if (oldiOS || oldAndroid) {
				$(extend.button).css({
					'position' : 'absolute',
					'top'      : pos + $(win).height()
				});
			}

			if (pos > extend.min) {
				$(extend.button).addClass(extend['class']);
			} else {
				$(extend.button).removeClass(extend['class']);
			}

		});

		$(extend.button).click(function () {
			$('html, body').animate({scrollTop : 0}, extend.speed);
			return false;
		});

	}());

	/* end Back to Top */

	/* ---------------------------------------------------- */
	/*	Actual Plugin										*/
	/* ---------------------------------------------------- */

	// jQuery Actual Plugin - Version: 1.0.13 (http://dreamerslab.com/)
		;(function(a){a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';}var f={absolute:false,clone:false,includeMargin:false};var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";e=e.clone().attr("style",m).appendTo("body");};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().andSelf().filter(":hidden");d+="visibility: hidden !important; display: block !important; ";if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);g.push(m.attr("style"));m.attr("style",d);});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");}else{o.attr("style",n);}});};}h();var k=/(outer)/g.test(b)?e[b](i.includeMargin):e[b]();j();return k;}});})(jQuery);

	/* end jQuery Actual Plugin */
	
}(jQuery, window, Modernizr, document));


