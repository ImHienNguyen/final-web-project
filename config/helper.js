const statusEncode = ["Waiting for verification", "Complete", "Disable", "Pending", "Block"]


const moment = require("moment");

const formatDateTime = (dateTime) => moment(dateTime).format("MMMM Do YYYY, h:mm:ss a")

const formatDateTime2 = (dateTime) => moment(dateTime).format("YYYY-MM-DD HH:mm:ss")

const dataProcess = (data) => Object.values(JSON.parse(JSON.stringify(data)))

const formatDate = (dateTime) => moment(dateTime).format("MMMM Do YYYY")

const encodeStatusCode = (status) => {
    switch (+status) {
        case 0:
            return `<td class="text-warning font-weight-bold"><i class="fa fa-exclamation"></i> ${statusEncode[+status]}</td>`
        case 1:
            return `<td class="text-success font-weight-bold"><i class="fa fa-check "></i> ${statusEncode[+status]}</td>`
        case 2:
            return `<td class="text-muted font-weight-bold"><i class="fa fa-ban "></i> ${statusEncode[+status]}</td>`
        case 3:
            return `<td class="text-secondary font-weight-bold"><i class="fas fa-circle-notch fa-spin"></i> ${statusEncode[+status]}</td>`
        default:
            return `<td class="text-danger font-weight-bold"><i class="fas fa-clock"></i> ${statusEncode[+status]}</td>`
    }
}

module.exports = {
    formatDateTime,
    formatDateTime2,
    dataProcess,
    formatDate,
    encodeStatusCode
}