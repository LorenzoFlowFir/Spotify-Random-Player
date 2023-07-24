import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandLikedSongComponent } from './rand-liked-song.component';

describe('RandLikedSongComponent', () => {
  let component: RandLikedSongComponent;
  let fixture: ComponentFixture<RandLikedSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandLikedSongComponent]
    });
    fixture = TestBed.createComponent(RandLikedSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
