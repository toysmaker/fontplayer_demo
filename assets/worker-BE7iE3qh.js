(function(){"use strict";const s=()=>{function n(){return((1+Math.random())*65536|0).toString(16).substring(1)}return n()+n()+"-"+n()+"-"+n()+"-"+n()+"-"+n()+n()+n()},h=n=>{let i=1/0,l=1/0,a=-1/0,t=-1/0;for(let r=0;r<n.length;r++)n[r].x<i&&(i=n[r].x),n[r].x>a&&(a=n[r].x),n[r].y<l&&(l=n[r].y),n[r].y>t&&(t=n[r].y);return{x:i,y:l,w:a-i,h:t-l}},x=(n,i,l="",a="#000")=>{const{x:t,y:r,w:e,h:o}=h(n.reduce((u,c)=>(u.push({x:c.x,y:c.y}),u),[]));return{uuid:s(),type:"pen",name:"pen",lock:!1,visible:!0,value:{points:n,fillColor:l,strokeColor:a,closePath:i,editMode:!1},x:t,y:r,w:e,h:o,rotation:0,flipX:!1,flipY:!1,usedInCharacter:!0}},g=(n,i)=>n.map(a=>{const t=[];for(let r=0;r<a.length;r++){const e=a[r];switch(r===0&&t.push({uuid:s(),x:e.start.x,y:e.start.y,type:"anchor",origin:null,isShow:!0}),e.type){case 0:{const o={uuid:s(),x:e.start.x,y:e.start.y,type:"control",origin:t[t.length-1].uuid,isShow:!0},u={uuid:s(),x:e.end.x,y:e.end.y,type:"anchor",origin:null,isShow:!0},c={uuid:s(),x:e.end.x,y:e.end.y,type:"control",origin:u.uuid,isShow:!0};t.push(o,c,u);break}case 1:{const o={uuid:s(),x:e.start.x+.6666666666666666*(e.control.x-e.start.x),y:e.start.y+.6666666666666666*(e.control.y-e.start.y),type:"control",origin:t[t.length-1].uuid,isShow:!0},u={uuid:s(),x:e.end.x,y:e.end.y,type:"anchor",origin:null,isShow:!0},c={uuid:s(),x:e.end.x+2/3*(e.control.x-e.end.x),y:e.end.y+2/3*(e.control.y-e.end.y),type:"control",origin:u.uuid,isShow:!0};t.push(o,c,u);break}case 2:{const o={uuid:s(),x:e.control1.x,y:e.control1.y,type:"control",origin:t[t.length-1].uuid,isShow:!0},u={uuid:s(),x:e.end.x,y:e.end.y,type:"anchor",origin:null,isShow:!0},c={uuid:s(),x:e.control2.x,y:e.control2.y,type:"control",origin:u.uuid,isShow:!0};t.push(o,c,u);break}}}return t.length&&(t[t.length-1].x!==t[0].x||t[t.length-1].x!==t[0].y)&&(t.push({uuid:s(),x:t[t.length-1].x,y:t[t.length-1].y,type:"control",origin:t[t.length-1].uuid,isShow:!0}),t.push({uuid:s(),x:t[0].x,y:t[0].y,type:"control",origin:t[0].uuid,isShow:!0}),t.push({uuid:s(),x:t[0].x,y:t[0].y,type:"anchor",origin:t[0].uuid,isShow:!0})),x(p(t,i,0),!0)}),p=(n,i,l)=>{const{unitsPerEm:a,descender:t,advanceWidth:r}=i;return l===0?n.map(o=>{let u=o.x+(a-r)/2,c=a-o.y;return c=c+t,u*=1,c*=1,{...o,x:u,y:c}}):l===1?n.map(o=>{let u=o.x*1,c=o.y*1;return u-=(a-r)/2,c=c-t,c=a-c,{...o,x:u,y:c}}):n};onmessage=n=>{switch(n.data[0]){case 0:{const i=n.data[1],l=n.data[2],a=i.settings.unitsPerEm,t=i.settings.descender,r=[];for(let e=0;e<i.characters.length;e++){const o=i.characters[e];if(!o.unicode&&!o.name)continue;const u={uuid:s(),text:o.unicode?String.fromCharCode(o.unicode):o.name,unicode:o.unicode?o.unicode.toString(16):""},c=s(),d={uuid:c,type:"text",character:u,components:[],groups:[],orderedList:[],selectedComponentsUUIDs:[],view:{zoom:100,translateX:0,translateY:0},info:{gridSettings:{dx:0,dy:0,centerSquareSize:l/3,size:l},layout:"",layoutTree:[]},script:`function script_${c.replaceAll("-","_")} (character, constants, FP) {
	//Todo something
}`};g(o.contours,{unitsPerEm:a,descender:t,advanceWidth:o.advanceWidth}).forEach(y=>{d.components.push(y),d.orderedList.push({type:"component",uuid:y.uuid})}),r.push(d)}postMessage(r);break}}}})();