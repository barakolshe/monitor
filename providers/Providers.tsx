import { FunctionComponent, ReactNode } from "react";
import ReactQueryProvider from "./_providers/ReactQueryProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
