import { IDefineTableField } from '@/shared/hooks/table/toolboxTable/types.ts';
import { vmConnectionTableType, vmDetailTableType } from '@/entities/vm/model';

export function useVmDetailModel() {
  const detailTableField: Array<IDefineTableField<vmDetailTableType>> = [
    { label: 'Server ID', name: 'serverId' },
    { label: 'Description', name: 'description' },
    { label: 'Public IP(IPv4)', name: 'publicIP' },
    { label: 'Public DNS(IPv4)', name: 'publicDNS' },
    { label: 'Private IP', name: 'privateIP' },
    { label: 'Private DNS', name: 'privateDNS' },
    { label: 'Status', name: 'status' },
    { label: 'Provider', name: 'provider' },
    { label: 'VM Spec', name: 'vmSpec' },
    { label: 'Server Spec', name: 'serverSpec' },
    { label: 'Region', name: 'region' },
    { label: 'Zone', name: 'zone' },
    { label: 'Security Group', name: 'securityGroup' },
    { label: 'VPC ID', name: 'vpcId' },
    { label: 'Subnet ID', name: 'subnetId' },
    { label: 'StartTime', name: 'startTime' },
    { label: 'Network Interface', name: 'networkInterface' },
    { label: 'Root Device', name: 'rootDevice' },
    { label: 'Root Device Type', name: 'rootDeviceType' },
    { label: 'Keypair Name', name: 'keypairName' },
    { label: 'Block Device', name: 'blockDevice' },
    { label: 'ConfigName', name: 'configName' },
    { label: 'VMID', name: 'vmId' },
    { label: 'User ID / Pwd', name: 'userIdPwd' },
    { label: 'Access ID / Pwd', name: 'accessIdPwd' },
    { label: 'Operating System', name: 'operatingSystem' },
    { label: 'Image ID', name: 'imageId' },
    { label: 'Architecture', name: 'architecture' },
    { label: 'Platform', name: 'platform' },
  ];

  const connectionTableField: Array<IDefineTableField<vmConnectionTableType>> =
    [
      { label: 'Connection Name', name: 'connectionName' },
      { label: 'Credential', name: 'credential' },
      { label: 'Provider', name: 'provider' },
      { label: 'Driver File Name', name: 'driverFileName' },
      { label: 'Region', name: 'region' },
      { label: 'Available Zone', name: 'availableZone' },
    ];

  return {
    detailTableField,
    connectionTableField,
  };
}
