import React from 'react'
import { getGlobalState, resetGlobalState } from '../../../modules/global'
import { fileOpen, fileSave } from 'browser-fs-access'

// Style
import { Spacer } from '../../style'
import { HorizontalContainer } from './style'

// components
import ValueCheckbox from '../ValueCheckbox/ValueCheckbox'
import { Button } from 'antd'

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

  const loadProject = () => {
    const gs = getGlobalState()
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

  const saveProject = async () => {
    try {
      let fileHandle = await fileSave(
        prepareGlobalStateForSaving(),
        {
          fileName: 'DiceGen-settings.json',
          extensions: ['.json'],
        },
        projectFileHandle,
      )

      if (!projectFileHandle) {
        alert('File saved successfully')
      }
      projectFileHandle = fileHandle
    } catch (ex) {
      alert('unable to save file')
    }
  }

  const autoSave = (): void => {
    if (!projectFileHandle) return
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
