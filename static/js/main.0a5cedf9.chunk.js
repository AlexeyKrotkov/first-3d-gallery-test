(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,i){e.exports=i.p+"static/media/wall-white.e7d5b8a3.jpg"},20:function(e,t,i){e.exports=i(44)},43:function(e,t,i){},44:function(e,t,i){"use strict";i.r(t);var n=i(3),o=i.n(n),a=i(13),r=i.n(a),s=i(2),h=i(14),c=i(18),d=i(15),m=i(19),u=i(0),l=i(16),w=function e(){Object(s.a)(this,e),this.texture=void 0,this.geometry=void 0,this.material=void 0,this.mesh=void 0;var t=(new u.j).load(l);t.wrapS=u.h,t.wrapT=u.h,t.repeat.set(200,20),this.geometry=new u.f(500,50,1,1),this.material=new u.d({map:t}),this.mesh=new u.c(this.geometry,this.material),this.mesh.receiveShadow=!0},f=new u.j,p=function e(t){var i=t.url,n=t.width,o=t.height;Object(s.a)(this,e),this.texture=void 0,this.geometry=void 0,this.material=void 0,this.mesh=void 0;var a=f.load(i);this.geometry=new u.b(n||2,o||2*function(e){var t=e.width,i=e.height;return t>i?i/t:t/i}({height:o,width:n}),1),this.material=new u.d({map:a}),this.mesh=new u.c(this.geometry,this.material),this.mesh.receiveShadow=!0,this.mesh.castShadow=!0},v=function e(t){t.x,t.y;Object(s.a)(this,e),this.light=void 0,this.light=new u.g(16777215,1.7,12),this.light.castShadow=!0,this.light.shadow.camera.near=.1,this.light.shadow.camera.far=25},g=i(17),b=i.n(g).a,y=function(){return new Promise(function(e){b.get("https://www.flickr.com/services/rest",{params:{method:"flickr.photos.search",api_key:"eb8103648d681bf445bc1a9e4d8d5e07",user_id:"100742010@N06",per_page:50,page:1,format:"json",nojsoncallback:1}}).then(function(t){var i=t.data.photos.photo.map(function(e){return e.id});return Promise.all(i.map(function(e){return function(e){return b.get("https://www.flickr.com/services/rest",{params:{method:"flickr.photos.getSizes",api_key:"eb8103648d681bf445bc1a9e4d8d5e07",photo_id:e,format:"json",nojsoncallback:1}})}(e)})).then(function(t){var i=t.map(function(e){return e.data.sizes.size}).map(function(e){return e.find(function(e){return"Large"===e.label})});e(i)})})})},j=function(e){var t=e.value,i=e.min,n=e.max;return t<i?i:t>n?n:t},k=function(e){function t(){var e,i;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return(i=Object(c.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={mouseX:0,mouseY:0,photos:[]},i.scene=void 0,i.camera=void 0,i.renderer=void 0,i.mainLight=void 0,i.mount=void 0,i.well=void 0,i.frameId=void 0,i.onResize=function(){var e=window.innerWidth,t=window.innerHeight;i.camera.aspect=e/t,i.camera.updateProjectionMatrix(),i.renderer.setSize(e,t)},i.start=function(){i.frameId||(i.frameId=requestAnimationFrame(i.animate))},i.stop=function(){cancelAnimationFrame(i.frameId)},i.animate=function(){i.onCameraMove(),i.renderScene(),i.frameId=window.requestAnimationFrame(i.animate)},i.onCameraMove=function(){var e=i.camera.position,t=e.x,n=e.y,o=e.z,a=i.mainLight.light.position.z,r=i.state,s=r.mouseX,h=r.mouseY,c=r.photos;if(null!==s&&null!==h){var d=i.mount,m=d.offsetHeight,u=t-(d.offsetWidth/2-s)/1e4*1,l=n+(m/2-h)/1e4*1,w=c.reduce(function(e,t){return e+t.width},0);i.camera.position.set(j({value:u,min:-5,max:w}),j({value:l,min:-3,max:3}),o),i.mainLight.light.position.set(u-1,l-1,a)}},i.renderScene=function(){i.renderer.render(i.scene,i.camera)},i.onMouseMove=function(e){var t=e.clientX,n=e.clientY;i.setState({mouseX:t,mouseY:n})},i}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({mouseX:window.innerWidth/2,mouseY:window.innerHeight/2});var t=window.innerWidth,i=window.innerHeight;this.scene=new u.i,this.camera=new u.e(75,t/i,.1,1e3),this.camera.lookAt(new u.k(1.4,.3,-2)),this.camera.position.z=4,this.renderer=new u.l({antialias:!0}),this.renderer.setClearColor("#000000"),this.renderer.setSize(t,i),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=u.a,this.mount.appendChild(this.renderer.domElement),this.well=(new w).mesh,this.start(),this.scene.add(this.well),y().then(function(t){t.forEach(function(i,n){var o=i.source,a=i.width,r=i.height,s=new p({url:o,width:a/300,height:r/300});s.mesh.position.set(3.8*n,0,0),e.setState({photos:t}),e.scene.add(s.mesh)})}),this.mainLight=new v({x:0,y:0}),this.mainLight.light.position.set(0,0,2),this.scene.add(this.mainLight.light),window.addEventListener("resize",this.onResize)}},{key:"componentWillUnmount",value:function(){this.stop(),this.mount.removeChild(this.renderer.domElement)}},{key:"render",value:function(){var e=this;return n.createElement("div",{onMouseMove:this.onMouseMove,ref:function(t){e.mount=t}})}}]),t}(n.Component);i(43);r.a.render(o.a.createElement(k,null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.0a5cedf9.chunk.js.map