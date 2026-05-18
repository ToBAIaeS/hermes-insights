import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { useAuthStore } from '../stores';
import { darkTheme } from '../theme';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const { darkTheme: adaptedDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavDarkTheme,
  reactNavigationDark: NavDarkTheme,
});

export default function App() {
  const { isAuthenticated, loadCredentials } = useAuthStore();

  useEffect(() => {
    loadCredentials();
  }, []);

  return (
    <PaperProvider theme={darkTheme}>
      <NavigationContainer theme={adaptedDarkTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1E1E1E' },
            headerTintColor: '#6EC6FF',
            headerShadowVisible: false,
            contentStyle: { backgroundColor: '#121212' },
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: 'Hermus Insights' }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}