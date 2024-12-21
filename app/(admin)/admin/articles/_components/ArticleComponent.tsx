"use client";

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ArticleCategorySchema } from '@/lib/validation/types';
import { ArticleList } from './ArticleList';
import ArticleCategorySection from './ArticleCategorySection';

export default function ArticleComponent() {
  const [categories, setCategories] = useState<ArticleCategorySchema[]>([]);

  const refreshData = async () => {
    const [categoriesRes] = await Promise.all([
      fetch('/api/article-category')
    ]);

    const [categoriesData] = await Promise.all([
      categoriesRes.json()
    ]);

    setCategories(categoriesData);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Card className="p-6">
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <ArticleCategorySection
            categories={categories}
            onDataChange={refreshData}
          />
        </TabsContent>
        <TabsContent value="articles">
          <ArticleList />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
