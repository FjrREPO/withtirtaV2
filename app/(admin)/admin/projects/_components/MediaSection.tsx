import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MediaType } from "@prisma/client";
import { toast } from 'sonner';
import FileUpload from '@/components/upload/file-upload';
import { Pencil, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  drivePath: string;
}

interface MediaItem {
  id: string;
  name: string;
  type: MediaType;
  filePath: string;
  categoryId: string;
  category: Category;
}

interface MediaSectionProps {
  mediaItems: MediaItem[];
  categories: Category[];
  onDataChange: () => Promise<void>;
}

export default function MediaSection({ mediaItems, categories, onDataChange }: MediaSectionProps) {
  const [newMediaItem, setNewMediaItem] = useState<{
    name: string;
    type: MediaType;
    filePath: string;
    categoryId: string;
  }>({
    name: "",
    type: MediaType.PHOTO,
    filePath: "",
    categoryId: "",
  });

  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const addMediaItem = async () => {
    try {
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMediaItem),
      });
      setNewMediaItem({
        name: "",
        type: MediaType.PHOTO,
        filePath: "",
        categoryId: "",
      });
      toast.success('Media item added successfully');
      onDataChange();
    } catch (error) {
      toast.error('Failed to add media item');
    }
  };

  const updateMediaItem = async () => {
    if (!editingItem) return;

    try {
      await fetch(`/api/media/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      toast.success('Media item updated successfully');
      setEditingItem(null);
      setIsEditDialogOpen(false);
      onDataChange();
    } catch (error) {
      toast.error('Failed to update media item');
    }
  };

  const deleteMediaItem = async (id: string) => {
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      toast.success('Media item deleted successfully');
      onDataChange();
    } catch (error) {
      toast.error('Failed to delete media item');
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Input
          value={newMediaItem.name}
          onChange={(e) => setNewMediaItem({ ...newMediaItem, name: e.target.value })}
          placeholder="Media name"
        />
        <Select
          onValueChange={(value) => setNewMediaItem({ ...newMediaItem, type: value as MediaType })}
          defaultValue={MediaType.PHOTO}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MediaType.PHOTO}>Photo</SelectItem>
            <SelectItem value={MediaType.VIDEO}>Video</SelectItem>
          </SelectContent>
        </Select>
        <FileUpload
          value={newMediaItem.filePath}
          onChange={(url) => setNewMediaItem({ ...newMediaItem, filePath: url })}
          accept={newMediaItem.type === MediaType.PHOTO ? "image/*" : "video/*"}
        />
        <Select
          onValueChange={(value) => setNewMediaItem({ ...newMediaItem, categoryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories && categories.length > 0 && categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addMediaItem}>Add Media Item</Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Media Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <Input
                value={editingItem.name}
                onChange={(e) => setEditingItem({
                  ...editingItem,
                  name: e.target.value
                })}
                placeholder="Media name"
              />
              <Select
                value={editingItem.type}
                onValueChange={(value) => setEditingItem({
                  ...editingItem,
                  type: value as MediaType
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={MediaType.PHOTO}>Photo</SelectItem>
                  <SelectItem value={MediaType.VIDEO}>Video</SelectItem>
                </SelectContent>
              </Select>
              <FileUpload
                value={editingItem.filePath}
                onChange={(url) => setEditingItem({
                  ...editingItem,
                  filePath: url
                })}
                accept={editingItem.type === MediaType.PHOTO ? "image/*" : "video/*"}
              />
              <Select
                value={editingItem.categoryId}
                onValueChange={(value) => setEditingItem({
                  ...editingItem,
                  categoryId: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories && categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateMediaItem}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>File Path</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mediaItems && mediaItems.length > 0 && mediaItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>
                <Link href={item.filePath} target='_blank' className="flex flex-row gap-2 items-center">
                  <Image
                    src={item.filePath}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="aspect-square object-cover rounded-2xl"
                  />
                  <p className="break-all max-w-[250px] md:block hidden">{item.filePath}</p>
                </Link>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(item)}
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
                      <AlertDialogTitle>Delete Media Item</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      Are you sure you want to delete this media item?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteMediaItem(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}