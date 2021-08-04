var counter = 0;
var checkcounter = 0;
var radiocounter = 0;
var n_question = 0;
var createButton;
var b;

function createFileQuestion(idA){
  createButton = createQButton();
  if(idA == 'file_btn'){
    createSendButton();
    b = cloneBG();
    removeBG();
    firstFileQuestion();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question == 0)
      n_question = t;
    afterFileQuestion(idA);
  }
}

function createOpenQuestion(idA){
  createButton = createQButton();
	if(idA == 'open_btn'){
    createSendButton();
  	b = cloneBG();
    removeBG();
    firstOpen();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question == 0)
      n_question = t;
  	openAfter(idA);
  }
}

function deleteQuestion(idBtn){    
    if(n_question){
        var divToDelete = document.getElementById(idBtn).parentElement.parentElement.parentElement;
        divToDelete.remove();
        n_question--;
    }
    if(!n_question){
        document.getElementById("sendButton").remove();
        var div = document.getElementById("rcorners");
        var form = div.childNodes[1];
        var divBtn = form.childNodes[11];
        form.insertBefore(b,divBtn);
    }
}

function createCheckboxQuestion(idA){
	if(idA == 'check_btn'){
    createSendButton();
    b = cloneBG();
  	createButton = createQButton();
    removeBG();
    firstCheckbox();
  }
  else{
  	checkboxAfter(idA);
  }
}

function createRadioQuestion(idA){
	if(idA == 'radio_btn'){
    createSendButton();
    b = cloneBG();
  	createButton = createQButton();
    removeBG();
    firstRadio();
  }
  else{
  	radioAfter(idA);
  }
}

function addcheck(n){
	
  checkcounter++;

	var container = document.getElementById('addCheck'+n).parentElement.parentElement.parentElement;

  var id = container.id.charAt(9);
  
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
  check.setAttribute("name", id+" checkbox "+checkcounter);
  check.disabled = true;
  row.childNodes[0].appendChild(check);

  row.childNodes[0].appendChild(getSpace());

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'chechtext'+checkcounter);
  input.setAttribute("name", id+" checkboxtext "+checkcounter);
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

function addRadio(n){
	
  radiocounter++;

	var container = document.getElementById('addRadio'+n).parentElement.parentElement.parentElement;

  var id = container.id.charAt(9);
  
  var row = container.childNodes[0];
  
  var a = document.getElementById("addRadio"+n);
  var d = document.getElementById("deleteRadio"+n);
  
  var addRadio = a.cloneNode(true);
  var deleteRadio = d.cloneNode(true);
  
  a.remove();

  addLine(row.childNodes[0]);
  addLine(row.childNodes[0]);
  
  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("id", "radio"+radiocounter);
  radio.setAttribute("name", id+" radio");
  radio.disabled = true;
  row.childNodes[0].appendChild(radio);

  row.childNodes[0].appendChild(getSpace());

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'radiotext'+radiocounter);
  input.setAttribute("name", id+" radiobtntext "+radiocounter);
  row.childNodes[0].appendChild(input);

  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());

  addRadio.setAttribute("id","addRadio"+radiocounter);
  addRadio.setAttribute("onclick","addRadio("+radiocounter+")");
  deleteRadio.setAttribute("id","deleteRadio"+radiocounter);
  deleteRadio.setAttribute("onclick","deleteRadio("+radiocounter+")");

  row.childNodes[0].appendChild(addRadio);
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(deleteRadio);
  
  document.getElementById("deleteRadio"+n).style.visibility = "visible";
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

function deleteRadio(n){
  var radio = document.getElementById("radio"+n);
  var text = radio.nextSibling;
  var span1 = text.nextSibling;
  var span2 = span1.nextSibling;
  var span3 = span2.nextSibling;
  var span4 = span3.nextSibling;
  var btn = span4.nextSibling;
  var br1 = btn.nextSibling;
  var br2 = br1.nextSibling;
  var br3 = br2.nextSibling;

  radio.remove();
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
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    var cln = b.cloneNode(true);
    return cln;
}

function createSendButton(){
  var questionForm = document.getElementById("questionForm");

  var sendButton = document.createElement("button");
  sendButton.setAttribute("type", "submit");
  sendButton.setAttribute("class", "btn btn-primary");
  sendButton.setAttribute("id", "sendButton")
  sendButton.innerHTML = " Send ";

  questionForm.appendChild(sendButton);
}

function createQButton(){

    var div = document.createElement("div");
    div.setAttribute("class", "btn-group");
    
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "btn btn-primary dropdown-toggle");
    btn.setAttribute("data-bs-toggle", "dropdown");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML=" + ";
    div.appendChild(btn);

    var ul = document.createElement("ul");
    ul.setAttribute("class", "dropdown-menu");
    ul.setAttribute("role", "menu");
    ul.setAttribute("id", "list");
    div.appendChild(ul);

    var li1 = document.createElement("li");
    var a1 = document.createElement("a");
    a1.setAttribute("class", "dropdown-item");
    a1.setAttribute("onclick", "createOpenQuestion(this.id)");
    a1.setAttribute("href", "#");
    a1.innerHTML=" Open ";
    li1.appendChild(a1);
    ul.appendChild(li1);

    var li2 = document.createElement("li");
    var a2 = document.createElement("a");
    a2.setAttribute("class", "dropdown-item");
    a2.setAttribute("onclick", "createCheckboxQuestion(this.id)");
    a2.setAttribute("href", "#");
    a2.innerHTML=" Checkbox ";
    li2.appendChild(a2);
    ul.appendChild(li2);

    var li3 = document.createElement("li");
    var a3 = document.createElement("a");
    a3.setAttribute("class", "dropdown-item");
    a3.setAttribute("onclick", "createRadioQuestion(this.id)");
    a3.setAttribute("href", "#");
    a3.innerHTML=" Radio button ";
    li3.appendChild(a3);
    ul.appendChild(li3);

    var li4 = document.createElement("li");
    var a4 = document.createElement("a");
    a4.setAttribute("class", "dropdown-item");
    a4.setAttribute("onclick", "createFileQuestion(this.id)");
    a4.setAttribute("href", "#");
    a4.innerHTML=" File ";
    li4.appendChild(a4);
    ul.appendChild(li4);
    
    return div;
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
  if(nextDiv != null && nextDiv.nodeName == '#text'){
    nextDiv = nextDiv.nextSibling;
  }
  
  parent.insertBefore(container,nextDiv);
  
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
    n_question++;

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

    row.childNodes[0].appendChild(getSpace());

    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('name', counter+' open');
    row.childNodes[0].appendChild(input);

    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());

    var switchToggle = document.createElement("input");
    switchToggle.setAttribute('class','form-check-input');
    switchToggle.setAttribute('type', 'checkbox');
    switchToggle.setAttribute('id', 'flexCheckDefault');
    switchToggle.setAttribute('name', counter + ' required');
    row.childNodes[0].appendChild(switchToggle);

    var requiredLabel = document.createElement("label");
    requiredLabel.setAttribute('class', 'form-check-label');
    requiredLabel.setAttribute('for', 'flexCheckDefault');
    requiredLabel.innerHTML = '&nbsp; Required';
    row.childNodes[0].appendChild(requiredLabel);

    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
    newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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
    n_question++;
    
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
    text.setAttribute('name', counter+' checkbox');
    row.childNodes[0].appendChild(text);

    row.childNodes[0].appendChild(getSpace());

    var switchToggle = document.createElement("input");
    switchToggle.setAttribute('class','form-check-input');
    switchToggle.setAttribute('type', 'checkbox');
    switchToggle.setAttribute('id', 'flexCheckDefault');
    switchToggle.setAttribute('name', counter + ' required');
    row.childNodes[0].appendChild(switchToggle);

    var requiredLabel = document.createElement("label");
    requiredLabel.setAttribute('class', 'form-check-label');
    requiredLabel.setAttribute('for', 'flexCheckDefault');
    requiredLabel.innerHTML = '&nbsp; Required';
    row.childNodes[0].appendChild(requiredLabel);

    addLine(row.childNodes[0]);
    addLine(row.childNodes[0]);
    
    var check = document.createElement("input");
  	check.setAttribute("type", "checkbox");
    check.setAttribute("id", "check"+checkcounter);
    check.setAttribute("name",counter+" checkbox "+checkcounter)
    check.disabled = true;
 	 	row.childNodes[0].appendChild(check);

    row.childNodes[0].appendChild(getSpace());
    
  	var input = document.createElement("input");
		input.setAttribute('type', 'text');
    input.setAttribute('id', 'chechtext'+checkcounter);
    input.setAttribute("name",counter+" checkboxtext "+checkcounter)
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
    newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
    newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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

function firstRadio(){
  counter++;
  radiocounter++;
  n_question++;
  
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
  text.setAttribute('name', counter+' radio');
  row.childNodes[0].appendChild(text);

  row.childNodes[0].appendChild(getSpace());

  var switchToggle = document.createElement("input");
  switchToggle.setAttribute('class','form-check-input');
  switchToggle.setAttribute('type', 'checkbox');
  switchToggle.setAttribute('id', 'flexCheckDefault');
  switchToggle.setAttribute('name', counter + ' required');
  row.childNodes[0].appendChild(switchToggle);

  var requiredLabel = document.createElement("label");
  requiredLabel.setAttribute('class', 'form-check-label');
  requiredLabel.setAttribute('for', 'flexCheckDefault');
  requiredLabel.innerHTML = '&nbsp; Required';
  row.childNodes[0].appendChild(requiredLabel);

  addLine(row.childNodes[0]);
  addLine(row.childNodes[0]);
  
  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("id", "radio"+radiocounter);
  radio.setAttribute("name",counter+" radio");
  radio.disabled = true;
  row.childNodes[0].appendChild(radio);

  row.childNodes[0].appendChild(getSpace());
  
  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'radiotext'+radiocounter);
  input.setAttribute("name",counter+" radiobtntext "+radiocounter)
  row.childNodes[0].appendChild(input);

  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());
  
  var addButton = document.createElement("button");
  addButton.setAttribute('type', 'button');
  addButton.setAttribute("class","btn btn-secondary btn-sm");
  addButton.setAttribute("onclick","addRadio("+radiocounter+")");
  addButton.setAttribute("id", "addRadio"+radiocounter);
  addButton.innerHTML=" + ";
  row.childNodes[0].appendChild(addButton);

  row.childNodes[0].appendChild(getSpace());

  var deleteRadio = document.createElement("button");
  deleteRadio.setAttribute('type', 'button');
  deleteRadio.setAttribute("class","btn btn-secondary btn-sm");
  deleteRadio.setAttribute("onclick","deleteRadio("+radiocounter+")");
  deleteRadio.setAttribute("id", "deleteRadio"+radiocounter);
  deleteRadio.innerHTML=" X ";
  deleteRadio.style.visibility = "hidden";
  row.childNodes[0].appendChild(deleteRadio);
  
  var newButton = createButton.cloneNode(true);
  newButton.setAttribute("id","createButton"+counter);
  newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
  newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
  newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
  newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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

function firstFileQuestion(){
  counter++;
  n_question++;

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

  var div = document.createElement("div");
  div.setAttribute("class", "mb-3");
  row.childNodes[0].appendChild(div);

  var label = document.createElement("label");
  label.setAttribute("for", "formFile");
  label.setAttribute("class", "form-label");
  label.innerHTML = "Domanda " + counter;
  div.appendChild(label);

  div.appendChild(getSpace());

  var textarea = document.createElement("textarea");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("name", counter + " fileText");
  textarea.setAttribute("cols", "70");
  div.appendChild(textarea);

  div.appendChild(getSpace());

  var switchToggle = document.createElement("input");
  switchToggle.setAttribute('class','form-check-input');
  switchToggle.setAttribute('type', 'checkbox');
  switchToggle.setAttribute('id', 'flexCheckDefault');
  switchToggle.setAttribute('name', counter + ' required');
  div.appendChild(switchToggle);

  var requiredLabel = document.createElement("label");
  requiredLabel.setAttribute('class', 'form-check-label');
  requiredLabel.setAttribute('for', 'flexCheckDefault');
  requiredLabel.innerHTML = '&nbsp; Required';
  div.appendChild(requiredLabel);

  var input = document.createElement("input");
  input.setAttribute("class", "form-control");
  input.setAttribute("type", "file");
  input.setAttribute("id", "formFile");
  input.setAttribute("name", counter + " file");
  input.disabled = true;
  div.appendChild(input);

  var newButton = createButton.cloneNode(true);
  newButton.setAttribute("id","createButton"+counter);
  newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
  newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
  newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
  newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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
  n_question++;
  
  var div = getDivId(idA);
  var container = createDiv(div);
  var row = container.childNodes[0];

  var title = document.createElement("label");
  title.innerHTML="Domanda " + counter;
  row.childNodes[0].appendChild(title);

  row.childNodes[0].appendChild(getSpace());

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('name', counter+' open');
  row.childNodes[0].appendChild(input);

  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());

  var switchToggle = document.createElement("input");
  switchToggle.setAttribute('class','form-check-input');
  switchToggle.setAttribute('type', 'checkbox');
  switchToggle.setAttribute('id', 'flexCheckDefault');
  switchToggle.setAttribute('name', counter + ' required');
  row.childNodes[0].appendChild(switchToggle);

  var requiredLabel = document.createElement("label");
  requiredLabel.setAttribute('class', 'form-check-label');
  requiredLabel.setAttribute('for', 'flexCheckDefault');
  requiredLabel.innerHTML = '&nbsp; Required';
  row.childNodes[0].appendChild(requiredLabel);
  
  var newButton = createButton.cloneNode(true);
  newButton.setAttribute("id","createButton"+counter);
  newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
  newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
  newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
  newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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
    n_question++;
    
    var div = getDivId(idA);
  	var container = createDiv(div);
    var row = container.childNodes[0];
    
  	var title = document.createElement("label");
    title.innerHTML="Domanda " + counter;
    row.childNodes[0].appendChild(title);
    
    row.childNodes[0].appendChild(getSpace());

    var text = document.createElement("input");
		text.setAttribute('type', 'text');
    text.setAttribute('name', counter+' checkbox');
    row.childNodes[0].appendChild(text);

    row.childNodes[0].appendChild(getSpace());

    var switchToggle = document.createElement("input");
    switchToggle.setAttribute('class','form-check-input');
    switchToggle.setAttribute('type', 'checkbox');
    switchToggle.setAttribute('id', 'flexCheckDefault');
    switchToggle.setAttribute('name', counter + ' required');
    row.childNodes[0].appendChild(switchToggle);

    var requiredLabel = document.createElement("label");
    requiredLabel.setAttribute('class', 'form-check-label');
    requiredLabel.setAttribute('for', 'flexCheckDefault');
    requiredLabel.innerHTML = '&nbsp; Required';
    row.childNodes[0].appendChild(requiredLabel);

    addLine(row.childNodes[0]);
    addLine(row.childNodes[0]);
    
    var check = document.createElement("input");
  	check.setAttribute("type", "checkbox");
    check.setAttribute("id", "check"+checkcounter);
    check.setAttribute("name",counter+" checkbox "+checkcounter);
    check.disabled = true;
 	 	row.childNodes[0].appendChild(check);

    row.childNodes[0].appendChild(getSpace());
    
  	var input = document.createElement("input");
		input.setAttribute('type', 'text');
    input.setAttribute('id', 'chechtext'+checkcounter);
    input.setAttribute("name", counter+" checkboxtext "+checkcounter);
		row.childNodes[0].appendChild(input);

    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());
    row.childNodes[0].appendChild(getSpace());
    
    var addButton = document.createElement("button");
    addButton.setAttribute('type', 'button');
    addButton.setAttribute("class","btn btn-secondary");
    addButton.setAttribute("onclick","addcheck("+checkcounter+")");
    addButton.setAttribute("id", "addCheck"+checkcounter);
    addButton.innerHTML=" + ";
    row.childNodes[0].appendChild(addButton);

    row.childNodes[0].appendChild(getSpace());

    var deleteCheck = document.createElement("button");
    deleteCheck.setAttribute('type', 'button');
    deleteCheck.setAttribute("class","btn btn-secondary");
    deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");
    deleteCheck.setAttribute("id", "deleteCheck"+checkcounter);
    deleteCheck.innerHTML=" X ";
    deleteCheck.style.visibility = "hidden";
    row.childNodes[0].appendChild(deleteCheck);
    
    var newButton = createButton.cloneNode(true);
    newButton.setAttribute("id","createButton"+counter);
    newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
    newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
    newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
    newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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

function afterFileQuestion(idA){
  counter++;
  checkcounter++;
  n_question++;
  
  var div = getDivId(idA);
  var container = createDiv(div);
  var row = container.childNodes[0];
  
  var div = document.createElement("div");
  div.setAttribute("class", "mb-3");
  row.childNodes[0].appendChild(div);

  var label = document.createElement("label");
  label.setAttribute("for", "formFile");
  label.setAttribute("class", "form-label");
  label.innerHTML = "Domanda " + counter;
  div.appendChild(label);

  div.appendChild(getSpace());

  var textarea = document.createElement("textarea");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("name", counter + " fileText");
  textarea.setAttribute("cols", "70");
  div.appendChild(textarea);

  div.appendChild(getSpace());

  var switchToggle = document.createElement("input");
  switchToggle.setAttribute('class','form-check-input');
  switchToggle.setAttribute('type', 'checkbox');
  switchToggle.setAttribute('id', 'flexCheckDefault');
  switchToggle.setAttribute('name', counter + ' required');
  div.appendChild(switchToggle);

  var requiredLabel = document.createElement("label");
  requiredLabel.setAttribute('class', 'form-check-label');
  requiredLabel.setAttribute('for', 'flexCheckDefault');
  requiredLabel.innerHTML = '&nbsp; Required';
  div.appendChild(requiredLabel);

  var input = document.createElement("input");
  input.setAttribute("class", "form-control");
  input.setAttribute("type", "file");
  input.setAttribute("id", "formFile");
  input.setAttribute("name", counter + " file");
  input.disabled = true;
  div.appendChild(input);

  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());

  row.childNodes[0].appendChild(getSpace());

  var deleteCheck = document.createElement("button");
  deleteCheck.setAttribute('type', 'button');
  deleteCheck.setAttribute("class","btn btn-secondary");
  deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");
  deleteCheck.setAttribute("id", "deleteCheck"+checkcounter);
  deleteCheck.innerHTML=" X ";
  deleteCheck.style.visibility = "hidden";
  row.childNodes[0].appendChild(deleteCheck);
  
  var newButton = createButton.cloneNode(true);
  newButton.setAttribute("id","createButton"+counter);
  newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
  newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
  newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
  newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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

function radioAfter(idA){
  counter++;
  radiocounter++;
  n_question++;
  
  var div = getDivId(idA);
  var container = createDiv(div);
  var row = container.childNodes[0];
  
  var title = document.createElement("label");
  title.innerHTML="Domanda " + counter;
  row.childNodes[0].appendChild(title);
  
  row.childNodes[0].appendChild(getSpace());

  var text = document.createElement("input");
  text.setAttribute('type', 'text');
  text.setAttribute('name', counter+' radio');
  row.childNodes[0].appendChild(text);

  row.childNodes[0].appendChild(getSpace());

  var switchToggle = document.createElement("input");
  switchToggle.setAttribute('class','form-check-input');
  switchToggle.setAttribute('type', 'checkbox');
  switchToggle.setAttribute('id', 'flexCheckDefault');
  switchToggle.setAttribute('name', counter + ' required');
  row.childNodes[0].appendChild(switchToggle);

  var requiredLabel = document.createElement("label");
  requiredLabel.setAttribute('class', 'form-check-label');
  requiredLabel.setAttribute('for', 'flexCheckDefault');
  requiredLabel.innerHTML = '&nbsp; Required';
  row.childNodes[0].appendChild(requiredLabel);

  addLine(row.childNodes[0]);
  addLine(row.childNodes[0]);

  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("id", "radio"+radiocounter);
  radio.setAttribute("name",counter+" radio")
  radio.disabled = true;
  row.childNodes[0].appendChild(radio);

  row.childNodes[0].appendChild(getSpace());

  var input = document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'radiotext'+radiocounter);
  input.setAttribute("name",counter+" radiobtntext "+radiocounter)
  row.childNodes[0].appendChild(input);

  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());
  row.childNodes[0].appendChild(getSpace());

  var addButton = document.createElement("button");
  addButton.setAttribute('type', 'button');
  addButton.setAttribute("class","btn btn-secondary btn-sm");
  addButton.setAttribute("onclick","addRadio("+radiocounter+")");
  addButton.setAttribute("id", "addRadio"+radiocounter);
  addButton.innerHTML=" + ";
  row.childNodes[0].appendChild(addButton);

  row.childNodes[0].appendChild(getSpace());

  var deleteRadio = document.createElement("button");
  deleteRadio.setAttribute('type', 'button');
  deleteRadio.setAttribute("class","btn btn-secondary btn-sm");
  deleteRadio.setAttribute("onclick","deleteRadio("+radiocounter+")");
  deleteRadio.setAttribute("id", "deleteRadio"+radiocounter);
  deleteRadio.innerHTML=" X ";
  deleteRadio.style.visibility = "hidden";
  row.childNodes[0].appendChild(deleteRadio);
  
  var newButton = createButton.cloneNode(true);
  newButton.setAttribute("id","createButton"+counter);
  newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
  newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
  newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
  newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
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

function copy(id){
    /* Get the text field */
    var copyText = document.getElementById(id).previousSibling.previousSibling;
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    //alert("Copied the text: " + copyText.value);
}

function checkRequired(className){
  checkbox = document.getElementsByClassName(className);
  var atLeastOneChecked = false;

  for(i = 0; i < checkbox.length; i++){
    if(checkbox[i].checked === true){
      atLeastOneChecked = true;
    }
  }

  if(atLeastOneChecked === true){
    for(i = 0; i < checkbox.length; i++){
      checkbox[i].required = false;
    }
  }
  else{
    for(i = 0; i < checkbox.length; i++){
      checkbox[i].required = true;
    }
  }
}