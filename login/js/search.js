(function(){
	// 收索框的js
	var timeout=0;
	var ajaxCache={};//定义缓存对象
	var inputValue=$Id("input-area").value;

	function $Id(id){
		return document.getElementById(id);
	}

	// 给输入框添加键盘按下事件
	$Id("input-area").onkeyup=function(){
		timeout=setTimeout(function(){
			support(inputValue);
		},200);//设置一次性定时器
	}

	//当输入框获得焦点时显示相关信息
	$Id("input-area").onfocus=function(){
		support(inputValue);
		$Id('searchList').style.display="block";
	}

	//当输入框获得焦点时隐藏相关信息
	$Id("input-area").onblur=function(){
		$Id('searchList').style.display="none";
	}

	// 显示数据
	function support(inputVal){
		var str='';
		if(ajaxCache[inputVal]){
			console.log(ajaxCache[inputVal]);
			//显示自动提示框，给框里填关联词条的内容
			for(var i=0;i<ajaxCache[inputVal].length-1;i++){
				str+='<li><a href="'+'javascript:void(0);'+'">'+ajaxCache[inputVal][i]+'</a></li>';
				$Id('searchList').innerHTML=str;
			}
			str+='<li class="lastItem"><a href="'+'javascript:void(0);'+'">'+ajaxCache[inputVal][ajaxCache[inputVal].length-1]+'</a></li>';

				$Id('searchList').innerHTML=str;
		}else{
			//模拟通过ajax获得的数据
			ajaxCache[inputVal] = ['keyWords1','keyWords2','keyWords3','keyWords4','keyWords5'];
		}
	}
})();