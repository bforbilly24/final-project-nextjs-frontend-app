"use server";

import { transformDate } from "@/libs/transform-date";

const { prisma } = require("@/libs/prisma");

async function getPackage() {
	try {
		const rawData = await prisma.package.findMany({
			orderBy: [
				{
					id: "desc",
				},
			],
		});
		const data = {
			error: false,
			isEmpty: rawData.length == 0 ? true : false,
			data: rawData.map((data) => ({ ...data, createdAt: transformDate(data.createdAt), updatedAt: transformDate(data.updatedAt), startTime: transformDate(data.startTime), endTime: transformDate(data.startTime) })),
		};
		return data;
	} catch (error) {
		const errorData = { error: true, isEmpty: true, data: [] };
		return errorData;
	}
}

export { getPackage };
