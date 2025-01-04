function updateTimerValue(setTime) {
    let currDate = new Date();
    let finalDate = new Date(currDate.getFullYear() + 1, 0, 1);
    let timeDiff = finalDate.getTime() - currDate.getTime();

    if (timeDiff < 0) {
        return;
    }

    let leftoverTime = {
        days: Math.floor((timeDiff / (1000 * 60 * 60 * 24))),
        hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
        seconds: Math.floor((timeDiff / (1000)) % 60),
    };

    setTime(leftoverTime)
}

function isNewYearWeek() {
    let currDate = new Date();
    let startOfYear = new Date(currDate.getFullYear(), 0, 1);
    let endOfWeek = new Date(currDate.getFullYear(), 0, 7, 23, 59, 59);

    return currDate >= startOfYear && currDate <= endOfWeek;
}

export {
    updateTimerValue,
    isNewYearWeek
};