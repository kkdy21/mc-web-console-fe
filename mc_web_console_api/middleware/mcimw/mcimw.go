package mcimw

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo/render"
	"github.com/golang-jwt/jwt"
	"github.com/lestrrat-go/jwx/jwk"
)

type mcimwAuth interface {
	AuthLoginHandler(http.ResponseWriter, *http.Request)
	AuthLoginRefreshHandler(http.ResponseWriter, *http.Request)
	AuthLogoutHandler(http.ResponseWriter, *http.Request)
	AuthGetUserInfo(http.ResponseWriter, *http.Request)
	AuthGetUserValidate(http.ResponseWriter, *http.Request)
}
type mcimw struct {
	grantRoles []string
}

// ** key 값이 token 에 존재하는지 꼭!! 확인하고 사용할 것. 모든 키값의 유무를 확인하기에, nil pointer 에러 발생 가능 **
type CustomClaims struct {
	*jwt.StandardClaims
	Exp int `json:"exp"`
	// Iat            int      `json:"iat"`
	// Jti            string   `json:"jti"`
	// Iss            string   `json:"iss"`
	// Aud            string   `json:"aud"`
	Sub string `json:"sub"`
	// Typ            string   `json:"typ"`
	// Azp            string   `json:"azp"`
	// SessionState   string   `json:"session_state"`
	// Acr            string   `json:"acr"`
	// AllowedOrigins []string `json:"allowed-origins"`
	//
	//	RealmAccess    struct {
	//		Roles []string `json:"roles"`
	//	} `json:"realm_access"`
	//
	// Scope             string   `json:"scope"`
	// Sid               string   `json:"sid"`
	// Upn               string   `json:"upn"`
	// EmailVerified     bool     `json:"email_verified"`
	// Name              string   `json:"name"`
	// Groups            []string `json:"groups"`
	PreferredUsername string   `json:"preferred_username"`
	RealmRole         []string `json:"realmRole"`
	// GivenName         string   `json:"given_name"`
	// FamilyName        string   `json:"family_name"`
	// Email             string   `json:"email"`
}

var (
	jwkSet          jwk.Set
	GrantedRoleList = []string{}
	AuthMethod      mcimwAuth
)

func init() {
	var err error
	ctx := context.Background()
	jwkSet, err = jwk.Fetch(ctx, EnvKeycloak.KEYCLAOK_JWKSURL)
	if err != nil {
		panic("failed to fetch JWK: " + err.Error())
	}
}

func BeginAuthHandler(res http.ResponseWriter, req *http.Request) {
	reqUri := req.RequestURI
	reqMethod := req.Method
	res.Header().Set("Content-Type", "application/json")

	if strings.HasSuffix(reqUri, "/login") && reqMethod == "POST" {
		AuthMethod.AuthLoginHandler(res, req)
		return
	} else if strings.HasSuffix(reqUri, "/login/refresh") && reqMethod == "POST" {
		AuthMethod.AuthLoginRefreshHandler(res, req)
		return
	} else if strings.HasSuffix(reqUri, "/logout") && reqMethod == "POST" {
		AuthMethod.AuthLogoutHandler(res, req)
		return
	} else if strings.HasSuffix(reqUri, "/userinfo") && reqMethod == "GET" {
		AuthMethod.AuthGetUserInfo(res, req)
		return
	} else if strings.HasSuffix(reqUri, "/validate") && reqMethod == "GET" {
		AuthMethod.AuthGetUserValidate(res, req)
		return
	}

	res.WriteHeader(http.StatusBadRequest)
	fmt.Fprintln(res, map[string]interface{}{
		"error": http.StatusText(http.StatusBadRequest),
	})
}

func BuffaloMcimw(next buffalo.Handler) buffalo.Handler {
	mr := mcimw{
		grantRoles: GrantedRoleList,
	}
	return mr.BuffaloMiddleware(next)
}

func (mr mcimw) BuffaloMiddleware(next buffalo.Handler) buffalo.Handler {
	return func(c buffalo.Context) error {
		err := mr.istokenValid(c, strings.TrimPrefix(c.Request().Header.Get("Authorization"), "Bearer "))
		if err != nil {
			return c.Render(http.StatusInternalServerError,
				render.JSON(map[string]string{"err": err.Error()}))
		}
		return next(c)
	}
}

func (mr mcimw) istokenValid(c buffalo.Context, tokenString string) error {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, keyfunction)
	if err != nil {
		return fmt.Errorf("failed to parse token: %s", err.Error())
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		if len(mr.grantRoles) != 0 {
			if !mr.isRoleContains(claims.RealmRole) {
				return fmt.Errorf("role is invalid")
			}
		} else {
			c.Set("Exp", claims.Exp)
			c.Set("Sub", claims.Sub)
			c.Set("PreferredUsername", claims.PreferredUsername)
			c.Set("RealmRole", claims.RealmRole)
		}
		return nil
	} else {
		return fmt.Errorf("token is invalid")
	}
}

func UserInfoSet(c buffalo.Context, tokenString string) error {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, keyfunction)
	if err != nil {
		return fmt.Errorf("failed to parse token: %s", err.Error())
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		c.Set("Exp", claims.Exp)
		c.Set("Sub", claims.Sub)
		c.Set("PreferredUsername", claims.PreferredUsername)
		c.Set("RealmRole", claims.RealmRole)
		return nil
	}
	return fmt.Errorf("token KEY invalid")
}

func keyfunction(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
		return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	}
	kid := token.Header["kid"].(string)
	keys, nokey := jwkSet.LookupKeyID(kid)
	if !nokey {
		return nil, fmt.Errorf("no keys found for kid: %s", kid)
	}
	var raw interface{}
	if err := keys.Raw(&raw); err != nil {
		return nil, fmt.Errorf("failed to get key: %s", err)
	}
	return raw, nil
}

func (mr mcimw) isRoleContains(arr []string) bool {
	set := make(map[string]bool)
	for _, v := range mr.grantRoles {
		set[v] = true
	}
	for _, v := range arr {
		if set[v] {
			return true
		}
	}
	return false
}

// func EchoMcimw(next echo.HandlerFunc) echo.HandlerFunc {
// 	mr := mcimw{
// 		roleNames: GrantedRoleList,
// 	}
// 	return mr.EchoMiddleware(next)
// }

// func (mr mcimw) EchoMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
// 	return func(c echo.Context) error {
// 		defer func() {

// 		}()
// 		return next(c)
// 	}
// }
