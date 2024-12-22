"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createArticle, updateArticle, getCategories } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/upload/file-upload";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ArticleCategorySchema, ArticleSchema } from "@/lib/validation/types";
import { useState } from "react";
import { FroalaEditor } from "@/components/editor/froala-editor";

interface ArticleFormProps {
  articleId?: string;
  initialData?: ArticleSchema;
}

export function ArticleForm({ articleId, initialData }: ArticleFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("edit");

  const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } =
    useForm<ArticleFormData>({
      defaultValues: initialData ? {
        title: initialData.title,
        content: initialData.content,
        author: initialData.author,
        thumbnail: initialData.thumbnail,
        published: initialData.published,
        categoryIds: initialData.categories.map(c => c.id)
      } : {
        published: false,
        categoryIds: []
      }
    });

  const { data: categories } = useQuery<ArticleCategorySchema[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: (data: ArticleFormData) =>
      articleId ? updateArticle(articleId, data) : createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success(`Article ${articleId ? "updated" : "created"} successfully`);
      setTimeout(() => router.push("/admin/articles"), 2000);
    },
    onError: (error) => {
      toast.error("Failed to save article. Please try again.");
    },
  });

  const watchedValues = watch();
  const isPublished = watch("published");

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
          {watchedValues.thumbnail ? (
            <img
              src={watchedValues.thumbnail}
              alt={watchedValues.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No thumbnail selected
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{watchedValues.title || "Untitled Article"}</h1>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>By {watchedValues.author || "Unknown Author"}</span>
            <span>•</span>
            <span>{format(new Date(), "MMMM d, yyyy")}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {watchedValues.categoryIds.map((categoryId) => {
              const category = categories?.find((c: ArticleCategorySchema) => c.id === categoryId);
              return category ? (
                <Badge key={categoryId} variant="secondary">
                  {category.name}
                </Badge>
              ) : null;
            })}
          </div>

          <div className="prose prose-sm"
            dangerouslySetInnerHTML={{ __html: watchedValues.content || "No content yet" }}>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-5xl py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>
                {articleId ? "Edit Article" : "Create New Article"}
              </CardTitle>
              <CardDescription>
                {articleId
                  ? `Last updated ${initialData ? format(new Date(initialData.updatedAt), "MMM d, yyyy 'at' h:mm a") : ""}`
                  : "Create a new article for your blog"}
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant={isPublished ? "default" : "secondary"}>
                    {isPublished ? "Published" : "Draft"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {isPublished
                    ? "This article is visible to readers"
                    : "This article is only visible to editors"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardContent>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
              <TabsContent value="edit" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      {...register("title", { required: "Title is required" })}
                      className={cn(errors.title && "border-red-500")}
                      placeholder="Enter article title..."
                    />
                    {errors.title && (
                      <span className="text-sm text-red-500">
                        {errors.title.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      {...register("author", { required: "Author is required" })}
                      className={cn(errors.author && "border-red-500")}
                      placeholder="Article author..."
                    />
                    {errors.author && (
                      <span className="text-sm text-red-500">
                        {errors.author.message}
                      </span>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <FroalaEditor
                        value={watch("content")}
                        onChange={(value) => setValue("content", value)}
                        error={!!errors.content}
                      />
                      {errors.content && (
                        <span className="text-sm text-red-500">
                          {errors.content.message}
                        </span>
                      )}
                    </div>

                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <FileUpload
                      value={watch("thumbnail")}
                      onChange={(url) => setValue("thumbnail", url)}
                      accept="image/*"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Categories</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                      {categories?.map((category: ArticleCategorySchema) => {
                        const isChecked = watchedValues.categoryIds.includes(category.id);

                        return (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const updatedCategoryIds = checked
                                  ? [...watchedValues.categoryIds, category.id]
                                  : watchedValues.categoryIds.filter((id) => id !== category.id);
                                setValue('categoryIds', updatedCategoryIds);
                              }}
                            />
                            <Label htmlFor={`category-${category.id}`} className="text-sm font-medium">
                              {category.name}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={watch("published")}
                        onCheckedChange={(checked) =>
                          setValue("published", checked)
                        }
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>

                    {isDirty && (
                      <Alert className="max-w-xs">
                        <AlertDescription>
                          You have unsaved changes
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview">
                {renderPreview()}
              </TabsContent>

              <CardFooter className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/articles")}
                >
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending
                      ? "Saving..."
                      : articleId
                        ? "Update Article"
                        : "Create Article"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}