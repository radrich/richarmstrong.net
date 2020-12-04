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
// var data = JSON.parse(document.querySelector('#_json').dataset.json);
// var words = document.querySelector('#_words');
// data.words.forEach(function(word) {
// 	console.log('words', words);
// 	var elem = document.createElement('li');
// 	elem.innerHTML = word;
// 	words.appendChild(elem);
//   console.log('word: ', word);
// })



var shuffle = function (o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}


/*
--gets the template
--gets the words inbetween the [[ ]], trims them and adds them to an array
- loops through array, getting data
- if has data already, use it, otherwise get
- once all data has been got, create items from template multipled by amount param, adds to item array
- insert item array, wrapped with element param, and deliminated with space or comma
 */

/* caching (getting dataset only once rather than 10 times) */

function indexesOf(string, regex) {
    var match,
        indexes = {};

    regex = new RegExp(regex);

    while (match = regex.exec(string)) {
        if (!indexes[match[0]]) indexes[match[0]] = [];
        indexes[match[0]].push(match.index);
    }

    return indexes;
}

function loadCollection (collection, callback) {
	 if (collection == 'dog') {
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
  	$.getJSON('/assets/json/'+collection+'.json', function(data) {
		  if (data.status == 'success') {
		  	callback(data.items);
		  }
		});
	}
}

var loadRandomItems = function () {
	$('._random').each(function(index) {
		var $this = $(this),
		template = $this.data('template'),
		type = $this.data('type'),
  	amount = $this.data('amount'),
  	delimeter = $this.data('delimeter');
		
		console.log(index, template);
		
		//gets the words inbetween the [[ ]], trims them and adds them to an array
		var tmp = template;
		var indices = indexesOf(tmp, /\[\[|\]\]/g);
		var indicesStart = indices['[['];
		var indicesEnd = indices[']]'];
		var numReplacementsNeeded = Math.min(indicesStart.length, indicesEnd.length);
		var wordsToReplace = [];
		
		for(var i=0; i<numReplacementsNeeded; i++) {
		  wordsToReplace.push(tmp.substring(indicesStart[i] + 2, indicesEnd[i]).trim());
		}
		
		var availableCollections = ['color', 'test', 'dog'];
		var loadedCollections = {};
		
		// if it is loaded, use it
		// if isn’t loaded, load collection
		// when a collection is loaded check again
		var replacedStrings = [];
		
		var insertWords = function () {
			if (replacedStrings.length < amount) return false;
			
			var elements = [];
			var childElem = 'span';
			
			$.each(replacedStrings, function(key, str) {
				if (type == 'ul' || type == 'ol') {
					elements.push('<li>'+str+'</li>');
				} else {
					elements.push('<span>'+str+'</span>');
				}
		  });
		  $this.html(elements.join(delimeter));
		}
		
		var replaceFirstWord = function (str, collection) {
			var indexFrom = str.indexOf('[[');
			var indexTo = str.indexOf(']]') + 2;
			var strStart = str.substring(0, indexFrom);
			var strEnd = str.substring(indexTo);
			var replacement = shuffle(loadedCollections[collection])[0];
			
			return strStart + replacement + strEnd;
		}
		
		
		var numWordsReadyForReplacing = 0;
		var replaceWords = function () {
			numWordsReadyForReplacing ++;
			if (numWordsReadyForReplacing < numReplacementsNeeded) return false;
			
			// replace the string between first index of [[ and first index of ]] + 2 with a random loadedCollections[wordsToReplace]
			for (var k=0; k<amount; k++) {
				var replacedStr = tmp;
				for (var i=0; i<numReplacementsNeeded; i++) {
					replacedStr = replaceFirstWord(replacedStr, wordsToReplace[i]);
				}
				replacedStrings.push(replacedStr);
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















