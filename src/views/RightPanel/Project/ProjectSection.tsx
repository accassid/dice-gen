import React from 'react'
import { getGlobalState, resetGlobalState, restoreGlobalState } from '../../../modules/global'
import { fileOpen, fileSave } from 'browser-fs-access'

// Style
import { Spacer } from '../../style'
import { HorizontalContainer } from './style'

// components
import ValueCheckbox from '../ValueCheckbox/ValueCheckbox'
import { Button, notification } from 'antd'

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
  }

  const readFileAsTextAsync = async file =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = event => {
        resolve(reader.result)
      }
      reader.readAsText(file)
    })

  const readFileAsObjectAsync = async file =>
    new Promise(async (resolve, reject) => {
      let json = await readFileAsTextAsync(file)
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
        let project = await readFileAsObjectAsync(blob)
        restoreGlobalState(project['settings'])
      }
    } catch (ex) {}
  }

  let projectFileHandle = undefined

  const prepareGlobalStateForSaving = () =>
    new Blob(
      [
        JSON.stringify(
          {
            version: Number(1.1),
            settings: { ...getGlobalState() },
          },
          undefined,
          2,
        ),
      ],
      { type: 'application/json' },
    )

  const saveProject = async (bShowFeedback = true) => {
    try {
      projectFileHandle = await fileSave(
        prepareGlobalStateForSaving(),
        {
          fileName: 'ProjectSettings.DiceGen',
          extensions: ['.DiceGen'],
        },
        projectFileHandle,
      )

      if (bShowFeedback) {
        notification.open({
          message: 'Project saved successfully',
          description: `your project has been saved to ${projectFileHandle.name}`,
          duration: 3,
        })
      }
    } catch (ex) {
      alert('unable to save file')
    }
  }

  const autoSave = (): void => {
    if (!projectFileHandle) return
    saveProject(false)
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
