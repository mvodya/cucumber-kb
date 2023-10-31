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
    <form className='flex flex-col gap-1' action={formAction}>
      <p>Название:</p>
      <input className='mb-4 w-full border border-gray-600 bg-gray-700  rounded-md py-2 px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono' type="text" name="title" required />
      <p>Описание:</p>
      <input className='mb-4 w-full border border-gray-600 bg-gray-700  rounded-md py-2 px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono' type="text" name="description" />
      <button className='rounded-md bg-green-700 hover:bg-green-600 px-3 py-1' type="submit">СОЗДАТЬ БАЗУ ЗНАНИЙ</button>
    </form>
  )
}