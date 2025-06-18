
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, XCircle, Download, Clock, User, FileText } from 'lucide-react';

interface Finding {
  area: string;
  finding: string;
  regulation: string;
  adequacy: 'Adequate' | 'Partial' | 'Inadequate';
  remediation: string;
}

interface AnalysisResult {
  id: string;
  documentTitle: string;
  analysisDate: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  complianceScore: number;
  findings: Finding[];
  recommendations: string[];
}

interface AnalysisReportProps {
  result: AnalysisResult;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ result }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAdequacyIcon = (adequacy: string) => {
    switch (adequacy) {
      case 'Adequate': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Inadequate': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getAdequacyColor = (adequacy: string) => {
    switch (adequacy) {
      case 'Adequate': return 'text-green-600 bg-green-50';
      case 'Partial': return 'text-yellow-600 bg-yellow-50';
      case 'Inadequate': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Compliance Official's Analysis Report</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{result.complianceScore}%</div>
              <div className="text-sm text-gray-600">Compliance Score</div>
            </div>
            <div className="text-center">
              <Badge className={`text-sm px-3 py-1 ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel} Risk
              </Badge>
              <div className="text-sm text-gray-600 mt-1">Risk Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-1">{result.findings.length}</div>
              <div className="text-sm text-gray-600">Areas Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-1">{result.recommendations.length}</div>
              <div className="text-sm text-gray-600">Recommendations</div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Document Title:</span>
                <span>{result.documentTitle}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Reviewed By:</span>
                <span>[Name], AVP – Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Review Date:</span>
                <span>{result.analysisDate}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Department:</span>
                <span className="ml-2">Compliance & Risk</span>
              </div>
              <div>
                <span className="font-medium">Version:</span>
                <span className="ml-2">PRD v1.0</span>
              </div>
              <div>
                <span className="font-medium">Submission Type:</span>
                <span className="ml-2">Internal Sign-Off / NPCI PCOMP Attestation</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regulatory References */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">1. Regulatory References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>NPCI e‑RUPI Circular</strong> (e.g., NPCI/UPI/2021‑22/002) – OTP & beneficiary binding
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>RBI Master Direction on Prepaid Payment Instruments</strong> (Sept 2021)
              <br />Para 9.1 & 9.2 – Small‑PPI and Full‑KYC PPI limits & features
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>RBI KYC Master Direction</strong> – OTP verified mobile/OVD binding
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>RBI Cybersecurity Framework</strong> – Log retention ≥5 years
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <strong>RBI AML/CFT Master Circular</strong> DBR.AML.BC.No.18/2016‑17 – SAR & monitoring obligations
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Assessment */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">3. Compliance Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold">Area</th>
                  <th className="text-left py-3 px-2 font-semibold">Finding</th>
                  <th className="text-left py-3 px-2 font-semibold">Regulation</th>
                  <th className="text-left py-3 px-2 font-semibold">Adequacy</th>
                  <th className="text-left py-3 px-2 font-semibold">Remediation</th>
                </tr>
              </thead>
              <tbody>
                {result.findings.map((finding, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{finding.area}</td>
                    <td className="py-3 px-2">{finding.finding}</td>
                    <td className="py-3 px-2 text-blue-600">{finding.regulation}</td>
                    <td className="py-3 px-2">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md ${getAdequacyColor(finding.adequacy)}`}>
                        {getAdequacyIcon(finding.adequacy)}
                        <span className="font-medium">{finding.adequacy}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{finding.remediation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Summary */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">4. Residual Risk Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <span className="font-medium">Risk Level:</span>
              <Badge className={`ml-2 ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Commentary:</span>
              <ul className="mt-2 space-y-1 text-sm text-gray-700 ml-4">
                <li>• OTP and expiry controls reduce fraud risk</li>
                <li>• AML and threshold-setting need enhancement</li>
                <li>• Logging and grievance procedures are robust</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">5. Pre-Go‑Live Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-yellow-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sign-off */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">6. Compliance Sign‑Off</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              <div><strong>Reviewed By:</strong> [Name], AVP – Compliance</div>
              <div><strong>Date:</strong> {result.analysisDate}</div>
              <div><strong>Valid Until:</strong> FY25–26 Q1 PCOMP submission deadline</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-green-800 font-medium">✅ Approved for Pilot Launch</div>
                <div className="text-green-600 text-sm">(subject to action items)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline">
          Share Report
        </Button>
      </div>
    </div>
  );
};

export default AnalysisReport;
