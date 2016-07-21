(function(){
	//封装document.getElementsByClassName()函数
	function $Selector(select){
		return document.querySelectorAll(select);
	}
	//取得相关元素及相关信息
	var btnLeft=$Selector('.btn-left')[0];
	var btnRight=$Selector('.btn-right')[0];
	var imgBox=$Selector('.lunbo-box')[0];
	var imgs=$Selector('.lunbo-box a');
	var btns=$Selector('.btn-box li');
	var imgWidth=imgs[0].offsetWidth;//因为图片是等宽的，故只需要获得第一张图片的宽度就好
	var flag=imgWidth*(imgs.length-2);
	var moveDistance=0;
	var index=0;
	var timer=setInterval(autoPlay,3000);
	
	//给相关元素绑定相关事件
	btnLeft.onclick=function(){
		 moveImg(1);//图片右移
	};
	btnRight.onclick=function(){
		 moveImg(-1);//图片左移
	};

	$Selector('.lunbo')[0].onmouseover=function(){
		if(timer){
			clearInterval(timer);
			timer=null;
		}
	};
	$Selector('.lunbo')[0].onmouseout=function(){
		timer=setInterval(autoPlay,3000);
	};

	//给每个小圆圈绑定单击事件
	for(var i=0;i<btns.length;i++){
		btns[i].onclick=function(){
			changeOption(this.id);
			changeHeighLight(this.id)
		};
	}

	function changeOption(index){
		moveDistance=-(index)*imgWidth;
		animation();	
	}

	function changeHeighLight(curIndex){
		//清除小btn上原来的状态
		for(var i=0;i<btns.length;i++){
			if(btns[i].className=='curBtn'){
				btns[i].className='';
				break;
			}
		}
		btns[curIndex].className='curBtn';
	}

	function moveImg(i){
		if(i>0){
			//图片右移
			index--;
			if(index<0){
				index=btns.length-1;
			}
			moveDistance+=imgWidth*i;
			if(moveDistance>0){
				moveDistance=-flag;
			}
			console.log('图片右移'+moveDistance);
		}else{
			//图片左移
			index++;
			if(index>btns.length-1){
				index=0;
			}
			moveDistance+=imgWidth*i;
			if(moveDistance<-flag){
				moveDistance=0;
			}
			console.log('图片左移'+moveDistance);
		}
		animation();
		changeHeighLight(index);
	}

	function animation(){
		imgBox.style.left=moveDistance+'px';
	}

	//自动轮播函数
	function autoPlay(){
		moveDistance-=imgWidth;
		if(moveDistance<-flag){
			moveDistance=0;	
		}
		animation();
		index++;
		if(index>btns.length-1){
			index=0;
		}
		changeHeighLight(index);
	}
})();