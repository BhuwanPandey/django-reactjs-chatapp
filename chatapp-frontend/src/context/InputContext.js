import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  refresh: false,
};

export const InputContext = createContext(INITIAL_STATE);

const InputReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return {
        ...state,
        refresh: action.refresh,
      };
    default:
      return state;
  }
};

export const InputContextProvider = ({ children }) => {
  const [state, trigger] = useReducer(InputReducer, INITIAL_STATE);

  return (
    <InputContext.Provider
      value={{
        refresh: state.refresh,
        trigger,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
