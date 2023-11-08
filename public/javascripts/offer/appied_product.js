function loadShoesList() {
    $.ajax({
        type: "get",
        url: "/shoes?state=1&get_id=1&get_name=1&sort_name=1",
        success: function (response) {
            if (response.success) {
                $('#shoes-list').empty()
                response.data.forEach(shoes => {
                    $('#shoes-list').append(
                        `<div class="form-check">
                            <input class="form-check-input" type="checkbox" value="${shoes._id}" name="shoes-item" id="${shoes._id}" onchange="checkboxListener(this)"/>
                            <label class="form-check-label" for="${shoes._id}">${shoes.name}</label>
                        </div>`
                    )
                })
                $('#all-shoes').prop('checked', true)
                checkAll($('#all-shoes'))
                $('#number_of_product').text(`Đã chọn ${response.data.length} sản phẩm`)
            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });
}

function loadShoesTypeList() {
    $.ajax({
        type: "get",
        url: "/shoes_type?active=true&get_id=1&get_name=1&sort_name=1",
        success: function (response) {
            if (response.success) {
                $('#shoes-type-list').empty()
                response.data.forEach(shoesType => {
                    $('#shoes-type-list').append(
                        `<div class="form-check">
                            <input class="form-check-input" type="checkbox" value="${shoesType._id}" name="shoes-type-item" id="${shoesType._id}" onchange="checkboxListener(this)"/>
                            <label class="form-check-label" for="${shoesType._id}">${shoesType.name}</label>
                        </div>`
                    )
                })
                $('#all-shoes-type').prop('checked', true)
                checkAll($('#all-shoes-type'))
            } else {
                console.log(response.message)
            }
        },
        error: function (_, error) {
            console.log(error)
        }
    });
}

function checkboxListener(element) {
    if (!$(element).is(':checked')) {
        const div = $(element).parent().parent().parent().find('div')[0]
        const input = $(div).find('input')[0]
        $(input).prop('checked', false)
    }
}

function checkAll(element) {
    const inputs = $(element).parent().next().find('input').get()
    if ($(element).is(':checked')) {
        inputs.forEach(e => {
            $(e).prop('checked', true)
        })
    } else {
        inputs.forEach(e => {
            $(e).prop('checked', false)
        })
    }
}

function checkProductType(e) {
    if ($(e).is(':checked') && $(e).val() == 'shoes') {
        const shoesList = $('#shoes-list').find('input:checked').get();
        $('#number_of_product').text(`Đã chọn ${shoesList.length} sản phẩm`)
    } else if ($(e).is(':checked') && $(e).val() == 'shoes_type') {
        const shoesTypeList = $('#shoes-type-list').find('input:checked').get();
        $('#number_of_product').text(`Đã chọn ${shoesTypeList.length} sản phẩm`)
    }
}



loadShoesList()
loadShoesTypeList()

$('#choose-product').click(function (e) {
    e.preventDefault();
    const productInput = $('input[name="product"]:checked').val()
    if (productInput == 'shoes') {
        var bsOffcanvas = new bootstrap.Offcanvas($('#offcanvasForShoes'))
        bsOffcanvas.show()
    } else {
        var bsOffcanvas = new bootstrap.Offcanvas($('#offcanvasForShoesType'))
        bsOffcanvas.show()
    }
});

var offcanvas = $('#offcanvasForShoes');

offcanvas.on('show.bs.offcanvas', function () {
    const shoesList = $('#shoes-list').find('input:checked').get();
    $('#number_of_product').text(`Đã chọn ${shoesList.length} sản phẩm`)
});

offcanvas.on('hide.bs.offcanvas', function () {
    const shoesList = $('#shoes-list').find('input:checked').get();
    $('#number_of_product').text(`Đã chọn ${shoesList.length} sản phẩm`)
});

var offcanvas = $('#offcanvasForShoesType');

offcanvas.on('show.bs.offcanvas', function () {
    const shoesTypeList = $('#shoes-type-list').find('input:checked').get();
    $('#number_of_product').text(`Đã chọn ${shoesTypeList.length} sản phẩm`)
});


offcanvas.on('hide.bs.offcanvas', function () {
    const shoesTypeList = $('#shoes-type-list').find('input:checked').get();
    $('#number_of_product').text(`Đã chọn ${shoesTypeList.length} sản phẩm`)
});


