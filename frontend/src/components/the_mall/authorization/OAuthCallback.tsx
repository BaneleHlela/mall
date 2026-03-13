import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../features/user/userSlice";
import type { AppDispatch } from "../../../app/store";

const OAuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await dispatch(getProfile());
        // Check if the request was successful (fulfilled, not rejected)
        if (getProfile.fulfilled.match(result)) {
          setStatus("success");
          // Small delay to ensure cookies are processed
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          setStatus("error");
          console.error("Failed to fetch user:", result.payload);
          navigate("/login?error=profile fetch failed");
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        setStatus("error");
        navigate("/login?error=profile fetch failed");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  if (status === "error") {
    return <p>Failed to log in. Redirecting to login...</p>;
  }

  return <p>Logging in...</p>;
};

export default OAuthCallback;
