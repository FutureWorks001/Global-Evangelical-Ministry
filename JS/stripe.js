var stripe=
Stripe('your_api_key_here');

// stripe element for the credit input field
var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');


// addEventListener
var form = 
document.getElementById('payment-form');
var submitButton = 
document.getElementById('submit-payment');

submitButton.addEventListener('click', function(event) {
    event.preventDefault();


stripe.createToken(cardElement).then(function(result)
{
    if (result.error) {
        // inform the costomer that there was an error]

        console.log(result.error.message)
        ;
    }
   else{
    // send token to server to charge the costomer

    console.log(result.token);
}

});
});


