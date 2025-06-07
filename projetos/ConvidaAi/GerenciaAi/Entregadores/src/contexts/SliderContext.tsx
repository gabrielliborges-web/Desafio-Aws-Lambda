// contexts/SliderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SliderContextProps {
  openSlider: boolean;
  setOpenSlider: (value: boolean) => void;
  content:
    | "profile"
    | "novo empreendimento"
    | "nova categoria"
    | "novo fornecedor"
    | "editar categoria"
    | "deletar categoria"
    | "";
  setcontent: (
    value:
      | "profile"
      | "novo empreendimento"
      | "nova categoria"
      | "editar categoria"
      | "deletar categoria"
      | "novo fornecedor"
      | ""
  ) => void;
}

const SliderContext = createContext<SliderContextProps | undefined>(undefined);

export const SliderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [content, setcontent] = useState<
    | "profile"
    | "novo empreendimento"
    | "nova categoria"
    | "editar categoria"
    | "deletar categoria"
    | "novo fornecedor"
    | ""
  >("");

  return (
    <SliderContext.Provider
      value={{ openSlider, setOpenSlider, content, setcontent }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = (): SliderContextProps => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSliderContext must be used within a SliderProvider");
  }
  return context;
};
