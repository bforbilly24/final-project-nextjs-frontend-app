import { ReloadIcon } from "@radix-ui/react-icons";

function Loader() {
	return (
		<div className="flex h-screen place-content-center items-center justify-center">
			<ReloadIcon className="h-5 w-5 animate-spin" />
		</div>
	);
}

// Loader Component
function LoaderUpload() {
    return (
        <div className="flex items-center justify-center gap-x-5">
            <ReloadIcon className="animate-spin h-8 w-8 text-gray-800" />
            <p className="text-base">Tunggu sebentar, Data sedang diproses...</p>
        </div>
    );
}

export { Loader, LoaderUpload };
