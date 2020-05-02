var newx = document.getElementsByTagName("td")// find all table data spots
//console.log(newx)
for (let item of newx) {// there are a lot of td tags and these could vary page to page so I needed to look through them for the actual tag name
    if (item.innerHTML.toLowerCase().includes('servpronet') == true){// forcing to lowercase and includes just incase someone inputed this wrong. I have seen it before
         credsTab = (item.nextElementSibling.childNodes[1].href)// this finds the next sibling of SERVPRONet which is the button we need to get
         chrome.runtime.sendMessage({type: credsTab});// send the link to the background
    }

    }
//console.log("NEW SCRIPT")
