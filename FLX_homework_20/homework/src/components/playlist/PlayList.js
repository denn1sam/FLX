import React, { Component } from 'react';
import FilterALL from './FilterALL';
import FilterFavorite from './FilterFavorite';

const URL = 'https://fl-homework-api.firebaseio.com/mozart.json';

export default class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musicList: [],
      filteredMusicListByFavorite: [],
      error: null,
      isFilterAllActive: true,
      isFilterFavoriteActive: false,
    };

    this.likedHandler = this.likedHandler.bind(this);
    this.handlerFilterFavorite = this.handlerFilterFavorite.bind(this);
    this.handlerFilterAll = this.handlerFilterAll.bind(this);
  }

  componentDidMount() {
    this.setState({ error: false });

    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(data => this.setState({ musicList: data }))
      .catch(() => this.setState({ error: true }));
  }

  handlerFilterAll() {
    this.setState({
      isFilterAllActive: true,
      isFilterFavoriteActive: false,
    });
  }

  likedHandler(id) {
    const musicListCopy = this.state.musicList;
    this.setState((prevState) => {
      musicListCopy[id - 1].liked = !prevState.musicList[id - 1].liked;
      return {
        musicList: musicListCopy,
      };
    });
  }

  handlerFilterFavorite() {
    const musicListCopy = this.state.musicList;
    const filtered = musicListCopy.filter(data => data.liked);
    this.setState({
      filteredMusicListByFavorite: filtered,
    });
    this.setState({
      isFilterAllActive: false,
      isFilterFavoriteActive: true,
    });
  }

  render() {
    const {
      musicList,
      error,
      isFilterAllActive,
      isFilterFavoriteActive,
    } = this.state;

    if (error) {
      return (
        <div>
          <h2>Playlist</h2>
          <p>Failed to load music ...</p>
        </div>
      );
    }

    if (musicList.length === 0) {
      return (
        <div>
          <h2>Playlist</h2>
          <p>Loading ...</p>
        </div>
      );
    }
    return (
      <div className="playlist-component">
        <h2>Playlist</h2>
        <div className="playlist-filters">
          {isFilterAllActive || !isFilterFavoriteActive ? (
            <div className="filters-wrapper">
              <div
                className="filter active"
                onClick={this.handlerFilterAll}
                onKeyDown={this.handlerFilterAll}
                role="presentation"
              >
                All
              </div>
              <div
                className="filter"
                onClick={this.handlerFilterFavorite}
                onKeyDown={this.handlerFilterFavorite}
                role="presentation"
              >
                Favorite
              </div>
            </div>
          ) : (
            <div className="filters-wrapper">
              <div
                className="filter "
                onClick={this.handlerFilterAll}
                onKeyDown={this.handlerFilterAll}
                role="presentation"
              >
                All
              </div>
              <div
                className="filter active"
                onClick={this.handlerFilterFavorite}
                onKeyDown={this.handlerFilterFavorite}
                role="presentation"
              >
                Favorite
              </div>
            </div>
          )}
        </div>
        {isFilterAllActive || !isFilterFavoriteActive ? (
          <FilterALL
            musicData={this.state.musicList}
            likedHandler={this.likedHandler}
          />
        ) : (
          <FilterFavorite
            musicData={this.state.filteredMusicListByFavorite}
            likedHandler={this.likedHandler}
          />
        )}
      </div>
    );
  }
}
