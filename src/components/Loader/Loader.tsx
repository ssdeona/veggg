import {
  Card,
  Center,
  Skeleton,
  Stack,
} from "@mantine/core";

export default function AppLoader() {
  return (
    <Card
      withBorder
      radius="lg"
      shadow="sm"
      className="loader-card"
    >
     
      <Skeleton height={260} radius="md">
        <Center h="100%">
          <span className="loader-spinner"></span>
        </Center>
      </Skeleton>

      
      <Stack mt="md" gap="sm">
        
        <div style={{ height: '70px' }}></div>
      </Stack>
    </Card>
  );
}