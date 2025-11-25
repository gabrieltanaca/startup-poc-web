import { PropsWithChildren } from 'react';
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Logo } from '../Logo';

type CardProps = PropsWithChildren & {
  title: string;
  description: string;
};

const Card = ({ title, description, children }: CardProps) => {
  return (
    <CardComponent className="md:hover:shadow-primary/50 w-full max-w-md shadow-2xl transition-all duration-300 max-md:border-0 max-md:shadow-none">
      <CardHeader className="flex flex-col items-center space-y-1 text-center">
        <Logo />
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardComponent>
  );
};

export default Card;
