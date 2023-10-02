import { Component, Input } from '@angular/core';
import { Edge } from 'src/app/model/edge';
import { Node } from 'src/app/model/node';
import { Graph } from 'src/app/model/graph';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: '[app-edge]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent {

  @Input() edge!: Edge;

  constructor(public stateService: StateService) {

  }

  private getGraph(): Graph {
    return this.stateService.getGraph();
  }

  public start(): Node {
    return this.edge!.getStartNode(this.getGraph());
  }

  public end(): Node {
    return this.edge!.getEndNode(this.getGraph());
  }

  public getWidth(): number {
    return 5;
  }

}
