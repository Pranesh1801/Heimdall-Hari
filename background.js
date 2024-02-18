importScripts("s1.js");//<==============================
importScripts("s2.js");

const firebaseConfig = {
  apiKey: "AIzaSyC4CKaUjZpLZz3Bd1pGGYoMEz3Rh-KMHMI",
  authDomain: "safe-browser-85b42.firebaseapp.com",
  projectId: "safe-browser-85b42",
  storageBucket: "safe-browser-85b42.appspot.com",
  messagingSenderId: "816940632976",
  appId: "1:816940632976:web:be60656fac28527b7fc115",
  measurementId: "G-C9TPL0D95E",
  databaseURL: "https://safe-browser-85b42-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);


const database = firebase.database();

var openedTabIds = []; 
var tabCounter = 0; 


chrome.runtime.onInstalled.addListener(function() {//<==============================
  console.log("Extension installed");
  chrome.storage.local.set({tabCount: tabCounter});//<==============================
});


chrome.tabs.onCreated.addListener(function(tab) {//<==============================
  tabCounter++;
  chrome.storage.local.set({tabCount: tabCounter});
  chrome.runtime.sendMessage({ action: "updateTabCount", count: tabCounter });
});


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {//<==============================
  tabCounter--;
  chrome.storage.local.set({tabCount: tabCounter});
  chrome.runtime.sendMessage({ action: "updateTabCount", count: tabCounter });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {//<==============================
  console.log("Message received in background.js:", message);
  if (message.action === "openTab") {
    chrome.tabs.create({url: message.url});//<==========================================
  } else if (message.action === "closeAllTabs") {
    closeAllTabs();
  } else if (message.action === "addMovie") {
      function addMovie(inputValue,fc) { 
          const moviesRef = database.ref(`copies/${fc}`);
        
          if (inputValue.trim() !== "") {
            var md={
              [inputValue] : "Switched"
            };
            moviesRef.child(inputValue).set(md);
            //console.log("User added:", inputValue);
          } else {
            console.log("Please enter a user name");
          }
        }
      addMovie(message.inputValue,message.fc);
  }
});
//

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "getActiveTabInfo") {
      chrome.windows.getCurrent(function(window) {//<======================================
          if (window.focused) {
              chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {//<================================
                  var tab = tabs[0];
                  sendResponse({ tabId: tab.id, focused: true });
              });
          } else {
              sendResponse({ focused: false });
          }
      });
      return true;
  }
});




function closeAllTabs() {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      chrome.tabs.remove(tab.id);//<========================================E
    });
  });
}

chrome.tabs.onCreated.addListener(function(tab) {
  
  if (openedTabIds.includes(tab.openerTabId)) {
    closeAllTabs();
  }
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === "hello") {
    function retrieveData() {
      const key = request.retval;
      const ref = database.ref(`/Tab-Switches/${key}/${key}`);

      ref.once("value", function(snapshot) {
        const value = snapshot.val();
        if (value !== null) {
          
          sendResponse({ answer: value });
        } else {
          
          sendResponse({ answer: "www.facebook.com" });
        }
      });
    }
    retrieveData();
    
    
    return true;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.task === "genc") {
    function getcode() {
      const key = request.gurl;
      const ref = database.ref(`/Tab-Switches/`);
      const random = generateRandomCode();
      var md={
        [random] : key
      };
      ref.child(random).set(md);
      if (random !== null) {
        sendResponse({ scode: random });
      }

  }
  getcode();

  function generateRandomCode() {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

}
});




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.msg === "verification") {
    function displayData(childNodes) {
      for (const key in childNodes) {
        if (Object.hasOwnProperty.call(childNodes, key)) {
          if(key==request.kitkat){
            sendResponse({ rp:false });
            break;
          }
        }
      }
    }
    
    
    function fetchData(nodeName) {
      const nodeRef = database.ref(nodeName);
    
      nodeRef.on("value", function(snapshot) {
        const childNodes = snapshot.val();
        if (childNodes) {
          displayData(childNodes);
        } else {
          sendResponse({ rp:true });
          console.error("No data found for node:", nodeName);
        }
      }, function(error) {
        console.error("Error fetching data:", error);
      });
    }
    
    
    
    fetchData(`copies/${request.cadburry}/${request.kitkat}`);
  }
});





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.pushing=="activated"){
    const newref = database.ref(`started/${request.where}`);
    var md={
      [request.eyedee] : "started"
    };
    newref.child(request.eyedee).set(md);
  }
  else if(request.pushing=="completed"){
    const newref = database.ref(`completed/${request.where}`);
    var md={
      [request.eyedee] : "completed"
    };
    newref.child(request.eyedee).set(md);
  }
})




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.re === "saphire") {
    function fetchData(nodeName) {
      const nodeRef = database.ref(nodeName);
      nodeRef.once("value", function(snapshot) {
        const childNodes = snapshot.val();
        var arr1 = [];
        if (childNodes) {
          for (const key in childNodes) {
            if (Object.hasOwnProperty.call(childNodes, key)) {
              arr1.push(key);
            }
          }
          sendResponse({ reply: arr1 });
        } else {
          console.error("No data found for node:", nodeName);
          sendResponse({ reply: "" });
        }
      }, function(error) {
        console.error("Error fetching data:", error);
        sendResponse({ reply: "" });
      });
    }
    const tv = request.sea;
    fetchData(`started/${tv}`);
    return true;
  }

  else if (request.re === "emarald") {
    function fetchData(nodeName) {
      const nodeRef = database.ref(nodeName);
      nodeRef.once("value", function(snapshot) {
        const childNodes = snapshot.val();
        var arr1 = [];
        if (childNodes) {
          for (const key in childNodes) {
            if (Object.hasOwnProperty.call(childNodes, key)) {
              arr1.push(key);
            }
          }
          sendResponse({ reply: arr1 });
        } else {
          console.error("No data found for node:", nodeName);
          sendResponse({ reply: "" });
        }
      }, function(error) {
        console.error("Error fetching data:", error);
        sendResponse({ reply: "" });
      });
    }
    const tv = request.sea;
    fetchData(`completed/${tv}`);
    return true;
  }

  else if (request.re === "catseye") {
    function fetchData(nodeName) {
      const nodeRef = database.ref(nodeName);
      nodeRef.once("value", function(snapshot) {
        const childNodes = snapshot.val();
        var arr1 = [];
        if (childNodes) {
          for (const key in childNodes) {
            if (Object.hasOwnProperty.call(childNodes, key)) {
              arr1.push(key);
            }
          }
          sendResponse({ reply: arr1 });
        } else {
          console.error("No data found for node:", nodeName);
          sendResponse({ reply: "" });
        }
      }, function(error) {
        console.error("Error fetching data:", error);
        sendResponse({ reply: "" });
      });
    }
    const tv = request.sea;
    fetchData(`copies/${tv}`);
    return true;
  }

});