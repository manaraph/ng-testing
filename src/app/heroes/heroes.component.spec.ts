import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wond Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 77 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addhero', 'deleteHero'])
    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should reduce the heroes length by 1', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes[0].id && component.heroes[1].id).not.toBe(3);
    });
  });
});
