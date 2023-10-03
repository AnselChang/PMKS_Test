import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';


import { AppComponent } from './app.component';
import { SvgComponent } from './components/svg/svg.component';
import { GridLinesComponent } from './components/grid-lines/grid-lines.component';
import { GraphComponent } from './components/graph/graph.component';
import { NodeComponent } from './components/node/node.component';
import { EdgeComponent } from './components/edge/edge.component';
import { InteractionDirective } from './directives/interactable';
import { DebugComponent } from './components/debug/debug.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    GridLinesComponent,
    GraphComponent,
    NodeComponent,
    EdgeComponent,
    InteractionDirective,
    DebugComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
