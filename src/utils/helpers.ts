export const getProficiencyColor = (proficiency?: string) => {
  switch (proficiency) {
    case "expert":
      return "bg-green-100 text-green-800 border-green-200";
    case "proficient":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "novice":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const formatDateRange = (
  fromMonth?: string,
  fromYear?: string,
  toMonth?: string,
  toYear?: string
) => {
  const from =
    fromMonth && fromYear ? `${fromMonth} ${fromYear}` : fromYear || "Unknown";
  const to = toMonth && toYear ? `${toMonth} ${toYear}` : toYear || "Present";
  return `${from} - ${to}`;
};
