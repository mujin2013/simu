//创建ajax核心对象
function getXHR(){
	var xhr;//保存ajax核心对象
	if(window.XMLHttpRequest){
		//其他浏览器
		xhr=new XMLHttpRequest();
	}else{
		//IE8+浏览器
		xhr=new ActiveXObject('Microsoft.XMLHttp');
	}
	return xhr;
}