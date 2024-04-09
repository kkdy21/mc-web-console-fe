package actions

import (
	"mc_web_console_front/templates"
	"net/http"
	"strings"

	"github.com/gobuffalo/buffalo"
)

func PageController(c buffalo.Context) error {
	renderHtmlPath, err := breadCrumb(c)
	if err != nil {
		return c.Render(http.StatusNotFound, tr.HTML("error-404.html"))
	}
	return c.Render(http.StatusOK, tr.HTML(renderHtmlPath))
}

func breadCrumb(c buffalo.Context) (string, error) {
	depth1 := c.Param("depth1")
	depth2 := c.Param("depth2")
	depth3 := c.Param("depth3")
	var renderHtmlPath string
	if depth1 != "" && depth2 != "" && depth3 != "" {
		c.Set("depth", [...]string{depth1, depth2, depth3})
		renderHtmlPath = strings.TrimPrefix(c.Request().URL.RequestURI(), "/webconsole")
		renderHtmlPath = strings.TrimSuffix(renderHtmlPath, "/") + ".html"
		_, err := templates.FS().Open(strings.TrimPrefix(renderHtmlPath, "/"))
		if err != nil {
			return "", err
		}
	}
	return renderHtmlPath, nil

}
