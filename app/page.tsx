"use client";

import { Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Button>{user?.name}</Button>
    </div>
  );
};

export default Home;
