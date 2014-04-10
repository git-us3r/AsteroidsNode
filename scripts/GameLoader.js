var EXPD = {
	images : {},
	screens : {},
	sounds : {},

	status : {
		preloadRequest : 0,
		preloadComplete : 0
	}
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
	console.log('Loading resources...');

	EXPD.audioExt = '';
	//
	// Find out which kind of audio support we have
	if (Modernizr.audio.mp3 === 'probably') {
		console.log('We have MP3 support');
		EXPD.audioExt = 'mp3';
	}
	else if (Modernizr.audio.wav === 'probably') {
		console.log('We have WAV support');
		EXPD.audioExt = 'wav';
	}

	Modernizr.load([
		{
			load : [
				'preload!scripts/Vector2d.js',
				'preload!scripts/random.js',
				'preload!scripts/Spec.js',
				'preload!scripts/Inert.js',
				'preload!scripts/Missile.js',
				'preload!scripts/Ship.js',
				'preload!scripts/Asteroid.js',
				'preload!scripts/keyboard.js',
				'preload!images/ship.png',
				'preload!images/cartoonishBigRockPurp.png',
				'preload!images/cartoonishMedRockPurp.png',
				'preload!images/cartoonishSmallRockPurp.png',
				'preload!images/FireBall.png',
				'preload!images/fireBig.png',
				'preload!images/smoke.png',
				'preload!images/cartoonishBubble.png',
				'preload!images/plasmaCenterFlash.png',
				'preload!images/friendlyExplosionFlash.png',
				'preload!images/plasma.png',
				'preload!images/cartoonishBubble.png',
				'preload!images/commet.png',
				'preload!scripts/Scores.js',
				'preload!scripts/particle-system-exp.js',
				'preload!scripts/Explosion.js',
				'preload!scripts/ExplosionFactory.js',
				'preload!scripts/CollisionDetector.js',
				'preload!scripts/AsteroidsGame.js',
				'preload!scripts/game.js',
				'preload!scripts/mainmenu.js',
				'preload!scripts/highscores.js',
				'preload!scripts/help.js',
				'preload!scripts/about.js',
				'preload!sounds/gameSounds/gamePlay.' + EXPD.audioExt,
				'preload!sounds/gameSounds/explosion.' + EXPD.audioExt,
				'preload!sounds/gameSounds/lazer.' + EXPD.audioExt,
				'preload!sounds/gameSounds/teleport.' + EXPD.audioExt
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);

//
// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	EXPD.status.preloadRequest += 1;

	// SOUNDS
	var isSound = /.+\.(mp3|wav)$/i.test(resource.url);
	//resource.noexecSound = isSound;
	// IMAGES
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);

	resource.noexecImage = isImage || isSound;
	
	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			EXPD.images[resource.url] = image;
		}
		else if (isSound) {
			var sound = new Audio(resource.url);
			console.log(resource.url);
			EXPD.sounds[resource.url] = sound;
		}


		
		EXPD.status.preloadComplete += 1;
		//console.log(EXPD.status);
		
		//
		// When everything has finished preloading, go ahead and start the EXPD
		if (EXPD.status.preloadComplete === EXPD.status.preloadRequest) {
			console.log('Preloading complete!');
			EXPD.game.initialize();
		}
	};
	
	return resource;
});




//
// Extend yepnope with a 'preload-noexec' prefix that loads a script, but does not execute it.  This
// is expected to only be used for loading .js files.
yepnope.addPrefix('preload-noexec', function(resource) {
	console.log('preloading-noexec: ' + resource.url);
	resource.noexec = true;
	return resource;
});
