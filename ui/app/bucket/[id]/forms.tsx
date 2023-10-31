'use client'

import { useState, useEffect } from 'react'
import EditorForm from './editor'
import QueryForm from './query'

const initialModelState = ""

const initialKbState = ""

export default function BucketForms(props: any) {
  const [model, setModel] = useState(initialModelState)
  const [kb, setKb] = useState(initialKbState)

  useEffect(()=>{
    setModel(JSON.stringify(props.data.model))
  }, [])

  return (
    <div className="row">
      <div className="column"><EditorForm data={props.data} modelUpdate={setModel} dataUpdate={setKb} /></div>
      <div className="column"><QueryForm data={props.data} model={model} kb={kb} /></div>
    </div>
  )
}