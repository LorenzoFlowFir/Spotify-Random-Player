import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { SharedDataService } from 'src/app/services/Common.service';
import { RandomPlaylsiyService } from '../services/RandomPlaylist.service';
@Component({
  selector: 'app-rand-playlist',
  templateUrl: './rand-playlist.component.html',
  styleUrls: ['./rand-playlist.component.scss'],
})
export class RandPlaylistComponent {
  public loader = this.randomPlaylistService.loader;

  constructor(private randomPlaylistService: RandomPlaylsiyService) {}
}
