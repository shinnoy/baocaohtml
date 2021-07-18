let currentTime = new Date();
let positionTime = new Date();

function showData(k) {
    let tablinks = document.getElementsByClassName("miniCDLi");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("miniCDLi" + k).className += " active";

    let tabcontent = document.getElementsByClassName("dayContent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" dayContentActive", "");
    }
    document.getElementById("dayContent" + k).className += " dayContentActive";
}
function setDateTime(y, m, d) {
    this.todays = new Date(y, d, m);
    this.years = this.todays.getFullYear();
    this.dates = this.todays.getDate();
    this.daysInMonth = (32 - new Date(this.years, this.todays.getMonth(), 32).getDate());
    this.days = this.todays.getDay();
    this.monthFull = this.todays.getMonth();
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    this.months = month[this.monthFull];

    return this;
}
function renderMiniCalendar(todays) {
    let sidebarMonth = document.getElementById("sidebarMonth");
    sidebarMonth.innerHTML = "" + todays.months + "<br><span style=\"font-size:18px\">" + todays.years + "</span>";
    let firstDay = (new Date(todays.years, todays.monthFull)).getDay();
    const day = todays.days;
    this.miniC = document.getElementById("miniCalendarTodays");
    this.miniC.innerHTML = "";
    this.CContent = document.getElementById("CContent");
    this.CContent.innerHTML = "";
    for (let i = 0; i < (firstDay - 1); i++) {
        let dayNul = document.createElement("li");
        let spanDayNul = document.createElement("span");
        spanDayNul.innerText = " ";
        dayNul.appendChild(spanDayNul);
        miniC.appendChild(dayNul);

        let CCday = document.createElement("div");
        CCday.className = "dayContent";
        CCday.className += " dayContentOld";
        this.CContent.appendChild(CCday);
    }
    for (let k = 1; k <= todays.daysInMonth; k++) {
        let dayNul2 = document.createElement("li");
        dayNul2.className = "miniCDLi";
        let spanDayNul2 = document.createElement("span");
        dayNul2.id = "miniCDLi" + k;
        spanDayNul2.id = "miniCalendarDay" + k;
        spanDayNul2.innerText = k;
        dayNul2.appendChild(spanDayNul2);
        miniC.appendChild(dayNul2);
        document.getElementById("miniCDLi" + k).addEventListener("click", () => {
            showData(k);
        });

        let CCday = document.createElement("div");
        CCday.className = "dayContent";
        CCday.id = "dayContent" + k;
        if (currentTime > positionTime) {
            CCday.className += " dayContentOld";
        } else if (k < todays.dates) {
            CCday.className += " dayContentOld";
        }
        let CCdayHeader = document.createElement("div");
        CCdayHeader.className = "dayContentHeader";
        CCdayHeader.innerHTML = "<span>" + k + "</span>";
        CCdayHeader.id = "dayContentHeader" + k
        CCday.appendChild(CCdayHeader);
        let CCdayTask = document.createElement("div");
        CCdayTask.className = "dayContentTask";
        CCday.appendChild(CCdayTask);
        this.CContent.appendChild(CCday);
        document.getElementById("dayContent" + k).addEventListener("click", () => {
            showData(k);
        });
    }
    for (let i = 0; i < (35 - todays.daysInMonth - firstDay + 1); i++) {
        let CCday = document.createElement("div");
        CCday.className = "dayContent";
        CCday.className += " dayContentOld";
        this.CContent.appendChild(CCday);
    }
    if ((currentTime.getMonth() === positionTime.getMonth()) && (currentTime.getFullYear() === positionTime.getFullYear())) {
        document.getElementById("miniCalendarDay" + todays.dates).className = "todays";
        document.getElementById("dayContent" + todays.dates).className += " dayContentNow";
        document.getElementById("dayContentHeader" + todays.dates).innerHTML = "<span>" + todays.dates + " " + todays.months + "</span>";
    }

    return this;
}
function prevBtn() {
    positionTime.setMonth(positionTime.getMonth() - 1);
    let todays = setDateTime(positionTime.getFullYear(), positionTime.getDate(), positionTime.getMonth());
    renderMiniCalendar(todays);
}
function nextBtn() {
    positionTime.setMonth(positionTime.getMonth() + 1);
    let todays = setDateTime(positionTime.getFullYear(), positionTime.getDate(), positionTime.getMonth());
    renderMiniCalendar(todays);
}
function setTodays() {
    positionTime = currentTime;
    let todays = setDateTime(currentTime.getFullYear(), currentTime.getDate(), currentTime.getMonth());
    renderMiniCalendar(todays);
    positionTime = new Date();
}
function selectDates() {

}
function render() {
    let todays = setDateTime(currentTime.getFullYear(), currentTime.getDate(), currentTime.getMonth());
    renderMiniCalendar(todays);
}

window.onload = () => {
    render();
}