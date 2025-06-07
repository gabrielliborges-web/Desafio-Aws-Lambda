export type FieldType =
  | "Text"
  | "Note"
  | "Number"
  | "Choice"
  | "Boolean"
  | "MultiChoice"
  | "LookupMulti"
  | "User"
  | "UserMulti";

export type Field = {
  Title: string;
  InternalName: string;
  Placeholder: string;
  TypeAsString: FieldType;
  Value?: any;
  Required?: boolean;
  Hidden?: boolean;
  NotFilled?: boolean;
  Options?: { Title: string }[];
  disabled: boolean;
};

export type FormsFieldsProps = {
  field: Field;
  onFieldChange: (internalName: string, value: any, type: FieldType) => void;
  maxLength?: number;
  Options: string[] | any;
  disabled: boolean;
};
