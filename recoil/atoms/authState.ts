import { atom } from "recoil";
import { User } from "../../types";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface AuthInfo extends User {
  isSignedIn: boolean;
  token: string;
}

export const authState = atom<AuthInfo>({
  key: "authState",
  default: {
    isSignedIn: false,
    token: "",
  },
  effects_UNSTABLE: [persistAtom],
});
