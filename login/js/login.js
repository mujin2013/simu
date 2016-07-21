(function(){
	/*------------------------------------取得相关元素及相关信息-----------------------------------*/
	var checkIcon=document.getElementById("checkIcon");
	var label=document.getElementById("remPwd");

	var userName=document.getElementById("userName");
	var userPwd=document.getElementById("userPwd");
	var hint=document.getElementById("hint");
	var loginBtn=document.getElementById("loginBtn");

	/*-----------------------------------创建一个登录对象--------------------------------*/
	var login={};

	/*-------------------------------------为对象添加属性--------------------------------*/
	login.isRemeber=false;//用来保存用户是否选择了记住密码(默认没有选择)
	login.data={};//用来保存用户输入的信息
	login.clickNum=1;//用来记录用户点击记住密码的次数

	/*--------------------------------------为对象添加方法-------------------------------*/
	//为对象添加与检测是否“记住密码”相关的方法
	login.checkBox=function(){
		if(login.clickNum%2!=0){
			//当用户点击的次数为奇数次时意味着用户记住密码
		    login.isRemeber=true;
		    checkIcon.style.backgroundImage="url('images/check.png')";
		}else{
			//当用户点击的次数为偶数次时意味着用户不记住密码
			login.isRemeber=false;
			checkIcon.style.backgroundImage="url('images/chebefor.png')";	
		}
		login.clickNum++;
	};

	//为对象添加是否提交表单的方法
	login.submit=function(){
		//取得相关表单元素的值
		var userNameVal=userName.value;
		var userPwdVal=userPwd.value;
		if(userNameVal&&userPwdVal){
			//当用户名和密码都不为空时
			login.data={
				"userName":userNameVal,
				"userPwd":userPwdVal
			};
			// 保存密码
			if(login.isRemeber){
				login.saveInfo();
			}
			hint.style.visibility="hidden";//隐藏错误提示消息
			//创建ajax核心对象
			var xhr=getXHR();
			//创建ajax请求
			xhr.open("POST","php/login.php");
			//因为发送消息为post方法，所以要设置请求头消息
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//发送ajax请求(注：此处发送数据必须以"名值对"的形式发送)
			xhr.send("userName="+userNameVal+"&userPwd="+userPwdVal+"&rememberPwd="+rememberPwd);
			//接收服务器端给的响应
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					//当服务器响应完毕且响应成功时
					var receiveData=xhr.responseText;//接收服务器端的相应数据
				    if(receiveData=="exist"){
				    	//当用户名和密码正确时
				    	location.href="../index/index.html"
				    }else{
				    	//当用户名和密码不正确时
				    	hint.innerHTML="用户名或密码错误！";
				    	hint.style.visibility="visible";//显示登录失败的错误提示消息
				    }
				}
			};
		}else{
			//当用户名和密码至少有一个为空时
			hint.style.visibility="visible";//显示错误提示消息
		}
	}

	//为对象添加保存密码的方法
	login.saveInfo=function(){
		localStorage.setItem("userName",login.data.userName);
		localStorage.setItem("userPwd",login.data.userPwd);
	};

	//为对象添加按"回车"提交表单事件
	login.keyuped=function(event){
		// 判断用户按下的是那个键
		var key=event.which||event.keyCode||event.charCode;
		if(key==13){
			//若用户按的是"回车"则提交表单
			login.submit();
		}
	};

	/*---------------------------------为相关元素绑定事件---------------------------------*/
	label.onclick=login.checkBox;
	checkIcon.onclick=login.checkBox;
	loginBtn.onclick=login.submit;
	userName.onkeyup=login.keyuped;
	userPwd.onkeyup=login.keyuped;
})();