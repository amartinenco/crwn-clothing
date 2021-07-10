import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JBX4xKv579Enm16d5bGcYpBNnvMemvyzN3k3v4ZVBNnVHS6EsRLo5Mj9Zh68nCWxZ6Y9xITFdih3R3dBzH6Hkwg00rqbPMMNB';

    const onToken = token => {
        console.log(token); // passed to backend for processing
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );    
};

export default StripeCheckoutButton;