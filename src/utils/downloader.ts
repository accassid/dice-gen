import { Geometry, Mesh, MeshStandardMaterial, Scene } from 'three'
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter'
import JSZip from 'jszip'

/**
 * This function takes in a geometry and uses a three.js scene to convert it to an STL string with the STLExporter.
 * @param geometry
 */
export const generateSTL = (geometry: Geometry): string => {
  const exportScene = new Scene()
  const mesh = new Mesh(geometry)
  mesh.material = new MeshStandardMaterial({ color: 0xacacac })
  exportScene.add(mesh)

  const exporter = new STLExporter()
  const stlString = exporter.parse(exportScene)

  return stlString
}

/**
 * This function takes in an object containing file strings (base 64 encoded) mapped to their name ({d4: 'FILE_STRING}).
 * It zips all of those file strings as .stl files into a single zip object with JSZip. It then uses dom attributes to
 * prompt the user to download the zip file generating a name for the file based on the date.
 * @param fileStrings
 * @param callback
 */
export const download = (fileStrings: Record<string, string>, callback?: Function): void => {
  const zip = new JSZip()
  for (const name in fileStrings) {
    zip.file(`${name}.stl`, fileStrings[name])
  }
  zip.generateAsync({ type: 'base64' }).then(result => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:application/zip;base64,' + result)
    element.setAttribute('download', `diceGen${new Date(Date.now()).toISOString()}.zip`)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)

    callback && callback()
  })
}
