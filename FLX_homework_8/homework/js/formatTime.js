function formatTime(minutes) {
    var date = {
        minute: 0,
        hour: 0,
        day: 0
    }
    while (minutes > 0) {
        var lastDays = minutes/1440;
        var lastHours = minutes/60;

        if (lastDays >= 1) {
            date.day++;
            minutes -= 1440;
        } else if (lastHours >= 1) {
            date.hour++;
            minutes -= 60;
        } else if (minutes > 0) {
            date.minute++
            minutes--;
        }
    }
    return date.day + ' day(s) ' + date.hour + ' hour(s) ' + date.minute + ' minute(s).';
}
console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));
