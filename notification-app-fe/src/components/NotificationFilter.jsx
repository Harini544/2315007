import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

export default function NotificationFilter({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, newValue) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
      size="small"
      sx={{ flexWrap: "wrap", gap: 1 }}
    >
      {filters.map((type) => (
        <ToggleButton
          key={type}
          value={type}
          sx={{ textTransform: "none" }}
        >
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}