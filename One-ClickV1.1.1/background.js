/*****************************************************************
 * onMessage from the extension or tab (a content script)
 *****************************************************************/
y = ""// where url goes most of the time
x = 1//just used to stop executing the scripts more then once So if this chnages it executing the script
credsstring = ''// placeholder for concatinated credsstring
lastcheck = 1// more to hold scripts to only one turn
franchisecheck = 1// same as above
chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {// when a message have been sent to the background
    //console.log(request.type);
    y = request.type;// grab the actual text that was sent and put it into a global variable so I can access it later
    if(String(y).includes(" ") == true){// if the sring has a space it must be the username and password string I created
        credsstring = y// set the creds to the credsstring
        //THIS IS NEEDED BECUASE I HAVE TO SEND CREDENTIALS TO THE NEW WINDOW AND NOT THE OLD
        // ON THE NEW WINDOWS I NEED TO REQUEST THE CREDS WHICH OVERWRITES Y    
        // THIS IS WHY I NEED TO KEEP THIS IN SEPERATE STORAGE
        //console.log("OPEN SESAME SEEDS")
        chrome.windows.create({focused: true, incognito: true }, function(win) {// opens an incognito windows    BUG THAT IT IS OPENING 2  GOTTA FIX EVETUALLY
    /// this is not running twice and still I get two tabs   STRANGE
              chrome.tabs.create({ // create incognito tab
                  url: "https://franchiseadmin.servpro.com/Account/LogOn" 
              })
              sendResponse();// must send back or else crash SO I am just sending back nothing
      });
      lastcheck = 1// sets these to defaults so you can run scripts again
      franchisecheck = 1
      x = 0
    }
    else if (String(y).includes("SENDSTUFF") == true){// here I am requesting the credentials to be sent to franchises.js   From there I enter them into the site
        //console.log("IT HIT")
        sendResponse(credsstring);// here I send a response since the page is requesting the credentails
    }
    else{
    chrome.tabs.update({"url":request.type})// if it is just a regular link open it and send back nothing.  I use this twice so it is cool and needed
    sendResponse();
    //console.log("MOVED")
    x = 1
    }

    


      
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {// waits for tab to update and checks if url in rbowser is equal to the one I want to send to

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {// looks for active tab
    var url = tabs[0].url // grabs the url of current tab to check what script to run

    //console.log(url) // checks current url page is on
    //console.log(y)// checks the last url sent
    if (y == url && x == 1){ // if the url is the one that was sent last and the script has not been run once then run the script
    //console.log("ITS HERE")
            // query the active tab, which will be only one tab
            //and inject the script in it
            chrome.tabs.executeScript(tabs[0].id, {file: "newScript.js"})// runs newScript.js
            x = 0;// holds to make sure the script is not run more than once
    }
    if (String(y).includes("credentials") == true  && x == 0 && lastcheck == 1){// I think y is erased here so I need to check if its on the correct url  
        // i think I am using string contains becuase without it and just by url checking could cause previous varaibles to be used.. NOT GOING TO DEBUG SINCE IT WORKS.
        //console.log("LA JUST")
        chrome.tabs.executeScript(tabs[0].id, {file: "lastScript.js"})// run lastscript
        lastcheck = 0;// only run this once

    }
    if(String(url).includes("franchise") && x == 0 && franchisecheck == 1){// if it is on the frnchises tab in incognito run last script to send and submit credentials
        //console.log("Chill")
        chrome.tabs.executeScript(tabs[0].id, {file: "franchises.js"})// execute script
        franchisecheck = 0;// make sure only runs once

    }
    
})
});
