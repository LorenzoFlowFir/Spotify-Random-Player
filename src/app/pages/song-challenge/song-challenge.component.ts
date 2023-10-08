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
  public titre = [];
  public date = [];

  constructor(
    private songChallengeService: SongChallengeService,
    private discordDataService: DiscordDataService
  ) {}

  ngOnInit(): void {
    this.discordDataService.getDiscordData().subscribe(
      (data) => {
        this.covers = data.coverUrls;
        this.titre = data.titre;
        this.date = data.date;
        this.songChallengeService.songChallenge(
          this.covers,
          this.titre,
          this.date
        );
      },
      (error) => console.error(error)
    );
  }
}
