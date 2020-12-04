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

var loadRandomItems = function () {
	$('._random').each(function(index) {
		var $this = $(this),
		template = $this.data('template');
		
		console.log(index, template);
		
		//gets the words inbetween the [[ ]], trims them and adds them to an array
		var tmp = template;
		var indices = indexesOf(tmp, /\[\[|\]\]/g);
		var indicesStart = indices['[['];
		var indicesEnd = indices[']]'];
		var replacementsNeeded = Math.min(indicesStart.length, indicesEnd.length);
		var wordsToReplace = [];
		
		for(var i=0; i<replacementsNeeded; i++) {
		  wordsToReplace.push(tmp.substring(indicesStart[i] + 2, indicesEnd[i]).trim());
		}
		
		// loop through array, getting data
		$.each(wordsToReplace, function(key, collection) {
	  	if (collection == 'test') {
		  	$.getJSON('/assets/json/test.json', function(data) {
	  		  if (data.status == 'success') {
	  		  	collections[key] = shuffle(data.items);
	  		  	populateCombo();
	  		  }
	  		});
	  	} else if (collection == 'color') {
	  		$.getJSON('/assets/json/colors.json', function(data) {
	  		  if (data.status == 'success') {
	  		  	collections[key] = shuffle(data.items);
	  		  	populateCombo();
	  		  }
	  		});
	  	} else if (collection == 'dog') {
	  		$.getJSON('https://dog.ceo/api/breeds/list/all', function(data) {
	  		  if (data.status == 'success') {
	  		  	var breeds = [];
	  		  	$.each(data.message, function(key, val) {
	  		  	  breeds.push(key);
	  		  	});
	  		  	
	  		  	collections[key] = shuffle(breeds);
	  		  	populateCombo();
	  		  }
	  		});
	  	}
	  });
	  
		console.log('indicesStart', indicesStart);
		
		console.log('wordsToReplace', wordsToReplace);
	});
}

var oldloadRandomItems = function () {
	// for each random item
	$('._random').each(function(index) {
  	var $this = $(this),
  			items = [],
  			elements = [],
  			// trim values in sets array
  			sets = $.map($this.data('sets').split(','), function(val, i) {
					return val.trim();
			  }),
  			type = $this.data('type'),
  			amount = $this.data('amount'),
  			template = $this.data('template'),
  			matches = template ? template.match(/\${}/g).length : 0,
  			collections = [],
				collectionsGot = 0,
  			populate = function (childElem, joiner) {
  				$.each(items, function(key, val) {
  					if (!childElem) childElem = 'li';
  					if (!joiner) joiner = '';
  					
  					if (key >= amount) return false;
  					elements.push('<'+childElem+'>'+val+'</'+childElem+'>');
  			  });
  			  
  			  $this.html(elements.join(joiner));
  			},
				populateCombo = function () {
					collectionsGot ++;
					
					// if loaded all the collections, create a combo array and populate
					if (collectionsGot == sets.length) {
						var comboItems = [];
						for (var i=0; i<amount; i++) {
							var comboItem = [];
							for (var k=0; k<collectionsGot; k++) {
								comboItem[k] = collections[k][i];
							}
							
							// create single item with a template
							if (matches) {
	  			    	var phrase = template;
	  			    	for (var m=0; m<matches; m++) {
	  			    		phrase = phrase.replace('${}',comboItem[m]);
	  			    	}
	  			    	comboItems.push(phrase);
	  			    // or create single item without template
	  			    } else {
	  			    	comboItems.push(comboItem.join(' '));
	  			    }
						}
						
						items = comboItems;
						populate('span', ', ');
					}
				};
		
		// get each set
		$.each(sets, function(key, set) {
	  	if (set == 'test') {
		  	$.getJSON('/assets/json/test.json', function(data) {
	  		  if (data.status == 'success') {
	  		  	collections[key] = shuffle(data.items);
	  		  	populateCombo();
	  		  }
	  		});
	  	} else if (set == 'colors') {
	  		$.getJSON('/assets/json/colors.json', function(data) {
	  		  if (data.status == 'success') {
	  		  	collections[key] = shuffle(data.items);
	  		  	populateCombo();
	  		  }
	  		});
	  	} else if (set == 'dogs') {
	  		$.getJSON('https://dog.ceo/api/breeds/list/all', function(data) {
	  		  if (data.status == 'success') {
	  		  	var breeds = [];
	  		  	$.each(data.message, function(key, val) {
	  		  	  breeds.push(key);
	  		  	});
	  		  	
	  		  	collections[key] = shuffle(breeds);
	  		  	populateCombo();
	  		  }
	  		});
	  	}
	  });
	});
}

$(function() {
  loadRandomItems();
});















