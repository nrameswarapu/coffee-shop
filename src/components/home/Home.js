import PropTypes from 'prop-types';
import Thumbnail from '../thumbnail/Thumbnail';
import { itemImages } from '../../items/index';

import './Home.css';

function Home({ items }) {
  return (
    <div className="home-component">
      {items.map((item) => (
        <Thumbnail
          key={item.id}
          id={item.id}
          image={itemImages[item.imageId]}
          title={item.title}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default Home;
