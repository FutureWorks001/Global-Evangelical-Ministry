  // Add your JavaScript code here
  const form = document.getElementById('payment-form');
  const errorElement = document.getElementById('error');

  // Set your publishable key
  const stripe = Stripe('<YOUR_PUBLISHABLE_KEY>');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Reset error message
      errorElement.textContent = '';

      // Validate form
      const name = document.getElementById('name').value;
      const cardNumber = document.getElementById('card-number').value;
      const expiryDate = document.getElementById('expiry-date').value;
      const cvc = document.getElementById('cvc').value;

      if (!name) {
          errorElement.textContent = 'Please enter the name on the card.';
          return;
      }

      if (!cardNumber) {
          errorElement.textContent = 'Please enter the card number.';
          return;
      }

      if (!expiryDate) {
          errorElement.textContent = 'Please enter the expiry date.';
          return;
      }

     if (!cvc) {
         errorElement.textContent = 'Please enter the CVC.';
         return;
     }

     // Create a PaymentMethod with the card details
     const {error, paymentMethod} = await stripe.createPaymentMethod({
         type: 'card',
         card: {
             number: cardNumber,
             exp_month: expiryDate.split('/')[0],
             exp_year: expiryDate.split('/')[1],
             cvc: cvc,
         },
         billing_details: {
             name: name,
         },
     });

     if (error) {
         // Show error message
         errorElement.textContent = error.message;
     } else {
         // Submit form with PaymentMethod ID
         alert(`Payment submitted with PaymentMethod ID: ${paymentMethod.id}`);
         form.reset();
     }
 });


