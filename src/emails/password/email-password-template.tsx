import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailPasswordTemplateProps {
  passwordLink?: string;
}

export const EmailPasswordTemplate = ({
  passwordLink,
}: EmailPasswordTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Log in with this magic link.</Preview>
      <Container style={container}>
        <Heading style={heading}>🪄 Your magic link</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={passwordLink}>
              👉 Click here to sign in 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you did not request this, please ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Raycast Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Raycast Technologies Inc.</Text>
        <Text style={footer}>
          2093 Philadelphia Pike #3222, Claymont, DE 19703
        </Text>
      </Container>
    </Body>
  </Html>
);

EmailPasswordTemplate.PreviewProps = {
  magicLink: "https://raycast.com",
} as EmailPasswordTemplateProps;

export default EmailPasswordTemplate;

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

const link = {
  color: "#FF6363",
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
