
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";

const Terms = () => {
  return (
    <PageContainer title="Terms of Service">
      <Card className="p-6 space-y-8">
        {termsData.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gradient">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        ))}
      </Card>
    </PageContainer>
  );
};

const termsData = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using StockTracker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
  },
  {
    title: "2. Use License",
    content: "Permission is granted to temporarily download one copy of the materials (information or software) on StockTracker for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display; attempt to decompile or reverse engineer any software contained on StockTracker; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or 'mirror' the materials on any other server."
  },
  {
    title: "3. Disclaimer",
    content: "The materials on StockTracker are provided on an 'as is' basis. StockTracker makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
  },
  {
    title: "4. Limitations",
    content: "In no event shall StockTracker or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on StockTracker, even if StockTracker or a StockTracker authorized representative has been notified orally or in writing of the possibility of such damage."
  },
  {
    title: "5. Accuracy of Materials",
    content: "The materials appearing on StockTracker could include technical, typographical, or photographic errors. StockTracker does not warrant that any of the materials on its website are accurate, complete, or current. StockTracker may make changes to the materials contained on its website at any time without notice. However, StockTracker does not make any commitment to update the materials."
  }
];

export default Terms;
