/**
*
* MOD3 3D Modifier Library for JavaScript
* port of AS3DMod ActionScript3 library (http://code.google.com/p/as3dmod/)
*
* http://github.com/foo123/MOD3
*
* @supports Three.js, J3D, Copperlicht, CubicVR.js, Pre3D
*
* @author Nikos M. http://nikos-web-development.netai.net/
*
**/var Class=Classy.Class,MOD3=MOD3||{VERSION:"0.3.1"};!function(t){t.Constants={PI:Math.PI,invPI:1/Math.PI,halfPI:.5*Math.PI,doublePI:2*Math.PI,toRad:Math.PI/180,toDeg:180/Math.PI},t.ModConstant={LEFT:-1,RIGHT:1,NONE:0,X:1,Y:2,Z:4},t.Array32F="undefined"!=typeof Float32Array?Float32Array:Array,t.Array64F="undefined"!=typeof Float64Array?Float64Array:Array,t.Array8I="undefined"!=typeof Int8Array?Int8Array:Array,t.Array16I="undefined"!=typeof Int16Array?Int16Array:Array,t.Array32I="undefined"!=typeof Int32Array?Int32Array:Array,t.Array8U="undefined"!=typeof Uint8Array?Uint8Array:Array,t.Array16U="undefined"!=typeof Uint16Array?Uint16Array:Array,t.Array32U="undefined"!=typeof Uint32Array?Uint32Array:Array,t.VecArray=t.Array32F}(MOD3),function(t,e){var i,n=t.Constants.toRad,s=t.Constants.toDeg,r=Math.min,h=Math.max,o=Math.pow,a=Math.round,u=Math.florr,c=Math.ceil,l=t.XMath={normalize:function(t,e,n){var s,r=e-t;return s=0==r?1:i(0,1,(n-t)/e)},toRange:function(t,e,i){var n,s=e-t;return n=0==s?0:t+(e-t)*i},inRange:function(t,i,n,s){return s===e&&(s=!1),s?n>=t&&i>=n:n>t&&i>n},sign:function(t,i){return i===e&&(i=0),0==t?i:t>0?1:-1},trim:function(t,e,i){return r(e,h(t,i))},wrap:function(t,e,i){var n=e-t;return t>i?i+n:i>=e?i-n:i},degToRad:function(t){return t*n},radToDeg:function(t){return t*s},presicion:function(t,e){var i=o(10,e);return a(t*i)/i},uceil:function(t){return 0>t?u(t):c(t)}};i=l.clamp=l.trim}(MOD3),function(t,e){var i=t.XMath.normalize,n=t.XMath.toRange,s=t.XMath.trim;t.Range=Class(Object,{constructor:function(t,i){this.start=0,this.end=1,t!==e&&(this.start=t),i!==e&&(this.end=i)},start:0,end:1,getSize:function(){return this.end-this.start},move:function(t){this.start+=t,this.end+=t},isIn:function(t){return t>=this.start&&t<=this.end},normalize:function(t){return i(this.start,this.end,t)},toRange:function(t){return n(this.start,this.end,t)},trim:function(t){return s(this.start,this.end,t)},interpolate:function(t,e){return n(this.start,this.end,e.normalize(t))},toString:function(){return"["+this.start+" - "+this.end+"]"}})}(MOD3),function(t,e){var i=Math.sin,n=Math.abs;t.Phase=Class(Object,{constructor:function(t){this.value=0,t!==e&&(this.value=t)},value:0,getPhasedValue:function(){return i(this.value)},getAbsPhasedValue:function(){return n(i(this.value))},getNormValue:function(){return.5*(i(this.value)+1)}})}(MOD3),function(t,e){var i=t.Point=Class(Object,{constructor:function(t,i){this.x=t===e?0:t,this.y=i===e?0:i},x:0,y:0,clone:function(){return new i(this.x,this.y)}})}(MOD3),function(t,e){var i=Math.sin,n=Math.cos,s=t.Point,r=t.Matrix=Class(Object,{constructor:function(t,i,n,s){this.m11=t===e?1:t,this.m12=i===e?0:i,this.m21=n===e?0:n,this.m22=s===e?1:s},m11:1,m12:0,m21:0,m22:1,reset:function(){return this.m11=1,this.m12=0,this.m21=0,this.m22=1,this},rotate:function(t){var e=n(t),s=i(t);return this.m11=e,this.m12=-s,this.m21=s,this.m22=e,this},scale:function(t,i){return this.m12=0,this.m21=0,t!==e&&(this.m11=t,this.m22=t),i!==e&&(this.m22=i),this},multiply:function(t){var e=this.m11,i=this.m12,n=this.m21,s=this.m22,r=t.m11,h=t.m12,o=t.m21,a=t.m22;return this.m11=e*r+i*o,this.m12=e*h+i*a,this.m21=n*r+s*o,this.m22=n*h+s*a,this},transformPoint:function(t){var e=t.x,i=t.y,n=this.m11*e+this.m12*i,r=this.m21*e+this.m22*i;return new s(n,r)},transformPointSelf:function(t){var e=t.x,i=t.y;return t.x=this.m11*e+this.m12*i,t.y=this.m21*e+this.m22*i,t},clone:function(){return new r(this.m11,this.m12,this.m21,this.m22)}})}(MOD3),function(t,e){var i=Math.sqrt,n=t.VecArray,s=t.Vector3=Class(Object,{constructor:function(t,i,s){t&&t.length?this.xyz=new n([t[0],t[1],t[2]]):(t=t===e?0:t,i=i===e?0:i,s=s===e?0:s,this.xyz=new n([t,i,s]))},xyz:null,getXYZ:function(){return new n(this.xyz)},getXYZRef:function(){return this.xyz},setXYZ:function(t){return this.xyz=new n(t),this},setXYZRef:function(t){return this.xyz=t,this},clone:function(){return new s(this.xyz)},equalsSelf:function(t){var e=this.xyz,i=t.xyz;return e[0]==i[0]&&e[1]==i[1]&&e[2]==i[2]},zeroSelf:function(){return this.xyz[0]=0,this.xyz[1]=0,this.xyz[2]=0,this},negate:function(){var t=this.xyz;return new s([-t[0],-t[1],-t[2]])},negateSelf:function(){var t=this.xyz;return t[0]=-t[0],t[1]=-t[1],t[2]=-t[2],this},add:function(t){var e=this.xyz,i=t.xyz;return new s([e[0]+i[0],e[1]+i[1],e[2]+i[2]])},addSelf:function(t){var e=this.xyz,i=t.xyz;return e[0]+=i[0],e[1]+=i[1],e[2]+=i[2],this},subtract:function(t){var e=this.xyz,i=t.xyz;return new s([e[0]-i[0],e[1]-i[1],e[2]-i[2]])},subtractSelf:function(t){var e=this.xyz,i=t.xyz;return e[0]-=i[0],e[1]-=i[1],e[2]-=i[2],this},multiplyScalar:function(t){var e=this.xyz;return new s([e[0]*t,e[1]*t,e[2]*t])},multiplyScalarSelf:function(t){var e=this.xyz;return e[0]*=t,e[1]*=t,e[2]*=t,this},multiply:function(t){var e=this.xyz,i=t.xyz;return new s([e[0]*i[0],e[1]*i[1],e[2]*i[2]])},multiplySelf:function(t){var e=this.xyz,i=t.xyz;return e[0]*=i[0],e[1]*=i[1],e[2]*=i[2],this},divide:function(t){var e=1/t,i=this.xyz;return new s([i[0]*e,i[1]*e,i[2]*e])},divideSelf:function(t){var e=1/t,i=this.xyz;return i[0]*=e,i[1]*=e,i[2]*=e,this},normalize:function(){var t,e=this.xyz,n=e[0],r=e[1],h=e[2],o=n*n+r*r+h*h;return o>0&&(t=1/i(o),n*=t,r*=t,h*=t),new s([n,r,h])},normalizeSelf:function(){var t,e=this.xyz,n=e[0],s=e[1],r=e[2],h=n*n+s*s+r*r;return h>0&&(t=1/i(h),n*=t,s*=t,r*=t),e[0]=n,e[1]=s,e[2]=r,this},getMagnitude:function(){var t=this.xyz,e=t[0],n=t[1],s=t[2];return i(e*e+n*n+s*s)},setMagnitude:function(t){this.normalizeSelf();var e=this.xyz;return e[0]*=t,e[1]*=t,e[2]*=t,this},dotSelf:function(t){var e=this.xyz,i=t.xyz;return e[0]*i[0]+e[1]*i[1]+e[2]*i[2]},crossSelf:function(t){var e=this.xyz,i=t.xyz,n=e[0],s=e[1],r=e[2],h=i[0],o=i[1],a=i[2];return e[0]=s*a-r*o,e[1]=r*h-n*a,e[2]=n*o-s*h,this},distanceSelf:function(t){var e=this.xyz,n=t.xyz,s=e[0]-n[0],r=e[1]-n[1],h=e[2]-n[2];return i(s*s+r*r+h*h)},toString:function(){return"["+this.xyz[0]+" , "+this.xyz[1]+" , "+this.xyz[2]+"]"}});s.ZERO=function(){return new s([0,0,0])},s.dot=function(t,e){var i=t.xyz,n=e.xyz;return i[0]*n[0]+i[1]*n[1]+i[2]*n[2]},s.equals=function(t,e){var i=t.xyz,n=e.xyz;return i[0]==n[0]&&i[1]==n[1]&&i[2]==n[2]},s.cross=function(t,e){var i=t.xyz,n=e.xyz,r=i[0],h=i[1],o=i[2],a=n[0],u=n[1],c=n[2];return new s([h*c-o*u,o*a-r*c,r*u-h*a])},s.distance=function(t,e){var n=t.xyz,s=e.xyz,r=n[0]-s[0],h=n[1]-s[1],o=n[2]-s[2];return i(r*r+h*h+o*o)},s.sum=function(t,e){var i=t.xyz,n=e.xyz;return new s([i[0]+n[0],i[1]+n[1],i[2]+n[2]])}}(MOD3),function(t,e){var i,n,s=Math.sin,r=Math.cos,h=t.Matrix4=Class(Object,{constructor:function(t,i,n,s,r,h,o,a,u,c,l,f,x,y,m,v){this.n11=t===e?1:t,this.n12=i===e?0:i,this.n13=n===e?0:n,this.n14=s===e?0:s,this.n21=r===e?0:r,this.n22=h===e?1:h,this.n23=o===e?0:o,this.n24=a===e?0:a,this.n31=u===e?0:u,this.n32=c===e?0:c,this.n33=l===e?1:l,this.n34=f===e?0:f,this.n41=x===e?0:x,this.n42=y===e?0:y,this.n43=m===e?0:m,this.n44=v===e?1:v},n11:1,n12:0,n13:0,n14:0,n21:0,n22:1,n23:0,n24:0,n31:0,n32:0,n33:1,n34:0,n41:0,n42:0,n43:0,n44:1,reset:function(){return this.n11=1,this.n12=0,this.n13=0,this.n14=0,this.n21=0,this.n22=1,this.n23=0,this.n24=0,this.n31=0,this.n32=0,this.n33=1,this.n34=0,this.n41=0,this.n42=0,this.n43=0,this.n44=1,this},translationMatrix:function(t,e,i){return this.n14=t,this.n24=e,this.n34=i,this},translationMatrixFromVector:function(t){var e=t.xyz;return this.n14=e[0],this.n24=e[1],this.n34=e[2],this},scaleMatrix:function(t,e,i){return this.n11=t,this.n22=e,this.n33=i,this},scaleMatrixFromVector:function(t){var e=t.xyz;return this.n11=e[0],this.n22=e[0],this.n33=e[0],this},rotationMatrix:function(t,e,i,n){var h=r(n),o=s(n),a=1-h,u=t*e*a,c=e*i*a,l=t*i*a,f=o*i,x=o*e,y=o*t;return this.n11=h+t*t*a,this.n12=-f+u,this.n13=x+l,this.n14=0,this.n21=f+u,this.n22=h+e*e*a,this.n23=-y+c,this.n24=0,this.n31=-x+l,this.n32=y+c,this.n33=h+i*i*a,this.n34=0,this},rotationMatrixFromVector:function(t,e){var i=t.xyz,n=i[0],h=i[1],o=i[2],a=r(e),u=s(e),c=1-a,l=n*h*c,f=h*o*c,x=n*o*c,y=u*o,m=u*h,v=u*n;return this.n11=a+n*n*c,this.n12=-y+l,this.n13=m+x,this.n14=0,this.n21=y+l,this.n22=a+h*h*c,this.n23=-v+f,this.n24=0,this.n31=-m+x,this.n32=v+f,this.n33=a+o*o*c,this.n34=0,this},multiply:function(t){return i(this,t),this},multiplyVector:function(t){var e=t.xyz,i=e[0],n=e[1],s=e[2];return e[0]=i*this.n11+n*this.n12+s*this.n13+this.n14,e[1]=i*this.n21+n*this.n22+s*this.n23+this.n24,e[2]=i*this.n31+n*this.n32+s*this.n33+this.n34,t}});n=h.multiplyVector=function(t,e){var i=e.xyz,n=i[0],s=i[1],r=i[2];return i[0]=n*t.n11+s*t.n12+r*t.n13+t.n14,i[1]=n*t.n21+s*t.n22+r*t.n23+t.n24,i[2]=n*t.n31+s*t.n32+r*t.n33+t.n34,e},i=h.calculateMultiply=function(t,e){var i=t.n11,n=e.n11,s=t.n21,r=e.n21,h=t.n31,o=e.n31,a=t.n12,u=e.n12,c=t.n22,l=e.n22,f=t.n32,x=e.n32,y=t.n13,m=e.n13,v=t.n23,d=e.n23,g=t.n33,p=e.n33,M=t.n14,V=e.n14,w=t.n24,z=e.n24,X=t.n34,O=e.n34;return t.n11=i*n+a*r+y*o,t.n12=i*u+a*l+y*x,t.n13=i*m+a*d+y*p,t.n14=i*V+a*z+y*O+M,t.n21=s*n+c*r+v*o,t.n22=s*u+c*l+v*x,t.n23=s*m+c*d+v*p,t.n24=s*V+c*z+v*O+w,t.n31=h*n+f*r+g*o,t.n32=h*u+f*l+g*x,t.n33=h*m+f*d+g*p,t.n34=h*V+f*z+g*O+X,t}}(MOD3),function(t,e){var i=t.ModConstant,n=i.X,s=i.Y,r=i.Z,h=t.Vector3,o=t.VecArray;t.VertexProxy=Class(Object,{constructor:function(t){this.xyz=new o([0,0,0]),this.original=new o([0,0,0]),this.ratio=new o([0,0,0]),e!==t&&null!==t&&!1!==t&&this.setVertex(t)},vertex:null,xyz:null,original:null,ratio:null,setVertex:function(t){return this.vertex=t,this},getRatioVector:function(){return new h(this.ratio)},getRatio:function(t){switch(t){case n:return this.ratio[0];case s:return this.ratio[1];case r:return this.ratio[2]}return-1},getOriginalValue:function(t){switch(t){case n:return this.original[0];case s:return this.original[1];case r:return this.original[2]}return 0},setRatios:function(t,i,n){return t=t===e?0:t,i=i===e?0:i,n=n===e?0:n,this.ratio=new o([t,i,n]),this},setOriginalPosition:function(t,i,n){return t=t===e?0:t,i=i===e?0:i,n=n===e?0:n,this.original=new o([t,i,n]),this},getXYZ:function(){return new o(this.xyz)},getXYZRef:function(){return this.xyz},getX:function(){return this.xyz[0]},getY:function(){return this.xyz[1]},getZ:function(){return this.xyz[2]},setXYZ:function(t){return t=new o(t),this},setXYZRef:function(t){return t=t,this},setX:function(t){return this.xyz[0]=t,this},setY:function(t){return this.xyz[1]=t,this},setZ:function(t){return this.xyz[2]=t,this},getValue:function(t){switch(t){case n:return this.getX();case s:return this.getY();case r:return this.getZ()}return 0},setValue:function(t,e){switch(t){case n:this.setX(e);break;case s:this.setY(e);break;case r:this.setZ(e)}return this},reset:function(){return this.setXYZ(this.original),this},collapse:function(){return this.original=this.getXYZ(),this},getVector:function(){return new h(this.getXYZ())},setVector:function(t){this.setXYZ(t.xyz)}})}(MOD3),function(t){t.FaceProxy=Class(Object,{constructor:function(){this.vertices=[]},vertices:null,addVertex:function(t){this.vertices.push(t)},getVertices:function(){return this.vertices}})}(MOD3),function(t){var e=t.ModConstant,i=e.X,n=e.Y,s=e.Z,r=Math.min,h=Math.max;t.MeshProxy=Class(Object,{constructor:function(t){this.maxX=null,this.maxY=null,this.maxZ=null,this.minX=null,this.minY=null,this.minZ=null,this.maxAxis=null,this.midAxis=null,this.minAxis=null,this.width=null,this.height=null,this.depth=null,this.vertices=[],this.faces=[],this.mesh=null,t&&this.setMesh(t)},maxX:null,maxY:null,maxZ:null,minX:null,minY:null,minZ:null,maxAxis:null,midAxis:null,minAxis:null,widht:null,height:null,depth:null,vertices:null,faces:null,mesh:null,setMesh:function(t){return this.mesh=t,this.vertices=[],this},getVertices:function(){return this.vertices},getFaces:function(){return this.faces},analyzeGeometry:function(){var t,e,o,a,u,c,l,f,x,y,m,v,d,g=this.vertices,p=g.length,M=p;for(p&&(t=g[0],e=t.getXYZ(),o=e[0],a=e[1],u=e[2],c=l=o,f=x=a,y=m=u);--M>=0;)t=g[M],e=t.getXYZ(),o=e[0],a=e[1],u=e[2],t.setOriginalPosition(o,a,u),c=r(c,o),f=r(f,a),y=r(y,u),l=h(l,o),x=h(x,a),m=h(m,u);v=l-c,d=x-f,depth=m-y,this.width=v,this.height=d,this.depth=depth,this.minX=c,this.maxX=l,this.minY=f,this.maxY=x,this.minZ=y,this.maxZ=m;var V=h(v,d,depth),w=r(v,d,depth);for(V==v&&w==d?(this.minAxis=n,this.midAxis=s,this.maxAxis=i):V==v&&w==depth?(this.minAxis=s,this.midAxis=n,this.maxAxis=i):V==d&&w==v?(this.minAxis=i,this.midAxis=s,this.maxAxis=n):V==d&&w==depth?(this.minAxis=s,this.midAxis=i,this.maxAxis=n):V==depth&&w==v?(this.minAxis=i,this.midAxis=n,this.maxAxis=s):V==depth&&w==d&&(this.minAxis=n,this.midAxis=i,this.maxAxis=s),M=p;--M>=0;)t=g[M],e=t.getXYZ(),t.setRatios((e[0]-c)/v,(e[1]-f)/d,(e[2]-y)/depth);return this},resetGeometry:function(){for(var t=this.vertices,e=t.length;--e>=0;)t[e].reset();return this.update(),this},collapseGeometry:function(){for(var t=this.vertices,e=t.length;--e>=0;)t[e].collapse();return this.update(),this.analyzeGeometry(),this},getMin:function(t){switch(t){case i:return this.minX;case n:return this.minY;case s:return this.minZ}return-1},getMax:function(t){switch(t){case i:return this.maxX;case n:return this.maxY;case s:return this.maxZ}return-1},getSize:function(t){switch(t){case i:return this.width;case n:return this.height;case s:return this.depth}return-1},update:function(){return this},postApply:function(){return this},updateMeshPosition:function(){return this}})}(MOD3),function(t){t.Modifier=Class(Object,{constructor:function(t){this.mod=t||null},mod:null,setModifiable:function(t){return this.mod=t,this},getVertices:function(){return this.mod.getVertices()},apply:function(){return this}})}(MOD3),function(t){t.Library3d=Class(Object,{constructor:function(){this.id="",this.meshClass=null,this.vertexClass=null},id:"",meshClass:null,vertexClass:null})}(MOD3),function(t){t.PluginFactory={getMeshProxy:function(t){var e=t.meshClass;return e?new e:null}}}(MOD3),function(t){var e=t.PluginFactory.getMeshProxy;t.ModifierStack=Class(Object,{constructor:function(t,i){this.baseMesh=null,this.stack=[],this.lib3d=t,this.baseMesh=e(t),this.baseMesh.setMesh(i),this.baseMesh.analyzeGeometry()},lib3d:null,baseMesh:null,stack:null,addModifier:function(t){return t.setModifiable(this.baseMesh),this.stack.push(t),this},apply:function(){var t=this.stack,e=t.length,i=this.baseMesh,n=0;for(i.resetGeometry();e>n;)t[n++].apply();return i.update(),this},collapse:function(){return this.apply(),this.baseMesh.collapseGeometry(),this.stack.length=0,this},clear:function(){return this.stack.length=0,this},getMeshInfo:function(){return this.baseMesh}})}(MOD3),function(t){var e=t.Vector3;t.Pivot=Class(t.Modifier,{constructor:function(t,i,n){this.pivot=new e([t,i,n])},pivot:null,setMeshCenter:function(){var t=this.mod;return this.pivot=new e(-(t.minX+.5*t.width),-(t.minY+.5*t.height),-(t.minZ+.5*t.depth)),this},apply:function(){for(var t,e=this.mod.getVertices(),i=e.length,n=this.pivot;--i>=0;)t=e[i],t.setVector(t.getVector().addSelf(n));return this.mod.updateMeshPosition(n.negate()),this}})}(MOD3),function(t,e){var i=t.ModConstant.NONE,n=t.ModConstant.LEFT,s=t.ModConstant.RIGHT,r=t.Matrix,h=Math.atan,o=(Math.atan2,Math.sin),a=Math.cos,u=t.Constants.PI,c=t.Constants.halfPI,l=t.Constants.doublePI,f=t.Point;t.Bend=Class(t.Modifier,{constructor:function(t,n,s){this.constraint=i,this.max=0,this.min=0,this.mid=0,this.width=0,this.height=0,this.origin=0,this.m1=null,this.m2=null,this.diagAngle=0,this.switchAxes=!1,this.force=t!==e?t:0,this.offset=n!==e?n:0,s!==e?this.setAngle(s):this.setAngle(0)},force:0,offset:0,angle:0,diagAngle:0,constraint:i,max:0,min:0,mid:0,width:0,height:0,origin:0,m1:null,m2:null,switchAxes:!1,setAngle:function(t){return this.angle=t,this.m1=(new r).rotate(t),this.m2=(new r).rotate(-t),this},setModifiable:function(t){return this.$super("setModifiable",t),this.max=this.switchAxes?this.mod.midAxis:this.mod.maxAxis,this.min=this.mod.minAxis,this.mid=this.switchAxes?this.mod.maxAxis:this.mod.midAxis,this.width=this.mod.getSize(this.max),this.height=this.mod.getSize(this.mid),this.origin=this.mod.getMin(this.max),this.diagAngle=h(this.width/this.height),this},apply:function(){if(!this.force)return this;for(var t,e,i,r,h,x,y,m,v,d,g=this.mod.getVertices(),p=g.length,M=this.constraint,V=this.width,w=this.offset,z=this.origin,X=this.force,O=this.max,P=this.min,A=this.mid,Z=this.m1,C=this.m2,Y=z+V*w,b=V/u/X,I=l*(V/(b*l)),R=1/V;--p>=0;)t=g[p],e=t.getValue(O),i=t.getValue(A),r=t.getValue(P),h=Z.transformPointSelf(new f(e,i)),e=h.x,i=h.y,x=(e-z)*R,M==n&&w>=x||M==s&&x>=w||(y=c-I*w+I*x,m=o(y)*(b+r),v=a(y)*(b+r),r=m-b,e=Y-v),d=C.transformPointSelf(new f(e,i)),e=d.x,i=d.y,t.setValue(O,e),t.setValue(A,i),t.setValue(P,r);return this}})}(MOD3),function(t){var e=t.Vector3,i=Math.max,n=Math.exp;t.Bloat=Class(t.Modifier,{constructor:function(){this.radius=0,this.a=.01,this.center=e.ZERO()},center:null,radius:0,a:.01,setRadius:function(t){return this.radius=i(0,t),this},setA:function(t){return this.a=i(0,t),this},apply:function(){for(var t,e,i,s=this.mod.getVertices(),r=s.length,h=this.center,o=this.radius,a=this.a;--r>=0;)t=s[r],i=t.getVector().subtractSelf(h),e=i.getMagnitude(),i.setMagnitude(e+o*n(-e*a)),t.setVector(i.addSelf(h));return this}})}(MOD3),function(t,e){var i=t.Vector3,n=t.Matrix4;t.Twist=Class(t.Modifier,{constructor:function(t){this.vector=new i([0,1,0]),this.angle=t!==e?t:0,this.center=i.ZERO(),this.mat1=new n,this.mat2=new n},vector:null,angle:0,center:null,mat1:null,mat2:null,apply:function(){for(var t,e,n,s=this.mod,r=s.getVertices(),h=r.length,o=this.vector.normalizeSelf(),a=this.angle,u=this.center,c=new i([.5*s.maxX,.5*s.maxY,.5*s.maxZ]),l=1/c.getMagnitude(),f=l*a,x=-i.dot(o,u);--h>=0;)t=r[h],n=t.getVector(),e=i.dot(n,o)+x,t.setVector(this.twistPoint(n,o,e*f));return this},twistPoint:function(t,e,n){var s=this.mat1.reset().translationMatrixFromVector(t),r=this.mat2.reset().rotationMatrixFromVector(e,n);return r.multiply(s),new i([r.n14,r.n24,r.n34])}})}(MOD3),function(t,e){var i=Math.abs,n=Math.pow,s=(t.XMath.sign,t.ModConstant),r=s.NONE,h=s.LEFT,o=s.RIGHT,a=s.X,u=s.Y,c=s.Z;t.Skew=Class(t.Modifier,{constructor:function(t){this.force=t!==e?t:0,this.offset=.5,this.constraint=r,this.power=1,this.falloff=1,this.inverseFalloff=!1,this.oneSide=!1,this.swapAxes=!1,this.skewAxis=0},force:0,skewAxis:0,offset:.5,constraint:r,power:1,falloff:1,inverseFalloff:!1,oneSide:!1,swapAxes:!1,setModifiable:function(t){return this.$super("setModifiable",t),this.skewAxis=this.skewAxis||this.mod.maxAxis,this},apply:function(){for(var t,e,s,r,a,u,c,l,f=this.mod.getVertices(),x=f.length,y=this.constraint,m=this.skewAxis,v=this.offset,d=this.oneSide,g=this.inverseFalloff,p=this.falloff,M=1-p,V=this.power,w=this.force,z=this.getDisplaceAxis();--x>=0;)t=f[x],c=t.getRatio(m),y==h&&v>=c||y==o&&c>v||(e=c-v,d&&(e=i(e)),s=t.getRatio(z),g&&(s=1-s),r=p+s*M,l=0>e?-1:1,a=n(i(e),V)*l,u=t.getValue(z)+w*a*r,t.setValue(z,u));return this},getDisplaceAxis:function(){var t=this.skewAxis,e=this.swapAxes;switch(t){case a:return e?c:u;case u:return e?c:a;case c:return e?u:a}}})}(MOD3),function(t,e){var i=t.Vector3,n=t.Matrix4,s=Math.pow;t.Taper=Class(t.Modifier,{constructor:function(t){this.vector=new i([1,0,1]),this.vector2=new i([0,1,0]),this.force=t!==e?t:0,this.power=1},force:0,power:1,vector:null,vector2:null,apply:function(){var t,e,i,r,h,o,a=this.mod.getVertices(),u=a.length,c=this.vector,l=this.vector2,f=this.force,x=this.power;for(r=new n;--u>=0;)t=a[u],e=t.getRatioVector().multiply(l),i=1!=x?f*s(e.getMagnitude(),x):f*e.getMagnitude(),o=c.xyz,r.reset().scaleMatrix(1+i*o[0],1+i*o[1],1+i*o[2]),h=t.getVector(),t.setVector(r.multiplyVector(h));return this}})}(MOD3),function(t){var e=t.Constants.invPI,i=t.Constants.doublePI,n=t.Vector3,s=t.Matrix4;t.Wheel=Class(t.Modifier,{constructor:function(){this.speed=0,this.turn=0,this.roll=0,this.radius=0,this.steerVector=new n([0,1,0]),this.rollVector=new n([0,0,1])},speed:0,turn:0,roll:0,radius:0,steerVector:null,rollVector:null,setModifiable:function(t){return this.$super("setModifiable",t),this.radius=.5*this.mod.width,this},apply:function(){var t,e,i=this.mod.getVertices(),n=i.length,r=this.steerVector,h=this.turn,o=this.rollVector,a=this.roll,u=null,c=null,l=null;for(this.roll+=this.speed,h?(c=(new s).rotationMatrixFromVector(r,h),l=c.multiplyVector(o.clone()),u=(new s).rotationMatrixFromVector(l,a)):u=(new s).rotationMatrixFrom(o,a);--n>=0;)t=i[n],e=t.getVector(),c&&c.multiplyVector(e),setVector(u.multiplyVector(e));return this},getStep:function(){return this.radius*this.speed*e},getPerimeter:function(){return this.radius*i}})}(MOD3),function(t,e){var i=t.Vector3,n=t.Range,s=t.Matrix4;t.Break=Class(t.Modifier,{constructor:function(t,s){this.bv=new i([0,1,0]),this.range=new n(0,1),this.offset=t!==e?t:0,this.angle=s!==e?s:0},bv:null,range:null,offset:0,angle:0,apply:function(){var t,e,n,r,h,o=this.mod,a=o.getVertices(),u=a.length,c=this.offset,l=this.range,f=this.angle,x=this.bv,y=x.xyz;for(t=new i([0,0,-(o.minZ+o.depth*c)]),e=t.negate(),h=(new s).rotationMatrix(y[0],y[1],y[2],f);--u>=0;)n=a[u],r=n.getVector().addSelf(t),r.xyz[2]>=0&&l.isIn(n.ratio[1])&&h.multiplyVector(r),n.setVector(r.addSelf(e));return this}})}(MOD3),function(t,e){var i=t.ModConstant.NONE,n=t.ModConstant.X,s=t.ModConstant.Y,r=t.ModConstant.Z,h=(t.VecArray,Math.random);t.Noise=Class(t.Modifier,{constructor:function(t){this.axc=i,this.start=0,this.end=0,this.force=t!==e?t:0},force:0,axc:i,start:0,end:1,constraintAxes:function(t){return this.axc=t,this},setFalloff:function(t,i){return this.start=t!==e?t:0,this.end=i!==e?i:1,this},apply:function(){for(var t,e,i,o,a,u=this.mod,c=this.axc,l=this.start,f=this.end,x=u.getVertices(),y=x.length,m=this.force,v=.5*m;--y>=0;)t=x[y],e=h()*m-v,i=t.getRatio(u.maxAxis),f>l?l>i?i=0:i>f&&(i=1):l>f?(i=1-i,i>l?i=0:f>i&&(i=1)):i=1,o=e*i,a=t.getXYZ(),t.setXYZ([a[0]+(c&n?0:o),a[1]+(c&s?0:o),a[2]+(c&r?0:o)]);return this}})}(MOD3),function(t){var e=t.ModConstant,i=e.X,n=e.Y,s=e.Z,r=t.Vector3,h=t.VecArray,o=t.VertexThree=Class(t.VertexProxy,{constructor:function(t,e){this.mesh=t,this.$super("constructor",e)},mesh:null,setVertex:function(t){return this.vertex=t,this.original=new h([t.x,t.y,t.z]),this.xyz=new h(this.original),this},getXYZ:function(){var t=this.vertex;return new h([t.x,t.y,t.z])},getX:function(){return this.vertex.x},getY:function(){return this.vertex.y},getZ:function(){return this.vertex.z},setXYZ:function(t){var e=this.vertex;return this.mesh.geometry,e.x=t[0],e.y=t[1],e.z=t[2],this},setX:function(t){var e=this.vertex;return e.x=t,this},setY:function(t){var e=this.vertex;return e.y=t,this},setZ:function(t){var e=this.vertex;return e.z=t,this},reset:function(){var t=this.vertex,e=(this.mesh.geometry,this.original);return t.x=e[0],t.y=e[1],t.z=e[2],this},collapse:function(){var t=this.vertex;return this.original=new h([t.x,t.y,t.z]),this},getValue:function(t){var e=this.vertex;switch(t){case i:return e.x;case n:return e.y;case s:return e.z}return 0},setValue:function(t,e){var r=this.vertex,h=!1;switch(t){case i:r.x=e,h=!0;break;case n:r.y=e,h=!0;break;case s:r.z=e,h=!0}return this},setVector:function(t){var e=this.vertex,i=t.xyz;return this.mesh.geometry,e.x=i[0],e.y=i[1],e.z=i[2],this},getVector:function(){var t=this.vertex;return new r([t.x,t.y,t.z])}});o.prototype.getXYZRef=o.prototype.getXYZ,o.prototype.setXYZRef=o.prototype.setXYZ}(MOD3),function(t){var e=t.VertexThree;t.FaceProxy,t.MeshThree=Class(t.MeshProxy,{constructor:function(t){this.$super("constructor",t)},setMesh:function(t){this.$super("setMesh",t);var i,n=0,t=this.mesh,s=this.vertices,r=t.geometry.vertices,h=r.length,o=t.geometry.faces;for(o.length,n=0;h>n;)i=new e(t,r[n]),s.push(i),n++;return this.faces=null,this},update:function(){var t=this.mesh.geometry;return t.verticesNeedUpdate=!0,t.normalsNeedUpdate=!0,t.buffersNeedUpdate=!0,t.dynamic=!0,this},updateMeshPosition:function(t){var e=this.mesh.position,i=t.xyz;return e.x+=i[0],e.y+=i[1],e.z+=i[2],this}})}(MOD3),function(t){var e=Class(t.Library3d,{constructor:function(){this.id="Three.js",this.meshClass=t.MeshThree,this.vertexClass=t.VertexThree}});t.LibraryThree=new e}(MOD3),function(t){var e=t.ModConstant,i=e.X,n=e.Y,s=e.Z,r=t.Vector3,h=t.VecArray,o=t.VertexJ3D=Class(t.VertexProxy,{constructor:function(t,e){this.geometry=t,this.VERTEX_POSITION=J3D.Mesh.VERTEX_POSITION,this.$super("constructor",e)},geometry:null,VERTEX_POSITION:null,setVertex:function(t){var e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return this.vertex=t,this.original=new h([n[t],n[t+1],n[t+2]]),this.xyz=new h(this.original),this},getXYZ:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return new h([n[t],n[t+1],n[t+2]])},getX:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return n[t]},getY:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return n[t+1]},getZ:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return n[t+2]},setXYZ:function(t){var e=this.vertex,i=this.geometry,n=i.arraysByName[this.VERTEX_POSITION],s=n.data;return s[e]=t[0],s[e+1]=t[1],s[e+2]=t[2],this},setX:function(t){var e=this.vertex,i=this.geometry,n=i.arraysByName[this.VERTEX_POSITION],s=n.data;return s[e]=t,this},setY:function(t){var e=this.vertex,i=this.geometry,n=i.arraysByName[this.VERTEX_POSITION],s=n.data;return s[e+1]=t,this},setZ:function(t){var e=this.vertex,i=this.geometry,n=i.arraysByName[this.VERTEX_POSITION],s=n.data;return s[e+2]=t,this},reset:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data,s=this.original;return n[t]=s[0],n[t+1]=s[1],n[t+2]=s[2],this},collapse:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return this.original=new h([n[t],n[t+1],n[t+2]]),this},getValue:function(t){var e=this.vertex,r=this.geometry,h=r.arraysByName[this.VERTEX_POSITION],o=h.data;switch(t){case i:return o[e];case n:return o[e+1];case s:return o[e+2]}return 0},setValue:function(t,e){var r=this.vertex,h=this.geometry,o=h.arraysByName[this.VERTEX_POSITION],a=o.data,u=!1;switch(t){case i:a[r]=e,u=!0;break;case n:a[r+1]=e,u=!0;break;case s:a[r+2]=e,u=!0}return this},setVector:function(t){var e=this.vertex,i=this.geometry,n=i.arraysByName[this.VERTEX_POSITION],s=n.data,r=t.xyz;return s[e]=r[0],s[e+1]=r[1],s[e+2]=r[2],this},getVector:function(){var t=this.vertex,e=this.geometry,i=e.arraysByName[this.VERTEX_POSITION],n=i.data;return new r([n[t],n[t+1],n[t+2]])}});o.prototype.getXYZRef=o.prototype.getXYZ,o.prototype.setXYZRef=o.prototype.setXYZ}(MOD3),function(t){var e=t.VertexJ3D;t.FaceProxy,t.VecArray,t.MeshJ3D=Class(t.MeshProxy,{constructor:function(t){this.VERTEX_POSITION=J3D.Mesh.VERTEX_POSITION,this.$super("constructor",t)},VERTEX_POSITION:null,setMesh:function(t){this.$super("setMesh",t);var i,n=0,s=t.geometry,r=s.arraysByName[this.VERTEX_POSITION],h=r.data,o=h.length,a=r.itemSize,u=this.vertices;for(n=0;o>n;)i=new e(s,n),u.push(i),n+=a;return this.faces=null,this},update:function(){var t=this.mesh.geometry,e=t.arraysByName[this.VERTEX_POSITION],i=e.data;return t.replaceArray(e,i),this},updateMeshPosition:function(t){var e=this.mesh.position,i=t.xyz;return e.x+=i[0],e.y+=i[1],e.z+=i[2],this}})}(MOD3),function(t){var e=Class(t.Library3d,{constructor:function(){this.id="J3D",this.meshClass=t.MeshJ3D,this.vertexClass=t.VertexJ3D}});t.LibraryJ3D=new e}(MOD3),function(t){var e=t.ModConstant,i=e.X,n=e.Y,s=e.Z,r=t.Vector3,h=t.VecArray,o=t.VertexCopperlicht=Class(t.VertexProxy,{constructor:function(t,e,i){this.node=t,this.buffer=e,this.$super("constructor",i)},node:null,buffer:null,setVertex:function(t){var e=t.Pos;return this.vertex=t,this.original=new h([e.X,e.Y,e.Z]),this.xyz=new h(this.original),this},getXYZ:function(){var t=this.vertex.Pos;return new h([t.X,t.Y,t.Z])},getX:function(){return this.vertex.Pos.X},getY:function(){return this.vertex.Pos.Y},getZ:function(){return this.vertex.Pos.Z},setXYZ:function(t){var e=this.vertex.Pos;return e.X=t[0],e.Y=t[1],e.Z=t[2],this},setX:function(t){var e=this.vertex.Pos;return e.X=t,this},setY:function(t){var e=this.vertex.Pos;return e.Y=t,this},setZ:function(t){var e=this.vertex.Pos;return e.Z=t,this},reset:function(){var t=this.vertex.Pos,e=this.original;return t.X=e[0],t.Y=e[1],t.Z=e[2],this},collapse:function(){var t=this.vertex.Pos;return this.original=new h([t.X,t.Y,t.Z]),this},getValue:function(t){var e=this.vertex.Pos;switch(t){case i:return e.X;case n:return e.Y;case s:return e.Z}return 0},setValue:function(t,e){var r=this.vertex.Pos,h=!1;switch(t){case i:r.X=e,h=!0;break;case n:r.Y=e,h=!0;break;case s:r.Z=e,h=!0}return this},setVector:function(t){var e=this.vertex.Pos,i=t.xyz;return e.X=i[0],e.Y=i[1],e.Z=i[2],this},getVector:function(){var t=this.vertex.Pos;return new r([t.X,t.Y,t.Z])}});o.prototype.getXYZRef=o.prototype.getXYZ,o.prototype.setXYZRef=o.prototype.setXYZ}(MOD3),function(t){var e=t.VertexCopperlicht;t.FaceProxy,t.MeshCopperlicht=Class(t.MeshProxy,{constructor:function(t){this.$super("constructor",t)},setMesh:function(t){this.$super("setMesh",t);var i,n,s,r,h,o=this.mesh.getMesh().GetMeshBuffers(),a=this.vertices,u=[];for(n=0,s=o.length;s>n;n++)for(u=o[n].Vertices,i=0,r=u.length;r>i;i++)h=new e(this.mesh,o[n],u[i]),a.push(h);return this.faces=null,this},update:function(){for(var t=this.mesh.getMesh().GetMeshBuffers(),e=t.length,i=0;e>i;)t[i].update(!0),i++;return this},updateMeshPosition:function(t){var e=this.mesh.Pos,i=t.xyz;return e.X+=i[0],e.Y+=i[1],e.Z+=i[2],this}})}(MOD3),function(t){var e=Class(t.Library3d,{constructor:function(){this.id="Copperlicht",this.meshClass=t.MeshCopperlicht,this.vertexClass=t.VertexCopperlicht}});t.LibraryCopperlicht=new e}(MOD3),function(t){var e=t.ModConstant,i=e.X,n=e.Y,s=e.Z,r=t.Vector3,h=t.VecArray,o=t.VertexCubicVR=Class(t.VertexProxy,{constructor:function(t,e){this.sceneObject=t,this.$super("constructor",e)},sceneObject:null,setVertex:function(t){return this.vertex=t,this.original=new h(t),this.xyz=new h(t),this},getXYZ:function(){return new h(this.vertex)},getX:function(){return this.vertex[0]},getY:function(){return this.vertex[1]},getZ:function(){return this.vertex[2]},setXYZ:function(t){var e=this.vertex;return e[0]=t[0],e[1]=t[1],e[2]=t[2],this},setX:function(t){var e=this.vertex;return e[0]=t,this},setY:function(t){var e=this.vertex;return e[1]=t,this},setZ:function(t){var e=this.vertex;return e[2]=t,this},reset:function(){var t=this.vertex,e=this.original;return t[0]=e[0],t[1]=e[1],t[2]=e[2],this},collapse:function(){return this.original=new h(this.vertex),this},getValue:function(t){var e=this.vertex;switch(t){case i:return e[0];case n:return e[1];case s:return e[2]}return 0},setValue:function(t,e){var r=this.vertex,h=!1;switch(t){case i:r[0]=e,h=!0;break;case n:r[1]=e,h=!0;break;case s:r[2]=e,h=!0}return this},setVector:function(t){var e=this.vertex,i=t.xyz;return e[0]=i[0],e[1]=i[1],e[2]=i[2],this},getVector:function(){return new r(this.vertex)}});o.prototype.getXYZRef=o.prototype.getXYZ,o.prototype.setXYZRef=o.prototype.setXYZ}(MOD3),function(t){var e=t.VertexCubicVR;t.FaceProxy,t.MeshCubicVR=Class(t.MeshProxy,{constructor:function(t){this.$super("constructor",t)},setMesh:function(t){this.$super("setMesh",t);var i,n=0,s=t.obj.points,r=s.length,h=t.obj.faces,o=(h.length,this.vertices);for(n=0;r>n;)i=new e(t,s[n]),o.push(i),n++;return this.faces=null,this},update:function(){return this.mesh.dirty=!0,this},updateMeshPosition:function(t){var e=this.mesh.position,i=t.xyz;return e[0]+=i[0],e[1]+=i[1],e[2]+=i[2],this}})}(MOD3),function(t){var e=Class(t.Library3d,{constructor:function(){this.id="CubicVR.js",this.meshClass=t.MeshCubicVR,this.vertexClass=t.VertexCubicVR}});t.LibraryCubicVR=new e}(MOD3),function(t){var e=t.ModConstant,i=e.X,n=e.Y,s=e.Z,r=t.Vector3,h=t.VecArray,o=t.VertexPre3D=Class(t.VertexProxy,{constructor:function(t){this.$super("constructor",t)},setVertex:function(t){return this.vertex=t,this.original=new h([t.x,t.y,t.z]),this.xyz=new h(this.original),this
},getXYZ:function(){var t=this.vertex;return new h([t.x,t.y,t.z])},getX:function(){return this.vertex.x},getY:function(){return this.vertex.y},getZ:function(){return this.vertex.z},setXYZ:function(t){var e=this.vertex;return e.x=t[0],e.y=t[1],e.z=t[2],this},setX:function(t){return this.vertex.x=t,this},setY:function(t){return this.vertex.y=t,this},setZ:function(t){return this.vertex.z=t,this},getValue:function(t){var e=this.vertex;switch(t){case i:return e.x;case n:return e.y;case s:return e.z}return 0},setValue:function(t,e){var r=this.vertex;switch(t){case i:r.x=e;break;case n:r.y=e;break;case s:r.z=e}return this},setVector:function(t){var e=this.vertex,i=t.xyz;return e.x=i[0],e.y=i[1],e.z=i[2],this},getVector:function(){var t=this.vertex;return new r([t.x,t.y,t.z])}});o.prototype.getXYZRef=o.prototype.getXYZ,o.prototype.setXYZRef=o.prototype.setXYZ}(MOD3),function(t){var e=t.VertexPre3D;t.FaceProxy,t.MeshPre3D=Class(t.MeshProxy,{constructor:function(t){this.$super("constructor",t)},setMesh:function(t){this.$super("setMesh",t);var i,n,s=this.mesh.vertices,r=this.mesh.quads,h=s.length,o=(r.length,this.vertices);for(i=0;h>i;i++)n=new e(s[i]),o.push(n);return this.faces=null,this}})}(MOD3),function(t){var e=Class(t.Library3d,{constructor:function(){this.id="pre3d.js",this.meshClass=t.MeshPre3D,this.vertexClass=t.VertexPre3D}});t.LibraryPre3D=new e}(MOD3);