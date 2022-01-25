

// document.querySelector('.video-stream.html5-main-video').currentTime
// document.querySelector('.video-stream.html5-main-video').duration


const timeToSeconds = (timeString) => {
    const HOURSINDAY = 24;
    // 1 hour is 60 minuts, 1 minute is 60 seconds, 1 seconds is 60 milliseconds.
    const TIMECONST = 60;
    let dateArr = timeString.split(':');
    switch (dateArr.length) {
        // Includes minutes -> seconds, or in case of shorts - seconds and milliseconds
        case 2:
            // Summary time in secods in case of video, or milliseconds in case of shorts
            return (parseInt(dateArr[0]) * TIMECONST + parseInt(dateArr[1]))

        // Includes hours -> minutes -> seconds
        case 3:
            console.log('case 3');
            return ((parseInt(dateArr[0]) * TIMECONST * TIMECONST) + (parseInt(dateArr[1]) * TIMECONST) + parseInt(dateArr[2]))

        // Includes days -> hours -> minutes -> seconds
        case 4:
            return ((parseInt(dateArr[0]) * HOURSINDAY * TIMECONST * TIMECONST) + (parseInt(dateArr[1]) * TIMECONST * TIMECONST) + parseInt(dateArr[2]) * TIMECONST + parseInt(dateArr[3]))

        default:
            break;
    }
};

// Transforms time in seconds to HH-MM-SS string
const secondsToIso = (seconds, minutesOrHours = 'hours') => {
    let date = new Date(null);
    date.setSeconds(seconds);
    if (minutesOrHours === 'minutes') {
        return date.toISOString().slice(14, 19);
    }
    if (minutesOrHours === 'hours') {
        return date.toISOString().slice(11, 19);
    }
}

// Main function
const init = function () {

    // // Get view time span
    let timeArea = document.querySelector('.ytp-time-display .ytp-time-current').parentElement

    const getRemainingTime = (videoSummaryTime, alreadyWatchedTime) => {
        let minutesOrHours = videoSummaryTime.split(':').length == 2 ? 'minutes' : 'hours';
        return secondsToIso(timeToSeconds(videoSummaryTime) - timeToSeconds(alreadyWatchedTime), minutesOrHours)

    }

    let dividerSpan = document.createElement('span');
    dividerSpan.id = "youtubeTimerDivider"
    timeArea.appendChild(dividerSpan);
    dividerSpan.textContent = '\t|\t';

    let timeSpan = document.createElement('span');
    timeArea.appendChild(timeSpan);


    let video = document.querySelector('.video-stream.html5-main-video');

    // change setInterval duration to keep reamining time beind updated at the same rate as already watched one.
    video.onratechange = function () {
        let playbackSpeed = video.playbackRate;
        console.log(playbackSpeed)
        updateWidget(playbackSpeed)
    };

    const updateWidget = (playbackSpeed = 1000) => {
        setInterval(() => {
            // Get already watched time
            let alreadyWatchedTime = timeArea.querySelector('.ytp-time-current').textContent

            // let alreadyWatchedTime = document.querySelector('.video-stream.html5-main-video').currentTime 

            // Get all video time
            let videoSummaryTime = timeArea.querySelector('.ytp-time-duration').textContent
            
            // let videoSummaryTime = document.querySelector('.video-stream.html5-main-video').duration

            console.log(getRemainingTime(videoSummaryTime, alreadyWatchedTime))
            timeSpan.textContent = getRemainingTime(videoSummaryTime, alreadyWatchedTime)
        }, playbackSpeed);
    }
    updateWidget();
};
if (document.querySelector('#youtubeTimerDivider') == null) {
    init();
}


