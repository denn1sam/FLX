function formatTime(minutes) {
    var date = {
        minute: 0,
        hour: 0,
        day: 0
    }
    for (var i = 0; i < minutes; i++) {
        date.minute++;
        if (date.minute === 60) {
            date.minute = 0;
            date.hour++;
        }
        if (date.hour === 24) {
            date.hour = 0;
            date.day++;
        }
    }
    return date.day + ' day(s) ' + date.hour + ' hour(s) ' + date.minute + ' minute(s).';
}
console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));
