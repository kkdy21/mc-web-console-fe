import { ref, Ref } from 'vue';
import { IServerGroup } from '@/entities/servergroups/model/types.ts';
import { defineStore } from 'pinia';
import { IMci } from '@/entities/mci/model';

const NAMESPACE = 'servergroup';

interface IServerGroupsStore {
  serverGroups: Ref<IServerGroup[]>;
  setServerGroups: (val: string[]) => void;
  loadServerGroupById: (id: string) => IServerGroup;
}

export const useServerGroupStore = defineStore(
  NAMESPACE,
  (): IServerGroupsStore => {
    const serverGroups = ref<IServerGroup[]>([]);

    function setServerGroups(_serverGroups) {
      serverGroups.value = _serverGroups;
    }

    function loadServerGroupById(id: string) {
      return (
        serverGroups.value.find((serverGroup: IMci) => {
          return serverGroup.id === id;
        }) || null
      );
    }

    return {
      serverGroups,
      setServerGroups,
      loadServerGroupById,
    };
  },
);
