import { Coord } from "src/app/model/coord";

export default class SVGCoordinateSystem {
    private ctm = new SVGMatrix();

    screenToSVG(screenPos: Coord): Coord {

        const inverseCTM = this.ctm.inverse();
        const svgPos = screenPos.applyMatrix(inverseCTM);
        return new Coord(svgPos.x, svgPos.y * -1);
      }
    
    svgToScreen(svgPos: Coord): Coord {

    const screenPos = svgPos.applyMatrix(this.ctm);
    return screenPos;
    }

    updateCTM(ctm: SVGMatrix) {
        this.ctm = ctm;
    }
}