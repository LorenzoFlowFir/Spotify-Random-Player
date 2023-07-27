import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { RandLikedSongComponent } from './pages/rand-liked-song/rand-liked-song.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RandPlaylistComponent } from './pages/rand-playlist/rand-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RandLikedSongComponent,
    RandPlaylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
