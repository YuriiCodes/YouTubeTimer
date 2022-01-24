chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    // Show page action if URL contains yahoo
    if (changeInfo.status == "complete"){
        if (tab.url.indexOf('yahoo') != -1){
            chrome.pageAction.show(tabId);
        }
    }
});
