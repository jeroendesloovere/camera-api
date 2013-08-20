/**
 * jsFrontend Camera API
 *
 * @author Jeroen Desloovere <jeroen@siesqo.be>
 */
jsFrontendCameraAPI =
{
	prefix: false,
	canvas: false,
	context: false,
	videoObject: false,
	init: function()
	{
		// get prefixes
		var prefixes = ['webkit'/*, 'moz', 'ms', 'o'*/];

		// if 'getUserMedia' is natively supported just use it
		if(navigator.getUserMedia) jsFrontendCameraAPI.prefix = '';

		// not natively supported
		else
		{
			// loop over all the known prefixes until we find one
			for(var i = 0; i < prefixes.length; i++)
			{
				if(navigator[prefixes[i] + 'GetUserMedia'])
				{
					jsFrontendCameraAPI.prefix = prefixes[i];
				}
			}
		}

		// browser doesn't support getUserMedia API
		if(!jsFrontendCameraAPI.prefix) return false;
	},

	/**
	 * Start capturing video footage
	 */
	start: function()
	{
		// init prefix
		var prefix = jsFrontendCameraAPI.prefix;

		// getUserMedia not supported, stop here
		if(!prefix) return false;

		// define variables
		jsFrontendCameraAPI.canvas = document.getElementById('canvas');
		jsFrontendCameraAPI.context = canvas.getContext('2d');
		jsFrontendCameraAPI.video = document.getElementById('video');
		jsFrontendCameraAPI.videoObject = {'video': true};
		errBack = function(error) {
			console.log('Video capture error: ', error.code); 
		};

		// execute getUserMedia for webkit-browsers
		if(prefix === 'webkit')
		{
			navigator[prefix + 'GetUserMedia'](jsFrontendCameraAPI.videoObject, function(stream){
				jsFrontendCameraAPI.stream = stream;
				jsFrontendCameraAPI.video.src = window.webkitURL.createObjectURL(stream);
				jsFrontendCameraAPI.video.play();
			}, errBack);
		}

		// natively supported
		else
		{
			navigator.getUserMedia(jsFrontendCameraAPI.videoObject, function(stream) {
				jsFrontendCameraAPI.stream = stream;
				jsFrontendCameraAPI.video.src = stream;
				jsFrontendCameraAPI.video.play();
			}, errBack);
		}
	},

	/**
	 * Stop capturing video
	 */
	stop: function()
	{
		jsFrontendCameraAPI.stream.stop();
		jsFrontendCameraAPI.video.src = '';
	},

	/**
	 * Take picture
	 *
	 * @param int x The x-position for the image on the canvas.
	 * @param int y The y-position for the image on the canvas.
	 * @param int width The width for the image.
	 * @param int height The height for the image.
	 */
	takePicture: function(x, y, width, height)
	{
		// stop here when not activated yet
		if(!jsFrontendCameraAPI.video) return false;

		// draw picture of video footage
		jsFrontendCameraAPI.context.drawImage(jsFrontendCameraAPI.video, x, y, width, height);
	}
}

$(jsFrontendCameraAPI.init);
