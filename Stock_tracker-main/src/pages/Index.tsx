
import { PageContainer } from "@/components/PageContainer";
import { Card, CardHeader, CardContent, CardTitle, CardIcon } from "@/components/Card";
import { ArrowUp, ArrowDown, BarChart3, DollarSign, Droplets } from "lucide-react";

const Dashboard = () => {
  return (
    <PageContainer title="Market Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MarketCard 
          title="Market Overview" 
          icon={<BarChart3 />}
          data={[
            { name: "S&P 500", value: "+1.32%", positive: true },
            { name: "NASDAQ", value: "+1.87%", positive: true },
            { name: "DOW", value: "+0.97%", positive: true }
          ]}
          delay={0.1}
        />
        
        <MarketCard 
          title="Forex" 
          icon={<DollarSign />}
          data={[
            { name: "EUR/USD", value: "-0.24%", positive: false },
            { name: "GBP/USD", value: "+0.12%", positive: true },
            { name: "USD/JPY", value: "+0.35%", positive: true }
          ]}
          delay={0.2}
        />
        
        <MarketCard 
          title="Commodities" 
          icon={<Droplets />}
          data={[
            { name: "Gold", value: "+0.45%", positive: true },
            { name: "Silver", value: "+0.78%", positive: true },
            { name: "Crude Oil", value: "-1.24%", positive: false }
          ]}
          delay={0.3}
        />
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Top Performing Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left p-4 font-medium text-primary">Symbol</th>
                  <th className="text-left p-4 font-medium text-primary">Name</th>
                  <th className="text-left p-4 font-medium text-primary">Price</th>
                  <th className="text-left p-4 font-medium text-primary">Change</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((stock, index) => (
                  <StockRow key={stock.symbol} stock={stock} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

interface MarketItem {
  name: string;
  value: string;
  positive: boolean;
}

function MarketCard({ 
  title, 
  icon, 
  data,
  delay
}: { 
  title: string; 
  icon: React.ReactNode;
  data: MarketItem[];
  delay: number;
}) {
  return (
    <Card delay={delay}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardIcon>{icon}</CardIcon>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="text-muted-foreground">{item.name}</span>
            <span className={item.positive ? "text-stock-positive flex items-center gap-1" : "text-stock-negative flex items-center gap-1"}>
              {item.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface Stock {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
}

const stockData: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$182.63", change: "+2.45%", positive: true },
  { symbol: "MSFT", name: "Microsoft Corp.", price: "$378.92", change: "+1.89%", positive: true },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: "$142.57", change: "+1.56%", positive: true },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: "$178.22", change: "+2.11%", positive: true },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$193.57", change: "-0.87%", positive: false }
];

function StockRow({ stock, index }: { stock: Stock; index: number }) {
  return (
    <tr 
      className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
    >
      <td className="p-4 font-medium">{stock.symbol}</td>
      <td className="p-4 text-muted-foreground">{stock.name}</td>
      <td className="p-4">{stock.price}</td>
      <td className={stock.positive ? "p-4 text-stock-positive flex items-center gap-1" : "p-4 text-stock-negative flex items-center gap-1"}>
        {stock.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        {stock.change}
      </td>
    </tr>
  );
}

export default Dashboard;
