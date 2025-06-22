import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardWrapperProps = {
  title: string;
  desc: string;
  className?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

const CardWrapper = ({
  title,
  desc,
  content,
  className,
  footer,
}: CardWrapperProps) => {
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
      {footer && (
        <CardFooter className="flex items-center justify-between">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
