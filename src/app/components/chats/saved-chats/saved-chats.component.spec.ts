import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedChatsComponent } from './saved-chats.component';

describe('SavedChatsComponent', () => {
  let component: SavedChatsComponent;
  let fixture: ComponentFixture<SavedChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedChatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
