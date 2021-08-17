var counter = 0;
var checkcounter = 0;
var radiocounter = 0;
var n_question = -1;
var createButton;
var b;

// Functions for removing and cloning the button for the creation of the first questions

function removeBG(){
	  var b = document.getElementById("createButton");
    b.remove();
}

function cloneBG(){
	  var b = document.getElementById("createButton");
    var cln = b.cloneNode(true);
    return cln;
}

// Function for the creation of the button used for adding a question (when another question is already created)
function createQButton(){

    var div = document.createElement("div");
    div.setAttribute("class", "btn-group");
    
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "btn btn-primary dropdown-toggle");
    btn.setAttribute("data-bs-toggle", "dropdown");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("id", "newQuestionButton");
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

// Function for the creation of the div container where the new question will be located (it is used for the no-first question, but when anotherone is already existing)
function createDiv(idDiv){
	var parentDiv = document.getElementById("parentDiv");

  var card = createCard()
  
  var actualDiv = document.getElementById(idDiv);
  var nextDiv = actualDiv.nextSibling;
  if(nextDiv != null && nextDiv.nodeName == '#text'){
    nextDiv = nextDiv.nextSibling;
  }
  
  parentDiv.insertBefore(card,nextDiv);
  //parentDiv.insertBefore(document.createElement("br"), card);
  
  return card;
}

// Function used for adding a new line (<br> HTML tag) into a div
function addLine(div){
	var br = document.createElement("br");
  div.appendChild(br);
}

// Function used for retrieving the id of the external div that contains the button pressed (used for creating a new question) with divA id. createDiv() wil create the div for a new question located after the div retrived by its
function getDivId(divA){
	return document.getElementById(divA).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
}

// Function used for insert two space between elements
function getSpace(){
    var space = document.createElement("span");
    space.innerHTML = "&nbsp&nbsp";
    return space;
}

// Function used for copy and paste the content of the previos element, of the element with the id 'id' passed as parameter, into the block notes of the user
function copy(id){
  if(id == "idInput"){
    var copyText = document.getElementById("idInputText");
  }
  else{
    var copyText = document.getElementById("linkInputText");
  }
    /* Get the text field */
    //var copyText = document.getElementById(id).previousSibling.previousSibling;
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    //alert("Copied the text: " + copyText.value);
}

// Function used for checking if all the required questions have been answered
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


// Functions called by the onclick trigger of the DOM elements for the creation of the questions of a new form

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

function createCheckboxQuestion(idA){
  createButton = createQButton();
	if(idA == 'check_btn'){
    createSendButton();
    b = cloneBG();
    removeBG();
    firstCheckbox();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question == 0)
      n_question = t;
  	checkboxAfter(idA);
  }
}

function createRadioQuestion(idA){
  createButton = createQButton();
	if(idA == 'radio_btn'){
    createSendButton();
    b = cloneBG();
    removeBG();
    firstRadio();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question == 0)
      n_question = t;
  	radioAfter(idA);
  }
}

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

function deleteQuestion(idBtn){
  if(n_question < 0){
    n_question = $('#n').data().name;
    //b = cloneBG();
  }
  if(n_question){
    var divToDelete = document.getElementById(idBtn).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    divToDelete.remove();
    n_question--;
  }
  if(!n_question){
    //document.getElementById("sendButton").previousSibling.remove();
    document.getElementById("questionForm").insertBefore(b,document.getElementById("sendButton"));
    document.getElementById("sendButton").remove();
  }
}

function createCard(){
  var card = document.createElement("div");
  card.setAttribute("class","card shadow rounded m-3");
  card.setAttribute("id", "container"+counter);
  parentDiv.appendChild(card);

  var cardHeader = document.createElement("div");
  cardHeader.setAttribute("class", "card-header");
  cardHeader.innerHTML = " Domanda ";
  card.appendChild(cardHeader);

  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);
  
  var container = document.createElement("div");
  container.setAttribute("class","container");
  cardBody.appendChild(container);

  var row = document.createElement("div");
  row.setAttribute("class","row");
  container.appendChild(row);
  
  var sxDiv = document.createElement("div");
  sxDiv.setAttribute("class","col-8");
  sxDiv.setAttribute("id","centralDiv");
  row.appendChild(sxDiv);

  var centralDiv = document.createElement("div");
  centralDiv.setAttribute("class", "col-auto p-1");
  row.appendChild(centralDiv);

  var dxDiv = document.createElement("div");
  dxDiv.setAttribute("class","col-auto p-1");
  row.appendChild(dxDiv);

  return card;
}

function getTextareaDiv(card){
  return card.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
}

function getRequiredCheckboxDiv(card){
  return card.childNodes[1].childNodes[0].childNodes[0].childNodes[1];
}

function getButtonsDiv(card){
  return card.childNodes[1].childNodes[0].childNodes[0].childNodes[2];
}

function getCardContainer(card){
  return card.childNodes[1].childNodes[0];
}

function createTextarea(name){
  var textarea = document.createElement("textarea");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("class", "form-control");
  textarea.setAttribute('name', name);
  return textarea;
}

function createSwitchForRequired(){
  var div = document.createElement("div");
  div.setAttribute("class", "form-check form-switch");

  var checkboxSwitch = document.createElement("input");
  checkboxSwitch.setAttribute('class','form-check-input');
  checkboxSwitch.setAttribute('type', 'checkbox');
  checkboxSwitch.setAttribute('name', counter + " required");
  div.appendChild(checkboxSwitch);

  var label = document.createElement("label");
  label.setAttribute('class', 'form-check-label');
  label.innerHTML = 'Required';
  div.appendChild(label);

  return div;
}

function createAddAndDeleteButtons(){
  var containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "container p-1");

  var addButton = createButton.cloneNode(true);
  addButton.setAttribute("id","createButton"+counter);
  addButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","open_btn"+counter);
  addButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","check_btn"+counter);
  addButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","radio_btn"+counter);
  addButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","file_btn"+counter);
  containerDiv.appendChild(addButton);

  containerDiv.appendChild(getSpace());

  var deleteButton = document.createElement("a");
  deleteButton.setAttribute("type","button");
  deleteButton.setAttribute("class","btn btn-primary");
  deleteButton.setAttribute("id","delete_btn"+counter);
  deleteButton.setAttribute("onclick", "deleteQuestion(this.id)");
  deleteButton.innerHTML=" X ";
  containerDiv.appendChild(deleteButton);

  return containerDiv;
}
function createTemplateAddAndDeleteButtons(){
  var containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "container p-1");

  var addButton = createButton.cloneNode(true);
  addButton.setAttribute("id","createButton"+counter);
  addButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("id","template_open#btn"+counter);
  addButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("id","template_check#btn"+counter);
  addButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("id","template_radio#btn"+counter);
  addButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("id","template_file#btn"+counter);
  addButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("onclick","templateOpenAfter(this.id)");
  addButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("onclick","templateCheckboxAfter(this.id)");
  addButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("onclick","templateRadioAfter(this.id)");
  addButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("onclick","templateAfterFileQuestion(this.id)");
  containerDiv.appendChild(addButton);

  containerDiv.appendChild(getSpace());

  var deleteButton = document.createElement("a");
  deleteButton.setAttribute("type","button");
  deleteButton.setAttribute("class","btn btn-primary");
  deleteButton.setAttribute("id","delete_btn"+counter);
  deleteButton.setAttribute("onclick", "deleteTemplateQuestion(this.id)");
  deleteButton.innerHTML=" X ";
  containerDiv.appendChild(deleteButton);

  return containerDiv;
}

// Functions used for the creation of the questions of a form
// Open questions
function firstOpen(){
    counter++;

    if(n_question < 0)
      n_question = 0;
    n_question++;

    var parentDiv = document.getElementById("parentDiv");

    var card = createCard();
    parentDiv.appendChild(card);
    var textareaDiv = getTextareaDiv(card);
    var requiredDiv = getRequiredCheckboxDiv(card);
    var buttonsDiv = getButtonsDiv(card);
    
    textareaDiv.appendChild(createTextarea(counter+" open"));

    requiredDiv.appendChild(createSwitchForRequired());

    buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function openAfter(idA){
  counter++;
  n_question++;
  var div = getDivId(idA);
  var card = createDiv(div);

  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);

  textareaDiv.appendChild(createTextarea(counter + " open"));

  requiredDiv.appendChild(createSwitchForRequired());
  
  buttonsDiv.appendChild(createAddAndDeleteButtons());
}

// Checkbox questions
function firstCheckbox(){
		counter++;
    checkcounter++;
    if(n_question < 0)
      n_question = 0;
    n_question++;
    
    var parentDiv = document.getElementById("parentDiv");

    var card = createCard();
    parentDiv.appendChild(card);
    var textareaDiv = getTextareaDiv(card);
    var requiredDiv = getRequiredCheckboxDiv(card);
    var buttonsDiv = getButtonsDiv(card);

    textareaDiv.appendChild(createTextarea(counter + " checkbox"));

    addLine(textareaDiv);

    var row = document.createElement("div");
    row.setAttribute("class", "row");
    //row.setAttribute("id", "checkboxOptionContainer " + counter);
    textareaDiv.appendChild(row);

    var emptyLeftDiv = document.createElement("div");
    emptyLeftDiv.setAttribute("class", "col-1");
    row.appendChild(emptyLeftDiv);
    
    row.appendChild(createFirstCheckboxOption());

    var emptyRightDiv = document.createElement("div");
    emptyRightDiv.setAttribute("class", "col-1");
    row.appendChild(emptyRightDiv);

    requiredDiv.appendChild(createSwitchForRequired());

    buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function checkboxAfter(idA){
		counter++;
    checkcounter++;
    n_question++;
    
    var div = getDivId(idA);
  	var card = createDiv(div);

    var textareaDiv = getTextareaDiv(card);
    var requiredDiv = getRequiredCheckboxDiv(card);
    var buttonsDiv = getButtonsDiv(card);

    textareaDiv.appendChild(createTextarea(counter + " checkbox"));

    addLine(textareaDiv);

    var row = document.createElement("div");
    row.setAttribute("class", "row");
    //row.setAttribute("id", "checkboxOptionContainer " + counter);
    textareaDiv.appendChild(row);

    var emptyLeftDiv = document.createElement("div");
    emptyLeftDiv.setAttribute("class", "col-1");
    row.appendChild(emptyLeftDiv);
    
    row.appendChild(createFirstCheckboxOption());

    var emptyRightDiv = document.createElement("div");
    emptyRightDiv.setAttribute("class", "col-1");
    row.appendChild(emptyRightDiv);

    requiredDiv.appendChild(createSwitchForRequired());

    buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function createFirstCheckboxOption(){
  var div = document.createElement("div");
  div.setAttribute("class", "form-check col");
  //div.setAttribute("id", "containerCheckboxOptions " + counter);

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  row.setAttribute("id", "checkboxRow " + checkcounter);
  div.appendChild(row);

  var checkboxDiv = document.createElement("div");
  checkboxDiv.setAttribute("class", "col-10 form-check");
  row.appendChild(checkboxDiv);

  var addButtonDiv = document.createElement("div");
  addButtonDiv.setAttribute("class", "col-2");
  row.appendChild(addButtonDiv);

  var checkbox = document.createElement("input");
  checkbox.setAttribute("class", "form-check-input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "check"+checkcounter);
  checkbox.setAttribute("name",counter+" checkbox");
  checkbox.disabled = true;
  checkboxDiv.appendChild(checkbox);
  
  var textarea = document.createElement("textarea");
  textarea.setAttribute("class", "form-control");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute('id', 'chechtext'+checkcounter);
  textarea.setAttribute("name",counter+" checkboxtext " + checkcounter);
  checkboxDiv.appendChild(textarea);
  
  var addButton = document.createElement("button");
  addButton.setAttribute('type', 'button');
  addButton.setAttribute("class","btn btn-secondary btn-sm");
  addButton.setAttribute("onclick","addcheck("+checkcounter+")");
  addButton.setAttribute("id", "addCheck "+checkcounter);
  addButton.innerHTML=" + ";
  addButtonDiv.appendChild(addButton);

  var deleteCheck = document.createElement("button");
  deleteCheck.setAttribute('type', 'button');
  deleteCheck.setAttribute("class","btn btn-secondary btn-sm");
  deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");
  deleteCheck.setAttribute("id", "deleteCheck "+checkcounter);
  deleteCheck.innerHTML=" X ";
  deleteCheck.style.visibility = "hidden";
  addButtonDiv.appendChild(deleteCheck);

  return div;
}

function addcheck(n){
	
  checkcounter++;
  console.log(n);
	var optionsContainer = document.getElementById('addCheck ' + n).parentElement.parentElement.parentElement;

  var questionID = optionsContainer.id.split(" ")[1];
  
  var addButton = document.getElementById("addCheck " + n);
  var deleteButton = document.getElementById("deleteCheck " + n);
  
  var newAddButton = addButton.cloneNode(true);
  var newDeleteButton = deleteButton.cloneNode(true);

  addButton.remove();
  deleteButton.style.visibility = "visible";

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  row.setAttribute("id", "checkboxRow " + checkcounter);
  optionsContainer.appendChild(row);

  var checkboxDiv = document.createElement("div");
  checkboxDiv.setAttribute("class", "col-10 form-check");
  row.appendChild(checkboxDiv);

  var buttonsDiv = document.createElement("div");
  buttonsDiv.setAttribute("class", "col-2");
  row.appendChild(buttonsDiv);

  var checkbox = document.createElement("input");
  checkbox.setAttribute("class", "form-check-input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "check" + checkcounter);
  checkbox.setAttribute("name", questionID + " checkbox");
  checkbox.disabled = true;
  checkboxDiv.appendChild(checkbox);

  var textarea = document.createElement("textarea");
  textarea.setAttribute("class", "form-control");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("id", "checktext" + checkcounter);
  textarea.setAttribute("name", questionID + " checkboxtext " + checkcounter);
  checkboxDiv.appendChild(textarea);

  newAddButton.setAttribute("id","addCheck "+checkcounter);
  newAddButton.setAttribute("onclick","addcheck("+checkcounter+")");
  newDeleteButton.setAttribute("id","deleteCheck "+checkcounter);
  newDeleteButton.setAttribute("onclick","deleteCheck("+checkcounter+")");

  buttonsDiv.appendChild(newAddButton);
  buttonsDiv.appendChild(newDeleteButton);
}

function deleteCheck(n){
  document.getElementById("checkboxRow " + n).remove();
}

// Radio button questions
function firstRadio(){
  counter++;
  radiocounter++;
  if(n_question < 0)
    n_question = 0;
  n_question++;
  
  var parentDiv = document.getElementById("parentDiv");

  var card = createCard();
  parentDiv.appendChild(card);
  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);

  textareaDiv.appendChild(createTextarea(counter + " radio"));

  addLine(textareaDiv);

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  textareaDiv.appendChild(row);

  var emptyLeftDiv = document.createElement("div");
  emptyLeftDiv.setAttribute("class", "col-1");
  row.appendChild(emptyLeftDiv);
  
  row.appendChild(createFirstRadioOption());

  var emptyRightDiv = document.createElement("div");
  emptyRightDiv.setAttribute("class", "col-1");
  row.appendChild(emptyRightDiv);

  requiredDiv.appendChild(createSwitchForRequired());

  buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function radioAfter(idA){
  counter++;
  radiocounter++;
  n_question++;

  var div = getDivId(idA);
  var card = createDiv(div);

  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);

  textareaDiv.appendChild(createTextarea(counter + " radio"));

  addLine(textareaDiv);

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  textareaDiv.appendChild(row);

  var emptyLeftDiv = document.createElement("div");
  emptyLeftDiv.setAttribute("class", "col-1");
  row.appendChild(emptyLeftDiv);
  
  row.appendChild(createFirstRadioOption());

  var emptyRightDiv = document.createElement("div");
  emptyRightDiv.setAttribute("class", "col-1");
  row.appendChild(emptyRightDiv);

  requiredDiv.appendChild(createSwitchForRequired());

  buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function createFirstRadioOption(){
  var div = document.createElement("div");
  div.setAttribute("class", "form-check col");
  div.setAttribute("id", "containerRadioOptions " + counter);

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  row.setAttribute("id", "radioRow " + radiocounter);
  div.appendChild(row);

  var checkboxDiv = document.createElement("div");
  checkboxDiv.setAttribute("class", "col-10 form-check");
  row.appendChild(checkboxDiv);

  var addButtonDiv = document.createElement("div");
  addButtonDiv.setAttribute("class", "col-2");
  row.appendChild(addButtonDiv);

  var checkbox = document.createElement("input");
  checkbox.setAttribute("class", "form-check-input");
  checkbox.setAttribute("type", "radio");
  checkbox.setAttribute("id", "radio"+radiocounter);
  checkbox.setAttribute("name",counter+" radio "+radiocounter);
  checkbox.disabled = true;
  checkboxDiv.appendChild(checkbox);
  
  var textarea = document.createElement("textarea");
  textarea.setAttribute("class", "form-control");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute('id', 'radiotext'+radiocounter);
  textarea.setAttribute("name",counter+" radiobtntext "+radiocounter);
  checkboxDiv.appendChild(textarea);
  
  var addButton = document.createElement("button");
  addButton.setAttribute('type', 'button');
  addButton.setAttribute("class","btn btn-secondary btn-sm");
  addButton.setAttribute("onclick","addRadio("+radiocounter+")");
  addButton.setAttribute("id", "addRadio "+radiocounter);
  addButton.innerHTML=" + ";
  addButtonDiv.appendChild(addButton);


  var deleteCheck = document.createElement("button");
  deleteCheck.setAttribute('type', 'button');
  deleteCheck.setAttribute("class","btn btn-secondary btn-sm");
  deleteCheck.setAttribute("onclick","deleteRadio("+radiocounter+")");
  deleteCheck.setAttribute("id", "deleteRadio "+radiocounter);
  deleteCheck.innerHTML=" X ";
  deleteCheck.style.visibility = "hidden";
  addButtonDiv.appendChild(deleteCheck);

  return div;
}

function addRadio(n){
	
  radiocounter++;

	var optionsContainer = document.getElementById('addRadio '+n).parentElement.parentElement.parentElement;

  var questionID = optionsContainer.id.split(" ")[1];
  
  var addButton = document.getElementById("addRadio " + n);
  var deleteButton = document.getElementById("deleteRadio " + n);
  
  var newAddButton = addButton.cloneNode(true);
  var newDeleteButton = deleteButton.cloneNode(true);

  addButton.remove();
  deleteButton.style.visibility = "visible";

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  row.setAttribute("id", "radioRow " + radiocounter);
  optionsContainer.appendChild(row);

  var radioDiv = document.createElement("div");
  radioDiv.setAttribute("class", "col-10 form-check");
  row.appendChild(radioDiv);

  var buttonsDiv = document.createElement("div");
  buttonsDiv.setAttribute("class", "col-2");
  row.appendChild(buttonsDiv);

  var radio = document.createElement("input");
  radio.setAttribute("class", "form-check-input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("id", "radio" + radiocounter);
  radio.setAttribute("name", questionID + " radio " + radiocounter);
  radio.disabled = true;
  radioDiv.appendChild(radio);

  var textarea = document.createElement("textarea");
  textarea.setAttribute("class", "form-control");
  textarea.setAttribute("rows", "1");
  textarea.setAttribute("id", "radiotext" + radiocounter);
  textarea.setAttribute("name", questionID + " radiobtntext " + radiocounter);
  radioDiv.appendChild(textarea);

  newAddButton.setAttribute("id","addRadio "+radiocounter);
  newAddButton.setAttribute("onclick","addRadio("+radiocounter+")");
  newDeleteButton.setAttribute("id","deleteRadio "+radiocounter);
  newDeleteButton.setAttribute("onclick","deleteRadio("+radiocounter+")");

  buttonsDiv.appendChild(newAddButton);
  buttonsDiv.appendChild(newDeleteButton);

	/*var container = document.getElementById('addRadio'+n).parentElement.parentElement.parentElement;

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
  
  document.getElementById("deleteRadio"+n).style.visibility = "visible";*/
}

function deleteRadio(n){
  document.getElementById("radioRow " + n).remove();
}

// File upload question
function firstFileQuestion(){
  counter++;
  if(n_question < 0)
    n_question = 0;
  n_question++;

  var parentDiv = document.getElementById("parentDiv");

  var card = createCard();
  parentDiv.appendChild(card);
  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);
  var containerDiv = getCardContainer(card);
  
  textareaDiv.appendChild(createTextarea(counter+" fileText"));
  textareaDiv.appendChild(document.createElement("br"));
  textareaDiv.appendChild(createFileInput())

  requiredDiv.appendChild(createSwitchForRequired());

  buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function afterFileQuestion(idA){
  counter++;
  n_question++;

  var div = getDivId(idA);
  var card = createDiv(div);

  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);
  var containerDiv = getCardContainer(card);

  textareaDiv.appendChild(createTextarea(counter + " fileText"));
  textareaDiv.appendChild(document.createElement("br"));
  textareaDiv.appendChild(createFileInput())

  requiredDiv.appendChild(createSwitchForRequired());
  
  buttonsDiv.appendChild(createAddAndDeleteButtons());

}

function createFileInput(){
  var row = document.createElement("div");
  row.setAttribute("class", "row");

  var fileDiv = document.createElement("div");
  fileDiv.setAttribute("class", "col-auto");
  row.appendChild(fileDiv);

  var emptyDiv = document.createElement("div");
  emptyDiv.setAttribute("class", "col-auto");
  row.appendChild(emptyDiv);

  var inputFile = document.createElement("input");
  inputFile.setAttribute("class", "form-control");
  inputFile.setAttribute("type", "file");
  /*inputFile.setAttribute("id", "formFile");
  inputFile.setAttribute("name", counter + " file");*/
  inputFile.disabled = true;
  fileDiv.appendChild(inputFile);

  return row;
}

// Function for the creation of the send button

function createSendButton(){
  var questionForm = document.getElementById("questionForm");

  var sendButton = document.createElement("button");
  sendButton.setAttribute("type", "submit");
  sendButton.setAttribute("class", "btn btn-primary");
  sendButton.setAttribute("id", "sendButton")
  sendButton.innerHTML = " Submit ";

  questionForm.appendChild(sendButton);
  //questionForm.insertBefore(document.createElement("br"), document.getElementById("sendButton"));
}

// Functions called by the onclick trigger of the DOM elements for the creation or modification of the questions of a template

function createTemplateOpenQuestion(idA){
  createButton = createQButton();
	if(idA == 'open_btn'){
  	b = cloneBG();
    createSaveButton();
    removeBG();
    templateFirstOpen();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question < 0)
      n_question = t;
  	templateOpenAfter(idA);
  }
}

function createTemplateCheckboxQuestion(idA){
  createButton = createQButton();
	if(idA == 'check_btn'){
  	b = cloneBG();
    createSaveButton();
    removeBG();
    templateFirstCheckbox();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question < 0)
      n_question = t;
  	templateCheckboxAfter(idA);
  }
}

function createTemplateRadioQuestion(idA){
  createButton = createQButton();
	if(idA == 'radio_btn'){
  	b = cloneBG();
    createSaveButton();
    removeBG();
    templateFirstRadio();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question < 0)
      n_question = t;
  	templateRadioAfter(idA);
  }
}

function createTemplateFileQuestion(idA){
  createButton = createQButton();
	if(idA == 'file_btn'){
  	b = cloneBG();
    createSaveButton();
    removeBG();
    templateFirstFileQuestion();
  }
  else{
    var t = $('#n').data().name;
    if(counter == 0)
      counter = t;
    if(n_question < 0)
      n_question = t;
  	templateAfterFileQuestion(idA);
  }
}

function deleteTemplateQuestion(idBtn){
  /*if(n_question){
    var divToDelete = document.getElementById(idBtn).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    divToDelete.remove();
    n_question--;
  }
  if(!n_question){
    document.getElementById("sendButton").previousSibling.remove();
    document.getElementById("sendButton").remove();
    var div = document.getElementById("rcorners");
    var form = div.childNodes[1];
    var divBtn = form.childNodes[11];
    form.insertBefore(b,divBtn);
  }*/

  if(n_question < 0)
    n_question = $('#n').data().name;
  var divToDelete = document.getElementById(idBtn).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

  divToDelete.remove();
  n_question--;
  if(n_question == 0){
    createQuestionGroupButton();
    document.getElementById("saveButton").remove();
  }
}
// Functions used for the creation of the questions of a template

// Open questions
function templateFirstOpen(){
  counter++;

    if(n_question < 0)
      n_question = 0;
    n_question++;

    var parentDiv = document.getElementById("parentDiv");

    var card = createCard();
    parentDiv.appendChild(card);
    var textareaDiv = getTextareaDiv(card);
    var requiredDiv = getRequiredCheckboxDiv(card);
    var buttonsDiv = getButtonsDiv(card);
    
    textareaDiv.appendChild(createTextarea(counter+" open"));

    requiredDiv.appendChild(createSwitchForRequired());

    buttonsDiv.appendChild(createTemplateAddAndDeleteButtons());
}

function templateOpenAfter(idA){

  counter++;
  n_question++;
  var div = getDivId(idA);
  var card = createDiv(div);

  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);

  textareaDiv.appendChild(createTextarea(counter + " open"));

  requiredDiv.appendChild(createSwitchForRequired());
  
  buttonsDiv.appendChild(createAddAndDeleteButtons());
/*



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
  newButton.childNodes[1].childNodes[0].childNodes[0].setAttribute("onclick","createTemplateOpenQuestion(this.id)");
  newButton.childNodes[1].childNodes[1].childNodes[0].setAttribute("onclick","createTemplateCheckboxQuestion(this.id)");
  newButton.childNodes[1].childNodes[2].childNodes[0].setAttribute("onclick","createTemplateRadioQuestion(this.id)");
  newButton.childNodes[1].childNodes[3].childNodes[0].setAttribute("onclick","createTemplateFileQuestion(this.id)");
  row.childNodes[1].appendChild(newButton);

  row.childNodes[1].appendChild(getSpace());

  var deleteButton = document.createElement("a");
  deleteButton.setAttribute("type","button");
  deleteButton.setAttribute("class","btn btn-primary");
  deleteButton.setAttribute("id","delete_btn"+counter);
  deleteButton.setAttribute("onclick","deleteTemplateQuestion(this.id)");
  deleteButton.innerHTML=" X ";
  row.childNodes[1].appendChild(deleteButton);

  var divider = document.createElement("hr");
  divider.setAttribute("class","solid");
  container.appendChild(divider);*/
}

// Checkbox questions
function templateFirstCheckbox(){
  counter++;
    checkcounter++;
    if(n_question < 0)
      n_question = 0;
    n_question++;
    
    var parentDiv = document.getElementById("parentDiv");

    var card = createCard();
    parentDiv.appendChild(card);
    var textareaDiv = getTextareaDiv(card);
    var requiredDiv = getRequiredCheckboxDiv(card);
    var buttonsDiv = getButtonsDiv(card);

    textareaDiv.appendChild(createTextarea(counter + " checkbox"));

    addLine(textareaDiv);

    var row = document.createElement("div");
    row.setAttribute("class", "row");
    //row.setAttribute("id", "checkboxOptionContainer " + counter);
    textareaDiv.appendChild(row);

    var emptyLeftDiv = document.createElement("div");
    emptyLeftDiv.setAttribute("class", "col-1");
    row.appendChild(emptyLeftDiv);
    
    row.appendChild(createFirstCheckboxOption());

    var emptyRightDiv = document.createElement("div");
    emptyRightDiv.setAttribute("class", "col-1");
    row.appendChild(emptyRightDiv);

    requiredDiv.appendChild(createSwitchForRequired());

    buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function templateCheckboxAfter(idA){
  counter++;
    checkcounter++;
    n_question++;
    
    var div = getDivId(idA);
  	var card = createDiv(div);

    var textareaDiv = getTextareaDiv(card);
    var requiredDiv = getRequiredCheckboxDiv(card);
    var buttonsDiv = getButtonsDiv(card);

    textareaDiv.appendChild(createTextarea(counter + " checkbox"));

    addLine(textareaDiv);

    var row = document.createElement("div");
    row.setAttribute("class", "row");
    //row.setAttribute("id", "checkboxOptionContainer " + counter);
    textareaDiv.appendChild(row);

    var emptyLeftDiv = document.createElement("div");
    emptyLeftDiv.setAttribute("class", "col-1");
    row.appendChild(emptyLeftDiv);
    
    row.appendChild(createFirstCheckboxOption());

    var emptyRightDiv = document.createElement("div");
    emptyRightDiv.setAttribute("class", "col-1");
    row.appendChild(emptyRightDiv);

    requiredDiv.appendChild(createSwitchForRequired());

    buttonsDiv.appendChild(createAddAndDeleteButtons());
}

// Radio button questions
function templateFirstRadio(){
  
  counter++;
  radiocounter++;
  if(n_question < 0)
    n_question = 0;
  n_question++;
  
  var parentDiv = document.getElementById("parentDiv");

  var card = createCard();
  parentDiv.appendChild(card);
  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);

  textareaDiv.appendChild(createTextarea(counter + " radio"));

  addLine(textareaDiv);

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  textareaDiv.appendChild(row);

  var emptyLeftDiv = document.createElement("div");
  emptyLeftDiv.setAttribute("class", "col-1");
  row.appendChild(emptyLeftDiv);
  
  row.appendChild(createFirstRadioOption());

  var emptyRightDiv = document.createElement("div");
  emptyRightDiv.setAttribute("class", "col-1");
  row.appendChild(emptyRightDiv);

  requiredDiv.appendChild(createSwitchForRequired());

  buttonsDiv.appendChild(createAddAndDeleteButtons());
}

function templateRadioAfter(idA){
  counter++;
  radiocounter++;
  n_question++;

  var div = getDivId(idA);
  var card = createDiv(div);

  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);

  textareaDiv.appendChild(createTextarea(counter + " radio"));

  addLine(textareaDiv);

  var row = document.createElement("div");
  row.setAttribute("class", "row");
  textareaDiv.appendChild(row);

  var emptyLeftDiv = document.createElement("div");
  emptyLeftDiv.setAttribute("class", "col-1");
  row.appendChild(emptyLeftDiv);
  
  row.appendChild(createFirstRadioOption());

  var emptyRightDiv = document.createElement("div");
  emptyRightDiv.setAttribute("class", "col-1");
  row.appendChild(emptyRightDiv);

  requiredDiv.appendChild(createSwitchForRequired());

  buttonsDiv.appendChild(createAddAndDeleteButtons());
}

// File upload questions
function templateFirstFileQuestion(){
  counter++;
  if(n_question < 0)
    n_question = 0;
  n_question++;

  var parentDiv = document.getElementById("parentDiv");

  var card = createCard();
  parentDiv.appendChild(card);
  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);
  var containerDiv = getCardContainer(card);
  
  textareaDiv.appendChild(createTextarea(counter+" fileText"));

  requiredDiv.appendChild(createSwitchForRequired());

  buttonsDiv.appendChild(createAddAndDeleteButtons());

  containerDiv.appendChild(createFileInput());
}

function templateAfterFileQuestion(idA){
  counter++;
  n_question++;

  var div = getDivId(idA);
  var card = createDiv(div);

  var textareaDiv = getTextareaDiv(card);
  var requiredDiv = getRequiredCheckboxDiv(card);
  var buttonsDiv = getButtonsDiv(card);
  var containerDiv = getCardContainer(card);

  textareaDiv.appendChild(createTextarea(counter + " fileText"));

  requiredDiv.appendChild(createSwitchForRequired());
  
  buttonsDiv.appendChild(createAddAndDeleteButtons());

  containerDiv.appendChild(createFileInput());
}

// Function used for the creatio of the Save button used for saving the modification of a template
function createSaveButton(){
  var form = document.getElementById("saveForm");

  var saveButton = document.createElement("button");
  saveButton.setAttribute("type", "submit");
  saveButton.setAttribute("class", "btn btn-primary");
  saveButton.setAttribute("id", "saveButton")
  saveButton.innerHTML = " Save ";

  form.appendChild(saveButton);
}

// Function used for the creation of a new first question, used when in a template all the questions have been deleted
function createQuestionGroupButton(){
  var div = document.createElement("div");
  div.setAttribute("class", "btn-group");
  div.setAttribute("id", "createButton");
  document.getElementById("saveForm").insertBefore(div,document.getElementById("saveButton"));

  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-primary dropdown-toggle");
  button.setAttribute("data-bs-toggle", "dropdown");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = " Create new question ";
  div.appendChild(button);

  var span = document.createElement("span");
  span.setAttribute("class", "caret");
  button.appendChild(span);

  var ul = document.createElement("ul");
  ul.setAttribute("class", "dropdown-menu");
  div.appendChild(ul);

  var liOpenQuestion = document.createElement("li");
  ul.appendChild(liOpenQuestion);

  var aOpenQuestion = document.createElement("a");
  aOpenQuestion.setAttribute("class", "dropdown-item");
  aOpenQuestion.setAttribute("id", "open_btn");
  aOpenQuestion.setAttribute("onclick", "createTemplateOpenQuestion(this.id)");
  aOpenQuestion.setAttribute("href", "#");
  aOpenQuestion.innerHTML = "Open";
  liOpenQuestion.appendChild(aOpenQuestion);

  var liCheckboxQuestion = document.createElement("li");
  ul.appendChild(liCheckboxQuestion);

  var aCheckboxQuestion = document.createElement("a");
  aCheckboxQuestion.setAttribute("class", "dropdown-item");
  aCheckboxQuestion.setAttribute("id", "check_btn");
  aCheckboxQuestion.setAttribute("onclick", "createTemplateCheckboxQuestion(this.id)");
  aCheckboxQuestion.setAttribute("href", "#");
  aCheckboxQuestion.innerHTML = "Checkbox";
  liCheckboxQuestion.appendChild(aCheckboxQuestion);

  var liRadioQuestion = document.createElement("li");
  ul.appendChild(liRadioQuestion);

  var aRadioQuestion = document.createElement("a");
  aRadioQuestion.setAttribute("class", "dropdown-item");
  aRadioQuestion.setAttribute("id", "radio_btn");
  aRadioQuestion.setAttribute("onclick", "createTemplateRadioQuestion(this.id)");
  aRadioQuestion.setAttribute("href", "#");
  aRadioQuestion.innerHTML = "Radio";
  liRadioQuestion.appendChild(aRadioQuestion);

  var liFileQuestion = document.createElement("li");
  ul.appendChild(liFileQuestion);

  var aFileQuestion = document.createElement("a");
  aFileQuestion.setAttribute("class", "dropdown-item");
  aFileQuestion.setAttribute("id", "file_btn");
  aFileQuestion.setAttribute("onclick", "createTemplateFileQuestion(this.id)");
  aFileQuestion.setAttribute("href", "#");
  aFileQuestion.innerHTML = "File";
  liFileQuestion.appendChild(aFileQuestion);
}