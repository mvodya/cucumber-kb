import CreateBucketForm from './form'

export default async function Page() {
  return (
    <main className="flex flex-row items-center justify-center min-h-screen bg-gray-900 text-gray-200 text-sm">
      <div className="p-12 bg-gray-800 rounded-2xl lg:basis-1/4 flex flex-col">
        <div className='flex flex-col items-center'>
          <div className="text-xl font-bold mb-2 flex items-center"><img className="w-12" src="/cucumberlogo.png" />CucumberKB</div>
          <div className="text-sm font-semibold mb-8">Создание базы знаний</div>
        </div>
        <div className='flex flex-col'>
          <CreateBucketForm />
        </div>
      </div>
    </main>
  )
}