import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const User = () => {
  const items = [
    { name: "Profile", shortcut: "⇧⌘P" },
    { name: "Billing", shortcut: "⌘B" },
    { name: "Settings", shortcut: "⌘S" },
    { name: "New Team" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem key={index}>
              <div className="flex items-center justify-between w-full">
                <span>{item.name}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
