package mcir

import tbcommon "mc_web_console_api/echomodel/tumblebug/common"

type TbCustomImageInfo struct {
	AssociatedObjectList []string              `json:"associatedObjectList"`
	ConnectionName       string                `json:"connectionName"`
	CreationDate         string                `json:"creationDate"`
	CspCustomImageId     string                `json:"cspCustomImageId"`
	CspCustomImageName   string                `json:"cspCustomImageName"`
	Description          string                `json:"description"`
	GuestOS              string                `json:"guestOS"`
	ID                   string                `json:"id"`
	isAutoGenerated      bool                  `json:"isAutoGenerated"`
	KeyValueList         []tbcommon.TbKeyValue `json:"keyValueList"`
	Name                 string                `json:"name"`
	NameSpaceID          string                `json:"namespace"`
	Status               string                `json:"status"`
	SystemLabel          string                `json:"systemLabel"`
	SourceVmId           string                `json:"sourceVmId"`

	// connection 을 provider, regname으로 대체를 위해 추가
	ProviderID   string `json:"providerId"`
	ProviderName string `json:"providerName"`
	RegionName   string `json:"regionName"`
	ZoneName     string `json:"zoneName"`
}
