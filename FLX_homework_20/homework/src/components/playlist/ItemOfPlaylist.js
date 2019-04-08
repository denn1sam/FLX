import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemOfPlaylist extends Component {
  constructor(props) {
    super(props);

    this.handlerIsFavorite = this.handlerIsFavorite.bind(this);
  }

  handlerIsFavorite() {
    this.setState(prevstate => ({
      liked: !prevstate.liked,
    }));
  }

  render() {
    const {
      author, id, liked, title,
    } = this.props.musicData;
    return (
      <div>
        <li className="playlist-item">
          <div className="play-stop-button">
            <i className="material-icons">play_arrow</i>
          </div>
          <div className="description">
            <p className="description-title">{title}</p>
            <p className="description-author">{author}</p>
          </div>
          <div className="like-button">
            {liked ? (
              <i
                className="material-icons liked"
                onClick={() => {
                  this.props.likedHandler(id);
                }}
                role="presentation"
                onKeyDown={() => {
                  this.props.likedHandler(id);
                }}
              >
                favorite
              </i>
            ) : (
              <i
                className="material-icons"
                role="presentation"
                onClick={() => {
                  this.props.likedHandler(id);
                }}
                onKeyDown={() => {
                  this.props.likedHandler(id);
                }}
              >
                favorite
              </i>
            )}
          </div>
        </li>
      </div>
    );
  }
}

ItemOfPlaylist.propTypes = {
  musicData: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  likedHandler: PropTypes.func.isRequired,
};
