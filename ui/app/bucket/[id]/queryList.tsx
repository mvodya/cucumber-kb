'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'

function QueryLabel(props: any) {
  return (
    <div className='text-gray-300'>{props.item.title}:</div>
  )
}

function QueryEntryDescription(props: any) {
  return (
    <div className='text-gray-400 text-sm col-span-2 mb-2'>{props.item.description}</div>
  )
}

function QueryEntry(props: any) {
  function updateQuery(e: any) {
    let q = JSON.parse(props.query);
    if (e.target.value == "") {
      q["data"][e.target.name] = null;
    } else {
      q["data"][e.target.name] = e.target.value;
    }
    props.setQuery(JSON.stringify(q))
    console.log(props.query)
  }

  return (
    <input className='w-full border border-gray-600 bg-gray-700 rounded-md px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono' type="text" name={props.item.param} onChange={updateQuery}></input>
  )
}

function QueryEntryBool(props: any) {
  function updateQuery(e: any) {
    let q = JSON.parse(props.query);
    if (e.target.value == "true") {
      q["data"][e.target.name] = true;
    } else if (e.target.value == "false") {
      q["data"][e.target.name] = false;
    } else {
      q["data"][e.target.name] = null;
    }
    props.setQuery(JSON.stringify(q))
    console.log(props.query)
  }

  return (
    <div>
      <select className="w-full border border-gray-600 bg-gray-700 rounded-md px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono" name={props.item.param} onChange={updateQuery}>
        <option value="null">Неизвестно</option>
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
    </div>
  )
}

function QueryEntryEnum(props: any) {
  function updateQuery(e: any) {
    let q = JSON.parse(props.query);
    if (e.target.value == "null") {
      q["data"][e.target.name] = null;
    } else {
      q["data"][e.target.name] = e.target.value;
    }
    props.setQuery(JSON.stringify(q))
    console.log(props.query)
  }

  const options = props.item.spec.data.map((option: any) => {
    return (
      <option key={option.value} value={option.value}>{option.title}</option>
    )
  })

  return (
    <div>
      <select className="w-full border border-gray-600 bg-gray-700 rounded-md px-3 focus:outline-none focus:border-green-700 caret-green-600 selection:bg-green-700 font-mono" name={props.item.param} onChange={updateQuery}>
        <option value="null">Неизвестно</option>
        {options}
      </select>
    </div>
  )
}

export default function QueryList(props: any) {
  const [query, setQuery] = useState('{"data": {} }')

  let modelJson = {
    schema: []
  }
  let isError = false;
  try {
    modelJson = JSON.parse(props.model)
  } catch (e) {
    isError = true;
  }

  let listItems: any = []
  try {
    listItems = modelJson.schema.map((item: any) => {
      if (item.spec.type == "string" || item.spec.type == "float" || item.spec.type == "int") {
        return (
          [
            <QueryLabel key={`${item.param}-label`} item={item} />,
            <QueryEntry key={item.param} item={item} query={query} setQuery={setQuery} />,
            <QueryEntryDescription key="{item.param}-desc" item={item} />
          ]
        )
      } else if (item.spec.type == "bool") {
        return (
          [
            <QueryLabel key={`${item.param}-label`} item={item} />,
            <QueryEntryBool key={item.param} item={item} query={query} setQuery={setQuery} />,
            <QueryEntryDescription key="{item.param}-desc" item={item} />
          ]
        )
      } else if (item.spec.type == "enum") {
        return (
          [
            <QueryLabel key={`${item.param}-label`} item={item} />,
            <QueryEntryEnum key={item.param} item={item} query={query} setQuery={setQuery} />,
            <QueryEntryDescription key="{item.param}-desc" item={item} />
          ]
        )
      }
    }
    );
  } catch (e) {
    isError = true;
  }

  return (
    <div>
      {isError &&
        <div className="flex items-center text-red-500">
          <i className="fa fa-exclamation-triangle" aria-hidden="true" />
          <div className="ml-2">Ошибка парсинга модели</div>
        </div>
      }
      <div className="grid grid-cols-2 gap-2">
        {listItems}
      </div>
      <textarea name="object" value={query} readOnly hidden />
    </div>
  )
}