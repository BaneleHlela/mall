import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../features/user/userSlice";
import type { AppDispatch } from "../../../app/store";

const OAuthCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getProfile()); // This should update Redux with user data
        navigate("/"); // Redirect user to the dashboard or homepage
      } catch (error) {
        console.error("Failed to fetch user", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return <p>Logging in...</p>;
};

export default OAuthCallback;
