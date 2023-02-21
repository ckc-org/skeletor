import { Stack, useSegments } from 'expo-router'

export default () => {
  const segments = useSegments()

  const isSplash = segments.length > 0 && segments[1] === 'splash'

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: !isSplash,
          headerTintColor: 'black',
        }}
      ></Stack>
    </>
  )
}
