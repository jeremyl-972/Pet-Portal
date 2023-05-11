"use strict";(self.webpackChunkpet_adoption_app=self.webpackChunkpet_adoption_app||[]).push([[182],{182:function(e,t,i){i.r(t);var a=i(5861),n=i(885),l=i(7757),r=i.n(l),s=i(2791),u=i(6871),d=(i(4029),i(5833)),p=i(5440),o=i(9457),c=i(2567),v=i(8300),h=i(8265),x=i(170),m=i(5734),g=i(184);t.default=function(){var e=(0,s.useContext)(m.V).token,t=(0,u.s0)(),i=(0,s.useState)(),l=(0,n.Z)(i,2),j=l[0],f=l[1],y=(0,u.UO)().petId,b=(0,c.x)(),I=b.isLoading,V=b.error,T=b.sendRequest,w=b.clearError,k=(0,d.Z)({name:{value:"",isValid:!1},type:{value:"",isValid:!1},breed:{value:"",isValid:!1},status:{value:"",isValid:!1},height:{value:"",isValid:!1},weight:{value:"",isValid:!1},color:{value:"",isValid:!1},hypoall:{value:"",isValid:!1},dietno:{value:"",isValid:!1},bio:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1),P=(0,n.Z)(k,3),R=P[0],C=P[1],N=P[2];(0,s.useEffect)((function(){var e=function(){var e=(0,a.Z)(r().mark((function e(){var t;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T("".concat("https://pet-adoption-portal.herokuapp.com","/pets/").concat(y),"GET");case 3:t=e.sent,f(t.pet),N({name:{value:t.pet.name,isValid:!0},type:{value:t.pet.type,isValid:!0},breed:{value:t.pet.breed,isValid:!0},status:{value:t.pet.status,isValid:t.true},height:{value:t.pet.height,isValid:!0},weight:{value:t.pet.weight,isValid:!0},color:{value:t.pet.color,isValid:!0},hypoall:{value:t.pet.hypoall,isValid:!0},dietno:{value:t.pet.dietno,isValid:!0},bio:{value:t.pet.bio,isValid:!0},image:{value:t.pet.image,isValid:!0}},!0),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[y,T,N]);var Z=(0,s.useState)(!1),q=(0,n.Z)(Z,2),S=q[0],_=q[1],E=function(){var i=(0,a.Z)(r().mark((function i(a){var n;return r().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return a.preventDefault(),i.prev=1,(n=new FormData).append("name",R.inputs.name.value),n.append("type",R.inputs.type.value),n.append("breed",R.inputs.breed.value),n.append("status",R.inputs.status.value),n.append("height",R.inputs.height.value),n.append("weight",R.inputs.weight.value),n.append("color",R.inputs.color.value),n.append("hypoall",R.inputs.hypoall.value),n.append("dietno",R.inputs.dietno.value),n.append("bio",R.inputs.bio.value),n.append("image",R.inputs.image.value),i.next=16,T("".concat("https://pet-adoption-portal.herokuapp.com","/pets/").concat(y),"PUT",n,{Authorization:"Bearer ".concat(e)});case 16:_(!0),setTimeout((function(){_(!1)}),2e3),t("/admin/allPets"),i.next=23;break;case 21:i.prev=21,i.t0=i.catch(1);case 23:case 24:case"end":return i.stop()}}),i,null,[[1,21]])})));return function(e){return i.apply(this,arguments)}}();return I||j?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v.Z,{nobackdrop:!0,error:V,onClear:w}),I&&(0,g.jsx)(h.Z,{asOverlay:!0}),(0,g.jsx)(p.M5,{className:"add-edit-title",children:"Edit Pet"}),!I&&j&&(0,g.jsxs)("div",{className:"admin-about-pet-container",children:[(0,g.jsx)(x.Z,{center:"center",id:"image",initialvalue:"".concat(j.image),initialvalid:!0,onInput:C,errorText:"Please add an image"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Pet Name:"}),initialvalue:j.name,initialvalid:!0,id:"name",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Pet Name Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Type of Pet:"}),initialvalue:j.type,initialvalid:!0,id:"type",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Pet Type Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Breed:"}),initialvalue:j.breed,initialvalid:!0,id:"breed",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Breed Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Current Status:"}),initialvalue:j.status,initialvalid:!0,id:"status",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Status Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Height:"}),initialvalue:j.height,initialvalid:!0,id:"height",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Height Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Weight:"}),initialvalue:j.weight,initialvalid:!0,id:"weight",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Pet Name Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Color:"}),initialvalue:j.color,initialvalid:!0,id:"color",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Pet Name Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Hypoallergenic:"}),initialvalue:j.hypoall,initialvalid:!0,id:"hypoall",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"HypoAll Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Dietary Restrictions:"}),initialvalue:j.dietno,initialvalid:!0,id:"dietno",onInput:C,element:"input",type:"text",validators:[(0,o.hg)()],errorText:"Diet Nos Required"}),(0,g.jsx)(p.II,{label:(0,g.jsx)("span",{children:"Bio:"}),initialvalue:j.bio,initialvalid:!0,id:"bio",onInput:C,element:"input",type:"textarea",validators:[(0,o.hg)()],errorText:"Bio Required"}),(0,g.jsx)(p.M5,{children:(0,g.jsx)(p.un,{disabled:!R.isValid,onClick:E,children:"Submit Changes"})})]}),(0,g.jsx)(p.u_,{show:S,onCancel:function(){_(!1)},headerClass:"pet-page-modal-header",headerText:"The Pet details have been saved."})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p.M5,{className:"add-edit-title",children:"Edit Pet"}),(0,g.jsx)("div",{className:"admin-about-pet-container",children:"Could Not Find Pet"})]})}},170:function(e,t,i){i.d(t,{Z:function(){return s}});var a=i(885),n=i(2791),l=i(9628),r=i(184),s=function(e){var t=(0,n.useState)(),i=(0,a.Z)(t,2),s=i[0],u=i[1],d=(0,n.useState)(),p=(0,a.Z)(d,2),o=p[0],c=p[1],v=(0,n.useState)(!1),h=(0,a.Z)(v,2),x=h[0],m=h[1],g=(0,n.useRef)();(0,n.useEffect)((function(){if(e.initialvalue&&c(e.initialvalue),s){var t=new FileReader;t.onload=function(){c(t.result)},t.readAsDataURL(s)}}),[s,e.initialvalue]);return(0,r.jsxs)("div",{className:"form-control",children:[(0,r.jsx)("input",{id:e.id,ref:g,onChange:function(t){var i,a=x;t.target.files&&1===t.target.files.length?(i=t.target.files[0],u(i),m(!0),a=!0):(m(!1),a(!1)),e.onInput(e.id,i,a)},style:{display:"none"},type:"file",accept:".jpg, .png, .jpeg"}),(0,r.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[(0,r.jsx)("div",{className:"image-upload__preview",children:o?(0,r.jsx)("img",{src:o,alt:"Preview"}):(0,r.jsx)("p",{children:"Please pick an Image"})}),(0,r.jsx)(l.u,{type:"button",onClick:function(){g.current.click()},children:"Pick Image"})]}),!x&&(0,r.jsx)("p",{children:e.errorText})]})}},4029:function(){}}]);
//# sourceMappingURL=182.3b53a63d.chunk.js.map