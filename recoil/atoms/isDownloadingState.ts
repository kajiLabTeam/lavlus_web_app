import { atom } from "recoil";

export const isDownloadingState = atom<boolean>({
  key: "isDownloadingState",
  default: false,
});
