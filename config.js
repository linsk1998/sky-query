

Sky.overload([Sky.isString,Sky.isDocument],Sky,Sky.query);
Sky.overload([Sky.isString,Sky.isElement],Sky,Sky.query);
Sky.overload([Sky.isElement],Sky,Sky.ele);
Sky.overload([Sky.isDocument],Sky,Sky.ele);

Sky.overload([Sky.isFunction],Sky,function(callback){
	if(Sky.isReady){
		setTimeout(callback,0);
	}else{
		Sky.ready(callback);
	}
});

Sky.overload([Sky.isString],Sky,function(selector){
	if(selector.startsWith('#') || selector.includes(" ") || selector.includes(">")){
		return Sky.query(selector);
	}else{
		return Sky.create(selector);
	}
});