import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { client_id, client_secret } from './clients';
import Header from './header';
import SideBar from './sidebar';
import Footer from './footer';
import Track from './track';
import {IArtist, IContent, ITrack, IItem} from './interface'
import { MusicSection } from "./musicSection";

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
  
  function useUserAction(url: string, action: (value: AxiosResponse<any, any>) => void) {
    useEffect(() => {
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
        .then(action)
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
  }

  useUserAction(
    "https://api.spotify.com/v1/artists?ids=3TVXtAsR1Inumwj472S9r4,5sBoNBXFMzoZjgHLbQueeG,6eUKZXaKkcviH0Ku9w2n3V,1Xyo4u8uXC1ZmMpatF05PJ",
    response => setArtists(response.data.artists)
  );

  useUserAction(
    "https://api.spotify.com/v1/albums?ids=6YUEeKDLuaQ42pVEbfAf67,78ivX3R4lWr0sWrUnriXLL",
    response => setAlbums(response.data.albums)
  );

  useUserAction(
    "https://api.spotify.com/v1/tracks?ids=50YeXX51UCOttoTVjWUJAZ,7nKOPOosPKm9M4KeTdmuMp,4nAo5a74uSbJ1R114JKGEU",
    response => setRecentlyTracks(response.data.tracks)
  );

  useUserAction(
    "https://api.spotify.com/v1/albums?ids=4K6Rcm7dBmWNsHclnRWQO1,1atjqOZTCdrjxjMyCPZc2g,32iAEBstCjauDhyKpGjTuq,5r36AJ6VOJtp00oxSkBZ5h",
    response => setHypeAlbums(response.data.albums)
  );

  return (
    <div className="App">
      <Header />
      <SideBar />
      <main className="content">
        <div className="music">
          {token ? (
            <>
              <MusicSection
                headerText="Для тебя"
                sectionId="albums"
                tracks={toTrack<IContent>(albums, x => x.images[0].url, x => x.artists[0].name)}
              />
              <MusicSection
                headerText="Недавно прослушано"
                sectionId="recentlyListen"
                tracks={toTrack<ITrack>(recentlyTracks, x => x.album.images[0].url, x => x.artists[0].name)}
              />
              <MusicSection
                headerText="Популярные альбомы"
                sectionId="next"
                tracks={toTrack<IContent>(hypeAlbums, x => x.images[0].url, x => x.artists[0].name)}
              />
              <MusicSection
                headerText="Популярные исполнители"
                sectionId="sadge"
                tracks={toTrack<IArtist>(artists, x => x.images[0].url, x => x.type)}
              />
            </>
          ) : (
            <div>Sorry</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

 function toTrack<T extends IItem>(
  items: T[],
  imageSelector: (value: T) => string,
  descSelector: (value: T) => string
 ): JSX.Element[] {

  return items.map(item =>
    <Track
      key={item.id}
      name={item.name}
      image={imageSelector(item)}
      desc={descSelector(item)}
    />
  )
}

export default App;
