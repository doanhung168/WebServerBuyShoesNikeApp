
$('#create_offer').click(function (e) {
    e.preventDefault();

    // const title = $('#offer_title').val()
    // if (title == '') {
    //     alert('Title cannot be empty')
    //     return
    // }

    // const subTitle = $('#offer_sub_title').val()
    // if (subTitle == '') {
    //     alert('Subtitle cannot be empty')
    //     return
    // }

    // const description = $('#offer_description').val()
    // if (description == '') {
    //     alert('Description cannot be empty')
    //     return
    // }

    // const discount = $('#offer_discount').val()
    // if (discount == '' || discount <= 0) {
    //     alert('Discount cannot be empty and discount bigger than zero')
    //     return
    // }

    // const discountUnit = $('#discount_unit').val()
    // if (discountUnit == '') {
    //     alert('Please, pick discount unit')
    //     return
    // }
    
    // const userType = []
    // $('input[name="user_type"]:checked').each(function() {
    //     userType.push($(this).val())
    // })

    // if(userType.length == 0) {
    //     alert('Please choose user type')
    //     return
    // }

    // const day = []
    // const startedTime = -1
    // const endedTime = -1

    // const timeInput = $('input[name="time-option"]:checked').val();
    // if(timeInput == 'time') {
    //     const start = Date.parse($('#started_time').val())
    //     const end = Date.parse($('#ended_time').val()) + (1000*60*60*24-1)

    //     if(start == '') {
    //         alert("Please select the started time")
    //         return
    //     }

    //     if(end == '') {
    //         alert('Please select the ended time')
    //         return
    //     }
    // } else {
    //     $('input[name="day"]:checked').each(function() {
    //         day.push($(this).val())
    //     })
        
    //     if(day.length == 0) {
    //         alert("Please select a day")
    //         return
    //     }
    // }

    const productInput = $('input[name="product"]:checked').val()
    if(productInput == 'shoes') {
        
    } else {

    }


    // const imageArr = []
    // const imageInputs = $('#image_container img').get()
    // imageInputs.forEach(element => {
    //     imageArr.push($(element).attr('src'))
    // });

    // if (imageArr.length == 0) {
    //     alert('Please pick image for shoes')
    //     return
    // }

});

