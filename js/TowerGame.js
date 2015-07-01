var c ;
var imageList = ["hook","box1"] ;
var imageMap = {} ;
var resulotion ;
var width , heigth ;
var ctx ;
var nowPage = 'stage1' ;
var boxList = [] ;
var hasFirstBox = false ;
var isGameOver = false ;
var viewWidth = 1000;
var viewHeight = 700;
var upperBound = 600 ;
var reloadTimer ;
var offsetY = 0 ;

var lastBox = {
	x : 0 ,
	y : 0 
}
var hook = {
	x : viewWidth / 2 ,
	vx : 5 ,
	y : 0 ,
	size : 50 ,
	load : true 
};

var IE = document.all?true:false;
var pageTimer ; 
var world;

//set all 

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
		self.canvasHeight = 722;
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
	pageTimer = setInterval(changePage,20); 
}

var resetAll = function(){
	hasFirstBox = false ;
	offsetY = 0 ;
}

var initFirstBox = function(){
	if ( hasFirstBox === true )
		return ;
	var box = Physics.body('rectangle',{
		x: viewWidth / 2 , 
		y: viewHeight - 50 , 
		width: 100 ,
		height: 100 ,
		label: "box"
	});
	box.view = getImage("box1");
	box.treatment = "static" ;
	world.add(box);
	boxList.push(box) ;
	hasFirstBox = true ;
}

var addFloor = function(){
	if ( hasFirstBox === true )
		return ;
	var box = Physics.body('rectangle',{
		x: 0  , 
		y: viewHeight + 5 , 
		width: viewWidth * 3 ,
		height: 10 ,
		treatment : "static"
	});
	box.view = getImage("box1");
	world.add(box);
	boxList.push(box) ;
}

var moveUp = function(){
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

// stage 1

var drawFirstHook = function(){
	ctx.drawImage(getImage("hook"),hook.x - hook.size ,hook.y,hook.size,hook.size) ;
	if ( hook.load === true ){
		ctx.drawImage(getImage("box1"),hook.x - hook.size - 50 , hook.y+ 50,150,100) ;
	}
}

var moveHook = function(){
	hook.x += hook.vx ;
	if ( hook.x >= viewWidth - 300 || hook.x <= 300 )
		hook.vx *= -1 ;
}

var toGameOver = function(){
	isGameOver = true ;
	ctx.fillText("GAMEOVER",100,150,1000,100) ;
}

var checkBox = function(){
	if ( boxList.length <= 2 )
		return ;
	for ( var i = 2 ; i < boxList.length ; i ++ ){
		if ( boxList[i].state.pos.y >= viewHeight - boxList[i].geometry.height && boxList[i].treatment !== 'static' )  {
			toGameOver();
			return ;
		}
	}
}

var reloadHook = function(){
	hook.load = true ;
}

var Stage1 = function(){
	c = SlEEPBAG.canvasAutoResizer.getGameCanvas();
	resulotion = SlEEPBAG.canvasAutoResizer.getResolution();
	width = c.width , height = c.height ;
	ctx = c.getContext("2d");
	ctx.clearRect( (-1)*width , (-1)*height , width*2, height*2 );
	var resizer = SlEEPBAG.canvasAutoResizer;
	resizer.setFull();
	ctx.font="50px Arial";
	ctx.fillText(offsetY,100,100,100,100) ;
	for ( var i = 0 ; i < boxList.length ; i ++ ){
		drawBody(boxList[i],boxList[i].view,ctx,boxList[i].offset);
	}
	addFloor();
	initFirstBox();
	drawFirstHook();
	moveHook();
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
	if ( isGameOver === true ){
		document.onclick= function(e){;} ;
		toGameOver();
	} else {
		if ('addEventListener' in document) {
			document.addEventListener('DOMContentLoaded', function() {
				FastClick.attach(document.body);
			}, false);
		}
		document.onclick= function(e){
			if ( hook.load === true ){ 
				hook.load = false ;
				var box = Physics.body('rectangle',{
					x: hook.x + hook.size / 2 - 50  , 
					y: hook.y + 50 + hook.size / 2 , 
					width: 100 ,
					height: 100 ,
					restitution: 0 ,
					cof: 3 , 
					label: "box"
				});
				box.view = getImage("box1");
				world.add(box);
				boxList.push(box) ;
				reloadTimer = setTimeout(reloadHook,2000); 
			}
		};
		checkBox();
		moveUp();
	}
}

var changePage = function(){
	if ( nowPage === 'stage1' ){
		Stage1();
	}
}

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

init();