function getStatus(status) {
    switch (status) {
        case 0:
            return "Ngừng kinh doanh"
        case 1:
            return "Đang kinh doanh"
        case 2:
            return "Đã hết hàng"
    }
}

function loadShoes() {
    $.ajax({
        type: "get",
        url: "/shoes?get_name=1&get_quantity=1&get_sold=1&get_rate=1&get_state=1&sort_quantity=1",
        success: function (res) {
            if (res.success) {
                console.log(res.data)
                $('#shoes').empty()
                $('#shoes').append(
                    `<tr>
                         <th></th>
                         <th style="width: 50px;">Mã giày</th>
                         <th>Tên</th>
                         <th>Số lượng</th>
                         <th>Đã bán</th>
                         <th>Đánh giá</th>
                         <th>Trạng thái</th>
                     </tr>`
                )
                let count = 0
                $.each(res.data, function (index, item) {
                    count++
                    $('#shoes').append(
                        `<tr>
                            <td>${count}</td>
                            <td style="width: 50px;"><a href="/shoes-detail/${item._id}">#...${item._id.substring(item._id.length - 5, item._id.length )}</a></td>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${item.sold}</td>
                            <td>${item.rate}</td>
                            <td>${getStatus(item.state)}</td>
                        </tr>`
                    );
                });
            } else {
                console.log(res.message)
            }
        }
    });
}

loadShoes()