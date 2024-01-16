$.ajax({
    type: "get",
    url: "/order?status=0&get_order_details=1&get_total_price=1&sort_created_date=-1",
    success: function (response) {
        console.log(response)
        if (response.success) {
            $('#number_of_shoes').text(` ${response.data.length} đơn hàng`);
            $('#order-list-container').empty()
            if (response.success) {
                response.data.forEach(element => {
                    createItemUI(element)
                });
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

    $('#order-list-container').append(
        `<div class="col bg-light px-4 py-2 mt-4" id="order-item-list-${element._id}">
            <i><b style="font-size: 14px;"><a style="color: blue" href="/_order-detail/${element._id}">#${element._id}</a></b></i>
           ${orderDetailString}
           <div class="mt-2"><span class="fw-bold">Tổng giá:</span> ${element.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
        </div>`
    );

}

const getOrderByStatus = function getOrderByStatus(status) {
    $.ajax({
        type: "get",
        url: `/order?status=${status}&get_order_details=1&get_total_price=1&sort_created_date=-1`,
        success: function (response) {
            console.log(response)
            if (response.success) {
                $('#number_of_shoes').text(` ${response.data.length} đơn hàng`);
                $('#order-list-container').empty()
                if (response.success) {
                    response.data.forEach(element => {
                        createItemUI(element)
                    });
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

const getAllOrder = function getAllOrder() {
    $.ajax({
        type: "get",
        url: "/order?get_order_details=1&get_total_price=1&sort_created_date=-1",
        success: function (response) {
            console.log(response)
            if (response.success) {
                $('#number_of_shoes').text(` ${response.data.length} đơn hàng`);
                $('#order-list-container').empty()
                if (response.success) {
                    response.data.forEach(element => {
                        createItemUI(element)
                    });
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

let loadOrder
$('#order_state').change(function() {
    clearInterval(loadOrder);
    var selectedValue = $(this).val();

    if(selectedValue == '5') {
        getAllOrder()
        loadOrder = setInterval(function() {getAllOrder()}, 5000);
    } else {
        getOrderByStatus(selectedValue)
        loadOrder = setInterval(function() {getOrderByStatus(selectedValue)}, 5000);
    }
})

getOrderByStatus(-1)
loadOrder = setInterval(function() {getOrderByStatus(-1)}, 5000);