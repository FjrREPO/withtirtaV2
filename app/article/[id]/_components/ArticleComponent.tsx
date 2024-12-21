"use client";

import SkeletonWrapper from "@/components/loader/skeleton-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getArticle, getCategories } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
};

export default function ArticleComponent({ id }: Props) {
  const { data: article, isLoading } = useQuery({
    queryKey: ["article"],
    queryFn: () => getArticle(id),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const filteredCategories = article?.categoryIds?.map((categoryId: string) => {
    return categories?.find((c: ArticleCategory) => c.id === categoryId);
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <Link href="/">
        <Button variant="secondary" className="text-sm">
          Back to Home
        </Button>
      </Link>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted shadow-lg">
        <SkeletonWrapper isLoading={isLoading}>
          {article?.thumbnail ? (
            <img
              src={article.thumbnail}
              alt={article.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No thumbnail selected
            </div>
          )}
        </SkeletonWrapper>
      </div>

      <div className="space-y-4">
        <SkeletonWrapper isLoading={isLoading}>
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            {article?.title || "Untitled Article"}
          </h1>
        </SkeletonWrapper>

        <SkeletonWrapper isLoading={isLoading}>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>By {article?.author || "Unknown Author"}</span>
            <span>•</span>
            <span>{format(new Date(), "MMMM d, yyyy")}</span>
          </div>
        </SkeletonWrapper>

        <SkeletonWrapper isLoading={isLoading}>
          <div className="flex flex-wrap gap-2">
            {filteredCategories?.map((category: ArticleCategory) => (
              <Badge key={category.id} variant="secondary" className="text-sm">
                {category.name}
              </Badge>
            ))}
          </div>
        </SkeletonWrapper>

        <SkeletonWrapper isLoading={isLoading}>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4 shadow-sm bg-white">
            <div className="prose prose-sm text-gray-800">
              {article?.content || "No content yet"}
            </div>
          </ScrollArea>
        </SkeletonWrapper>
      </div>
    </div>
  );
}
