import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Track } from 'src/app/models/track.model';
import { SharedDataService } from 'src/app/services/Common.service';
import { RandomLikeService } from 'src/app/services/RandomLikeSong.service';

@Component({
  selector: 'app-rand-liked-song',
  templateUrl: './rand-liked-song.component.html',
  styleUrls: ['./rand-liked-song.component.scss'],
})
export class RandLikedSongComponent {
  public playlist: Track[] = [];
  public allTracks: Track[] = [];
  public loader = this.randomLikeService.loader;

  // dans rand-liked-song.component.ts
  constructor(private randomLikeService: RandomLikeService) {}
}
