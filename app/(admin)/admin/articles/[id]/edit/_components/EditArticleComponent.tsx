"use client";

import { getArticle } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { ArticleForm } from '../../../_components/ArticleForm';

export default function EditArticleComponent({ id }: { id: string }) {
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticle(id),
  });

  if (isLoading) return <div>Loading...</div>;

  const initialData = article
    ? {
        id: article.id,
        title: article.title,
        content: article.content,
        author: article.author,
        thumbnail: article.thumbnail,
        published: article.published,
        categories: article.categories,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      }
    : undefined;

  return (
    <div className="container mx-auto">
      <ArticleForm articleId={id} initialData={initialData} />
    </div>
  );
}
