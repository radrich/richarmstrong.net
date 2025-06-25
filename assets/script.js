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

/** filter box */

var filterBtnsToggle = document.getElementById('filterBtnsToggle');
var filterBox = document.getElementById('filterBox');

if (filterBtnsToggle && filterBox) {
    filterBtnsToggle.addEventListener('click', function (e) {
        e.preventDefault();
        filterBox.classList.toggle('open');
				filterBtnsToggle.classList.toggle('selected');
        
        filterBtnsToggle.textContent = filterBox.classList.contains('open') ? 'Close Filter' : 'Filter';
        
        return false;
    });
}

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
};

const filterButtons = document.querySelectorAll(".filterBtn");
const filterItems = document.querySelectorAll(".item");
let selectedTypeFilters = [];
let selectedCategoryFilters = [];

filterButtons.forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        const filter = slugify(this.getAttribute("data-filter"));
        const filterType = this.getAttribute("data-filter-type");
        
        console.log("filter", filter);
        console.log("filterType", filterType);
        
        if (filterType === "type") {
            if (filter === "all") {
                selectedTypeFilters = [];
                filterButtons.forEach(btn => {
                    if (btn.getAttribute("data-filter-type") === "type") {
                        btn.classList.remove('selected');
                    }
                });
                this.classList.add('selected');
            } else {
                const index = selectedTypeFilters.indexOf(filter);
                if (index > -1) {
                    selectedTypeFilters.splice(index, 1);
                    this.classList.remove('selected');
                } else {
                    selectedTypeFilters.push(filter);
                    this.classList.add('selected');
                }
                filterButtons.forEach(btn => {
                    if (btn.getAttribute("data-filter-type") === "type" && btn.getAttribute("data-filter") === "all") {
                        btn.classList.remove('selected');
                    }
                });
            }
        } else if (filterType === "category") {
            if (filter === "all") {
                selectedCategoryFilters = [];
                filterButtons.forEach(btn => {
                    if (btn.getAttribute("data-filter-type") === "category") {
                        btn.classList.remove('selected');
                    }
                });
                this.classList.add('selected');
            } else {
                const index = selectedCategoryFilters.indexOf(filter);
                if (index > -1) {
                    selectedCategoryFilters.splice(index, 1);
                    this.classList.remove('selected');
                } else {
                    selectedCategoryFilters.push(filter);
                    this.classList.add('selected');
                }
                filterButtons.forEach(btn => {
                    if (btn.getAttribute("data-filter-type") === "category" && btn.getAttribute("data-filter") === "all") {
                        btn.classList.remove('selected');
                    }
                });
            }
        }

        filterItems.forEach(item => {
            const itemTypes = item.getAttribute("data-type").split(",").map(slugify);
            const itemCategories = item.getAttribute("data-category").split(",").map(slugify);
            console.log('itemCategories', itemCategories);
            const typeMatch = selectedTypeFilters.length === 0 || selectedTypeFilters.every(filter => itemTypes.includes(filter));
            const categoryMatch = selectedCategoryFilters.length === 0 || selectedCategoryFilters.every(filter => itemCategories.includes(filter));
            
            if (typeMatch && categoryMatch) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

/** random reviews */
document.addEventListener('DOMContentLoaded', function() {
    var reviewContainer = document.getElementById('_randomReview');
    if (reviewContainer && reviewContainer.hasAttribute('data-reviews')) {
        var reviews = JSON.parse(reviewContainer.getAttribute('data-reviews'));
        var randomReview = reviews[Math.floor(Math.random() * reviews.length)];

        reviewContainer.innerHTML = `<blockquote class="big"><p>${randomReview.quote}</p><footer>${randomReview.author}</footer></blockquote>`;   
    }
});


/** creative prompts */

var shuffle = function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var randomBetweenMinAndMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomAcronym = function (min, max) {
    var len = randomBetweenMinAndMax(min, max);
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var ranletters = shuffle(letters);
    var acronym = '';

    for (var i = 0; i < len; i++) {
        acronym += ranletters[i];
        if (i + 1 < len) { acronym += '.'; }
    }

    return acronym;
};

var randomMix = function (collections) {
    var mix = [];
    for (var i = 0; i < collections.length; i++) {
        mix = mix.concat(collectionData[collections[i]]);
    }

    return shuffle(mix)[0];
};

var indexesOf = function (string, regex) {
    var match, indexes = {};

    regex = new RegExp(regex, 'g');

    while (match = regex.exec(string)) {
        if (!indexes[match[0]]) indexes[match[0]] = [];
        indexes[match[0]].push(match.index);
    }

    return indexes;
};

var loadCollection = function (collection, callback) {
    if (collection == 'numbers') {
        callback([]);
    } else if (collection == 'acronyms') {
        callback([]);
    } else if (collection == 'mix') {
        callback([]);
    } else if (collection == 'dogs') {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    var breeds = [];
                    for (var key in data.message) {
                        breeds.push(key);
                    }

                    callback(breeds);
                }
            });
    } else {
        fetch('/assets/json/' + collection + '.json?v=2')
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    callback(data.items);
                }
            })
            .catch(data => {
                console.log('--- issue', data);
            });
    }
};

var replaceRandomItemsWithData = function () {
    document.querySelectorAll('._random').forEach(function (elem) {

        // data from element
        var tmp = elem.dataset.template,
            child = elem.dataset.child || 'span',
            amount = parseInt(elem.dataset.amount) || 1,
            params = elem.dataset.params ? JSON.parse(elem.dataset.params) : null,
            delimiter = elem.dataset.delimiter || '';

        // gets the words in between the [[ ]], trims them and adds them to an array
        var indices = indexesOf(tmp, /\[\[|\]\]/g);
        var indicesStart = indices['[['];
        var indicesEnd = indices[']]'];
        var numReplacementsNeeded = Math.min(indicesStart.length, indicesEnd.length);
        var wordsToReplace = [];

        // setup wordsToReplace
        for (var i = 0; i < numReplacementsNeeded; i++) {
            wordsToReplace.push(tmp.substring(indicesStart[i] + 2, indicesEnd[i]).trim());
        }

        var replacedStrings = [];
        var replaceWords = function () {
            // replace the [[ word ]] with random items
            for (var k = 0; k < amount; k++) {
                var replacedStr = tmp;
                for (var i = 0; i < numReplacementsNeeded; i++) {
                    replacedStr = replaceNextWord(replacedStr, wordsToReplace[i]);
                }
                replacedStrings.push(replacedStr);
            }
        };
        var insertWords = function () {
            var elements = [];
            replacedStrings.forEach(function (str) {
                elements.push('<' + child + ' class="item">' + str + '</' + child + '>');
            });
            elem.innerHTML = elements.join(delimiter);
        };

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

            replacement = '<span class="word">' + replacement + '</span>';
            return strStart + replacement + strEnd;
        };

        replaceWords();
        insertWords();
    });
};

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
    'random-words',
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
};

var hasLoadedAllCollections = function () {
    // find each key in both collectionsToLoad and collectionData
    var matches = 0;
    for (var i = 0; i < collectionsToLoad.length; i++) {
        if (collectionData[collectionsToLoad[i]]) {
            matches++;
        }
    }
    return matches == collectionsToLoad.length;
};

var loadAllCollections = function (callback) {
    // if has loaded all collections, callback
    if (hasLoadedAllCollections()) {
        callback();

        // if not, load collections
    } else {
        collectionsToLoad.forEach(function (collection) {

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
};

var loadRandomItemsData = function (callback) {
    document.querySelectorAll('._random').forEach(function (elem) {

        // data from element
        var tmp = elem.dataset.template,
            params = elem.dataset.params ? JSON.parse(elem.dataset.params) : null;

        // gets the words in between the [[ ]], trims them and adds them to an array
        var indices = indexesOf(tmp, /\[\[|\]\]/g);
        var indicesStart = indices['[['];
        var indicesEnd = indices[']]'];
        var numReplacementsNeeded = Math.min(indicesStart.length, indicesEnd.length);

        // setup/add to collectionsToLoad
        for (var i = 0; i < numReplacementsNeeded; i++) {
            var collection = tmp.substring(indicesStart[i] + 2, indicesEnd[i]).trim();
            appendToCollectionsToLoad(collection);
        }
        if (params && params.collections) {
            for (var i = 0; i < params.collections.length; i++) {
                appendToCollectionsToLoad(params.collections[i]);
            }
        }

        // load collections
        loadAllCollections(function () {
            callback();
        });
    });
};

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

document.addEventListener('DOMContentLoaded', function () {
    loadRandomItemsData(function () {
        replaceRandomItemsWithData();
    });
});