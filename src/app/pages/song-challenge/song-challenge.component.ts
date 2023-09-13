import { Component } from '@angular/core';
import { SongChallengeService } from 'src/app/services/SongChallenge.service';

@Component({
  selector: 'app-song-challenge',
  templateUrl: './song-challenge.component.html',
  styleUrls: ['./song-challenge.component.scss']
})
export class SongChallengeComponent {
  public loader = this.songChallengeService.loader;

  constructor(private songChallengeService:SongChallengeService){}
  
}
