import Reference from "@/elements/Reference";

const AppSettingsDialog = Reference(HTMLDialogElement);

export default () => {
  return {
    get Ref() {
      return AppSettingsDialog;
    },
    get value() {
      return AppSettingsDialog.value;
    },
    set value(value) {
      AppSettingsDialog.value = value;
    },
    Open:()=>{
      AppSettingsDialog.value?.showModal();
    },
    Close:()=>{
      AppSettingsDialog.value?.close();
    }
  };
};
