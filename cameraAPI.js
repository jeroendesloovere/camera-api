/**
 * Camera API
 *
 * @author Jeroen Desloovere <jeroen@siesqo.be>
 */
cameraAPI =
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
		if(navigator.getUserMedia) cameraAPI.prefix = '';

		// not natively supported
		else
		{
			// loop over all the known prefixes until we find one
			for(var i = 0; i < prefixes.length; i++)
			{
				if(navigator[prefixes[i] + 'GetUserMedia'])
				{
					cameraAPI.prefix = prefixes[i];
				}
			}
		}

		// browser doesn't support getUserMedia API
		if(!cameraAPI.prefix) return false;
	},

	/**
	 * Start capturing video footage
	 */
	start: function()
	{
		// init prefix
		var prefix = cameraAPI.prefix;

		// getUserMedia not supported, stop here
		if(!prefix) return false;

		// define variables
		cameraAPI.canvas = document.getElementById('canvas');
		cameraAPI.context = canvas.getContext('2d');
		cameraAPI.video = document.getElementById('video');
		cameraAPI.videoObject = {'video': true};
		errBack = function(error) {
			console.log('Video capture error: ', error.code); 
		};

		// execute getUserMedia for webkit-browsers
		if(prefix === 'webkit')
		{
			navigator[prefix + 'GetUserMedia'](cameraAPI.videoObject, function(stream){
				cameraAPI.stream = stream;
				cameraAPI.video.src = window.webkitURL.createObjectURL(stream);
				cameraAPI.video.play();
			}, errBack);
		}

		// natively supported
		else
		{
			navigator.getUserMedia(cameraAPI.videoObject, function(stream) {
				cameraAPI.stream = stream;
				cameraAPI.video.src = stream;
				cameraAPI.video.play();
			}, errBack);
		}
	},

	/**
	 * Stop capturing video
	 */
	stop: function()
	{
		cameraAPI.stream.stop();
		cameraAPI.video.src = '';
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
		if(!cameraAPI.video) return false;

		// draw picture of video footage
		cameraAPI.context.drawImage(cameraAPI.video, x, y, width, height);
	}
}

$(cameraAPI.init);
