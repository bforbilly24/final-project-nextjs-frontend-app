"use server";

import { transformDate } from "@/libs/transform-date";

const { prisma } = require("@/libs/prisma");

async function getExpert() {
	try {
		const rawData = await prisma.expert.findMany({
			orderBy: [
				{
					id: "desc",
				},
			],
		});
		const data = {
			error: false,
			isEmpty: rawData.length == 0 ? true : false,
			data: rawData.map((data) => ({ ...data, createdAt: transformDate(data.createdAt), updatedAt: transformDate(data.updatedAt) })),
		};
		return data;
	} catch (error) {
		const errorData = { error: true, isEmpty: true, data: [] };
		return errorData;
	}
}

export { getExpert };
