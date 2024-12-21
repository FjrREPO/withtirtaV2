"use client";

import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { MediaType } from '@prisma/client';
import CategoriesSection from './CategoriesSection';
import MediaSection from './MediaSection';

interface Category {
  id: string;
  name: string;
  drivePath: string;
  mediaItems: MediaItem[];
}

interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  filePath: string;
  categoryId: string;
  category: Category;
}

export default function MediaManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  
  const refreshData = async () => {
    const [categoriesRes, mediaRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/media')
    ]);
    
    const [categoriesData, mediaData] = await Promise.all([
      categoriesRes.json(),
      mediaRes.json()
    ]);
    
    setCategories(categoriesData);
    setMediaItems(mediaData);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Card className="p-6">
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="media">Media Items</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories">
          <CategoriesSection
            categories={categories}
            onDataChange={refreshData}
          />
        </TabsContent>
        
        <TabsContent value="media">
          <MediaSection
            mediaItems={mediaItems || []}
            categories={categories}
            onDataChange={refreshData}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}