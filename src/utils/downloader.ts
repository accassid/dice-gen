import {Geometry, Mesh, MeshStandardMaterial, Scene} from "three";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import JSZip from "jszip";

export const generateSTL = (geometry: Geometry): string => {
  const exportScene = new Scene()
  const mesh = new Mesh(geometry)
  mesh.material = new MeshStandardMaterial({color: 0xacacac})
  exportScene.add(mesh)

  const exporter = new STLExporter()
  const stlString = exporter.parse(exportScene)

  return stlString
}

export const download = (fileStrings: Array<string>): void => {
  const zip = new JSZip()
  fileStrings.forEach((fileString,i) => {
    zip.file(`die${i+1}.stl`, fileString)
  })
  zip.generateAsync({type : "base64"}).then(result => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:application/zip;base64,' + result)
    element.setAttribute('download', 'test.zip')

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  })
}