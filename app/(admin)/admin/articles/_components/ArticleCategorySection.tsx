import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from 'lucide-react';
import { ArticleCategorySchema } from '@/lib/validation/types';

interface ArticleCategorySectionProps {
  categories: ArticleCategorySchema[];
  onDataChange: () => void;
}

export default function ArticleCategorySection({ categories, onDataChange }: ArticleCategorySectionProps) {
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState<ArticleCategorySchema | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<ArticleCategorySchema | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/article-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      setNewCategory('');
      onDataChange();
    } catch (err) {
      setError('Failed to create category. Please try again.');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!editCategory) return;

    try {
      const response = await fetch(`/api/article-category/${editCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editCategory.name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      setIsEditDialogOpen(false);
      setEditCategory(null);
      onDataChange();
    } catch (err) {
      setError('Failed to update category. Please try again.');
    }
  };

  const handleDelete = async () => {
    setError(null);

    if (!deleteCategory) return;

    try {
      const response = await fetch(`/api/article-category/${deleteCategory.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setIsDeleteDialogOpen(false);
      setDeleteCategory(null);
      onDataChange();
    } catch (err) {
      setError('Failed to delete category. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button type="submit" disabled={newCategory === ""}>Add Category</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Article Count</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.articles?.length}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditCategory(category);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setDeleteCategory(category);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="space-y-4">
              <Input
                value={editCategory?.name || ''}
                onChange={(e) => setEditCategory(prev =>
                  prev ? { ...prev, name: e.target.value } : null
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteCategory?.name}"? This action cannot be undone.
              {deleteCategory?.articles?.length ? (
                <p className="mt-2 text-red-500">
                  Warning: This category contains {deleteCategory.articles.length} articles.
                </p>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}