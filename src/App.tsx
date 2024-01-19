import {Content} from './components/Content';
import TravellContextProvider from './provider';
import {Toaster} from 'sonner';
function App() {
	return (
		<TravellContextProvider>
			<Content />
			<Toaster />
		</TravellContextProvider>
	);
}

export default App;
