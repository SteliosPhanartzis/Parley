(this["webpackJsonpdiscord-clone"]=this["webpackJsonpdiscord-clone"]||[]).push([[0],{106:function(e,a,n){},107:function(e,a,n){},108:function(e,a,n){},109:function(e,a,n){},110:function(e,a,n){},111:function(e,a,n){},112:function(e,a,n){"use strict";n.r(a);var t=n(3),s=n(2),c=n.n(s),i=n(26),r=n.n(i),l=(n(81),n(24)),o=n.n(l),d=n(31),u=n(16),j=(n(83),n(73)),m=n(9),b=n(29),h=Object(b.b)({name:"user",initialState:{user:null},reducers:{login:function(e,a){e.user=a.payload},logout:function(e){e.user=null}}}),p=h.actions,f=p.login,O=p.logout,v=function(e){return e.user.user},x=h.reducer,g=(n(87),Object(b.b)({name:"app",initialState:{serverId:null,serverName:null,channelId:null,channelName:null,membersList:[]},reducers:{setServerInfo:function(e,a){e.serverId=a.payload.serverId,e.serverName=a.payload.serverName,e.channelId=null,e.channelName=null},setChannelInfo:function(e,a){e.channelId=a.payload.channelId,e.channelName=a.payload.channelName},setMembersList:function(e,a){e.membersList+=a.payload.membersList}}})),_=g.actions,N=_.setServerInfo,y=_.setChannelInfo,S=(_.setMembersList,function(e){return e.app.serverId}),I=function(e){return e.app.serverName},w=function(e){return e.app.channelId},k=function(e){return e.app.channelName},C=g.reducer,T=n(23),E=T.a.initializeApp({apiKey:"AIzaSyB05OmarqivGc5YTKUATgzXJ8Nz_IOuv9M",authDomain:"discord-clone-75157.firebaseapp.com",projectId:"discord-clone-75157",storageBucket:"discord-clone-75157.appspot.com",messagingSenderId:"538671599107",appId:"1:538671599107:web:1fe145eaebf8df167f8836",measurementId:"G-XDTQKXKTD7"}).firestore(),z=T.a.auth(),L=new T.a.auth.GoogleAuthProvider,B=E;var F=function(e){var a=e.serverId,n=e.serverName,s=e.photo,c=e.channels,i=e.setChannels,r=(Object(m.c)(v),Object(m.b)());return Object(t.jsx)("div",{className:"sidebar__server",onClick:function(){r(N({serverId:a,serverName:n})),B.collection("servers/"+a+"/channels").orderBy("channelName","asc").onSnapshot((function(e){return i(e.docs.map((function(e){return{id:e.id,channel:e.data()}})))})),console.log(c)},children:Object(t.jsx)("img",{id:a,name:n,src:s||"",className:"sidebar__serverImg"})},a)},H=(n(91),n(49)),D=n.n(H),M=n(48),U=n.n(M);n(92);var A=function(e){var a=e.id,n=e.channelName,s=Object(m.b)();return Object(t.jsx)("div",{className:"sidebarChannel",onClick:function(){return s(y({channelId:a,channelName:n}))},children:Object(t.jsxs)("h4",{children:[Object(t.jsx)("span",{className:"sidebarChannel__hash",children:"#"}),n]})},a)},R=n(129),V=n(58),K=n.n(V),P=n(131),G=n(57),J=n.n(G),W=n(61),X=n.n(W),q=n(60),Q=n.n(q),Y=n(59),$=n.n(Y);var Z=function(){var e=Object(m.c)(v),a=Object(s.useState)([]),n=Object(u.a)(a,2),c=n[0],i=n[1],r=Object(s.useState)([]),l=Object(u.a)(r,2),o=l[0],d=l[1],b=Object(m.c)(S),h=Object(m.c)(I),p=B.collection("users");return Object(s.useEffect)((function(){B.collection("servers").orderBy("serverName","asc").onSnapshot((function(e){return d(e.docs.map((function(e){return{id:e.id,server:e.data()}})))}))}),[]),Object(t.jsxs)("div",{className:"sidebar__panel",children:[Object(t.jsxs)("div",{className:"sidebar__serverList",children:[o.map((function(e){return Object(t.jsx)(F,{serverId:e.id,serverName:e.server.serverName,photo:e.server.photo,channels:c,setChannels:i})})),Object(t.jsx)(U.a,{onClick:function(){var a=prompt("Enter a new server");if(a){var n=prompt("Enter photo URL");n&&B.collection("servers").add({serverName:a,photo:n,administrators:[{displayName:e.displayName,uid:e.uid}],moderators:[]})}},className:"sidebar__addServer"})]}),Object(t.jsxs)("div",{className:"sidebar",children:[Object(t.jsxs)("div",{className:"sidebar__top",children:[Object(t.jsx)("h4",{children:h}),Object(t.jsx)(D.a,{})]}),Object(t.jsxs)("div",{className:"sidebar__channels",children:[Object(t.jsxs)("div",{className:"sidebar__channelsHeader",children:[Object(t.jsxs)("div",{className:"sidebar__header",children:[Object(t.jsx)(D.a,{}),Object(t.jsx)("h4",{children:"Text Channels"})]}),Object(t.jsx)(U.a,{onClick:function(){var e=prompt("Enter a new channel");b&&e&&B.collection("servers/"+b+"/channels").add({channelName:e})},className:"sidebar__addChannel"})]}),Object(t.jsx)("div",{className:"sidebar__channelsList",children:c.map((function(e){var a=e.id,n=e.channel;return Object(t.jsx)(A,{id:a,channelName:n.channelName},a)}))})]}),Object(t.jsxs)("div",{className:"sidebar__voice",children:[Object(t.jsx)(R.a,{className:"sidebar__voiceIcon",fontSize:"initial"}),Object(t.jsxs)("div",{className:"sidebar__voiceInfo",children:[Object(t.jsx)("h3",{children:"Voice Connected"}),Object(t.jsx)("p",{children:"Stream"})]}),Object(t.jsxs)("div",{className:"sidebar__voiceIcons",children:[Object(t.jsx)(J.a,{}),Object(t.jsx)(K.a,{})]})]}),Object(t.jsxs)("div",{className:"sidebar__profile",children:[Object(t.jsx)(P.a,{id:"sidebar__avatar",onClick:function(){p.where("uid","==",e.uid).limit(1).onSnapshot((function(e){e.docs.forEach((function(e){p.doc(e.id).update({status:"offline"})}))})),z.signOut().then(i([].concat(Object(j.a)(c),[{id:"dummy",channel:{}}]))).then(window.location.reload())},src:e.photo}),Object(t.jsxs)("div",{className:"sidebar__profileInfo",children:[Object(t.jsx)("h3",{children:e.displayName}),Object(t.jsxs)("p",{children:["#",e.uid.substring(0,10)]})]}),Object(t.jsxs)("div",{className:"sidebar__profileIcons",children:[Object(t.jsx)($.a,{}),Object(t.jsx)(Q.a,{}),Object(t.jsx)(X.a,{})]})]})]})]})},ee=n(50),ae=n.n(ee);n(106);var ne=function(e){var a=e.timestamp,n=e.message,s=e.user,c=e.file,i=e.fileType;return Object(t.jsxs)("div",{className:"message",children:[Object(t.jsx)(P.a,{className:"message__avatar",src:s.photo}),Object(t.jsxs)("div",{className:"message__info",children:[Object(t.jsxs)("h4",{children:[s.displayName,Object(t.jsx)("span",{className:"message__timestamp",children:new Date(null===a||void 0===a?void 0:a.toDate()).toUTCString()})]}),Object(t.jsxs)("p",{children:[Object(t.jsx)(ae.a,{properties:{target:"_blank",url:ae.a.MATCH},children:n}),console.log("not defined")]}),function(){var e=null;if(c)switch(i){case"image/apng":case"image/avif":case"image/bmp":case"image/gif":case"image/jpeg":case"image/png":case"image/svg+xml":case"image/webp":case"image/x-icon":e=Object(t.jsx)("img",{src:c,className:"attached__media message__attachment"});break;case"audio/mpeg":case"audio/ogg":case"audio/wav":e=Object(t.jsxs)("audio",{controls:!0,className:"message__attachment",children:[Object(t.jsx)("source",{src:c}),"Audio tag unsupported"]});break;case"video/mp4":case"video/ogg":case"video/webm":e=Object(t.jsx)("video",{controls:!0,src:c,className:"attached__media message__attachment"});break;default:e=Object(t.jsx)("a",{href:c,target:"_blank",children:c})}return e}()]})]})},te=(n(107),n(62)),se=n.n(te),ce=n(63),ie=n.n(ce),re=n(64),le=n.n(re),oe=n(65),de=n.n(oe),ue=n(66),je=n.n(ue),me=n(67),be=n.n(me);var he=function(e){var a=e.channelName;return Object(t.jsxs)("div",{className:"chatHeader",children:[Object(t.jsx)("div",{className:"chatHeader__left",children:Object(t.jsxs)("h3",{children:[Object(t.jsx)("span",{className:"chatHeader__hash",children:"#"}),a]})}),Object(t.jsxs)("div",{className:"chatHeader__right",children:[Object(t.jsx)(se.a,{}),Object(t.jsx)(ie.a,{}),Object(t.jsx)(le.a,{}),Object(t.jsxs)("div",{className:"chatHeader__search",children:[Object(t.jsx)("input",{placeholder:"Search"}),Object(t.jsx)(de.a,{})]}),Object(t.jsx)(je.a,{}),Object(t.jsx)("a",{href:"https://github.com/SteliosPhanartzis/Parley",children:Object(t.jsx)(be.a,{})})]})]})},pe=n(68),fe=n.n(pe),Oe=(n(108),n(70)),ve=n.n(Oe),xe=n(71),ge=n.n(xe),_e=n(72),Ne=n.n(_e),ye=n(69),Se=n.n(ye);var Ie=function(){var e=Object(s.useRef)(),a=Object(m.c)(v),n=Object(m.c)(S),i=Object(m.c)(w),r=Object(m.c)(k),l=Object(s.useState)((function(){return""})),j=Object(u.a)(l,2),b=j[0],h=j[1],p=Object(s.useState)((function(){return[]})),f=Object(u.a)(p,2),O=f[0],x=f[1],g=Object(s.useState)(null),_=Object(u.a)(g,2),N=_[0],y=_[1],I=Object(s.useState)((function(){return null})),C=Object(u.a)(I,2),E=C[0],z=C[1],L=Object(s.useState)((function(){return"none"})),F=Object(u.a)(L,2),H=F[0],D=F[1],M=T.a.storage().ref();return Object(s.useEffect)((function(){i&&(B.collection("servers/"+n+"/channels/"+i+"/messages").orderBy("timestamp","asc").onSnapshot((function(e){return x(e.docs.map((function(e){return e.data()})))})),e.current.scrollIntoView({behavior:"smooth"}))}),[i]),Object(t.jsxs)("div",{className:"chat",children:[Object(t.jsx)(he,{channelName:r}),Object(t.jsxs)("div",{className:"chat__messages",children:[O.map((function(e){return Object(t.jsx)(ne,{timestamp:e.timestamp,message:e.message,user:e.user,file:e.file,fileType:e.fileType})})),Object(t.jsx)("div",{ref:e})]}),Object(t.jsx)("div",{id:"emoji_picker",style:{display:H},children:Object(t.jsx)(fe.a,{onEmojiClick:function(e,a){h(b+a.emoji)}})}),Object(t.jsxs)("div",{className:"chat__input",children:[Object(t.jsx)("input",{type:"file",id:"att_file",name:"att_file",accept:"image/x-png,image/gif,image/jpeg,image/bmp,audio/mpeg",disabled:!i,files:N,value:function(){return N?N.name:""},onChange:function(e){e.target.files[0]?(y(e.target.files[0]),z(e.target.files[0].name)):console.log("File action cancelled")}}),c.a.createElement("label",{htmlFor:"att_file"},Object(t.jsx)(Se.a,{fontSize:"large"})),Object(t.jsxs)("form",{children:[Object(t.jsx)("input",{value:b,disabled:!i,onChange:function(e){return h(e.target.value)},placeholder:E||"#Message "+r}),Object(t.jsx)("button",{disabled:!i,className:"chat__inputButton",type:"submit",onClick:function(t){t.preventDefault();var s=null,c=null;if(N){var r=function(){var e=Object(d.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=B.collection("servers/"+n+"/channels").doc(i).collection("messages"),e.t1=T.a.firestore.FieldValue.serverTimestamp(),e.t2=b,e.t3=a,e.next=6,t;case 6:e.t4=e.sent,e.t5=N.type,e.t6={timestamp:e.t1,message:e.t2,user:e.t3,file:e.t4,fileType:e.t5},e.t0.add.call(e.t0,e.t6),y(null);case 11:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();if(N.size>2097152)alert("File is over 2MB limit!"),y(null);else{M.child(a.displayName+"-"+N.name).getDownloadURL().then(r,(function(){s=M.child(a.displayName+"-"+N.name),console.log(N.size),s.put(N).then(Object(d.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.getDownloadURL();case 2:c=e.sent,console.log("File has been uploaded");case 4:case"end":return e.stop()}}),e)})))).then(Object(d.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.collection("servers/"+n+"/channels/"+i+"/messages").add({timestamp:T.a.firestore.FieldValue.serverTimestamp(),message:b,user:a,file:c,fileType:N.type});case 2:case"end":return e.stop()}}),e)})))).then((function(){y(null)}))}))}}else!N&&b&&""!=b.split(" ").join("")&&(B.collection("servers/"+n+"/channels").doc(i).collection("messages").add({timestamp:T.a.firestore.FieldValue.serverTimestamp(),message:b,user:a,file:null}),y(null));h(""),z(null),e.current.scrollIntoView({behavior:"smooth"})},children:"Send Message"})]}),Object(t.jsxs)("div",{className:"chat__inputIcons",children:[Object(t.jsx)(ve.a,{fontSize:"large"}),Object(t.jsx)(ge.a,{fontSize:"large"}),Object(t.jsx)(Ne.a,{onClick:function(){D(i&&"none"==H?"flex":"none")},fontSize:"large"})]})]})]})},we=n(130);n(109);var ke=function(){return Object(t.jsxs)("div",{className:"login",children:[Object(t.jsx)("div",{className:"login__logo",children:Object(t.jsx)("img",{src:"/main_logo.png",alt:"app logo"})}),Object(t.jsx)(we.a,{onClick:function(){z.signInWithPopup(L).catch((function(e){return alert(e.message)}))},children:"Sign In"})]})};n(110);var Ce=function(e){var a=e.displayState,n=e.displayHook,s=e.content;return Object(t.jsx)("div",{className:"modal",style:{display:a},children:Object(t.jsxs)("div",{className:"modal__content",children:[Object(t.jsx)("span",{type:"button",className:"modal__close",onClick:function(){n("none")},children:"\u2573"}),s]})})};n(111);var Te=function(){var e=B.collection("users"),a=Object(s.useState)([]),n=Object(u.a)(a,2),c=n[0],i=n[1];return Object(s.useEffect)((function(){e.onSnapshot((function(e){return i(e.docs.map((function(e){return{id:e.id,user:e.data()}})))}))}),[]),Object(t.jsx)("div",{className:"members",children:Object(t.jsxs)("div",{className:"members__list",children:[Object(t.jsx)("p",{children:"USERS"}),c.map((function(e){return Object(t.jsxs)("div",{className:"online"==e.user.status?"active":"inactive",children:[Object(t.jsx)(P.a,{src:e.user.photo}),Object(t.jsx)("p",{children:e.user.displayName})]},e.user.uid+e.user.status)}))]})})};var Ee=function(){var e=Object(m.b)(),a=Object(m.c)(v),n=Object(s.useState)("none"),c=Object(u.a)(n,2),i=c[0],r=c[1];return Object(s.useEffect)((function(){z.onAuthStateChanged(function(){var n=Object(d.a)(o.a.mark((function n(t){var s,c;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s=B.collection("users"),!t){n.next=8;break}return c=s.where("uid","==",t.uid).limit(1).get(),n.next=5,c.then((function(e){console.log(t),0==e.docs.length?s.add({uid:t.uid,displayName:t.displayName,photo:t.photoURL,status:"online"}):e.forEach((function(e){s.doc(e.id).update({status:"online"})}))}));case 5:e(f({uid:t.uid,photo:t.photoURL,email:t.email,displayName:t.displayName,status:"online"})),n.next=11;break;case 8:if(!a){n.next=11;break}return n.next=11,e(O());case 11:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}),[e]),Object(t.jsx)("div",{className:"app",children:a?Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)(Z,{}),Object(t.jsx)(Ie,{}),Object(t.jsx)(Te,{}),Object(t.jsx)(Ce,{displayState:i,displayHook:r})]}):Object(t.jsx)(t.Fragment,{children:Object(t.jsx)(ke,{})})})},ze=Object(b.a)({reducer:{user:x,app:C}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(Object(t.jsx)(c.a.StrictMode,{children:Object(t.jsx)(m.a,{store:ze,children:Object(t.jsx)(Ee,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},81:function(e,a,n){},83:function(e,a,n){},87:function(e,a,n){},91:function(e,a,n){},92:function(e,a,n){}},[[112,1,2]]]);
//# sourceMappingURL=main.dd426efe.chunk.js.map