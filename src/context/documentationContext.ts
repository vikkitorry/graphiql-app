import { createContext } from 'react';
import { GraphQLSchema } from 'graphql';
import type { StackItem } from '../types/documentationTypes';

export type DocumentationContextType = {
  schema: GraphQLSchema | null;
  setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;
};

export const DocumentationContext = createContext<DocumentationContextType>({
  schema: null,
  setStack: () => {},
});
