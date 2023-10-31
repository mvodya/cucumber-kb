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

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-800 rounded-2xl p-4">
          <label className="float-left block mb-2 text-lg font-bold"><i className="fa fa-folder-open" aria-hidden="true" /> База знаний:</label>
          <button className="float-right rounded-md bg-green-700 px-3" type="submit"><i className="fa fa-cloud-upload" aria-hidden="true" /> СОХРАНИТЬ</button>
          <textarea name="data" placeholder="{ ... }" rows={25} defaultValue={JSON.stringify(props.data.data, null, 2)} onChange={(e) => props.dataUpdate(e.target.value)} className="w-full border border-gray-600 bg-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono"></textarea>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4">
          <label className="float-left block mb-2 text-lg font-bold"><i className="fa fa-cube" aria-hidden="true" /> Модель:</label>
          <button className="float-right rounded-md bg-green-700 px-3" type="submit"><i className="fa fa-cloud-upload" aria-hidden="true" /> СОХРАНИТЬ</button>
          <textarea name="model" placeholder="{ ... }" rows={15} defaultValue={JSON.stringify(props.data.model, null, 2)} onChange={(e) => props.modelUpdate(e.target.value)} className="w-full border border-gray-600 bg-gray-700  rounded-md py-2 px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono"></textarea>
        </div>
      </div>
      <input type="hidden" id="id" name="id" value={props.data.id} />
    </form>
  )
}