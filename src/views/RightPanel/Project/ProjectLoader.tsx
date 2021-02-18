import React from 'react'
import { getGlobalState, useGlobalState } from '../../../modules/global'

// Style
import { ActionButton } from '../style'

// // Web worker
import Worker from 'worker-loader!../../../subtractSolid.worker' // eslint-disable-line import/no-webpack-loader-syntax

type Props = {}

/**
 * This component renders a button that triggers the processing and download of the currently viewed die.
 * @constructor
 */
const ProjectLoader: React.FC<Props> = () => {
  const setLoadingDice = useGlobalState('loadingDice')[1]

  //   /**
  //    * When the project is loaded, it will replace the current global state
  //    */
  const loadProject = (): void => {
    const gs = getGlobalState()
    //     const worker = new Worker()

    //     setLoadingDice({current: 1, max: 1})

    //     worker.addEventListener("message", event => {
    //       worker.terminate()
    //       setLoadingDice(null)
    //     })
  }

  return (
    <ActionButton rgbColor={'84,119,62'} onClick={loadProject}>
      Load Project
    </ActionButton>
  )
}

export default ProjectLoader
