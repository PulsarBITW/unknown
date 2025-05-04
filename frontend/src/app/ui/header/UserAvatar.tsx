import {Avatar, Button, Flex, Popover, Separator, Text} from '@radix-ui/themes';

interface UserAvatarProps {
  fullUserName: string;
  logout: () => void;
}

export const UserAvatar = ({fullUserName, logout}: UserAvatarProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Avatar
          alt="User Avatar"
          size="3"
          fallback={<span>You</span>}
          src="https://github.com/shadcn.png"
        />
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="2" direction="column">
          <Text>{fullUserName}</Text>
          <Separator size="4" />
          <Button color="red" onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};
