function loadOfferList() {
    $.ajax({
        type: "get",
        url: "/offer?get_image=1&get_title=1&get_sub_title=1&get_active=1&get_number_of_offer=1&get_number_of_used_offer=1&get_discount=1&get_discount_unit=1&get_end_time=1",
        success: function (response) {
            if (response.success) {
                $('#offer-list').empty()
                response.data.forEach(element => {

                    const expired = (new Date(element.end_time)) > Date.now()

                    $('#offer-list').append(
                        `<div class="offer-item d-flex flex-row mb-3 bg-light border-1 p-3">
                        <img src="..${element.image}" style="width: 150px; height: 150px;">
                        <div class="d-flex flex-column justify-content-top ms-3">
                            <p><b>Tiêu đề: </b><span>${element.title}</span></p>
                            <p><b>Tiêu đề 2: </b><span>${element.sub_title}</span> </p>
                            <p><b>Khuyến mãi: </b><span>${element.discount}${element.discount_unit == 1? '%': ' VNĐ'}</span></p>
                            <p><b>Số lượng khuyến mãi đã sử dụng: </b><span>${element.number_of_used_offer}/${element.number_of_offer == -1? 'Không giới hạn': `${element.number_of_offer}`}</span></p>
                            <p><b>Trạng thái: </b> <span>${element.active&&expired?'Có hiệu lực': 'Không còn hiệu lực'}</span></p>
                            <a href="offer-detail/${element._id}" class="mt-2 hand-pointer">Nhấn để xem chi tiết</a>
                        </div>
                    </div>`
                    )
                });
            } else {
                console.log(response.message)
            }
        }
    });
}

loadOfferList()