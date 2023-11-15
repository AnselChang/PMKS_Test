export class Coord {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}

    public add(other: Coord): Coord {
        return new Coord(this.x + other.x, this.y + other.y);
    }

    public sub(other: Coord): Coord {
        return new Coord(this.x - other.x, this.y - other.y);
    }

    public equals(other: Coord): boolean {
        return this.x === other.x && this.y === other.y;
    }

    applyMatrix(inverseCTM: DOMMatrix) {
        const x = this.x * inverseCTM.a + this.y * inverseCTM.c + inverseCTM.e;
        const y = this.x * inverseCTM.b + this.y * inverseCTM.d + inverseCTM.f;
        return new Coord(x, y);
    }

}