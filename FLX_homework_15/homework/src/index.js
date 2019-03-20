const messages = {
  smallSalary: 'Cannot set smaller salary than employee has now',
  noCompany: 'Employee don`t work in any company',
  dontEmployeeObj: 'Please try to add Employee instance'
}
const one = 1;
const two = 2;
const thousand = 1000;

function Company(company) {
  this.companyName = company.name;
  this.owner = company.owner;
  this.maxCompanySize = company.maxCompanySize;

  let _currentEmployees = [];
  let _logs = [];

  _logs.push(`${this.companyName} was created in ${new Date().toISOString()}, by ${this.owner}`);

  this.addNewEmployee = function(employee) {
    if (employee instanceof Employee) {
      if (_currentEmployees.length < this.maxCompanySize) {
        employee.hire(this.companyName);
        _currentEmployees.push(employee);
        _logs.push(`${employee.name} starts working at ${this.companyName} in ${new Date().toISOString()}`);
      } else {
        let currentIndex = 0;
        let minEmpSalary = _currentEmployees[currentIndex].salary;
        
        for (let i = 1; i < _currentEmployees.length; i++) {
          if (minEmpSalary > _currentEmployees[i].salary) {
            currentIndex = i;
            
            if (minEmpSalary.salary === _currentEmployees[i].salary) {
              if (minEmpSalary.getWorkTimeInSeconds() < _currentEmployees[i].getWorkTimeInSeconds()) {
                minEmpSalary.salary = _currentEmployees[i].salary;
              }
            } else {
              minEmpSalary.salary = _currentEmployees[i].salary;
            }
          }
        }
        this.removeEmployee(currentIndex);
        this.addNewEmployee(employee);
      }
    } else {
      return console.log(messages.dontEmployeeObj);
    }
  };

  this.removeEmployee = function(id) {
    if (!isNaN(parseFloat(id)) && isFinite(id)) {
      _logs.push(`${_currentEmployees[id].name} ends working in ${this.companyName} in ${new Date().toISOString()}`);
      _currentEmployees[id].fire();
      _currentEmployees.splice(id, one);
    }
  };

  this.getAvarageSalary = function() {
    let avarageSalary = 0;
    _currentEmployees.forEach(function(el) {
      avarageSalary += el.salary;  
    });
    avarageSalary /= _currentEmployees.length;
    return `avarage salary: ${+avarageSalary.toFixed(two)}`;
  };

  this.getAvarageAge = function() {
    let avarageAge = 0;
    _currentEmployees.forEach(function(el) {
      avarageAge += el.age;  
    });
    avarageAge /= _currentEmployees.length;
    return `avarage age: ${+avarageAge.toFixed(two)}`;
  };

  this.getEmployees = function() {
    return _currentEmployees;
  };

  this.getFormattedListOfEmployees = function() {
    return _currentEmployees.map(function(emp) {
      return `${emp.name} - works in ${this.companyName}`;
    });
  };

  this.getHistory = function() {
    return _logs;
  };
}

function Employee(employee) {
  this.name = employee.name;
  this.primarySkill = employee.primarySkill;
  this.age = employee.age;
  this.salary = employee.salary;

  let _startDate = new Date();
  let _logs = [];

  this.getSalary = function() {
    return `employee salary: ${this.salary}`;
  };

  this.setSalary = function(newSalary) {
    if (newSalary > this.salary) {
      _logs.push(`change salary from ${this.salary} to ${newSalary}`);
      this.salary = newSalary;
    } else {
      console.log(messages.smallSalary);
      _logs.push(`try to change salary from ${this.salary} to ${newSalary}`);
    }
  };

  this.getWorkTimeInSeconds = function() {
    return (new Date() - _startDate) / thousand;
  };

  this.hire = function(currentCompanyName) {
    this.company = currentCompanyName;
    _logs.push(`${this.name} is hired to ${this.company} in ${new Date().toISOString()}`);
  };

  this.fire = function() {
    _logs.push(`${this.name} is fired from ${this.company} in ${new Date().toISOString()}`);
    this.company ? delete this.company : console.log(messages.noCompany);
  };

  this.getHistory = function() {
    return _logs;
  };
}

//code example
let artem = new Employee({name: 'Artem', age: 15, salary: 1000, primarySkill: 'UX'});
let vova = new Employee({name: 'Vova', age: 16, salary: 2000, primarySkill: 'BE'});
let vasyl = new Employee({name: 'Vasyl', age: 25, salary: 1000, primarySkill: 'FE'});
let ivan = new Employee({name: 'Ivan', age: 35, salary: 5000, primarySkill: 'FE'});
let orest = new Employee({name: 'Orest', age: 29, salary: 300, primarySkill: 'AT'});
let anton = new Employee({name: 'Anton', age: 19, salary: 500, primarySkill: 'Manager'});

let epam = new Company({name: 'Epam', owner: 'Arkadii', maxCompanySize: 5});
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);

console.log(epam.getHistory());

/*
"Epam was created in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time)"
"Artem starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
"Vova starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
"Vasyl starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
"Ivan starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
"Orest starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
"Orest ends working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
"Anton starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
*/
epam.removeEmployee(2);


console.log(vasyl.getHistory());

/*
"Vasyl is hired to Epam in Tue Mar 12 2019 07:45:55 GMT+0200 (FLE Standard Time)"
"Vasyl is fired from Epam in Tue Mar 12 2019 07:45:55 GMT+0200 (FLE Standard Time)"
*/

console.log(epam.getAvarageSalary()); // -> 2125
console.log(epam.getAvarageAge()); // -> 21.25

epam.addNewEmployee(5,6,9,5); // -> Please try to add Employee instance

setTimeout(() => {
   epam.removeEmployee(1);
   console.log(artem.getWorkTimeInSeconds()); // -> 5.5744444444444445
}, 5000);

vova.setSalary(900);
vova.setSalary(2200);
console.log(vova.getHistory());
/*
"Vova is hired to Epam in Tue Mar 12 2019 08:08:48 GMT+0200 (FLE Standard Time)"
"try to change salary from 2000 to 900"
"change salary from 2000 to 2200"
*/
