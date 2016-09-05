// Disable the mobile nav button from doing anything!
document.getElementById('js-menu').addEventListener('click', function(e){
	e.preventDefault();
});

// Send events to Google Analytics when link clicked
document.addEventListener('click', function(e){
  if (e.target.nodeName == 'A') {
    ga('send', 'event', 'link', 'clicked', e.target.innerText);
  }
});

// Expanding project challenges
var challenges = document.getElementsByClassName('js-challenges');
for (var i = 0; i < challenges.length; i++) {
	challenges[i].addEventListener('click', function(e){
		if (e.target.nodeName !== 'A') {
			this.classList.toggle('open');

      // Send event to Google Analytics when expanded
      var projectName = getProjectName(e.target);
      if (projectName) {
        ga('send', 'event', 'project', 'expand', projectName);
      }
		}
	});
}

// -----------------
// Helper functions!
function getProjectName(el) {
  var regexpClassNames = /js-challenges.*open/;

  if (el.className.match(regexpClassNames)) {
    return getLinkText(el);
  }
  else if (el.parentNode.className.match(regexpClassNames)) {
    return getLinkText(el.parentNode);
  }
  else {
    return false;
  }
}

function getLinkText(el) {
  return el.getElementsByTagName('a')[0].innerText;
}
