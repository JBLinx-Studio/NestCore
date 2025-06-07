
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  Mic, 
  Image, 
  FileText, 
  BarChart3,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Sparkles,
  Zap,
  Brain
} from "lucide-react";
import { toast } from "sonner";

export const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI property management assistant. I can help you with rent collection, maintenance scheduling, tenant screening, market analysis, and much more. What would you like to know?",
      timestamp: new Date(),
      suggestions: ["Show rent collection status", "Analyze property performance", "Schedule maintenance", "Market insights"]
    }
  ]);

  const quickActions = [
    {
      id: "rent-analysis",
      title: "Rent Collection Analysis",
      description: "Get insights on rent collection patterns",
      icon: BarChart3,
      color: "bg-blue-500"
    },
    {
      id: "maintenance-schedule",
      title: "Smart Maintenance Scheduling",
      description: "AI-powered maintenance optimization",
      icon: Zap,
      color: "bg-green-500"
    },
    {
      id: "market-insights",
      title: "Market Intelligence",
      description: "Real-time property market analysis",
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      id: "tenant-screening",
      title: "Tenant Risk Assessment",
      description: "AI-driven tenant evaluation",
      icon: Brain,
      color: "bg-orange-500"
    },
    {
      id: "financial-forecast",
      title: "Financial Forecasting",
      description: "Predict revenue and expenses",
      icon: Sparkles,
      color: "bg-pink-500"
    },
    {
      id: "document-analysis",
      title: "Document Intelligence",
      description: "Extract insights from documents",
      icon: FileText,
      color: "bg-indigo-500"
    }
  ];

  const generateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = "";
      let suggestions: string[] = [];
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes("rent") || lowerMessage.includes("collection")) {
        response = "📊 **Rent Collection Analysis**\n\nBased on your portfolio data:\n\n• **94.2% collection rate** this month (above industry average of 89%)\n• **3 tenants** have overdue payments totaling R12,450\n• **Recommended action**: Send automated reminders to Sarah Johnson, Michael Chen, and Lisa Park\n\n💡 **AI Insight**: Historical data shows that tenants who pay late in January have a 67% higher chance of late payments throughout the year. Consider offering payment plan options.";
        suggestions = ["Send payment reminders", "Set up payment plans", "Generate collection report", "Analyze payment patterns"];
      } else if (lowerMessage.includes("maintenance") || lowerMessage.includes("repair")) {
        response = "🔧 **Smart Maintenance Analysis**\n\n**Upcoming Priority Items:**\n• Ocean View Villa - Plumbing inspection (Due: Jan 15)\n• Sunset Apartments - HVAC maintenance (Due: Jan 20)\n• Green Gardens - Electrical safety check (Due: Jan 25)\n\n🤖 **AI Recommendation**: Schedule all maintenance during tenant work hours (9 AM - 5 PM) to minimize disruption. Predictive analysis suggests the HVAC system at Sunset Apartments may need replacement within 6 months.";
        suggestions = ["Schedule maintenance", "View maintenance history", "Predictive maintenance alerts", "Contractor recommendations"];
      } else if (lowerMessage.includes("market") || lowerMessage.includes("price") || lowerMessage.includes("value")) {
        response = "📈 **Market Intelligence Report**\n\n**Current Market Trends:**\n• Average rental prices in your areas: **+8.5% YoY**\n• Vacancy rates: **5.2%** (down from 6.8% last year)\n• Your portfolio performance: **+12.3% above market average**\n\n🎯 **Optimization Opportunities:**\n• Sunset Apartments: Consider 7% rent increase (market supports up to 10%)\n• Ocean View Villa: Prime for premium positioning (+15% potential)";
        suggestions = ["Rent adjustment recommendations", "Competitor analysis", "Property valuation", "Market forecast"];
      } else if (lowerMessage.includes("tenant") || lowerMessage.includes("screening")) {
        response = "👥 **Tenant Intelligence System**\n\n**Current Applications:**\n• **3 pending applications** for review\n• **AI Risk Scores**: 2 low-risk, 1 medium-risk\n\n🔍 **Smart Screening Insights:**\n• Michael Chen (Application #1247): **Low risk** - Excellent credit, stable employment, positive references\n• Sarah Williams (Application #1248): **Medium risk** - Good credit but recent job change\n\n💡 **Recommendation**: Prioritize Michael Chen's application for Sunset Apartments Unit 3B.";
        suggestions = ["Review applications", "Run background checks", "Contact references", "Generate screening reports"];
      } else {
        response = "🤖 I'm here to help with all aspects of property management! I can assist with:\n\n• **Financial Analysis** - Revenue optimization, expense tracking\n• **Maintenance Management** - Predictive maintenance, scheduling\n• **Tenant Relations** - Screening, communication, retention\n• **Market Intelligence** - Pricing strategies, market trends\n• **Legal Compliance** - Regulatory updates, document management\n\nWhat specific area would you like to explore?";
        suggestions = ["Analyze my portfolio", "Show financial dashboard", "Review tenant applications", "Market comparison"];
      }
      
      const aiMessage = {
        id: Date.now(),
        type: "ai",
        content: response,
        timestamp: new Date(),
        suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    generateAIResponse(message);
    setMessage("");
  };

  const handleQuickAction = (action: any) => {
    let actionMessage = "";
    
    switch (action.id) {
      case "rent-analysis":
        actionMessage = "Show me a detailed rent collection analysis";
        break;
      case "maintenance-schedule":
        actionMessage = "Help me optimize my maintenance schedule";
        break;
      case "market-insights":
        actionMessage = "What are the current market trends in my area?";
        break;
      case "tenant-screening":
        actionMessage = "Analyze my pending tenant applications";
        break;
      case "financial-forecast":
        actionMessage = "Generate a financial forecast for my properties";
        break;
      case "document-analysis":
        actionMessage = "Analyze my recent property documents";
        break;
    }
    
    setMessage(actionMessage);
    handleSendMessage();
  };

  const handleSuggestion = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  const startVoiceRecording = () => {
    setIsListening(true);
    toast.info("Voice recording started...");
    
    // Simulate voice recording
    setTimeout(() => {
      setIsListening(false);
      setMessage("Show me my property performance analytics");
      toast.success("Voice message recorded!");
    }, 3000);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        toast.success("Image uploaded! AI is analyzing...");
        setTimeout(() => {
          const imageAnalysisMessage = {
            id: Date.now(),
            type: "ai",
            content: "🖼️ **Image Analysis Complete**\n\nI can see this appears to be a property maintenance issue. Based on the image:\n\n• **Issue Type**: Plumbing leak detected\n• **Severity**: Medium - requires prompt attention\n• **Estimated Cost**: R2,500 - R4,000\n• **Recommended Action**: Contact certified plumber within 24 hours\n\n📋 I've automatically created a maintenance ticket and notified your preferred contractors.",
            timestamp: new Date(),
            suggestions: ["Create work order", "Contact contractors", "Schedule inspection", "View similar cases"]
          };
          setMessages(prev => [...prev, imageAnalysisMessage]);
        }, 2000);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Bot className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
            <p className="text-gray-600">Your intelligent property management companion</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Online
        </Badge>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.id}
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
              onClick={() => handleQuickAction(action)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`h-10 w-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span>AI Chat</span>
          </CardTitle>
          <CardDescription>Ask me anything about your property portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {msg.type === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-purple-600" />
                    )}
                    <span className="text-xs opacity-75">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="whitespace-pre-line text-sm">{msg.content}</div>
                  
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <div className="text-xs opacity-75 mb-2">Quick actions:</div>
                      {msg.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="mr-2 mb-1 text-xs"
                          onClick={() => handleSuggestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-purple-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImageUpload}
              className="flex-shrink-0"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={startVoiceRecording}
              className={`flex-shrink-0 ${isListening ? 'bg-red-100 text-red-600' : ''}`}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me about your properties..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>AI Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Revenue Optimization</span>
              </div>
              <p className="text-sm text-green-800">
                Your portfolio could generate an additional R24,000/month by adjusting rents to market rates. 
                Sunset Apartments shows the highest potential with 12% upside.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-900">Maintenance Alert</span>
              </div>
              <p className="text-sm text-yellow-800">
                Predictive analysis suggests HVAC maintenance should be scheduled for 3 properties 
                within the next 30 days to prevent costly breakdowns.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Tenant Retention</span>
              </div>
              <p className="text-sm text-blue-800">
                4 lease renewals are due next month. Based on tenant satisfaction scores, 
                I recommend proactive outreach to secure renewals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
