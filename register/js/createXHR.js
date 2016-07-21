function getXHR(){
	//创建ajax核心对象
	var xhr;
	if(window.XMLHttpRequest){
		//其他浏览器
		xhr=new XMLHttpRequest();
	}else{
		//IE浏览器
		xhr=new ActiveXObject('Microsoft.XMLHttp');
	}
	return xhr;
}