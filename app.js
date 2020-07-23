


var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

var holidays = [];

var currentMonth;
var currentYear;

var plannerWidth = 300;

var margin = 50;
var topLabelMargin = 100;
var calendarWidth;
var calendarHeight;
var spacing = 5;

function setup() {


    calendarWidth = windowWidth - plannerWidth - (margin * 2);
    calendarHeight = windowHeight - (margin * 2) - topLabelMargin;

    createCanvas(windowWidth, windowHeight);
    smooth();

    //   textFont("assets/Asleepytiming 400.otf");
    textAlign(CENTER, CENTER);
    currentMonth = month() - 1;
    currentYear = year();

    holidays = new Array();
    holidays.push(new Holiday("New Year's Day", 1, 1));
    holidays.push(new Holiday("Independence\nDay", 7, 4));
    holidays.push(new Holiday("Halloween", 10, 31));
    holidays.push(new Holiday("Veterans' Day", 11, 11));
    holidays.push(new Holiday("Christmas", 12, 25));
    holidays.push(new MonthDay("Martin Luther\nKing Jr. Day", 1, getDayInMonth(currentYear, currentMonth, 2, 3)))
    holidays.push(new MonthDay("Presidents' Day", 2, getDayInMonth(currentYear, currentMonth, 2, 3)))
    holidays.push(new MonthDay("Mothers' Day", 5, getDayInMonth(currentYear, currentMonth, 1, 2)))
    holidays.push(new MonthDay("Fathers' Day", 6, getDayInMonth(currentYear, currentMonth, 1, 3)))
    holidays.push(new MonthDay("Memorial Day", 5, lastDayInMonth(currentYear, currentMonth, 2)))
    holidays.push(new MonthDay("Labor Day", 9, getDayInMonth(currentYear, currentMonth, 2, 1)))
    holidays.push(new MonthDay("Columbus Day", 10, getDayInMonth(currentYear, currentMonth, 2, 2)))
    holidays.push(new MonthDay("Thanksgiving", 11, getDayInMonth(currentYear, currentMonth, 5, 4)))

}

function draw() {
    //Date Metrics
    var monthName = monthNames[currentMonth];
    var daysInMonth = int(monthDays[currentMonth]);
    if (currentMonth == 1 && isLeapYear(currentYear)) daysInMonth++;
    var dayOfMonth = -1;
    var dayOfWeek = -1;
    var dayOfWeekName = "";

    if (currentMonth == month() - 1 && currentYear == year()) {
        dayOfMonth = day();
        dayOfWeek = int((new Date()).getDay());
        dayOfWeekName = weekDays[dayOfWeek];
    }

    var date = new Date();
    date.setYear(currentYear);
    date.setMonth(currentMonth);
    date.setDate(1);

    var startingDayOfMonth = date.getDay(); //int(7 - (dayOfMonth % 7)); //NOT WORKING!
    var startingDayOfMonthName = weekDays[startingDayOfMonth];

    //Celendar Metrics
    var numRows = ceil((startingDayOfMonth + daysInMonth) / 7);
    margin = 50;
    topLabelMargin = 100;
    calendarWidth = width - plannerWidth - (margin * 2);
    calendarHeight = height - (margin * 2) - topLabelMargin;
    spacing = 0;
    var boxWidth = (calendarWidth - (6 * spacing)) / 7;
    var boxHeight = (calendarHeight - ((numRows - 1) * spacing)) / numRows;

    background(140,40,40);

    if (mouseInArrowRange()) {
        noStroke();

        if (mouseOverArrow(-1) || mouseOverArrow(-2)) {
            cursor('arrow');
            fill(255);
        }
        else {
            fill(204);
            cursor('pointer');
        }


        triangle(
            (width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3.2, margin + topLabelMargin / 10 * 3,
            (width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3, margin + topLabelMargin / 10 * 2,
            (width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3, margin + topLabelMargin / 10 * 4);

        if (mouseOverArrow(1) || mouseOverArrow(2)) fill(255);
        else fill(204);
        triangle(
            (width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3.2, margin + topLabelMargin / 10 * 3,
            (width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3, margin + topLabelMargin / 10 * 2,
            (width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3, margin + topLabelMargin / 10 * 4);

        if (mouseOverArrow(-2)) fill(255);
        else fill(204);
        triangle(
            (width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3.8, margin + topLabelMargin / 10 * 3,
            (width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3.6, margin + topLabelMargin / 10 * 2,
            (width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3.6, margin + topLabelMargin / 10 * 4);

        if (mouseOverArrow(2)) fill(255);
        else fill(204);
        triangle(
            (width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3.8, margin + topLabelMargin / 10 * 3,
            (width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3.6, margin + topLabelMargin / 10 * 2,
            (width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3.6, margin + topLabelMargin / 10 * 4);
    }

    fill(255);
    stroke(204);
    textSize(30);

    text(monthName + " " + currentYear, (width - plannerWidth) / 2 + plannerWidth, margin + topLabelMargin / 10 * 3);

    //   Week Day
    fill(255);
    textSize(25);

    for (var i = 0; i < weekDays.length; i++)
        text(weekDays[i], margin + (spacing * i) + (boxWidth * i) + boxWidth / 2 + plannerWidth, margin + topLabelMargin / 10 * 7);

    line(margin + plannerWidth, margin + topLabelMargin / 10 * 8.5, width  - margin, margin + topLabelMargin / 10 * 8.5);

    stroke(0);



    var xoff = startingDayOfMonth;
    var yoff = 0;
    for (var i = 0; i < daysInMonth; i++) {
        var curDayOfWeekName = weekDays[xoff];

        var x = margin + (spacing * xoff) + (boxWidth * xoff);
        var y = margin + topLabelMargin + (spacing * yoff) + (boxHeight * yoff);

        // Shadow
        noStroke();
        fill(51);
        rect(x + 3 + plannerWidth, y + 3, boxWidth, boxHeight);

        // day tile background
        stroke(0);
        if ((i + 1) == dayOfMonth) fill(40, 200, 200);
        else fill(0, 200, 255);

        rect(x +plannerWidth, y, boxWidth, boxHeight);

        fill(0);
        textSize(24);

        // Day Index
        text(i + 1, x + boxWidth / 2 + plannerWidth, y + boxHeight / 2);

        // Holiday label
        textSize(15);
        var yH = 0;
        for (holi = 0; holi < holidays.length; holi++) {
            holiday = holidays[holi]
            if (currentMonth + 1 == holiday.getMonth() && i + 1 == holiday.getDay()) {
                text(holiday.getName(), x + boxWidth / 2 + plannerWidth, y + boxHeight / 20 * 17 - (textAscent() + textAscent()) * yH);
                yH++;
            }
        }

        xoff = (xoff + 1) % 7;
        if (xoff == 0) yoff++;
    }

    if (!isToday()) {
        if (overTodayButton()) fill(255);
        else fill(204);
        textSize(12);

        text("Today", (width + plannerWidth) / 2, height - margin / 2);

        if (mousePressed && overTodayButton()) goToToday();
    }

    noStroke();

    //if(overPlannerScroller() || pressedPlannerScroller) fill(255);
    //else fill(204);
    //
    //rect(width - plannerWidth - 10, margin + topLabelMargin + calendarHeight / 5, 10, calendarHeight / 5 * 3);


    //   Planner
    if (plannerWidth > 50) {
        fill(51);

        rect(50 + 3, margin + topLabelMargin + 3, plannerWidth - margin, height - margin * 2 - topLabelMargin);

        stroke(0);
        fill(0, 200, 255)

        rect( 50, margin + topLabelMargin, plannerWidth - margin, height - margin * 2 - topLabelMargin);
    }

    //if(!mousePressed) pressedPlannerScroller = false;
    //if(pressedPlannerScroller) plannerWidth = constrain(width - mouseX, 0, 350);
}

function mouseOverArrow(arrow) {
    switch (arrow) {
        case -2:
            return (mouseInArrowRange() && mouseX > ((width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 4.1) && (mouseX < (width + plannerWidth) / 2 - (width - plannerWidth) / 20 * 3.6));
        case -1:
            return (mouseInArrowRange() && mouseX > ((width + plannerWidth) / 2 - (width + plannerWidth) / 20 * 3.5) && (mouseX < (width + plannerWidth) / 2 - (width - plannerWidth) / 20 * 3));
        case 1:
            return (mouseInArrowRange() && mouseX < ((width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 3.5) && (mouseX > (width + plannerWidth) / 2 + (width - plannerWidth) / 20 * 3));
        case 2:
            return (mouseInArrowRange() && mouseX < ((width + plannerWidth) / 2 + (width + plannerWidth) / 20 * 4.1) && (mouseX > (width + plannerWidth) / 2 + (width - plannerWidth) / 20 * 3.6));
    }

    return false;
}
function mouseInArrowRange() {
    return (mouseY > (margin + topLabelMargin / 10 * 2) && mouseY < (margin + topLabelMargin / 10 * 4));
}

function isLeapYear(year) {
    if (year % 400 == 0) return true;
    else if (year % 100 == 0) return false;
    else if (year % 4 == 0) return true;
    else return false;
}

function mousePressed() {
    if (mouseInArrowRange()) {
        if (mouseOverArrow(-2)) currentYear--;
        if (mouseOverArrow(-1)) {
            currentMonth--;
            if (currentMonth < 0) {
                currentYear--;
                currentMonth = 11;
            }
        }
        if (mouseOverArrow(1)) {
            currentMonth++;
            if (currentMonth > 11) {
                currentYear++;
                currentMonth = 0;
            }
        }
        if (mouseOverArrow(2)) currentYear++;
    }

    //if(overPlannerScroller()) pressedPlannerScroller = true;
}

function mouseReleased() {
    //pressedPlannerScroller = false;
}

function getDayInMonth(year, month, dayOfWeek, num) {
    var date = new Date();
    date.setYear(year);
    date.setMonth(month);
    date.setDate(1);

    var startingDayOfMonth = date.getDay();

    return 7 * (dayOfWeek > startingDayOfMonth ? num - 1 : num) + (dayOfWeek) - startingDayOfMonth;
}

function lastDayInMonth(year, month, dayOfWeek) {
    var daysInMonth = int(monthDays[month]);
    if (month == 1 && isLeapYear(year)) daysInMonth++;

    var date = new Date();
    date.setYear(year);
    date.setMonth(month);
    date.setDate(daysInMonth);

    var lastDayOfMonth = date.getDay();

    return daysInMonth - (lastDayOfMonth - dayOfWeek) - (dayOfWeek - 1 > lastDayOfMonth ? 7 : 0) - 1;
}

function goToToday() {
    currentYear = year();
    currentMonth = month() - 1;
}

function isToday() {
    return (currentYear == year() && currentMonth == month() - 1);
}

function overTodayButton() {
    textSize(12);
    var textWidth = 60;
    var textHeight = textAscent() + textDescent() + 20;

    return (mouseX > (width - plannerWidth) / 2 - textWidth / 2 && mouseX < (width + plannerWidth) / 2 + textWidth / 2 && mouseY > height - margin / 2 - textHeight / 2 && mouseY < height - margin / 2 + textHeight / 2);
}

function overPlannerScroller() {
    return (mouseY > margin + topLabelMargin && mouseY < margin + topLabelMargin + calendarHeight && mouseX > width - plannerWidth - 15 && mouseX < width - plannerWidth + 5);
}

class MonthDay {

    constructor(name, month, day) {
        this.name = name
        this.month = month
        this.day = day

    }

    getName() {
        return this.name;
    }
    getMonth() {
        return this.name;
    }
    getDay() {
        return this.name;
    }

}

class Holiday extends MonthDay {


    constructor(name, month, day) {
        super (name, month, day)
        this.name = name
        this.month = month
        this.day = day

    }



    getMonth() {
        return this.month;
    }

    getDay() {
        return this.day;
    }
}

