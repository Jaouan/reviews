import { useEvent } from "@/hooks/useEvent";
import { isMac, isMobile } from "@/shared/is-os";
import { useRequests } from "@/stores";
import { useEffect, useRef, useState } from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useShallow } from "zustand/shallow";

const searchFields = [
  "title",
  "state",
  "author",
  "project",
  "issue",
  "draft",
  "created_at",
  "updated_at",
  "web_url",
  "source_branch",
  "target_branch",
  "blocking_discussions_resolved",
  "has_conflicts",
];
const operators = [":", ":<", ":<=", ":>", ":>="];

export const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, searchTerm: storeSearchTerm } = useRequests(
    useShallow(({ search, searchTerm }) => ({ search, searchTerm }))
  );
  const [searchTerm, setSearchTerm] = useState(storeSearchTerm ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const metaKey = isMac() ? "⌘" : "Win";

  const fullWidth = isFocused || searchTerm;

  useEffect(() => {
    if (!inputRef.current) return;
    const focusCallback = () => {
      inputRef.current?.select();
      setIsFocused(true);
    };
    const blurCallback = () => setIsFocused(false);

    inputRef.current.addEventListener("focus", focusCallback);
    inputRef.current.addEventListener("blur", blurCallback);

    return () => {
      inputRef.current?.removeEventListener("focus", focusCallback);
      inputRef.current?.removeEventListener("blur", blurCallback);
    };
  }, [inputRef]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
    setSearchTerm(e.target.value);
  };

  useEvent<KeyboardEvent>(
    "keydown",
    (e) => {
      if (e.metaKey && e.key === "k") inputRef.current?.focus();
    },
    [inputRef]
  );

  return (
    <>
      <div
        className={twMerge(
          "z-10 transition-all hidden sm:flex me-1 tooltip-bottom",
          isFocused ? "opacity-30 hover:opacity-100 tooltip" : "opacity-0"
        )}
      >
        {isFocused && (
          <div className="tooltip-content flex justify-start text-left">
            <div className="p-2 flex flex-col gap-2">
              <div>
                <span className="opacity-60">Fields:</span>
                <ul className="*:ms-8 list-disc">
                  {searchFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="opacity-60">Operator:</span> AND, OR
              </div>
              <div>
                <span className="opacity-60">Comparison:</span>{" "}
                {operators.join(", ")}
              </div>
            </div>
          </div>
        )}
        <IoIosHelpCircleOutline />
      </div>
      <label
        className={twMerge(
          "transition-all input input-sm bg-base-200 border-base-200 w-8 p-1 justify-center items-center focus-within:w-80 max-w-full",
          searchTerm && "w-80",
          fullWidth ? "border-base-300" : "cursor-pointer p-0 hover:bg-base-300"
        )}
      >
        <IoSearch
          className={twMerge("text-lg opacity-50", fullWidth ? null : "ml-2")}
        />

        <input
          ref={inputRef}
          type="text"
          className="grow w-0"
          placeholder={`something AND author:"John Doe"`}
          onChange={onChange}
          value={searchTerm}
        />
        {!isMobile() && (
          <span
            className={twMerge(
              "transition-a flex gap-1 opacity-30",
              fullWidth ? null : "hidden"
            )}
          >
            <kbd className="kbd kbd-sm">{metaKey}</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </span>
        )}
      </label>
    </>
  );
};
