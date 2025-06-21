import { ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  action: (payload: FormData) => void;
};

const Form = ({ children, action }: FormProps) => {
  return (
    <form className="space-y-2" action={action}>
      {children}
    </form>
  );
};

export default Form;
