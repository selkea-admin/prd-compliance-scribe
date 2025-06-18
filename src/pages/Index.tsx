
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import DocumentUpload from '@/components/DocumentUpload';
import ComplianceAnalysis from '@/components/ComplianceAnalysis';
import AnalysisReport from '@/components/AnalysisReport';
import { toast } from 'sonner';

interface AnalysisResult {
  id: string;
  documentTitle: string;
  analysisDate: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  complianceScore: number;
  findings: any[];
  recommendations: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDocumentUpload = (file: File) => {
    setUploadedDocument(file);
    toast.success(`Document "${file.name}" uploaded successfully`);
  };

  const startAnalysis = async () => {
    if (!uploadedDocument) {
      toast.error('Please upload a document first');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep('analyzing');

    // Simulate analysis process
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        id: Date.now().toString(),
        documentTitle: uploadedDocument.name.replace('.pdf', ''),
        analysisDate: new Date().toLocaleDateString(),
        riskLevel: 'Moderate',
        complianceScore: 78,
        findings: [
          {
            area: 'KYC & Mobile Binding',
            finding: 'OTP-verified mobile and OVD collection at issuance',
            regulation: 'RBI PPI MD para 9.1 & 9.2; KYC MD (Feb 2016)',
            adequacy: 'Adequate',
            remediation: 'None'
          },
          {
            area: 'Issuance & Value Limits',
            finding: 'No explicit issuance cap set',
            regulation: 'RBI MD: ₹10k/month, ₹120k/year, ₹10k outstanding',
            adequacy: 'Partial',
            remediation: 'Flag >₹5k issuance and enforce caps'
          },
          {
            area: 'AML / SAR Requirements',
            finding: 'No SAR triggers defined',
            regulation: 'RBI AML Circular DBR.AML.BC.No.18 para 4.1',
            adequacy: 'Partial',
            remediation: 'Add abnormal issuance SAR logic'
          }
        ],
        recommendations: [
          'Implement issuance caps per RBI MD',
          'Integrate SAR trigger thresholds',
          'Enhance logging schema for flagged events',
          'Update PCOMP self-attestation'
        ]
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      setCurrentStep('results');
      toast.success('Compliance analysis completed');
    }, 3000);
  };

  const resetAnalysis = () => {
    setCurrentStep('upload');
    setUploadedDocument(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Compliance Analysis System</h1>
                <p className="text-sm text-gray-600">Banking Regulation & PRD Compliance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {['upload', 'analyzing', 'results'].map((step, index) => {
              const isActive = currentStep === step;
              const isCompleted = ['upload', 'analyzing', 'results'].indexOf(currentStep) > index;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-blue-600 bg-blue-600 text-white' :
                    isCompleted ? 'border-green-600 bg-green-600 text-white' :
                    'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 h-1 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        {currentStep === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Upload PRD Document
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Upload your Product Requirements Document (PRD) for comprehensive banking compliance analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DocumentUpload onDocumentUpload={handleDocumentUpload} />
                
                {uploadedDocument && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">{uploadedDocument.name}</p>
                          <p className="text-sm text-green-700">
                            Size: {(uploadedDocument.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button onClick={startAnalysis} className="bg-blue-600 hover:bg-blue-700">
                        Start Analysis
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <ComplianceAnalysis 
            documentName={uploadedDocument?.name || 'Document'} 
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentStep === 'results' && analysisResult && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
              <Button onClick={resetAnalysis} variant="outline">
                New Analysis
              </Button>
            </div>
            <AnalysisReport result={analysisResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
