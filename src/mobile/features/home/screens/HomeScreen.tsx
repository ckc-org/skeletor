import { Text, VStack } from "native-base"
import { AppScreenProps } from "SKELETOR_NAME_PLACEHOLDER/shared"

export function HomeScreen({ navigation }: AppScreenProps<"Home">) {
  return (
    <VStack
      safeArea={true}
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        Welcome to SKELETOR_NAME_PLACEHOLDER!
      </Text>
    </VStack>
  )
}
