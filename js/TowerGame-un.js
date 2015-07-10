var c;
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 1E3 / 60)
    }
}();
var backGroundLeftOneCanvas = document.createElement("canvas"),
    backGroundLeftOneCtx = backGroundLeftOneCanvas.getContext("2d"),
    backGroundRightOneCanvas = document.createElement("canvas"),
    backGroundRightOneCtx = backGroundRightOneCanvas.getContext("2d"),
    backGroundLeftTwoCanvas = document.createElement("canvas"),
    backGroundLeftTwoCtx = backGroundLeftTwoCanvas.getContext("2d"),
    backGroundRightTwoCanvas = document.createElement("canvas"),
    backGroundRightTwoCtx = backGroundRightTwoCanvas.getContext("2d"),
    goalTagRightCanvas =
    document.createElement("canvas"),
    goalTagRightCtx = goalTagRightCanvas.getContext("2d"),
    nowTagRightCanvas = document.createElement("canvas"),
    nowTagRightCtx = nowTagRightCanvas.getContext("2d"),
    goalTagLeftCanvas = document.createElement("canvas"),
    goalTagLeftCtx = goalTagLeftCanvas.getContext("2d"),
    nowTagLeftCanvas = document.createElement("canvas"),
    nowTagLeftCtx = nowTagLeftCanvas.getContext("2d"),
    tagTopRightCanvas = document.createElement("canvas"),
    tagTopRightCtx = tagTopRightCanvas.getContext("2d"),
    tagDownRightCanvas =
    document.createElement("canvas"),
    tagDownRightCtx = tagDownRightCanvas.getContext("2d"),
    tagTopLeftCanvas = document.createElement("canvas"),
    tagTopLeftCtx = tagTopLeftCanvas.getContext("2d"),
    tagDownLeftCanvas = document.createElement("canvas"),
    tagDownLeftCtx = tagDownLeftCanvas.getContext("2d"),
    stage1Canvas = document.createElement("canvas"),
    stage1Ctx = stage1Canvas.getContext("2d"),
    stage2Canvas = document.createElement("canvas"),
    stage2Ctx = stage2Canvas.getContext("2d"),
    stage3Canvas = document.createElement("canvas"),
    stage3Ctx = stage3Canvas.getContext("2d"),
    stage4Canvas = document.createElement("canvas"),
    stage4Ctx = stage4Canvas.getContext("2d"),
    stage5Canvas = document.createElement("canvas"),
    stage5Ctx = stage5Canvas.getContext("2d"),
    cloud1Canvas = document.createElement("canvas"),
    cloud1Ctx = cloud1Canvas.getContext("2d"),
    cloud2Canvas = document.createElement("canvas"),
    cloud2Ctx = cloud2Canvas.getContext("2d"),
    cloud3Canvas = document.createElement("canvas"),
    cloud3Ctx = cloud3Canvas.getContext("2d"),
    goIndexCanvas = document.createElement("canvas"),
    goIndexCtx = goIndexCanvas.getContext("2d"),
    goIndex2Canvas = document.createElement("canvas"),
    goIndex2Ctx = goIndex2Canvas.getContext("2d"),
	cloud1X , cloud2X , cloud3X ,
    beginCount, cacheMap = {},
    hookCache = {},
    pigIndex = 0,
    nextCache = {};
document.getElementById("bg").src = "sound/background.mp3";
document.getElementById("fail").src = "sound/fail.mp3";
document.getElementById("win").src = "sound/win.mp3";
document.getElementById("box").src = "sound/box.mp3";
document.getElementById("button").src = "sound/button.mp3";
var imageList = "hook hook2 box1 box2 game_bg_1 game_bg_2 game_bg2_1 game_bg2_2 0 1 2 3 4 5 6 7 8 9 02 12 22 32 42 52 62 72 82 92 M tag tag2 tag3 tag_2 tag3_2 nowtag goaltag nowtag2 goaltag2 box_small box_small2 box_small3 box_mid box_mid2 base box_big box_big2 box_super box_super2 box_other box_other2 box_other3 box_other4 fail again again2 win next next2 return return2 teach teach_button teach_button2 start start2 teach2 teach3 teach4 teach5 new new2 pig pig2 continue continue2 rank rank2 index shovel shovel2 teach_bg new_return new_return2 new_continue new_continue2 rank_bg confirm confirm2 input lv_bg lv1 lv1_2 lv1_3 lv2 lv2_2 lv2_3 lv3 lv3_2 lv3_3 lv4 lv4_2 lv4_3 lv5 lv5_2 lv5_3 stage1 stage2 stage3 stage4 stage5 cloud1 cloud2 cloud3 goindex goindex2".split(" "),
    simpleBoxList = ["box_big", "box_big2", "box_super", "box_super2"],
    allBoxList = "box_small box_small2 box_small3 box_mid box_mid2 box_big box_big2 box_super box_super2 box_other box_other2 box_other3 box_other4".split(" "),
    normalBoxList = "box_small box_small2 box_small3 box_mid box_mid2 box_big box_big2 box_super box_super2 box_other box_other2 box_other3".split(" "),
    randomType = 1,
    leftTower = [],
    rightTower = [],
    imageMap = {},
    resulotion, width, heigth, ctx, nowPage = "index",
    boxList = [],
    hasFirstBox = !1,
    isGameOver = !1,
    viewWidth = 1500,
    viewHeight =
    780,
    upperBound = 600,
    upperBound2 = 550,
    reloadTimer, leftMax, rightMax, hookMoveSpeed = 5,
    hookAngleSpeed = .02,
    hookload = !0,
    FirstEnterPage = !0,
    nextBox, remainTime = 120,
    countTimer, nowHeight = 0,
    isBoxTouch = !1,
    addHeightTimer, addLeftHeightTimer, addRightHeightTimer, remainHeight, remainLeftHeight, remainRightHeight, goalHeight = 3,
    nowLeftHeight, nowRightHeight, isPush = !1,
    isWin = !1,
    amount, mouseOver = "none",
    spin = !0,
    isTeach = !1,
    isTeaching = !1,
    isContinue = !1,
    isShowConfirm = !1,
    rankSite, inputBox = [],
    total = 0,
    buttonSound = !1,
    winSound = !1,
    failSound = !1,
    boxSound = !1,
    lastBox = {
        x: 0,
        y: 0
    },
	speed1 = 60 , speed2 = 80 , speed3 = 70 ,
    hook, hookBox, boxType = {},
    IE = "ActiveXObject" in window,
    pageTimer, world, getNextPage = function() {
        if ("stage1" === nowPage) return "stage2";
        if ("stage2" === nowPage) return "stage3";
        if ("stage3" === nowPage) return "stage4";
        if ("stage4" === nowPage) return "stage5"
    },
	showCloud = function() {
		var initCloud1X = 50 , initCloud2X = 170 , initCloud3X = 600 ; 
		cloud1X += speed1 , cloud2X += speed2 , cloud3X += speed3 ;
		if ( Math.abs(cloud1X - initCloud1X ) >= 100 )
			speed1 *= -1 ;
		if ( Math.abs(cloud2X - initCloud2X ) >= 150 )
			speed2 *= -1 ;
		if ( Math.abs(cloud3X - initCloud3X ) >= 50 )
			speed3 *= -1 ;
		if ( cloud1Ctx.cache === undefined ){
			cloud1Canvas.width = 82 ;
			cloud1Canvas.height = 53 ;
			cloud1Ctx.drawImage(getImage('cloud1'),0,0,82,53) ;
			cloud1Ctx.cache = true ;
		} 
		ctx.drawImage(cloud1Canvas,cloud1X,50) ;
		if ( cloud3Ctx.cache === undefined ){
			cloud3Canvas.width = 82 ;
			cloud3Canvas.height = 53 ;
			cloud3Ctx.drawImage(getImage('cloud3'),0,0,82,53) ;
			cloud3Ctx.cache = true ;
		} 
		ctx.drawImage(cloud3Canvas,cloud3X,100) ;
		if ( cloud2Ctx.cache === undefined ){
			cloud2Canvas.width = 138 ;
			cloud2Canvas.height = 89 ;
			cloud2Ctx.drawImage(getImage('cloud2'),0,0,138,89) ;
			cloud2Ctx.cache = true ;
		} 
		ctx.drawImage(cloud2Canvas,cloud2X,100) ;
	} ,
    showStage = function() {
        "stage1" === nowPage ? (void 0 === stage1Ctx.cache && (stage1Canvas.width = 140, stage1Canvas.height = 70, stage1Ctx.drawImage(getImage("stage1"), 0, 0, 140, 70), stage1Ctx.cache = !0), ctx.drawImage(stage1Ctx.canvas, 800, 50)) : "stage2" ===
            nowPage ? (void 0 === stage2Ctx.cache && (stage2Canvas.width = 140, stage2Canvas.height = 70, stage2Ctx.drawImage(getImage("stage2"), 0, 0, 140, 70), stage2Ctx.cache = !0), ctx.drawImage(stage2Ctx.canvas, 800, 50)) : "stage3" === nowPage ? (void 0 === stage3Ctx.cache && (stage3Canvas.width = 140, stage3Canvas.height = 70, stage3Ctx.drawImage(getImage("stage3"), 0, 0, 140, 70), stage3Ctx.cache = !0), ctx.drawImage(stage3Ctx.canvas, 800, 50)) : "stage4" === nowPage ? (void 0 === stage4Ctx.cache && (stage4Canvas.width = 140, stage4Canvas.height = 70, stage4Ctx.drawImage(getImage("stage4"),
                0, 0, 140, 70), stage4Ctx.cache = !0), ctx.drawImage(stage4Ctx.canvas, 800, 50)) : "stage5" === nowPage && (void 0 === stage5Ctx.cache && (stage5Canvas.width = 140, stage5Canvas.height = 70, stage5Ctx.drawImage(getImage("stage5"), 0, 0, 140, 70), stage5Ctx.cache = !0), ctx.drawImage(stage5Ctx.canvas, 800, 50))
    },
    saveData = function() {
        var a = Cookies.get(nowPage);
        (null === a || "" === a || void 0 === a || parseInt(a) < remainTime) && Cookies.set(nowPage, remainTime, {
            expires: 36500
        });
        a = Cookies.get(getNextPage());
        null !== a && "" !== a && void 0 !== a || Cookies.set(getNextPage(),
            0, {
                expires: 36500
            })
    },
    setMouseEvent = function(a, b) {
        document.onclick = b;
        document.onmousemove = a;
        document.ontouchend = b
    },
    getMouseSite = function(a) {
        var b;
        IE ? (b = event.clientX + document.body.scrollLeft, a = event.clientY + document.body.scrollTop) : (b = a.pageX, a = a.pageY);
        return {
            x: b,
            y: a
        }
    },
    getRatio = function(a, b) {
        var f = 978 / 780,
            g;
        f > a / b ? (g = a / f, f = a) : (f *= b, g = b);
        return {
            w: f,
            h: g
        }
    },
    showTeachMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 388 * e / 978 - (f - e) / 2) <= 73 * e / 978 && Math.abs(b - 418 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "start", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver = "none")
    },
    showTeachMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 388 * e / 978 - (f - e) / 2) <= 73 * e / 978 && Math.abs(b - 418 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (isTeaching = isTeach = !1, mouseOver = "none", beginCountTime()) : mouseOver = "none"
    },
    fixLeftAndRight = function() {
        if (leftMax.state.pos.x > rightMax.state.pos.x) {
            var a = leftMax;
            leftMax = rightMax;
            rightMax = a
        }
    },
    makeType = function(a, b, f) {
        return {
            width: a,
            height: b,
            size: f
        }
    },
    detectPoly = function(a) {
        return "box_other" === a || "box_other2" === a || "box_other3" === a || "box_other4" === a ? !0 : !1
    },
    makeBoxType = function() {
        boxType.base =
            makeType(139, 119, 5);
        boxType.box_super = makeType(218, 90, 5);
        boxType.box_super2 = makeType(218, 75, 4);
        boxType.box_big = makeType(179, 90, 5);
        boxType.box_big2 = makeType(179, 75, 4);
        boxType.box_mid = makeType(139, 119, 5);
        boxType.box_mid2 = makeType(139, 104, 4);
        boxType.box_small = makeType(139, 89, 5);
        boxType.box_small2 = makeType(139, 76, 4);
        boxType.box_small3 = makeType(129, 89, 5);
        boxType.box_other = makeType(203, 69, 4);
        boxType.box_other2 = makeType(203, 69, 4);
        boxType.box_other3 = makeType(119, 89, 5);
        boxType.box_other4 = makeType(119, 89, 5)
    },
    showBlock = function() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, c.width / 2 - 470, c.height);
        ctx.fillRect(c.width - (c.width / 2 - 470), 0, c.width / 2 - 470, c.height)
    },
    showTag = function() {
        1 === amount ? (void 0 === tagTopRightCanvas.cache && (tagTopRightCanvas.width = 37, tagTopRightCanvas.height = 18, tagTopRightCtx.drawImage(getImage("tag"), 0, 0, 37, 18), tagTopRightCanvas.cache = !0), ctx.drawImage(tagTopRightCanvas, 742, 738 - 510 * nowHeight / goalHeight), ctx.drawImage(getImage("tag2"), 742, 712 - 510 * nowHeight / goalHeight + 43, 37, 510 * nowHeight / goalHeight),
            void 0 === tagDownRightCanvas.cache && (tagDownRightCanvas.width = 37, tagDownRightCanvas.height = 19, tagDownRightCtx.drawImage(getImage("tag3"), 0, 0, 37, 19), tagDownRightCanvas.cache = !0), ctx.drawImage(tagDownRightCanvas, 742, 755)) : 2 === amount && (void 0 === tagTopRightCanvas.cache && (tagTopRightCanvas.width = 37, tagTopRightCanvas.height = 18, tagTopRightCtx.drawImage(getImage("tag"), 0, 0, 37, 18), tagTopRightCanvas.cache = !0), ctx.drawImage(tagTopRightCanvas, 744, 738 - 516 * nowRightHeight / goalHeight), ctx.drawImage(getImage("tag2"),
            744, 712 - 516 * nowRightHeight / goalHeight + 43, 35, 516 * nowRightHeight / goalHeight), void 0 === tagDownRightCanvas.cache && (tagDownRightCanvas.width = 37, tagDownRightCanvas.height = 19, tagDownRightCtx.drawImage(getImage("tag3"), 0, 0, 37, 19), tagDownRightCanvas.cache = !0), ctx.drawImage(tagDownRightCanvas, 744, 755), void 0 === tagTopLeftCanvas.cache && (tagTopLeftCanvas.width = 35, tagTopLeftCanvas.height = 18, tagTopLeftCtx.drawImage(getImage("tag_2"), 0, 0, 35, 18), tagTopLeftCanvas.cache = !0), ctx.drawImage(tagTopLeftCanvas, 22, 738 - 516 *
            nowLeftHeight / goalHeight), ctx.drawImage(getImage("tag2"), 22, 712 - 516 * nowLeftHeight / goalHeight + 43, 35, 516 * nowLeftHeight / goalHeight), void 0 === tagDownLeftCanvas.cache && (tagDownLeftCanvas.width = 35, tagDownLeftCanvas.height = 19, tagDownLeftCtx.drawImage(getImage("tag3_2"), 0, 0, 35, 19), tagDownLeftCanvas.cache = !0), ctx.drawImage(tagDownLeftCanvas, 22, 755))
    },
    showNowTag = function() {
        if (1 === amount) {
            void 0 === nowTagRightCanvas.cache && (nowTagRightCanvas.width = 95, nowTagRightCanvas.height = 32, nowTagRightCtx.drawImage(getImage("nowtag"),
                0, 0, 95, 32), nowTagRightCanvas.cache = !0);
            ctx.drawImage(nowTagRightCanvas, 635, 739 - 511 * nowHeight / goalHeight);
            var a = 675 + 8 * (nowHeight.toString().length - 1),
                b = nowHeight;
            ctx.drawImage(getImage("M"), a, 745 - 511 * nowHeight / goalHeight, 15, 20);
            for (a -= 16; 0 <= b && (ctx.drawImage(getImage(b % 10 + "2"), a, 745 - 511 * nowHeight / goalHeight, 15, 20), b = Math.floor(b / 10), a -= 16, 0 !== b););
        } else if (2 === amount) {
            void 0 === nowTagRightCanvas.cache && (nowTagRightCanvas.width = 95, nowTagRightCanvas.height = 32, nowTagRightCtx.drawImage(getImage("nowtag"),
                0, 0, 95, 32), nowTagRightCanvas.cache = !0);
            ctx.drawImage(nowTagRightCanvas, 645, 738 - 516 * nowRightHeight / goalHeight);
            a = 685 + 8 * (nowRightHeight.toString().length - 1);
            b = nowRightHeight;
            ctx.drawImage(getImage("M"), a, 744 - 516 * nowRightHeight / goalHeight, 15, 20);
            for (a -= 16; 0 <= b && (ctx.drawImage(getImage(b % 10 + "2"), a, 744 - 516 * nowRightHeight / goalHeight, 15, 20), b = Math.floor(b / 10), a -= 16, 0 !== b););
            void 0 === nowTagLeftCanvas.cache && (nowTagLeftCanvas.width = 95, nowTagLeftCanvas.height = 32, nowTagLeftCtx.drawImage(getImage("nowtag2"),
                0, 0, 95, 32), nowTagLeftCanvas.cache = !0);
            ctx.drawImage(nowTagLeftCanvas, 62, 738 - 516 * nowLeftHeight / goalHeight);
            a = 115 + 8 * (nowLeftHeight.toString().length - 1);
            b = nowLeftHeight;
            ctx.drawImage(getImage("M"), a, 744 - 516 * nowLeftHeight / goalHeight, 15, 20);
            for (a -= 16; 0 <= b && (ctx.drawImage(getImage(b % 10 + "2"), a, 744 - 516 * nowLeftHeight / goalHeight, 15, 20), b = Math.floor(b / 10), a -= 16, 0 !== b););
        }
    },
    showGoalTag = function() {
        if (1 === amount) {
            void 0 === goalTagRightCanvas.cache && (goalTagRightCanvas.width = 95, goalTagRightCanvas.height = 32, goalTagRightCtx.drawImage(getImage("goaltag"),
                0, 0, 95, 32), goalTagRightCanvas.cache = !0);
            ctx.drawImage(goalTagRightCanvas, 635, 236);
            var a = 675 + 8 * (goalHeight.toString().length - 1),
                b = goalHeight;
            ctx.drawImage(getImage("M"), a, 242, 15, 20);
            for (a -= 16; 0 <= b && (ctx.drawImage(getImage(b % 10 + "2"), a, 242, 15, 20), b = Math.floor(b / 10), a -= 16, 0 !== b););
        } else if (2 === amount) {
            void 0 === goalTagRightCanvas.cache && (goalTagRightCanvas.width = 95, goalTagRightCanvas.height = 32, goalTagRightCtx.drawImage(getImage("goaltag"), 0, 0, 95, 32), goalTagRightCanvas.cache = !0);
            ctx.drawImage(goalTagRightCanvas,
                645, 230);
            a = 685 + 8 * (goalHeight.toString().length - 1);
            b = goalHeight;
            ctx.drawImage(getImage("M"), a, 236, 15, 20);
            for (a -= 16; 0 <= b && (ctx.drawImage(getImage(b % 10 + "2"), a, 236, 15, 20), b = Math.floor(b / 10), a -= 16, 0 !== b););
            void 0 === goalTagLeftCanvas.cache && (goalTagLeftCanvas.width = 95, goalTagLeftCanvas.height = 32, goalTagLeftCtx.drawImage(getImage("goaltag2"), 0, 0, 95, 32), goalTagLeftCanvas.cache = !0);
            ctx.drawImage(goalTagLeftCanvas, 62, 230);
            a = 115 + 8 * (goalHeight.toString().length - 1);
            b = goalHeight;
            ctx.drawImage(getImage("M"), a, 236,
                15, 20);
            for (a -= 16; 0 <= b && (ctx.drawImage(getImage(b % 10 + "2"), a, 236, 15, 20), b = Math.floor(b / 10), a -= 16, 0 !== b););
        }
    },
    showGoalHeight = function() {
        1 === amount ? (ctx.font = "30px Arial", ctx.fillStyle = "#C5453E", ctx.fillText(goalHeight + " m", 855 - 10 * goalHeight.toString().length, 220, 300, 50)) : 2 === amount && (ctx.font = "30px Arial", ctx.fillStyle = "#C5453E", ctx.fillText(goalHeight + " m", 855 - 10 * goalHeight.toString().length, 187, 300, 50), ctx.fillText(goalHeight + " m", 855 - 10 * goalHeight.toString().length, 365, 300, 50))
    },
    showNowHeight = function() {
        1 ===
            amount ? (ctx.font = "30px Arial", ctx.fillStyle = "#28231E", ctx.fillText(nowHeight + " m", 855 - 10 * nowHeight.toString().length, 320, 300, 50)) : 2 === amount && (ctx.font = "30px Arial", ctx.fillStyle = "#28231E", ctx.fillText(nowLeftHeight + " m", 855 - 10 * nowLeftHeight.toString().length, 260, 300, 50), ctx.fillText(nowRightHeight + " m", 855 - 10 * nowRightHeight.toString().length, 438, 300, 50))
    },
    countTime = function() {
        0 >= remainTime ? toGameOver() : --remainTime
    },
    showTime = function() {
        if (1 === amount)
            for (var a = 825 + 25 * remainTime.toString().length,
                    b = remainTime; 0 <= b && (ctx.drawImage(getImage(b % 10), a, 420, 50, 50), b = Math.floor(b / 10), a -= 50, 0 !== b););
        else if (2 === amount)
            for (a = 820 + 25 * remainTime.toString().length, b = remainTime; 0 <= b && (ctx.drawImage(getImage(b % 10), a, 525, 50, 50), b = Math.floor(b / 10), a -= 50, 0 !== b););
    },
    randomBox = function() {
        0 === randomType ? nextBox = simpleBoxList[Math.floor(Math.random() * simpleBoxList.length)] : 1 === randomType ? nextBox = allBoxList[Math.floor(Math.random() * allBoxList.length)] : 2 === randomType && (nextBox = normalBoxList[Math.floor(Math.random() *
            normalBoxList.length)])
    },
    showNext = function() {
        if (1 === amount) {
            if (void 0 === nextCache[nextBox]) {
                var a = document.createElement("canvas");
                a.width = 70 * boxType[nextBox].width / 100;
                a.height = 70 * boxType[nextBox].height / 100;
                var b = a.getContext("2d");
                b.drawImage(getImage(nextBox), 0, 0, a.width, a.height);
                nextCache[nextBox] = a
            }
            ctx.drawImage(nextCache[nextBox], 860 - 30 * boxType[nextBox].width / 100, 600)
        } else 2 === amount && (void 0 === nextCache[nextBox] && (a = document.createElement("canvas"), a.width = 70 * boxType[nextBox].width / 100, a.height =
            70 * boxType[nextBox].height / 100, b = a.getContext("2d"), b.drawImage(getImage(nextBox), 0, 0, a.width, a.height), nextCache[nextBox] = a), ctx.drawImage(nextCache[nextBox], 860 - 30 * boxType[nextBox].width / 100, 680))
    },
    createBox = function(a, b, f, g, d, e, l) {
        return Physics.body(a, {
            x: b,
            y: f,
            width: g,
            height: d,
            treatment: e,
            view: l
        })
    },
    createPoly = function(a, b, f, g, d, e, l, h) {
        f = [];
        "box_other" === b ? f = [{
            x: 0,
            y: 67
        }, {
            x: 35,
            y: 0
        }, {
            x: 202,
            y: 0
        }, {
            x: 171,
            y: 67
        }] : "box_other2" === b ? f = [{
            x: 0,
            y: 67
        }, {
            x: 35,
            y: 0
        }, {
            x: 202,
            y: 0
        }, {
            x: 171,
            y: 67
        }] : "box_other3" === b ? f = [{
            x: 0,
            y: 0
        }, {
            x: 20,
            y: 77
        }, {
            x: 100,
            y: 77
        }, {
            x: 118,
            y: 0
        }] : "box_other4" === b && (f = [{
            x: 21,
            y: 0
        }, {
            x: 0,
            y: 88
        }, {
            x: 118,
            y: 88
        }, {
            x: 100,
            y: 0
        }]);
        return Physics.body(a, {
            vertices: f,
            treatment: l,
            view: h
        })
    },
    makeImage = function(a) {
        var b = new Image;
        b.src = "img/" + a + ".png";
        imageMap[a] = b
    },
    makeAllImage = function() {
        for (var a = 0; a < imageList.length; a++) makeImage(imageList[a])
    },
    getImage = function(a) {
        return imageMap[a]
    },
    drawBody = function(a, b, f, g) {
        if ("hook" === a.label) {
            var d = a.state.pos,
                e = a.offset,
                l = a.state.vel,
                h = this._interpolateTime || 0,
                k, h = a.state.angular.pos +
                a.state.angular.vel * h,
                e = hookCache[h];
            void 0 !== e ? f.drawImage(e, a.state.pos.x - e.width / 2, a.state.pos.y - e.height / 2) : (e = document.createElement("canvas"), e.width = 2 * b.width, e.height = 2 * b.height, k = e.getContext("2d"), k.save(), k.translate(b.width / 2, b.height / 2), k.translate(b.width / 2, b.height / 2), k.rotate(h), k.translate(-b.width / 2, -b.height / 2), k.drawImage(b, 0, 0, b.width, b.height), k.restore(), f.drawImage(e, a.state.pos.x - e.width / 2, a.state.pos.y - e.height / 2), hookCache[h] = e)
        } else d = a.state.pos, e = a.offset, l = a.state.vel,
            h = this._interpolateTime || 0, g = g || this.options.offset, k = d._[0] + g.x + l._[0] * h, g = d._[1] + g.y + l._[1] * h, h = a.state.angular.pos + a.state.angular.vel * h, f.save(), f.translate(k, g), f.rotate(h), f.translate(e._[0], e._[1]), f.drawImage(b, -b.width / 2, -b.height / 2, b.width, b.height), f.restore()
    },
    isFirst = function() {
        null !== Cookies.get("stage1") && "" !== Cookies.get("stage1") && void 0 !== Cookies.get("stage1") ? isContinue = !0 : (Cookies.set("theRank0", {
            name: "boss",
            score: 99999
        }), Cookies.set("theRank1", {
            name: "king",
            score: 35
        }), Cookies.set("theRank2", {
            name: "happycat",
            score: 30
        }), Cookies.set("theRank3", {
            name: "francis",
            score: 25
        }), Cookies.set("theRank4", {
            name: "Amy",
            score: 20
        }), Cookies.set("theRank5", {
            name: "123",
            score: 15
        }), Cookies.set("theRank6", {
            name: "handsome",
            score: 10
        }))
    },
    init = function() {
        document.getElementById("bg").play();
        isFirst();
        makeAllImage();
        makeBoxType();
        SlEEPBAG.canvasAutoResizer.load(function(a) {
            a.canvasWidth = 978;
            a.canvasHeight = 780;
            a = a.getGameArea();
            document.body.appendChild(a)
        });
        c = SlEEPBAG.canvasAutoResizer.getGameCanvas();
        resulotion =
            SlEEPBAG.canvasAutoResizer.getResolution();
        width = c.width;
        height = c.height;
        ctx = c.getContext("2d");
        ctx.font = "30px Arial";
        resetAll();
        changePage()
    },
    beginCountTime = function() {
        !1 === isTeach && !1 === isTeaching && !1 === beginCount && (countTimer = setInterval(countTime, 1E3), beginCount = !0)
    },
    resetAll = function() {
		speed1 = 0.01 , speed2 = 0.05 , speed3 = 0.02 ;
		cloud1X = 50 , cloud2X = 170 , cloud3X = 600 ; 
        pigIndex = 0;
        ctx.font = "30px Arial";
        failSound = winSound = boxSound = isBoxTouch = isPush = beginCount = !1;
        isFirst();
        mouseOver = "none";
        "stage1" === nowPage ? (isTeaching = isTeach = !0, amount = 1, randomType = 0, goalHeight = 60, remainTime =
            70) : "stage2" === nowPage ? (isTeach = !0, isTeaching = !1, randomType = amount = 1, goalHeight = 60, remainTime = 70) : "stage3" === nowPage ? (isTeach = !0, isTeaching = !1, amount = 2, randomType = 1, goalHeight = 40, remainTime = 80) : "stage4" === nowPage ? (isTeach = !0, isTeaching = !1, amount = 1, randomType = 2, goalHeight = 70, remainTime = 120) : "stage5" === nowPage && (isTeach = !0, isTeaching = !1, randomType = amount = 2, goalHeight = 50, remainTime = 120);
        void 0 !== world && world.destroy();
        world = Physics(function(a) {
            var f = Physics.aabb(0, 0, viewWidth, 2 * viewHeight);
            Physics.util.ticker.on(function(f,
                d) {
                a.step(f)
            });
            Physics.util.ticker.start();
            a.add([Physics.behavior("edge-collision-detection", {
                aabb: f,
                restitution: 0
            }), Physics.behavior("body-impulse-response"), Physics.behavior("constant-acceleration", {
                acc: {
                    x: 0,
                    y: .001
                }
            }), Physics.behavior("body-collision-detection"), Physics.behavior("sweep-prune")])
        });
        world.on("collisions:detected", function(a) {
            for (var f, g = 0, d = a.collisions.length; g < d; g++) {
                f = a.collisions[g];
                var e = f.bodyA.uid,
                    l = f.bodyB.uid;
                if ("floor" === f.bodyA.label || "floor" === f.bodyB.label) {
                    !1 === isGameOver &&
                        toGameOver();
                    break
                }
                e > l ? (f.bodyA.state.vel.y = 0, void 0 === f.bodyA.uidB && (document.getElementById("box").play(), f.bodyA.uidB = !0), f.bodyA.state.vel.y = .01, f.bodyA.state.vel.y = 0) : (f.bodyB.state.vel.y = 0, void 0 === f.bodyB.uidA && (document.getElementById("box").play(), f.bodyB.uidA = !0), f.bodyB.state.vel.y = .01, f.bodyB.state.vel.y = 0)
            }
        });
        isShowConfirm = !1;
        hookload = !0;
        isGameOver = isWin = !1;
        leftTower = [];
        rightTower = [];
        boxList = [];
        remainRightHeight = remainLeftHeight = remainHeight = nowRightHeight = nowLeftHeight = nowHeight = 0;
        hasFirstBox = !1;
        hook = createBox("rectangle", 300, 54, -100, -100, "static", getImage("hook"));
        hook.state.angular.pos = Math.PI / 2;
        hook.label = "hook";
        var a;
        0 === randomType ? a = simpleBoxList[Math.floor(Math.random() * simpleBoxList.length)] : 1 === randomType ? a = allBoxList[Math.floor(Math.random() * allBoxList.length)] : 2 === randomType && (a = normalBoxList[Math.floor(Math.random() * normalBoxList.length)]);
        hookBox = !1 === detectPoly(a) ? createBox("rectangle", 0, 0, boxType[a].width, boxType[a].height, "static", getImage(a)) : createPoly("convex-polygon",
            a, 0, 0, boxType[a].width, boxType[a].height, "static", getImage(a));
        hookBox.state.vel.y = 0;
        hookBox.restitution = 0;
        hookBox.size = boxType[a].size;
        hookBox.cof = 3;
        hookBox.label = "box";
        world.add(hook);
        world.add(hookBox);
        FirstEnterPage = !0;
        clearTimeout(reloadTimer);
        clearTimeout(countTimer);
        clearTimeout(addHeightTimer);
        clearTimeout(addLeftHeightTimer);
        clearTimeout(addRightHeightTimer)
    },
    initFirstBox = function() {
        if (!0 !== hasFirstBox)
            if (1 === amount) {
                var a = createBox("rectangle", viewWidth / 2 - 360, viewHeight - 50, boxType.base.width,
                    boxType.base.height, "static", getImage("base"));
                world.add(a);
                boxList.push(a);
                hasFirstBox = !0
            } else 2 === amount && (a = createBox("rectangle", 250, viewHeight - 50, boxType.base.width, boxType.base.height, "static", getImage("base")), world.add(a), leftMax = a, leftTower.push(a), a = createBox("rectangle", 550, viewHeight - 50, boxType.base.width, boxType.base.height, "static", getImage("base")), world.add(a), rightMax = a, rightTower.push(a), hasFirstBox = !0)
    },
    addFloor = function() {
        if (!0 !== hasFirstBox) {
            var a = createBox("rectangle", -100, viewHeight +
                5, 3 * viewWidth, 10, "static", getImage("box1"));
            a.hide = !0;
            a.label = "floor";
            world.add(a);
            1 === amount ? boxList.push(a) : (leftTower.push(a), rightTower.push(a))
        }
    },
    moveUp = function() {
        if (1 === amount) {
            if (upperBound = 600, boxList[boxList.length - 1].state.pos.y <= upperBound && 0 === boxList[boxList.length - 1].state.vel.y) {
                for (var a = 0; a < boxList.length; a++) boxList[a].treatment = "static";
                for (a = 0; a < boxList.length; a++) boxList[a].state.pos.y += 2;
                for (a = 0; a < boxList.length; a++) {
                    var b = getH(boxList[a]);
                    viewHeight - boxList[a].state.pos.y >
                        b && (boxList[a].treatment = "dynamic")
                }
            }
        } else if (2 === amount && (upperBound = 550, leftTower[leftTower.length - 1].state.pos.y <= upperBound && 0 === leftTower[leftTower.length - 1].state.vel.y || rightTower[rightTower.length - 1].state.pos.y <= upperBound && 0 === rightTower[rightTower.length - 1].state.vel.y)) {
            for (a = 0; a < leftTower.length; a++) leftTower[a].state.vel.y = 0, leftTower[a].treatment = "static";
            for (a = 0; a < rightTower.length; a++) rightTower[a].state.vel.y = 0, rightTower[a].treatment = "static";
            for (a = 0; a < leftTower.length; a++) leftTower[a].state.pos.y +=
                2;
            for (a = 0; a < rightTower.length; a++) rightTower[a].state.pos.y += 2;
            for (a = 0; a < leftTower.length; a++) b = getH(leftTower[a]), viewHeight - leftTower[a].state.pos.y > b && (leftTower[a].treatment = "dynamic");
            for (a = 0; a < rightTower.length; a++) b = getH(rightTower[a]), viewHeight - rightTower[a].state.pos.y > b && (rightTower[a].treatment = "dynamic")
        }
    },
    drawHook = function(a) {
        !0 === hookload && (!1 === a ? (a = getH(hookBox), hookBox.state.pos.y = a + hook.state.pos.y, hookBox.state.pos.x = hook.state.pos.x) : (a = getH(hookBox), hookBox.state.pos.y = a * Math.cos(hookBox.state.angular.pos) +
            2 * a / 5, hookBox.state.pos.x = -1 * a * Math.sin(hookBox.state.angular.pos) + hook.state.pos.x, hookBox.state.angular.pos = hook.state.angular.pos - Math.PI / 2), drawBody(hookBox, hookBox.view, ctx, hookBox.offset));
        drawBody(hook, hook.view, ctx, hook.offset)
    },
    moveHook = function(a) {
        if (!1 === a) {
            if (hook.state.pos.x += hookMoveSpeed, 630 <= hook.state.pos.x || 150 >= hook.state.pos.x) hookMoveSpeed *= -1
        } else {
            hook.state.pos.x += hookMoveSpeed;
            hook.state.angular.pos += hookAngleSpeed;
            if (630 <= hook.state.pos.x || 150 >= hook.state.pos.x) hookMoveSpeed *=
                -1;
            if (2 <= hook.state.angular.pos || 1 >= hook.state.angular.pos) hookAngleSpeed *= -1
        }
    },
    send = function() {
        document.getElementById("input").blur();
        document.getElementById("input").disabled = !0;
        for (var a = "", b = 0; b < inputBox.length; b++) a += inputBox[b];
        for (b = 6; b >= rankSite; b--) Cookies.set("theRank" + b.toString(), Cookies.getJSON("theRank" + (b - 1).toString()));
        Cookies.set("theRank" + rankSite, {
            name: a,
            score: total
        });
        isShowConfirm = !1
    },
    showConfirm = function() {
        document.getElementById("input").disabled = !1;
        document.getElementById("input").focus();
        ctx.drawImage(getImage("input"), 310, 400, 360, 45);
        ctx.drawImage(getImage("confirm"), 585, 410, 66, 28);
        "confirm" === mouseOver && ctx.drawImage(getImage("confirm2"), 585, 410, 66, 28);
        document.onkeypress = function() {
            var a = inputBox.length;
            "8" == event.keyCode && 0 < a ? inputBox.splice(a - 1, a) : 13 == event.keyCode ? send() : 8 >= a && (a = String.fromCharCode(event.keyCode), inputBox.push(a))
        };
        document.onkeydown = function() {
            var a = inputBox.length;
            "8" == event.keyCode && 0 < a && inputBox.splice(a - 1, a)
        };
        for (var a = 0; a < inputBox.length; a++) ctx.fillText(inputBox[a],
            345 + 25 * a, 430, 100, 100)
    },
    toRank = function() {
        total = parseInt(Cookies.get("stage1")) + parseInt(Cookies.get("stage2")) + parseInt(Cookies.get("stage3")) + parseInt(Cookies.get("stage4")) + parseInt(Cookies.get("stage5"));
        if (void 0 === Cookies.get("theRank1") || null === Cookies.get("theRank1")) Cookies.set("theRank0", {
            name: "boss",
            score: 99999
        }), Cookies.set("theRank1", {
            name: "king",
            score: 35
        }), Cookies.set("theRank2", {
            name: "happycat",
            score: 30
        }), Cookies.set("theRank3", {
            name: "francis",
            score: 25
        }), Cookies.set("theRank4", {
            name: "Amy",
            score: 20
        }), Cookies.set("theRank5", {
            name: "123",
            score: 15
        }), Cookies.set("theRank6", {
            name: "handsome",
            score: 10
        });
        for (var a = 0; 5 >= a; a++)
            if (parseInt(Cookies.getJSON("theRank" + a.toString()).score) >= total && total > parseInt(Cookies.getJSON("theRank" + (a + 1).toString()).score)) {
                isShowConfirm = !0;
                rankSite = a + 1;
                break
            }
    },
    toWin = function() {
        !1 === winSound && document.getElementById("win").play();
        isWin = winSound = !0;
        ctx.drawImage(getImage("win"), 210, 100, 419, 304);
        "next" === mouseOver ? ctx.drawImage(getImage("next2"), 270, 420, 252, 81) :
            ctx.drawImage(getImage("next"), 270, 420, 252, 81);
        clearTimeout(reloadTimer);
        clearTimeout(countTimer);
        clearTimeout(addHeightTimer);
        clearTimeout(addLeftHeightTimer);
        clearTimeout(addRightHeightTimer);
        saveData()
    },
    toGameOver = function() {
        !1 === failSound && document.getElementById("fail").play();
        isGameOver = failSound = !0;
        ctx.drawImage(getImage("fail"), 210, 200, 364, 117);
        ctx.drawImage(getImage("again"), 270, 360, 252, 81);
		if ( nowPage !== 'stage1' ){
			if ( goIndexCanvas.cache === undefined ){
				goIndexCanvas.width = 252 ;
				goIndexCanvas.height = 81 ;
				goIndexCtx.drawImage(getImage('goindex'),0,0,252,81) ;
				goIndexCtx.cache = true ;
			} 
			ctx.drawImage(goIndexCanvas,270,460) ;
			if ( mouseOver === 'goindex' ){
				if ( goIndex2Canvas.cache === undefined ){
					goIndex2Canvas.width = 252 ;
					goIndex2Canvas.height = 81 ;
					goIndex2Ctx.drawImage(getImage('goindex2'),0,0,252,81) ;
					goIndex2Ctx.cache = true ;
				} 
				ctx.drawImage(goIndex2Canvas,270,460) ;
			}
		}
        "stage1" === nowPage && ctx.drawImage(getImage("teach_button"), 270, 460, 252, 81);
        "again" === mouseOver ? ctx.drawImage(getImage("again2"),
            270, 360, 252, 81) : "stage1" === nowPage && "teach" === mouseOver && ctx.drawImage(getImage("teach_button2"), 270, 460, 252, 81);
        clearTimeout(countTimer);
        clearTimeout(addHeightTimer);
        clearTimeout(addLeftHeightTimer);
        clearTimeout(addRightHeightTimer)
    },
    addHeight = function() {
        !1 === isGameOver && (0 < remainHeight ? (nowHeight += 1, --remainHeight) : clearTimeout(addHeightTimer), nowHeight >= goalHeight && (isWin = !0))
    },
    addLeftHeight = function() {
        !1 === isGameOver && (0 < remainLeftHeight ? (nowLeftHeight += 1, --remainLeftHeight) : clearTimeout(addLeftHeightTimer),
            nowLeftHeight >= goalHeight && nowRightHeight >= goalHeight && (isWin = !0))
    },
    addRightHeight = function() {
        !1 === isGameOver && (0 < remainRightHeight ? (nowRightHeight += 1, --remainRightHeight) : clearTimeout(addRightHeightTimer), nowLeftHeight >= goalHeight && nowRightHeight >= goalHeight && (isWin = !0))
    },
    getH = function(a) {
        var b = a.geometry.height;
        void 0 === a.geometry.height && (b = 75);
        return b
    },
    boxTouch = function() {
        var a = getH(hookBox);
        if (1 === amount && !1 === isBoxTouch) {
            if (!(2 >= boxList.length) && boxList[boxList.length - 1].state.pos.y >= hookBox.state.pos.y +
                a && 0 === boxList[boxList.length - 1].state.vel.y && 0 === boxList[boxList.length - 1].state.angular.vel) {
                for (var a = 0, b = 2; b < boxList.length; b++) a += boxList[b].size;
                remainHeight = a - nowHeight;
                addHeightTimer = setInterval(addHeight, 70);
                isBoxTouch = !0
            }
        } else if (2 === amount) {
            if (2 < leftTower.length && leftTower[leftTower.length - 1].state.pos.y >= hookBox.state.pos.y + a && 0 === leftTower[leftTower.length - 1].state.vel.y && 0 === leftTower[leftTower.length - 1].state.angular.vel) {
                for (var f = 0, b = 2; b < leftTower.length; b++) f += leftTower[b].size;
                remainLeftHeight = f - nowLeftHeight;
                addLeftHeightTimer = setInterval(addLeftHeight, 70)
            }
            if (2 < rightTower.length && rightTower[rightTower.length - 1].state.pos.y >= hookBox.state.pos.y + a && 0 === rightTower[rightTower.length - 1].state.vel.y && 0 === rightTower[rightTower.length - 1].state.angular.vel) {
                a = 0;
                for (b = 2; b < rightTower.length; b++) a += rightTower[b].size;
                remainRightHeight = a - nowRightHeight;
                addRightHeightTimer = setInterval(addRightHeight, 70)
            }
        }
    },
    checkBox = function() {
        if (1 === amount) {
            if (!(2 >= boxList.length))
                for (var a = 2; a < boxList.length; a++) {
                    var b =
                        getH(boxList[a]);
                    if (boxList[a].state.pos.y >= viewHeight - b / 2 && "static" !== boxList[a].treatment) {
                        toGameOver();
                        break
                    }
                }
        } else if (2 === amount && !(2 >= leftTower.length && 2 >= rightTower.length))
            if (leftTower.length > rightTower.length + 3 || leftTower.length + 3 < rightTower.length) toGameOver();
            else {
                for (a = 2; a < leftTower.length; a++)
                    if (b = getH(leftTower[a]), leftTower[a].state.pos.y >= viewHeight - b / 2 && "static" !== leftTower[a].treatment) {
                        toGameOver();
                        return
                    }
                for (a = 2; a < rightTower.length; a++)
                    if (b = getH(rightTower[a]), rightTower[a].state.pos.y >=
                        viewHeight - b / 2 && "static" !== rightTower[a].treatment) {
                        toGameOver();
                        return
                    }
                b = getH(leftMax);
                a = getH(rightMax);
                (leftMax.state.pos.y >= viewHeight + b || rightMax.state.pos.y >= viewHeight + a) && toGameOver()
            }
    },
    reloadHook = function() {
        var a = getH(hookBox);
        hookBox = !1 === detectPoly(nextBox) ? createBox("rectangle", hook.state.pos.x, hook.state.pos.y, boxType[nextBox].width, boxType[nextBox].height, "static", getImage(nextBox)) : createPoly("convex-polygon", nextBox, hook.state.pos.x, hook.state.pos.y, boxType[nextBox].width, boxType[nextBox].height,
            "static", getImage(nextBox));
        hookBox.restitution = 0;
        hookBox.cof = 3;
        hookBox.label = "box";
        hookBox.state.pos.y = a + hook.state.pos.y;
        hookBox.state.vel.y = 0;
        hookBox.size = boxType[nextBox].size;
        hookload = !0;
        randomBox();
        hook.view = getImage("hook")
    },
    drawBox = function() {
        if (1 === amount)
            for (var a = 0; a < boxList.length; a++) 850 > boxList[a].state.pos.y && drawBody(boxList[a], boxList[a].view, ctx, boxList[a].offset);
        else {
            for (a = 0; a < leftTower.length; a++) 850 > leftTower[a].state.pos.y && drawBody(leftTower[a], leftTower[a].view, ctx, leftTower[a].offset);
            for (a = 0; a < rightTower.length; a++) 850 > rightTower[a].state.pos.y && drawBody(rightTower[a], rightTower[a].view, ctx, rightTower[a].offset)
        }
    },
    fixBoxCollision = function() {},
    initMouseMove = function(a) {
        document.body.style.cursor = "default"
    },
    setCanvas = function() {
        c = SlEEPBAG.canvasAutoResizer.getGameCanvas();
        resulotion = SlEEPBAG.canvasAutoResizer.getResolution();
        width = c.width;
        height = c.height;
        ctx = c.getContext("2d");
        ctx.clearRect(-1 * width, -1 * height, 2 * width, 2 * height);
        SlEEPBAG.canvasAutoResizer.setCenter();
        ctx.font = "30px Arial"
    },
    addBox = function(a) {
        !0 === hookload && (hook.view = getImage("hook2"), hookload = isBoxTouch = isPush = !1, hookBox.treatment = "dynamic", hookBox.state.vel.x = 0, hookBox.state.vel.y = 0, hookBox.state.acc.y = 0, hookBox.size = boxType[nextBox].size, world.add(hookBox), 1 === amount ? boxList.push(hookBox) : Math.abs(hookBox.state.pos.x - leftMax.state.pos.x) <= Math.abs(hookBox.state.pos.x - rightMax.state.pos.x) ? (leftMax = hookBox, leftTower.push(hookBox)) : (rightMax = hookBox, rightTower.push(hookBox)), reloadTimer = setTimeout(reloadHook, 2E3))
    },
    toNext = function() {
        "stage1" === nowPage ? nowPage = "stage2" : "stage2" === nowPage ? nowPage = "stage3" : "stage3" === nowPage ? nowPage = "stage4" : "stage4" === nowPage && (nowPage = "stage5")
    },
    showTeach = function() {
        "stage2" === nowPage ? (ctx.drawImage(getImage("teach2"), 172, 200, 431, 149), "start" === mouseOver ? ctx.drawImage(getImage("start2"), 315, 400, 146, 64) : ctx.drawImage(getImage("start"), 315, 400, 146, 64)) : "stage3" === nowPage ? (ctx.drawImage(getImage("teach3"), 172, 200, 431, 149), "start" === mouseOver ? ctx.drawImage(getImage("start2"), 315,
            400, 146, 64) : ctx.drawImage(getImage("start"), 315, 400, 146, 64)) : "stage4" === nowPage ? (ctx.drawImage(getImage("teach4"), 172, 200, 431, 149), "start" === mouseOver ? ctx.drawImage(getImage("start2"), 315, 400, 146, 64) : ctx.drawImage(getImage("start"), 315, 400, 146, 64)) : "stage5" === nowPage && (ctx.drawImage(getImage("teach5"), 172, 200, 431, 149), "start" === mouseOver ? ctx.drawImage(getImage("start2"), 315, 400, 146, 64) : ctx.drawImage(getImage("start"), 315, 400, 146, 64))
    },
    gameWinMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b =
            b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 395 * e / 978 - (f - e) / 2) <= 128 * e / 978 && Math.abs(b - 447 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "next", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver = "none")
    },
    gameWinMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 395 * e / 978 - (f - e) / 2) <= 128 * e / 978 && Math.abs(b - 447 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? "stage5" === nowPage ? (toRank(), nowPage = "rank") : (toNext(), mouseOver = "none", resetAll()) : mouseOver = "none"
    },
	gameOverMouseOver = function(e){
		var temp = getMouseSite(e);
		var tempX = temp.x , tempY = temp.y ;
		var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
		var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
		var ratio = getRatio(offsetX,offsetY);
		var w = ratio.w , h = ratio.h ;
		if ( nowPage === 'stage1' && Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
			 Math.abs( (tempY - 482 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'teach' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		} else if ( nowPage !== 'stage1' && Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
			 Math.abs( (tempY - 482 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	){
			document.body.style.cursor = "pointer" ;
			mouseOver = 'goindex' ;
			if ( buttonSound === false ){
				document.getElementById('button').play();
				buttonSound = true ;
			}
		} else if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
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
	},
	gameOverMouseClick = function(e){
		var temp = getMouseSite(e);
		var tempX = temp.x , tempY = temp.y ;	
		var offsetX = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth ;
		var offsetY = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight ;
		var ratio = getRatio(offsetX,offsetY);
		var w = ratio.w , h = ratio.h ;
		if ( nowPage === 'stage1' && Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
			 Math.abs( (tempY - 482 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	){
			document.body.style.cursor = "default" ;
			mouseOver = 'none' ;
			resetAll();
			isTeach = false ;
			toTeaching();
		} else if ( nowPage !== 'stage1' && Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
			 Math.abs( (tempY - 482 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	){
			document.body.style.cursor = "default" ;
			mouseOver = 'none' ;
			nowPage = 'index' ;
		} else if ( Math.abs( (tempX - 395 * w / 978 ) - ((offsetX - w) / 2)  )  <=  128 * w / 978 &&
			 Math.abs( (tempY - 386 * h / 780 ) - ((offsetY - h) / 2)  )  <=  41 * h / 780	) {
			mouseOver = 'none' ;
			resetAll();
			isTeaching = false ;
			isGameOver = false ;
			isTeach = false ;
			beginCountTime();
		} 
	},
    drawBackGroundRight = function() {
        1 === amount ? (void 0 === backGroundRightOneCtx.cache && (backGroundRightOneCanvas.width = 172, backGroundRightOneCanvas.height = 780, backGroundRightOneCtx.drawImage(getImage("game_bg_2"), 0, 0, 172, 780), backGroundRightOneCtx.cache = !0), ctx.drawImage(backGroundRightOneCanvas, c.width / 2 - 470 + 768, 0, 172, 780)) : (void 0 === backGroundRightTwoCtx.cache && (backGroundRightTwoCanvas.width =
            172, backGroundRightTwoCanvas.height = 780, backGroundRightTwoCtx.drawImage(getImage("game_bg2_2"), 0, 0, 172, 780), backGroundRightTwoCtx.cache = !0), ctx.drawImage(backGroundRightTwoCanvas, c.width / 2 - 470 + 768, 0, 172, 780))
    },
    drawBackGroundLeft = function() {
        1 === amount ? (void 0 === backGroundLeftOneCtx.cache && (backGroundLeftOneCanvas.width = 800, backGroundLeftOneCanvas.height = 780, backGroundLeftOneCtx.drawImage(getImage("game_bg_1"), 19, 0, 768, 780), backGroundLeftOneCtx.cache = !0), ctx.drawImage(backGroundLeftOneCtx.canvas, 0,
            0)) : (void 0 === backGroundLeftTwoCtx.cache && (backGroundLeftTwoCanvas.width = 800, backGroundLeftTwoCanvas.height = 780, backGroundLeftTwoCtx.drawImage(getImage("game_bg2_1"), 19, 0, 768, 780), backGroundLeftTwoCtx.cache = !0), ctx.drawImage(backGroundLeftTwoCtx.canvas, 0, 0))
    },
    stageAllSet = function() {
        !0 === FirstEnterPage && randomBox();
        drawBackGroundLeft();
        addFloor();
		showCloud();
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
        showStage();
    },
    toTeachingMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 872 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b - 708 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "start", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 175 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b -
            708 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "return", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver = "none")
    },
    toTeachingMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 872 * e / 978 - (f - e) / 2) <= 72 *
            e / 978 && Math.abs(b - 708 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "default", mouseOver = "none", isTeaching = !1, beginCountTime()) : Math.abs(a - 175 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b - 708 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "default", nowPage = "newGame") : mouseOver = "none"
    },
    toTeachMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f,
                g),
            e = d.w,
            d = d.h;
        Math.abs(a - 395 * e / 978 - (f - e) / 2) <= 128 * e / 978 && Math.abs(b - 386 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "teach", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 175 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b - 708 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "return", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver =
            "none")
    },
    toTeachMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 395 * e / 978 - (f - e) / 2) <= 128 * e / 978 && Math.abs(b - 386 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? (document.body.style.cursor = "default", toTeaching()) : Math.abs(a - 175 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b - 708 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "default", nowPage = "newGame") :
            mouseOver = "none"
    },
    toTeach = function() {
        "teach" === mouseOver ? (ctx.drawImage(getImage("teach_button2"), 270, 360, 252, 81), ctx.drawImage(getImage("return"), 100, 690, 146, 64)) : "return" === mouseOver ? (ctx.drawImage(getImage("return2"), 100, 690, 146, 64), ctx.drawImage(getImage("teach_button"), 270, 360, 252, 81)) : (ctx.drawImage(getImage("teach_button"), 270, 360, 252, 81), ctx.drawImage(getImage("return"), 100, 690, 146, 64))
    },
    toTeaching = function() {
        isTeach = !1;
        isTeaching = !0;
        ctx.drawImage(getImage("teach"), 19, 0, 940, 780);
        ctx.drawImage(getImage("return"),
            100, 690, 146, 64);
        ctx.drawImage(getImage("start"), 800, 690, 146, 64);
        "start" === mouseOver ? ctx.drawImage(getImage("start2"), 800, 690, 146, 64) : "return" === mouseOver && ctx.drawImage(getImage("return2"), 100, 690, 146, 64)
    },
    toGame = function() {
        checkBox();
        moveUp()
    },
    toFrame = function() {
        !0 === isGameOver ? (setMouseEvent(gameOverMouseOver, gameOverMouseClick), toGameOver()) : !0 === isWin ? (setMouseEvent(gameWinMouseOver, gameWinMouseClick), toWin()) : (setMouseEvent(initMouseMove, addBox), toGame())
    },
    rankMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        !0 === isShowConfirm && Math.abs(a - 612 * e / 978 - (f - e) / 2) <= 33 * e / 978 && Math.abs(b - 408 * d / 780 - (g - d) / 2) <= 14 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "confirm", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 470 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b - 630 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor =
            "pointer", mouseOver = "return", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver = "none")
    },
    rankMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        !0 === isShowConfirm && Math.abs(a - 612 * e / 978 - (f - e) / 2) <= 33 * e / 978 && Math.abs(b - 408 * d / 780 - (g - d) / 2) <= 14 * d /
            780 ? (document.body.style.cursor = "default", send()) : Math.abs(a - 470 * e / 978 - (f - e) / 2) <= 72 * e / 978 && Math.abs(b - 630 * d / 780 - (g - d) / 2) <= 31 * d / 780 ? (document.body.style.cursor = "default", nowPage = "index") : mouseOver = "none";
        !0 === isShowConfirm && document.getElementById("input").focus()
    },
    indexMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a -
            474 * e / 978 - (f - e) / 2) <= 126 * e / 978 && Math.abs(b - 310 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "new", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 474 * e / 978 - (f - e) / 2) <= 126 * e / 978 && Math.abs(b - 403 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? !0 === isContinue && (document.body.style.cursor = "pointer", mouseOver = "continue", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 474 * e / 978 - (f - e) / 2) <= 126 * e / 978 && Math.abs(b - 503 * d / 780 - (g -
            d) / 2) <= 40 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "rank", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver = "none")
    },
    indexMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 474 * e / 978 - (f - e) / 2) <= 126 * e / 978 && Math.abs(b - 310 *
            d / 780 - (g - d) / 2) <= 40 * d / 780 ? nowPage = "newGame" : Math.abs(a - 474 * e / 978 - (f - e) / 2) <= 126 * e / 978 && Math.abs(b - 403 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? !0 === isContinue && (document.body.style.cursor = "default", nowPage = "continueGame") : Math.abs(a - 474 * e / 978 - (f - e) / 2) <= 126 * e / 978 && Math.abs(b - 503 * d / 780 - (g - d) / 2) <= 40 * d / 780 ? (document.body.style.cursor = "default", nowPage = "rank") : mouseOver = "none"
    },
    newGameMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 365 * e / 978 - (f - e) / 2) <= 84 * e / 978 && Math.abs(b - 660 * d / 780 - (g - d) / 2) <= 35 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "return", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 600 * e / 978 - (f - e) / 2) <= 84 * e / 978 && Math.abs(b - 660 * d / 780 - (g - d) / 2) <= 35 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "continue", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (document.body.style.cursor = "default", buttonSound = !1, mouseOver = "none")
    },
    newGameMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 365 * e / 978 - (f - e) / 2) <= 84 * e / 978 && Math.abs(b - 660 * d / 780 - (g - d) / 2) <= 35 * d / 780 ? (document.body.style.cursor = "default", nowPage = "index") : Math.abs(a - 600 * e / 978 - (f - e) / 2) <= 84 * e / 978 && Math.abs(b - 660 * d / 780 - (g - d) / 2) <= 35 * d / 780 ? (document.body.style.cursor = "default",
            nowPage = "stage1", resetAll()) : mouseOver = "none"
    },
    continueGameMouseOver = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 470 * e / 978 - (f - e) / 2) <= 73 * e / 978 && Math.abs(b - 668 * d / 780 - (g - d) / 2) <= 30 * d / 780 ? (document.body.style.cursor = "pointer", mouseOver = "return", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a -
                224 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 280 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage1") && "" !== Cookies.get("stage1") && void 0 !== Cookies.get("stage1") && (document.body.style.cursor = "pointer", mouseOver = "stage1", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 472 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 280 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage2") && "" !== Cookies.get("stage2") && void 0 !== Cookies.get("stage2") && (document.body.style.cursor = "pointer",
                mouseOver = "stage2", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 730 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 280 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage3") && "" !== Cookies.get("stage3") && void 0 !== Cookies.get("stage3") && (document.body.style.cursor = "pointer", mouseOver = "stage3", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 318 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 505 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage4") &&
            "" !== Cookies.get("stage4") && void 0 !== Cookies.get("stage4") && (document.body.style.cursor = "pointer", mouseOver = "stage4", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : Math.abs(a - 632 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 505 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage5") && "" !== Cookies.get("stage5") && void 0 !== Cookies.get("stage5") && (document.body.style.cursor = "pointer", mouseOver = "stage5", !1 === buttonSound && (document.getElementById("button").play(), buttonSound = !0)) : (buttonSound = !1, document.body.style.cursor = "default", mouseOver = "none")
    },
    continueGameMouseClick = function(a) {
        var b = getMouseSite(a);
        a = b.x;
        var b = b.y,
            f = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientWidth,
            g = SlEEPBAG.canvasAutoResizer.getGameArea().parentNode.clientHeight,
            d = getRatio(f, g),
            e = d.w,
            d = d.h;
        Math.abs(a - 470 * e / 978 - (f - e) / 2) <= 73 * e / 978 && Math.abs(b - 668 * d / 780 - (g - d) / 2) <= 30 * d / 780 ? (document.body.style.cursor = "default", nowPage = "index", mouseOver = "none") : Math.abs(a - 224 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 280 *
                d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage1") && "" !== Cookies.get("stage1") && void 0 !== Cookies.get("stage1") && (document.body.style.cursor = "default", nowPage = "stage1", mouseOver = "none", resetAll()) : Math.abs(a - 472 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 280 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage2") && "" !== Cookies.get("stage2") && void 0 !== Cookies.get("stage2") && (document.body.style.cursor = "default", nowPage = "stage2", mouseOver = "none", resetAll()) : Math.abs(a - 730 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b -
                280 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage3") && "" !== Cookies.get("stage3") && void 0 !== Cookies.get("stage3") && (document.body.style.cursor = "default", nowPage = "stage3", mouseOver = "none", resetAll()) : Math.abs(a - 318 * e / 978 - (f - e) / 2) <= 115 * e / 978 && Math.abs(b - 505 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage4") && "" !== Cookies.get("stage4") && void 0 !== Cookies.get("stage4") && (document.body.style.cursor = "default", nowPage = "stage4", mouseOver = "none", resetAll()) : Math.abs(a - 632 * e / 978 - (f - e) / 2) <= 115 * e / 978 &&
            Math.abs(b - 505 * d / 780 - (g - d) / 2) <= 90 * d / 780 ? null !== Cookies.get("stage5") && "" !== Cookies.get("stage5") && void 0 !== Cookies.get("stage5") && (document.body.style.cursor = "default", nowPage = "stage5", mouseOver = "none", resetAll()) : mouseOver = "none"
    },
    newGame = function() {
        setMouseEvent(newGameMouseOver, newGameMouseClick);
        ctx.drawImage(getImage("teach_bg"), c.width / 2 - 470, 0, 940, 780);
        ctx.drawImage(getImage("new_return"), 280, 650, 168, 71);
        ctx.drawImage(getImage("new_continue"), 520, 650, 168, 71);
        ctx.drawImage(getImage("shovel"),
            730, 580, 155, 174);
        "return" === mouseOver ? ctx.drawImage(getImage("new_return2"), 280, 650, 168, 71) : "continue" === mouseOver && ctx.drawImage(getImage("new_continue2"), 520, 650, 168, 71)
    },
    continueGame = function() {
        setMouseEvent(continueGameMouseOver, continueGameMouseClick);
        ctx.drawImage(getImage("lv_bg"), c.width / 2 - 470, 0, 940, 780);
        ctx.drawImage(getImage("return"), 400, 660, 146, 61);
        null !== Cookies.get("stage1") && "" !== Cookies.get("stage1") && void 0 !== Cookies.get("stage1") ? ctx.drawImage(getImage("lv1"), 100, 200, 233, 179) : ctx.drawImage(getImage("lv1_3"),
            100, 200, 233, 179);
        null !== Cookies.get("stage2") && "" !== Cookies.get("stage2") && void 0 !== Cookies.get("stage2") ? ctx.drawImage(getImage("lv2"), 360, 200, 233, 179) : ctx.drawImage(getImage("lv2_3"), 360, 200, 233, 179);
        null !== Cookies.get("stage3") && "" !== Cookies.get("stage3") && void 0 !== Cookies.get("stage3") ? ctx.drawImage(getImage("lv3"), 620, 200, 233, 179) : ctx.drawImage(getImage("lv3_3"), 620, 200, 233, 179);
        null !== Cookies.get("stage4") && "" !== Cookies.get("stage4") && void 0 !== Cookies.get("stage4") ? ctx.drawImage(getImage("lv4"),
            200, 430, 233, 179) : ctx.drawImage(getImage("lv4_3"), 200, 430, 233, 179);
        null !== Cookies.get("stage5") && "" !== Cookies.get("stage5") && void 0 !== Cookies.get("stage5") ? ctx.drawImage(getImage("lv5"), 520, 430, 233, 179) : ctx.drawImage(getImage("lv5_3"), 520, 430, 233, 179);
        "return" === mouseOver ? ctx.drawImage(getImage("return2"), 400, 660, 146, 61) : "stage1" === mouseOver && null !== Cookies.get("stage1") && "" !== Cookies.get("stage1") && void 0 !== Cookies.get("stage1") ? ctx.drawImage(getImage("lv1_2"), 100, 200, 233, 179) : "stage2" === mouseOver &&
            null !== Cookies.get("stage2") && "" !== Cookies.get("stage2") && void 0 !== Cookies.get("stage2") ? ctx.drawImage(getImage("lv2_2"), 360, 200, 233, 179) : "stage3" === mouseOver && null !== Cookies.get("stage3") && "" !== Cookies.get("stage3") && void 0 !== Cookies.get("stage3") ? ctx.drawImage(getImage("lv3_2"), 620, 200, 233, 179) : "stage4" === mouseOver && null !== Cookies.get("stage4") && "" !== Cookies.get("stage4") && void 0 !== Cookies.get("stage4") ? ctx.drawImage(getImage("lv4_2"), 200, 430, 233, 179) : "stage5" === mouseOver && null !== Cookies.get("stage5") &&
            "" !== Cookies.get("stage5") && void 0 !== Cookies.get("stage5") && ctx.drawImage(getImage("lv5_2"), 520, 430, 233, 179)
    },
    showPig = function() {
        50 < pigIndex ? ctx.drawImage(getImage("pig2"), 600, 200, 298, 431) : ctx.drawImage(getImage("pig"), 600, 200, 298, 431);
        100 < pigIndex && (pigIndex = 0)
    },
    index = function() {
        setMouseEvent(indexMouseOver, indexMouseClick);
        ctx.drawImage(getImage("index"), c.width / 2 - 470, 0, 940, 780);
        ctx.drawImage(getImage("new"), 350, 280, 252, 81);
        ctx.drawImage(getImage("continue"), 350, 380, 252, 81);
        ctx.drawImage(getImage("rank"),
            350, 480, 252, 81);
        showPig();
        pigIndex++;
        "new" === mouseOver ? ctx.drawImage(getImage("new2"), 350, 280, 252, 81) : "continue" === mouseOver ? ctx.drawImage(getImage("continue2"), 350, 380, 252, 81) : "rank" === mouseOver && ctx.drawImage(getImage("rank2"), 350, 480, 252, 81)
    },
    rank = function() {
		isFirst();
        setMouseEvent(rankMouseOver, rankMouseClick);
        ctx.drawImage(getImage("rank_bg"), c.width / 2 - 470, 0, 940, 780);
        ctx.drawImage(getImage("return"), 400, 625, 146, 64);
        "return" === mouseOver && ctx.drawImage(getImage("return2"), 400, 625, 146, 64);
        ctx.font = "bold 40px Microsoft JhengHei";
        ctx.fillStyle = "brown";
        ctx.fillText("\u6392\u540d", 300, 280, 100, 100);
        ctx.fillText("\u540d\u7a31", 430, 280, 100, 100);
        ctx.fillText("\u5206\u6578", 560, 280, 100, 100);
        ctx.font = "bold 30px Microsoft JhengHei";
        ctx.fillStyle = "black";
        for (var a = 1; 6 >= a; a++) {
            var b = Cookies.getJSON("theRank" + a);
            ctx.fillText(a, 328, 280 + 50 * a, 100, 100);
            ctx.fillText(b.name, 430, 280 + 50 * a, 100, 100);
            ctx.fillText(b.score, 580, 280 + 50 * a, 100, 100)
        }
        ctx.font = "30px Arial";
        !0 === isShowConfirm && showConfirm()
    },
    Stage1 = function() {
        stageAllSet();
        initFirstBox();
        drawHook(!1);
        moveHook(!1);
        boxTouch();
        !0 === isTeach ? (setMouseEvent(toTeachMouseOver, toTeachMouseClick), toTeach()) : !0 === isTeaching ? (setMouseEvent(toTeachingMouseOver, toTeachingMouseClick), toTeaching()) : toFrame();
        FirstEnterPage = !1
    },
    Stage2 = function() {
        stageAllSet();
        initFirstBox();
        drawHook(!1);
        moveHook(!1);
        boxTouch();
        !0 === isTeach ? (setMouseEvent(showTeachMouseOver, showTeachMouseClick), showTeach()) : toFrame();
        FirstEnterPage = !1
    },
    Stage3 = function() {
        stageAllSet();
        initFirstBox();
        drawHook(!1);
        moveHook(!1);
        boxTouch();
        !0 === isTeach ? (setMouseEvent(showTeachMouseOver, showTeachMouseClick), showTeach()) : toFrame();
        fixLeftAndRight();
        FirstEnterPage = !1
    },
    Stage4 = function() {
        stageAllSet();
        initFirstBox();
        drawHook(!0);
        moveHook(!0);
        boxTouch();
        !0 === isTeach ? (setMouseEvent(showTeachMouseOver, showTeachMouseClick), showTeach()) : toFrame();
        FirstEnterPage = !1
    },
    Stage5 = function() {
        stageAllSet();
        initFirstBox();
        drawHook(!0);
        moveHook(!0);
        boxTouch();
        !0 === isTeach ? (setMouseEvent(showTeachMouseOver, showTeachMouseClick), showTeach()) : toFrame();
        FirstEnterPage = !1;
        fixLeftAndRight()
    },
    changePage = function() {
        requestAnimationFrame(changePage);
        "index" === nowPage ? index() : "rank" === nowPage ? rank() : "continueGame" === nowPage ? continueGame() : "newGame" === nowPage ? newGame() : "stage1" === nowPage ? Stage1() : "stage2" === nowPage ? Stage2() : "stage3" === nowPage ? Stage3() : "stage4" === nowPage ? Stage4() : "stage5" === nowPage && Stage5()
    };
window.addEventListener("load", function() {
    FastClick.attach(document.body)
}, !1);
init();