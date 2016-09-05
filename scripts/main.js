/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	// Disable the mobile nav button from doing anything!
	document.getElementById('js-menu').addEventListener('click', function (e) {
	  e.preventDefault();
	});

	// Send events to Google Analytics when link clicked
	document.addEventListener('click', function (e) {
	  if (e.target.nodeName == 'A') {
	    ga('send', 'event', 'links', 'clicked', e.target.innerText);
	  }
	});

	// Expanding project challenges
	var challenges = document.getElementsByClassName('js-challenges');
	for (var i = 0; i < challenges.length; i++) {
	  challenges[i].addEventListener('click', function (e) {
	    if (e.target.nodeName !== 'A') {
	      this.classList.toggle('open');

	      // Send event to Google Analytics when expanded
	      var projectName = getProjectName(e.target);
	      if (projectName) {
	        ga('send', 'event', 'project', 'toggleVisibility', projectName);
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
	  } else if (el.parentNode.className.match(regexpClassNames)) {
	    return getLinkText(el.parentNode);
	  } else {
	    return false;
	  }
	}

	function getLinkText(el) {
	  return el.getElementsByTagName('a')[0].innerText;
	}

/***/ }
/******/ ]);