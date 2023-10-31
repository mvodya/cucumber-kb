'use client'

import { useState, useEffect } from 'react'
import EditorForm from './editor'
import QueryForm from './query'

const initialModelState = ""

const initialKbState = ""

export default function BucketForms(props: any) {
  const [model, setModel] = useState(initialModelState)
  const [kb, setKb] = useState(initialKbState)

  useEffect(() => {
    setModel(JSON.stringify(props.data.model))
  }, [])

  return (
    <div className="flex flex-row gap-4">
      <div className="basis-1/2">
        <EditorForm data={props.data} modelUpdate={setModel} dataUpdate={setKb} />
      </div>
      <div className="basis-1/2 bg-gray-800 rounded-2xl p-4">
        <QueryForm data={props.data} model={model} kb={kb} />
      </div>
    </div>
  )
}