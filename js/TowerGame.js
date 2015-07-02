var c ;
var imageList = ["hook","hook2","box1","box2","game_bg",'0','1','2','3','4','5','6','7','8','9'] ;
var simpleBoxList = ["box1","box2"] ;
var randomType = 0 ;
var allBoxList = [] ;
var imageMap = {} ;
var resulotion ;
var width , heigth ;
var ctx ;
var nowPage = 'stage4' ;
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
var remainHeight ;

var lastBox = {
	x : 0 ,
	y : 0 
}
var hook , hookBox ;

var IE = document.all?true:false;
var pageTimer ; 
var world;

//set all 

var showNowHeight = function(){
	var timebase = 975 + (remainTime.toString().length ) * 25 ;
	var temp = nowHeight ;
	while( temp >= 0 ){
		ctx.drawImage(getImage(temp%10),timebase,280,50,50) ;
		temp = Math.floor(temp/10) ;
		timebase -= 50 ;
		if ( temp === 0 )
			break ;
	}
}

var countTime = function(){
	if ( remainTime <= 0 ){
		toGameOver();
	} else {
		remainTime -= 1 ;
	}
}

var showTime = function(){
	var timebase = 975 + (remainTime.toString().length ) * 25 ;
	var temp = remainTime ;
	while( temp >= 0 ){
		ctx.drawImage(getImage(temp%10),timebase,400,50,50) ;
		temp = Math.floor(temp/10) ;
		timebase -= 50 ;
		if ( temp === 0 )
			break ;
	}
}

var randomBox = function(){
	if ( randomType === 0 ){
		nextBox = simpleBoxList[Math.floor(Math.random() * simpleBoxList.length)] ;
	}
}

var showNext = function(){
	ctx.drawImage(getImage(nextBox),975,570,100,100) ;
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
}

var addHeight = function(){
	if ( isGameOver === false ){
		if ( remainHeight > 0 ){
			nowHeight += 1 ;
			remainHeight -= 1 ;
		} else {
			clearTimeout(addHeight) ;
		}
	}
}

var boxTouch = function(amount){
	if ( isBoxTouch === false ){
		if ( amount === 1 ){
			if ( boxList.length <= 2 )
				return ;
			if ( boxList[boxList.length-1].state.pos.y >= hookBox.state.pos.y + hookBox.geometry.height && boxList[boxList.length-1].state.vel.y === 0 ){
				remainHeight = boxList[boxList.length-1].geometry.height ;
				addHeightTimer = setInterval(addHeight,20) ;
				isBoxTouch = true ;
			}
		} else if ( amount === 2 ){
			if ( boxList.length <= 3 )
				return ;
			if ( boxList[boxList.length-1].state.pos.y >= hookBox.state.pos.y + hookBox.geometry.height && boxList[boxList.length-1].state.vel.y === 0 ){
				/*
				if ( boxList[boxList.length-1].state.pos.y  > hook.state.pos.y + hook.geometry.height ){ 
					if ( Math.abs(boxList[boxList.length-1].state.pos.x - leftMax.state.pos.x) <= Math.abs(boxList[boxList.length-1].state.pos.x - rightMax.state.pos.x) ){
						leftMax = boxList[boxList.length-1] ;
						remainHeight = 
					} else {
						rightMax = boxList[boxList.length-1] ;
					}
					addHeightTimer = setInterval(addHeight,20) ;
					isBoxTouch = true ;
				}
				*/
				remainHeight = boxList[boxList.length-1].geometry.height ;
				addHeightTimer = setInterval(addHeight,20) ;
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
	ctx.font="50px Arial";
}

var addBox = function(e){
	if ( hookload === true ){ 
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

var drawBackGround = function(){
	ctx.drawImage(getImage('game_bg'),c.width/2-940/2,0,940,750) ;
}

var stageAllSet = function(){
	if ( FirstEnterPage === true ){
		randomBox();
	}
	setCanvas();
	drawBackGround();
	addFloor();
	drawBox();
	fixBoxCollision();
	showNext();
	showTime();
	showNowHeight();

}

// stage 1 

var Stage1 = function(){
	stageAllSet();
	initFirstBox(1);
	drawHook(false);
	moveHook(false);
	boxTouch(1);
	if ( isGameOver === true ){
		document.onclick= function(e){;} ;
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
	stageAllSet();
	initFirstBox(2);
	drawHook(false);
	moveHook(false);
	boxTouch(2);
	if ( isGameOver === true ){
		document.onclick= function(e){;} ;
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
	stageAllSet();
	initFirstBox(1);
	drawHook(true);
	moveHook(true);
	boxTouch(1);
	if ( isGameOver === true ){
		document.onclick= function(e){;} ;
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