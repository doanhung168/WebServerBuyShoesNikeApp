
const btnAddColor = document.getElementById('btn_add_color')
const colorContainer = document.getElementById('color_container')

btnAddColor.addEventListener('click', () => {
    colorContainer.insertAdjacentHTML('beforeend',
        `<div class="me-3" style="position: relative;display: inline-block;">
            <i class="fa-solid fa-circle-minus" onclick="return removeColor(this);" style="position: absolute; right: -7px; top: -7px;"></i>
            <input type="color" style="width: 50px;" class="form-control form-control-color" value="#563d7c">
        </div>`
    )
})

function removeColor(target) {
    const parent = target.parentElement
    parent.remove()
}




