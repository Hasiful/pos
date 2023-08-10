// full Screen
document.addEventListener("DOMContentLoaded", function() {
    const fullScreenBtn = document.getElementById("fullsecreen_btn");
    fullScreenBtn.addEventListener("click", toggleFullScreen);

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

// incress decress
  
const selectElemnt = {
    plusQuan: document.getElementsByClassName("incress_quantity"),
    minusQuan: document.getElementsByClassName("decress_quantity"),
    quantityInput: document.getElementsByClassName("quantity_input"),
    productPrice: document.getElementsByClassName("product_price_amount"),
    subtotalAmount: document.getElementsByClassName("subtotal__amount"),
    totalQuantityShow: document.getElementById("total_quantity"),
    totalAmountPrice: document.getElementById("price_total"),
    // vat tax
    totalDiscount: document.getElementById("total_discount"),
    orderTax: document.getElementById("order_tax"),
    shippingCharges: document.getElementById("shipping_charges"),
    totalPayment: document.getElementById("total_payment"),
}

// destructure

let {plusQuan, minusQuan, quantityInput, productPrice, subtotalAmount, totalQuantityShow, totalAmountPrice, totalDiscount, orderTax, shippingCharges, totalPayment} = selectElemnt

// plus
;[...plusQuan].forEach((plusBtn, index) => {
    plusBtn.addEventListener("click", () =>{
        getQuantity(true, index)
        vatAll()
    })
})

// minus
;[...minusQuan].forEach((minusBtn, index) => {
    minusBtn.addEventListener("click", () =>{
        getQuantity(false, index)
        vatAll()
    })
})

// get quantity
function getQuantity(value, index){
    let quantityInputArr = quantityInput[index]
    let inputValue = parseInt(quantityInputArr.value)
    let quantity = 0
    if(value == true){
        quantity = inputValue + 1
    }

    if(value == false && inputValue > 0){
        quantity = inputValue - 1
    }
    quantityInputArr.value = quantity
    subtotal(index, quantity)
}

// subtotal amount

function subtotal(index, quantityInputArr){
    let productPriceIndex = parseInt(productPrice[index].innerText)
    let subtotalAmountIndex = subtotalAmount[index]
    let subTotal = quantityInputArr * productPriceIndex
    subtotalAmountIndex.innerText = subTotal

    // total quantity
    totalQuantity()

    // total amopunt
    totalAmount()
}

// function total item count
function totalQuantity(){
    let sum = 0;
    [...quantityInput].map((item) => {
        let itemValue = parseInt(item.value)
        sum = sum + itemValue
    })
    totalQuantityShow.innerText = sum
}

// total amount

function totalAmount(){
    let total = 0;
    [...subtotalAmount].forEach(subtoal =>{
        let subtoalValue = parseFloat(subtoal.innerText)
        total = total + subtoalValue
    })

    totalAmountPrice.innerText = total;
}

// vat calculator

let vatInput = document.getElementsByClassName("vatInput");

[...vatInput].forEach((currentItem) => {
    currentItem.addEventListener("keyup", function () {
        vatAll();
    });
});

function vatAll() {
    let subTotalInner = parseFloat(totalAmountPrice.innerText) || 0;

    // TAX
    let tax = parseInt(orderTax.value) || 0;
    let newSubTotalTax = tax + subTotalInner;
    console.log(newSubTotalTax);
    totalPayment.innerText = newSubTotalTax;

    // DISCOUNT
    let discount = parseInt(totalDiscount.value) || 0;
    let subTotalDis = newSubTotalTax - discount;
    totalPayment.innerText = subTotalDis;

    // SHIPPING
    let shipping = parseInt(shippingCharges.value) || 0;
    let allTotalInCart = shipping + subTotalDis;
    totalPayment.innerText = allTotalInCart;
}
