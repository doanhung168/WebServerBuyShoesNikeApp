
function getVenenue(start_time, end_time) {
    $.ajax({
        type: "get",
        url: `/order/getOrderForEnvenue?start_time=${start_time}&end_time=${end_time}`,
        success: function (res) {
            console.log(res)
            if (res.success) {
                // Populate the table with data
                $('#envenue').empty()
                $('#envenue').append(
                    `<tr>
                        <th>Mã đơn hàng</th>
                        <th>Doanh thu</th>
                        <th>Ngày hoàn thành</th>
                    </tr>`
                )
                let count = 0
                let revenue = 0
                $.each(res.data, function (index, item) {
                    revenue += item.total_price
                    count++
                    $('#envenue').append(
                        `<tr>
                            <td><a href="/_order-detail/${item._id}">#${item._id}</a></td>
                            <td>${item.total_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                            <td>${longToDate(item.receive_date)}</td>
                        </tr>`
                    );
                });
                $('#envenue').append(
                    `<tr>
                        <th>Tổng doanh thu: ${count} đơn</th>
                        <th>${revenue.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}</th>
                        <th></th>
                    </tr>`
                )
            } else {
                console.log(res.message)
            }
        }
    });
}

function longToDate(longValue) {

    // Create a new Date object
    const date = new Date(longValue);

    // Now, you can use various methods of the Date object to get different components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Display the formatted date
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}


let startOfDay
if(localStorage.getItem("start-date")) {
    startOfDay = new Date(localStorage.getItem('start-date'))
    $('#start-time').val(startOfDay.toISOString().split('T')[0])
} else {
    startOfDay = new Date();
    $('#start-time').val(new Date().toISOString().split('T')[0])
}

startOfDay.setHours(0, 0, 0, 0);

let endDate
if(localStorage.getItem('end-date')) {
    endDate = new Date(localStorage.getItem('end-date'))
    $('#end-time').val(endDate.toISOString().split('T')[0])
} else {
    endDate = new Date()
    $('#end-time').val(new Date().toISOString().split('T')[0])
}

getVenenue(startOfDay.getTime(), endDate.getTime())

$('#start-time').change(function (e) {
    const startDate = new Date($('#start-time').val())
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date($('#end-time').val())
    endDate.setHours(23, 59, 59)

    localStorage.setItem('start-date', startDate)
    localStorage.getItem('end-date', endDate)

    if (endDate > startDate) {
        getVenenue(startDate.getTime(), endDate.getTime())
    } else {
        alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu")
        $('#envenue').empty()
    }
});

$('#end-time').change(function (e) {
    const startDate = new Date($('#start-time').val())
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date($('#end-time').val())
    endDate.setHours(23, 59, 59)

    localStorage.setItem('start-date', startDate)
    localStorage.getItem('end-date', endDate)

    if (endDate > startDate) {
        getVenenue(startDate.getTime(), endDate.getTime())
    } else {
        alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu")
        $('#envenue').empty()
    }
});

