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

function createItemUI(element) {
    let orderDetailString = ``
    element.order_details.forEach(order_detail => {
        orderDetailString +=
            `<div class="mt-2">
                <p class="item-order-name fw-bold">${order_detail.shoes_id.name}</p>
                <div class="row mt-2">
                    <p class="col">Màu: <input style="outline: none; border: none;" class="ms-2" type="color" disabled value="${order_detail.color}"></input></p>
                    <p class="col">Cỡ: ${order_detail.size}</p>
                    <p class="col">Số lượng: ${order_detail.quantity}</p>
                </div>
            </div>`
    });

    $('#order-detail').append(
        `<div class="col" id="order-item-list-${element._id}">
            <i><b style="font-size: 14px;"><a style="color: blue" href="/_order-detail/${element._id}">#${element._id}</a></b></i>
            ${orderDetailString}
            <p class="mt-2">Địa chỉ: ${element.address.address}</p>
            <p class="mt-2">Số điện thoại: ${element.address.phone_number}</p>
            <p class="mt-2">Người nhận: ${element.address.user_name}</p>
            <p class="mt-2">Hình thức thanh toán: ${element.payment_method == 0 ? "Thanh toán bằng tiền mặt" : "Thanh toán trực tuyến"}</p>
            <p class="mt-2">Thời gian đặt hàng: ${longToDate(element.order_date)}</p>
            <div class="mt-2 d-flex">
                <p>Trạng thái: </p>
                <select id="shoes_state" class="mx-4" style="border: none; outline: none;"  ${element.status == 3 ? 'disabled' : ''}>
                    <option value="0" ${element.status == 0 ? 'selected' : ''}>Đang đóng gói</option>
                    <option value="1" ${element.status == 1 ? 'selected' : ''}>Đang vận chuyển</option>
                    <option value="2" ${element.status == 2 ? 'selected' : ''}>Đang giao hàng</option>
                    <option value="3" ${element.status == 3 ? 'selected' : ''}>Đã nhận hàng</option>
                </select>
            </div>
            <div class="mt-2"><span class="fw-bold">Tổng giá:</span> ${element.total_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
            <button class="mt-3 btn btn-outline-success" id="updateOrder" onClick="updateOrder()">Cập nhật trạng thái đơn hàng</button>
        </div>`
    );
}

function loadOrderDetail(id) {
    $.ajax({
        type: "get",
        url: "/order/getById?id=" + id,
        success: function (response) {
            console.log(response)
            if (response.success) {
                $('#order-detail').empty()
                if (response.success) {
                    console.log(response.data)
                    createItemUI(response.data)
                } else {
                    console.log(response.message)
                }

            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });
}

loadOrderDetail($('#order_id').val())


function updateOrder() {
    const status = $('#shoes_state').val()
    if(status == '3') {
        $.ajax({
            type: "put",
            url: "/order/completeOrder/",
            data: {id: $("#order_id").val()},
            success: function (response) {
                if(response.success) {
                    alert("Cập nhật trạng thái hóa đơn thành công")
                } else {
                    console.log(response.message)
                }
            }
        });
    } else {
        $.ajax({
            type: "put",
            url: "/order/",
            data: {id: $("#order_id").val(), status: $('#shoes_state').val()},
            success: function (response) {
                if(response.success) {
                    alert("Cập nhật trạng thái hóa đơn thành công")
                } else {
                    console.log(response.message)
                }
            }
        });
    }
    
}



