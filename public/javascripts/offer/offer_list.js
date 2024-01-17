function loadOfferList() {
    $.ajax({
        type: "get",
        url: "/offer/get-available-offer",
        success: function (response) {
            if (response.success) {
                $('#offer-list').empty()
                if(response.data.length == 0) {
                    showNoneData()
                } else {
                    response.data.forEach(element => {
                        createOneUI(element)
                    });
                }
            } else {
                console.log(response.message)
            }
        }
    });
}

function createOneUI(element) {
    $('#offer-list').append(
        `<div class="offer-item d-flex flex-row mb-3 bg-light border-1 p-3">
        <img src="${element.image}" style="width: 300px; height: 180px;">
        <div class="d-flex flex-column justify-content-top ms-5">
            <p><b>Tiêu đề: </b><span>${element.title}</span></p>
            <p><b>Khuyến mãi: </b><span>${element.discount}${element.discount_unit == 0? '%': ' VNĐ'}</span></p>
            <p><b>Áp dụng với đơn hàng có giá trị lớn hơn hoặc bằng: </b><span>${element.value_to_apply} VNĐ </span></p>
            <p><b>Số lượng khuyến mãi đã sử dụng: </b><span>${element.number_of_used_offer}/${element.number_of_offer == -1? 'Không giới hạn': `${element.number_of_offer}`}</span></p>
            <a href="offer-detail/${element._id}" class="mt-2 hand-pointer">Nhấn để xem chi tiết</a>
        </div>
    </div>`)
}

function showNoneData() {
    $('#offer-list').append(
        `<p>Không có khuyến mãi nào ở trạng thái trên</p>`
    )
}

loadOfferList()


$('#offer_state').change(function() {
    // Retrieve the selected value
    var selectedValue = $(this).val();

    switch(selectedValue) {
        case '0': {
            $.ajax({
                type: "get",
                url: "/offer/get-available-offer",
                success: function (response) {
                    if (response.success) {
                        $('#offer-list').empty()
                        if(response.data.length == 0) {
                            showNoneData()
                        } else {
                            response.data.forEach(element => {
                                createOneUI(element)
                            });
                        }
                    } else {
                        console.log(response.message)
                    }
                }
            });
            break
        }

        case '1': {
            $.ajax({
                type: "get",
                url: "/offer?sort_created_date=-1",
                success: function (response) {
                    if (response.success) {
                        $('#offer-list').empty()
                        if(response.data.length == 0) {
                            showNoneData()
                        } else {
                            response.data.forEach(element => {
                                createOneUI(element)
                            });
                        }
                    } else {
                        console.log(response.message)
                    }
                }
            });
            break
        }

        case '2': {
            $.ajax({
                type: "get",
                url: "/offer/get-expired-offer",
                success: function (response) {
                    if (response.success) {
                        $('#offer-list').empty()
                        if(response.data.length == 0) {
                            showNoneData()
                        } else {
                            response.data.forEach(element => {
                                createOneUI(element)
                            });
                        }
                    } else {
                        console.log(response.message)
                    }
                }
            });
            break
        }

        case '3': {
            $.ajax({
                type: "get",
                url: "/offer?active=false&sort_created_date=-1",
                success: function (response) {
                    if (response.success) {
                        $('#offer-list').empty()
                        if(response.data.length == 0) {
                            showNoneData()
                        } else {
                            response.data.forEach(element => {
                                createOneUI(element)
                            });
                        }
                    } else {
                        console.log(response.message)
                    }
                }
            });
            break
        }

    }

})