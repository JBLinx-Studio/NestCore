
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
  Zap
} from "lucide-react";

export const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      content: "Hello! I'm your PropertyHub AI assistant. I can help you analyze your rental business, draft communications to tenants, generate reports, and provide insights. What would you like to know?",
      timestamp: new Date().toISOString()
    }
  ]);

  const quickActions = [
    {
      title: "Monthly Summary",
      description: "Get an AI analysis of this month's performance",
      icon: TrendingUp,
      prompt: "Analyze my property portfolio performance for this month"
    },
    {
      title: "Overdue Tenants",
      description: "Draft professional reminder messages",
      icon: AlertCircle,
      prompt: "Help me draft a polite but firm payment reminder for overdue tenants"
    },
    {
      title: "Lease Renewals",
      description: "Check upcoming renewals and draft proposals",
      icon: Calendar,
      prompt: "Show me which leases are expiring soon and help draft renewal offers"
    },
    {
      title: "Financial Insights",
      description: "Understand your revenue and expense trends",
      icon: DollarSign,
      prompt: "Explain my financial performance and suggest improvements"
    }
  ];

  const insights = [
    {
      type: "success",
      title: "Strong Performance",
      content: "Your portfolio occupancy rate of 85.7% is above the national average of 78% for similar properties.",
      priority: "high"
    },
    {
      type: "warning",
      title: "Payment Reminder Needed",
      content: "3 tenants have overdue payments totaling R3,200. Consider sending automated reminders.",
      priority: "high"
    },
    {
      type: "info",
      title: "Utility Optimization",
      content: "Property 'Garden View Flats' shows 15% higher electricity usage than similar units. Consider an energy audit.",
      priority: "medium"
    },
    {
      type: "tip",
      title: "Lease Strategy",
      content: "Market rates in your area have increased by 8%. Consider modest rent increases for upcoming renewals.",
      priority: "medium"
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const newUserMessage = {
      type: "user",
      content: message,
      timestamp: new Date().toISOString()
    };

    // Simulate AI response
    const aiResponse = {
      type: "ai",
      content: getAIResponse(message),
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, newUserMessage, aiResponse]);
    setMessage("");
  };

  const getAIResponse = (userMessage: string) => {
    // Simple response simulation - in real app this would call your AI API
    if (userMessage.toLowerCase().includes("performance") || userMessage.toLowerCase().includes("summary")) {
      return "Based on your current data, your property portfolio is performing well! Here's what I found:\n\n• Total Revenue: R24,500/month (↑8.2% from last month)\n• Occupancy Rate: 85.7% (above average)\n• Outstanding Payments: R3,200 from 3 tenants\n• Properties needing attention: Beachfront Residence (maintenance)\n\nRecommendations:\n1. Follow up on overdue payments with automated reminders\n2. Schedule maintenance for Beachfront Residence\n3. Consider rent review for Garden View Flats (market rates up 8%)";
    }
    
    if (userMessage.toLowerCase().includes("reminder") || userMessage.toLowerCase().includes("overdue")) {
      return "I'll help you draft a professional payment reminder. Here's a suggested message:\n\n---\n\n**Subject: Friendly Payment Reminder - [Property Name]**\n\nDear [Tenant Name],\n\nI hope this message finds you well. This is a friendly reminder that your rent payment of R[Amount] for [Month] is now overdue.\n\nWe understand that circumstances can sometimes make timely payments challenging. If you're experiencing difficulties, please reach out so we can discuss possible arrangements.\n\nPlease settle your account as soon as possible to avoid any late fees. You can make payment via [Payment Methods].\n\nThank you for your prompt attention to this matter.\n\nBest regards,\n[Your Name]\n\n---\n\nWould you like me to customize this for specific tenants?";
    }

    return "I understand you're asking about: " + userMessage + "\n\nI'm here to help with property management tasks like:\n• Analyzing financial performance\n• Drafting tenant communications\n• Tracking maintenance schedules\n• Utility bill analysis\n• Lease management insights\n\nCould you be more specific about what you'd like assistance with?";
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'info': return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'tip': return <Zap className="h-5 w-5 text-purple-600" />;
      default: return <MessageSquare className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'tip': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
        <p className="text-gray-600">Get intelligent insights and assistance for your property management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chat Messages */}
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Chat with PropertyHub AI</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm">{chat.content}</div>
                      <div className={`text-xs mt-1 ${
                        chat.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about your properties..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                      onClick={() => handleQuickAction(action.prompt)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-sm">{action.title}</div>
                          <div className="text-xs text-gray-600 mt-1">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <span>AI Insights</span>
              </CardTitle>
              <CardDescription>
                Smart recommendations for your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start space-x-2 mb-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{insight.title}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {insight.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{insight.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>Performance Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-blue-600" />
                <span>Tenant Communication</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>Financial Insights</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>Predictive Maintenance</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span>Utility Optimization</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
