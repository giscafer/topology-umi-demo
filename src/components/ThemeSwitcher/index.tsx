/*
 * @Author: mingxing.zhong
 * @Date: 2021-08-31 10:56:10
 * @Description: 主题改变器
 */

import { THEME_KEY } from "@/shared/constant";
import { Dropdown, Menu } from "antd";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { colorSet } from "../../../config/theme";

const ColorPanel = ({ color }: { color: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 4,
    }}
  >
    <div
      style={{ width: 20, height: 20, background: color, borderRadius: "50%" }}
    />
  </div>
);

const ThemeSwitcher: React.FC<Record<string, never>> = () => {
  const defaultTheme = colorSet[0];
  const [theme, setTheme] = useState(defaultTheme);

  const onChange = useCallback((color: string) => {
    (window as any).less.modifyVars({ "primary-color": color });
    window.localStorage.setItem(THEME_KEY, color);
    setTheme(color);
  }, []);

  useEffect(() => {
    const themeCache = window.localStorage.getItem(THEME_KEY);

    (window as any).less.modifyVars({
      "primary-color": themeCache || colorSet[0],
    });
    setTheme(themeCache || colorSet[0]);
  }, []);

  return (
    <Dropdown
      placement="bottomCenter"
      overlay={
        <Menu>
          {colorSet.map((color) => (
            <Menu.Item key={color} onClick={() => onChange(color)}>
              <ColorPanel color={color} />
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <a>
        <ColorPanel color={theme} />
      </a>
    </Dropdown>
  );
};

export default ThemeSwitcher;
