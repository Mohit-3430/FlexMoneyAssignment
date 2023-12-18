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
    console.log(lastPaidDate.getHours())
    const final_time = `${lastPaidDate.getHours()}:${lastPaidDate.getMinutes()}:${lastPaidDate.getSeconds()}`
    const final_date = `${lastPaidDate.getDate()} ${months[lastPaidDate.getMonth()]} ${lastPaidDate.getFullYear()}`
    console.log(final_date)

    return final_date + " " + final_time
}