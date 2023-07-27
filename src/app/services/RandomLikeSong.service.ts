import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { Track } from '../models/track.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  public playlist: Track[] = [];
  public allTracks: Track[] = [];
  public loaderTrack = document.getElementById('loaderTrack');
  public loader = false;

  constructor() {}

  public spotifyWebApi = new SpotifyWebApi();
  public async addToQueue(trackId: any) {
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    let accessToken = hashParams.get('access_token');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${trackId}`,
        {
          method: 'POST',
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Could not add track to queue: ${response.statusText}`);
      }

      console.log(`Track ${trackId} added to queue`);
    } catch (error) {
      console.error('Error adding track to queue:', error);
    }
  }

  public async getLikedTracksAndPlayRandomTrack(accessToken: any) {
    let offset = 0;
    let total = 1;
    this.spotifyWebApi.setAccessToken(accessToken);
    this.loader = true;
    while (this.allTracks.length < total) {
      const data = await this.spotifyWebApi.getMySavedTracks({
        limit: 50,
        offset,
      });
      const tracks = data.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
      }));
      this.allTracks = this.allTracks.concat(tracks);
      total = data.total;
      offset += 50;
    }
    this.loader = false;
    document.getElementById('spinner')!.style.display = 'none';
    console.log(`Nombre de titres aimés : ${total}`);
  }

  public async displayLikedTrack() {
    this.playlist = [];
    let randomTrack;
    for (let i = 0; i < 10; i++) {
      randomTrack =
        this.allTracks[Math.floor(Math.random() * this.allTracks.length)];
      this.playlist.push(randomTrack);
    }

    const likedTrackDiv = document.getElementById('liked-track');

    if (likedTrackDiv) {
      likedTrackDiv.innerHTML = ' ';
    } else {
      // Gérer le cas où l'élément n'existe pas
      console.error('Element avec l\'id "liked-track" n\'a pas été trouvé');
    }
    // Vider les détails de la this.playlist précédente

    for (const music of this.playlist) {
      const p = document.createElement('p');
      const trackData = await this.spotifyWebApi.getTrack(music.id);
      const img = document.createElement('img');
      img.src = trackData.album.images[0].url;
      img.alt = `Cover de ${music.name} - ${music.artist}`;
      img.style.width = '50px';
      p.appendChild(img);
      p.appendChild(document.createTextNode(`${music.name} - ${music.artist}`));
      // Bouton pour mettre la musique en file d'attente sur Spotify
      const divtools = document.createElement('div');
      divtools.id = 'tools';

      const addToQueueButton = document.createElement('button');
      addToQueueButton.addEventListener('click', () => {
        this.addToQueue(music.id);
      });
      const queueImg = document.createElement('img');
      queueImg.src = '../../assets/icon/queue.png'; // Votre chemin d'accès à l'image ici
      queueImg.alt = "Ajouter à la file d'attente";
      queueImg.style.width = '25px';

      addToQueueButton.appendChild(queueImg);
      divtools.appendChild(addToQueueButton);

      // Bouton pour jouer la musique sur Spotify
      const playButton = document.createElement('button');
      playButton.addEventListener('click', () => {
        this.spotifyWebApi.play({
          uris: [`spotify:track:${music.id}`],
        });
      });
      const playImg = document.createElement('img');
      playImg.src = '../../assets/icon/play2.png'; // Votre chemin d'accès à l'image ici
      playImg.alt = 'Jouer la musique';
      playImg.classList.add('tools-track');
      playImg.style.width = '25px';
      playButton.appendChild(playImg);
      divtools.appendChild(playButton);
      p.appendChild(divtools);

      likedTrackDiv?.appendChild(p);
    }

    const btnRefrshLike = document.createElement('button');
    btnRefrshLike.classList.add('btn');
    btnRefrshLike.classList.add('btn-primary');
    btnRefrshLike.textContent = "Charger d'autres musiques";
    btnRefrshLike.id = 'reload-liked';
    btnRefrshLike.addEventListener('click', () => this.displayLikedTrack());
    likedTrackDiv?.appendChild(btnRefrshLike);

    /*
    // Jouer le titre aimé aléatoire
    let o = 0;

    document.getElementById('pre').addEventListener('click', () => {
      o--;
      this.appComponent.spotifyWebApi.play({
        uris: [`spotify:track:${this.playlist[o].id}`],
      });
    });

    document.getElementById('next').addEventListener('click', () => {
      o++;
      this.appComponent.spotifyWebApi.play({
        uris: [`spotify:track:${this.playlist[o].id}`],
      });
    });

    document.getElementById('play').addEventListener('click', () => {
      this.appComponent.spotifyWebApi.play({
        uris: [`spotify:track:${this.playlist[o].id}`],
      });
    });*/
  }
}
