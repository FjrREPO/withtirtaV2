import EditArticleComponent from './_components/EditArticleComponent';

interface Params {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Params) {
  const { id } = await params;

  return (
    <EditArticleComponent id={id} />
  );
}