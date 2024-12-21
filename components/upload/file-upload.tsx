import React, { useCallback, useRef } from "react";
import Compressor from "compressorjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onChange: (value: string) => void;
  value: string;
  accept?: string;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  accept = "image/*,video/*",
  maxSize = 10
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(
    (file: File): Promise<File> => {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.8,
          success: (compressedFile) => resolve(compressedFile as File),
          error: (err) => reject(err),
        });
      });
    },
    []
  );

  const uploadFileToCloudinary = useCallback(async (file: File) => {
    try {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > maxSize) {
        toast.error(`File size must be less than ${maxSize}MB`);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'z6euuqyl');

      toast.loading('Uploading file...');

      const response = await fetch('https://api.cloudinary.com/v1_1/dv3z889zh/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.secure_url);
        toast.success('File uploaded successfully');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to upload file');
      }
    } catch (error) {
      toast.error('Error uploading file');
      console.error('Error uploading file:', error);
    }
  }, [onChange, maxSize]);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          try {
            const compressedFile = await compressImage(file);
            uploadFileToCloudinary(compressedFile);
          } catch (error) {
            toast.error("Error compressing image");
            console.error("Compression error:", error);
          }
        } else {
          uploadFileToCloudinary(file);
        }
      }
    },
    [compressImage, uploadFileToCloudinary]
  );

  return (
    <div className="space-y-4 w-full">
      <div
        className={`
          relative 
          cursor-pointer 
          hover:opacity-70 
          transition 
          border-2 
          border-dashed 
          border-neutral-300 
          rounded-lg
          ${value ? 'p-4' : 'p-8'}
          flex 
          flex-col 
          justify-center 
          items-center 
          gap-4 
          text-neutral-600
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        {value ? (
          <div className="w-full">
            {value.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <img
                src={value}
                alt="Uploaded file"
                className="w-full h-48 object-cover rounded-md"
              />
            ) : value.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={value}
                controls
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 bg-neutral-100 rounded-md flex items-center justify-center">
                File uploaded
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-neutral-500" />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            <div className="text-sm text-neutral-500">
              Maximum file size: {maxSize}MB
            </div>
          </div>
        )}
      </div>

      {value && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onChange('')}
        >
          Remove file
        </Button>
      )}
    </div>
  );
};

export default FileUpload;