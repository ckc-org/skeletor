import { Text, VStack } from "native-base"
import { AppScreenProps } from "SKELETOR_NEW_PROJECT/shared"

export function HomeScreen({ navigation }: AppScreenProps<"Home">) {
  return (
    <VStack
      safeArea={true}
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        Welcome to SKELETOR_NEW_PROJECT!
      </Text>
    </VStack>
  )
}