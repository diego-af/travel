import {ReactNode, createContext, useState} from 'react';

interface ContextProps {
	children: ReactNode;
}
export interface TravelsData {
	image: string;
	month: string;
	name: string;
	price: string;
	status: string;
}

interface ContextValue {
	tab: number;
	setTab: (tab: number) => void;
	travels: TravelsData[];
	setTravels: (travels: TravelsData[]) => void;
}
export const TravellContext = createContext<ContextValue>({} as ContextValue);

const TravellContextProvider = ({children}: ContextProps) => {
	const [tab, setTab] = useState(1);
	const [travels, setTravels] = useState<TravelsData[] | []>([]);
	return (
		<TravellContext.Provider value={{tab, setTab, travels, setTravels}}>
			{children}
		</TravellContext.Provider>
	);
};
export default TravellContextProvider;
