import { ref, Ref } from 'vue';
import { IServerGroup } from '@/entities/servergroups/model/types.ts';
import { defineStore } from 'pinia';

const NAMESPACE = 'servergroup';

interface IServerGroupsStore {
  serverGroups: Ref<IServerGroup[]>;
  setServerGroups: (val: IServerGroup[]) => void;
  loadServerGroupById: (id: string) => IServerGroup | null;
}

export const useServerGroupStore = defineStore(
  NAMESPACE,
  (): IServerGroupsStore => {
    const serverGroups = ref<IServerGroup[]>([]);

    function setServerGroups(_serverGroups: IServerGroup[]) {
      serverGroups.value = _serverGroups;
    }

    function loadServerGroupById(id: string) {
      return (
        serverGroups.value.find((serverGroup: IServerGroup): boolean => {
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
