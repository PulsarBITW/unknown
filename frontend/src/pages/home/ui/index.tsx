import {
  Blockquote,
  Code,
  Heading,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useUnit } from "effector-react";

import { $message } from "../model";

export const HomePage = () => {
  const message = useUnit($message);

  return (
    <>
      <Heading size="8" mb="4">
        Message
      </Heading>

      <Text as="p" size="4" mb="4" color="gray">
        {message}
      </Text>

      <Heading size="8" mb="4">
        Understanding the Power of Simplicity in Design
      </Heading>

      <Text as="p" size="4" mb="4" color="gray">
        In the world of digital products, <Strong>simplicity</Strong> isn't just
        a design choice — it's a mindset. Users appreciate clarity, and products
        benefit from fewer distractions.
      </Text>

      <Blockquote mb="4">
        “Perfection is achieved not when there is nothing more to add, but when
        there is nothing left to take away.” — Antoine de Saint-Exupéry
      </Blockquote>

      <Heading size="6" mb="2">
        Why simplicity works
      </Heading>
      <Text as="p" size="3" mb="3">
        Simple interfaces reduce cognitive load, improve performance, and create
        more inclusive experiences. It's not about making things basic — it's
        about focusing on what truly matters.
      </Text>

      <Separator size="4" mb="4" />

      <Heading size="6" mb="2">
        Code example
      </Heading>
      <Code mb="4">
        const isSimple = (design) =&gt; design.elements &lt;= 3;
      </Code>

      <Text as="p" size="3">
        Remember, clarity is not the enemy of creativity. In fact, it can be the
        best foundation for it.
      </Text>
    </>
  );
};
