(()=>{"use strict";class e{constructor(){this.gameStarted=!1,this.gameOver=!1,this.rowCount=0,this.planetSpacing=100,this.debrisUpper=0,this.debrisLower=0,this.gravity=0,this.boostingUp=!1,this.score=0,this.planet=null,this.star=null}createNewColumn(e){this.gameStarted&&(this.boostingUp&&this.gravity>=-4&&(this.gravity-=.5),!this.boostingUp&&this.gravity<=4&&(this.gravity+=.5),e%this.planetSpacing==0&&this.addPlanet(e),this.score++);let t=e%11;0==t&&this.addStar();let s=[];for(let i=0;i<this.rowCount;i++)switch(!0){case null!=this.planet&&Math.pow(i-this.planet.row,2)+Math.pow(e-this.planet.column,2)<Math.pow(this.planet.radius,2):s.push("planet");break;case i<this.debrisUpper||i>this.debrisLower:s.push(this.getDebris());break;case t<7&&this.star.includes(i):let a=i-this.star[0]+1;s.push("star-"+(t+1)+"-"+a+"-"+(t+1));break;default:s.push("space")}return s}addStar(){let e=[],t=Math.floor(Math.random()*(this.rowCount-8)*.9+this.debrisUpper);for(let s=t;s<t+7;s++)e.push(s);this.star=e}addPlanet(e){let s=Math.floor(20*Math.random()+20);s=s>(.8*this.rowCount-30)/2?Math.floor((.85*this.rowCount-30)/2):s;let i=Math.round(Math.random()*(this.rowCount-2*s)+s),a=e+this.planetSpacing/2;this.planet=new t(a,i,s)}getDebris(){let e=1.05*Math.random();return e<1?"space":"debris-"+Math.ceil(100*(e-1))}setRowCount(e){this.rowCount=e,this.debrisUpper=Math.ceil(.05*e),this.debrisLower=Math.floor(.95*e)}startGame(){this.gameStarted=!0}gameIsOver(){this.gameOver=!0}}class t{constructor(e,t,s){this.column=e,this.row=t,this.radius=s,this.setRandomColor()}setRandomColor(){switch(this.color=Math.floor(8*Math.random()),this.color){case 0:this.shades=["#EF7347","#CF3318","#AC3128","#9E3615"];break;case 1:this.shades=["#C4D6A4","#A8BD7F","#859865","#788B55"];break;case 2:this.shades=["#C58465","#DD6D30","#DA5B24","#832D0B"];break;case 3:this.shades=["#DEB154","#CCA347","#896739","#6E4C30"];break;case 4:this.shades=["#85D1F2","#51B1F3","#4D8EBB","#357699"];break;case 5:this.shades=["#F29C96","#C4665D","#AE493F","#9A3D36"];break;case 6:this.shades=["#7FCAC9","#68BBC5","#4CA2A6","#5A9098"];break;default:this.shades=["#AC9480","#8B7669","#6A4F51","#533D2D"]}}getColor(){return this.shades[Math.floor(4*Math.random())]}}class s{constructor(){this.gameView=function(){let e=document.createElement("div");e.id="game";let t=Math.floor(window.innerHeight-window.innerHeight%5)+"px",s=document.createElement("div");s.id="score";let i=document.createElement("div");i.style.backgroundColor="#000",i.style.height=window.innerHeight%5+"px";let a=document.createElement("div");a.style.backgroundColor="#000",a.style.width=Math.ceil(window.innerWidth%5/2)+"px",a.style.height=t,a.style.display="inline-block";let o=document.createElement("div");o.id="past-frame",o.style.height=t,o.style.display="inline-block";let r=document.createElement("div");r.id="future-frame",r.style.height=t,r.style.display="inline-block";let n=document.createElement("div");return n.style.backgroundColor="#000",n.style.width=Math.floor(window.innerWidth%5/2)+"px",n.style.height=t,n.style.display="inline-block",e.appendChild(s),e.appendChild(i),e.appendChild(a),e.appendChild(o),e.appendChild(r),e.appendChild(n),e}(),this.gameLogic=new e}runGame(e,t){this.gameLogic.setRowCount(t),this.initializeScreen(e),document.addEventListener("keypress",(e=>{"Space"===e.code&&this.gameLogic.startGame(),document.addEventListener("keydown",(e=>{e.code,this.gameLogic.boostingUp=!0})),document.addEventListener("keyup",(e=>{e.code,this.gameLogic.boostingUp=!1}))}),{once:!0}),this.animateColumns(e)}initializeScreen(e){let t=e<100?35:.65*e;for(let s=0;s<e;s++){let e=this.getNewColumn(s);this.animateStars(),document.querySelector("#future-frame").appendChild(e),s>t&&this.fromFutureToPast()}this.insertCat()}animateColumns(e){setTimeout((()=>{let t=document.querySelector("#past-frame").firstChild,s=this.getNewColumn(e);t.remove(),document.querySelector("#future-frame").appendChild(s),e++,this.fromFutureToPast(),this.animateStars(),this.animateCat(),this.moveCat(),this.gameLogic.gameStarted?(document.querySelector("#score").style.fontSize="8em",document.querySelector("#score").textContent=this.gameLogic.score):document.querySelector("#score").textContent="Use [SPACE] to start and boost!",this.gameLogic.gameOver||this.animateColumns(e)}),40)}animateStars(){document.querySelectorAll("div[class^=star]").forEach((e=>{let t=e.className,s=parseInt(t.substr(9)),i=s+1<9?s+1:1;e.className=t.substr(0,9)+i}))}animateCat(){document.querySelectorAll("div[class^=cat]").forEach((e=>{let t=e.className,s=parseInt(t.substr(10)),i=s+1<7?s+1:1;e.className=t.substr(0,10)+i}))}moveCat(){let e=document.querySelector("#past-frame").childNodes,t=Math.round(this.gameLogic.gravity);for(let s=e.length-2;s>e.length-36;s--){let i=e[s].childNodes;for(let a=0;a<i.length;a++){let o=i[a].className;if("cat"===o.substr(0,3)){if("01"===o.substr(4,2)){let e=parseInt(o.substr(7,2))+Math.floor(parseInt(o.substr(10))/5)-1;i[a].className="rainbow-"+e}else i[a].className="space";let r=e[s+1].childNodes[a+t].className;"planet"!==r&&"debris"!==r.substr(0,6)||this.gameLogic.gameIsOver(),e[s+1].childNodes[a+t].className=o}}}}fromFutureToPast(){let e=document.querySelector("#future-frame").firstChild;e.remove(),document.querySelector("#past-frame").appendChild(e)}getNewColumn(e){let t=document.createElement("div");t.style.display="inline-block",t.style.height=5*this.gameLogic.rowCount+"px",t.style.width="5px";let s=this.gameLogic.createNewColumn(e);for(let e in s){let i=document.createElement("div");i.classList.add(s[e]),i.style.height="5px",i.style.width="5px","planet"==s[e]&&(i.style.backgroundColor=this.gameLogic.planet.getColor()),t.appendChild(i)}return t}insertCat(){let e=Math.floor(this.gameLogic.rowCount/2)-10,t=document.querySelector("#past-frame").childNodes,s=t.length-34;for(let i=s;i<t.length;i++){let a=(i-s+1).toString();a.length<2&&(a="0"+a);let o=t[i].childNodes;for(let t=e;t<e+21;t++){let s=(t-e+1).toString();s.length<2&&(s="0"+s),o[t].className="cat-"+a+"-"+s+"-1"}}}getGameView(){return this.gameView}}class i{constructor(){this.statisticsView=function(){let e=document.createElement("div");e.id="statistics";let t=document.createElement("div");t.classList.add("score-label"),t.textContent="SCORE";let s=document.createElement("div");s.id="last-score";let i=document.createElement("div");i.classList.add("score-label"),i.textContent="BEST";let a=document.createElement("div");a.id="best-score",e.append(t),e.append(s),e.append(i),e.append(a);let o=document.querySelector("#score");o.style.fontSize="2em",o.textContent="Use [SPACE] to start a new game!";let r=document.querySelector("#game");return r.prepend(e),r}()}runStatistics(e){let t=this.getBestScore();e>t&&(this.saveBestScore(e),t=e),document.querySelector("#last-score").textContent=e,document.querySelector("#best-score").textContent=t}getBestScore(){let e=parseInt(document.cookie.substr(11));return isNaN(e)?0:e}saveBestScore(e){document.cookie="best-score="+e}}class a{constructor(e){this.mainView=e}run(){this.gameController=new s,this.mainView.textContent="",this.mainView.appendChild(this.gameController.gameView),this.gameController.runGame(this.getColumnCount(),this.getRowCount()),this.showStatistics()}showStatistics(){setTimeout((()=>{this.gameController.gameLogic.gameOver?(this.statisticsController=new i,this.mainView.appendChild(this.statisticsController.statisticsView),this.statisticsController.runStatistics(this.gameController.gameLogic.score),setTimeout((()=>{document.addEventListener("keypress",(e=>{"Space"===e.code&&this.run()}),{once:!0})}),500)):this.showStatistics()}),40)}getColumnCount(){return Math.floor(window.innerWidth/5)}getRowCount(){return Math.floor(window.innerHeight/5)}}window.addEventListener("DOMContentLoaded",(async()=>{let e=function(){let e=document.createElement("div");return e.id="main",e}();document.body.append(e),new a(e).run(),window.addEventListener("resize",(()=>{alert("The game will auto-reload, because you resized the window."),location.reload()}),{once:!0})}))})();