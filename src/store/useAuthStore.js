import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isAuthChecking: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in check auth: ", error);
            set({ authUser: null });
        } finally {
            set({ isAuthChecking: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);

            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    signin: async (data) => {
        set({ isSigningIn: true });
        try {
            const res = await axiosInstance.post("/auth/signin", data);
            res && res.success && set({ authUser: res.data });
            toast.success("Signed in successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningIn: false });
        }
    },

    signout: async () => {
        try {
            const res = await axiosInstance.post("/auth/signout");
            res && res.success && set({ authUser: null });

            toast.success("Logged out succesfuuly");
        } catch (error) {
            console.log("Error in signout: ", error);
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        console.log(data);
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put(
                "/auth/update-profilePic",
                data
            );
            res && res.success && set({ authUser: res.data });
            toast.success("Profile picture updated successfully");
        } catch (error) {
            console.log("Error in update profile: ", error);
            toast.error(error.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));
