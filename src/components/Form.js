import React, { useCallback, useState } from "react";
import ChosenSuggestions from "./ChosenSuggestions";
import TypeaheadInput from "./TypeaheadInput";

export default function Form() {
  const [chosen, setChosen] = useState([]);
  const onPick = useCallback((picked) => {
    setChosen((prevChosen) => [...prevChosen, picked]);
  }, []);
  return (
    <div>
      <TypeaheadInput onPick={onPick} chosen={chosen} />
      <ChosenSuggestions suggestions={chosen} />
    </div>
  );
}
