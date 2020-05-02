var x = document.getElementsByClassName("actions");// find all actions classes on the page
y = x[1].childNodes[1].href;// find the client link on the first page
if (y!= null){// if the link exists on this page start the process of moving tabs and sending links
    //console.log(y)
    
    //window.open(y,"_self") // old way to change the url of the tab using javascript     I am doing it all through chromes specific ways
    chrome.runtime.sendMessage({type: y});// this sends the url to the background script and receives back nothing. It is technically synchronys, but since i am not doing anything with the null value that is sent back it is acting as asynchronous
}



