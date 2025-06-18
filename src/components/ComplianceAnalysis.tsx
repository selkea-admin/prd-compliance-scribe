
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Search, FileText, Shield, AlertTriangle } from 'lucide-react';

interface ComplianceAnalysisProps {
  documentName: string;
  isAnalyzing: boolean;
}

const analysisSteps = [
  { id: 1, name: 'Document Processing', description: 'Extracting and parsing document content', icon: FileText },
  { id: 2, name: 'Regulation Mapping', description: 'Identifying applicable banking regulations', icon: Search },
  { id: 3, name: 'Compliance Assessment', description: 'Analyzing compliance requirements', icon: Shield },
  { id: 4, name: 'Risk Evaluation', description: 'Evaluating potential compliance risks', icon: AlertTriangle },
  { id: 5, name: 'Report Generation', description: 'Generating comprehensive analysis report', icon: CheckCircle }
];

const ComplianceAnalysis: React.FC<ComplianceAnalysisProps> = ({ documentName, isAnalyzing }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update completed steps based on progress
        const stepProgress = Math.floor(newProgress / 20);
        if (stepProgress > currentStep && stepProgress <= 5) {
          setCurrentStep(stepProgress);
          setCompletedSteps(prev => [...prev, stepProgress - 1]);
        }

        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isAnalyzing, currentStep]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Analyzing Document: {documentName}
          </CardTitle>
          <div className="mt-4">
            <Progress value={progress} className="w-full h-3" />
            <p className="text-sm text-gray-600 mt-2">{progress.toFixed(0)}% Complete</p>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            {analysisSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index + 1;
              const IconComponent = step.icon;
              
              return (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-100 text-green-600' :
                    isCurrent ? 'bg-blue-100 text-blue-600 animate-pulse' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-lg font-medium ${
                        isCompleted ? 'text-green-900' :
                        isCurrent ? 'text-blue-900' :
                        'text-gray-500'
                      }`}>
                        {step.name}
                      </h3>
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      isCompleted ? 'text-green-700' :
                      isCurrent ? 'text-blue-700' :
                      'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Analysis Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Document Type:</span>
                <span className="ml-2 font-medium">Product Requirements Document</span>
              </div>
              <div>
                <span className="text-blue-700">Regulatory Framework:</span>
                <span className="ml-2 font-medium">RBI Banking Regulations</span>
              </div>
              <div>
                <span className="text-blue-700">Analysis Engine:</span>
                <span className="ml-2 font-medium">AI-Powered Compliance Engine v2.1</span>
              </div>
              <div>
                <span className="text-blue-700">Expected Duration:</span>
                <span className="ml-2 font-medium">2-3 minutes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAnalysis;
