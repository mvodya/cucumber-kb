export default function Page({ params }: { params: { id: string } }) {
  return (<main>
    <div>ID: {params.id}</div>
  </main>)
}