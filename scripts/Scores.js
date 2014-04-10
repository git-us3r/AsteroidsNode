EXPD.Scores = (function(){
	
	var CurrentScore
		, LivesRemaining
		, LivesMax;
	

	function create(_CurrentScore, _LivesRemaining, _LivesMax){
		
		CurrentScore = _CurrentScore || 0,
		LivesRemaining = _LivesRemaining || 0,
		LivesMax = _LivesMax || 0;
	}


	
	function currentLife(){
		
		return LivesRemaining;
	}
	
	
	function updateScore(amt){

		CurrentScore += amt;
	}
	
	
	
	function updateLife(val){
		
		LivesRemaining += val;			
		
	}



	function getSessionScores(){

		return {
			CurrentScore : CurrentScore,
			LivesRemaining : LivesRemaining
		};
	}
	
	
	
	function renderScores(){
		
		
		var locations = {
			
			score : {x: 200, y : 50}, 
			lives : {x: 50, y : 50}
			
		};
		
		EXPD.context.save();
		
		EXPD.context.font = '20pt Arial';
		EXPD.context.translate(locations.lives.x, locations.lives.y);
		EXPD.context.fillText('LIV3S ' + LivesRemaining, 0, 0);
		
		EXPD.context.restore();
		EXPD.context.save();
		
		EXPD.context.translate(locations.score.x, locations.score.y);
		EXPD.context.font = '20pt Arial';
		EXPD.context.fillText('SCORE ' + CurrentScore, 0, 0);
		
		
		EXPD.context.restore();
		
	}



		// or exports
	return {

		Create : create,
		UpdateScore : updateScore,
		UpdateLife : updateLife,
		GetSessionScores : getSessionScores,
		RenderScores : renderScores,
		CurrentLife : currentLife
		
	};

}());