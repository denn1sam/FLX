import React from 'react';
import PropTypes from 'prop-types';
import ItemOfPlaylist from './ItemOfPlaylist';

export default function FilterFavorite(props) {
  const { musicData, likedHandler } = props;
  return (
    <div>
      {musicData.length === 0 ? (
        <p className="empty-playlist-message">The playlist is empty</p>
      ) : (
        <ul className="music-list">
          {musicData.map(data => (
            <ItemOfPlaylist
              likedHandler={likedHandler}
              musicData={data}
              key={data.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

FilterFavorite.propTypes = {
  likedHandler: PropTypes.func.isRequired,
  musicData: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
