#maxlength.js

Limits the number of characters a <code>textarea</code> should allow. The default <code>maxlength</code> attribute of <code>textarea</code> counts multiple consecutive spaces entered by mistake, when this text is shown as html, only one space is visible, rests are ignored. This plugin counts multiple consecutive spaces as one, the way it should be, the way default <code>maxlength</code> should work.

##Dependency

1. jQuery 1.7+

##Usage

	<textarea maxlength="100" cols="30" rows="10"></textarea>

or in detail:

	<textarea cols="30" rows="10"
			  maxlength="150"
			  data-info-pane="character-count"
			  data-message-format="Used {used} of {total}; Remaining {remaining}"></textarea>

	<span class="character-count"></span> // Used 10 of 150; Remaining 140

####Example
http://jsbin.com/lutuxaki/5
