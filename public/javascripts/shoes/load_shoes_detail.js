let currentShoes = null
let shoesTypes = []
function loadShoesDetail() {
    const id = $('#shoes_id').attr('data-id')
    $.ajax({
        type: "get",
        url: `/shoes/shoes-by-id?_id=${id}&pot_type=type`,
        success: function (response) {
            if (response.success) {
                currentShoes = response.data
                console.log(currentShoes)
                $('#shoes_name').val(currentShoes.name)
                $('#shoes_description').val(currentShoes.description)
                $('#shoes_price').val(currentShoes.price)
                $('#shoes_type').val(currentShoes.type._id)
                currentShoes.available_colors.forEach(element => {
                    $('#color_container').append(
                        `<div class="me-3" style="position: relative;display: inline-block;">
                            <i class="fa-solid fa-circle-minus clear-color" onclick="return removeColor(this);" style="position: absolute; right: -7px; top: -7px;"></i>
                            <input type="color" style="width: 50px;" class="form-control form-control-color" value="${element}">
                        </div>`
                    )
                });

                currentShoes.available_sizes.forEach(element => {
                    $('#size-' + element).trigger("click")
                });

                $('#image_container').empty()
                $('#image_container').append(
                    `<div class="me-3" style="position: relative;display: inline-block;">
                        <i class="fa-solid fa-circle-minus clear-image" onclick="return removeImage(this);" style="position: absolute; right: 18px; top: 2px;color: #e41b4d"></i>
                        <img src="${currentShoes.main_image}"  width="150px" height="150px" alt="" class="me-3 shoes_image_item">
                    </div>`
                );

                currentShoes.images.forEach(element => {
                    $('#image_container').append(
                        `<div class="me-3" style="position: relative;display: inline-block;">
                            <i class="fa-solid fa-circle-minus clear-image" onclick="return removeImage(this);" style="position: absolute; right: 18px; top: 2px;color: #e41b4d"></i>
                            <img src="${element}"  width="150px" height="150px" alt="" class="me-3 shoes_image_item">
                        </div>`
                    );
                });

                $('#gender_type').val(currentShoes.gender)
                $('#shoes_state').val(currentShoes.state)

                enableInput(false)
            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });
}


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
    });

    if (enable) {
        $('#btn_add_color').css('display', 'block')
        $('.clear-color').get().forEach(element => {
            $(element).css('display', 'block')
        });
        $('#btn_add_size').css('display', 'block')
        $('#btn_add_image').css('display', 'block')
        $('.clear-image').get().forEach(element => {
            $(element).css('display', 'block')
        });
        $('#btn_update_shoes').css('display', 'block')
    } else {
        $('#btn_add_color').css('display', 'none')
        $('.clear-color').get().forEach(element => {
            $(element).css('display', 'none')
        });
        $('#btn_add_size').css('display', 'none')
        $('#btn_add_image').css('display', 'none')
        $('.clear-image').get().forEach(element => {
            $(element).css('display', 'none')
        });
        $('#btn_update_shoes').css('display', 'none')
    }

    $('#shoes_name').prop('readonly', true)
}


$('#btnEditor').click(function (e) {
    const enalbe = $('#btnEditor').attr('data-enable')
    if (enalbe == 'true') {
        $('#btnEditor').attr('data-enable', 'false')
        $('#btnEditor').text('Mở trình chỉnh sửa')
        enableInput(false)
    } else {
        $('#btnEditor').attr('data-enable', 'true')
        $('#btnEditor').text('Đóng trình chỉnh sửa')
        enableInput(true)
    }

});

function loadShoesType() {
    $.ajax({
        type: "get",
        url: "/shoes_type",
        success: function (response) {
            if (response.success) {
                shoesTypes = response.data
                $('#shoes_type').empty()
                $('#shoes_type').append('<option value="" selected>Vui lòng chọn loại giày</option>')
                response.data.forEach(element => {

                    if (currentShoes != null && currentShoes._id == element._id) {
                        $('#shoes_type').append(
                            `<option value="${element._id}" selected>${element.name}</option>`
                        )
                    } else {
                        $('#shoes_type').append(
                            `<option value="${element._id}" >${element.name}</option>`
                        )
                    }
                });

                loadShoesDetail()

            } else {
                console.log(response.message)
            }
        },
        error: function (_, err) {
            console.log(err)
        }
    });
}

loadShoesType()


function updateShoes() {
    
    const id = $('#shoes_id').attr('data-id')

    const description = $('#shoes_description').val()
    if(description == '') {
        alert('Description cannot be empty')
        return
    }

    const price = $('#shoes_price').val()
    if(price == '') {
        alert('Price cannot be empty')
        return
    }

    const shoesType = $('#shoes_type').val()
    if(shoesType == '') {
        alert('Please choose the shoes type')
        return
    }

    const colorArr = []
    const colorInputs = $('#color_container :input').get()
    colorInputs.forEach(element => {
        colorArr.push($(element).val())
    });

    if(colorArr.length == 0) {
        alert('Please choose the available colors for the shoes')
        return
    }


    const sizeArr = []
    const sizeInputs = $('#size_container .data-size').get()
    sizeInputs.forEach(element => {
        sizeArr.push($(element).attr('data-size'))
    });

    if(sizeArr.length == 0) {
        alert('Please choose available sizes for shoes')
        return
    }

    const imageArr = []
    const imageInputs = $('#image_container img').get()
    imageInputs.forEach(element => {
        imageArr.push($(element).attr('src'))
    });

    if(imageArr.length == 0) {
        alert('Please pick image for shoes')
        return
    }

    const gender = $('#gender_type').val()
    if(gender == '') {
        alert('Please choose gender')
        return
    }

    const shoes = {
        id: id,
        description: description,
        price: price,
        type: shoesType,
        available_sizes: sizeArr,
        available_colors: colorArr,
        main_image: imageArr[0],
        images: imageArr,
        gender: gender 
    }

    $.ajax({
        type: "put",
        url: "/shoes/",
        data: shoes,
        success: function (response) {
            if(response.success) {
                alert('Cập nhật thông tin giày thành công')
                location.reload()
            } else {
                alert(response.message)
            }
        }
    });
}