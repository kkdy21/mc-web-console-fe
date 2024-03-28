package mcis

type TbVmDynamicReq struct {
	CommonImage    string `json:"commonImage"`
	CommonSpec     string `json:"commonSpec"`
	ConnectionName string `json:"connectionName"`
	Description    string `json:"description"`
	Label          string `json:"label"`
	Name           string `json:"name"`
	RootDiskSize   string `json:"rootDiskSize"`
	RootDiskType   string `json:"rootDiskType"`
	SubGroupSize   string `json:"subGroupSize"`

	ProviderID   string `json:"providerId"`
	ProviderName string `json:"providerName"`
	RegionName   string `json:"regionName"`
	ZoneName     string `json:"zoneName"`
}
