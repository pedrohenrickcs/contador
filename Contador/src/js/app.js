'use strict';

var self = this,
	endDate = 'December 15, 2017';

this.init = function() {
	this.refreshAndDisplay();
};

// contador Festa
this.refreshAndDisplay = function() {
	var $countdown = $('.contador'),
		$days = $countdown.find('.days'),
		$hours = $countdown.find('.hours'),
		$minutes = $countdown.find('.minutes'),
		$seconds = $countdown.find('.seconds'),
		timeRemaining = self.calculate(endDate);

	$days.find('span').text(timeRemaining.days);
	$hours.find('span').text(timeRemaining.hours);
	$minutes.find('span').text(timeRemaining.minutes);
	$seconds.find('span').text(timeRemaining.seconds);

	setTimeout(self.refreshAndDisplay, 1000);
};

this.calculate = function(endDate) {
	var today = Date.parse(new Date()),
		finalDate = Date.parse(endDate),
		total = finalDate - today,
		seconds = Math.floor( (total/1000) % 60 ),
		minutes = Math.floor( (total/(1000*60)) % 60 ),
		hours = Math.floor( (total/(1000*60*60)) % 24 ),
		days = Math.floor( (total/(1000*60*60*24)) ),
		timeRemaining = {
			'days': days >= 0 ? days : 0,
			'hours': hours >= 0 ? hours : 0,
			'minutes': minutes >= 0 ? minutes : 0,
			'seconds': seconds >= 0 ? seconds : 0
		};
	return timeRemaining;
};
// end contador Festa

this.init();