import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorage, storage } from "./storage";
interface authState {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  logout: () => void;
  deviceTokenAdded: boolean;
  setDeviceTokenStatus: (value: boolean) => void;
}
export const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
       user :  null,
      setUser : (user: any) => set({ user }),
      logout : () => set({ user: null,deviceTokenAdded:false }),
      deviceTokenAdded : false,
      setDeviceTokenStatus : (value: boolean) => set({ deviceTokenAdded: value })
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
