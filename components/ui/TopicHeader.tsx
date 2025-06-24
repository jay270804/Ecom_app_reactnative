import { Box } from "./box";
import { Heading } from "./heading";

interface TopicHeaderProps {
  title: string;
}

export default function TopicHeader({ title }: TopicHeaderProps) {
  return (
    <Box className="border-b-2 border-secondary-800 py-1 w-1/3 mx-auto ">
      <Heading
        className="text-center tracking-tight text-typography-800"
        size="xl"
        bold
      >
        {title}
      </Heading>
    </Box>
  );
}
