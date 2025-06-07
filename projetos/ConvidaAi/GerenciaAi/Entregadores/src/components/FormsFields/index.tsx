import React, { useEffect } from "react";
import dayjs from "dayjs";
import { FieldType, FormsFieldsProps } from "@/src/types/Fields";

const FormsFields: React.FC<FormsFieldsProps> = ({
  field,
  onFieldChange,
  maxLength,
  Options,
  disabled,
}) => {
  if (!field?.Title || field.Hidden) return null;

  const showError = field.Required && !field.Value;
  const disabledClass = disabled || field.disabled ? "cursor-not-allowed" : "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let newValue: any;
    if (
      field.TypeAsString === "MultiChoice" ||
      field.TypeAsString === "LookupMulti"
    ) {
      newValue = e;
    } else if (
      field.TypeAsString === "User" ||
      field.TypeAsString === "UserMulti"
    ) {
      newValue = Options.find((user: any) => user.Title === e.target.value);
    } else {
      newValue = e.target.value;
    }
    onFieldChange(field.InternalName, newValue, field.TypeAsString);
  };

  const handleBooleanChange = (
    id: string,
    checked: boolean,
    onFieldChange: (internalName: string, value: any, type: FieldType) => void
  ) => {
    onFieldChange(id, checked, "Boolean");
  };

  const getFieldInput = () => {
    const baseClasses =
      "peer block w-full border-0 bg-gray-50 py-1.5 px-3 text-gray-900 focus:ring-1 focus:ring-gray-200 sm:text-sm sm:leading-6";
    const disabledStyle =
      disabled || field.disabled ? "cursor-not-allowed" : "";

    switch (field.TypeAsString) {
      case "Text":
        return (
          <input
            type="text"
            id={field.InternalName}
            placeholder={field.Placeholder}
            value={field.Value || ""}
            maxLength={maxLength || 255}
            disabled={disabled || field.disabled}
            onChange={handleChange}
            className={`${baseClasses} ${disabledStyle}`}
          />
        );
      case "Number":
        return (
          <input
            type="number"
            id={field.InternalName}
            placeholder={field.Placeholder}
            value={field.Value || ""}
            disabled={disabled || field.disabled}
            onChange={handleChange}
            className={`${baseClasses} ${disabledStyle}`}
          />
        );
      case "Note":
        return (
          <textarea
            id={field.InternalName}
            rows={getRowsNotes()}
            placeholder={field.Placeholder}
            value={field.Value || ""}
            disabled={disabled || field.disabled}
            onChange={handleChange}
            className={`${baseClasses} ${disabledStyle}`}
          />
        );
      case "Choice":
        return (
          <select
            id={field.InternalName}
            value={field.Value || ""}
            disabled={disabled || field.disabled}
            onChange={handleChange}
            className={`${baseClasses} ${disabledStyle}`}
          >
            <option value="" disabled>
              {field.Placeholder || "Selecione uma opção"}
            </option>
            {Options?.map((choice: any) => (
              <option key={choice.Title} value={choice.Title}>
                {choice.Title}
              </option>
            ))}
          </select>
        );
      case "Boolean":
        return (
          <div className="flex flex-col gap-2 py-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`${field.InternalName}-sim`}
                  name={field.InternalName}
                  value="true"
                  checked={field.Value === true}
                  disabled={disabled || field.disabled}
                  onChange={() =>
                    handleBooleanChange(field.InternalName, true, onFieldChange)
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`${field.InternalName}-sim`}
                  className="text-sm text-gray-700"
                >
                  Sim
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`${field.InternalName}-nao`}
                  name={field.InternalName}
                  value="false"
                  checked={field.Value === false}
                  disabled={disabled || field.disabled}
                  onChange={() =>
                    handleBooleanChange(
                      field.InternalName,
                      false,
                      onFieldChange
                    )
                  }
                  className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <label
                  htmlFor={`${field.InternalName}-nao`}
                  className="text-sm text-gray-700"
                >
                  Não
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getRowsNotes = (): number => {
    const length = (field.Value || "").length;
    if (length <= 600) return 5;
    if (length <= 1200) return 14;
    if (length <= 1600) return 20;
    return 25;
  };

  return (
    <div className="col-span-full mb-3">
      <label
        htmlFor={field.InternalName}
        className="text-sm font-medium text-gray-900 dark:text-white flex items-center"
      >
        {field.Title}
        {field.Required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1">
        {getFieldInput()}
        <div
          className={`inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-secondary ${
            field.NotFilled && "border-red-600 border-t-2"
          }`}
          aria-hidden="true"
        />
        {showError && (
          <p className="mt-2 text-xs text-red-600">Este campo é obrigatório</p>
        )}
      </div>
    </div>
  );
};

export default FormsFields;
