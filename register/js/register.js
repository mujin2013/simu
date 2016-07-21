(function(){
	/*-----------------------------封装一些常用的语句--------------------------------*/
	function $Id(id){
		return document.getElementById(id);
	}
	function $Class(className){
		return document.getElementsByClassName(className);
	}

	/*------------------------获得相关的元素-----------------------------------*/
	//与填写基本信息有关的元素
	var userTel=$Id("userTel");
	var userPwd=$Id("userPwd");
	var userRePwd=$Id("userRePwd");
	var seePwd1=$Class("seeImg")[0];
	var seePwd2=$Class("seeImg")[1];
	var agreeItem=$Id("agree");
	var checkIcon=$Id("checkIcon");
	var readAgreeTxt=$Class("readAgree")[0];
	var registerBtn=$Id("registerBtn");
	var hint01=$Id("hint01");
	var hint02=$Id("hint02");
	var hint03=$Id("hint03");
	//与显示协议相关的元素
	var protocol=$Class("protocol")[0];
	var showProtocolTxt=$Id("hint04");
	var closeProtocolTxt=$Id("close");
	//与发送手机验证码有关的元素
	var legalTel=$Id("legalTel");
	var verify=$Id("verify");


	/*------------------------------创建注册对象------------------------------------*/
	var regist={};

	/*------------------------------------为该对象添加属性--------------------------*/
	regist.clickNum=1;//保存用户点击“同意协议”的次数
	regist.data={};//保存用户输入的数据
	regist.reg=[/^1[3578]\d{9}$/,/(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,16}$/];//保存用于验证的相关正则表达式
	regist.verTrue=[true,true];//在发送验证码时使用
	regist.isTrue=[false,false,false,true,false];//便于提交数据

	/*------------------------------------为该对象添加方法--------------------------*/
	// 验证手机号
	regist.verTel=function(){
		var inputTel=userTel.value;//取得用户输入的值
		if(inputTel){
			//当手机号不为空时
			//判断是否是合法的手机号
			if(inputTel.match(regist.reg[0])){
				regist.data.userTel=inputTel;//将用户输入的手机号保存
				//将该手机号提交到服务器端看是否已被注册过
				var xhr=getXHR();//实例化ajax核心对象
				xhr.open("POST","php/regist.php");//创建请求
				//因为发送消息为post方法，所以要设置请求头消息
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xhr.send("userTel="+regist.data.userTel);//向服务器提交数据(以名值对的形式)
				//接收服务器端给的响应
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4&&xhr.status==200){
						//当服务器端响应完毕且响应成功时
						var receiveData=xhr.responseText;//接收服务器端响应的数据
						if(receiveData=='true'){
							//当该手机号已被注册过时
							hint01.innerHTML="该手机号已被注册过！";
							hint01.className="redTxt";
							regist.isTrue[0]=false;
						}else{
							//当该手机号没有被注册过时
							hint01.innerHTML=" ";
							hint01.className=null;
							regist.isTrue[0]=true;
						}
					}
				};	
			}else{
				//当手机号格式错误时
				hint01.innerHTML="手机号格式不正确！";
				hint01.className="redTxt";
			}
		}else{
			//当手机号为空时
			hint01.innerHTML="手机号不能为空！";
			hint01.className="redTxt";
		}	
	};
	//验证密码
	regist.verPwd=function(){
		//取得用户输入的密码
		var inputPwd=userPwd.value;
		if(inputPwd){
			//当密码不为空时
			//判断格式是否合法
			if(regist.reg[1].test(inputPwd)){
				//当密码合法时
				regist.data.userPwd=inputPwd;
				regist.isTrue[1]=true;
				hint02.innerHTML="";
				hint02.className=null;
			}else{
				//当密码不合法时
				regist.isTrue[1]=false;
				hint02.innerHTML="密码必须是6-16为数字和字母的组合";
				hint02.className="redTxt";
			}
		}else{
			//当密码为空时
			hint02.innerHTML="密码不能为空！";
			hint02.className="redTxt";
		}
	};
	//验证确认密码
	regist.verRePwd=function(){
		//获得用户输入的密码
		var inputRePwd=userRePwd.value;
		if(inputRePwd){
			 //当确认密码不为空时
			 //判断确认密码和密码是否相同
			 if(inputRePwd==regist.data.userPwd){
			 	//当两次密码一致时
			 	hint03.innerHTML=" ";
				hint03.className=null;
				regist.data.userRePwd=inputRePwd;
				regist.isTrue[2]=true;
			 }else{
			 	//当两次密码不一致时
			 	hint03.innerHTML="两次密码输入不一致";
				hint03.className="redTxt";
				regist.isTrue[2]=false;
			 }
		}else{
			//当确认密码为空时
			hint03.innerHTML="确认密码不能为空！";
			hint03.className="redTxt";
		}
	};
	//显示密码
	regist.showPwd=function(){
		//得到相关input的原始类型
		var curType=this.previousElementSibling.type;
		if(curType=="password"){
			//若原来的类型是password，则变为text就可显示密码
			this.previousElementSibling.type="text";
		}else{
			//若原来的类型是text，则变为password就可隐藏密码
			this.previousElementSibling.type="password";
		}
	};
	//同意协议
	regist.agreeProtocol=function(){
		if(regist.clickNum%2){
			//当用户点击的次数是奇数次时,不同意协议
			checkIcon.style.backgroundImage="url('images/login01.png')";
			agreeItem.removeAttribute("checked");
			regist.isTrue[3]=false;

		}else{
			//当用户点击的次数是偶数次时,同意协议
			checkIcon.style.backgroundImage="url('images/login02.png')";
			agreeItem.setAttribute("checked",true);
			regist.isTrue[3]=true;
		}
		regist.clickNum++;
	};
	//显示协议
	regist.showProtocol=function(){
		var val=0;
		var timer=setInterval(function(){
			if(val<=1){
				val+=0.5;
				protocol.style.opacity=val;
				protocol.style.display="block";	
			}else{
				clearInterval(timer);
			}
		},300);
	};
	//隐藏协议
	regist.hideProtocol=function(){
	    val=1;
		var timer=setInterval(function(){
			if(val>=0){
				val-=0.5;
				protocol.style.opacity=val;
			}else{
				protocol.style.display="none";
				clearInterval(timer);
			}
		},300);	
	}
	//显示发送手机验证码区域
	regist.showVerCode=function(){
		//判断手机号、密码、确认密码是否合法以及是否同意协议被勾选
		if(regist.isTrue[0]&&regist.isTrue[1]&&regist.isTrue[2]&&regist.isTrue[3]){
			//当相关信息都符合要求时
			legalTel.innerHTML=regist.data.userTel;
			val=0;
			var timer=setInterval(function(){
				if(val<=1){
					val+=0.5;
					verify.style.opacity=val;
					verify.style.display="block";
				}else{
					clearInterval(timer);
				}
			},300);	

		}else{
			regist.verTel();
			regist.verPwd();
			regist.verRePwd();	
			//regist.agreeProtocol();
		}
	}
	//隐藏发送手机验证码区域
	regist.hideVerCode=function(){
		val=1;
		var timer=setInterval(function(){
			if(val>=0){
				val-=0.5;
				verify.style.opacity=val;
			}else{
				verify.style.display="none";
				clearInterval(timer);
			}
		},300);	
	}
	//验证码(此处为了避免用户多次重复触发获得验证码事件，故用了两个标志即：regist.verTrue[0]和regist.verTrue[1])
	regist.message=function(){
		var index=0;
		if(regist.verTrue[0]){
			//当regist.verTrue[0]为真时发送短信验证请求
			regist.getMessage();
			regist.verTrue[0]=false;
		}
		if(regist.verTrue[1]){
			//显示多少秒后重新发送
			regist.verTrue[1]=false;//主要是为了避免在显示还剩多少秒时用户重复触发
			var timer=setInterval(function(){
				$Id("sendCode").innerHTML=""+(60-index)+"秒后重新发送";
				index++;
				if(index>=61){
					index=0;
					regist.verTrue[0]=true;
					regist.verTrue[1]=true;
					$Id("sendCode").innerHTML="获取短信验证码";
					clearInterval(timer);
				}
			},1000);
		}
	}
	//发送短信请求
	regist.getMessage=function(){
		//模拟短信验证
		regist.data.message="1234";
	}
	//验证短信验证码
	regist.verMessage=function(){
		// 获得用户输入的验证码
		var inputVerMessage=$Id("telVerify").value;
		// 判断验证码是否是平台发送的
		if(inputVerMessage){
			//当验证码不为空时
			if(inputVerMessage==regist.data.message){
				//当验证码正确时
				regist.data.verMessage=regist.data.message;
				regist.isTrue[4]=true;

				$Id("verHint").innerHTML="";
			}else{
				//当验证码不正确时
				$Id("verHint").innerHTML="验证码不正确，请重新输入";
				$Id("verHint").className="redTxt";
			}
		}else{
			//当验证码为空时
			$Id("verHint").innerHTML="请输入验证码";
			$Id("verHint").className=null;
		}
	};
	//向服务器提交数据(注册信息)
	regist.toSave=function(){
		if(regist.isTrue[0]&&regist.isTrue[1]&&regist.isTrue[2]&&regist.isTrue[3]&&regist.isTrue[4]){
			//当用户提交的数据全部合法时，向服务器端提交数据
			//创建并实例化ajax对象
			var xhr=new getXHR();
			// 创建请求
			xhr.open("POST","php/save.php");
			//添加请求头("POST"提交时才用)
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//发送请求
			var sendInfo="userTel="+regist.data.userTel+"&userPwd="+regist.data.userPwd+"&userRePwd="+regist.data.userRePwd+"&agree="+regist.isTrue[3];
			console.log(sendInfo);
			xhr.send(sendInfo);
			// 接收响应
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					var receiveData=xhr.responseText;
					console.log("数据已保存");
				}else{
					
				}
			}
		}
	}


	/*--------------------------------为相关元素绑定事件-------------------------------------*/
	//注册基本信息部分
	userTel.onblur=regist.verTel;
	userPwd.onblur=regist.verPwd;
	userRePwd.onblur=regist.verRePwd;
	checkIcon.onclick=regist.agreeProtocol;
	readAgreeTxt.onclick=regist.agreeProtocol;

	//密码显示部分
	seePwd1.onclick=regist.showPwd;
	seePwd2.onclick=regist.showPwd;

	// 投资协议部分
	showProtocolTxt.onclick=regist.showProtocol;
	closeProtocolTxt.onclick=regist.hideProtocol;

	//手机验证码部分
	registerBtn.onclick=regist.showVerCode;
	$Id("close-telVerify").onclick=regist.hideVerCode;
	$Id("sendCode").onclick=regist.message;
	$Id("telVerify").onblur=regist.verMessage;   

	//提交数据
	$Id("affirm").onclick=regist.toSave;
})();