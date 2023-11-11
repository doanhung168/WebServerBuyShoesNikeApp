function loadShoesList() {

    $.ajax({
        type: "get",
        url: "/shoes?get_name=1&get_main_image&get_price=1&get_sold=1&get_type=1&get_rate=1",
        success: function (response) {
            if (response.success) {
                $('#shoes-list-container').empty()
                $('#number_of_shoes').text(' ' + response.data.length)
                response.data.forEach(element => {
                    $('#shoes-list-container').append(
                        `<div class="offer-item d-flex flex-row mb-3 bg-light border-1 p-3">
                            <img src="${element.main_image}" style="width: 150px; height: 150px;"/>
                                <div class="d-flex flex-column justify-content-top ms-3">
                                    <p><b>Tên giày: </b><span>${element.name}</span></p>
                                    <p><b>Giá giày: </b><span>${element.price} USD</span> </p>
                                    <p><b>Số lượng đã bán: </b><span>${element.sold}</span> </p>
                                    <p><b>Đáng giá: </b><span>${element.rate}</span> </p>
                                    <p><b>Loại giày: </b><span>${element.type}</span> </p>
                                    <a href="/shoes-detail/${element._id}" class="mt-2 hand-pointer">Nhấn để xem chi tiết</a>
                                </div>
                        </div>`
                    )
                });
            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });

}

loadShoesList()