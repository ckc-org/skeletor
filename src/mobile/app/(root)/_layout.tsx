import { Tabs } from 'expo-router'

export default () => (
  <Tabs>
    <Tabs.Screen
      // Name of the route to hide.
      name="verifyEmail"
      options={{
        // This tab will not show up in the tab bar.
        href: null,
        tabBarStyle: {
          display: 'none',
        },
      }}
    />
  </Tabs>
)
