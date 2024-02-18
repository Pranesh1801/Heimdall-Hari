document.addEventListener('DOMContentLoaded', function () {
    updateTabList();
  });


function updateTabList() {
    var lt = [];
    var tc = 0;
    var tabList = document.getElementById('tabList');
    var tcp = document.getElementById('tc');
    tabList.innerHTML = '';
    chrome.tabs.query({}, function (tabs) {

        tabs.forEach(function (tab, index) {

            if (!tab.url.startsWith("chrome://")) {

                var listItem = document.createElement('li');
                listItem.textContent = "Tab " + (index + 1) + " URL: " + tab.url;
                lt.push(tab.url);
                tabList.appendChild(listItem);
                tc++;
            }
        });
        tcp.innerText = tc;
        var dummy = document.getElementById("linkInput").value;
        retrive(dummy, function(response) {

            if (response !== "") {
              dummy = response;
              var d1;
              var domain = dummy.replace(/^https?:\/\//, '');
              domain = domain.replace(/^www\./, '');
              var domainParts = domain.split('/');
              d1 = domainParts[0];
              document.getElementById("u").innerText = d1;
              checker(lt, d1);
            }
          });
    });
}


updateTabList();


setInterval(updateTabList, 3000);


window.addEventListener('load', function() {
    var tabCount = document.getElementsByTagName('a').length;
    chrome.runtime.sendMessage({ action: "updateTabCount", count: tabCount });
});


var pro=0;

function checker(ilt, d1) {
    //console.log(d1);
    //console.log(ilt.length);
    let ct = 0;
    for (let url of ilt) {
        var domain1 = url.replace(/^https?:\/\//, '');
        domain1 = domain1.replace(/^www\./, '');
        var domainParts1 = domain1.split('/');
        var d2 = domainParts1[0];
        //console.log(d2);
        if (d1 !== d2) {
            //ct++;
            //console.log(d2+"--"+false);
            ct++;
        }
        else{
            //console.log(d2+"--"+true);
        }
     } 
    if (ct >= 2) {
        //document.getElementById("st").innerText = "declined";
        //console.log("Get out bro");
        document.getElementById("st").innerHTML="<p style='color:red'>Declined</p>";
        //chrome.runtime.sendMessage({ action: "closeAllTabs" });
        pro++;
        if(pro>2){
            countdown();
            const inputValue = document.getElementById("ud").value;
            const fc= document.getElementById("linkInput").value;
            chrome.runtime.sendMessage({ action: "addMovie", inputValue, fc });
            return;
        }
    }
    else{
        //console.log("Stay in bro");
        document.getElementById("st").innerHTML="<p style='color:green'>Aproved</p>";
    }
    
}

function countdown() {
    document.getElementById('cls').innerText="Your Tab is Going To Close In :";
    let countdownElement = document.getElementById('countdown');
    let seconds = 5;
    let interval = setInterval(function() {
        countdownElement.innerHTML = seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "BOOM";
            chrome.runtime.sendMessage({ action: "closeAllTabs" });
        }
    }, 1000);
}






function retrive(l, callback) {
    chrome.runtime.sendMessage({ greeting: "hello", retval: l }, function(response) {

      callback(response.answer);
      console.log(response.answer);
    });
  }
          