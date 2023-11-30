// Your code here
function createEmployeeRecord(array) {
    const employeeCard = {
        firstName:array[0],
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]
    };
    return employeeCard;
}

function createEmployeeRecords(arrayOfArrays) {
    const employeeRecords = arrayOfArrays.map(createEmployeeRecord);
    //for( const record in arrayOfArrays) {
    return employeeRecords;
}

function createTimeInEvent(empRecord,dateStmp) {
    const [date,hour] = dateStmp.split(" ");
    empRecord.timeInEvents.push({
        type:"TimeIn",
        hour:parseInt(hour),
        date:date
    })
    return empRecord;
}

function createTimeOutEvent(empRecord, dateStmp) {
    const [date, hour] = dateStmp.split(" ");
    empRecord.timeOutEvents.push({
        type:'TimeOut',
        hour:parseInt(hour),
        date:date
    })
    return empRecord;
}

function hoursWorkedOnDate( empRecord, dateStmp) {
    const timeCard = empRecord.timeInEvents;
    for (const num in timeCard) {
        const dateWorked = timeCard[num]["date"]
        if (dateStmp == dateWorked) {
            const hoursWorked = ((empRecord.timeOutEvents[num]['hour']) - (empRecord.timeInEvents[num]['hour']))/100
            return hoursWorked;
        }
    }
}

function wagesEarnedOnDate(empRecord,dateStmp) {
    const payRate = empRecord.payPerHour;
    const PayOwed = hoursWorkedOnDate(empRecord, dateStmp)*payRate;
    return PayOwed;
}

function allWagesFor (empRecord) {
    const timesIn = empRecord.timeInEvents;
    const timesOut = empRecord.timeOutEvents;
    const totalWages = [];
    for (const num in timesIn) {
        const dateStmp = timesIn[num]['date']
        const wage = wagesEarnedOnDate(empRecord,dateStmp);
        totalWages.push(wage);
    }
    
    const allWages = totalWages.reduce(sumFunc,0);
    return allWages
}

function sumFunc(total, num) {
        return total + num
}
function calculatePayroll (empArray) {
    const employeePay = [];
    for (const emp in empArray) {
        const allWages = allWagesFor(empArray[emp]);
        employeePay.push(allWages);
    }
    const totalPayroll = employeePay.reduce(sumFunc,0)
    return totalPayroll;
    
}
