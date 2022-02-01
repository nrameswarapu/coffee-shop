import { useParams } from 'react-router-dom';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { itemImages } from '../../items/index';
import NotFound from '../notfound/NotFound';
import Thumbnail from '../thumbnail/Thumbnail';

import './Details.css';

const Details = memo(({ addToCart, id, items }) => {
  const detailItem = items.find((item) => item.id === id);
  const otherItems = items.filter((item) => item.id !== id);

  return (
    <div className="details-component">
      <div className="details-sidebar">
        <h2>Other Items</h2>
        {otherItems.map((item) => (
          <Thumbnail
            id={item.id}
            image={itemImages[item.imageId]}
            title={item.title}
            key={item.id}
          />
        ))}
      </div>
      <div className="details-box">
        { detailItem ? (
          <>
            <h2>{detailItem.title}</h2>
            <img
              className="details-image"
              src={itemImages[detailItem.imageId]}
              alt={detailItem.title}
            />
            <div>
              Price: $
              {' '}
              {detailItem.price.toFixed(2)}
            </div>
            <div>
              <button type="button" onClick={() => addToCart(detailItem.id)}>Add to Cart</button>
            </div>
          </>
        ) : (<NotFound />)}
      </div>
    </div>
  );
});

const sharedProps = {
  addToCart: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};
Details.propTypes = {
  ...sharedProps,
  id: PropTypes.string.isRequired,
};

const DetailsOuter = ({ addToCart, items }) => {
  const { id } = useParams();
  return (
    <Details addToCart={addToCart} id={id} items={items} />
  );
};

DetailsOuter.propTypes = sharedProps;

export default DetailsOuter;
