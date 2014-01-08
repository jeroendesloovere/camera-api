/**
 * Camera API Test
 *
 * @author Jeroen Desloovere <jeroen@siesqo.be>
 */
cameraAPITest =
{
	init: function()
	{
		// start camera API
		cameraAPI.start();

		// bind click to 'take picture' button
		$('#btnTakePicture').on('click', function()
		{
			// take picture
			cameraAPI.takePicture(0, 0, 640, 480);
		});

		// bind click to stop
		$('#btnStop').on('click', function()
		{
			// stop capturing
			cameraAPI.stop();
		});
	}
}

$(cameraAPITest.init);
