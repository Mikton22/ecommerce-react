export default function Checkout() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>

            <div className="checkout-item">
              <img className="checkout-item-image" />
              <div className="checkout-item-details">
                <h3 className="checkout-item-name"></h3>
                <p className="checkout-item-price">each</p>
              </div>
              <div className="checkout-item-controls">
                <div className="quantity-controls">
                  <button className="quantity-btn">-</button>
                  <span className="quantity-value"></span>
                  <button className="quantity-btn">+</button>
                </div>

                <p className="checkout-item-total"></p>
                <button className="btn btn-secondary btn-small">Remove</button>
              </div>
            </div>
          </div>

          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value"></p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final"></p>
            </div>
            <button className="btn btn-primary btn-large btn-block">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
