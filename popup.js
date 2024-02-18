document.addEventListener('DOMContentLoaded', function () {//<===================================
  console.log("Popup loaded");


  var opl=document.getElementById("openLinkButton");
  opl.disabled=true;
  document.getElementById("openLinkButton").addEventListener("click", openLinkInNewTab);


  document.getElementById("closeAllTabsButton").addEventListener("click", upandclose);
  const vfybtn=document.getElementById("actv");
  vfybtn.disabled=true;
  document.getElementById("actv").addEventListener("click", logcall);
  document.getElementById("vfy").addEventListener("click", vfyfun);


  chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === "updateTabCount") {
      updateTabCounter(message.count);
    } else if (message.action === "tabOpened") {

    } else if (message.action === "showAlert") {
        alert("More than 2 tabs are opened with different URLs.");
    }
  });
});


function openLinkInNewTab() {
  var link = document.getElementById("linkInput").value.trim();
  console.log("open link loaded");
  

  retrive(link, function(response) {

    if (response !== "") {

      link = response;


      chrome.runtime.sendMessage({ action: "openTab", url: link });


      document.getElementById("u").textContent = link;
    }
  });
}

function closeAllTabs() {
  if (confirm("Do you want to close all tabs?")) {
    chrome.runtime.sendMessage({ action: "closeAllTabs" });
  }
}

function updateTabCounter(count) {
  document.getElementById("tabCounter").textContent = count;
}


function retrive(l, callback) {

  chrome.runtime.sendMessage({ greeting: "hello", retval: l }, function(response) { //<======================================
    callback(response.answer);//<======================================
    console.log(response.answer);//<======================================
  });

}




function logcall() {
  var opl=document.getElementById("openLinkButton");
  opl.disabled=false;
  document.getElementById("actv").innerText="Activated";
  document.getElementById("st").innerHTML="<p style='color:green'>Aproved</p>";
  var bb1=document.getElementById("actv");
  var bb2=document.getElementById("vfy");
  bb1.disabled=true;
  bb2.disabled=true;
  var tusr=document.getElementById("ud").value;
  var cdd=document.getElementById("linkInput").value;
  chrome.runtime.sendMessage({ pushing: "activated",eyedee: tusr, where: cdd});
  setInterval(function() {//<=========================================E
      getTabInfo();
  }, 1000);
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


function getTabInfo() {
  chrome.runtime.sendMessage({ message: "getActiveTabInfo" }, function(response) {
      try {
          if (response && response.tabId && response.focused) {
              console.log("Tab ID:", response.tabId);
          } else {
              //chrome.runtime.sendMessage({ action: "closeAllTabs" });
              countdown();
              const inputValue = document.getElementById("ud").value;
              const fc= document.getElementById("linkInput").value;
              chrome.runtime.sendMessage({ action: "addMovie", inputValue, fc });
              throw new Error("Could not retrieve active tab ID or tab is not focused.");
          }
      } catch (error) {
          console.log(error.message);
      }
  });
}

var gh=true;
function vfyfun(){
  var h=document.getElementById("va")
  if(gh){
    h.textContent="click again to verify";
    gh=false;
  }else{
    h.textContent="";
    var ds=document.getElementById("vfy");
    ds.textContent="VERIFIED";
    ds.disabled=true;
  }

  var kitkat = document.getElementById("ud").value;
  var cadburry = document.getElementById("linkInput").value;
  console.log(kitkat+"----"+cadburry)
  chrome.runtime.sendMessage({ msg: "verification", kitkat, cadburry }, function(response) {
    if(response.rp){
        console.log("---->"+response.rp);
        const vfybtn=document.getElementById("actv");
        vfybtn.disabled=false;
    }
    else{
      var temp=document.getElementById("vfy");
      temp.innerText="Restricted";
      temp.disabled=true;
    }
  });
  
}

function upandclose(){
  var tusr=document.getElementById("ud").value;
  var cdd=document.getElementById("linkInput").value;
  chrome.runtime.sendMessage({ pushing: "completed",eyedee: tusr, where: cdd});
  countdown();
}