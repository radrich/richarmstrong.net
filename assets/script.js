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
	console.log('MIX', collections)
	var mix = [];
	
	for (var i=0; i<collections.length; i++) {
		mix = mix.concat(collectionData[collections[i]])
	}
	console.log('BIG ARRAY')
	shuffle(mix);
	console.log('SHUFFLE ARRAY')
	
	
	return mix[0];
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
  	//console.log('load', collection)
  	$.getJSON('/assets/json/'+collection+'.json?v=2', function(data) {
		  if (data.status == 'success') {
		  	//console.log('loaded', collection, data)
		  	callback(data.items);
		  }
		}).fail(function(data) {
	    console.log('--- issue', data)
	  });
	}
}

/*
- could have an identifier. So a place to put the words.
- keep collections loaded outside of each random items element.
- random amount bwteen min and max
- set loading... text intially
- put in your own words [[ custom ]]
 */
 
// collection containers
var collectionsToLoad = [];
var collectionsBegunLoading = [];
var collectionsLoaded = [];
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
	'numbers', // treat differently
	'mix',  // treat differently
];

var appendToCollectionsToLoad = function (collection) {
	if (!collectionsToLoad.includes(collection)) {
		if (availableCollections.includes(collection)) {
			collectionsToLoad.push(collection);
		} else {
			throw collection + ' is not an available collection';
		}
	}
}

var hasLoadedAllCollections = function () {
	// find each key in both collectionsToLoad and collectionData
	var matches = 0;
	for(var i=0; i<collectionsToLoad.length; i++) {
		if (collectionsLoaded.includes(collectionsToLoad[i])) {
			matches ++;
		}
	}
	return matches == collectionsToLoad.length;
}

var loadAllCollections = function (callback) {
	// if has loaded all collections, callback
	if (hasLoadedAllCollections()) {
		console.log('loaded all collections')
		callback();
	
	// if not, load collections
	} else {
		console.log('--- load em up', collectionsToLoad)
		console.log('--- collectionData', collectionData)
		
		collectionsToLoad.forEach(function (collection, i) {
			console.log('--- loaded? :::: ', collection, collectionsLoaded.includes(collection))
			
			// if haven’t started loading collection, load it
			if (!collectionsBegunLoading.includes(collection)) {
				console.log('--- load collection', collection)
				collectionsBegunLoading.push(collection);
				
				loadCollection(collection, function (data) {
					collectionsLoaded.push(collection);
					collectionData[collection] = data;
					
					if (hasLoadedAllCollections()) {
						console.log('loaded all collections!!!!!!!')
						callback();
					}
				});
			}
		});
	}
}

var loadRandomItems = function () {
	$('._random').each(function(index) {
		
		// data from element
		var $this = $(this),
		tmp = $this.data('template'),
		child = $this.data('child') || 'span',
  	amount = $this.data('amount') || 1,
  	params = $this.data('params') || null,
  	delimeter = $this.data('delimeter') || '';
  	
  	
  	//console.log('params', params);
		
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
		
		// setup/add to collectionsToLoad
		for(var i=0; i<wordsToReplace.length; i++) {
			appendToCollectionsToLoad(wordsToReplace[i]);
		}
		if (params && params.collections) {
  		for(var i=0; i<params.collections.length; i++) {
				appendToCollectionsToLoad(params.collections[i]);
			}
  	}
  	
		
		
		// if it is loaded, use it
		// if isn’t loaded, load collection
		// when a collection is loaded check again
		var replacedStrings = [];
		
		var insertWords = function () {
			if (replacedStrings.length < amount) return false;
			
			var elements = [];
			$.each(replacedStrings, function(key, str) {
				elements.push('<'+child+' class="item">'+str+'</'+child+'>');
		  });
		  $this.html(elements.join(delimeter));
		}
		
		var replaceNextWord = function (str, collection) {
			
			console.log('replaceNextWord', collection, ' :: ', str)
			
			var indexFrom = str.indexOf('[[');
			var indexTo = str.indexOf(']]') + 2;
			var strStart = str.substring(0, indexFrom);
			var strEnd = str.substring(indexTo);
			var replacement;
			
			if (collection == 'numbers') {
				//console.log(str, '------ is number :', collection);
				replacement = randomBetweenMinAndMax(params.min, params.max);
			} else if (collection == 'acronyms') {
				replacement = randomAcronym(params.min, params.max);
			} else if (collection == 'mix') {
				console.log('-- GOT HERE MIX')
				replacement = randomMix(params.collections);
			} else {
				replacement = shuffle(collectionData[collection])[0];
			}
			
			replacement = '<span class="word">'+replacement+'</span>'; 
			
			return strStart + replacement + strEnd;
		}
		
		//var numWordsReadyForReplacing = 0;
		var replaceWords = function () {
			//numWordsReadyForReplacing ++;
			//if (numWordsReadyForReplacing < numReplacementsNeeded) return false;
			
			// replace the [[ word ]] with random items
			for (var k=0; k<amount; k++) {
				var replacedStr = tmp;
				for (var i=0; i<numReplacementsNeeded; i++) {
					replacedStr = replaceNextWord(replacedStr, wordsToReplace[i]);
				}
				replacedStrings.push(replacedStr);
				//console.log('replacedStrings', replacedStrings)
			}
		}
		
		
		console.log('wordsToReplace', numReplacementsNeeded, wordsToReplace);
		
		// load collections
  	loadAllCollections(function () {
  		replaceWords();
  		insertWords();
  	});
		
		// loop through array, getting data
		//console.log('wordsToReplace', wordsToReplace);
		// $.each(wordsToReplace, function(key, word) {
	 //  	if (availableCollections.includes(word)) {
	 //  		if (collectionData[word]) {
	 //  			replaceWords();
	 //  			insertWords();
	 //  		} else {
	 //  			loadCollection(word, function (data) {
	 //  				collectionData[word] = data;
	 //  				replaceWords();
	 //  				insertWords();
	 //  			});
	 //  		}
	 //  	} else {
	 //  		throw word + ' is not an available collection';
	 //  	}
	 //  });
	});
}

$(function() {
  loadRandomItems();
});















