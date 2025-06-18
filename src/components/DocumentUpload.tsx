
import React, { useCallback, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from 'lucide-react';

interface DocumentUploadProps {
  onDocumentUpload: (file: File) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onDocumentUpload(file);
    }
  }, [onDocumentUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onDocumentUpload(file);
    }
  }, [onDocumentUpload]);

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      <Card
        className={`border-2 border-dashed transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          {!selectedFile ? (
            <>
              <div className="mb-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload PRD Document
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your PRD file here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Supported formats: PDF, DOC, DOCX (Max size: 10MB)
              </p>
              <div className="space-y-2">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                  </label>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                onClick={removeFile}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Secure Upload</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Comprehensive Report</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
