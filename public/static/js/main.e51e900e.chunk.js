(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(2),r=n.n(c),i=(n(13),n(3)),s=n(4),l=n(6),u=n(7),p=n(5),m=n.n(p),h=(n(14),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).state={apiResponse:""},e}return Object(s.a)(n,[{key:"callAPI",value:function(){var e=this;fetch("/api/testAPI").then((function(e){return e.text()})).then((function(t){return e.setState({apiResponse:t})})).catch((function(e){return e}))}},{key:"componentDidMount",value:function(){this.callAPI()}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:m.a,className:"App-logo",alt:"logo"}),o.a.createElement("h1",{className:"App-title"},"Welcome to React")),o.a.createElement("p",{className:"App-intro"},this.state.apiResponse))}}]),n}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.e51e900e.chunk.js.map