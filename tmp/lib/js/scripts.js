/* Google Analytics */

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-25663615-1']);
	_gaq.push(['_trackPageview']);

	(function() {
	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

/* Safari Small Caps

This script fixes a WebKit bug that prevents web fonts from being displayed correctly when small caps are applied.
From: https://github.com/pihvi/SafariSmallCapsWebFontFix (slightly modified - changed front-size to 80%)
Bug: http://code.google.com/p/chromium/issues/detail?id=46931*/

	function needsFix(){return $.browser.webkit&&$.browser.version.split(".")[0]<534}function iterateAllElements(){$("body *").filter(function(){return $(this).css("font-variant")=="small-caps"}).each(function(){console.log("Apply small-caps web font fix for: "+this);applyFix($(this))})}function applyFix(a){a.css("font-variant","normal");a.html(wrapLowerCharsWithTag(a.text(),"small"))}function wrapLowerCharsWithTag(a,b){var c="";var d=false;$.each(a,function(a,e){var f=isLower(e);if(f&&!d){c+="<"+b+" style='font-size:80%;text-transform:uppercase;'>";d=true}if(!f&&d){c+="</"+b+">";d=false}c+=e});if(d){return c+="</"+b+">"}else{return c}}function isLower(a){return a.toUpperCase()!=a}$(function(){if(needsFix()){iterateAllElements()}})