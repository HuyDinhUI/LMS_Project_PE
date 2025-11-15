import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export type SelectType = {
  name: string;
  value: string;
};

export type DataSelect = {
  handleSelect: (value: string, key: string) => void;
  select: SelectType[];
  keySelect: string;
  label: string
};

export const Select = ({ select, handleSelect, keySelect, label }: DataSelect) => {
  return (
    <div className="w-50">
      <TextField
        label={label}
        select
        fullWidth
        size="small"
        onChange={(e) => handleSelect(e.target.value, keySelect)}
      >
        {select.map((s: SelectType, i) => (
          <MenuItem key={i} value={s.value}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
