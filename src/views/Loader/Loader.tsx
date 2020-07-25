import React from 'react'

// Style
import { Modal, Progress } from 'antd'
import { useGlobalState } from '../../modules/global'

type Props = {}

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
