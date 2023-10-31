'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { bucketSolve } from '../../actions'
import QueryList from './queryList'

const initialState = {}

export default function QueryForm(props: any) {
  const [state, formAction] = useFormState(bucketSolve, initialState)

  return (
    <form action={formAction}>
      <label className="block mb-2 text-lg font-bold"><i className="fa fa-flash" aria-hidden="true" /> Запрос:</label>
      <QueryList model={props.model} />

      <div className="mt-8">
        <button className="float-right rounded-md bg-yellow-700 px-3" type="submit"><i className="fa fa-cogs" aria-hidden="true" /> РЕШИТЬ</button>
        <label className="float-left block mb-2 text-lg font-bold"><i className="fa fa-check-square" aria-hidden="true" /> Решение:</label>
        <textarea name="solve" value={JSON.stringify(state, null, 2)} rows={15} className="w-full border border-gray-600 bg-gray-700  rounded-md py-2 px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono" readOnly />
        <input type="hidden" id="id" name="id" value={props.data.id} />
      </div>
    </form>
  )
}