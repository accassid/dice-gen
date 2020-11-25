import React, {useState} from 'react'
import {HorizontalContainer} from "./style";
import FontDropdown from "./FontDropdown/FontDropdown";
import {Button} from "antd";
import {DeleteOutlined, UploadOutlined} from "@ant-design/icons/lib";
import FontDropzone from "./FontDropzone/FontDropzone";

type Props = {}

const FontOptions: React.FC<Props> = ({}: Props) => {
  const [uploadOpen, setUploadOpen] = useState(false)

  if (uploadOpen) return (
    <HorizontalContainer>
      <FontDropzone/>
      <Button onClick={() => setUploadOpen(false)} title="Remove uploaded font" type="primary"  icon={<DeleteOutlined />} />
    </HorizontalContainer>
  )

  return (
    <HorizontalContainer>
      <FontDropdown />
      <Button title="Upload a font" onClick={() => setUploadOpen(true)}type="primary" shape="circle" icon={<UploadOutlined />} />
    </HorizontalContainer>
  )
}

export default FontOptions
