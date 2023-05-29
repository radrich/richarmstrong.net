console.log('TapTapKaboom yo! 👊👊💥');

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


/* prompts & workouts */

var shuffle = function (o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

var randomBetweenMinAndMax = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var randomAcronym = function (min, max) {
  var len = randomBetweenMinAndMax(min, max);
  var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var ranLetters = shuffle(letters);
  var acronym = '';
  
  for (var i=0; i<len; i++) {
		acronym += ranLetters[i];
		if (i+1 < len) {acronym += '.';}
	}
  
  return acronym;
}

var randomMix = function (collections) {
	var mix = [];
	for (var i=0; i<collections.length; i++) {
		mix = mix.concat(collectionData[collections[i]])
	}
	
	return shuffle(mix)[0];
}

var indexesOf = function (string, regex) {
    var match, indexes = {};

    regex = new RegExp(regex);
    
    while (match = regex.exec(string)) {
      if (!indexes[match[0]]) indexes[match[0]] = [];
      indexes[match[0]].push(match.index);
    }

    return indexes;
}

var loadCollection = function (collection, callback) {
	 if (collection == 'numbers') {
		callback([]);
	} else if (collection == 'acronyms') {
		callback([]);
	} else if (collection == 'mix') {
		callback([]);
	} else if (collection == 'dogs') {
		$.getJSON('https://dog.ceo/api/breeds/list/all', function(data) {
		  if (data.status == 'success') {
		  	var breeds = [];
		  	$.each(data.message, function(key, val) {
		  	  breeds.push(key);
		  	});
		  	
		  	callback(breeds);
		  }
		});
	} else {
  	$.getJSON('/assets/json/'+collection+'.json?v=2', function(data) {
		  if (data.status == 'success') {
		  	callback(data.items);
		  }
		}).fail(function(data) {
	    console.log('--- issue', data)
	  });
	}
}

var replaceRandomItemsWithData = function () {
	$('._random').each(function(index) {
		
		// data from element
		var $this = $(this),
		tmp = $this.data('template'),
		child = $this.data('child') || 'span',
  	amount = $this.data('amount') || 1,
  	params = $this.data('params') || null,
  	delimeter = $this.data('delimeter') || '';
		
		//gets the words inbetween the [[ ]], trims them and adds them to an array
		var indices = indexesOf(tmp, /\[\[|\]\]/g);
		var indicesStart = indices['[['];
		var indicesEnd = indices[']]'];
		var numReplacementsNeeded = Math.min(indicesStart.length, indicesEnd.length);
		var wordsToReplace = [];
		
		// setup wordsToReplace
		for(var i=0; i<numReplacementsNeeded; i++) {
		  wordsToReplace.push(tmp.substring(indicesStart[i] + 2, indicesEnd[i]).trim());
		}
		
		var replacedStrings = [];
		var replaceWords = function () {
      // replace the [[ word ]] with random items
      for (var k=0; k<amount; k++) {
        var replacedStr = tmp;
        for (var i=0; i<numReplacementsNeeded; i++) {
          replacedStr = replaceNextWord(replacedStr, wordsToReplace[i]);
        }
        replacedStrings.push(replacedStr);
      }
    }
		var insertWords = function () {
			var elements = [];
      $.each(replacedStrings, function(key, str) {
        elements.push('<'+child+' class="item">'+str+'</'+child+'>');
      });
      $this.html(elements.join(delimeter));
		}
		
		var replaceNextWord = function (str, type) {
			var indexFrom = str.indexOf('[[');
			var indexTo = str.indexOf(']]') + 2;
			var strStart = str.substring(0, indexFrom);
			var strEnd = str.substring(indexTo);
			var replacement;
			
			if (type == 'numbers') {
				replacement = randomBetweenMinAndMax(params.min, params.max);
			} else if (type == 'acronyms') {
				replacement = randomAcronym(params.min, params.max);
			} else if (type == 'mix') {
				replacement = randomMix(params.collections);
			} else {
				replacement = shuffle(collectionData[type])[0];
			}
			
			replacement = '<span class="word">'+replacement+'</span>'; 
			return strStart + replacement + strEnd;
		}
		
    replaceWords();
    insertWords();
	});
}

// collection containers
var collectionsToLoad = [];
var collectionsBegunLoading = [];
var collectionData = {};
var availableCollections = [
	'acronyms',
	'adjectives',
	'adverbs',
	'animals-plural',
	'animals-singular',
	'food-plural',
	'food-singular',
	'fruits-plural',
	'fruits-singular',
	'nouns-plural',
	'nouns-singular',
	'objects-plural',
	'objects-singular',
	'verbs-past',
	'verbs-present',
	'verbs',
	'vegetables-plural',
	'vegetables-singular',
	'colors-basic',
];

var appendToCollectionsToLoad = function (collection) {
	if (!collectionsToLoad.includes(collection)) {
		if (availableCollections.includes(collection)) {
			collectionsToLoad.push(collection);
		}
	}
}

var hasLoadedAllCollections = function () {
	// find each key in both collectionsToLoad and collectionData
	var matches = 0;
	for(var i=0; i<collectionsToLoad.length; i++) {
		if (collectionData[collectionsToLoad[i]]) {
			matches ++;
		}
	}
	return matches == collectionsToLoad.length;
}

var loadAllCollections = function (callback) {
	// if has loaded all collections, callback
	if (hasLoadedAllCollections()) {
		callback();
	
	// if not, load collections
	} else {
		collectionsToLoad.forEach(function (collection, i) {
			
			// if haven’t started loading collection, load it
			if (!collectionsBegunLoading.includes(collection)) {
				collectionsBegunLoading.push(collection);
				
				loadCollection(collection, function (data) {
					collectionData[collection] = data;
					
					if (hasLoadedAllCollections()) {
						callback();
					}
				});
			}
		});
	}
}

var loadRandomItemsData = function (callback) {
	$('._random').each(function(index) {
		
		// data from element
		var $this = $(this),
    tmp = $this.data('template'),
    params = $this.data('params') || null;
		
		//gets the words inbetween the [[ ]], trims them and adds them to an array
		var indices = indexesOf(tmp, /\[\[|\]\]/g);
		var indicesStart = indices['[['];
		var indicesEnd = indices[']]'];
		var numReplacementsNeeded = Math.min(indicesStart.length, indicesEnd.length);
		
		// setup/add to collectionsToLoad
		for(var i=0; i<numReplacementsNeeded; i++) {
		  var collection = tmp.substring(indicesStart[i] + 2, indicesEnd[i]).trim();
		  appendToCollectionsToLoad(collection);
		}
		if (params && params.collections) {
  		for(var i=0; i<params.collections.length; i++) {
				appendToCollectionsToLoad(params.collections[i]);
			}
		}
		
		// load collections
  	loadAllCollections(function () {
      callback();
  	});
	});
}

$(function() {
  loadRandomItemsData(function () {
    replaceRandomItemsWithData()
  });
  
  $('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 332,
    gutter: 32,
  });
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











