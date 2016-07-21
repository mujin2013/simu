<?php
	// 接收客户端提交的数据
	$userName=$_REQUEST['userName'];
	$userPwd=$_REQUEST['userPwd'];
	$isSavePwd=$_REQUEST['rememberPwd'];

	//模拟服务器端从数据库中拿到的数据
	$existName="18829289125";
	$existPwd="123456";

	//根据用户提交的数据和从数据库中取得的数据做比较来判断用户是否登录成功
	if($userName==$existName&&$userPwd==$existPwd){
		echo 'exist';
	}else{
		echo 'noExist';
	}
?>