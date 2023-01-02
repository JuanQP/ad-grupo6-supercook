import React from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export type ContextReceta = {
  categoria: number;
  etiquetas: string[];
  fotosPortada: string[];
  nombre: string;
  id?: number;
  descripcion: string;
  porciones: number;
  tiempo_coccion: number;
  ingredientes: Pick<Ingrediente, "descripcion" | "cantidad" | "unidad">[];
  pasosReceta: (Pick<Paso, "numero_paso" | "descripcion_paso"> & {
    pasosMultimedia: Omit<PasoMultimedia, "pasoId" | "tipo_multimedia">[];
  })[];
  action: RecetaAction;
  // esFavorita: boolean;
}

type RecetaContextValue = [
  ContextReceta | null,
  React.Dispatch<React.SetStateAction<ContextReceta | null>>,
] | null

const RecetaContext = React.createContext<RecetaContextValue>(null);

const RecetaProvider = ({ children }: Props) => {
  const [receta, setReceta] = React.useState<ContextReceta | null>(null);

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

  const handleReceta = (value: ContextReceta) => {
    setReceta(value);
  };

  return { value: receta, onChange: handleReceta };
}

export { RecetaProvider, useReceta };
