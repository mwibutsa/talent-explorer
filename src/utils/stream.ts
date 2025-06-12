export const processStream = <T>(text: string): T[] => {
  const result: T[] = [];
  const lines = text.trim().split("\n");

  for (const line of lines) {
    if (line.trim()) {
      try {
        const parsed = JSON.parse(line);
        if (parsed) {
          result.push(parsed);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  return result;
};
