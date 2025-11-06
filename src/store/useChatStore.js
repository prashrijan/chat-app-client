import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    // Todo: optimise this one later
    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            console.log(res);
            set({ users: res.data.data });
        } catch (error) {
            console.log("Error in getUsers: ", error);
            toast.error(error.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log("Error in getMessages: ", error);
            toast.error(error.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
}));
