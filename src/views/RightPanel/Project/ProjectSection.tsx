import React from 'react'
import { getGlobalState, useGlobalState } from '../../../modules/global'

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
  /**
   * When switching between upload and dropdown modes, clear the currently selected font and set the flag.
   * @param flag
   */

  const newProject = (): void => {
    const gs = getGlobalState()
  }

  const loadProject = (): void => {
    const gs = getGlobalState()
  }

  const saveProject = (): void => {
    const gs = getGlobalState()
  }

  return (
    <div>
      <HorizontalContainer>
        <Button title="Create a project" onClick={(): void => newProject()}>
          New
        </Button>
        <Button title="Load a project" onClick={(): void => loadProject()}>
          Load
        </Button>
        <Button title="Save a project" onClick={(): void => saveProject()}>
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
