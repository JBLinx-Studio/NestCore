
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign, PieChart, Target } from "lucide-react";
import { toast } from "sonner";

export const AdvancedCalculators = () => {
  const [roiInputs, setROIInputs] = useState({
    purchasePrice: 750000,
    monthlyRent: 8500,
    monthlyExpenses: 2800,
    downPayment: 150000,
    loanAmount: 600000,
    interestRate: 7.5,
    loanTerm: 20
  });

  const [capRateInputs, setCapRateInputs] = useState({
    annualIncome: 102000,
    annualExpenses: 33600,
    propertyValue: 750000
  });

  const [cashFlowInputs, setCashFlowInputs] = useState({
    monthlyRent: 8500,
    monthlyMortgage: 4850,
    monthlyMaintenance: 850,
    monthlyInsurance: 420,
    monthlyTaxes: 750,
    monthlyManagement: 680,
    vacancy: 5
  });

  const calculateROI = () => {
    const { purchasePrice, monthlyRent, monthlyExpenses, downPayment, loanAmount, interestRate, loanTerm } = roiInputs;
    
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgage = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    const netMonthlyIncome = monthlyRent - monthlyExpenses - monthlyMortgage;
    const annualCashFlow = netMonthlyIncome * 12;
    const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
    const totalROI = (annualCashFlow / purchasePrice) * 100;

    return {
      monthlyMortgage: monthlyMortgage.toFixed(2),
      netMonthlyIncome: netMonthlyIncome.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2),
      cashOnCashReturn: cashOnCashReturn.toFixed(2),
      totalROI: totalROI.toFixed(2)
    };
  };

  const calculateCapRate = () => {
    const { annualIncome, annualExpenses, propertyValue } = capRateInputs;
    const noi = annualIncome - annualExpenses;
    const capRate = (noi / propertyValue) * 100;
    
    return {
      noi: noi.toFixed(2),
      capRate: capRate.toFixed(2)
    };
  };

  const calculateCashFlow = () => {
    const { monthlyRent, monthlyMortgage, monthlyMaintenance, monthlyInsurance, monthlyTaxes, monthlyManagement, vacancy } = cashFlowInputs;
    
    const vacancyLoss = (monthlyRent * vacancy) / 100;
    const effectiveIncome = monthlyRent - vacancyLoss;
    const totalExpenses = monthlyMortgage + monthlyMaintenance + monthlyInsurance + monthlyTaxes + monthlyManagement;
    const netCashFlow = effectiveIncome - totalExpenses;
    const annualCashFlow = netCashFlow * 12;

    return {
      vacancyLoss: vacancyLoss.toFixed(2),
      effectiveIncome: effectiveIncome.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      netCashFlow: netCashFlow.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2)
    };
  };

  const roi = calculateROI();
  const capRate = calculateCapRate();
  const cashFlow = calculateCashFlow();

  return (
    <div className="space-y-6">
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            <span>Advanced Financial Calculators</span>
          </CardTitle>
          <CardDescription>Sophisticated real estate investment analysis tools</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roi" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
              <TabsTrigger value="caprate">Cap Rate</TabsTrigger>
              <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            </TabsList>

            <TabsContent value="roi" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Investment Parameters</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="purchase-price">Purchase Price (R)</Label>
                      <Input
                        id="purchase-price"
                        type="number"
                        value={roiInputs.purchasePrice}
                        onChange={(e) => setROIInputs({...roiInputs, purchasePrice: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="down-payment">Down Payment (R)</Label>
                      <Input
                        id="down-payment"
                        type="number"
                        value={roiInputs.downPayment}
                        onChange={(e) => setROIInputs({...roiInputs, downPayment: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loan-amount">Loan Amount (R)</Label>
                      <Input
                        id="loan-amount"
                        type="number"
                        value={roiInputs.loanAmount}
                        onChange={(e) => setROIInputs({...roiInputs, loanAmount: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        step="0.1"
                        value={roiInputs.interestRate}
                        onChange={(e) => setROIInputs({...roiInputs, interestRate: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loan-term">Loan Term (years)</Label>
                      <Input
                        id="loan-term"
                        type="number"
                        value={roiInputs.loanTerm}
                        onChange={(e) => setROIInputs({...roiInputs, loanTerm: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-rent">Monthly Rent (R)</Label>
                      <Input
                        id="monthly-rent"
                        type="number"
                        value={roiInputs.monthlyRent}
                        onChange={(e) => setROIInputs({...roiInputs, monthlyRent: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-expenses">Monthly Expenses (R)</Label>
                      <Input
                        id="monthly-expenses"
                        type="number"
                        value={roiInputs.monthlyExpenses}
                        onChange={(e) => setROIInputs({...roiInputs, monthlyExpenses: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">ROI Analysis Results</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">Monthly Mortgage Payment</span>
                        <span className="text-blue-900 font-bold">R {roi.monthlyMortgage}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 font-medium">Net Monthly Income</span>
                        <span className="text-green-900 font-bold">R {roi.netMonthlyIncome}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-700 font-medium">Annual Cash Flow</span>
                        <span className="text-purple-900 font-bold">R {roi.annualCashFlow}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between">
                        <span className="text-orange-700 font-medium">Cash-on-Cash Return</span>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                          {roi.cashOnCashReturn}%
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-700 font-medium">Total ROI</span>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                          {roi.totalROI}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="caprate" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Property Income & Expenses</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="annual-income">Annual Rental Income (R)</Label>
                      <Input
                        id="annual-income"
                        type="number"
                        value={capRateInputs.annualIncome}
                        onChange={(e) => setCapRateInputs({...capRateInputs, annualIncome: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="annual-expenses">Annual Operating Expenses (R)</Label>
                      <Input
                        id="annual-expenses"
                        type="number"
                        value={capRateInputs.annualExpenses}
                        onChange={(e) => setCapRateInputs({...capRateInputs, annualExpenses: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="property-value">Property Value (R)</Label>
                      <Input
                        id="property-value"
                        type="number"
                        value={capRateInputs.propertyValue}
                        onChange={(e) => setCapRateInputs({...capRateInputs, propertyValue: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Cap Rate Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-900 mb-2">R {capRate.noi}</div>
                        <div className="text-blue-700 font-medium">Net Operating Income (NOI)</div>
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-900 mb-2">{capRate.capRate}%</div>
                        <div className="text-green-700 font-medium">Capitalization Rate</div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Cap Rate Interpretation:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• 4-6%: Premium properties, lower risk</div>
                        <div>• 6-8%: Good investment properties</div>
                        <div>• 8-10%: Higher yield, moderate risk</div>
                        <div>• 10%+: High yield, higher risk</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cashflow" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Monthly Income & Expenses</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cf-monthly-rent">Monthly Rent (R)</Label>
                      <Input
                        id="cf-monthly-rent"
                        type="number"
                        value={cashFlowInputs.monthlyRent}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, monthlyRent: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vacancy-rate">Vacancy Rate (%)</Label>
                      <Input
                        id="vacancy-rate"
                        type="number"
                        value={cashFlowInputs.vacancy}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, vacancy: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cf-mortgage">Monthly Mortgage (R)</Label>
                      <Input
                        id="cf-mortgage"
                        type="number"
                        value={cashFlowInputs.monthlyMortgage}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, monthlyMortgage: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cf-maintenance">Monthly Maintenance (R)</Label>
                      <Input
                        id="cf-maintenance"
                        type="number"
                        value={cashFlowInputs.monthlyMaintenance}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, monthlyMaintenance: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cf-insurance">Monthly Insurance (R)</Label>
                      <Input
                        id="cf-insurance"
                        type="number"
                        value={cashFlowInputs.monthlyInsurance}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, monthlyInsurance: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cf-taxes">Monthly Taxes (R)</Label>
                      <Input
                        id="cf-taxes"
                        type="number"
                        value={cashFlowInputs.monthlyTaxes}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, monthlyTaxes: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cf-management">Monthly Management (R)</Label>
                      <Input
                        id="cf-management"
                        type="number"
                        value={cashFlowInputs.monthlyManagement}
                        onChange={(e) => setCashFlowInputs({...cashFlowInputs, monthlyManagement: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Cash Flow Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">Vacancy Loss</span>
                        <span className="text-blue-900 font-bold">-R {cashFlow.vacancyLoss}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 font-medium">Effective Income</span>
                        <span className="text-green-900 font-bold">R {cashFlow.effectiveIncome}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between">
                        <span className="text-red-700 font-medium">Total Expenses</span>
                        <span className="text-red-900 font-bold">-R {cashFlow.totalExpenses}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-700 font-medium">Monthly Cash Flow</span>
                        <Badge className={`${Number(cashFlow.netCashFlow) >= 0 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                          R {cashFlow.netCashFlow}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-700 font-medium">Annual Cash Flow</span>
                        <Badge className={`${Number(cashFlow.annualCashFlow) >= 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                          R {cashFlow.annualCashFlow}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
