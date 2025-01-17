
		var startTime=0;
		var maxTime=88;
		var trialCnt=0;
		var maxTrials=65;
		var context;
		var loop;
		var idx=0;
		var holder=0;
		var round=1;
		var keysDown = {};

		var MAX_LOW_RANK = 20;
		var MAX_MED_RANK = 50;



		var playerScoreLocations = {
			3 : {
				1 : [0,180],
				2 : [340,540],
				3: [750,180]
			}
		}


		var getKeyPress = function(e) {

			if (e.keyCode == 49 || e.keyCode == 50) {
				keysDown[e.keyCode] = true;
			}
		}

		var updateScore = function(playerAmount, player, score) {
			var playerName = 'player' + player;
			playerStats[playerName].score += score;

			if (context.font = "40px Arial") {
				context.font = "26px Arial";
			}

			var [scoreX, scoreY] = playerScoreLocations[playerAmount][player]
			context.fillText(`Score: `+ playerStats[playerName].score,scoreX,scoreY);
		};

		var updateRank = function(player, rank) {
			var playerName = 'player' + player;
			playerStats[playerName].rank = rank;

			if (context.font = "40px Arial") {
				context.font = "26px Arial";
			}
			context.fillText(`Rank: `+ playerStats[playerName].rank,0,180);
		};

		var getBallProbability = function(src, target) {
			var srcRank = src.rank;
			var targetRank = target.rank;

			if (srcRank <= MAX_LOW_RANK) {
				return {0.48 : 0.26};
			}

			if (srcRank > MAX_LOW_RANK && srcRank <= MAX_MED_RANK) {
				if (targetRank < srcRank) {
					return {0.33 : 0.17}
				}

				if (targetRank == srcRank) {
					return {0.33 : 0.33}
				}

				if (targetRank > srcRank) {
					return {0.33 : 0.16}
				}
				
			}

			if (srcRank > MAX_MED_RANK) {
				if (targetRank < srcRank) {
					return {0.08 : 0.22}
				}

				if (targetRank >= srcRank) {
					return {0.08 : 0.7}
				}
			}


		}



		var throw1to2 = new Array();
		var basePath = "imgs/3/1to2/1to2-";
		for (var i=1; i<9; i++) {
			var img = new Image();
			img.src = basePath + i + '.bmp';
			throw1to2.push(img);
		}


		var throw1to3 = new Array();
		var basePath = "imgs/3/1to3/1to3-";
		for (var i=1; i<10; i++) {
			var img = new Image();
			img.src = basePath + i + '.bmp';
			throw1to3.push(img);
		}

		var throw2to3 = new Array();
		var basePath = "imgs/3/2to3/2to3-";
		for (var i=1; i<8; i++) {
			var img = new Image();
			img.src = basePath + i + '.bmp';
			throw2to3.push(img);
		}

		var throw2to1 = new Array();
		var basePath = "imgs/3/2to1/2to1-";
		for (var i=1; i<8; i++) {
			var img = new Image();
			img.src = basePath + i + '.bmp';
			throw2to1.push(img);
		}

		var throw3to1 = new Array();
		var basePath = "imgs/3/3to1/3to1-";
		for (var i=1; i<10; i++) {
			var img = new Image();
			img.src = basePath + i + '.bmp';
			throw3to1.push(img);
		}

		var throw3to2 = new Array();
		var basePath = "imgs/3/3to2/3to2-";
		for (var i=1; i<9; i++) {
			var img = new Image();
			img.src = basePath + i + '.bmp';
			throw3to2.push(img);
		}

		var start = new Array();
		var img = new Image();
		img.src = "imgs/start/start.bmp";
		start.push(img)


		var path = [throw1to2, throw2to3, throw3to2, throw2to3, throw3to1, throw1to3, throw3to1, throw1to2, throw2to1];
		var currPath=0;	
		var imgSet = start;


		var paths = [[false,throw1to2,throw1to3],[throw2to1, false, throw2to3],[throw3to1, throw3to2, false]];

		var playerStats = {
			player1: {
				score: 0,
				rank: 0
			},

			player2: {
				score: 0,
				rank: 0
			},

			player3: {
				score: 0,
				rank: 0
			},

			player4: {
				score: 0,
				rank: 0
			},

			player5: {
				score: 0,
				rank: 0
			},

			player6: {
				score: 0,
				rank: 0
			},
			player7: {
				score: 0,
				rank: 0
			}
		}


		function init() {
			var canvas = document.getElementById('canvas');
			context = canvas.getContext('2d');

			round=1;
			playRound();

		}


		function playRound() {
			idx=0;
			holder=0;
			trialCnt=0;
			roundLabel = "Round " + round;
			startTime = new Date();
			imgSet = start;
			showImg();
			context.font = "40px Arial";
			context.fillText(roundLabel,350,30);
			
			

			loop = setInterval(showImg,100);		
			//setInterval(throwBall,1000);
		}
	
		function throwBall() {
	
			var throwFrom = holder;		
			var throwTo;

			if (holder==0) {

				if (new Date()-startTime > 2000) {
					holder=1;
					startTime = new Date();
					return;
				}
				return;
			} else
			if (holder==2) {
					addEventListener("keydown",getKeyPress);
					if (49 in keysDown) {
						throwTo=1;
					}
					else if (50 in keysDown) {
						throwTo=3;
					} else {	
						return;
					}	
					
					removeEventListener("keydown",getKeyPress);

					keysDown={};	
						
			}
			else {
				var wait = trialCnt==0 ? 200 : randomFromTo(500,3500);
				var ct = new Date();
				while (new Date() - ct < wait) { };
				keysDown={};
				
				var ft = (round==2 && trialCnt>8) ? ftval : 0

				var throwChoice = Math.random() - ft;
				if (throwChoice<0.5) {
					throwTo = holder==1 ? 3 : 1;
				} else {
					throwTo=2;
				};
			}
			holder = throwTo;
			
			switch (holder) {
				case 1:
					updateScore(3, 1, 5);
				case 2:
					updateScore(3, 2, 5);
					break;
				case 3:
					updateScore(3, 3, 5);
					break;			
				default:
					break;
			}
			trialCnt++;
			keysDown={};
			imgSet=paths[throwFrom-1][throwTo-1];
			idx=0;
		}



		function showImg() {
			if (idx>=imgSet.length) { 
				idx=imgSet.length-1; 
				throwBall();
			} else {

			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(imgSet[idx],100,0,600,380);
			writeNames();
			context.restore();
			}
			idx++;
			if (holder==2 && idx>3) {
				addEventListener("keydown",getKeyPress);
			}
		
			if (new Date()-startTime > maxTime*1000 || trialCnt > maxTrials) {
				clearInterval(loop);
				if (round==1) { 
					round++; holder=0; playRound(); 
				} else {
					flip();
				}
				
			}
		}	


		function writeNames() {
			context.font = "26px Arial";
			context.fillText(player2 + ' (Me)',340,450);
			context.fillText(player1,0,150);
			context.fillText(player3,750,150);

			// context.fillStyle = 'black';
			context.fillText(`Score: `+ playerStats.player1.score,0,180);
			context.fillText(`Rank: ` + playerStats.player1.rank,0,210);
			context.fillText(`Score:` + playerStats.player3.score,750,180);
			context.fillText(`Rank: ` + playerStats.player3.rank,750,210);
			context.fillText(`Rank: ` + playerStats.player2.rank,340,540);
			context.fillText(`Score: ` + playerStats.player2.score,340,510);
			context.fillStyle = 'red';

		}


function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }



