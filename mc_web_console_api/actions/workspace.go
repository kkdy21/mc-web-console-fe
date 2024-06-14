package actions

import (
	"fmt"
	"mc_web_console_api/handler"
	"mc_web_console_api/handler/mciammanager"

	"github.com/gobuffalo/buffalo"
)

func GetWorkspaceByuserId(c buffalo.Context, commonRequest *handler.CommonRequest) *handler.CommonResponse {
	if handler.MCIAM_USE {
		// headerAccessToken := c.Request().Header.Get("Authorization")
		// accessToken := strings.TrimPrefix(headerAccessToken, "Bearer ")
		// jwtDecoded := auth.McIamJwtDecode(accessToken)
		// userId, _ := jwtDecoded["preferred_username"].(string)

		pathParams := make(map[string]string)
		// pathParams["userid"] = userId

		req := &handler.CommonRequest{
			PathParams: pathParams,
		}

		commonResponse := mciammanager.McIamGetworkspaceuserrolemappingbyworkspaceuser(c, req)
		return commonResponse
	}
	return handler.CommonResponseStatusInternalServerError(nil)
}

// Workspace 목록 조회
func GetWorkspacelist(c buffalo.Context, commonRequest *handler.CommonRequest) *handler.CommonResponse {
	if handler.MCIAM_USE {
		commonResponse := mciammanager.McIamGetworkspacelist(c, commonRequest)
		fmt.Println(commonResponse)
		return commonResponse
	}
	return handler.CommonResponseStatusInternalServerError(nil)
}

// Workspace 단건 조회
func GetWorkspace(c buffalo.Context, commonRequest *handler.CommonRequest) *handler.CommonResponse {
	if handler.MCIAM_USE {
		commonResponse := mciammanager.McIamGetworkspace(c, commonRequest)
		fmt.Println(commonResponse)
		return commonResponse
	}
	return handler.CommonResponseStatusInternalServerError(nil)
}

// workspace 생성
func CreateWorkspace(c buffalo.Context, commonRequest *handler.CommonRequest) *handler.CommonResponse {
	if handler.MCIAM_USE {
		commonResponse := mciammanager.McIamCreateworkspace(c, commonRequest)
		fmt.Println(commonResponse)
		return commonResponse
	}
	return handler.CommonResponseStatusInternalServerError(nil)
}

// workspace 삭제
func DeleteWorkspace(c buffalo.Context, commonRequest *handler.CommonRequest) *handler.CommonResponse {
	if handler.MCIAM_USE {
		commonResponse := mciammanager.McIamDeleteworkspace(c, commonRequest)
		fmt.Println(commonResponse)
		return commonResponse
	}
	return handler.CommonResponseStatusInternalServerError(nil)
}
