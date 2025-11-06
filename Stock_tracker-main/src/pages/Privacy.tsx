
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";

const Privacy = () => {
  return (
    <PageContainer title="Privacy Policy">
      <Card className="p-6 space-y-8">
        {privacyData.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gradient">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            
            {section.listItems && (
              <ul className="space-y-2">
                {section.listItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-stock-purple mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Card>
    </PageContainer>
  );
};

const privacyData = [
  {
    title: "Information Collection",
    content: "We collect information that you provide directly to us, information we obtain automatically when you visit our platform, and information from third-party sources. Personal information may include your name, email address, and other contact details."
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve our services. Specifically, we use your information for the following purposes:",
    listItems: [
      "To provide and maintain our Service",
      "To notify you about changes to our Service",
      "To provide customer support",
      "To gather analysis or valuable information",
      "To detect, prevent and address technical issues"
    ]
  },
  {
    title: "Data Security",
    content: "The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security."
  },
  {
    title: "Cookie Policy",
    content: "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
  },
  {
    title: "Changes to This Privacy Policy",
    content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'effective date' at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes."
  }
];

export default Privacy;
