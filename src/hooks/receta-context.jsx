import React from "react";

const RecetaContext = React.createContext(null);

const RecetaProvider = ({ children }) => {
  const [receta, setReceta] = React.useState({});

  return (
    <RecetaContext.Provider value={[receta, setReceta]}>
      {children}
    </RecetaContext.Provider>
  );
};

const useReceta = () => {
  const [receta, setReceta] = React.useContext(RecetaContext);

  const handleReceta = (value) => {
    setReceta(value);
  };

  return { value: receta, onChange: handleReceta };
}

export { RecetaProvider, useReceta };
