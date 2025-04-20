import Reference from "@/elements/Reference";

const AppSettingsDialog = Reference(HTMLDialogElement);

function preventScroll(e: Event) {
  e.preventDefault();
}

export default () => {
  const BodyScroll = (lock: boolean) => {
    if(lock) {
      document.body.addEventListener('wheel', preventScroll, {passive: false});
    } else {
      document.body.removeEventListener('wheel', preventScroll);
    }
  };

  const show = (modal:boolean) => {
    if(!modal) {
      AppSettingsDialog.value?.show();
      return;
    }
    if (AppSettingsDialog.value) {
      BodyScroll(true);
      const originalClose = AppSettingsDialog.value.close.bind(AppSettingsDialog.value);

      AppSettingsDialog.value.close = () => {
        BodyScroll(false);
        AppSettingsDialog.value!.close = originalClose;
        originalClose();
      };
      AppSettingsDialog.value.showModal();
    }
  };

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
    Open:show,
    Close() {
      AppSettingsDialog.value?.close();
      BodyScroll(false);
    },
  };
};
