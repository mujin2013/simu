(function(){
	// 封装doucument.getElementById()方法
	function $Id(id){
		return document.getElementById(id);
	}
	var timer;
	$Id("name-txt").onmouseenter=function(){
		clearInterval(timer);
		timer=setInterval(function(){
			var curHeightStr= document.defaultView.getComputedStyle($Id("name-list"),null).height;//获取指定元素的当前height
			var regexp=/\d{0,3}/;
			var incre=2;
			var curHeight=parseInt(curHeightStr.match(regexp)[0]);
			if(curHeight<192){
				$Id("name-list").style.visibility="visible";
				var nextHeight=curHeight+6;
				var nextHeightStr=nextHeight+"px";
				$Id("name-list").style.height=nextHeightStr;
			}else{
			clearInterval(timer);
			}
	},10);	
	}
	$Id("name-box").onmouseleave=hideNameList;
	$Id("name-list").onmouseleave=hideNameList;
	function hideNameList(){
		var timer=setInterval(function(){
			var curHeightStr= document.defaultView.getComputedStyle($Id("name-list"),null).height;//获取指定元素的当前height
			var regexp=/\d{0,3}/;
			var curHeight=parseInt(curHeightStr.match(regexp)[0]);
			if(curHeight>0){
				var nextHeight=curHeight-6;
				var nextHeightStr=nextHeight+"px";
				$Id("name-list").style.height=nextHeightStr;
			}else{
				$Id("name-list").style.visibility="hidden";
				clearInterval(timer);
			}
		},15);
	}
})();
