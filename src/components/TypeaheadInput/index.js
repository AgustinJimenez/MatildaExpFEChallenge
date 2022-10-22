import PropTypes from "prop-types";
import React from "react";
import { searchSuggestionApiCall, selectedSuggestionApiCall } from "../../api";
import Spinner from "./Spinner";
import "./styles.css";
import SuggestionsList from "./SuggestionsList";

/**
 * This endpoint supports the following requests:
 * 1. GET /typeahead: lists suggestions for no prefix
 * 2. GET /typeahead/{prefix}: lists suggestions for the specified prefix
 * 3. POST /typeahead: receives a JSON body like { "name": "Matilda" } to mark a new selection for that name
 *
 * Note the endpoint itself already has the base path /typeahead included, so you only need to append
 * the `/{prefix}` segment for the 2nd request, or nothing for the other two.
 *
 * Just to keep in mind, the first time in while this endpoint is called (or when increasing capacity),
 * it will take a few seconds (2-4 seconds usually) because of ramp up time. But normal requests should be quicker,
 * in the order of 200ms.
 */

const KEY_CODES = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
};

var searchTimer = null;

const INPUT_TIMEOUT = 250;
let requestAbortController = new AbortController();
export default function TypeaheadInput({ onPick, chosen = [] }) {
  const inputRef = React.useRef();
  const [isSearching, setIsSearching] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const filteredSuggestions = suggestions.filter(
    ({ name }) => !chosen.map(({ name }) => name).includes(name) && !isSearching
  );
  const [itemIndexMouseHover, setItemIndexMouseHover] = React.useState(-1);
  const onSelectSuggestion = (item) => {
    onPick(item);
    setSuggestions([]);
    selectedSuggestionApiCall(item.name);
    setItemIndexMouseHover(-1);
    setInputValue("");
    inputRef.current.blur();
  };
  const onInputKeyDown = (event) => {
    switch (event.keyCode) {
      case KEY_CODES.UP:
        if (
          itemIndexMouseHover <= 0 ||
          itemIndexMouseHover > filteredSuggestions.length - 1
        )
          setItemIndexMouseHover(filteredSuggestions.length - 1);
        else setItemIndexMouseHover(+itemIndexMouseHover - 1);
        event.preventDefault();
        break;
      case KEY_CODES.DOWN:
        if (itemIndexMouseHover < filteredSuggestions.length - 1)
          setItemIndexMouseHover(+itemIndexMouseHover + 1);
        else if (itemIndexMouseHover >= filteredSuggestions.length - 1)
          setItemIndexMouseHover(0);
        event.preventDefault();
        break;
      case KEY_CODES.ENTER:
        if (itemIndexMouseHover >= 0) {
          const selected = filteredSuggestions.find(
            (_, k) => k === itemIndexMouseHover
          );
          onSelectSuggestion(selected);
        }
        break;
      default:
        break;
    }
  };
  /**
   * In JavaScript, there is a beautiful, elegant, highly expressive language
   * that is buried under a steaming pile of good intentions and blunders.
   * -- Douglas Crockford
   */

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const onSearch = React.useCallback(async () => {
    if (isSearching) {
      requestAbortController.abort();
      requestAbortController = new AbortController();
    } else setIsSearching(true);
    const { data, error } = await searchSuggestionApiCall(inputValue, {
      signal: requestAbortController.signal,
    });
    if (!error) setSuggestions(data);
    setIsSearching(false);
  }, [inputValue, isSearching]);

  const onInputBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 50);
  };

  React.useEffect(() => {
    if (inputValue) {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        onSearch();
      }, INPUT_TIMEOUT);
    }
  }, [inputValue]);

  return (
    <div className="TypeaheadInput" onKeyDown={onInputKeyDown}>
      <input
        ref={inputRef}
        type="text"
        onChange={onChangeInput}
        value={inputValue}
        onFocus={onSearch}
        onBlur={onInputBlur}
      />
      <Spinner show={isSearching} />
      <SuggestionsList
        suggestions={filteredSuggestions}
        onSuggestionClick={onSelectSuggestion}
        onSuggestionHover={setItemIndexMouseHover}
        cursor={itemIndexMouseHover}
      />
    </div>
  );
}

TypeaheadInput.propTypes = {
  onPick: PropTypes.func.isRequired,
  chosen: PropTypes.array.isRequired,
};
