# Real-Time Business Operations Dashboard

A comprehensive business operations dashboard built with Next.js, TypeScript, Prisma, and PostgreSQL. This application provides real-time insights into sales, inventory, and customer data with interactive visualizations and automated reporting capabilities.

## Features

- **Real-time Data Integration**: Connect to PostgreSQL/MySQL databases using Prisma ORM
- **Interactive Dashboards**: Dynamic charts and visualizations using Recharts
- **KPI Monitoring**: Track sales trends, inventory turnover, and customer retention
- **Automated Reporting**: Real-time data refresh every 60 seconds
- **Modern UI**: Built with Tailwind CSS and Shadcn/ui components
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL (configurable for PostgreSQL)
- **UI Components**: Shadcn/ui, Lucide Icons
- **Charts**: Recharts
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd business-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/business_dashboard"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:8000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:8000](http://localhost:8000) in your browser

## Database Setup

### MySQL Setup

1. Install MySQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE business_dashboard;
   ```
3. Update the `DATABASE_URL` in your `.env` file with your credentials

### Database Schema

The application uses three main tables:

- **Sales**: Stores sales transactions with date, amount, and product information
- **Inventory**: Tracks product inventory levels and last updated timestamps
- **Customer**: Manages customer data including activity status and retention rates

## API Endpoints

- `GET /api/dashboard` - Returns comprehensive dashboard data including sales, inventory, and customer metrics

## Scripts

- `npm run dev` - Start development server on port 8000
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run Prisma database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio for database management

## Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding script
├── src/
│   ├── app/
│   │   ├── api/dashboard/    # API routes
│   │   ├── dashboard/        # Dashboard page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/ui/        # Reusable UI components
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client setup
│   │   └── dataService.ts    # Data fetching utilities
│   └── hooks/                # Custom React hooks
├── .env                      # Environment variables
└── package.json
```

## Key Features Explained

### Real-time Data Refresh
The dashboard automatically refreshes data every 60 seconds and provides a manual refresh button for immediate updates.

### KPI Cards
- **Total Sales**: Aggregated sales amount with currency formatting
- **Inventory Turnover**: Calculated turnover rate based on sales and inventory
- **Active Customers**: Count of currently active customers
- **Retention Rate**: Average customer retention percentage

### Interactive Charts
- **Sales Trend**: Line chart showing daily sales performance
- **Recent Sales**: List of latest sales transactions

### Inventory Management
- **Stock Levels**: Visual indicators for inventory quantities
- **Out-of-Stock Alerts**: Automatic alerts for items needing restocking

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Database Deployment

For production, consider using:
- **Vercel Postgres**
- **PlanetScale**
- **Railway**
- **Supabase**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.

## Roadmap

- [ ] Add user authentication
- [ ] Implement role-based access control
- [ ] Add export functionality for reports
- [ ] Integration with external APIs (Stripe, Shopify, etc.)
- [ ] Advanced filtering and search capabilities
- [ ] Email notifications for alerts
- [ ] Mobile app development
