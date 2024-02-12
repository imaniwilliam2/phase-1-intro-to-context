function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
}

function createTimeInEvent(employeeRecord, timeStamp){
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    });
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeStamp){
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (!timeInEvent || !timeOutEvent) {
        throw new Error('Incomplete time record for the specified date');
    }


    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;

    const hoursWorked = (timeOutHour - timeInHour) / 100

    return hoursWorked;
}



function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    return payOwed;
}


function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    let totalWages = 0;
    for (const date of datesWorked) {
        totalWages += wagesEarnedOnDate(employeeRecord, date);
    }

    return totalWages;
}

function calculatePayroll(employeeRecordsArray) {
    let totalPayroll = 0;

    employeeRecordsArray.forEach(employeeRecord => {
        totalPayroll += allWagesFor(employeeRecord);
    });

    return totalPayroll;
}
