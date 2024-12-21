"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getArticles, deleteArticle } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ArticleList() {
  const queryClient = useQueryClient();

  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Articles</h2>
        <Link href="/admin/articles/new">
          <Button>
            Create New Article
          </Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {articles?.map((article: Article) => (
          <div key={article.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">By {article.author}</p>
                <div className="flex gap-2 mt-2">
                  {article.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/articles/${article.id}/edit`}>
                  <Button variant="outline">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(article.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}