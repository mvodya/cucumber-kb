'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { bucketSolve } from '../../actions'

const initialState = {
  data: {},
  model: {},
}

export default function QueryForm(props: any) {
  const [state, formAction] = useFormState(bucketSolve, initialState)

  return (
    <form action={formAction}>
      <p>Запрос:</p>
      <textarea name="object" defaultValue="" rows={15} cols={80}/>
      <br/><br/>
      <button type="submit">ОТПРАВИТЬ В РЕШАТЕЛЬ</button>
      <p>Решение:</p>
      <textarea name="solve" value={JSON.stringify(state, null, 2)} rows={25} cols={80} readOnly/>
      <input type="hidden" id="id" name="id" value={props.data.id} />
    </form>
  )
}