import PropTypes from 'prop-types';
import { useRef, useState, useMemo } from 'react';
import { CartTypes } from '../../reducers/cartReducer';
import './cart.css';

function Cart({ cart, items, dispatch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');

  const zipRef = useRef();
  const subTotal = cart.reduce((acc, item) => {
    const details = items.find((i) => i.id === item.id);
    return item.quantity * details.price + acc;
  }, 0);
  const taxRate = useMemo(
    () => {
      const taxPercentage = parseInt(zipCode.substring(0, 1) || '0', 10) + 1;
      return taxPercentage / 100;
    },
    [zipCode],
  );
  const tax = subTotal * taxRate;
  const formValid = zipCode.length === 5 && name.trim();
  const updatePhoneNumber = (newNumber) => {
    const digits = newNumber.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newNumber[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newNumber[7] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }
    setPhone(formatted);
    if (digits.length === 10) {
      zipRef.current.focus();
    }
  };
  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      { cart.length === 0
        ? <div>Your cart is empty.</div>
        : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {
                cart.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>{cartItem.quantity}</td>
                    <td>{items.find((item) => item.id === cartItem.id).title}</td>
                    <td>
                      {`$${(
                        cartItem.quantity * items.find((i) => i.id === cartItem.id).price
                      ).toFixed(2)}`}
                    </td>
                    <td>
                      <button
                        type="submit"
                        onClick={() => dispatch({
                          itemId: cartItem.id,
                          type: CartTypes.REMOVE,
                        })}
                      >
                        -
                      </button>
                      <button
                        type="submit"
                        onClick={() => dispatch({
                          itemId: cartItem.id,
                          type: CartTypes.ADD,
                        })}
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))
            }
              </tbody>
            </table>
            <div>
              Sub-total: $
              {subTotal.toFixed(2)}
            </div>
            {
              zipCode.length === 5 ? (
                <>
                  <div>
                    Tax: $
                    {tax.toFixed(2)}
                  </div>
                  <div>
                    Total: $
                    {(subTotal + tax).toFixed(2)}
                  </div>
                </>
              )
                : <div>Enter zipcode to calculate taxes and total</div>
            }

            <h3>Checkout</h3>
            <form>
              <label htmlFor="name">
                Name:
                {/* eslint-disable jsx-a11y/no-autofocus */}
                <input
                  autoFocus
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label htmlFor="phone">
                Phone:
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => updatePhoneNumber(event.target.value)}
                  required
                />
              </label>
              <label htmlFor="zipcode">
                Zip Code:
                <input
                  id="zipcode"
                  ref={zipRef}
                  type="number"
                  maxLength="5"
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                disabled={!formValid}
              >
                Place Order
              </button>
            </form>
          </>
        )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Cart;
