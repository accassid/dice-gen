import React, { useEffect } from 'react'
import { getGlobalState, resetGlobalState, restoreGlobalState, subscribeToAllChanges } from '../../../modules/global'
import { fileOpen, fileSave } from 'browser-fs-access'
import debounce from 'debounce'

// the default JSON.stringify errors out after selecting a new die.
//  It is likely a problem with three.js objects
//  This polyfill works.
import safeJsonStringify from 'safe-json-stringify'

// Style
import { Spacer } from '../../style'
import { HorizontalContainer } from './style'

// components
import ValueCheckbox from '../ValueCheckbox/ValueCheckbox'
import { Button, notification } from 'antd'

const readFileAsTextAsync = async file =>
  new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsText(file)
  })

const readFileAsObjectAsync = async file =>
  new Promise(async resolve => {
    const json = await readFileAsTextAsync(file)
    resolve(JSON.parse(json.toString()))
  })

const loadProject = async () => {
  try {
    const blob = await fileOpen({
      mimeTypes: ['applicaiton/json'],
      extensions: ['.DiceGen', '.json'],
      multiple: false,
      description: 'DiceGen project file',
    })

    if (blob) {
      const projectConfiguration = await readFileAsObjectAsync(blob)
      restoreGlobalState(projectConfiguration['settings'])
    }
  } catch (ex) {
    alert(`Unable to load project\n\r\n\r${ex}`)
  }
}

let projectFileHandle = undefined

const createBlobFromString = str => new Blob([str], { type: 'application/json' })

const prepareSettingsForSaving = settings => {
  const json = safeJsonStringify(
    {
      version: 1.0,
      settings: { ...settings },
    },
    undefined,
    2,
  )
  console.log('json', json)
  return createBlobFromString(json)
}

const saveProject = async () => {
  try {
    console.log('in saveProject')
    const settings = getGlobalState()
    console.log('State', settings)
    let blobToSave = prepareSettingsForSaving(settings)
    console.log('Blob:', blobToSave)
    projectFileHandle = await fileSave(
      blobToSave,
      {
        fileName: (projectFileHandle && projectFileHandle.fileName) || 'ProjectSettings.DiceGen',
        extensions: ['.DiceGen'],
      },
      projectFileHandle,
    )

    console.log('file saved')

    notification.open({
      message: 'Project saved successfully',
      description: `your project has been saved to ${projectFileHandle.name}`,
      duration: 3,
    })
  } catch (ex) {
    notification.open({
      message: 'Unable to save project',
      description: `${ex.message}`,
      duration: 3,
    })
  }
}

subscribeToAllChanges(
  debounce(async () => {
    console.log('Save event received')
    const { autosaveProject } = getGlobalState()
    console.log(`autosave ${autosaveProject}`)
    if (!autosaveProject) return
    try {
      await saveProject()
    } catch (ex) {}
  }, 1000),
)

type Props = {}

/**
 * This component renders the font selection options at the top of the right panel. By default this displays the
 * dropdown of all the google fonts as well as a button that switches to upload font mode. This sets the property
 * globalFontUploadActive to true in the google state which switches this component to render a font file dropzone
 * instead with a button that resets the state back to the font dropdown.
 * @constructor
 */
const ProjectSection: React.FC<Props> = () => {
  const newProject = () => {
    if (!confirm('Are you sure - this will reset to factory defaults?')) return

    resetGlobalState()
    projectFileHandle = undefined
  }

  return (
    <div>
      <HorizontalContainer>
        <Button title="Create a project" onClick={() => newProject()}>
          New
        </Button>
        <Button title="Load a project" onClick={() => loadProject()}>
          Load
        </Button>
        <Button title="Save a project" onClick={() => saveProject()}>
          Save
        </Button>
      </HorizontalContainer>
      <Spacer />
      <HorizontalContainer>
        <ValueCheckbox stateKey="autosaveProject" label="Autosave" />
      </HorizontalContainer>
    </div>
  )
}

export default ProjectSection
