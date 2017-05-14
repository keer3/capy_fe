webpackJsonp([1,2],{201:function(e,t){e.exports=require("url")},202:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.store=t.router=t.app=void 0;var n=s(225),o=r(n),a=s(5),l=r(a),i=s(329),c=s(306),u=r(c),d=s(206),p=r(d),f=s(207),v=r(f),m=s(359),_=r(m);s(276),s(275),s(274);var j=s(326),h=r(j);l.default.use(_.default),l.default.use(h.default),(0,i.sync)(v.default,p.default);var g=new l.default((0,o.default)({router:p.default,store:v.default},u.default));t.app=g,t.router=p.default,t.store=v.default},203:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var n=s(297),o=r(n);window.Promise=window.Promise||o.default},204:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var n=s(295),o=r(n);o.default.install({onUpdateReady:function(){console.log("update ready"),o.default.applyUpdate()},onUpdated:function(){console.log("updated"),location.reload()}})},206:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(5),o=r(n),a=s(327),l=r(a),i=s(308),c=r(i);o.default.use(l.default);var u=[],d={path:"/home",component:c.default,children:[{path:"/doc",component:s(307)}]};d.children.push({path:"/project/list",component:s(311)}),d.children.push({path:"/project",component:s(309)});var p={path:"/login",component:s(314)},f={path:"/reg",component:s(313)},v={path:"/404",component:s(305)},m={path:"*",redirect:"/login"};u=u.concat([d,p,f,v,m]),t.default=new l.default({mode:"history",routes:u})},207:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(5),o=r(n),a=s(331),l=r(a),i=s(330),c=r(i);o.default.use(l.default);var u={userInfor:{},project:{}},d={SAVE_USER_INFOR:function(e,t){e.userInfor=t},SAVE_PROJECT:function(e,t){e.project=t}},p={incrementAsync:function(e){var t=e.commit;setTimeout(function(){t("INCREMENT")},200)}},f=new l.default.Store({state:u,mutations:d,actions:p,plugins:[(0,c.default)()]});t.default=f},208:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{activeIndex:"1"}}}},209:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{activeIndex:"1"}}}},210:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(303),o=r(n);t.default={name:"app",components:{NavMenu:o.default}}},211:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={components:{},data:function(){return{activeIndex:"2"}}}},212:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(304),o=r(n);t.default={components:{NavMenu:o.default}}},213:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(310),o=r(n),a=s(312),l=r(a),i=s(31),c=r(i),u=s(32);t.default={components:{ProjectApi:o.default,ProjectMember:l.default},mounted:function(){this.ProjectService=new c.default},computed:{userInfor:function(){return this.$store.state.userInfor},project:function(){return this.$store.state.project}},data:function(){return{activeName:"first",editProjectDialogVisible:!1,projectModel:{type:""},rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"}],version:[{required:!0,message:"请输入版本号",trigger:"blur"}],type:[{required:!0,message:"请选择项目类型",trigger:"blur"}]},projectType:u.PROJECT_TYPE}},methods:{changeTap:function(e){this.activeName=e},handleEdit:function(e){this.editProjectDialogVisible=!0,this.projectModel.name=e.name,this.projectModel.type=e.type,this.projectModel.version=e.version,this.projectModel.dec=e.dec},saveEdit:function(){var e=this;this.$refs.projectModel.validate(function(t){if(!t)return!1;e.projectModel.projectId=e.project.id,e.ProjectService.updateProjectInfo(e.projectModel).then(function(t){200===t.status&&(e.editProjectDialogVisible=!1,e.project.name=e.projectModel.name,e.project.type=e.projectModel.type,e.project.version=e.projectModel.version,e.project.dec=e.projectModel.dec,e.projectModel={type:""},console.log(e.project),e.$message({type:"success",message:"保存成功！"}))})})}}}},214:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(0),o=r(n),a=s(31),l=r(a),i=s(32);t.default={mounted:function(){this.ProjectService=new l.default,this.reload()},computed:{userInfor:function(){return this.$store.state.userInfor}},data:function(){return{activeName:"first",projectList:[],addProjectDialogVisible:!1,deleteProjectDialogVisible:!1,project:{type:"",version:"1.0.0"},projectType:i.PROJECT_TYPE,rules:{name:[{required:!0,message:"请输入项目名称",trigger:"blur"}],version:[{required:!0,message:"请输入版本号",trigger:"blur"}],type:[{required:!0,message:"请选择项目类型",trigger:"blur"}]},dialogTitle:"",nameToDel:"",loading:!1}},methods:{handleEdit:function(e,t){this.dialogTitle="编辑项目",this.addProjectDialogVisible=!0,this.project=t},handleDelete:function(e,t){this.deleteProjectDialogVisible=!0,this.nameToDel=t.name,this.project=t},addProject:function(){var e=this;this.$refs.project.validate(function(t){if(!t)return!1;e.project.createUserId=e.userInfor.userId,"新增项目"===e.dialogTitle?e.ProjectService.addProject(e.project).then(function(t){200===t.status&&(e.reload(),e.addProjectDialogVisible=!1,e.project={},e.$message({type:"success",message:"添加成功！"}))}):(e.project.projectId=e.project.id,e.ProjectService.updateProjectInfo(e.project).then(function(t){200===t.status&&(e.addProjectDialogVisible=!1,e.project={},e.$message({type:"success",message:"保存成功！"}))}))})},delProject:function(){var e=this;this.ProjectService.delProject({projectId:this.project.id}).then(function(t){200===t.status&&(e.reload(),e.deleteProjectDialogVisible=!1,e.project={},e.$message({type:"success",message:"删除成功！"}))})},reload:function(){var e=this;this.loading=!0,this.ProjectService.findProjectByUser({userId:this.userInfor.userId}).then(function(t){e.loading=!1;var s=t.data;e.projectList=s,e.projectList.forEach(function(e){e.update_time=(0,o.default)(e.update_time).format("YYYY-MM-DD HH:mm:ss")})})},handleCurrentChange:function(e){var t=this;this.ProjectService.getProjectInfo({projectId:e.id}).then(function(e){200===e.status&&(e.data.update_time=(0,o.default)(e.data.update_time).format("YYYY-MM-DD HH:mm:ss"),t.$store.commit("SAVE_PROJECT",e.data),t.$router.push({path:"/project"}))})}}}},215:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(31),o=r(n);t.default={mounted:function(){var e=this;this.ProjectService=new o.default,this.ProjectService.findUserByProject({projectId:this.project.id}).then(function(t){200===t.status&&(e.memberList=t.data)})},computed:{userInfor:function(){return this.$store.state.userInfor},project:function(){return this.$store.state.project}},data:function(){return{searchInput:"",searchSelect:"",memberList:[],searchResult:[],searchResultDialog:!0}},methods:{searchUser:function(){console.log("hhh"),this.searchResultDialog=!0}}}},216:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(56),o=r(n);t.default={data:function(){return{userInfor:{phone:"",code:"",psd:"",name:""},rules:{phone:[{required:!0,message:"请输入手机号码",trigger:"blur"}],code:[{required:!0,message:"请输入验证码",trigger:"blur"}],psd:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},mounted:function(){this.UserService=new o.default},methods:{resetForm:function(e){this.$refs[e].resetFields()},toLogin:function(){this.$router.push({path:"/login"})}}}},217:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(56),o=r(n),a=s(299);r(a);t.default={data:function(){return{userInfor:{phone:"",psd:""},rememberPsd:!0,loading:!1}},mounted:function(){this.UserService=new o.default},methods:{login:function(){var e=this;this.loadding=!0,this.UserService.login({phone:this.userInfor.phone,password:this.userInfor.psd}).then(function(t){e.loadding=!1;var s=t.status,r=(t.message,t.data);200===s&&(e.$store.commit("SAVE_USER_INFOR",r),e.$router.push({path:"/project/list"}))})},toReg:function(){this.$router.push({path:"/reg"})}}}},274:function(e,t){},275:function(e,t){},277:function(e,t){},278:function(e,t){},279:function(e,t){},28:function(e,t,s){e.exports=s.p+"static/media/logo.9737e3fb.png"},280:function(e,t){},281:function(e,t){},282:function(e,t){},283:function(e,t){},284:function(e,t){},285:function(e,t){},289:function(e,t){e.exports={name:"got",version:"6.7.1",description:"Simplified HTTP requests",license:"MIT",repository:"sindresorhus/got",maintainers:[{name:"Sindre Sorhus",email:"sindresorhus@gmail.com",url:"sindresorhus.com"},{name:"Vsevolod Strukchinsky",email:"floatdrop@gmail.com",url:"github.com/floatdrop"}],engines:{node:">=4"},browser:{"unzip-response":!1},scripts:{test:"xo && nyc ava",coveralls:"nyc report --reporter=text-lcov | coveralls"},files:["index.js"],keywords:["http","https","get","got","url","uri","request","util","utility","simple","curl","wget","fetch"],dependencies:{"create-error-class":"^3.0.0",duplexer3:"^0.1.4","get-stream":"^3.0.0","is-redirect":"^1.0.0","is-retry-allowed":"^1.0.0","is-stream":"^1.0.0","lowercase-keys":"^1.0.0","safe-buffer":"^5.0.1","timed-out":"^4.0.0","unzip-response":"^2.0.1","url-parse-lax":"^1.0.0"},devDependencies:{ava:"^0.17.0",coveralls:"^2.11.4","form-data":"^2.1.1","get-port":"^2.0.0","into-stream":"^3.0.0",nyc:"^10.0.0",pem:"^1.4.4",pify:"^2.3.0",tempfile:"^1.1.1",xo:"*"},xo:{esnext:!0},ava:{concurrency:4},_from:"got@6.7.1",_resolved:"http://registry.npm.taobao.org/got/download/got-6.7.1.tgz"}},294:function(e,t,s){function r(e){return s(n(e))}function n(e){var t=o[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var o={"./af":78,"./af.js":78,"./ar":85,"./ar-dz":79,"./ar-dz.js":79,"./ar-kw":80,"./ar-kw.js":80,"./ar-ly":81,"./ar-ly.js":81,"./ar-ma":82,"./ar-ma.js":82,"./ar-sa":83,"./ar-sa.js":83,"./ar-tn":84,"./ar-tn.js":84,"./ar.js":85,"./az":86,"./az.js":86,"./be":87,"./be.js":87,"./bg":88,"./bg.js":88,"./bn":89,"./bn.js":89,"./bo":90,"./bo.js":90,"./br":91,"./br.js":91,"./bs":92,"./bs.js":92,"./ca":93,"./ca.js":93,"./cs":94,"./cs.js":94,"./cv":95,"./cv.js":95,"./cy":96,"./cy.js":96,"./da":97,"./da.js":97,"./de":100,"./de-at":98,"./de-at.js":98,"./de-ch":99,"./de-ch.js":99,"./de.js":100,"./dv":101,"./dv.js":101,"./el":102,"./el.js":102,"./en-au":103,"./en-au.js":103,"./en-ca":104,"./en-ca.js":104,"./en-gb":105,"./en-gb.js":105,"./en-ie":106,"./en-ie.js":106,"./en-nz":107,"./en-nz.js":107,"./eo":108,"./eo.js":108,"./es":110,"./es-do":109,"./es-do.js":109,"./es.js":110,"./et":111,"./et.js":111,"./eu":112,"./eu.js":112,"./fa":113,"./fa.js":113,"./fi":114,"./fi.js":114,"./fo":115,"./fo.js":115,"./fr":118,"./fr-ca":116,"./fr-ca.js":116,"./fr-ch":117,"./fr-ch.js":117,"./fr.js":118,"./fy":119,"./fy.js":119,"./gd":120,"./gd.js":120,"./gl":121,"./gl.js":121,"./gom-latn":122,"./gom-latn.js":122,"./he":123,"./he.js":123,"./hi":124,"./hi.js":124,"./hr":125,"./hr.js":125,"./hu":126,"./hu.js":126,"./hy-am":127,"./hy-am.js":127,"./id":128,"./id.js":128,"./is":129,"./is.js":129,"./it":130,"./it.js":130,"./ja":131,"./ja.js":131,"./jv":132,"./jv.js":132,"./ka":133,"./ka.js":133,"./kk":134,"./kk.js":134,"./km":135,"./km.js":135,"./kn":136,"./kn.js":136,"./ko":137,"./ko.js":137,"./ky":138,"./ky.js":138,"./lb":139,"./lb.js":139,"./lo":140,"./lo.js":140,"./lt":141,"./lt.js":141,"./lv":142,"./lv.js":142,"./me":143,"./me.js":143,"./mi":144,"./mi.js":144,"./mk":145,"./mk.js":145,"./ml":146,"./ml.js":146,"./mr":147,"./mr.js":147,"./ms":149,"./ms-my":148,"./ms-my.js":148,"./ms.js":149,"./my":150,"./my.js":150,"./nb":151,"./nb.js":151,"./ne":152,"./ne.js":152,"./nl":154,"./nl-be":153,"./nl-be.js":153,"./nl.js":154,"./nn":155,"./nn.js":155,"./pa-in":156,"./pa-in.js":156,"./pl":157,"./pl.js":157,"./pt":159,"./pt-br":158,"./pt-br.js":158,"./pt.js":159,"./ro":160,"./ro.js":160,"./ru":161,"./ru.js":161,"./sd":162,"./sd.js":162,"./se":163,"./se.js":163,"./si":164,"./si.js":164,"./sk":165,"./sk.js":165,"./sl":166,"./sl.js":166,"./sq":167,"./sq.js":167,"./sr":169,"./sr-cyrl":168,"./sr-cyrl.js":168,"./sr.js":169,"./ss":170,"./ss.js":170,"./sv":171,"./sv.js":171,"./sw":172,"./sw.js":172,"./ta":173,"./ta.js":173,"./te":174,"./te.js":174,"./tet":175,"./tet.js":175,"./th":176,"./th.js":176,"./tl-ph":177,"./tl-ph.js":177,"./tlh":178,"./tlh.js":178,"./tr":179,"./tr.js":179,"./tzl":180,"./tzl.js":180,"./tzm":182,"./tzm-latn":181,"./tzm-latn.js":181,"./tzm.js":182,"./uk":183,"./uk.js":183,"./ur":184,"./ur.js":184,"./uz":186,"./uz-latn":185,"./uz-latn.js":185,"./uz.js":186,"./vi":187,"./vi.js":187,"./x-pseudo":188,"./x-pseudo.js":188,"./yo":189,"./yo.js":189,"./zh-cn":190,"./zh-cn.js":190,"./zh-hk":191,"./zh-hk.js":191,"./zh-tw":192,"./zh-tw.js":192};r.keys=function(){return Object.keys(o)},r.resolve=n,e.exports=r,r.id=294},30:function(e,t){e.exports=require("stream")},303:function(e,t,s){s(277);var r=s(7)(s(208),s(315),null,null);e.exports=r.exports},304:function(e,t,s){s(283);var r=s(7)(s(209),s(323),null,null);e.exports=r.exports},305:function(e,t,s){var r=s(7)(null,null,null,null);e.exports=r.exports},306:function(e,t,s){s(280);var r=s(7)(s(210),s(318),null,null);e.exports=r.exports},307:function(e,t,s){var r=s(7)(s(211),s(319),null,null);e.exports=r.exports},308:function(e,t,s){var r=s(7)(s(212),s(320),null,null);e.exports=r.exports},309:function(e,t,s){s(279);var r=s(7)(s(213),s(317),null,null);e.exports=r.exports},31:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(58),o=r(n),a=s(33),l=r(a),i=s(34),c=r(i),u=s(60),d=r(u),p=s(59),f=r(p),v=s(57),m=r(v),_=function(e){function t(){return(0,l.default)(this,t),(0,d.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,f.default)(t,e),(0,c.default)(t,[{key:"findProjectByUser",value:function(e){var t=e.userId;return this.get("project/findProjectByUser?userId="+t)}},{key:"addProject",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.post("project/addProject",e)}},{key:"delProject",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.post("project/delProject",e)}},{key:"updateProjectInfo",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.post("project/updateProjectInfo",e)}},{key:"getProjectInfo",value:function(e){var t=e.projectId;return this.get("project/getProjectInfo?projectId="+t)}},{key:"findUserByProject",value:function(e){var t=e.projectId;return this.get("project/findUserByProject?projectId="+t)}}]),t}(m.default);t.default=_},310:function(e,t,s){s(284);var r=s(7)(null,s(324),null,null);e.exports=r.exports},311:function(e,t,s){s(285);var r=s(7)(s(214),s(325),null,null);e.exports=r.exports},312:function(e,t,s){s(281);var r=s(7)(s(215),s(321),null,null);e.exports=r.exports},313:function(e,t,s){s(278);var r=s(7)(s(216),s(316),null,null);e.exports=r.exports},314:function(e,t,s){s(282);var r=s(7)(s(217),s(322),null,null);e.exports=r.exports},315:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"nav"},[r("router-link",{staticClass:"logo",attrs:{to:"/"}},[r("img",{attrs:{src:s(28),alt:""}})]),e._v(" "),r("el-menu",{attrs:{"default-active":e.activeIndex,mode:"horizontal"}},[r("el-menu-item",{attrs:{index:"1"}},[r("router-link",{attrs:{to:"/project/list"}},[r("i",{staticClass:"el-icon-upload"}),e._v("项目管理")])],1),e._v(" "),r("el-menu-item",{attrs:{index:"2"}},[r("router-link",{attrs:{to:"/doc"}},[r("i",{staticClass:"el-icon-document"}),e._v("文档管理")])],1),e._v(" "),r("el-menu-item",{attrs:{index:"3"}},[e._v("人员管理")])],1)],1)},staticRenderFns:[]}},316:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"reg"},[e._m(0),e._v(" "),s("hr"),e._v(" "),s("el-form",{ref:"userInfor",attrs:{model:e.userInfor,rules:e.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"手机号码",prop:"phone"}},[s("el-input",{model:{value:e.userInfor.phone,callback:function(t){e.userInfor.phone=t},expression:"userInfor.phone"}})],1),e._v(" "),s("el-form-item",{staticClass:"code",attrs:{label:"短信验证码",prop:"code"}},[s("el-input",{model:{value:e.userInfor.code,callback:function(t){e.userInfor.code=t},expression:"userInfor.code"}}),e._v(" "),s("el-button",{attrs:{type:"primary"}},[e._v("获取验证码")])],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"psd"}},[s("el-input",{attrs:{type:"password"},model:{value:e.userInfor.psd,callback:function(t){e.userInfor.psd=t},expression:"userInfor.psd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"昵称",prop:"name"}},[s("el-input",{model:{value:e.userInfor.name,callback:function(t){e.userInfor.name=t},expression:"userInfor.name"}})],1),e._v(" "),s("el-form-item",{staticClass:"footer-btn"},[s("el-button",{attrs:{type:"primary"}},[e._v("注册")]),e._v(" "),s("el-button",{on:{click:function(t){e.resetForm("userInfor")}}},[e._v("重置")]),e._v(" "),s("span",{staticClass:"to-login",on:{click:e.toLogin}},[e._v("已有账号，立即登陆！")])],1)],1)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"reg-header"},[r("img",{attrs:{src:s(28),alt:""}}),e._v(" "),r("span",[e._v("这是阿大的毕业设计")])])}]}},317:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-tabs",{staticClass:"second-nav",model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[s("el-tab-pane",{attrs:{name:"first"}},[s("span",{slot:"label"},[s("i",{staticClass:"el-icon-date"}),e._v(" 项目概况")]),e._v(" "),s("div",{staticClass:"project-infor"},[s("el-row",{staticClass:"title-row"},[s("el-col",{staticClass:"project-name",attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("p",[s("i",{staticClass:"el-icon-menu"}),e._v(" "+e._s(e.project.name))])])]),e._v(" "),s("el-col",{attrs:{span:15}},[s("div",{staticClass:"grid-content bg-purple"},[s("p",[e._v(e._s(e.project.dec?e.project.dec:"暂无项目说明信息"))])])]),e._v(" "),s("el-col",{attrs:{span:3}},[s("div",{staticClass:"grid-content bg-purple"},[s("el-button",{attrs:{type:"text"},on:{click:function(t){e.handleEdit(e.project)}}},[s("i",{staticClass:"el-icon-edit"}),e._v(" 修改")])],1)])],1),e._v(" "),s("el-row",{staticClass:"second-row"},[s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v(e._s(e.project.type))]),e._v(" "),s("p",[e._v("项目类型")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v(e._s(e.project.version))]),e._v(" "),s("p",[e._v("版本号")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v(e._s(e.project.update_time))]),e._v(" "),s("p",[e._v("最后更新日期")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v(e._s(e.project.create_user.username)+" "),s("span",{staticClass:"tel"},[e._v(" "+e._s(e.project.create_user.phone))])]),e._v(" "),s("p",[e._v("创建者")])])])],1),e._v(" "),s("el-row",{staticClass:"third-row"},[s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple",on:{click:function(t){e.changeTap("second")}}},[s("h3",[e._v(e._s(e.project.apiCount)+" 个接口")]),e._v(" "),s("p",[e._v("接口总数")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple",on:{click:function(t){e.changeTap("third")}}},[s("h3",[e._v("22 个数据库")]),e._v(" "),s("p",[e._v("数据库数量")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple",on:{click:function(t){e.changeTap("fifth")}}},[s("h3",[e._v(e._s(e.project.userCount)+" 人")]),e._v(" "),s("p",[e._v("项目组成员")])])])],1)],1)]),e._v(" "),s("el-tab-pane",{attrs:{name:"second"}},[s("span",{slot:"label"},[s("i",{staticClass:"el-icon-document"}),e._v(" 接口文档")]),e._v(" "),s("projectApi",{attrs:{project:e.project}})],1),e._v(" "),s("el-tab-pane",{attrs:{name:"third"}},[s("span",{slot:"label"},[s("i",{staticClass:"el-icon-upload"}),e._v(" 数据字典")])]),e._v(" "),s("el-tab-pane",{attrs:{name:"fourth"}},[s("span",{slot:"label"},[s("i",{staticClass:"el-icon-minus"}),e._v(" 文档管理")])]),e._v(" "),s("el-tab-pane",{attrs:{name:"fifth"}},[s("span",{slot:"label"},[s("i",{staticClass:"el-icon-document"}),e._v(" 人员管理")]),e._v(" "),s("projectMember",{attrs:{project:e.project}})],1)],1),e._v(" "),s("el-dialog",{staticClass:"add-dialog",attrs:{title:"修改项目",visible:e.editProjectDialogVisible},on:{"update:visible":function(t){e.editProjectDialogVisible=t}}},[s("el-form",{ref:"projectModel",attrs:{model:e.projectModel,rules:e.rules,"label-position":"left","label-width":"80px"}},[s("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[s("el-input",{model:{value:e.projectModel.name,callback:function(t){e.projectModel.name=t},expression:"projectModel.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"版本号",prop:"version"}},[s("el-input",{model:{value:e.projectModel.version,callback:function(t){e.projectModel.version=t},expression:"projectModel.version"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"项目类型",prop:"type"}},[s("el-select",{attrs:{placeholder:"请选择项目类型"},model:{value:e.projectModel.type,callback:function(t){e.projectModel.type=t},expression:"projectModel.type"}},e._l(e.projectType,function(e){return s("el-option",{attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"项目说明",prop:"dec"}},[s("el-input",{attrs:{type:"textarea"},model:{value:e.projectModel.dec,callback:function(t){e.projectModel.dec=t},expression:"projectModel.dec"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",slot:"footer"},[s("el-button",{on:{click:function(t){e.editProjectDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("保 存")])],1)],1)],1)},staticRenderFns:[]}},318:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},319:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"page"},[e._v("\n  文档管理\n")])},staticRenderFns:[]}},32:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.API_HOST="http://localhost:8888/",t.PROJECT_TYPE=[{name:"Web",value:"web"},{name:"App",value:"app"},{name:"Pc",value:"pc"},{name:"硬件/物联网",value:"iob"},{name:"其他",value:"other"}]},320:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page"},[s("navMenu"),e._v(" "),s("router-view")],1)},staticRenderFns:[]}},321:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"member-infor"},[s("div",{staticClass:"content"},[s("div",{staticClass:"search"},[s("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}},[s("el-select",{attrs:{placeholder:"请选择"},slot:"prepend",model:{value:e.searchSelect,callback:function(t){e.searchSelect=t},expression:"searchSelect"}},[s("el-option",{attrs:{label:"用户名",value:"username"}}),e._v(" "),s("el-option",{attrs:{label:"联系方式",value:"phone"}}),e._v(" "),s("el-option",{attrs:{label:"邮箱",value:"email"}})],1),e._v(" "),s("el-button",{attrs:{icon:"search"},on:{click:e.searchUser},slot:"append"},[e._v("搜索用户")])],1)],1),e._v(" "),s("div",{staticClass:"member-list"},[s("p",{staticClass:"kind"},[e._v("创建者")]),e._v(" "),s("ul",{staticClass:"member"},[s("li",{staticClass:"pull-left name-summary-li"},[e._v(e._s(e.project.create_user.username))]),e._v(" "),s("li",{staticClass:"pull-left people-li"},[s("p",{staticClass:"name"},[e._v(e._s(e.project.create_user.username))]),e._v(" "),s("p",{staticClass:"phone"},[e._v(e._s(e.project.create_user.phone))])]),e._v(" "),e._m(0)]),e._v(" "),e.memberList.length>1?s("p",{staticClass:"kind"},[e._v("协作成员")]):e._e(),e._v(" "),s("el-row",{attrs:{gutter:20}},e._l(e.memberList,function(t){return t.id!==e.project.create_userId?s("el-col",{attrs:{span:12,xs:12,sm:8,md:6,lg:6}},[s("ul",{staticClass:"member"},[s("li",{staticClass:"pull-left name-summary-li"},[e._v(e._s(t.username))]),e._v(" "),s("li",{staticClass:"pull-left people-li"},[s("p",{staticClass:"name"},[e._v(e._s(t.username))]),e._v(" "),s("p",{staticClass:"phone"},[e._v(e._s(t.phone))])]),e._v(" "),s("li",{staticClass:"pull-right menu"},[s("i",{staticClass:"el-icon-more"})])])]):e._e()}))],1)])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"pull-right menu"},[s("i",{staticClass:"el-icon-more"})])}]}},322:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login"},[e._m(0),e._v(" "),s("hr"),e._v(" "),s("el-form",{attrs:{inline:!0,model:e.userInfor}},[s("el-form-item",[s("el-input",{attrs:{placeholder:"联系方式"},model:{value:e.userInfor.phone,callback:function(t){e.userInfor.phone=t},expression:"userInfor.phone"}})],1),e._v(" "),s("el-form-item",{attrs:{prop:"pass"}},[s("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.userInfor.psd,callback:function(t){e.userInfor.psd=t},expression:"userInfor.psd"}})],1),e._v(" "),s("el-form-item",[s("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:e.loading,expression:"loading",modifiers:{fullscreen:!0}}],attrs:{type:"primary"},on:{click:e.login}},[e._v("登陆")])],1)],1),e._v(" "),s("div",{staticClass:"login-footer"},[s("span",{staticClass:"toReg",on:{click:e.toReg}},[e._v("还没有账号，免费注册..")]),e._v(" "),s("span",[s("el-checkbox",{model:{value:e.rememberPsd,callback:function(t){e.rememberPsd=t},expression:"rememberPsd"}},[e._v("记住密码")])],1),e._v(" "),s("span",[e._v("忘记密码")])])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-header"},[r("img",{attrs:{src:s(28),alt:""}}),e._v(" "),r("span",[e._v("这是阿大的毕业设计")])])}]}},323:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"nav"},[r("router-link",{staticClass:"logo",attrs:{to:"/"}},[r("img",{attrs:{src:s(28),alt:""}})]),e._v(" "),r("el-menu",{attrs:{"default-active":e.activeIndex,mode:"horizontal"}},[r("el-menu-item",{attrs:{index:"1"}},[r("router-link",{attrs:{to:"/project/list"}},[r("i",{staticClass:"el-icon-upload"}),e._v("项目管理")])],1),e._v(" "),r("el-menu-item",{attrs:{index:"2"}},[r("router-link",{attrs:{to:"/doc"}},[r("i",{staticClass:"el-icon-document"}),e._v("文档管理")])],1),e._v(" "),r("el-menu-item",{attrs:{index:"3"}},[e._v("人员管理")])],1)],1)},staticRenderFns:[]}},324:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"project-infor"},[s("el-row",{staticClass:"title-row"},[s("el-col",{staticClass:"project-name",attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("p",[s("i",{staticClass:"el-icon-menu"}),e._v(" 项目名称")])])]),e._v(" "),s("el-col",{attrs:{span:15}},[s("div",{staticClass:"grid-content bg-purple"},[s("p",[e._v("项目介绍")])])]),e._v(" "),s("el-col",{attrs:{span:3}},[s("div",{staticClass:"grid-content bg-purple"},[s("el-button",{attrs:{type:"text"}},[s("i",{staticClass:"el-icon-edit"}),e._v(" 修改")])],1)])],1),e._v(" "),s("el-row",{staticClass:"second-row"},[s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("Web")]),e._v(" "),s("p",[e._v("项目类型")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("V 1.2.1")]),e._v(" "),s("p",[e._v("版本号")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("2017-05-13 11:55:25")]),e._v(" "),s("p",[e._v("最后更新日期")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("阿大")]),e._v(" "),s("p",[e._v("创建者")])])])],1),e._v(" "),s("el-row",{staticClass:"third-row"},[s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("22 个接口")]),e._v(" "),s("p",[e._v("接口总数")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("0 个数据库")]),e._v(" "),s("p",[e._v("数据库数量")])])]),e._v(" "),s("el-col",{attrs:{span:6}},[s("div",{staticClass:"grid-content bg-purple"},[s("h3",[e._v("12 人")]),e._v(" "),s("p",[e._v("项目组成员")])])])],1)],1)},staticRenderFns:[]}},325:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-tabs",{staticClass:"second-nav",model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:"项目列表",name:"first"}},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addProjectDialogVisible=!0,e.dialogTitle="新增项目"}}},[s("i",{staticClass:"el-icon-plus"}),e._v(" 新增项目")]),e._v(" "),s("el-button",{attrs:{type:"primary"}},[s("i",{staticClass:"el-icon-upload2"}),e._v(" 导入项目")]),e._v(" "),s("div",{staticClass:"table-content"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{border:"",data:e.projectList,"highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[s("el-table-column",{attrs:{prop:"name",label:"项目名称"}}),e._v(" "),s("el-table-column",{attrs:{prop:"version",label:"版本号"},scopedSlots:e._u([["default",function(t){return[s("el-tag",{attrs:{type:"primary"}},[e._v(e._s(t.row.version))])]}]])}),e._v(" "),s("el-table-column",{attrs:{prop:"type",label:"类型"},scopedSlots:e._u([["default",function(t){return[s("el-tag",{attrs:{type:"success"}},[e._v(e._s(t.row.type))])]}]])}),e._v(" "),s("el-table-column",{attrs:{prop:"update_time",label:"项目最后修改时间"}}),e._v(" "),s("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:e._u([["default",function(t){return[s("el-button",{attrs:{size:"small"},on:{click:function(s){e.handleEdit(t.$index,t.row)}}},[e._v("编 辑")]),e._v(" "),s("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(s){e.handleDelete(t.$index,t.row)}}},[e._v("删 除")])]}]])})],1)],1)],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"提示",visible:e.deleteProjectDialogVisible,size:"tiny"},on:{"update:visible":function(t){e.deleteProjectDialogVisible=t}}},[s("p",[e._v("确认删除项目"),s("span",{staticStyle:{color:"#ff4949"}},[e._v("【"+e._s(e.nameToDel)+"】")]),e._v("？")]),e._v(" "),s("p",[e._v("删除后相关联的所有都会被删除，将不再恢复！")]),e._v(" "),s("span",{staticClass:"dialog-footer",slot:"footer"},[s("el-button",{on:{click:function(t){e.deleteProjectDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"danger"},on:{click:e.delProject}},[e._v("删 除")])],1)]),e._v(" "),s("el-dialog",{staticClass:"add-dialog",attrs:{title:e.dialogTitle,visible:e.addProjectDialogVisible},on:{"update:visible":function(t){e.addProjectDialogVisible=t}}},[s("el-form",{ref:"project",attrs:{model:e.project,rules:e.rules,"label-position":"left","label-width":"80px"}},[s("el-form-item",{attrs:{label:"项目名称",prop:"name"}},[s("el-input",{model:{value:e.project.name,callback:function(t){e.project.name=t},expression:"project.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"版本号",prop:"version"}},[s("el-input",{model:{value:e.project.version,callback:function(t){e.project.version=t},expression:"project.version"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"项目类型",prop:"type"}},[s("el-select",{attrs:{placeholder:"请选择项目类型"},model:{value:e.project.type,callback:function(t){e.project.type=t},expression:"project.type"}},e._l(e.projectType,function(e){return s("el-option",{attrs:{label:e.name,value:e.name}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"项目说明",prop:"dsc"}},[s("el-input",{attrs:{type:"textarea"},model:{value:e.project.dsc,callback:function(t){e.project.dsc=t},expression:"project.dsc"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",slot:"footer"},[s("el-button",{on:{click:function(t){e.addProjectDialogVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.addProject}},[e._v("保 存")])],1)],1)],1)},staticRenderFns:[]}},372:function(e,t){e.exports=require("buffer")},373:function(e,t){e.exports=require("events")},374:function(e,t){e.exports=require("http")},375:function(e,t){e.exports=require("https")},376:function(e,t){e.exports=require("querystring")},377:function(e,t){e.exports=require("zlib")},378:function(e,t,s){"use strict";s(203);var r=s(202);s(204),r.app.$mount("#app")},379:function(e,t,s){e.exports=s.p+"static/media/element-icons.b02bdc1b.ttf"},380:function(e,t,s){e.exports=s.p+"static/media/element-icons.d2f69a92.woff"},56:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(58),o=r(n),a=s(33),l=r(a),i=s(34),c=r(i),u=s(60),d=r(u),p=s(59),f=r(p),v=s(57),m=r(v),_=function(e){function t(){return(0,l.default)(this,t),(0,d.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,f.default)(t,e),(0,c.default)(t,[{key:"login",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.post("user/login",e)}}]),t}(m.default);t.default=_},57:function(e,t,s){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(222),o=r(n),a=s(33),l=r(a),i=s(34),c=r(i),u=s(32),d=s(5),p=r(d),f=function(){function e(){(0,l.default)(this,e),this.baseUrl=u.API_HOST}return(0,c.default)(e,[{key:"get",value:function(e){var t=this;arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new o.default(function(s,r){p.default.http.get(t.baseUrl+e).then(function(e){t._msgHandler(e.body),s(e.body)}).catch(function(e){t._errHandler(e),r(e)})})}},{key:"post",value:function(e){var t=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new o.default(function(r,n){p.default.http.post(t.baseUrl+e,s).then(function(e){t._msgHandler(e.body),r(e.body)}).catch(t._errHandler)})}},{key:"_msgHandler",value:function(e){var t=e.status,s=e.message;401!==t&&500!==t&&403!==t||(p.default.prototype.$notify({message:s,type:"warning"}),401===t&&window.router.push({path:"/login"}))}},{key:"_errHandler",value:function(e){0===e.status&&p.default.prototype.$notify({message:"系统发生错误咯,请联系管理员!",type:"error"})}}]),e}();t.default=f}},[378]);