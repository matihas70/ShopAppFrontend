import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsViewComponent } from './items-view.component';

describe('ItemsViewComponent', () => {
  let component: ItemsViewComponent;
  let fixture: ComponentFixture<ItemsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsViewComponent]
    });
    fixture = TestBed.createComponent(ItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
