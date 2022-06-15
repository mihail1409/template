const client_id = '4e52fd4ad5514a19bb89778b2479d63f';
const client_secret = 'fd0eb9e767d24e4085d23a93f1e06b0c';

async function getToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
      },
    });
    const token = await response.json();
    return token.access_token;
  } catch (e) {
    console.log(e);
  }
}

const request = async (url, method) => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + token,
  };
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
    });

    return response.json();
  } catch (err) {
    console.error('Error', err);
  }
};

const $albums = document.querySelector('#albums');

async function getAlbums() {
  const url = "https://api.spotify.com/v1/albums?ids=6YUEeKDLuaQ42pVEbfAf67,78ivX3R4lWr0sWrUnriXLL";
  return await request(url, 'GET');
}

const albums = getAlbums();

albums.then((data) => {
  data.albums.forEach((item) => {
    $albums.insertAdjacentHTML(
      'beforeend',
      `<div class="track">
              <div>
                <img class="track-image" src="${item.images[0].url}">
              </div>
              <div class="track-name">
                ${item.name}
                <div class="track-author">
                ${item.artists[0].name}
                </div>
              </div>
        </div>`,
    );
  });
});


async function getPlaylistsPyro() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1E38AnJzw22oQz"
  return await request(url, 'GET');
}

async function getPlaylistsOxxxy() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1E38cl7IHqwBpM"
  return await request(url, 'GET');
}

async function getPlaylistsBillie() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1E35WrAVUMktE4"
  return await request(url, 'GET');
}

async function getPlaylistsMalone() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1E37QkD27xeDd2"
  return await request(url, 'GET');
}

const playlistPyro = getPlaylistsPyro();
const playlistOxxxy = getPlaylistsOxxxy();
const playlistBillie = getPlaylistsBillie();
const playlistMalone = getPlaylistsMalone();

const best = [playlistPyro, playlistOxxxy, playlistBillie,playlistMalone];
const $best = document.querySelector("#best");

best.forEach((value) => value.then((data) => {
  $best.insertAdjacentHTML(
    'beforeend',
    `<div class="track">
          <div>
            <img class="track-image" src="${data.images[0].url}">
          </div>
          <div class="track-name">
            ${data.name}
             <div class="track-author">
                ${data.description}  
              </div>
          </div>
        </div>`,
  );
}))

async function getPlaylistsBroken() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DXbrUpGvoi3TS"
  return await request(url, 'GET');
}

async function getPlaylistsTender() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DXarebqD2nAVg"
  return await request(url, 'GET');
}

async function getPlaylistsSad() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DX64Y3du11rR1"
  return await request(url, 'GET');
}

async function getPlaylistsDeep() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DWTtTyjgd08yp"
  return await request(url, 'GET');
}

async function getPlaylistsDark() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DX2pSTOxoPbx9"
  return await request(url, 'GET');
}

const playlistBroken = getPlaylistsBroken();
const playlistTender = getPlaylistsTender();
const playlistSad = getPlaylistsSad();
const playlistDeep = getPlaylistsDeep();
const playlistDark = getPlaylistsDark();

const sadge= [playlistBroken, playlistTender, playlistSad, playlistDeep, playlistDark];
const $sadge = document.querySelector("#sadge");

sadge.forEach((value) => value.then((data) => {
  $sadge.insertAdjacentHTML(
    'beforeend',
    `<div class="track">
          <div>
            <img class="track-image" src="${data.images[0].url}">
          </div>
          <div class="track-name">
            ${data.name}
          </div>
        </div>`,
  );
}))

const $recently = document.querySelector('#recentlyListen');

async function getRecentlyListenSongs() {
  const url = "https://api.spotify.com/v1/tracks?ids=50YeXX51UCOttoTVjWUJAZ,7nKOPOosPKm9M4KeTdmuMp,4nAo5a74uSbJ1R114JKGEU"
  return await request(url, 'GET');
}

const recentlySongs = getRecentlyListenSongs();

recentlySongs.then((data) => {
  data.tracks.forEach((item) => {
    $recently.insertAdjacentHTML(
      'beforeend',
      `<div class="track">
              <div>
                <img class="track-image" src="${item.album.images[0].url}">
              </div>
              <div class="track-name">
                ${item.name}
                <div class="track-author">
                ${item.artists[0].name}
                </div>
              </div>
        </div>`,
    );
  });
})