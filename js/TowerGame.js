var c ;
var imageList = ["hook","hook2","box1","box2","game_bg_1","game_bg_2",'game_bg2_1','game_bg2_2','0','1','2','3','4','5','6','7','8','9',
				  '02','12','22','32','42','52','62','72','82','92','M','tag','tag2','tag3','tag_2','tag3_2','nowtag','goaltag','nowtag2','goaltag2'] ;
var simpleBoxList = ["box1","box2"] ;
var allBoxList = [] ;
var randomType = 0 ;
var leftTower = [] , rightTower = [] ;
var imageMap = {} ;
var resulotion ;
var width , heigth ;
var ctx ;
var nowPage = 'stage3' ;
var boxList = [] ;
var hasFirstBox = false ;
var isGameOver = false ;
var viewWidth = 1000;
var viewHeight = 750;
var upperBound = 600 ;
var upperBound2 = 550 ;
var reloadTimer ;
var offsetY = 0 ;
var leftMaxY ;
var rightMaxY ;
var hookMoveSpeed = 5 ;
var hookAngleSpeed = 0.02 ;
var hookload = true ;
var FirstEnterPage = true ;
var nextBox ;
var remainTime = 120 ;
var countTimer ;
var nowHeight = 0 ;
var isBoxTouch = false ;
var addHeightTimer ;
var addLeftHeightTimer ;
var addRightHeightTimer ;
var remainHeight ;
var remainLeftHeight ;
var remainRightHeight ;
var goalHeight = 500 ;
var nowLeftHeight ;
var nowRightHeight ;
var isPush = false ;

var lastBox = {
	x : 0 ,
	y : 0 
}
var hook , hookBox ;

var IE = ("ActiveXObject" in window) ;
var pageTimer ; 
var world;

//set all 

var showBlock = function(){
	ctx.fillStyle = 'white' ;
	ctx.fillRect(0, 0, c.width/2-940/2 , c.height);
	ctx.fillRect(c.width-(c.width/2-940/2) , 0, c.width/2-940/2 , c.height);
}

var showTag = function(amount){
	if ( amount === 1 ){
		ctx.drawImage(getImage('tag'),896,706-(706-228)*nowHeight/goalHeight,37,18) ;
		ctx.drawImage(getImage('tag2'),896,680-(706-228)*nowHeight/goalHeight+43,37,(706-228)*nowHeight/goalHeight) ;
		ctx.drawImage(getImage('tag3'),896,723,37,19) ;
	} else if ( amount === 2 ){
		ctx.drawImage(getImage('tag'),898,706-(706-222)*nowRightHeight/goalHeight,35,18) ;
		ctx.drawImage(getImage('tag2'),898,680-(706-222)*nowRightHeight/goalHeight+43,35,(706-222)*nowRightHeight/goalHeight) ;
		ctx.drawImage(getImage('tag3'),898,723,35,19) ;
		ctx.drawImage(getImage('tag_2'),175,706-(706-222)*nowLeftHeight/goalHeight,35,18) ;
		ctx.drawImage(getImage('tag2'),175,680-(706-222)*nowLeftHeight/goalHeight+43,35,(706-222)*nowLeftHeight/goalHeight) ;
		ctx.drawImage(getImage('tag3_2'),175,723,35,19) ;
	}
}

var showNowTag = function(amount){
	if ( amount === 1 ){
		ctx.drawImage(getImage('nowtag'),795,708-(708-228)*nowHeight/goalHeight,95,32) ;
		var base = 835 + (nowHeight.toString().length - 1 ) * 8 ;
		var temp = nowHeight ;
		ctx.drawImage(getImage('M'),base,714-(714-234)*nowHeight/goalHeight,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,714-(714-234)*nowHeight/goalHeight,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	} else if ( amount === 2 ){
		ctx.drawImage(getImage('nowtag'),795,708-(708-222)*nowRightHeight/goalHeight,95,32) ;
		var base = 835 + (nowRightHeight.toString().length - 1 ) * 8 ;
		var temp = nowRightHeight ;
		ctx.drawImage(getImage('M'),base,714-(714-228)*nowRightHeight/goalHeight,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,714-(714-228)*nowRightHeight/goalHeight,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
		ctx.drawImage(getImage('nowtag2'),217,708-(708-222)*nowLeftHeight/goalHeight,95,32) ;
		var base = 270 + (nowLeftHeight.toString().length - 1 ) * 8 ;
		var temp = nowLeftHeight ;
		ctx.drawImage(getImage('M'),base,714-(714-228)*nowLeftHeight/goalHeight,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,714-(714-228)*nowLeftHeight/goalHeight,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	}
}

var showGoalTag = function(amount){
	if ( amount === 1 ){
		ctx.drawImage(getImage('goaltag'),795,228,95,32) ;
		var base = 835 + (goalHeight.toString().length - 1 ) * 8 ;
		var temp = goalHeight ;
		ctx.drawImage(getImage('M'),base,234,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,234,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	} else if ( amount === 2 ){
		ctx.drawImage(getImage('goaltag'),795,222,95,32) ;
		var base = 835 + (goalHeight.toString().length - 1 ) * 8 ;
		var temp = goalHeight ;
		ctx.drawImage(getImage('M'),base,228,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,228,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
		ctx.drawImage(getImage('goaltag2'),217,221,95,32) ;
		base = 270 + (goalHeight.toString().length - 1 ) * 8 ;
		var temp = goalHeight ;
		ctx.drawImage(getImage('M'),base,228,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,228,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	}
}

var showGoalHeight = function(amount){
	if ( amount === 1 ){
		var base = 1005 ; 
		ctx.fillStyle = "#C5453E" ;
		ctx.fillText(goalHeight+' m',base-goalHeight.toString().length*10,210,300,50) ;
	} else if ( amount === 2 ){
		var base = 1020 ; 
		ctx.fillStyle = "#C5453E" ;
		ctx.fillText(goalHeight+' m',base-goalHeight.toString().length*10,183,300,50) ;
		ctx.fillText(goalHeight+' m',base-goalHeight.toString().length*10,355,300,50) ;
	}
}

var showNowHeight = function(amount){
	if ( amount === 1 ){
		var base = 1005 ; 
		ctx.fillStyle = "#28231E" ;
		ctx.fillText(nowHeight+' m',base-nowHeight.toString().length*10,305,300,50) ;
	} else if ( amount === 2 ){
		var base = 1020 ; 
		ctx.fillStyle = "#28231E" ;
		ctx.fillText(nowLeftHeight+' m',base-nowLeftHeight.toString().length*10,255,300,50) ;
		ctx.fillText(nowRightHeight+' m',base-nowRightHeight.toString().length*10,425,300,50) ;
	}
}

var countTime = function(){
	if ( remainTime <= 0 ){
		toGameOver();
	} else {
		remainTime -= 1 ;
	}
}

var showTime = function(amount){
	if ( amount === 1 ){
		var timebase = 975 + (remainTime.toString().length ) * 25 ;
		var temp = remainTime ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10),timebase,400,50,50) ;
			temp = Math.floor(temp/10) ;
			timebase -= 50 ;
			if ( temp === 0 )
				break ;
		}
	}else if ( amount === 2 ){
		var timebase = 975 + (remainTime.toString().length ) * 25 ;
		var temp = remainTime ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10),timebase,508,50,50) ;
			temp = Math.floor(temp/10) ;
			timebase -= 50 ;
			if ( temp === 0 )
				break ;
		}
	}
}

var randomBox = function(){
	if ( randomType === 0 ){
		nextBox = simpleBoxList[Math.floor(Math.random() * simpleBoxList.length)] ;
	}
}

var showNext = function(amount){
	if ( amount === 1 )
		ctx.drawImage(getImage(nextBox),975,570,100,100) ;
	else if ( amount === 2 )
		ctx.drawImage(getImage(nextBox),975,638,100,100) ;
}

var createBox = function(type,inX,inY,inWidth,inHeight,inTreatment,inView){
	return Physics.body(type,{x: inX , y: inY , width: inWidth , height: inHeight , treatment: inTreatment , view: inView });
}

var makeImage = function(source){
	var img = new Image();
	img.src = "img/" + source + '.png' ;
	imageMap[source] = img ;
}

var makeAllImage = function(){
	for ( var i = 0 ; i < imageList.length ; i ++ ){
		makeImage(imageList[i]) ;
	}
}

var getImage = function(source){
	return imageMap[source] ;
}

var drawBody = function( body, view, ctx, offset ){
	var pos = body.state.pos
		,os = body.offset
		,v = body.state.vel
		,t = this._interpolateTime || 0
		,x
		,y
		,ang
		,aabb
		;

	offset = offset || this.options.offset;

	x = pos._[0] + offset.x + v._[0] * t;
	y = pos._[1] + offset.y + v._[1] * t;
	ang = body.state.angular.pos + body.state.angular.vel * t;

	ctx.save();
	ctx.translate( x, y );
	ctx.rotate( ang );
	ctx.translate( os._[0], os._[1] );
	ctx.drawImage(view, -view.width/2, -view.height/2, view.width, view.height);
	ctx.restore();
}

var init = function(){
	makeAllImage();
	SlEEPBAG.canvasAutoResizer.load(function(self){
		self.canvasWidth = 1285;
		self.canvasHeight = 750;
		var gameArea = self.getGameArea();
		document.body.appendChild(gameArea); 
	});
	c = SlEEPBAG.canvasAutoResizer.getGameCanvas();
	resulotion = SlEEPBAG.canvasAutoResizer.getResolution();
	width = c.width , height = c.height ;
	ctx = c.getContext("2d");
	world = Physics(function(world){
		var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight * 2);
		Physics.util.ticker.on(function( time, dt ){
		  world.step( time );
		});

		Physics.util.ticker.start();

		world.add( 
			[
				Physics.behavior('edge-collision-detection', {
				  aabb: viewportBounds,
				  restitution: 0
				}),
				Physics.behavior('body-impulse-response'),
				Physics.behavior('constant-acceleration',{
					acc: { x : 0, y: 0.0004 } 
				}),
				Physics.behavior('body-collision-detection'),
				Physics.behavior('sweep-prune')
			]
		);
	});
	resetAll(true);
	pageTimer = setInterval(changePage,20); 
}

var resetAll = function(spin){
	nowHeight = 0 ;
	nowLeftHeight = 0 ;
	nowRightHeight = 0;
	remainHeight = 0 ;
	remainLeftHeight = 0 ;
	remainRightHeight = 0 ;
	hasFirstBox = false ;
	offsetY = 0 ;
	hook = createBox('rectangle',viewWidth / 2,50,0,0,"static",getImage("hook")) ;
	hook.state.angular.pos = Math.PI / 2 ;
	hookBox = createBox('rectangle',0,0,100,100,"static",getImage("box1")) ;
	hookBox.restitution = 0 ;
	hookBox.cof = 3 ;
	hookBox.label = 'box' ;
	world.add(hook);
	world.add(hookBox);
	FirstEnterPage = true ;
	countTimer = setInterval(countTime,1000);
}

var initFirstBox = function(amount){
	if ( hasFirstBox === true )
		return ;
	if ( amount === 1 ){
		var box = createBox('rectangle',viewWidth / 2 + 50 ,viewHeight - 50,100,100,"static",getImage("box1")) ;
		world.add(box);
		boxList.push(box) ;
		hasFirstBox = true ;
	} else if ( amount === 2 ){
		var box = createBox('rectangle',420,viewHeight - 50,100,100,"static",getImage("box1")) ;
		world.add(box);
		boxList.push(box) ;
		box = createBox('rectangle',680,viewHeight - 50,100,100,"static",getImage("box1")) ;
		world.add(box);
		boxList.push(box) ;
		hasFirstBox = true ;
		leftMax = boxList[1] ;
		rightMax = boxList[2] ;
	}
}

var addFloor = function(){
	if ( hasFirstBox === true )
		return ;
	var box = createBox('rectangle',0,viewHeight + 5 ,viewWidth * 3,10,"static",getImage("box1")) ;
	box.hide = true ;
	world.add(box);
	boxList.push(box) ;
}

var moveUp = function(amount){
	if ( amount === 1 ){
		upperBound = 600 ;
	} else if ( amount === 2 ){
		upperBound = 550 ;
	}
	if ( boxList[boxList.length-1].state.pos.y <= upperBound && boxList[boxList.length-1].state.vel.y === 0 ){
		for ( var i = 0 ; i < boxList.length ; i ++ ){
			boxList[i].treatment = 'static' ;
		}
		for ( var i = 0 ; i < boxList.length ; i ++ ){
			boxList[i].state.pos.y += 2  ;
		}
		for ( var i = 0 ; i < boxList.length ; i ++ ){
			if (  viewHeight - boxList[i].state.pos.y > boxList[i].geometry.height  )
				boxList[i].treatment = 'dynamic' ;
		}
		offsetY += 2 ;
	} 
}

var drawHook = function(spin){
	if ( hookload === true ){
		if ( spin === false ){
			hookBox.state.pos.y = hookBox.geometry.height + hook.state.pos.y ;
			hookBox.state.pos.x = hook.state.pos.x ;
		} else {
			hookBox.state.pos.y = (hookBox.geometry.height) * Math.sin(hookBox.state.angular.pos) + hook.state.pos.y  ;
			hookBox.state.pos.x = (hookBox.geometry.height) * Math.cos(hookBox.state.angular.pos) + hook.state.pos.x;
			hookBox.state.angular.pos = hook.state.angular.pos ;
		}
		drawBody(hookBox,hookBox.view,ctx,hookBox.offset);
	}
	drawBody(hook,hook.view,ctx,hook.offset);
}

var moveHook = function(spin){
	if ( spin === false ){
		hook.state.pos.x += hookMoveSpeed ;
		if ( hook.state.pos.x >= viewWidth - 200 || hook.state.pos.x <= 300 )
			hookMoveSpeed *= -1 ;
	} else {
		hook.state.pos.x += hookMoveSpeed ;
		hook.state.angular.pos += hookAngleSpeed ;
		if ( hook.state.pos.x >= viewWidth - 200 || hook.state.pos.x <= 300 )
			hookMoveSpeed *= -1 ;
		if ( hook.state.angular.pos >= 2 || hook.state.angular.pos <= 1 )
			hookAngleSpeed *= -1 ;
	}
}

var toGameOver = function(){
	isGameOver = true ;
	ctx.fillText("GAMEOVER",100,150,1000,100) ;
	clearTimeout(countTimer);
	clearTimeout(addHeightTimer);
	clearTimeout(addLeftHeightTimer);
	clearTimeout(addRightHeightTimer);
}

var addHeight = function(){
	if ( isGameOver === false ){
		if ( remainHeight > 0 ){
			nowHeight += 1 ;
			remainHeight -= 1 ;
		} else {
			clearTimeout(addHeightTimer) ;
		}
	}
}

var addLeftHeight = function(){
	if ( isGameOver === false ){
		if ( remainLeftHeight > 0 ){
			nowLeftHeight += 1 ;
			remainLeftHeight -= 1 ;
		} else {
			clearTimeout(addLeftHeightTimer) ;
		}
	}
}

var addRightHeight = function(){
	if ( isGameOver === false ){
		if ( remainRightHeight > 0 ){
			nowRightHeight += 1 ;
			remainRightHeight -= 1 ;
		} else {
			clearTimeout(addRightHeightTimer) ;
		}
	}
}

var boxTouch = function(amount){
	if ( isBoxTouch === false ){
		if ( amount === 1 ){
			if ( boxList.length <= 2 )
				return ;
			if ( boxList[boxList.length-1].state.pos.y >= hookBox.state.pos.y + hookBox.geometry.height && boxList[boxList.length-1].state.vel.y === 0 && boxList[boxList.length-1].state.angular.vel === 0 ){
				var total = 0 ;
				for ( var i = 2 ; i < boxList.length ; i ++ )
					total += boxList[i].geometry.height ;
				remainHeight = total - nowHeight ;
				addHeightTimer = setInterval(addHeight,20) ;
				isBoxTouch = true ;
			}
		} else if ( amount === 2 ){
			if ( boxList.length <= 3 )
				return ;
			if ( isPush === false ){
				if ( Math.abs(boxList[boxList.length-1].state.pos.x - leftMax.state.pos.x) <= Math.abs(boxList[boxList.length-1].state.pos.x - rightMax.state.pos.x) ){
					leftMax = boxList[boxList.length-1] ;
					leftTower.push(leftMax) ;
				} else {
					rightMax = boxList[boxList.length-1] ;
					rightTower.push(rightMax) ;
				}
				isPush = true ;
			}
			if ( leftTower.length > 0 && leftTower[leftTower.length-1].state.pos.y >= hookBox.state.pos.y + hookBox.geometry.height && leftTower[leftTower.length-1].state.vel.y === 0 && leftTower[leftTower.length-1].state.angular.vel === 0   ){
				var totalLeft = 0  ;
				for ( var i = 0 ; i < leftTower.length ; i ++ )
					totalLeft += leftTower[i].geometry.height ;
				remainLeftHeight = totalLeft - nowLeftHeight ;
				addLeftHeightTimer = setInterval(addLeftHeight,20) ;
				isBoxTouch = true ;
			} 
			if ( rightTower.length > 0 && rightTower[rightTower.length-1].state.pos.y >= hookBox.state.pos.y + hookBox.geometry.height && rightTower[rightTower.length-1].state.vel.y === 0 && rightTower[rightTower.length-1].state.angular.vel === 0   ){
				var totalRight = 0  ;
				for ( var i = 0 ; i < rightTower.length ; i ++ )
					totalRight += rightTower[i].geometry.height ;
				remainRightHeight = totalRight - nowRightHeight ;
				addRightHeightTimer = setInterval(addRightHeight,20) ;
				isBoxTouch = true ;
			}
		}
	}
}

var checkBox = function(amount){
	if ( amount === 1 ){
		if ( boxList.length <= 2 )
			return ;
		for ( var i = 2 ; i < boxList.length ; i ++ ){
			if ( boxList[i].state.pos.y >= viewHeight - boxList[i].geometry.height && boxList[i].treatment !== 'static' )  {
				toGameOver();
				return ;
			}
		}
	} else if ( amount === 2 ){
		if ( boxList.length <= 3 )
			return ;
		if ( boxList[boxList.length-1].state.pos.y  > hook.state.pos.y + hook.geometry.height ){ 
			if ( Math.abs(boxList[boxList.length-1].state.pos.x - leftMax.state.pos.x) <= Math.abs(boxList[boxList.length-1].state.pos.x - rightMax.state.pos.x) ){
				leftMax = boxList[boxList.length-1] ;
			} else {
				rightMax = boxList[boxList.length-1] ;
			}
		}
		for ( var i = 3 ; i < boxList.length ; i ++ ){
			if ( boxList[i].state.pos.y  >= viewHeight - boxList[i].geometry.height / 2  && boxList[i].treatment !== 'static' )  {
				toGameOver();
				return ;
			}
		}
		if ( leftMax.state.pos.y  >= viewHeight +  leftMax.geometry.height  ||  rightMax.state.pos.y >= viewHeight + rightMax.geometry.height  ){
			toGameOver() ;
		}
	}
}

var reloadHook = function(){
	hookBox = createBox('rectangle',hook.state.pos.x,hook.state.pos.y ,100,100,"static",getImage(nextBox)) ;
	hookBox.restitution = 0 ;
	hookBox.cof = 3 ;
	hookBox.label = "box" ;
	hookBox.state.pos.y = hookBox.geometry.height + hook.state.pos.y ;
	hookload = true ;
	randomBox();
	hook.view = getImage('hook') ;
}

var drawBox = function(){
	for ( var i = 0 ; i < boxList.length ; i ++ ){
		drawBody(boxList[i],boxList[i].view,ctx,boxList[i].offset);
	}
}

var fixBoxCollision = function(){
	world.on('collisions:detected', function( data ){
		var coll;
		for (var i = 0, l = data.collisions.length; i < l; i++){
			coll = data.collisions[ i ];
			if (  coll.bodyA.uid > coll.bodyB.uid )
				coll.bodyA.state.vel.y = 0 ;
			else 
				coll.bodyB.state.vel.y = 0 ;
		}
	});
}

var setCanvas = function(){
	c = SlEEPBAG.canvasAutoResizer.getGameCanvas();
	resulotion = SlEEPBAG.canvasAutoResizer.getResolution();
	width = c.width , height = c.height ;
	ctx = c.getContext("2d");
	ctx.clearRect( (-1)*width , (-1)*height , width*2, height*2 );
	var resizer = SlEEPBAG.canvasAutoResizer;
	resizer.setCenter();
	ctx.font="30px Arial";
}

var addBox = function(e){
	if ( hookload === true ){ 
		hook.view = getImage('hook2') ;
		isPush = false ;
		isBoxTouch = false ;
		hookload = false ;
		hookBox.treatment = 'dynamic' ;
		hookBox.state.vel.x = 0 ;
		hookBox.state.vel.y = 0 ;
		world.add(hookBox);
		boxList.push(hookBox) ;
		reloadTimer = setTimeout(reloadHook,2000); 
	}
}

var gameOverMouseOver = function(e){
	var tempX , tempY ;
	if (IE) { 
		tempX = event.clientX + document.body.scrollLeft ;
		tempY = event.clientY + document.body.scrollTop;
	} else {  
		tempX = e.pageX ;
		tempY = e.pageY ;
	}	
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = 1285 / 750 ;
	var ratio2 = offsetX / offsetY ;
	var w , h ;
	if ( ratio > ratio2 ){
		h = offsetX / ratio ;
		w = offsetX ;
	} else {
		w = offsetY * ratio ;
		h = offsetY ;
	}
	if ( Math.abs( (tempX - 200 * w / 1285 ) - ((offsetX - w) / 2)  )  <=  100 * w / 1285 )  {
		document.body.style.cursor = "pointer" ;
	} else {
		document.body.style.cursor = "default" ;
	}
}

var gameOverMouseClick = function(e){
	var tempX , tempY ;
	if (IE) { 
		tempX = event.clientX + document.body.scrollLeft ;
		tempY = event.clientY + document.body.scrollTop;
	} else {  
		tempX = e.pageX ;
		tempY = e.pageY ;
	}	
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratioX = 1285 / offsetX ;
	var ratioY = 750 / offsetY ;
	var ratio = 1285 / 750 ;
	var ratio2 = offsetX / offsetY ;
	var w , h ;
	if ( ratio > ratio2 ){
		h = offsetX / ratio ;
		w = offsetX ;
	} else {
		w = offsetY * ratio ;
		h = offsetY ;
	}

}

var drawBackGroundRight = function(amount){
	if ( amount === 1 )
		ctx.drawImage(getImage('game_bg_2'),c.width/2-940/2+768,0,172,750) ;
	else {
		ctx.drawImage(getImage('game_bg2_2'),c.width/2-940/2+768,0,172,750) ;
	}
}

var drawBackGroundLeft = function(amount){
	if ( amount === 1 )
		ctx.drawImage(getImage('game_bg_1'),c.width/2-940/2,0,768,750) ;
	else {
		ctx.drawImage(getImage('game_bg2_1'),c.width/2-940/2,0,768,750) ;
	}
}

var stageAllSet = function(amount){
	if ( FirstEnterPage === true ){
		randomBox();
	}
	setCanvas();
	drawBackGroundLeft(amount);
	addFloor();
	drawBox();
	drawBackGroundRight(amount);
	fixBoxCollision();
	showNext(amount);
	showTime(amount);
	showNowHeight(amount);
	showGoalHeight(amount);
	showGoalTag(amount);
	showNowTag(amount);
	showTag(amount);
	showBlock();
}

// stage 1 

var Stage1 = function(){
	stageAllSet(1);
	initFirstBox(1);
	drawHook(false);
	moveHook(false);
	boxTouch(1);
	if ( isGameOver === true ){
		document.onclick = gameOverMouseClick ;
		document.onmousemove = gameOverMouseOver ;
		toGameOver();
	} else {
		if ( FirstEnterPage === true ){
			if ('addEventListener' in document) {
				document.addEventListener('DOMContentLoaded', function() {
					FastClick.attach(document.body);
				}, false);
			}
			document.onclick = addBox ;
		}
		checkBox(1);
		moveUp(1);
	}
	FirstEnterPage = false ;
}

// stage3

var Stage3 = function(){
	stageAllSet(2);
	initFirstBox(2);
	drawHook(false);
	moveHook(false);
	boxTouch(2);
	if ( isGameOver === true ){
		document.onclick = gameOverMouseClick ;
		document.onmousemove = gameOverMouseOver ;
		toGameOver();
	} else {
		if ( FirstEnterPage === true ){
			if ('addEventListener' in document) {
				document.addEventListener('DOMContentLoaded', function() {
					FastClick.attach(document.body);
				}, false);
			}
			document.onclick = addBox ;
		}
		checkBox(2);
		moveUp(2);
	}
	FirstEnterPage = false ;
}

// stage4
var Stage4 = function(){
	stageAllSet(1);
	initFirstBox(1);
	drawHook(true);
	moveHook(true);
	boxTouch(1);
	if ( isGameOver === true ){
		document.onclick = gameOverMouseClick ;
		document.onmousemove = gameOverMouseOver ;
		toGameOver();
	} else {
		if ( FirstEnterPage === true ){
			if ('addEventListener' in document) {
				document.addEventListener('DOMContentLoaded', function() {
					FastClick.attach(document.body);
				}, false);
			}
			document.onclick = addBox ;
		}
		checkBox(1);
		moveUp(1);
	}
	FirstEnterPage = false ;
}


var changePage = function(){
	if ( nowPage === 'stage1' ){
		Stage1();
	} else if ( nowPage === 'stage2' ){
		//Stage2();
	} else if ( nowPage === 'stage3' ){
		Stage3();
	} else if ( nowPage === 'stage4' ){
		Stage4();
	} else if ( nowPage === 'stage5' ){
		//Stage5();
	}
	
}

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

init();