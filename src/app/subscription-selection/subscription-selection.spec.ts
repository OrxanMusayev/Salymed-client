import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSelection } from './subscription-selection';

describe('SubscriptionSelection', () => {
  let component: SubscriptionSelection;
  let fixture: ComponentFixture<SubscriptionSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
