import { Component, OnInit } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyService } from './services/RandomLikeSong.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Spotify-Random-Player';
  public CLIENT_ID = 'd194dd4dc1834544ae23941f8c38e8f3';
  public REDIRECT_URI = `http://localhost:4200/`;
  //public REDIRECT_URI = `https://test-playlist-game.vercel.app/index.html`;
  public SCOPES = [
    'user-library-read',
    'user-modify-playback-state',
    'user-read-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
  ];
  public loaderplaylist = document.getElementById('loaderplaylist');
  public loadertrack = document.getElementById('loadertrack');

  public allPlaylists = [];

  public spotifyWebApi = new SpotifyWebApi();
  public authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${
    this.CLIENT_ID
  }&redirect_uri=${this.REDIRECT_URI}&scope=${this.SCOPES.join(
    '%20'
  )}&response_type=token&show_dialog=true`;

  public connectBtn = document.getElementById('connect');
  public isDisconnected = true;

  constructor(private spotifyService: SpotifyService) {}

  public loginWithSpotify() {
    window.location.href = this.authorizeUrl;
  }

  ngOnInit() {
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    if (hashParams.has('access_token')) {
      const accessToken = hashParams.get('access_token');
      this.isDisconnected = false;

      this.spotifyService
        .getLikedTracksAndPlayRandomTrack(accessToken)
        .then(() => {
          this.spotifyService.displayLikedTrack();
        });
    }
  }
}
