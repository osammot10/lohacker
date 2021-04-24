var counter = 0;
var checkcounter = 0;
var createButton;

function createOpenQuestion(idA){
	if(counter == 0){
  	createButton = cloneBG();
    removeBG();
    firstOpen();
  }
  else{
  	openAfter(idA);
  }
}

function deleteQuestion(idBtn){    
    if(counter){
        var divToDelete = document.getElementById(idBtn).parentElement.parentElement.parentElement;
        divToDelete.remove();
        counter--;
    }
    if(!counter){
        var newButton = createButton.cloneNode(true);
        newButton.setAttribute("id","createButton");
        var span = document.createElement("span");
        span.setAttribute("class","caret");
        newButton.childNodes[1].innerHTML = "Create new question " ;
        newButton.childNodes[1].appendChild(span);

        var div = document.getElementById("rcorners");
        var form = div.childNodes[6];
        div.insertBefore(newButton,form);
    }
}

function createCheckboxQuestion(idA){
	if(counter == 0){
  	createButton = cloneBG();
    removeBG();
    firstCheckbox();
  }
  else{
  	checkboxAfter(idA);
  }
}

function addcheck(n){
	
  checkcounter++;
	var container = document.getElementById('container'+n);
  var row = container.childNodes[0];
  var b = document.getElementById("addbutton"+n);
  
  var cln = b.cloneNode(true);
  b.remove();
  
  var check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("name", "check"+checkcounter);
  row.childNodes[0].appendChild(check);

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'chechtext'+checkcounter);
  row.childNodes[0].appendChild(input);
  //row.childNodes[0].appendChild(document.createElement("br"));
  addLine(row.childNodes[0]);
  
  row.childNodes[0].appendChild(cln);
}

function removeBG(){
	  var b = document.getElementById("createButton");
    b.remove();
}

function cloneBG(){
	var b = document.getElementById("createButton");
    b.childNodes[1].innerHTML = " + ";
    var cln = b.cloneNode(true);
    return cln;
}

function createDiv(idDiv){
	var parent = document.getElementById("parentDiv");
	var container = document.createElement("div");
  container.setAttribute("class","container");
  container.setAttribute("id","container"+counter);
  
  var row = document.createElement("div");
  row.setAttribute("class","row");
  container.appendChild(row);
  
  var sxDiv = document.createElement("div");
  sxDiv.setAttribute("class","col-sm-8");
  sxDiv.setAttribute("id","centralDiv");
  
  var dxDiv = document.createElement("div");
  dxDiv.setAttribute("class","col-sm-4");
  dxDiv.setAttribute("id","centralDiv");
  
  row.appendChild(sxDiv);
  row.appendChild(dxDiv);
  
  var actualDiv = document.getElementById(idDiv);
  var nextDiv = actualDiv.nextSibling;
  
  parent.insertBefore(container,nextDiv);
  
  //parent.appendChild(container);
  return container;
}

function addLine(div){
	var br = document.createElement("br");
  div.appendChild(br);
}

function getDivId(divA){
	return document.getElementById(divA).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
}

function getSpace(){
    var space = document.createElement("span");
    space.innerHTML = "&nbsp&nbsp";
    return space;
}

function firstOpen(){
    counter++;
    checkcounter = 0;

    var parent = document.getElementById("parentDiv");
    
    var container = document.createElement("div");
    container.setAttribute("class","container");
    container.setAttribute("id","container"+counter);

    var row = document.createElement("div");
    row.setAttribute("class","row");
    container.appendChild(row);

    var sxDiv = document.createElement("div");
    sxDiv.setAttribute("class","col-sm-8");
    sxDiv.setAttribute("id","centralDiv");

    var dxDiv = document.createElement("div");
    dxDiv.setAttribute("class","col-sm-4");
    dxDiv.setAttribute("id","centralDiv");

    row.appendChild(sxDiv);
    row.appendChild(dxDiv);

    parent.appendChild(container);

    var title = document.createElement("label");
    title.innerHTML="Domanda " + counter;
    row.childNodes[0].appendChild(title);

    //addLine(container);
    row.childNodes[0].appendChild(getSpace());

    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'open');
    row.childNodes[0].appendChild(input);


    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[4].childNodes[1].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[4].childNodes[3].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[4].childNodes[5].childNodes[0].setAttribute("id","radio_btn"+counter);
    row.childNodes[1].appendChild(newButton);

    row.childNodes[1].appendChild(getSpace());

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("type","button");
    deleteButton.setAttribute("class","btn btn-primary dropdown-toggle");
    deleteButton.setAttribute("id","delete_btn"+counter);
    deleteButton.setAttribute("onclick","deleteQuestion(this.id)");
    deleteButton.innerHTML=" X ";
    row.childNodes[1].appendChild(deleteButton);

    var divider = document.createElement("hr");
    divider.setAttribute("class","solid");
    container.appendChild(divider);
}

function firstCheckbox(){
		counter++;
    checkcounter++;
    
    var parent = document.getElementById("parentDiv");
    var container = document.createElement("div");
    container.setAttribute("class","container");
    container.setAttribute("id","container"+counter);

    var row = document.createElement("div");
    row.setAttribute("class","row");
    container.appendChild(row);

    var sxDiv = document.createElement("div");
    sxDiv.setAttribute("class","col-sm-8");
    sxDiv.setAttribute("id","centralDiv");

    var dxDiv = document.createElement("div");
    dxDiv.setAttribute("class","col-sm-4");
    dxDiv.setAttribute("id","centralDiv");

    row.appendChild(sxDiv);
    row.appendChild(dxDiv);

    parent.appendChild(container);
    
    var row = container.childNodes[0];
    
  	var title = document.createElement("label");
    title.innerHTML="Domanda " + counter;
    row.childNodes[0].appendChild(title);
    //addLineBefore(row);
    
    
    var text = document.createElement("input");
		text.setAttribute('type', 'text');
    text.setAttribute('name', 'open');
    row.childNodes[0].appendChild(text);
    //row.childNodes[0].appendChild(document.createElement("br"));
    addLine(row.childNodes[0]);
    
    var check = document.createElement("input");
  	check.setAttribute("type", "checkbox");
    check.setAttribute("name", "check"+checkcounter);
 	 	row.childNodes[0].appendChild(check);
    
  	var input = document.createElement("input");
		input.setAttribute('type', 'text');
    input.setAttribute('name', 'chechtext'+checkcounter);
		row.childNodes[0].appendChild(input);
    //row.childNodes[0].appendChild(document.createElement("br"));
    addLine(row.childNodes[0]);
    
    var addButton = document.createElement("button");
    addButton.setAttribute('type', 'button');
    addButton.setAttribute("onclick","addcheck("+counter+")");
    addButton.setAttribute("id", "addbutton"+counter);
    addButton.innerHTML="Aggiungi";
    row.childNodes[0].appendChild(addButton);
    
    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[4].childNodes[1].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[4].childNodes[3].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[4].childNodes[5].childNodes[0].setAttribute("id","radio_btn"+counter);
    row.childNodes[1].appendChild(newButton);
    
    var divider = document.createElement("hr");
    divider.setAttribute("class","solid");
    container.appendChild(divider);
}

function openAfter(idA){
  counter++;
  checkcounter = 0;
  
  
  //var div = document.getElementById(divId).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  var div = getDivId(idA);
  var container = createDiv(div);
  var row = container.childNodes[0];

  var title = document.createElement("label");
  title.innerHTML="Domanda " + counter;
  row.childNodes[0].appendChild(title);

  row.childNodes[0].appendChild(getSpace());

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'open');
  row.childNodes[0].appendChild(input);
  

  var newButton = createButton.cloneNode(true);
  newButton.setAttribute("id","createButton"+counter);
  newButton.childNodes[4].childNodes[1].childNodes[0].setAttribute("id","open_btn"+counter);
  newButton.childNodes[4].childNodes[3].childNodes[0].setAttribute("id","check_btn"+counter);
  newButton.childNodes[4].childNodes[5].childNodes[0].setAttribute("id","radio_btn"+counter);
  row.childNodes[1].appendChild(newButton);

  row.childNodes[1].appendChild(getSpace());

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("type","button");
  deleteButton.setAttribute("class","btn btn-primary dropdown-toggle");
  deleteButton.setAttribute("id","delete_btn"+counter);
  deleteButton.setAttribute("onclick","deleteQuestion(this.id)");
  deleteButton.innerHTML=" X ";
  row.childNodes[1].appendChild(deleteButton);

  var divider = document.createElement("hr");
  divider.setAttribute("class","solid");
  container.appendChild(divider);
}

function checkboxAfter(idA){
		counter++;
    checkcounter++;
    
    var div = getDivId(idA);
  	var container = createDiv(div);
    var row = container.childNodes[0];
    
  	var title = document.createElement("label");
    title.innerHTML="Domanda " + counter;
    row.childNodes[0].appendChild(title);
    
    
    var text = document.createElement("input");
		text.setAttribute('type', 'text');
    text.setAttribute('name', 'open');
    row.childNodes[0].appendChild(text);
    addLine(row.childNodes[0]);
    
    var check = document.createElement("input");
  	check.setAttribute("type", "checkbox");
    check.setAttribute("name", "check"+checkcounter);
 	 	row.childNodes[0].appendChild(check);
    
  	var input = document.createElement("input");
		input.setAttribute('type', 'text');
    input.setAttribute('name', 'chechtext'+checkcounter);
		row.childNodes[0].appendChild(input);
    addLine(row.childNodes[0]);
    
    var addButton = document.createElement("button");
    addButton.setAttribute('type', 'button');
    addButton.setAttribute("onclick","addcheck("+counter+")");
    addButton.setAttribute("id", "addbutton"+counter);
    addButton.innerHTML="Aggiungi";
    row.childNodes[0].appendChild(addButton);
    
    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[4].childNodes[1].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[4].childNodes[3].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[4].childNodes[5].childNodes[0].setAttribute("id","radio_btn"+counter);
    row.childNodes[1].appendChild(newButton);
    
    var divider = document.createElement("hr");
    divider.setAttribute("class","solid");
    container.appendChild(divider);
}