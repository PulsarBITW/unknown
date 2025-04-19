import { Box, Text } from "@radix-ui/themes";
import { useUnit } from "effector-react";

import { $info } from "../model";

export const AboutPage = () => {
  const info = useUnit($info);

  return (
    <Box>
      <Text>{info}</Text>
    </Box>
  );
};
