chrome.runtime.onInstalled.addListener((r) => {
    console.log('Chrome extension successfully installed!');
    chrome.tabs.create({
        url: 'onboarding.html'
    })
  });




try {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        if (changeInfo.status === 'complete') {
            chrome.scripting.executeScript({
                files:['Content.js'],
                target: {tabId: tab.id}
            })
        }
    })
} catch (e) {
    console.log(e)
}
//chrome-extension://dhnnihlkmjgmlmmindbkbhcabcflegdi/popup.html   
  
