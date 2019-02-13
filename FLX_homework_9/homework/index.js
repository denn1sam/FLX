function findTypes() {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
        var type = typeof arguments[i];
        arr.push(type);
    }
    return arr;
}

function executeforEach(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

function mapArray(arr, func) {
    var newArr = [];
    executeforEach(arr, function(el) {
        newArr.push(func(el));
    });
    return newArr;
}

function filterArray(arr, func) {
    var newArr = [];
    executeforEach(arr, function(el) {
        if (func(el)) {
            newArr.push(el);
        }
    });
    return newArr;
}

function getAmountOfAdultPeople(data) {
    return filterArray(data, function (el) {
        return el.age > 18;
    }).length;
}

function getGreenAdultBananaLovers(data) {
    var arr = [];
    filterArray(data, function (el) {
        if (el.age > 18 && el.favoriteFruit === 'banana' && el.eyeColor === 'green') {
            arr.push(el.name); 
        }
    });
    return arr;
}

function keys(obj) {
    var newArr = [];
    for (var key in obj) {
        newArr.push(key);
    }
    return newArr;
}

function values(obj) {
    var newArr = [];
    for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
            newArr.push(obj[key]);
        }
    }
    return newArr;
}

function showFormattedDate(date) {
    let monthNames = ['Jan', 'Feb', 'Mar',
                      'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 
                      'Oct', 'Nov', 'Dec' ];
    return 'Date: ' + date.getDate() + 
    ' of ' + monthNames[date.getMonth()] + ', ' + date.getFullYear();
}

function isEvenYear(date) {
    var year = date.getFullYear();
    return year % 2 === 0;   
}

function isEvenMonth(date) {
    var month = date.getMonth() + 1;
    return month % 2 === 0;
}

//function calls to avoid errors
findTypes('number');
executeforEach([1,2,3], function(el) {
    console.log(el);
});
mapArray([2, 5, 8], function(el) {
    return el + 3;
});
filterArray([2, 5, 8], function(el) {
    return el > 3;
});
getAmountOfAdultPeople();
getGreenAdultBananaLovers();
keys({keyOne: 1, keyTwo: 2, keyThree: 3});
values({keyOne: 1, keyTwo: 2, keyThree: 3});
showFormattedDate(new Date('2019-01-27T01:10:00'));
isEvenYear(new Date('2019-01-27T01:10:00'));
isEvenMonth(new Date('2019-02-27T01:10:00'));