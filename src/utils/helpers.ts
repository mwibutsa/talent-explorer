import { IUser } from "@/interfaces";
import { ISearchResponse } from "@/interfaces/people";

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

export const transformStreamResponse = async () => {};

export const mapToIUser = (jsonData: ISearchResponse): IUser[] => {
  return jsonData.results.map((result, idx) => {
    return {
      ardaId: idx, // Not provided
      ggId: result.ggId || result.subjectId || "",
      name: result.name || "",
      comparableName: result.name
        ? result.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "",
      username: result.username || "",
      professionalHeadline: result.professionalHeadline || "",
      imageUrl: result.picture || "",
      completion: 0,
      grammar: 0, // Not provided
      weight: result.weight || 0,
      verified: result.verified || false,
      connections: [], // Not provided
      totalStrength: 0, // Not provided
      pageRank: 0, // Not provided
      organizationId: null, // Not provided
      organizationNumericId: null, // Not provided
      publicId: result.subjectId || null,
      status: null, // Not provided
      creators: [], // Not provided
      relationDegree: 0, // Not provided
      isSearchable: true, // Inferred from search context
      contact: false, // Not provided
    };
  }); // Assume first result
};
