const DEFAULT_LIST=["AIRFRESHENER","AIRPODS","BACKPACK","BASKET","BATHTUB","BATTERY","BED","BENCH","BLANKET","BLENDER","BOOK","BOOKEND","BOTTLE","BOWL","BRACELET","BROOM","BRUSH","BUCKET","CABINET","CALENDAR","CAMERA","CANDLE","CARDS","CARPET","CHAIR","CHARGER","CLOCK","COASTER","COMB","COMPUTER","COUCH","DESK","DOORKNOB","DRAWER","DRESSER","DUSTPAN","ENVELOPE","FRIDGE","GLASS","GLASSES","GLUE","GRATER","GUITAR","HAIRBRUSH","HAIRDRYER","HAIRTIE","HAMMER","HANGER","HEADPHONES","HEATER","HIGHLIGHTER","IRON","KETTLE","KEYBOARD","KEYS","KNIFE","LADLE","LAMP","LIGHTBULB","LIGHTER","LIPBALM","LOTION","MAGAZINE","MARKER","MATCHES","MATTRESS","MIRROR","MOP","MOUSE","MUG","NAILCLIPPERS","NAPKIN","NECKLACE","NOTEBOOK","PAN","PANTRY","PEELER","PEN","PENCIL","PERFUME","PHONE","PICTURE","PILLOW","PLANT","PLATE","PLUNGER","PRINTER","RAZOR","REMOTE","RING","ROPE","SCALE","SCISSORS","SCREWDRIVER","SHAMPOO","SHARPIE","SINK","SOAP","SPEAKER","SPATULA","SPONGE","SPOON","TABLE","TELEVISION","TISSUES","TOASTER","TOILET","TOILETPAPER","TOOLBOX","TOOTHBRUSH","TOOTHPASTE","TOWEL","TRASHCAN","TUPPERWARE","TWEEZERS","UMBRELLA","VACUUM","WALLET","WASHCLOTH","WHISK","WRENCH"]
const CAR_BRANDS=["TOYOTA","HONDA","FORD","CHEVROLET","NISSAN","BMW","MERCEDES","AUDI","VOLKSWAGEN","HYUNDAI","KIA","SUBARU","MAZDA","TESLA","LEXUS","ACURA","INFINITI","VOLVO","JAGUAR","LANDROVER","PORSCHE","FERRARI","LAMBORGHINI","MASERATI","ALFAROMEO","FIAT","PEUGEOT","RENAULT","CITROEN","SKODA","SEAT","MINI","BENTLEY","ROLLSROYCE","ASTONMARTIN","BUGATTI","MCLAREN","GENESIS","RAM","DODGE","JEEP","CADILLAC","LINCOLN","BUICK","CHRYSLER","MITSUBISHI","SUZUKI","DAIHATSU","GEELY","TATA"]

let lists=JSON.parse(localStorage.getItem("hangmanLists")||"{}")
if(!lists.default)lists.default=DEFAULT_LIST
if(!lists.cars)lists.cars=CAR_BRANDS

let currentListName=localStorage.getItem("hangmanActiveList")||"default"

function getWords(){return lists[currentListName]}

const hasL=(w,ch)=>w.includes(ch)

function bestSplit(c){
  const counts={}
  for(const w of c){for(const ch of new Set(w)){counts[ch]=(counts[ch]||0)+1}}
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1])
  for(const [ch,cnt] of sorted){
    if(cnt===0||cnt===c.length)continue
    const yes=c.filter(w=>hasL(w,ch))
    const no=c.filter(w=>!hasL(w,ch))
    if(yes.length&&no.length)return{ch,yes,no}
  }
  return null
}

function buildTree(c){
  if(c.length<=1)return{leaf:true,word:c[0]||null}
  const s=bestSplit(c)
  if(!s)return{leaf:true,word:c[0]}
  return{leaf:false,ch:s.ch,yesNode:buildTree(s.yes),noNode:buildTree(s.no)}
}

function buildRootFromList(words){
  const split=bestSplit(words)
  if(!split)return{leaf:true,word:words[0]}
  return{leaf:false,ch:split.ch,yesNode:buildTree(split.yes),noNode:buildTree(split.no)}
}

function buildRoot(){return buildRootFromList(getWords())}
function getFirstLetter(words){const split=bestSplit(words);return split?split.ch:"?"}

let root=buildRoot()
let curNode=root

const canvas=document.getElementById("drawCanvas")
const ctx=canvas.getContext("2d")
const btnHangman=document.getElementById("btnHangman")
const btnClear=document.getElementById("btnClear")
const btnUndo=document.getElementById("btnUndo")
const btnSolve=document.getElementById("btnSolve")

let DPR=window.devicePixelRatio||1
let strokes=[]
let currentStroke=null
let treeHistory=[]
let perfMode=false
let scaffold=false
let advanceTimer=null
let strokeGroupStartY=null
const ADVANCE_DELAY=450

function resizeCanvas(){const r=canvas.getBoundingClientRect();canvas.width=r.width*DPR;canvas.height=r.height*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);redraw()}

function drawScaffold(){
  if(!scaffold)return
  const W=canvas.clientWidth
  const H=canvas.clientHeight
  ctx.lineWidth=3
  ctx.beginPath()
  ctx.moveTo(W*.15,H*.55)
  ctx.lineTo(W*.45,H*.55)
  ctx.moveTo(W*.22,H*.55)
  ctx.lineTo(W*.22,H*.12)
  ctx.moveTo(W*.22,H*.12)
  ctx.lineTo(W*.40,H*.12)
  ctx.moveTo(W*.40,H*.12)
  ctx.lineTo(W*.40,H*.18)
  ctx.stroke()
}

function redraw(){
  const w=canvas.clientWidth
  const h=canvas.clientHeight
  ctx.clearRect(0,0,w,h)
  ctx.fillStyle="#f8f4ec"
  ctx.fillRect(0,0,w,h)
  ctx.lineCap="round"
  ctx.lineJoin="round"
  drawScaffold()
  for(const s of strokes){
    ctx.lineWidth=s.lineWidth
    ctx.beginPath()
    ctx.moveTo(s.points[0][0],s.points[0][1])
    for(let i=1;i<s.points.length;i++)ctx.lineTo(s.points[i][0],s.points[i][1])
    ctx.stroke()
  }
}

function isYesZone(y){return y>canvas.clientHeight*.65}

const peek=document.getElementById("peek")
const perfDot=document.getElementById("perfDot")

function showPeek(t){
  if(t&&t.length===1){
    btnSolve.textContent="Solv"+t
  }else{
    peek.textContent=t
    peek.classList.add("show")
  }
}

function hidePeek(){
  peek.classList.remove("show")
  btnSolve.textContent="Solve"
}

function advanceTree(isYes){if(!curNode||curNode.leaf)return;treeHistory.push(curNode);curNode=isYes?curNode.yesNode:curNode.noNode}

function newSession(){strokes=[];treeHistory=[];root=buildRoot();curNode=root;perfMode=true;scaffold=true;perfDot.classList.add("show");redraw()}

function clearAll(){strokes=[];treeHistory=[];perfMode=false;scaffold=false;perfDot.classList.remove("show");redraw()}

function getPos(e){const r=canvas.getBoundingClientRect();const src=e.touches?e.touches[0]:e;return[src.clientX-r.left,src.clientY-r.top]}

let isDrawing=false

function scheduleAdvance(){
  clearTimeout(advanceTimer)
  advanceTimer=setTimeout(()=>{
    if(perfMode&&strokeGroupStartY!==null&&!curNode.leaf){advanceTree(isYesZone(strokeGroupStartY))}
    strokeGroupStartY=null
  },ADVANCE_DELAY)
}

function onStart(e){
  e.preventDefault()
  clearTimeout(advanceTimer)
  const[x,y]=getPos(e)
  if(strokeGroupStartY===null)strokeGroupStartY=y
  isDrawing=true
  if(perfMode){
    if(curNode.leaf)showPeek(curNode.word)
    else{
      const nextNode=isYesZone(strokeGroupStartY)?curNode.yesNode:curNode.noNode
      if(nextNode){
        if(nextNode.leaf)showPeek(nextNode.word)
        else showPeek(nextNode.ch)
      }
    }
  }
  currentStroke={points:[[x,y]],lineWidth:4}
  ctx.lineWidth=4
  ctx.beginPath()
  ctx.moveTo(x,y)
}

function onMove(e){
  if(!isDrawing)return
  const[x,y]=getPos(e)
  currentStroke.points.push([x,y])
  ctx.lineTo(x,y)
  ctx.stroke()
}

function onEnd(){
  hidePeek()
  if(!isDrawing)return
  isDrawing=false
  strokes.push(currentStroke)
  scheduleAdvance()
}

canvas.addEventListener("touchstart",onStart,{passive:false})
canvas.addEventListener("touchmove",onMove,{passive:false})
canvas.addEventListener("touchend",onEnd,{passive:false})
canvas.addEventListener("mousedown",onStart)
canvas.addEventListener("mousemove",e=>{if(isDrawing)onMove(e)})
canvas.addEventListener("mouseup",onEnd)
window.addEventListener("resize",resizeCanvas)
resizeCanvas()

btnHangman.onclick=newSession
btnClear.onclick=clearAll
btnUndo.onclick=()=>{strokes.pop();if(treeHistory.length)curNode=treeHistory.pop();redraw()}

btnSolve.onclick=()=>{
  perfMode=false
  hidePeek()
  perfDot.classList.remove("show")
  const cutoff=canvas.clientHeight*0.55
  strokes=strokes.filter(s=>{
    return s.points.some(p=>p[1]<=cutoff)
  })
  redraw()
}

let lastTap=0
canvas.addEventListener("pointerdown",e=>{
  if(e.clientX>window.innerWidth*.75&&e.clientY<window.innerHeight*.25){
    const now=Date.now()
    if(now-lastTap<300)openSettings()
    lastTap=now
  }
})

function openSettings(){document.getElementById("settingsPanel").style.display="flex";refreshSettings()}
function closeSettings(){document.getElementById("settingsPanel").style.display="none"}
document.getElementById("closeSettings").onclick=closeSettings

function refreshSettings(){
  // Sync explore mode toggle
  document.getElementById("exploreModeToggle").checked=isExploreModeEnabled()
  const sel=document.getElementById("listSelect")
  sel.innerHTML=""
  for(const k in lists){const o=document.createElement("option");o.value=k;o.textContent=k;sel.appendChild(o)}
  sel.value=currentListName
  renderWords()
  renderDepthStats()
  renderFirstLetter()
}

function renderWords(){
  const container=document.getElementById("wordView")
  container.innerHTML=""
  const words=lists[currentListName].slice().sort()
  words.forEach(w=>{
    const row=document.createElement("div")
    row.style.cssText="display:flex;justify-content:space-between;align-items:center;padding:2px 0;border-bottom:1px solid #eee"
    const label=document.createElement("span")
    label.textContent=w
    const btn=document.createElement("button")
    btn.textContent="×"
    btn.style.cssText="background:none;border:none;color:#c00;font-size:16px;font-weight:700;cursor:pointer;padding:0 4px;line-height:1;flex-shrink:0"
    btn.onclick=()=>{
      lists[currentListName]=lists[currentListName].filter(x=>x!==w)
      localStorage.setItem("hangmanLists",JSON.stringify(lists))
      root=buildRoot()
      curNode=root
      refreshSettings()
    }
    row.appendChild(label)
    row.appendChild(btn)
    container.appendChild(row)
  })
}

function renderFirstLetter(){const letter=getFirstLetter(lists[currentListName]);document.getElementById("firstLetter").textContent="First Letter: "+letter}

function depthCount(node,depth,counts){if(!node)return;if(node.leaf){counts[depth]=(counts[depth]||0)+1;return}depthCount(node.yesNode,depth+1,counts);depthCount(node.noNode,depth+1,counts)}

function renderDepthStats(){
  const counts={}
  const r=buildRoot()
  depthCount(r,0,counts)
  let html=""
  const depths=Object.keys(counts).sort((a,b)=>a-b)
  for(const d of depths){html+="Depth "+d+": "+counts[d]+" words<br>"}
  document.getElementById("depthStats").innerHTML=html
}

useList.onclick=()=>{
  currentListName=listSelect.value
  localStorage.setItem("hangmanActiveList",currentListName)
  root=buildRoot()
  curNode=root
  refreshSettings()
}

addWordInput.addEventListener("keydown",e=>{
  if(e.key!="Enter")return
  const w=e.target.value.trim().toUpperCase()
  if(!w)return
  if(!lists[currentListName].includes(w))lists[currentListName].push(w)
  localStorage.setItem("hangmanLists",JSON.stringify(lists))
  root=buildRoot()
  curNode=root
  strokes=[]
  treeHistory=[]
  redraw()
  e.target.value=""
  refreshSettings()
})

createListBtn.onclick=()=>{
  const name=document.getElementById("newListName").value.trim()
  const raw=document.getElementById("newListWords").value
  if(!name||!raw)return
  const words=raw.split("\n").map(w=>w.trim().toUpperCase()).filter(w=>w.length>0)
  if(words.length===0)return
  lists[name]=Array.from(new Set(words))
  localStorage.setItem("hangmanLists",JSON.stringify(lists))
  document.getElementById("newListName").value=""
  document.getElementById("newListWords").value=""
  refreshSettings()
}

// ── Explore List Mode ──────────────────────────────────────────────

let exploreHistory=[]
let exploreNode=null
let exploreWords=[]

const EXPLORE_ON="1"
function isExploreModeEnabled(){return localStorage.getItem("exploreMode")===EXPLORE_ON}

function pluralWords(n){return n+" word"+(n!==1?"s":"")}
function syncExploreButton(){
  document.getElementById("btnExplore").style.display=isExploreModeEnabled()?"":"none"
}

const exploreModeToggle=document.getElementById("exploreModeToggle")
exploreModeToggle.checked=isExploreModeEnabled()
exploreModeToggle.addEventListener("change",()=>{
  localStorage.setItem("exploreMode",exploreModeToggle.checked?EXPLORE_ON:"0")
  syncExploreButton()
})
syncExploreButton()

function openExplore(){
  exploreHistory=[]
  exploreNode=root
  exploreWords=getWords().slice()
  renderExplore()
  document.getElementById("explorePanel").style.display="flex"
}

function closeExplore(){
  document.getElementById("explorePanel").style.display="none"
}

function renderExplore(){
  const node=exploreNode
  const words=exploreWords

  // Breadcrumb path
  const pathEl=document.getElementById("explorePath")
  if(exploreHistory.length===0){
    pathEl.textContent=""
  } else {
    pathEl.innerHTML=exploreHistory.map(h=>`<span class="path-item ${h.yes?'yes':'no'}">${h.ch}${h.yes?'✓':'✗'}</span>`).join('<span class="path-sep">→</span>')
  }

  const questionEl=document.getElementById("exploreQuestion")
  const branchesEl=document.getElementById("exploreBranches")
  const leafCard=document.getElementById("exploreLeafCard")

  if(node.leaf){
    questionEl.style.display="none"
    branchesEl.style.display="none"
    leafCard.style.display="block"
    document.getElementById("exploreLeafWord").textContent=node.word||"(none)"
  } else {
    leafCard.style.display="none"
    questionEl.style.display="block"
    questionEl.textContent='Contains "'+node.ch+'"?'
    branchesEl.style.display="flex"

    const yesWords=words.filter(w=>w.includes(node.ch))
    const noWords=words.filter(w=>!w.includes(node.ch))

    // YES card
    document.getElementById("exploreYesCount").textContent=pluralWords(yesWords.length)
    if(node.yesNode.leaf){
      document.getElementById("exploreYesNext").textContent=""
      document.getElementById("exploreYesLeaf").textContent=node.yesNode.word||"(none)"
    } else {
      document.getElementById("exploreYesNext").textContent="→ "+node.yesNode.ch+"?"
      document.getElementById("exploreYesLeaf").textContent=""
    }

    // NO card
    document.getElementById("exploreNoCount").textContent=pluralWords(noWords.length)
    if(node.noNode.leaf){
      document.getElementById("exploreNoNext").textContent=""
      document.getElementById("exploreNoLeaf").textContent=node.noNode.word||"(none)"
    } else {
      document.getElementById("exploreNoNext").textContent="→ "+node.noNode.ch+"?"
      document.getElementById("exploreNoLeaf").textContent=""
    }
  }

  // Word list
  const header=document.getElementById("exploreWordsHeader")
  const grid=document.getElementById("exploreWordsGrid")
  header.textContent=pluralWords(words.length)+" remaining"
  grid.innerHTML=words.slice().sort().map(w=>`<span class="explore-word">${w}</span>`).join("")
}

document.getElementById("btnExplore").onclick=openExplore
document.getElementById("exploreClose").onclick=closeExplore

document.getElementById("exploreBack").onclick=()=>{
  if(exploreHistory.length===0){closeExplore();return}
  exploreHistory.pop()
  // Replay from root
  exploreNode=root
  exploreWords=getWords().slice()
  for(const h of exploreHistory){
    if(h.yes){
      exploreWords=exploreWords.filter(w=>w.includes(exploreNode.ch))
      exploreNode=exploreNode.yesNode
    } else {
      exploreWords=exploreWords.filter(w=>!w.includes(exploreNode.ch))
      exploreNode=exploreNode.noNode
    }
  }
  renderExplore()
}

document.getElementById("exploreYesCard").onclick=()=>{
  if(!exploreNode||exploreNode.leaf)return
  exploreHistory.push({ch:exploreNode.ch,yes:true})
  exploreWords=exploreWords.filter(w=>w.includes(exploreNode.ch))
  exploreNode=exploreNode.yesNode
  renderExplore()
}

document.getElementById("exploreNoCard").onclick=()=>{
  if(!exploreNode||exploreNode.leaf)return
  exploreHistory.push({ch:exploreNode.ch,yes:false})
  exploreWords=exploreWords.filter(w=>!w.includes(exploreNode.ch))
  exploreNode=exploreNode.noNode
  renderExplore()
}

// ── Help Overlay ──────────────────────────────────────────────────

const helpOverlay=document.getElementById('helpOverlay')
let helpTap=0
canvas.addEventListener('pointerdown',e=>{
  if(e.clientX<window.innerWidth*.25&&e.clientY<window.innerHeight*.25){
    const now=Date.now()
    if(now-helpTap<300){helpOverlay.style.display='block'}
    helpTap=now
  }
})
document.getElementById('closeHelp').onclick=()=>helpOverlay.style.display='none'
