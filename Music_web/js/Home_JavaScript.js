$(window).scroll(function() {
	if ($(document).scrollTop() > 200) {
		$('nav').addClass('shrink');
	} else {
		$('nav').removeClass('shrink');
	}
});

$(window).scroll(function() {
	if ($(document).scrollTop() > 300) {
		$('.banner_text i').css("display", "none");
	} else {
		$('.banner_text i').css("display", "block");
	}
});



// Grab ID of audio player
var podcastAudio = document.getElementById('podcast-audio');

// Grab ID of play button
var playBtn = document.getElementById('podcast-play');

// Grab ID of pause button
var pauseBtn = document.getElementById('podcast-pause');

// Play audio & show pause btn
var playShow = function() {
  podcastAudio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
};

// Pause audio & show play btn
var pauseShow = function() {
  podcastAudio.pause();
  playBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
};