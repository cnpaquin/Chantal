/* ---------------------------------------------------------------------- */
/*	Theme Settings														  */
/* ---------------------------------------------------------------------- */

	/* ---------------------------------------------------- */
	/*	Flickr											    */
	/* ---------------------------------------------------- */

	var objFlickr = {
		limit: 6, // Max 9
		qstrings: {id : '54958895@N06'}, // ID
		itemTemplate: '<li><a class="bwWrapper" target="_blank" href="{{image_b}}" href="#"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	};

	/* ---------------------------------------------------- */
	/*	Google Map											*/
	/* ---------------------------------------------------- */

	var objGoogleMap = {
		address: 'London, Canada', // City, County
		markers: [
			{'address' : 'Richmond st, Oxford st'} // Street
		],
//        map.addOverlay(new GMarker(bounds.getCenter()));
		zoom: 14 // 0 - 21
	};

	/* ---------------------------------------------------- */
	/*	Cycle Slider										*/
	/* ---------------------------------------------------- */

	var objCycleSlider = {
		easing: 'easeInOutExpo', // Refer to the link below  http://easings.net/
		speed: 600,
		timeout: 5000
	};

	/* ---------------------------------------------------- */
	/*	Image Post Slider									*/
	/* ---------------------------------------------------- */

	var objPostSlider = {
		easing: 'easeInOutExpo', // Refer to the link below  http://easings.net/
		speed: 600,
		timeout: 5000
	};

	/* ---------------------------------------------------- */
	/*	Testimonials										*/
	/* ---------------------------------------------------- */

	var objTestimonials  = {
		easing: 'easeInOutExpo', // Refer to the link below  http://easings.net/
		speed: 600,
		timeout: 5000
	};

	/* ---------------------------------------------------- */
	/*	Epic Slider											*/
	/* ---------------------------------------------------- */

	var epicSlider  = {
		loop : true,					//Boolean: whether slideshow should loop or not	
		slideShow: true,				//Boolean: use slideshow or not
		autoPlay: true,					//Boolean: autoplay uplon load or not
		slideShowInterval : 5000,       //Integer: slideshow cycling speed, in milliseconds
		transitionSpeed : 600,			//Integer: transitions speed, in milliseconds
		startSlide : 0,					//Integer: starts at 0
		shuffleSlides:false,			//Boolean: shuffle slides or not
		easing : 'swing',		// Refer to the link below  http://easings.net/
		fx : 'leftToRight',				//String: none, fade, leftToRight, topToBottom 
		fxmobile : 'leftToRight',		//String: mobile effect -  none, fade, leftToRight, topToBottom 
		pattern :true					//Boolean: add pattern or not
	};

	/* ---------------------------------------------------- */
	/*	Sudo Slider											*/
	/* ---------------------------------------------------- */

	var sudoSlider  = {
		prevNext: true,			//Boolean: true or false
		continuous: true,		//Boolean: true or false
		autowidth: false,		//Boolean: true or false
		autoheight: false,		//Boolean: true or false
		clickableAni: false,    //Boolean: true or false
		ease: 'swing',			// Refer to the link below  http://easings.net/
		speed: 800				// Speed
	};
	
	/* ---------------------------------------------------- */
	/*	ResizeGrid Scroll								    */
	/* ---------------------------------------------------- */

	var resizeGrid = {
		cursorcolor: '#FFAD00'
	};

/* ---------------------------------------------------------------------- */
/*	end Theme Settings													  */
/* ---------------------------------------------------------------------- */			
		