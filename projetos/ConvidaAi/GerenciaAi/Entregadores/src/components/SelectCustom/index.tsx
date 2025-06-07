import { useState } from "react";

interface SelectCustomProps {
  items: any[];
  selected: any;
  onSelect: (item: any) => void;
  renderItem: (item: any) => React.ReactNode;
  placeholder?: string;
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  items,
  selected,
  onSelect,
  renderItem,
  placeholder = "Selecione...",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full text-sm">
      {/* botão */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm text-gray-700 dark:text-white hover:border-indigo-500"
      >
        {selected ? (
          renderItem(selected)
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute mt-1 w-full z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-sm max-h-60 overflow-y-auto shadow-lg">
          {items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCustom;
