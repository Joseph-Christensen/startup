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
}