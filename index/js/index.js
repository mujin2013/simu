(function(){
	//封装document.getElementsByClassName()函数
	function $Selector(select){
		return document.querySelectorAll(select);
	}
	//取得相关元素及相关信息
	var pervious=$Selector('.btn-left')[0];
	var next=$Selector('.btn-right')[0];
	var imgBox=$Selector('.lunbo-box')[0];
	var lunbo=$Selector('.lunbo')[0];
	var imgs=$Selector('.lunbo-box a');
	var btns=$Selector('.btn-box li');
	var imgWidth=imgs[0].offsetWidth;//因为图片是等宽的，故只需要获得第一张图片的宽度就好
	var index=0;//确定当前是哪个小圆点亮起
	var animated=false;//用于判断当前是否处于动画状态(默认不是动画状态)
	var timer;//用于图片自动轮播
	//给相关元素绑定事件

	pervious.onclick=function(){
		if(animated){
			//如果当前是动画状态，则后续代码不执行
			return;
		}
		animate(imgWidth);
		index--;
		if(index<0){
			index=btns.length-1;
		}
		 showButton();
	}

	next.onclick=function(){
		if(animated){
			//如果当前是动画状态，则后续代码不执行
			return;
		}
		animate(-imgWidth);
		index++;
		if(index>btns.length-1){
			index=0;
		}
		showButton();
	}

	//为4个小圆圈添加单击事件
	for(var i=0;i<btns.length;i++){
		btns[i].onclick=changeOption;
	}

	function changeOption(){
		//关键：算偏移量
		var curImgNum=parseInt(this.id);//得到用户当前点击的是第几个按钮(将string转为number用以后续计算)
		//代码优化(使用户点击是当前显示图片的按钮时，下述代码不被运行)
		if(this.className=='curBtn'){
			return;
		}
		var offset=(curImgNum-(index+1))*(-imgWidth);
		index=curImgNum-1;//更新当前显示图片的小标
		if(animated){
			//如果当前是动画状态，则后续代码不执行
			return;
		}
		animate(offset);
		showButton();
	}

	function animate(offset){
		animated=true;
		var newLeft=imgBox.offsetLeft+offset;//根据偏移量得到新的left值
		var totalTime=300;//完成整个动画需要的时间
		var perTime=300;//每次移位的间隔时间
		var moveCount=parseInt(totalTime/perTime);//完成动画需要移动的次数
		var perDistance=parseInt(offset/moveCount);//每次移动的距离
		//用递归实现animate的动画功能(主要是为了实现滑动效果)
		function go(){
			if(perDistance<0&&imgBox.offsetLeft>newLeft||perDistance>0&&imgBox.offsetLeft<newLeft){
				//当没有达到目标值时继续做位移
				imgBox.style.left=imgBox.offsetLeft+perDistance+'px';
				setTimeout(go,perTime);
			}else{
				//当达到目标值时
				imgBox.style.left=newLeft+'px';
				if(newLeft>-imgWidth){
					//当移动到最前面的那张辅助图时,切换到真正的那张图上
					imgBox.style.left=-4*imgWidth+'px';
				}
				if(newLeft<-4*imgWidth){
					//当移动到最后面的那张辅助图时,切换到真正的那张图上
					imgBox.style.left=-imgWidth+'px';
				}
				animated=false;	
			}
		}
		go();

	}

	function showButton(){
		//清除原来小圆点的高亮状态
		for(var i=0;i<btns.length;i++){
			if(btns[i].className=='curBtn'){
				btns[i].className='';
				break;
			}
		}
		btns[index].className='curBtn';
	}

	//自动播放函数
	function autoPlay(){
		timer=setInterval(function(){
			//图片自动轮播，相当于周期性的触发next.onclick事件(调用next.onclick()函数)
			next.onclick();
		},3000);
	}

	//当鼠标悬浮在轮播图上时，停止图片轮播
	lunbo.onmouseover=function(){
		if(timer){
			clearInterval(timer);
			timer=null;
		}
	}

	//当鼠标离开轮播图时，继续图片轮播
	lunbo.onmouseout=function(){
		autoPlay();
	}

	autoPlay();//页面一加载就自动轮播图片
})();