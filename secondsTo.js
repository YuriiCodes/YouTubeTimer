
//426

const secondsToTime = (seconds) => {
    console.log(`seconds: ${seconds}`)
    let date = new Date(null);
    date.setSeconds(seconds); 
    console.log(`without substr: ${date.toISOString()}`)
    console.log(`with  substr:1 ${date.toISOString().slice(11, 19)}`)
    console.log(`with  substr:2 ${date.toISOString().slice(14, 19)}`)

    return  date.toISOString().slice(11, 19);
}

// console.log(secondsToTime(426))

const secondsToIso = (seconds, minutesOrHours = 'hours') => {
    let date = new Date(null);
    date.setSeconds(seconds); 
    if (minutesOrHours === 'minutes') {
        return date.toISOString().slice(14, 19);
    }
    if(minutesOrHours === 'hours') {
        return date.toISOString().slice(11, 19);
    }
}

// console.log(secondsToIso(426, 'hours'))
console.log(secondsToIso(403.290791, 'minutes'));