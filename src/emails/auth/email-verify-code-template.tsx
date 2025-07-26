import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailCodeTemplateProps {
  code: string;
}

export const EmailCodeTemplate = ({ code }: EmailCodeTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Verify with this magic code.</Preview>
      <Container style={container}>
        <Heading style={heading}>🪄 Your magic code</Heading>
        <Section style={body}>
          <Text style={paragraph}>👉 {code} 👈</Text>
          <Text style={paragraph}>
            If you did not request this, please ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Ticketwise Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Ticketwise Technologies Inc.</Text>
        <Text style={footer}>
          2093 Bay Area, Pike #3222, San Francisco, SF 19703
        </Text>
      </Container>
    </Body>
  </Html>
);

EmailCodeTemplate.PreviewProps = {
  code: "https://raycast.com",
} as EmailCodeTemplateProps;

export default EmailCodeTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
