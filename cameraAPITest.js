/**
 * jsFrontend Camera API Test
 *
 * @author Jeroen Desloovere <jeroen@siesqo.be>
 */
jsFrontendCameraAPITest =
{
	init: function()
	{
		// start camera API
		jsFrontendCameraAPI.start();

		// bind click to 'take picture' button
		$('#btnTakePicture').on('click', function()
		{
			// take picture
			jsFrontendCameraAPI.takePicture(0, 0, 640, 480);
		});

		// bind click to stop
		$('#btnStop').on('click', function()
		{
			// stop capturing
			jsFrontendCameraAPI.stop();
		});
	}
}

$(jsFrontendCameraAPITest.init);
