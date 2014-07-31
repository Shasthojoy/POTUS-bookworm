d3 = require("d3")

var Crawler = require("crawler").Crawler;

var c = new Crawler({
    "maxConnections":1,

    // This will be called for each crawled page
    "callback":function(error,result,$) {

        // $ is a jQuery instance scoped to the server-side DOM of the page
        pagevals = $("tr",$("tbody",$(".day-view")))
            .map(function(d,i) {
                return [[
                    $(".calendar-agenda-hour",i).text(),
                    $("#node-title",i).text(),
                    $("#node-vid",i).text(),
                    $("#node-data-field-event-date-field-event-press-access-value",i).text(),
                    $("h3",$(".date-heading")).text()]]})


        out =  []

        for (i=0;i<pagevals.length;i++) {
            lines = pagevals[i].map(function(string) {
                string = string.replace(/[\t\n]/g,"")
                string = string.replace(/^ +/,"")
                string = string.replace(/ +$/,"")
                string = string.replace(/  +/,"")
                return string
            })
            console.log(lines.join("\t"))
        }

    }

})
// Queue just one URL, with default callback

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    //source: http://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates

    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

var dateArray = getDates(new Date("2011-1-1"), (new Date()))

prezdates = dateArray.map(function(d) {return "http://www.whitehouse.gov/schedule/president/" + [d.getFullYear(),d.getMonth()+1,d.getDate()].join("-")})
veep = dateArray.map(function(d) {return "http://www.whitehouse.gov/schedule/vice-president/" + [d.getFullYear(),d.getMonth()+1,d.getDate()].join("-")})
//c.queue(prezdates);
c.queue(veep);
