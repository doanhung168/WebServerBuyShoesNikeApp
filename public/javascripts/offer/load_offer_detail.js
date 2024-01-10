function enableInput(enable) {

    const inputs = $('input').get()

    if (enable) {
        inputs.forEach(element => {
            $(element).prop('readonly', false)
        });
    } else {
        inputs.forEach(element => {
            $(element).prop('readonly', true)
        });
    }

    const selects = $('select').get()
    selects.forEach(element => {
        if (enable) {
            $(element).prop('disabled', false)
        } else {
            $(element).prop('disabled', true)
        }
    });

    const textareas = $('textarea').get()
    textareas.forEach(element => {
        if (enable) {
            $(element).prop('readonly', false)
        } else {
            $(element).prop('readonly', true)
        }
    });

    const colors = $('input[type="color"]').get()
    colors.forEach(element => {
        if (enable) {
            $(element).prop('disabled', false)
        } else {
            $(element).prop('disabled', true)
        }
    })


    const checkboxs = $('input[type="checkbox"]').get()
    checkboxs.forEach(element => {
        if (enable) {
            $(element).prop('disabled', false)
        } else {
            $(element).prop('disabled', true)
        }
    });

    const radioes = $('input[type="radio"]').get()
    radioes.forEach(element => {
        if (enable) {
            $(element).prop('disabled', false)
        } else {
            $(element).prop('disabled', true)
        }
    })

    $('#offer_title').prop('readonly', true)

    if (enable) {
        $('#offer-image').attr('data-enable', true)
    } else {
        $('#offer-image').attr('data-enable', false)
    }
}

function formatDateFromNumber(dateNumber) {
    const date = new Date(dateNumber);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so we add 1
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}


function disableShoesList() {
    $('#shoes-div').remove();
    $('#shoes_type').css('display', 'none');
}

function disableShoesTypeList() {
    $('#shoes-type-div').remove()
    $('#shoes').css('display', 'none');
}

function loadShoesList(selectedShoesList) {
    $.ajax({
        type: "get",
        url: "/shoes?state=1&get_id=1&get_name=1&sort_name=1",
        success: function (response) {
            if (response.success) {
                $('#shoes-list').empty()
                console.log(response.data)
                response.data.forEach(shoes => {
                    $('#shoes-list').append(
                        `<div class="form-check">
                            <input ${selectedShoesList.includes(shoes._id) ? 'checked' : ''} class="form-check-input" type="checkbox" value="${shoes._id}" name="shoes-item" id="${shoes._id}" onchange="checkboxListener(this)" disabled/>
                            <label class="form-check-label" for="${shoes._id}">${shoes.name}</label>
                        </div>`
                    )
                })

            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });
}


function loadOfferDetail(_id) {

    let id = _id
    if (id == null) {
        id = $('#offer-id').attr('data-id')
    }

    $.ajax({
        type: "get",
        url: "/offer?_id=" + id,
        success: function (response) {
            if (response.success) {
                const offer = response.data[0]
                console.log(offer)
                $('#offer_title').val(offer.title)
                $('#offer_description').val(offer.description)
                $('#offer_discount').val(offer.discount)
                $('#discount_unit').val(offer.discount_unit)
                $('#start-time').val(formatDateFromNumber(offer.start_time))
                $('#end-time').val(formatDateFromNumber(offer.end_time))
                $('#discount_type').val(offer.type)

                $('#offer-image').attr('src', offer.image)

                if (offer.number_of_offer == '-1') {
                    $('#number_of_offer_unlimited').prop('checked', true)
                    $('#number_of_offer').css('display', 'none')
                } else {
                    $('#number_of_offer').val(offer.number_of_offer)
                }

                if (offer.max_value == '-1') {
                    $('#unlimit_max_value').prop('checked', true)
                    $('#max_value').css('display', 'none')
                } else {
                    $('#max_value').val(offer.max_value)
                }

                $('#number_of_used_offer').text(offer.number_of_used_offer)
                $('#active').val(`${offer.active}`)
                $('#value_to_apply').val(offer.value_to_apply)

                enableInput(false)
            }
        }
    });
}

loadOfferDetail(null)


function enableEditor(element) {
    if ($(element).attr('data-enable') == 'true') {
        $('#enable_editor').attr('data-enable', false)
        $('#enable_editor').text('Mở trình chỉnh sửa khuyến mãi')
        $('#save_offer').addClass('d-none')
        enableInput(false)
    } else {
        $('#enable_editor').attr('data-enable', true)
        $('#enable_editor').text('Đóng trình chỉnh sửa khuyến mãi')
        $('#save_offer').removeClass('d-none')
        enableInput(true)
    }
}

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

function uploadOffer() {

    const id = $('#offer-id').attr('data-id')

    const description = $('#offer_description').val()
    if (description == '') {
        alert('Vui lòng nhập mô tả')
        return
    }

    const discount = $('#offer_discount').val()
    if (discount == '') {
        alert('Vui lòng nhập khuyến mãi')
        return
    }

    const discountUnit = $('#discount_unit').val()
    if (discountUnit == '') {
        alert('Vui lòng nhập đơn vị của khuyến mãi')
        return
    }

    const startTime = $('#start-time').val()
    if (startTime == '') {
        alert('Vui lòng nhập thời gian bắt đầu')
        return
    }

    const endTime = $('#end-time').val()
    if (endTime == '') {
        alert('Vui lòng nhập thời gian kết thúc')
        return
    }

    if ((new Date(endTime).getTime() + (1000 * 60 * 60 * 24 - 1000)) - (new Date(startTime).getTime()) <= 0) {
        alert('Thời gian kết thúc khuyến mãi phải sau thời gian bắt đầu khuyến mãi')
        return
    }


    let imageSrc = $('#offer-image').attr('src')
    if (imageSrc == './images/add_img_placeholder.png') {
        alert('Vui lòng chọn ảnh cho khuyến mãi này')
        return
    }

    let numberOfOffer = -1
    if ($('#number_of_offer_unlimited').prop('checked')) {
        numberOfOffer = -1
    } else {
        const number = $('#number_of_offer').val()
        if (number == '') {
            alert('Vui lòng chọn số lượng vé khuyến mãi')
            return
        } else {
            numberOfOffer = number
        }
    }

    let maxValue = -1
    if ($('#unlimit_max_value').prop('checked')) {
        maxValue = -1
    } else {
        const number = $('#max_value').val()
        if (number == '') {
            alert('Vui lòng chọn số lượng vé khuyến mãi')
            return
        } else {
            maxValue = number
        }
    }

    const active = $('#active').val()
    const value_to_apply = $('#value_to_apply').val()

    const offer = {
        id: id,
        description: description,
        discount: discount,
        discount_unit: discountUnit,
        start_time: new Date(startTime).getTime(),
        end_time: new Date(endTime).getTime() + (1000 * 60 * 60 * 24 - 1000),
        image: imageSrc,
        number_of_offer: numberOfOffer,
        active: active,
        value_to_apply: value_to_apply,
        max_value: maxValue
    }

    $.ajax({
        type: "put",
        url: "/offer",
        data: offer,
        success: function (response) {
            if (response.success) {
                $('input').val('')
                alert('Cập nhật thành công một khuyến mãi')
                location.reload()

            } else {
                alert(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });


}









