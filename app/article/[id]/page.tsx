import React from 'react'
import ArticleComponent from './_components/ArticleComponent'

interface Params {
  params: Promise<{ id: string }>
}

export default async function page({ params }: Params) {
  const { id } = await params;

  return (
    <div className='container mx-auto px-4 py-10'>
      <ArticleComponent id={id} />
    </div>
  )
}
