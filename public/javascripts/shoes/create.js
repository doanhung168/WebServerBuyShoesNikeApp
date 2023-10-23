

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

    const shoes = {
        name: name,
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
        type: "post",
        url: "/shoes/",
        data: shoes,
        success: function (response) {
            if(response.success) {
                alert('Create shoes successfully')
            } else {
                alert(response.message)
            }
        }
    });

}
