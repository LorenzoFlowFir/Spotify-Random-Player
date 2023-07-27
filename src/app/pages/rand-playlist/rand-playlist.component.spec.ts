import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandPlaylistComponent } from './rand-playlist.component';

describe('RandPlaylistComponent', () => {
  let component: RandPlaylistComponent;
  let fixture: ComponentFixture<RandPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandPlaylistComponent]
    });
    fixture = TestBed.createComponent(RandPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
