
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("cgcode").addEventListener("click", gencode);
    document.getElementById("refresh").addEventListener("click", callfun);
  });

  let gc;

  function gencode(){
    var given = document.getElementById("usrurl").value;
    chrome.runtime.sendMessage({ task: "genc", gurl: given }, function(response) {
      var afterg = response.scode;
      document.getElementById("gcode").innerText = afterg;
      var tsis=document.getElementById("cgcode");
      tsis.disabled=true;
      gc = afterg;
    });
  }


  function dispstarted() {
    var dummy;
    let d1 = gc;
    const dl1 = document.getElementById("strtd");
    dl1.innerHTML = "";
    chrome.runtime.sendMessage({ re: "saphire", sea: d1 }, function(response) {
        var cc = response.reply;
        console.log("recieved on frontent : "+cc);
        var htmlContent = "";
        for (const dtm of cc) {
            htmlContent += `<li>${dtm}</li><br>`;
            console.log(htmlContent);
        }
        dummy = htmlContent;
        dl1.innerHTML=dummy;
    });
  }

  
  function dispcompleted() {
    var dummy;
    let d1 = gc;
    const dl1 = document.getElementById("cmpltd");
    dl1.innerHTML = "";
    chrome.runtime.sendMessage({ re: "emarald", sea: d1 }, function(response) {
        var cc = response.reply;
        console.log("recieved on frontent : "+cc);
        var htmlContent = "";
        for (const dtm of cc) {
            htmlContent += `<li>${dtm}</li><br>`;
            console.log(htmlContent);
        }
        dummy = htmlContent;
        dl1.innerHTML=dummy;
    });
  }



  function dispcopied() {
    var dummy;
    let d1 = gc;
    const dl1 = document.getElementById("sspndd");
    dl1.innerHTML = "";
    chrome.runtime.sendMessage({ re: "catseye", sea: d1 }, function(response) {
        var cc = response.reply;
        console.log("recieved on frontent : "+cc);
        var htmlContent = "";
        for (const dtm of cc) {
            htmlContent += `<li>${dtm}</li><br>`;
            console.log(htmlContent);
        }
        dummy = htmlContent;
        dl1.innerHTML=dummy;
    });
  }


  function callfun(){
    dispstarted();
    dispcompleted();
    dispcopied();
  }