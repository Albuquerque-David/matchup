import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostingPage } from './posting.page';

describe('PostingPage', () => {
  let component: PostingPage;
  let fixture: ComponentFixture<PostingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
