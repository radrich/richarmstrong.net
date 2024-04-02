var dropCookie = true;
var cookieDuration = 14;
var cookieName = 'ttkbCookies';
var cookieValue = 'yup';
 
function createBanner(){
  var bodytag = document.getElementsByTagName('body')[0];
  var div = document.createElement('div');
  div.setAttribute('id','cookieLaw');
  div.setAttribute('class','banner-cookies');
  div.innerHTML = '<div class="content"><p>Rich Armstrong uses cookies 🍪 If you continue, you\'re saying you\'re okay with the site using them when you visit. View the <a href="/privacy-policy/" rel="nofollow">privacy policy</a> for more info.</p><a class="cta" href="javascript:void(0);" onclick="removeCookieBanner();"><span>Okay!</span></a></div>';
   
  bodytag.appendChild(div);
  createCookie(window.cookieName,window.cookieValue, window.cookieDuration);
}
 
 
function createCookie (name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000)); 
    var expires = "; expires="+date.toGMTString(); 
  }
  else var expires = "";
  if(window.dropCookie) { 
      document.cookie = name+"="+value+expires+"; path=/"; 
  }
}
 
function checkCookie (name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
 
function removeCookie (name) {
  createCookie(name,"",-1);
}
 
window.onload = function(){
  if(checkCookie(window.cookieName) != window.cookieValue){
    createBanner(); 
  }
}

function removeCookieBanner(){
	var element = document.getElementById('cookieLaw');
	element.parentNode.removeChild(element);
}