import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardWrapperProps = {
  title: string;
  desc: string;
  className?: string;
  content: React.ReactNode;
};

const CardWrapper = ({ title, desc, content, className }: CardWrapperProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 truncate text-2xl">
          {title}
        </CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription className="whitespace-break-spaces">
          {content}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardWrapper;
