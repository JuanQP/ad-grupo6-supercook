import React from "react";

interface Props {
  children: JSX.Element[];
}

type RecetaContextValue = [
  Partial<Recipe>,
  React.Dispatch<React.SetStateAction<Partial<Recipe>>>,
] | null

const RecetaContext = React.createContext<RecetaContextValue>(null);

const RecetaProvider = ({ children }: Props) => {
  const [receta, setReceta] = React.useState<Partial<Recipe>>({});

  return (
    <RecetaContext.Provider value={[receta, setReceta]}>
      {children}
    </RecetaContext.Provider>
  );
};

const useReceta = () => {
  const context = React.useContext(RecetaContext);
  if(!context) return

  const [receta, setReceta] = context

  const handleReceta = (value: Recipe) => {
    setReceta(value);
  };

  return { value: receta, onChange: handleReceta };
}

export { RecetaProvider, useReceta };
