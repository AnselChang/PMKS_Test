import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { SvgInteractor } from 'src/app/interaction/svg-interactor';
import { ContextMenuOption, Interactor } from 'src/app/interaction/interactor';
import { InteractionService } from 'src/app/services/interaction.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { StateService } from 'src/app/services/state.service';
import { SaveService } from 'src/app/services/save.service';
import * as svgPanZoom from 'svg-pan-zoom';
import SVGCoordinateSystem from './svg-coordinate-system';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent extends AbstractInteractiveComponent implements OnInit, AfterViewInit {
  @ViewChild('rootSVG') root!: ElementRef<SVGElement>;

  private svgPanZoomInstance!: SvgPanZoom.Instance;
  public svgCoordinateSystem = new SVGCoordinateSystem();

  constructor(public override interactionService: InteractionService,
    private stateService: StateService,
    private saveService: SaveService) {
    super(interactionService);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.saveService.load();

    // save ONCE after any number of interactors have been dragged
    this.interactionService.onDragEndOnce$.subscribe((event) => {
      this.saveService.save();
    });
  }

  ngAfterViewInit(): void {

    // use svg-pan-zoom library to handle panning and zooming SVG
    this.svgPanZoomInstance = svgPanZoom(this.root.nativeElement, {
      zoomEnabled: true,
      fit: true,
      center: true,
      zoomScaleSensitivity: 0.15,
      dblClickZoomEnabled: false,
      maxZoom: 10000, //These are not used, look at MAX_ZOOM
      minZoom: 0.00001, //These are not used, look at MIN_ZOOM
      onPan: this.handlePan.bind(this),
      onZoom: this.handleZoom.bind(this),
      beforePan: this.handleBeforePan.bind(this),
      beforeZoom: this.handleBeforeZoom.bind(this),
      onUpdatedCTM: this.handleUpdatedCTM.bind(this),
    });

  }

  // handle pan and zoom elements
  private handlePan(newPan: SvgPanZoom.Point) {
    console.log("handlePan", newPan);
  }

  private handleZoom(newZoom: number) {
    console.log("handleZoom", newZoom);
  }

  private handleBeforePan(oldPan: SvgPanZoom.Point, newPan: SvgPanZoom.Point) {
    console.log("handleBeforePan", oldPan, newPan);
  }

  private handleBeforeZoom(oldZoom: number, newZoom: number) {
    console.log("handleBeforeZoom", oldZoom, newZoom);
  }

  private handleUpdatedCTM(newCTM: SVGMatrix) {
    console.log("handleUpdatedCTM", newCTM);
    this.svgCoordinateSystem.updateCTM(newCTM);
  }



  // handle keyboard events and send to interaction service
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log("InteractionDirective.onKeyDown", event.key);
    this.interactionService.onKeyDown(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log("InteractionDirective.onKeyUp", event.key);
    this.interactionService.onKeyUp(event);
  }


  override registerInteractor(): Interactor {
    let interactor = new SvgInteractor(this.stateService, this.saveService);

    interactor.onKeyDown$.subscribe((event) => {
      if (event.key === "s") {
        this.saveService.save();
      }
    });

    return interactor;
  }
  
}
