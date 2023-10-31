import { getBucket } from "@/app/actions"
import EditorForm from "./editor"
import QueryForm from "./query"
import BucketForms from "./forms"

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getBucket(params.id)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 text-sm">
      <div className="container m-4 grow">
        <div className="my-4 bg-slate-800 rounded-2xl p-4">
          <div className=" text-gray-400 flex items-center ">
            <i className="fa fa-exclamation-triangle fa-2x text-yellow-400 mr-3" aria-hidden="true" />
            <div>
              <div className="text-yellow-400 font-bold">Внимание</div>
              Это очень прототипный прототип. Любая синтаксическая ошибка приведет к падению и никаких адекватных сообщений об ошибке не будет (лог для отладки есть только у разработчиков) </div>
          </div>
        </div>
        <BucketForms data={data} />
        <div className="mt-4 bg-slate-800 rounded-2xl p-4">
          <div>
            <span className="text-gray-400">ID:</span> <span className="select-all selection:bg-green-700">{params.id}</span>
          </div>
          <div>
            <span className="text-gray-400">TITLE:</span> <span className="select-all selection:bg-green-700">{data.title}</span>
          </div>
          <div>
            <span className="text-gray-400">CREATE DATE:</span> <span className="select-all selection:bg-green-700">{data.created_date}</span>
          </div>
          <div>
            <span className="text-gray-400">UPDATE DATE:</span> <span className="select-all selection:bg-green-700">{data.updated_at}</span>
          </div>
        </div>
      </div>
    </main>
  )
}