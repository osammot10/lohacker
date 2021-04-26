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

	var container = document.getElementById('addCheck'+n).parentElement.parentElement.parentElement;
  
  var row = container.childNodes[0];
  
  var a = document.getElementById("addCheck"+n);
  var d = document.getElementById("deleteCheck"+n);
  
  var addCheck = a.cloneNode(true);
  var deleteCheck = d.cloneNode(true);
  
  a.remove();

  addLine(row.childNodes[0]);
  addLine(row.childNodes[0]);
  
  var check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("id", "check"+checkcounter);
  row.childNodes[0].appendChild(check);

  row.childNodes[0].appendChild(getSpace());

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'chechtext'+checkcounter);
  row.childNodes[0].appendChild(input);

  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());

  addCheck.setAttribute("id","addCheck"+checkcounter);
  addCheck.setAttribute("onclick","addcheck("+checkcounter+")");
  deleteCheck.setAttribute("id","deleteCheck"+checkcounter);
  deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");

  row.childNodes[0].appendChild(addCheck);
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(deleteCheck);
  
  document.getElementById("deleteCheck"+n).style.visibility = "visible";
}

function deleteCheck(n){
  var check = document.getElementById("check"+n);
  var text = check.nextSibling;
  var span1 = text.nextSibling;
  var span2 = span1.nextSibling;
  var span3 = span2.nextSibling;
  var span4 = span3.nextSibling;
  var btn = span4.nextSibling;
  var br1 = btn.nextSibling;
  var br2 = br1.nextSibling;
  var br3 = br2.nextSibling;

  check.remove();
  text.remove();
  span1.remove();
  span2.remove();
  span3.remove();
  span4.remove();
  btn.remove();
  br1.remove();
  br2.remove();
  br3.remove();
}

function removeBG(){
	  var b = document.getElementById("createButton");
    b.remove();
}

function cloneBG(){
	var b = document.getElementById("createButton");
    b.childNodes[1].innerHTML = " + ";
    b.childNodes[1].setAttribute("class","btn btn-primary");
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
    deleteButton.setAttribute("class","btn btn-primary");
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
    
    row.childNodes[0].appendChild(getSpace());
    
    var text = document.createElement("input");
		text.setAttribute('type', 'text');
    text.setAttribute('name', 'open');
    row.childNodes[0].appendChild(text);

    addLine(row.childNodes[0]);
    addLine(row.childNodes[0]);
    
    var check = document.createElement("input");
  	check.setAttribute("type", "checkbox");
    check.setAttribute("id", "check"+counter);
 	 	row.childNodes[0].appendChild(check);

    row.childNodes[0].appendChild(getSpace());
    
  	var input = document.createElement("input");
		input.setAttribute('type', 'text');
    input.setAttribute('id', 'chechtext'+counter);
		row.childNodes[0].appendChild(input);

    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());
    
    var addButton = document.createElement("button");
    addButton.setAttribute('type', 'button');
    addButton.setAttribute("class","btn btn-secondary btn-sm");
    addButton.setAttribute("onclick","addcheck("+checkcounter+")");
    addButton.setAttribute("id", "addCheck"+checkcounter);
    addButton.innerHTML=" + ";
    row.childNodes[0].appendChild(addButton);

    row.childNodes[0].appendChild(getSpace());

    var deleteCheck = document.createElement("button");
    deleteCheck.setAttribute('type', 'button');
    deleteCheck.setAttribute("class","btn btn-secondary btn-sm");
    deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");
    deleteCheck.setAttribute("id", "deleteCheck"+checkcounter);
    deleteCheck.innerHTML=" X ";
    deleteCheck.style.visibility = "hidden";
    row.childNodes[0].appendChild(deleteCheck);
    
    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[4].childNodes[1].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[4].childNodes[3].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[4].childNodes[5].childNodes[0].setAttribute("id","radio_btn"+counter);
    row.childNodes[1].appendChild(newButton);

    row.childNodes[1].appendChild(getSpace());

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("type","button");
    deleteButton.setAttribute("class","btn btn-primary");
    deleteButton.setAttribute("id","delete_btn"+counter);
    deleteButton.setAttribute("onclick","deleteQuestion(this.id)");
    deleteButton.innerHTML=" X ";
    row.childNodes[1].appendChild(deleteButton);
    
    var divider = document.createElement("hr");
    divider.setAttribute("class","solid");
    container.appendChild(divider);
}

function openAfter(idA){
  counter++;  
  
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
  deleteButton.setAttribute("class","btn btn-primary");
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
    
    row.childNodes[0].appendChild(getSpace());

    var text = document.createElement("input");
		text.setAttribute('type', 'text');
    text.setAttribute('name', 'open');
    row.childNodes[0].appendChild(text);

    addLine(row.childNodes[0]);
    addLine(row.childNodes[0]);
    
    var check = document.createElement("input");
  	check.setAttribute("type", "checkbox");
    check.setAttribute("id", "check"+counter);
 	 	row.childNodes[0].appendChild(check);

    row.childNodes[0].appendChild(getSpace());
    
  	var input = document.createElement("input");
		input.setAttribute('type', 'text');
    input.setAttribute('id', 'chechtext'+counter);
		row.childNodes[0].appendChild(input);

    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());
    
    var addButton = document.createElement("button");
    addButton.setAttribute('type', 'button');
    addButton.setAttribute("class","btn btn-primary");
    addButton.setAttribute("onclick","addcheck("+checkcounter+")");
    addButton.setAttribute("id", "addCheck"+checkcounter);
    addButton.innerHTML=" + ";
    row.childNodes[0].appendChild(addButton);

    row.childNodes[0].appendChild(getSpace());

    var deleteCheck = document.createElement("button");
    deleteCheck.setAttribute('type', 'button');
    deleteCheck.setAttribute("class","btn btn-primary");
    deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");
    deleteCheck.setAttribute("id", "deleteCheck"+checkcounter);
    deleteCheck.innerHTML=" X ";
    deleteCheck.style.display = "none";
    row.childNodes[0].appendChild(deleteCheck);
    
    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[4].childNodes[1].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[4].childNodes[3].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[4].childNodes[5].childNodes[0].setAttribute("id","radio_btn"+counter);
    row.childNodes[1].appendChild(newButton);

    row.childNodes[1].appendChild(getSpace());

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("type","button");
    deleteButton.setAttribute("class","btn btn-primary");
    deleteButton.setAttribute("id","delete_btn"+counter);
    deleteButton.setAttribute("onclick","deleteQuestion(this.id)");
    deleteButton.innerHTML=" X ";
    row.childNodes[1].appendChild(deleteButton);
    
    var divider = document.createElement("hr");
    divider.setAttribute("class","solid");
    container.appendChild(divider);
}