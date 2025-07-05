export interface SalesData {
  totalSales: number;
  trend: number[];
  recentSales: any[];
}

export interface InventoryData {
  inventoryTurnover: number;
  outOfStock: number;
  totalItems: number;
  items: any[];
}

export interface CustomerData {
  totalCustomers: number;
  activeCustomers: number;
  retentionRate: number;
}

export interface DashboardData {
  salesData: SalesData;
  inventoryData: InventoryData;
  customerData: CustomerData;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const res = await fetch('/api/dashboard', {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("DataService Error:", error);
    throw error;
  }
}
