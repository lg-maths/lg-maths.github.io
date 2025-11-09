import { Component, Input, OnInit } from '@angular/core';

export class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}

  // Vector addition
  add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  // Vector subtraction
  sub(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  // Dot product
  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  mult(scalar: number): Vec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  // Cross product
  cross(other: Vec3): Vec3 {
    return new Vec3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  // Vector length (magnitude)
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}

interface Triangle {
  p: Vec3;
  q: Vec3;
  r: Vec3;
  color: string;
  id?: number
}

@Component({
  selector: 'app-obj3d-css',
  imports: [],
  templateUrl: './obj3d-css.html',
  styleUrl: './obj3d-css.scss'
})
export class Obj3dCss implements OnInit {
  @Input({ required: true }) triangles!: Triangle[];

  protected elements?: { mat: string; color: string }[];

  private startTime: number = 0;

  ngOnInit() {
    this.startTime = performance.now();
    this.triangles.forEach((el, i) => el.id = i);
    this.elements = this.triangles.map(t => ({mat: this.transformMatrix(t), color: t.color}));
  }

  private transformMatrix(triangle: Triangle): string {
    const p = triangle.p;
    const a = triangle.q.sub(p);
    const b = triangle.r.sub(p);
    const n = a.cross(b);
    const m = n.mult(1 / n.length());

    const col1 = `${a.x}, ${a.y}, ${a.z}, 0, `;
    const col2 = `${b.x}, ${b.y}, ${b.z}, 0, `;
    const col3 = `${m.x}, ${m.y}, ${m.z}, 1, `;
    const col4 = `${p.x}, ${p.y}, ${p.z}, 1  `;

    return `matrix3d(${col1}${col2}${col3}${col4})`;
  }

  private get rotAnimDeg(): number {
    const elapsed = performance.now() - this.startTime;
    return (elapsed / 5000) * 360; // 360 degrees per 5000ms (5 seconds)
  } 
  
  protected transformValue(mat: string): string {
    return `scaleX(100) scaleY(100) rotateY(${this.rotAnimDeg}deg) ${mat}`;
  }
}
