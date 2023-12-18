const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const convert = (date) => {
    let lastPaidDate = new Date(date)
    const final_time = `${lastPaidDate.getHours()}:${lastPaidDate.getMinutes()}:${lastPaidDate.getSeconds()}`
    const final_date = `${lastPaidDate.getDate()} ${months[lastPaidDate.getMonth()]} ${lastPaidDate.getFullYear()}`

    return final_date + " " + final_time
}

export const checkExpiry = (date) => {
    const sub_month = new Date(date).getMonth()
    const curr_month = new Date().getMonth()

    if (sub_month !== curr_month) {
        return "Expired"
    }
    return "Active"
}