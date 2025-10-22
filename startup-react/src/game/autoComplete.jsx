import React from "react";
import { weapons } from "./weaponData";
import "./game.css";

export function AutoComplete({ onSubmit }) {
    const [input, setInput] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);

    // filter as user types
    function handleChange(e) {
        const value = e.target.value;
        setInput(value);

        if (value.trim().length === 0) {
            setSuggestions([]);
        } else {
            const filtered = weapons
            .map((w) => w.name)
            .filter((name) => name.toLowerCase().includes(value.toLowerCase()))
            setSuggestions(FileSystemDirectoryReader.slice(0, 6));
        }
    }

    function handleSelect(name) {
        setInput(name);
        setSuggestions([]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;

        onSubmit(input);
        setInput("");
        setSuggestions([]);
    }

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".autocomplete-container")) {
                setSuggestions([]);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center mt-3 position-relative autocomplete-container"
        >
        <input
            type="text"
            className="form-control w-50"
            placeholder="Enter your weapon guess"
            value={input}
            onChange={handleChange}
            autoComplete="off"
        />
        <button
            type="submit"
            className="btn btn-outline-warning ms-2 fw-bold"
        >
            Submit
        </button>

        {suggestions.length > 0 && (
            <ul
                className="list-group position-absolute w-50 mt-5 bg-dark border border-warning rounded-2"
                style={{ zIndex: 10 }}
            >
                {suggestions.map((s, i) => (
                    <li
                        key={i}
                        onClick={() => handleSelect(s)}
                        className="list-group-item list-group-item-action bg-dark text-light"
                        style={{ cursor: "pointer" }}
                    >
                        {s}
                    </li>
                ))}
            </ul>
            )}
        </form>
    );
}
