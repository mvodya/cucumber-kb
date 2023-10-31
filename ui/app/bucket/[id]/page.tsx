import { getBucket } from "@/app/actions"
import EditorForm from "./editor"
import QueryForm from "./query"
import BucketForms from "./forms"

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getBucket(params.id)

  return (<main>
    <div>ID: {params.id}</div>
    <p>Внимание! Это очень прототипный прототип. Любая синтаксическая ошибка приведет к падению и никаких адекватных сообщений об ошибке не будет (лог для отладки есть только у разработчиков)</p>
    <BucketForms data={data} />
  </main>)
}