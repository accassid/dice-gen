import {Font, TextGeometry, Mesh} from "three";

export const generateNumberObjects = (sides: number, font: Font): Array<Mesh> => {
  const numbers: Array<Mesh> = []
  for (let i=1; i<sides+1; i++){
    const config = {
      font,
      hAlign: 'center',
      size: 10,
      height: 10,
      curveSegments: 32,
      bevelEnabled: false,
      bevelThickness: 0.5,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 8,
    }
    const geometry = new TextGeometry(`${i}`, config)
    geometry.center()
    numbers.push(new Mesh(geometry))
  }
  return numbers
}