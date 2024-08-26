<script setup lang="ts">
import {
  PHorizontalLayout,
  PDynamicLayout,
  PButton,
} from '@cloudforet-test/mirinae';
import { reactive } from 'vue';

let data = [
  {
    name: 'Van',
    age: 27,
    job: 'Product Interactions Officer',
    information: {
      career: [
        { company: 'Flatley - Johns', from: '2078-10-16T02:21:23.945Z' },
        { company: 'Mraz Group', from: '2074-04-09T07:53:39.679Z' },
        {
          company: 'Zboncak, Nienow and Nicolas',
          from: '1997-07-03T02:34:23.172Z',
        },
        { company: 'Okuneva Inc', from: '2065-11-23T17:36:49.323Z' },
        {
          company: 'Grady, Medhurst and Considine',
          from: '2030-06-11T22:03:41.404Z',
        },
      ],
    },
  },
  {
    name: 'Clair',
    age: 44,
    job: 'Product Group Orchestrator',
    information: {
      career: [
        {
          company: 'Ortiz, Lind and Block',
          from: '2091-02-18T07:39:07.580Z',
        },
        { company: 'White - Lubowitz', from: '2026-03-08T19:10:56.232Z' },
        {
          company: 'Kris, Carter and Schneider',
          from: '2011-04-19T12:32:54.415Z',
        },
        {
          company: 'Nader, Simonis and Cole',
          from: '2058-08-22T03:16:03.698Z',
        },
        { company: 'Feil - Ebert', from: '2082-02-21T00:18:01.203Z' },
      ],
    },
  },
  {
    name: 'Zelma',
    age: 30,
    job: 'Corporate Implementation Architect',
    information: {
      career: [
        { company: 'Becker - Romaguera', from: '2020-11-08T21:30:18.795Z' },
        {
          company: 'Block, Crona and Bernier',
          from: '1993-07-23T02:46:37.609Z',
        },
        { company: 'Klein Group', from: '1990-10-02T05:07:57.048Z' },
        { company: 'Conn - Jacobson', from: '1997-01-19T12:20:38.585Z' },
        { company: 'Borer Group', from: '2052-09-26T01:39:16.825Z' },
      ],
    },
  },
  {
    name: 'Gino',
    age: 89,
    job: 'Global Creative Planner',
    information: {
      career: [
        { company: 'Kuphal and Sons', from: '2050-11-22T19:54:44.471Z' },
        {
          company: 'Stark, Rempel and Wiegand',
          from: '2042-11-28T17:16:45.092Z',
        },
        { company: 'Yost - White', from: '1999-05-01T12:23:07.701Z' },
        { company: 'Wisozk and Sons', from: '2022-01-20T21:42:33.925Z' },
        { company: 'Cassin - Krajcik', from: '2048-07-12T20:48:42.207Z' },
      ],
    },
  },
  {
    name: 'Providenci',
    age: 51,
    job: 'Internal Assurance Consultant',
    information: {
      career: [
        { company: 'Deckow Group', from: '2081-07-12T17:10:19.545Z' },
        {
          company: 'Prohaska, Huels and Hegmann',
          from: '2033-04-04T08:08:39.729Z',
        },
        {
          company: 'Hackett, Bechtelar and Torphy',
          from: '2015-07-24T03:15:28.107Z',
        },
        { company: 'Herman - Grimes', from: '2048-11-04T15:36:54.540Z' },
        {
          company: 'Pagac, Ward and Effertz',
          from: '2075-09-23T03:43:20.423Z',
        },
      ],
    },
  },
];

let options = {
  fields: [
    { key: 'name', name: 'Key (text)', type: 'text' },
    {
      key: 'age',
      name: 'Age (text)',
      type: 'text',
      options: { postfix: ' age' },
    },
    { key: 'job', name: 'Job (badge)', type: 'badge' },
    {
      key: 'information.career.company',
      name: 'Career (more, array)',
      type: 'more',
      options: {
        sub_key: 'information.career',
        layout: {
          name: 'Career Details',
          type: 'popup',
          options: { layout: { type: 'raw' } },
        },
      },
    },
  ],
  default_sort: { key: 'name', desc: false },
};
const state = reactive({
  typeOptions: {
    loading: true,
    totalCount: 0,
  },
  options: options,
  data: data,
});
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :minHeight="400" :maxHeight="500">
      <template #container="{ height }">
        <p-dynamic-layout
          type="query-search-table"
          :options="state.options"
          :data="state.data"
        >
          <template #toolbox-left>
            <p-button style-type="secondary" icon-right="ic_external-link">
              test
            </p-button>
          </template>
        </p-dynamic-layout>
      </template>
    </p-horizontal-layout>
  </div>
</template>

<style scoped lang="postcss"></style>
