import React from 'react';
import PropTypes from 'prop-types';
import ItemOfPlaylist from './ItemOfPlaylist';

export default function FilterAll(props) {
  const { musicData, likedHandler } = props;
  return (
    <div>
      <ul className="music-list">
        {musicData.map(data => (
          <ItemOfPlaylist
            likedHandler={likedHandler}
            musicData={data}
            key={data.id}
          />
        ))}
      </ul>
    </div>
  );
}

FilterAll.propTypes = {
  likedHandler: PropTypes.func.isRequired,
  musicData: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
