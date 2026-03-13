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
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-gray-700 rounded-full animate-spin" />
              <p className="text-slate-500 font-medium">Error occurred while fetching user profile.</p>
          </div>
      </div>
    );
  }

  return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-gray-700 rounded-full animate-spin" />
              <p className="text-slate-500 font-medium">Loggin In...</p>
          </div>
      </div>
  );
};

export default OAuthCallback;
