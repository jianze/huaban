function huaban(a,o){
	this.huabu=a;
	this.o=o;
	this.style=true;
	this.tstyle=false;
	this.type='huabi';
	this.bian=5;
	this.jiaoshu=4;
	this.huoqu="#000";
	this.miaohuoqu="#000";
	this.baocun=[];
}
huaban.prototype.tongyong=function(){
	var that=this;
	that.huabu.onmousedown=function(e){
		var x=e.offsetX;
		var y=e.offsetY;
		if(that.type=='huabi'){
			that.o.beginPath();
			that.o.moveTo(x,y);
		}
		if(that.type=='wenzi'){
			that[that.type](x,y);
			return;
		}
		that.huabu.onmousemove=function(e){
			var xx=e.offsetX;
			var yy=e.offsetY;
			that.o.clearRect(0,0,this.width,this.height);
			if(that.baocun.length!=0){
				that.o.putImageData(that.baocun[that.baocun.length-1],0,0,0,0,this.width,this.height);	
			}
			that[that.type](x,y,xx,yy);
		}
		that.huabu.onmouseup=function(e){
			that.huabu.onmousemove=null;
			that.huabu.onmouseup=null;
			if(that.type=='huabi'){
				that.o.closePath();
			}
			that.baocun.push(that.o.getImageData(0,0,this.width,this.height));
		}
	};
}
huaban.prototype.juxing= function(x1,y1,xx1,yy1) {
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	this.o.beginPath();
	this.o.moveTo(x1,y1);
	this.o.rect(x1+.5,y1+.5,xx1-x1,yy1-y1);
	this.o.closePath();
	if(this.tstyle){
		this.o.fill();
	}
	if(this.style){
		this.o.stroke();
	}
};
huaban.prototype.zhixian= function(x1,y1,xx1,yy1) {
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	this.o.beginPath();
	this.o.moveTo(x1+.5,y1+.5);
	this.o.lineTo(xx1+.5,yy1+.5);
	this.o.closePath();
	this.o.stroke();
};
huaban.prototype.sanjiao=function(x1,y1,xx1,yy1){
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	this.o.beginPath();
	this.o.moveTo(x1+.5,y1+.5);
	this.o.lineTo(x1+.5,yy1+.5);
	this.o.lineTo(xx1+.5,yy1+.5);
	this.o.closePath();
	if(this.tstyle){
		this.o.fill();
	}
	if(this.style){
		this.o.stroke();
	}
}
huaban.prototype.yuan=function(x1,y1,xx1,yy1){
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	var r=Math.sqrt(Math.pow((xx1-x1),2)+Math.pow((yy1-y1),2))
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	if(this.tstyle){
		this.o.fill();
	}
	if(this.style){
		this.o.stroke();
	}
}
huaban.prototype.huabi=function(x1,y1,xx1,yy1){
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	this.o.lineTo(xx1,yy1);
	this.o.stroke();
}
huaban.prototype.duobian=function(x1,y1,xx1,yy1){
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	var ang = Math.PI*2/this.bian //旋转的角度
	var r=Math.sqrt(Math.pow((xx1-x1),2)+Math.pow((yy1-y1),2))
    this.o.save();//保存状态
    this.o.translate(x1, y1);//原点移到x,y处，即要画的多边形中心
    this.o.moveTo(0, -r);//据中心r距离处画点
    this.o.beginPath();
    for(var i = 0;i < this.bian; i ++){
        this.o.rotate(ang)//旋转
        this.o.lineTo(0, -r);//据中心r距离处连线
    }
    this.o.closePath();
	if(this.tstyle){
		this.o.fill();
	}
	if(this.style){
		this.o.stroke();
	}
    this.o.restore();
}
huaban.prototype.wujiao=function(x1,y1,xx1,yy1){
	this.o.fillStyle=this.huoqu;
	this.o.strokeStyle=this.miaohuoqu;
	var r=Math.sqrt(Math.pow((xx1-x1),2)+Math.pow((yy1-y1),2))
	var r1=r/3;
	var ag=360/(this.jiaoshu*2)
	this.o.beginPath();
	for(var i=0;i<this.jiaoshu*2;i++){
		if(i%2==0){
			this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r)
		}else{
			this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r1,y1+Math.sin(i*ag*Math.PI/180)*r1)
		}
	}
	this.o.closePath();
	if(this.tstyle){
		this.o.fill();
	}
	if(this.style){
		this.o.stroke();
	}
}
huaban.prototype.wenzi=function(x1,y1){
	var that=this;
	if(document.querySelectorAll('textarea').length<1){
		var wenben=document.createElement('textarea');
	}else if(document.querySelectorAll('textarea').length>=1){
		return;
	}
	setFocus(wenben);
	wenben.style.left=(x1+1)+'px';
	wenben.style.top=(y1+51)+'px';
	body.appendChild(wenben);
	wenben.onmousedown=function(e){
		var dx=e.offsetX;
		var dy=e.offsetY;
		wenben.onmousemove=function(e){
			var dxx=e.clientX;
			var dyy=e.clientY;
			wenben.style.left=dxx-dx+'px';
			wenben.style.top=dyy-dy+'px';
		}
		wenben.onmouseup=function(e){
			dxt=e.clientX;
			dyt=e.clientY;
			wenben.onmousemove=null;
		}
		wenben.onblur=function(){
			that.o.font='18px arial';
			that.o.fillStyle="#000";
			that.o.fillText(wenben.value,dxt-dx,dyt-dy);
			body.removeChild(wenben);
			that.baocun.push(that.o.getImageData(0,0,that.huabu.width,that.huabu.height));
		}
	}
	wenben.onblur=function(){
		that.o.font='18px arial';
		that.o.fillStyle="#000";
		that.o.fillText(wenben.value,x1,y1);
		body.removeChild(wenben);
		that.baocun.push(that.o.getImageData(0,0,that.huabu.width,that.huabu.height));
	}
}
function setFocus(obj){
	if(obj.setSelectionRange){
		setTimeout(function(){
			obj.setSelectionRange(0,0);
			obj.focus();
		},100);
	}else{
		if(obj.createTextRange){
			var range=obj.createTextRange();
			range.collapse(true);
			range.moveEnd("character",0);
			range.moveStart("character",0);
			range.select();
		}
		try{obj.focus();}catch(e){}
	}
}
// huaban.prototype.xiangpi=function(){

// }