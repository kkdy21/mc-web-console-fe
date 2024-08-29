<script setup lang="ts">
import {
  PHorizontalLayout,
  PToolboxTable,
  PButton,
  PStatus,
} from '@cloudforet-test/mirinae';
import { computed, onMounted, reactive, watch } from 'vue';
import { getUserList, tempGetUserList } from '@/entities';
import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';

const tableModel = useToolboxTableModel();

tableModel.tableState.items = tempGetUserList();
tableModel.tableState.sortedItems = tableModel.tableState.items;
tableModel.tableState.fields = [
  { name: 'userid', label: 'User Id' },
  { name: 'name', label: 'Name' },
  { name: 'description', label: 'Description' },
  { name: 'company', label: 'Company' },
  { name: 'department', label: 'Department' },
  { name: 'approved', label: 'Approved' },
];

tableModel.querySearchState.keyItemSet = [
  {
    title: 'columns',
    items: [
      { name: 'userid', label: 'User Id' },
      {
        name: 'name',
        label: 'Name',
      },
      { name: 'description', label: 'Description' },
      { name: 'company', label: 'Company' },
      { name: 'department', label: 'Department' },
    ],
  },
];

function temp(e) {
  console.log(e);
}

let t = reactive({ selectIndex: [] });
// eslint-disable-next-line vue/return-in-computed-property
watch(
  tableModel.tableState,
  n => {
    console.log(n);
  },
  { deep: true },
);
onMounted(() => {
  tableModel.handleFetch(null);
});

let tt = [
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
  {
    name: 'Stuart',
    phone: '(510) 255-3718 x071',
    email: 'Dahlia.Towne86@hotmail.com',
    cost: '720.00',
    homepage: 'http://fine-chapter.org',
  },
  {
    name: 'Myah',
    phone: '586-531-4454 x003',
    email: 'Lesly_Rutherford67@gmail.com',
    cost: '987.00',
    homepage: 'https://lost-installation.biz',
  },
  {
    name: 'Ryann',
    phone: '753-467-1520 x988',
    email: 'Jacinthe.OConner54@hotmail.com',
    cost: '222.00',
    homepage: 'https://flawless-belt.org',
  },
  {
    name: 'Vladimir',
    phone: '(684) 902-4428 x21909',
    email: 'Lori_Daniel@yahoo.com',
    cost: '785.00',
    homepage: 'https://outgoing-ego.com',
  },
  {
    name: 'Emmy',
    phone: '1-681-746-9708',
    email: 'Miller16@yahoo.com',
    cost: '734.00',
    homepage: 'https://sunny-vendor.com',
  },
  {
    name: 'Nettie',
    phone: '(424) 446-7228',
    email: 'Telly.Effertz34@yahoo.com',
    cost: '639.00',
    homepage: 'http://multicolored-blade.biz',
  },
  {
    name: 'Roxane',
    phone: '(439) 281-2904',
    email: 'Domenick_MacGyver@hotmail.com',
    cost: '476.00',
    homepage: 'https://virtual-sunlight.org',
  },
  {
    name: 'Donald',
    phone: '1-605-611-2261 x4489',
    email: 'Maverick_Harber@hotmail.com',
    cost: '462.00',
    homepage: 'http://spry-jazz.net',
  },
];
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :minHeight="400" :maxHeight="1000">
      <template #container="{ height }">
        <p-toolbox-table
          :loading="tableModel.tableState.loading"
          :items="tableModel.tableState.sortedItems"
          :fields="tableModel.tableState.fields"
          :total-count="tableModel.tableState.items.length"
          :style="{ height: `${height}px` }"
          :sortable="tableModel.tableOptions.sortable"
          :sort-by="tableModel.tableOptions.sortBy"
          :selectable="tableModel.tableOptions.selectable"
          :multi-select="tableModel.tableOptions.multiSelect"
          :search-type="tableModel.tableOptions.searchType"
          :key-item-sets="tableModel.querySearchState.keyItemSet"
          :value-handler-map="tableModel.querySearchState.valueHandlerMap"
          :query-tag="tableModel.querySearchState.queryTag"
          :select-index.sync="tableModel.tableState.selectIndex"
          @changeSort="tableModel.tableSort"
          @change="tableModel.handleFetch"
          @refresh="() => {}"
          @select="temp"
        >
          <template #toolbox-left>
            <p-button style-type="primary" icon-left="ic_plus_bold">
              Add user
            </p-button>
          </template>
          <template #col-approved-format="{ item }">
            <p-status
              :icon-color="`${item.approved.state ? '#60b731' : '#C2C2C6'}`"
              :text="`${item.approved.data}`"
              :style="{ margin: '1rem' }"
            />
          </template>
        </p-toolbox-table>
      </template>
    </p-horizontal-layout>
  </div>
</template>

<style scoped lang="postcss"></style>
