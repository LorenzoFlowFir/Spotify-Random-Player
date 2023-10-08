import { Component } from '@angular/core';
import { SongChallengeService } from 'src/app/services/SongChallenge.service';
import { DiscordDataService } from '../../services/discord-data.service';

@Component({
  selector: 'app-song-challenge',
  templateUrl: './song-challenge.component.html',
  styleUrls: ['./song-challenge.component.scss'],
})
export class SongChallengeComponent {
  public loader = this.songChallengeService.loader;
  public covers = [];

  constructor(
    private songChallengeService: SongChallengeService,
    private discordDataService: DiscordDataService
  ) {}

  ngOnInit(): void {
    this.discordDataService.getDiscordData().subscribe(
      (data) => {
        this.covers = data;
        console.log(data);
        this.songChallengeService.songChallenge(this.covers);
      },
      (error) => console.error(error)
    );
  }
}
