var c ;

window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var backGroundLeftOneCanvas = document.createElement("canvas"); 
var backGroundLeftOneCtx = backGroundLeftOneCanvas.getContext("2d");
var backGroundRightOneCanvas = document.createElement("canvas"); 
var backGroundRightOneCtx = backGroundRightOneCanvas.getContext("2d");
var backGroundLeftTwoCanvas = document.createElement("canvas"); 
var backGroundLeftTwoCtx = backGroundLeftTwoCanvas.getContext("2d");
var backGroundRightTwoCanvas = document.createElement("canvas"); 
var backGroundRightTwoCtx = backGroundRightTwoCanvas.getContext("2d");

var goalTagRightCanvas = document.createElement("canvas"); 
var goalTagRightCtx = goalTagRightCanvas.getContext("2d");
var nowTagRightCanvas = document.createElement("canvas"); 
var nowTagRightCtx = nowTagRightCanvas.getContext("2d");
var goalTagLeftCanvas = document.createElement("canvas"); 
var goalTagLeftCtx = goalTagLeftCanvas.getContext("2d");
var nowTagLeftCanvas = document.createElement("canvas"); 
var nowTagLeftCtx = nowTagLeftCanvas.getContext("2d");

var tagTopRightCanvas = document.createElement("canvas"); 
var tagTopRightCtx = tagTopRightCanvas.getContext("2d");
var tagDownRightCanvas = document.createElement("canvas"); 
var tagDownRightCtx = tagDownRightCanvas.getContext("2d");
var tagTopLeftCanvas = document.createElement("canvas"); 
var tagTopLeftCtx = tagTopLeftCanvas.getContext("2d");
var tagDownLeftCanvas = document.createElement("canvas"); 
var tagDownLeftCtx = tagDownLeftCanvas.getContext("2d");


var beginCount ;
var cacheMap = {} ;
var hookCache = {} ;

document.getElementById("bg").src = "sound/background.mp3" ;
document.getElementById("fail").src = "sound/fail.mp3" ;
document.getElementById("win").src = "sound/win.mp3" ;
document.getElementById("box").src = "sound/box.mp3" ;
document.getElementById("button").src = "sound/button.mp3" ;

var imageList = ["hook","hook2","box1","box2","game_bg_1","game_bg_2",'game_bg2_1','game_bg2_2','0','1','2','3','4','5','6','7','8','9',
				  '02','12','22','32','42','52','62','72','82','92','M','tag','tag2','tag3','tag_2','tag3_2','nowtag','goaltag','nowtag2','goaltag2',
				  "box_small","box_small2","box_small3","box_mid","box_mid2","base","box_big","box_big2","box_super","box_super2","box_other",
				  "box_other2","box_other3","box_other4",'fail','again','again2','win','next','next2','return','return2','teach','teach_button','teach_button2',
				  'start' , 'start2','teach2','teach3','teach4','teach5','new','new2','pig','pig2','continue','continue2','rank','rank2','index',
				  'shovel','shovel2','teach_bg','new_return','new_return2','new_continue','new_continue2','rank_bg','confirm','confirm2','input',
				  'lv_bg','lv1','lv1_2','lv1_3','lv2','lv2_2','lv2_3','lv3','lv3_2','lv3_3','lv4','lv4_2','lv4_3','lv5','lv5_2','lv5_3'] ;
var simpleBoxList = ["box_big","box_big2","box_super","box_super2"] ;
var allBoxList = ["box_small","box_small2","box_small3","box_mid","box_mid2","box_big","box_big2","box_super","box_super2",
				   "box_other","box_other2","box_other3","box_other4"] ;
var randomType = 1 ;
var leftTower = [] , rightTower = [] ;
var imageMap = {} ;
var resulotion ;
var width , heigth ;
var ctx ;
var nowPage = 'index' ;
var boxList = [] ;
var hasFirstBox = false ;
var isGameOver = false ;
var viewWidth = 1500 ;
var viewHeight = 780;
var upperBound = 600 ;
var upperBound2 = 550 ;
var reloadTimer ;
var leftMax ;
var rightMax ;
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
var goalHeight = 3 ;
var nowLeftHeight ;
var nowRightHeight ;
var isPush = false ;
var isWin = false ;
var amount ;
var mouseOver = 'none' ;
var spin = true ;
var isTeach = false ;
var isTeaching = false ;
var isContinue = false ;
var isShowConfirm = false ;
var rankSite ;
var inputBox = [] ;
var total = 0 ;
var buttonSound = false ;
var winSound = false ;
var failSound = false ;
var boxSound = false ;

var lastBox = {
	x : 0 ,
	y : 0 
}
var hook , hookBox ;
var boxType = {};
var IE = ("ActiveXObject" in window) ;
var pageTimer ; 
var world;

//set all 

var getNextPage = function(){
	if ( nowPage === 'stage1' )
		return 'stage2' ;
	if ( nowPage === 'stage2' )
		return 'stage3' ;
	if ( nowPage === 'stage3' )
		return 'stage4' ;
	if ( nowPage === 'stage4' )
		return 'stage5' ;
}

var saveData = function(){
	var time = Cookies.get(nowPage);
	if ( time === null || time === "" || time === undefined || parseInt(time) < remainTime ){
		Cookies.set(nowPage,remainTime,{ expires: 36500 });
	}
	var nextTime = Cookies.get(getNextPage()) ;
	if ( nextTime === null || nextTime === "" || nextTime === undefined ){
		Cookies.set(getNextPage(),0,{ expires: 36500 });
	}
}

var setMouseEvent = function(over,click){
	document.onclick = click ;
	document.onmousemove = over ;
	document.ontouchend = click ;
} 

var getMouseSite = function(e){
	var tempX , tempY ;
	if (IE) { 
		tempX = event.clientX + document.body.scrollLeft ;
		tempY = event.clientY + document.body.scrollTop;
	} else {  
		tempX = e.pageX ;
		tempY = e.pageY ;
	}	
	return {x:tempX,y:tempY} ;
}

var getRatio = function(offsetX,offsetY){
	var ratio = 978 / 780 ;
	var ratio2 = offsetX / offsetY ;
	var w , h ;
	if ( ratio > ratio2 ){
		h = offsetX / ratio ;
		w = offsetX ;
	} else {
		w = offsetY * ratio ;
		h = offsetY ;
	}
	return {w:w,h:h} ;
}

var showTeachMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 388 * w / 978 ) - ((offsetX - w) / 2)  )  <=  73 * w / 978 &&
		 Math.abs( (tempY - 418 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780 ) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'start' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var showTeachMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 388 * w / 978 ) - ((offsetX - w) / 2)  )  <=  73 * w / 978 &&
		 Math.abs( (tempY - 418 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780 ) {
		isTeach = false ;
		isTeaching = false ;
		mouseOver = 'none' ;
		beginCountTime();
	} else {
		mouseOver = 'none' ;
	}
}


var fixLeftAndRight = function(){
	if ( leftMax.state.pos.x > rightMax.state.pos.x ){
		var temp = leftMax;
		leftMax = rightMax;
		rightMax = temp ;
	}
}

var makeType = function(w,h,m){
	return {width:w,height:h,size:m} ;
}

var detectPoly = function(name){
	if ( name === 'box_other' || name === 'box_other2'||  name === 'box_other3' || name === 'box_other4')
		return true ;
	else 
		return false ;
}

var makeBoxType = function(){
	boxType['base'] = makeType(139,119,5) ;
	boxType['box_super'] = makeType(218,90,5) ;
	boxType['box_super2'] = makeType(218,75,4) ;
	boxType['box_big'] = makeType(179,90,5) ;
	boxType['box_big2'] = makeType(179,75,4) ;
	boxType['box_mid'] = makeType(139,119,5) ;
	boxType['box_mid2'] = makeType(139,104,4) ;
	boxType['box_small'] = makeType(139,89,5) ;
	boxType['box_small2'] = makeType(139,76,4) ;
	boxType['box_small3'] = makeType(129,89,5) ;
	boxType['box_other'] = makeType(203,69,4);
	boxType['box_other2'] = makeType(203,69,4);
	boxType['box_other3'] = makeType(119,89,5);
	boxType['box_other4'] = makeType(119,89,5);
}

var showBlock = function(){
	ctx.fillStyle = 'white' ;
	ctx.fillRect(0, 0, c.width/2-940/2 , c.height);
	ctx.fillRect(c.width-(c.width/2-940/2) , 0, c.width/2-940/2 , c.height);
}

var showTag = function(){
	if ( amount === 1 ){
		if ( tagTopRightCanvas.cache === undefined ){
			tagTopRightCanvas.width = 37 ;
			tagTopRightCanvas.height = 18 ;
			tagTopRightCtx.drawImage(getImage('tag'),0,0,37,18) ;
			tagTopRightCanvas.cache = true ;
		} 
		ctx.drawImage(tagTopRightCanvas,742,738-(738-228)*nowHeight/goalHeight) ;
		ctx.drawImage(getImage('tag2'),742,712-(738-228)*nowHeight/goalHeight+43,37,(738-228)*nowHeight/goalHeight) ;
		if ( tagDownRightCanvas.cache === undefined ){
			tagDownRightCanvas.width = 37 ;
			tagDownRightCanvas.height = 19 ;
			tagDownRightCtx.drawImage(getImage('tag3'),0,0,37,19) ;
			tagDownRightCanvas.cache = true ;
		} 
		ctx.drawImage(tagDownRightCanvas,742,755) ;
	} else if ( amount === 2 ){
		if ( tagTopRightCanvas.cache === undefined ){
			tagTopRightCanvas.width = 37 ;
			tagTopRightCanvas.height = 18 ;
			tagTopRightCtx.drawImage(getImage('tag'),0,0,37,18) ;
			tagTopRightCanvas.cache = true ;
		} 
		ctx.drawImage(tagTopRightCanvas,744,738-(738-222)*nowRightHeight/goalHeight) ;
		ctx.drawImage(getImage('tag2'),744,712-(738-222)*nowRightHeight/goalHeight+43,35,(738-222)*nowRightHeight/goalHeight) ;
		if ( tagDownRightCanvas.cache === undefined ){
			tagDownRightCanvas.width = 37 ;
			tagDownRightCanvas.height = 19 ;
			tagDownRightCtx.drawImage(getImage('tag3'),0,0,37,19) ;
			tagDownRightCanvas.cache = true ;
		} 
		ctx.drawImage(tagDownRightCanvas,744,755) ;
		if ( tagTopLeftCanvas.cache === undefined ){
			tagTopLeftCanvas.width = 35 ;
			tagTopLeftCanvas.height = 18 ;
			tagTopLeftCtx.drawImage(getImage('tag_2'),0,0,35,18) ;
			tagTopLeftCanvas.cache = true ;
		} 
		ctx.drawImage(tagTopLeftCanvas,22,738-(738-222)*nowLeftHeight/goalHeight) ;
		ctx.drawImage(getImage('tag2'),22,712-(738-222)*nowLeftHeight/goalHeight+43,35,(738-222)*nowLeftHeight/goalHeight) ;
		if ( tagDownLeftCanvas.cache === undefined ){
			tagDownLeftCanvas.width = 35 ;
			tagDownLeftCanvas.height = 19 ;
			tagDownLeftCtx.drawImage(getImage('tag3_2'),0,0,35,19) ;
			tagDownLeftCanvas.cache = true ;
		} 
		ctx.drawImage(tagDownLeftCanvas,22,755) ;
	}
	
}

var showNowTag = function(){
	if ( amount === 1 ){
		if ( nowTagRightCanvas.cache === undefined ){
			nowTagRightCanvas.width = 95 ;
			nowTagRightCanvas.height = 32 ;
			nowTagRightCtx.drawImage(getImage('nowtag'),0,0,95,32) ;
			nowTagRightCanvas.cache = true ;
		} 
		ctx.drawImage(nowTagRightCanvas,635,739-(739-228)*nowHeight/goalHeight) ;
		var base = 675 + (nowHeight.toString().length - 1 ) * 8 ;
		var temp = nowHeight ;
		ctx.drawImage(getImage('M'),base,745-(745-234)*nowHeight/goalHeight,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,745-(745-234)*nowHeight/goalHeight,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	} else if ( amount === 2 ){
		if ( nowTagRightCanvas.cache === undefined ){
			nowTagRightCanvas.width = 95 ;
			nowTagRightCanvas.height = 32 ;
			nowTagRightCtx.drawImage(getImage('nowtag'),0,0,95,32) ;
			nowTagRightCanvas.cache = true ;
		} 
		ctx.drawImage(nowTagRightCanvas,645,738-(738-222)*nowRightHeight/goalHeight) ;
		var base = 685 + (nowRightHeight.toString().length - 1 ) * 8 ;
		var temp = nowRightHeight ;
		ctx.drawImage(getImage('M'),base,744-(744-228)*nowRightHeight/goalHeight,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,744-(744-228)*nowRightHeight/goalHeight,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
		if ( nowTagLeftCanvas.cache === undefined ){
			nowTagLeftCanvas.width = 95 ;
			nowTagLeftCanvas.height = 32 ;
			nowTagLeftCtx.drawImage(getImage('nowtag2'),0,0,95,32) ;
			nowTagLeftCanvas.cache = true ;
		} 
		ctx.drawImage(nowTagLeftCanvas,62,738-(738-222)*nowLeftHeight/goalHeight) ;
		var base = 115 + (nowLeftHeight.toString().length - 1 ) * 8 ;
		var temp = nowLeftHeight ;
		ctx.drawImage(getImage('M'),base,744-(744-228)*nowLeftHeight/goalHeight,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,744-(744-228)*nowLeftHeight/goalHeight,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	}
}

var showGoalTag = function(){
	if ( amount === 1 ){
		if ( goalTagRightCanvas.cache === undefined ){
			goalTagRightCanvas.width = 95 ;
			goalTagRightCanvas.height = 32 ;
			goalTagRightCtx.drawImage(getImage('goaltag'),0,0,95,32) ;
			goalTagRightCanvas.cache = true ;
		} 
		ctx.drawImage(goalTagRightCanvas,635,236) ;
		
		var base = 675 + (goalHeight.toString().length - 1 ) * 8 ;
		var temp = goalHeight ;
		ctx.drawImage(getImage('M'),base,242,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,242,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	} else if ( amount === 2 ){
		if ( goalTagRightCanvas.cache === undefined ){
			goalTagRightCanvas.width = 95 ;
			goalTagRightCanvas.height = 32 ;
			goalTagRightCtx.drawImage(getImage('goaltag'),0,0,95,32) ;
			goalTagRightCanvas.cache = true ;
		} 
		ctx.drawImage(goalTagRightCanvas,645,230) ;
		var base = 685 + (goalHeight.toString().length - 1 ) * 8 ;
		var temp = goalHeight ;
		ctx.drawImage(getImage('M'),base,236,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,236,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
		if ( goalTagLeftCanvas.cache === undefined ){
			goalTagLeftCanvas.width = 95 ;
			goalTagLeftCanvas.height = 32 ;
			goalTagLeftCtx.drawImage(getImage('goaltag2'),0,0,95,32) ;
			goalTagLeftCanvas.cache = true ;
		} 
		ctx.drawImage(goalTagLeftCanvas,62,230) ;
		base = 115 + (goalHeight.toString().length - 1 ) * 8 ;
		var temp = goalHeight ;
		ctx.drawImage(getImage('M'),base,236,15,20) ;
		base -= 16 ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10+'2'),base,236,15,20) ;
			temp = Math.floor(temp/10) ;
			base -= 16 ;
			if ( temp === 0 )
				break ;
		}
	}
}

var showGoalHeight = function(){
	if ( amount === 1 ){
		var base = 855 ; 
		ctx.font = "30px Arial" ;
		ctx.fillStyle = "#C5453E" ;
		ctx.fillText(goalHeight+' m',base-goalHeight.toString().length*10,220,300,50) ;
	} else if ( amount === 2 ){
		var base = 855 ; 
		ctx.font = "30px Arial" ;
		ctx.fillStyle = "#C5453E" ;
		ctx.fillText(goalHeight+' m',base-goalHeight.toString().length*10,187,300,50) ;
		ctx.fillText(goalHeight+' m',base-goalHeight.toString().length*10,365,300,50) ;
	}
}

var showNowHeight = function(){
	if ( amount === 1 ){
		var base = 855 ; 
		ctx.font = "30px Arial" ;
		ctx.fillStyle = "#28231E" ;
		ctx.fillText(nowHeight+' m',base-nowHeight.toString().length*10,320,300,50) ;
	} else if ( amount === 2 ){
		var base = 855 ; 
		ctx.font = "30px Arial" ;
		ctx.fillStyle = "#28231E" ;
		ctx.fillText(nowLeftHeight+' m',base-nowLeftHeight.toString().length*10,260,300,50) ;
		ctx.fillText(nowRightHeight+' m',base-nowRightHeight.toString().length*10,438,300,50) ;
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
	if ( amount === 1 ){
		var timebase = 825 + (remainTime.toString().length ) * 25 ;
		var temp = remainTime ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10),timebase,420,50,50) ;
			temp = Math.floor(temp/10) ;
			timebase -= 50 ;
			if ( temp === 0 )
				break ;
		}
	}else if ( amount === 2 ){
		var timebase = 820 + (remainTime.toString().length ) * 25 ;
		var temp = remainTime ;
		while( temp >= 0 ){
			ctx.drawImage(getImage(temp%10),timebase,525,50,50) ;
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
	} else {
		nextBox = allBoxList[Math.floor(Math.random() * allBoxList.length)] ;
	}
}

var showNext = function(){
	if ( amount === 1 )
		ctx.drawImage(getImage(nextBox),860-boxType[nextBox].width*21/100,600,boxType[nextBox].width * 57/100,boxType[nextBox].height * 57/100) ;
	else if ( amount === 2 )
		ctx.drawImage(getImage(nextBox),860-boxType[nextBox].width*21/100,680,boxType[nextBox].width * 57/100,boxType[nextBox].height * 57/100) ;
}

var createBox = function(type,inX,inY,inWidth,inHeight,inTreatment,inView){
	return Physics.body(type,{x: inX , y: inY , width: inWidth , height: inHeight , treatment: inTreatment , view: inView });
}

var createPoly = function(type,name,inX,inY,inWidth,inHeight,inTreatment,inView){
	var v = [] ;
	if ( name === 'box_other'){
		v = [{ x: 0, y: 67 },{ x: 35, y: 0 },{ x: 202, y: 0 },{ x: 171, y: 67 }] ;
	} else if ( name === 'box_other2' ){
		v = [{ x: 0, y: 67 },{ x: 35, y: 0 },{ x: 202, y: 0 },{ x: 171, y: 67 }] ;
	} else if ( name === 'box_other3' ){
		v = [{ x: 0, y: 0 },{ x: 20, y: 77 },{ x: 100, y: 77 },{ x: 118, y: 0 }] ;
	} else if ( name === 'box_other4' ){
		v = [{ x: 21, y: 0 },{ x: 0, y: 88 },{ x: 118, y: 88 },	{ x: 100, y: 0 }] ;
	}
	return Physics.body(type,{vertices:v, treatment: inTreatment , view: inView });
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
	if ( body.label === 'hook' ){
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
		var obj = hookCache[ang] ;
		if ( obj !== undefined ){
			ctx.drawImage(obj, body.state.pos.x - obj.width / 2 , body.state.pos.y - obj.height / 2 );
			return ;
		} 
		var cacheCanvas = document.createElement("canvas") ;
		cacheCanvas.width = view.width * 2 ;
		cacheCanvas.height = view.height * 2  ;
		var cacheCtx = cacheCanvas.getContext("2d"); 
		cacheCtx.save();
		cacheCtx.translate(view.width/2 ,view.height/2);
		cacheCtx.translate(view.width/2,view.height/2); 
		cacheCtx.rotate( ang );
		cacheCtx.translate(-view.width/2,-view.height/2);
		cacheCtx.drawImage(view, 0,  0, view.width, view.height);
		cacheCtx.restore();
		ctx.drawImage(cacheCanvas,body.state.pos.x - cacheCanvas.width / 2 , body.state.pos.y - cacheCanvas.height / 2 );
		hookCache[ang] = cacheCanvas ;
		return ;
	} 
	/*
	var name = view.src ;
	var obj = cacheMap[name] ;
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
	if ( obj !== undefined ){
		if ( obj[ang] !== undefined ) {
			ctx.drawImage(obj[ang], body.state.pos.x - obj[ang].width / 2 , body.state.pos.y - obj[ang].height / 2 );
			return ;
		}
	} else {
		cacheMap[name] = {} ;
		obj = cacheMap[name] ;
	}
	var cacheCanvas = document.createElement("canvas") ;
	cacheCanvas.width = view.width * 3 ;
	cacheCanvas.height = view.height * 3  ;
	var cacheCtx = cacheCanvas.getContext("2d"); 
	cacheCtx.save();
	cacheCtx.translate(view.width ,view.height);
	cacheCtx.translate(view.width/2,view.height/2); 
	cacheCtx.rotate( ang );
	cacheCtx.translate(-view.width/2,-view.height/2);
	cacheCtx.drawImage(view, 0,  0, view.width, view.height);
	cacheCtx.restore();
	ctx.drawImage(cacheCanvas,body.state.pos.x - cacheCanvas.width / 2 , body.state.pos.y - cacheCanvas.height / 2 );
	obj[ang] = cacheCanvas ;
	*/
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

var isFirst = function(){
	if ( Cookies.get('stage1') !== null && Cookies.get('stage1') !== "" && Cookies.get('stage1') !== undefined ){
		isContinue = true ;
	} else {
		Cookies.set('theRank0',{name:'boss',score:99999}) ;
		Cookies.set('theRank1',{name:'king',score:35}) ;
		Cookies.set('theRank2',{name:'happycat',score:30}) ;
		Cookies.set('theRank3',{name:'francis',score:25}) ;
		Cookies.set('theRank4',{name:'Amy',score:20}) ;
		Cookies.set('theRank5',{name:'123',score:15}) ;
		Cookies.set('theRank6',{name:'handsome',score:10}) ;
	}
}

var init = function(){
	document.getElementById('bg').play();
	isFirst();
	makeAllImage();
	makeBoxType();
	SlEEPBAG.canvasAutoResizer.load(function(self){
		self.canvasWidth = 978;
		self.canvasHeight = 780;
		var gameArea = self.getGameArea();
		document.body.appendChild(gameArea); 
	});
	c = SlEEPBAG.canvasAutoResizer.getGameCanvas();
	resulotion = SlEEPBAG.canvasAutoResizer.getResolution();
	width = c.width , height = c.height ;
	ctx = c.getContext("2d");
	ctx.font="30px Arial";
	resetAll();
	changePage();
}

var beginCountTime = function(){
	if ( isTeach === false && isTeaching === false && beginCount === false ){
		countTimer = setInterval(countTime,1000);
		beginCount = true ;
	}
}

var resetAll = function(){
	ctx.font="30px Arial";
	beginCount = false ;
	isPush = false ;
	isBoxTouch = false ;
	boxSound = false ;
	winSound = false ;
	failSound = false ;
	isFirst();
	mouseOver = 'none' ;
	if ( nowPage === 'stage1'){
		isTeach = true ;
		isTeaching = true ;
		amount = 1 ;
		randomType = 0 ;
		goalHeight = 60 ; //60
		remainTime = 70 ;
	} else if ( nowPage === 'stage2' ){
		isTeach = true ;
		isTeaching = false ;
		amount = 1 ;
		randomType = 1 ;
		goalHeight = 60 ; //60
		remainTime = 70 ;
	} else if ( nowPage === 'stage3' ){
		isTeach = true ;
		isTeaching = false ;
		amount = 2 ;
		randomType = 1 ;
		goalHeight = 40 ; //40
		remainTime = 80 ;
	} else if ( nowPage === 'stage4' ){
		isTeach = true ;
		isTeaching = false ;
		amount = 1 ;
		randomType = 1 ;
		goalHeight = 80; //80
		remainTime = 120 ;
	} else if ( nowPage === 'stage5' ){
		isTeach = true ;
		isTeaching = false ;
		amount = 2 ;
		randomType = 1 ;
		goalHeight = 60 ; //60
		remainTime = 120 ;
	}
	if ( world !== undefined )
		world.destroy();
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
					acc: { x : 0, y: 0.001 } 
				}),
				Physics.behavior('body-collision-detection'),
				Physics.behavior('sweep-prune')
			]
		);
	});
	world.on('collisions:detected', function( data ){
		var coll;
		for (var i = 0 , l = data.collisions.length ; i < l; i++){
			coll = data.collisions[ i ];
			var uidA = coll.bodyA.uid , uidB = coll.bodyB.uid ;
			if ( coll.bodyA.label === 'floor' || coll.bodyB.label === 'floor' ){
				if ( isGameOver === false ){
					toGameOver();
				}
				return ;
			}
			if (  uidA > uidB ){
				coll.bodyA.state.vel.y = 0 ;
				if ( coll.bodyA.uidB === undefined ){
					document.getElementById('box').play();
					coll.bodyA.uidB = true ;
				}
			}
			else {
				coll.bodyB.state.vel.y = 0 ;
				if ( coll.bodyB.uidA === undefined ){
					document.getElementById('box').play();
					coll.bodyB.uidA = true ;
				}
			}
		}
	});
	isShowConfirm = false ;
	hookload = true ;
	isWin = false ;
	isGameOver = false ;
	leftTower = [] , rightTower = [] ;
	boxList = [] ;
	nowHeight = 0 ;
	nowLeftHeight = 0 ;
	nowRightHeight = 0;
	remainHeight = 0 ;
	remainLeftHeight = 0 ;
	remainRightHeight = 0 ;
	hasFirstBox = false ;
	hook = createBox('rectangle',300,54,-100,-100,"static",getImage("hook")) ;
	hook.state.angular.pos = Math.PI / 2 ;
	hook.label = 'hook' ;
	var type ;
	if ( randomType === 0 )
		type = simpleBoxList[Math.floor(Math.random() * simpleBoxList.length)] ;
	else 
		type = allBoxList[Math.floor(Math.random() * allBoxList.length)] ;
	if ( detectPoly(type) === false ){
		hookBox = createBox('rectangle',0,0,boxType[type].width,boxType[type].height,"static",getImage(type)) ;
	} else {
		hookBox = createPoly('convex-polygon',type,0,0,boxType[type].width,boxType[type].height,"static",getImage(type)) ;
	}
	hookBox.state.vel.y = 0 ;
	hookBox.restitution = 0 ;
	hookBox.size = boxType[type].size ; 
	hookBox.cof = 3 ;
	hookBox.label = 'box' ;
	world.add(hook);
	world.add(hookBox);
	FirstEnterPage = true ;
	clearTimeout(reloadTimer);
	clearTimeout(countTimer);
	clearTimeout(addHeightTimer);
	clearTimeout(addLeftHeightTimer);
	clearTimeout(addRightHeightTimer);
}

var initFirstBox = function(){
	if ( hasFirstBox === true )
		return ;
	if ( amount === 1 ){
		var box = createBox('rectangle',viewWidth / 2 - 360 ,viewHeight - 50,boxType['base'].width,boxType['base'].height,"static",getImage("base")) ;
		world.add(box);
		boxList.push(box) ;
		hasFirstBox = true ;
	} else if ( amount === 2 ){
		var box = createBox('rectangle',250,viewHeight - 50,boxType['base'].width,boxType['base'].height,"static",getImage("base")) ;
		world.add(box);
		leftMax = box ;
		leftTower.push(box);
		box = createBox('rectangle',550,viewHeight - 50,boxType['base'].width,boxType['base'].height,"static",getImage("base")) ;
		world.add(box);
		rightMax = box ;
		rightTower.push(box);
		hasFirstBox = true ;
	}
}

var addFloor = function(){
	if ( hasFirstBox === true )
		return ;
	var box = createBox('rectangle',-100,viewHeight + 5 ,viewWidth * 3,10,"static",getImage("box1")) ;
	box.hide = true ;
	box.label = 'floor' ;
	world.add(box);
	if ( amount === 1 )
		boxList.push(box) ;
	else {
		leftTower.push(box) ;
		rightTower.push(box) ;
	}
}

var moveUp = function(){
	if ( amount === 1 ){
		upperBound = 600 ;
		if ( boxList[boxList.length-1].state.pos.y <= upperBound && boxList[boxList.length-1].state.vel.y === 0 ){
			for ( var i = 0 ; i < boxList.length ; i ++ ){
				boxList[i].treatment = 'static' ;
			}
			for ( var i = 0 ; i < boxList.length ; i ++ ){
				boxList[i].state.pos.y += 2  ;
			}
			for ( var i = 0 ; i < boxList.length ; i ++ ){
				var h = getH(boxList[i]) ;
				if (  viewHeight - boxList[i].state.pos.y > h  )
					boxList[i].treatment = 'dynamic' ;
			}
		} 
	} else if ( amount === 2 ){
		upperBound = 550 ;
		if ( (leftTower[leftTower.length-1].state.pos.y <= upperBound && leftTower[leftTower.length-1].state.vel.y === 0) ||
			 (rightTower[rightTower.length-1].state.pos.y <= upperBound && rightTower[rightTower.length-1].state.vel.y === 0) ){
			for ( var i = 0 ; i < leftTower.length ; i ++ ){
				leftTower[i].state.vel.y = 0 ;
				leftTower[i].treatment = 'static' ;
			}
			for ( var i = 0 ; i < rightTower.length ; i ++ ){
				rightTower[i].state.vel.y = 0 ;
				rightTower[i].treatment = 'static' ;
			}
			for ( var i = 0 ; i < leftTower.length ; i ++ ){
				leftTower[i].state.pos.y += 2  ;
			}
			for ( var i = 0 ; i < rightTower.length ; i ++ ){
				rightTower[i].state.pos.y += 2  ;
			}
			for ( var i = 0 ; i < leftTower.length ; i ++ ){
				var h = getH(leftTower[i]) ;
				if (  viewHeight - leftTower[i].state.pos.y > h  )
					leftTower[i].treatment = 'dynamic' ;
			}
			for ( var i = 0 ; i < rightTower.length ; i ++ ){
				var h = getH(rightTower[i]) ;
				if (  viewHeight - rightTower[i].state.pos.y > h  )
					rightTower[i].treatment = 'dynamic' ;
			}
		} 
	}
}

var drawHook = function(spin){
	if ( hookload === true ){
		if ( spin === false ){
			var h = getH(hookBox) ;
			hookBox.state.pos.y = h + hook.state.pos.y ;
			hookBox.state.pos.x = hook.state.pos.x ;
		} else {
			var h = getH(hookBox) 
			hookBox.state.pos.y = (h) * Math.cos(hookBox.state.angular.pos) + h * 2 / 5   ;
			hookBox.state.pos.x = (-1) * (h) * Math.sin(hookBox.state.angular.pos)  + hook.state.pos.x ;
			hookBox.state.angular.pos = hook.state.angular.pos - Math.PI / 2 ;
		}
		drawBody(hookBox,hookBox.view,ctx,hookBox.offset);
	}
	drawBody(hook,hook.view,ctx,hook.offset);
}

var moveHook = function(spin){
	if ( spin === false ){
		hook.state.pos.x += hookMoveSpeed ;
		if ( hook.state.pos.x >= 630 || hook.state.pos.x <= 150 )
			hookMoveSpeed *= -1 ;
	} else {
		hook.state.pos.x += hookMoveSpeed ;
		hook.state.angular.pos += hookAngleSpeed ;
		if ( hook.state.pos.x >= 630  || hook.state.pos.x <= 150 )
			hookMoveSpeed *= -1 ;
		if ( hook.state.angular.pos >= 2 || hook.state.angular.pos <= 1 )
			hookAngleSpeed *= -1 ;
	}
}

var send = function(){
	document.getElementById("input").blur();
	document.getElementById("input").disabled = true ;
	var name = "" ;
	for ( var i = 0 ; i < inputBox.length ; i ++ )
		name += inputBox[i] ;
	for ( var i = 6 ; i >= rankSite ; i -- ){
		Cookies.set("theRank"+i.toString(),Cookies.getJSON("theRank"+(i-1).toString())) ;
	}
	Cookies.set("theRank"+rankSite,{name:name,score:total}) ;
	isShowConfirm = false ;
}

var showConfirm = function(){
	document.getElementById("input").disabled = false ;
	document.getElementById("input").focus();
	ctx.drawImage(getImage('input'),310,400,360,45) ;
	ctx.drawImage(getImage('confirm'),585,410,66,28) ;
	if ( mouseOver === 'confirm' ){
		ctx.drawImage(getImage('confirm2'),585,410,66,28) ;
	}
	document.onkeypress = function() {
		var length = inputBox.length  ;
		if ( event.keyCode == "8" && length > 0 ){
			inputBox.splice(length-1, length); 
		} else if ( event.keyCode == 13 ) {
			send() ;
		} else if ( length <= 8 ) {
			var keyIn = String.fromCharCode(event.keyCode) ;
			inputBox.push(keyIn) ;
		}
	}
	document.onkeydown = function() {
		var length = inputBox.length  ;
		if ( event.keyCode == "8" && length > 0 ){
			inputBox.splice(length-1, length); 
		} 
	}
	for ( var i = 0 ; i < inputBox.length ; i ++ ){
		ctx.fillText(inputBox[i],345+i*25,430,100,100) ;
	}
}

var toRank = function(){
	total = parseInt(Cookies.get('stage1')) + parseInt(Cookies.get('stage2')) + parseInt(Cookies.get('stage3')) + parseInt(Cookies.get('stage4')) + parseInt(Cookies.get('stage5')) ;
	if ( Cookies.get('theRank1') === undefined || Cookies.get('theRank1') === null ){
		Cookies.set('theRank0',{name:'boss',score:99999}) ;
		Cookies.set('theRank1',{name:'king',score:35}) ;
		Cookies.set('theRank2',{name:'happycat',score:30}) ;
		Cookies.set('theRank3',{name:'francis',score:25}) ;
		Cookies.set('theRank4',{name:'Amy',score:20}) ;
		Cookies.set('theRank5',{name:'123',score:15}) ;
		Cookies.set('theRank6',{name:'handsome',score:10}) ;
	}
	for ( var i = 0 ; i <= 5 ; i ++ ){
		if ( parseInt(Cookies.getJSON('theRank'+i.toString()).score) >= total && total > parseInt(Cookies.getJSON('theRank'+((i+1).toString()) ).score) ){
			isShowConfirm = true ;
			rankSite = i + 1 ;
			break ;
		}
	}
}

var toWin = function(){
	if ( winSound === false )
		document.getElementById("win").play();
	winSound = true ;
	isWin = true ;
	ctx.drawImage(getImage('win'),210,100,419,304) ;
	if ( mouseOver === 'next' )
		ctx.drawImage(getImage('next2'),270,420,252,81) ;
	else 
		ctx.drawImage(getImage('next'),270,420,252,81) ;
	clearTimeout(reloadTimer);
	clearTimeout(countTimer);
	clearTimeout(addHeightTimer);
	clearTimeout(addLeftHeightTimer);
	clearTimeout(addRightHeightTimer);
	saveData();
}

var toGameOver = function(){
	if ( failSound === false )
		document.getElementById("fail").play();
	failSound = true ;
	isGameOver = true ;
	ctx.drawImage(getImage('fail'),210,200,364,117) ;
	if ( mouseOver === 'again' )
		ctx.drawImage(getImage('again2'),270,360,252,81) ;
	else 
		ctx.drawImage(getImage('again'),270,360,252,81) ;
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
		if ( nowHeight >= goalHeight )
			isWin = true ;
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
		if ( nowLeftHeight >= goalHeight && nowRightHeight >= goalHeight )
			isWin = true ;
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
		if ( nowLeftHeight >= goalHeight && nowRightHeight >= goalHeight )
			isWin = true ;
	}
}

var getH = function(source){
	var h = source.geometry.height ;
	if ( source.geometry.height === undefined )
		h = 75 ;
	return h ;
}

var boxTouch = function(){
	var h = getH(hookBox);
	if ( amount === 1 && isBoxTouch === false ){
		if ( boxList.length <= 2 )
			return ;
		if ( boxList[boxList.length-1].state.pos.y >= hookBox.state.pos.y + h && boxList[boxList.length-1].state.vel.y === 0 && boxList[boxList.length-1].state.angular.vel === 0 ){
			var total = 0 ;
			for ( var i = 2 ; i < boxList.length ; i ++ )
				total += boxList[i].size ;
			remainHeight = total - nowHeight ;
			addHeightTimer = setInterval(addHeight,70) ;
			isBoxTouch = true ;
		}
	} else if ( amount === 2 ){
		if ( leftTower.length > 2 && leftTower[leftTower.length-1].state.pos.y >= hookBox.state.pos.y + h && leftTower[leftTower.length-1].state.vel.y === 0 && leftTower[leftTower.length-1].state.angular.vel === 0   ){
			var totalLeft = 0  ;
			for ( var i = 2 ; i < leftTower.length ; i ++ )
				totalLeft += leftTower[i].size ;
			remainLeftHeight = totalLeft - nowLeftHeight ;
			addLeftHeightTimer = setInterval(addLeftHeight,70) ;
		} 
		if ( rightTower.length > 2 && rightTower[rightTower.length-1].state.pos.y >= hookBox.state.pos.y + h && rightTower[rightTower.length-1].state.vel.y === 0 && rightTower[rightTower.length-1].state.angular.vel === 0   ){
			var totalRight = 0  ;
			for ( var i = 2 ; i < rightTower.length ; i ++ )
				totalRight += rightTower[i].size ;
			remainRightHeight = totalRight - nowRightHeight ;
			addRightHeightTimer = setInterval(addRightHeight,70) ;
		}
	}
}

var checkBox = function(){
	if ( amount === 1 ){
		if ( boxList.length <= 2 )
			return ;
		for ( var i = 2 ; i < boxList.length ; i ++ ){
			var h = getH(boxList[i]);
			if ( boxList[i].state.pos.y >= viewHeight - h / 2 && boxList[i].treatment !== 'static' )  {
				toGameOver();
				return ;
			}
		}
	} else if ( amount === 2 ){
		if ( leftTower.length <= 2 && rightTower.length <= 2  )
			return ;
		if ( leftTower.length > rightTower.length + 3 || leftTower.length + 3 < rightTower.length ){
			toGameOver();
			return ;
		}
		for ( var i = 2 ; i < leftTower.length ; i ++ ){			
			var h = getH(leftTower[i]) ;
			if ( leftTower[i].state.pos.y  >= viewHeight - h / 2   && leftTower[i].treatment !== 'static' )  {
				toGameOver();
				return ;
			}
		}
		for ( var i = 2 ; i < rightTower.length ; i ++ ){
			var h = getH(rightTower[i]) ;
			if ( rightTower[i].state.pos.y  >= viewHeight - h / 2   && rightTower[i].treatment !== 'static' )  {
				toGameOver();
				return ;
			}
		}
		var h = getH(leftMax) ;
		var h2 = getH(rightMax) ;
		if ( leftMax.state.pos.y  >= viewHeight +  h  ||  rightMax.state.pos.y >= viewHeight + h2  ){
			toGameOver() ;
		}
	}
}

var reloadHook = function(){
	var h = getH(hookBox) ;
	if ( detectPoly(nextBox) === false )
		hookBox = createBox('rectangle',hook.state.pos.x,hook.state.pos.y ,boxType[nextBox].width,boxType[nextBox].height,"static",getImage(nextBox)) ;
	else {
		hookBox = createPoly('convex-polygon',nextBox,hook.state.pos.x,hook.state.pos.y,boxType[nextBox].width,boxType[nextBox].height,"static",getImage(nextBox)) ;
	}
	hookBox.restitution = 0 ;
	hookBox.cof = 3 ;
	hookBox.label = "box" ;
	hookBox.state.pos.y = h + hook.state.pos.y ;
	hookBox.state.vel.y = 0 ;
	hookBox.size = boxType[nextBox].size ; 
	hookload = true ;
	randomBox();
	hook.view = getImage('hook') ;
}

var drawBox = function(){
	if ( amount === 1 ){
		for ( var i = 0 ; i < boxList.length ; i ++ ){
			if ( boxList[i].state.pos.y < 850 )
				drawBody(boxList[i],boxList[i].view,ctx,boxList[i].offset);
		}
	} else {
		for ( var i = 0 ; i < leftTower.length ; i ++ ){
			if ( leftTower[i].state.pos.y < 850 )
				drawBody(leftTower[i],leftTower[i].view,ctx,leftTower[i].offset);
		}
		for ( var i = 0 ; i < rightTower.length ; i ++ ){
			if ( rightTower[i].state.pos.y < 850 )
				drawBody(rightTower[i],rightTower[i].view,ctx,rightTower[i].offset);
		}
	}
}

var fixBoxCollision = function(){

}

var initMouseMove = function(e){
	document.body.style.cursor = "default" ;
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
		hookBox.state.acc.y = 0 ;
		hookBox.size = boxType[nextBox].size ; 
		world.add(hookBox);
		if ( amount === 1 )
			boxList.push(hookBox) ;
		else {
			if ( Math.abs(hookBox.state.pos.x - leftMax.state.pos.x) <= Math.abs(hookBox.state.pos.x - rightMax.state.pos.x) ){
				leftMax = hookBox ;
				leftTower.push(hookBox) ;
			} else {
				rightMax = hookBox ;
				rightTower.push(hookBox) ;
			}
		}
		reloadTimer = setTimeout(reloadHook,2000); 
	}
}

var toNext = function(){
	if ( nowPage === 'stage1' )
		nowPage = 'stage2' ;
	else if ( nowPage === 'stage2' )
		nowPage = 'stage3' ;
	else if ( nowPage === 'stage3' )
		nowPage = 'stage4' ;
	else if ( nowPage === 'stage4' )
		nowPage = 'stage5' ;
	else if ( nowPage === 'stage5' ){
		;
	}
}

var showTeach = function(){
	if ( nowPage === 'stage2'){
		ctx.drawImage(getImage('teach2'),172,200,431,149) ;
		if ( mouseOver === 'start')
			ctx.drawImage(getImage('start2'),315,400,146,64) ;
		else 
		 ctx.drawImage(getImage('start'),315,400,146,64) ;
	} else if ( nowPage === 'stage3' ){
		ctx.drawImage(getImage('teach3'),172,200,431,149) ;
		if ( mouseOver === 'start')
			ctx.drawImage(getImage('start2'),315,400,146,64) ;
		else 
		 ctx.drawImage(getImage('start'),315,400,146,64) ;
	} else if ( nowPage === 'stage4' ){
		ctx.drawImage(getImage('teach4'),172,200,431,149) ;
		if ( mouseOver === 'start')
			ctx.drawImage(getImage('start2'),315,400,146,64) ;
		else 
		 ctx.drawImage(getImage('start'),315,400,146,64) ;
	} else if ( nowPage === 'stage5' ){
		ctx.drawImage(getImage('teach5'),172,200,431,149) ;
		if ( mouseOver === 'start')
			ctx.drawImage(getImage('start2'),315,400,146,64) ;
		else 
		 ctx.drawImage(getImage('start'),315,400,146,64) ;
	}
}

var gameWinMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
		 Math.abs( (tempY - 447 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780 ) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'next' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var gameWinMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
		 Math.abs( (tempY - 447 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780 ) {
		if ( nowPage === 'stage5' ){
			toRank();
			nowPage = 'rank' ;
		} else {
			toNext();
			mouseOver = 'none' ;
			resetAll();
		}
	} else {
		mouseOver = 'none' ;
	}
}

var gameOverMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
		 Math.abs( (tempY - 386 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'again' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var gameOverMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;	
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
		 Math.abs( (tempY - 386 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	) {
		isGameOver = false ;
		mouseOver = 'none' ;
		resetAll();
	} else {
		mouseOver = 'none' ;
	}
}

var drawBackGroundRight = function(){
	if ( amount === 1 ){
		if ( backGroundRightOneCtx.cache === undefined ){
			backGroundRightOneCanvas.width = 172 ;
			backGroundRightOneCanvas.height = 780 ;
			backGroundRightOneCtx.drawImage(getImage('game_bg_2'),0,0,172,780) ;
			backGroundRightOneCtx.cache = true ;
		} 
		ctx.drawImage(backGroundRightOneCanvas,c.width/2-940/2+768,0,172,780) ;
	}
	else {
		if ( backGroundRightTwoCtx.cache === undefined ){
			backGroundRightTwoCanvas.width = 172 ;
			backGroundRightTwoCanvas.height = 780 ;
			backGroundRightTwoCtx.drawImage(getImage('game_bg2_2'),0,0,172,780) ;
			backGroundRightTwoCtx.cache = true ;
		} 
		ctx.drawImage(backGroundRightTwoCanvas,c.width/2-940/2+768,0,172,780) ;
	}
}

var drawBackGroundLeft = function(){
	if ( amount === 1 ){
		if ( backGroundLeftOneCtx.cache === undefined ){
			backGroundLeftOneCanvas.width = 800 ;
			backGroundLeftOneCanvas.height = 780 ;
			backGroundLeftOneCtx.drawImage(getImage('game_bg_1'),978/2-940/2,0,768,780) ;
			backGroundLeftOneCtx.cache = true ;
		} 
		ctx.drawImage(backGroundLeftOneCtx.canvas,0,0 );
	} else {
		if ( backGroundLeftTwoCtx.cache === undefined ){
			backGroundLeftTwoCanvas.width = 800 ;
			backGroundLeftTwoCanvas.height = 780 ;
			backGroundLeftTwoCtx.drawImage(getImage('game_bg2_1'),978/2-940/2,0,768,780) ;
			backGroundLeftTwoCtx.cache = true ;
		} 
		ctx.drawImage(backGroundLeftTwoCtx.canvas,0,0 );
	}
}

var stageAllSet = function(){
	if ( FirstEnterPage === true ){
		randomBox();
	}
	//setCanvas();
	drawBackGroundLeft();
	addFloor();
	drawBox();
	drawBackGroundRight();
	fixBoxCollision();
	showNext();
	showTime();
	showNowHeight();
	showGoalHeight();
	showGoalTag();
	showNowTag();
	showTag();
	showBlock();
}

var toTeachingMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 872 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		 Math.abs( (tempY - 708 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'start' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else if ( Math.abs( (tempX - 175 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		Math.abs( (tempY - 708 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	){
		document.body.style.cursor = "pointer" ;
		mouseOver = 'return' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var toTeachingMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 872 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		 Math.abs( (tempY - 708 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	) {
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
		isTeaching = false ;
		beginCountTime();
	} else if ( Math.abs( (tempX - 175 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		Math.abs( (tempY - 708 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	){
		document.body.style.cursor = "default" ;
		nowPage = 'newGame' ;
	} else {
		mouseOver = 'none' ;
	}
}

var toTeachMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
		 Math.abs( (tempY - 386 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'teach' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else if ( Math.abs( (tempX - 175 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		Math.abs( (tempY - 708 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	){
		document.body.style.cursor = "pointer" ;
		mouseOver = 'return' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var toTeachMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
		 Math.abs( (tempY - 386 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		document.body.style.cursor = "default" ;
		toTeaching();
	} else if ( Math.abs( (tempX - 175 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		Math.abs( (tempY - 708 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	){
		document.body.style.cursor = "default" ;
		nowPage = 'newGame' ;
	} else {
		mouseOver = 'none' ;
	}
}

var toTeach = function(){
	if ( mouseOver === 'teach' ){
		ctx.drawImage(getImage('teach_button2'),270,360,252,81) ;
		ctx.drawImage(getImage('return'),100,690,146,64) ;
	}
	else if ( mouseOver === 'return' ){
		ctx.drawImage(getImage('return2'),100,690,146,64) ;
		ctx.drawImage(getImage('teach_button'),270,360,252,81) ;
	} else {
		ctx.drawImage(getImage('teach_button'),270,360,252,81) ;
		ctx.drawImage(getImage('return'),100,690,146,64) ;
	} 
}

var toTeaching = function(){
	isTeach = false ;
	isTeaching = true ;
	ctx.drawImage(getImage('teach'),19,0,940,780) ;
	ctx.drawImage(getImage('return'),100,690,146,64) ;
	ctx.drawImage(getImage('start'),800,690,146,64) ;
	if ( mouseOver === 'start' ){
		ctx.drawImage(getImage('start2'),800,690,146,64) 
	} else if ( mouseOver === 'return' ){
		ctx.drawImage(getImage('return2'),100,690,146,64) ;
	}
}

var toGame = function(){
	checkBox();
	moveUp();
}

var toFrame = function(){
	if ( isGameOver === true ){
		setMouseEvent(gameOverMouseOver,gameOverMouseClick);
		toGameOver();
	} else if ( isWin === true ){
		setMouseEvent(gameWinMouseOver,gameWinMouseClick);
		toWin();
	} else {
		setMouseEvent(initMouseMove,addBox);
		/*
		setMouseEvent(initMouseMove,addBox);
		if ( FirstEnterPage === true ){
			if ('addEventListener' in document) {
				document.addEventListener('DOMContentLoaded', function() {
					FastClick.attach(document.body);
				}, false);
			}
		}*/
		toGame();
	}
}

var rankMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( isShowConfirm === true  && Math.abs( (tempX - 612 * w / 978 ) - ((offsetX - w) / 2)  )  <=  33 * w / 978 &&
		Math.abs( (tempY - 408 * h / 780 ) - ((offsetY - h) / 2)  )  <=  14 * h / 780	){
		document.body.style.cursor = "pointer" ;
		mouseOver = 'confirm' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else if ( Math.abs( (tempX - 470 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		Math.abs( (tempY - 630 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	){
		document.body.style.cursor = "pointer" ;
		mouseOver = 'return' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}

}

var rankMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( isShowConfirm === true  && Math.abs( (tempX - 612 * w / 978 ) - ((offsetX - w) / 2)  )  <=  33 * w / 978 &&
		Math.abs( (tempY - 408 * h / 780 ) - ((offsetY - h) / 2)  )  <=  14 * h / 780	){
		document.body.style.cursor = "default" ;
		send();
	} else if ( Math.abs( (tempX - 470 * w / 978 ) - ((offsetX - w) / 2)  )  <=  72 * w / 978 &&
		Math.abs( (tempY - 630 * h / 780 ) - ((offsetY - h) / 2)  )  <=  31 * h / 780	){
		document.body.style.cursor = "default" ;
		nowPage = 'index' ;
	} else {
		mouseOver = 'none' ;
	}
	if ( isShowConfirm === true ){
		document.getElementById("input").focus();
	}
}

var indexMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 474 * w / 978 ) - ((offsetX - w) / 2)  )  <=  126 * w / 978 &&
		 Math.abs( (tempY - 310 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'new' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else if ( Math.abs( (tempX - 474 * w / 978 ) - ((offsetX - w) / 2)  )  <=  126 * w / 978 &&
		 Math.abs( (tempY - 403 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		if ( isContinue === true ){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'continue' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		}
	} else if ( Math.abs( (tempX - 474 * w / 978 ) - ((offsetX - w) / 2)  )  <=  126 * w / 978 &&
		 Math.abs( (tempY - 503 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'rank' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var indexMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 474 * w / 978 ) - ((offsetX - w) / 2)  )  <=  126 * w / 978 &&
		 Math.abs( (tempY - 310 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		nowPage = 'newGame' ;
	} else if ( Math.abs( (tempX - 474 * w / 978 ) - ((offsetX - w) / 2)  )  <=  126 * w / 978 &&
		 Math.abs( (tempY - 403 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		if ( isContinue === true ){
			document.body.style.cursor = "default" ;
			nowPage = 'continueGame' ;
		}
	} else if ( Math.abs( (tempX - 474 * w / 978 ) - ((offsetX - w) / 2)  )  <=  126 * w / 978 &&
		 Math.abs( (tempY - 503 * h / 780 ) - ((offsetY - h) / 2)  )  <=  40 * h / 780	) {
		document.body.style.cursor = "default" ;
		nowPage = 'rank' ;
	} else {
		mouseOver = 'none' ;
	}
}

var newGameMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 365 * w / 978 ) - ((offsetX - w) / 2)  )  <=  84 * w / 978 &&
		 Math.abs( (tempY - 660 * h / 780 ) - ((offsetY - h) / 2)  )  <=  35 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'return' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else if ( Math.abs( (tempX - 600 * w / 978 ) - ((offsetX - w) / 2)  )  <=  84 * w / 978 &&
		 Math.abs( (tempY - 660 * h / 780 ) - ((offsetY - h) / 2)  )  <=  35 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'continue' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	}  else {
		document.body.style.cursor = "default" ;
		buttonSound = false ;
		mouseOver = 'none' ;
	}
}

var newGameMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 365 * w / 978 ) - ((offsetX - w) / 2)  )  <=  84 * w / 978 &&
		 Math.abs( (tempY - 660 * h / 780 ) - ((offsetY - h) / 2)  )  <=  35 * h / 780	) {
		document.body.style.cursor = "default" ;
		nowPage = 'index' ;
	} else if ( Math.abs( (tempX - 600 * w / 978 ) - ((offsetX - w) / 2)  )  <=  84 * w / 978 &&
		 Math.abs( (tempY - 660 * h / 780 ) - ((offsetY - h) / 2)  )  <=  35 * h / 780	) {
		document.body.style.cursor = "default" ;
		nowPage = 'stage1' ;
		resetAll();
	} else {
		mouseOver = 'none' ;
	}
}


var continueGameMouseOver = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 470 * w / 978 ) - ((offsetX - w) / 2)  )  <=  73 * w / 978 &&
		 Math.abs( (tempY - 668 * h / 780 ) - ((offsetY - h) / 2)  )  <=  30 * h / 780	) {
		document.body.style.cursor = "pointer" ;
		mouseOver = 'return' ;
		if ( buttonSound === false ){
			document.getElementById('button').play();
			buttonSound = true ;
		}
	} else if ( Math.abs( (tempX - 224 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 280 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage1') !== null && Cookies.get('stage1') !== "" && Cookies.get('stage1') !== undefined ){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'stage1' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		}
	} else if ( Math.abs( (tempX - 472 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 280 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage2') !== null && Cookies.get('stage2') !== "" && Cookies.get('stage2') !== undefined ){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'stage2' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		}
	} else if ( Math.abs( (tempX - 730 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 280 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage3') !== null && Cookies.get('stage3') !== "" && Cookies.get('stage3') !== undefined ){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'stage3' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		}
	} else if ( Math.abs( (tempX - 318 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 505 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage4') !== null && Cookies.get('stage4') !== "" && Cookies.get('stage4') !== undefined ){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'stage4' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		}
	} else if ( Math.abs( (tempX - 632 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 505 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage5') !== null && Cookies.get('stage5') !== "" && Cookies.get('stage5') !== undefined ){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'stage5' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		}
	} else {
		buttonSound = false ;
		document.body.style.cursor = "default" ;
		mouseOver = 'none' ;
	}
}

var continueGameMouseClick = function(e){
	var temp = getMouseSite(e);
	var tempX = temp.x , tempY = temp.y ;
	var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
	var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
	var ratio = getRatio(offsetX,offsetY);
	var w = ratio.w , h = ratio.h ;
	if ( Math.abs( (tempX - 470 * w / 978 ) - ((offsetX - w) / 2)  )  <=  73 * w / 978 &&
		 Math.abs( (tempY - 668 * h / 780 ) - ((offsetY - h) / 2)  )  <=  30 * h / 780	) {
		document.body.style.cursor = "default" ;
		nowPage = 'index' ;
		mouseOver = 'none' ;
	} else if ( Math.abs( (tempX - 224 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 280 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage1') !== null && Cookies.get('stage1') !== "" && Cookies.get('stage1') !== undefined ){
			document.body.style.cursor = "default" ;
			nowPage = 'stage1' ;
			mouseOver = 'none' ;
			resetAll();
		}
	} else if ( Math.abs( (tempX - 472 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 280 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage2') !== null && Cookies.get('stage2') !== "" && Cookies.get('stage2') !== undefined ){
			document.body.style.cursor = "default" ;
			nowPage = 'stage2' ;
			mouseOver = 'none' ;
			resetAll();
		}
	} else if ( Math.abs( (tempX - 730 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 280 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage3') !== null && Cookies.get('stage3') !== "" && Cookies.get('stage3') !== undefined ){
			document.body.style.cursor = "default" ;
			nowPage = 'stage3' ;
			mouseOver = 'none' ;
			resetAll();
		}
	} else if ( Math.abs( (tempX - 318 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 505 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage4') !== null && Cookies.get('stage4') !== "" && Cookies.get('stage4') !== undefined ){
			document.body.style.cursor = "default" ;
			nowPage = 'stage4' ;
			mouseOver = 'none' ;
			resetAll();
		}
	} else if ( Math.abs( (tempX - 632 * w / 978 ) - ((offsetX - w) / 2)  )  <=  115 * w / 978 &&
		 Math.abs( (tempY - 505 * h / 780 ) - ((offsetY - h) / 2)  )  <=  90 * h / 780	) {
		if ( Cookies.get('stage5') !== null && Cookies.get('stage5') !== "" && Cookies.get('stage5') !== undefined ){
			document.body.style.cursor = "default" ;
			nowPage = 'stage5' ;
			mouseOver = 'none' ;
			resetAll();
		}
	} else {
		mouseOver = 'none' ;
	}
}

var newGame = function(){
	setMouseEvent(newGameMouseOver,newGameMouseClick);
	ctx.drawImage(getImage('teach_bg'),c.width/2-940/2,0,940,780);
	ctx.drawImage(getImage('new_return'),280,650,168,71);
	ctx.drawImage(getImage('new_continue'),520,650,168,71);
	ctx.drawImage(getImage('shovel'),730,580,155,174);
	if ( mouseOver === 'return' ){
		ctx.drawImage(getImage('new_return2'),280,650,168,71);
	} else if ( mouseOver === 'continue' ){
		ctx.drawImage(getImage('new_continue2'),520,650,168,71);
	}
}

var continueGame = function(){
	setMouseEvent(continueGameMouseOver,continueGameMouseClick);
	ctx.drawImage(getImage('lv_bg'),c.width/2-940/2,0,940,780);
	ctx.drawImage(getImage('return'),400,660,146,61);
	if ( Cookies.get('stage1') !== null && Cookies.get('stage1') !== "" && Cookies.get('stage1') !== undefined )
		ctx.drawImage(getImage('lv1'),100,200,233,179);
	else 
		ctx.drawImage(getImage('lv1_3'),100,200,233,179);
	if ( Cookies.get('stage2') !== null && Cookies.get('stage2') !== "" && Cookies.get('stage2') !== undefined )
		ctx.drawImage(getImage('lv2'),360,200,233,179);
	else 
		ctx.drawImage(getImage('lv2_3'),360,200,233,179);
	if ( Cookies.get('stage3') !== null && Cookies.get('stage3') !== "" && Cookies.get('stage3') !== undefined )
		ctx.drawImage(getImage('lv3'),620,200,233,179);
	else 
		ctx.drawImage(getImage('lv3_3'),620,200,233,179);
	if ( Cookies.get('stage4') !== null && Cookies.get('stage4') !== "" && Cookies.get('stage4') !== undefined )
		ctx.drawImage(getImage('lv4'),200,430,233,179);
	else 
		ctx.drawImage(getImage('lv4_3'),200,430,233,179);
	if ( Cookies.get('stage5') !== null && Cookies.get('stage5') !== "" && Cookies.get('stage5') !== undefined )
		ctx.drawImage(getImage('lv5'),520,430,233,179);
	else 
		ctx.drawImage(getImage('lv5_3'),520,430,233,179);
	if ( mouseOver === 'return' )
		ctx.drawImage(getImage('return2'),400,660,146,61);
	else if ( mouseOver === 'stage1' && Cookies.get('stage1') !== null && Cookies.get('stage1') !== "" && Cookies.get('stage1') !== undefined )
		ctx.drawImage(getImage('lv1_2'),100,200,233,179);
	else if ( mouseOver === 'stage2' && Cookies.get('stage2') !== null && Cookies.get('stage2') !== "" && Cookies.get('stage2') !== undefined )
		ctx.drawImage(getImage('lv2_2'),360,200,233,179);
	else if ( mouseOver === 'stage3' && Cookies.get('stage3') !== null && Cookies.get('stage3') !== "" && Cookies.get('stage3') !== undefined )
		ctx.drawImage(getImage('lv3_2'),620,200,233,179);
	else if ( mouseOver === 'stage4' && Cookies.get('stage4') !== null && Cookies.get('stage4') !== "" && Cookies.get('stage4') !== undefined )
		ctx.drawImage(getImage('lv4_2'),200,430,233,179);
	else if ( mouseOver === 'stage5' && Cookies.get('stage5') !== null && Cookies.get('stage5') !== "" && Cookies.get('stage5') !== undefined )
		ctx.drawImage(getImage('lv5_2'),520,430,233,179);
}

var index = function(){
	setMouseEvent(indexMouseOver,indexMouseClick);
	ctx.drawImage(getImage('index'),c.width/2-940/2,0,940,780);
	ctx.drawImage(getImage('new'),350,280,252,81);
	ctx.drawImage(getImage('continue'),350,380,252,81);
	ctx.drawImage(getImage('rank'),350,480,252,81);
	ctx.drawImage(getImage('pig'),600,200,298,431);
	if (mouseOver === 'new'){
		ctx.drawImage(getImage('new2'),350,280,252,81);
	} else if ( mouseOver === 'continue'){
		ctx.drawImage(getImage('continue2'),350,380,252,81);
	} else if ( mouseOver === 'rank' )
		ctx.drawImage(getImage('rank2'),350,480,252,81);
}

var rank = function(){
	setMouseEvent(rankMouseOver,rankMouseClick);
	ctx.drawImage(getImage('rank_bg'),c.width/2-940/2,0,940,780);
	ctx.drawImage(getImage('return'),400,625,146,64) ;
	if (mouseOver === 'return'){
		ctx.drawImage(getImage('return2'),400,625,146,64) ;
	} 
	ctx.font="bold 40px Microsoft JhengHei";
	ctx.fillStyle = 'brown' ;
	ctx.fillText("排名",300,280,100,100) ;
	ctx.fillText("名稱",430,280,100,100) ;
	ctx.fillText("分數",560,280,100,100) ;
	ctx.font="bold 30px Microsoft JhengHei";
	ctx.fillStyle = 'black' ;
	for ( var i = 1 ; i <= 6 ; i ++ ){
		var player = Cookies.getJSON("theRank"+i) ;
		ctx.fillText(i,328,280+i*50,100,100) ;
		ctx.fillText(player.name,430,280+i*50,100,100) ;
		ctx.fillText(player.score,580,280+i*50,100,100) ;
	}
	ctx.font="30px Arial";
	if ( isShowConfirm === true ){
		showConfirm();
	}
}


// stage1
var Stage1 = function(){
	stageAllSet();
	initFirstBox();
	drawHook(false);
	moveHook(false);
	boxTouch();
	if ( isTeach === true ){
		setMouseEvent(toTeachMouseOver,toTeachMouseClick);
		toTeach();
	} else if ( isTeaching === true ){
		setMouseEvent(toTeachingMouseOver,toTeachingMouseClick);
		toTeaching() ;
	} else {
		toFrame();
	}
	FirstEnterPage = false ;
}

// stage 2 

var Stage2 = function(){
	stageAllSet();
	initFirstBox();
	drawHook(false);
	moveHook(false);
	boxTouch();
	if ( isTeach === true ){
		setMouseEvent(showTeachMouseOver,showTeachMouseClick);
		showTeach();
	} else {
		toFrame();
	}
	FirstEnterPage = false ;
}

// stage3

var Stage3 = function(){
	stageAllSet();
	initFirstBox();
	drawHook(false);
	moveHook(false);
	boxTouch();
	if ( isTeach === true ){
		setMouseEvent(showTeachMouseOver,showTeachMouseClick);
		showTeach();
	} else {
		toFrame();
	}
	fixLeftAndRight() ;
	FirstEnterPage = false ;
}

// stage4
var Stage4 = function(){
	stageAllSet();
	initFirstBox();
	drawHook(true);
	moveHook(true);
	boxTouch();
	if ( isTeach === true ){
		setMouseEvent(showTeachMouseOver,showTeachMouseClick);
		showTeach();
	} else {
		toFrame();
	}
	FirstEnterPage = false ;
}

// stage5
var Stage5 = function(){
	stageAllSet();
	initFirstBox();
	drawHook(true);
	moveHook(true);
	boxTouch();
	if ( isTeach === true ){
		setMouseEvent(showTeachMouseOver,showTeachMouseClick);
		showTeach();
	} else {
		toFrame();
	}
	FirstEnterPage = false ;
	fixLeftAndRight() ;
}


var changePage = function(){
	requestAnimationFrame(changePage);
	if ( nowPage === 'index' ){
		index();
	} else if ( nowPage === 'rank' ){
		rank(); 
	} else if ( nowPage === 'continueGame' ){
		continueGame();
	} else if ( nowPage === 'newGame' ){
		newGame();
	} else if ( nowPage === 'stage1' ){
		Stage1();
	} else if ( nowPage === 'stage2' ){
		Stage2();
	} else if ( nowPage === 'stage3' ){
		Stage3();
	} else if ( nowPage === 'stage4' ){
		Stage4();
	} else if ( nowPage === 'stage5' ){
		Stage5();
	}
}

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

/*
Cookies.remove('stage1');
Cookies.remove('stage2');
Cookies.remove('stage3');
Cookies.remove('stage4');
Cookies.remove('stage5');
*/

init();
