import { createContext } from "react";

export const DataContext = createContext(null);
DataContext.displayName = "mainData";

export const PopupContext = createContext(null);
PopupContext.displayName = "popupData";

export const SepContext = createContext(null);
SepContext.displayName = "sepData";
