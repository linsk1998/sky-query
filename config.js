

Sky.overload([Sky.isString],Sky,Sky.query);
Sky.overload([Sky.isElement],Sky,Sky.ele);
Sky.overload([Sky.isDocument],Sky,Sky.ele);

Sky.overload([Sky.isString,Sky.isObject],Sky,Sky.create);

Sky.overload([Sky.isString,Sky.isDocument],Sky,Sky.query);
Sky.overload([Sky.isString,Sky.isElement],Sky,Sky.query);

Sky.overload([Sky.isFunction],Sky,function(callback){
	Sky.ready().then(callback);
});

