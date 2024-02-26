import { useEffect, useState } from "react";

const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const downHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    // Returns a function that is the "cleanup" - fires when component is unmounted
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures effect is only run on mount and unmount

  return keyPressed;
};

export default useKeyPress;
