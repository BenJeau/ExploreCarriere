import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/index';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#c74b4b',
		accent: '#c74b4b',
	}
};

const MainNavigator = createStackNavigator(
	{
		App: {
			screen: App,
			navigationOptions: {
				title: 'App',
				header: null
			},
		  },
	},
	{
		initialRouteName: 'App',
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