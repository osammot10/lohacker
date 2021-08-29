// Function used for copy and paste the content of the previous element, of the element with the id 'id' passed as parameter, into the block notes of the user
function copy(id){
  if(id == "idInput"){
    var copyText = document.getElementById("idInputText");
  }
  else{
    var copyText = document.getElementById("linkInputText");
  }  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
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