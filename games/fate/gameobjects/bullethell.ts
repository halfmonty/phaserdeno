export default class BulletHell {
    _functions: Array<(...args: number[])=>number>;

  constructor() {
    this._functions = [
      this.flat,
      this.tlaf,
      this.horizontal,
      this.multiWave,
      this.cos,
      this.tan,
      this.ripple,
    ];
  }

  get functions() {
    return this._functions;
  }

  /*
    These are different functions that we will use to generate the path of the bullets. They're quite simple, but you can create your own functions to generate more complex paths.
    We will use the x, y, z and time parameters to generate different patterns.
  */
  sin(x: number, _time: number): number {
    return Math.sin(x);
  }

  flat(x: number, _y: number, z: number): number {
    return x + z;
  }

  tlaf(x: number, _y: number, z: number): number {
    return -x - z;
  }

  horizontal(_x: number, _y: number, z: number): number {
    return z;
  }

  wave(x: number, time: number): number {
    return Math.sin(Math.PI * (x + time));
  }

  multiWave(x: number, time: number): number {
    return Math.sin(Math.PI * (x + time));
  }

  cos(x: number, _time: number, _z: number): number {
    return Math.cos(x) * Phaser.Math.Between(0.1, 0.9);
  }

  tan(x: number, _time: number, _z: number): number {
    return Math.tan(x);
  }

  ripple(x: number, time: number, _z: number): number {
    return Math.sin(time * x * (Math.PI / 360));
  }
}