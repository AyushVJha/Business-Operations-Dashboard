'use client';

import React, { useEffect, useState } from 'react';
import { fetchDashboardData, type DashboardData } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RefreshCw, TrendingUp, Package, Users, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const chartData = data?.salesData.trend.map((value, index) => ({
    day: `Day ${index + 1}`,
    sales: value
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Hero Section */}
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')"
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Real-Time Business Operations Dashboard</h1>
          <p className="text-lg opacity-90">Monitor KPIs and make data-driven decisions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 -mt-16 relative z-10">
        {/* Control Panel */}
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Dashboard Controls</CardTitle>
                <CardDescription>
                  {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
                </CardDescription>
              </div>
              <Button onClick={loadData} disabled={loading} className="flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data ? formatCurrency(data.salesData.totalSales) : 'Loading...'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Inventory Turnover</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data ? `${data.inventoryData.inventoryTurnover}x` : 'Loading...'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data ? data.customerData.activeCustomers.toLocaleString() : 'Loading...'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Retention Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {data ? `${data.customerData.retentionRate}%` : 'Loading...'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Sales Trend</CardTitle>
              <CardDescription>Daily sales performance over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Sales']} />
                    <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Recent Sales</CardTitle>
              <CardDescription>Latest sales transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {data?.salesData.recentSales.slice(0, 5).map((sale, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{sale.product}</p>
                      <p className="text-sm text-gray-600">{new Date(sale.date).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="secondary">{formatCurrency(sale.amount)}</Badge>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No recent sales data</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Section */}
        <Card className="mb-8 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Inventory Overview</CardTitle>
            <CardDescription>Current inventory status and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{data?.inventoryData.totalItems || 0}</div>
                <div className="text-sm text-blue-800">Total Items</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data?.inventoryData.inventoryTurnover || 0}x</div>
                <div className="text-sm text-green-800">Turnover Rate</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{data?.inventoryData.outOfStock || 0}</div>
                <div className="text-sm text-red-800">Out of Stock</div>
              </div>
            </div>
            
            {data && data.inventoryData.outOfStock > 0 && (
              <Alert className="mt-4 border-orange-200 bg-orange-50">
                <AlertDescription className="text-orange-800">
                  ⚠️ {data.inventoryData.outOfStock} items are currently out of stock and need restocking.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Customer Section */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Customer Analytics</CardTitle>
            <CardDescription>Customer engagement and retention metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{data?.customerData.totalCustomers || 0}</div>
                <div className="text-sm text-purple-800">Total Customers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{data?.customerData.activeCustomers || 0}</div>
                <div className="text-sm text-green-800">Active Customers</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{data?.customerData.retentionRate || 0}%</div>
                <div className="text-sm text-orange-800">Retention Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Dashboard automatically refreshes every 60 seconds</p>
          <p>Data sourced from MySQL database via Prisma ORM</p>
        </div>
      </div>
    </div>
  );
}
