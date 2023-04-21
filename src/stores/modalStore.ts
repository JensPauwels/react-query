import { create } from 'zustand';

export enum MODAL_TYPE {
  EDIT_TODO = 'EDIT_TODO',
  DELETE_TODO = 'DELETE_TODO'
}

interface ModalStore {
  modals: Map<MODAL_TYPE, boolean>
  register: (modalID: MODAL_TYPE) => void
  open: (modalID: MODAL_TYPE) => void
  close: (modalID: MODAL_TYPE) => void
}

const useModalStore = create<ModalStore>((set) => {
  const register = (modalType: MODAL_TYPE) => set((state) => {
    return {
      ...state,
      modals: state.modals.set(modalType, false),
    };
  });

  const open = (modalType: MODAL_TYPE) => set((state) => {
    return {
      ...state,
      modals: state.modals.set(modalType, true),
    };
  });

  const close = (modalType: MODAL_TYPE) => set((state) => {
    return {
      ...state,
      modals: state.modals.set(modalType, false),
    };
  });

  return {
    modals: new Map(),
    register,
    open,
    close
  };
});


export const useModal = (modalType: MODAL_TYPE) => {
  const { modals } = useModalStore();

  return {
    isOpen: modals.get(modalType) ?? false
  };
};

export default useModalStore;

