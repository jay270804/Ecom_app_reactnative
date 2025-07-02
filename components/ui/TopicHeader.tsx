import { Box } from "./box";
import { Heading } from "./heading";

interface TopicHeaderProps {
  title: string;
}

export default function TopicHeader({ title }: TopicHeaderProps) {
  return (
    <Box className="border-b border-tertiary-500 py-1 min-w-1/3 mx-auto ">
      <Heading
        className="text-center tracking-tight text-typography-800 font-thin px-2"
        size="xl"
      >
        {title}
      </Heading>
    </Box>
  );
}
