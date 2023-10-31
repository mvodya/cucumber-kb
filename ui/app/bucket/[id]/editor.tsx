'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { updateBucketData } from '../../actions'

const initialState = {
  data: {},
  model: {},
}

export default function EditorForm(props: any) {
  const [state, formAction] = useFormState(updateBucketData, initialState)
  // const [dataState, setData] = useState(props.data.data);
  // const [modelState, setModel] = useState(props.data.model);

  return (
    <form action={formAction}>
      <p>База знаний:</p>
      <textarea name="data" defaultValue={JSON.stringify(props.data.data, null, 2)} rows={25} cols={80} onChange={(e) => props.dataUpdate(e.target.value)}/>
      <p>Модель:</p>
      <textarea name="model" defaultValue={JSON.stringify(props.data.model, null, 2)} rows={25} cols={80} onChange={(e) => props.modelUpdate(e.target.value)}/>
      <br/><br/>
      <button type="submit">ОБНОВИТЬ БЗ и МОДЕЛЬ</button>
      <input type="hidden" id="id" name="id" value={props.data.id} />
    </form>
  )
}