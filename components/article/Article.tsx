"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArticleSchema } from '@/lib/validation/types';
import Link from 'next/link';

const ArticleCard = ({ article }: { article: ArticleSchema }) => {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const addSpaceBetweenTags = (htmlContent: string) => {
    return htmlContent
      .replace(/<\/(div|p|h1|h2|h3|ul|li|span|section|article|footer|header|main|aside|strong|em|b|i|u|table|thead|tbody|tfoot|tr|td)>/g, "$& ")
      .replace(/<(div|p|h1|h2|h3|ul|li|span|section|article|footer|header|main|aside|strong|em|b|i|u|table|thead|tbody|tfoot|tr|td)>/g, " $&")
      .replace(/<b>/g, "").replace(/<\/b>/g, "")
      .replace(/<strong>/g, "").replace(/<\/strong>/g, "")
      .replace(/<i>/g, "").replace(/<\/i>/g, "")
      .replace(/<(div|p|h1|h2|h3|ul|li|section|article|footer|header|main|aside|table|thead|tbody|tfoot|tr|td)>/g, " ")
      .replace(/<([a-zA-Z0-9]+)([^>]*)>/g, (match, tagName, attributes) => {
        return `<${tagName} style="font-size: 12px;${attributes}">`;
      });
  };

  const contentWithSpaces = article.content
    ? addSpaceBetweenTags(article.content)
    : "No content yet";


  return (
    <Link href={`/article/${article.id}`} passHref>
      <Card className="group w-full h-full backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0" />
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 z-20">
              <Badge className="transition-colors">
                New
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-sm mb-4">
            <div className="flex items-center gap-1.5">
              <User size={14} className="" />
              <span>{article.author}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1.5">
              <CalendarDays size={14} className="" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <CardTitle className="text-xl font-bold leading-tight mb-3 transition-colors line-clamp-3">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            <div className="prose prose-sm">
              <div dangerouslySetInnerHTML={{ __html: contentWithSpaces }} />
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex flex-wrap gap-2 mt-auto">
            {article.categories.map((category) => (
              <Badge
                key={category.id}
                variant="secondary"
                className="transition-colors"
              >
                {category.name}
              </Badge>
            ))}
          </div>
          <ArrowUpRight className="ml-auto transition-colors" />
        </CardFooter>
      </Card>
    </Link>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="w-full backdrop-blur-sm border-none shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="p-0">
          <Skeleton className="aspect-video w-full" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-7 w-4/5 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardFooter>
      </Card>
    ))}
  </div>
);

export default function Article() {
  const { data: aData, isLoading: aLoading } = useQuery<ArticleSchema[]>({
    queryKey: ['article'],
    queryFn: async () => {
      const res = await fetch('/api/articles');
      return res.json();
    },
  });

  const publishedArticles = aData && aData?.length > 0 && aData?.filter(article => article.published) || [];

  return (
    <section className="relative py-16 mb-32" id="articles">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">Latest Articles</h2>
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            {publishedArticles.length} articles found
          </Badge>
        </div>
        {aLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="overflow-x-auto w-full">
            <div className="flex gap-8">
              {publishedArticles.map((article: ArticleSchema) => (
                <div key={article.id} className="min-w-[calc(33.33%-1rem)]">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
