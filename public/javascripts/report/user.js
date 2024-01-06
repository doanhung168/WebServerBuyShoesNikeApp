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

function loadUser(startTime, endTime) {
    $.ajax({
        type: "get",
        url: `/user?start_time=${startTime}&end_time=${endTime}`,
        success: function (res) {
            if(res.success) {
                console.log(res.data)
                $('#user').empty()
                $('#user').append(
                    `<tr>
                        <th>Mã người dùng</th>
                        <th>Tên người dùng</th>
                        <th>Ngày đăng ký</th>
                    </tr>`
                )
                let count = 0
                $.each(res.data, function (index, item) {
                    count++
                    $('#user').append(
                        `<tr>
                            <td><a href="/_user-detail/${item._id}">#${item._id}</a></td>
                            <td>${item.name}</td>
                            <td>${longToDate(item.created_date)}</td>
                        </tr>`
                    );
                });
                $('#user').append(
                    `<tr>
                        <th>Tổng: ${count} người dùng</th>
                        <th></th>
                        <th></th>
                    </tr>`
                )
            } else {
                console.log(res.message)
            }
        }
    });
}

var startOfMonth
if(localStorage.getItem('user-start-date')) {
    startOfMonth = new Date(localStorage.getItem('user-start-date'))
    startOfMonth.setHours(0, 0, 0, 0);
} else {
    startOfMonth = new Date()
    startOfMonth.setDate(1); // Set the day of the month to 1 (start of the month)
}
$('#start-time').val(startOfMonth.toISOString().split('T')[0])

var endOfMonth
if(localStorage.getItem('user-end-date')) {
    endOfMonth = new Date(localStorage.getItem('user-end-date'))
    endOfMonth.setHours(23, 59, 59, 999)
} else {
    endOfMonth = new Date()
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0); // Set to the last day of the current month
    endOfMonth.setHours(23, 59, 59, 999);
}
$('#end-time').val(endOfMonth.toISOString().split('T')[0])

loadUser(startOfMonth.getTime(), endOfMonth.getTime())

$('#start-time').change(function (e) {
    const startDate = new Date($('#start-time').val())
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date($('#end-time').val())
    endDate.setHours(23, 59, 59)

    localStorage.setItem('user-start-date', startDate)
    localStorage.getItem('user-end-date', endDate)

    if (endDate > startDate) {
        loadUser(startDate.getTime(), endDate.getTime())
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

    localStorage.setItem('user-start-date', startDate)
    localStorage.getItem('user-end-date', endDate)

    if (endDate > startDate) {
        loadUser(startDate.getTime(), endDate.getTime())
    } else {
        alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu")
        $('#envenue').empty()
    }
});

