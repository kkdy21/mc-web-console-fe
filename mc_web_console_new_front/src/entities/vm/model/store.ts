import { defineStore } from 'pinia';
import { IVm } from '@/entities/vm/model/types.ts';
import { ref, Ref } from 'vue';

const NAMESPACE = 'vm';

interface IVmStore {
  vms: Ref<IVm[]>;
  setVm: (val: IVm[]) => void;
  loadVmById: (vmId: string) => IVm | null;
}

export const useVmStore = defineStore(NAMESPACE, (): IVmStore => {
  const vms = ref<IVm[]>([]);

  function setVm(_vms: IVm[]) {
    vms.value = _vms;
  }

  function loadVmById(vmId: string) {
    return (
      vms.value.find(vm => {
        return vm.id === vmId;
      }) || null
    );
  }

  return { vms, setVm, loadVmById };
});
