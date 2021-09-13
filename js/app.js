function checkNextLesson(start,end,...activeDays) {
    let date = new Date();
    let days = [1,2,3,4,5,6,7];
    let weekDay = date.getDay();
    let dayCount = 0;
    let month = date.getMonth() + 1;
    let dateDay = date.getDate();
    
    if (weekDay == 0) weekDay = 7;

    // if today will be lesson
    for (let day of activeDays) {
        if (day == weekDay) {
            let currentTime = `${date.getHours()}.${date.getMinutes()}`

            // check time
            if (currentTime < start) return `урок пройдет сегодня в ${start}`;
            if (currentTime > start && currentTime < end) return `урок идет прямо сейчас и закончится в ${end}, поторопись!`;
        }
    }

    // check next lesson day
    for (let day of days) {
        let isFalse = false;

        if (day > weekDay) dayCount++;

        for (let activeDay of activeDays) {
            if (activeDay == day && activeDay > weekDay) {
                isFalse = true;
            }
        }

        if (day == 7) dayCount += activeDays[0]

        if (isFalse) break;
    }

    // update date
    if (dateDay + dayCount >= 10) {
        date.setDate(dayCount + dateDay);
        dateDay = date.getDate();
        month = date.getMonth() + 1;
    }

    // add 0 if less than 10
    if (date.getMonth() < 10) month = '0' + (date.getMonth() + 1);
    if (date.getDate() < 10) dateDay = '0' + (date.getDate());
    
    return `следующий урок состоится ${dateDay} ${month} в ${start}.`
}


console.log(checkNextLesson('17.40','19.10',3,5));