// Variable used to identify questions
var counter = 0;
var checkcounter = 0;
var radiocounter = 0;
var n_question = -1;
var createButton;
var b;

// Functions for removing the button for the creation of the first questions
function removeBG(){
	  var b = document.getElementById("createButton");
    b.remove();
}

// Functions for cloning the button for the creation of the first questions
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
    btn.setAttribute("class", "btn btn-primary dropdown-toggle rounded-pill");
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
    a1.innerHTML=" Aperta ";
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

// Function for the creation of the div container where the new question will be located (it is used for the no-first question, but when another one is already existing)
function createDiv(idDiv){
	var parentDiv = document.getElementById("parentDiv");

  var card = createCard()
  
  var actualDiv = document.getElementById(idDiv);
  var nextDiv = actualDiv.nextSibling;
  if(nextDiv != null && nextDiv.nodeName == '#text'){
    nextDiv = nextDiv.nextSibling;
  }
  
  parentDiv.insertBefore(card,nextDiv);
  
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

// Function used for the creation of a card
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

// Function for the creation of the textArea of every question
function createTextarea(name){
var textarea = document.createElement("textarea");
textarea.setAttribute("rows", "1");
textarea.setAttribute("class", "form-control");
textarea.setAttribute('name', name);
textarea.required = true;
return textarea;
}

// Function that creates a checkBox to identify if a question is required or not
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
label.innerHTML = 'Obbligatoria';
div.appendChild(label);

return div;
}

// Function that creates the button(add,delete) for every question
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
deleteButton.setAttribute("class","btn btn-primary rounded-pill");
deleteButton.setAttribute("id","delete_btn"+counter);
deleteButton.setAttribute("onclick", "deleteQuestion(this.id)");
deleteButton.innerHTML=" X ";
containerDiv.appendChild(deleteButton);

return containerDiv;
}

// Function that creates the button(add,delete) for every question in a template
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
    deleteButton.setAttribute("class","btn btn-primary rounded-pill");
    deleteButton.setAttribute("id","delete_btn"+counter);
    deleteButton.setAttribute("onclick", "deleteTemplateQuestion(this.id)");
    deleteButton.innerHTML=" X ";
    containerDiv.appendChild(deleteButton);
  
    return containerDiv;
}

//TODO:Ricordati di chiedere a tommi
// Create the openQuestion for the template
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

// Create the checkboxQuestion for the template
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

// Create the radioQuestion for the template
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

// Create the fileQuestion for the template
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

// Functions for deleting the question inside a template

function deleteTemplateQuestion(idBtn){  
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

function deleteQuestion(idBtn){
    if(n_question < 0){
        n_question = $('#n').data().name;
    }
    if(n_question){
        var divToDelete = document.getElementById(idBtn).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        divToDelete.remove();
        n_question--;
    }
    if(!n_question){
        document.getElementById("saveForm").insertBefore(b,document.getElementById("sendButton"));
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

// Create a open question after another type of question
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

// Create a open checkbox after another type of question
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

// Function used for add the first check of a checkBox Question
function createFirstCheckboxOption(){
var div = document.createElement("div");
div.setAttribute("class", "form-check col");

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
textarea.required = true;
checkboxDiv.appendChild(textarea);

var addButton = document.createElement("button");
addButton.setAttribute('type', 'button');
addButton.setAttribute("class","btn btn-secondary btn-sm rounded-pill");
addButton.setAttribute("onclick","addcheck("+checkcounter+")");
addButton.setAttribute("id", "addCheck "+checkcounter);
addButton.innerHTML=" + ";
addButtonDiv.appendChild(addButton);

var deleteCheck = document.createElement("button");
deleteCheck.setAttribute('type', 'button');
deleteCheck.setAttribute("class","btn btn-secondary btn-sm rounded-pill");
deleteCheck.setAttribute("onclick","deleteCheck("+checkcounter+")");
deleteCheck.setAttribute("id", "deleteCheck "+checkcounter);
deleteCheck.innerHTML=" X ";
deleteCheck.style.visibility = "hidden";
addButtonDiv.appendChild(deleteCheck);

return div;
}

// Function used for add the first check of a checkBox Question
function addcheck(n){
    
checkcounter++;
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
textarea.required = true;
checkboxDiv.appendChild(textarea);

newAddButton.setAttribute("id","addCheck "+checkcounter);
newAddButton.setAttribute("onclick","addcheck("+checkcounter+")");
newDeleteButton.setAttribute("id","deleteCheck "+checkcounter);
newDeleteButton.setAttribute("onclick","deleteCheck("+checkcounter+")");

buttonsDiv.appendChild(newAddButton);
buttonsDiv.appendChild(newDeleteButton);
}

// Delete a checkBox option
function deleteCheck(n){
document.getElementById("checkboxRow " + n).remove();
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

// Create a radio question after another type of question
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

// Function used for add the first radioOption of a radio Question
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
textarea.required = true;
checkboxDiv.appendChild(textarea);

var addButton = document.createElement("button");
addButton.setAttribute('type', 'button');
addButton.setAttribute("class","btn btn-secondary btn-sm rounded-pill");
addButton.setAttribute("onclick","addRadio("+radiocounter+")");
addButton.setAttribute("id", "addRadio "+radiocounter);
addButton.innerHTML=" + ";
addButtonDiv.appendChild(addButton);


var deleteCheck = document.createElement("button");
deleteCheck.setAttribute('type', 'button');
deleteCheck.setAttribute("class","btn btn-secondary btn-sm rounded-pill");
deleteCheck.setAttribute("onclick","deleteRadio("+radiocounter+")");
deleteCheck.setAttribute("id", "deleteRadio "+radiocounter);
deleteCheck.innerHTML=" X ";
deleteCheck.style.visibility = "hidden";
addButtonDiv.appendChild(deleteCheck);

return div;
}

// Add a radio option after the first
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
textarea.required = true;
radioDiv.appendChild(textarea);

newAddButton.setAttribute("id","addRadio "+radiocounter);
newAddButton.setAttribute("onclick","addRadio("+radiocounter+")");
newDeleteButton.setAttribute("id","deleteRadio "+radiocounter);
newDeleteButton.setAttribute("onclick","deleteRadio("+radiocounter+")");

buttonsDiv.appendChild(newAddButton);
buttonsDiv.appendChild(newDeleteButton);
}

// Delete a radio option
function deleteRadio(n){
document.getElementById("radioRow " + n).remove();
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

// Create a file question after another type of question
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

// Create a div for the upload of a file
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
    inputFile.disabled = true;
    fileDiv.appendChild(inputFile);
  
    return row;
}

// Function used for the creation of the Save button used for saving the modification of a template
function createSaveButton(){
var form = document.getElementById("saveForm");

var saveButton = document.createElement("button");
saveButton.setAttribute("type", "submit");
saveButton.setAttribute("class", "btn btn-primary rounded-pill");
saveButton.setAttribute("id", "saveButton")
saveButton.innerHTML = " Salva ";

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
button.setAttribute("class", "btn btn-primary dropdown-toggle rounded-pill");
button.setAttribute("data-bs-toggle", "dropdown");
button.setAttribute("aria-expanded", "false");
button.innerHTML = " Crea una nuova domanda ";
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
aOpenQuestion.innerHTML = "Aperta";
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