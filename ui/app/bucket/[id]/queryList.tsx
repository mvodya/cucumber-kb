'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'

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
    <div>
      {props.item.title}<br />
      <input type="text" name={props.item.param} onChange={updateQuery}></input><br /><br />
    </div>
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
      {props.item.title}<br />
      {/* <input type="checkbox" name={props.item.param} onChange={updateQuery}></input><br /><br /> */}
      <select name={props.item.param} onChange={updateQuery}>
        <option value="null">Неизвестно</option>
        <option value="true">Да</option>
        <option value="false">Нет</option>
      </select>
      <br /><br />
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
      {props.item.title}<br />
      {/* <input type="checkbox" name={props.item.param} onChange={updateQuery}></input><br /><br /> */}
      <select name={props.item.param} onChange={updateQuery}>
        <option value="null">Неизвестно</option>
        {options}
      </select>
      <br /><br />
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
          <div key={item.param}>
            <QueryEntry item={item} query={query} setQuery={setQuery} />
          </div>
        )
      } else if (item.spec.type == "bool") {
        return (
          <div key={item.param}>
            <QueryEntryBool item={item} query={query} setQuery={setQuery} />
          </div>
        )
      } else if (item.spec.type == "enum") {
        return (
          <div key={item.param}>
            <QueryEntryEnum item={item} query={query} setQuery={setQuery} />
          </div>
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
        <p>Ошибка парсинга модели</p>
      }
      {listItems}
      <textarea name="object" value={query} readOnly hidden />
    </div>
  )
}