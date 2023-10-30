'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import { createBucket } from '../actions'

const initialState = {
  title: "",
  description: "",
}

export default function CreateBucketForm() {
  const [state, formAction] = useFormState(createBucket, initialState)

  return (
    <form action={formAction}>
      <p>Название:</p>
      <input type="text" name="title" required />
      <p>Описание:</p>
      <input type="text" name="description" />
      <br/><br/>
      <button type="submit">СОЗДАТЬ БАЗУ ЗНАНИЙ</button>
    </form>
  )
}