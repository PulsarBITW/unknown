import { Avatar, Flex, Text } from "@radix-ui/themes";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" px="4" py="3">
        <Text size="4" weight="bold" color="indigo">
          MyApp
        </Text>

        <div>search</div>

        <Flex align="center" gap="2">
          <Avatar
            alt="User Avatar"
            size="3"
            fallback={<span>You</span>}
            src="https://github.com/shadcn.png"
          />
        </Flex>
      </Flex>
    </header>
  );
};
