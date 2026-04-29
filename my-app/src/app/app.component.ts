import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CounterComponent } from './counter/counter.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { Main2Component } from './main2/main2.component';
import { Parent1Component } from './parent1/parent1.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Main3Component } from './main3/main3.component';
import { LogService } from './services/log.service';
import { TimerComponent } from './timer/timer.component';
import { SearchComponent } from './search/search.component';
import { Main4Component } from './main4/main4.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CounterComponent, FooterComponent, MainComponent, Main2Component,
    Parent1Component, ProductListComponent, Main3Component, TimerComponent, SearchComponent, Main4Component,
    RegisterComponent
  ],
  providers: [LogService]
  ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
