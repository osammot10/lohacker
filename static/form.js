// Variable used to identify questions, checkbox and radio options and buttons
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

// Function for the creation of the card container where the new question or answer will be located 
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

// Function used for getting the div that will contain the textarea of a card
function getTextareaDiv(card){
	return card.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
}

// Function used for getting the div that will contain the checkbox switch of a card
function getRequiredCheckboxDiv(card){
	return card.childNodes[1].childNodes[0].childNodes[0].childNodes[1];
}

// Function used for getting the div that will containt the buttons of a card
function getButtonsDiv(card){
	return card.childNodes[1].childNodes[0].childNodes[0].childNodes[2];
}

// Function used for getting the container div of a card
function getCardContainer(card){
	return card.childNodes[1].childNodes[0];
}

// Function for the creation of the text area
function createTextarea(name){
	var textarea = document.createElement("textarea");
	textarea.setAttribute("rows", "1");
	textarea.setAttribute("class", "form-control");
	textarea.setAttribute('name', name);
	textarea.required = true;
	return textarea;
}
 
// Function to set the checkboxes to required
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
	label.innerHTML = 'Obblicatoria';
	div.appendChild(label);

	return div;
}

// Function for the creation of the buttons of every new questions
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

// Functions called by the onclick trigger of the DOM elements for the creation of every questions of a new form
// Create the open question for the form
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
      if(n_question < 0)
        n_question = t;
        openAfter(idA);
    }
}

// Create the checkboxQuestion for the form
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
		if(n_question < 0)
		n_question = t;
		checkboxAfter(idA);
	}
}

// Create the radioQuestion for the form
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
		if(n_question < 0)
		n_question = t;
		radioAfter(idA);
	}
}

// Create the fileQuestion for the form
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
		if(n_question < 0)
		n_question = t;
		afterFileQuestion(idA);
	}
}

// General Function for deleting a question
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
        document.getElementById("questionForm").insertBefore(b,document.getElementById("sendButton"));
        document.getElementById("sendButton").remove();
    }
}

// Functions used for the creation of the questions of a form, the first.... function is used for the first question of the form 

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

// Create a open question after another type of question
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

// Create a CheckBox Question
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

// add a checkBox option after the first
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

// Create Radio questions
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

// Create a radio question after another type of question
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

// Create a file question after another type of question
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

// Function for the creation of the send button
function createSendButton(){
	var questionForm = document.getElementById("questionForm");

	var sendButton = document.createElement("button");
	sendButton.setAttribute("type", "submit");
	sendButton.setAttribute("class", "btn btn-primary rounded-pill");
	sendButton.setAttribute("id", "sendButton")
	sendButton.innerHTML = " Crea ";

	questionForm.appendChild(sendButton);
}