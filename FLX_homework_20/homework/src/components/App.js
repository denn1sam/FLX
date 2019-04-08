import React from 'react';
import Playlist from './playlist/PlayList';
import Player from './widget/Player';

export default function App() {
  return (
    <div className="main-wrap">
      <Player />
      <Playlist />
    </div>
  );
}
