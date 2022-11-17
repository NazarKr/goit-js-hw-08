import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const throttle = require('lodash.throttle');

player.on('timeupdate', throttle(setWatchingTime, 1000));

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function setWatchingTime(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}

const getContentOfLocalStorage =
  localStorage.getItem('videoplayer-current-time') || 0;

player.setCurrentTime(getContentOfLocalStorage);
