import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  drivePath: string;
  mediaItems: any[];
}

interface CategoriesSectionProps {
  categories: Category[];
  onDataChange: () => Promise<void>;
}

export default function CategoriesSection({ categories, onDataChange }: CategoriesSectionProps) {
  const [newCategory, setNewCategory] = useState("");
  const [drivePath, setDrivePath] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const addCategory = async () => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory, drivePath: drivePath }),
      });
      toast.success('Category added successfully');
      setNewCategory("");
      setDrivePath("");
      onDataChange();
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const updateCategory = async (id: string, name: string) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      toast.success('Category updated successfully');
      setEditingCategory(null);
      onDataChange();
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      toast.success('Category deleted successfully');
      onDataChange();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
        />
        <Input
          value={drivePath}
          onChange={(e) => setDrivePath(e.target.value)}
          placeholder="Drive path"
        />
        <Button onClick={addCategory}>Add Category</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Media Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories && categories.length > 0 && categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                {editingCategory?.id === category.id ? (
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({
                      ...editingCategory,
                      name: e.target.value
                    })}
                  />
                ) : (
                  category.name
                )}
              </TableCell>
              <TableCell>{category.mediaItems.length}</TableCell>
              <TableCell className="flex gap-2">
                {editingCategory?.id === category.id ? (
                  <>
                    <Button onClick={() => updateCategory(category.id, editingCategory.name)}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditingCategory(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this category? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteCategory(category.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}