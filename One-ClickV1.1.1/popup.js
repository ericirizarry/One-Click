function injectTheScript(){// stole this from someone with the button all set up   here: https://stackoverflow.com/questions/51385980/chrome-extension-working-on-two-tabs
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"});// just executes the first script
        });
      }  
document.getElementById('clickactivity').addEventListener('click', injectTheScript);// listening for the button to be clicked
