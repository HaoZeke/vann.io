// Disable the mobile nav button from doing anything!
document.getElementById('js-menu').addEventListener('click', function(e){
	e.preventDefault();
});

// Expanding project challenges
var challenges = document.getElementsByClassName('js-challenges');
for (var i = 0; i < challenges.length; i++) {
	challenges[i].addEventListener('click', function(e){
		if (e.target.nodeName !== 'A') {
			this.classList.toggle('open');
		}
	});
}
