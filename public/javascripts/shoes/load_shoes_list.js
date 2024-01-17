let shoesList

if (localStorage.getItem("shoes-list-state")) {
    console.log(localStorage.getItem("shoes-list-state"))
    if (localStorage.getItem("shoes-list-state") == 3) {
        loadAllShoes()
    } else {
        loadShoesByState(localStorage.getItem("shoes-list-state"))
    }
    $('#shoes_state').val(localStorage.getItem("shoes-list-state"))
} else {
    loadShoesByState(1)
    $('#shoes_state').val(1)
}


function loadShoesByState(state) {
    $.ajax({
        type: "get",
        url: "/shoes?get_name=1&get_main_image&get_price=1&get_sold=1&get_type=1&get_rate=1&sort_created_date=-1&state=" + state,
        success: function (response) {
            if (response.success) {
                shoesList = response.data
                $('#shoes-list-container').empty()
                $('#number_of_shoes').text(' ' + response.data.length)
                if(response.data.length == 0) {
                    $('#shoes-list-container').append(
                        `<p>Hiện tại chưa có giày nào ở trạng thái này</p>`
                    )
                } else {
                    response.data.forEach(element => {
                        $('#shoes-list-container').append(
                            `<div class="offer-item d-flex flex-row mb-3 bg-light border-1 p-3">
                                <img src="${element.main_image}" style="width: 150px; height: 150px;"/>
                                    <div class="d-flex flex-column justify-content-top ms-3">
                                        <p><b>Tên giày: </b><span>${element.name}</span></p>
                                        <p><b>Giá giày: </b><span>${element.price} VNĐ</span> </p>
                                        <p><b>Số lượng đã bán: </b><span>${element.sold}</span> </p>
                                        <p><b>Đáng giá: </b><span>${element.rate}</span> </p>
                                        <p><b>Loại giày: </b><span>${element.type}</span> </p>
                                        <a href="/shoes-detail/${element._id}" class="mt-2 hand-pointer">Nhấn để xem chi tiết</a>
                                    </div>
                            </div>`
                        )
                    });
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

function loadAllShoes() {
    $.ajax({
        type: "get",
        url: "/shoes?get_name=1&get_main_image&get_price=1&get_sold=1&get_type=1&get_rate=1&sort_created_date=-1",
        success: function (response) {
            if (response.success) {
                shoesList = response.data
                $('#shoes-list-container').empty()
                $('#number_of_shoes').text(' ' + response.data.length)

                if(response.data.length == 0) {
                    $('#shoes-list-container').append(
                        `<p>Hiện tại chưa có giày nào được tạo này</p>`
                    )
                } else {
                    response.data.forEach(element => {
                        $('#shoes-list-container').append(
                            `<div class="offer-item d-flex flex-row mb-3 bg-light border-1 p-3">
                                <img src="${element.main_image}" style="width: 150px; height: 150px;"/>
                                    <div class="d-flex flex-column justify-content-top ms-3">
                                        <p><b>Tên giày: </b><span>${element.name}</span></p>
                                        <p><b>Giá giày: </b><span>${element.price} VNĐ</span> </p>
                                        <p><b>Số lượng đã bán: </b><span>${element.sold}</span> </p>
                                        <p><b>Đáng giá: </b><span>${element.rate}</span> </p>
                                        <p><b>Loại giày: </b><span>${element.type}</span> </p>
                                        <a href="/shoes-detail/${element._id}" class="mt-2 hand-pointer">Nhấn để xem chi tiết</a>
                                    </div>
                            </div>`
                        )
                    });
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

$('#shoes_state').change(function () {
    // Retrieve the selected value
    var selectedValue = $(this).val();
    localStorage.setItem('shoes-list-state', selectedValue)
    if (selectedValue == 3) {
        loadAllShoes()
    } else {
        loadShoesByState(selectedValue)
    }
});


function filterShoesByName() {
    const name = $('#queryText').val()
    console.log("name=" + name)

    const newShoesList = shoesList.filter(function (item) {
        return item.name.toLowerCase().includes(name.toLowerCase())
    })

    $('#shoes-list-container').empty()
    $('#number_of_shoes').text(' ' + newShoesList.length)
    console.log(newShoesList)

    if(newShoesList.length == 0) {
        $('#shoes-list-container').append(
            `<p>Không tìm thấy giày nào có tên và trạng thái theo yêu cầu</p>`
        )
    } else {
        newShoesList.forEach(element => {
            $('#shoes-list-container').append(
                `<div class="offer-item d-flex flex-row mb-3 bg-light border-1 p-3">
                    <img src="${element.main_image}" style="width: 150px; height: 150px;" />
                    <div class="d-flex flex-column justify-content-top ms-3">
                        <p><b>Tên giày: </b><span>${element.name}</span></p>
                        <p><b>Giá giày: </b><span>${element.price} VNĐ</span> </p>
                        <p><b>Số lượng đã bán: </b><span>${element.sold}</span> </p>
                        <p><b>Đáng giá: </b><span>${element.rate}</span> </p>
                        <p><b>Loại giày: </b><span>${element.type}</span> </p>
                        <a href="/shoes-detail/${element._id}" class="mt-2 hand-pointer">Nhấn để xem chi tiết</a>
                    </div>
                </div>`
            )
        });
    }

    

}