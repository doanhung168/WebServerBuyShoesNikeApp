const btnAddSize = document.getElementById('btn_add_size')
const sizeContainer = document.getElementById('size_container')

btnAddSize.addEventListener('click', () => {
    var myModal = new bootstrap.Modal(document.getElementById('size_modal'), {
        keyboard: false
      })
    myModal.show(btnAddSize)
})

function selectSize(target) {
    if (target.style.backgroundColor != 'green') {
        target.style.backgroundColor = 'green'
        target.style.color = 'white'
        sizeContainer.insertAdjacentHTML('beforeend', 
        `<p class="border me-3 data-size" style="width: 45px;height: 30px; line-height: 30px;" data-size=${target.getAttribute('data-size')}>${target.getAttribute('data-size')}</p>`)
    } else {
        target.style.backgroundColor = null
        target.style.color = null
        const size = target.getAttribute('data-size')

        const elements = document.getElementsByClassName('data-size')
        for(let i = 0; i < elements.length; i++) {
            console.log(elements[i].getAttribute('data-size'))
            if(elements[i].getAttribute('data-size') == size) {
                elements[i].remove()
                return
            }
        }
    }

}