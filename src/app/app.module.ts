import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FifteenRulesComponent } from './GameRules/fifteen-rules/fifteen-rules.component';
import { FifteenComponent } from './fifteen/fifteen.component';
import { DumbComponent } from './dumb/dumb.component';
import { TwentyFourtyEightComponent } from './twenty-fourty-eight/twenty-fourty-eight.component';
import { GameComponent } from './twenty-fourty-eight/game/game.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { BoardComponent } from './tic-tac-toe/board/board.component';
import { SquareComponent } from './tic-tac-toe/square/square.component';
import { TicTacToeRulesComponent } from './GameRules/tic-tac-toe-rules/tic-tac-toe-rules.component';
import { TwentyFourtyEightRulesComponent } from './GameRules/twenty-fourty-eight-rules/twenty-fourty-eight-rules.component';
import { TetrisRulesComponent } from './GameRules/tetris-rules/tetris-rules.component';
import { BebrisComponent } from './bebris/bebris.component';

const routes : Routes = [
  {
    path: '',
    component: DumbComponent
    // This component is required for main page
    // Without this component the main page will repeat once in window with <router-outlet>
  },
  {
    path: 'Main',
    component: AppComponent
  },
  {
    path: 'Fifteen',
    component: FifteenComponent
  },
  {
    path: "2048",
    component: TwentyFourtyEightComponent
  },
  {
    path: "TicTacToe",
    component: TicTacToeComponent
  },
  {
    path: "Tetris",
    component: BebrisComponent
  },{
    path: 'Fifteen/Rules',
    component: FifteenRulesComponent
  },
  {
    path: '2048/Rules',
    component: TwentyFourtyEightRulesComponent
  },
  {
    path: 'Tetris/Rules',
    component: TetrisRulesComponent
  },
  {
    path: 'Tic-Tac-Toe/Rules',
    component: TicTacToeRulesComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    FifteenRulesComponent,
    FifteenComponent,
    DumbComponent,
    TwentyFourtyEightComponent,
    GameComponent,
    TicTacToeComponent,
    BoardComponent,
    SquareComponent,
    TicTacToeRulesComponent,
    TwentyFourtyEightRulesComponent,
    TetrisRulesComponent,
    BebrisComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
