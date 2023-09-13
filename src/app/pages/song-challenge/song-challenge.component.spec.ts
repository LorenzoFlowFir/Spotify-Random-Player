import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongChallengeComponent } from './song-challenge.component';

describe('SongChallengeComponent', () => {
  let component: SongChallengeComponent;
  let fixture: ComponentFixture<SongChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongChallengeComponent]
    });
    fixture = TestBed.createComponent(SongChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
