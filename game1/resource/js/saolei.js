var startBtn = document.getElementById('Sbtn');//开始按钮
var box = document.getElementById('box');//游戏面板
var flagBox = document.getElementById('flagBox');//当前剩余
var alertBox = document.getElementById('alertBox');//弹出窗口
var alertImg = document.getElementById('alertImg');//弹出图片
var closeBtn = document.getElementById('close');//弹出框的关闭按钮
var score = document.getElementById('score');//分数
var minesNum;//随机地雷数，会递减
var mineOver;//显示地雷数，会增减
var mineN;//地雷数
var block;
//var mineMap = [];
var startGameBool = true;
var HblockNum;//横格子数
var SblockNum;//竖格子数
var leiindex;//随机雷坐标
var myleis=[];//减少绘制雷的时候格子的重复操作
var posNum=[];
var boxflag;
var boxleiflag
bindEvent();

function levelV(){
	var levelVa=document.getElementsByName('level');
	var checkVal=bianli(levelVa).split(",")[1];
	//console.log(checkVal);
	if(checkVal=='level1'){
		//100个格子，横竖各10个，10个雷
		HblockNum=10;
		SblockNum=10;
		minesNum = 10;
    	mineOver = 10;
    	mineN=minesNum;
    	leiindex=HblockNum*SblockNum;
    	//leiindex=10;
	}
	else if(checkVal=='level2'){
		//150个格子，横15个，竖10个,50个雷
		box.style.width='750px';
		HblockNum=15;
		SblockNum=10;
		minesNum = 50;
    	mineOver = 50;
    	mineN=minesNum;
    	leiindex=HblockNum*SblockNum;
	}
	else if(checkVal=='level3'){
		//220个格子，横22个,竖10个，100个雷
		box.style.width="1100px";
		HblockNum=22;
		SblockNum=10;
		minesNum=100;
		mineOver=100;
		mineN=minesNum;
		leiindex=HblockNum*SblockNum;
	}
}
function bindEvent() {
    startBtn.onclick = function() {//点击开始按钮
    	levelV();
        if (startGameBool) {
            box.style.display = 'block';
            flagBox.style.display = 'block';
            init();
            startGameBool = false;
        }
        else{
        	reloadPage();
        }

    }
    box.oncontextmenu=function(){
  		//console.log('右键事件');
  		//取消鼠标的默认事件
  		return false;
	}
    box.onmousedown = function() {//取消鼠标按下触发的默认事件
        return false;
    }
    box.onmousedown = function(e) {//鼠标按下事件
        var event = e.target;
        if (e.which == 1) {//左键
        	//flag=0;
            leftClick(event);
            /*if(flag==1){
            	boxflag++;
            	console.log(boxflag);
            }*/
            win();
        } else if (e.which == 3) {//右键
            rightClick(event);
            win();
        }
    }
    box.onselectstart=function(){
    	return false;
    }
    closeBtn.onclick = function() {//关闭按钮后重新加载页面
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
        startGameBool = true;
        reloadPage();
    }
}
function bianli(list){
	for(var i=0;i<list.length;i++){
		if(list[i].checked){
			return i+','+list[i].value;
		}
	}
}
function save(){//存储选择难度
	var radios=document.getElementsByName('level');
	//console.log('radioindex='+bianli(radios).split(",")[0]);
	localStorage.setItem("radioindex",bianli(radios).split(",")[0]);
}
window.onload=function(){//读取存储的难度内容
	var val = document.getElementsByName("level");
	var LS=localStorage.getItem("radioindex");
    if(LS){
    	val[LS].checked=true;
    }
    else{
    	val[0].checked=true;
    }
}
function reloadPage(){//重置按钮：刷新页面
	location.reload();
}
function localclear(){//清除localStorage缓存
	localStorage.clear();
}
function init() {
    score.innerHTML = mineOver;
    boxflag=0;
    boxleiflag=0;
    myleis=[];
    var posNum=[];
    for (var i = 0; i < SblockNum; i++) {
        for (var j = 0; j < HblockNum; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            //console.log("x="+i+","+"y="+j)
            box.appendChild(con);
            /*mineMap.push({
                mine: 0
            });*/
        }//绘图
    }
    block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * leiindex);
        //console.log("k"+mineIndex);
        if(myleis.indexOf(mineIndex)==-1)//myleis不包含数字则添加
        {
        	/*js的contains方法用来查看dom元素的包含关系，

并不是Java中数组的contains方。

若js要判断数组的包含关系，应该用indexof*/
        	myleis.push(mineIndex);
        	//if (mineMap[mineIndex].mine === 0) {
            	block[mineIndex].classList.add('islei');
            	//mineMap[mineIndex].mine == 1;
            	//console.log(mineIndex);
            	minesNum--;
        	//}//随机地雷
        }

    }
}

function leftClick(dom) {
    var islei = document.getElementsByClassName('islei');
    if (dom && dom.classList.contains('islei')) {//如果是雷

        for (var i = 0; i < islei.length; i++) {
            islei[i].classList.add('show');//展示
        }
        boxflag=0;
        setTimeout(function() {//0.8秒后输出结束画面
            alertBox.style.display = 'block';
            txt.innerHTML = 'BOOM!!结束了';
        }, 800)
    } else {//不是雷
    	
    	//boxflag++;
    	//console.log("次数"+boxflag);
    	//flag=1;
        var n = 0;//该格子显示的数字
        var posArr = dom && dom.getAttribute('id').split('-');//取回id的值再通过-分割
        //console.log(posArr);//[2,0]=>[1,0][1,1]
        
        	var postring=posArr.toString();
        	if(posNum.indexOf(postring)==-1){
        		//console.log(postring);
        		posNum.push(postring);
        		//console.log("shuzu"+posNum);
        		boxflag++;
    			//console.log("次数"+boxflag);	
        	}			
		
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        //获取坐标
        dom && dom.classList.add('num');//往classList里加入num
        for (i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
            	if(i>-1&&j>-1){
                	var aroundBox = document.getElementById(i + '-' + j);//判断周围是斜边判断，周围坐标可能存在问题
                	if (aroundBox && aroundBox.classList.contains('islei')) {//周围的格子是否有雷
                    	n++;
                	}
                }
            }
        }
        dom && (dom.innerHTML = n);
        if (n == 0) {//格子数字为0表示周围没有雷
            for (i = posX - 1; i <= posX + 1; i++) {
                for (j = posY - 1; j <= posY + 1; j++) {
                	if(i>-1&&j>-1){
                    	var nearBox = document.getElementById(i + '-' + j);
                    	if (nearBox && nearBox.length != 0) {
                        	if (!nearBox.classList.contains('check')){
                            	nearBox.classList.add('check');
                            	//boxflag++   	
                            	leftClick(nearBox);
                        	}
                        	//leftClick(nearBox);
                    	}
                    }
                }
            }
        }
    }
}
function rightClick(dom) {//添加限制，有多少个雷就有多少个标记
    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');//有标记则移除，无标记则添加
    
    /*if (dom.classList.contains('islei') && dom.classList.contains('flag')) {//是雷有标记
        mineOver--;//提示“当前剩余雷”数量减少
        boxleiflag++;
        console.log("lei"+boxleiflag);
    }*/
    if(dom.classList.contains('flag')){
    	if(dom.classList.contains('islei')){
    		boxleiflag++;
    		//console.log("lei"+boxleiflag);
    	}
    	mineOver--;//提示“当前剩余雷”数量减少
    }
    if(!dom.classList.contains('flag')){
    	if(dom.classList.contains('islei')){
    		boxleiflag--;
    		//console.log("lei"+boxleiflag);
    	}
    	mineOver++;//提示“当前剩余雷”数量增加
    }
    /*if (dom.classList.contains('islei') && !dom.classList.contains('flag')) {//是雷没有标记
        mineOver++;//提示“当前剩余雷”数量增加
        boxleiflag--;
    }*/
    if(mineOver>=0){
    	score.innerHTML = mineOver;
    }
    else{
    	score.innerHTML = 0;
    }
    /*if (mineOver == 0) {
    //if(leiindex-boxflag==minesNum){//雷的范围(全部格子)-不是雷的格子=雷的数量
        alertBox.style.display = 'block';
        txt.innerHTML = '胜利！！';
    }*/
}
function win(){
	//console.log(boxleiflag+boxflag);
	//console.log(leiindex);
	if (boxleiflag == mineN&&boxleiflag+boxflag==leiindex) {
    		//if(leiindex-boxflag==minesNum&&boxleiflag+boxflag==leiindex){//雷的范围(全部格子)-不是雷的格子=雷的数量
        	alertBox.style.display = 'block';
        	txt.innerHTML = '胜利！！';
    	}
}