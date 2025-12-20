import React, { useState } from "react";
import { Search, Brain, FileText, Sparkles, Loader2, Zap, Target, Users, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Header from "./components/Header";

// Markdown renderer component
const MarkdownRenderer = ({ content }) => {
  const renderMarkdown = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];
    let listType = null;
    
    const flushList = () => {
      if (listItems.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-4 ml-4">
              {listItems}
            </ul>
          );
        } else if (listType === 'ol') {
          elements.push(
            <ol key={`list-${elements.length}`} className="list-decimal list-inside space-y-2 mb-4 ml-4">
              {listItems}
            </ol>
          );
        }
        listItems = [];
        listType = null;
      }
    };
    
    const parseInlineMarkdown = (text) => {
      const parts = [];
      let currentIndex = 0;
      
      // Handle bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      
      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > currentIndex) {
          parts.push(text.substring(currentIndex, match.index));
        }
        parts.push(<strong key={`bold-${match.index}`} className="font-semibold text-gray-900">{match[1]}</strong>);
        currentIndex = match.index + match[0].length;
      }
      
      if (currentIndex < text.length) {
        parts.push(text.substring(currentIndex));
      }
      
      return parts.length > 0 ? parts : text;
    };
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Empty line
      if (!trimmedLine) {
        flushList();
        elements.push(<div key={`space-${index}`} className="h-3"></div>);
        return;
      }
      
      // Headers
      if (trimmedLine.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4 mt-6">
            {parseInlineMarkdown(trimmedLine.substring(2))}
          </h1>
        );
        return;
      }
      
      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-gray-900 mb-3 mt-5">
            {parseInlineMarkdown(trimmedLine.substring(3))}
          </h2>
        );
        return;
      }
      
      if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-bold text-gray-900 mb-3 mt-4">
            {parseInlineMarkdown(trimmedLine.substring(4))}
          </h3>
        );
        return;
      }
      
      // Bullet points
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(
          <li key={index} className="text-gray-700 leading-relaxed">
            {parseInlineMarkdown(trimmedLine.substring(2))}
          </li>
        );
        return;
      }
      
      // Numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
      if (numberedMatch) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(
          <li key={index} className="text-gray-700 leading-relaxed">
            {parseInlineMarkdown(numberedMatch[2])}
          </li>
        );
        return;
      }
      
      // Regular paragraph
      flushList();
      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {parseInlineMarkdown(trimmedLine)}
        </p>
      );
    });
    
    flushList();
    return elements;
  };
  
  return <div className="markdown-content">{renderMarkdown(content)}</div>;
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Research Assistant</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering researchers, students, and professionals with AI-driven insights. 
              Our multi-agent system delivers comprehensive research in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 AI Research Assistant. All rights reserved. Built with advanced AI technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Multi-Agent Intelligence",
      description: "Multiple AI agents work together to analyze your topic from different perspectives, ensuring comprehensive coverage."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get detailed research results in seconds, not hours. Our optimized AI pipeline delivers instant insights."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Analysis",
      description: "Advanced algorithms ensure accurate, relevant, and actionable research tailored to your specific needs."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Structured Reports",
      description: "Receive well-organized summaries and detailed reports that are easy to understand and share."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for comprehensive AI-powered research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Enter Your Topic",
      description: "Type in any research topic or question you want to explore."
    },
    {
      number: "2",
      title: "AI Agents Analyze",
      description: "Our multi-agent system processes your query using advanced AI models."
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive a comprehensive summary and detailed research report instantly."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to unlock powerful research insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="text-indigo-600 text-3xl">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Our Platform</h2>
            <p className="text-lg text-gray-600 mb-4">
              AI Research Assistant is a cutting-edge platform that leverages the power of multiple 
              AI agents working in harmony to deliver comprehensive research insights.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Built for researchers, students, professionals, and anyone seeking deep knowledge, 
              our system combines advanced natural language processing with intelligent data analysis 
              to provide you with accurate and actionable information.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're exploring a new field, conducting academic research, or making 
              business decisions, our AI-powered platform ensures you have the insights you need.
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">10K+</div>
                <div className="text-sm text-gray-600">Researches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">5K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">99%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-12 flex items-center justify-center">
            <div className="text-center">
              <Users className="w-32 h-32 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Community</h3>
              <p className="text-gray-600">Thousands of researchers trust our platform daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const runWorkflow = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("https://agent-orchestration-framework-with.onrender.com/run-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      runWorkflow();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section id="home" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Deep Research Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter any topic and let our AI agents conduct comprehensive research, 
            analyze data, and deliver actionable insights in seconds.
          </p>
        </div>

        {/* Search Input */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter your research topic... (e.g., 'Quantum Computing Applications')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                disabled={loading}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={runWorkflow}
              disabled={loading || !topic.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Start Research"
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              AI Agents at Work
            </h3>
            <p className="text-gray-600 mb-6">
              Our multi-agent system is analyzing your topic...
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-indigo-600">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Research Topic</h3>
                  <p className="text-2xl font-bold text-gray-900">{result.topic}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Executive Summary</h3>
                  <p className="text-gray-600">Key insights and findings</p>
                </div>
              </div>
              <div className="bg-gray-50 text-[18px] rounded-xl p-8 max-h-[600px] overflow-y-auto border border-gray-200">
               <MarkdownRenderer content={result.summary} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Detailed Research</h3>
                  <p className="text-gray-600">Comprehensive analysis and findings</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 max-h-[600px] overflow-y-auto border border-gray-200">
                <MarkdownRenderer content={result.research} />
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !result && !error && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ready to Begin
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a research topic above to get started with AI-powered comprehensive research and analysis.
            </p>
          </div>
        )}
      </section>

      <Features />
      <HowItWorks />
      <About />
      <Footer />
    </div>
  );
};

export default App;