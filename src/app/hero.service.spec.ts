import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        {
          provide: MessageService, useValue: mockMessageService
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController); //  Getting a handle to a service (HttpTestingController) - Method 1
  });

  describe('getHero', () => {
    it('should call get with the correct URL', inject() () => {
      service 
    })
  })
});
