"use server";

const { prisma } = require("@/libs/prisma");

async function createAnnouncement(data) {
	try {
		await prisma.report.create({
			data: {
				title: data.title,
				label: data.label,
				priority: data.priority,
				status: data.status,
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export { createAnnouncement };
