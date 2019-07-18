import { AppRegistry, StatusBar } from 'react-native';
import { AppliedJobs, Availabilities, JobDetail, Login, Payment, Search, Settings, Signup, Summary, Welcome } from './src/components/screens';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/index';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#c74b4b',
		accent: '#c74b4b',
	}
};

StatusBar.setBackgroundColor('#ffffff00');
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');


const DashboardNavigator = createMaterialBottomTabNavigator(
	{
		Search: {
			screen: Search,
			navigationOptions: {
				title: 'Recherche',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons color={tintColor} size={23} name='search' />
				),
			},
		},
		AppliedJobs: {
			screen: AppliedJobs,
			navigationOptions: {
				title: 'Emplois postulés',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons color={tintColor} size={23} name='list' />
				),
			},
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				title: 'Paramètres',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons color={tintColor} size={23} name='settings' />
				),
			},
		}
	}, {
		initialRouteName: 'Search',
		activeColor: '#232323',
		inactiveColor: '#bbbbbb',
		barStyle: {
			backgroundColor: '#ffffff',
			outline: 'none'
		},
		shifting: true,
		defaultNavigationOptions: {
			header: null,
		},
		keyboardHidesNavigationBar: true
	}
);



const JobNavigator = createStackNavigator(
	{	
		DashboardNavigator,
		JobDetail: {
			screen: JobDetail,
			navigationOptions: {
				title: 'Emploi'
			},
		},
		Availabilities: {
			screen: Availabilities,
			navigationOptions: {
				title: 'Disponibilités'
			},
		},
		Payment: {
			screen: Payment,
			navigationOptions: {
				title: 'Paiement'
			},
		},
		Summary: {
			screen: Summary,
			navigationOptions: {
				title: 'Sommaire'
			},
		},
	},
	{
		initialRouteName: 'DashboardNavigator',
		defaultNavigationOptions: {
			headerTransparent: true,
			headerTintColor: '#000',
			headerStyle: {
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
				marginTop: getStatusBarHeight(),
				// backgroundColor: '#ffffffd0'
			}
		}
	}
)

const LoginNavigator = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				header: null
			},
		},
		Signup: {
			screen: Signup,
			navigationOptions: {
				headerTransparent: true,
				headerTintColor: '#000',
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0,
					marginTop: getStatusBarHeight(),
					backgroundColor: '#ffffffd0'
				}
			},
		}
	},
	{
		initialRouteName: 'Login',
	}
);

const MainNavigator = createSwitchNavigator(
	{
		Welcome: {
			screen: Welcome,
			navigationOptions: {
				// header: null
			},
		},
		DashboardNavigator: {
			screen: DashboardNavigator,
			navigationOptions: {
				// header: null
			},
		},
		LoginNavigator: {
			screen: LoginNavigator,
			navigationOptions: {
				// header: null
			},
		},
		JobNavigator: {
			screen: JobNavigator,
			navigationOptions: {
				// header: null
			},
		}
	},
	{
		initialRouteName: 'Welcome',
	}
);

const AppContainer = createAppContainer(MainNavigator);

export default function Main() {
	return (
		<Provider store={store}>
			<PersistGate loading={null}
				persistor={persistor}>
				<PaperProvider theme={theme}>
					<AppContainer />
				</PaperProvider>
			</PersistGate>
		</Provider>
	);
}

AppRegistry.registerComponent(appName, () => Main);