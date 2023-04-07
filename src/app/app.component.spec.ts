import { AppService } from './app.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

const fakeAppService = jasmine.createSpyObj<AppService>(['getText']);
fakeAppService.getText.and.returnValue('Fake AppService');

describe(`${AppComponent.name}`, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AppService,
          useValue: fakeAppService,
        },
      ],
    })
      // .overrideComponent(AppComponent, {
      //   set: {
      //     template: `
      //       <div id="target">
      //         {{ title }}
      //       </div>
      //     `,
      //   },
      // })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have 'app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('app');
  });

  it(`should have title in the html`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const element: HTMLDivElement = fixture.nativeElement;
    expect(element.textContent?.trim()).toEqual('app');
  });

  it(`should inject app service`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.f()).toEqual(`Fake ${AppService.name}`);
  });
});
