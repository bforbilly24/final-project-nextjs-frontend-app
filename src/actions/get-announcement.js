"use server";

import { transformDate } from "@/libs/transform-date";

const { prisma } = require("@/libs/prisma");

async function getAnnouncement() {
	try {
		const rawData = await prisma.announcement.findMany({
			orderBy: [
				{
					id: "desc",
				},
			],
			include: {
				package: {
					include: {
						service: true,
					},
				},
				providers: {
					include: {
						provider: true,
					},
				},
			},
		});
		const data = {
			error: false,
			isEmpty: rawData.length == 0 ? true : false,
			data: rawData.map((data) => ({ ...data, createdAt: transformDate(data.createdAt), updatedAt: transformDate(data.updatedAt), name: data.package.name, serviceName: data.package.service.name })),
		};

		return data;
	} catch (error) {
		const errorData = { error: true, isEmpty: true, data: [] };

		return errorData;
	}
}

export { getAnnouncement };
