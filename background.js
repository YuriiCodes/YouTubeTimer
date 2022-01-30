try {
    chrome.runtime.onInstalled.addListener((r) => {
        console.log('Chrome extension successfully installed!');
        chrome.tabs.create({
            url: './src/html/onboarding.html'
        })
    });

} catch (e) {
    console.log(e)
}




try {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        console.log(changeInfo.url)
        if (changeInfo.status === 'complete') {
            chrome.scripting.executeScript({
                files: ['./src/scripts/Content.js'],
                target: { tabId: tab.id }
            })
        }
    })
} catch (e) {
    console.log(e)
}
  

