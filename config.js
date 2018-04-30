

$.overload([$.isString,$.isDocument],$,Sky.query);
$.overload([$.isString,$.isElement],$,Sky.query);
$.overload([$.isElement],$,Sky.ele);
$.overload([$.isDocument],$,Sky.ele);

$.overload([$.isFunction],$,function(callback){
	if(Sky.isReady){
		setTimeout(callback,0);
	}else{
		Sky.ready(callback);
	}
});

$.overload([$.isString],$,function(selector){
	if(selector.startsWith('#') || selector.includes(" ") || selector.includes(">")){
		return Sky.query(selector);
	}else{
		return Sky.create(selector);
	}
});