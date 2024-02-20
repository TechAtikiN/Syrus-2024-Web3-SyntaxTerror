import { Switch } from "@/components/ui/switch";
import { Moon, Sun, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeChanger = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div className="sticky bottom-0 flex flex-col p-2 px-4 py-4 mt-2 md:hidden lg:flex lg:flex-col">
        <div className="flex items-center space-x-2">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
          <h3 className="text-sm font-semibold">
            {theme === "light" ? "Light" : "Dark"}
          </h3>
        </div>
      </div>
      <div className="sticky bottom-0 items-center hidden p-2 px-6 py-4 mt-2 md:flex md:flex-col gap-2-4 lg:hidden">
        <div className="flex bg-[#F4F4F4] dark:bg-[#111315]  p-1 rounded-2xl items-center justify-center gap-6 mt-3">
          <div
            className={`flex justify-center w-full gap-2 p-3 rounded-2xl item-center cursor-pointer dark:bg-[#272b30] z-10 shadow-md`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeChanger;
