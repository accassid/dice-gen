import {Geometry, TextGeometry, TextGeometryParameters} from "three";

export const assembleD4Face = (numbers: [string, string, string], config: TextGeometryParameters, radius: number): Geometry => {
  let rotation = 0
  let geometry: TextGeometry | null = null
  numbers.forEach((text) => {
    const currentGeometry = new TextGeometry(text, config)
    currentGeometry.center()
    currentGeometry.translate(0,0, radius)
    currentGeometry.rotateY(rotation)
    if(!geometry) geometry = currentGeometry
    else geometry.merge(currentGeometry)
    rotation += Math.PI * 2 / 3
  })
  if (!geometry) throw new Error("There must be at least one number for the D4 face generator.")
  return geometry
}