$('#allCustomer').change(function (e) {
    if ($('#allCustomer').prop('checked')) {
        const inputs = $('input[name="customerType"][id]:not(#allCustomer)').get()
        inputs.forEach(element => {
            $(element).prop('checked', true)
        });
    } else {
        $('input[name="customerType"][id]:not(#allCustomer)').prop('checked', false)
    }
});


const inputs = $('input[name="customerType"][id]:not(#allCustomer)').get()
inputs.forEach(element => {
    $(element).change(function (e) { 
        if(!$(element).prop('checked')) {
            $('#allCustomer').prop('checked', false)
        }
    });
})
