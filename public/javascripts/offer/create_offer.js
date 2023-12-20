$('#create_offer_form').on('submit', function (e) {
    e.preventDefault();

    if (this.checkValidity()) {

        const title = $('#offer_title').val()
        const description = $('#offer_description').val()
        const discount = $('#offer_discount').val()
        const discountUnit = $('#discount_unit').val()
        const startTime = $('#start-time').val()
        const endTime = $('#end-time').val()
        const value_to_apply = $('#value_to_apply').val()


        let imageSrc = $('#offer-image').attr('src')
        if (imageSrc == '/images/placeholder.png') {
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
        alert($('#unlimit_max_value').prop('checked'))
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


        const offer = {
            title: title,
            description: description,
            discount: discount,
            discount_unit: discountUnit,
            start_time: new Date(startTime).getTime(),
            end_time: new Date(endTime).getTime() + (1000 * 60 * 60 * 24 - 1000),
            image: imageSrc,
            number_of_offer: numberOfOffer,
            value_to_apply: value_to_apply,
            max_value: maxValue
        }

        $.ajax({
            type: "post",
            url: "/offer",
            data: offer,
            success: function (response) {
                if (response.success) {
                    alert('Đã tạo thành công một khuyến mãi mới')
                    window.location.href = "/offer-list"
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

