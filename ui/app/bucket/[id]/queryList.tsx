'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useState, useEffect } from 'react'
import Select from "react-select";

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
  function updateQuery(selected: any) {
    let q = JSON.parse(props.query);
    if (selected.value == "true") {
      q["data"][props.item.param] = true;
    } else if (selected.value == "false") {
      q["data"][props.item.param] = false;
    } else {
      q["data"][props.item.param] = null;
    }
    props.setQuery(JSON.stringify(q))
    console.log(props.query)
  }

  const options = [
    { value: "null", label: "Неизвестно", icon: "fa-question" },
    { value: "true", label: "Да", icon: "fa-check" },
    { value: "false", label: "Нет", icon: "fa-close" }
  ];

  const formatOptionLabel = ({ label, icon }: any) => (
    <div className="flex items-center ">
      <i className={`fa ${icon} mr-2`} aria-hidden="true" />
      <div>{label}</div>
    </div>
  );

  return (
    <div>
      <Select
        name={props.item.param}
        defaultValue={options[0]}
        options={options}
        onChange={updateQuery}
        isSearchable={false}
        formatOptionLabel={formatOptionLabel}
        unstyled
        styles={{
          control: (base, props) => {
            base.minHeight = 0;
            return base;
          }
        }}
        classNames={{
          container: () => "w-full border border-gray-600 bg-gray-700 rounded-md px-3 caret-green-600 font-mono",
          menu: () => "w-full border border-gray-600 bg-gray-700 rounded-md caret-green-600 font-mono",
          option: () => "hover:bg-gray-600 px-3 py-1"
        }}
      />
    </div>
  )
}

function QueryEntryEnum(props: any) {
  function updateQuery(selected: any) {
    let q = JSON.parse(props.query);
    if (selected.value == "null") {
      q["data"][props.item.param] = null;
    } else {
      q["data"][props.item.param] = selected.value;
    }
    props.setQuery(JSON.stringify(q))
    console.log(props.query)
  }

  const options = props.item.spec.data.map((option: any) => {
    return { value: option.value, label: option.title, description: option.description, image: option.image }
  })
  options.unshift({ value: "null", label: "Неизвестно", description: "" })

  const formatOptionLabel = ({ label, value, description, image }: any) => (
    <div className="flex flex-col">
      <div className='flex flex-row'>
        { image &&
          <div className='flex mr-2 my-1'>
            <div className='w-10 h-10 '>
              <img className='object-cover w-10 h-10 rounded-sm' src={image} />
            </div>
          </div>
        }
        <div className={`${image && "mt-1"}`}>
          {value == "null" &&
            <i className={`fa fa-question mr-2`} aria-hidden="true" />
          }
          {label}
        </div>
      </div>
      <div className='text-gray-400'>{description}</div>
    </div>
  );

  return (
    <div>
      <Select
        name={props.item.param}
        defaultValue={options[0]}
        options={options}
        onChange={updateQuery}
        formatOptionLabel={formatOptionLabel}
        unstyled
        styles={{
          control: (base, props) => {
            base.minHeight = 0;
            return base;
          }
        }}
        classNames={{
          container: () => "w-full border border-gray-600 bg-gray-700 rounded-md px-3 caret-green-600 font-mono",
          menu: () => "w-full border border-gray-600 bg-gray-700 rounded-md caret-green-600 font-mono",
          option: () => "hover:bg-gray-600 px-3 py-1"
        }}
      />
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