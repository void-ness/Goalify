function updateTimerValue(setTime) {
    let finalDate = new Date('2024-01-01 12:00 AM');
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

export default updateTimerValue;