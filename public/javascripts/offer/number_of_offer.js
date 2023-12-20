$('#number_of_offer_unlimited').change(function (e) { 
    if($(e.target).is(':checked')) {
        $('#number_of_offer').css('display', 'none')
    } else {
        $('#number_of_offer').css('display', 'inline')
    }
});

$('#unlimit_max_value').change(function (e) {
    if($(e.target).is(':checked')) {
        $('#max_value').css('display', 'none')
    } else {
        $('#max_value').css('display', 'inline')
    }
})