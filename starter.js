document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('kiker').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        chrome.tabs.create({url: 'main.html'}, function(newTab) {
          chrome.tabs.remove(currentTab.id);
        });
      });
    });
  });
  