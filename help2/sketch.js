var database
var drawing = [];
var cp =[];
var isDraw = false
var canvas
var save;
function setup() {
  canvas = createCanvas(700, 700);
  canvas.mousePressed(sp)
 canvas.mouseReleased(ep)
 canvas.parent("canvascontainer")
  
  saveButton = createButton("save");
  saveButton.mousePressed(saveDraw);
  clearButton = createButton("clear");
  clearButton.mousePressed(clearDrawing);
  database = firebase.database();
  var ref1 = database.ref('drawings')
  ref1.on('value',gotData,errData);
 
}
function sp(){
  isDraw = true
  cp = []
  drawing.push(cp);
}
function ep(){
  isDraw = false
}
function clearDrawing(){
  drawing = [];
}

function draw() {
  background(0);
  if(isDraw === true){
    var point = {
      x : mouseX,
      y : mouseY
    };
    cp.push(point);
  }

  
  stroke("teal");
  strokeWeight(4);
  noFill();
  
  for(i = 0;i < drawing.length; i++){
    var line = drawing[i];
    beginShape();
    for(j = 0;j < line.length;j++){

    
    vertex(line[j].x,line[j].y);
    
    endShape();
    }
  }
   
}

function saveDraw(){
  var ref = database.ref('drawings');
  var data = {
    name : "your Drawing",
    drawing : drawing
  }
  var result = ref.push(data,sent);
  console.log(result.key);
  function sent(err,status){
    console.log(status);
  }
}
function gotData(data){
   var drawings = data.val();
   var keys = [Object.keys(drawings)];
   for(var i;i < keys.length;i+=1){
     var key = keys[i];
     
    
   }
    var li = createElement("li",key);
    li.parent('drawingList')
     var ahref = createA("#",keys);
    ahref.mousePressed(showDrawing);
     ahref.parent(li);
     
     
   
}

function errData(err){
   console.log(err)
}

function showDrawing(){
  var key = this.html()
  var ref = database.ref("drawings/"+ key)
  ref.on("value",onedrawing,errData);
  function onedrawing(data){
   var dbdrawing = data.val();
   drawing = dbdrawing.drawing;
  // console.log(dbdrawing);
  }
  
}


