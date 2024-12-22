"use client";

import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";

// Import styles only on client side
const FroalaStyles = dynamic(
  () => import('./froala-styles'),
  { ssr: false }
);

// Dynamically import Froala Editor
const FroalaEditorComponent = dynamic(
  () => import('react-froala-wysiwyg'),
  { 
    ssr: false,
    loading: () => <div className="min-h-[300px] animate-pulse bg-gray-100 rounded-md" />
  }
);

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  readOnly?: boolean;
  toolbarDisabled?: boolean;
}

interface EditorConfig {
  placeholderText: string;
  heightMin: number;
  heightMax?: number;
  fontSize: string[];
  fontSizeSelection: boolean;
  fontSizeDefaultSelection: string;
  fontFamily: {
    defaultFont: string;
    fonts: {
      [key: string]: string;
    };
  };
  toolbarButtons: {
    [key: string]: {
      buttons: string[];
      buttonsVisible?: number;
      align?: string;
    };
  };
  paragraphFormat: {
    N: string;
    [key: string]: string;
  };
  lineHeights: {
    [key: string]: string;
  };
  attribution: boolean;
  imageUploadURL: string;
  imageUploadParams: {
    type: string;
  };
  events: {
    [key: string]: (response: any) => any;
  };
  pluginsEnabled: string[];
  language?: string;
  htmlDoNotWrapTags: string[];
  htmlAllowedTags: string[];
  pastePlain: boolean;
  tabSpaces: number;
  toolbarSticky: boolean;
  toolbarStickyOffset: number;
  requestHeaders: {
    [key: string]: string;
  };
}

export function FroalaEditor({
  value,
  onChange,
  error,
  className,
  placeholder = 'Write your content here...',
  minHeight = 300,
  maxHeight,
  readOnly = false,
  toolbarDisabled = false,
}: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const config: EditorConfig = useMemo(() => ({
    placeholderText: placeholder,
    heightMin: minHeight,
    heightMax: maxHeight,
    // Updated font size configuration
    fontSize: [
      '8',
      '10',
      '12',
      '14',
      '16',
      '18',
      '20',
      '24',
      '30',
      '36',
      '48',
      '60',
      '72',
      '96'
    ],
    fontSizeSelection: true,
    fontSizeDefaultSelection: '16',
    fontFamily: {
      defaultFont: 'Inter',
      fonts: {
        'Inter': 'Inter, sans-serif',
        'Arial': 'Arial, sans-serif',
        'Courier New': 'Courier New, monospace',
        'Georgia': 'Georgia, serif',
        'Times New Roman': 'Times New Roman, serif',
        'Verdana': 'Verdana, sans-serif',
      }
    },
    toolbarButtons: {
      'moreText': {
        buttons: [
          'bold', 
          'italic', 
          'underline', 
          'strikeThrough', 
          'subscript', 
          'superscript',
          'fontFamily',
          'fontSize', 
          'textColor',
          'backgroundColor',
          'clearFormatting'
        ],
        buttonsVisible: 8
      },
      'moreParagraph': {
        buttons: [
          'alignLeft',
          'alignCenter',
          'alignRight',
          'alignJustify',
          'formatOL',
          'formatUL',
          'paragraphFormat',
          'lineHeight',
          'outdent',
          'indent',
          'quote'
        ],
        buttonsVisible: 8
      },
      'moreRich': {
        buttons: [
          'insertLink',
          'insertImage',
          'insertVideo',
          'insertTable',
          'emoticons',
          'specialCharacters',
          'insertHR'
        ],
        buttonsVisible: 8
      },
      'moreMisc': {
        buttons: ['undo', 'redo', 'fullscreen', 'selectAll', 'html'],
        align: 'right',
        buttonsVisible: 2
      }
    },
    paragraphFormat: {
      N: 'Normal',
      H1: 'Heading 1',
      H2: 'Heading 2',
      H3: 'Heading 3',
      H4: 'Heading 4',
      PRE: 'Code'
    },
    lineHeights: {
      '1': '1',
      '1.15': '1.15',
      '1.5': '1.5',
      '2': '2'
    },
    attribution: false,
    imageUploadURL: '/api/upload',
    imageUploadParams: {
      type: 'images'
    },
    events: {
      'image.uploaded': function (response: any) {
        return response.link;
      },
      'image.error': function (error: any) {
        console.error('Image upload error:', error);
      }
    },
    pluginsEnabled: [
      'fontSize',
      'fontFamily',
      'colors',
      'paragraphFormat',
      'lineHeight',
      'quote',
      'link',
      'lists',
      'file',
      'image',
      'video',
      'table',
      'codeView',
      'specialCharacters',
      'emoticons'
    ],
    language: 'en',
    htmlDoNotWrapTags: ['script', 'style', 'pre'],
    htmlAllowedTags: ['.*'],
    pastePlain: false,
    tabSpaces: 2,
    toolbarSticky: true,
    toolbarStickyOffset: 0,
    requestHeaders: {
      'Accept': 'application/json'
    }
  }), [placeholder, minHeight, maxHeight]);

  const handleModelChange = (model: string) => {
    onChange(model);
  };

  if (!isMounted) {
    return (
      <div 
        className={cn(
          "min-h-[300px] animate-pulse bg-gray-100 rounded-md",
          className
        )}
      />
    );
  }

  return (
    <>
      <FroalaStyles />
      <div 
        className={cn(
          "relative border rounded-md overflow-hidden",
          error && "border-red-500",
          readOnly && "opacity-70 pointer-events-none",
          className
        )}
      >
        <FroalaEditorComponent
          model={value}
          onModelChange={handleModelChange}
          config={{
            ...config,
            editable: !readOnly,
            toolbarButtons: toolbarDisabled ? [] : config.toolbarButtons,
          }}
        />
      </div>
    </>
  );
}