$('#create_offer_form').on('submit', function (e) {
    e.preventDefault();

    if (this.checkValidity()) {

        const title = $('#offer_title').val()
        const subTitle = $('#offer_sub_title').val()
        const description = $('#offer_description').val()
        const discount = $('#offer_discount').val()
        const discountUnit = $('#discount_unit').val()
        const startTime = $('#start-time').val()
        const endTime = $('#end-time').val()

        const userType = []

        if ($('#allCustomer').prop('checked')) {
            userType.push($('#allCustomer').val())
        } else {
            $('input[name="customerType"]:checked').each(function () {
                userType.push($(this).val())
            })
        }

        if (userType.length == 0) {
            alert('Vui lòng chọn loại khách hàng được áp dụng khuyến mãi')
            return
        }

        const applied_shoes = []
        const applied_shoes_type = []
        let appliedProduct = 0

        const productInput = $('input[name="product"]:checked').val()
        if (productInput == 'shoes') {
            appliedProduct = 1
            const shoesList = $('#shoes-list').find('input').get();
            shoesList.forEach(element => {
                if ($(element).is(':checked')) {
                    applied_shoes.push($(element).val())
                }
            });

            if (applied_shoes.length == 0) {
                alert('Vui lòng chọn giày được khuyến mãi')
                return
            }

        } else {
            appliedProduct = 2
            const shoesTypeList = $('#shoes-type-list').find('input').get()
            shoesTypeList.forEach(e => {
                if ($(e).is(':checked')) {
                    applied_shoes_type.push($(e).val())
                }
            })

            if (applied_shoes_type.length == 0) {
                alert('Vui lòng chọn loại giày được khuyến mãi')
                return
            }
        }


        let imageSrc = $('#offer-image').attr('src')
        if (imageSrc == '/images/placeholder.png') {
            alert('Vui lòng chọn ảnh cho khuyến mãi này')
            return
        } else {
            imageSrc = imageSrc.substring(2, imageSrc.length)
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

        const offer = {
            title: title,
            sub_title: subTitle,
            description: description,
            discount: discount,
            discount_unit: discountUnit,
            start_time: new Date(startTime).getTime(),
            end_time: new Date(endTime).getTime() + (1000 * 60 * 60 * 24 - 1000),
            applied_user_type: userType,
            applied_product_type: appliedProduct,
            image: imageSrc,
            number_of_offer: numberOfOffer
        }

        if (appliedProduct == 1) {
            offer.applied_shoes = applied_shoes
        } else {
            offer.applied_shoes_type = applied_shoes_type
        }

        $.ajax({
            type: "post",
            url: "/offer",
            data: offer,
            success: function (response) {
                if (response.success) {
                    alert('Đã tạo thành công một khuyến mãi mới')
                    location.reload();
                } else {
                    alert(response.message)
                }
            },
            error: function (_, err) {
                console.log(err)
            }
        });

    }
})

