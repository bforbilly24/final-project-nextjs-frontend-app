"use server";

import { transformDate } from "@/libs/transform-date";

const { prisma } = require("@/libs/prisma");

async function getService() {
	try {
		const rawData = await prisma.service.findMany({
			orderBy: [
				{
					id: "desc",
				},
			],
			include: {
				packages: true,
			},
		});
		const data = {
			error: false,
			isEmpty: rawData.length == 0 ? true : false,
			data: rawData.map((data) => ({ ...data, createdAt: transformDate(data.createdAt), updatedAt: transformDate(data.updatedAt), packageNames: data.packages })),
		};
		return data;
	} catch (error) {
		const errorData = { error: true, isEmpty: true, data: [] };
		return errorData;
	}
}

export { getService };
