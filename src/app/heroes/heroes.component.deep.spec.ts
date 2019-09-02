import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Input, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  // tslint:disable-next-line: no-input-rename
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (Deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wond Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 77 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('Should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // console.log(heroComponentDEs);

    expect(heroComponentDEs.length).toEqual(3);
    heroComponentDEs.forEach((elem, index) => {
      expect(elem.componentInstance.hero).toEqual(HEROES[index]);
    });
  });

  it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete'); //  Watch to see if the delete method was called

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    /**
     * Testing events on elements
     */
    //  Method 1: Trigger the click event in the child html component.
    // heroComponents[0].query(By.css('button'))
      // .triggerEventHandler('click', {stopPropagation: () => {}});  //  Confirm the stopPropagation method was called.

    //  Method 2: Instruct the child component to raise the delete event
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    //  Method 3: Trigger the delete event in the child component
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'IceMan';
    mockHeroService.addHero.and.returnValue(of({id: 4, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('button'));

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);

    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

});
