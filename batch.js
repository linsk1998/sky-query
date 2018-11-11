
(function(){
	var Batch=function(){ Array.call(this);};
	Batch.prototype=Sky.fn={
		constructor: Batch,
		length: 0,
		indexOf:Array.prototype.indexOf,
		push:Array.prototype.push,
		splice:Array.prototype.splice,
		forEach:Array.prototype.forEach
	};
	Sky.ele=function(ele){
		var nodes=new Batch();
		if(ele){
			nodes.push(ele);
		}
		return nodes;
	};
	Sky.query=function(selector,doc){
		var nodes=new Batch();
		var arr=Sky.querySelector(selector,doc);
		for(var i=0;i<arr.length;i++){
			nodes.push(arr[i]);
		}
		return nodes;
	};
	Sky.create=function(selector){
		var nodes=new Batch();
		var arr=selector.split(",");
		for(var i=0;i<arr.length;i++){
			nodes.push(Sky.createSelector(arr[i]));
		}
		return nodes;
	};
	Sky.fn.children=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var children=ele.children;
			for(var i=0; i<children.length; i++){
				var child=children[i];
				if(nodes.indexOf(child)<0){
					if(selector && !Sky.matchesSelector(child,selector)){
						continue ;
					}
					nodes.push(child);
				}
			}
		});
		return nodes;
	};
	Sky.fn.find=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var children=Sky.querySelector(selector,ele);
			for(var i=0; i<children.length; i++){
				var child=children[i];
				if(nodes.indexOf(child)<0){
					nodes.push(child);
				}
			}
		});
		return nodes;
	};
	Sky.fn.parent=function(){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele.parentNode;
			if(parent && nodes.indexOf(parent)<0){
				nodes.push(parent);
			}
		});
		return nodes;
	};
	Sky.fn.parents=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while((parent=parent.parentNode) && parent!=document){
				if(nodes.indexOf(parent)<0){
					if(selector && !Sky.matchesSelector(parent,selector)){
						continue ;
					}
					nodes.push(parent);
				}
			};
		});
		return nodes;
	};
	Sky.fn.parentsUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var parent=ele;
			while(parent=parent.parentNode){
				if(nodes.indexOf(parent)<0){
					nodes.push(parent);
					if(Sky.matchesSelector(parent,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.siblings=function(selector){
		return this.parent().children(selector);
	};
	Sky.fn.nextAll=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getNextElement(brother)){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matchesSelector(brother,selector)){
						continue ;
					}
					nodes.push(brother);
				}
			}
		});
		return nodes;
	};
	Sky.fn.prevAll=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getPrevElement(brother)){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matchesSelector(brother,selector)){
						continue ;
					}
					nodes.push(brother);
				}
			}
		});
		return nodes;
	};
	Sky.fn.prev=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=Sky.getPrevElement(ele);
			if(brother){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matchesSelector(brother,selector)){
						return ;
					}
					nodes.push(brother);
				}
			}
		});
		return nodes;
	};
	Sky.fn.next=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=Sky.getNextElement(ele);
			if(brother){
				if(nodes.indexOf(brother)<0){
					if(selector && !Sky.matchesSelector(brother,selector)){
						return ;
					}
					nodes.push(brother);
				}
			}
		});
		return nodes;
	};
	Sky.fn.nextUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getNextElement(brother)){
				if(nodes.indexOf(brother)<0){
					nodes.push(brother);
					if(Sky.matchesSelector(brother,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.prevUntil=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			var brother=ele;
			while(brother=Sky.getPrevElement(brother)){
				if(nodes.indexOf(brother)<0){
					nodes.push(brother);
					if(Sky.matchesSelector(brother,selector)) break ;
				}
			};
		});
		return nodes;
	};
	Sky.fn.first=function(){
		if(this.length){
			var nodes=new Batch();
			nodes.push(this[0]);
			return nodes;
		}
		return this;
	};
	Sky.fn.last=function(){
		if(this.length){
			var nodes=new Batch();
			nodes.push(this[this.length-1]);
			return nodes;
		}
		return this;
	};
	Sky.fn.eq=function(index){
		var nodes=new Batch();
		var ele=this[index];
		if(ele){
			nodes.push(ele);
		}
		return nodes;
	};
	Sky.fn.filter=function(selector){
		var nodes=new Batch();
		if(Sky.isFunction(selector)){
			this.forEach(function(ele,index){
				if(selector.call(ele,index)){
					nodes.push(ele);
				}
			});
		}else{
			this.forEach(function(ele){
				if(Sky.matchesSelector(ele,selector)){
					nodes.push(ele );
				}
			});
		}
		return nodes;
	};
	Sky.fn.not=function(selector){
		var nodes=new Batch();
		this.forEach(function(ele){
			if(!Sky.matchesSelector(ele,selector)){
				nodes.push(ele );
			}
		});
		return nodes;
	};
})();
Sky.fn.add=function(el){
	this.push(el);
};
Sky.fn.each=function(callback){
	this.forEach(function(item,index){
		callback.call(item,index);
	});
	return this;
};
Sky.fn.appendTo=function(parent){
	if(!parent) return this;
	if('append' in parent && parent.length>0){
		parent=parent[0];
	}
	if("appendChild" in parent){
		this.forEach(function(ele){
			parent.appendChild(ele);
		});
	}
	return this;
};
Sky.fn.append=function(){
	var args=Array.from(arguments);
	args.forEach(function(sub){
		if(!sub) return ;
		if(Sky.isString(sub) || Sky.isNumber(sub)){
			return this.each(function(){
				var tn=document.createTextNode(sub);
				this.appendChild(tn);
			});
		}else if(sub.appendTo){
			sub.appendTo(this);
			return this;
		}else if(this.length){
			this[0].appendChild(sub);
		}
	},this);
	return this;
};
Sky.fn.prepend=function(sub){
	if(Sky.isString(sub)){
		this.forEach(function(parent){
			var tn=document.createTextNode(sub);
			if(parent.childNodes.length){
				parent.insertBefore(tn,parent.firstChild);
			}else{
				parent.appendChild(tn);
			}
		});
	}else if(this.length){
		var parent=this[0];
		if(sub.each){
			sub.each(function(){
				if(parent.childNodes.length){
					parent.insertBefore(this,parent.firstChild);
				}else{
					parent.appendChild(this);
				}
			});
		}else{
			parent.appendChild(sub);
		}
	}
	return this;
};
Sky.fn.before=function(sub){
	var me=this;
	if(Sky.isString(sub)){
		this.forEach(function(dom){
			var tn=document.createTextNode(sub);
			var parent=dom.parentNode;
			if(parent){
				parent.insertBefore(tn,dom);
			}
		});
	}else if(this.length){
		var parent=this[0].parentNode;
		if(parent){
			if(sub.each){
				sub.each(function(dom){
					parent.insertBefore(this,me[0]);
				});
			}else{
				parent.insertBefore(sub);
			}
		}
	}
	return this;
};
Sky.fn.after=function(sub){
	if(Sky.isString(sub)){
		this.forEach(function(dom){
			var tn=document.createTextNode(sub);
			var parent=dom.parentNode;
			if(parent){
				if(dom.nextSibling){
					parent.insertBefore(tn,dom.nextSibling);
				}else{
					parent.appendChild(tn);
				}
			}
		});
	}else if(this.length){
		var dom=this[0];
		var parent=dom.parentNode;
		if(parent){
			if(sub.each){
				sub.each(function(){
					if(dom.nextSibling){
						parent.insertBefore(this,dom.nextSibling);
					}else{
						parent.appendChild(this);
					}
				});
			}else{
				if(dom.nextSibling){
					parent.insertBefore(sub,dom.nextSibling);
				}else{
					parent.appendChild(sub);
				}
			}
		}
	}
	return this;
};
Sky.fn.addClass=function(className){
	this.forEach(function(dom){
		Sky.addClass(dom,className);
	});
	return this;
};
Sky.fn.removeClass=function(className){
	this.forEach(function(dom){
		Sky.removeClass(dom,className);
	});
	return this;
};
Sky.fn.toggleClass=function(className){
	this.forEach(function(dom){
		Sky.toggleClass(dom,className);
	});
	return this;
};
Sky.fn.hasClass=function(className){
	for(var i=0;i<this.length;i++){
		if(Sky.hasClass(this[i],className)){
			return true;
		}
	}
	return false;
};
if(document.addEventListener){
	Sky.support.cssFloat="cssFloat";
}else{
	Sky.support.cssFloat="styleFloat";
}
Sky.fn.css=function(name,value){
	if(Sky.isString(name)){
		name=name.replace(/\-\w/g,function(str){
			return str.toUpperCase();
		});
		if(value){
			if(name=="float"){
				name=Sky.support.cssFloat;
			}
			this.forEach(function(ele){
				ele.style[name]=value;
			});
		}else if(name.includes(":")){
			this.forEach(function(ele){
				ele.style.cssText=name;
			});
		}else{
			if(this.length){
				return Sky.getElementStyle(this[0],name);
			}
		}
	}else{
		this.forEach(function(ele){
			Sky.forOwn(name,function(value,key){
				if(key=="float"){
					key=Sky.support.cssFloat;
				}
				ele.style[key]=value;
			});
		});
	}
	return this;
};
Sky.fn.prop=function(key,value){
	if(value!==undefined){
		for(var i=0;i<this.length;i++){
			this[i][key]=value;
		}
		return this;
	}else{
		if(this.length>0){
			return this[0][key];
		}
	}
};
Sky.fn.attr=function(key,value){
	switch(key.toLowerCase()){
		case "class":
			console.error("'XXX.prop(\"className\")' XXX.addClass(\""+Sky.escapeString(value)+"\") is recommended");
			return this.prop("className",value);
		case "style":
			console.error("'XXX.css(\""+Sky.escapeString(value)+"\")' is recommended");
			return this.css(value);
	}
	if(value!==undefined){
		for(var i=0;i<this.length;i++){
			this[i].setAttribute(key,value);
		}
		return this;
	}else{
		if(this.length>0){
			return this[0].getAttribute(key);
		}
	}
};
Sky.fn.removeAttr=function(key){
	switch(key.toLowerCase()){
		case "class":
			console.error("'XXX.prop(\"className\",\"\")' is recommended");
			return this.prop("className","");
		case "style":
			console.error("'XXX.css(\"\")' is recommended");
			return this.css("");
	}
	for(var i=0;i<this.length;i++){
		this[i].removeAttribute(key);
	}
	return this;
};
Sky.fn.html=function(value){
	if(value){
		this.empty();
	}
	return this.prop("innerHTML",value);
};
Sky.fn.text=function(value){
	var node,tag;
	if(value!=undefined){
		for(var i=0;i<this.length;i++){
			node=this[i];
			tag=node.tagName.toUpperCase();
			switch(tag){
				case "TEXTAREA":
				case "INPUT":
				case "SELECT":
					break;
				default:
					node.innerHTML=Sky.escapeHtml(value);
			}
		}
		return this;
	}else{
		if(this.length>0){
			node=this[0];
			return node.innerText;
		}
	}
};
Sky.fn.val=function(value){
	return this.prop("value",value);
};
Sky.fn.index=function(selector){
	if(this.length==0){
		return -1;
	}
	var ele=this[0];
	var siblings;
	if(selector){
		siblings=Sky.ele(ele.parentNode).children(selector);
	}else{
		siblings=Array.from(ele.parentNode.children);
	}
	return siblings.indexOf(ele);
};

Sky.domData=new Map();
Sky.fn.data=function(key,value){
	var node;
	if(value!==undefined){//set
		for(var i=0;i<this.length;i++){
			node=this[i];
			var data=Sky.domData.get(node);
			if(!Sky.isDefined(data)) data={};
			data[key]=value;
			Sky.domData.set(node,data);
		}
		return this;
	}else{//get
		if(this.length>0){
			node=this[0];
			var data=Sky.domData.get(node);
			if(data){
				value=data[key];
				if(value!==undefined){
					return value;
				}
			}
			var attr="data-"+key;
			if(node.getAttribute(attr)){
				value=node.getAttribute(attr);
				return value;
			}
		}
	}
};
Sky.fn.removeData=function(key,value){
	this.forEach(function(node){
		Sky.domData["delete"](node);
	});
	return this;
};
Sky.fn.hide=function(){
	return this.css("display","none");
};
Sky.fn.show=function(){
	return this.css("display","");
};
Sky.fn.remove=function(selector){
	var r=this;
	if(selector){
		r=this.filter(selector);
	}
	r.forEach(function(item){
		var parent=item.parentNode;
		if(parent) parent.removeChild(item);
	});
	return this;
};
Sky.fn.destroy=function(){
	var $children=this.children();
	if($children.length) $children.destroy();
	this.forEach(function(dom){
		var parent=dom.parentNode;
		var data=Sky.domData.get(dom);
		Sky.domData["delete"](dom);
		Sky.detachEvent(dom);
		for(var prop in dom){
			if(prop.startsWith("on")) dom[prop]=null;
		}
		if(parent) parent.removeChild(dom);
	});
	this.splice(0,this.length);
	return this;
};
Sky.fn.empty=function(){
	this.children().destroy();
	return this.prop("innerHTML",'');
};

Sky.fn.bind=function(evt,func){
	this.forEach(function(ele){
		Sky.attachEvent(ele,evt,func);
	});
	return this;
};
Sky.fn.unbind=function(evt,func){
	this.forEach(function(ele){
		Sky.detachEvent(ele,evt,func);
	});
	return this;
};
Sky.fn.fire=function(evt){
	this.forEach(function(ele){
		Sky.fireEvent(ele,evt);
	});
	return this;
};
Sky.fn.on=function(evt,selector,func){
	if(func){
		return this.delegate(selector,evt,func);
	}
	func=selector;
	this.forEach(function(ele){
		Sky.addEvent(ele,evt,func);
	});
	return this;
};
Sky.fn.delegate=function(selector,evt,func){
	this.forEach(function(ele){
		Sky.delegate(ele,evt,selector,func);
	});
	return this;
};
Sky.fn.undelegate=function(selector,evt,func){
	return this.forEach(function(ele){
		Sky.undelegate(ele,evt,selector,func);
	});
	return this;
};
Sky.fn.off=function(evt,arg2,arg3){
	var selector,func;
	if(Sky.isString(arg2)){
		selector=arg2;
		if(Sky.isFunction(arg3)){
			func=arg3;
		}
	}else if(Sky.isFunction(arg2)){
		func=arg2;
	}
	this.forEach(function(ele){
		Sky.undelegate(ele,evt,selector,func);
	});
	return this;
};
Sky.fn.trigger=function(event){
	this.forEach(function(dom){
		Sky.trigger(dom,event);
	});
	return this;
};
Sky.fn.mouseenter=function(func){
	return this.each(function(){
		Sky.addEvent(this,"mouseenter",func);
	});
};
Sky.fn.mouseleave=function(func){
	return this.each(function(){
		Sky.addEvent(this,"mouseleave",func);
	});
};
Sky.fn.click=function(callback){
	if(callback){
		return this.on('click',callback);
	}
	return this.each(function(){
		this.click();
	});
};
if("ontouchstart" in document){
	Sky.fn.tap=function(callback){
		var lastTouchTime;
		return this.on("touchstart",function(e){
			lastTouchTime=Date.now();
		}).on("touchend",function(e){
			if(Date.now()-lastTouchTime<200){
				callback.call(this,e);
			}
		});
	};
}else{
	Sky.fn.tap=Sky.fn.click;
}
Sky.fn.input=function(func){
	return this.each(function(){
		Sky.addEvent(this,"input",func);
	});
};
Sky.fn.offset=function(){
	if(this.length===0){
		return ;
	}
	var scrollTop,scrollLeft,clientTop,clientLeft;
	var ele=this[0];
	var rect=ele.getBoundingClientRect();
	var dd=document.documentElement;
	var db=document.body;
	document.documentElement.scrollTop || document.body.scrollTop;
	if(dd){
		scrollTop=dd.scrollTop || db.scrollTop;
		scrollLeft=dd.scrollLeft || db.scrollLeft;
		clientTop=dd.clientTop || db.clientTop;
		clientLeft=dd.clientLeft || db.clientLeft;
	}else if(document.body){
		scrollTop=db.scrollTop;
		scrollLeft=db.scrollLeft;
		clientTop=db.clientTop;
		clientLeft=db.clientLeft;
	}
	return {
		top:rect.top-clientTop+scrollTop,
		left:rect.left-clientLeft+scrollLeft
	};
};
Sky.fn.innerWidth=function(){
	if(this.length){
		var ele=this[0];
		return ele.clientWidth;
	}
};
Sky.fn.innerHeight=function(){
	if(this.length){
		var ele=this[0];
		return ele.clientHeight;
	}
};
Sky.fn.outerWidth=function(){
	if(this.length){
		var ele=this[0];
		return ele.offsetWidth;
	}
};
Sky.fn.outerHeight=function(){
	if(this.length){
		var ele=this[0];
		return ele.offsetHeight;
	}
};