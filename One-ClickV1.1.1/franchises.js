p ="SENDSTUFF"// requesting the password saved in background script
chrome.runtime.sendMessage({type: p}, function(response){//requests a response back from the background page
    credString = response // for some reason RESPONSE only exists in this function and you cannot remove it so I have to do all of the code in here. Not a big problem but another strange error
    var res = credString.split("\ ");

    var creds = document.getElementsByTagName("input")// find username and password input forms
    creds[0].value = res[0]// set username
    creds[1].value = res[1]//set password
    fk = document.getElementsByClassName("form-horizontal")// get form to submit
    HTMLFormElement.prototype.submit.call(fk[0])// this is the only way to submit this form because it is so confusing  I found here:
    //https://trackjs.com/blog/when-form-submit-is-not-a-function/
});