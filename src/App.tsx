import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { client_id, client_secret } from './clients';
import Header from './header';
import SideBar from './sidebar';
import Footer from './footer';
import Track from './track';
import {IArtist, IContent, ITrack} from './interface'

function App() {
  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState<IContent[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [hypeAlbums, setHypeAlbums] = useState<IContent[]>([]);
  const [recentlyTracks, setRecentlyTracks] = useState<ITrack[]>([]);


  useEffect(() => {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    };
    axios
      .post('https://accounts.spotify.com/api/token', data, {
        headers: headers,
      })
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/artists?ids=3TVXtAsR1Inumwj472S9r4,5sBoNBXFMzoZjgHLbQueeG,6eUKZXaKkcviH0Ku9w2n3V,1Xyo4u8uXC1ZmMpatF05PJ", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setArtists(response.data.artists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);



  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/albums?ids=6YUEeKDLuaQ42pVEbfAf67,78ivX3R4lWr0sWrUnriXLL", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setAlbums(response.data.albums);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/tracks?ids=50YeXX51UCOttoTVjWUJAZ,7nKOPOosPKm9M4KeTdmuMp,4nAo5a74uSbJ1R114JKGEU", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setRecentlyTracks(response.data.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token])

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/albums?ids=4K6Rcm7dBmWNsHclnRWQO1,1atjqOZTCdrjxjMyCPZc2g,32iAEBstCjauDhyKpGjTuq,5r36AJ6VOJtp00oxSkBZ5h", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setHypeAlbums(response.data.albums);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);


  return (
    <div className="App">
      <Header/>
      <SideBar/>
      <main className="content">
        <div className="music">
          {token ? (
            <>
              <h2 className="music-head">Для тебя</h2>
              <section className="tracks" id="albums">
                {albums.map(({ id, name, images, artists }) => {
                  return <Track key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
              </section>
              <h2 className="music-head">Недавно прослушано</h2>
              <section className="tracks" id="recentlyListen">
                {recentlyTracks.map(({ id, name, artists, album }) => {
                  return <Track key={id} image={album.images[0].url} name={name} desc={artists[0].name} />;
                })}
              </section>
              <h2 className="music-head">Популярные альбомы
                <p className='little-font'>Сейчас в тренде.</p>
              </h2>
              <section className="tracks" id="next">
              {hypeAlbums.map(({ id, name, images, artists }) => {
                  return <Track key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}

              </section>
              <h2 className="music-head">Популярные исполнители</h2>
              <section className="tracks" id="sadge">
                {artists.map(({ id, name, images, type }) => {
                  return <Track key={id} image={images[0].url} name={name} desc={type} />;
                })}
              </section>
            </>
          ): (
            <div>Sorry</div>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
