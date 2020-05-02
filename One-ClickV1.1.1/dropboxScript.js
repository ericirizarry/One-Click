data = document.getElementsByTagName("td")// locate all td tags

for (let item of data) {// for item in array of tds
//console.log(item)
if(item.innerText.includes("Notes") == true){//if the td tag is the correct one which means notes is in it then use that tag
    if(item.childNodes.length == 4){// if it is one with only client notes then click the client notes
    item.childNodes[0].click()// click client notes
    }

if(item.childNodes.length == 7)// if it has notes and client notes then click both
{
    item.childNodes[0].click()//click both
    item.childNodes[4].click()
}
if(item.childNodes.length == 5){// sometimes it is just client notes so we need to click only client notes singular
    item.childNodes[2].click()// clicks client notes only in singular status
}
}
}