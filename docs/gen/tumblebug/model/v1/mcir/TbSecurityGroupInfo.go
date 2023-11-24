package mcir

import ( 
	"/tumblebug/common
) 
type TbSecurityGroupInfo struct {
	CspSecurityGroupId	string	`json:"cspSecurityGroupId"`
	CspSecurityGroupName	string	`json:"cspSecurityGroupName"`
	Description	string	`json:"description"`
	FirewallRules	[]SpiderSecurityRuleInfo	`json:"firewallRules"`
	KeyValueList	[]KeyValue	`json:"keyValueList"`
	AssociatedObjectList	[]string	`json:"associatedObjectList"`
	ConnectionName	string	`json:"connectionName"`
	Name	string	`json:"name"`
	SystemLabel	string	`json:"systemLabel"`
	VNetId	string	`json:"vNetId"`
	Id	string	`json:"id"`
	IsAutoGenerated		`json:"isAutoGenerated"`
}