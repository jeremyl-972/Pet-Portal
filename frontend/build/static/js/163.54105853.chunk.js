"use strict";(self.webpackChunkpet_adoption_app=self.webpackChunkpet_adoption_app||[]).push([[163],{3163:function(e,s,n){n.r(s),n.d(s,{default:function(){return v}});var r=n(885),a=n(2791),t=n(5440),c=n(5861),i=n(7757),d=n.n(i),o=n(6871),l=n(1805),u=n(2567),h=n(8300),p=n(8265),x=n(184),j=function(){var e=(0,o.UO)().userId,s=(0,a.useState)([]),n=(0,r.Z)(s,2),i=n[0],j=n[1],m=(0,u.x)(),f=m.isLoading,v=m.error,g=m.sendRequest,k=m.clearError;return(0,a.useEffect)((function(){var s=function(){var s=(0,c.Z)(d().mark((function s(){var n;return d().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,g("".concat("https://pet-adoption-portal.herokuapp.com","/users/full/").concat(e),"GET");case 2:n=s.sent,j(n.userPets);case 4:case"end":return s.stop()}}),s)})));return function(){return s.apply(this,arguments)}}();s()}),[g,e]),i?i&&0!==i.length?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{nobackdrop:!1,error:v,onClear:k}),f&&(0,x.jsx)(p.Z,{asOverlay:!0}),(0,x.jsx)(t.mo,{children:i.map((function(e){return(0,x.jsx)(l.Z,{id:e._id,name:e.name,image:"".concat(e.image),breed:e.breed,status:e.status},e._id)}))})]}):(0,x.jsxs)(x.Fragment,{children:[f&&(0,x.jsx)(p.Z,{asOverlay:!0}),(0,x.jsx)("div",{className:"",children:(0,x.jsxs)(t.Nh,{children:[(0,x.jsx)(t.M5,{children:(0,x.jsx)("h3",{style:{padding:"25px 0"},children:"You don't have any pets yet. Check out the search page!"})}),(0,x.jsx)(t.M5,{children:(0,x.jsx)(t.un,{to:"/search",children:"Go To The Search Page"})})]})})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{nobackdrop:!1,error:v,onClear:k}),f&&(0,x.jsx)(p.Z,{asOverlay:!0}),(0,x.jsx)("div",{className:"",children:(0,x.jsxs)(t.Nh,{children:[(0,x.jsx)(t.M5,{children:(0,x.jsx)("h3",{style:{padding:"25px 0"},children:"No pets found. You should adopt one!"})}),(0,x.jsx)(t.M5,{children:(0,x.jsx)(t.un,{to:"/search",children:"Go To The Search Page"})})]})})]})},m=n(5734),f=function(){var e=(0,a.useContext)(m.V).User,s=(0,a.useState)([]),n=(0,r.Z)(s,2),i=n[0],o=n[1],j=(0,u.x)(),f=j.isLoading,v=j.error,g=j.sendRequest,k=j.clearError;return(0,a.useEffect)((function(){var s=function(){var s=(0,c.Z)(d().mark((function s(){var n,r;return d().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,g("".concat("https://pet-adoption-portal.herokuapp.com","/users/").concat(e._id),"GET");case 2:n=s.sent,r=n.user,o(r.savedPets);case 5:case"end":return s.stop()}}),s)})));return function(){return s.apply(this,arguments)}}();s()}),[e,g]),i&&0!==i.length?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{error:v,onClear:k}),f&&(0,x.jsx)(p.Z,{asOverlay:!0}),(0,x.jsx)(t.mo,{children:i.map((function(e){return(0,x.jsx)(l.Z,{isSaved:!0,id:e._id,name:e.name,image:"".concat(e.image),breed:e.breed,status:e.status},e._id)}))})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{error:v,onClear:k}),f&&(0,x.jsx)(p.Z,{asOverlay:!0}),(0,x.jsx)("div",{className:"",children:(0,x.jsxs)(t.Nh,{children:[(0,x.jsx)(t.M5,{children:(0,x.jsx)("h3",{style:{padding:"25px 0"},children:"No saved pets found. Check out the search page!"})}),(0,x.jsx)(t.M5,{children:(0,x.jsx)(t.un,{to:"/search",children:"Go To The Search Page"})})]})})]})},v=function(){var e=(0,a.useState)(!0),s=(0,r.Z)(e,2),n=s[0],c=s[1];return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{style:{padding:"0 25px"},children:[(0,x.jsx)(t.M5,{children:(0,x.jsx)("h1",{style:{padding:"15px 0"},children:n?"My Pets":"Saved Pets"})}),(0,x.jsx)(t.M5,{children:(0,x.jsxs)("div",{className:"new-user-prompt",children:["Show me",n?(0,x.jsx)("span",{className:"signup-link",onClick:function(){c(!1)},children:" Saved Pets"}):(0,x.jsx)("span",{className:"signup-link",onClick:function(){c(!0)},children:" My Pets"})]})}),(0,x.jsx)(t.M5,{children:(0,x.jsx)("div",{className:"dividing-line"})}),n?(0,x.jsx)(j,{}):(0,x.jsx)(f,{})]})})}},1805:function(e,s,n){var r=n(3504),a=(n(8088),n(184));s.Z=function(e){var s=e.id,n=e.name,t=e.image,c=e.status;return(0,a.jsx)(r.OL,{to:"/pet/".concat(s),className:"pet-card",style:{backgroundImage:"url('".concat(t,"')")},children:(0,a.jsx)("div",{className:"pet-card-container",children:(0,a.jsxs)("div",{className:"pet-card-header",children:[(0,a.jsx)("span",{className:"pet-card-title",children:n}),(0,a.jsx)("span",{className:"pet-card-status",children:"  (".concat(c,")")})]})})})}},8088:function(){}}]);
//# sourceMappingURL=163.54105853.chunk.js.map