import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.sale.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.customer.deleteMany();

  // Seed Sales data
  const salesData = [];
  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    salesData.push({
      date,
      amount: Math.floor(Math.random() * 5000) + 100,
      product: ['Laptop', 'Phone', 'Tablet', 'Monitor', 'Keyboard', 'Mouse'][Math.floor(Math.random() * 6)]
    });
  }

  await prisma.sale.createMany({
    data: salesData
  });

  // Seed Inventory data
  const inventoryData = [
    { product: 'Laptop', quantity: 25 },
    { product: 'Phone', quantity: 150 },
    { product: 'Tablet', quantity: 75 },
    { product: 'Monitor', quantity: 40 },
    { product: 'Keyboard', quantity: 0 }, // Out of stock
    { product: 'Mouse', quantity: 200 },
    { product: 'Headphones', quantity: 85 },
    { product: 'Webcam', quantity: 0 }, // Out of stock
    { product: 'Speaker', quantity: 30 },
    { product: 'Charger', quantity: 120 }
  ];

  await prisma.inventory.createMany({
    data: inventoryData
  });

  // Seed Customer data
  const customerData = [];
  for (let i = 0; i < 100; i++) {
    customerData.push({
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      active: Math.random() > 0.2, // 80% active customers
      retentionRate: Math.random() * 100
    });
  }

  await prisma.customer.createMany({
    data: customerData
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
