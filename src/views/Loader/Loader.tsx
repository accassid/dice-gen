import React from 'react'
import { useGlobalState } from '../../modules/global'

// Style
import { Modal, Progress } from 'antd'

type Props = {}

/**
 * This component is a modal that contains progress bars containing the progress of dice subtraction which is stored in
 * the global state. The first progress bar shows the progress through dice if processing a set (will be at 100% for a
 * single die). The second progress bar shows the progress of faces through the current die.
 * @constructor
 */
const Loader: React.FC<Props> = () => {
  const [loadingDice] = useGlobalState('loadingDice')
  const [loadingFaces] = useGlobalState('loadingFaces')
  if (!loadingDice || !loadingFaces) return null
  return (
    <Modal visible={true} footer={null} closable={false}>
      <h3>Dice Progress</h3>
      <Progress
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={Math.round((100 * loadingDice.current) / loadingDice.max)}
        status="active"
      />
      <h3>Face Progress</h3>
      <Progress
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
        percent={Math.round((100 * loadingFaces.current) / loadingFaces.max)}
        status="active"
      />
    </Modal>
  )
}

export default Loader
