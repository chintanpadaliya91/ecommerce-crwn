import react from 'react'
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100
  const PublishableKey = 'pk_test_51Hv57KFGj8pO778yMJBH85Gntw3xjSVBW7AHk8Aztv65UnlEze5VzI6hXTNx2REgRPKtLXFeO5yA1qoh3deazWRt00WUhZ4cfc'
  const onToken = token => {
    console.log(token)
  }
  return (
    <StripeCheckout
      lable='Pay Now'
      name='CROWN Clothing GmbH'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={PublishableKey}
    />
  )
}


export default StripeCheckoutButton