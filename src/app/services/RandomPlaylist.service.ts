import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { Track } from '../models/track.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class RandomPlaylsiyService {
  public allPlaylists: Track[] = [];
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

  async fetchAllPlaylists(
    accessToken: any,
    offset = 0,
    limit = 50,
    playlists: any[] = []
  ): Promise<any> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`,
        { headers }
      );
      const data = await response.json();

      if (!data.items) {
        console.log('Aucune playlist trouvée');
        return [];
      }

      console.log(data);
      playlists.push(...data.items);
      if (data.next) {
        return await this.fetchAllPlaylists(
          accessToken,
          offset + limit,
          limit,
          playlists
        );
      } else {
        this.allPlaylists = playlists;
        return playlists;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des playlists :', error);
      return [];
    }
  }

  async getAllPlaylist(accessToken: any) {
    this.allPlaylists = await this.fetchAllPlaylists(accessToken);
  }

  getRandomPlaylist(allPlaylists: any) {
    if (allPlaylists.length === 0) {
      console.log('Aucune playlist trouvée');
      return null;
    }

    const randomIndex = Math.floor(Math.random() * allPlaylists.length);
    const randomPlaylist = allPlaylists[randomIndex];

    return randomPlaylist;
  }

  async displayPlaylist(playlist: any) {
    const playlistDiv = document.getElementById('playlist-details');
    playlistDiv!.innerHTML = ''; // Vider les détails de la playlist précédente

    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = hashParams.get('access_token');

    const img = document.createElement('img');
    img.src = playlist.images[0].url;
    img.alt = `Cover de ${playlist.name}`;
    img.style.width = '100%';
    img.style.height = '100%';
    playlistDiv!.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = playlist.name;
    playlistDiv!.appendChild(title);
    /*
      const description = document.createElement("p");
      description.textContent = playlist.description;
      playlistDiv.appendChild(description);*/

    const owner = document.createElement('p');
    owner.textContent = `by ${playlist.owner.display_name}`;
    playlistDiv!.appendChild(owner);

    const nbtracks = document.createElement('p');
    nbtracks.textContent = `Nombre de titres : ${playlist.tracks.total}`;
    playlistDiv!.appendChild(nbtracks);

    const btnAccess = document.createElement('a');
    btnAccess.href = playlist.external_urls.spotify;
    btnAccess.target = '_blank';
    btnAccess.classList.add('btn');
    btnAccess.classList.add('btn-success');
    btnAccess.textContent = 'Accéder à la playlist';
    btnAccess.id = 'btnAccess';
    playlistDiv!.appendChild(btnAccess);

    const btnRefrsh = document.createElement('button');
    btnRefrsh.classList.add('btn');
    btnRefrsh.classList.add('btn-primary');
    btnRefrsh.textContent = 'Charger une autre playlist';
    btnRefrsh.id = 'reload-playlist';
    btnRefrsh.addEventListener('click', () =>
      this.loadRandomPlaylist(accessToken)
    );
    playlistDiv!.appendChild(btnRefrsh);
  }

  async loadRandomPlaylist(accessToken: any) {
    this.loader = true;
    const playlist = await this.getRandomPlaylist(this.allPlaylists);
    if (playlist) {
      this.displayPlaylist(playlist);
    } else {
      console.log('Aucune playlist trouvée');
    }
    this.loader = false;
  }
}
