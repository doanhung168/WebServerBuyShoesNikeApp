

function createShoes() {
    
    const name = $('#shoes_name').val()
    if(name == '') {
        alert('Name cannot be empty')
        return
    }

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


    const quantity = $('#shoes_quantity').val()
    if(quantity == '' || parseInt(quantity) < 0) {
        alert('Vui lòng nhập số lượng giày hiện có')
        return
    }

    const discount_quantity = $('#shoes_discount').val()
    if(discount_quantity == '') {
        alert('Vui lòng nhập giảm giá')
        return
    }

    const discount_unit = $('#discount_unit').val()
    if(discount_unit == '0' && discount_quantity > 100 ) {
        alert('Kiểm tra lại giảm giá')
        return
    }


    const shoes = {
        name: name,
        description: description,
        price: price,
        type: shoesType,
        available_sizes: sizeArr,
        available_colors: colorArr,
        main_image: imageArr[0],
        images: imageArr,
        gender: gender,
        quantity: quantity,
        discount_quantity: discount_quantity,
        discount_unit: discount_unit,
    }

    $.ajax({
        type: "post",
        url: "/shoes/",
        data: shoes,
        success: function (response) {
            if(response.success) {
                alert('Tạo giày thành công')
                window.location.href = "/shoes-list"
            } else {
                alert(response.message)
            }
        }
    });

}
