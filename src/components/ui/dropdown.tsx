import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "classnames";
import { Button } from "./button";
import AlertDialogDemo from "./alert-dialog";
import type { MenuItem } from "@/types/MenuItemType";

type DropdownSize = "sm" | "md" | "lg";
type DropdownSide = "bottom" | "top" | "right" | "left";
type DropdownAlign = "start" | "end";

type DropdownMenuProps = {
  trigger: ReactNode;
  items: MenuItem[];
  size?: DropdownSize;
  label?: string;
  side?: DropdownSide;
  align?: DropdownAlign;
};

const sizeClass: Record<DropdownSize, string> = {
  sm: "min-w-[200px]",
  md: "min-w-[300px]",
  lg: "min-w-[400px]",
};

export const DropdownMenu = ({
  trigger,
  items,
  size = "md",
  side,
  align,
  label,
}: DropdownMenuProps) => {
  const [history, setHistory] = useState<MenuItem[][]>([items]);

  const currentMenu = history[history.length - 1];

  const handleClick = (item: MenuItem) => {
    if ("separator" in item) {
      return;
    }

    setHistory((prev) => [...prev, item.children!]);
  };

  const goBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <Dropdown.Root
      onOpenChange={(open) => {
        if (!open) {
          setHistory([items]); // ✅ reset về gốc khi đóng
        }
      }}
    >
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content
          className={clsx(
            sizeClass[size],
            "bg-black text-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg z-999 p-3" 
          )}
          side={side}
          align={align}
        >
          <div className="relative flex justify-center items-center px-2">
            {history.length > 1 && (
              <Button
                onClick={() => goBack()}
                className="absolute left-1"
                variant="transparent"
                icon={<ChevronLeft size={15} />}
              />
            )}
          </div>

          {currentMenu.map((item, index) => {
            if ("separator" in item) {
              return (
                <Dropdown.Separator
                  key={index}
                  className="h-px my-1 bg-gray-200 dark:bg-gray-700"
                />
              );
            }

            return (
              <>
                {item.children ? (
                  <Dropdown.Item
                    onClick={(e) => {
                      if (item.dialog) {
                        e.preventDefault()
                      }
                      handleClick(item);
                    }}
                    
                    key={index}
                    className={clsx(
                      "flex items-center justify-between px-2 py-1.5 text-sm",
                      item.disabled && "opacity-50 pointer-events-none"
                    )}
                  >
                    {item.dialog ? (
                      <AlertDialogDemo
                        label={item.dialog.label}
                        description={item.dialog.description}
                        onclick={item.onClick}
                        trigger={
                          <Button
                            variant="item"
                            className="w-full"
                            icon={item.icon}
                            title={item.label}
                            size="sm"
                          />
                        }
                      />
                    ) : (
                      <Button
                        onClick={item.onClick}
                        variant="item"
                        icon={item.icon}
                        title={item.label}
                        size="sm"
                        className="w-full"
                      />
                    )}
                    <ChevronRight size={15} />
                    {item.shortcut && (
                      <span className="text-xs text-gray-500 ml-2">
                        {item.shortcut}
                      </span>
                    )}
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item
                    onClick={(e) => {
                      if (item.dialog) {
                        e.preventDefault()
                      }
                    }}
                    key={index}
                    className={clsx(
                      "flex items-center px-2 py-1.5 text-sm",
                      item.disabled && "opacity-50 pointer-events-none"
                    )}
                  >
                    {item.dialog ? (
                      <AlertDialogDemo
                        label={item.dialog.label}
                        description={item.dialog.description}
                        onclick={item.onClick}
                        trigger={
                          <Button
                            variant="item"
                            className="w-full"
                            icon={item.icon}
                            title={item.label}
                            size="sm"
                          />
                        }
                      />
                    ) : (
                      <Button
                        onClick={item.onClick}
                        variant="item"
                        icon={item.icon}
                        title={item.label}
                        size="sm"
                        className="w-full"
                      />
                    )}

                    {item.shortcut && (
                      <span className="text-xs text-gray-500 ml-2">
                        {item.shortcut}
                      </span>
                    )}
                  </Dropdown.Item>
                )}
              </>
            );
          })}
          <Dropdown.Arrow className="fill-black"/>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
