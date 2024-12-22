"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import CategoriesSection from './CategoriesSection';
import MediaSection from './MediaSection';
import { useQuery } from '@tanstack/react-query';
import { getProjectCategories, getProjectMedias } from '@/lib/api';
import { CategorySchema, MediaItemSchema } from '@/lib/validation/types';

export default function MediaManagement() {
  const { data: cData, isLoading: cLoading, refetch: cRefetch } = useQuery<CategorySchema[]>({
    queryKey: ['categories'],
    queryFn: () => getProjectCategories()
  });

  const { data: mData, isLoading: mediaItemsLoading } = useQuery<MediaItemSchema[]>({
    queryKey: ['media'],
    queryFn: () => getProjectMedias()
  });

  const isLoading = cLoading || mediaItemsLoading;

  return (
    <Card className="p-6">
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="media">Media Items</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <CategoriesSection
            categories={cData || []}
            onDataChange={cRefetch}
            isLoading={cLoading}
          />
        </TabsContent>

        <TabsContent value="media">
          <MediaSection
            mediaItems={mData || []}
            categories={cData || []}
            onDataChange={cRefetch}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}