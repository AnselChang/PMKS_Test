/*
An abstract class that describes where the user interface has entered a
specific mode in which clicks have a special meaning, different from their default behavior.
For example, clicking to create a node. Pressing escape should leave this mode.
This behavior is handled by the InteractionService.
*/

import { Subject } from "rxjs";
import { Coord } from "../model/coord";
import MousePosition from "../services/mouse-position";

export enum ClickCaptureID {
    CREATE_NODE
}

export class ClickCapture {
    
    onClick$ = new Subject<MousePosition>();
    onMouseMove$ = new Subject<MousePosition>();

    constructor(public id: ClickCaptureID) {}
}