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

// prompts

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

var loadRandomItems = function () {
	$('._random').each(function(index) {
		var $this = $(this),
		tmp = $this.data('template'),
		source = $this.data('source') || null,
		child = $this.data('child') || 'span',
  	amount = $this.data('amount') || 1,
  	params = $this.data('params') || {min: 1, max: 10},
  	delimeter = $this.data('delimeter') || '';
  	
  	//console.log('params', params);
  	
  	// make source a thing
  	if (source) {
  		source = source.split(',')
  		source.forEach(function (item, i) {
			  source[i] = item.trim();
			});
  	}
		
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
		var loadedCollections = {};
		
		
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
			} else {
				replacement = shuffle(loadedCollections[collection])[0];
			}
			
			replacement = '<span class="word">'+replacement+'</span>'; 
			
			return strStart + replacement + strEnd;
		}
		
		var numWordsReadyForReplacing = 0;
		var replaceWords = function () {
			numWordsReadyForReplacing ++;
			if (numWordsReadyForReplacing < numReplacementsNeeded) return false;
			
			// replace the [[ word ]] with random items
			for (var k=0; k<amount; k++) {
				var replacedStr = tmp;
				for (var i=0; i<numReplacementsNeeded; i++) {
					replacedStr = replaceNextWord(replacedStr, wordsToReplace[i]);
				}
				replacedStrings.push(replacedStr);
				console.log('replacedStrings', replacedStrings)
			}
		}
		
		// loop through array, getting data
		$.each(wordsToReplace, function(key, word) {
	  	if (availableCollections.includes(word)) {
	  		if (loadedCollections[word]) {
	  			replaceWords();
	  			insertWords();
	  		} else {
	  			loadCollection(word, function (data) {
	  				loadedCollections[word] = data;
	  				replaceWords();
	  				insertWords();
	  			});
	  		}
	  	} else {
	  		throw word + ' is not an available collection';
	  	}
	  });
	});
}

$(function() {
  loadRandomItems();
});















