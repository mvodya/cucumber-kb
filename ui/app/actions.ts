'use server'

import { redirect } from 'next/navigation'

export async function createBucket(prevState: any, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");

  // const respone = await fetch(`http://api:3000/bucket/create`, {
  //   method: "post",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(data),
  // })

  const respone = await fetch(`http://api:3000/bucket/create?title=${title}&description=${description}`, {method: "post", cache: 'no-store'})
  const bucket = await respone.json()

  // console.log(bucket)

  if (bucket.id) {
    redirect(`/bucket/${bucket.id}`)
  }
}

export async function getBucket(id: string) {
  // const title = formData.get("title");
  // const description = formData.get("description");

  // const respone = await fetch(`http://api:3000/bucket/create`, {
  //   method: "post",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(data),
  // })

  const respone = await fetch(`http://api:3000/bucket?id=${id}`, {method: "get", cache: 'no-store'})
  const bucket = await respone.json()

  // console.log(bucket)

  return bucket
}

export async function updateBucketData(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const data = {
    data: JSON.parse(formData.get("data")! as string),
    model: JSON.parse(formData.get("model")! as string),
  }

  // const respone = await fetch(`http://api:3000/bucket/create`, {
  //   method: "post",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(data),
  // })

  const respone = await fetch(`http://api:3000/bucket/updateData?id=${id}`, {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
    cache: 'no-store',
  })
  const bucket = await respone.json()

  console.log("UPD")
  // console.log(bucket)

  // redirect(`/bucket/${bucket.id}`)

  // if (bucket.id) {
  //   redirect(`/bucket/${bucket.id}`)
  // }
}

export async function bucketSolve(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const data = {
    ...JSON.parse(formData.get("object")! as string),
  }

  // console.log(data)

  // formData.set("data", "123");

  // const respone = await fetch(`http://api:3000/bucket/create`, {
  //   method: "post",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify(data),
  // })

  const respone = await fetch(`http://api:3000/objectreq/create?bucketId=${id}`, {
    method: "post",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
    cache: 'no-store',
  })
  const solve = await respone.json()

  console.log("SOLVE")
  console.log({...solve.response})
  return {...solve.response}

  // redirect(`/bucket/${bucket.id}`)

  // if (bucket.id) {
  //   redirect(`/bucket/${bucket.id}`)
  // }
}