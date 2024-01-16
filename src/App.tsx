import SearchUsers from './components/SearchUsers';

function App() {
    return (
        <div className="flex w-full py-10 items-center flex-col px-6 gap-4 bg-[#F8F9FB] min-h-screen">
            <h1 className="text-xl font-bold text-[#0b57d0]">Pick Users</h1>
            <SearchUsers />
        </div>
    );
}

export default App;
