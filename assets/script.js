console.log('TapTapKaboom me 👊👊💥');

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
var data = JSON.parse(document.querySelector('#_json').dataset.json);
var words = document.querySelector('#_words');
data.words.forEach(function(word) {
	console.log('words', words);
	var elem = document.createElement('li');
	elem.innerHTML = word;
	words.appendChild(elem);
  console.log('word: ', word);
})
