"use server";

const { prisma } = require("@/libs/prisma");

async function updateAnnouncement(userId, userTitle) {
	try {
		const timestamp = new Date().toISOString(); // This generates the current timestamp in ISO 8601 format
		await prisma.package.update({
			where: {
				id: parseInt(userId),
			},
			data: {
				name: userTitle,
				updatedAt: timestamp,
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export { updateAnnouncement };
