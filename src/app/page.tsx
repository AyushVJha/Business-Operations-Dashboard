"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Database, TrendingUp, Users, DollarSign, Package } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "SQL Integration",
      description: "Real-time data extraction from PostgreSQL/MySQL databases using Prisma ORM"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Interactive Charts",
      description: "Dynamic visualizations with Recharts for sales trends and performance metrics"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: "KPI Monitoring",
      description: "Track sales trends, inventory turnover, and customer retention in real-time"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Customer Analytics",
      description: "Monitor customer engagement, retention rates, and active user metrics"
    }
  ];

  const technologies = [
    "Next.js 15", "TypeScript", "Tailwind CSS", "Prisma ORM", 
    "PostgreSQL", "Recharts", "Shadcn/ui", "Lucide Icons"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')"
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Real-Time Business Operations Dashboard</h1>
          <p className="text-xl mb-8 opacity-90">
            Integrate sales, inventory, and customer data from multiple sources using SQL and Excel automation
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                View Dashboard
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with modern technologies to provide real-time insights and data-driven decision making
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow border-0">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Real-Time</div>
              <div className="text-gray-300">Sales Tracking</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Package className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Automated</div>
              <div className="text-gray-300">Inventory Management</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Advanced</div>
              <div className="text-gray-300">Customer Analytics</div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-lg text-gray-600 mb-8">
            Built with cutting-edge technologies for performance and scalability
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business Operations?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Experience real-time data visualization, automated reporting, and data-driven insights 
              that enable rapid business decisions.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explore Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Real-Time Business Operations Dashboard - Powered by Next.js, Prisma, and MySQL
          </p>
        </div>
      </footer>
    </div>
  );
}
