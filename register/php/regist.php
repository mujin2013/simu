<?php
	//获取服务器端发送的数据
	$userTel=$_REQUEST['userTel'];
	//模拟从数据库中查的的数据
	$findData="18829289125";
	if($userTel==$findData){
		echo 'true';
	}else{
		echo 'false';
	}
?>