import React from 'react'
import { ArticleList } from './_components/ArticleList'
import ArticleComponent from './_components/ArticleComponent'

export default function page() {
  return (
    <div className="container mx-auto px-8 py-4 space-y-8">
      <ArticleComponent />
    </div>
  )
}
