"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "@/components/miscellaneous/loader";

export default function LoadingAdmin() {
	const segment = useSelectedLayoutSegment();

	useEffect(() => {
		document.title = segment === null ? "Dashboard" : segment[0].toUpperCase() + segment.slice(1);
	}, [segment]);

	return <Loader />;
}
