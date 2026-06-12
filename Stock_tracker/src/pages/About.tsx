
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";

const About = () => {
  return (
    <PageContainer title="About Us">
      <Card className="mb-10 p-6">
        <h2 className="text-2xl font-semibold text-gradient mb-4">Our Mission</h2>
        <p className="text-muted-foreground mb-6">
          At StockTracker, we're dedicated to providing real-time financial data and tools to help investors make informed decisions. 
          Our platform combines cutting-edge technology with user-friendly design to deliver accurate, timely market information.
        </p>

        <h2 className="text-2xl font-semibold text-gradient mb-4">What We Offer</h2>
        <ul className="space-y-2 mb-6">
          {offerings.map((offering, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-stock-purple mt-1">•</span>
              <span className="text-muted-foreground">{offering}</span>
            </li>
          ))}
        </ul>
      </Card>

      <h2 className="text-2xl font-semibold text-center text-gradient mb-6">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} index={index} />
        ))}
      </div>
    </PageContainer>
  );
};

const offerings = [
  "Real-time stock market data and analytics",
  "Comprehensive financial news coverage",
  "Advanced currency conversion tools",
  "Expert market analysis and insights",
  "User-friendly interface for all experience levels"
];

interface TeamMember {
  image: string;
  name: string;
  role: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    name: "John Doe",
    role: "CEO & Founder",
    bio: "With over 15 years of experience in financial markets, John leads our vision for democratizing stock market data."
  },
  {
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    name: "Jane Smith",
    role: "Head of Analytics",
    bio: "Jane brings deep expertise in data analytics and market research to help users understand market trends."
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    name: "Mike Johnson",
    role: "Technical Director",
    bio: "Mike ensures our platform delivers real-time data with maximum reliability and security."
  }
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <Card delay={0.1 * index}>
      <div className="p-6 text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-stock-purple">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <p className="text-stock-purple text-sm mb-4">{member.role}</p>
        <p className="text-muted-foreground text-sm">{member.bio}</p>
      </div>
    </Card>
  );
}

export default About;
