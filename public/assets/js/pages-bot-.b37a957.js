(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1272:function(t,e,n){"use strict";n.r(e);n(17),n(18),n(27);var o=n(9);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={name:"Bot",components:{},props:{},data:function(){return{query:null}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}({},Object(o.b)({steps:"Bot/steps",isLoading:"Bot/isLoading"})),created:function(){this.$store.dispatch("Bot/START_BOT")},methods:{go:function(){this.$store.dispatch("Bot/QUERY_BOT",this.query)}}},i=(n(1290),n(2)),s=Object(i.a)(c,function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"Bot"},[e("iframe",{attrs:{allow:"microphone;",src:"https://console.dialogflow.com/api-client/demo/embedded/9198181c-1450-4265-9221-42d0b2682498"}})])}],!1,null,"6966bbec",null);e.default=s.exports},1282:function(t,e,n){},1290:function(t,e,n){"use strict";var o=n(1282);n.n(o).a}}]);