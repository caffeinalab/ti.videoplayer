var args = arguments[0] || {};
var playing = false;

$.videoPlayer.url = args.url;

// Auto get the thumbnail
if (args.thumbnail == null) {
	$.thumbnailCover.backgroundColor = '#000';
	$.videoPlayer.requestThumbnailImagesAtTimes([8], Titanium.Media.VIDEO_TIME_OPTION_NEAREST_KEYFRAME, function(e) {
		if (e.success) {
			$.thumbnailCoverImg.image = e.image;
		}
	});
} else {
	$.thumbnailCover.backgroundColor = 'transparent';
	$.thumbnailCoverImg.image = args.thumbnail;
}

$.videoPlayer.mediaControlStyle = args.controls ? Ti.Media.VIDEO_CONTROL_DEFAULT : Ti.Media.VIDEO_CONTROL_NONE;
$.videoPlayer.autoplay = args.autoplay;

if (args.onlyFullscreen) {
	$.videoPlayer.mediaControlStyle = Ti.Media.VIDEO_CONTROL_DEFAULT;
}

if (args.width < 200) {
	$.playButton.width = 50;
}

// Init

$.main.applyProperties(_.pick(args, 'width', 'height', 'top', 'left', 'right', 'bottom', 'borderWidth', 'borderColor', 'backgroundColor'));

$.main.addEventListener('singletap', function(e) {
	if (args.onlyFullscreen) {
		$.videoPlayer.fullscreen = true;
		$.videoPlayer.play();
	} else {
		$.thumbnailCoverImg.image = null;
		$.playButton.opacity = ~~playing;
		$.videoPlayer[ playing ? 'pause' : 'play' ]();
		playing = !playing;
	}
});