"use server";

const { prisma } = require("@/libs/prisma");

async function getReport() {
	try {
		const data = await prisma.report.findMany({
			orderBy: [
				{
					id: "desc",
				},
			],
		});
		return data;
	} catch (error) {
		const errorData = [];
		return errorData;
	}
}

export { getReport };
