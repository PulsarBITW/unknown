import {Avatar, Button, Flex, Popover, Separator, Text} from '@radix-ui/themes';

import {ModelUserResponseDto} from '@shared/api';

interface UserAvatarProps {
  currentUser: ModelUserResponseDto;
  logout: () => void;
}

export const UserAvatar = ({currentUser, logout}: UserAvatarProps) => {
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;

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
          <Text>{fullName}</Text>
          <Separator size="4" />
          <Button color="red" onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};
