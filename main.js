let v = [];
let cols = 600, rows = 30;
let t_D = 180 * 15 / cols;
let r_D = 1 / rows;
let canvas;

let open_animation = 20, vDensity = 8, pAlign = 3.6, curve1 = 2, curve2 = 1.3;

function setup() {
  canvas = createCanvas(window.screen.width, window.screen.height, WEBGL);
  canvas.id('canvas');
  colorMode(HSB);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  clear();
  background(5);
  orbitControl(4, 4);
  rotateX(-30);

  if (open_animation < 1) {
    open_animation = 10;
  }

  open_animation -= 0.4; //animation open speed

  for (let r = 0; r <= rows; r++) {
    v.push([]);
    for (let theta = 0; theta <= cols; theta++) {
      let phi = (180 / open_animation) * Math.exp(-theta * t_D / (vDensity * 180));
      let petalCut = 1 - (1 / 2) * pow((5 / 4) * pow(1 - ((pAlign * theta * t_D % 360) / 180), 2) - 1 / 4, 2);
      let hangDown = curve1 * pow(r * r_D, 2) * pow(1.3 * r * r_D - 1, 2) * sin(phi);

      let pX = 260 * petalCut * (r * r_D * sin(phi) + hangDown * cos(phi)) * sin(theta * t_D);
      let pY = -260 * petalCut * (r * r_D * cos(phi) - hangDown * sin(phi));
      let pZ = 260 * petalCut * (r * r_D * sin(phi) + hangDown * cos(phi)) * cos(theta * t_D);
      let pos = createVector(pX, pY, pZ);
      v[r].push(pos);
    }
  }

  for (let r = 0; r < v.length; r++) {
    fill((open_animation / 10) * 360, 100, -20 + r * r_D * 120); //animation color


    for (let theta = 0; theta < v[r].length; theta++) {
      if (r < v.length - 1 && theta < v[r].length - 1) {
        beginShape();
        vertex(v[r][theta].x, v[r][theta].y, v[r][theta].z);
        vertex(v[r + 1][theta].x, v[r + 1][theta].y, v[r + 1][theta].z);
        vertex(v[r + 1][theta + 1].x, v[r + 1][theta + 1].y, v[r + 1][theta + 1].z);
        vertex(v[r][theta + 1].x, v[r][theta + 1].y, v[r][theta + 1].z);
        endShape(CLOSE);
      }
    }
  }
  v = [];
}