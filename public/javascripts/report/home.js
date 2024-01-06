
function getTimeOfDayAsNumber() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Convert the time to a numeric representation (e.g., HHMMSS)
    const timeAsNumber = hours * 10000 + minutes * 100 + seconds;

    return timeAsNumber;
}

function getVenenueOfDay() {

    const end_time = Date.now()

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const start_time = startOfDay.getTime()

    $.ajax({
        type: "get",
        url: `/order/getOrderForEnvenue?start_time=${start_time}&end_time=${end_time}`,
        success: function (res) {
            console.log(res)
            if (res.success) {
                let price = 0
                res.data.forEach(element => {
                    price += element.total_price
                });
                $('#envenue').text(price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }))
            } else {
                console.log(res.message)
            }
        }
    });
}

function getNewUserNumber() {
    var startOfMonth = new Date();
    startOfMonth.setDate(1); // Set the day of the month to 1 (start of the month)
    startOfMonth.setHours(0, 0, 0, 0);

    var endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0); // Set to the last day of the current month
    endOfMonth.setHours(23, 59, 59, 999);

    $.ajax({
        type: "get",
        url: `/user/countNewUser?start_time=${startOfMonth.getTime()}&end_time=${endOfMonth.getTime()}`,
        success: function (res) {
            console.log(res)
            if (res.success) {
                $('#number_of_user').text(res.data + ' người')
            } else {
                console.log(res.message)
            }
        }
    });

}



function getNumberOfShoes() {
    $.ajax({
        type: "get",
        url: '/shoes/countShoes',
        success: function (res) {
            console.log(res)
            if (res.success) {
                $('#number_of_shoes').text(res.data + ' mẫu giày')
            } else {
                console.log(res.message)
            }
        }
    });
}

getVenenueOfDay()
getNewUserNumber()
getNumberOfShoes()

$('#envenue-detail').click(function (e) {
    localStorage.removeItem('start-date')
    localStorage.removeItem('end-date')
    window.location.href = "/report/revenue"
})

$('#user-detail').click(function(e){
    localStorage.removeItem('user-start-date')
    localStorage.removeItem('user-end-date')
    window.location.href = "/report/user"
})