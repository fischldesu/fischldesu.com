import { ref } from "vue";
import useReference from "@/elements/Reference.ts";
import useAppMusic, { type MusicMetaData, type MusicPlayType } from "@/elements/AppMusic";
import useSettingsDialog from "@/elements/AppSettingsDialog.ts";
import useAppBackgroundURL from "@/elements/AppBackgroundURL";

export {
  ref,
  useReference,
  useAppMusic,
  useSettingsDialog,
  useAppBackgroundURL,
};

export type {
  MusicMetaData,
  MusicPlayType,
}
