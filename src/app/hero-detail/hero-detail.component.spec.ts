import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent (Integration Test)', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () =>  '3' }}
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'superDude', strength: 100 }));
  });

  it('should render the hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  it('should call updateHero when save is called', fakeAsync( () => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
 /**
     * Handling async function
     * Method 1 : Calling a done function passed as a parameter to the test callback.
     * When using this method you don't to wrap the callback in fakeAsync
     */
    fixture.componentInstance.save();
    // tick(250);  //  Works with zone.js similar to settimeout
    flush();  //  Works with zone.js to figure out waiting tasks before it continues execution.
    expect(mockHeroService.updateHero).toHaveBeenCalled();

    /**
     * Handling async function
     * Method 2: Calling a done function passed as a parameter to the test callback.
     * When using this method you don't to wrap the callback in fakeAsync.
     * This method delays the execution time of the test suite hence the method one is perferred.
     */
    // setTimeout(() => {
    //   expect(mockHeroService.updateHero).toHaveBeenCalled();
    //   done();
    // }, 300);
  }));
});
