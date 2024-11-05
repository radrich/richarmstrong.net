//returns if a url is internal
var _isInternalURL = function (url) {
	var regex1	= /http/,
		regex2	= new RegExp(location.host);
	
	if (!regex1.test(url) || regex2.test(url)) return true;
	else return false;
};


// links
var links = document.getElementsByTagName('a');
for (var i=0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {
  	if (!_isInternalURL(this.href)) {
  		this.setAttribute('target', '_blank');
  	}
  })
}

document.getElementById('menuBtn').addEventListener('click', function (e) {
	document.getElementById('nav').classList.toggle('open');
	document.body.classList.toggle('open');
	return false;
});

/*
$mobileMin: 499px;
$mobileMax: 767px;
$tabletMin: 768px;
$tabletMax: 1079px;
$desktopMin: 1080px;
 */
// glider
window.addEventListener('load', function(){
  if (document.querySelector('.glider')) {
  	  new Glider(document.querySelector('.glider'), {
  	   //  slidesToShow: 3,
  		  // slidesToScroll: 3,
  		  draggable: true,
  		  dots: '.dots',
  		  responsive: [
  	    {
  	      // screens greater than >= 775px
  	      breakpoint: 300,
  	      settings: {
  	        // Set to `auto` and provide item width to adjust to viewport
  	        slidesToShow: 1,
  	        slidesToScroll: 1,
  	        //arrows: false,
  	        //itemWidth: 150,
  	        duration: 0.25
  	      }
  	    },
  	    {
  	      // screens greater than >= 775px
  	      breakpoint: 500,
  	      settings: {
  	        // Set to `auto` and provide item width to adjust to viewport
  	        slidesToShow: 2,
  	        slidesToScroll: 2,
  	        //arrows: false,
  	        //itemWidth: 150,
  	        duration: 0.25
  	      }
  	    },
  	    {
  	      // screens greater than >= 1024px
  	      breakpoint: 720,
  	      settings: {
  	        slidesToShow: 3,
  	        slidesToScroll: 3
  	        // itemWidth: 150,
  	        // duration: 0.25
  	      }
  	    }
  	  ]
  	  })
  }
})