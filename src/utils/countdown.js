function updateTimerValue(setTime) {
    let finalDate = new Date('2025-01-01 12:00 AM');
    let currDate = new Date();
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
    return (currDate < new Date('2025-01-08 12:00 AM')) && (currDate >= new Date('2025-01-01 12:00 AM'))
}

export {
    updateTimerValue,
    isNewYearWeek
};