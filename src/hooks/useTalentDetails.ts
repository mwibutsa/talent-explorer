import { useState, useEffect } from "react";
import { fetchGenome } from "@/services/genome";
import { IUser, IUserGenome } from "@/interfaces";

export default function useTalentDetails(user: IUser | null) {
  const [genome, setGenome] = useState<IUserGenome | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.username) {
      setGenome(null);
      setError(null);
      return;
    }

    const loadGenome = async () => {
      setLoading(true);
      setError(null);

      try {
        const genomeData = await fetchGenome(user.username);
        setGenome(genomeData);
      } catch (err) {
        setError("Failed to load profile information");
        setGenome(null);
        console.error("Failed to fetch genome:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGenome();
  }, [user?.username]);

  return {
    genome,
    loading,
    error,
  };
}
