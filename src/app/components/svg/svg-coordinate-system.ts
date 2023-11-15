import { Coord } from "src/app/model/coord";

export default class SVGCoordinateSystem {
    private ctm?: SVGMatrix;

    screenToSVG(screenPos: Coord): Coord {

        if (!this.ctm) return new Coord(0, 0);

        const inverseCTM = this.ctm.inverse();
        const svgPos = screenPos.applyMatrix(inverseCTM);
        return new Coord(svgPos.x, svgPos.y * -1);
      }
    
    svgToScreen(svgPos: Coord): Coord {

        if (!this.ctm) return new Coord(0, 0);

        const screenPos = svgPos.applyMatrix(this.ctm);
        return screenPos;
    }

    updateCTM(ctm: SVGMatrix) {
        this.ctm = ctm;
    }
}