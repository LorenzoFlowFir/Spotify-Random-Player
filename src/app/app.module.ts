import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { RandLikedSongComponent } from './pages/rand-liked-song/rand-liked-song.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RandPlaylistComponent } from './pages/rand-playlist/rand-playlist.component';
import { SongChallengeComponent } from './pages/song-challenge/song-challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RandLikedSongComponent,
    RandPlaylistComponent,
    SongChallengeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
